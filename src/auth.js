import React from 'react';
import {
  supa, cnHumanError,
  cnLireCookie, cnEcrireCookie, cnEffacerCookie, CN_COOKIE_JETON,
  cnDemanderPersistance, cnReleverOuverture,
} from './supabase.js';

/* ── Comptes ──
   Chacun son adresse et son mot de passe ; le partage se fait ensuite au
   niveau du foyer. L'app reste entièrement utilisable sans compte : se
   connecter n'ouvre que la synchronisation entre téléphones. */

const MIN_MDP = 8;

export function cnCheckEmail(email) {
  const v = (email || '').trim();
  if (!v) return 'Indiquez votre adresse électronique.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Cette adresse ne semble pas valide.';
  return null;
}

export function cnCheckPassword(mdp) {
  if (!mdp) return 'Choisissez un mot de passe.';
  if (mdp.length < MIN_MDP) return `Mot de passe trop court : ${MIN_MDP} caractères au minimum.`;
  return null;
}

/* Un jeton rejeté par le serveur ne sert plus à rien et doit partir. Un
   jeton qui n'a pas pu être présenté — réseau coupé, serveur injoignable —
   est au contraire la seule chose qui permettra de revenir : l'effacer
   ferait exactement le dégât qu'on cherche à éviter. */
export function jetonRefuse(error) {
  if (!error) return false;
  const nom = error.name || '';
  if (nom === 'AuthRetryableFetchError') return false;
  const m = (error.message || '').toLowerCase();
  if (m.includes('failed to fetch') || m.includes('networkerror') || m.includes('load failed') || m.includes('timeout')) return false;
  const s = error.status;
  if (typeof s === 'number') return s >= 400 && s < 500;
  return m.includes('refresh token') || m.includes('invalid') || m.includes('expired');
}

async function reprendreDuCookie(apresEffacement, vivant, setReprise) {
  const jeton = cnLireCookie(CN_COOKIE_JETON);
  if (!jeton) return null;
  try {
    const { data, error } = await supa.auth.refreshSession({ refresh_token: jeton });
    if (!error && data && data.session) {
      if (vivant && apresEffacement) setReprise(true);
      return data.session;
    }
    if (jetonRefuse(error)) cnEffacerCookie(CN_COOKIE_JETON);
    return null;
  } catch (e) {
    if (jetonRefuse(e)) cnEffacerCookie(CN_COOKIE_JETON);
    return null;
  }
}

export function useAuth() {
  const [session, setSession] = React.useState(null);
  /* Tant que Supabase n'a pas relu la session stockée, on n'affiche ni
     « connecté » ni « déconnecté » : sinon l'écran clignote au lancement. */
  const [ready, setReady] = React.useState(!supa);
  /* Vrai quand la session a été rétablie depuis le cookie après un
     effacement du stockage — l'écran le signale plutôt que de laisser
     croire à une déconnexion. */
  const [reprise, setReprise] = React.useState(false);

  React.useEffect(() => {
    if (!supa) return;
    let vivant = true;

    /* Deux gestes au lancement : réclamer le stockage persistant, et noter
       si le stockage local avait disparu depuis la dernière ouverture. */
    cnDemanderPersistance();
    const releve = cnReleverOuverture();

    (async () => {
      try {
        const { data } = await supa.auth.getSession();
        let s = data ? data.session : null;

        /* Rien en localStorage, mais un jeton dans le cookie : le stockage
           du site a été vidé (place manquante, nettoyage du navigateur).
           On rouvre la session sans rien demander. */
        if (!s) s = await reprendreDuCookie(releve.efface, vivant, setReprise);
        if (vivant) { setSession(s); setReady(true); }
      } catch (e) {
        if (vivant) setReady(true);
      }
    })();

    const { data: sub } = supa.auth.onAuthStateChange((evt, s) => {
      if (!vivant) return;
      setSession(s);
      setReady(true);
      /* Le jeton de rafraîchissement est recopié dans le cookie à chaque
         renouvellement : c'est lui qui permettra la reprise. */
      if (s && s.refresh_token) cnEcrireCookie(CN_COOKIE_JETON, s.refresh_token);
      else if (evt === 'SIGNED_OUT') cnEffacerCookie(CN_COOKIE_JETON);
    });

    return () => { vivant = false; if (sub && sub.subscription) sub.subscription.unsubscribe(); };
  }, []);

  /* Si la reprise a échoué faute de réseau, on retente au retour de la
     connexion ou de l'app — sans jamais rien demander à l'utilisateur. */
  React.useEffect(() => {
    if (!supa || session) return;
    if (!cnLireCookie(CN_COOKIE_JETON)) return;
    let vivant = true;
    const reessayer = async () => {
      if (document.visibilityState !== 'visible') return;
      const s = await reprendreDuCookie(false, vivant, setReprise);
      if (vivant && s) setSession(s);
    };
    window.addEventListener('online', reessayer);
    document.addEventListener('visibilitychange', reessayer);
    return () => {
      vivant = false;
      window.removeEventListener('online', reessayer);
      document.removeEventListener('visibilitychange', reessayer);
    };
  }, [session]);

  const signUp = React.useCallback(async (email, mdp, prenom) => {
    if (!supa) return { ok: false, message: 'Synchronisation non configurée.' };
    const faute = cnCheckEmail(email) || cnCheckPassword(mdp);
    if (faute) return { ok: false, message: faute };
    try {
      const { data, error } = await supa.auth.signUp({
        email: email.trim().toLowerCase(),
        password: mdp,
        options: { data: { prenom: (prenom || '').trim() } },
      });
      if (error) return { ok: false, message: cnHumanError(error) };
      /* Sans session en retour, Supabase attend une confirmation par courriel. */
      if (!data.session) return { ok: true, confirmation: true };
      return { ok: true, confirmation: false };
    } catch (e) { return { ok: false, message: cnHumanError(e) }; }
  }, []);

  const signIn = React.useCallback(async (email, mdp) => {
    if (!supa) return { ok: false, message: 'Synchronisation non configurée.' };
    const faute = cnCheckEmail(email);
    if (faute) return { ok: false, message: faute };
    if (!mdp) return { ok: false, message: 'Saisissez votre mot de passe.' };
    try {
      const { error } = await supa.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: mdp,
      });
      if (error) return { ok: false, message: cnHumanError(error) };
      return { ok: true };
    } catch (e) { return { ok: false, message: cnHumanError(e) }; }
  }, []);

  const signOut = React.useCallback(async () => {
    cnEffacerCookie(CN_COOKIE_JETON);
    if (!supa) return { ok: true };
    try {
      await supa.auth.signOut();
      return { ok: true };
    } catch (e) { return { ok: false, message: cnHumanError(e) }; }
  }, []);

  const resetPassword = React.useCallback(async (email) => {
    if (!supa) return { ok: false, message: 'Synchronisation non configurée.' };
    const faute = cnCheckEmail(email);
    if (faute) return { ok: false, message: faute };
    try {
      const { error } = await supa.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: window.location.origin,
      });
      if (error) return { ok: false, message: cnHumanError(error) };
      return { ok: true };
    } catch (e) { return { ok: false, message: cnHumanError(e) }; }
  }, []);

  const user = session ? session.user : null;
  const prenom = user ? ((user.user_metadata && user.user_metadata.prenom) || '') : '';

  return { session, user, prenom, ready, reprise, signUp, signIn, signOut, resetPassword };
}
