import React from 'react';
import { supa, cnHumanError } from './supabase.js';

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

export function useAuth() {
  const [session, setSession] = React.useState(null);
  /* Tant que Supabase n'a pas relu la session stockée, on n'affiche ni
     « connecté » ni « déconnecté » : sinon l'écran clignote au lancement. */
  const [ready, setReady] = React.useState(!supa);

  React.useEffect(() => {
    if (!supa) return;
    let vivant = true;

    supa.auth.getSession()
      .then(({ data }) => { if (vivant) { setSession(data ? data.session : null); setReady(true); } })
      .catch(() => { if (vivant) setReady(true); });

    const { data: sub } = supa.auth.onAuthStateChange((_evt, s) => {
      if (vivant) { setSession(s); setReady(true); }
    });

    return () => { vivant = false; if (sub && sub.subscription) sub.subscription.unsubscribe(); };
  }, []);

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

  return { session, user, prenom, ready, signUp, signIn, signOut, resetPassword };
}
