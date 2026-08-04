import React from 'react';
import { CN_FONTS, CNIcon } from './helpers.jsx';
import { CN_EMPTY_FILTERS, cnBatchList } from './utils.js';
import { useAllRecipes, cnSetUserRecipes, cnUserRecipes, cnAddUserRecipe, CN_MYRECIPES_KEY } from './recipes.js';
import { CNImportScreen } from './screens/ImportScreen.jsx';
import { CNPlanWeekSheet } from './ds-components.jsx';
import { useTweaks, TweaksPanel, TweakSection, TweakSlider, TweakRadio } from './tweaks-panel.jsx';
import { CNHomeScreen } from './screens/HomeScreen.jsx';
import { CNLibraryScreen } from './screens/LibraryScreen.jsx';
import { CNWeekScreen } from './screens/WeekScreen.jsx';
import { CNBatchScreen } from './screens/BatchMainScreen.jsx';
import { CNBatchCookScreen } from './screens/BatchSessionScreen.jsx';
import { CNFavsScreen } from './screens/FavsScreen.jsx';
import { CNRecipeScreen } from './screens/RecipeScreen.jsx';
import { CNCookScreen } from './screens/CookScreen.jsx';
import { CNMenuGeneratorScreen } from './screens/MenuGeneratorScreen.jsx';
import { CNFoyerSheet } from './screens/FoyerSheet.jsx';
import { CNCoursesListScreen } from './screens/CoursesListScreen.jsx';
import { CNCoursesRadarScreen } from './screens/CoursesRadarScreen.jsx';
import { CNCoursesProductsScreen } from './screens/CoursesProductsScreen.jsx';
import { CN_COURSES_EMPTY, CN_CART_EMPTY, cnCartLines, cnFinishTrip } from './courses.js';
import { useFoyerSync } from './sync.js';

const CN_TWEAK_DEFAULTS = { cookTheme: 'olive', cookTextSize: 25 };

const CN_WEEK_KEY = 'cheznous_week_v1';
const CN_BATCH_KEY = 'cheznous_batch_v1';
const CN_FAVS_KEY = 'cheznous_favs_v1';
const CN_PENDING_KEY = 'cheznous_pending_v1';
const CN_COURSES_KEY = 'cheznous_courses_v1';
const CN_PURCHASES_KEY = 'cheznous_purchases_v1';
const CN_CART_KEY = 'cheznous_cart_v1';
function cnLoad(key, fallback) {
  try { const v = JSON.parse(localStorage.getItem(key)); return v == null ? fallback : v; } catch (e) { return fallback; }
}

/* ── Deux applications dans une seule ──
   « Cuisine » (les recettes) et « Le Panier » (les courses) ont chacune leur
   barre d'onglets et leur couleur. Le mode vit dans l'historique : le retour
   Android ramène du Panier vers la Cuisine sans quitter l'app. */
const CN_MODES = {
  cuisine: { accent: '#506741', label: 'Chez nous', icon: 'chef' },
  courses: { accent: '#B85C38', label: 'Le Panier', icon: 'basket' },
};

const CN_TABS = [
  { id: 'home', label: 'Accueil', icon: 'home' },
  { id: 'library', label: 'Recettes', icon: 'book' },
  { id: 'week', label: 'Semaine', icon: 'cal' },
  { id: 'batch', label: 'Batch', icon: 'pot' },
  { id: 'favs', label: 'Favoris', icon: 'heart' },
];
const CN_COURSES_TABS = [
  { id: 'liste', label: 'Ma liste', icon: 'basket' },
  { id: 'radar', label: 'À prévoir', icon: 'sparkles' },
  { id: 'produits', label: 'Mes produits', icon: 'box' },
];

function CNTabBar({ mode, tab, onTab, weekCount, cartCount }) {
  const tabs = mode === 'courses' ? CN_COURSES_TABS : CN_TABS;
  const accent = CN_MODES[mode].accent;
  const badge = (t) => (mode === 'courses' ? (t.id === 'liste' ? cartCount : 0) : (t.id === 'week' ? weekCount : 0));
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 60,
      display: 'grid', gridTemplateColumns: `repeat(${tabs.length}, 1fr)`,
      background: 'rgba(250,250,248,.96)', backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderTop: '1px solid #E4DDD2',
      paddingTop: 8, paddingLeft: 8, paddingRight: 8,
      paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)',
    }}>
      {tabs.map(t => {
        const active = tab === t.id;
        const n = badge(t);
        return (
          <button key={t.id} onClick={() => onTab(t.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0 2px',
            minHeight: 48, position: 'relative', transition: 'all .15s ease',
          }}>
            {/* Un onglet inactif reste un repère : il lui faut un contraste
                lisible et une taille au-dessus du plancher de lisibilité. */}
            <CNIcon name={t.icon} size={22} color={active ? accent : '#8C8780'} strokeWidth={active ? 2.1 : 1.7} />
            <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11, letterSpacing: '.02em', color: active ? accent : '#767066' }}>{t.label}</span>
            {n > 0 && (
              <span style={{ position: 'absolute', top: 2, right: 'calc(50% - 19px)', background: '#B89268', color: '#fff', borderRadius: '50%', minWidth: 15, height: 15, fontFamily: CN_FONTS.mono, fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px' }}>{n}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* Bascule d'une app à l'autre — affiche toujours la destination. */
function CNModeSwitch({ mode, onSwitch, count }) {
  const target = CN_MODES[mode === 'courses' ? 'cuisine' : 'courses'];
  return (
    <button onClick={onSwitch} style={{
      display: 'inline-flex', alignItems: 'center', gap: 7, cursor: 'pointer', flexShrink: 0,
      border: `1.5px solid ${target.accent}`, background: '#FFFFFF', borderRadius: 9999,
      padding: '0 13px 0 9px', height: 38, transition: 'all .15s ease',
    }}>
      <span style={{ width: 22, height: 22, borderRadius: '50%', background: target.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <CNIcon name={target.icon} size={13} color="#FFFFFF" strokeWidth={2} />
      </span>
      <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12.5, color: target.accent, whiteSpace: 'nowrap' }}>{target.label}</span>
      {count > 0 && (
        <span style={{ fontFamily: CN_FONTS.mono, fontSize: 10, color: '#FFFFFF', background: target.accent, borderRadius: 9999, padding: '1px 6px' }}>{count}</span>
      )}
    </button>
  );
}

export function CNApp() {
  const [t, setTweak] = useTweaks(CN_TWEAK_DEFAULTS);
  /* Au lancement, on démarre toujours sur l'accueil (pas de restauration de la dernière page). */
  const [mode, setMode] = React.useState('cuisine');
  const [tab, setTab] = React.useState('home');
  const [screen, setScreen] = React.useState('tab');
  const [recipeId, setRecipeId] = React.useState(null);
  const [portions, setPortions] = React.useState(2);
  const [cookPhase, setCookPhase] = React.useState(-1);
  const [filters, setFilters] = React.useState({ ...CN_EMPTY_FILTERS });
  const [week, setWeekRaw] = React.useState(() => cnLoad(CN_WEEK_KEY, {}));
  const [batchSel, setBatchSelRaw] = React.useState(() => cnLoad(CN_BATCH_KEY, []));
  const [favs, setFavsRaw] = React.useState(() => cnLoad(CN_FAVS_KEY, []));
  const [toast, setToast] = React.useState(null);
  const [ctxIds, setCtxIds] = React.useState(null);
  const [planRecipe, setPlanRecipe] = React.useState(null);
  const [planPendingIdx, setPlanPendingIdx] = React.useState(null);
  const [pending, setPendingRaw] = React.useState(() => cnLoad(CN_PENDING_KEY, []));
  const [courses, setCoursesRaw] = React.useState(() => cnLoad(CN_COURSES_KEY, CN_COURSES_EMPTY));
  const [purchases, setPurchasesRaw] = React.useState(() => cnLoad(CN_PURCHASES_KEY, {}));
  const [cart, setCartRaw] = React.useState(() => cnLoad(CN_CART_KEY, CN_CART_EMPTY));
  const [foyerOpen, setFoyerOpen] = React.useState(false);

  /* ── Synchronisation du foyer ──
     Les mises à jour venues de l'autre téléphone atterrissent ici : on écrit
     l'état local sans le re-pousser (sinon boucle d'écho). */
  const stateRef = React.useRef(null);
  stateRef.current = { week, pending, favs, batch: batchSel, courses, purchases, cart, myrecipes: cnUserRecipes() };

  const applyRemote = React.useCallback((key, value) => {
    if (key === 'week') { const v = value || {}; setWeekRaw(v); localStorage.setItem(CN_WEEK_KEY, JSON.stringify(v)); }
    else if (key === 'pending') { const v = value || []; setPendingRaw(v); localStorage.setItem(CN_PENDING_KEY, JSON.stringify(v)); }
    else if (key === 'favs') { const v = value || []; setFavsRaw(v); localStorage.setItem(CN_FAVS_KEY, JSON.stringify(v)); }
    else if (key === 'batch') { const v = value || []; setBatchSelRaw(v); localStorage.setItem(CN_BATCH_KEY, JSON.stringify(v)); }
    else if (key === 'courses') { const v = value || CN_COURSES_EMPTY; setCoursesRaw(v); localStorage.setItem(CN_COURSES_KEY, JSON.stringify(v)); }
    else if (key === 'purchases') { const v = value || {}; setPurchasesRaw(v); localStorage.setItem(CN_PURCHASES_KEY, JSON.stringify(v)); }
    else if (key === 'cart') { const v = value || CN_CART_EMPTY; setCartRaw(v); localStorage.setItem(CN_CART_KEY, JSON.stringify(v)); }
    else if (key === 'myrecipes') { const v = Array.isArray(value) ? value : []; localStorage.setItem(CN_MYRECIPES_KEY, JSON.stringify(v)); cnSetUserRecipes(v, { persist: false }); }
  }, []);

  const sync = useFoyerSync({ onRemote: applyRemote, getLocal: () => stateRef.current });

  const setWeek = (w) => { setWeekRaw(w); localStorage.setItem(CN_WEEK_KEY, JSON.stringify(w)); sync.push('week', w); };
  const setBatchSel = (s) => { setBatchSelRaw(s); localStorage.setItem(CN_BATCH_KEY, JSON.stringify(s)); sync.push('batch', s); };
  const setFavs = (f) => { setFavsRaw(f); localStorage.setItem(CN_FAVS_KEY, JSON.stringify(f)); sync.push('favs', f); };
  const setPending = (p) => { setPendingRaw(p); localStorage.setItem(CN_PENDING_KEY, JSON.stringify(p)); sync.push('pending', p); };
  const setCourses = (c) => { setCoursesRaw(c); localStorage.setItem(CN_COURSES_KEY, JSON.stringify(c)); sync.push('courses', c); };
  const setPurchases = (p) => { setPurchasesRaw(p); localStorage.setItem(CN_PURCHASES_KEY, JSON.stringify(p)); sync.push('purchases', p); };
  const setCart = (c) => { setCartRaw(c); localStorage.setItem(CN_CART_KEY, JSON.stringify(c)); sync.push('cart', c); };
  const toggleFav = (id) => setFavs(favs.includes(id) ? favs.filter(x => x !== id) : [...favs, id]);

  const showToast = (text) => {
    setToast(text);
    clearTimeout(window.__cnToastT);
    window.__cnToastT = setTimeout(() => setToast(null), 2200);
  };
  const quickAddWeek = (r) => navigate({ plan: { id: r.id, pendingIdx: null } });
  const planPending = (r, idx) => navigate({ plan: { id: r.id, pendingIdx: idx } });
  const removePending = (idx) => setPending(pending.filter((_, i) => i !== idx));
  const commitMenu = (ids) => {
    setPending([...pending, ...ids]);
    navigate({ tab: 'week', screen: 'tab', recipeId: null }, { replace: true });
    showToast(`${ids.length} plat${ids.length > 1 ? 's' : ''} ajouté${ids.length > 1 ? 's' : ''} à la semaine`);
  };

  const recipes = useAllRecipes();

  React.useEffect(() => {
    const valid = new Set(cnBatchList(recipes).map(r => r.id));
    if (batchSel.some(id => !valid.has(id))) setBatchSel(batchSel.filter(id => valid.has(id)));
  }, []);

  const byId = React.useMemo(() => Object.fromEntries(recipes.map(r => [r.id, r])), [recipes]);
  const recipe = recipes.find(r => r.id === recipeId) || null;
  const shopRecipes = [
    ...Object.values(week).filter(Boolean).map(e => e.id),
    ...pending,
  ].map(id => byId[id]).filter(Boolean);
  const isDark = (screen === 'cook' && t.cookTheme === 'olive') || screen === 'batchcook';
  const weekCount = Object.values(week).filter(e => e && !e.done).length + pending.length;
  const dayIndex = Math.floor(Date.now() / 86400000);
  const cartCount = React.useMemo(
    () => cnCartLines(cart, shopRecipes, courses, purchases).total, [cart, shopRecipes, courses, purchases]);

  /* Le geste unique qui nourrit l'apprentissage : tout ce qui est coché est
     enregistré comme acheté aujourd'hui, et les ajouts libres deviennent des
     produits suivis. */
  const finishTrip = () => {
    const res = cnFinishTrip({ cart, recipes: shopRecipes, courses, purchases });
    if (!res.count) { showToast('Rien de coché'); return; }
    setPurchases(res.purchases);
    setCourses(res.courses);
    setCart(res.cart);
    showToast(`${res.count} article${res.count > 1 ? 's' : ''} enregistré${res.count > 1 ? 's' : ''} — rythmes mis à jour`);
  };

  /* ── Navigation branchée sur l'History API ──
     Chaque navigation « en avant » empile une entrée d'historique ; le geste/bouton
     retour d'Android dépile (popstate) au lieu de fermer l'app. */
  const applyLoc = React.useCallback((loc) => {
    const L = loc || { mode: 'cuisine', tab: 'home', screen: 'tab' };
    setMode(L.mode || 'cuisine');
    setTab(L.tab || 'home');
    setScreen(L.screen || 'tab');
    setRecipeId(L.recipeId ?? null);
    setCtxIds(L.ctxIds ?? null);
    if (L.plan) { setPlanRecipe(byId[L.plan.id] || null); setPlanPendingIdx(L.plan.pendingIdx ?? null); }
    else { setPlanRecipe(null); setPlanPendingIdx(null); }
  }, [byId]);

  const navigate = (patch, opts = {}) => {
    const next = {
      mode, tab, screen, recipeId, ctxIds,
      plan: planRecipe ? { id: planRecipe.id, pendingIdx: planPendingIdx } : null,
      ...patch,
    };
    if (opts.replace) window.history.replaceState({ loc: next }, '');
    else window.history.pushState({ loc: next }, '');
    applyLoc(next);
  };
  const goBack = () => window.history.back();
  const switchMode = () => navigate(mode === 'courses'
    ? { mode: 'cuisine', tab: 'home', screen: 'tab', recipeId: null }
    : { mode: 'courses', tab: 'liste', screen: 'tab', recipeId: null });

  React.useEffect(() => {
    const home = { mode: 'cuisine', tab: 'home', screen: 'tab' };
    window.history.replaceState({ loc: home }, '');
    const onPop = (e) => applyLoc(e.state && e.state.loc ? e.state.loc : home);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [applyLoc]);

  const openRecipe = (r, ids) => { setPortions(2); navigate({ screen: 'recipe', recipeId: r.id, ctxIds: ids && ids.length > 1 ? ids : null }); };
  const applyPreset = (preset) => { setFilters({ ...CN_EMPTY_FILTERS, ...preset }); navigate({ tab: 'library', screen: 'tab', recipeId: null }); };

  const ctx = ctxIds || recipes.map(r => r.id);
  const ctxIdx = ctx.indexOf(recipeId);
  const goCtx = (d) => { const id = ctx[ctxIdx + d]; if (id) { setPortions(2); navigate({ recipeId: id }, { replace: true }); } };

  /* Hauteur de la barre d'onglets pour les écrans qui ont un CTA sticky */
  const tabBarH = 'calc(64px + env(safe-area-inset-bottom, 0px))';

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: isDark ? '#2C3C22' : '#FAFAF8',
      overflow: 'hidden',
      /* Variables CSS accessibles par tous les écrans enfants */
      '--screen-top': 'calc(env(safe-area-inset-top, 20px) + 14px)',
      '--screen-bottom': 'env(safe-area-inset-bottom, 0px)',
    }}>
      <div style={{ height: '100%', position: 'relative' }}>

        {screen === 'tab' && mode === 'cuisine' && (
          <div style={{ height: '100%', position: 'relative' }}>
            {tab === 'home' && <CNHomeScreen dayIndex={dayIndex} onPreset={applyPreset} onOpen={openRecipe}
              onFoyer={() => setFoyerOpen(true)} syncStatus={sync.status} week={week} byId={byId}
              onGoWeek={() => navigate({ tab: 'week', screen: 'tab' })}
              modeSwitch={<CNModeSwitch mode={mode} onSwitch={switchMode} count={cartCount} />}
              onGoLibrary={() => { setFilters({ ...CN_EMPTY_FILTERS }); navigate({ tab: 'library', screen: 'tab' }); }} onGoBatch={() => navigate({ tab: 'batch', screen: 'tab' })} />}
            {tab === 'library' && <CNLibraryScreen filters={filters} setFilters={setFilters} onOpen={openRecipe} onQuickAdd={quickAddWeek} onImport={() => navigate({ screen: 'import' })} />}
            {tab === 'week' && <CNWeekScreen week={week} setWeek={setWeek} onOpen={openRecipe}
              pending={pending} onComposeMenu={() => navigate({ screen: 'menu' })} onPlanPending={planPending} onRemovePending={removePending} />}
            {tab === 'batch' && <CNBatchScreen sel={batchSel} setSel={setBatchSel} onOpen={openRecipe} onStart={() => navigate({ screen: 'batchcook' })} />}
            {tab === 'favs' && <CNFavsScreen favs={favs} onToggleFav={toggleFav} onQuickAdd={quickAddWeek} onOpen={(r) => openRecipe(r, favs)} />}
            <CNTabBar mode={mode} tab={tab} onTab={(tb) => navigate({ tab: tb, screen: 'tab', recipeId: null })} weekCount={weekCount} cartCount={cartCount} />
          </div>
        )}

        {screen === 'tab' && mode === 'courses' && (
          <div style={{ height: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{
              flexShrink: 0,
              padding: 'var(--screen-top, 34px) 20px 0', display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', gap: 10, background: '#FAFAF8',
            }}>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
                <span style={{ fontFamily: CN_FONTS.serif, fontSize: 21, color: '#1A1918', lineHeight: 1, whiteSpace: 'nowrap' }}>Le <span style={{ fontStyle: 'italic', color: '#B85C38' }}>Panier</span></span>
                <span style={{ fontFamily: CN_FONTS.body, fontSize: 8.5, letterSpacing: '.22em', textTransform: 'uppercase', color: '#B89268' }}>Chez nous à Paris</span>
              </span>
              <CNModeSwitch mode={mode} onSwitch={switchMode} count={weekCount} />
            </div>
            <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
              {tab === 'liste' && <CNCoursesListScreen cart={cart} setCart={setCart} recipes={shopRecipes}
                courses={courses} purchases={purchases} onFinish={finishTrip} showToast={showToast}
                bottomInset={tabBarH} onGoRadar={() => navigate({ tab: 'radar', screen: 'tab' })} />}
              {tab === 'radar' && <CNCoursesRadarScreen cart={cart} setCart={setCart} recipes={shopRecipes}
                courses={courses} setCourses={setCourses} purchases={purchases} showToast={showToast}
                bottomInset={tabBarH} onGoList={() => navigate({ tab: 'liste', screen: 'tab' })} />}
              {tab === 'produits' && <CNCoursesProductsScreen courses={courses} setCourses={setCourses}
                purchases={purchases} setPurchases={setPurchases} showToast={showToast} bottomInset={tabBarH} />}
            </div>
            <CNTabBar mode={mode} tab={tab} onTab={(tb) => navigate({ tab: tb, screen: 'tab', recipeId: null })} weekCount={weekCount} cartCount={cartCount} />
          </div>
        )}

        {screen === 'recipe' && recipe && (
          <div style={{ height: '100%', position: 'relative' }}>
            <CNRecipeScreen key={recipe.id} recipe={recipe} portions={portions} setPortions={setPortions}
              week={week} bottomInset={tabBarH}
              fav={favs.includes(recipe.id)} onFav={() => toggleFav(recipe.id)}
              onPrev={ctxIdx > 0 ? () => goCtx(-1) : null}
              onNext={ctxIdx >= 0 && ctxIdx < ctx.length - 1 ? () => goCtx(1) : null}
              pos={ctxIdx >= 0 ? { i: ctxIdx, n: ctx.length } : null}
              onPlanWeek={(slotKey) => setWeek({ ...week, [slotKey]: { id: recipe.id, done: false } })}
              onBack={goBack}
              onCook={() => { setCookPhase(-1); navigate({ screen: 'cook' }); }} />
            <CNTabBar mode="cuisine" tab={tab} onTab={(tb) => navigate({ mode: 'cuisine', tab: tb, screen: 'tab', recipeId: null })} weekCount={weekCount} cartCount={cartCount} />
          </div>
        )}

        {screen === 'cook' && recipe && (
          <CNCookScreen recipe={recipe} portions={portions} theme={t.cookTheme} textSize={t.cookTextSize}
            initialPhase={cookPhase} onPhaseChange={setCookPhase}
            onExit={goBack} />
        )}

        {screen === 'batchcook' && batchSel.length >= 2 && (
          <CNBatchCookScreen sel={batchSel} onExit={goBack} />
        )}

        {screen === 'menu' && (
          <CNMenuGeneratorScreen onBack={goBack} onCommit={commitMenu} />
        )}

        {screen === 'import' && (
          <CNImportScreen onBack={goBack} showToast={showToast} bottomInset="0px"
            onSave={(r) => {
              cnAddUserRecipe(r);
              sync.push('myrecipes', cnUserRecipes());
              setPortions(2);
              navigate({ screen: 'recipe', recipeId: r.id, ctxIds: null }, { replace: true });
            }} />
        )}

        {(((screen === 'recipe' || screen === 'cook') && !recipe) || (screen === 'batchcook' && batchSel.length < 2)) && (
          <div style={{ paddingTop: 140, textAlign: 'center' }}>
            <button onClick={() => navigate({ mode: 'cuisine', tab: 'home', screen: 'tab', recipeId: null })} style={{ border: 'none', background: '#506741', color: '#fff', borderRadius: 9999, padding: '12px 24px', cursor: 'pointer', fontFamily: CN_FONTS.body, fontWeight: 600 }}>Retour à l'accueil</button>
          </div>
        )}

        {toast && (
          <div style={{
            position: 'absolute', left: 16, right: 16,
            bottom: 'calc(env(safe-area-inset-bottom, 0px) + 80px)',
            zIndex: 90,
            background: '#1A1918', color: '#FAFAF8', borderRadius: 9999, padding: '11px 18px',
            display: 'flex', alignItems: 'center', gap: 9, boxShadow: '0 8px 24px rgba(26,25,24,.3)',
          }}>
            <CNIcon name="check" size={15} color="#DCBE98" strokeWidth={2.5} />
            <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{toast}</span>
          </div>
        )}

        <CNPlanWeekSheet open={!!planRecipe} onClose={goBack} recipe={planRecipe} week={week}
          onPlan={(slotKey) => {
            if (!planRecipe) return;
            setWeek({ ...week, [slotKey]: { id: planRecipe.id, done: false } });
            if (planPendingIdx != null) setPending(pending.filter((_, i) => i !== planPendingIdx));
            const label = slotKey.replace('-', ' ').toLowerCase();
            const title = planRecipe.title.length > 24 ? planRecipe.title.slice(0, 23) + '…' : planRecipe.title;
            showToast(`${title} → ${label}`);
          }} />

        <CNFoyerSheet open={foyerOpen} onClose={() => setFoyerOpen(false)} sync={sync} showToast={showToast} />
      </div>

      <TweaksPanel>
        <TweakSection label="Mode cuisine" />
        <TweakRadio label="Ambiance" value={t.cookTheme} options={['olive', 'creme']} onChange={(v) => setTweak('cookTheme', v)} />
        <TweakSlider label="Taille du texte" value={t.cookTextSize} min={20} max={32} unit="px" onChange={(v) => setTweak('cookTextSize', v)} />
      </TweaksPanel>
    </div>
  );
}
