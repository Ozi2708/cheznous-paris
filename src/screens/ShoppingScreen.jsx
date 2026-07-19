import React from 'react';
import { CN_FONTS, CNIcon } from '../helpers.jsx';
import { cnShoppingList, cnShoppingText, cnCleanName, CN_SHOP_SECTIONS } from '../utils.js';

const CN_SEC_META = {
  'À Acheter': { tint: '#EAF0E2', color: '#3D5430', hint: 'Votre panier de courses' },
  'Placard': { tint: '#EEE8DC', color: '#6B5138', hint: 'Vérifiez ce qu\'il vous reste' },
  'Épices': { tint: '#EDE6DF', color: '#7A6450', hint: 'Normalement déjà au placard' },
};

async function cnCopy(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) { await navigator.clipboard.writeText(text); return true; }
  } catch (e) { /* fallthrough */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.focus(); ta.select();
    const ok = document.execCommand('copy'); document.body.removeChild(ta); return ok;
  } catch (e) { return false; }
}

function CNShopRow({ e, done, onToggle }) {
  return (
    <button onClick={onToggle} style={{
      display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left',
      background: 'none', border: 'none', borderBottom: '1px solid #EEE8DC', padding: '11px 4px', cursor: 'pointer',
      minHeight: 46, opacity: done ? .45 : 1, transition: 'opacity .15s ease',
    }}>
      <span style={{
        width: 21, height: 21, borderRadius: 6, flexShrink: 0, border: `1.5px solid ${done ? '#506741' : '#D5CEBE'}`,
        background: done ? '#506741' : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{done && <CNIcon name="check" size={13} color="#FFFFFF" strokeWidth={2.5} />}</span>
      <span style={{ flex: 1, minWidth: 0, fontFamily: CN_FONTS.body, fontSize: 14, color: '#1A1918', textDecoration: done ? 'line-through' : 'none', lineHeight: 1.3 }}>{cnCleanName(e.name)}</span>
      {e.count > 1 && <span style={{ fontFamily: CN_FONTS.mono, fontSize: 10, color: '#B89268', background: '#F5EEE4', borderRadius: 9999, padding: '2px 7px', flexShrink: 0 }}>×{e.count}</span>}
      <span style={{ fontFamily: CN_FONTS.mono, fontSize: 12, color: '#8C8780', flexShrink: 0, whiteSpace: 'nowrap' }}>{e.total}</span>
    </button>
  );
}

export function CNShoppingScreen({ recipes, checked, setChecked, showToast, bottomInset = 0 }) {
  const groups = React.useMemo(() => cnShoppingList(recipes), [recipes]);
  const nMeals = recipes.length;
  const buyCount = groups['À Acheter'].length;
  const toggle = (key) => {
    const next = new Set(checked);
    next.has(key) ? next.delete(key) : next.add(key);
    setChecked(next);
  };

  const copySections = async (sections, label) => {
    const text = cnShoppingText(groups, sections);
    if (!text) { showToast('Rien à copier'); return; }
    const ok = await cnCopy(text);
    showToast(ok ? `${label} copiée !` : 'Copie impossible');
  };

  return (
    <div data-screen-label="Liste de courses" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FAFAF8', position: 'relative' }}>
      <div style={{ flexShrink: 0, padding: 'var(--screen-top, 34px) 20px 4px' }}>
        <span style={{ fontFamily: CN_FONTS.serif, fontSize: 30, color: '#1A1918' }}>Liste de courses</span>
        <div style={{ fontFamily: CN_FONTS.body, fontSize: 12.5, color: '#8C8780', fontStyle: 'italic', marginTop: 2 }}>
          {nMeals === 0 ? 'Ajoutez des plats à votre semaine pour composer la liste.' : `${buyCount} ingrédient${buyCount > 1 ? 's' : ''} à acheter · ${nMeals} plat${nMeals > 1 ? 's' : ''}`}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, padding: `14px 20px calc(130px + ${bottomInset})` }}>
        {nMeals === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <CNIcon name="cart" size={40} color="#D5CEBE" />
            <div style={{ fontFamily: CN_FONTS.serif, fontStyle: 'italic', fontSize: 20, color: '#8C8780', marginTop: 12 }}>Le chariot est vide…</div>
          </div>
        ) : CN_SHOP_SECTIONS.map(sec => {
          const list = groups[sec];
          if (!list.length) return null;
          const meta = CN_SEC_META[sec];
          return (
            <div key={sec} style={{ marginBottom: 22 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                <span style={{ background: meta.tint, color: meta.color, padding: '5px 11px', borderRadius: 6, fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase' }}>{sec}</span>
                <span style={{ fontFamily: CN_FONTS.body, fontSize: 11, fontStyle: 'italic', color: '#B8B3AA' }}>{meta.hint}</span>
              </div>
              {list.map(e => <CNShopRow key={e.key} e={e} done={checked.has(e.key)} onToggle={() => toggle(e.key)} />)}
              {sec !== 'À Acheter' && (
                <button onClick={() => copySections([sec], sec)} style={{
                  marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6, border: 'none', background: 'none', cursor: 'pointer',
                  fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11.5, color: '#8C8780',
                }}><CNIcon name="copy" size={13} color="#8C8780" /> Copier « {sec} »</button>
              )}
            </div>
          );
        })}
      </div>

      {nMeals > 0 && buyCount > 0 && (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: bottomInset, padding: '14px 20px 16px', background: 'linear-gradient(to top, #FAFAF8 70%, rgba(250,250,248,0))', display: 'flex', gap: 10, zIndex: 55 }}>
          <button onClick={() => copySections(['À Acheter'], 'Liste')} style={{
            flex: 1, height: 54, borderRadius: 9999, border: 'none', cursor: 'pointer',
            background: '#506741', color: '#FFFFFF', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 15,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 6px 20px rgba(26,25,24,.18)',
          }}>
            <CNIcon name="copy" size={19} color="#FFFFFF" /> Copier la liste
          </button>
        </div>
      )}
    </div>
  );
}
