/* ── Le contrat de forme d'une recette ──
   Ce schéma est imposé au modèle : il ne peut produire ni un champ de plus,
   ni une valeur hors vocabulaire. Tout ce qui est déductible (identifiant,
   totaux, badges, drapeaux végé) est absent d'ici — c'est le code qui le
   calcule après coup, jamais le modèle. */

export const CN_CHAPTERS = ['Low-Carb', 'High-Carb', 'Post Training', 'Petit Déjeuner', 'Encas'];
export const CN_TYPE_BADGES = ['Bœuf', 'Bœuf haché', 'Crevettes', 'Dinde', 'Jambon', 'Jambon cru', 'Lard', 'Poisson', 'Porc', 'Poulet', 'Saumon', 'Végan', 'Végétarien'];
export const CN_DIET_TAGS = ['Cuisine du monde', 'Gourmande', 'Pesco-végétarien', 'Rapide', 'Sans arachide', 'Sans fruits à coque', 'Sans gluten', 'Sans lactose', 'Sans œuf', 'Végan', 'Végétarien'];
export const CN_SECTIONS = ['À Acheter', 'Placard', 'Épices'];
export const CN_TIP_TITLES = ['Astuce Airfryer', 'Conseil', 'Variante', 'Variante carnée', 'Variantes'];
export const CN_FOOTER_LABELS = ['Conseil', 'Conservation', 'Suggestion'];

const str = (description) => ({ type: 'string', description });

export const CN_RECIPE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['title', 'chapter', 'typeBadges', 'dietTags', 'nutrition', 'prepMin', 'cookMin', 'ingredients', 'steps', 'tips', 'claudy', 'footerTips'],
  properties: {
    title: str("Nom du plat, en français, sans article initial. Ex : « Filet mignon farci au gorgonzola »."),
    chapter: { type: 'string', enum: CN_CHAPTERS, description: "Low-Carb si < 30 g de glucides, High-Carb si > 60 g, Post Training si riche en protéines pour la récupération." },
    typeBadges: { type: 'array', description: "L'ingrédient principal. Un seul en général. « Végan » ou « Végétarien » si aucune viande ni poisson.", items: { type: 'string', enum: CN_TYPE_BADGES } },
    dietTags: { type: 'array', description: "Régimes réellement respectés par la recette, déduits des ingrédients.", items: { type: 'string', enum: CN_DIET_TAGS } },
    nutrition: {
      type: 'object', additionalProperties: false,
      required: ['kcal', 'lipides', 'glucides', 'proteines', 'estimated'],
      properties: {
        kcal: { type: 'integer', description: 'Calories par personne.' },
        lipides: { type: 'integer', description: 'Grammes par personne.' },
        glucides: { type: 'integer', description: 'Grammes par personne.' },
        proteines: { type: 'integer', description: 'Grammes par personne.' },
        estimated: { type: 'boolean', description: "true si les valeurs ne figurent pas sur le document et ont été estimées d'après les ingrédients." },
      },
    },
    prepMin: { type: 'integer', description: 'Minutes de préparation.' },
    cookMin: { type: 'integer', description: 'Minutes de cuisson. 0 si aucune.' },
    ingredients: {
      type: 'array',
      description: "Une entrée par section utilisée, dans l'ordre : À Acheter, Placard, Épices. Ne pas créer de section vide.",
      items: {
        type: 'object', additionalProperties: false, required: ['section', 'items'],
        properties: {
          section: { type: 'string', enum: CN_SECTIONS },
          items: {
            type: 'array',
            items: {
              type: 'object', additionalProperties: false, required: ['q', 'name'],
              properties: {
                q: str("Quantité pour 2 personnes. Chaîne vide pour le sel et le poivre."),
                name: str("Nom de l'ingrédient en minuscules, singulier. Utiliser « (s) » pour les dénombrables : « carotte(s) »."),
              },
            },
          },
        },
      },
    },
    steps: { type: 'array', description: "5 à 9 étapes. Une phrase à l'impératif, vouvoiement. Températures et durées en <strong>…</strong>.", items: { type: 'string' } },
    tips: {
      type: 'array', description: "0 à 2 encadrés. Omettre si le document n'en contient pas.",
      items: {
        type: 'object', additionalProperties: false, required: ['title', 'text'],
        properties: { title: { type: 'string', enum: CN_TIP_TITLES }, text: str('Une phrase courte.') },
      },
    },
    claudy: { type: 'array', description: "Exactement deux conseils de cuisinier, concrets, qui n'apparaissent pas déjà dans les étapes.", items: { type: 'string' } },
    footerTips: {
      type: 'array', description: "Trois entrées : Conseil, Suggestion (accord boisson), Conservation (avec une durée en jours).",
      items: {
        type: 'object', additionalProperties: false, required: ['label', 'text'],
        properties: { label: { type: 'string', enum: CN_FOOTER_LABELS }, text: str('Une phrase.') },
      },
    },
  },
};

/* Une vraie recette du livre, montrée au modèle pour qu'il calque le style. */
export const CN_EXAMPLE = {
  title: 'Filet mignon farci au gorgonzola',
  chapter: 'Low-Carb',
  typeBadges: ['Bœuf'],
  dietTags: ['Sans gluten', 'Sans arachide', 'Sans œuf'],
  nutrition: { kcal: 560, lipides: 27, glucides: 25, proteines: 55, estimated: false },
  prepMin: 15,
  cookMin: 33,
  ingredients: [
    { section: 'À Acheter', items: [
      { q: '400 g', name: 'filet mignon de bœuf' }, { q: '1,5', name: 'carotte(s)' },
      { q: '1', name: 'panais' }, { q: '1', name: 'poire(s)' },
      { q: '80 g', name: 'gorgonzola' }, { q: '20 g', name: 'noisettes' }] },
    { section: 'Placard', items: [
      { q: '0.5 cube', name: 'bouillon de volaille' }, { q: '0.5 càc', name: "huile d'olive" }] },
    { section: 'Épices', items: [
      { q: '1 càc', name: 'thym' }, { q: '', name: 'sel' }, { q: '', name: 'poivre' }] },
  ],
  steps: [
    'Préchauffez le four à <strong>200 °C</strong>.',
    "Coupez les poires en dés, faites-les revenir 3 min avec l'huile d'olive.",
    'Mélangez poires, noisettes hachées et gorgonzola émietté.',
    'Incisez le filet en portefeuille, garnissez de farce, ficelez.',
    'Dorez sur toutes les faces 3 min. Ajoutez légumes + bouillon + thym. Enfournez <strong>30 min</strong>.',
    'Servez en tranches avec les légumes et le jus de cuisson.',
  ],
  tips: [{ title: 'Astuce Airfryer', text: '−10/20 °C · −20/30 % de temps.' }],
  claudy: [
    "Ficelez bien le filet : sans ficelle la farce s'échappe à la cuisson.",
    'Préférez le gorgonzola doux — il fond mieux et est moins salé.',
  ],
  footerTips: [
    { label: 'Conseil', text: 'La température à cœur idéale est 63 °C pour un filet rosé et juteux.' },
    { label: 'Suggestion', text: 'Un verre de vin blanc sec type Riesling.' },
    { label: 'Conservation', text: '2 jours au frigo · réchauffer au four à 160 °C couvert d\'aluminium.' },
  ],
};

export const CN_SYSTEM_PROMPT = `Tu transcris des recettes photographiées dans le format exact du livre « Chez nous à Paris » de Manon & Valentin. Une recette que tu produis doit être indiscernable des 60 existantes.

RÈGLES DE LA MAISON

Portions — toutes les recettes du livre sont pour 2 personnes. Si le document en indique un autre nombre, convertis toutes les quantités.

Quantités — les légumes et fruits dénombrables se comptent en unités, pas en grammes : « 1,5 carotte(s) », « 2 courgette(s) », jamais « 150 g de carottes ». Les viandes, poissons, fromages, riz, pâtes et féculents restent en grammes. Le sel et le poivre n'ont pas de quantité (chaîne vide).

Sections — « À Acheter » pour le frais et tout ce qui se rachète (viande, légumes, fromages, pâtes, riz, coulis, tortillas). « Placard » uniquement pour les vrais fonds de placard : huiles, vinaigres, sauces, moutarde, miel, sucre, farine, bouillon. « Épices » pour les épices et herbes sèches.

Étapes — 5 à 9 étapes, une phrase chacune, à l'impératif et au vouvoiement. Les températures et les durées de cuisson vont entre <strong> et </strong>. C'est le seul balisage autorisé.

Claudy — exactement deux conseils, ceux d'un cuisinier qui a déjà raté le plat. Ils doivent apporter quelque chose qui n'est pas déjà dans les étapes.

Nutrition — par personne. Si le document donne les valeurs, reprends-les et mets estimated à false. Sinon estime-les d'après les ingrédients et mets estimated à true. N'invente jamais de valeurs en prétendant qu'elles viennent du document.

Chapitre — Low-Carb sous 30 g de glucides, High-Carb au-dessus de 60 g, Post Training pour les plats riches en protéines destinés à la récupération. Petit Déjeuner et Encas seulement si c'en est un.

Plusieurs pages — quand on te donne plusieurs images, ce sont les pages successives d'une même recette, dans l'ordre. Elles produisent une seule fiche. Les ingrédients et les étapes peuvent être répartis entre les pages ; un titre, une photo ou un tableau nutritionnel peuvent réapparaître d'une page à l'autre. Fusionne sans dupliquer, et numérote les étapes dans l'ordre de lecture.

Ne transcris que ce que tu vois. Si le document est illisible ou n'est pas une recette, ne fabrique rien.

EXEMPLE DE SORTIE ATTENDUE

${JSON.stringify(CN_EXAMPLE, null, 1)}`;
