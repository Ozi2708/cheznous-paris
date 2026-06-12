/* ── Session batch « 2h chrono » — multi-recettes entrelacées ──
   (l'écran principal + helpers vivent dans screen-batch-main.jsx) */
const { useState: useStateB, useEffect: useEffectB, useMemo: useMemoB } = React;

/* ── Mode session 2h chrono — multi-recettes entrelacées ── */
function CNBatchCookScreen({ sel, onExit }) {
  const byId = useMemoB(() => Object.fromEntries(window.CHEZNOUS_DATA.recipes.map(r => [r.id, r])), []);
  const selected = sel.map(id => byId[id]).filter(Boolean);
  const { plan, colors } = useMemoB(() => cnBuildPlan(selected), [sel.join()]);
  const [phase, setPhase] = useStateB(-1);
  const [miseChecked, setMiseChecked] = useStateB(() => new Set());
  const { timers, addTimer, removeTimer } = useCNTimers();
  const n = plan.length;
  const T = cnCookTheme('olive');

  const go = (p) => setPhase(Math.max(-1, Math.min(n, p)));
  useEffectB(() => {
    const h = (e) => {
      if (e.key === 'ArrowRight') go(phase + 1);
      if (e.key === 'ArrowLeft') go(phase - 1);
      if (e.key === 'Escape') onExit();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });

  const it = phase >= 0 && phase < n ? plan[phase] : null;
  const stepHtml = (s) => s.replace(/<strong>/g, `<strong style="color:#DCBE98;font-weight:700">`);
  const stepIngs = it ? ingredientsForStep(it.recipe, it.stepIdx) : [];
  /* ingrédients partagés entre plats → pastilles dans la mise en place */
  const sharedMap = useMemoB(() => {
    const m = {};
    cnConsolidate(selected).forEach(c => { if (c.uses.length > 1) m[c.key] = c.uses.map(u => u.recipe.id); });
    return m;
  }, [sel.join()]);

  return (
    <div data-screen-label="Session batch — 2h chrono" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: T.bg, position: 'relative' }}>
      <div style={{ flexShrink: 0, padding: '58px 18px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onExit} aria-label="Quitter la session" style={{
            width: 44, height: 44, borderRadius: 9999, border: `1.5px solid ${T.ghostBd}`, background: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
          }}>
            <CNIcon name="x" size={17} color={T.ghostFg}></CNIcon>
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 10, letterSpacing: '.13em', textTransform: 'uppercase', color: T.faint }}>Session batch · {selected.length} plats</div>
            <div style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 13, color: T.text }}>2h chrono</div>
          </div>
          <span style={{ fontFamily: CN_FONTS.mono, fontSize: 12, color: T.muted, flexShrink: 0, whiteSpace: 'nowrap' }}>
            {phase === -1 ? 'mise en place' : phase >= n ? 'fini !' : `${phase + 1} / ${n}`}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 3, marginTop: 14 }}>
          {plan.map((p, i) => (
            <span key={i} style={{ flex: 1, height: 3.5, borderRadius: 99, background: phase >= 0 && i <= Math.min(phase, n - 1) ? p.color : T.seg, opacity: phase >= 0 && i <= Math.min(phase, n - 1) ? 1 : .5, transition: 'background .25s ease' }}></span>
          ))}
        </div>
        <CNActiveTimers timers={timers} removeTimer={removeTimer} T={T}></CNActiveTimers>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, padding: '22px 22px 16px', display: 'flex', flexDirection: 'column' }}>
        {phase === -1 && (
          <div>
            <div style={{ fontFamily: CN_FONTS.serif, fontStyle: 'italic', fontSize: 30, color: T.text, lineHeight: 1.15, marginBottom: 6 }}>La grande mise en place</div>
            <div style={{ fontFamily: CN_FONTS.body, fontSize: 13.5, color: T.muted, marginBottom: 18 }}>Tout sortir d'un coup — par plat, pour 2 personnes. Les points <span style={{ display: 'inline-flex', gap: 2, verticalAlign: 'middle' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#DCBE98', display: 'inline-block' }}></span><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(250,250,248,.5)', display: 'inline-block' }}></span></span> signalent un ingrédient partagé : sortez-le une seule fois.</div>
            {selected.map(r => {
              const color = colors[r.id];
              const items = r.ingredients.flatMap((s, si) => s.items.map((ing, ii) => ({ ...ing, key: r.id + ':' + si + ':' + ii })));
              return (
                <div key={r.id} style={{ marginBottom: 18 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: color }}></span>
                    <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12, color: T.text }}>{r.title}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {items.map(ing => {
                      const done = miseChecked.has(ing.key);
                      return (
                        <button key={ing.key} onClick={() => {
                          const next = new Set(miseChecked);
                          done ? next.delete(ing.key) : next.add(ing.key);
                          setMiseChecked(next);
                        }} style={{
                          display: 'flex', alignItems: 'center', gap: 11, width: '100%', minHeight: 42,
                          background: T.card, border: `1px solid ${done ? color : T.cardBd}`, borderRadius: 10,
                          padding: '7px 12px', cursor: 'pointer', textAlign: 'left', transition: 'all .15s ease', opacity: done ? .5 : 1,
                        }}>
                          <span style={{ width: 19, height: 19, borderRadius: 6, flexShrink: 0, border: `1.5px solid ${done ? color : T.ghostBd}`, background: done ? color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {done && <CNIcon name="check" size={12} color="#FAFAF8" strokeWidth={2.5}></CNIcon>}
                          </span>
                          <span style={{ fontFamily: CN_FONTS.body, fontSize: 13.5, color: T.text, flex: 1, textDecoration: done ? 'line-through' : 'none', display: 'inline-flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ing.name}</span>
                            {sharedMap[cnIngKey(ing.name)] && (
                              <span style={{ display: 'inline-flex', gap: 3, flexShrink: 0 }} title="Aussi utilisé par un autre plat">
                                {sharedMap[cnIngKey(ing.name)].filter(id => id !== r.id).map(id => (
                                  <span key={id} style={{ width: 7, height: 7, borderRadius: '50%', background: colors[id], boxShadow: '0 0 0 1.5px rgba(250,250,248,.4)' }}></span>
                                ))}
                              </span>
                            )}
                          </span>
                          <span style={{ fontFamily: CN_FONTS.mono, fontSize: 12, color: T.accent, whiteSpace: 'nowrap' }}>{ing.q}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {it && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: it.color }}></span>
                <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: T.muted }}>
                  {it.recipe.title.length > 34 ? it.recipe.title.slice(0, 33) + '…' : it.recipe.title} · étape {it.stepIdx + 1}
                </span>
              </div>
              <p key={phase} className="cn-step-in" style={{ fontFamily: CN_FONTS.body, fontWeight: 500, fontSize: 23, lineHeight: 1.45, color: T.text, margin: 0, textWrap: 'pretty' }}
                dangerouslySetInnerHTML={{ __html: stepHtml(it.html) }}></p>
              <CNTimerChips html={it.html} label={(it.recipe.title.length > 18 ? it.recipe.title.slice(0, 17) + '…' : it.recipe.title)} timers={timers} addTimer={addTimer} T={T}></CNTimerChips>
              {(cnAssignTips(it.recipe)[it.stepIdx] || []).map((tip, ti) => <CNStepTip key={ti} tip={tip} T={T}></CNStepTip>)}
            </div>
            {stepIngs.length > 0 && (
              <div style={{ paddingTop: 22 }}>
                <div style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 10, letterSpacing: '.13em', textTransform: 'uppercase', color: T.faint, marginBottom: 9 }}>Pour cette étape</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {stepIngs.map((ing, i) => (
                    <span key={i} style={{ display: 'inline-flex', alignItems: 'baseline', gap: 7, background: T.card, border: `1px solid ${T.cardBd}`, borderRadius: 9999, padding: '7px 13px' }}>
                      <span style={{ fontFamily: CN_FONTS.mono, fontSize: 12, color: T.accent }}>{ing.q}</span>
                      <span style={{ fontFamily: CN_FONTS.body, fontSize: 12.5, color: T.text }}>{ing.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {phase >= n && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ fontFamily: CN_FONTS.serif, fontStyle: 'italic', fontSize: 40, color: T.text, lineHeight: 1.1 }}>La semaine est prête.</div>
            <div style={{ margin: '14px auto 24px' }}><CNBelgianDots size={6} gap={6}></CNBelgianDots></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}>
              {selected.map(r => {
                const c = cnConservation(r);
                return (
                  <div key={r.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: T.card, border: `1px solid ${T.cardBd}`, borderRadius: 11, padding: '11px 14px' }}>
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: colors[r.id], flexShrink: 0, marginTop: 5 }}></span>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12.5, color: T.text, marginBottom: 3 }}>{r.title}</div>
                      <div style={{ fontFamily: CN_FONTS.body, fontSize: 11.5, fontStyle: 'italic', color: T.muted, lineHeight: 1.5 }}>{c.text || 'À déguster dans les 2 jours.'}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div style={{ flexShrink: 0, display: 'flex', gap: 12, alignItems: 'center', padding: '12px 20px 40px' }}>
        <button onClick={() => go(phase - 1)} disabled={phase <= -1} aria-label="Étape précédente" style={{
          width: 54, height: 54, borderRadius: 9999, flexShrink: 0,
          border: `1.5px solid ${T.ghostBd}`, background: 'transparent', cursor: phase <= -1 ? 'default' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: phase <= -1 ? .3 : 1,
        }}>
          <CNIcon name="back" size={22} color={T.ghostFg}></CNIcon>
        </button>
        {phase < n ? (
          <button onClick={() => go(phase + 1)} style={{
            flex: 1, height: 54, borderRadius: 9999, border: 'none', cursor: 'pointer',
            background: T.btnBg, color: T.btnFg, fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 15.5,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            {phase === -1 ? 'C\u2019est parti' : phase === n - 1 ? 'Terminer' : 'Étape suivante'}
            <CNIcon name="arrowR" size={18} color={T.btnFg}></CNIcon>
          </button>
        ) : (
          <button onClick={onExit} style={{
            flex: 1, height: 54, borderRadius: 9999, border: 'none', cursor: 'pointer',
            background: T.btnBg, color: T.btnFg, fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 15.5,
          }}>Retour au batch</button>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { CNBatchCookScreen });
