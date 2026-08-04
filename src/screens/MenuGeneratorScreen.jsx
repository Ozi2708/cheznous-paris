import React from 'react';
import { CN_FONTS, chMeta, CNIcon, CNMacros } from '../helpers.jsx';
import { useAllRecipes } from '../recipes.js';
import { cnGenerateMenu, cnRerollMenuItem, cnSynergies } from '../utils.js';

function CNCountStepper({ count, setCount }) {
  const btn = {
    width: 44, height: 44, borderRadius: 9999, border: '1.5px solid #D5CEBE', background: '#FFFFFF',
    fontFamily: CN_FONTS.display, fontWeight: 800, fontSize: 20, color: '#1A1918', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s ease',
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', border: '1.5px solid #E4DDD2', borderRadius: 14, padding: '14px 16px' }}>
      <div>
        <div style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase', color: '#8C8780' }}>Combien de plats ?</div>
        <div style={{ fontFamily: CN_FONTS.body, fontSize: 12, fontStyle: 'italic', color: '#767066', marginTop: 3 }}>pour votre semaine</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button style={{ ...btn, opacity: count <= 1 ? .35 : 1 }} disabled={count <= 1} onClick={() => setCount(c => Math.max(1, c - 1))}>−</button>
        <span style={{ fontFamily: CN_FONTS.display, fontWeight: 800, fontSize: 28, color: '#506741', minWidth: 30, textAlign: 'center' }}>{count}</span>
        <button style={{ ...btn, opacity: count >= 10 ? .35 : 1 }} disabled={count >= 10} onClick={() => setCount(c => Math.min(10, c + 1))}>+</button>
      </div>
    </div>
  );
}

export function CNMenuGeneratorScreen({ onBack, onCommit }) {
  const all = useAllRecipes();
  const [count, setCount] = React.useState(4);
  const [menu, setMenu] = React.useState(null); // array of recipe objects

  const generate = () => setMenu(cnGenerateMenu(all, count));
  const rerollAll = () => setMenu(cnGenerateMenu(all, menu.length));
  const rerollOne = (i) => setMenu(m => m.map((r, idx) => idx === i ? cnRerollMenuItem(all, m, i) : r));

  const synergies = menu && menu.length >= 2 ? cnSynergies(menu) : [];

  return (
    <div data-screen-label="Composer un menu" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FAFAF8', position: 'relative' }}>
      <div style={{ flexShrink: 0, paddingTop: 'var(--screen-top, 34px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px' }}>
          <button onClick={onBack} aria-label="Retour" style={{
            width: 44, height: 44, borderRadius: 9999, border: '1.5px solid #E4DDD2', background: '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
          }}><CNIcon name="back" size={18} color="#3C3830" /></button>
          <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: '#506741', flex: 1 }}>Composer un menu</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, padding: '4px 20px 140px' }}>
        <h1 style={{ fontFamily: CN_FONTS.serif, fontSize: 30, color: '#1A1918', margin: '4px 0 6px' }}>Mon menu de la semaine</h1>
        <p style={{ fontFamily: CN_FONTS.body, fontSize: 13, color: '#8C8780', lineHeight: 1.55, margin: '0 0 18px' }}>
          On équilibre les chapitres et on mutualise les ingrédients frais pour limiter le gâchis. Gardez ce qui vous plaît, relancez le reste.
        </p>

        <CNCountStepper count={count} setCount={setCount} />

        {!menu && (
          <button onClick={generate} style={{
            marginTop: 16, width: '100%', height: 54, borderRadius: 9999, border: 'none', cursor: 'pointer',
            background: '#506741', color: '#FFFFFF', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 15,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            <CNIcon name="sparkles" size={20} color="#FFFFFF" /> Composer mon menu
          </button>
        )}

        {menu && (
          <React.Fragment>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '24px 0 12px' }}>
              <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11, letterSpacing: '.11em', textTransform: 'uppercase', color: '#767066' }}>Proposition ({menu.length})</span>
              <button onClick={rerollAll} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, border: 'none', background: 'none', cursor: 'pointer',
                fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12, color: '#506741',
              }}><CNIcon name="refresh" size={14} color="#506741" /> Tout relancer</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {menu.map((r, i) => {
                const m = chMeta(r.chapter);
                return (
                  <div key={r.id + '-' + i} style={{
                    display: 'flex', alignItems: 'center', gap: 12, background: '#FFFFFF',
                    border: '1.5px solid #E4DDD2', borderLeft: `4px solid ${m.color}`, borderRadius: 12, padding: '12px 12px 12px 14px',
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ display: 'inline-block', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 9.5, letterSpacing: '.08em', textTransform: 'uppercase', color: m.color, marginBottom: 4 }}>{r.chapter}</span>
                      <span style={{ display: 'block', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 14, color: '#1A1918', lineHeight: 1.3, marginBottom: 5 }}>{r.title}</span>
                      <CNMacros n={r.nutrition} size={10.5} gap={7} />
                    </div>
                    <button onClick={() => rerollOne(i)} aria-label="Relancer cette recette" title="Relancer cette recette" style={{
                      width: 40, height: 40, borderRadius: 9999, flexShrink: 0, cursor: 'pointer',
                      border: '1.5px solid #D5CEBE', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}><CNIcon name="refresh" size={17} color="#506741" /></button>
                  </div>
                );
              })}
            </div>

            {synergies.length > 0 && (
              <div style={{ marginTop: 16, background: '#EEF3E8', border: '1.5px solid #D3E0C4', borderRadius: 12, padding: '12px 14px' }}>
                <div style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#506741', marginBottom: 8 }}>Cohérence du menu</div>
                {synergies.map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: i < synergies.length - 1 ? 6 : 0 }}>
                    <CNIcon name={s.icon} size={14} color="#506741" style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontFamily: CN_FONTS.body, fontSize: 12.5, color: '#3C5030', lineHeight: 1.5 }}>{s.text}</span>
                  </div>
                ))}
              </div>
            )}
          </React.Fragment>
        )}
      </div>

      {menu && menu.length > 0 && (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 20px 16px', background: 'linear-gradient(to top, #FAFAF8 70%, rgba(250,250,248,0))', display: 'flex', gap: 10 }}>
          <button onClick={() => onCommit(menu.map(r => r.id))} style={{
            flex: 1, height: 54, borderRadius: 9999, border: 'none', cursor: 'pointer',
            background: '#506741', color: '#FFFFFF', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 15,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 6px 20px rgba(26,25,24,.18)',
          }}>
            <CNIcon name="cal" size={19} color="#FFFFFF" /> Ajouter à ma semaine
          </button>
        </div>
      )}
    </div>
  );
}
