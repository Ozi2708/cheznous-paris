import { CN_FOODS, CN_NUTRI_RULES, CN_PIECE_G, CN_UNIT_G } from './nutrition-data.js';

/* ── Calcul nutritionnel ──
   On somme les ingrédients depuis la table CIQUAL au lieu de demander au
   modèle de deviner quatre nombres. Déterministe, reproductible, et chaque
   valeur se trace jusqu'à l'aliment qui l'a produite.

   Convention du livre : quantités pour 2 personnes, valeurs crues. Il n'y a
   donc ni perte à la cuisson ni matière grasse absorbée à modéliser. */

const norm = (s) => String(s == null ? '' : s).toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/œ/g, 'oe').replace(/½/g, '0.5').replace(/¼/g, '0.25').replace(/¾/g, '0.75')
  .replace(/\((s|x|es)\)/g, '')
  .replace(/[^a-z0-9]+/g, ' ').trim();

/* Le motif doit commencer un mot : sans cette garde, « pignons » attrape
   « champignons » et un champignon de Paris devient du pignon de pin. */
function startsWord(hay, pat) {
  let i = 0;
  for (;;) {
    i = hay.indexOf(pat, i);
    if (i < 0) return false;
    if (i === 0 || !/[a-z0-9]/.test(hay[i - 1])) return true;
    i += 1;
  }
}

/* Retourne le code CIQUAL, `null` pour un apport nul (sel, poivre),
   ou `undefined` si l'ingrédient n'est pas au répertoire. */
export function cnFoodCode(name) {
  const k = norm(name);
  if (!k) return null;
  for (const [pat, code] of CN_NUTRI_RULES) if (startsWord(k, pat)) return code;
  return undefined;
}

/* Convertit une quantité en grammes. « 400 g » → 400 · « 1,5 » → 1,5 pièce
   du poids moyen de cet ingrédient · « 0,5 càc » → 2,5 g. */
export function cnGrams(q, name) {
  const s = norm(q).replace(/(\d) (\d)/g, '$1.$2');
  if (!s) return 0;
  const m = s.match(/^([\d.]+)\s*(.*)$/);
  if (!m) return null;
  const val = parseFloat(m[1]);
  if (!isFinite(val)) return null;
  const unit = m[2].trim();
  if (unit) {
    const hit = Object.keys(CN_UNIT_G).sort((a, b) => b.length - a.length).find(u => unit.startsWith(u));
    return hit ? val * CN_UNIT_G[hit] : null;
  }
  const k = norm(name);
  const piece = Object.keys(CN_PIECE_G).sort((a, b) => b.length - a.length).find(p => startsWord(k, p));
  return piece ? val * CN_PIECE_G[piece] : null;
}

/* Facteurs d'Atwater : 4 kcal/g pour protéines et glucides, 9 pour lipides. */
export const cnAtwater = (n) => 4 * n.proteines + 4 * n.glucides + 9 * n.lipides;

/* Une recette dont les calories ne collent pas à ses macros est fausse. On
   fait confiance aux macros — une table nutritionnelle les donne par
   ingrédient, les calories n'en sont qu'une conséquence. */
export function cnEnforceAtwater(n, tolerance = 0.08) {
  const target = cnAtwater(n);
  if (!target) return { ...n, kcal: Math.round(n.kcal || 0) };
  const drift = Math.abs((n.kcal || 0) - target) / target;
  return { ...n, kcal: Math.round(drift > tolerance ? target : (n.kcal || target)) };
}

/* Somme les ingrédients. `portions` = nombre de convives couverts par les
   quantités (2 dans le livre). Renvoie aussi le détail : sans lui, un chiffre
   faux serait indébogable. */
export function cnComputeNutrition(ingredients, portions = 2) {
  const total = { kcal: 0, proteines: 0, glucides: 0, lipides: 0 };
  const lines = [];
  let counted = 0, unmatched = 0;

  (ingredients || []).forEach(sec => (sec.items || []).forEach(it => {
    if (!it || !it.name || !it.name.trim()) return;
    const code = cnFoodCode(it.name);
    if (code === null) { lines.push({ name: it.name, grams: 0, kcal: 0, status: 'nul' }); return; }
    if (code === undefined || !CN_FOODS[code]) { unmatched++; lines.push({ name: it.name, status: 'inconnu' }); return; }
    const g = cnGrams(it.q, it.name);
    if (g == null) { unmatched++; lines.push({ name: it.name, status: 'quantite illisible' }); return; }

    const [nom, kcal, p, gl, l] = CN_FOODS[code];
    const f = g / 100;
    total.kcal += kcal * f; total.proteines += p * f; total.glucides += gl * f; total.lipides += l * f;
    counted++;
    lines.push({ name: it.name, ciqual: nom, grams: Math.round(g), kcal: Math.round(kcal * f), status: 'ok' });
  }));

  const per = (v) => Math.round(v / Math.max(1, portions));
  const nutrition = cnEnforceAtwater({
    kcal: per(total.kcal), proteines: per(total.proteines),
    glucides: per(total.glucides), lipides: per(total.lipides),
  });

  return {
    nutrition, lines, counted, unmatched,
    /* En dessous des deux tiers d'ingrédients reconnus, le total ne veut plus
       rien dire : mieux vaut garder l'estimation du modèle. */
    reliable: counted > 0 && counted / (counted + unmatched) >= 0.67,
  };
}
