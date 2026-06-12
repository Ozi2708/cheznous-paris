import React from 'react';
import { CN_FONTS } from './helpers.jsx';

export function NutritionBar({ kcal, lipides, glucides, proteines }) {
  const items = [
    { key: 'kcal',      label: 'KCAL',      value: kcal,      color: '#E07534', unit: ''  },
    { key: 'lipides',   label: 'LIPIDES',   value: lipides,   color: '#D4952A', unit: 'g' },
    { key: 'glucides',  label: 'GLUCIDES',  value: glucides,  color: '#2E8B85', unit: 'g' },
    { key: 'proteines', label: 'PROTÉINES', value: proteines, color: '#3E7852', unit: 'g' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid #E4DDD2', borderBottom: '1px solid #E4DDD2', backgroundColor: '#FFFFFF' }}>
      {items.map((n, i) => (
        <div key={n.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '12px 8px', borderRight: i < 3 ? '1px solid #E4DDD2' : 'none', textAlign: 'center' }}>
          <div style={{ fontFamily: CN_FONTS.display, fontWeight: 800, fontSize: 22, color: n.color, lineHeight: 1 }}>
            {n.value ?? '—'}<span style={{ fontSize: 12, fontWeight: 700 }}>{n.unit}</span>
          </div>
          <div style={{ fontFamily: CN_FONTS.body, fontWeight: 500, fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: '#B8B3AA', marginTop: 4 }}>{n.label}</div>
        </div>
      ))}
    </div>
  );
}

const TIP_THEMES = {
  variante:     { bg: '#FDECEA', border: '#F2A09A', titleColor: '#8E2219', dotColor: '#C0392B' },
  astuce:       { bg: '#EEE8DC', border: '#E4DDD2', titleColor: '#8C8780', dotColor: null },
  conseil:      { bg: '#EDF1E7', border: '#ADCA87', titleColor: '#374B2D', dotColor: '#506741' },
  conservation: { bg: '#EEF1FB', border: '#AAB8EC', titleColor: '#3D4E8A', dotColor: null },
  suggestion:   { bg: '#F9F1E7', border: '#DCBE98', titleColor: '#6B5138', dotColor: null },
};

export function TipBox({ type = 'astuce', title, text, compact = false }) {
  const t = TIP_THEMES[type] || TIP_THEMES.astuce;
  return (
    <div style={{ backgroundColor: t.bg, border: `1px solid ${t.border}`, borderRadius: 8, padding: compact ? '10px 14px' : '14px 18px', marginBottom: 10 }}>
      {title && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          {t.dotColor && <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: t.dotColor, flexShrink: 0 }} />}
          <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: t.titleColor }}>{title}</span>
        </div>
      )}
      <p style={{ fontFamily: CN_FONTS.body, fontSize: 13, color: '#8C8780', lineHeight: 1.6, fontStyle: 'italic', margin: 0 }}>{text}</p>
    </div>
  );
}

export function InfoCard({ advisor = 'Claudy', text, subtitle }) {
  return (
    <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #D0D9F5', marginTop: 20 }}>
      <div style={{ backgroundColor: '#5C6FAE', color: '#fff', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
        </div>
        <div style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', opacity: 0.92 }}>Le conseil de {advisor}</div>
      </div>
      <div style={{ backgroundColor: '#EEF1FB', padding: '14px 18px' }}>
        <p style={{ fontFamily: CN_FONTS.body, fontSize: 13, color: '#3D4E8A', lineHeight: 1.6, fontStyle: 'italic', margin: 0 }}>{text}</p>
        {subtitle && <p style={{ fontFamily: CN_FONTS.body, fontSize: 13, color: '#5C6FAE', lineHeight: 1.6, fontStyle: 'italic', marginTop: 8, marginBottom: 0 }}>{subtitle}</p>}
      </div>
    </div>
  );
}
