import React from 'react';
import { CN_FONTS, CNIcon } from '../helpers.jsx';
import { CN_C, CN_T, CN_R, CN_S } from '../tokens.js';
import { cnTestConnection, cnNormalizeCode, CN_FOYER_KEY } from '../sync.js';
import { cnDiagnosticStockage } from '../supabase.js';

const STATUS_META = {
  off: { dot: CN_C.faint, label: 'Hors ligne · données sur cet appareil uniquement' },
  connecting: { dot: '#D4952A', label: 'Envoi en cours…' },
  live: { dot: CN_C.olive, label: 'Synchronisé' },
  error: { dot: '#C0483F', label: 'Synchro interrompue — rien n’est perdu, tout repartira' },
};

async function copyText(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) { await navigator.clipboard.writeText(text); return true; }
  } catch (e) { /* repli */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.focus(); ta.select();
    const ok = document.execCommand('copy'); document.body.removeChild(ta); return ok;
  } catch (e) { return false; }
}

/* ── Briques communes ── */
const btnPrimary = {
  height: 50, borderRadius: CN_R.pill, border: 'none', cursor: 'pointer', width: '100%',
  background: CN_C.olive, color: CN_C.card, fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 14.5,
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
};
const btnGhost = {
  height: 46, borderRadius: CN_R.pill, cursor: 'pointer', width: '100%',
  border: `1.5px solid ${CN_C.edge}`, background: CN_C.card, color: CN_C.body,
  fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 13.5,
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
};
const lien = {
  border: 'none', background: 'none', cursor: 'pointer', padding: '8px 0',
  fontFamily: CN_FONTS.body, fontSize: 12.5, color: CN_C.muted, textDecoration: 'underline',
};
const surtitre = {
  fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 10.5, letterSpacing: '.11em',
  textTransform: 'uppercase', color: CN_C.muted, marginBottom: CN_S.sm,
};

function CNChamp({ icone, type, value, onChange, placeholder, autoComplete, onEnter, droite }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, height: 50, marginBottom: 9,
      border: `1.5px solid ${CN_C.rule}`, borderRadius: CN_R.md, background: CN_C.card, padding: '0 14px',
    }}>
      <CNIcon name={icone} size={17} color={CN_C.faint} style={{ flexShrink: 0 }} />
      <input
        type={type} value={value} placeholder={placeholder} autoComplete={autoComplete}
        autoCapitalize="off" autoCorrect="off" spellCheck="false"
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' && onEnter) onEnter(); }}
        style={{
          flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
          fontFamily: CN_FONTS.body, fontSize: 15, color: CN_C.ink,
        }} />
      {droite}
    </div>
  );
}

function CNMessage({ diag }) {
  if (!diag) return null;
  return (
    <div style={{
      marginTop: 14, borderRadius: CN_R.md, padding: '12px 14px',
      background: diag.ok ? '#EEF3E8' : '#FBEFEE',
      border: `1.5px solid ${diag.ok ? '#D3E0C4' : '#EFD3D0'}`,
      display: 'flex', gap: 9, alignItems: 'flex-start',
    }}>
      <CNIcon name={diag.ok ? 'check' : 'bulb'} size={15} color={diag.ok ? CN_C.olive : '#C0483F'} style={{ flexShrink: 0, marginTop: 2 }} />
      <span style={{ fontFamily: CN_FONTS.body, fontSize: 12.5, color: diag.ok ? '#3C5030' : '#8A3A33', lineHeight: 1.55 }}>{diag.message}</span>
    </div>
  );
}

/* ── Diagnostic de l'appareil ──
   Une connexion qui se perd peut venir de plusieurs causes, et elles ne se
   distinguent pas de l'extérieur. Ce relevé se fait sur le téléphone
   concerné : il compte les fois où le stockage du site a disparu entre deux
   ouvertures, et montre les trois réglages qui décident du sort de ce
   stockage. */
function cnVerdict(d) {
  if (!d.stockageOk) {
    return {
      grave: true,
      texte: "Le navigateur refuse d’enregistrer quoi que ce soit. C’est le comportement d’une fenêtre de navigation privée : tout est effacé à la fermeture. Ouvrez l’app dans une fenêtre normale.",
    };
  }
  if (d.effacements === 0) {
    return {
      grave: false,
      texte: d.ouvertures < 3
        ? "Trop tôt pour conclure : le relevé commence à peine. Revenez ici après quelques jours."
        : `Aucun effacement constaté sur ${d.ouvertures} ouvertures. Le stockage tient.`,
    };
  }
  if (!d.installee) {
    return {
      grave: true,
      texte: `Stockage vidé ${d.effacements} fois sur ${d.ouvertures} ouvertures. L’app est ouverte depuis le navigateur, pas depuis l’écran d’accueil : dans ce cas le téléphone se donne le droit de faire le ménage. Installez-la (menu Partager → « Sur l’écran d’accueil ») et ouvrez-la toujours par cette icône.`,
    };
  }
  if (d.persistant === false) {
    return {
      grave: true,
      texte: `Stockage vidé ${d.effacements} fois malgré l’installation, et le téléphone n’accorde pas le stockage permanent — c’est ce qu’il fait quand il manque de place. Libérer quelques gigaoctets suffit en général.`,
    };
  }
  return {
    grave: true,
    texte: `Stockage vidé ${d.effacements} fois sur ${d.ouvertures} ouvertures, sans cause évidente. Vérifiez que le navigateur n’est pas réglé pour effacer les données de sites à la fermeture.`,
  };
}

function CNDiagnosticAppareil() {
  const [d, setD] = React.useState(null);
  const [ouvert, setOuvert] = React.useState(false);

  React.useEffect(() => {
    if (!ouvert || d) return;
    let vivant = true;
    cnDiagnosticStockage().then(r => { if (vivant) setD(r); });
    return () => { vivant = false; };
  }, [ouvert, d]);

  if (!ouvert) {
    return <button style={lien} onClick={() => setOuvert(true)}>Diagnostic de cet appareil</button>;
  }

  const v = d ? cnVerdict(d) : null;
  const ligne = (etiquette, valeur) => (
    <div style={{ display: 'flex', gap: CN_S.md, padding: '7px 0', borderTop: `1px solid ${CN_C.hair}` }}>
      <span style={{ flex: '0 0 44%', fontFamily: CN_FONTS.body, fontSize: 12, color: CN_C.muted }}>{etiquette}</span>
      <span style={{ flex: 1, fontFamily: CN_FONTS.body, fontSize: 12, color: CN_C.body, wordBreak: 'break-word' }}>{valeur}</span>
    </div>
  );

  return (
    <div style={{ background: CN_C.card, border: `1.5px solid ${CN_C.rule}`, borderRadius: 14, padding: '12px 14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: CN_S.xs }}>
        <span style={{ ...surtitre, marginBottom: 0, flex: 1 }}>Diagnostic de cet appareil</span>
        <button onClick={() => setOuvert(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}>
          <CNIcon name="x" size={15} color={CN_C.faint} />
        </button>
      </div>

      {!d ? (
        <div style={{ fontFamily: CN_FONTS.body, fontSize: 12.5, color: CN_C.muted, padding: '8px 0' }}>Relevé en cours…</div>
      ) : (
        <React.Fragment>
          <div style={{
            background: v.grave ? '#FBEFEE' : '#EEF3E8',
            border: `1.5px solid ${v.grave ? '#EFD3D0' : '#D3E0C4'}`,
            borderRadius: CN_R.md, padding: '10px 12px', margin: '4px 0 10px',
            fontFamily: CN_FONTS.body, fontSize: 12.5, lineHeight: 1.55,
            color: v.grave ? '#8A3A33' : '#3C5030',
          }}>{v.texte}</div>

          {ligne('Ouverte depuis', d.installee ? 'l’écran d’accueil' : 'le navigateur')}
          {ligne('Stockage permanent', d.persistant === true ? 'accordé' : d.persistant === false ? 'refusé' : 'inconnu')}
          {ligne('Écriture possible', d.stockageOk ? 'oui' : 'non')}
          {d.quotaMo != null && ligne('Espace du site', `${d.utiliseMo != null ? d.utiliseMo : '?'} Mo utilisés sur ${d.quotaMo} Mo`)}
          {ligne('Effacements', `${d.effacements} sur ${d.ouvertures} ouvertures${d.depuis ? `, depuis le ${d.depuis}` : ''}`)}
          {d.dernier && ligne('Dernier effacement', d.dernier)}
          {ligne('Adresse', d.origine)}

          <div style={{ fontFamily: CN_FONTS.body, fontSize: 11.5, fontStyle: 'italic', color: CN_C.muted, marginTop: 10, lineHeight: 1.5 }}>
            L’adresse compte : deux adresses différentes sont deux stockages différents. Ouvrez toujours l’app par le même chemin.
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

/* ── Connexion et inscription ── */
function CNConnexion({ auth, showToast }) {
  const [mode, setMode] = React.useState('connexion');  // connexion | inscription | oubli
  const [email, setEmail] = React.useState('');
  const [mdp, setMdp] = React.useState('');
  const [prenom, setPrenom] = React.useState('');
  const [voir, setVoir] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [diag, setDiag] = React.useState(null);

  const changer = (m) => { setMode(m); setDiag(null); setMdp(''); };

  const valider = async () => {
    setBusy(true); setDiag(null);
    let res;
    if (mode === 'connexion') res = await auth.signIn(email, mdp);
    else if (mode === 'inscription') res = await auth.signUp(email, mdp, prenom);
    else res = await auth.resetPassword(email);
    setBusy(false);

    if (!res.ok) { setDiag({ ok: false, message: res.message }); return; }
    if (mode === 'oubli') {
      setDiag({ ok: true, message: 'Courriel envoyé — suivez le lien pour choisir un nouveau mot de passe.' });
      return;
    }
    if (mode === 'inscription' && res.confirmation) {
      setDiag({ ok: true, message: 'Compte créé. Ouvrez le lien de confirmation reçu par courriel, puis connectez-vous.' });
      setMode('connexion');
      return;
    }
    showToast(mode === 'inscription' ? 'Compte créé' : 'Connecté');
  };

  const titre = mode === 'connexion' ? 'Se connecter'
    : mode === 'inscription' ? 'Créer mon compte' : 'Recevoir un lien';

  return (
    <React.Fragment>
      <p style={{ fontFamily: CN_FONTS.body, fontSize: 13.5, color: CN_C.body, lineHeight: 1.6, margin: '0 0 16px' }}>
        {mode === 'oubli'
          ? 'Indiquez votre adresse : vous recevrez un lien pour choisir un nouveau mot de passe.'
          : 'Chacun son compte. Vous rejoignez ensuite le même foyer pour partager le planning, la liste de courses, les favoris et vos recettes.'}
      </p>

      {mode === 'inscription' && (
        <CNChamp icone="user" type="text" value={prenom} onChange={setPrenom}
          placeholder="Prénom" autoComplete="given-name" onEnter={valider} />
      )}
      <CNChamp icone="mail" type="email" value={email} onChange={setEmail}
        placeholder="Adresse électronique" autoComplete="email" onEnter={valider} />
      {mode !== 'oubli' && (
        <CNChamp icone="lock" type={voir ? 'text' : 'password'} value={mdp} onChange={setMdp}
          placeholder={mode === 'inscription' ? 'Mot de passe (8 caractères min.)' : 'Mot de passe'}
          autoComplete={mode === 'inscription' ? 'new-password' : 'current-password'} onEnter={valider}
          droite={
            <button onClick={() => setVoir(v => !v)} aria-label={voir ? 'Masquer' : 'Afficher'}
              style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}>
              <CNIcon name={voir ? 'eyeOff' : 'eye'} size={17} color={CN_C.faint} />
            </button>
          } />
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: CN_S.xs }}>
        <button style={{ ...btnPrimary, opacity: busy ? .5 : 1 }} disabled={busy} onClick={valider}>
          {busy ? 'Un instant…' : titre}
        </button>
        {mode === 'connexion' && (
          <button style={btnGhost} onClick={() => changer('inscription')}>Je n’ai pas encore de compte</button>
        )}
        {mode !== 'connexion' && (
          <button style={btnGhost} onClick={() => changer('connexion')}>Revenir à la connexion</button>
        )}
        {mode === 'connexion' && (
          <button style={lien} onClick={() => changer('oubli')}>Mot de passe oublié</button>
        )}
      </div>

      <CNMessage diag={diag} />

      <div style={{ fontFamily: CN_FONTS.body, fontSize: 11.5, fontStyle: 'italic', color: CN_C.muted, margin: `${CN_S.md}px 0`, lineHeight: 1.5 }}>
        Sans compte, l’app fonctionne entièrement sur cet appareil. Se connecter ne sert qu’au partage.
      </div>

      <CNDiagnosticAppareil />
    </React.Fragment>
  );
}

/* ── Aucun foyer : en créer un ou en rejoindre un ── */
function CNSansFoyer({ sync, showToast }) {
  const [joining, setJoining] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [diag, setDiag] = React.useState(null);

  const ancien = React.useMemo(() => {
    try { return localStorage.getItem(CN_FOYER_KEY) || ''; } catch (e) { return ''; }
  }, []);

  const doCreate = async () => {
    setBusy(true); setDiag(null);
    const res = await sync.createFoyer('Notre foyer');
    setBusy(false);
    if (res.ok) showToast('Foyer créé — partagez le code');
    else setDiag({ ok: false, message: res.message });
  };

  const doJoin = async () => {
    setBusy(true); setDiag(null);
    const res = await sync.joinFoyer(input);
    setBusy(false);
    if (res.ok) { showToast('Foyer rejoint — données synchronisées'); setJoining(false); }
    else setDiag({ ok: false, message: res.message });
  };

  if (joining) {
    return (
      <React.Fragment>
        <p style={{ fontFamily: CN_FONTS.body, fontSize: 13.5, color: CN_C.body, lineHeight: 1.6, margin: '0 0 6px' }}>
          Saisissez le code affiché sur l’autre téléphone.
        </p>
        <div style={{ background: '#FDF6E9', border: '1.5px solid #E8D9B8', borderRadius: CN_R.sm + 4, padding: '10px 12px', marginBottom: 14 }}>
          <span style={{ fontFamily: CN_FONTS.body, fontSize: 12, color: '#7A6450', lineHeight: 1.5 }}>
            Le planning et la liste de courses <strong>de cet appareil</strong> seront remplacés par ceux du foyer.
          </span>
        </div>
        <input value={input} onChange={e => setInput(cnNormalizeCode(e.target.value))}
          placeholder="ABCD-EFGH" inputMode="text" autoCapitalize="characters" spellCheck="false"
          style={{
            width: '100%', height: 54, borderRadius: CN_R.md, border: `1.5px solid ${CN_C.edge}`, background: CN_C.card,
            textAlign: 'center', fontFamily: CN_FONTS.mono, fontSize: CN_T.title, letterSpacing: '.12em',
            color: CN_C.ink, outline: 'none', marginBottom: CN_S.md, boxSizing: 'border-box',
          }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          <button style={{ ...btnPrimary, opacity: input.replace('-', '').length < 8 || busy ? .45 : 1 }}
            disabled={input.replace('-', '').length < 8 || busy} onClick={doJoin}>
            {busy ? 'Connexion…' : 'Rejoindre ce foyer'}
          </button>
          <button style={btnGhost} onClick={() => { setJoining(false); setDiag(null); }}>Annuler</button>
        </div>
        <CNMessage diag={diag} />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <p style={{ fontFamily: CN_FONTS.body, fontSize: 13.5, color: CN_C.body, lineHeight: 1.6, margin: '0 0 16px' }}>
        Un foyer réunit plusieurs comptes autour des mêmes données. Les modifications apparaissent
        instantanément sur les autres téléphones.
      </p>

      {ancien && (
        <div style={{ background: '#FDF6E9', border: '1.5px solid #E8D9B8', borderRadius: CN_R.sm + 4, padding: '10px 12px', marginBottom: 14 }}>
          <span style={{ fontFamily: CN_FONTS.body, fontSize: 12, color: '#7A6450', lineHeight: 1.5 }}>
            L’ancien partage par code <strong>{ancien}</strong> n’est plus utilisé. Créez votre foyer ici : le contenu
            de cet appareil sera repris tel quel, rien n’est perdu.
          </span>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        <button style={{ ...btnPrimary, opacity: busy ? .5 : 1 }} disabled={busy} onClick={doCreate}>
          <CNIcon name="sparkles" size={18} color={CN_C.card} /> {busy ? 'Création…' : 'Créer mon foyer'}
        </button>
        <button style={btnGhost} disabled={busy} onClick={() => setJoining(true)}>
          <CNIcon name="link" size={16} color={CN_C.body} /> J’ai déjà un code
        </button>
      </div>
      <div style={{ fontFamily: CN_FONTS.body, fontSize: 11.5, fontStyle: 'italic', color: CN_C.muted, marginTop: CN_S.md, lineHeight: 1.5 }}>
        « Créer » publie le contenu de cet appareil et vous donne un code à transmettre.
      </div>
      <CNMessage diag={diag} />
    </React.Fragment>
  );
}

/* ── Foyer actif ── */
function CNFoyerActif({ auth, sync, showToast }) {
  const [busy, setBusy] = React.useState(false);
  const [diag, setDiag] = React.useState(null);
  const [confirmLeave, setConfirmLeave] = React.useState(false);

  const doTest = async () => {
    setBusy(true); setDiag(null);
    setDiag(await cnTestConnection());
    setBusy(false);
  };

  const doLeave = async () => {
    setBusy(true);
    const res = await sync.leaveFoyer();
    setBusy(false); setConfirmLeave(false);
    if (res.ok) showToast('Foyer quitté');
    else setDiag({ ok: false, message: res.message });
  };

  const moi = auth.user ? auth.user.id : null;
  const membres = sync.membres || [];

  return (
    <React.Fragment>
      <div style={surtitre}>Code du foyer</div>
      <button onClick={async () => showToast(await copyText(sync.code) ? 'Code copié' : 'Copie impossible')}
        style={{
          width: '100%', background: CN_C.card, border: `1.5px solid ${CN_C.rule}`, borderRadius: 14,
          padding: '18px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: CN_S.md, marginBottom: CN_S.sm,
        }}>
        <span style={{ fontFamily: CN_FONTS.mono, fontSize: 26, letterSpacing: '.14em', color: CN_C.ink }}>{sync.code}</span>
        <CNIcon name="copy" size={17} color={CN_C.faint} />
      </button>
      <div style={{ fontFamily: CN_FONTS.body, fontSize: 12, color: CN_C.muted, lineHeight: 1.55, marginBottom: CN_S.lg }}>
        Sur l’autre téléphone : créer un compte, ouvrir <strong>Mon foyer</strong>, toucher
        <strong> « J’ai déjà un code »</strong> et saisir celui-ci.
      </div>

      <div style={surtitre}>Membres</div>
      <div style={{ background: CN_C.card, border: `1.5px solid ${CN_C.rule}`, borderRadius: 14, marginBottom: CN_S.lg, overflow: 'hidden' }}>
        {membres.length === 0 && (
          <div style={{ padding: '14px 16px', fontFamily: CN_FONTS.body, fontSize: 13, color: CN_C.muted }}>
            Vous seul pour l’instant.
          </div>
        )}
        {membres.map((m, i) => (
          <div key={m.id} style={{
            display: 'flex', alignItems: 'center', gap: 11, padding: '12px 16px',
            borderTop: i === 0 ? 'none' : `1px solid ${CN_C.hair}`,
          }}>
            <span style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: CN_C.oliveSoft,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: CN_FONTS.display, fontWeight: 700, fontSize: 13, color: CN_C.olive,
            }}>{((m.prenom || m.email || '?').trim()[0] || '?').toUpperCase()}</span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 13.5, color: CN_C.ink }}>
                {m.prenom || m.email}{m.id === moi ? ' · vous' : ''}
              </span>
              <span style={{
                display: 'block', fontFamily: CN_FONTS.body, fontSize: 11.5, color: CN_C.muted,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{m.role === 'fondateur' ? 'A créé le foyer' : m.email}</span>
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        <button style={btnGhost} disabled={busy} onClick={doTest}>
          <CNIcon name="refresh" size={15} color={CN_C.body} /> {busy ? 'Test en cours…' : 'Tester la connexion'}
        </button>

        <CNDiagnosticAppareil />

        {!confirmLeave ? (
          <button onClick={() => setConfirmLeave(true)} style={lien}>Quitter ce foyer</button>
        ) : (
          <div style={{ background: CN_C.card, border: `1.5px solid ${CN_C.rule}`, borderRadius: CN_R.md, padding: '12px 14px' }}>
            <div style={{ fontFamily: CN_FONTS.body, fontSize: 12.5, color: CN_C.body, lineHeight: 1.55, marginBottom: 10 }}>
              Votre compte sortira du foyer. Les données restent en place, ici et pour les autres membres.
            </div>
            <div style={{ display: 'flex', gap: CN_S.sm }}>
              <button onClick={doLeave} disabled={busy} style={{
                flex: 1, height: 40, borderRadius: CN_R.pill, border: '1.5px solid #C0483F', background: '#C0483F',
                color: CN_C.card, fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12.5, cursor: 'pointer',
              }}>Quitter</button>
              <button onClick={() => setConfirmLeave(false)} style={{
                flex: 1, height: 40, borderRadius: CN_R.pill, border: `1.5px solid ${CN_C.edge}`, background: CN_C.card,
                color: CN_C.body, fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12.5, cursor: 'pointer',
              }}>Annuler</button>
            </div>
          </div>
        )}
      </div>

      <CNMessage diag={diag} />
    </React.Fragment>
  );
}

/* ── La feuille ── */
export function CNFoyerSheet({ open, onClose, auth, sync, showToast }) {
  React.useEffect(() => { /* rien à réinitialiser : chaque vue tient son état */ }, [open]);

  const meta = STATUS_META[sync.status] || STATUS_META.off;
  const connecte = !!auth.session;
  const attente = sync.enAttente || 0;

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 220, pointerEvents: open ? 'auto' : 'none' }} aria-hidden={!open}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(26,25,24,.4)', opacity: open ? 1 : 0, transition: 'opacity .25s ease' }}></div>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, background: CN_C.paper, borderRadius: '24px 24px 0 0',
        transform: open ? 'translateY(0)' : 'translateY(105%)',
        /* Fermé = invisible : rien de focusable, donc pas de défilement parasite du conteneur. */
        visibility: open ? 'visible' : 'hidden',
        transition: open ? 'transform .3s cubic-bezier(.32,.72,.25,1)'
                         : 'transform .3s cubic-bezier(.32,.72,.25,1), visibility 0s linear .3s',
        padding: '14px 22px calc(env(safe-area-inset-bottom, 0px) + 18px)', boxShadow: '0 -8px 40px rgba(26,25,24,.18)',
        maxHeight: '86%', overflowY: 'auto',
      }}>
        <div style={{ width: 38, height: 4, borderRadius: 99, background: CN_C.edge, margin: '0 auto 14px' }}></div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: CN_S.xs }}>
          <CNIcon name="users" size={20} color={CN_C.olive} />
          <span style={{ fontFamily: CN_FONTS.display, fontWeight: 800, fontSize: 19, color: CN_C.ink, flex: 1 }}>Mon foyer</span>
          {connecte && (
            <button onClick={async () => { await auth.signOut(); showToast('Déconnecté'); }}
              title="Se déconnecter"
              style={{
                border: 'none', background: 'none', cursor: 'pointer', padding: 6, display: 'flex',
                alignItems: 'center', gap: 6, fontFamily: CN_FONTS.body, fontSize: 12, color: CN_C.muted,
              }}>
              <CNIcon name="logout" size={16} color={CN_C.muted} /> Déconnexion
            </button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: CN_S.lg, flexWrap: 'wrap' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: meta.dot, flexShrink: 0 }}></span>
          <span style={{ fontFamily: CN_FONTS.body, fontSize: 12, color: CN_C.muted }}>
            {meta.label}{attente > 0 ? ` · ${attente} modification${attente > 1 ? 's' : ''} en attente` : ''}
          </span>
        </div>

        {auth.reprise && (
          <div style={{
            background: CN_C.oliveSoft, border: '1.5px solid #D3E0C4', borderRadius: CN_R.md,
            padding: '10px 12px', marginBottom: CN_S.md,
            fontFamily: CN_FONTS.body, fontSize: 12.5, color: '#3C5030', lineHeight: 1.55,
          }}>
            Le téléphone avait vidé les données du site. La session a été rouverte toute seule et le foyer
            retrouvé — rien à ressaisir. Le diagnostic plus bas dit pourquoi.
          </div>
        )}

        {connecte && auth.prenom && !sync.foyer && (
          <div style={{ fontFamily: CN_FONTS.body, fontSize: 12.5, color: CN_C.muted, marginBottom: CN_S.md }}>
            Connecté en tant que <strong style={{ color: CN_C.body }}>{auth.prenom}</strong>.
          </div>
        )}

        {!auth.ready ? (
          <div style={{ fontFamily: CN_FONTS.body, fontSize: 13, color: CN_C.muted, padding: '20px 0' }}>Chargement…</div>
        ) : !connecte ? (
          <CNConnexion auth={auth} showToast={showToast} />
        ) : !sync.foyer ? (
          <CNSansFoyer sync={sync} showToast={showToast} />
        ) : (
          <CNFoyerActif auth={auth} sync={sync} showToast={showToast} />
        )}
      </div>
    </div>
  );
}
