/* ── Le Panier — moteur ──
   Trois états persistés (et synchronisés entre les téléphones du foyer) :
     courses   { prefs, custom }  préférences produit + produits ajoutés par vous
     purchases { [id]: [jours] }  historique d'achats, en numéros de jour
     cart      { items, checked, skipped }  la liste en cours
   Les ingrédients des recettes ne sont jamais stockés : ils sont recalculés
   depuis la semaine, donc toujours à jour. */

import { cnShoppingList, cnCleanName, cnIngKey } from './utils.js';
import { CN_SEED_PRODUCTS, CN_RAYONS, cnRayon, cnProdNorm, cnIsJunkIngredient } from './courses-data.js';

export const CN_COURSES_EMPTY = { prefs: {}, custom: [] };
export const CN_CART_EMPTY = { items: [], checked: [], skipped: [] };

export const cnToday = () => Math.floor(Date.now() / 86400000);
export function cnDayLabel(days) {
  if (days == null) return '';
  if (days === 0) return "aujourd'hui";
  if (days === 1) return 'hier';
  if (days < 21) return `il y a ${days} j`;
  if (days < 60) return `il y a ${Math.round(days / 7)} semaines`;
  const m = Math.round(days / 30);
  return m === 1 ? 'il y a 1 mois' : `il y a ${m} mois`;
}

/* Catalogue effectif = graines + vos produits, moins ceux supprimés, avec vos réglages. */
export function cnProducts(courses) {
  const c = courses || CN_COURSES_EMPTY;
  const prefs = c.prefs || {};
  const all = [...CN_SEED_PRODUCTS, ...(c.custom || [])];
  return all
    .filter(p => !(prefs[p.id] || {}).removed)
    .map(p => ({ ...p, ...(prefs[p.id] || {}), id: p.id, name: p.name, rayon: p.rayon }));
}
export function cnProductMap(courses) {
  return Object.fromEntries(cnProducts(courses).map(p => [p.id, p]));
}

/* ── Rythme d'achat ──
   0 écart observé  → valeur par défaut du produit
   1 écart          → moitié observé / moitié défaut (on ne s'emballe pas)
   2 écarts et plus → médiane (résiste aux courses exceptionnelles)
   Les écarts de moins de 2 jours sont ignorés : c'est une double saisie. */
export function cnRhythm(product, purchases) {
  const hist = ((purchases || {})[product.id] || []).slice().sort((a, b) => a - b);
  const gaps = [];
  for (let i = 1; i < hist.length; i++) { const g = hist[i] - hist[i - 1]; if (g >= 2) gaps.push(g); }
  const seed = product.days || 30;
  const stretch = product.stretch || 1;
  let days = seed, source = 'defaut';
  if (product.userDays) { days = product.userDays; source = 'manuel'; }
  else if (gaps.length === 1) { days = Math.round((gaps[0] + seed) / 2); source = 'estime'; }
  else if (gaps.length >= 1) {
    const s = gaps.slice().sort((a, b) => a - b), mid = Math.floor(s.length / 2);
    days = s.length % 2 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2);
    source = gaps.length >= 4 ? 'fiable' : 'appris';
  }
  if (source !== 'manuel') days = Math.max(2, Math.round(days * stretch));
  return { days, source, gaps: gaps.length, buys: hist.length, last: hist.length ? hist[hist.length - 1] : null };
}

export const CN_RHYTHM_LABEL = {
  defaut: 'estimation de départ', estime: 'estimé', appris: 'appris', fiable: 'rythme fiable', manuel: 'réglé par vous',
};

/* Urgence d'un produit. `ratio` = temps écoulé ÷ intervalle.
   `level` : null (rien à dire) · 'bientot' · 'racheter' · 'retard' · 'jamais'. */
export function cnStatus(product, purchases) {
  const r = cnRhythm(product, purchases);
  const today = cnToday();
  if (product.paused) return { ...r, level: 'pause', ratio: -1 };
  if (product.snoozeUntil && product.snoozeUntil > today) return { ...r, level: null, ratio: -1, snoozed: true };
  if (r.last == null) return { ...r, level: 'jamais', ratio: -1, since: null };
  const since = today - r.last;
  const ratio = since / r.days;
  const level = ratio >= 1.3 ? 'retard' : ratio >= 1 ? 'racheter' : ratio >= 0.7 ? 'bientot' : null;
  return { ...r, since, ratio, level };
}

export const CN_LEVEL_META = {
  retard:   { label: 'en retard',  color: '#B85C38', soft: '#FBEDE7' },
  racheter: { label: 'à racheter', color: '#8A6B4A', soft: '#F9F1E7' },
  bientot:  { label: 'bientôt',    color: '#8C8780', soft: '#F1EFEB' },
  jamais:   { label: 'jamais acheté', color: '#8C8780', soft: '#F1EFEB' },
};

/* Phrase d'explication — aucune suggestion sans sa raison. */
export function cnWhy(product, purchases) {
  const s = cnStatus(product, purchases);
  if (s.level === 'jamais') return 'Jamais acheté depuis l’app';
  if (s.last == null) return '';
  return `Tous les ~${s.days} j · dernier achat ${cnDayLabel(s.since)}`;
}

/* ── Ce que réclament les recettes de la semaine ──
   Seuls les « À Acheter » entrent d'office dans la liste ; le placard et les
   épices restent proposés à part, à cocher seulement si le stock est vide. */
export function cnRecipeNeeds(recipes) {
  const groups = cnShoppingList(recipes || []);
  const mk = (e) => ({
    key: 'rec:' + e.key, ingKey: e.key, name: cnCleanName(e.name), qty: e.total || '',
    rayon: cnRayon(e.name), src: 'recette', count: e.count,
  });
  const clean = (list) => (list || []).filter(e => !cnIsJunkIngredient(e.name)).map(mk);
  return {
    buy: clean(groups['À Acheter']),
    pantry: [...clean(groups['Placard']), ...clean(groups['Épices'])].map(l => ({ ...l, key: 'pan:' + l.ingKey, src: 'placard' })),
  };
}

/* ── Lignes de la liste, prêtes à afficher ──
   Fusionne recettes + produits + ajouts libres, puis regroupe par rayon.
   Un produit du catalogue qui désigne le même ingrédient qu'une recette est
   fusionné dans la même ligne : on ne veut pas « Œufs » deux fois. */
export function cnCartLines(cart, recipes, courses, purchases) {
  const c = cart || CN_CART_EMPTY;
  const skipped = new Set(c.skipped || []);
  const pmap = cnProductMap(courses);
  const lines = [];
  const byIng = {};

  const add = (line) => {
    const k = cnIngKey(line.name);
    const prev = byIng[k];
    if (prev) {
      if (line.pid && !prev.pid) prev.pid = line.pid;
      if (line.qty && !prev.qty) prev.qty = line.qty;
      if (!prev.srcs.includes(line.src)) prev.srcs.push(line.src);
      return;
    }
    const l = { ...line, srcs: [line.src] };
    byIng[k] = l;
    lines.push(l);
  };

  cnRecipeNeeds(recipes).buy.forEach(l => { if (!skipped.has(l.key)) add(l); });
  (c.items || []).forEach(it => {
    if (skipped.has(it.key)) return;
    const p = it.pid ? pmap[it.pid] : null;
    add({ ...it, name: p ? p.name : it.name, rayon: p ? p.rayon : (it.rayon || cnRayon(it.name)) });
  });

  const checked = new Set(c.checked || []);
  lines.forEach(l => { l.done = checked.has(l.key); });

  const groups = CN_RAYONS.map(r => ({ ...r, lines: lines.filter(l => l.rayon === r.id) })).filter(g => g.lines.length);
  return { groups, lines, total: lines.length, done: lines.filter(l => l.done).length };
}

/* Texte copié : la liste entière, rayon par rayon. */
export function cnCartCopyText(groups) {
  const out = [];
  groups.forEach(g => {
    out.push(`— ${g.label} —`);
    g.lines.forEach(l => out.push(`${l.qty ? l.qty + ' ' : ''}${l.name}`));
    out.push('');
  });
  return out.join('\n').trim();
}

/* ── Validation d'une sortie courses ──
   Le geste unique qui nourrit l'apprentissage : tout ce qui est coché est
   enregistré comme acheté aujourd'hui. Les ajouts libres deviennent des
   produits à part entière — c'est ainsi que l'app apprend vos habitudes. */
export function cnFinishTrip({ cart, recipes, courses, purchases }) {
  const today = cnToday();
  const { lines } = cnCartLines(cart, recipes, courses, purchases);
  const doneLines = lines.filter(l => l.done);
  const nextPurch = { ...(purchases || {}) };
  const nextCourses = { prefs: { ...(courses || CN_COURSES_EMPTY).prefs }, custom: [...((courses || CN_COURSES_EMPTY).custom || [])] };
  const known = new Set(cnProducts(nextCourses).map(p => cnProdNorm(p.name)));

  const log = (id) => {
    const arr = (nextPurch[id] || []).filter(d => d !== today);
    nextPurch[id] = [...arr, today].slice(-12);
    const pf = { ...(nextCourses.prefs[id] || {}) };
    delete pf.snoozeUntil; delete pf.stretch;      // un achat réel remet les compteurs à zéro
    nextCourses.prefs[id] = pf;
  };

  doneLines.forEach(l => {
    if (l.pid) { log(l.pid); return; }
    if (l.src === 'recette' || l.src === 'placard') return;   // piloté par les recettes, pas par un rythme
    const norm = cnProdNorm(l.name);
    if (known.has(norm)) {
      const p = cnProducts(nextCourses).find(x => cnProdNorm(x.name) === norm);
      if (p) log(p.id);
      return;
    }
    const id = 'u-' + norm.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Math.random().toString(36).slice(2, 5);
    nextCourses.custom.push({ id, name: l.name, rayon: l.rayon || cnRayon(l.name), days: null });
    known.add(norm);
    log(id);
  });

  const doneKeys = new Set(doneLines.map(l => l.key));
  return {
    purchases: nextPurch,
    courses: nextCourses,
    cart: { items: (cart.items || []).filter(it => !doneKeys.has(it.key)), checked: [], skipped: [] },
    count: doneLines.length,
  };
}

/* « J'en ai encore » : repousse l'échéance et allonge un peu le rythme,
   sans écraser l'historique (plafonné à ×2 pour rester récupérable). */
export function cnSnooze(courses, purchases, id) {
  const p = cnProductMap(courses)[id];
  if (!p) return courses;
  const r = cnRhythm(p, purchases);
  const prefs = { ...(courses.prefs || {}) };
  const cur = prefs[id] || {};
  prefs[id] = {
    ...cur,
    stretch: Math.min(2, (cur.stretch || 1) * 1.15),
    snoozeUntil: cnToday() + Math.max(2, Math.round(r.days * 0.3)),
  };
  return { ...courses, prefs };
}
