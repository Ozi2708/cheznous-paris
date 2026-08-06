import { createClient } from '@supabase/supabase-js';

/* ── Le client Supabase, partagé par l'authentification et la synchro ──
   La clé « anon » est publique par conception : elle est livrée dans le
   bundle et n'ouvre aucune porte à elle seule. Ce qui protège les données,
   ce sont les règles d'accès côté Postgres, qui exigent d'être connecté et
   membre du foyer concerné. */
const RAW_URL = (import.meta.env && import.meta.env.VITE_SUPABASE_URL) || 'https://wvrdumjqjwdevpcbqamf.supabase.co';
const ANON_KEY = (import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2cmR1bWpxandkZXZwY2JxYW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxNjU0NTYsImV4cCI6MjEwMDc0MTQ1Nn0.1F4eDcE5v57uqPH6KYhb-P1lJx3p5VbJ21vPp01svso';

/* Tolère aussi bien l'URL de base que l'URL REST complète (.../rest/v1/). */
const SUPABASE_URL = RAW_URL.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');

export const supa = (SUPABASE_URL && ANON_KEY)
  ? createClient(SUPABASE_URL, ANON_KEY, {
      /* La session doit survivre à la fermeture de l'app : sur un téléphone
         en écran d'accueil, on ne se reconnecte pas chaque matin. */
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'cheznous_auth_v1',
      },
      realtime: { params: { eventsPerSecond: 5 } },
    })
  : null;

/* ── Cookies ──
   Un cookie ne vit pas au même endroit que localStorage. Quand un téléphone
   manque de place, le navigateur vide le stockage des sites (localStorage,
   IndexedDB, caches) sans toucher aux cookies. C'est ce qui en fait le bon
   filet pour la seule chose qu'on ne veut pas reperdre : de quoi rouvrir la
   session. */
export function cnLireCookie(nom) {
  try {
    const m = document.cookie.match(new RegExp(`(?:^|; )${nom}=([^;]*)`));
    return m ? decodeURIComponent(m[1]) : '';
  } catch (e) { return ''; }
}
export function cnEcrireCookie(nom, valeur, jours = 365) {
  try {
    const sur = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${nom}=${encodeURIComponent(valeur)}; Max-Age=${jours * 86400}; Path=/; SameSite=Lax${sur}`;
  } catch (e) { /* cookies refusés */ }
}
export function cnEffacerCookie(nom) {
  try { document.cookie = `${nom}=; Max-Age=0; Path=/`; } catch (e) { /* rien */ }
}

export const CN_COOKIE_JETON = 'cn_reprise';   // jeton de rafraîchissement
export const CN_COOKIE_VIE = 'cn_vie';         // témoin de vie, pour le diagnostic

/* ── Identifiant d'appareil ──
   Stable pour ce téléphone, indépendant du compte. Il accompagne chaque
   écriture pour que le téléphone reconnaisse son propre écho en temps réel
   sans avoir à comparer les valeurs.

   Il sert aussi de témoin : s'il a fallu le recréer alors que le cookie de
   vie est toujours là, c'est que le stockage du site a été vidé entre deux
   ouvertures. C'est la seule façon de constater l'effacement depuis
   l'intérieur de l'app. */
const CN_DEVICE_KEY = 'cheznous_appareil_v1';
export let CN_DEVICE_NEUF = false;
export const CN_DEVICE = (() => {
  try {
    let d = localStorage.getItem(CN_DEVICE_KEY);
    if (!d) {
      CN_DEVICE_NEUF = true;
      d = (crypto && crypto.randomUUID) ? crypto.randomUUID()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(CN_DEVICE_KEY, d);
    }
    return d;
  } catch (e) {
    CN_DEVICE_NEUF = true;
    return `volatile-${Math.random().toString(36).slice(2, 10)}`;
  }
})();

/* ── Stockage persistant ──
   Sans cette permission, les données du site sont « au mieux » : le
   navigateur peut les jeter dès que le téléphone manque de place, sans
   prévenir. Accordée d'office quand l'app est installée sur l'écran
   d'accueil ; refusée poliment ailleurs, l'appel ne coûte rien. */
export async function cnDemanderPersistance() {
  try {
    if (!navigator.storage || !navigator.storage.persist) return null;
    if (navigator.storage.persisted && await navigator.storage.persisted()) return true;
    return await navigator.storage.persist();
  } catch (e) { return null; }
}

/* ── Relevé de l'appareil ──
   De quoi trancher entre les causes possibles d'un effacement, sur le
   téléphone concerné, sans avoir à deviner. */
export async function cnDiagnosticStockage() {
  const d = {
    origine: '', installee: false, persistant: null,
    quotaMo: null, utiliseMo: null, stockageOk: true,
    effacements: 0, ouvertures: 0, depuis: '',
  };
  try { d.origine = location.origin; } catch (e) { /* rien */ }
  try {
    d.installee = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches)
      || window.navigator.standalone === true;
  } catch (e) { /* rien */ }
  try {
    const t = `cn_test_${Date.now()}`;
    localStorage.setItem(t, '1'); localStorage.removeItem(t);
  } catch (e) { d.stockageOk = false; }
  try {
    if (navigator.storage && navigator.storage.persisted) d.persistant = await navigator.storage.persisted();
  } catch (e) { /* rien */ }
  try {
    if (navigator.storage && navigator.storage.estimate) {
      const e = await navigator.storage.estimate();
      if (e.quota) d.quotaMo = Math.round(e.quota / 1048576);
      if (e.usage) d.utiliseMo = Math.round(e.usage / 1048576 * 10) / 10;
    }
  } catch (e) { /* rien */ }
  try {
    const v = JSON.parse(cnLireCookie(CN_COOKIE_VIE) || '{}');
    d.effacements = v.effacements || 0;
    d.ouvertures = v.ouvertures || 0;
    d.depuis = v.depuis || '';
  } catch (e) { /* rien */ }
  return d;
}

/* Tenu à chaque lancement : compte les ouvertures, et les fois où le
   stockage local avait disparu alors que le cookie, lui, était resté. */
export function cnReleverOuverture() {
  let v = {};
  try { v = JSON.parse(cnLireCookie(CN_COOKIE_VIE) || '{}'); } catch (e) { v = {}; }
  const connu = !!v.depuis;
  const efface = CN_DEVICE_NEUF && connu;
  const suite = {
    depuis: v.depuis || new Date().toISOString().slice(0, 10),
    ouvertures: (v.ouvertures || 0) + 1,
    effacements: (v.effacements || 0) + (efface ? 1 : 0),
    dernier: efface ? new Date().toISOString().slice(0, 10) : (v.dernier || ''),
  };
  cnEcrireCookie(CN_COOKIE_VIE, JSON.stringify(suite));
  return { efface, ...suite };
}

/* Traduit les erreurs techniques en messages compréhensibles. */
export function cnHumanError(err) {
  const raw = typeof err === 'string' ? err : (err && err.message) || '';
  const m = raw.toLowerCase();
  const code = err && err.code;

  if (m.includes('failed to fetch') || m.includes('networkerror') || m.includes('load failed') || m.includes('timeout')) {
    return "Réseau injoignable. L'app continue de fonctionner : vos modifications partiront à la reconnexion.";
  }
  if (m.includes('invalid login credentials')) return 'Adresse ou mot de passe incorrect.';
  if (m.includes('email not confirmed')) return "Compte pas encore confirmé : ouvrez le lien reçu par courriel.";
  if (m.includes('user already registered') || m.includes('already been registered')) {
    return 'Un compte existe déjà avec cette adresse — connectez-vous plutôt.';
  }
  if (m.includes('password should be at least')) return 'Mot de passe trop court : 8 caractères au minimum.';
  if (m.includes('unable to validate email') || m.includes('invalid email')) return 'Adresse électronique invalide.';
  if (m.includes('email rate limit') || m.includes('rate limit') || code === 'over_email_send_rate_limit') {
    return 'Trop de tentatives — patientez quelques minutes.';
  }
  if (m.includes('signups not allowed') || m.includes('signup is disabled')) {
    return "Les inscriptions sont désactivées dans Supabase : activez le fournisseur « Email ».";
  }
  if (m.includes('does not exist') || code === '42P01' || m.includes('schema cache') || code === 'PGRST202') {
    return "Base accessible, mais le script « comptes.sql » n'a pas encore été exécuté dans Supabase.";
  }
  if (m.includes('jwt') || m.includes('api key') || m.includes('apikey') || code === 'PGRST301') {
    return 'Session expirée — reconnectez-vous.';
  }
  if (m.includes('row-level security') || m.includes('violates row') || code === '42501') {
    return "Écriture refusée : votre compte n'appartient pas à ce foyer.";
  }
  return raw ? `Erreur : ${raw}` : 'Erreur inconnue.';
}
