import React from 'react';
import { CN_FONTS, CNIcon } from '../helpers.jsx';
import { cnProducts, cnStatus, cnWhy, cnSnooze, cnRecipeNeeds, CN_LEVEL_META } from '../courses.js';
import { CN_RAYONS, cnRayonMeta } from '../courses-data.js';

const CN_ACCENT = '#B85C38';

function CNSuggestRow({ product, status, inCart, onAdd, onSnooze, purchases }) {
  const m = CN_LEVEL_META[status.level] || CN_LEVEL_META.bientot;
  const ray = cnRayonMeta(product.rayon);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #EEE8DC', padding: '10px 2px', minHeight: 52 }}>
      <span style={{ width: 30, height: 30, borderRadius: '50%', background: ray.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <CNIcon name={ray.icon} size={15} color={ray.color} />
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ fontFamily: CN_FONTS.body, fontSize: 14, fontWeight: 500, color: '#1A1918', lineHeight: 1.25 }}>{product.name}</span>
          {status.level && status.level !== 'jamais' && (
            <span style={{
              fontFamily: CN_FONTS.body, fontSize: 9, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase',
              color: m.color, background: m.soft, borderRadius: 9999, padding: '2px 7px', flexShrink: 0,
            }}>{m.label}</span>
          )}
        </span>
        <span style={{ display: 'block', fontFamily: CN_FONTS.body, fontSize: 11, color: '#B8B3AA', marginTop: 2 }}>
          {cnWhy(product, purchases)}
        </span>
      </span>
      {onSnooze && (
        <button onClick={onSnooze} title="J’en ai encore" aria-label="J’en ai encore" style={{
          width: 34, height: 34, borderRadius: '50%', border: '1.5px solid #E4DDD2', background: '#FFFFFF',
          cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><CNIcon name="pause" size={13} color="#B8B3AA" strokeWidth={2} /></button>
      )}
      <button onClick={onAdd} disabled={inCart} aria-label="Ajouter à la liste" style={{
        width: 34, height: 34, borderRadius: '50%', border: 'none', flexShrink: 0,
        background: inCart ? '#EDF1E7' : CN_ACCENT, cursor: inCart ? 'default' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <CNIcon name={inCart ? 'check' : 'plus'} size={16} color={inCart ? '#506741' : '#FFFFFF'} strokeWidth={2.3} />
      </button>
    </div>
  );
}

export function CNCoursesRadarScreen({ cart, setCart, recipes, courses, setCourses, purchases, showToast, bottomInset = 0, onGoList }) {
  const [openRayon, setOpenRayon] = React.useState(null);

  const inCart = React.useMemo(() => new Set((cart.items || []).filter(i => i.pid).map(i => i.pid)), [cart]);
  const inList = React.useMemo(() => new Set((cart.items || []).map(i => i.key)), [cart]);
  const skipped = React.useMemo(() => new Set(cart.skipped || []), [cart]);

  const products = React.useMemo(() => cnProducts(courses), [courses]);
  const scored = React.useMemo(() => products
    .map(p => ({ p, s: cnStatus(p, purchases) }))
    .filter(x => x.s.level && x.s.level !== 'pause'), [products, purchases]);

  const due = React.useMemo(() => scored.filter(x => x.s.level !== 'jamais').sort((a, b) => b.s.ratio - a.s.ratio), [scored]);
  const review = React.useMemo(() => scored.filter(x => x.s.level === 'jamais'), [scored]);
  const needs = React.useMemo(() => cnRecipeNeeds(recipes), [recipes]);
  const pantry = needs.pantry;
  const recipeInList = needs.buy.filter(l => !skipped.has(l.key)).length;

  const addProduct = (p) => {
    setCart({ ...cart, items: [...(cart.items || []), { key: 'prod:' + p.id, pid: p.id, name: p.name, rayon: p.rayon, src: 'produit' }] });
  };
  const addAllDue = () => {
    const fresh = due.filter(x => !inCart.has(x.p.id));
    if (!fresh.length) { showToast('Tout est déjà dans la liste'); return; }
    setCart({ ...cart, items: [...(cart.items || []), ...fresh.map(({ p }) => ({ key: 'prod:' + p.id, pid: p.id, name: p.name, rayon: p.rayon, src: 'produit' }))] });
    showToast(`${fresh.length} produit${fresh.length > 1 ? 's' : ''} ajouté${fresh.length > 1 ? 's' : ''}`);
  };
  const snooze = (p) => { setCourses(cnSnooze(courses, purchases, p.id)); showToast(`${p.name} — repoussé`); };
  const togglePantry = (l) => {
    if (inList.has(l.key)) setCart({ ...cart, items: cart.items.filter(it => it.key !== l.key), checked: (cart.checked || []).filter(k => k !== l.key) });
    else setCart({ ...cart, items: [...(cart.items || []), { key: l.key, name: l.name, qty: l.qty, rayon: l.rayon, src: 'placard' }] });
  };

  const lbl = { fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11, letterSpacing: '.11em', textTransform: 'uppercase', color: '#B8B3AA', marginBottom: 8 };

  return (
    <div data-screen-label="Le Panier — À prévoir" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FAFAF8' }}>
      <div style={{ flexShrink: 0, padding: '4px 20px 0' }}>
        <span style={{ fontFamily: CN_FONTS.serif, fontSize: 30, color: '#1A1918' }}>À prévoir</span>
        <div style={{ fontFamily: CN_FONTS.body, fontSize: 12.5, color: '#8C8780', fontStyle: 'italic', marginTop: 2 }}>
          Ce que votre rythme et vos recettes réclament.
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, padding: `18px 20px calc(40px + ${bottomInset})` }}>

        {/* ── C'est le moment ── */}
        <div style={{ marginBottom: 26 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span style={lbl}>C’est le moment</span>
            {due.length > 0 && (
              <button onClick={addAllDue} style={{
                border: 'none', background: 'none', cursor: 'pointer', fontFamily: CN_FONTS.body,
                fontWeight: 600, fontSize: 12, color: CN_ACCENT,
              }}>Tout ajouter</button>
            )}
          </div>
          {due.length === 0 ? (
            <div style={{
              border: '1.5px dashed #E4DDD2', borderRadius: 12, padding: '18px 16px', textAlign: 'center',
              fontFamily: CN_FONTS.body, fontSize: 12.5, color: '#8C8780',
            }}>
              Rien d’urgent. L’app affine vos rythmes à chaque « J’ai fait mes courses ».
            </div>
          ) : due.map(({ p, s }) => (
            <CNSuggestRow key={p.id} product={p} status={s} purchases={purchases} inCart={inCart.has(p.id)}
              onAdd={() => addProduct(p)} onSnooze={() => snooze(p)} />
          ))}
        </div>

        {/* ── Les recettes de la semaine ── */}
        <div style={{ marginBottom: 26 }}>
          <div style={lbl}>Vos recettes de la semaine</div>
          <button onClick={onGoList} style={{
            width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
            border: '1.5px solid #DCE7CE', background: '#F2F6EC', borderRadius: 12, padding: '13px 15px', marginBottom: pantry.length ? 12 : 0,
          }}>
            <span style={{ width: 32, height: 32, borderRadius: '50%', background: '#506741', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CNIcon name="chef" size={17} color="#FAFAF8" />
            </span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 13.5, color: '#1A1918' }}>
                {recipeInList} ingrédient{recipeInList > 1 ? 's' : ''} déjà dans la liste
              </span>
              <span style={{ display: 'block', fontFamily: CN_FONTS.body, fontSize: 11.5, color: '#5E7A4A', marginTop: 1 }}>
                {recipeInList ? 'Ajoutés automatiquement depuis vos plats' : 'Planifiez des plats pour les voir arriver ici'}
              </span>
            </span>
            <CNIcon name="chevR" size={16} color="#8C8780" />
          </button>

          {pantry.length > 0 && (
            <>
              <div style={{ fontFamily: CN_FONTS.body, fontSize: 11.5, fontStyle: 'italic', color: '#8C8780', margin: '0 0 6px 2px' }}>
                Fonds de placard & épices — cochez ce qui vous manque :
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {pantry.map(l => {
                  const on = inList.has(l.key);
                  return (
                    <button key={l.key} onClick={() => togglePantry(l)} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer',
                      fontFamily: CN_FONTS.body, fontWeight: on ? 600 : 400, fontSize: 12,
                      padding: '7px 13px', borderRadius: 9999, minHeight: 34,
                      border: `1.5px solid ${on ? CN_ACCENT : '#D5CEBE'}`,
                      background: on ? CN_ACCENT : '#FFFFFF', color: on ? '#FFFFFF' : '#3C3830',
                      transition: 'all .15s ease',
                    }}>
                      <CNIcon name={on ? 'check' : 'plus'} size={12} color={on ? '#FFFFFF' : '#B8B3AA'} strokeWidth={2.2} />
                      {l.name}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* ── Passer en revue ── */}
        {review.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={lbl}>Passer en revue</div>
            <div style={{ fontFamily: CN_FONTS.body, fontSize: 11.5, fontStyle: 'italic', color: '#8C8780', margin: '-4px 0 10px 2px' }}>
              {review.length} produits jamais achetés depuis l’app. Ajoutez-les une fois : l’app apprendra ensuite leur rythme toute seule.
            </div>
            {CN_RAYONS.map(ray => {
              const list = review.filter(x => x.p.rayon === ray.id);
              if (!list.length) return null;
              const open = openRayon === ray.id;
              return (
                <div key={ray.id} style={{ marginBottom: 6 }}>
                  <button onClick={() => setOpenRayon(open ? null : ray.id)} style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                    background: '#FFFFFF', border: '1.5px solid #E4DDD2', borderRadius: 10, padding: '11px 13px', minHeight: 48,
                  }}>
                    <span style={{ width: 28, height: 28, borderRadius: '50%', background: ray.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CNIcon name={ray.icon} size={14} color={ray.color} />
                    </span>
                    <span style={{ flex: 1, textAlign: 'left', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 13, color: '#1A1918' }}>{ray.label}</span>
                    <span style={{ fontFamily: CN_FONTS.mono, fontSize: 11, color: '#B8B3AA' }}>{list.length}</span>
                    <span style={{ display: 'inline-flex', transform: open ? 'rotate(90deg)' : 'none', transition: 'transform .18s ease' }}>
                      <CNIcon name="chevR" size={15} color="#B8B3AA" />
                    </span>
                  </button>
                  {open && (
                    <div style={{ padding: '2px 4px 8px' }}>
                      {list.map(({ p, s }) => (
                        <CNSuggestRow key={p.id} product={p} status={s} purchases={purchases} inCart={inCart.has(p.id)}
                          onAdd={() => addProduct(p)} onSnooze={null} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
