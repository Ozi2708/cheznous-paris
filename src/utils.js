import { ingredientTokens } from './helpers.jsx';
import { parseQty, fmtNum } from './helpers.jsx';

/* ── Filter utilities (originally from screen-library.jsx) ── */
export const CN_DIET_FILTERS = ['Végétarien', 'Végan', 'Sans gluten', 'Sans lactose', 'Sans œuf', 'Sans fruits à coque', 'Rapide', 'Cuisine du monde', 'Gourmande'];

export function cnNorm(s) { return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }

export function cnApplyFilters(recipes, f) {
  return recipes.filter(r => {
    if (f.chapter && r.chapter !== f.chapter) return false;
    if (f.q && !cnNorm(r.title + ' ' + r.typeBadges.join(' ') + ' ' + r.ingredients.map(s => s.items.map(i => i.name).join(' ')).join(' ')).includes(cnNorm(f.q))) return false;
    if (f.diet.length) {
      const tags = new Set([...r.dietTags, ...(r.isVeggie ? ['Végétarien'] : []), ...(r.isVegan ? ['Végan'] : [])]);
      if (!f.diet.every(d => tags.has(d))) return false;
    }
    if (f.types.length && !f.types.some(t => r.typeBadges.some(b => cnNorm(b).includes(cnNorm(t))))) return false;
    if (f.maxTime && r.totalMin > f.maxTime) return false;
    if (f.maxKcal < 900 && r.nutrition.kcal > f.maxKcal) return false;
    if (f.minProt > 0 && r.nutrition.proteines < f.minProt) return false;
    return true;
  });
}
export const CN_EMPTY_FILTERS = { q: '', chapter: null, diet: [], types: [], maxTime: null, maxKcal: 900, minProt: 0 };
export function cnCountActive(f) {
  return f.diet.length + f.types.length + (f.maxTime ? 1 : 0) + (f.maxKcal < 900 ? 1 : 0) + (f.minProt > 0 ? 1 : 0);
}

/* ── Week utilities (originally from screen-week.jsx) ── */
export const CN_DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
export const CN_SLOTS = [{ id: 'midi', label: 'Midi' }, { id: 'soir', label: 'Soir' }];

export function cnNextFreeSlot(week) {
  const todayIdx = (new Date().getDay() + 6) % 7;
  for (let off = 0; off < 7; off++) {
    const day = CN_DAYS[(todayIdx + off) % 7];
    for (const slot of ['midi', 'soir']) {
      const key = day + '-' + slot;
      if (!week[key]) return { key, label: day.toLowerCase() + ' ' + slot };
    }
  }
  return null;
}

/* ── Cook theme (originally from screen-cook.jsx) ── */
export function cnCookTheme(mode) {
  if (mode === 'creme') return {
    bg: '#FAFAF8', text: '#1A1918', muted: '#8C8780', faint: '#B8B3AA',
    accent: '#506741', strong: '#506741', line: '#E4DDD2',
    card: '#FFFFFF', cardBd: '#E4DDD2', btnBg: '#506741', btnFg: '#FFFFFF',
    ghostBd: '#D5CEBE', ghostFg: '#3C3830', seg: '#E4DDD2', segOn: '#506741',
  };
  return {
    bg: '#2C3C22', text: '#FAFAF8', muted: 'rgba(250,250,248,.62)', faint: 'rgba(250,250,248,.4)',
    accent: '#DCBE98', strong: '#DCBE98', line: 'rgba(250,250,248,.16)',
    card: 'rgba(250,250,248,.07)', cardBd: 'rgba(250,250,248,.16)', btnBg: '#FAFAF8', btnFg: '#2C3C22',
    ghostBd: 'rgba(250,250,248,.3)', ghostFg: '#FAFAF8', seg: 'rgba(250,250,248,.2)', segOn: '#DCBE98',
  };
}

/* ── Batch cooking utilities (originally from screen-batch-main.jsx) ── */
export const CN_BATCH_COLORS = ['#506741', '#8A6B4A', '#2E8B85', '#5C6FAE', '#E07534'];

export function cnConservation(r) {
  const tip = (r.footerTips || []).find(t => t.label === 'Conservation');
  const text = tip ? tip.text : '';
  const dm = text.match(/(\d+)\s*(?:à\s*(\d+)\s*)?jours/i);
  const frigo = dm ? +(dm[2] || dm[1]) : null;
  const congel = /cong[ée]l/i.test(text);
  return { text, frigo, congel, ok: !!tip };
}

export function cnStepType(html) {
  const plain = html.replace(/<[^>]+>/g, '').toLowerCase();
  if (/préchauff|au four|enfournez/.test(plain)) return 'four';
  if (/mijot|laissez cuire|cuire\s+\d|faites cuire|riz|pâtes|égoutt|repos/.test(plain)) return 'passif';
  return 'actif';
}

export function cnBuildPlan(recipes) {
  const ordered = [...recipes].sort((a, b) => b.cookMin - a.cookMin);
  const queues = ordered.map((r, idx) => ({
    r, color: CN_BATCH_COLORS[idx % CN_BATCH_COLORS.length],
    steps: r.steps.map((s, i) => ({ html: s, i, type: cnStepType(s) })),
  }));
  const plan = [];
  let moved = true;
  while (moved) {
    moved = false;
    queues.forEach(q => {
      while (q.steps.length) {
        const st = q.steps.shift();
        plan.push({ recipe: q.r, color: q.color, html: st.html, stepIdx: st.i, type: st.type });
        moved = true;
        if (st.type !== 'actif') break;
      }
    });
  }
  return { plan, ordered, colors: Object.fromEntries(queues.map(q => [q.r.id, q.color])) };
}

export function cnSessionMinutes(recipes) {
  if (!recipes.length) return 0;
  return Math.max(...recipes.map(r => r.cookMin || 0)) + recipes.reduce((s, r) => s + (r.prepMin || 0), 0) + 5 * (recipes.length - 1);
}

export function cnFmtDuration(min) {
  const h = Math.floor(min / 60), m = min % 60;
  return h > 0 ? `${h}h${m > 0 ? String(m).padStart(2, '0') : ''}` : `${m} min`;
}

export function cnBatchList(recipes) {
  return recipes
    .filter(r => { const c = cnConservation(r); return c.frigo != null && c.frigo >= 3; })
    .sort((a, b) => cnConservation(b).frigo - cnConservation(a).frigo || a.totalMin - b.totalMin);
}

export function cnMenuIdeas(list) {
  const variee = [];
  const usedCh = new Set();
  list.forEach(r => { if (variee.length < 3 && !usedCh.has(r.chapter)) { variee.push(r); usedCh.add(r.chapter); } });
  list.forEach(r => { if (variee.length < 3 && !variee.includes(r)) variee.push(r); });
  const express = [...list].sort((a, b) => a.totalMin - b.totalMin).slice(0, 3);
  const protein = [...list].sort((a, b) => b.nutrition.proteines - a.nutrition.proteines).slice(0, 3);
  const legere = [...list].sort((a, b) => a.nutrition.kcal - b.nutrition.kcal).slice(0, 3);
  const vege = list.filter(r => r.isVeggie).slice(0, 3);
  const menus = [
    { id: 'variee', title: 'La variée', desc: 'Trois ambiances, zéro lassitude', icon: 'dice', recipes: variee },
    { id: 'express', title: 'L’express', desc: 'La session la plus courte', icon: 'bolt', recipes: express },
    { id: 'proteinee', title: 'La protéinée', desc: 'Pour les grosses semaines de sport', icon: 'flame', recipes: protein },
    { id: 'legere', title: 'La légère', desc: 'Les plus douces en calories', icon: 'leaf', recipes: legere },
    { id: 'vege', title: 'La végé', desc: 'Sans viande, tout en goût', icon: 'leaf', recipes: vege },
  ];
  return menus.filter(m => m.recipes.length === 3);
}

export const CN_EQUIPMENT = [
  { id: 'four', label: 'Four', re: /préchauff|four|enfournez/i },
  { id: 'poele', label: 'Poêle', re: /poêle/i },
  { id: 'casserole', label: 'Casserole', re: /casserole|ébullition|bouillir/i },
  { id: 'mixeur', label: 'Mixeur', re: /mixe[rz]|mixeur|blender|purée/i },
  { id: 'saladier', label: 'Saladier', re: /saladier|grand bol/i },
];
export function cnEquipment(recipes) {
  const all = recipes.flatMap(r => r.steps).join(' ').replace(/<[^>]+>/g, ' ');
  return CN_EQUIPMENT.filter(e => e.re.test(all)).map(e => e.label);
}

export function cnIngKey(name) {
  return (name || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\(s\)/g, '').trim().replace(/s$/, '');
}
export const CN_STAPLES = ['sel', 'poivre'];
export function cnConsolidate(selected) {
  const map = {};
  selected.forEach(r => r.ingredients.forEach(sec => sec.items.forEach(it => {
    const k = cnIngKey(it.name);
    if (!map[k]) map[k] = { key: k, name: it.name, section: sec.section, uses: [] };
    map[k].uses.push({ recipe: r, q: it.q });
  })));
  return Object.values(map).map(e => {
    const qs = e.uses.map(u => parseQty(u.q));
    const sameUnit = qs.every(q => q.n != null && q.unit === qs[0].unit);
    e.total = sameUnit ? fmtNum(qs.reduce((s, q) => s + q.n, 0)) + (qs[0].unit ? ' ' + qs[0].unit : '') : null;
    e.staple = CN_STAPLES.includes(e.key);
    return e;
  }).sort((a, b) => b.uses.length - a.uses.length);
}

export function cnSynergies(selected) {
  const cons = cnConsolidate(selected);
  const shared = cons.filter(c => c.uses.length > 1 && !c.staple);
  const reasons = [];
  if (shared.length >= 2) {
    const names = shared.slice(0, 3).map(s => s.name.split(',')[0].replace(/\(s\)/g, '').trim().toLowerCase()).join(', ');
    reasons.push({ icon: 'leaf', text: `${shared.length} ingrédients servent plusieurs plats (${names}…) — on sort, lave et coupe une seule fois.` });
  } else if (shared.length === 1) {
    reasons.push({ icon: 'leaf', text: `${shared[0].name} sert à ${shared[0].uses.length} plats — préparez tout d'un coup.` });
  }
  const oven = selected.filter(r => r.steps.some(s => cnStepType(s) === 'four'));
  if (oven.length >= 2) reasons.push({ icon: 'flame', text: `Le four enchaîne ${oven.length} plats sans refroidir — une seule montée en température.` });
  const maxCook = Math.max(...selected.map(r => r.cookMin || 0));
  const gain = selected.reduce((s, r) => s + (r.cookMin || 0), 0) - maxCook - 5 * (selected.length - 1);
  if (gain > 5) reasons.push({ icon: 'clock', text: `Les cuissons passives recouvrent la préparation des autres plats : ~${gain} min gagnées vs cuisiner séparément.` });
  const frigos = selected.map(r => cnConservation(r).frigo || 2);
  if (Math.max(...frigos) - Math.min(...frigos) >= 1) reasons.push({ icon: 'snow', text: `Les conservations s'échelonnent (${Math.min(...frigos)} à ${Math.max(...frigos)} jours) — la semaine est couverte sans gâchis.` });
  return reasons.slice(0, 3);
}

export const CN_B_DAYS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
export const CN_B_DAYS_FULL = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

/* ── Générateur de menu de la semaine ──
   Objectifs combinés : équilibre entre chapitres (jamais « que du low-carb »)
   + cohérence des ingrédients frais (mutualiser les courses, éviter le gâchis). */
export const CN_MAIN_CHAPTERS = ['Low-Carb', 'High-Carb', 'Post Training'];

/* Clés des ingrédients frais (section « À Acheter ») d'une recette — base du score de partage. */
function cnFreshKeys(r) {
  const s = new Set();
  (r.ingredients || []).forEach(sec => {
    if (sec.section === 'À Acheter') sec.items.forEach(it => s.add(cnIngKey(it.name)));
  });
  return s;
}

/* Nombre d'ingrédients frais partagés entre une recette et un ensemble de clés déjà retenues. */
function cnOverlap(chosenKeys, r) {
  let n = 0;
  cnFreshKeys(r).forEach(k => { if (chosenKeys.has(k)) n++; });
  return n;
}

/* Choisit la meilleure recette : score = partage d'ingrédients ×2 + aléatoire,
   puis tirage parmi le top 3 pour varier à chaque relance. */
function cnPickBest(cands, chosenKeys) {
  if (!cands.length) return null;
  const scored = cands.map(r => ({ r, s: cnOverlap(chosenKeys, r) * 2 + Math.random() }));
  scored.sort((a, b) => b.s - a.s);
  const top = scored.slice(0, Math.min(3, scored.length));
  return top[Math.floor(Math.random() * top.length)].r;
}

/* Séquence de chapitres en round-robin pour garantir la diversité. */
function cnChapterSequence(pool, count) {
  const present = CN_MAIN_CHAPTERS.filter(c => pool.some(r => r.chapter === c));
  if (!present.length) return [];
  const seq = [];
  for (let i = 0; i < count; i++) seq.push(present[i % present.length]);
  return seq;
}

/* Génère un menu de `count` recettes, équilibré et cohérent. */
export function cnGenerateMenu(recipes, count, opts = {}) {
  const exclude = new Set(opts.exclude || []);
  const pool = recipes.filter(r => CN_MAIN_CHAPTERS.includes(r.chapter) && !exclude.has(r.id));
  const seq = cnChapterSequence(pool, count);
  const chosen = [];
  const chosenKeys = new Set();
  const usedIds = new Set();
  for (const ch of seq) {
    let cands = pool.filter(r => r.chapter === ch && !usedIds.has(r.id));
    if (!cands.length) cands = pool.filter(r => !usedIds.has(r.id));
    const pick = cnPickBest(cands, chosenKeys);
    if (!pick) break;
    chosen.push(pick);
    usedIds.add(pick.id);
    cnFreshKeys(pick).forEach(k => chosenKeys.add(k));
  }
  return chosen;
}

/* Relance une seule recette du menu : garde son chapitre (préserve l'équilibre),
   maximise le partage avec les recettes conservées, évite les doublons. */
export function cnRerollMenuItem(recipes, selected, index) {
  const replaced = selected[index];
  if (!replaced) return replaced;
  const keep = selected.filter((_, i) => i !== index);
  const keepIds = new Set(keep.map(r => r.id));
  const keepKeys = new Set();
  keep.forEach(r => cnFreshKeys(r).forEach(k => keepKeys.add(k)));
  let cands = recipes.filter(r => r.chapter === replaced.chapter && !keepIds.has(r.id) && r.id !== replaced.id);
  if (!cands.length) cands = recipes.filter(r => CN_MAIN_CHAPTERS.includes(r.chapter) && !keepIds.has(r.id) && r.id !== replaced.id);
  return cnPickBest(cands, keepKeys) || replaced;
}

/* ── Liste de courses de la semaine ──
   Consolide les ingrédients de tous les plats, additionne les quantités par unité,
   et ordonne les sections : À Acheter (courses) → Placard → Épices (déjà au placard). */
export const CN_SHOP_SECTIONS = ['À Acheter', 'Placard', 'Épices'];

/* Vrais fonds de placard : on ne les rachète pas à chaque recette (huiles,
   vinaigres, sauces de fond, sucre/farine, bouillon…). Le reste des items
   « Placard » des données (pâtes, riz, coulis de tomate, fromages, crèmes,
   laits, tortillas…) est en réalité à acheter → on le bascule en « À Acheter ». */
const CN_PANTRY_STAPLES = [
  'huile', 'vinaigre', 'sauce soja', 'tamari', 'nuoc', 'sriracha', 'sauce poisson', 'sauce chili',
  'moutarde', 'mayonnaise', 'ketchup', 'miel', 'sucre', 'farine', 'fecule', 'maizena', 'levure',
  'chapelure', 'bouillon', 'tahini', 'laurier', "poudre d'amande", 'graines de sesame', 'graines de chia',
];
/* Épices rangées par erreur en « Placard » dans les données. */
const CN_PLACARD_SPICES = [
  'epice', 'curry', 'cumin', 'paprika', 'curcuma', 'cannelle', 'massala', 'zaatar', 'origan', 'herbes de provence', 'gingembre',
];
export function cnRemapSection(name, section) {
  if (section === 'À Acheter') return 'À Acheter';
  if (section === 'Épices') return 'Épices';
  const n = cnNorm(name);
  if (CN_PANTRY_STAPLES.some(k => n.includes(k))) return 'Placard';
  if (CN_PLACARD_SPICES.some(k => n.includes(k))) return 'Épices';
  return 'À Acheter';
}

export function cnShoppingList(recipes) {
  const secOrder = { 'À Acheter': 0, 'Placard': 1, 'Épices': 2 };
  const map = {};
  recipes.forEach(r => (r.ingredients || []).forEach(sec => sec.items.forEach(it => {
    if (!it.name || !it.name.trim()) return;   // ignore les items sans nom (artefact de données)
    const k = cnIngKey(it.name);
    if (!map[k]) map[k] = { key: k, name: it.name, section: sec.section, uses: [] };
    if ((secOrder[sec.section] ?? 0) < (secOrder[map[k].section] ?? 0)) map[k].section = sec.section;
    map[k].uses.push({ id: r.id, title: r.title, q: it.q });
  })));
  const entries = Object.values(map).map(e => {
    const byUnit = {};
    e.uses.forEach(u => {
      const { n, unit } = parseQty(u.q);
      if (n == null && !unit) return;            // sel / poivre sans quantité
      const key = unit || '';
      if (n != null) byUnit[key] = (byUnit[key] || 0) + n;
      else if (!(key in byUnit)) byUnit[key] = null;
    });
    const parts = Object.entries(byUnit).map(([unit, n]) =>
      n != null ? `${fmtNum(n)}${unit ? ' ' + unit : ''}` : unit).filter(Boolean);
    e.total = parts.join(' + ');
    e.count = e.uses.length;
    return e;
  });
  const groups = { 'À Acheter': [], 'Placard': [], 'Épices': [] };
  entries.forEach(e => { const sec = cnRemapSection(e.name, e.section); (groups[sec] || groups['À Acheter']).push(e); });
  Object.values(groups).forEach(g => g.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)));
  return groups;
}

/* Nettoie un nom d'ingrédient pour le presse-papier (ex : « carotte(s) » → « carottes »). */
export function cnCleanName(name) {
  return (name || '').replace(/\(s\)/g, 's').replace(/\s+/g, ' ').trim();
}

/* Texte à copier : tous les « À Acheter », plus les items du Placard et des
   Épices que l'utilisateur a cochés (ceux qu'il faut racheter cette fois). */
export function cnShoppingCopyText(groups, checked) {
  const line = (e) => `${e.total ? e.total + ' ' : ''}${cnCleanName(e.name)}`;
  const lines = [];
  (groups['À Acheter'] || []).forEach(e => lines.push(line(e)));
  ['Placard', 'Épices'].forEach(sec => (groups[sec] || []).forEach(e => {
    if (checked && checked.has(e.key)) lines.push(line(e));
  }));
  return lines.join('\n');
}
