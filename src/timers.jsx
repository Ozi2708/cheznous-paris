import React, { useState, useEffect, useMemo } from 'react';
import { CN_FONTS, CNIcon, ingredientTokens } from './helpers.jsx';

const CN_TIMERS_KEY = 'cheznous_timers_v1';

export function cnStepDurations(html) {
  const plain = html.replace(/<[^>]+>/g, ' ');
  const out = [];
  const reMin = /(\d+)\s*(?:à|-)\s*(\d+)\s*min|(\d+)\s*min/gi;
  let m;
  while ((m = reMin.exec(plain)) !== null) {
    const v = m[2] ? +m[2] : +m[3];
    if (v >= 2 && v <= 180 && !out.includes(v)) out.push(v);
  }
  const reH = /(\d+)\s*h(?:eure)?s?\b/gi;
  while ((m = reH.exec(plain)) !== null) {
    const v = +m[1] * 60;
    if (v <= 360 && !out.includes(v)) out.push(v);
  }
  return out.slice(0, 3);
}

function cnLoadTimers() {
  try { return (JSON.parse(localStorage.getItem(CN_TIMERS_KEY)) || []).filter(t => t.endsAt > Date.now() - 30 * 60000); }
  catch (e) { return []; }
}

export function useCNTimers() {
  const [timers, setTimers] = useState(cnLoadTimers);
  const [, force] = useState(0);
  useEffect(() => {
    if (!timers.length) return;
    const iv = setInterval(() => force(x => x + 1), 1000);
    return () => clearInterval(iv);
  }, [timers.length]);
  const save = (ts) => { setTimers(ts); localStorage.setItem(CN_TIMERS_KEY, JSON.stringify(ts)); };
  const addTimer = (label, minutes) => save([...timers, { id: Date.now() + ':' + minutes, label, minutes, endsAt: Date.now() + minutes * 60000 }]);
  const removeTimer = (id) => save(timers.filter(t => t.id !== id));
  return { timers, addTimer, removeTimer };
}

function cnFmtRemaining(ms) {
  const s = Math.max(0, Math.round(ms / 1000));
  const mn = Math.floor(s / 60), sec = s % 60;
  if (mn >= 60) return Math.floor(mn / 60) + 'h' + String(mn % 60).padStart(2, '0');
  return mn + ':' + String(sec).padStart(2, '0');
}

export function CNActiveTimers({ timers, removeTimer, T }) {
  if (!timers.length) return null;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
      {timers.map(t => {
        const left = t.endsAt - Date.now();
        const done = left <= 0;
        return (
          <button key={t.id} onClick={() => removeTimer(t.id)} className={done ? 'cn-timer-done' : ''}
            title={done ? 'Toucher pour arrêter' : t.label} style={{
              display: 'inline-flex', alignItems: 'center', gap: 7, cursor: 'pointer', minHeight: 34,
              borderRadius: 9999, padding: '5px 12px', transition: 'all .2s ease',
              border: `1.5px solid ${done ? '#E07534' : T.cardBd}`,
              background: done ? '#E07534' : T.card,
            }}>
            <CNIcon name="clock" size={14} color={done ? '#FFFFFF' : T.accent} />
            <span style={{ fontFamily: CN_FONTS.mono, fontSize: 13, fontWeight: 500, color: done ? '#FFFFFF' : T.accent }}>
              {done ? 'C’est prêt !' : cnFmtRemaining(left)}
            </span>
            <span style={{ fontFamily: CN_FONTS.body, fontSize: 10.5, color: done ? 'rgba(255,255,255,.85)' : T.muted, maxWidth: 110, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.label}</span>
            <CNIcon name="x" size={11} color={done ? '#FFFFFF' : T.faint} />
          </button>
        );
      })}
    </div>
  );
}

export function CNTimerChips({ html, label, timers, addTimer, T }) {
  const durations = useMemo(() => cnStepDurations(html), [html]);
  if (!durations.length) return null;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
      {durations.map(mn => {
        const running = timers.some(t => t.label === label && t.minutes === mn && t.endsAt > Date.now());
        return (
          <button key={mn} disabled={running} onClick={() => addTimer(label, mn)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 40,
            borderRadius: 9999, padding: '8px 16px', cursor: running ? 'default' : 'pointer',
            border: `1.5px dashed ${running ? T.cardBd : T.accent}`, background: 'transparent',
            opacity: running ? .45 : 1, transition: 'all .15s ease',
          }}>
            <CNIcon name="clock" size={15} color={T.accent} />
            <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 13, color: T.accent }}>
              {running ? `Minuteur ${mn} min en cours` : `Lancer ${mn} min`}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function cnAssignTips(recipe) {
  const stepTok = recipe.steps.map(s => new Set(ingredientTokens(s.replace(/<[^>]+>/g, ' '))));
  const tips = [
    ...recipe.tips.map(t => ({ title: t.title || 'Astuce', text: t.text })),
    ...(recipe.footerTips || []).filter(f => f.label === 'Conseil').map(f => ({ title: 'Conseil', text: f.text })),
  ];
  const map = {};
  tips.forEach(tip => {
    const tk = ingredientTokens(tip.title + ' ' + tip.text).filter(w => w.length >= 4);
    let best = -1, score = 1;
    stepTok.forEach((st, i) => {
      const sc = tk.filter(w => st.has(w)).length;
      if (sc > score) { score = sc; best = i; }
    });
    if (best >= 0) (map[best] = map[best] || []).push(tip);
  });
  return map;
}

export function CNStepTip({ tip, T }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: T.card, border: `1px solid ${T.cardBd}`, borderRadius: 11, padding: '11px 14px', marginTop: 14 }}>
      <CNIcon name="bulb" size={16} color={T.accent} style={{ flexShrink: 0, marginTop: 1 }} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 10, letterSpacing: '.11em', textTransform: 'uppercase', color: T.accent, marginBottom: 3 }}>{tip.title}</div>
        <div style={{ fontFamily: CN_FONTS.body, fontSize: 12.5, fontStyle: 'italic', color: T.muted, lineHeight: 1.55 }}>{tip.text}</div>
      </div>
    </div>
  );
}
