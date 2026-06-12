# Chez nous à Paris — Design System

**"Chez nous à Paris, by Manon & Valentin"** est un livre de cuisine Fitness & Healthy créé par deux Belges vivant à Paris. Le design system couvre le langage visuel, les composants et les layouts du livre de recettes : propre, chaleureux, éditorial — facile à lire, facile à suivre.

## Sources

- Logo officiel : `uploads/ChatGPT Image 6 juin 2026, 15_16_03.png` → copié dans `assets/logo.png`
- Page de référence : `uploads/Capture d'écran 2026-06-06 133501.png` (page Gnocchis aux légumes rôtis)
- Pas de codebase ou Figma externe fourni — système construit depuis les assets fournis.

---

## CONTENT FUNDAMENTALS

**Langue :** Français tout au long. Le copy est chaleureux, direct et instructionnel — jamais corporate.

**Ton :** Comme un ami qui cuisine bien. Personnel et encourageant (*"Pour encore plus de croustillant…"*) plutôt qu'autoritaire.

**Casse :**
- Labels de sections : PETITES MAJUSCULES avec espacement large (`À ACHETER`, `PRÉPARATION`, `ÉPICES`)
- Noms d'ingrédients : minuscules naturelles
- Titres de recettes : Casse naturelle française
- CTAs : minuscules initiale ("Voir la recette", "Enregistrer")

**Voix :**
- À la 2ème personne pour les étapes ("Lavez et coupez les légumes en dés")
- Conseils à la 1ère personne de l'advisor ("Les gnocchis n'ont pas besoin…")
- Variantes et astuces : casual et pratique

**Chiffres :** Toujours en numéraux, précis (244 g, 102 g — pas d'arrondi).

**Emoji :** Non utilisés dans le design — les catégories sont communiquées par couleur et icônes.

**Touche belge :** Trois points 🖤🟡🔴 (drapeau belge) en accent discret dans le logo et éléments décoratifs. Claudy (l'advisor) apporte la personnalité belge.

---

## VISUAL FOUNDATIONS

### Couleurs
Fond crème chaud (`#FAFAF8`) donne un effet papier naturel. La palette est éditoriale et food-forward :

- **Vert olive** (`#506741`) : Couleur brand principale. Tour Eiffel du logo, CTAs, cercles d'étapes, highlights.
- **Or chaud** (`#B89268`) : Accent secondaire. Diagramme moléculaire du logo, diviseurs, accent feuille.
- **Crème** (`#FAFAF8 → #EEE8DC`) : Fond page, sections, séparateurs — jamais blanc pur.
- **Charbon** (`#1A1918`) : Texte principal — noir chaud, pas froid.
- **Orange nutrition** (`#E07534`) : KCAL uniquement — couleur data, pas brand.
- **Amber nutrition** (`#D4952A`) : Lipides.
- **Teal nutrition** (`#2E8B85`) : Glucides.
- **Vert nutrition** (`#3E7852`) : Protéines.
- **Bleu-violet** (`#5C6FAE`) : Boîtes conseil/info (Conseil de Claudy).
- **Rouge** (`#C0392B`) : Variante carnée, warnings — uniquement en fond très clair.

### Typographie
- **Cormorant Garamond** (serif élégant) : Logo, couvertures, titres de chapitres. Serif haut-contrastant, classique français. *Substitution Google Fonts — fournir les .ttf originaux si disponibles.*
- **Bricolage Grotesque ExtraBold (800)** : Titres de recettes, grands chiffres nutritionnels. Gras, expressif, éditorial.
- **DM Sans 400/500/600** : Corps — ingrédients, étapes, conseils. Très lisible aux petites tailles.
- **DM Mono 400/500** : Quantités, timers, numéros de recettes. Précis et structuré.

Labels de sections : `text-transform: uppercase; letter-spacing: var(--tracking-caps)` en DM Sans 600.

### Layout
- **Deux colonnes** : Gauche fixe ~320px (ingrédients), droite fluide (préparation).
- **Proportions A4** : Feel page-livre, adapté écran et impression.
- **Gap colonne** : 40px.
- **Page padding** : 32px horizontal, généreux vertical.

### Arrière-plans
- Page : `var(--color-cream)` — crème chaud, jamais blanc pur
- Cartes/overlays : `#FFFFFF` — contraste crisp
- En-têtes de sections : Teintes légères par catégorie (vert pour À Acheter, brun pour Placard, gris chaud pour Épices)
- Boîtes info : Fond teinté `--color-*-50` selon la catégorie

### Bordures & Rayons
- Badges/pills : `var(--radius-full)` — toujours pills rondes
- Boutons : `var(--radius-full)` — forme pilule
- Cartes recettes : `var(--radius-lg)` (12px)
- Boîtes TipBox : `var(--radius-md)` (8px)
- En-têtes sections : `var(--radius-sm)` (5px)

### Ombres
Ombres chaudes (base charbon). Très retenues :
- Cartes sur fond crème : `var(--shadow-sm)` uniquement
- Hover : lift vers `var(--shadow-md)`
- Pas d'ombres décoratives sur le texte

### Animation & Interaction
- Hover : lift `translateY(-1px)` + shadow sur les cartes recettes
- Press/active : `scale(0.98)` sur les boutons
- Transitions : `0.15s ease` partout — rapide et réactif
- Pas d'animations d'entrée, pas de boucles — c'est un livre de cuisine, pas une appli

### Imagerie
- Lumière naturelle, chaude — photographie culinaire aux tons golden hour
- Pas de filtres lourds
- Option : photo recette dans l'en-tête (colonne droite ou plein-écran)

---

## ICONOGRAPHY

**Approche :** Minimal, fonctionnel. Icônes utilisées parcimonieusement et toujours contextuellement.

**Système :** SVG inline — `20×20` ou `16×16`, `stroke-width: 1.5–2`, caps ronds, sans fill.

**Contextes :**
- En-têtes de sections (À ACHETER, PLACARD, ÉPICES) : icônes outline intégrées au composant IngredientSection
- Footer tips (CONSEIL, SUGGESTION, CONSERVATION) : cercles colorés avec emoji/symbole centré
- Boîtes TipBox : point coloré pour variante, pas d'icône pour astuce
- InfoCard (Conseil de Claudy) : avatar silhouette SVG dans le header bleu

**Fichiers :**
- `assets/logo.png` — logo officiel PNG (source : ChatGPT Image)
- `assets/logo-vector.svg` — recreation SVG fidèle du logo
- `assets/logo-mark.svg` — ancienne version mark-only (à remplacer)
- SVGs inline dans les composants pour portabilité

---

## FILES

```
styles.css                        — Point d'entrée CSS (les consommateurs lient ce fichier)
tokens/
  colors.css                      — Palette complète + alias sémantiques
  typography.css                  — Import Google Fonts + échelle typographique
  spacing.css                     — Espacement, layout, rayons
  shadows.css                     — Tokens d'élévation
assets/
  logo.png                        — Logo officiel (source authentique)
  logo-vector.svg                 — Recreation SVG du logo
  logo-mark.svg                   — Mark-only (ancienne version orange)
guidelines/
  colors-brand.card.html          — Échelle vert olive + or chaud
  colors-nutrition.card.html      — 4 couleurs nutritionnelles
  colors-neutral.card.html        — Crème → charbon
  colors-info.card.html           — Bleu-violet + rouge
  colors-belgian.card.html        — Tricolore belge
  type-brand.card.html            — Cormorant Garamond
  type-display.card.html          — Bricolage Grotesque
  type-body.card.html             — DM Sans + DM Mono
  spacing.card.html               — Échelle d'espacement
  shadows.card.html               — Niveaux d'élévation
  brand-logo.card.html            — Showcase logo
components/
  core/
    Button.jsx / .d.ts            — Bouton (primary/secondary/ghost/gold, 3 tailles)
    Badge.jsx / .d.ts             — Étiquette diététique (vegan/low-carb/vegetalien/outline…)
    NutritionBar.jsx / .d.ts      — Barre 4 colonnes (kcal/lipides/glucides/protéines)
    RecipeCard.jsx / .d.ts        — Carte index recette
    core.card.html                — Showcase core (onglet Design System)
  recipe/
    RecipeHeader.jsx / .d.ts      — En-tête recette (titre + tags + badges)
    IngredientSection.jsx / .d.ts — Liste ingrédients catégorisée
    PrepStepList.jsx / .d.ts      — Étapes de préparation numérotées
    TipBox.jsx / .d.ts            — Boîtes de conseils (variante/astuce/conservation…)
    InfoCard.jsx / .d.ts          — "Le conseil de Claudy" advisor card
    recipe.card.html              — Showcase recipe (onglet Design System)
ui_kits/
  cookbook/
    index.html                    — Page recette complète interactive
readme.md                         — Ce fichier
SKILL.md                          — Manifeste agent skill
```

---

## Components

| Composant | Groupe | Description |
|-----------|--------|-------------|
| Button | Core | 4 variantes (primary/secondary/ghost/gold), 3 tailles |
| Badge | Core | Pills diététiques : vegan, low-carb, vegetalien, outline… |
| NutritionBar | Core | KCAL / Lipides / Glucides / Protéines — bande 4 colonnes |
| RecipeCard | Core | Carte index recette avec titre, tags, macros |
| RecipeHeader | Recipe | Titre + metadata + tags diète + badges fonctionnels |
| IngredientSection | Recipe | Ingrédients catégorisés (À acheter / Placard / Épices) |
| PrepStepList | Recipe | Étapes numérotées avec cercles verts |
| TipBox | Recipe | Boîtes : variante / astuce / conseil / conservation / suggestion |
| InfoCard | Recipe | Encart "Conseil de [Prénom]" — header bleu + fond bleu clair |

---

*Polices substituées : Cormorant Garamond + Bricolage Grotesque + DM Sans via Google Fonts. Fournir les fichiers .ttf/.woff2 de la marque pour remplacer.*

*Logo PNG fourni par Manon & Valentin — utiliser `assets/logo.png` comme source de vérité.*
