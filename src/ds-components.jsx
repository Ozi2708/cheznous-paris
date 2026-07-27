import React from 'react';
import { CN_FONTS } from './helpers.jsx';
import { CN_DAYS } from './utils.js';

/* Bottom-sheet de choix du jour + créneau pour ajouter une recette à la semaine.
   Partagé entre la fiche recette et le quick-add (Bibliothèque / Favoris). */
export function CNPlanWeekSheet({ open, onClose, recipe, week, onPlan }) {
  const [justPlanned, setJustPlanned] = React.useState(null);
  React.useEffect(() => { if (!open) setJustPlanned(null); }, [open]);
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 200, pointerEvents: open ? 'auto' : 'none' }} aria-hidden={!open}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(26,25,24,.4)', opacity: open ? 1 : 0, transition: 'opacity .25s ease' }}></div>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, background: '#FAFAF8', borderRadius: '24px 24px 0 0',
        transform: open ? 'translateY(0)' : 'translateY(105%)',
        /* Fermé = invisible : rien de focusable, donc pas de défilement parasite du conteneur. */
        visibility: open ? 'visible' : 'hidden',
        transition: open ? 'transform .3s cubic-bezier(.32,.72,.25,1)'
                         : 'transform .3s cubic-bezier(.32,.72,.25,1), visibility 0s linear .3s',
        padding: '14px 22px calc(env(safe-area-inset-bottom, 0px) + 16px)', boxShadow: '0 -8px 40px rgba(26,25,24,.18)',
      }}>
        <div style={{ width: 38, height: 4, borderRadius: 99, background: '#D5CEBE', margin: '0 auto 14px' }}></div>
        <div style={{ fontFamily: CN_FONTS.display, fontWeight: 800, fontSize: 19, color: '#1A1918', marginBottom: 4 }}>Ajouter à ma semaine</div>
        <div style={{ fontFamily: CN_FONTS.body, fontSize: 12, fontStyle: 'italic', color: '#8C8780', marginBottom: 14 }}>{recipe && recipe.title}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {CN_DAYS.map(day => (
            <div key={day} style={{ display: 'grid', gridTemplateColumns: '76px 1fr 1fr', gap: 8, alignItems: 'center' }}>
              <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: '#8C8780' }}>{day}</span>
              {['midi', 'soir'].map(slot => {
                const key = day + '-' + slot;
                const taken = week && week[key];
                const isHere = justPlanned === key;
                return (
                  <button key={slot} onClick={() => { onPlan(key); setJustPlanned(key); setTimeout(onClose, 450); }} style={{
                    height: 38, borderRadius: 9999, cursor: 'pointer', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12,
                    border: `1.5px solid ${isHere ? '#506741' : taken ? '#EEE8DC' : '#D5CEBE'}`,
                    background: isHere ? '#506741' : taken ? '#F5F2EC' : '#FFFFFF',
                    color: isHere ? '#FFFFFF' : taken ? '#B8B3AA' : '#3C3830', transition: 'all .15s ease',
                  }}>{isHere ? '✓ ' + slot : taken ? slot + ' · pris' : slot}</button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
