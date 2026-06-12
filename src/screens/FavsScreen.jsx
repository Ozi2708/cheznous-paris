import React from 'react';
import { CN_FONTS, chMeta, CNIcon } from '../helpers.jsx';
import { CHEZNOUS_DATA } from '../data.js';

export function CNFavsScreen({ favs, onToggleFav, onOpen, onQuickAdd }) {
  const all = CHEZNOUS_DATA.recipes;
  const list = React.useMemo(() => favs.map(id => all.find(r => r.id === id)).filter(Boolean), [favs.join()]);

  return (
    <div data-screen-label="Favoris" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FAFAF8' }}>
      <div style={{ flexShrink: 0, padding: '68px 20px 4px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: CN_FONTS.serif, fontSize: 30, color: '#1A1918', whiteSpace: 'nowrap' }}>Favoris</span>
          {list.length > 0 && <span style={{ fontFamily: CN_FONTS.mono, fontSize: 11, color: '#B8B3AA' }}>{list.length} recette{list.length > 1 ? 's' : ''}</span>}
        </div>
        {list.length > 0 && (
          <div style={{ fontFamily: CN_FONTS.body, fontSize: 12.5, color: '#8C8780', marginTop: 4, fontStyle: 'italic' }}>Vos valeurs sûres, toujours sous la main.</div>
        )}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, padding: '12px 20px 120px' }}>
        {list.length === 0 && (
          <div style={{ textAlign: 'center', padding: '70px 26px 0' }}>
            <span style={{ display: 'inline-flex', width: 64, height: 64, borderRadius: '50%', background: '#F5F0E8', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <CNIcon name="heart" size={30} color="#B89268" />
            </span>
            <div style={{ fontFamily: CN_FONTS.serif, fontStyle: 'italic', fontSize: 21, color: '#3C3830', marginBottom: 8 }}>Aucun favori pour l'instant</div>
            <div style={{ fontFamily: CN_FONTS.body, fontSize: 13, color: '#8C8780', lineHeight: 1.55 }}>
              Touchez le cœur sur une fiche recette pour la retrouver ici.
            </div>
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {list.map(r => {
            const m = chMeta(r.chapter);
            return (
              <div key={r.id} style={{
                display: 'flex', alignItems: 'center', gap: 8, minHeight: 60,
                background: '#FFFFFF', border: '1.5px solid #E4DDD2', borderLeft: `4px solid ${m.color}`,
                borderRadius: 12, padding: '10px 10px 10px 14px',
              }}>
                <button onClick={() => onOpen(r)} style={{ flex: 1, minWidth: 0, textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <span style={{ display: 'block', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: m.color, marginBottom: 3 }}>{m.label}</span>
                  <span style={{ display: 'block', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 13.5, color: '#1A1918', lineHeight: 1.3 }}>{r.title}</span>
                  <span style={{ fontFamily: CN_FONTS.mono, fontSize: 10.5, color: '#B8B3AA' }}>{r.totalMin}′ · {r.nutrition.kcal} kcal · {r.nutrition.proteines}g prot</span>
                </button>
                <button onClick={() => onQuickAdd(r)} aria-label="Ajouter à ma semaine" title="Ajouter à ma semaine" style={{
                  width: 38, height: 38, borderRadius: 9999, border: '1.5px solid #E4DDD2', background: '#FFFFFF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'all .15s ease',
                }}>
                  <CNIcon name="calplus" size={17} color="#506741" />
                </button>
                <button onClick={() => onToggleFav(r.id)} aria-label="Retirer des favoris" title="Retirer des favoris" style={{
                  width: 38, height: 38, borderRadius: 9999, border: 'none', background: 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
                }}>
                  <CNIcon name="heart" size={19} color="#B89268" fill="#B89268" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
