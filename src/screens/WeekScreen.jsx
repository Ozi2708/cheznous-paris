import React from 'react';
import { CN_FONTS, chMeta, CNIcon } from '../helpers.jsx';
import { cnApplyFilters, CN_EMPTY_FILTERS, CN_DAYS, CN_SLOTS } from '../utils.js';
import { CHEZNOUS_DATA } from '../data.js';

function CNPickerSheet({ open, onClose, onPick, slotLabel }) {
  const [q, setQ] = React.useState('');
  const all = CHEZNOUS_DATA.recipes;
  const results = React.useMemo(() => q ? cnApplyFilters(all, { ...CN_EMPTY_FILTERS, q }) : all, [all, q]);
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 80, pointerEvents: open ? 'auto' : 'none' }} aria-hidden={!open}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(26,25,24,.4)', opacity: open ? 1 : 0, transition: 'opacity .25s ease' }}></div>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, background: '#FAFAF8', borderRadius: '24px 24px 0 0',
        transform: open ? 'translateY(0)' : 'translateY(105%)', transition: 'transform .3s cubic-bezier(.32,.72,.25,1)',
        height: '72%', display: 'flex', flexDirection: 'column', boxShadow: '0 -8px 40px rgba(26,25,24,.18)',
      }}>
        <div style={{ padding: '14px 22px 10px', flexShrink: 0 }}>
          <div style={{ width: 38, height: 4, borderRadius: 99, background: '#D5CEBE', margin: '0 auto 14px' }}></div>
          <div style={{ fontFamily: CN_FONTS.display, fontWeight: 800, fontSize: 19, color: '#1A1918', marginBottom: 12 }}>
            {slotLabel} <span style={{ fontWeight: 400, fontFamily: CN_FONTS.serif, fontStyle: 'italic', color: '#8C8780' }}>— on mange quoi ?</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#FFFFFF', border: '1.5px solid #E4DDD2', borderRadius: 9999, padding: '0 16px', height: 42 }}>
            <CNIcon name="search" size={16} color="#B8B3AA" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Chercher…"
              style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: CN_FONTS.body, fontSize: 14, color: '#1A1918', minWidth: 0 }} />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, padding: '4px 14px 30px' }}>
          {results.map(r => {
            const m = chMeta(r.chapter);
            return (
              <button key={r.id} onClick={() => { onPick(r); setQ(''); }} style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left',
                background: 'none', border: 'none', borderBottom: '1px solid #EEE8DC', padding: '11px 8px', cursor: 'pointer', minHeight: 48,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: m.color, flexShrink: 0 }}></span>
                <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 13.5, color: '#1A1918', flex: 1, lineHeight: 1.3 }}>{r.title}</span>
                <span style={{ fontFamily: CN_FONTS.mono, fontSize: 11, color: '#B8B3AA', flexShrink: 0 }}>{r.totalMin}′ · {r.nutrition.kcal} kcal</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function CNWeekScreen({ week, setWeek, onOpen }) {
  const [picking, setPicking] = React.useState(null);
  const [cleaning, setCleaning] = React.useState(false);
  const all = CHEZNOUS_DATA.recipes;
  const byId = React.useMemo(() => Object.fromEntries(all.map(r => [r.id, r])), [all]);
  const entries = Object.values(week).filter(Boolean);
  const nDone = entries.filter(e => e.done).length;
  const todayIdx = (new Date().getDay() + 6) % 7;

  const setSlot = (day, slot, val) => setWeek({ ...week, [day + '-' + slot]: val });

  return (
    <div data-screen-label="Ma semaine" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FAFAF8', position: 'relative' }}>
      <div style={{ paddingTop: 62, flexShrink: 0, padding: '62px 20px 4px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: CN_FONTS.serif, fontSize: 30, color: '#1A1918', whiteSpace: 'nowrap' }}>Ma semaine</span>
          {entries.length > 0 && <span style={{ fontFamily: CN_FONTS.mono, fontSize: 11, color: '#B8B3AA', whiteSpace: 'nowrap', flexShrink: 0 }}>{nDone} / {entries.length} cuisinés</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, minHeight: 24 }}>
          {!cleaning && (
            <React.Fragment>
              <span style={{ fontFamily: CN_FONTS.body, fontSize: 12.5, color: '#8C8780', fontStyle: 'italic', flex: 1, minWidth: 0 }}>
                {entries.length === 0 ? 'Ajoutez des plats depuis les recettes — ou ici.' : nDone === entries.length ? 'Tout est cuisiné — belle semaine !' : 'Touchez le rond une fois le plat cuisiné.'}
              </span>
              {entries.length > 0 && (
                <button onClick={() => setCleaning(true)} style={{
                  border: 'none', background: 'none', cursor: 'pointer', padding: '4px 0', flexShrink: 0,
                  fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12, color: nDone === entries.length ? '#506741' : '#8C8780', textDecoration: 'underline',
                }}>Nettoyer</button>
              )}
            </React.Fragment>
          )}
          {cleaning && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
              {nDone > 0 && (
                <button onClick={() => { const w = {}; Object.entries(week).forEach(([k, v]) => { if (v && !v.done) w[k] = v; }); setWeek(w); setCleaning(false); }} style={{
                  minHeight: 32, borderRadius: 9999, padding: '5px 13px', cursor: 'pointer', border: '1.5px solid #506741',
                  background: '#506741', color: '#FFFFFF', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11.5,
                }}>Retirer les {nDone} cuisinés</button>
              )}
              <button onClick={() => { setWeek({}); setCleaning(false); }} style={{
                minHeight: 32, borderRadius: 9999, padding: '5px 13px', cursor: 'pointer', border: '1.5px solid #D5CEBE',
                background: '#FFFFFF', color: '#3C3830', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11.5,
              }}>Tout vider</button>
              <button onClick={() => setCleaning(false)} style={{
                border: 'none', background: 'none', cursor: 'pointer', fontFamily: CN_FONTS.body, fontSize: 11.5, color: '#8C8780', textDecoration: 'underline',
              }}>Annuler</button>
            </div>
          )}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, padding: '12px 20px 120px' }}>
        {CN_DAYS.map((day, di) => {
          const isToday = di === todayIdx;
          return (
            <div key={day} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: isToday ? '#506741' : '#B8B3AA' }}>{day}</span>
                {isToday && <span style={{ fontFamily: CN_FONTS.body, fontSize: 9, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', background: '#506741', color: '#FAFAF8', borderRadius: 9999, padding: '2px 8px' }}>aujourd'hui</span>}
                <span style={{ flex: 1, height: 1, background: isToday ? '#50674133' : '#EEE8DC' }}></span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {CN_SLOTS.map(slot => {
                  const key = day + '-' + slot.id;
                  const entry = week[key];
                  const r = entry && byId[entry.id];
                  if (!r) return (
                    <button key={slot.id} onClick={() => setPicking({ day, slot: slot.id })} style={{
                      display: 'flex', alignItems: 'center', gap: 10, width: '100%', minHeight: 46,
                      background: 'transparent', border: '1.5px dashed #D5CEBE', borderRadius: 11, padding: '8px 14px',
                      cursor: 'pointer', transition: 'all .15s ease',
                    }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = '#506741'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = '#D5CEBE'}>
                      <span style={{ fontFamily: CN_FONTS.mono, fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', color: '#B8B3AA', width: 34, textAlign: 'left' }}>{slot.label}</span>
                      <CNIcon name="plus" size={14} color="#B8B3AA" />
                      <span style={{ fontFamily: CN_FONTS.body, fontSize: 12.5, color: '#B8B3AA' }}>Ajouter un plat</span>
                    </button>
                  );
                  const m = chMeta(r.chapter);
                  const done = entry.done;
                  return (
                    <div key={slot.id} style={{
                      display: 'flex', alignItems: 'center', gap: 10, width: '100%', minHeight: 52,
                      background: done ? '#F5F2EC' : '#FFFFFF', border: `1.5px solid ${done ? '#EEE8DC' : '#E4DDD2'}`,
                      borderLeft: `4px solid ${done ? '#D5CEBE' : m.color}`,
                      borderRadius: 11, padding: '8px 10px 8px 12px', transition: 'all .2s ease',
                    }}>
                      <span style={{ fontFamily: CN_FONTS.mono, fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', color: '#B8B3AA', width: 34, flexShrink: 0 }}>{slot.label}</span>
                      <button onClick={() => onOpen(r)} style={{ flex: 1, textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0, minWidth: 0 }}>
                        <span style={{ display: 'block', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 13, color: done ? '#B8B3AA' : '#1A1918', lineHeight: 1.3, textDecoration: done ? 'line-through' : 'none' }}>{r.title}</span>
                        <span style={{ fontFamily: CN_FONTS.mono, fontSize: 10.5, color: '#B8B3AA' }}>{r.totalMin}′ · {r.nutrition.kcal} kcal</span>
                      </button>
                      <button onClick={() => setSlot(day, slot.id, { ...entry, done: !done })} aria-label={done ? 'Marquer non cuisiné' : 'Marquer cuisiné'} style={{
                        width: 30, height: 30, borderRadius: '50%', flexShrink: 0, cursor: 'pointer',
                        border: `1.5px solid ${done ? '#506741' : '#D5CEBE'}`, background: done ? '#506741' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s ease',
                      }}>
                        {done && <CNIcon name="check" size={15} color="#FFFFFF" strokeWidth={2.5} />}
                      </button>
                      <button onClick={() => setSlot(day, slot.id, null)} aria-label="Retirer" style={{
                        width: 30, height: 30, borderRadius: '50%', flexShrink: 0, cursor: 'pointer',
                        border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <CNIcon name="x" size={14} color="#B8B3AA" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <CNPickerSheet open={!!picking} onClose={() => setPicking(null)}
        slotLabel={picking ? picking.day + ' ' + picking.slot : ''}
        onPick={(r) => { if (picking) { setWeek({ ...week, [picking.day + '-' + picking.slot]: { id: r.id, done: false } }); setPicking(null); } }} />
    </div>
  );
}
