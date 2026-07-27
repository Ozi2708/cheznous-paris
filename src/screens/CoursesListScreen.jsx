import React from 'react';
import { CN_FONTS, CNIcon } from '../helpers.jsx';
import { cnCartLines, cnCartCopyText } from '../courses.js';
import { cnRayon } from '../courses-data.js';

const CN_ACCENT = '#B85C38';

const CN_SRC_META = {
  recette: { label: 'recette', color: '#506741', soft: '#EDF1E7' },
  placard: { label: 'placard', color: '#8A6B4A', soft: '#F9F1E7' },
  produit: { label: 'habitude', color: '#B85C38', soft: '#FBEDE7' },
  manuel:  { label: 'ajouté',   color: '#5C6FAE', soft: '#EEF1FB' },
};

async function cnCopy(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) { await navigator.clipboard.writeText(text); return true; }
  } catch (e) { /* on tente le repli */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.focus(); ta.select();
    const ok = document.execCommand('copy'); document.body.removeChild(ta); return ok;
  } catch (e) { return false; }
}

function CNCartRow({ line, onToggle, onRemove }) {
  const src = CN_SRC_META[line.srcs[0]] || CN_SRC_META.manuel;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 11, borderBottom: '1px solid #EEE8DC',
      padding: '3px 2px', opacity: line.done ? .42 : 1, transition: 'opacity .15s ease',
    }}>
      <button onClick={onToggle} style={{
        flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 11, textAlign: 'left',
        background: 'none', border: 'none', padding: '9px 0', cursor: 'pointer', minHeight: 44,
      }}>
        <span style={{
          width: 21, height: 21, borderRadius: 6, flexShrink: 0,
          border: `1.5px solid ${line.done ? CN_ACCENT : '#D5CEBE'}`, background: line.done ? CN_ACCENT : '#FFFFFF',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{line.done && <CNIcon name="check" size={13} color="#FFFFFF" strokeWidth={2.5} />}</span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{
            display: 'block', fontFamily: CN_FONTS.body, fontSize: 14, color: '#1A1918', lineHeight: 1.3,
            textDecoration: line.done ? 'line-through' : 'none',
          }}>{line.name}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
            <span style={{
              fontFamily: CN_FONTS.body, fontSize: 9, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase',
              color: src.color, background: src.soft, borderRadius: 9999, padding: '2px 7px',
            }}>{src.label}</span>
            {line.count > 1 && <span style={{ fontFamily: CN_FONTS.mono, fontSize: 9.5, color: '#B89268' }}>×{line.count} plats</span>}
          </span>
        </span>
        {line.qty && <span style={{ fontFamily: CN_FONTS.mono, fontSize: 12, color: '#8C8780', flexShrink: 0, whiteSpace: 'nowrap' }}>{line.qty}</span>}
      </button>
      <button onClick={onRemove} aria-label="Retirer" style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 6, flexShrink: 0, lineHeight: 0,
      }}><CNIcon name="x" size={14} color="#D5CEBE" strokeWidth={2} /></button>
    </div>
  );
}

export function CNCoursesListScreen({ cart, setCart, recipes, courses, purchases, onFinish, showToast, bottomInset = 0, onGoRadar }) {
  const [draft, setDraft] = React.useState('');
  const { groups, total, done } = React.useMemo(
    () => cnCartLines(cart, recipes, courses, purchases), [cart, recipes, courses, purchases]);

  const toggle = (key) => {
    const set = new Set(cart.checked || []);
    set.has(key) ? set.delete(key) : set.add(key);
    setCart({ ...cart, checked: [...set] });
  };
  const remove = (key) => {
    const isItem = (cart.items || []).some(it => it.key === key);
    setCart({
      ...cart,
      items: isItem ? cart.items.filter(it => it.key !== key) : (cart.items || []),
      skipped: isItem ? (cart.skipped || []) : [...new Set([...(cart.skipped || []), key])],
      checked: (cart.checked || []).filter(k => k !== key),
    });
  };
  const addManual = () => {
    const name = draft.trim();
    if (!name) return;
    const key = 'man:' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    setCart({ ...cart, items: [...(cart.items || []), { key, name, rayon: cnRayon(name), src: 'manuel' }] });
    setDraft('');
  };

  const copy = async () => {
    const text = cnCartCopyText(groups);
    if (!text) { showToast('La liste est vide'); return; }
    const ok = await cnCopy(text);
    showToast(ok ? `Liste copiée (${total} article${total > 1 ? 's' : ''}) !` : 'Copie impossible');
  };

  return (
    <div data-screen-label="Le Panier — Ma liste" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FAFAF8' }}>
      <div style={{ flexShrink: 0, padding: '4px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: CN_FONTS.serif, fontSize: 30, color: '#1A1918' }}>Ma liste</span>
          {total > 0 && <span style={{ fontFamily: CN_FONTS.mono, fontSize: 12, color: '#8C8780' }}>{done}/{total}</span>}
        </div>
        <div style={{ fontFamily: CN_FONTS.body, fontSize: 12.5, color: '#8C8780', fontStyle: 'italic', marginTop: 2 }}>
          {total === 0 ? 'Rien à acheter pour le moment.' : 'Rangée dans l’ordre des rayons.'}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <input value={draft} onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') addManual(); }}
            placeholder="Ajouter un article…" style={{
              flex: 1, minWidth: 0, height: 44, borderRadius: 9999, border: '1.5px solid #E4DDD2', background: '#FFFFFF',
              padding: '0 16px', fontFamily: CN_FONTS.body, fontSize: 14, color: '#1A1918', outline: 'none',
            }} />
          <button onClick={addManual} aria-label="Ajouter" style={{
            width: 44, height: 44, borderRadius: '50%', border: 'none', cursor: 'pointer', flexShrink: 0,
            background: draft.trim() ? CN_ACCENT : '#E4DDD2', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background .15s ease',
          }}><CNIcon name="plus" size={20} color="#FFFFFF" strokeWidth={2.2} /></button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, padding: `16px 20px calc(140px + ${bottomInset})` }}>
        {total === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 20px' }}>
            <CNIcon name="basket" size={40} color="#D5CEBE" />
            <div style={{ fontFamily: CN_FONTS.serif, fontStyle: 'italic', fontSize: 20, color: '#8C8780', marginTop: 12 }}>Le panier est vide…</div>
            <button onClick={onGoRadar} style={{
              marginTop: 16, border: `1.5px solid ${CN_ACCENT}`, background: '#FFFFFF', color: CN_ACCENT,
              borderRadius: 9999, padding: '11px 20px', cursor: 'pointer', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 13.5,
            }}>Voir ce qu’il faut prévoir →</button>
          </div>
        ) : groups.map(g => (
          <div key={g.id} style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 7, background: g.soft, color: g.color,
                padding: '5px 11px', borderRadius: 6, fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11,
                letterSpacing: '.09em', textTransform: 'uppercase',
              }}><CNIcon name={g.icon} size={13} color={g.color} /> {g.label}</span>
              <span style={{ fontFamily: CN_FONTS.mono, fontSize: 10.5, color: '#B8B3AA' }}>{g.lines.length}</span>
            </div>
            {g.lines.map(l => <CNCartRow key={l.key} line={l} onToggle={() => toggle(l.key)} onRemove={() => remove(l.key)} />)}
          </div>
        ))}
      </div>

      {total > 0 && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: bottomInset, padding: '14px 20px 16px', zIndex: 55,
          background: 'linear-gradient(to top, #FAFAF8 70%, rgba(250,250,248,0))', display: 'flex', gap: 8,
        }}>
          <button onClick={copy} aria-label="Copier la liste" style={{
            width: 54, height: 54, borderRadius: '50%', border: '1.5px solid #E4DDD2', background: '#FFFFFF',
            cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><CNIcon name="copy" size={19} color="#8C8780" /></button>
          <button onClick={onFinish} disabled={done === 0} style={{
            flex: 1, height: 54, borderRadius: 9999, border: 'none', cursor: done ? 'pointer' : 'default',
            background: done ? CN_ACCENT : '#E4DDD2', color: '#FFFFFF',
            fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 15,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            boxShadow: done ? '0 6px 20px rgba(184,92,56,.28)' : 'none', transition: 'all .15s ease',
          }}>
            <CNIcon name="check" size={19} color="#FFFFFF" strokeWidth={2.4} />
            {done ? `J’ai fait mes courses (${done})` : 'Cochez ce que vous achetez'}
          </button>
        </div>
      )}
    </div>
  );
}
