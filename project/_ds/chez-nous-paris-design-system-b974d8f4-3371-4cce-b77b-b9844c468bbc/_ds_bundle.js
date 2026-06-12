/* @ds-bundle: {"format":3,"namespace":"ChezNousParisDesignSystem_b974d8","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"NutritionBar","sourcePath":"components/core/NutritionBar.jsx"},{"name":"RecipeCard","sourcePath":"components/core/RecipeCard.jsx"},{"name":"InfoCard","sourcePath":"components/recipe/InfoCard.jsx"},{"name":"IngredientSection","sourcePath":"components/recipe/IngredientSection.jsx"},{"name":"PrepStepList","sourcePath":"components/recipe/PrepStepList.jsx"},{"name":"RecipeHeader","sourcePath":"components/recipe/RecipeHeader.jsx"},{"name":"TipBox","sourcePath":"components/recipe/TipBox.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"b59e4dda37f2","components/core/Button.jsx":"d87857a903ed","components/core/NutritionBar.jsx":"835d93cf0b7a","components/core/RecipeCard.jsx":"f5895b887ed5","components/recipe/InfoCard.jsx":"4558a1914140","components/recipe/IngredientSection.jsx":"843f66c4ca2f","components/recipe/PrepStepList.jsx":"cad0a6e534ca","components/recipe/RecipeHeader.jsx":"34c748daf569","components/recipe/TipBox.jsx":"b81eb7800187"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ChezNousParisDesignSystem_b974d8 = window.ChezNousParisDesignSystem_b974d8 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
const VARIANTS = {
  default: {
    bg: 'var(--color-cream-mid)',
    color: 'var(--color-text-secondary)',
    border: 'var(--color-border-strong)'
  },
  vegan: {
    bg: 'var(--color-brand-50)',
    color: 'var(--color-brand-700)',
    border: 'var(--color-brand-200)'
  },
  vegetalien: {
    bg: 'var(--color-brand-50)',
    color: 'var(--color-brand)',
    border: 'var(--color-brand-200)'
  },
  'low-carb': {
    bg: 'var(--color-amber-50)',
    color: 'var(--color-amber-700)',
    border: 'var(--color-amber-300)'
  },
  outline: {
    bg: 'transparent',
    color: 'var(--color-text-secondary)',
    border: 'var(--color-border-strong)'
  },
  info: {
    bg: 'var(--color-blue-50)',
    color: 'var(--color-blue-700)',
    border: 'var(--color-blue-200)'
  },
  gold: {
    bg: 'var(--color-gold-50)',
    color: 'var(--color-gold-dark)',
    border: 'var(--color-gold-300)'
  },
  tag: {
    bg: 'var(--color-cream-dark)',
    color: 'var(--color-text-secondary)',
    border: 'var(--color-separator)'
  }
};
function Badge({
  children,
  variant = 'default',
  size = 'sm',
  icon
}) {
  const v = VARIANTS[variant] || VARIANTS.default;
  const sizeStyle = size === 'md' ? {
    fontSize: 'var(--text-sm)',
    padding: '5px 14px'
  } : {
    fontSize: '10px',
    padding: '3px 10px'
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--font-semibold)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      borderRadius: 'var(--radius-full)',
      border: `1.5px solid ${v.border}`,
      backgroundColor: v.bg,
      color: v.color,
      whiteSpace: 'nowrap',
      lineHeight: 1,
      ...sizeStyle
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      fontSize: '9px'
    }
  }, icon), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const {
  useState
} = React;
const BASE_STYLE = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  fontFamily: 'var(--font-body)',
  fontWeight: 'var(--font-semibold)',
  letterSpacing: 'var(--tracking-wide)',
  borderRadius: 'var(--radius-full)',
  border: '2px solid transparent',
  transition: 'all 0.15s ease',
  outline: 'none',
  whiteSpace: 'nowrap',
  textDecoration: 'none',
  lineHeight: 1
};
const SIZES = {
  sm: {
    fontSize: 'var(--text-sm)',
    padding: '6px 18px'
  },
  md: {
    fontSize: 'var(--text-base)',
    padding: '10px 26px'
  },
  lg: {
    fontSize: 'var(--text-md)',
    padding: '13px 34px'
  }
};
const VARIANTS = {
  primary: {
    bg: 'var(--color-brand)',
    color: '#fff',
    border: 'var(--color-brand)',
    hoverBg: 'var(--color-brand-700)',
    hoverBorder: 'var(--color-brand-700)'
  },
  secondary: {
    bg: 'transparent',
    color: 'var(--color-brand)',
    border: 'var(--color-brand)',
    hoverBg: 'var(--color-brand-50)',
    hoverBorder: 'var(--color-brand-700)'
  },
  ghost: {
    bg: 'transparent',
    color: 'var(--color-text-secondary)',
    border: 'transparent',
    hoverBg: 'var(--color-cream-dark)',
    hoverBorder: 'transparent'
  },
  gold: {
    bg: 'var(--color-gold)',
    color: '#fff',
    border: 'var(--color-gold)',
    hoverBg: 'var(--color-gold-700)',
    hoverBorder: 'var(--color-gold-700)'
  }
};
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  icon,
  type = 'button'
}) {
  const [hovered, setHovered] = useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const isHovered = hovered && !disabled;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      ...BASE_STYLE,
      ...s,
      backgroundColor: isHovered ? v.hoverBg : v.bg,
      color: v.color,
      borderColor: isHovered ? v.hoverBorder : v.border,
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transform: isHovered ? 'translateY(-1px)' : 'none',
      boxShadow: isHovered ? 'var(--shadow-sm)' : 'none'
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, icon), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/NutritionBar.jsx
try { (() => {
const NUTRIENTS = [{
  key: 'kcal',
  label: 'KCAL',
  unit: '',
  color: 'var(--color-nutrition-kcal)'
}, {
  key: 'lipides',
  label: 'LIPIDES',
  unit: 'g',
  color: 'var(--color-nutrition-lipides)'
}, {
  key: 'glucides',
  label: 'GLUCIDES',
  unit: 'g',
  color: 'var(--color-nutrition-glucides)'
}, {
  key: 'proteines',
  label: 'PROTÉINES',
  unit: 'g',
  color: 'var(--color-nutrition-proteines)'
}];
function NutritionBar({
  kcal,
  lipides,
  glucides,
  proteines
}) {
  const values = {
    kcal,
    lipides,
    glucides,
    proteines
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      borderTop: '1px solid var(--color-separator)',
      borderBottom: '1px solid var(--color-separator)',
      backgroundColor: 'var(--color-bg-card)'
    }
  }, NUTRIENTS.map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: n.key,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px 8px',
      borderRight: i < 3 ? '1px solid var(--color-separator)' : 'none',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--font-extrabold)',
      fontSize: 'var(--text-2xl)',
      color: n.color,
      lineHeight: 1
    }
  }, values[n.key] ?? '—', /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--font-bold)'
    }
  }, n.unit)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--font-medium)',
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--color-text-tertiary)',
      marginTop: '4px'
    }
  }, n.label))));
}
Object.assign(__ds_scope, { NutritionBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/NutritionBar.jsx", error: String((e && e.message) || e) }); }

// components/core/RecipeCard.jsx
try { (() => {
const {
  useState
} = React;
function RecipeCard({
  number,
  title,
  portions = 2,
  tags = [],
  kcal,
  prepTime,
  cookTime
}) {
  const [hovered, setHovered] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      backgroundColor: 'var(--color-bg-card)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--color-border)',
      boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      padding: 'var(--space-5)',
      transition: 'all 0.2s ease',
      transform: hovered ? 'translateY(-2px)' : 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--font-medium)',
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--color-text-tertiary)',
      marginBottom: '8px'
    }
  }, "Recette ", number != null ? String(number).padStart(2, '0') : '—', " \xB7 Pour ", portions, " pers."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--font-extrabold)',
      fontSize: 'var(--text-xl)',
      color: 'var(--color-text-primary)',
      lineHeight: 'var(--leading-tight)',
      marginBottom: tags.length ? '12px' : '0'
    }
  }, title), tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '6px',
      flexWrap: 'wrap',
      marginBottom: '12px'
    }
  }, tags.map((tag, i) => /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    key: i,
    variant: tag.variant || 'default',
    size: "sm"
  }, tag.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-secondary)',
      borderTop: '1px solid var(--color-separator)',
      paddingTop: '10px'
    }
  }, kcal != null && /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--color-nutrition-kcal)',
      fontFamily: 'var(--font-display)'
    }
  }, kcal), ' ', "kcal"), prepTime && /*#__PURE__*/React.createElement("span", null, "Pr\xE9p. ", prepTime), cookTime && /*#__PURE__*/React.createElement("span", null, "Cuisson ", cookTime)));
}
Object.assign(__ds_scope, { RecipeCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/RecipeCard.jsx", error: String((e && e.message) || e) }); }

// components/recipe/InfoCard.jsx
try { (() => {
const PersonIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "white",
  strokeWidth: "2",
  strokeLinecap: "round"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "8",
  r: "4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M4 20c0-4 3.6-7 8-7s8 3 8 7"
}));
function InfoCard({
  advisor = 'Claudy',
  text,
  subtitle
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      border: '1px solid var(--color-blue-100)',
      marginTop: '20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: 'var(--color-blue-500)',
      color: '#fff',
      padding: '10px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255,255,255,0.20)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(PersonIcon, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--font-semibold)',
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      opacity: 0.92
    }
  }, "Le conseil de ", advisor)), /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: 'var(--color-blue-50)',
      padding: '14px 18px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-blue-700)',
      lineHeight: 'var(--leading-relaxed)',
      fontStyle: 'italic',
      margin: 0
    }
  }, text), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-blue-500)',
      lineHeight: 'var(--leading-relaxed)',
      fontStyle: 'italic',
      marginTop: '8px',
      marginBottom: 0
    }
  }, subtitle)));
}
Object.assign(__ds_scope, { InfoCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/recipe/InfoCard.jsx", error: String((e && e.message) || e) }); }

// components/recipe/IngredientSection.jsx
try { (() => {
const SECTION_THEMES = {
  acheter: {
    bg: '#EAF0E2',
    labelColor: '#3D5430',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "6",
      x2: "21",
      y2: "6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16 10a4 4 0 01-8 0"
    }))
  },
  placard: {
    bg: '#EEE8DC',
    labelColor: '#6B5138',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "18",
      height: "18",
      rx: "2"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "3",
      x2: "12",
      y2: "21"
    }))
  },
  epices: {
    bg: '#EDE6DF',
    labelColor: '#7A6450',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 2a5 5 0 015 5v3H7V7a5 5 0 015-5z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M7 10v2a5 5 0 0010 0v-2"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "22",
      x2: "16",
      y2: "22"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "17",
      x2: "12",
      y2: "22"
    }))
  }
};
function IngredientSection({
  title,
  type = 'acheter',
  items = []
}) {
  const theme = SECTION_THEMES[type] || SECTION_THEMES.acheter;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: theme.bg,
      color: theme.labelColor,
      padding: '7px 12px',
      borderRadius: 'var(--radius-sm)',
      marginBottom: '2px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      opacity: 0.85
    }
  }, theme.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--font-semibold)',
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase'
    }
  }, title)), items.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '64px 1fr',
      alignItems: 'center',
      padding: '5px 4px',
      borderBottom: i < items.length - 1 ? '1px solid var(--color-separator)' : 'none',
      minHeight: '30px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-secondary)',
      fontWeight: 'var(--font-medium)'
    }
  }, item.quantity, item.unit ? ` ${item.unit}` : ''), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: item.highlight ? 'var(--color-nutrition-kcal)' : 'var(--color-text-primary)',
      fontStyle: item.note ? 'italic' : 'normal'
    }
  }, item.name))));
}
Object.assign(__ds_scope, { IngredientSection });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/recipe/IngredientSection.jsx", error: String((e && e.message) || e) }); }

// components/recipe/PrepStepList.jsx
try { (() => {
function PrepStepList({
  steps = [],
  label = 'PRÉPARATION'
}) {
  return /*#__PURE__*/React.createElement("div", null, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--font-semibold)',
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--color-text-tertiary)',
      marginBottom: '20px'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }
  }, steps.map((step, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: '16px',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      backgroundColor: 'var(--color-brand)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--font-bold)',
      fontSize: 'var(--text-sm)'
    }
  }, step.number ?? i + 1), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      color: 'var(--color-text-primary)',
      lineHeight: 'var(--leading-relaxed)',
      paddingTop: '3px',
      flex: 1,
      margin: 0
    },
    dangerouslySetInnerHTML: {
      __html: step.html || step.text
    }
  })))));
}
Object.assign(__ds_scope, { PrepStepList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/recipe/PrepStepList.jsx", error: String((e && e.message) || e) }); }

// components/recipe/RecipeHeader.jsx
try { (() => {
function RecipeHeader({
  number,
  portions = 2,
  title,
  dietTags = [],
  featureBadges = []
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--font-medium)',
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--color-text-tertiary)',
      marginBottom: '10px'
    }
  }, "Recette ", number != null ? String(number).padStart(2, '0') : '—', " \xB7 Pour ", portions, " personnes"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: '16px',
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--font-extrabold)',
      fontSize: 'var(--text-4xl)',
      color: 'var(--color-text-primary)',
      lineHeight: 'var(--leading-tight)',
      flex: 1
    }
  }, title), featureBadges.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      flexShrink: 0,
      paddingTop: '4px'
    }
  }, featureBadges.map((b, i) => /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    key: i,
    variant: b.variant || 'outline',
    size: "md"
  }, b.label)))), dietTags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    }
  }, dietTags.map((tag, i) => /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    key: i,
    variant: tag.variant || 'default',
    size: "sm"
  }, tag.label))));
}
Object.assign(__ds_scope, { RecipeHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/recipe/RecipeHeader.jsx", error: String((e && e.message) || e) }); }

// components/recipe/TipBox.jsx
try { (() => {
const THEMES = {
  variante: {
    bg: 'var(--color-red-50)',
    border: 'var(--color-red-200)',
    titleColor: 'var(--color-red-700)',
    dotColor: 'var(--color-red-500)'
  },
  astuce: {
    bg: 'var(--color-cream-dark)',
    border: 'var(--color-separator)',
    titleColor: 'var(--color-text-secondary)',
    dotColor: null
  },
  conseil: {
    bg: 'var(--color-brand-50)',
    border: 'var(--color-brand-200)',
    titleColor: 'var(--color-brand-700)',
    dotColor: 'var(--color-brand)'
  },
  conservation: {
    bg: 'var(--color-blue-50)',
    border: 'var(--color-blue-200)',
    titleColor: 'var(--color-blue-700)',
    dotColor: null
  },
  suggestion: {
    bg: 'var(--color-gold-50)',
    border: 'var(--color-gold-200)',
    titleColor: 'var(--color-gold-dark)',
    dotColor: null
  }
};
function TipBox({
  type = 'astuce',
  title,
  text,
  compact = false
}) {
  const t = THEMES[type] || THEMES.astuce;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: t.bg,
      border: `1px solid ${t.border}`,
      borderRadius: 'var(--radius-md)',
      padding: compact ? '10px 14px' : '14px 18px',
      marginBottom: '10px'
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '8px'
    }
  }, t.dotColor && /*#__PURE__*/React.createElement("span", {
    style: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: t.dotColor,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--font-semibold)',
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: t.titleColor
    }
  }, title)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-secondary)',
      lineHeight: 'var(--leading-relaxed)',
      fontStyle: 'italic',
      margin: 0
    }
  }, text));
}
Object.assign(__ds_scope, { TipBox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/recipe/TipBox.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.NutritionBar = __ds_scope.NutritionBar;

__ds_ns.RecipeCard = __ds_scope.RecipeCard;

__ds_ns.InfoCard = __ds_scope.InfoCard;

__ds_ns.IngredientSection = __ds_scope.IngredientSection;

__ds_ns.PrepStepList = __ds_scope.PrepStepList;

__ds_ns.RecipeHeader = __ds_scope.RecipeHeader;

__ds_ns.TipBox = __ds_scope.TipBox;

})();
