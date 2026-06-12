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
