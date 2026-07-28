import Anthropic from '@anthropic-ai/sdk';
import { CN_RECIPE_SCHEMA, CN_SYSTEM_PROMPT } from './recipe-schema.js';

/* La fonction peut tourner jusqu'à 60 s : une extraction prend en général
   10 à 25 s, et la limite par défaut de Vercel (10 s) serait trop courte. */
export const maxDuration = 60;

const MEDIA_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
export const MAX_PAGES = 6;

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

  /* `images` est la forme courante (une recette peut tenir sur plusieurs
     pages) ; `image` reste accepté pour les clients déjà installés. */
  const body = req.body || {};
  const pages = Array.isArray(body.images) && body.images.length
    ? body.images
    : (body.image ? [{ data: body.image, mediaType: body.mediaType }] : []);

  if (!pages.length) return res.status(400).json({ error: 'Aucune image reçue.' });
  if (pages.length > MAX_PAGES) return res.status(400).json({ error: `${MAX_PAGES} pages au maximum pour une recette.` });
  if (pages.some(p => !p || !p.data || !MEDIA_TYPES.includes(p.mediaType))) {
    return res.status(400).json({ error: 'Format d’image non pris en charge.' });
  }

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
          ...pages.flatMap((p, i) => [
            ...(pages.length > 1 ? [{ type: 'text', text: `— Page ${i + 1} sur ${pages.length} —` }] : []),
            { type: 'image', source: { type: 'base64', media_type: p.mediaType, data: p.data } },
          ]),
          {
            type: 'text',
            text: pages.length > 1
              ? `Ces ${pages.length} images sont les pages successives d'une seule et même recette. Recoupe-les en une fiche unique : les ingrédients et les étapes peuvent être répartis entre les pages, et certains éléments peuvent apparaître deux fois — ne les duplique pas. Transcris le tout dans le format de la maison.`
              : 'Transcris cette recette dans le format de la maison.',
          },
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
