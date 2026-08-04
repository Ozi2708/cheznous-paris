/* ── Le Panier — moteur ──
   Trois états persistés (et synchronisés entre les téléphones du foyer) :
     courses   { prefs, custom }  préférences produit + produits ajoutés par vous
     purchases { [id]: [jours] }  historique d'achats, en numéros de jour
     cart      { items, checked, skipped }  la liste en cours
   Les ingrédients des recettes ne sont jamais stockés : ils sont recalculés
   depuis la semaine, donc toujours à jour. */

import { cnShoppingList, cnCleanName, cnIngKey } from './utils.js';
import { CN_SEED_PRODUCTS, CN_RAYONS, cnRayon, cnProdNorm, cnIsJunkIngredient, cnUnitFor,
  cnBuyQty, cnBuyName, cnPriceFor, cnFormatEuro, cnRayonOrNull, cnDriveLine } from './courses-data.js';

export const CN_COURSES_EMPTY = { prefs: {}, custom: [] };
/* `qty` : quantités que vous avez ajustées à la main, par clé de ligne. Elles
   survivent au recalcul des recettes — si la semaine change, votre « 8 bananes »
   reste, et l'app sait toujours combien les recettes en demandaient. */
export const CN_CART_EMPTY = { items: [], checked: [], skipped: [], qty: {} };

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
  /* Le rayon se déduit du nom d'origine (« lentilles vertes cuites »), le nom
     affiché est celui qu'on cherchera au drive (« Lentilles vertes »). */
  const mk = (e) => ({
    key: 'rec:' + e.key, ingKey: e.key, name: cnBuyName(cnCleanName(e.name)), qty: e.total || '',
    rayon: cnRayon(e.name), src: 'recette', count: e.count,
    /* De quels plats vient cet ingrédient, et combien chacun en demande —
       pour pouvoir remonter à la recette depuis la liste de courses. */
    uses: e.uses,
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
      if (line.prefQty && !prev.prefQty) prev.prefQty = line.prefQty;
      if (line.exact && !prev.exact) prev.exact = line.exact;
      if (line.price != null && prev.price == null) prev.price = line.price;
      if (line.uses) prev.uses = [...(prev.uses || []), ...line.uses];
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
    add({
      ...it, name: p ? p.name : it.name, rayon: p ? p.rayon : (it.rayon || cnRayon(it.name)),
      prefQty: p ? p.qty : undefined, exact: p ? p.exact : undefined,
      price: p ? p.price : undefined,
    });
  });

  const checked = new Set(c.checked || []);
  const over = c.qty || {};
  lines.forEach(l => {
    l.done = checked.has(l.key);
    l.needQty = l.qty || '';                       // ce que réclament les recettes, mot pour mot
    const u = cnUnitFor(l.name, l.rayon);          // comment ce produit se compte
    l.unit = u.unit; l.step = u.step;
    /* La quantité proposée est celle qu'on peut commander : 204 ml de lait de
       soja deviennent 1 L, 2 gousses deviennent 1 tête. Votre quantité
       habituelle, si vous en avez mémorisé une, passe avant tout le reste. */
    l.buyQty = l.prefQty || cnBuyQty(l.name, l.rayon, l.needQty);
    l.qty = over[l.key] != null ? over[l.key] : l.buyQty;
    l.edited = over[l.key] != null;
    /* Vrai dès que ce qu'on commande ne se lit pas comme ce qu'on cuisine. */
    l.converted = !!l.needQty && l.needQty !== l.qty;
    l.euros = cnPriceFor(l.name, l.rayon, l.price);
  });

  const groups = CN_RAYONS.map(r => ({ ...r, lines: lines.filter(l => l.rayon === r.id) }))
    .filter(g => g.lines.length)
    .map(g => ({ ...g, done: g.lines.every(l => l.done) }));
  const open = lines.filter(l => !l.done);
  return {
    groups, lines, total: lines.length, done: lines.filter(l => l.done).length,
    /* Le budget porte sur ce qui reste à acheter — c'est le chiffre qui aide
       à décider, pas le total de ce qu'on a déjà pris. */
    euros: open.reduce((s, l) => s + l.euros, 0),
    eurosLabel: cnFormatEuro(open.reduce((s, l) => s + l.euros, 0)),
  };
}

/* ── Texte copié, destiné à être collé dans un drive ──
   On n'écrit que ce qui reste à acheter : ce qui est coché est déjà pris.
   Quand vous avez mémorisé la référence exacte d'un produit, c'est elle qu'on
   écrit — l'assistant du drive n'a plus à deviner la marque à votre place. */
export function cnCartCopyText(groups) {
  const out = [];
  groups.forEach(g => {
    const lines = g.lines.filter(l => !l.done);
    if (!lines.length) return;
    out.push(`— ${g.label} —`);
    lines.forEach(l => out.push(`${l.qty ? l.qty + ' ' : ''}${l.exact || l.name}`));
    out.push('');
  });
  return out.join('\n').trim();
}

/* ── Ce qu'on colle dans l'assistant du drive ──
   Depuis mars 2026, Carrefour est une application de ChatGPT : on lui donne
   une liste, il remplit le panier. Ce qu'on colle n'est donc pas un pense-bête,
   c'est une consigne — et sa forme décide de ce qui atterrit dans le panier.

   D'où : pas de titres de rayon (un assistant les prendrait pour des articles),
   un produit par ligne, une quantité déjà traduite en format vendu, et deux
   phrases d'entrée qui disent quoi faire et comment arbitrer. */
export function cnCartDriveText(groups) {
  const items = [];
  groups.forEach(g => g.lines.forEach(l => { if (!l.done) items.push(cnDriveLine(l)); }));
  if (!items.length) return '';
  /* Ces trois règles viennent d'une commande réelle : « prends le plus proche
     au-dessus » faisait acheter deux paquets de pavés pour 400 g, trois
     sachets de fromage pour 200 g, et remplaçait des pousses de salade par
     des pousses d'épinard sans le dire. */
  return [
    'Ajoute ces produits à mon panier Carrefour Drive.',
    '',
    "1. Un seul article par ligne, sauf si un seul ne couvre pas la quantité demandée.",
    "2. Prends le conditionnement le plus proche de la quantité, sans la dépasser de plus d'un format.",
    "3. Ne remplace jamais par une autre variété ou un autre produit : si tu ne trouves pas, signale-le au lieu de choisir à ma place.",
    '',
    ...items.map(t => '- ' + t),
  ].join('\n');
}

/* ── Chercher dans ce qu'on suit déjà ──
   Avant de créer « papier toilette » pour la troisième fois sous trois
   orthographes, on montre ce qui existe. Ce qui commence par ce que vous
   tapez remonte en premier, le reste suit. */
export function cnSearchProducts(courses, q, limit = 6) {
  const n = cnProdNorm(q);
  if (!n) return [];
  const scored = [];
  cnProducts(courses).forEach(p => {
    const pn = cnProdNorm(p.name);
    /* 0 = le nom commence par la saisie · 1 = un mot commence par elle ·
       2 = elle apparaît quelque part dedans */
    const rank = pn.startsWith(n) ? 0 : new RegExp(`\\b${n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(pn) ? 1 : pn.includes(n) ? 2 : -1;
    if (rank >= 0) scored.push({ p, rank });
  });
  scored.sort((a, b) => a.rank - b.rank || a.p.name.localeCompare(b.p.name));
  return scored.slice(0, limit).map(s => s.p);
}

/* Le nom saisi désigne-t-il déjà un produit suivi ? Sert à ne proposer la
   création que lorsqu'elle est vraiment nécessaire. */
export function cnFindProduct(courses, name) {
  const n = cnProdNorm(name);
  return cnProducts(courses).find(p => cnProdNorm(p.name) === n) || null;
}

/* Crée un produit suivi à partir d'un nom libre. Le rayon et l'unité d'achat
   se déduisent du nom : « papier cadeau » part au rayon Maison et se compte au
   lot, sans que vous ayez à le dire. */
export function cnCreateProduct(courses, name) {
  const clean = String(name || '').trim();
  const id = 'u-' + cnProdNorm(clean).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Math.random().toString(36).slice(2, 5);
  /* Faute de reconnaître le nom, on le range dans « Maison & divers » plutôt
     qu'en Épicerie : c'est le rayon fourre-tout, et on l'y compte à la pièce
     au lieu de lui inventer 250 g. Le rayon reste modifiable dans la fiche. */
  const product = { id, name: clean[0].toUpperCase() + clean.slice(1), rayon: cnRayonOrNull(clean) || 'maison', days: null };
  return { courses: { ...courses, custom: [...(courses.custom || []), product] }, product };
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
    cart: {
      items: (cart.items || []).filter(it => !doneKeys.has(it.key)),
      checked: [], skipped: [],
      qty: Object.fromEntries(Object.entries(cart.qty || {}).filter(([k]) => !doneKeys.has(k))),
    },
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
