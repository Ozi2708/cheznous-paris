import React from 'react';
import { CN_FONTS, CNIcon, parseQty, fmtNum } from '../helpers.jsx';
import { CN_C, CN_T, CN_R } from '../tokens.js';
import { cnCartLines, cnCartCopyText, cnCartDriveText, cnSearchProducts, cnFindProduct, cnCreateProduct } from '../courses.js';
import { cnRayon, cnRayonOrNull, cnRayonMeta, cnQtyStep, cnQtyChoices, cnUnitHint, cnIsSpoonUnit, cnUnitFor } from '../courses-data.js';

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
   Tout tient sur un rang, la quantité alignée à droite en chiffres à chasse
   fixe, comme les macros des recettes côté Cuisine. */
function CNCartRow({ line, onToggle, onEdit, onRemove }) {
  const src = CN_SRC_META[line.srcs[0]];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 2, borderBottom: `1px solid ${CN_C.hair}`,
    }}>
      {/* ── Cocher, c'est la case ──
          Cocher fait sortir l'article de la liste : ce geste doit être visé,
          pas déclenché en effleurant le nom. La case a donc sa propre cible,
          et le reste de la ligne ouvre le détail — ce qu'on attend en tapant
          sur un produit. */}
      <button onClick={onToggle} aria-label={`Cocher ${line.name}`} style={{
        width: 40, minHeight: 46, flexShrink: 0, background: 'none', border: 'none',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: 0,
      }}>
        <span style={{
          width: 21, height: 21, borderRadius: CN_R.sm,
          border: `1.5px solid ${CN_C.edge}`, background: CN_C.card,
        }}></span>
      </button>

      <button onClick={onEdit} aria-label={`Ouvrir ${line.name}`} style={{
        flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left',
        background: 'none', border: 'none', padding: '12px 0', cursor: 'pointer', minHeight: 46,
      }}>
        {/* Pastille de provenance : présente seulement quand ce n'est pas une recette. */}
        {src && <span title={src.label} style={{
          width: 6, height: 6, borderRadius: CN_R.pill, background: src.color, flexShrink: 0,
        }}></span>}

        <span style={{
          flex: 1, minWidth: 0, fontFamily: CN_FONTS.body, fontSize: CN_T.base, color: CN_C.ink,
          lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{line.name}</span>

        {/* Vient de plusieurs plats : la toque le dit, et le détail les nomme. */}
        {line.count > 1 && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
            <CNIcon name="chef" size={12} color={CN_C.faint} />
            <span style={{ fontFamily: CN_FONTS.mono, fontSize: CN_T.micro - 1, color: CN_C.faint }}>{line.count}</span>
          </span>
        )}
      </button>

      <button onClick={onEdit} aria-label={`Quantité de ${line.name}`} style={{
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

/* ── Ajouter un article ──
   Taper « pap » propose ce qu'on suit déjà — papier toilette, papier
   aluminium, papier cuisson — pour ne pas créer un quatrième « PQ » à côté.
   Et si le produit n'existe vraiment pas, on le crée en connaissant déjà son
   rayon et son unité d'achat. */
function CNAddField({ courses, inCartNames, onPickProduct, onCreate, onQuickAdd }) {
  const [draft, setDraft] = React.useState('');
  const [focused, setFocused] = React.useState(false);
  const input = React.useRef(null);
  const q = draft.trim();

  const found = React.useMemo(() => cnSearchProducts(courses, q), [courses, q]);
  const exact = React.useMemo(() => (q ? cnFindProduct(courses, q) : null), [courses, q]);
  const open = focused && q.length >= 2;
  const already = (name) => inCartNames.has(name.toLowerCase());

  const reset = () => { setDraft(''); setFocused(false); };
  /* On enchaîne souvent plusieurs ajouts : le champ se vide mais garde le
     curseur, prêt pour le suivant. */
  const keepTyping = () => { setDraft(''); if (input.current) input.current.focus(); };
  const pick = (p) => { onPickProduct(p); keepTyping(); };
  const create = () => { onCreate(q); keepTyping(); };

  /* Entrée : le produit connu s'il existe, sinon l'ajout libre habituel. */
  const submit = () => {
    if (!q) return;
    if (exact) { pick(exact); return; }
    if (found.length === 1) { pick(found[0]); return; }
    onQuickAdd(q); reset();
  };

  /* Aperçu de ce que la création donnera, exactement comme cnCreateProduct. */
  const guessRayon = q ? (cnRayonOrNull(q) || 'maison') : null;
  const unitLabel = q ? cnUnitHint(cnUnitFor(q, guessRayon).unit) : '';
  const rayonLabel = guessRayon ? cnRayonMeta(guessRayon) : null;

  return (
    <div style={{ position: 'relative', marginBottom: open ? 8 : 0, zIndex: 20 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <input ref={input} value={draft} onChange={e => setDraft(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 180)}
          onKeyDown={e => { if (e.key === 'Enter') submit(); if (e.key === 'Escape') reset(); }}
          placeholder="Ajouter un article…" style={{
            flex: 1, minWidth: 0, height: 44, borderRadius: CN_R.pill,
            border: `1.5px solid ${open ? CN_ACCENT : CN_C.rule}`, background: CN_C.card,
            padding: '0 16px', fontFamily: CN_FONTS.body, fontSize: CN_T.base, color: CN_C.ink, outline: 'none',
          }} />
        <button onClick={submit} aria-label="Ajouter" style={{
          width: 44, height: 44, borderRadius: '50%', border: 'none', cursor: 'pointer', flexShrink: 0,
          background: q ? CN_ACCENT : CN_C.rule, display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background .15s ease',
        }}><CNIcon name="plus" size={20} color={CN_C.card} strokeWidth={2.2} /></button>
      </div>

      {open && (
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 50, background: CN_C.card,
          border: `1.5px solid ${CN_C.rule}`, borderRadius: CN_R.md, overflow: 'hidden',
          boxShadow: '0 12px 32px rgba(26,25,24,.14)',
        }}>
          {found.map(p => {
            const ray = cnRayonMeta(p.rayon);
            const here = already(p.name);
            return (
              <button key={p.id} onMouseDown={e => e.preventDefault()} onClick={() => !here && pick(p)}
                disabled={here} style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left', minHeight: 48,
                  background: 'none', border: 'none', borderBottom: `1px solid ${CN_C.hair}`,
                  padding: '9px 13px', cursor: here ? 'default' : 'pointer', opacity: here ? .5 : 1,
                }}>
                <span style={{
                  width: 26, height: 26, borderRadius: CN_R.pill, background: ray.soft, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><CNIcon name={ray.icon} size={13} color={ray.color} /></span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{
                    display: 'block', fontFamily: CN_FONTS.body, fontSize: CN_T.base - 1, color: CN_C.ink,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>{p.name}</span>
                  <span style={{ display: 'block', fontFamily: CN_FONTS.body, fontSize: CN_T.micro, color: CN_C.muted, marginTop: 1 }}>
                    {here ? 'déjà dans la liste' : ray.label}
                  </span>
                </span>
                {!here && <CNIcon name="plus" size={15} color={CN_ACCENT} strokeWidth={2.2} />}
              </button>
            );
          })}

          {/* Rien ne correspond, ou rien exactement : on propose de le suivre
              pour de bon — l'app connaîtra ensuite son rythme. */}
          {!exact && (
            <button onMouseDown={e => e.preventDefault()} onClick={create} style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left', minHeight: 48,
              /* Mis en avant quand rien ne correspond, discret quand on a déjà
                 des propositions valables. */
              background: found.length ? 'none' : CN_C.terraSoft,
              border: 'none', padding: '10px 13px', cursor: 'pointer',
            }}>
              <span style={{
                width: 26, height: 26, borderRadius: CN_R.pill, background: CN_ACCENT, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><CNIcon name="plus" size={14} color={CN_C.card} strokeWidth={2.4} /></span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{
                  display: 'block', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: CN_T.base - 1, color: CN_ACCENT,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>Créer « {q} »</span>
                <span style={{ display: 'block', fontFamily: CN_FONTS.body, fontSize: CN_T.micro, color: CN_C.brun, marginTop: 1 }}>
                  {rayonLabel.label} · se compte {unitLabel}
                </span>
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Ajuster une quantité ──
   Les recettes donnent un besoin, le drive vend un format. On affiche donc les
   deux : ce que réclament vos plats, et ce qu'on a traduit pour le panier. */
function CNQtySheet({ line, onClose, onSet, onRemove, onOpenRecipe, onUncheck }) {
  const [val, setVal] = React.useState('');
  React.useEffect(() => { if (line) setVal(line.qty || ''); }, [line && line.key, line && line.qty]);
  const open = !!line;

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
        maxHeight: '88%', overflowY: 'auto',
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

        {/* ── D'où ça vient ──
            Un ingrédient dans la liste sans savoir pour quel plat, c'est une
            énigme. On nomme les recettes, avec ce que chacune en demande, et
            on peut ouvrir la fiche sans quitter ses courses. */}
        {line && line.uses && line.uses.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{
              fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: CN_T.micro, letterSpacing: '.11em',
              textTransform: 'uppercase', color: CN_C.muted, marginBottom: 6,
            }}>{line.uses.length > 1 ? `Pour ${line.uses.length} de vos plats` : 'Pour votre plat'}</div>
            {line.uses.map((u, i) => (
              <button key={u.id + '-' + i} onClick={() => onOpenRecipe && onOpenRecipe(u.id)}
                disabled={!onOpenRecipe} style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left', minHeight: 46,
                  background: CN_C.card, border: `1.5px solid ${CN_C.rule}`, borderRadius: CN_R.md,
                  padding: '9px 12px', marginBottom: 6, cursor: onOpenRecipe ? 'pointer' : 'default',
                }}>
                <span style={{
                  width: 28, height: 28, borderRadius: CN_R.pill, background: CN_C.oliveSoft, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><CNIcon name="chef" size={15} color={CN_C.olive} /></span>
                <span style={{
                  flex: 1, minWidth: 0, fontFamily: CN_FONTS.body, fontSize: CN_T.base - 1, color: CN_C.ink,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{u.title}</span>
                {u.q && <span style={{ fontFamily: CN_FONTS.mono, fontSize: CN_T.small, color: CN_C.muted, flexShrink: 0 }}>{u.q}</span>}
                {onOpenRecipe && <CNIcon name="chevR" size={15} color={CN_C.faint} />}
              </button>
            ))}
          </div>
        )}

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

        {line && line.done && (
          <button onClick={onUncheck} style={{
            width: '100%', height: 44, borderRadius: CN_R.md, border: `1.5px solid ${CN_ACCENT}`,
            background: CN_C.card, cursor: 'pointer', marginBottom: 8,
            fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: CN_T.small, color: CN_ACCENT,
          }}>Remettre dans la liste</button>
        )}

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

export function CNCoursesListScreen({ cart, setCart, recipes, courses, setCourses, purchases, onFinish, showToast, bottomInset = 0, onGoRadar, onOpenRecipe }) {
  const [editKey, setEditKey] = React.useState(null);
  const [focusRayon, setFocusRayon] = React.useState(null);   // un rayon à la fois, quand la liste est longue
  const [showDone, setShowDone] = React.useState(false);
  const { groups, lines, total, done, eurosLabel } = React.useMemo(
    () => cnCartLines(cart, recipes, courses, purchases), [cart, recipes, courses, purchases]);
  const editLine = lines.find(l => l.key === editKey) || null;

  /* Ce qui est coché quitte la liste et rejoint « Déjà pris » : la liste
     rétrécit à mesure qu'on avance, au lieu de rester longue et grisée. */
  const openGroups = React.useMemo(() => groups
    .map(g => ({ ...g, lines: g.lines.filter(l => !l.done) }))
    .filter(g => g.lines.length), [groups]);
  const doneLines = React.useMemo(() => lines.filter(l => l.done), [lines]);
  const shown = focusRayon ? openGroups.filter(g => g.id === focusRayon) : openGroups;
  const inCartNames = React.useMemo(() => new Set(lines.map(l => l.name.toLowerCase())), [lines]);
  const remaining = total - done;

  /* Un rayon vidé ne doit pas laisser l'écran vide : on revient à tout. */
  React.useEffect(() => {
    if (focusRayon && !openGroups.some(g => g.id === focusRayon)) setFocusRayon(null);
  }, [focusRayon, openGroups]);

  /* Un article coché sort de la liste. La première fois, on dit où il va —
     sinon ça se lit comme une suppression. */
  const hinted = React.useRef(false);
  const toggle = (key) => {
    setCart(prev => {
      const set = new Set(prev.checked || []);
      if (set.has(key)) set.delete(key);
      else set.add(key);
      return { ...prev, checked: [...set] };
    });
    if (!(cart.checked || []).includes(key) && !hinted.current) {
      hinted.current = true;
      showToast('Coché — retrouvez-le dans « Déjà pris », en bas de la liste');
    }
  };
  const uncheckAll = () => {
    setCart(prev => ({ ...prev, checked: [] }));
    showToast(`${doneLines.length} article${doneLines.length > 1 ? 's' : ''} remis dans la liste`);
  };

  /* Le compteur de l'en-tête mène à ce qu'on a déjà pris. On défile la liste
     à la main : scrollIntoView emporterait la page entière avec elle. */
  const doneRef = React.useRef(null);
  const scrollRef = React.useRef(null);
  const goToDone = () => {
    if (!doneLines.length) { showToast('Rien de coché pour l’instant'); return; }
    setShowDone(true);
    setTimeout(() => {
      const sc = scrollRef.current, el = doneRef.current;
      if (!sc || !el) return;
      const dy = el.getBoundingClientRect().top - sc.getBoundingClientRect().top - 8;
      sc.scrollTo({ top: sc.scrollTop + dy, behavior: 'smooth' });
    }, 60);
  };

  const remove = (key) => {
    setCart(prev => {
      const isItem = (prev.items || []).some(it => it.key === key);
      return {
        ...prev,
        items: isItem ? prev.items.filter(it => it.key !== key) : (prev.items || []),
        skipped: isItem ? (prev.skipped || []) : [...new Set([...(prev.skipped || []), key])],
        checked: (prev.checked || []).filter(k => k !== key),
      };
    });
  };
  /* `null` efface la surcharge et rend la main à la quantité calculée. */
  const setQty = (key, value) => {
    setCart(prev => {
      const q = { ...(prev.qty || {}) };
      if (value == null || value === '') delete q[key]; else q[key] = value.trim();
      return { ...prev, qty: q };
    });
    setEditKey(null);
  };

  /* Un produit suivi entre avec son identité : l'app pourra apprendre son rythme. */
  const addProduct = (p) => {
    if ((cart.items || []).some(it => it.pid === p.id)) { showToast(`${p.name} est déjà dans la liste`); return; }
    setCart(prev => ({
      ...prev,
      items: [...(prev.items || []), { key: 'prod:' + p.id, pid: p.id, name: p.name, rayon: p.rayon, src: 'produit' }],
      skipped: (prev.skipped || []).filter(k => k !== 'prod:' + p.id),
    }));
  };
  /* Nouveau produit : il rejoint le catalogue suivi, pas seulement la liste. */
  const createProduct = (name) => {
    const { courses: next, product } = cnCreateProduct(courses, name);
    setCourses(next);
    setCart(prev => ({ ...prev, items: [...(prev.items || []), { key: 'prod:' + product.id, pid: product.id, name: product.name, rayon: product.rayon, src: 'produit' }] }));
    showToast(`${product.name} — suivi désormais`);
  };
  /* Ajout libre, sans suivi : utile pour un achat unique. */
  const addFree = (name) => {
    const key = 'man:' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    setCart(prev => ({ ...prev, items: [...(prev.items || []), { key, name, rayon: cnRayon(name), src: 'manuel' }] }));
  };

  /* ── Les deux copies ──
     Celle du bas part chez l'assistant du drive : une consigne suivie d'une
     ligne par produit, sans titre de rayon qu'il prendrait pour un article.
     Celle de l'en-tête reste la liste rangée par rayons, pour un œil humain. */
  const copyDrive = async () => {
    const text = cnCartDriveText(groups);
    if (!text) { showToast('Tout est déjà coché'); return; }
    const ok = await cnCopy(text);
    showToast(ok ? `${remaining} article${remaining > 1 ? 's' : ''} copié${remaining > 1 ? 's' : ''} — collez-les dans Carrefour` : 'Copie impossible');
  };
  const copyRayons = async () => {
    const text = cnCartCopyText(groups);
    if (!text) { showToast('Tout est déjà coché'); return; }
    const ok = await cnCopy(text);
    showToast(ok ? 'Liste par rayons copiée' : 'Copie impossible');
  };

  const lbl = { fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: CN_T.micro, letterSpacing: '.11em', textTransform: 'uppercase', color: CN_C.muted };

  return (
    <div data-screen-label="Le Panier — Ma liste" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: CN_C.paper }}>
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', minHeight: 0, padding: `4px 20px calc(120px + ${bottomInset})` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
          <span style={{ fontFamily: CN_FONTS.serif, fontSize: CN_T.display, color: CN_C.ink }}>Ma liste</span>
          {total > 0 && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
              <button onClick={goToDone} aria-label="Voir ce que j’ai déjà pris" style={{
                border: 'none', background: 'none', cursor: 'pointer', padding: '4px 2px',
                fontFamily: CN_FONTS.mono, fontSize: CN_T.small,
                color: done ? CN_ACCENT : CN_C.muted, whiteSpace: 'nowrap',
              }}>{done}/{total}</button>
              <button onClick={copyRayons} aria-label="Copier la liste par rayons" title="Copier la liste par rayons" style={{
                width: 32, height: 32, borderRadius: '50%', border: 'none', background: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><CNIcon name="copy" size={15} color={CN_C.faint} /></button>
            </span>
          )}
        </div>

        {total > 0 ? (
          <>
            {/* Où en est-on ? Une phrase et un trait valent mieux qu'un compteur seul. */}
            <div style={{ fontFamily: CN_FONTS.body, fontSize: CN_T.small, color: CN_C.muted, fontStyle: 'italic', marginTop: 2 }}>
              {remaining
                ? <>Il reste {remaining} article{remaining > 1 ? 's' : ''} · <span style={{ fontFamily: CN_FONTS.mono, fontStyle: 'normal', color: CN_C.brun }}>≈&nbsp;{eurosLabel}</span></>
                : 'Tout est coché — bonnes courses.'}
            </div>
            <div style={{ height: 4, borderRadius: CN_R.pill, background: CN_C.hair, margin: '10px 0 14px', overflow: 'hidden' }}>
              <div style={{
                width: `${Math.round(done / total * 100)}%`, height: '100%', background: CN_ACCENT,
                borderRadius: CN_R.pill, transition: 'width .25s ease',
              }}></div>
            </div>
          </>
        ) : (
          <div style={{ fontFamily: CN_FONTS.body, fontSize: CN_T.small, color: CN_C.muted, fontStyle: 'italic', marginTop: 2, marginBottom: 14 }}>
            Rien à acheter pour le moment.
          </div>
        )}

        <CNAddField courses={courses} inCartNames={inCartNames}
          onPickProduct={addProduct} onCreate={createProduct} onQuickAdd={addFree} />

        {/* Un rayon à la fois : c'est ainsi qu'on remplit un panier, et ça évite
            de relire vingt-six lignes à chaque article. */}
        {openGroups.length > 1 && (
          <div style={{ display: 'flex', gap: 7, overflowX: 'auto', margin: '14px -20px 4px', padding: '0 20px 2px', WebkitOverflowScrolling: 'touch' }}>
            {[{ id: null, label: 'Tout', color: CN_C.body, n: remaining }, ...openGroups.map(g => ({ id: g.id, label: g.label, color: g.color, n: g.lines.length }))]
              .map(c => {
                const on = focusRayon === c.id;
                return (
                  <button key={c.id || 'all'} onClick={() => setFocusRayon(c.id)} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0, cursor: 'pointer',
                    fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: CN_T.small - .5,
                    padding: '7px 13px', borderRadius: CN_R.pill, minHeight: 34, whiteSpace: 'nowrap',
                    border: `1.5px solid ${on ? c.color : CN_C.edge}`,
                    background: on ? c.color : CN_C.card, color: on ? CN_C.card : CN_C.body,
                    transition: 'all .15s ease',
                  }}>
                    {c.label}
                    <span style={{ fontFamily: CN_FONTS.mono, fontSize: CN_T.micro - 1, opacity: .75 }}>{c.n}</span>
                  </button>
                );
              })}
          </div>
        )}

        {total === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <CNIcon name="basket" size={40} color={CN_C.edge} />
            <div style={{ fontFamily: CN_FONTS.serif, fontStyle: 'italic', fontSize: CN_T.title, color: CN_C.muted, marginTop: 12 }}>Le panier est vide…</div>
            <button onClick={onGoRadar} style={{
              marginTop: 16, border: `1.5px solid ${CN_ACCENT}`, background: CN_C.card, color: CN_ACCENT,
              borderRadius: CN_R.pill, padding: '11px 20px', cursor: 'pointer', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: CN_T.base - 1,
            }}>Voir ce qu’il faut prévoir →</button>
          </div>
        ) : (
          <div style={{ marginTop: 14 }}>
            {shown.map(g => (
              <div key={g.id} style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '4px 0 5px' }}>
                  <span style={{
                    width: 24, height: 24, borderRadius: CN_R.pill, background: g.soft, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}><CNIcon name={g.icon} size={13} color={g.color} /></span>
                  <span style={{
                    flex: 1, minWidth: 0, fontFamily: CN_FONTS.serif, fontSize: CN_T.lead, color: CN_C.ink,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>{g.label}</span>
                  <span style={{ fontFamily: CN_FONTS.mono, fontSize: CN_T.micro, color: CN_C.faint, flexShrink: 0 }}>{g.lines.length}</span>
                </div>
                {g.lines.map(l => <CNCartRow key={l.key} line={l} onToggle={() => toggle(l.key)}
                  onEdit={() => setEditKey(l.key)} onRemove={() => remove(l.key)} />)}
              </div>
            ))}

            {!shown.length && (
              <div style={{
                border: `1.5px dashed ${CN_C.rule}`, borderRadius: CN_R.md, padding: '22px 16px', textAlign: 'center',
                fontFamily: CN_FONTS.body, fontSize: CN_T.small, color: CN_C.muted,
              }}>Ce rayon est fait.</div>
            )}

            {/* Déjà pris : replié par défaut, à portée si on s'est trompé. */}
            {/* ── Déjà pris ──
                On doit pouvoir relire ce qu'on a pris sans rien défaire : seule
                la case remet un article dans la liste, le nom ouvre son détail
                comme partout ailleurs. */}
            {doneLines.length > 0 && (
              <div ref={doneRef} style={{ marginTop: 10, borderTop: `1px solid ${CN_C.rule}`, paddingTop: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => setShowDone(!showDone)} style={{
                    display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0, textAlign: 'left',
                    background: 'none', border: 'none', padding: '4px 0', cursor: 'pointer', minHeight: 40,
                  }}>
                    <CNIcon name="check" size={15} color={CN_ACCENT} strokeWidth={2.4} />
                    <span style={{ ...lbl, flex: 1 }}>Déjà pris · {doneLines.length}</span>
                    <span style={{ display: 'inline-flex', transform: showDone ? 'rotate(90deg)' : 'none', transition: 'transform .18s ease' }}>
                      <CNIcon name="chevR" size={15} color={CN_C.faint} />
                    </span>
                  </button>
                  {showDone && (
                    <button onClick={uncheckAll} style={{
                      border: 'none', background: 'none', cursor: 'pointer', flexShrink: 0, padding: '4px 0',
                      fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: CN_T.small, color: CN_ACCENT,
                    }}>Tout remettre</button>
                  )}
                </div>

                {showDone && doneLines.map(l => (
                  <div key={l.key} style={{
                    display: 'flex', alignItems: 'center', gap: 2, borderBottom: `1px solid ${CN_C.hair}`,
                  }}>
                    <button onClick={() => toggle(l.key)} aria-label={`Remettre ${l.name} dans la liste`} style={{
                      width: 40, minHeight: 44, flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: 0,
                    }}>
                      <span style={{
                        width: 21, height: 21, borderRadius: CN_R.sm, background: CN_ACCENT,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}><CNIcon name="check" size={12} color={CN_C.card} strokeWidth={2.5} /></span>
                    </button>
                    <button onClick={() => setEditKey(l.key)} aria-label={`Ouvrir ${l.name}`} style={{
                      flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left',
                      background: 'none', border: 'none', padding: '10px 0', cursor: 'pointer', minHeight: 44,
                    }}>
                      <span style={{
                        flex: 1, minWidth: 0, fontFamily: CN_FONTS.body, fontSize: CN_T.base - 1, color: CN_C.muted,
                        textDecoration: 'line-through', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>{l.name}</span>
                      <span style={{ fontFamily: CN_FONTS.mono, fontSize: CN_T.small, color: CN_C.faint, flexShrink: 0 }}>{l.qty}</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <CNQtySheet line={editLine} onClose={() => setEditKey(null)}
        onSet={(v) => setQty(editKey, v)}
        onRemove={() => { remove(editKey); setEditKey(null); }}
        onOpenRecipe={onOpenRecipe && ((id) => { setEditKey(null); onOpenRecipe(id); })}
        onUncheck={() => { toggle(editKey); setEditKey(null); }} />

      {/* Vous commandez au drive : copier la liste EST le geste principal.
          Enregistrer la sortie courses vient après, une fois la commande passée. */}
      {total > 0 && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: bottomInset, padding: '14px 20px 16px', zIndex: 55,
          background: `linear-gradient(to top, ${CN_C.paper} 70%, rgba(250,250,248,0))`, display: 'flex', gap: 8,
        }}>
          <button onClick={copyDrive} disabled={!remaining} style={{
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
