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

/* ── Identifiant d'appareil ──
   Stable pour ce téléphone, indépendant du compte. Il accompagne chaque
   écriture pour que le téléphone reconnaisse son propre écho en temps réel
   sans avoir à comparer les valeurs. */
const CN_DEVICE_KEY = 'cheznous_appareil_v1';
export const CN_DEVICE = (() => {
  try {
    let d = localStorage.getItem(CN_DEVICE_KEY);
    if (!d) {
      d = (crypto && crypto.randomUUID) ? crypto.randomUUID()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(CN_DEVICE_KEY, d);
    }
    return d;
  } catch (e) {
    return `volatile-${Math.random().toString(36).slice(2, 10)}`;
  }
})();

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
