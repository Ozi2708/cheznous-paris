import React from 'react';
import { CN_FONTS, chMeta, CNIcon, scaleQty } from '../helpers.jsx';
import { CN_DAYS } from '../utils.js';
import { NutritionBar, TipBox, InfoCard } from '../ds-components.jsx';

const CN_ING_TINTS = { 'À Acheter': { bg: '#EAF0E2', color: '#3D5430' }, 'Placard': { bg: '#EEE8DC', color: '#6B5138' }, 'Épices': { bg: '#EDE6DF', color: '#7A6450' } };

const CN_FOOT_ICONS = {
  'Conseil': { icon: 'bulb', bg: '#FEF9E4', c: '#C4881A' },
  'Suggestion': { icon: 'glass', bg: '#FDEEF3', c: '#C04870' },
  'Conservation': { icon: 'snow', bg: '#EEF1FB', c: '#4A5EA0' },
};

export function CNTopBar({ onBack, label, color, onPrev, onNext, pos, fav, onFav }) {
  const arrowBtn = (dir, disabled, fn) => (
    <button onClick={fn} disabled={disabled} aria-label={dir > 0 ? 'Recette suivante' : 'Recette précédente'} style={{
      width: 38, height: 38, borderRadius: 9999, border: '1.5px solid #E4DDD2', background: '#FFFFFF',
      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? .35 : 1, transition: 'all .15s ease', flexShrink: 0,
    }}>
      <CNIcon name={dir > 0 ? 'chevR' : 'back'} size={16} color="#3C3830" />
    </button>
  );
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px 8px' }}>
      <button onClick={onBack} aria-label="Retour" style={{
        width: 44, height: 44, borderRadius: 9999, border: '1.5px solid #E4DDD2', background: '#FFFFFF',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all .15s ease', flexShrink: 0,
      }}>
        <CNIcon name="back" size={18} color="#3C3830" />
      </button>
      <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: color || '#8C8780', flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
      {onFav && (
        <button onClick={onFav} aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'} title={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'} style={{
          width: 38, height: 38, borderRadius: 9999, border: `1.5px solid ${fav ? '#B89268' : '#E4DDD2'}`, background: '#FFFFFF',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'all .15s ease',
        }}>
          <CNIcon name="heart" size={18} color="#B89268" fill={fav ? '#B89268' : 'none'} />
        </button>
      )}
      {(onPrev || onNext) && (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          {pos && <span style={{ fontFamily: CN_FONTS.mono, fontSize: 10.5, color: '#B8B3AA', whiteSpace: 'nowrap', marginRight: 2 }}>{pos.i + 1}/{pos.n}</span>}
          {arrowBtn(-1, !onPrev, onPrev)}
          {arrowBtn(1, !onNext, onNext)}
        </span>
      )}
    </div>
  );
}

function CNPortionStepper({ portions, setPortions, color }) {
  const btn = {
    width: 44, height: 44, borderRadius: 9999, border: '1.5px solid #D5CEBE', background: '#FFFFFF',
    fontFamily: CN_FONTS.display, fontWeight: 800, fontSize: 20, color: '#1A1918', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s ease',
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', border: '1.5px solid #E4DDD2', borderRadius: 12, padding: '10px 12px' }}>
      <div>
        <div style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11, letterSpacing: '.11em', textTransform: 'uppercase', color: '#8C8780' }}>Portions</div>
        <div style={{ fontFamily: CN_FONTS.body, fontSize: 11.5, fontStyle: 'italic', color: '#B8B3AA', marginTop: 2 }}>quantités recalculées</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button style={{ ...btn, opacity: portions <= 1 ? .35 : 1 }} disabled={portions <= 1} onClick={() => setPortions(p => Math.max(1, p - 1))}>−</button>
        <span style={{ fontFamily: CN_FONTS.display, fontWeight: 800, fontSize: 26, color, minWidth: 30, textAlign: 'center' }}>{portions}</span>
        <button style={{ ...btn, opacity: portions >= 8 ? .35 : 1 }} disabled={portions >= 8} onClick={() => setPortions(p => Math.min(8, p + 1))}>+</button>
      </div>
    </div>
  );
}

function CNIngredientChecklist({ recipe, factor, checked, setChecked }) {
  return (
    <div>
      {recipe.ingredients.map((sec, si) => {
        const tint = CN_ING_TINTS[sec.section] || CN_ING_TINTS['À Acheter'];
        return (
          <div key={si} style={{ marginBottom: 14 }}>
            <div style={{ background: tint.bg, color: tint.color, padding: '7px 12px', borderRadius: 5, marginBottom: 2, fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11, letterSpacing: '.11em', textTransform: 'uppercase' }}>{sec.section}</div>
            {sec.items.map((item, ii) => {
              const key = si + ':' + ii;
              const done = checked.has(key);
              return (
                <button key={ii} onClick={() => {
                  const next = new Set(checked);
                  done ? next.delete(key) : next.add(key);
                  setChecked(next);
                }} style={{
                  display: 'grid', gridTemplateColumns: '24px 78px 1fr', alignItems: 'center', gap: 8, width: '100%',
                  padding: '8px 4px', border: 'none', borderBottom: ii < sec.items.length - 1 ? '1px solid #E4DDD2' : 'none',
                  background: 'none', cursor: 'pointer', textAlign: 'left', minHeight: 40, transition: 'opacity .15s ease',
                  opacity: done ? .45 : 1,
                }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: 6, border: `1.5px solid ${done ? '#506741' : '#D5CEBE'}`,
                    background: done ? '#506741' : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s ease',
                  }}>
                    {done && <CNIcon name="check" size={13} color="#FFFFFF" strokeWidth={2.5} />}
                  </span>
                  <span style={{ fontFamily: CN_FONTS.mono, fontSize: 12, color: '#8C8780', fontWeight: 500, whiteSpace: 'nowrap' }}>{scaleQty(item.q, factor)}</span>
                  <span style={{ fontFamily: CN_FONTS.body, fontSize: 13.5, color: '#1A1918', textDecoration: done ? 'line-through' : 'none' }}>{item.name}</span>
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function CNStepsPreview({ steps, color }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ flexShrink: 0, width: 26, height: 26, borderRadius: '50%', background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: CN_FONTS.display, fontWeight: 700, fontSize: 12 }}>{i + 1}</div>
          <p style={{ fontFamily: CN_FONTS.body, fontSize: 14, color: '#1A1918', lineHeight: 1.6, paddingTop: 3, flex: 1, margin: 0 }} dangerouslySetInnerHTML={{ __html: s }}></p>
        </div>
      ))}
    </div>
  );
}

export function CNRecipeScreen({ recipe, onBack, onCook, portions, setPortions, week, onPlanWeek, onPrev, onNext, pos, bottomInset = 0, fav, onFav }) {
  const [checked, setChecked] = React.useState(() => new Set());
  const [planOpen, setPlanOpen] = React.useState(false);
  const [justPlanned, setJustPlanned] = React.useState(null);
  const m = chMeta(recipe.chapter);
  const factor = portions / 2;
  const sectionLbl = { fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11, letterSpacing: '.11em', textTransform: 'uppercase', color: '#B8B3AA', margin: '26px 0 14px' };

  return (
    <div data-screen-label={'Fiche — ' + recipe.title} style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FAFAF8', position: 'relative' }}>
      <div style={{ paddingTop: 56, flexShrink: 0 }}>
        <CNTopBar onBack={onBack} label={`${m.label} · Recette ${String(recipe.num).padStart(2, '0')}`} color={m.color} onPrev={onPrev} onNext={onNext} pos={pos} fav={fav} onFav={onFav} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, padding: `4px 20px ${130 + bottomInset}px` }}>
        <h1 style={{ fontFamily: CN_FONTS.display, fontWeight: 800, fontSize: 29, lineHeight: 1.12, color: '#1A1918', margin: '4px 0 12px' }}>{recipe.title}</h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {recipe.typeBadges.map((b, i) => (
            <span key={'t' + i} style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 10, letterSpacing: '.11em', textTransform: 'uppercase', padding: '4px 11px', borderRadius: 9999, background: m.soft, color: m.color, border: `1.5px solid ${m.color}33` }}>{b}</span>
          ))}
          {recipe.dietTags.filter(b => !recipe.typeBadges.some(tb => tb.toLowerCase() === b.toLowerCase())).map((b, i) => (
            <span key={'d' + i} style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 10, letterSpacing: '.11em', textTransform: 'uppercase', padding: '4px 11px', borderRadius: 9999, background: '#F5F5F3', color: '#8C8780', border: '1.5px solid #D5CEBE' }}>{b}</span>
          ))}
        </div>

        <NutritionBar kcal={recipe.nutrition.kcal} lipides={recipe.nutrition.lipides} glucides={recipe.nutrition.glucides} proteines={recipe.nutrition.proteines} />
        <div style={{ fontFamily: CN_FONTS.body, fontSize: 11, fontStyle: 'italic', color: '#B8B3AA', padding: '8px 2px 0', textAlign: 'right' }}>valeurs par personne</div>

        <div style={{ display: 'flex', gap: 14, alignItems: 'baseline', padding: '12px 2px 18px', fontFamily: CN_FONTS.body, fontSize: 12.5, color: '#8C8780', borderBottom: '1px solid #E4DDD2', marginBottom: 18 }}>
          <span style={{ whiteSpace: 'nowrap' }}><span style={{ color: m.color, marginRight: 4 }}>•</span> Prép. <strong style={{ color: '#1A1918' }}>{recipe.prepMin} min</strong></span>
          <span style={{ whiteSpace: 'nowrap' }}><span style={{ color: m.color, marginRight: 4 }}>•</span> Cuisson <strong style={{ color: '#1A1918' }}>{recipe.cookMin} min</strong></span>
          <span style={{ marginLeft: 'auto', whiteSpace: 'nowrap', fontFamily: CN_FONTS.mono, fontSize: 11.5, color: '#B8B3AA' }}>{recipe.totalMin} min au total</span>
        </div>

        <CNPortionStepper portions={portions} setPortions={setPortions} color={m.color} />

        <div style={sectionLbl}>Ingrédients</div>
        <CNIngredientChecklist recipe={recipe} factor={factor} checked={checked} setChecked={setChecked} />
        {recipe.portionLabel && <div style={{ fontFamily: CN_FONTS.body, fontSize: 11, fontStyle: 'italic', color: '#B8B3AA', marginTop: -4 }}>{recipe.portionLabel.replace('pour 2 personnes', `pour ${portions} personne${portions > 1 ? 's' : ''}`)}</div>}

        {recipe.tips.length > 0 && (
          <div style={{ marginTop: 18 }}>
            {recipe.tips.map((t, i) => (
              <TipBox key={i} type={t.cls.includes('var') ? 'variante' : 'astuce'} title={t.title} text={t.text} />
            ))}
          </div>
        )}

        <div style={sectionLbl}>Préparation</div>
        <CNStepsPreview steps={recipe.steps} color={m.color} />

        {recipe.claudy.length > 0 && (
          <InfoCard advisor="Claudy" text={recipe.claudy[0]} subtitle={recipe.claudy[1] || undefined} />
        )}

        <div style={{ borderTop: '1px solid #E4DDD2', marginTop: 26, paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {recipe.footerTips.filter(t => t.label).map((t, i) => {
            const fi = CN_FOOT_ICONS[t.label] || CN_FOOT_ICONS['Conseil'];
            return (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ width: 30, height: 30, borderRadius: '50%', background: fi.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CNIcon name={fi.icon} size={15} color={fi.c} />
                </span>
                <div>
                  <div style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 10, letterSpacing: '.11em', textTransform: 'uppercase', color: '#B8B3AA', marginBottom: 3 }}>{t.label}</div>
                  <div style={{ fontFamily: CN_FONTS.body, fontSize: 12.5, fontStyle: 'italic', color: '#8C8780', lineHeight: 1.55 }}>{t.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: bottomInset, padding: '14px 20px 16px', background: 'linear-gradient(to top, #FAFAF8 65%, rgba(250,250,248,0))', display: 'flex', gap: 10, zIndex: 50 }}>
        <button onClick={onCook} style={{
          flex: 1, height: 54, borderRadius: 9999, border: 'none', cursor: 'pointer',
          background: m.color, color: '#FFFFFF', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 15,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          boxShadow: '0 6px 20px rgba(26,25,24,.18)', transition: 'all .15s ease',
        }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseUp={e => e.currentTarget.style.transform = 'none'}>
          <CNIcon name="pot" size={20} color="#FFFFFF" />
          Lancer le mode cuisine
        </button>
        {onPlanWeek && (
          <button onClick={() => setPlanOpen(true)} aria-label="Ajouter à ma semaine" style={{
            width: 54, height: 54, borderRadius: 9999, border: '1.5px solid #D5CEBE', cursor: 'pointer',
            background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            boxShadow: '0 6px 20px rgba(26,25,24,.10)', transition: 'all .15s ease',
          }}>
            <CNIcon name="cal" size={20} color="#506741" />
          </button>
        )}
      </div>

      {onPlanWeek && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 80, pointerEvents: planOpen ? 'auto' : 'none' }} aria-hidden={!planOpen}>
          <div onClick={() => setPlanOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(26,25,24,.4)', opacity: planOpen ? 1 : 0, transition: 'opacity .25s ease' }}></div>
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 0, background: '#FAFAF8', borderRadius: '24px 24px 0 0',
            transform: planOpen ? 'translateY(0)' : 'translateY(105%)', transition: 'transform .3s cubic-bezier(.32,.72,.25,1)',
            padding: '14px 22px 34px', boxShadow: '0 -8px 40px rgba(26,25,24,.18)',
          }}>
            <div style={{ width: 38, height: 4, borderRadius: 99, background: '#D5CEBE', margin: '0 auto 14px' }}></div>
            <div style={{ fontFamily: CN_FONTS.display, fontWeight: 800, fontSize: 19, color: '#1A1918', marginBottom: 4 }}>Ajouter à ma semaine</div>
            <div style={{ fontFamily: CN_FONTS.body, fontSize: 12, fontStyle: 'italic', color: '#8C8780', marginBottom: 14 }}>{recipe.title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {CN_DAYS.map(day => (
                <div key={day} style={{ display: 'grid', gridTemplateColumns: '76px 1fr 1fr', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: '#8C8780' }}>{day}</span>
                  {['midi', 'soir'].map(slot => {
                    const key = day + '-' + slot;
                    const taken = week && week[key];
                    const isHere = justPlanned === key;
                    return (
                      <button key={slot} onClick={() => { onPlanWeek(key); setJustPlanned(key); setTimeout(() => setPlanOpen(false), 450); }} style={{
                        height: 38, borderRadius: 9999, cursor: 'pointer', fontFamily: CN_FONTS.body, fontWeight: 600, fontSize: 12,
                        border: `1.5px solid ${isHere ? '#506741' : taken ? '#EEE8DC' : '#D5CEBE'}`,
                        background: isHere ? '#506741' : taken ? '#F5F2EC' : '#FFFFFF',
                        color: isHere ? '#FFFFFF' : taken ? '#B8B3AA' : '#3C3830', transition: 'all .15s ease',
                      }}>{isHere ? '✓ ' + slot : taken ? slot + ' · pris' : slot}</button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
