import React from 'react';
import { CN_FONTS, CNIcon } from '../helpers.jsx';
import { cnProducts, cnRhythm, cnStatus, cnToday, cnDayLabel, CN_RHYTHM_LABEL } from '../courses.js';
import { CN_RAYONS, cnRayonMeta, cnRayon, cnProdNorm, cnDefaultQty } from '../courses-data.js';

const CN_ACCENT = '#B85C38';

function CNSheet({ open, onClose, title, children }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 200, pointerEvents: open ? 'auto' : 'none' }} aria-hidden={!open}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(26,25,24,.4)', opacity: open ? 1 : 0, transition: 'opacity .25s ease' }}></div>
      {/* `visibility` : une fiche fermée ne doit contenir aucun élément focusable,
          sinon le navigateur fait défiler le conteneur racine pour le révéler. */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, background: '#FAFAF8', borderRadius: '24px 24px 0 0',
        transform: open ? 'translateY(0)' : 'translateY(105%)',
        visibility: open ? 'visible' : 'hidden',
        transition: open ? 'transform .3s cubic-bezier(.32,.72,.25,1)'
                         : 'transform .3s cubic-bezier(.32,.72,.25,1), visibility 0s linear .3s',
        padding: '14px 22px calc(env(safe-area-inset-bottom, 0px) + 18px)', boxShadow: '0 -8px 40px rgba(26,25,24,.18)',
        maxHeight: '86%', overflowY: 'auto',
      }}>
        <div style={{ width: 38, height: 4, borderRadius: 99, background: '#D5CEBE', margin: '0 auto 14px' }}></div>
        <div style={{ fontFamily: CN_FONTS.display, fontWeight: 800, fontSize: 19, color: '#1A1918', marginBottom: 14 }}>{title}</div>
        {children}
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', height: 46, borderRadius: 12, border: '1.5px solid #E4DDD2', background: '#FFFFFF',
  padding: '0 14px', fontFamily: CN_FONTS.body, fontSize: 14, color: '#1A1918', outline: 'none', boxSizing: 'border-box',
};
const fieldLabel = { display: 'block', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 10.5, letterSpacing: '.09em', textTransform: 'uppercase', color: '#B8B3AA', marginBottom: 6 };

function CNRayonPicker({ value, onChange }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {CN_RAYONS.map(r => {
        const on = value === r.id;
        return (
          <button key={r.id} onClick={() => onChange(r.id)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer', minHeight: 32,
            fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11.5, padding: '6px 11px', borderRadius: 9999,
            border: `1.5px solid ${on ? r.color : '#D5CEBE'}`, background: on ? r.color : '#FFFFFF',
            color: on ? '#FFFFFF' : '#3C3830', transition: 'all .15s ease',
          }}><CNIcon name={r.icon} size={12} color={on ? '#FFFFFF' : r.color} /> {r.label}</button>
        );
      })}
    </div>
  );
}

export function CNCoursesProductsScreen({ courses, setCourses, purchases, setPurchases, showToast, bottomInset = 0 }) {
  const [q, setQ] = React.useState('');
  const [editId, setEditId] = React.useState(null);
  const [creating, setCreating] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', rayon: 'epicerie', days: '' });

  const products = React.useMemo(() => cnProducts(courses), [courses]);
  const filtered = React.useMemo(() => {
    const n = cnProdNorm(q);
    return n ? products.filter(p => cnProdNorm(p.name).includes(n)) : products;
  }, [products, q]);
  const editing = products.find(p => p.id === editId) || null;

  const patchPrefs = (id, patch) => {
    const prefs = { ...(courses.prefs || {}) };
    prefs[id] = { ...(prefs[id] || {}), ...patch };
    setCourses({ ...courses, prefs });
  };
  const logNow = (p) => {
    const today = cnToday();
    const arr = ((purchases || {})[p.id] || []).filter(d => d !== today);
    setPurchases({ ...(purchases || {}), [p.id]: [...arr, today].slice(-12) });
    patchPrefs(p.id, { snoozeUntil: undefined, stretch: undefined });
    showToast(`${p.name} — noté comme racheté`);
    setEditId(null);
  };
  const remove = (p) => { patchPrefs(p.id, { removed: true }); setEditId(null); showToast(`${p.name} retiré`); };

  const create = () => {
    const name = form.name.trim();
    if (!name) return;
    const id = 'u-' + cnProdNorm(name).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Math.random().toString(36).slice(2, 5);
    const days = parseInt(form.days, 10);
    setCourses({ ...courses, custom: [...(courses.custom || []), { id, name, rayon: form.rayon, days: days > 0 ? days : null }] });
    setCreating(false); setForm({ name: '', rayon: 'epicerie', days: '' });
    showToast(`${name} ajouté à vos produits`);
  };

  return (
    <div data-screen-label="Le Panier — Mes produits" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FAFAF8', position: 'relative' }}>
      <div style={{ flexShrink: 0, padding: '4px 20px 0' }}>
        <span style={{ fontFamily: CN_FONTS.serif, fontSize: 30, color: '#1A1918' }}>Mes produits</span>
        <div style={{ fontFamily: CN_FONTS.body, fontSize: 12.5, color: '#8C8780', fontStyle: 'italic', marginTop: 2 }}>
          {products.length} produits suivis · l’app apprend leur rythme
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <span style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ position: 'absolute', left: 14, display: 'flex' }}><CNIcon name="search" size={16} color="#B8B3AA" /></span>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Chercher un produit…"
              style={{ ...inputStyle, height: 44, borderRadius: 9999, paddingLeft: 38 }} />
          </span>
          <button onClick={() => setCreating(true)} aria-label="Nouveau produit" style={{
            width: 44, height: 44, borderRadius: '50%', border: 'none', background: CN_ACCENT, cursor: 'pointer',
            flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><CNIcon name="plus" size={20} color="#FFFFFF" strokeWidth={2.2} /></button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, padding: `16px 20px calc(40px + ${bottomInset})` }}>
        {CN_RAYONS.map(ray => {
          const list = filtered.filter(p => p.rayon === ray.id);
          if (!list.length) return null;
          return (
            <div key={ray.id} style={{ marginBottom: 20 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 7, background: ray.soft, color: ray.color,
                padding: '5px 11px', borderRadius: 6, fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11,
                letterSpacing: '.09em', textTransform: 'uppercase', marginBottom: 4,
              }}><CNIcon name={ray.icon} size={13} color={ray.color} /> {ray.label}</div>
              {list.map(p => {
                const r = cnRhythm(p, purchases);
                const s = cnStatus(p, purchases);
                return (
                  <button key={p.id} onClick={() => setEditId(p.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 11, width: '100%', textAlign: 'left', minHeight: 52,
                    background: 'none', border: 'none', borderBottom: '1px solid #EEE8DC', padding: '10px 2px', cursor: 'pointer',
                    opacity: p.paused ? .5 : 1,
                  }}>
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ display: 'block', fontFamily: CN_FONTS.body, fontSize: 14, color: '#1A1918', lineHeight: 1.3 }}>{p.name}</span>
                      {p.exact && (
                        <span style={{
                          display: 'block', fontFamily: CN_FONTS.body, fontSize: 11, fontStyle: 'italic',
                          color: CN_ACCENT, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>{p.exact}</span>
                      )}
                      <span style={{ display: 'block', fontFamily: CN_FONTS.body, fontSize: 11, color: '#B8B3AA', marginTop: 2 }}>
                        {p.paused ? 'En pause'
                          : r.last == null ? `~${r.days} j (${CN_RHYTHM_LABEL[r.source]}) · jamais acheté`
                          : `Tous les ~${r.days} j (${CN_RHYTHM_LABEL[r.source]}) · ${r.buys}× · ${cnDayLabel(s.since)}`}
                      </span>
                    </span>
                    {s.level && s.level !== 'jamais' && s.level !== 'pause' && (
                      <span style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: s.ratio >= 1 ? CN_ACCENT : '#DCBE98' }}></span>
                    )}
                    <CNIcon name="chevR" size={15} color="#D5CEBE" />
                  </button>
                );
              })}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '50px 20px', fontFamily: CN_FONTS.body, fontSize: 13, color: '#8C8780' }}>
            Aucun produit ne correspond.
          </div>
        )}
      </div>

      {/* ── Fiche produit ── */}
      <CNSheet open={!!editing} onClose={() => setEditId(null)} title={editing ? editing.name : ''}>
        {editing && (() => {
          const r = cnRhythm(editing, purchases);
          const s = cnStatus(editing, purchases);
          const ray = cnRayonMeta(editing.rayon);
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: CN_FONTS.body, fontSize: 12.5, color: '#8C8780' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: ray.soft, color: ray.color, borderRadius: 9999, padding: '4px 10px', fontWeight: 600, fontSize: 11 }}>
                  <CNIcon name={ray.icon} size={12} color={ray.color} /> {ray.label}
                </span>
                <span>{r.buys ? `${r.buys} achat${r.buys > 1 ? 's' : ''} enregistré${r.buys > 1 ? 's' : ''}` : 'aucun achat enregistré'}</span>
              </div>

              <div style={{ background: '#FFFFFF', border: '1.5px solid #E4DDD2', borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ fontFamily: CN_FONTS.display, fontWeight: 800, fontSize: 26, color: '#1A1918', lineHeight: 1 }}>
                  ~{r.days} <span style={{ fontSize: 14, fontWeight: 600, color: '#8C8780' }}>jours</span>
                </div>
                <div style={{ fontFamily: CN_FONTS.body, fontSize: 12, color: '#8C8780', marginTop: 5 }}>
                  {CN_RHYTHM_LABEL[r.source]}{r.gaps ? ` sur ${r.gaps} intervalle${r.gaps > 1 ? 's' : ''}` : ''}
                  {s.since != null ? ` · dernier achat ${cnDayLabel(s.since)}` : ''}
                </div>
              </div>

              {/* ── Ce qu'on achète, exactement ──
                  Ces deux champs se retrouvent tels quels dans la liste copiée :
                  plus besoin de retrouver la bonne référence à chaque commande. */}
              <div>
                <span style={fieldLabel}>Quantité habituelle</span>
                <input value={editing.qty || ''} placeholder={cnDefaultQty(editing.name, editing.rayon)}
                  onChange={e => patchPrefs(editing.id, { qty: e.target.value || undefined })}
                  style={inputStyle} />
                <div style={{ fontFamily: CN_FONTS.body, fontSize: 11.5, color: '#B8B3AA', marginTop: 5, lineHeight: 1.5 }}>
                  Ce que vous prenez d’habitude — proposé dès que ce produit entre dans la liste.
                </div>
              </div>

              <div>
                <span style={fieldLabel}>Produit exact au drive</span>
                <input value={editing.exact || ''} placeholder="Marque, format, référence…"
                  onChange={e => patchPrefs(editing.id, { exact: e.target.value || undefined })}
                  style={inputStyle} />
                <div style={{ fontFamily: CN_FONTS.body, fontSize: 11.5, color: '#B8B3AA', marginTop: 5, lineHeight: 1.5 }}>
                  Écrit à la place du nom dans la liste copiée : le drive ne choisit plus la marque à votre place.
                </div>
              </div>

              <div>
                <span style={fieldLabel}>Forcer un rythme (jours)</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input type="number" inputMode="numeric" value={editing.userDays || ''} placeholder={String(r.days)}
                    onChange={e => { const v = parseInt(e.target.value, 10); patchPrefs(editing.id, { userDays: v > 0 ? v : undefined }); }}
                    style={{ ...inputStyle, flex: 1 }} />
                  {editing.userDays && (
                    <button onClick={() => patchPrefs(editing.id, { userDays: undefined })} style={{
                      border: '1.5px solid #E4DDD2', background: '#FFFFFF', borderRadius: 12, padding: '0 16px', cursor: 'pointer',
                      fontFamily: CN_FONTS.body, fontSize: 12.5, color: '#8C8780',
                    }}>Auto</button>
                  )}
                </div>
              </div>

              <button onClick={() => logNow(editing)} style={{
                height: 50, borderRadius: 9999, border: 'none', background: CN_ACCENT, color: '#FFFFFF', cursor: 'pointer',
                fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 14.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
              }}><CNIcon name="check" size={17} color="#FFFFFF" strokeWidth={2.4} /> Je viens d’en racheter</button>

              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => { patchPrefs(editing.id, { paused: !editing.paused }); }} style={{
                  flex: 1, height: 46, borderRadius: 12, border: '1.5px solid #E4DDD2', background: '#FFFFFF', cursor: 'pointer',
                  fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12.5, color: '#3C3830',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                }}><CNIcon name="pause" size={14} color="#8C8780" /> {editing.paused ? 'Réactiver' : 'Mettre en pause'}</button>
                <button onClick={() => remove(editing)} style={{
                  flex: 1, height: 46, borderRadius: 12, border: '1.5px solid #F2D9CF', background: '#FFFFFF', cursor: 'pointer',
                  fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12.5, color: CN_ACCENT,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                }}><CNIcon name="trash" size={14} color={CN_ACCENT} /> Retirer</button>
              </div>
            </div>
          );
        })()}
      </CNSheet>

      {/* ── Nouveau produit ── */}
      <CNSheet open={creating} onClose={() => setCreating(false)} title="Nouveau produit">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <span style={fieldLabel}>Nom</span>
            <input value={form.name} placeholder="Croquettes du chat, éponges…"
              onChange={e => setForm({ ...form, name: e.target.value, rayon: cnRayon(e.target.value) })}
              onKeyDown={e => { if (e.key === 'Enter') create(); }} style={inputStyle} />
          </div>
          <div>
            <span style={fieldLabel}>Rayon</span>
            <CNRayonPicker value={form.rayon} onChange={(r) => setForm({ ...form, rayon: r })} />
          </div>
          <div>
            <span style={fieldLabel}>Tous les combien ? (facultatif)</span>
            <input type="number" inputMode="numeric" value={form.days} placeholder="Laissez vide, l’app apprendra"
              onChange={e => setForm({ ...form, days: e.target.value })} style={inputStyle} />
          </div>
          <button onClick={create} disabled={!form.name.trim()} style={{
            height: 52, borderRadius: 9999, border: 'none', cursor: form.name.trim() ? 'pointer' : 'default',
            background: form.name.trim() ? CN_ACCENT : '#E4DDD2', color: '#FFFFFF',
            fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 15,
          }}>Ajouter à mes produits</button>
        </div>
      </CNSheet>
    </div>
  );
}
