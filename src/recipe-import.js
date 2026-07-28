import { CN_CHAPTERS, chMeta } from './helpers.jsx';
import { cnNextRecipeNum } from './recipes.js';
import { cnRayon } from './courses-data.js';

/* ── Normalisation d'une recette extraite ──
   Le modèle propose, ce fichier impose. Tout ce qui est déductible est
   recalculé ici : le modèle n'a aucune prise sur l'identifiant, les totaux,
   les badges ni les drapeaux de régime. C'est ce qui garantit qu'une recette
   importée est structurellement identique aux 60 du livre. */

const CHAPTERS = Object.keys(CN_CHAPTERS);
const TYPE_BADGES = ['Bœuf', 'Bœuf haché', 'Crevettes', 'Dinde', 'Jambon', 'Jambon cru', 'Lard', 'Poisson', 'Porc', 'Poulet', 'Saumon', 'Végan', 'Végétarien'];
const DIET_TAGS = ['Cuisine du monde', 'Gourmande', 'Pesco-végétarien', 'Rapide', 'Sans arachide', 'Sans fruits à coque', 'Sans gluten', 'Sans lactose', 'Sans œuf', 'Végan', 'Végétarien'];
const SECTIONS = ['À Acheter', 'Placard', 'Épices'];
const TIP_TITLES = ['Astuce Airfryer', 'Conseil', 'Variante', 'Variante carnée', 'Variantes'];
const FOOTER_LABELS = ['Conseil', 'Conservation', 'Suggestion'];

const txt = (v, max = 400) => String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, max);
const int = (v, min = 0, max = 9999) => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min;
};
const pick = (list, allowed) => (Array.isArray(list) ? list : []).filter(v => allowed.includes(v));

/* Les étapes sont injectées en HTML : seul <strong> survit. Les balises à
   contenu exécutable partent avec leur contenu, le reste perd sa balise. */
const cleanStep = (s) => txt(String(s == null ? '' : s)
  .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '')
  .replace(/<(?!\/?strong\s*\/?>)[^>]*>/gi, ''), 600);

const MEAT_BADGES = ['Bœuf', 'Bœuf haché', 'Dinde', 'Jambon', 'Jambon cru', 'Lard', 'Porc', 'Poulet'];
const FISH_BADGES = ['Crevettes', 'Poisson', 'Saumon'];

export function cnNormalizeRecipe(raw, opts = {}) {
  const r = raw || {};
  const chapter = CHAPTERS.includes(r.chapter) ? r.chapter : 'Low-Carb';
  const m = chMeta(chapter);

  const n = r.nutrition || {};
  const nutrition = {
    kcal: int(n.kcal, 0, 3000),
    lipides: int(n.lipides, 0, 300),
    glucides: int(n.glucides, 0, 400),
    proteines: int(n.proteines, 0, 300),
  };

  const prepMin = int(r.prepMin, 0, 600);
  const cookMin = int(r.cookMin, 0, 600);

  /* On garde les sections telles que proposées : les 60 recettes du livre ont
     les mêmes approximations, et `cnRemapSection` les corrige à l'affichage.
     Uniformiser ici rendrait les nouvelles recettes différentes des autres. */
  const ingredients = (Array.isArray(r.ingredients) ? r.ingredients : [])
    .filter(sec => sec && SECTIONS.includes(sec.section))
    .map(sec => ({
      section: sec.section,
      items: (Array.isArray(sec.items) ? sec.items : [])
        .map(it => ({ q: txt(it && it.q, 40), name: txt(it && it.name, 80).toLowerCase() }))
        .filter(it => it.name),
    }))
    .filter(sec => sec.items.length)
    .sort((a, b) => SECTIONS.indexOf(a.section) - SECTIONS.indexOf(b.section));

  /* ── Cohérence des régimes ──
     Le modèle se contredit parfois : « Végan » annoncé sur un plat au poulet.
     On tranche sur les faits — le badge principal et les ingrédients réellement
     listés — plutôt que sur l'étiquette déclarée. Sans ça, une recette de
     poulet remonterait dans le filtre végé. */
  let typeBadges = [...new Set(pick(r.typeBadges, TYPE_BADGES))].slice(0, 2);
  let dietTags = [...new Set(pick(r.dietTags, DIET_TAGS))];

  const hasMeat = typeBadges.some(b => MEAT_BADGES.includes(b));
  const hasFish = typeBadges.some(b => FISH_BADGES.includes(b));
  const animalIngredient = ingredients.some(sec => sec.items.some(it => cnRayon(it.name) === 'boucherie'));
  const isAnimal = hasMeat || hasFish || animalIngredient;

  if (isAnimal) {
    typeBadges = typeBadges.filter(b => b !== 'Végan' && b !== 'Végétarien');
    dietTags = dietTags.filter(t => t !== 'Végan' && t !== 'Végétarien');
    if (hasMeat || (animalIngredient && !hasFish)) dietTags = dietTags.filter(t => t !== 'Pesco-végétarien');
  }

  const isVegan = !isAnimal && (dietTags.includes('Végan') || typeBadges.includes('Végan'));
  const isVeggie = isVegan || (!isAnimal && (dietTags.includes('Végétarien') || typeBadges.includes('Végétarien')));

  const steps = (Array.isArray(r.steps) ? r.steps : []).map(cleanStep).filter(Boolean).slice(0, 9);
  const claudy = (Array.isArray(r.claudy) ? r.claudy : []).map(s => txt(s, 300)).filter(Boolean).slice(0, 2);

  const tips = (Array.isArray(r.tips) ? r.tips : [])
    .filter(t => t && TIP_TITLES.includes(t.title))
    .map(t => ({ cls: t.title === 'Astuce Airfryer' ? 'p-t-af' : 'p-t-var', title: t.title, text: txt(t.text, 300) }))
    .filter(t => t.text).slice(0, 2);

  const footerTips = (Array.isArray(r.footerTips) ? r.footerTips : [])
    .filter(t => t && FOOTER_LABELS.includes(t.label))
    .map(t => ({ label: t.label, text: txt(t.text, 300) }))
    .filter(t => t.text)
    .sort((a, b) => FOOTER_LABELS.indexOf(a.label) - FOOTER_LABELS.indexOf(b.label));

  const num = opts.num || cnNextRecipeNum();

  return {
    id: opts.id || `p${num}`,
    chapter,
    ctag: chapter,
    title: txt(r.title, 90) || 'Recette sans titre',
    portions: 'Pour 2 personnes',
    bigBadges: [`${m.label} · ${m.sub}`, ...typeBadges],
    dietTags,
    nutrition,
    prepMin,
    cookMin,
    prepRaw: cookMin > 0 ? `Prép. ${prepMin} min · Cuisson ${cookMin} min` : `Prép. ${prepMin} min`,
    ingredients,
    portionLabel: 'Quantités pour 2 personnes · valeurs crues',
    tips,
    steps,
    claudy,
    footerTips,
    num,
    totalMin: prepMin + cookMin,
    typeBadges,
    isVegan,
    isVeggie,
    /* Métadonnées propres aux recettes importées — ignorées par le reste de l'app. */
    origin: 'photo',
    nutritionEstimated: !!(n.estimated),
    createdAt: opts.createdAt || Date.now(),
  };
}

/* Ce qui empêche d'enregistrer : on préfère renvoyer l'utilisateur à la
   saisie manuelle plutôt que de glisser une fiche bancale parmi les autres. */
export function cnValidateRecipe(r) {
  const errs = [];
  if (!r.title || r.title === 'Recette sans titre') errs.push('Le titre manque.');
  if (!r.ingredients.length) errs.push('Aucun ingrédient reconnu.');
  if (r.steps.length < 3) errs.push('Moins de trois étapes reconnues.');
  if (!r.nutrition.kcal) errs.push('Les calories manquent.');
  if (!r.prepMin && !r.cookMin) errs.push('Aucune durée reconnue.');
  return errs;
}

/* ── Préparation de la photo ──
   Redimensionne et recompresse avant l'envoi : sous la limite de corps de
   requête de Vercel, moins de jetons d'image, et extraction plus rapide.
   2000 px sur le grand côté garde un texte de recette parfaitement lisible. */
export function cnPrepareImage(file, maxEdge = 2000, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale), h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, w, h);
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      const base64 = dataUrl.slice(dataUrl.indexOf(',') + 1);
      resolve({ base64, mediaType: 'image/jpeg', preview: dataUrl, width: w, height: h });
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Image illisible.")); };
    img.src = url;
  });
}

export async function cnExtractRecipe(file) {
  const { base64, mediaType, preview } = await cnPrepareImage(file);
  const res = await fetch('/api/extract', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: base64, mediaType }),
  });
  let payload = null;
  try { payload = await res.json(); } catch (e) { /* réponse non JSON */ }
  if (!res.ok || !payload || !payload.recipe) {
    throw new Error((payload && payload.error) || "L'extraction a échoué. Réessayez.");
  }
  return { recipe: cnNormalizeRecipe(payload.recipe), preview, usage: payload.usage };
}
