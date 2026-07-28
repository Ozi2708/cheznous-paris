import React from 'react';
import { createClient } from '@supabase/supabase-js';

/* ── Configuration ──
   La clé « anon » est publique par conception (elle est livrée dans le bundle) :
   la protection réelle vient du code de foyer et des règles RLS côté Supabase.
   Les variables d'environnement Vercel, si présentes, prennent le dessus. */
const RAW_URL = (import.meta.env && import.meta.env.VITE_SUPABASE_URL) || 'https://wvrdumjqjwdevpcbqamf.supabase.co';
const ANON_KEY = (import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2cmR1bWpxandkZXZwY2JxYW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxNjU0NTYsImV4cCI6MjEwMDc0MTQ1Nn0.1F4eDcE5v57uqPH6KYhb-P1lJx3p5VbJ21vPp01svso';

/* Tolère aussi bien l'URL de base que l'URL REST complète (.../rest/v1/). */
const SUPABASE_URL = RAW_URL.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');

export const supa = (SUPABASE_URL && ANON_KEY)
  ? createClient(SUPABASE_URL, ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
      realtime: { params: { eventsPerSecond: 5 } },
    })
  : null;

export const CN_FOYER_KEY = 'cheznous_foyer_v1';
export const SYNC_KEYS = ['week', 'pending', 'favs', 'batch', 'courses', 'purchases', 'cart', 'myrecipes'];

/* Alphabet sans caractères ambigus (ni I, O, 0, 1) — code lisible à voix haute. */
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export function cnGenerateCode() {
  const pick = () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  const block = () => Array.from({ length: 4 }, pick).join('');
  return `${block()}-${block()}`;
}
export function cnNormalizeCode(input) {
  const clean = (input || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  return clean.length > 4 ? `${clean.slice(0, 4)}-${clean.slice(4, 8)}` : clean;
}

/* Traduit les erreurs techniques en messages compréhensibles. */
export function cnHumanError(err) {
  const raw = typeof err === 'string' ? err : (err && err.message) || '';
  const m = raw.toLowerCase();
  const code = err && err.code;
  if (m.includes('failed to fetch') || m.includes('networkerror') || m.includes('load failed') || m.includes('timeout')) {
    return "Réseau injoignable. Vérifiez votre connexion — l'app continue de fonctionner sur cet appareil.";
  }
  if (m.includes('does not exist') || code === '42P01' || m.includes('schema cache')) {
    return "Projet accessible, mais la table « foyer_state » est absente : lancez le script SQL dans Supabase.";
  }
  if (m.includes('jwt') || m.includes('api key') || m.includes('apikey') || code === '401' || code === 'PGRST301') {
    return 'Clé Supabase refusée — vérifiez la clé « anon public ».';
  }
  if (m.includes('row-level security') || m.includes('violates') || code === '42501') {
    return "Écriture refusée par la sécurité Supabase — vérifiez que le script SQL a bien été exécuté en entier.";
  }
  return raw ? `Erreur : ${raw}` : 'Erreur inconnue.';
}

/* Diagnostic lisible — utilisé par le bouton « Tester la connexion ». */
export async function cnTestConnection() {
  if (!supa) return { ok: false, message: "Synchronisation non configurée dans l'app." };
  try {
    const { error } = await supa.from('foyer_state').select('code').limit(1);
    if (!error) return { ok: true, message: 'Connexion établie — tout est prêt.' };
    return { ok: false, message: cnHumanError(error) };
  } catch (e) {
    return { ok: false, message: cnHumanError(e) };
  }
}

/* ── Moteur de synchronisation ──
   Une ligne par (code de foyer, clé). N'écrire qu'une clé à la fois évite
   que la liste de courses écrase le planning. Temps réel + sondage de secours :
   si le WebSocket échoue, la synchro continue de fonctionner. */
export function useFoyerSync({ onRemote, getLocal }) {
  const [code, setCode] = React.useState(() => {
    try { return localStorage.getItem(CN_FOYER_KEY) || ''; } catch (e) { return ''; }
  });
  const [status, setStatus] = React.useState('off'); // off | connecting | live | error
  const [lastSync, setLastSync] = React.useState(null);
  const echoRef = React.useRef({});      // valeurs poussées par nous → ignorer l'écho
  const onRemoteRef = React.useRef(onRemote);
  onRemoteRef.current = onRemote;

  const applyRow = React.useCallback((key, value) => {
    if (!SYNC_KEYS.includes(key)) return;
    const serialized = JSON.stringify(value);
    if (echoRef.current[key] === serialized) return;   // c'est notre propre écriture
    onRemoteRef.current(key, value);
  }, []);

  const pull = React.useCallback(async (theCode) => {
    if (!supa || !theCode) return;
    try {
      const { data, error } = await supa.from('foyer_state').select('key,value').eq('code', theCode);
      if (error) { setStatus('error'); return; }
      (data || []).forEach(row => applyRow(row.key, row.value));
      setStatus('live');
      setLastSync(Date.now());
    } catch (e) { setStatus('error'); }
  }, [applyRow]);

  /* Abonnement temps réel + sondages de secours. */
  React.useEffect(() => {
    if (!supa || !code) { setStatus('off'); return; }
    setStatus('connecting');
    let cancelled = false;
    pull(code);

    const channel = supa
      .channel(`foyer:${code}`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'foyer_state', filter: `code=eq.${code}` },
        (payload) => {
          const row = payload.new;
          if (row && row.key) { applyRow(row.key, row.value); setLastSync(Date.now()); }
        })
      .subscribe((s) => { if (!cancelled && s === 'SUBSCRIBED') setStatus('live'); });

    /* Filet de sécurité : si le temps réel ne passe pas (réseau, config),
       on rattrape au retour sur l'app et toutes les 25 s en avant-plan. */
    const onVisible = () => { if (document.visibilityState === 'visible') pull(code); };
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('online', onVisible);
    const iv = setInterval(() => { if (document.visibilityState === 'visible') pull(code); }, 25000);

    return () => {
      cancelled = true;
      clearInterval(iv);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('online', onVisible);
      supa.removeChannel(channel);
    };
  }, [code, pull, applyRow]);

  /* Pousse une clé. Silencieux si aucun foyer n'est configuré : l'app
     reste parfaitement utilisable en local. */
  const push = React.useCallback(async (key, value) => {
    if (!supa || !code || !SYNC_KEYS.includes(key)) return;
    echoRef.current[key] = JSON.stringify(value);
    try {
      const { error } = await supa.from('foyer_state')
        .upsert({ code, key, value, updated_at: new Date().toISOString() }, { onConflict: 'code,key' });
      if (error) setStatus('error');
      else { setStatus('live'); setLastSync(Date.now()); }
    } catch (e) { setStatus('error'); }
  }, [code]);

  /* Crée un foyer : le contenu local devient la référence partagée. */
  const createFoyer = React.useCallback(async () => {
    const newCode = cnGenerateCode();
    if (!supa) return { ok: false, message: 'Synchronisation non configurée.' };
    try {
      const local = getLocal();
      const rows = SYNC_KEYS.map(k => ({ code: newCode, key: k, value: local[k], updated_at: new Date().toISOString() }));
      rows.forEach(r => { echoRef.current[r.key] = JSON.stringify(r.value); });
      const { error } = await supa.from('foyer_state').upsert(rows, { onConflict: 'code,key' });
      if (error) return { ok: false, message: cnHumanError(error) };
      localStorage.setItem(CN_FOYER_KEY, newCode);
      setCode(newCode);
      return { ok: true, code: newCode };
    } catch (e) { return { ok: false, message: cnHumanError(e) }; }
  }, [getLocal]);

  /* Rejoint un foyer : le contenu distant remplace le contenu local. */
  const joinFoyer = React.useCallback(async (rawCode) => {
    const theCode = cnNormalizeCode(rawCode);
    if (theCode.length < 8) return { ok: false, message: 'Code incomplet (8 caractères attendus).' };
    if (!supa) return { ok: false, message: 'Synchronisation non configurée.' };
    try {
      const { data, error } = await supa.from('foyer_state').select('key,value').eq('code', theCode);
      if (error) return { ok: false, message: cnHumanError(error) };
      if (!data || !data.length) return { ok: false, message: 'Aucun foyer trouvé avec ce code.' };
      echoRef.current = {};
      data.forEach(row => onRemoteRef.current(row.key, row.value));
      localStorage.setItem(CN_FOYER_KEY, theCode);
      setCode(theCode);
      return { ok: true, code: theCode };
    } catch (e) { return { ok: false, message: cnHumanError(e) }; }
  }, []);

  const leaveFoyer = React.useCallback(() => {
    localStorage.removeItem(CN_FOYER_KEY);
    setCode('');
    setStatus('off');
  }, []);

  return { code, status, lastSync, push, createFoyer, joinFoyer, leaveFoyer, refresh: () => pull(code) };
}
