import React from 'react';
import { CN_FONTS, chMeta, CNIcon } from '../helpers.jsx';
import {
  CN_BATCH_COLORS, cnConservation, cnStepType, cnBuildPlan, cnSessionMinutes, cnFmtDuration,
  cnBatchList, cnMenuIdeas, cnEquipment, cnIngKey, cnConsolidate, cnSynergies, CN_B_DAYS, CN_B_DAYS_FULL,
} from '../utils.js';
import { cnStepDurations } from '../timers.jsx';
import { CHEZNOUS_DATA } from '../data.js';

function CNKeepBadges({ r, light }) {
  const c = cnConservation(r);
  const base = { display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: CN_FONTS.mono, fontSize: 10.5, padding: '3px 9px', borderRadius: 9999, whiteSpace: 'nowrap' };
  return (
    <span style={{ display: 'inline-flex', gap: 5 }}>
      {c.frigo && <span style={{ ...base, background: light ? 'rgba(250,250,248,.14)' : '#E7F1F0', color: light ? '#FAFAF8' : '#2E8B85' }}>frigo {c.frigo} j</span>}
      {c.congel && <span style={{ ...base, background: light ? 'rgba(250,250,248,.14)' : '#EEF1FB', color: light ? '#FAFAF8' : '#5C6FAE' }}><CNIcon name="snow" size={11} color={light ? '#FAFAF8' : '#5C6FAE'} /> congél.</span>}
    </span>
  );
}

export function CNBatchScreen({ sel, setSel, onOpen, onStart }) {
  const list = React.useMemo(() => cnBatchList(CHEZNOUS_DATA.recipes), []);
  const menus = React.useMemo(() => cnMenuIdeas(list), [list]);
  const byId = React.useMemo(() => Object.fromEntries(CHEZNOUS_DATA.recipes.map(r => [r.id, r])), []);
  const [expanded, setExpanded] = React.useState(() => new Set());
  const [previewId, setPreviewId] = React.useState(menus.length ? menus[0].id : null);
  const selected = sel.map(id => byId[id]).filter(Boolean);
  const minutes = cnSessionMinutes(selected);
  const { plan, colors } = React.useMemo(() => selected.length >= 2 ? cnBuildPlan(selected) : { plan: [], colors: {} }, [sel.join()]);
  const toggle = (id) => setSel(sel.includes(id) ? sel.filter(x => x !== id) : sel.length < 5 ? [...sel, id] : sel);
  const lbl = { fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11, letterSpacing: '.11em', textTransform: 'uppercase', color: '#B8B3AA', margin: '26px 0 12px' };
  const short = (t, n) => t.length > n ? t.slice(0, n - 1) + '…' : t;
  const avgKcal = selected.length ? Math.round(selected.reduce((s, r) => s + r.nutrition.kcal, 0) / selected.length) : 0;

  const groups = React.useMemo(() => {
    const g = [];
    plan.forEach(it => {
      const last = g[g.length - 1];
      if (last && last.recipe.id === it.recipe.id) last.items.push(it);
      else g.push({ recipe: it.recipe, color: it.color, items: [it] });
    });
    return g.map((gr, gi) => {
      const lastIt = gr.items[gr.items.length - 1];
      const cookMins = lastIt.type !== 'actif' ? cnStepDurations(lastIt.html) : [];
      const prev = g[gi - 1];
      const prevPassive = prev && prev.items[prev.items.length - 1].type !== 'actif';
      return {
        ...gr, est: gr.items.length * 3,
        cook: cookMins.length ? Math.max(...cookMins) : null, oven: lastIt.type === 'four',
        kicker: gi === 0 ? 'On lance' : prevPassive ? 'Pendant ce temps' : 'On enchaîne',
        steps: gr.items.length > 1 ? `étapes ${gr.items[0].stepIdx + 1}–${lastIt.stepIdx + 1}` : `étape ${lastIt.stepIdx + 1}`,
      };
    });
  }, [plan]);

  const equipment = React.useMemo(() => selected.length >= 2 ? cnEquipment(selected) : [], [sel.join()]);
  const synergies = React.useMemo(() => selected.length >= 2 ? cnSynergies(selected) : [], [sel.join()]);
  const consolidated = React.useMemo(() => selected.length >= 2 ? cnConsolidate(selected) : [], [sel.join()]);
  const [soloOpen, setSoloOpen] = React.useState(false);
  const menuMatches = (m) => m.recipes.length === sel.length && m.recipes.every(r => sel.includes(r.id));
  const byUrgency = [...selected].sort((a, b) => (cnConservation(a).frigo || 9) - (cnConservation(b).frigo || 9));

  return (
    <div data-screen-label="Batch cooking" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FAFAF8', position: 'relative' }}>
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, paddingTop: 'var(--screen-top, 34px)' }}>
        <div style={{ padding: '10px 20px 18px', background: '#F9F1E7', borderBottom: '1.5px solid #EFE3D0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <CNIcon name="pot" size={18} color="#8A6B4A" />
            <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11, letterSpacing: '.13em', textTransform: 'uppercase', color: '#8A6B4A' }}>Batch cooking</span>
          </div>
          <div style={{ fontFamily: CN_FONTS.serif, fontSize: 27, lineHeight: 1.18, color: '#1A1918' }}>
            Cuisine 2h le dimanche,<br /><span style={{ fontStyle: 'italic', color: '#8A6B4A' }}>mange toute la semaine.</span>
          </div>
        </div>

        <div style={{ padding: '0 20px 170px' }}>
          <div style={lbl}>1 · Une idée de session ?</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 10 }}>
            {menus.map(menu => {
              const isPreview = previewId === menu.id;
              const isSel = menuMatches(menu);
              return (
                <button key={menu.id} onClick={() => setPreviewId(menu.id)} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, minHeight: 36,
                  borderRadius: 9999, padding: '7px 13px', cursor: 'pointer', transition: 'all .15s ease',
                  border: `1.5px solid ${isPreview ? '#8A6B4A' : '#E4DDD2'}`,
                  background: isPreview ? '#8A6B4A' : '#FFFFFF',
                }}>
                  <CNIcon name={menu.icon} size={14} color={isPreview ? '#FAE9D7' : '#8A6B4A'} />
                  <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12, color: isPreview ? '#FAFAF8' : '#3C3830', whiteSpace: 'nowrap' }}>{menu.title}</span>
                  {isSel && <CNIcon name="check" size={12} color={isPreview ? '#FAE9D7' : '#8A6B4A'} strokeWidth={2.5} />}
                </button>
              );
            })}
          </div>
          {menus.filter(m => m.id === previewId).map(menu => {
            const active = menuMatches(menu);
            const mins = cnSessionMinutes(menu.recipes);
            return (
              <div key={menu.id} style={{ background: '#FFFFFF', border: '1.5px solid #E4DDD2', borderRadius: 14, padding: '13px 14px 12px' }}>
                <div style={{ fontFamily: CN_FONTS.body, fontSize: 11.5, fontStyle: 'italic', color: '#8C8780', marginBottom: 10 }}>{menu.desc}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 12 }}>
                  {menu.recipes.map((r, ri) => (
                    <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: CN_BATCH_COLORS[ri], flexShrink: 0 }}></span>
                      <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12.5, color: '#1A1918', flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.title}</span>
                      <span style={{ fontFamily: CN_FONTS.mono, fontSize: 10.5, color: '#B8B3AA', flexShrink: 0 }}>{r.totalMin}′ · {r.nutrition.kcal} kcal</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: CN_FONTS.mono, fontSize: 11, color: '#8A6B4A', flexShrink: 0 }}>~{cnFmtDuration(mins)} en cuisine</span>
                  <button onClick={() => setSel(active ? [] : menu.recipes.map(r => r.id))} style={{
                    marginLeft: 'auto', minHeight: 38, borderRadius: 9999, padding: '8px 18px', cursor: 'pointer',
                    border: `1.5px solid ${active ? '#D5CEBE' : '#8A6B4A'}`,
                    background: active ? 'transparent' : '#8A6B4A',
                    fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12.5,
                    color: active ? '#8C8780' : '#FFFFFF', transition: 'all .15s ease', whiteSpace: 'nowrap',
                  }}>{active ? '✓ Sélectionné — vider' : 'Choisir ce menu'}</button>
                </div>
              </div>
            );
          })}

          <div style={lbl}>… ou composez la vôtre <span style={{ color: '#D5CEBE' }}>·</span> <span style={{ color: '#8A6B4A' }}>{list.length} plats compatibles</span></div>
          <div style={{ fontFamily: CN_FONTS.body, fontSize: 11.5, fontStyle: 'italic', color: '#B8B3AA', margin: '-6px 0 10px' }}>2 à 5 plats qui tiennent au moins 3 jours au frais.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {list.map(r => {
              const on = sel.includes(r.id);
              const m = chMeta(r.chapter);
              return (
                <div key={r.id} style={{
                  display: 'flex', alignItems: 'center', gap: 11, minHeight: 56,
                  background: '#FFFFFF', border: `1.5px solid ${on ? '#8A6B4A' : '#E4DDD2'}`,
                  borderRadius: 12, padding: '9px 12px', transition: 'all .15s ease',
                  boxShadow: on ? '0 2px 10px rgba(138,107,74,.12)' : 'none',
                }}>
                  <button onClick={() => toggle(r.id)} aria-label={on ? 'Retirer du batch' : 'Ajouter au batch'} style={{
                    width: 26, height: 26, borderRadius: 8, flexShrink: 0, cursor: 'pointer',
                    border: `1.5px solid ${on ? '#8A6B4A' : '#D5CEBE'}`, background: on ? '#8A6B4A' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s ease',
                  }}>
                    {on && <CNIcon name="check" size={15} color="#FFFFFF" strokeWidth={2.5} />}
                  </button>
                  <button onClick={() => onOpen(r)} style={{ flex: 1, textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0, minWidth: 0 }}>
                    <span style={{ display: 'block', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 13, color: '#1A1918', lineHeight: 1.3 }}>{r.title}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: CN_FONTS.mono, fontSize: 10.5, color: m.color }}>{r.totalMin}′</span>
                      <span style={{ fontFamily: CN_FONTS.mono, fontSize: 10.5, color: '#E07534' }}>{r.nutrition.kcal} kcal</span>
                      <span style={{ fontFamily: CN_FONTS.mono, fontSize: 10.5, color: '#3E7852' }}>{r.nutrition.proteines}g prot</span>
                      <CNKeepBadges r={r} />
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {selected.length > 0 && (
            <div>
              <div style={lbl}>Votre session</div>
              <div style={{ background: '#FFFFFF', border: '1.5px solid #E4DDD2', borderRadius: 14, padding: '14px 16px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                  {selected.map(r => (
                    <button key={r.id} onClick={() => toggle(r.id)} title="Retirer" style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11,
                      color: '#3C3830', background: '#F5F2EC', border: 'none', borderRadius: 9999, padding: '6px 11px', cursor: 'pointer',
                    }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: colors[r.id] || CN_BATCH_COLORS[selected.indexOf(r) % 5] }}></span>
                      {short(r.title, 24)}
                      <CNIcon name="x" size={10} color="#B8B3AA" />
                    </button>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid #EEE8DC', paddingTop: 12 }}>
                  {[
                    { v: selected.length * 2, l: 'repas préparés' },
                    { v: '~' + cnFmtDuration(minutes), l: 'en cuisine' },
                    { v: avgKcal, l: 'kcal / portion' },
                  ].map((s, i) => (
                    <div key={i} style={{ textAlign: 'center', borderLeft: i > 0 ? '1px solid #EEE8DC' : 'none' }}>
                      <div style={{ fontFamily: CN_FONTS.display, fontWeight: 800, fontSize: 19, color: '#8A6B4A' }}>{s.v}</div>
                      <div style={{ fontFamily: CN_FONTS.body, fontSize: 9.5, letterSpacing: '.08em', textTransform: 'uppercase', color: '#B8B3AA', marginTop: 2 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
                {synergies.length > 0 && (
                  <div style={{ borderTop: '1px solid #EEE8DC', marginTop: 12, paddingTop: 12 }}>
                    <div style={{ fontFamily: CN_FONTS.serif, fontStyle: 'italic', fontSize: 16, color: '#1A1918', marginBottom: 9 }}>Pourquoi ces plats ensemble ?</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {synergies.map((s, si) => (
                        <div key={si} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                          <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#EDF1E7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <CNIcon name={s.icon} size={12} color="#506741" />
                          </span>
                          <span style={{ fontFamily: CN_FONTS.body, fontSize: 12, color: '#3C3830', lineHeight: 1.5 }}>{s.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {selected.length >= 2 && (
            <div>
              <div style={lbl}>2 · Le plan en un coup d'œil</div>
              {equipment.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12, alignItems: 'center' }}>
                  <span style={{ fontFamily: CN_FONTS.body, fontSize: 11, color: '#8C8780', fontStyle: 'italic' }}>À sortir :</span>
                  {equipment.map(e => (
                    <span key={e} style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11, color: '#6B5138', background: '#EEE8DC', borderRadius: 9999, padding: '5px 12px' }}>{e}</span>
                  ))}
                </div>
              )}
              <div>
                {groups.map((g, gi) => {
                  const isOpen = expanded.has(gi);
                  const isLast = gi === groups.length - 1;
                  return (
                    <div key={gi} style={{ display: 'flex', gap: 12 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 14, flexShrink: 0 }}>
                        <span style={{ width: 12, height: 12, borderRadius: '50%', background: g.color, marginTop: 16, flexShrink: 0, boxShadow: '0 0 0 3px #FAFAF8, 0 0 0 4.5px ' + g.color + '44' }}></span>
                        {!isLast && <span style={{ width: 2, flex: 1, background: '#E4DDD2', marginTop: 4 }}></span>}
                      </div>
                      <div style={{ flex: 1, minWidth: 0, paddingBottom: 10 }}>
                        <button onClick={() => {
                          const next = new Set(expanded);
                          isOpen ? next.delete(gi) : next.add(gi);
                          setExpanded(next);
                        }} style={{
                          width: '100%', textAlign: 'left', cursor: 'pointer', background: '#FFFFFF',
                          border: '1.5px solid #E4DDD2', borderRadius: 12, padding: '12px 14px',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: g.color, marginBottom: 3 }}>
                                {g.kicker}
                              </div>
                              <div style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 13, color: '#1A1918', lineHeight: 1.3 }}>{g.recipe.title}</div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 5, flexWrap: 'wrap' }}>
                                <span style={{ fontFamily: CN_FONTS.mono, fontSize: 10.5, color: '#8C8780', whiteSpace: 'nowrap' }}>{g.steps} · ~{g.est} min</span>
                                {g.cook && (
                                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: CN_FONTS.mono, fontSize: 10.5, color: g.oven ? '#E07534' : '#2E8B85', background: g.oven ? '#FDF0E7' : '#E7F1F0', borderRadius: 9999, padding: '2px 9px', whiteSpace: 'nowrap' }}>
                                    <CNIcon name={g.oven ? 'flame' : 'clock'} size={11} color={g.oven ? '#E07534' : '#2E8B85'} />
                                    puis {g.cook} min {g.oven ? 'au four' : 'de cuisson'}
                                  </span>
                                )}
                              </div>
                            </div>
                            <CNIcon name="chevR" size={15} color="#B8B3AA" style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform .2s ease', flexShrink: 0 }} />
                          </div>
                          {isOpen && (
                            <div style={{ borderTop: '1px solid #EEE8DC', marginTop: 10, paddingTop: 10 }}>
                              {g.items.map((it, ii) => (
                                <div key={ii} style={{ display: 'flex', gap: 9, padding: '3px 0' }}>
                                  <span style={{ fontFamily: CN_FONTS.mono, fontSize: 10.5, color: g.color, flexShrink: 0, paddingTop: 2 }}>{it.stepIdx + 1}.</span>
                                  <span style={{ fontFamily: CN_FONTS.body, fontSize: 12, color: '#3C3830', lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: it.html }}></span>
                                </div>
                              ))}
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ fontFamily: CN_FONTS.body, fontSize: 11.5, fontStyle: 'italic', color: '#B8B3AA', marginTop: 2 }}>
                Touchez une phase pour voir le détail — le mode session vous guidera étape par étape.
              </div>

              {consolidated.length > 0 && (() => {
                const shared = consolidated.filter(c => c.uses.length > 1 && !c.staple);
                const solo = consolidated.filter(c => c.uses.length === 1 && !c.staple);
                const staples = consolidated.filter(c => c.staple);
                return (
                  <div>
                    <div style={lbl}>3 · Les courses <span style={{ color: '#D5CEBE' }}>·</span> <span style={{ color: '#8A6B4A' }}>{shared.length + solo.length} ingrédients, {shared.length} partagés</span></div>
                    <div style={{ background: '#FFFFFF', border: '1.5px solid #E4DDD2', borderRadius: 14, padding: '14px 14px 12px' }}>
                      {shared.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: solo.length ? 12 : 0 }}>
                          {shared.map(c => (
                            <span key={c.key} style={{
                              display: 'inline-flex', alignItems: 'center', gap: 7,
                              border: '1.5px solid #DCBE98', background: '#FDFAF4', borderRadius: 9999, padding: '6px 12px',
                            }}>
                              <span style={{ display: 'inline-flex', gap: 3 }}>
                                {c.uses.map((u, ui) => (
                                  <span key={ui} style={{ width: 7, height: 7, borderRadius: '50%', background: colors[u.recipe.id] || '#8A6B4A' }}></span>
                                ))}
                              </span>
                              <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12, color: '#1A1918' }}>{c.name.split(',')[0].replace(/\(s\)/g, '').trim()}</span>
                              <span style={{ fontFamily: CN_FONTS.mono, fontSize: 10.5, color: '#8A6B4A' }}>{c.total || '×' + c.uses.length}</span>
                            </span>
                          ))}
                        </div>
                      )}
                      {solo.length > 0 && (
                        <div>
                          <button onClick={() => setSoloOpen(!soloOpen)} style={{
                            display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer',
                            padding: '2px 0', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11.5, color: '#8C8780',
                          }}>
                            <CNIcon name="chevR" size={12} color="#B8B3AA" style={{ transform: soloOpen ? 'rotate(90deg)' : 'none', transition: 'transform .2s ease' }} />
                            {soloOpen ? 'Masquer' : 'Voir'} les {solo.length} ingrédients propres à chaque plat
                          </button>
                          {soloOpen && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                              {solo.map(c => (
                                <span key={c.key} style={{
                                  display: 'inline-flex', alignItems: 'center', gap: 6,
                                  border: '1px solid #EEE8DC', background: '#FAFAF8', borderRadius: 9999, padding: '4px 10px',
                                }}>
                                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors[c.uses[0].recipe.id] || '#B8B3AA' }}></span>
                                  <span style={{ fontFamily: CN_FONTS.body, fontSize: 11, color: '#3C3830' }}>{c.name.split(',')[0].replace(/\(s\)/g, '').trim()}</span>
                                  <span style={{ fontFamily: CN_FONTS.mono, fontSize: 10, color: '#B8B3AA' }}>{c.uses[0].q}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      {staples.length > 0 && (
                        <div style={{ fontFamily: CN_FONTS.body, fontSize: 11, fontStyle: 'italic', color: '#B8B3AA', borderTop: '1px solid #F5F2EC', marginTop: 10, paddingTop: 9 }}>
                          Toujours sous la main : {staples.map(s => s.name.toLowerCase()).join(', ')}.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}

              <div style={lbl}>4 · La semaine au frigo</div>
              <div style={{ background: '#FFFFFF', border: '1.5px solid #E4DDD2', borderRadius: 14, padding: '14px 16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: `90px repeat(7, 1fr)`, gap: 3, marginBottom: 8 }}>
                  <span></span>
                  {CN_B_DAYS.map((d, di) => (
                    <span key={d} style={{ fontFamily: CN_FONTS.mono, fontSize: 9, color: di === 0 ? '#8A6B4A' : '#B8B3AA', textAlign: 'center', textTransform: 'uppercase' }}>{d}</span>
                  ))}
                  {byUrgency.map(r => {
                    const c = cnConservation(r);
                    const lastDay = Math.min(6, c.frigo || 2);
                    return (
                      <React.Fragment key={r.id}>
                        <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 10, color: '#3C3830', lineHeight: 1.25, alignSelf: 'center', paddingRight: 4 }}>{short(r.title, 22)}</span>
                        {CN_B_DAYS.map((d, di) => (
                          <span key={di} style={{
                            height: 18, borderRadius: di === 0 ? '5px 0 0 5px' : di === lastDay ? '0 5px 5px 0' : 0,
                            background: di <= lastDay ? (colors[r.id] || '#506741') : '#F5F2EC',
                            opacity: di <= lastDay ? (di === lastDay ? 1 : .55) : 1, alignSelf: 'center',
                          }}></span>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </div>
                <div style={{ borderTop: '1px solid #EEE8DC', paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {byUrgency.map((r, ri) => {
                    const c = cnConservation(r);
                    return (
                      <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: colors[r.id] || '#506741', flexShrink: 0 }}></span>
                        <span style={{ fontFamily: CN_FONTS.body, fontSize: 11, color: '#8C8780' }}>
                          <strong style={{ color: '#3C3830' }}>{short(r.title, 30)}</strong> — à manger avant {CN_B_DAYS_FULL[Math.min(6, c.frigo || 2)]}{ri === 0 ? ' · en premier' : ''}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ fontFamily: CN_FONTS.body, fontSize: 11.5, fontStyle: 'italic', color: '#B8B3AA', marginTop: 8 }}>
                Session le dimanche · commencez par les plats qui se gardent le moins longtemps.
              </div>
            </div>
          )}
        </div>
      </div>

      {selected.length > 0 && (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 'calc(64px + env(safe-area-inset-bottom, 0px))', padding: '14px 20px 10px', background: 'linear-gradient(to top, #FAFAF8 70%, rgba(250,250,248,0))' }}>
          <button onClick={onStart} disabled={selected.length < 2} style={{
            width: '100%', height: 54, borderRadius: 9999, border: 'none',
            cursor: selected.length < 2 ? 'default' : 'pointer',
            background: selected.length < 2 ? '#D5CEBE' : '#8A6B4A', color: '#FFFFFF',
            fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 15,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            boxShadow: selected.length < 2 ? 'none' : '0 6px 20px rgba(138,107,74,.3)', transition: 'all .2s ease',
          }}>
            <CNIcon name="pot" size={19} color="#FFFFFF" />
            {selected.length < 2 ? `Choisissez encore ${2 - selected.length} plat` : `Lancer la session · ${selected.length} plats · ~${cnFmtDuration(minutes)}`}
          </button>
        </div>
      )}
    </div>
  );
}
