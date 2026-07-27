import React from 'react';
import { CN_FONTS, CNIcon } from '../helpers.jsx';
import { cnTestConnection, cnNormalizeCode } from '../sync.js';

const STATUS_META = {
  off: { dot: '#B8B3AA', label: 'Hors ligne · données sur cet appareil uniquement' },
  connecting: { dot: '#D4952A', label: 'Connexion…' },
  live: { dot: '#506741', label: 'Synchronisé' },
  error: { dot: '#C0483F', label: 'Synchro interrompue — les données restent sur l’appareil' },
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

export function CNFoyerSheet({ open, onClose, sync, showToast }) {
  const [joining, setJoining] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [diag, setDiag] = React.useState(null);
  const [confirmLeave, setConfirmLeave] = React.useState(false);

  React.useEffect(() => {
    if (!open) { setJoining(false); setInput(''); setDiag(null); setConfirmLeave(false); }
  }, [open]);

  const meta = STATUS_META[sync.status] || STATUS_META.off;

  const btnPrimary = {
    height: 50, borderRadius: 9999, border: 'none', cursor: 'pointer', width: '100%',
    background: '#506741', color: '#FFFFFF', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 14.5,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
  };
  const btnGhost = {
    height: 46, borderRadius: 9999, cursor: 'pointer', width: '100%',
    border: '1.5px solid #D5CEBE', background: '#FFFFFF', color: '#3C3830',
    fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 13.5,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
  };

  const doCreate = async () => {
    setBusy(true); setDiag(null);
    const res = await sync.createFoyer();
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

  const doTest = async () => {
    setBusy(true); setDiag(null);
    setDiag(await cnTestConnection());
    setBusy(false);
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 220, pointerEvents: open ? 'auto' : 'none' }} aria-hidden={!open}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(26,25,24,.4)', opacity: open ? 1 : 0, transition: 'opacity .25s ease' }}></div>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, background: '#FAFAF8', borderRadius: '24px 24px 0 0',
        transform: open ? 'translateY(0)' : 'translateY(105%)', transition: 'transform .3s cubic-bezier(.32,.72,.25,1)',
        padding: '14px 22px calc(env(safe-area-inset-bottom, 0px) + 18px)', boxShadow: '0 -8px 40px rgba(26,25,24,.18)',
        maxHeight: '86%', overflowY: 'auto',
      }}>
        <div style={{ width: 38, height: 4, borderRadius: 99, background: '#D5CEBE', margin: '0 auto 14px' }}></div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <CNIcon name="users" size={20} color="#506741" />
          <span style={{ fontFamily: CN_FONTS.display, fontWeight: 800, fontSize: 19, color: '#1A1918' }}>Mon foyer</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 16 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: meta.dot, flexShrink: 0 }}></span>
          <span style={{ fontFamily: CN_FONTS.body, fontSize: 12, color: '#8C8780' }}>{meta.label}</span>
        </div>

        {/* ── Aucun foyer : créer ou rejoindre ── */}
        {!sync.code && !joining && (
          <React.Fragment>
            <p style={{ fontFamily: CN_FONTS.body, fontSize: 13.5, color: '#3C3830', lineHeight: 1.6, margin: '0 0 16px' }}>
              Partagez le planning, la liste de courses et les favoris entre vos deux téléphones. Les modifications
              apparaissent instantanément de l’autre côté.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <button style={btnPrimary} disabled={busy} onClick={doCreate}>
                <CNIcon name="sparkles" size={18} color="#FFFFFF" /> Créer mon foyer
              </button>
              <button style={btnGhost} disabled={busy} onClick={() => setJoining(true)}>
                <CNIcon name="link" size={16} color="#3C3830" /> J’ai déjà un code
              </button>
            </div>
            <div style={{ fontFamily: CN_FONTS.body, fontSize: 11.5, fontStyle: 'italic', color: '#B8B3AA', marginTop: 12, lineHeight: 1.5 }}>
              « Créer » publie le contenu de cet appareil et vous donne un code à transmettre.
            </div>
          </React.Fragment>
        )}

        {/* ── Saisie d'un code existant ── */}
        {!sync.code && joining && (
          <React.Fragment>
            <p style={{ fontFamily: CN_FONTS.body, fontSize: 13.5, color: '#3C3830', lineHeight: 1.6, margin: '0 0 6px' }}>
              Saisissez le code affiché sur l’autre téléphone.
            </p>
            <div style={{ background: '#FDF6E9', border: '1.5px solid #E8D9B8', borderRadius: 10, padding: '10px 12px', marginBottom: 14 }}>
              <span style={{ fontFamily: CN_FONTS.body, fontSize: 12, color: '#7A6450', lineHeight: 1.5 }}>
                Le planning et la liste de courses <strong>de cet appareil</strong> seront remplacés par ceux du foyer.
              </span>
            </div>
            <input value={input} onChange={e => setInput(cnNormalizeCode(e.target.value))}
              placeholder="ABCD-EFGH" inputMode="text" autoCapitalize="characters" spellCheck="false"
              style={{
                width: '100%', height: 54, borderRadius: 12, border: '1.5px solid #D5CEBE', background: '#FFFFFF',
                textAlign: 'center', fontFamily: CN_FONTS.mono, fontSize: 22, letterSpacing: '.12em',
                color: '#1A1918', outline: 'none', marginBottom: 12, boxSizing: 'border-box',
              }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <button style={{ ...btnPrimary, opacity: input.replace('-', '').length < 8 || busy ? .45 : 1 }}
                disabled={input.replace('-', '').length < 8 || busy} onClick={doJoin}>
                {busy ? 'Connexion…' : 'Rejoindre ce foyer'}
              </button>
              <button style={btnGhost} onClick={() => { setJoining(false); setDiag(null); }}>Annuler</button>
            </div>
          </React.Fragment>
        )}

        {/* ── Foyer actif ── */}
        {sync.code && (
          <React.Fragment>
            <div style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 10.5, letterSpacing: '.11em', textTransform: 'uppercase', color: '#B8B3AA', marginBottom: 8 }}>
              Code du foyer
            </div>
            <button onClick={async () => showToast(await copyText(sync.code) ? 'Code copié' : 'Copie impossible')}
              style={{
                width: '100%', background: '#FFFFFF', border: '1.5px solid #E4DDD2', borderRadius: 14,
                padding: '18px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 8,
              }}>
              <span style={{ fontFamily: CN_FONTS.mono, fontSize: 26, letterSpacing: '.14em', color: '#1A1918' }}>{sync.code}</span>
              <CNIcon name="copy" size={17} color="#8C8780" />
            </button>
            <div style={{ fontFamily: CN_FONTS.body, fontSize: 12, color: '#8C8780', lineHeight: 1.55, marginBottom: 16 }}>
              Sur l’autre téléphone : ouvrir <strong>Mon foyer</strong>, toucher <strong>« J’ai déjà un code »</strong> et saisir celui-ci.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <button style={btnGhost} disabled={busy} onClick={doTest}>
                <CNIcon name="refresh" size={15} color="#3C3830" /> {busy ? 'Test en cours…' : 'Tester la connexion'}
              </button>
              {!confirmLeave ? (
                <button onClick={() => setConfirmLeave(true)} style={{
                  border: 'none', background: 'none', cursor: 'pointer', padding: '8px 0',
                  fontFamily: CN_FONTS.body, fontSize: 12.5, color: '#8C8780', textDecoration: 'underline',
                }}>Quitter le foyer sur cet appareil</button>
              ) : (
                <div style={{ background: '#FFFFFF', border: '1.5px solid #E4DDD2', borderRadius: 12, padding: '12px 14px' }}>
                  <div style={{ fontFamily: CN_FONTS.body, fontSize: 12.5, color: '#3C3830', lineHeight: 1.55, marginBottom: 10 }}>
                    Cet appareil cessera de se synchroniser. Les données restent en place, ici et dans le foyer.
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => { sync.leaveFoyer(); setConfirmLeave(false); showToast('Foyer quitté'); }} style={{
                      flex: 1, height: 40, borderRadius: 9999, border: '1.5px solid #C0483F', background: '#C0483F',
                      color: '#FFFFFF', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12.5, cursor: 'pointer',
                    }}>Quitter</button>
                    <button onClick={() => setConfirmLeave(false)} style={{
                      flex: 1, height: 40, borderRadius: 9999, border: '1.5px solid #D5CEBE', background: '#FFFFFF',
                      color: '#3C3830', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12.5, cursor: 'pointer',
                    }}>Annuler</button>
                  </div>
                </div>
              )}
            </div>
          </React.Fragment>
        )}

        {/* ── Diagnostic ── */}
        {diag && (
          <div style={{
            marginTop: 14, borderRadius: 12, padding: '12px 14px',
            background: diag.ok ? '#EEF3E8' : '#FBEFEE',
            border: `1.5px solid ${diag.ok ? '#D3E0C4' : '#EFD3D0'}`,
            display: 'flex', gap: 9, alignItems: 'flex-start',
          }}>
            <CNIcon name={diag.ok ? 'check' : 'bulb'} size={15} color={diag.ok ? '#506741' : '#C0483F'} style={{ flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontFamily: CN_FONTS.body, fontSize: 12.5, color: diag.ok ? '#3C5030' : '#8A3A33', lineHeight: 1.55 }}>{diag.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}
