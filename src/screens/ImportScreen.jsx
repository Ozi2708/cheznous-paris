import React from 'react';
import { CN_FONTS, CN_CHAPTERS, chMeta, CNIcon } from '../helpers.jsx';
import { CNRecipeScreen } from './RecipeScreen.jsx';
import { cnExtractRecipe, cnNormalizeRecipe, cnValidateRecipe, CN_MAX_PAGES } from '../recipe-import.js';

/* ── Ajouter une recette en photo ──
   Trois temps : capture → extraction → validation. L'aperçu de validation
   utilise la vraie fiche recette, pas une maquette : ce que vous validez est
   exactement ce que vous obtiendrez. */

const CHAPTERS = Object.keys(CN_CHAPTERS);

/* D'où viennent les quatre valeurs — l'utilisateur doit pouvoir en juger. */
const CN_NUTRI_SOURCE = {
  document: { badge: 'du document', color: '#3D5430', soft: '#EAF0E2',
    text: 'Valeurs relevées sur la photo.' },
  ciqual: { badge: 'calculé', color: '#3D4E8A', soft: '#EEF1FB',
    text: 'Calculé en sommant les ingrédients depuis la table CIQUAL de l’ANSES.' },
  estime: { badge: 'estimé', color: '#8A6B4A', soft: '#F9F1E7',
    text: 'Trop d’ingrédients hors répertoire pour un calcul fiable : ces valeurs sont une estimation. Corrigez-les si vous les connaissez.' },
};

const inputStyle = {
  width: '100%', height: 44, borderRadius: 12, border: '1.5px solid #E4DDD2', background: '#FFFFFF',
  padding: '0 13px', fontFamily: CN_FONTS.body, fontSize: 14, color: '#1A1918', outline: 'none', boxSizing: 'border-box',
};
const label = { display: 'block', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 10.5, letterSpacing: '.09em', textTransform: 'uppercase', color: '#B8B3AA', marginBottom: 6 };

function CNTopBar({ onBack, title, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px 12px', flexShrink: 0 }}>
      <button onClick={onBack} aria-label="Retour" style={{
        width: 38, height: 38, borderRadius: '50%', border: 'none', background: 'none',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}><CNIcon name="back" size={20} color="#1A1918" /></button>
      <span style={{ flex: 1, fontFamily: CN_FONTS.display, fontWeight: 800, fontSize: 16, color: '#1A1918' }}>{title}</span>
      {right}
    </div>
  );
}

/* ── 1. Capture ──
   Une recette peut s'étaler sur plusieurs pages : on collecte les images
   dans l'ordre, puis on les envoie ensemble en une seule analyse. */
function CNCaptureStep({ pages, onAdd, onRemove, onAnalyze, error, bottomInset }) {
  const camera = React.useRef(null);
  const gallery = React.useRef(null);
  const room = CN_MAX_PAGES - pages.length;
  const pick = (e) => { if (e.target.files && e.target.files.length) onAdd(e.target.files); e.target.value = ''; };

  const tile = {
    position: 'relative', aspectRatio: '3 / 4', borderRadius: 12, overflow: 'hidden',
    background: '#EEE8DC', border: '1.5px solid #E4DDD2',
  };

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <input ref={camera} type="file" accept="image/*" capture="environment" onChange={pick} style={{ display: 'none' }} />
      <input ref={gallery} type="file" accept="image/*" multiple onChange={pick} style={{ display: 'none' }} />

      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, padding: `0 20px calc(${pages.length ? 110 : 40}px + ${bottomInset})` }}>
        {error && (
          <div style={{
            background: '#FBEDE7', border: '1.5px solid #EBC3B2', borderRadius: 12, padding: '13px 15px', marginBottom: 18,
            fontFamily: CN_FONTS.body, fontSize: 13, color: '#8E3B1C', lineHeight: 1.45,
          }}>{error}</div>
        )}

        {pages.length === 0 ? (
          <>
            <div style={{ fontFamily: CN_FONTS.serif, fontStyle: 'italic', fontSize: 21, color: '#1A1918', lineHeight: 1.3, marginBottom: 8 }}>
              Photographiez une recette, elle se met au format de la maison.
            </div>
            <div style={{ fontFamily: CN_FONTS.body, fontSize: 13, color: '#8C8780', lineHeight: 1.6, marginBottom: 24 }}>
              Une page de livre, une capture d’écran, une fiche manuscrite. Si la recette tient sur plusieurs pages, ajoutez-les toutes — elles ne feront qu’une seule fiche.
            </div>

            <button onClick={() => camera.current.click()} style={{
              width: '100%', height: 56, borderRadius: 9999, border: 'none', background: '#506741', color: '#FFFFFF',
              cursor: 'pointer', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 15,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 10,
              boxShadow: '0 6px 20px rgba(80,103,65,.28)',
            }}>
              <CNIcon name="camera" size={20} color="#FFFFFF" /> Prendre une photo
            </button>
            <button onClick={() => gallery.current.click()} style={{
              width: '100%', height: 52, borderRadius: 9999, border: '1.5px solid #D5CEBE', background: '#FFFFFF',
              cursor: 'pointer', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 14, color: '#3C3830',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            }}>
              <CNIcon name="image" size={19} color="#8C8780" /> Choisir dans la galerie
            </button>

            <div style={{ marginTop: 30, borderTop: '1px solid #E4DDD2', paddingTop: 16 }}>
              <div style={{ ...label, marginBottom: 10 }}>Pour un bon résultat</div>
              {[
                'Cadrez la recette entière : ingrédients et préparation.',
                'Évitez les reflets et les pages trop courbées.',
                'Les quantités sont converties pour 2 personnes.',
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 9, marginBottom: 8 }}>
                  <span style={{ color: '#B89268', fontFamily: CN_FONTS.mono, fontSize: 12, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ fontFamily: CN_FONTS.body, fontSize: 12.5, color: '#8C8780', lineHeight: 1.5 }}>{t}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={label}>{pages.length} page{pages.length > 1 ? 's' : ''}</span>
              <span style={{ fontFamily: CN_FONTS.body, fontSize: 11, color: '#B8B3AA' }}>
                {room > 0 ? `${room} de plus possible${room > 1 ? 's' : ''}` : 'maximum atteint'}
              </span>
            </div>
            <div style={{ fontFamily: CN_FONTS.body, fontSize: 12.5, fontStyle: 'italic', color: '#8C8780', marginBottom: 14, lineHeight: 1.5 }}>
              Elles seront lues dans cet ordre et fusionnées en une seule recette.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {pages.map((p, i) => (
                <div key={p.url} style={tile}>
                  <img src={p.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <span style={{
                    position: 'absolute', top: 6, left: 6, background: 'rgba(26,25,24,.72)', color: '#FAFAF8',
                    borderRadius: 9999, minWidth: 20, height: 20, padding: '0 6px',
                    fontFamily: CN_FONTS.mono, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{i + 1}</span>
                  <button onClick={() => onRemove(i)} aria-label={`Retirer la page ${i + 1}`} style={{
                    position: 'absolute', top: 4, right: 4, width: 26, height: 26, borderRadius: '50%',
                    border: 'none', background: 'rgba(26,25,24,.72)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
                  }}><CNIcon name="x" size={13} color="#FAFAF8" strokeWidth={2.4} /></button>
                </div>
              ))}

              {room > 0 && (
                <button onClick={() => camera.current.click()} aria-label="Ajouter une page" style={{
                  ...tile, background: '#FAFAF8', borderStyle: 'dashed', borderColor: '#D5CEBE', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}>
                  <CNIcon name="plus" size={22} color="#B89268" />
                  <span style={{ fontFamily: CN_FONTS.body, fontSize: 10.5, fontWeight: 600, color: '#8C8780' }}>Page {pages.length + 1}</span>
                </button>
              )}
            </div>

            {room > 0 && (
              <button onClick={() => gallery.current.click()} style={{
                marginTop: 14, border: 'none', background: 'none', padding: 0, cursor: 'pointer',
                fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12.5, color: '#506741', textDecoration: 'underline',
              }}>Ajouter depuis la galerie</button>
            )}
          </>
        )}
      </div>

      {pages.length > 0 && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, padding: '12px 20px 16px', zIndex: 55,
          background: 'linear-gradient(to top, #FAFAF8 72%, rgba(250,250,248,0))',
        }}>
          <button onClick={onAnalyze} style={{
            width: '100%', height: 54, borderRadius: 9999, border: 'none', background: '#506741', color: '#FFFFFF',
            cursor: 'pointer', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 15,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            boxShadow: '0 6px 20px rgba(80,103,65,.28)',
          }}>
            <CNIcon name="sparkles" size={19} color="#FFFFFF" />
            Analyser {pages.length > 1 ? `les ${pages.length} pages` : 'la recette'}
          </button>
        </div>
      )}
    </div>
  );
}

/* ── 2. Extraction ── */
function CNWorkingStep({ pages }) {
  const [dots, setDots] = React.useState(1);
  React.useEffect(() => { const iv = setInterval(() => setDots(d => (d % 3) + 1), 500); return () => clearInterval(iv); }, []);
  const shown = pages.slice(0, 3);
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 30px 60px', gap: 24 }}>
      {/* Les pages en éventail : on voit ce qui est en train d'être lu. */}
      <div style={{ position: 'relative', width: 168, height: 190 }}>
        {shown.map((p, i) => (
          <img key={p.url} src={p.url} alt="" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16,
            boxShadow: '0 10px 30px rgba(26,25,24,.18)', opacity: .9,
            transform: `rotate(${(i - (shown.length - 1) / 2) * 6}deg) translateY(${i * 2}px)`,
            zIndex: shown.length - i,
          }} />
        ))}
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: CN_FONTS.serif, fontStyle: 'italic', fontSize: 20, color: '#1A1918' }}>
          Lecture {pages.length > 1 ? `des ${pages.length} pages` : 'de la recette'}{'.'.repeat(dots)}
        </div>
        <div style={{ fontFamily: CN_FONTS.body, fontSize: 12.5, color: '#8C8780', marginTop: 6 }}>
          {pages.length > 2 ? 'Une trentaine de secondes.' : 'Une quinzaine de secondes.'} Ne fermez pas l’app.
        </div>
      </div>
    </div>
  );
}

/* ── 3. Validation : formulaire d'ajustement ── */
function CNAdjustForm({ draft, setDraft }) {
  const set = (patch) => setDraft({ ...draft, ...patch });
  const setNut = (k, v) => set({ nutrition: { ...draft.nutrition, [k]: Math.max(0, parseInt(v, 10) || 0) } });

  const setItem = (si, ii, patch) => {
    const ingredients = draft.ingredients.map((sec, i) => i !== si ? sec : {
      ...sec, items: sec.items.map((it, j) => j !== ii ? it : { ...it, ...patch }),
    });
    set({ ingredients });
  };
  const dropItem = (si, ii) => {
    const ingredients = draft.ingredients
      .map((sec, i) => i !== si ? sec : { ...sec, items: sec.items.filter((_, j) => j !== ii) })
      .filter(sec => sec.items.length);
    set({ ingredients });
  };
  const setStep = (i, v) => set({ steps: draft.steps.map((s, j) => j === i ? v : s) });
  const dropStep = (i) => set({ steps: draft.steps.filter((_, j) => j !== i) });

  return (
    <div style={{ padding: '4px 20px 40px', display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div>
        <span style={label}>Titre</span>
        <input value={draft.title} onChange={e => set({ title: e.target.value })} style={inputStyle} />
      </div>

      <div>
        <span style={label}>Chapitre</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {CHAPTERS.map(c => {
            const on = draft.chapter === c, m = chMeta(c);
            return (
              <button key={c} onClick={() => set({ chapter: c })} style={{
                cursor: 'pointer', minHeight: 34, fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12,
                padding: '7px 13px', borderRadius: 9999, transition: 'all .15s ease',
                border: `1.5px solid ${on ? m.color : '#D5CEBE'}`,
                background: on ? m.color : '#FFFFFF', color: on ? '#FFFFFF' : '#3C3830',
              }}>{m.label}</button>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div>
          <span style={label}>Préparation (min)</span>
          <input type="number" inputMode="numeric" value={draft.prepMin}
            onChange={e => set({ prepMin: Math.max(0, parseInt(e.target.value, 10) || 0) })} style={inputStyle} />
        </div>
        <div>
          <span style={label}>Cuisson (min)</span>
          <input type="number" inputMode="numeric" value={draft.cookMin}
            onChange={e => set({ cookMin: Math.max(0, parseInt(e.target.value, 10) || 0) })} style={inputStyle} />
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
          <span style={{ ...label, marginBottom: 0 }}>Nutrition · par personne</span>
          {(() => {
            const s = CN_NUTRI_SOURCE[draft.nutritionSource] || CN_NUTRI_SOURCE.estime;
            return (
              <span style={{
                fontFamily: CN_FONTS.body, fontSize: 9, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase',
                color: s.color, background: s.soft, borderRadius: 9999, padding: '2px 7px',
              }}>{s.badge}</span>
            );
          })()}
        </div>
        <div style={{ fontFamily: CN_FONTS.body, fontSize: 11.5, fontStyle: 'italic', color: '#8C8780', marginBottom: 8, lineHeight: 1.45 }}>
          {(CN_NUTRI_SOURCE[draft.nutritionSource] || CN_NUTRI_SOURCE.estime).text}
          {draft.nutritionSource === 'ciqual' && draft.nutritionCoverage && (
            <> {draft.nutritionCoverage.reconnus} ingrédient{draft.nutritionCoverage.reconnus > 1 ? 's' : ''} reconnu{draft.nutritionCoverage.reconnus > 1 ? 's' : ''}
              {draft.nutritionCoverage.inconnus > 0 ? `, ${draft.nutritionCoverage.inconnus} hors répertoire.` : '.'}</>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[['kcal', 'Calories'], ['proteines', 'Protéines (g)'], ['glucides', 'Glucides (g)'], ['lipides', 'Lipides (g)']].map(([k, lbl]) => (
            <div key={k}>
              <span style={{ ...label, fontSize: 9.5 }}>{lbl}</span>
              <input type="number" inputMode="numeric" value={draft.nutrition[k]}
                onChange={e => setNut(k, e.target.value)} style={inputStyle} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <span style={label}>Ingrédients</span>
        {draft.ingredients.map((sec, si) => (
          <div key={sec.section} style={{ marginBottom: 12 }}>
            <div style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', color: '#8C8780', margin: '6px 0 6px 2px' }}>{sec.section}</div>
            {sec.items.map((it, ii) => (
              <div key={ii} style={{ display: 'flex', gap: 6, marginBottom: 6, alignItems: 'center' }}>
                <input value={it.q} onChange={e => setItem(si, ii, { q: e.target.value })} placeholder="qté"
                  style={{ ...inputStyle, width: 78, flexShrink: 0, fontFamily: CN_FONTS.mono, fontSize: 12.5 }} />
                <input value={it.name} onChange={e => setItem(si, ii, { name: e.target.value })}
                  style={{ ...inputStyle, flex: 1, minWidth: 0 }} />
                <button onClick={() => dropItem(si, ii)} aria-label="Supprimer" style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: 6, flexShrink: 0, lineHeight: 0,
                }}><CNIcon name="x" size={14} color="#D5CEBE" strokeWidth={2} /></button>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div>
        <span style={label}>Étapes</span>
        {draft.steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
            <span style={{ fontFamily: CN_FONTS.mono, fontSize: 12, color: '#B89268', paddingTop: 12, flexShrink: 0, width: 16 }}>{i + 1}</span>
            <textarea value={s} onChange={e => setStep(i, e.target.value)} rows={3} style={{
              ...inputStyle, flex: 1, minWidth: 0, height: 'auto', padding: '10px 12px', lineHeight: 1.5, resize: 'vertical',
            }} />
            <button onClick={() => dropStep(i)} aria-label="Supprimer" style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 6, paddingTop: 12, flexShrink: 0, lineHeight: 0,
            }}><CNIcon name="x" size={14} color="#D5CEBE" strokeWidth={2} /></button>
          </div>
        ))}
        <div style={{ fontFamily: CN_FONTS.body, fontSize: 11, fontStyle: 'italic', color: '#B8B3AA', marginTop: 2 }}>
          Les balises &lt;strong&gt; mettent les températures et durées en avant.
        </div>
      </div>
    </div>
  );
}

/* ── 3. Validation : aperçu + ajustement ── */
function CNReviewStep({ draft, setDraft, onSave, onDiscard, bottomInset }) {
  const [tab, setTab] = React.useState('apercu');
  const [portions, setPortions] = React.useState(2);
  const errs = cnValidateRecipe(draft);

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ display: 'flex', gap: 6, padding: '0 20px 12px', flexShrink: 0 }}>
        {[['apercu', 'Aperçu'], ['ajuster', 'Ajuster']].map(([id, lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, height: 38, borderRadius: 9999, cursor: 'pointer', transition: 'all .15s ease',
            fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 13,
            border: `1.5px solid ${tab === id ? '#506741' : '#D5CEBE'}`,
            background: tab === id ? '#506741' : '#FFFFFF', color: tab === id ? '#FFFFFF' : '#3C3830',
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: tab === 'ajuster' ? 'auto' : 'hidden' }}>
        {tab === 'apercu' ? (
          /* La vraie fiche, dans son rendu définitif — défilable, pour qu'on
             puisse tout relire avant d'enregistrer. */
          <div style={{ height: '100%', position: 'relative' }}>
            <CNRecipeScreen recipe={draft} portions={portions} setPortions={setPortions} preview
              week={{}} bottomInset={bottomInset} fav={false} onFav={null}
              onBack={null} onCook={() => {}} onPlanWeek={() => {}} pos={null} />
          </div>
        ) : (
          <CNAdjustForm draft={draft} setDraft={setDraft} />
        )}
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, padding: '12px 20px 16px', zIndex: 60,
        background: 'linear-gradient(to top, #FAFAF8 72%, rgba(250,250,248,0))',
      }}>
        {errs.length > 0 && (
          <div style={{ fontFamily: CN_FONTS.body, fontSize: 11.5, color: '#B85C38', marginBottom: 8, textAlign: 'center' }}>
            {errs[0]}
          </div>
        )}
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onDiscard} style={{
            width: 54, height: 54, borderRadius: '50%', border: '1.5px solid #E4DDD2', background: '#FFFFFF',
            cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }} aria-label="Abandonner"><CNIcon name="trash" size={19} color="#8C8780" /></button>
          <button onClick={onSave} disabled={errs.length > 0} style={{
            flex: 1, height: 54, borderRadius: 9999, border: 'none',
            cursor: errs.length ? 'default' : 'pointer',
            background: errs.length ? '#E4DDD2' : '#506741', color: '#FFFFFF',
            fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 15,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            boxShadow: errs.length ? 'none' : '0 6px 20px rgba(80,103,65,.28)',
          }}>
            <CNIcon name="check" size={19} color="#FFFFFF" strokeWidth={2.4} /> Ajouter à mes recettes
          </button>
        </div>
      </div>
    </div>
  );
}

export function CNImportScreen({ onBack, onSave, showToast, bottomInset = 0 }) {
  const [phase, setPhase] = React.useState('capture');   // capture | working | review
  const [pages, setPages] = React.useState([]);          // [{ file, url }]
  const [draft, setDraft] = React.useState(null);
  const [error, setError] = React.useState(null);

  /* Les aperçus sont des URL d'objet : il faut les libérer, sinon les images
     restent en mémoire tant que l'onglet vit. */
  const pagesRef = React.useRef(pages);
  pagesRef.current = pages;
  React.useEffect(() => () => pagesRef.current.forEach(p => URL.revokeObjectURL(p.url)), []);

  const addPages = (fileList) => {
    setError(null);
    const room = CN_MAX_PAGES - pages.length;
    const added = Array.from(fileList).slice(0, room).map(f => ({ file: f, url: URL.createObjectURL(f) }));
    if (Array.from(fileList).length > room) {
      setError(`Six pages au maximum pour une recette — les suivantes ont été ignorées.`);
    }
    setPages([...pages, ...added]);
  };
  const removePage = (i) => {
    URL.revokeObjectURL(pages[i].url);
    setPages(pages.filter((_, j) => j !== i));
  };
  const clearPages = () => { pages.forEach(p => URL.revokeObjectURL(p.url)); setPages([]); };

  const run = async () => {
    if (!pages.length) return;
    setError(null);
    setPhase('working');
    try {
      const { recipe } = await cnExtractRecipe(pages.map(p => p.file));
      setDraft(recipe);
      setPhase('review');
    } catch (e) {
      setError((e && e.message) || "L'extraction a échoué.");
      setPhase('capture');
    }
  };

  /* Les champs dérivés (badges, totaux, drapeaux) sont recalculés à chaque
     retouche : impossible de sauver une fiche incohérente. */
  const updateDraft = (next) => setDraft(cnNormalizeRecipe(next, { id: next.id, num: next.num, createdAt: next.createdAt }));

  const save = () => {
    const final = cnNormalizeRecipe(draft, { id: draft.id, num: draft.num, createdAt: draft.createdAt });
    onSave(final);
    showToast(`${final.title.slice(0, 24)} ajoutée à vos recettes`);
  };

  return (
    <div data-screen-label="Ajouter une recette" style={{
      height: '100%', display: 'flex', flexDirection: 'column', background: '#FAFAF8', position: 'relative',
    }}>
      <div style={{ paddingTop: 'var(--screen-top, 34px)', flexShrink: 0 }}>
        <CNTopBar onBack={onBack} title={phase === 'review' ? 'Vérifier la recette' : 'Ajouter une recette'} />
      </div>

      {phase === 'capture' && (
        <CNCaptureStep pages={pages} onAdd={addPages} onRemove={removePage} onAnalyze={run}
          error={error} bottomInset={bottomInset} />
      )}
      {phase === 'working' && <CNWorkingStep pages={pages} />}
      {phase === 'review' && draft && (
        <CNReviewStep draft={draft} setDraft={updateDraft} onSave={save} bottomInset={bottomInset}
          onDiscard={() => { setDraft(null); clearPages(); setPhase('capture'); }} />
      )}
    </div>
  );
}
