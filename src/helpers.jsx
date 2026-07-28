import React from 'react';

export const CN_FONTS = {
  serif: "'Cormorant Garamond', Georgia, serif",
  display: "'Bricolage Grotesque', 'DM Sans', system-ui, sans-serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'DM Mono', 'Courier New', monospace",
};

export const CN_CHAPTERS = {
  'Low-Carb':      { color: '#506741', soft: '#EDF1E7', label: 'Low-Carb',      sub: 'Faible en glucides' },
  'High-Carb':     { color: '#8A6B4A', soft: '#F9F1E7', label: 'High-Carb',     sub: 'Riche en glucides' },
  'Post Training': { color: '#2E8B85', soft: '#E7F1F0', label: 'Post-Training', sub: 'Récupération' },
  'Petit Déjeuner':{ color: '#D4952A', soft: '#FFFBEB', label: 'Petit Déjeuner', sub: 'Énergie durable' },
  'Encas':         { color: '#5C6FAE', soft: '#EEF1FB', label: 'Encas',         sub: 'Entre les repas' },
};
export const chMeta = (name) => CN_CHAPTERS[name] || CN_CHAPTERS['Low-Carb'];

export function CNIcon({ name, size = 20, color = 'currentColor', strokeWidth = 1.8, style, fill }) {
  const P = {
    search: <><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5 21 21"/></>,
    sliders: <><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2.5"/><circle cx="8" cy="17" r="2.5"/></>,
    back: <path d="M15 5l-7 7 7 7"/>,
    chevR: <path d="M9 5l7 7-7 7"/>,
    clock: <><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></>,
    flame: <path d="M12 3c1 3-3.5 5-3.5 9a5.5 5.5 0 0 0 11 0c0-2.5-1.5-4-2.5-5-.2 1.4-.8 2.3-2 3 .6-2.6-.5-5.5-3-7z"/>,
    x: <path d="M6 6l12 12M18 6L6 18"/>,
    check: <path d="M5 12.5l4.5 4.5L19 7.5"/>,
    pot: <><path d="M4 10h16v4a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6v-4z"/><path d="M2 10h20M8 6c0-1.5 1-2 1-3M13 6c0-1.5 1-2 1-3"/></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20"/></>,
    leaf: <><path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15z"/><path d="M5 19c3-5 7-9 11-11"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></>,
    snow: <path d="M12 3v18M5 6.5l14 11M19 6.5l-14 11M12 3l-2 2.5M12 3l2 2.5M12 21l-2-2.5M12 21l2-2.5"/>,
    bulb: <><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 1 4 10.5c-.8.7-1 1.5-1 2.5h-6c0-1-.2-1.8-1-2.5A6 6 0 0 1 12 3z"/></>,
    glass: <path d="M7 3h10l-1.2 9a3.8 3.8 0 0 1-7.6 0L7 3zM12 16v5M9 21h6"/>,
    arrowR: <path d="M4 12h16m-6-6 6 6-6 6"/>,
    home: <><path d="M4 11l8-7 8 7"/><path d="M6 9.5V20h12V9.5"/></>,
    cal: <><rect x="4" y="5" width="16" height="16" rx="2.5"/><path d="M4 10h16M8 3v4M16 3v4"/></>,
    dice: <><rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="15" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="9" r="1.2" fill="currentColor" stroke="none"/><circle cx="9" cy="15" r="1.2" fill="currentColor" stroke="none"/></>,
    plus: <path d="M12 5v14M5 12h14"/>,
    bolt: <path d="M13 3 5 13.5h5L10 21l9-11h-5.5L13 3z"/>,
    heart: <path d="M12 20.5C7.5 17.5 4.5 14.5 3.5 11.5 2.5 8.5 4.5 5.5 7.5 5.5c1.8 0 3.4 1 4.5 2.7 1.1-1.7 2.7-2.7 4.5-2.7 3 0 5 3 4 6-1 3-4 6-8.5 9z"/>,
    calplus: <><rect x="4" y="5" width="16" height="16" rx="2.5"/><path d="M4 10h16M8 3v4M16 3v4M12 12.5v5M9.5 15h5"/></>,
    cart: <><path d="M3 4h2l2.2 11.5a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L20.5 8H6"/><circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/></>,
    refresh: <><path d="M20 11A8 8 0 0 0 6.3 6.3L4 8.5M4 4v4.5h4.5"/><path d="M4 13a8 8 0 0 0 13.7 4.7L20 15.5M20 20v-4.5h-4.5"/></>,
    copy: <><rect x="9" y="9" width="11.5" height="11.5" rx="2.5"/><path d="M5.5 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v.5"/></>,
    sparkles: <><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z"/></>,
    users: <><circle cx="9" cy="8" r="3.4"/><path d="M2.5 20c0-3.4 2.9-6 6.5-6s6.5 2.6 6.5 6"/><path d="M16.5 5.2a3.4 3.4 0 0 1 0 6.6M17.5 14.4c2.3.6 4 2.7 4 5.6"/></>,
    link: <><path d="M10 13.5a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1 1"/><path d="M14 10.5a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1-1"/></>,
    minus: <path d="M5 12h14"/>,
    trash: <path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 12.5h9L17.5 7"/>,
    pencil: <path d="M4 20l4.2-1L19.4 7.8a2.1 2.1 0 0 0-3-3L5 16l-1 4z"/>,
    pause: <path d="M9.5 5v14M14.5 5v14"/>,
    egg: <path d="M12 3.2c3.4 0 5.8 5.2 5.8 9.1a5.8 5.8 0 0 1-11.6 0C6.2 8.4 8.6 3.2 12 3.2z"/>,
    bread: <><path d="M4 11.5c0-3.1 2.9-5 8-5s8 1.9 8 5V18a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 18v-6.5z"/><path d="M9 7.2v13M14 7v13.5"/></>,
    drop: <path d="M12 3.4c3.5 4.4 5.6 7.2 5.6 9.7a5.6 5.6 0 0 1-11.2 0c0-2.5 2.1-5.3 5.6-9.7z"/>,
    spray: <><path d="M9.5 8.5h4.8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4.8a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z"/><path d="M9.5 8.5v-3h4M18 4.5h.01M20.5 7.5h.01M18 10.5h.01"/></>,
    box: <><path d="M3.5 7.6 12 3.5l8.5 4.1v8.8L12 20.5l-8.5-4.1V7.6z"/><path d="m3.5 7.6 8.5 4.1 8.5-4.1M12 11.7v8.8"/></>,
    basket: <><path d="M3.5 9.5h17l-1.6 8.3a2 2 0 0 1-2 1.7H7.1a2 2 0 0 1-2-1.7L3.5 9.5z"/><path d="M8.5 9.5 11 4M15.5 9.5 13 4M9.8 13v3M14.2 13v3"/></>,
    chef: <><path d="M7 13.5A3.8 3.8 0 0 1 8.4 6a3.9 3.9 0 0 1 7.2 0A3.8 3.8 0 0 1 17 13.5v1H7v-1z"/><path d="M7 17.5h10v1.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 19v-1.5z"/></>,
    camera: <><path d="M3 8.5a2 2 0 0 1 2-2h2.2l1.3-2h6.9l1.3 2H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9z"/><circle cx="12" cy="13" r="3.6"/></>,
    image: <><rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="8.5" cy="10" r="1.6"/><path d="m4 17 4.8-4.2a1.6 1.6 0 0 1 2.1 0L16 17M14 14.2l1.6-1.4a1.6 1.6 0 0 1 2.1 0L20 15"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || 'none'} stroke={color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      {P[name] || null}
    </svg>
  );
}

export function CNChip({ label, active, onClick, color = '#506741', count }) {
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

export function parseQty(q) {
  const m = (q || '').match(/^([\d.,]+)\s*(.*)$/);
  if (!m) return { n: null, unit: (q || '').trim() };
  return { n: parseFloat(m[1].replace(',', '.')), unit: m[2].trim() };
}
export function fmtNum(n) {
  if (n == null || isNaN(n)) return '';
  const r = n >= 10 ? Math.round(n) : Math.round(n * 4) / 4;
  return String(r % 1 === 0 ? r : r.toFixed(r * 10 % 1 === 0 ? 1 : 2)).replace('.', ',');
}
export function scaleQty(q, factor) {
  const { n, unit } = parseQty(q);
  if (n == null) return q || '';
  return `${fmtNum(n * factor)}${unit ? ' ' + unit : ''}`;
}

export const CN_STOP = new Set(['les', 'des', 'aux', 'la', 'le', 'de', 'du', 'en', 'et', 'au', 'avec', 'sans', 'une', 'un', 'frais', 'fraîche', 'poudre', 'cube', 'feuilles', 'grosse', 'petit', 'petite']);
export function normWord(w) {
  return w.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\(s\)$/, '').replace(/s$/, '').replace(/x$/, '');
}
export function ingredientTokens(name) {
  return (name || '').split(/[\s,'']+/).map(normWord)
    .filter(w => w.length >= 3 && !CN_STOP.has(w));
}
export function stepMatchesIngredient(stepText, ing) {
  const plain = stepText.replace(/<[^>]+>/g, '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const words = plain.split(/[^a-z]+/).map(w => w.replace(/s$/, '').replace(/x$/, ''));
  const set = new Set(words);
  return ingredientTokens(ing.name).some(t => set.has(t) || plain.includes(t));
}
export function ingredientsForStep(recipe, stepIdx) {
  const all = recipe.ingredients.flatMap(s => s.items.map(it => ({ ...it, section: s.section })));
  return all.filter(it => stepMatchesIngredient(recipe.steps[stepIdx] || '', it));
}

export function CNMacros({ n, size = 12, gap = 10 }) {
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

/* Vignette photo d'un plat (liste). Ne rend rien si la recette n'a pas d'image. */
export function CNThumb({ src, size = 46, radius = 11, alt = '' }) {
  if (!src) return null;
  return (
    <img src={src} alt={alt} loading="lazy" width={size} height={size} style={{
      width: size, height: size, borderRadius: radius, objectFit: 'cover',
      flexShrink: 0, background: '#EEE8DC', display: 'block',
    }} />
  );
}

export function CNBelgianDots({ size = 5, gap = 4 }) {
  return (
    <span style={{ display: 'inline-flex', gap, alignItems: 'center' }}>
      {['#1C1C1C', '#FAE042', '#EF3340'].map((c, i) => (
        <span key={i} style={{ width: size, height: size, borderRadius: '50%', background: c, display: 'inline-block' }}></span>
      ))}
    </span>
  );
}
