import React from 'react';
import { CN_FONTS, CNIcon, parseQty, fmtNum } from '../helpers.jsx';
import { CN_C, CN_T, CN_R } from '../tokens.js';
import { cnCartLines, cnCartCopyText } from '../courses.js';
import { cnRayon, cnQtyStep, cnQtyChoices, cnUnitHint, cnIsSpoonUnit } from '../courses-data.js';

const CN_ACCENT = CN_C.terra;

/* Ce qui a mis un article dans la liste. On ne l'affiche que lorsqu'il apprend
   quelque chose : la quasi-totalité des lignes vient des recettes, un badge
   « recette » répété vingt-quatre fois ne dit rien à personne. */
const CN_SRC_META = {
  placard: { label: 'placard',  color: CN_C.brun,  soft: CN_C.brunSoft },
  produit: { label: 'habitude', color: CN_C.terra, soft: CN_C.terraSoft },
  manuel:  { label: 'ajouté',   color: '#5C6FAE',  soft: '#EEF1FB' },
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

/* ── Une ligne, une seule hauteur ──
   L'ancienne version empilait nom + badge sur deux niveaux : quatre lignes
   tenaient à l'écran sur vingt-six. Tout tient désormais sur un rang, la
   quantité alignée à droite en chiffres à chasse fixe, comme les macros des
   recettes côté Cuisine. */
function CNCartRow({ line, onToggle, onEdit, onRemove }) {
  const src = CN_SRC_META[line.srcs[0]];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 2, borderBottom: `1px solid ${CN_C.hair}`,
      opacity: line.done ? .45 : 1, transition: 'opacity .15s ease',
    }}>
      <button onClick={onToggle} style={{
        flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left',
        background: 'none', border: 'none', padding: '11px 0', cursor: 'pointer', minHeight: 44,
      }}>
        <span style={{
          width: 20, height: 20, borderRadius: CN_R.sm, flexShrink: 0,
          border: `1.5px solid ${line.done ? CN_ACCENT : CN_C.edge}`, background: line.done ? CN_ACCENT : CN_C.card,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{line.done && <CNIcon name="check" size={12} color={CN_C.card} strokeWidth={2.5} />}</span>

        {/* Pastille de provenance : présente seulement quand ce n'est pas une recette. */}
        {src && <span title={src.label} style={{
          width: 6, height: 6, borderRadius: CN_R.pill, background: src.color, flexShrink: 0, marginLeft: -3,
        }}></span>}

        <span style={{
          flex: 1, minWidth: 0, fontFamily: CN_FONTS.body, fontSize: CN_T.base - 1, color: CN_C.ink,
          lineHeight: 1.3, textDecoration: line.done ? 'line-through' : 'none',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{line.name}</span>

        {line.count > 1 && (
          <span style={{ fontFamily: CN_FONTS.mono, fontSize: CN_T.micro - 1, color: CN_C.faint, flexShrink: 0 }}>
            ×{line.count}
          </span>
        )}
      </button>

      {/* La quantité est un bouton à part : on l'ajuste sans cocher la ligne. */}
      <button onClick={onEdit} aria-label={`Modifier la quantité de ${line.name}`} style={{
        display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0, cursor: 'pointer',
        border: `1.5px solid ${line.edited ? CN_ACCENT : 'transparent'}`,
        background: line.edited ? CN_C.terraSoft : 'transparent',
        borderRadius: CN_R.pill, padding: '4px 8px', minHeight: 34, minWidth: 62, justifyContent: 'flex-end',
      }}>
        <span style={{
          fontFamily: CN_FONTS.mono, fontSize: CN_T.small, fontVariantNumeric: 'tabular-nums',
          color: line.edited ? CN_ACCENT : CN_C.body, whiteSpace: 'nowrap',
        }}>{line.qty || '—'}</span>
      </button>

      <button onClick={onRemove} aria-label={`Retirer ${line.name}`} style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 7, flexShrink: 0, lineHeight: 0,
      }}><CNIcon name="x" size={13} color={CN_C.edge} strokeWidth={2} /></button>
    </div>
  );
}

/* ── Ajuster une quantité ──
   Les recettes donnent un besoin, le drive vend un format. On affiche donc les
   deux : ce que réclament vos plats, et ce qu'on a traduit pour le panier.

   Le pas et les raccourcis suivent l'unité du produit : + sur du chocolat
   ajoute 50 g, + sur une courgette ajoute une courgette. */
function CNQtySheet({ line, onClose, onSet, onRemove }) {
  const [val, setVal] = React.useState('');
  React.useEffect(() => { if (line) setVal(line.qty || ''); }, [line && line.key, line && line.qty]);
  const open = !!line;

  /* Unité effective : celle écrite dans le champ si elle existe, sinon celle du produit. */
  const parsed = parseQty(val);
  const unit = parsed.n != null && parsed.unit ? parsed.unit : (line ? line.unit || '' : '');
  const known = line && unit === (line.unit || '');

  const setNum = (n) => setVal(`${fmtNum(Math.max(0, n))}${unit ? ' ' + unit : ''}`);

  /* Incrémente le nombre en tête en préservant l'unité : « 400 g » → « 500 g ».
     Sur ce qui se compte à l'unité, on recale au passage : une recette peut
     demander 1,5 carotte, on n'en achète pas 2,5. */
  const bump = (d) => {
    const n = parsed.n;
    if (n == null) { setNum(1 + d); return; }
    if (cnIsSpoonUnit(unit)) { setNum(n + d * 0.5); return; }
    const step = cnQtyStep(unit, d > 0 ? n : n - 0.01);
    setNum(step === 1 ? (d > 0 ? Math.floor(n) + 1 : Math.ceil(n) - 1) : n + d * step);
  };

  const btn = {
    width: 46, height: 46, borderRadius: '50%', border: `1.5px solid ${CN_C.edge}`, background: CN_C.card,
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  };
  const chip = (on) => ({
    flex: 1, height: 38, borderRadius: CN_R.pill, cursor: 'pointer', minWidth: 0,
    border: `1.5px solid ${on ? CN_ACCENT : CN_C.rule}`, background: on ? CN_C.terraSoft : CN_C.card,
    color: on ? CN_ACCENT : CN_C.body, fontFamily: CN_FONTS.mono, fontSize: CN_T.small, whiteSpace: 'nowrap',
  });

  /* Saisie « 300 » sur du chocolat → on enregistre « 300 g ». */
  const commit = () => {
    const p = parseQty(val);
    onSet(p.n != null && !p.unit && line && line.unit ? `${fmtNum(p.n)} ${line.unit}` : val);
  };

  /* La phrase du dessous dit toujours d'où vient le chiffre proposé. */
  const explain = () => {
    if (!line) return '';
    if (line.converted) return `Vos recettes en demandent ${line.needQty} — au drive, ça fait ${line.buyQty}.`;
    if (line.needQty) return `Vos recettes en demandent ${line.needQty}.`;
    if (line.prefQty) return `${line.prefQty} — votre quantité habituelle.`;
    return `Aucune recette ne l’impose — ${line.buyQty} est l’achat courant.`;
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 200, pointerEvents: open ? 'auto' : 'none' }} aria-hidden={!open}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(26,25,24,.4)', opacity: open ? 1 : 0, transition: 'opacity .25s ease' }}></div>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, background: CN_C.paper, borderRadius: '24px 24px 0 0',
        transform: open ? 'translateY(0)' : 'translateY(105%)',
        visibility: open ? 'visible' : 'hidden',
        transition: open ? 'transform .3s cubic-bezier(.32,.72,.25,1)'
                         : 'transform .3s cubic-bezier(.32,.72,.25,1), visibility 0s linear .3s',
        padding: '14px 22px calc(env(safe-area-inset-bottom, 0px) + 18px)', boxShadow: '0 -8px 40px rgba(26,25,24,.18)',
      }}>
        <div style={{ width: 38, height: 4, borderRadius: CN_R.pill, background: CN_C.edge, margin: '0 auto 14px' }}></div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: CN_FONTS.display, fontWeight: 800, fontSize: CN_T.lead + 1, color: CN_C.ink }}>{line ? line.name : ''}</span>
          <span style={{
            fontFamily: CN_FONTS.body, fontSize: CN_T.micro - 1, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase',
            color: CN_C.brun, background: CN_C.brunSoft, borderRadius: CN_R.pill, padding: '2px 8px',
          }}>{cnUnitHint(line ? line.unit || '' : '')}</span>
        </div>
        <div style={{ fontFamily: CN_FONTS.body, fontSize: CN_T.small, fontStyle: 'italic', color: CN_C.muted, marginTop: 3, marginBottom: 16 }}>
          {explain()}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <button onClick={() => bump(-1)} style={btn} aria-label="Diminuer"><CNIcon name="minus" size={20} color={CN_C.body} strokeWidth={2.2} /></button>
          <input value={val} onChange={e => setVal(e.target.value)} placeholder="quantité libre"
            inputMode={known && (line.unit === 'g' || line.unit === 'ml' || !line.unit) ? 'numeric' : 'text'}
            onKeyDown={e => { if (e.key === 'Enter') commit(); }}
            style={{
              flex: 1, minWidth: 0, height: 52, borderRadius: 14, border: `1.5px solid ${CN_C.rule}`, background: CN_C.card,
              padding: '0 14px', fontFamily: CN_FONTS.mono, fontSize: 17, color: CN_C.ink,
              textAlign: 'center', outline: 'none', boxSizing: 'border-box',
            }} />
          <button onClick={() => bump(1)} style={btn} aria-label="Augmenter"><CNIcon name="plus" size={20} color={CN_C.body} strokeWidth={2.2} /></button>
        </div>

        {/* Raccourcis : les quantités qu'on achète vraiment dans cette unité. */}
        {known && (
          <div style={{ display: 'flex', gap: 7, marginBottom: 16 }}>
            {cnQtyChoices(line.unit || '').map(c => (
              <button key={c} onClick={() => setVal(c)} style={chip(val === c)}>{c}</button>
            ))}
          </div>
        )}

        <button onClick={commit} style={{
          width: '100%', height: 52, borderRadius: CN_R.pill, border: 'none', background: CN_ACCENT, color: CN_C.card,
          cursor: 'pointer', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: CN_T.base, marginBottom: 8,
        }}>Enregistrer</button>

        <div style={{ display: 'flex', gap: 8 }}>
          {line && line.edited && (
            <button onClick={() => onSet(null)} style={{
              flex: 1, height: 44, borderRadius: CN_R.md, border: `1.5px solid ${CN_C.rule}`, background: CN_C.card, cursor: 'pointer',
              fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: CN_T.small, color: CN_C.body,
            }}>Revenir à {line.buyQty || 'aucune'}</button>
          )}
          <button onClick={onRemove} style={{
            flex: 1, height: 44, borderRadius: CN_R.md, border: '1.5px solid #F2D9CF', background: CN_C.card, cursor: 'pointer',
            fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: CN_T.small, color: CN_ACCENT,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
          }}><CNIcon name="trash" size={14} color={CN_ACCENT} /> Retirer de la liste</button>
        </div>
      </div>
    </div>
  );
}

/* Un rayon entièrement coché se replie de lui-même : il n'a plus rien à dire,
   il ne doit plus prendre la place de ceux qui restent. */
function CNRayonGroup({ group, collapsed, onToggleCollapse, children }) {
  return (
    <div style={{ marginBottom: collapsed ? 6 : 18 }}>
      <button onClick={onToggleCollapse} style={{
        display: 'flex', alignItems: 'center', gap: 9, width: '100%', textAlign: 'left',
        background: 'none', border: 'none', padding: '4px 0 5px', cursor: 'pointer',
      }}>
        <span style={{
          width: 24, height: 24, borderRadius: CN_R.pill, background: group.soft, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><CNIcon name={group.icon} size={13} color={group.color} /></span>
        <span style={{
          flex: 1, minWidth: 0, fontFamily: CN_FONTS.serif, fontSize: CN_T.lead, color: CN_C.ink,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{group.label}</span>
        <span style={{ fontFamily: CN_FONTS.mono, fontSize: CN_T.micro, color: CN_C.faint, flexShrink: 0 }}>
          {collapsed ? `${group.lines.length} ✓` : group.lines.length}
        </span>
      </button>
      {!collapsed && children}
    </div>
  );
}

export function CNCoursesListScreen({ cart, setCart, recipes, courses, purchases, onFinish, showToast, bottomInset = 0, onGoRadar }) {
  const [draft, setDraft] = React.useState('');
  const [editKey, setEditKey] = React.useState(null);
  const [opened, setOpened] = React.useState([]);    // rayons finis qu'on a rouverts à la main
  const { groups, lines, total, done, eurosLabel } = React.useMemo(
    () => cnCartLines(cart, recipes, courses, purchases), [cart, recipes, courses, purchases]);
  const editLine = lines.find(l => l.key === editKey) || null;

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
  /* `null` efface la surcharge et rend la main à la quantité calculée. */
  const setQty = (key, value) => {
    const q = { ...(cart.qty || {}) };
    if (value == null || value === '') delete q[key]; else q[key] = value.trim();
    setCart({ ...cart, qty: q });
    setEditKey(null);
  };

  const addManual = () => {
    const name = draft.trim();
    if (!name) return;
    const key = 'man:' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    setCart({ ...cart, items: [...(cart.items || []), { key, name, rayon: cnRayon(name), src: 'manuel' }] });
    setDraft('');
  };

  /* Le geste principal : la liste part chez le drive. On ne copie que ce qui
     reste à acheter. */
  const copy = async () => {
    const text = cnCartCopyText(groups);
    if (!text) { showToast('Tout est déjà coché'); return; }
    const ok = await cnCopy(text);
    showToast(ok ? `${total - done} article${total - done > 1 ? 's' : ''} copié${total - done > 1 ? 's' : ''} — collez-les au drive` : 'Copie impossible');
  };

  const remaining = total - done;

  return (
    <div data-screen-label="Le Panier — Ma liste" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: CN_C.paper }}>
      {/* L'en-tête défile avec la liste : figé, il mangeait un tiers de l'écran. */}
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, padding: `4px 20px calc(120px + ${bottomInset})` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
          <span style={{ fontFamily: CN_FONTS.serif, fontSize: CN_T.display, color: CN_C.ink }}>Ma liste</span>
          {total > 0 && (
            <span style={{ fontFamily: CN_FONTS.mono, fontSize: CN_T.small, color: CN_C.muted, whiteSpace: 'nowrap' }}>
              {done}/{total}
            </span>
          )}
        </div>
        <div style={{ fontFamily: CN_FONTS.body, fontSize: CN_T.small, color: CN_C.muted, fontStyle: 'italic', marginTop: 2 }}>
          {total === 0
            ? 'Rien à acheter pour le moment.'
            : <>Rangée dans l’ordre des rayons · <span style={{ fontFamily: CN_FONTS.mono, fontStyle: 'normal', color: CN_C.brun }}>≈ {eurosLabel}</span></>}
        </div>

        <div style={{ display: 'flex', gap: 8, margin: '14px 0 18px' }}>
          <input value={draft} onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') addManual(); }}
            placeholder="Ajouter un article…" style={{
              flex: 1, minWidth: 0, height: 44, borderRadius: CN_R.pill, border: `1.5px solid ${CN_C.rule}`, background: CN_C.card,
              padding: '0 16px', fontFamily: CN_FONTS.body, fontSize: CN_T.base - 1, color: CN_C.ink, outline: 'none',
            }} />
          <button onClick={addManual} aria-label="Ajouter" style={{
            width: 44, height: 44, borderRadius: '50%', border: 'none', cursor: 'pointer', flexShrink: 0,
            background: draft.trim() ? CN_ACCENT : CN_C.rule, display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background .15s ease',
          }}><CNIcon name="plus" size={20} color={CN_C.card} strokeWidth={2.2} /></button>
        </div>

        {total === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <CNIcon name="basket" size={40} color={CN_C.edge} />
            <div style={{ fontFamily: CN_FONTS.serif, fontStyle: 'italic', fontSize: CN_T.title, color: CN_C.muted, marginTop: 12 }}>Le panier est vide…</div>
            <button onClick={onGoRadar} style={{
              marginTop: 16, border: `1.5px solid ${CN_ACCENT}`, background: CN_C.card, color: CN_ACCENT,
              borderRadius: CN_R.pill, padding: '11px 20px', cursor: 'pointer', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: CN_T.base - 1,
            }}>Voir ce qu’il faut prévoir →</button>
          </div>
        ) : groups.map(g => (
          <CNRayonGroup key={g.id} group={g} collapsed={g.done && !opened.includes(g.id)}
            onToggleCollapse={() => setOpened(opened.includes(g.id) ? opened.filter(x => x !== g.id) : [...opened, g.id])}>
            {g.lines.map(l => <CNCartRow key={l.key} line={l} onToggle={() => toggle(l.key)}
              onEdit={() => setEditKey(l.key)} onRemove={() => remove(l.key)} />)}
          </CNRayonGroup>
        ))}
      </div>

      <CNQtySheet line={editLine} onClose={() => setEditKey(null)}
        onSet={(v) => setQty(editKey, v)}
        onRemove={() => { remove(editKey); setEditKey(null); }} />

      {/* Vous commandez au drive : copier la liste EST le geste principal.
          Enregistrer la sortie courses vient après, une fois la commande passée. */}
      {total > 0 && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: bottomInset, padding: '14px 20px 16px', zIndex: 55,
          background: `linear-gradient(to top, ${CN_C.paper} 70%, rgba(250,250,248,0))`, display: 'flex', gap: 8,
        }}>
          <button onClick={copy} disabled={!remaining} style={{
            flex: 1, height: 54, borderRadius: CN_R.pill, border: 'none', cursor: remaining ? 'pointer' : 'default',
            background: remaining ? CN_ACCENT : CN_C.rule, color: CN_C.card,
            fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: CN_T.base,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            boxShadow: remaining ? '0 6px 20px rgba(184,92,56,.28)' : 'none', transition: 'all .15s ease',
          }}>
            <CNIcon name="copy" size={18} color={CN_C.card} strokeWidth={2} />
            {remaining ? `Copier pour le drive (${remaining})` : 'Tout est coché'}
          </button>
          <button onClick={onFinish} disabled={!done} aria-label={`Enregistrer mes courses (${done})`}
            title="J’ai fait mes courses" style={{
              width: 54, height: 54, borderRadius: '50%', flexShrink: 0, position: 'relative',
              border: `1.5px solid ${done ? CN_ACCENT : CN_C.rule}`, background: CN_C.card,
              cursor: done ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
            <CNIcon name="check" size={20} color={done ? CN_ACCENT : CN_C.edge} strokeWidth={2.4} />
            {done > 0 && (
              <span style={{
                position: 'absolute', top: -2, right: -2, minWidth: 19, height: 19, borderRadius: CN_R.pill,
                background: CN_ACCENT, color: CN_C.card, fontFamily: CN_FONTS.mono, fontSize: CN_T.micro - 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px',
              }}>{done}</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
