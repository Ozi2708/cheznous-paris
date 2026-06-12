import React from 'react';
import { CN_FONTS, chMeta, CNIcon, CNBelgianDots } from '../helpers.jsx';
import { cnApplyFilters, CN_EMPTY_FILTERS } from '../utils.js';
import { CHEZNOUS_DATA } from '../data.js';

const CN_MOOD_CARDS = [
  { id: 'rapide', title: 'Rapide ce soir', meta: '≤ 25 min', icon: 'clock', color: '#2E8B85', soft: '#E7F1F0', preset: { maxTime: 25 } },
  { id: 'leger', title: 'Léger', meta: '< 500 kcal', icon: 'leaf', color: '#506741', soft: '#EDF1E7', preset: { maxKcal: 500 } },
  { id: 'proteine', title: 'Très protéiné', meta: '≥ 40 g', icon: 'bolt', color: '#8A6B4A', soft: '#F9F1E7', preset: { minProt: 40 } },
  { id: 'sport', title: 'Après le sport', meta: 'récupération', icon: 'flame', color: '#E07534', soft: '#FDF0E7', preset: { chapter: 'Post Training' } },
  { id: 'vege', title: 'Végé', meta: 'sans viande', icon: 'leaf', color: '#3E7852', soft: '#EAF3ED', preset: { diet: ['Végétarien'] } },
  { id: 'hasard', title: 'Au hasard', meta: 'surprends-moi', icon: 'dice', color: '#5C6FAE', soft: '#EEF1FB', preset: null },
];

function CNMoodCard({ card, count, onClick }) {
  return (
    <button onClick={onClick} style={{
      textAlign: 'left', cursor: 'pointer', borderRadius: 12, padding: '14px 14px 12px',
      border: '1.5px solid #E4DDD2', background: '#FFFFFF', minHeight: 108,
      display: 'flex', flexDirection: 'column', gap: 6, transition: 'transform .15s ease, box-shadow .15s ease', position: 'relative', overflow: 'hidden',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(26,25,24,.10)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
      <span style={{ position: 'absolute', right: -8, bottom: -14, opacity: .12 }}>
        <CNIcon name={card.icon} size={74} color={card.color} strokeWidth={1.2} />
      </span>
      <span style={{ width: 30, height: 30, borderRadius: '50%', background: card.soft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CNIcon name={card.icon} size={16} color={card.color} />
      </span>
      <span style={{ fontFamily: CN_FONTS.display, fontWeight: 800, fontSize: 15.5, color: '#1A1918', lineHeight: 1.1, marginTop: 'auto' }}>{card.title}</span>
      <span style={{ fontFamily: CN_FONTS.body, fontSize: 11, color: '#8C8780' }}>
        <span style={{ color: card.color, fontWeight: 600 }}>{card.meta}</span>{count != null ? ` · ${count} recettes` : ''}
      </span>
    </button>
  );
}

export function CNHomeScreen({ onPreset, onOpen, onGoLibrary, onGoBatch, dayIndex }) {
  const all = CHEZNOUS_DATA.recipes;
  const daily = all[dayIndex % all.length];
  const dm = chMeta(daily.chapter);
  const counts = React.useMemo(() => {
    const c = {};
    CN_MOOD_CARDS.forEach(card => {
      if (!card.preset) { c[card.id] = null; return; }
      c[card.id] = cnApplyFilters(all, { ...CN_EMPTY_FILTERS, ...card.preset }).length;
    });
    return c;
  }, [all]);
  const lbl = { fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11, letterSpacing: '.11em', textTransform: 'uppercase', color: '#B8B3AA', padding: '0 20px', marginBottom: 10 };

  return (
    <div data-screen-label="Accueil — Le marché" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FAFAF8' }}>
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, paddingTop: 'var(--screen-top, 34px)' }}>
        <div style={{ padding: '8px 20px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontFamily: CN_FONTS.serif, fontSize: 24, color: '#1A1918', lineHeight: 1, whiteSpace: 'nowrap' }}>Chez nous <span style={{ fontStyle: 'italic', color: '#506741' }}>à Paris</span></span>
              <span style={{ fontFamily: CN_FONTS.body, fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: '#B89268' }}>By Manon &amp; Valentin</span>
            </div>
            <CNBelgianDots />
          </div>
          <div style={{ fontFamily: CN_FONTS.serif, fontStyle: 'italic', fontSize: 24, color: '#1A1918', marginTop: 16, lineHeight: 1.2 }}>Qu'est-ce qu'on mange ?</div>
        </div>

        <div style={{ padding: '0 20px', marginBottom: 22 }}>
          <button onClick={onGoLibrary} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10, background: '#FFFFFF',
            border: '1.5px solid #E4DDD2', borderRadius: 9999, padding: '0 16px', height: 44, cursor: 'pointer',
          }}>
            <CNIcon name="search" size={17} color="#B8B3AA" />
            <span style={{ fontFamily: CN_FONTS.body, fontSize: 14, color: '#B8B3AA' }}>Une recette, un ingrédient…</span>
          </button>
        </div>

        <div style={lbl}>Une envie ?</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 20px', marginBottom: 26 }}>
          {CN_MOOD_CARDS.map(card => (
            <CNMoodCard key={card.id} card={card} count={counts[card.id]}
              onClick={() => card.preset ? onPreset(card.preset) : onOpen(all[Math.floor(Math.random() * all.length)])} />
          ))}
        </div>

        <div style={lbl}>La recette du jour</div>
        <div style={{ padding: '0 20px', marginBottom: 22 }}>
          <button onClick={() => onOpen(daily)} style={{
            width: '100%', textAlign: 'left', cursor: 'pointer', borderRadius: 14, overflow: 'hidden',
            border: 'none', background: dm.color, padding: '20px 20px 18px', position: 'relative',
            display: 'flex', flexDirection: 'column', gap: 10, transition: 'transform .15s ease, box-shadow .15s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(26,25,24,.18)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
            <span style={{ position: 'absolute', right: 14, top: 10, fontFamily: CN_FONTS.serif, fontStyle: 'italic', fontSize: 64, lineHeight: 1, color: 'rgba(250,250,248,.22)' }}>{String(daily.num).padStart(2, '0')}</span>
            <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 9.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(250,250,248,.75)' }}>{dm.label} · {daily.totalMin} min</span>
            <span style={{ fontFamily: CN_FONTS.display, fontWeight: 800, fontSize: 23, lineHeight: 1.15, color: '#FAFAF8', paddingRight: 56 }}>{daily.title}</span>
            <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontFamily: CN_FONTS.mono, fontSize: 12, color: '#DCBE98' }}>{daily.nutrition.kcal} kcal</span>
              <span style={{ fontFamily: CN_FONTS.mono, fontSize: 12, color: 'rgba(250,250,248,.85)' }}>{daily.nutrition.proteines}g prot</span>
              <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12.5, color: '#FAFAF8' }}>
                Voir <CNIcon name="arrowR" size={15} color="#FAFAF8" />
              </span>
            </span>
          </button>
        </div>

        <div style={{ padding: '0 20px 14px' }}>
          <button onClick={onGoBatch} style={{
            width: '100%', textAlign: 'left', cursor: 'pointer', borderRadius: 14,
            border: '1.5px solid #DCBE98', background: '#F9F1E7', padding: '16px 18px',
            display: 'flex', alignItems: 'center', gap: 14, transition: 'transform .15s ease, box-shadow .15s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(26,25,24,.10)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
            <span style={{ width: 44, height: 44, borderRadius: '50%', background: '#B89268', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CNIcon name="pot" size={22} color="#FAFAF8" />
            </span>
            <span style={{ flex: 1 }}>
              <span style={{ display: 'block', fontFamily: CN_FONTS.serif, fontStyle: 'italic', fontSize: 17.5, color: '#1A1918', lineHeight: 1.25 }}>Cuisine 2h le dimanche, mange toute la semaine.</span>
              <span style={{ display: 'block', fontFamily: CN_FONTS.body, fontSize: 11.5, color: '#8A6B4A', marginTop: 3, fontWeight: 600 }}>Préparer une session batch cooking →</span>
            </span>
          </button>
        </div>

        <div style={{ padding: '0 20px 120px' }}>
          <button onClick={onGoLibrary} style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'none', border: 'none', borderTop: '1px solid #E4DDD2', padding: '16px 2px', cursor: 'pointer',
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 14, color: '#1A1918' }}>
              <CNIcon name="book" size={18} color="#506741" /> Toute la bibliothèque
            </span>
            <span style={{ fontFamily: CN_FONTS.mono, fontSize: 11.5, color: '#B8B3AA' }}>{all.length} recettes →</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export { CN_MOOD_CARDS };
