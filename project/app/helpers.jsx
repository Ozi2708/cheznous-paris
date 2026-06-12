/* ── Chez nous à Paris — App helpers ─────────────────────────────
   Atomes partagés : couleurs chapitres, icônes, chips, quantités. */

const CN_FONTS = {
  serif: "'Cormorant Garamond', Georgia, serif",
  display: "'Bricolage Grotesque', 'DM Sans', system-ui, sans-serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'DM Mono', 'Courier New', monospace",
};

/* Identité couleur par chapitre — uniquement des tokens du système */
const CN_CHAPTERS = {
  'Low-Carb':      { color: '#506741', soft: '#EDF1E7', label: 'Low-Carb',      sub: 'Faible en glucides' },
  'High-Carb':     { color: '#8A6B4A', soft: '#F9F1E7', label: 'High-Carb',     sub: 'Riche en glucides' },
  'Post Training': { color: '#2E8B85', soft: '#E7F1F0', label: 'Post-Training', sub: 'Récupération' },
  'Petit Déjeuner':{ color: '#D4952A', soft: '#FFFBEB', label: 'Petit Déjeuner', sub: 'Énergie durable' },
  'Encas':         { color: '#5C6FAE', soft: '#EEF1FB', label: 'Encas',         sub: 'Entre les repas' },
};
const chMeta = (name) => CN_CHAPTERS[name] || CN_CHAPTERS['Low-Carb'];

/* ── Icônes (SVG inline, stroke 1.5–2, caps ronds) ── */
function CNIcon({ name, size = 20, color = 'currentColor', strokeWidth = 1.8, style, fill }) {
  const P = {
    search: <><circle cx="11" cy="11" r="7"></circle><path d="M16.5 16.5 21 21"></path></>,
    sliders: <><path d="M4 7h10M18 7h2M4 17h2M10 17h10"></path><circle cx="16" cy="7" r="2.5"></circle><circle cx="8" cy="17" r="2.5"></circle></>,
    back: <path d="M15 5l-7 7 7 7"></path>,
    chevR: <path d="M9 5l7 7-7 7"></path>,
    clock: <><circle cx="12" cy="12" r="8.5"></circle><path d="M12 7.5V12l3 2"></path></>,
    flame: <path d="M12 3c1 3-3.5 5-3.5 9a5.5 5.5 0 0 0 11 0c0-2.5-1.5-4-2.5-5-.2 1.4-.8 2.3-2 3 .6-2.6-.5-5.5-3-7z"></path>,
    x: <path d="M6 6l12 12M18 6L6 18"></path>,
    check: <path d="M5 12.5l4.5 4.5L19 7.5"></path>,
    pot: <><path d="M4 10h16v4a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6v-4z"></path><path d="M2 10h20M8 6c0-1.5 1-2 1-3M13 6c0-1.5 1-2 1-3"></path></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15z"></path><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20"></path></>,
    leaf: <><path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15z"></path><path d="M5 19c3-5 7-9 11-11"></path></>,
    user: <><circle cx="12" cy="8" r="4"></circle><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"></path></>,
    snow: <path d="M12 3v18M5 6.5l14 11M19 6.5l-14 11M12 3l-2 2.5M12 3l2 2.5M12 21l-2-2.5M12 21l2-2.5"></path>,
    bulb: <><path d="M9 18h6M10 21h4"></path><path d="M12 3a6 6 0 0 1 4 10.5c-.8.7-1 1.5-1 2.5h-6c0-1-.2-1.8-1-2.5A6 6 0 0 1 12 3z"></path></>,
    glass: <path d="M7 3h10l-1.2 9a3.8 3.8 0 0 1-7.6 0L7 3zM12 16v5M9 21h6"></path>,
    arrowR: <path d="M4 12h16m-6-6 6 6-6 6"></path>,
    home: <><path d="M4 11l8-7 8 7"></path><path d="M6 9.5V20h12V9.5"></path></>,
    cal: <><rect x="4" y="5" width="16" height="16" rx="2.5"></rect><path d="M4 10h16M8 3v4M16 3v4"></path></>,
    dice: <><rect x="4" y="4" width="16" height="16" rx="3"></rect><circle cx="9" cy="9" r="1.2" fill="currentColor" stroke="none"></circle><circle cx="15" cy="15" r="1.2" fill="currentColor" stroke="none"></circle><circle cx="15" cy="9" r="1.2" fill="currentColor" stroke="none"></circle><circle cx="9" cy="15" r="1.2" fill="currentColor" stroke="none"></circle></>,
    plus: <path d="M12 5v14M5 12h14"></path>,
    bolt: <path d="M13 3 5 13.5h5L10 21l9-11h-5.5L13 3z"></path>,
    heart: <path d="M12 20.5C7.5 17.5 4.5 14.5 3.5 11.5 2.5 8.5 4.5 5.5 7.5 5.5c1.8 0 3.4 1 4.5 2.7 1.1-1.7 2.7-2.7 4.5-2.7 3 0 5 3 4 6-1 3-4 6-8.5 9z"></path>,
    calplus: <><rect x="4" y="5" width="16" height="16" rx="2.5"></rect><path d="M4 10h16M8 3v4M16 3v4M12 12.5v5M9.5 15h5"></path></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || 'none'} stroke={color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      {P[name] || null}
    </svg>
  );
}

/* ── Chip filtre (pill) ── */
function CNChip({ label, active, onClick, color = '#506741', count }) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0,
      fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12, letterSpacing: '.02em',
      padding: '8px 14px', borderRadius: 9999, cursor: 'pointer',
      border: `1.5px solid ${active ? color : '#D5CEBE'}`,
      background: active ? color : '#FFFFFF',
      color: active ? '#FFFFFF' : '#3C3830',
      transition: 'all .15s ease', whiteSpace: 'nowrap', minHeight: 34,
    }}>
      <span>{label}</span>
      {count != null && <span style={{ fontFamily: CN_FONTS.mono, fontSize: 10, opacity: .7 }}>{count}</span>}
    </button>
  );
}

/* ── Quantités : parse + échelle portions ── */
function parseQty(q) {
  const m = (q || '').match(/^([\d.,]+)\s*(.*)$/);
  if (!m) return { n: null, unit: (q || '').trim() };
  return { n: parseFloat(m[1].replace(',', '.')), unit: m[2].trim() };
}
function fmtNum(n) {
  if (n == null || isNaN(n)) return '';
  const r = n >= 10 ? Math.round(n) : Math.round(n * 4) / 4;
  return String(r % 1 === 0 ? r : r.toFixed(r * 10 % 1 === 0 ? 1 : 2)).replace('.', ',');
}
function scaleQty(q, factor) {
  const { n, unit } = parseQty(q);
  if (n == null) return q || '';
  return `${fmtNum(n * factor)}${unit ? ' ' + unit : ''}`;
}

/* ── Ingrédients ↔ étapes : correspondance par mots-clés ── */
const CN_STOP = new Set(['les', 'des', 'aux', 'la', 'le', 'de', 'du', 'en', 'et', 'au', 'avec', 'sans', 'une', 'un', 'frais', 'fraîche', 'poudre', 'cube', 'feuilles', 'grosse', 'petit', 'petite']);
function normWord(w) {
  return w.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\(s\)$/, '').replace(/s$/, '').replace(/x$/, '');
}
function ingredientTokens(name) {
  return (name || '').split(/[\s,'']+/).map(normWord)
    .filter(w => w.length >= 3 && !CN_STOP.has(w));
}
function stepMatchesIngredient(stepText, ing) {
  const plain = stepText.replace(/<[^>]+>/g, '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const words = plain.split(/[^a-z]+/).map(w => w.replace(/s$/, '').replace(/x$/, ''));
  const set = new Set(words);
  return ingredientTokens(ing.name).some(t => set.has(t) || plain.includes(t));
}
function ingredientsForStep(recipe, stepIdx) {
  const all = recipe.ingredients.flatMap(s => s.items.map(it => ({ ...it, section: s.section })));
  return all.filter(it => stepMatchesIngredient(recipe.steps[stepIdx] || '', it));
}

/* ── Macros inline (typographique) ── */
function CNMacros({ n, size = 12, gap = 10 }) {
  const items = [
    { v: n.kcal, u: '', label: 'kcal', c: '#E07534' },
    { v: n.proteines, u: 'g', label: 'prot', c: '#3E7852' },
    { v: n.glucides, u: 'g', label: 'gluc', c: '#2E8B85' },
    { v: n.lipides, u: 'g', label: 'lip', c: '#D4952A' },
  ];
  return (
    <span style={{ display: 'inline-flex', gap, alignItems: 'baseline' }}>
      {items.map((it, i) => (
        <span key={i} style={{ fontFamily: CN_FONTS.mono, fontSize: size, color: it.c, whiteSpace: 'nowrap' }}>
          {it.v}{it.u}&nbsp;<span style={{ color: '#B8B3AA', fontSize: size - 2 }}>{it.label}</span>
        </span>
      ))}
    </span>
  );
}

/* ── Tri-points belge (accent identitaire discret) ── */
function CNBelgianDots({ size = 5, gap = 4 }) {
  return (
    <span style={{ display: 'inline-flex', gap, alignItems: 'center' }}>
      {['#1C1C1C', '#FAE042', '#EF3340'].map((c, i) => (
        <span key={i} style={{ width: size, height: size, borderRadius: '50%', background: c, display: 'inline-block' }}></span>
      ))}
    </span>
  );
}

Object.assign(window, {
  CN_FONTS, CN_CHAPTERS, chMeta, CNIcon, CNChip, CNMacros, CNBelgianDots,
  parseQty, fmtNum, scaleQty, ingredientsForStep, ingredientTokens,
});
