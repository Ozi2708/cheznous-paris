import React from 'react';
import { CN_FONTS, CNIcon, CNBelgianDots, scaleQty, ingredientsForStep } from '../helpers.jsx';
import { cnCookTheme } from '../utils.js';
import { useCNTimers, CNActiveTimers, CNTimerChips, cnAssignTips, CNStepTip } from '../timers.jsx';

export function CNCookScreen({ recipe, portions, onExit, theme = 'olive', textSize = 25, initialPhase = -1, onPhaseChange }) {
  const [phase, setPhase] = React.useState(initialPhase);
  const [miseChecked, setMiseChecked] = React.useState(() => new Set());
  const { timers, addTimer, removeTimer } = useCNTimers();
  const tipMap = React.useMemo(() => cnAssignTips(recipe), [recipe]);
  const T = cnCookTheme(theme);
  const n = recipe.steps.length;
  const factor = portions / 2;
  const allIngredients = React.useMemo(() => recipe.ingredients.flatMap((s, si) => s.items.map((it, ii) => ({ ...it, key: si + ':' + ii }))), [recipe]);
  const stepIngs = React.useMemo(() => phase >= 0 && phase < n ? ingredientsForStep(recipe, phase) : [], [recipe, phase, n]);

  const go = (p) => { const next = Math.max(-1, Math.min(n, p)); setPhase(next); onPhaseChange && onPhaseChange(next); };

  React.useEffect(() => {
    const h = (e) => {
      if (e.key === 'ArrowRight') go(phase + 1);
      if (e.key === 'ArrowLeft') go(phase - 1);
      if (e.key === 'Escape') onExit();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });

  const stepHtml = (s) => s.replace(/<strong>/g, `<strong style="color:${T.strong};font-weight:700">`);

  const navBtn = (dir, disabled) => (
    <button onClick={() => go(phase + dir)} disabled={disabled} aria-label={dir > 0 ? 'Étape suivante' : 'Étape précédente'} style={{
      width: 54, height: 54, borderRadius: 9999, flexShrink: 0,
      border: `1.5px solid ${T.ghostBd}`, background: 'transparent', cursor: disabled ? 'default' : 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: disabled ? .3 : 1, transition: 'all .15s ease',
    }}>
      <CNIcon name={dir > 0 ? 'chevR' : 'back'} size={22} color={T.ghostFg} />
    </button>
  );

  const isLastStep = phase === n - 1;

  return (
    <div data-screen-label={'Mode Cuisine — ' + recipe.title} style={{ height: '100%', display: 'flex', flexDirection: 'column', background: T.bg, position: 'relative', transition: 'background .3s ease' }}>
      <div style={{ flexShrink: 0, padding: '58px 18px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onExit} aria-label="Quitter le mode cuisine" style={{
            width: 44, height: 44, borderRadius: 9999, border: `1.5px solid ${T.ghostBd}`, background: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'all .15s ease',
          }}>
            <CNIcon name="x" size={17} color={T.ghostFg} />
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 10, letterSpacing: '.13em', textTransform: 'uppercase', color: T.faint }}>Mode cuisine</div>
            <div style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 13, color: T.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{recipe.title}</div>
          </div>
          <span style={{ fontFamily: CN_FONTS.mono, fontSize: 12, color: T.muted, flexShrink: 0 }}>
            {phase === -1 ? 'mise en place' : phase >= n ? 'fini !' : `${phase + 1} / ${n}`}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 4, marginTop: 14 }}>
          {Array.from({ length: n }, (_, i) => (
            <span key={i} style={{ flex: 1, height: 3.5, borderRadius: 99, background: phase >= 0 && i <= Math.min(phase, n - 1) ? T.segOn : T.seg, transition: 'background .25s ease' }}></span>
          ))}
        </div>
        <CNActiveTimers timers={timers} removeTimer={removeTimer} T={T} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, padding: '22px 22px 16px', display: 'flex', flexDirection: 'column' }}>
        {phase === -1 && (
          <div>
            <div style={{ fontFamily: CN_FONTS.serif, fontStyle: 'italic', fontSize: 30, color: T.text, lineHeight: 1.15, marginBottom: 6 }}>La mise en place</div>
            <div style={{ fontFamily: CN_FONTS.body, fontSize: 13.5, color: T.muted, marginBottom: 20 }}>Sortez tout avant de commencer — pour {portions} personne{portions > 1 ? 's' : ''}.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {allIngredients.map(ing => {
                const done = miseChecked.has(ing.key);
                return (
                  <button key={ing.key} onClick={() => {
                    const next = new Set(miseChecked);
                    done ? next.delete(ing.key) : next.add(ing.key);
                    setMiseChecked(next);
                  }} style={{
                    display: 'flex', alignItems: 'center', gap: 12, width: '100%', minHeight: 50,
                    background: T.card, border: `1.5px solid ${done ? T.accent : T.cardBd}`, borderRadius: 12,
                    padding: '10px 14px', cursor: 'pointer', textAlign: 'left', transition: 'all .15s ease', opacity: done ? .55 : 1,
                  }}>
                    <span style={{ width: 22, height: 22, borderRadius: 7, flexShrink: 0, border: `1.5px solid ${done ? T.accent : T.ghostBd}`, background: done ? T.accent : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s ease' }}>
                      {done && <CNIcon name="check" size={14} color={theme === 'creme' ? '#fff' : '#2C3C22'} strokeWidth={2.5} />}
                    </span>
                    <span style={{ fontFamily: CN_FONTS.body, fontWeight: 500, fontSize: 15, color: T.text, flex: 1, textDecoration: done ? 'line-through' : 'none' }}>{ing.name}</span>
                    <span style={{ fontFamily: CN_FONTS.mono, fontSize: 13.5, color: T.accent, whiteSpace: 'nowrap' }}>{scaleQty(ing.q, factor)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {phase >= 0 && phase < n && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontFamily: CN_FONTS.serif, fontStyle: 'italic', fontSize: 64, lineHeight: .9, color: T.accent, marginBottom: 18 }}>{phase + 1}<span style={{ fontSize: 24, color: T.faint }}> / {n}</span></div>
              <p key={phase} className="cn-step-in" style={{ fontFamily: CN_FONTS.body, fontWeight: 500, fontSize: textSize, lineHeight: 1.42, color: T.text, margin: 0, textWrap: 'pretty' }}
                dangerouslySetInnerHTML={{ __html: stepHtml(recipe.steps[phase]) }}></p>
              <CNTimerChips html={recipe.steps[phase]} label={`Étape ${phase + 1}`} timers={timers} addTimer={addTimer} T={T} />
              {(tipMap[phase] || []).map((tip, ti) => <CNStepTip key={ti} tip={tip} T={T} />)}
            </div>

            {stepIngs.length > 0 && (
              <div style={{ paddingTop: 26 }}>
                <div style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 10, letterSpacing: '.13em', textTransform: 'uppercase', color: T.faint, marginBottom: 10 }}>Pour cette étape</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {stepIngs.map((ing, i) => (
                    <span key={i} style={{ display: 'inline-flex', alignItems: 'baseline', gap: 7, background: T.card, border: `1px solid ${T.cardBd}`, borderRadius: 9999, padding: '8px 14px' }}>
                      <span style={{ fontFamily: CN_FONTS.mono, fontSize: 12.5, color: T.accent }}>{scaleQty(ing.q, factor)}</span>
                      <span style={{ fontFamily: CN_FONTS.body, fontSize: 13, color: T.text }}>{ing.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {phase >= n && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: 0 }}>
            <div style={{ fontFamily: CN_FONTS.serif, fontStyle: 'italic', fontSize: 46, color: T.text, lineHeight: 1.05 }}>Bon appétit !</div>
            <div style={{ margin: '14px auto 22px' }}><CNBelgianDots size={6} gap={6} /></div>
            {recipe.claudy.length > 0 && (
              <div style={{ background: T.card, border: `1px solid ${T.cardBd}`, borderRadius: 12, padding: '16px 18px', textAlign: 'left', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <CNIcon name="user" size={15} color={T.accent} />
                  <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 10, letterSpacing: '.13em', textTransform: 'uppercase', color: T.accent }}>Le conseil de Claudy</span>
                </div>
                {recipe.claudy.map((c, i) => (
                  <p key={i} style={{ fontFamily: CN_FONTS.body, fontSize: 13.5, fontStyle: 'italic', color: T.muted, lineHeight: 1.6, margin: i > 0 ? '8px 0 0' : 0 }}>{c}</p>
                ))}
              </div>
            )}
            {recipe.footerTips.filter(t => t.label === 'Conservation' || t.label === 'Suggestion').map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', textAlign: 'left', padding: '10px 4px', borderBottom: `1px solid ${T.line}` }}>
                <CNIcon name={t.label === 'Conservation' ? 'snow' : 'glass'} size={16} color={T.faint} style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: T.faint, display: 'block', marginBottom: 2 }}>{t.label}</span>
                  <span style={{ fontFamily: CN_FONTS.body, fontSize: 12.5, fontStyle: 'italic', color: T.muted, lineHeight: 1.5 }}>{t.text}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ flexShrink: 0, display: 'flex', gap: 12, alignItems: 'center', padding: '12px 20px 40px' }}>
        {phase < n ? (
          <React.Fragment>
            {navBtn(-1, phase <= -1)}
            <button onClick={() => go(phase + 1)} style={{
              flex: 1, height: 54, borderRadius: 9999, border: 'none', cursor: 'pointer',
              background: T.btnBg, color: T.btnFg, fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 15.5,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'all .15s ease',
            }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={e => e.currentTarget.style.transform = 'none'}>
              {phase === -1 ? 'C’est parti' : isLastStep ? 'Terminer' : 'Étape suivante'}
              <CNIcon name="arrowR" size={18} color={T.btnFg} />
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {navBtn(-1, false)}
            <button onClick={onExit} style={{
              flex: 1, height: 54, borderRadius: 9999, border: 'none', cursor: 'pointer',
              background: T.btnBg, color: T.btnFg, fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 15.5, transition: 'all .15s ease',
            }}>Retour à la recette</button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
