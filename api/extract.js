import Anthropic from '@anthropic-ai/sdk';
import { CN_RECIPE_SCHEMA, CN_SYSTEM_PROMPT } from './recipe-schema.js';

/* La fonction peut tourner jusqu'à 60 s : une extraction prend en général
   10 à 25 s, et la limite par défaut de Vercel (10 s) serait trop courte. */
export const maxDuration = 60;

const MEDIA_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

/* Messages destinés à l'écran, pas au journal : l'utilisateur doit savoir
   quoi faire, pas ce qu'a répondu l'API. */
function humanError(err) {
  const status = err && err.status;
  const raw = ((err && err.message) || '').toLowerCase();
  if (status === 401) return "Clé Anthropic refusée — vérifiez ANTHROPIC_API_KEY dans Vercel.";
  if (status === 429) return "Trop de demandes d'un coup. Réessayez dans une minute.";
  if (raw.includes('credit balance') || raw.includes('insufficient')) {
    return "Crédit Anthropic épuisé — rechargez sur console.anthropic.com.";
  }
  if (status === 413 || raw.includes('too large')) return "Photo trop lourde. Reprenez-la d'un peu plus loin.";
  if (raw.includes('timeout') || raw.includes('aborted')) return "L'extraction a pris trop de temps. Réessayez avec une photo plus nette.";
  return "L'extraction a échoué. Réessayez, ou saisissez la recette à la main.";
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée.' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "L'extraction n'est pas configurée sur ce déploiement (clé absente)." });
  }

  const { image, mediaType } = req.body || {};
  if (!image) return res.status(400).json({ error: 'Aucune image reçue.' });
  if (!MEDIA_TYPES.includes(mediaType)) return res.status(400).json({ error: 'Format d’image non pris en charge.' });

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: 'claude-opus-5',
      max_tokens: 16000,
      /* Effort réduit : la tâche est bornée et bien spécifiée, et il faut
         rester sous la limite de 60 s de la fonction. */
      output_config: {
        effort: 'low',
        format: { type: 'json_schema', schema: CN_RECIPE_SCHEMA },
      },
      system: CN_SYSTEM_PROMPT,
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mediaType, data: image } },
          { type: 'text', text: 'Transcris cette recette dans le format de la maison.' },
        ],
      }],
    });

    if (response.stop_reason === 'refusal') {
      return res.status(422).json({ error: "Le contenu de cette image n'a pas pu être traité." });
    }
    if (response.stop_reason === 'max_tokens') {
      return res.status(502).json({ error: 'Réponse incomplète. Réessayez avec une photo plus cadrée.' });
    }

    const text = response.content.find(b => b.type === 'text');
    if (!text) return res.status(502).json({ error: "Le modèle n'a rien renvoyé d'exploitable." });

    let recipe;
    try {
      recipe = JSON.parse(text.text);
    } catch (e) {
      return res.status(502).json({ error: 'Réponse illisible du modèle. Réessayez.' });
    }

    return res.status(200).json({
      recipe,
      usage: {
        input: response.usage.input_tokens,
        output: response.usage.output_tokens,
        cached: response.usage.cache_read_input_tokens || 0,
      },
    });
  } catch (err) {
    console.error('[extract]', err && err.status, err && err.message);
    return res.status(502).json({ error: humanError(err) });
  }
}
