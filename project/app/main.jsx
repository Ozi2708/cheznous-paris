/* ── Racine de l'app v2 — 4 onglets + navigation + tweaks ──────── */
const { useState: useStateM, useEffect: useEffectM } = React;

const CN_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "cookTheme": "olive",
  "cookTextSize": 25
}/*EDITMODE-END*/;

const CN_NAV_KEY = 'cheznous_app_nav_v2';
const CN_WEEK_KEY = 'cheznous_week_v1';
const CN_BATCH_KEY = 'cheznous_batch_v1';
const CN_FAVS_KEY = 'cheznous_favs_v1';
function cnLoad(key, fallback) {
  try { const v = JSON.parse(localStorage.getItem(key)); return v == null ? fallback : v; } catch (e) { return fallback; }
}

const CN_TABS = [
  { id: 'home', label: 'Accueil', icon: 'home' },
  { id: 'library', label: 'Recettes', icon: 'book' },
  { id: 'week', label: 'Semaine', icon: 'cal' },
  { id: 'batch', label: 'Batch', icon: 'pot' },
  { id: 'favs', label: 'Favoris', icon: 'heart' },
];

function CNTabBar({ tab, onTab, weekCount }) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 60,
      display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
      background: 'rgba(250,250,248,.92)', backdropFilter: 'blur(12px)',
      borderTop: '1px solid #E4DDD2', padding: '8px 8px 26px',
    }}>
      {CN_TABS.map(t => {
        const active = tab === t.id;
        return (
          <button key={t.id} onClick={() => onTab(t.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0 2px',
            minHeight: 48, position: 'relative', transition: 'all .15s ease',
          }}>
            <CNIcon name={t.icon} size={22} color={active ? '#506741' : '#B8B3AA'} strokeWidth={active ? 2.1 : 1.7}></CNIcon>
            <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 9.5, letterSpacing: '.04em', color: active ? '#506741' : '#B8B3AA' }}>{t.label}</span>
            {t.id === 'week' && weekCount > 0 && (
              <span style={{ position: 'absolute', top: 2, right: 'calc(50% - 19px)', background: '#B89268', color: '#fff', borderRadius: '50%', minWidth: 15, height: 15, fontFamily: CN_FONTS.mono, fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px' }}>{weekCount}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function CNApp() {
  const [t, setTweak] = useTweaks(CN_TWEAK_DEFAULTS);
  const saved = cnLoad(CN_NAV_KEY, {});
  const [tab, setTab] = useStateM(saved.tab || 'home');
  const [screen, setScreen] = useStateM(saved.screen || 'tab'); /* tab | recipe | cook | batchcook */
  const [recipeId, setRecipeId] = useStateM(saved.recipeId || null);
  const [portions, setPortions] = useStateM(saved.portions || 2);
  const [cookPhase, setCookPhase] = useStateM(saved.cookPhase != null ? saved.cookPhase : -1);
  const [filters, setFilters] = useStateM({ ...CN_EMPTY_FILTERS });
  const [week, setWeekRaw] = useStateM(() => cnLoad(CN_WEEK_KEY, {}));
  const [batchSel, setBatchSelRaw] = useStateM(() => cnLoad(CN_BATCH_KEY, []));
  const [favs, setFavsRaw] = useStateM(() => cnLoad(CN_FAVS_KEY, []));
  const [toast, setToast] = useStateM(null);
  const [ctxIds, setCtxIds] = useStateM(null); /* liste de navigation ‹ › de la fiche recette */

  const setWeek = (w) => { setWeekRaw(w); localStorage.setItem(CN_WEEK_KEY, JSON.stringify(w)); };
  const setBatchSel = (s) => { setBatchSelRaw(s); localStorage.setItem(CN_BATCH_KEY, JSON.stringify(s)); };
  const setFavs = (f) => { setFavsRaw(f); localStorage.setItem(CN_FAVS_KEY, JSON.stringify(f)); };
  const toggleFav = (id) => setFavs(favs.includes(id) ? favs.filter(x => x !== id) : [...favs, id]);

  const showToast = (text) => {
    setToast(text);
    clearTimeout(window.__cnToastT);
    window.__cnToastT = setTimeout(() => setToast(null), 2200);
  };
  const quickAddWeek = (r) => {
    const slot = cnNextFreeSlot(week);
    if (!slot) { showToast('Semaine complète — libérez un créneau'); return; }
    setWeek({ ...week, [slot.key]: { id: r.id, done: false } });
    showToast(`${r.title.length > 24 ? r.title.slice(0, 23) + '…' : r.title} → ${slot.label}`);
  };

  useEffectM(() => {
    localStorage.setItem(CN_NAV_KEY, JSON.stringify({ tab, screen, recipeId, portions, cookPhase }));
  }, [tab, screen, recipeId, portions, cookPhase]);
  useEffectM(() => { window.__cnNav = (tb, sc) => { setTab(tb); setScreen(sc || 'tab'); }; }, []);
  /* assainit les sélections batch périmées (recettes plus compatibles) */
  useEffectM(() => {
    const valid = new Set(cnBatchList().map(r => r.id));
    if (batchSel.some(id => !valid.has(id))) setBatchSel(batchSel.filter(id => valid.has(id)));
  }, []);

  const recipes = window.CHEZNOUS_DATA.recipes;
  const recipe = recipes.find(r => r.id === recipeId) || null;
  const isDark = (screen === 'cook' && t.cookTheme === 'olive') || screen === 'batchcook';
  const weekCount = Object.values(week).filter(e => e && !e.done).length;
  const dayIndex = Math.floor(Date.now() / 86400000);

  const openRecipe = (r, ids) => { setCtxIds(ids && ids.length > 1 ? ids : null); setRecipeId(r.id); setPortions(2); setScreen('recipe'); };
  const applyPreset = (preset) => { setFilters({ ...CN_EMPTY_FILTERS, ...preset }); setTab('library'); };

  /* navigation ‹ › entre recettes (contexte = liste d'origine, sinon toutes) */
  const ctx = ctxIds || recipes.map(r => r.id);
  const ctxIdx = ctx.indexOf(recipeId);
  const goCtx = (d) => { const id = ctx[ctxIdx + d]; if (id) { setRecipeId(id); setPortions(2); } };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '24px 0' }}>
      <CNDeviceScaler>
        <IOSDevice dark={isDark}>
          {screen === 'tab' && (
            <div style={{ height: '100%', position: 'relative' }}>
              {tab === 'home' && <CNHomeScreen dayIndex={dayIndex} onPreset={applyPreset} onOpen={openRecipe}
                onGoLibrary={() => { setFilters({ ...CN_EMPTY_FILTERS }); setTab('library'); }} onGoBatch={() => setTab('batch')}></CNHomeScreen>}
              {tab === 'library' && <CNLibraryScreen filters={filters} setFilters={setFilters} onOpen={openRecipe} onQuickAdd={quickAddWeek}></CNLibraryScreen>}
              {tab === 'week' && <CNWeekScreen week={week} setWeek={setWeek} onOpen={openRecipe}></CNWeekScreen>}
              {tab === 'batch' && <CNBatchScreen sel={batchSel} setSel={setBatchSel} onOpen={openRecipe} onStart={() => setScreen('batchcook')}></CNBatchScreen>}
              {tab === 'favs' && <CNFavsScreen favs={favs} onToggleFav={toggleFav} onQuickAdd={quickAddWeek} onOpen={(r) => openRecipe(r, favs)}></CNFavsScreen>}
              <CNTabBar tab={tab} onTab={setTab} weekCount={weekCount}></CNTabBar>
            </div>
          )}
          {screen === 'recipe' && recipe && (
            <div style={{ height: '100%', position: 'relative' }}>
              <CNRecipeScreen key={recipe.id} recipe={recipe} portions={portions} setPortions={setPortions}
                week={week} bottomInset={78}
                fav={favs.includes(recipe.id)} onFav={() => toggleFav(recipe.id)}
                onPrev={ctxIdx > 0 ? () => goCtx(-1) : null}
                onNext={ctxIdx >= 0 && ctxIdx < ctx.length - 1 ? () => goCtx(1) : null}
                pos={ctxIdx >= 0 ? { i: ctxIdx, n: ctx.length } : null}
                onPlanWeek={(slotKey) => setWeek({ ...week, [slotKey]: { id: recipe.id, done: false } })}
                onBack={() => setScreen('tab')}
                onCook={() => { setCookPhase(-1); setScreen('cook'); }}></CNRecipeScreen>
              <CNTabBar tab={tab} onTab={(tb) => { setTab(tb); setScreen('tab'); }} weekCount={weekCount}></CNTabBar>
            </div>
          )}
          {screen === 'cook' && recipe && (
            <CNCookScreen recipe={recipe} portions={portions} theme={t.cookTheme} textSize={t.cookTextSize}
              initialPhase={cookPhase} onPhaseChange={setCookPhase}
              onExit={() => setScreen('recipe')}></CNCookScreen>
          )}
          {screen === 'batchcook' && batchSel.length >= 2 && (
            <CNBatchCookScreen sel={batchSel} onExit={() => { setScreen('tab'); setTab('batch'); }}></CNBatchCookScreen>
          )}
          {((screen === 'recipe' || screen === 'cook') && !recipe) || (screen === 'batchcook' && batchSel.length < 2) ? (
            <div style={{ paddingTop: 140, textAlign: 'center' }}>
              <button onClick={() => { setScreen('tab'); setTab('home'); }} style={{ border: 'none', background: '#506741', color: '#fff', borderRadius: 9999, padding: '12px 24px', cursor: 'pointer', fontFamily: CN_FONTS.body, fontWeight: 600 }}>Retour à l'accueil</button>
            </div>
          ) : null}
          {toast && (
            <div style={{
              position: 'absolute', left: 24, right: 24, bottom: 104, zIndex: 90,
              background: '#1A1918', color: '#FAFAF8', borderRadius: 9999, padding: '11px 18px',
              display: 'flex', alignItems: 'center', gap: 9, boxShadow: '0 8px 24px rgba(26,25,24,.3)',
            }}>
              <CNIcon name="check" size={15} color="#DCBE98" strokeWidth={2.5}></CNIcon>
              <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{toast}</span>
            </div>
          )}
        </IOSDevice>
      </CNDeviceScaler>

      <div style={{ fontFamily: CN_FONTS.body, fontSize: 12, color: '#B8B3AA', textAlign: 'center' }}>
        Accueil · Recettes · Semaine · Batch · Favoris — tout est mémorisé
      </div>

      <TweaksPanel>
        <TweakSection label="Mode cuisine"></TweakSection>
        <TweakRadio label="Ambiance" value={t.cookTheme}
          options={['olive', 'creme']}
          onChange={(v) => setTweak('cookTheme', v)}></TweakRadio>
        <TweakSlider label="Taille du texte" value={t.cookTextSize} min={20} max={32} unit="px"
          onChange={(v) => setTweak('cookTextSize', v)}></TweakSlider>
      </TweaksPanel>
    </div>
  );
}

/* Adapte l'iPhone à la hauteur du viewport */
function CNDeviceScaler({ children }) {
  const [scale, setScale] = useStateM(1);
  useEffectM(() => {
    const upd = () => setScale(Math.min(1, (window.innerHeight - 90) / 874, (window.innerWidth - 40) / 402));
    upd();
    window.addEventListener('resize', upd);
    return () => window.removeEventListener('resize', upd);
  }, []);
  return (
    <div style={{ width: 402 * scale, height: 874 * scale }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>{children}</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<CNApp></CNApp>);
