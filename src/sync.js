import React from 'react';
import { supa, CN_DEVICE, cnHumanError } from './supabase.js';

export { supa, cnHumanError };

export const SYNC_KEYS = ['week', 'pending', 'favs', 'batch', 'courses', 'purchases', 'cart', 'myrecipes'];

/* Clé héritée du partage par code, conservée pour prévenir l'utilisateur
   que son ancien foyer n'est plus actif. */
export const CN_FOYER_KEY = 'cheznous_foyer_v1';
/* Noms des clés en attente d'envoi, pour survivre à une fermeture de l'app. */
const CN_QUEUE_KEY = 'cheznous_attente_v1';

export function cnNormalizeCode(input) {
  const clean = (input || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  return clean.length > 4 ? `${clean.slice(0, 4)}-${clean.slice(4, 8)}` : clean;
}
/* Le code circule sans tiret côté base ; il ne s'affiche joliment qu'à l'écran. */
const brut = (code) => (code || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase();

/* ── Horodatages ──
   Le même instant n'arrive pas sous la même forme selon la route : l'API
   REST rend « 2026-08-06T18:53:12.12+00:00 », le temps réel lit le journal
   de Postgres et rend « 2026-08-06 18:53:12.12+00 ». Comparés comme du
   texte, ces deux-là ne s'ordonnent pas. On les ramène donc en
   millisecondes avant toute comparaison. */
export function cnInstant(v) {
  if (!v) return 0;
  if (typeof v === 'number') return v;
  const t = Date.parse(String(v).replace(' ', 'T').replace(/([+-]\d{2})$/, '$1:00'));
  return Number.isFinite(t) ? t : 0;
}

/* ── La règle de décision ──
   Isolée du composant pour être vérifiable telle qu'elle est livrée : c'est
   ici que se jouaient les régressions où une modification disparaissait.
   Rend 'ignore', 'echo' (notre écriture, on retient l'horodatage) ou
   'appliquer'. */
export function cnDecideApply(row, { device, enFile, vu }) {
  if (!row || !SYNC_KEYS.includes(row.cle)) return 'ignore';
  const quand = cnInstant(row.updated_at);
  const dejaVu = vu || 0;
  if (row.appareil === device) return 'echo';
  if (enFile) return 'ignore';
  if (quand && dejaVu && quand <= dejaVu) return 'ignore';
  return 'appliquer';
}

export async function cnTestConnection() {
  if (!supa) return { ok: false, message: "Synchronisation non configurée dans l'app." };
  try {
    const { data: sess } = await supa.auth.getSession();
    if (!sess || !sess.session) return { ok: false, message: 'Connectez-vous pour synchroniser.' };
    const { error } = await supa.rpc('cn_mon_foyer');
    if (error) return { ok: false, message: cnHumanError(error) };
    return { ok: true, message: 'Connexion établie — tout est prêt.' };
  } catch (e) {
    return { ok: false, message: cnHumanError(e) };
  }
}

const lireAttente = () => {
  try {
    const v = JSON.parse(localStorage.getItem(CN_QUEUE_KEY));
    return Array.isArray(v) ? v.filter(k => SYNC_KEYS.includes(k)) : [];
  } catch (e) { return []; }
};
const ecrireAttente = (cles) => {
  try { localStorage.setItem(CN_QUEUE_KEY, JSON.stringify(cles)); } catch (e) { /* quota */ }
};

/* ── Moteur de synchronisation ──
   Une ligne par (foyer, clé) : n'écrire qu'une clé à la fois évite que la
   liste de courses écrase le planning.

   Quatre garde-fous, chacun contre une panne observée :

   1. L'écho est reconnu par l'identifiant d'appareil, pas par la valeur.
      Comparer les valeurs ne tenait que pour une écriture à la fois : deux
      coches rapprochées et l'écho de la première, ne correspondant plus à
      la dernière valeur mémorisée, était pris pour une modification
      extérieure — la liste revenait toute seule en arrière.

   2. L'horodatage vient du serveur et rien d'antérieur n'est appliqué. Un
      sondage de rattrapage ne peut donc plus réinstaller une version
      périmée par-dessus une modification récente.

   3. Une clé en attente d'envoi n'est jamais écrasée par le distant : ce
      qu'on vient de faire sur ce téléphone a la priorité jusqu'à ce qu'il
      soit parti.

   4. Une écriture qui échoue reste en file et repart. Avant, elle était
      perdue en silence, puis le sondage suivant écrivait par-dessus la
      version du serveur : la modification disparaissait pour de bon. */
export function useFoyerSync({ session, onRemote, getLocal }) {
  const [foyer, setFoyer] = React.useState(null);      // { id, code, nom, membres }
  const [status, setStatus] = React.useState('off');   // off | connecting | live | error
  const [lastSync, setLastSync] = React.useState(null);
  const [enAttente, setEnAttente] = React.useState(() => lireAttente().length);

  const queueRef = React.useRef({});   // clé → valeur pas encore acceptée par le serveur
  const seenRef = React.useRef({});    // clé → horodatage serveur déjà pris en compte
  const foyerRef = React.useRef(null);
  const busyRef = React.useRef(false);
  const timerRef = React.useRef(null);
  const backoffRef = React.useRef(0);

  const onRemoteRef = React.useRef(onRemote); onRemoteRef.current = onRemote;
  const getLocalRef = React.useRef(getLocal); getLocalRef.current = getLocal;

  const userId = session && session.user ? session.user.id : null;

  const majAttente = React.useCallback(() => {
    const cles = Object.keys(queueRef.current);
    ecrireAttente(cles);
    setEnAttente(cles.length);
  }, []);

  /* ── Réception ── */
  const applyRow = React.useCallback((row) => {
    if (!row || !SYNC_KEYS.includes(row.cle)) return;
    const quand = cnInstant(row.updated_at);
    const vu = seenRef.current[row.cle] || 0;
    const verdict = cnDecideApply(row, {
      device: CN_DEVICE,
      enFile: Object.prototype.hasOwnProperty.call(queueRef.current, row.cle),
      vu,
    });
    if (verdict === 'ignore') return;
    if (verdict === 'echo') { if (quand > vu) seenRef.current[row.cle] = quand; return; }
    seenRef.current[row.cle] = quand;
    onRemoteRef.current(row.cle, row.valeur);
  }, []);

  const pull = React.useCallback(async (foyerId) => {
    if (!supa || !foyerId) return;
    try {
      const { data, error } = await supa.from('foyer_data')
        .select('cle,valeur,updated_at,appareil').eq('foyer_id', foyerId);
      if (error) { setStatus('error'); return; }
      (data || []).forEach(applyRow);
      setStatus(Object.keys(queueRef.current).length ? 'connecting' : 'live');
      setLastSync(Date.now());
    } catch (e) { setStatus('error'); }
  }, [applyRow]);

  /* ── Envoi ──
     La file se vide clé par clé. Une clé réécrite pendant son envoi reste
     en file : c'est la version la plus récente qui repartira. */
  const flush = React.useCallback(async () => {
    const f = foyerRef.current;
    if (!supa || !f || busyRef.current) return;
    const cles = Object.keys(queueRef.current);
    if (!cles.length) { backoffRef.current = 0; return; }

    busyRef.current = true;
    let echec = null;

    for (const cle of cles) {
      const valeur = queueRef.current[cle];
      const empreinte = JSON.stringify(valeur);
      try {
        const { data, error } = await supa.from('foyer_data')
          .upsert({
            foyer_id: f.id, cle, valeur,
            maj_par: userId, appareil: CN_DEVICE,
          }, { onConflict: 'foyer_id,cle' })
          .select('updated_at')
          .single();
        if (error) { echec = error; break; }
        /* Réécrite entre-temps ? on la laisse en file pour le tour suivant. */
        if (JSON.stringify(queueRef.current[cle]) === empreinte) delete queueRef.current[cle];
        if (data && data.updated_at) seenRef.current[cle] = cnInstant(data.updated_at);
      } catch (e) { echec = e; break; }
    }

    busyRef.current = false;
    majAttente();

    if (echec) {
      setStatus('error');
      /* Reprise espacée : 2 s, 4 s, 8 s… plafonnée à 30 s. */
      backoffRef.current = Math.min((backoffRef.current || 1) * 2, 30);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => flush(), backoffRef.current * 1000);
    } else {
      backoffRef.current = 0;
      setStatus('live');
      setLastSync(Date.now());
    }
  }, [userId, majAttente]);

  const flushRef = React.useRef(flush); flushRef.current = flush;

  const push = React.useCallback((cle, valeur) => {
    if (!SYNC_KEYS.includes(cle)) return;
    /* Sans compte, l'app est purement locale : rien à mettre en file.
       Connecté mais foyer pas encore chargé, on garde quand même : une
       modification faite dans la seconde qui suit le lancement partira dès
       que le foyer sera là, au lieu d'être perdue. */
    if (!userId) return;
    queueRef.current[cle] = valeur;
    majAttente();
    setStatus('connecting');
    clearTimeout(timerRef.current);
    /* Court délai : plusieurs coches d'affilée ne font qu'un seul envoi. */
    timerRef.current = setTimeout(() => flushRef.current(), 250);
  }, [majAttente, userId]);

  /* ── Chargement du foyer ── */
  const chargerFoyer = React.useCallback(async () => {
    if (!supa || !userId) { foyerRef.current = null; setFoyer(null); setStatus('off'); return null; }
    setStatus('connecting');
    try {
      const { data, error } = await supa.rpc('cn_mon_foyer');
      if (error) { setStatus('error'); return null; }
      const ligne = Array.isArray(data) ? data[0] : data;
      if (!ligne || !ligne.foyer_id) { foyerRef.current = null; setFoyer(null); setStatus('off'); return null; }
      /* Une réponse sans « mon_role » vient d'une version antérieure du
         script SQL. Sans ce garde-fou, l'app repliait silencieusement sur
         « membre » et cachait les commandes du fondateur : le symptôme ne
         désignait pas sa cause, et aucune correction dans la base n'y
         changeait rien. On le dit maintenant. */
      const ancien = ligne.mon_role === undefined;
      const f = {
        id: ligne.foyer_id, code: ligne.code, nom: ligne.nom,
        schemaAncien: ancien,
        monRole: ligne.mon_role || 'membre',
        membres: ligne.membres || [],
        invitations: ligne.invitations || [],
        invitationRecue: ligne.invitation_recue || null,
      };
      foyerRef.current = f;
      setFoyer(f);
      return f;
    } catch (e) { setStatus('error'); return null; }
  }, [userId]);

  /* Au lancement, les clés restées en attente repartent avec la valeur
     locale — celle qui n'avait pas pu être envoyée. */
  React.useEffect(() => {
    const restantes = lireAttente();
    if (!restantes.length) return;
    const local = getLocalRef.current();
    restantes.forEach(k => { if (local && local[k] !== undefined) queueRef.current[k] = local[k]; });
    setEnAttente(Object.keys(queueRef.current).length);
  }, []);

  /* Session : on charge le foyer, on oublie ce qu'on croyait avoir vu. */
  React.useEffect(() => {
    seenRef.current = {};
    if (!userId) { foyerRef.current = null; setFoyer(null); setStatus('off'); return; }
    let vivant = true;
    chargerFoyer().then(f => { if (vivant && f) { pull(f.id); flushRef.current(); } });
    return () => { vivant = false; };
  }, [userId, chargerFoyer, pull]);

  /* Temps réel, avec rattrapage : si le WebSocket ne passe pas (réseau
     d'entreprise, veille prolongée), le sondage prend le relais. */
  React.useEffect(() => {
    const f = foyer;
    if (!supa || !f) return;
    let vivant = true;

    /* Les règles d'accès s'appliquent aussi au flux temps réel : sans jeton,
       le serveur n'envoie rien et la synchro semblerait muette. */
    try {
      const jeton = session && session.access_token;
      if (jeton && supa.realtime && supa.realtime.setAuth) supa.realtime.setAuth(jeton);
    } catch (e) { /* la version du client s'en charge peut-être seule */ }

    const canal = supa
      .channel(`foyer:${f.id}`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'foyer_data', filter: `foyer_id=eq.${f.id}` },
        (payload) => {
          if (!payload.new) return;
          applyRow(payload.new);
          setLastSync(Date.now());
        })
      .subscribe((s) => {
        if (vivant && s === 'SUBSCRIBED' && !Object.keys(queueRef.current).length) setStatus('live');
      });

    const reprise = () => {
      if (document.visibilityState !== 'visible') return;
      flushRef.current();
      pull(f.id);
    };
    document.addEventListener('visibilitychange', reprise);
    window.addEventListener('online', reprise);
    const iv = setInterval(reprise, 25000);

    return () => {
      vivant = false;
      clearInterval(iv);
      document.removeEventListener('visibilitychange', reprise);
      window.removeEventListener('online', reprise);
      supa.removeChannel(canal);
    };
  }, [foyer, applyRow, pull, session]);

  React.useEffect(() => () => clearTimeout(timerRef.current), []);

  /* ── Remplacer le contenu local par celui d'un foyer ──
     Gestes communs à « rejoindre » et « accepter une invitation » : ce qui
     restait en attente d'envoi n'a plus lieu d'être, et tout ce que le
     foyer contient prend la place de ce qu'il y avait ici. */
  const adopterFoyer = React.useCallback(async (id) => {
    queueRef.current = {};
    seenRef.current = {};
    majAttente();
    const { data, error } = await supa.from('foyer_data')
      .select('cle,valeur,updated_at,appareil').eq('foyer_id', id);
    if (error) return cnHumanError(error);
    (data || []).forEach(r => {
      if (!SYNC_KEYS.includes(r.cle)) return;
      seenRef.current[r.cle] = cnInstant(r.updated_at);
      onRemoteRef.current(r.cle, r.valeur);
    });
    setStatus('live');
    setLastSync(Date.now());
    return null;
  }, [majAttente]);

  /* ── Créer un foyer : le contenu de ce téléphone devient la référence. ── */
  const createFoyer = React.useCallback(async (nom) => {
    if (!supa) return { ok: false, message: 'Synchronisation non configurée.' };
    if (!userId) return { ok: false, message: 'Connectez-vous d’abord.' };
    try {
      const { data, error } = await supa.rpc('cn_creer_foyer', { p_nom: nom || 'Notre foyer' });
      if (error) return { ok: false, message: cnHumanError(error) };
      const ligne = Array.isArray(data) ? data[0] : data;
      const f = { id: ligne.foyer_id, code: ligne.code, nom: ligne.nom, membres: [] };
      foyerRef.current = f;
      seenRef.current = {};

      const local = getLocalRef.current() || {};
      SYNC_KEYS.forEach(k => { if (local[k] !== undefined) queueRef.current[k] = local[k]; });
      majAttente();
      await flushRef.current();

      const complet = await chargerFoyer();
      return { ok: true, code: (complet || f).code };
    } catch (e) { return { ok: false, message: cnHumanError(e) }; }
  }, [userId, chargerFoyer, majAttente]);

  /* ── Rejoindre : le contenu du foyer remplace celui de ce téléphone. ── */
  const joinFoyer = React.useCallback(async (code) => {
    const propre = brut(code);
    if (propre.length < 8) return { ok: false, message: 'Code incomplet (8 caractères attendus).' };
    if (!supa) return { ok: false, message: 'Synchronisation non configurée.' };
    if (!userId) return { ok: false, message: 'Connectez-vous d’abord.' };
    try {
      const { data, error } = await supa.rpc('cn_rejoindre_foyer', { p_code: propre });
      if (error) return { ok: false, message: cnHumanError(error) };
      const ligne = Array.isArray(data) ? data[0] : data;
      if (!ligne || !ligne.foyer_id) return { ok: false, message: 'Aucun foyer ne porte ce code.' };

      /* L'utilisateur a accepté le remplacement. */
      const souci = await adopterFoyer(ligne.foyer_id);
      if (souci) return { ok: false, message: souci };

      const complet = await chargerFoyer();
      try { localStorage.removeItem(CN_FOYER_KEY); } catch (e) { /* rien */ }
      return { ok: true, code: (complet || ligne).code };
    } catch (e) { return { ok: false, message: cnHumanError(e) }; }
  }, [userId, chargerFoyer, adopterFoyer]);

  /* ── Inviter par adresse ──
     Pas de courriel à envoyer : la personne qui se connecte avec cette
     adresse est rattachée d'elle-même au premier chargement. */
  const inviter = React.useCallback(async (email) => {
    if (!supa || !userId) return { ok: false, message: 'Connectez-vous d’abord.' };
    try {
      const { error } = await supa.rpc('cn_inviter', { p_email: email });
      if (error) return { ok: false, message: cnHumanError(error) };
      await chargerFoyer();
      return { ok: true };
    } catch (e) { return { ok: false, message: cnHumanError(e) }; }
  }, [userId, chargerFoyer]);

  const annulerInvitation = React.useCallback(async (email) => {
    if (!supa || !userId) return { ok: false, message: 'Connectez-vous d’abord.' };
    try {
      const { error } = await supa.rpc('cn_annuler_invitation', { p_email: email });
      if (error) return { ok: false, message: cnHumanError(error) };
      await chargerFoyer();
      return { ok: true };
    } catch (e) { return { ok: false, message: cnHumanError(e) }; }
  }, [userId, chargerFoyer]);

  const retirerMembre = React.useCallback(async (id) => {
    if (!supa || !userId) return { ok: false, message: 'Connectez-vous d’abord.' };
    try {
      const { error } = await supa.rpc('cn_retirer_membre', { p_user: id });
      if (error) return { ok: false, message: cnHumanError(error) };
      await chargerFoyer();
      return { ok: true };
    } catch (e) { return { ok: false, message: cnHumanError(e) }; }
  }, [userId, chargerFoyer]);

  const accepterInvitation = React.useCallback(async (id) => {
    if (!supa || !userId) return { ok: false, message: 'Connectez-vous d’abord.' };
    try {
      const { error } = await supa.rpc('cn_accepter_invitation', { p_foyer: id });
      if (error) return { ok: false, message: cnHumanError(error) };
      const souci = await adopterFoyer(id);
      if (souci) return { ok: false, message: souci };
      await chargerFoyer();
      return { ok: true };
    } catch (e) { return { ok: false, message: cnHumanError(e) }; }
  }, [userId, chargerFoyer, adopterFoyer]);

  /* ── Quitter le foyer : retire l'appartenance, partout. ── */
  const leaveFoyer = React.useCallback(async () => {
    const f = foyerRef.current;
    if (!supa || !f || !userId) return { ok: false, message: 'Aucun foyer actif.' };
    try {
      const { error } = await supa.from('foyer_members').delete()
        .eq('foyer_id', f.id).eq('user_id', userId);
      if (error) return { ok: false, message: cnHumanError(error) };
      queueRef.current = {}; seenRef.current = {}; majAttente();
      foyerRef.current = null; setFoyer(null); setStatus('off');
      return { ok: true };
    } catch (e) { return { ok: false, message: cnHumanError(e) }; }
  }, [userId, majAttente]);

  return {
    foyer,
    code: foyer ? cnNormalizeCode(foyer.code) : '',
    membres: foyer ? foyer.membres : [],
    invitations: foyer ? foyer.invitations : [],
    invitationRecue: foyer ? foyer.invitationRecue : null,
    estFondateur: !!(foyer && foyer.monRole === 'fondateur'),
    schemaAncien: !!(foyer && foyer.schemaAncien),
    status, lastSync, enAttente,
    push, createFoyer, joinFoyer, leaveFoyer,
    inviter, annulerInvitation, retirerMembre, accepterInvitation,
    refresh: () => { const f = foyerRef.current; if (f) { flushRef.current(); pull(f.id); } },
    reloadFoyer: chargerFoyer,
  };
}
