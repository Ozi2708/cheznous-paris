import React from 'react';
import { CN_FONTS, CN_CHAPTERS, chMeta, CNIcon, CNChip, CNMacros } from '../helpers.jsx';
import { cnApplyFilters, CN_EMPTY_FILTERS, cnCountActive, CN_DIET_FILTERS } from '../utils.js';
import { CHEZNOUS_DATA } from '../data.js';

function CNSearchBar({ f, setF, onOpenFilters, autoFocus }) {
  const nActive = cnCountActive(f);
  return (
    <div style={{ display: 'flex', gap: 8, padding: '0 20px' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: '#FFFFFF', border: '1.5px solid #E4DDD2', borderRadius: 9999, padding: '0 16px', height: 44 }}>
        <CNIcon name="search" size={17} color="#B8B3AA" />
        <input value={f.q} autoFocus={autoFocus} onChange={e => setF({ ...f, q: e.target.value })} placeholder="Une recette, un ingrédient…"
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: CN_FONTS.body, fontSize: 14, color: '#1A1918', minWidth: 0 }} />
        {f.q && <button onClick={() => setF({ ...f, q: '' })} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 2, display: 'flex' }}><CNIcon name="x" size={14} color="#B8B3AA" /></button>}
      </div>
      <button onClick={onOpenFilters} style={{
        width: 44, height: 44, borderRadius: 9999, border: '1.5px solid', cursor: 'pointer', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .15s ease',
        background: nActive ? '#506741' : '#FFFFFF', borderColor: nActive ? '#506741' : '#E4DDD2',
      }}>
        <CNIcon name="sliders" size={19} color={nActive ? '#FFFFFF' : '#506741'} />
        {nActive > 0 && <span style={{ position: 'absolute', top: -4, right: -4, background: '#B89268', color: '#fff', borderRadius: '50%', width: 18, height: 18, fontFamily: CN_FONTS.mono, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{nActive}</span>}
      </button>
    </div>
  );
}

function CNChapterChips({ f, setF, recipes }) {
  const chips = Object.keys(CN_CHAPTERS);
  return (
    <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '14px 20px 4px', scrollbarWidth: 'none' }}>
      <CNChip label="Tout" active={!f.chapter} color="#1A1918" onClick={() => setF({ ...f, chapter: null })} />
      {chips.map(c => {
        const n = recipes.filter(r => r.chapter === c).length;
        const m = chMeta(c);
        if (n === 0) return (
          <span key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0, fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12, padding: '8px 14px', borderRadius: 9999, border: '1.5px dashed #D5CEBE', color: '#B8B3AA', whiteSpace: 'nowrap' }}>
            {m.label} <span style={{ fontSize: 10, fontStyle: 'italic', fontWeight: 400 }}>bientôt</span>
          </span>
        );
        return <CNChip key={c} label={m.label} count={n} active={f.chapter === c} color={m.color} onClick={() => setF({ ...f, chapter: f.chapter === c ? null : c })} />;
      })}
    </div>
  );
}

function CNFilterSheet({ open, onClose, f, setF, results }) {
  const lbl = { fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11, letterSpacing: '.11em', textTransform: 'uppercase', color: '#8C8780', marginBottom: 10 };
  const types = ['Poulet', 'Bœuf', 'Porc', 'Poisson', 'Crevettes', 'Végétarien', 'Végan'];
  const toggle = (key, v) => setF({ ...f, [key]: f[key].includes(v) ? f[key].filter(x => x !== v) : [...f[key], v] });
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 80, pointerEvents: open ? 'auto' : 'none' }} aria-hidden={!open}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(26,25,24,.4)', opacity: open ? 1 : 0, transition: 'opacity .25s ease' }}></div>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, background: '#FAFAF8', borderRadius: '24px 24px 0 0',
        transform: open ? 'translateY(0)' : 'translateY(105%)', transition: 'transform .3s cubic-bezier(.32,.72,.25,1)',
        padding: '14px 22px calc(env(safe-area-inset-bottom, 0px) + 16px)', maxHeight: '78%', overflowY: 'auto', boxShadow: '0 -8px 40px rgba(26,25,24,.18)',
      }}>
        <div style={{ width: 38, height: 4, borderRadius: 99, background: '#D5CEBE', margin: '0 auto 16px' }}></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
          <span style={{ fontFamily: CN_FONTS.display, fontWeight: 800, fontSize: 22, color: '#1A1918' }}>Filtres</span>
          <button onClick={() => setF({ ...CN_EMPTY_FILTERS, q: f.q, chapter: f.chapter })} style={{ border: 'none', background: 'none', fontFamily: CN_FONTS.body, fontSize: 13, color: '#8C8780', cursor: 'pointer', textDecoration: 'underline' }}>Réinitialiser</button>
        </div>

        <div style={lbl}>Régime &amp; envies</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
          {CN_DIET_FILTERS.map(d => <CNChip key={d} label={d} active={f.diet.includes(d)} onClick={() => toggle('diet', d)} />)}
        </div>

        <div style={lbl}>Protéine principale</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
          {types.map(t => <CNChip key={t} label={t} color="#8A6B4A" active={f.types.includes(t)} onClick={() => toggle('types', t)} />)}
        </div>

        <div style={lbl}>Temps total</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 22, flexWrap: 'wrap' }}>
          {[{ v: null, l: 'Peu importe' }, { v: 20, l: '≤ 20 min' }, { v: 35, l: '≤ 35 min' }, { v: 50, l: '≤ 50 min' }].map(o => (
            <CNChip key={String(o.v)} label={o.l} active={f.maxTime === o.v} color="#2E8B85" onClick={() => setF({ ...f, maxTime: o.v })} />
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 26 }}>
          <div>
            <div style={lbl}>Calories max</div>
            <div style={{ fontFamily: CN_FONTS.display, fontWeight: 800, fontSize: 26, color: '#E07534', marginBottom: 4 }}>
              {f.maxKcal >= 900 ? '—' : f.maxKcal}<span style={{ fontSize: 13, color: '#B8B3AA', fontWeight: 600 }}> kcal</span>
            </div>
            <input type="range" min="300" max="900" step="25" value={f.maxKcal} onChange={e => setF({ ...f, maxKcal: +e.target.value })} style={{ width: '100%', accentColor: '#E07534' }} />
          </div>
          <div>
            <div style={lbl}>Protéines min</div>
            <div style={{ fontFamily: CN_FONTS.display, fontWeight: 800, fontSize: 26, color: '#3E7852', marginBottom: 4 }}>
              {f.minProt === 0 ? '—' : f.minProt}<span style={{ fontSize: 13, color: '#B8B3AA', fontWeight: 600 }}> g</span>
            </div>
            <input type="range" min="0" max="60" step="5" value={f.minProt} onChange={e => setF({ ...f, minProt: +e.target.value })} style={{ width: '100%', accentColor: '#3E7852' }} />
          </div>
        </div>

        <button onClick={onClose} style={{
          width: '100%', height: 50, borderRadius: 9999, border: 'none', cursor: 'pointer',
          background: '#506741', color: '#fff', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 15,
          transition: 'all .15s ease',
        }}>Voir {results} recette{results > 1 ? 's' : ''}</button>
      </div>
    </div>
  );
}

function CNLibraryIndex({ recipes, onOpen, onQuickAdd }) {
  const byChapter = React.useMemo(() => {
    const g = {};
    recipes.forEach(r => { (g[r.chapter] = g[r.chapter] || []).push(r); });
    return g;
  }, [recipes]);
  return (
    <div style={{ padding: '6px 0 120px' }}>
      {Object.entries(byChapter).map(([ch, list]) => {
        const m = chMeta(ch);
        return (
          <div key={ch} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, padding: '18px 20px 10px', borderBottom: `2px solid ${m.color}` }}>
              <span style={{ fontFamily: CN_FONTS.serif, fontSize: 38, lineHeight: 1, color: m.color }}>{String(Object.keys(CN_CHAPTERS).indexOf(ch) + 1).padStart(2, '0')}</span>
              <div>
                <div style={{ fontFamily: CN_FONTS.display, fontWeight: 800, fontSize: 19, color: '#1A1918' }}>{m.label}</div>
                <div style={{ fontFamily: CN_FONTS.body, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: '#B8B3AA' }}>{m.sub} · {list.length} recettes</div>
              </div>
            </div>
            {list.map(r => (
              <div key={r.id} style={{
                display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid #E4DDD2',
                padding: '11px 14px 11px 20px', transition: 'background .15s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#FFFFFF'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <button onClick={() => onOpen(r)} style={{ flex: 1, minWidth: 0, textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <span style={{ fontFamily: CN_FONTS.mono, fontSize: 11, color: m.color, flexShrink: 0 }}>{String(r.num).padStart(2, '0')}</span>
                    <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 14.5, color: '#1A1918', lineHeight: 1.35, flex: 1 }}>{r.title}</span>
                    <span style={{ fontFamily: CN_FONTS.mono, fontSize: 11, color: '#B8B3AA', flexShrink: 0 }}>{r.totalMin}′</span>
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 5, paddingLeft: 28 }}>
                    <CNMacros n={r.nutrition} size={11} gap={8} />
                  </div>
                </button>
                {onQuickAdd && (
                  <button onClick={() => onQuickAdd(r)} aria-label="Ajouter à ma semaine" title="Ajouter à ma semaine" style={{
                    width: 38, height: 38, borderRadius: 9999, border: '1.5px solid #E4DDD2', background: '#FFFFFF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'all .15s ease',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#506741'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#E4DDD2'; }}>
                    <CNIcon name="calplus" size={17} color="#506741" />
                  </button>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export function CNLibraryScreen({ filters, setFilters, onOpen, onQuickAdd }) {
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const all = CHEZNOUS_DATA.recipes;
  const results = React.useMemo(() => cnApplyFilters(all, filters), [all, filters]);
  const open = (r) => onOpen(r, results.map(x => x.id));
  return (
    <div data-screen-label="Bibliothèque" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FAFAF8', position: 'relative' }}>
      <div style={{ paddingTop: 'var(--screen-top, 34px)', flexShrink: 0 }}>
        <div style={{ padding: '6px 20px 14px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: CN_FONTS.serif, fontSize: 30, color: '#1A1918', whiteSpace: 'nowrap' }}>Bibliothèque</span>
          <span style={{ fontFamily: CN_FONTS.mono, fontSize: 11, color: '#B8B3AA' }}>{results.length} / {all.length}</span>
        </div>
        <CNSearchBar f={filters} setF={setFilters} onOpenFilters={() => setSheetOpen(true)} />
        <CNChapterChips f={filters} setF={setFilters} recipes={all} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        {results.length === 0 ? (
          <div style={{ padding: '60px 40px', textAlign: 'center' }}>
            <div style={{ fontFamily: CN_FONTS.serif, fontStyle: 'italic', fontSize: 22, color: '#8C8780', marginBottom: 8 }}>Rien dans le garde-manger…</div>
            <button onClick={() => setFilters({ ...CN_EMPTY_FILTERS })} style={{ border: 'none', background: 'none', fontFamily: CN_FONTS.body, fontSize: 13, color: '#506741', cursor: 'pointer', textDecoration: 'underline' }}>Effacer les filtres</button>
          </div>
        ) : <CNLibraryIndex recipes={results} onOpen={open} onQuickAdd={onQuickAdd} />}
      </div>
      <CNFilterSheet open={sheetOpen} onClose={() => setSheetOpen(false)} f={filters} setF={setFilters} results={results.length} />
    </div>
  );
}
