/* ── Le Panier — référentiel produits ──
   Les rayons sont ordonnés comme on traverse réellement le magasin :
   on descend la liste de haut en bas sans revenir sur ses pas. */

export const CN_RAYONS = [
  { id: 'legumes',     label: 'Fruits & légumes',       icon: 'leaf',   color: '#506741', soft: '#EDF1E7' },
  { id: 'boucherie',   label: 'Boucherie & poisson',    icon: 'flame',  color: '#B85C38', soft: '#FBEDE7' },
  { id: 'cremerie',    label: 'Crèmerie & œufs',        icon: 'egg',    color: '#D4952A', soft: '#FFF8E9' },
  { id: 'boulangerie', label: 'Pain & petit-déjeuner',  icon: 'bread',  color: '#A8763E', soft: '#F9F1E7' },
  { id: 'epicerie',    label: 'Épicerie',               icon: 'pot',    color: '#8A6B4A', soft: '#F5EFE6' },
  { id: 'epices',      label: 'Épices & condiments',    icon: 'sparkles', color: '#9C6B3E', soft: '#F7F0E6' },
  { id: 'surgeles',    label: 'Surgelés',               icon: 'snow',   color: '#2E8B85', soft: '#E7F1F0' },
  { id: 'boissons',    label: 'Boissons',               icon: 'glass',  color: '#5C6FAE', soft: '#EEF1FB' },
  { id: 'hygiene',     label: 'Hygiène & beauté',       icon: 'drop',   color: '#7A6BA8', soft: '#F1EEF9' },
  { id: 'entretien',   label: 'Entretien & ménage',     icon: 'spray',  color: '#3E8A82', soft: '#E8F3F1' },
  { id: 'maison',      label: 'Maison & divers',        icon: 'box',    color: '#8C8780', soft: '#F1EFEB' },
];
export const cnRayonMeta = (id) => CN_RAYONS.find(r => r.id === id) || CN_RAYONS[CN_RAYONS.length - 1];

/* ── Catalogue de départ ──
   `days` = intervalle par défaut avant tout historique : il rend l'app utile
   dès le premier jour, puis s'efface au profit du rythme réellement observé. */
export const CN_SEED_PRODUCTS = [
  /* Hygiène */
  { id: 'papier-toilette',  name: 'Papier toilette',        rayon: 'hygiene',   days: 21 },
  { id: 'mouchoirs',        name: 'Mouchoirs',              rayon: 'hygiene',   days: 30 },
  { id: 'savon-mains',      name: 'Savon pour les mains',   rayon: 'hygiene',   days: 45 },
  { id: 'gel-douche',       name: 'Gel douche',             rayon: 'hygiene',   days: 40 },
  { id: 'shampoing',        name: 'Shampoing',              rayon: 'hygiene',   days: 45 },
  { id: 'deodorant',        name: 'Déodorant',              rayon: 'hygiene',   days: 60 },
  { id: 'dentifrice',       name: 'Dentifrice',             rayon: 'hygiene',   days: 45 },
  { id: 'brosse-dents',     name: 'Brosse à dents',         rayon: 'hygiene',   days: 90 },
  { id: 'rasoirs',          name: 'Rasoirs / lames',        rayon: 'hygiene',   days: 75 },
  { id: 'cotons',           name: 'Cotons démaquillants',   rayon: 'hygiene',   days: 45 },
  { id: 'coton-tiges',      name: 'Coton-tiges',            rayon: 'hygiene',   days: 120 },
  { id: 'creme-hydratante', name: 'Crème hydratante',       rayon: 'hygiene',   days: 75 },
  /* Entretien */
  { id: 'lessive',          name: 'Lessive',                rayon: 'entretien', days: 45 },
  { id: 'adoucissant',      name: 'Adoucissant',            rayon: 'entretien', days: 60 },
  { id: 'liquide-vaisselle',name: 'Liquide vaisselle',      rayon: 'entretien', days: 35 },
  { id: 'tablettes-lv',     name: 'Tablettes lave-vaisselle', rayon: 'entretien', days: 45 },
  { id: 'eponges',          name: 'Éponges',                rayon: 'entretien', days: 30 },
  { id: 'sacs-poubelle',    name: 'Sacs poubelle',          rayon: 'entretien', days: 40 },
  { id: 'essuie-tout',      name: 'Essuie-tout',            rayon: 'entretien', days: 21 },
  { id: 'nettoyant-multi',  name: 'Nettoyant multi-usage',  rayon: 'entretien', days: 60 },
  { id: 'nettoyant-sols',   name: 'Nettoyant sols',         rayon: 'entretien', days: 75 },
  { id: 'nettoyant-wc',     name: 'Nettoyant WC',           rayon: 'entretien', days: 45 },
  { id: 'papier-alu',       name: 'Papier aluminium',       rayon: 'entretien', days: 120 },
  { id: 'film-etirable',    name: 'Film étirable',          rayon: 'entretien', days: 120 },
  { id: 'papier-cuisson',   name: 'Papier cuisson',         rayon: 'entretien', days: 90 },
  /* Maison */
  { id: 'piles',            name: 'Piles',                  rayon: 'maison',    days: 180 },
  { id: 'ampoules',         name: 'Ampoules',               rayon: 'maison',    days: 240 },
  { id: 'bougies',          name: 'Bougies',                rayon: 'maison',    days: 120 },
  /* Crèmerie */
  { id: 'lait',             name: 'Lait',                   rayon: 'cremerie',  days: 7 },
  { id: 'beurre',           name: 'Beurre',                 rayon: 'cremerie',  days: 21 },
  { id: 'oeufs',            name: 'Œufs',                   rayon: 'cremerie',  days: 10 },
  { id: 'yaourts',          name: 'Yaourts',                rayon: 'cremerie',  days: 10 },
  { id: 'fromage-rape',     name: 'Fromage râpé',           rayon: 'cremerie',  days: 21 },
  /* Pain & petit-déjeuner */
  { id: 'pain-de-mie',      name: 'Pain de mie',            rayon: 'boulangerie', days: 10 },
  { id: 'cereales',         name: 'Céréales',               rayon: 'boulangerie', days: 21 },
  { id: 'confiture',        name: 'Confiture',              rayon: 'boulangerie', days: 45 },
  /* Épicerie */
  { id: 'cafe',             name: 'Café',                   rayon: 'epicerie',  days: 30 },
  { id: 'the',             name: 'Thé / infusions',        rayon: 'epicerie',  days: 60 },
  { id: 'huile-olive',      name: "Huile d'olive",          rayon: 'epicerie',  days: 45 },
  { id: 'riz',              name: 'Riz',                    rayon: 'epicerie',  days: 45 },
  { id: 'pates',            name: 'Pâtes',                  rayon: 'epicerie',  days: 21 },
  { id: 'farine',           name: 'Farine',                 rayon: 'epicerie',  days: 60 },
  { id: 'sucre',            name: 'Sucre',                  rayon: 'epicerie',  days: 90 },
  { id: 'miel',             name: 'Miel',                   rayon: 'epicerie',  days: 90 },
  { id: 'chocolat',         name: 'Chocolat',               rayon: 'epicerie',  days: 21 },
  { id: 'biscuits',         name: 'Biscuits',               rayon: 'epicerie',  days: 14 },
  { id: 'chips',            name: 'Chips / apéritif',       rayon: 'epicerie',  days: 21 },
  /* Épices */
  { id: 'sel',              name: 'Sel',                    rayon: 'epices',    days: 120 },
  { id: 'poivre',           name: 'Poivre',                 rayon: 'epices',    days: 150 },
  /* Boissons */
  { id: 'eau-petillante',   name: 'Eau pétillante',         rayon: 'boissons',  days: 14 },
  { id: 'jus-orange',       name: "Jus d'orange",           rayon: 'boissons',  days: 10 },
  { id: 'biere',            name: 'Bière',                  rayon: 'boissons',  days: 21 },
  { id: 'vin',              name: 'Vin',                    rayon: 'boissons',  days: 21 },
];

/* ── Classement automatique d'un nom en rayon ──
   Sert aux ingrédients des recettes et aux ajouts libres ; les produits du
   catalogue portent déjà leur rayon. Première règle qui matche = gagnante,
   d'où le bloc d'exceptions en tête (« crème de coco » n'est pas de la crème). */
const CN_RAYON_RULES = [
  ['epices',    ['ail en poudre', 'gingembre en poudre', 'oignon en poudre', 'piment']],
  ['legumes',   ['gingembre frais', 'herbes fraiches', 'basilic', 'coriandre fraiche', 'persil', 'ciboulette', 'aneth', 'menthe', 'estragon']],
  ['epicerie',  ['coulis de tomate', 'concentre de tomate', 'pulpe de tomate', 'chair de tomate', 'tomates sechees', 'tomate pelee', 'mais en conserve', 'mais cuit', 'jus de citron', 'zeste de citron', 'lait de coco', 'creme de coco', 'lait d amande', 'lait de soja', 'creme de soja', 'lait vegetal', 'vegetal', 'vegetale', 'tofu', 'houmous', 'pesto', 'olives', 'cornichons', 'bouillon', 'sauce', 'vinaigre', 'gnocchi', 'eau ou bouillon']],
  ['hygiene',   ['papier toilette', 'papier hygienique', 'mouchoir', 'savon', 'gel douche', 'shampoing', 'deodorant', 'dentifrice', 'brosse a dent', 'fil dentaire', 'bain de bouche', 'rasoir', 'mousse a raser', 'coton', 'demaquillant', 'creme hydratante', 'protection hygienique', 'serviette hygienique', 'tampon', 'couche', 'lingette', 'parfum', 'pansement', 'paracetamol', 'doliprane']],
  ['entretien', ['lessive', 'adoucissant', 'liquide vaisselle', 'lave-vaisselle', 'eponge', 'sac poubelle', 'sacs poubelle', 'essuie-tout', 'sopalin', 'nettoyant', 'detergent', 'javel', 'desinfectant', 'anticalcaire', 'detachant', 'papier aluminium', 'papier alu', 'film etirable', 'papier cuisson', 'sac congelation', 'balai', 'serpillere']],
  ['maison',    ['pile', 'ampoule', 'bougie', 'allume-feu', 'charbon']],
  ['epices',    ['epice', 'sel', 'poivre', 'curry', 'cumin', 'paprika', 'curcuma', 'cannelle', 'massala', 'masala', 'zaatar', 'origan', 'thym', 'laurier', 'herbes de provence', 'chili', 'muscade', 'safran', 'vanille', 'ras el hanout', 'fleur de sel']],
  ['boucherie', ['poulet', 'dinde', 'bœuf', 'boeuf', 'porc', 'agneau', 'veau', 'canard', 'lapin', 'lardon', 'bacon', 'jambon', 'saucisse', 'chorizo', 'steak', 'hache', 'roti', 'filet mignon', 'escalope', 'cuisse', 'magret', 'merguez', 'poisson', 'saumon', 'cabillaud', 'lieu', 'colin', 'truite', 'thon', 'crevette', 'moule', 'gambas', 'calamar', 'sardine', 'maquereau', 'saint-jacques', 'surimi']],
  ['cremerie',  ['lait', 'creme', 'beurre', 'yaourt', 'fromage', 'feta', 'mozzarella', 'parmesan', 'gruyere', 'cheddar', 'ricotta', 'gorgonzola', 'brebis', 'chevre', 'comte', 'emmental', 'skyr', 'œuf', 'oeuf', 'margarine', 'mascarpone', 'burrata']],
  ['boulangerie', ['pain', 'baguette', 'tortilla', 'wrap', 'pita', 'hamburger', 'galette', 'brick', 'brioche', 'biscotte', 'croissant', 'muffin', 'cereales', 'muesli', 'granola', 'flocons d avoine']],
  ['surgeles',  ['surgele', 'glace', 'sorbet', 'nuggets']],
  ['boissons',  ['eau petillante', 'eau plate', 'eau gazeuse', 'jus', 'soda', 'coca', 'biere', 'vin rouge', 'vin blanc', 'cidre', 'limonade', 'cafe', 'the vert', 'the noir', 'tisane', 'infusion', 'sirop']],
  ['legumes',   ['ail', 'gingembre', 'oignon', 'echalote', 'cebette', 'poireau', 'carotte', 'panais', 'celeri', 'navet', 'radis', 'betterave', 'courgette', 'aubergine', 'poivron', 'tomate', 'champignon', 'shitake', 'brocoli', 'chou', 'epinard', 'mache', 'roquette', 'salade', 'pousses', 'haricot vert', 'haricots vert', 'patate douce', 'pomme de terre', 'pommes de terre', 'courge', 'butternut', 'potiron', 'avocat', 'citron', 'poire', 'pomme', 'banane', 'orange', 'fraise', 'framboise', 'myrtille', 'raisin', 'peche', 'abricot', 'mangue', 'ananas', 'kiwi', 'melon', 'pasteque', 'concombre', 'fenouil', 'asperge', 'artichaut', 'endive', 'pak choi', 'epi de mais', 'petits pois', 'rhubarbe', 'grenade']],
];

/* Normalisation « nom de produit » : sans accents, sans les pluriels entre
   parenthèses des données (« poireau(x) »), apostrophes en espaces. */
export function cnProdNorm(s) {
  return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/œ/g, 'oe').replace(/æ/g, 'ae')
    .replace(/\((s|x|es)\)/g, '').replace(/[’'`]/g, ' ').replace(/\s+/g, ' ').trim();
}

/* Matche un mot-clé en début de mot — « vin » ne doit pas attraper « vinaigre »,
   mais « tortilla » doit attraper « mini-tortillas ». */
function cnStartsWord(hay, kw) {
  let from = 0;
  for (;;) {
    const i = hay.indexOf(kw, from);
    if (i < 0) return false;
    if (i === 0 || !/[a-z0-9]/.test(hay[i - 1])) return true;
    from = i + 1;
  }
}

/* `null` quand aucune règle ne reconnaît le nom. La différence compte : un
   ingrédient inconnu est presque toujours de l'épicerie, mais un produit que
   vous créez à la main peut être n'importe quoi — et on ne va pas lui inventer
   un poids d'achat. */
export function cnRayonOrNull(name) {
  const n = cnProdNorm(name);
  if (!n) return null;
  for (const [rayon, kws] of CN_RAYON_RULES) {
    if (kws.some(kw => cnStartsWord(n, kw))) return rayon;
  }
  return null;
}

export function cnRayon(name) {
  return cnRayonOrNull(name) || 'epicerie';
}

/* Entrées parasites présentes dans les données de recettes. */
const CN_JUNK = ['(au gout)', '(facultatif)', 'au gout', 'facultatif'];
export function cnIsJunkIngredient(name) {
  const n = cnProdNorm(name);
  return !n || CN_JUNK.includes(n);
}

/* ── Unité d'achat d'un produit ──
   Ce qu'on achète ne se compte pas de la même façon selon le produit : une
   courgette à la pièce, du chocolat en grammes, du lait en litres, de la
   lessive au flacon. Sans ça, l'ajusteur de quantité propose des nombres qui
   ne veulent rien dire.

   Chaque règle donne l'unité, le pas d'incrément et la quantité proposée par
   défaut — celle d'un achat courant en drive, pas celle d'une recette : on
   n'achète pas 2 cl de vinaigre, on achète la bouteille.

   Premier motif qui commence un mot gagne, comme pour les rayons : les
   exceptions passent donc d'abord, avant les familles génériques. */
const CN_UNIT_RULES = [
  /* — exceptions : ces noms contiennent un mot d'une famille plus large — */
  ['creme hydratante', 'tube', 1, 1],       // pas de la crème fraîche
  ['creme solaire', 'tube', 1, 1],
  ['lait de coco', 'brique', 1, 1],         // ni du lait de vache
  ['creme de coco', 'brique', 1, 1],
  ['huile de coco', 'pot', 1, 1],
  ['jus de citron', 'ml', 25, 100],         // le petit flacon, pas le litre
  ['eau petillante', 'pack', 1, 1],         // ni la bouteille : le pack
  ['eau gazeuse', 'pack', 1, 1],
  ['eau plate', 'pack', 1, 1],
  ['eau minerale', 'pack', 1, 1],
  ['eau de fleur', 'ml', 50, 100],
  ['eau', '', 1, 1],                        // « eau ou bouillon » : rien à acheter
  ['tomates sechees', 'pot', 1, 1],
  ['tomate sechee', 'pot', 1, 1],
  ['chair de tomate', 'brique', 1, 1],
  ['zeste', '', 1, 1],                      // un citron, pas 250 g de zeste
  ['tortilla', 'paquet', 1, 1],             // « tortilla de maïs » n'est pas du maïs
  ['wrap', 'paquet', 1, 1],
  ['gnocchi', 'paquet', 1, 1],              // ni « gnocchis de pomme de terre » des pommes de terre
  ['hamburger', 'lot', 1, 1],               // ni « pains à hamburger » du pain à la pièce
  ['noix de coco', '', 1, 1],
  ['noix de muscade', 'sachet', 1, 1],
  ['lait de poule', '', 1, 1],
  ['sauce tomate', 'pot', 1, 1],
  ['pomme de terre', 'g', 250, 1000],
  ['pommes de terre', 'g', 250, 1000],

  /* — liquides : à la bouteille, comptés en ml ou en L — */
  ['huile', 'ml', 100, 500], ['vinaigre', 'ml', 100, 500], ['sauce', 'ml', 100, 250],
  ['lait', 'L', 1, 1], ['creme', 'ml', 100, 200], ['jus', 'L', 1, 1],
  ['soda', 'pack', 1, 1], ['coca', 'pack', 1, 1], ['limonade', 'L', 1, 1],
  ['biere', 'pack', 1, 1], ['vin', 'bouteille', 1, 1], ['cidre', 'bouteille', 1, 1],
  ['sirop', 'ml', 100, 500],

  /* — entretien, hygiène, maison : au contenant — */
  ['lessive', 'flacon', 1, 1], ['adoucissant', 'flacon', 1, 1], ['liquide vaisselle', 'flacon', 1, 1],
  ['nettoyant', 'flacon', 1, 1], ['javel', 'flacon', 1, 1], ['desinfectant', 'flacon', 1, 1],
  ['gel douche', 'flacon', 1, 1], ['shampoing', 'flacon', 1, 1], ['savon', 'flacon', 1, 1],
  ['dentifrice', 'tube', 1, 1], ['deodorant', '', 1, 1], ['parfum', '', 1, 1],
  ['papier toilette', 'lot', 1, 1], ['papier hygienique', 'lot', 1, 1],
  ['mouchoirs', 'lot', 1, 1], ['essuie-tout', 'lot', 1, 1], ['sopalin', 'lot', 1, 1],
  ['sacs poubelle', 'lot', 1, 1], ['sac poubelle', 'lot', 1, 1], ['sac congelation', 'lot', 1, 1],
  ['eponges', 'lot', 1, 1], ['eponge', 'lot', 1, 1], ['tablettes', 'lot', 1, 1],
  ['cotons', 'lot', 1, 1], ['coton-tiges', 'lot', 1, 1], ['coton', 'lot', 1, 1],
  ['lingettes', 'lot', 1, 1], ['rasoirs', 'lot', 1, 1], ['rasoir', 'lot', 1, 1],
  ['brosse a dents', '', 1, 1], ['fil dentaire', '', 1, 1], ['bain de bouche', 'flacon', 1, 1],
  ['piles', 'lot', 1, 1], ['ampoules', '', 1, 1], ['ampoule', '', 1, 1], ['bougies', 'lot', 1, 1],
  ['papier aluminium', '', 1, 1], ['papier alu', '', 1, 1], ['papier cuisson', '', 1, 1],
  ['film etirable', '', 1, 1], ['pansement', 'boîte', 1, 1], ['paracetamol', 'boîte', 1, 1],

  /* — épicerie sèche : au poids — */
  ['chocolat', 'g', 50, 200], ['cacao', 'g', 50, 250],
  ['riz', 'g', 100, 500], ['pates', 'g', 100, 500], ['linguine', 'g', 100, 500],
  ['spaghettis', 'g', 100, 500], ['tagliatelles', 'g', 100, 500], ['orzo', 'g', 100, 500],
  ['quinoa', 'g', 100, 500], ['boulgour', 'g', 100, 500], ['semoule', 'g', 100, 500],
  ['lentilles', 'g', 100, 250], ['pois chiches', 'g', 100, 250],
  ['haricots blancs', 'g', 100, 250], ['haricots rouges', 'g', 100, 250],
  ['farine', 'g', 100, 1000], ['sucre', 'g', 100, 1000],
  ['flocons', 'g', 100, 500], ['chapelure', 'g', 50, 200], ['fecule', 'g', 50, 200],
  ['noisettes', 'g', 25, 100], ['amandes', 'g', 25, 100], ['noix', 'g', 25, 100],
  ['cacahuetes', 'g', 25, 100], ['pignons', 'g', 25, 50], ['graines', 'g', 25, 100],
  ['olives', 'g', 25, 100], ['raisins secs', 'g', 25, 100],

  /* — épicerie au contenant : bocaux, boîtes, paquets — */
  ['cafe', 'g', 50, 250], ['the', 'boîte', 1, 1], ['tisane', 'boîte', 1, 1], ['infusion', 'boîte', 1, 1],
  ['biscuits', 'paquet', 1, 1], ['chips', 'paquet', 1, 1], ['cereales', 'paquet', 1, 1],
  ['muesli', 'paquet', 1, 1], ['granola', 'paquet', 1, 1], ['biscotte', 'paquet', 1, 1],
  ['confiture', 'pot', 1, 1], ['miel', 'pot', 1, 1], ['moutarde', 'pot', 1, 1],
  ['mayonnaise', 'pot', 1, 1], ['pesto', 'pot', 1, 1], ['houmous', 'pot', 1, 1],
  ['cornichons', 'pot', 1, 1], ['tahini', 'pot', 1, 1], ['compote', 'lot', 1, 1],
  ['coulis', 'brique', 1, 1], ['pulpe', 'brique', 1, 1], ['concentre', 'boîte', 1, 1],
  ['tomate pelee', 'boîte', 1, 1], ['tomates pelees', 'boîte', 1, 1],
  ['conserve', 'boîte', 1, 1], ['mais', 'boîte', 1, 1], ['bouillon', 'boîte', 1, 1],
  ['levure', 'sachet', 1, 1], ['gnocchi', 'paquet', 1, 1],

  /* — épices : sel et poivre au paquet, le reste au sachet — */
  ['fleur de sel', 'boîte', 1, 1], ['sel', 'paquet', 1, 1], ['poivre', 'moulin', 1, 1],
  ['epices', 'sachet', 1, 1], ['epice', 'sachet', 1, 1], ['curry', 'sachet', 1, 1],
  ['paprika', 'sachet', 1, 1], ['cumin', 'sachet', 1, 1], ['curcuma', 'sachet', 1, 1],
  ['cannelle', 'sachet', 1, 1], ['origan', 'sachet', 1, 1], ['chili', 'sachet', 1, 1],
  ['laurier', 'sachet', 1, 1], ['herbes de provence', 'sachet', 1, 1],
  ['massala', 'sachet', 1, 1], ['masala', 'sachet', 1, 1], ['zaatar', 'sachet', 1, 1],
  ['safran', 'sachet', 1, 1], ['vanille', 'sachet', 1, 1], ['ras el hanout', 'sachet', 1, 1],
  ['muscade', 'sachet', 1, 1], ['piment', 'sachet', 1, 1],
  ['ail en poudre', 'sachet', 1, 1], ['gingembre en poudre', 'sachet', 1, 1],
  ['oignon en poudre', 'sachet', 1, 1],

  /* — herbes fraîches : à la botte — */
  ['thym', 'botte', 1, 1], ['basilic', 'botte', 1, 1], ['coriandre', 'botte', 1, 1],
  ['persil', 'botte', 1, 1], ['ciboulette', 'botte', 1, 1], ['aneth', 'botte', 1, 1],
  ['menthe', 'botte', 1, 1], ['estragon', 'botte', 1, 1],
  ['herbes fraiches', 'botte', 1, 1], ['radis', 'botte', 1, 1],

  /* — viandes, poissons, fromages : au poids — */
  ['boeuf', 'g', 50, 400], ['porc', 'g', 50, 400], ['poulet', 'g', 50, 300],
  ['dinde', 'g', 50, 300], ['agneau', 'g', 50, 400], ['veau', 'g', 50, 400],
  ['canard', 'g', 50, 300], ['lapin', 'g', 50, 400],
  ['jambon', 'g', 50, 200], ['lardon', 'g', 50, 150], ['bacon', 'g', 50, 150],
  ['chorizo', 'g', 50, 150], ['saucisse', '', 1, 4], ['merguez', '', 1, 4],
  ['steak', '', 1, 2], ['escalope', '', 1, 2], ['cuisse', '', 1, 2], ['magret', '', 1, 2],
  ['filet mignon', 'g', 50, 400], ['roti', 'g', 100, 800], ['pave', '', 1, 2],
  ['saumon', 'g', 50, 300], ['cabillaud', 'g', 50, 300], ['truite', 'g', 50, 300],
  ['poisson', 'g', 50, 300], ['crevettes', 'g', 50, 200], ['gambas', 'g', 50, 200],
  ['moules', 'g', 250, 1000], ['saint-jacques', '', 1, 6], ['surimi', 'lot', 1, 1],
  ['thon', 'boîte', 1, 2], ['sardine', 'boîte', 1, 2], ['maquereau', 'boîte', 1, 2],
  ['tofu', 'g', 50, 200],

  /* — crèmerie — */
  ['oeufs', 'boîte', 1, 1], ['oeuf', 'boîte', 1, 1],
  ['gorgonzola', 'g', 50, 100], ['feta', 'g', 50, 200], ['mozzarella', 'g', 50, 125],
  ['parmesan', 'g', 25, 100], ['gruyere', 'g', 50, 200], ['cheddar', 'g', 50, 200],
  ['emmental', 'g', 50, 200], ['comte', 'g', 50, 200], ['burrata', '', 1, 2],
  ['ricotta', 'pot', 1, 1], ['mascarpone', 'pot', 1, 1], ['fromage blanc', 'pot', 1, 1],
  ['fromage', 'g', 50, 200], ['beurre', 'g', 50, 250], ['margarine', 'pot', 1, 1],
  ['yaourts', 'lot', 1, 1], ['yaourt', 'lot', 1, 1], ['skyr', 'pot', 1, 1],

  /* — boulangerie — */
  ['pain', '', 1, 1], ['baguette', '', 1, 1], ['brioche', '', 1, 1],
  ['tortilla', 'paquet', 1, 1], ['wrap', 'paquet', 1, 1], ['pita', 'paquet', 1, 1],
  ['galette', 'paquet', 1, 1], ['brick', 'paquet', 1, 1], ['hamburger', 'lot', 1, 1],
  ['croissant', '', 1, 2], ['muffin', '', 1, 2],

  /* — légumes vendus au poids plutôt qu'à la pièce — */
  ['haricots verts', 'g', 100, 500], ['epinards', 'g', 100, 300], ['champignons', 'g', 100, 250],
  ['tomates cerises', 'g', 50, 250], ['roquette', 'g', 50, 100], ['mache', 'g', 50, 100],
  ['jeunes pousses', 'g', 50, 100], ['petits pois', 'g', 100, 500],
  ['fraise', 'g', 250, 500], ['framboise', 'g', 125, 250], ['myrtille', 'g', 125, 250],
  ['raisin', 'g', 250, 500], ['cerise', 'g', 250, 500],
  /* l'ail se vend à la tête, le gingembre au rhizome — jamais « 2 gousses » */
  ['ail', 'tête', 1, 1], ['gingembre', '', 1, 1],
];

/* Unité par défaut quand aucun motif ne correspond, d'après le rayon. */
const CN_UNIT_BY_RAYON = {
  legumes: ['', 1, 2], boucherie: ['g', 50, 300], cremerie: ['g', 50, 200],
  boulangerie: ['', 1, 1], epicerie: ['g', 50, 250], epices: ['sachet', 1, 1],
  surgeles: ['g', 100, 500], boissons: ['L', 1, 1],
  hygiene: ['', 1, 1], entretien: ['', 1, 1], maison: ['', 1, 1],
};

/* { unit, step, qty } — l'unité peut être vide : on compte alors à la pièce. */
export function cnUnitFor(name, rayon) {
  const n = cnProdNorm(name);
  for (const [pat, unit, step, qty] of CN_UNIT_RULES) {
    if (cnStartsWord(n, pat)) return { unit, step, qty };
  }
  const [unit, step, qty] = CN_UNIT_BY_RAYON[rayon || cnRayon(name)] || ['', 1, 1];
  return { unit, step, qty };
}

/* « 200 g », « 3 », « 2 briques » — la quantité telle qu'on l'affiche.
   Les contenants s'accordent : on écrit « 2 boîtes », pas « 2 boîte ». */
const CN_UNIT_INVARIABLE = ['g', 'ml', 'cl', 'L', 'kg', 'l'];
export function cnFormatQty(qty, unit) {
  const q = String(qty).replace('.', ',');
  if (!unit) return q;
  const plural = Number(qty) > 1 && !CN_UNIT_INVARIABLE.includes(unit) && !/[sx]$/.test(unit);
  return `${q} ${plural ? unit + 's' : unit}`;
}

/* Quantité d'achat proposée pour un produit sans quantité connue. */
export function cnDefaultQty(name, rayon) {
  const u = cnUnitFor(name, rayon);
  return cnFormatQty(u.qty, u.unit);
}

/* ── Pas d'incrément selon l'unité ──
   Un + sur du chocolat ajoute 50 g ; un + sur une courgette ajoute 1 courgette.
   Le pas grandit avec la quantité : on ne passe pas de 500 g à 550 g. */
export function cnQtyStep(unit, n) {
  const q = Number(n) || 0;
  if (unit === 'g')  return q >= 500 ? 100 : q >= 150 ? 50 : 25;
  if (unit === 'ml') return q >= 500 ? 100 : q >= 150 ? 50 : 25;
  if (unit === 'cl') return q >= 50 ? 10 : 5;
  if (unit === 'L')  return q >= 2 ? 1 : 0.5;
  if (unit === 'kg') return q >= 2 ? 1 : 0.5;
  return 1;   /* pièces et contenants : jamais de demi-flacon */
}

/* Unités de recette dont le pas doit rester fin (« 1,5 càs »). */
const CN_SPOON_UNITS = ['cas', 'cac', 'c a s', 'c a c', 'cuillere', 'cuilleres', 'pincee', 'pincees', 'cube', 'cubes', 'gousse', 'gousses', 'brin', 'brins'];
export function cnIsSpoonUnit(unit) {
  return CN_SPOON_UNITS.includes(cnProdNorm(unit || ''));
}

/* Trois ou quatre quantités plausibles, prêtes à poser en un geste.
   On bascule sur le kilo et le litre là où on les écrirait à la main. */
export function cnQtyChoices(unit) {
  if (unit === 'g')  return ['100 g', '250 g', '500 g', '1 kg'];
  if (unit === 'ml') return ['100 ml', '250 ml', '500 ml', '1 L'];
  if (unit === 'L')  return ['1 L', '2 L', '6 L'];
  if (unit === '')   return ['1', '2', '4', '6'];
  return [1, 2, 3].map(n => cnFormatQty(n, unit));
}

/* « en grammes », « à la pièce », « au flacon » — comment se compte ce produit. */
const CN_UNIT_FEM = ['boîte', 'bouteille', 'botte', 'brique', 'tête'];
export function cnUnitHint(unit) {
  if (!unit) return 'à la pièce';
  if (unit === 'g') return 'en grammes';
  if (unit === 'ml') return 'en millilitres';
  if (unit === 'L') return 'en litres';
  return (CN_UNIT_FEM.includes(unit) ? 'à la ' : 'au ') + unit;
}

/* ────────────────────────────────────────────────────────────────────────
   Du besoin d'une recette au format qu'on peut commander
   ────────────────────────────────────────────────────────────────────────
   Une recette réclame 204 ml de lait de soja, 2 gousses d'ail, 8,5 aubergines.
   Un drive ne vend rien de tout ça. Sans traduction, la liste est jolie et
   inutilisable — c'était le cas de 42 % des lignes que produisent les recettes.
   On traduit donc le besoin en ce qu'on met vraiment dans le panier, et on
   garde le besoin d'origine à côté pour que rien ne se perde. */

/* Nombre en tête d'une chaîne, sans dépendre de React : « 204 ml » → 204, ml. */
export function cnSplitQty(q) {
  const m = String(q || '').match(/^\s*([\d.,]+)\s*(.*)$/);
  if (!m) return { n: null, unit: String(q || '').trim() };
  return { n: parseFloat(m[1].replace(',', '.')), unit: m[2].trim() };
}

/* Unités qui décrivent un geste de cuisine, pas un achat. Le nombre qui les
   accompagne ne dit rien du conditionnement : 10 feuilles de basilic, ça reste
   une botte. */
const CN_KITCHEN_UNITS = ['feuille', 'feuilles', 'tranche', 'tranches', 'branche', 'branches',
  'filet', 'filets', 'poignee', 'poignees', 'bouquet', 'bouquets', 'trait', 'traits',
  'goutte', 'gouttes', 'morceau', 'morceaux', 'boule', 'boules', 'portion', 'portions',
  'rondelle', 'rondelles', 'lamelle', 'lamelles', 'batonnet', 'batonnets'];

/* Conditionnements qui se comptent en articles, pas en grammes. */
const CN_CONTAINER_UNITS = ['boîte', 'pot', 'brique', 'paquet', 'sachet', 'flacon', 'lot',
  'botte', 'tube', 'moulin', 'bouteille', 'pack', 'tête', 'bocal'];
export function cnIsContainer(unit) { return CN_CONTAINER_UNITS.includes(unit); }

/* ── Contenance des conditionnements courants, en g ou ml ──
   Sert à répondre « combien d'articles ? » quand la recette pèse et que le
   produit se vend au contenant : 880 g de coulis, ce sont deux briques.
   Ordres de grandeur de rayon, volontairement ronds. */
const CN_PACK_SIZES = [
  ['coulis', 500], ['pulpe', 400], ['tomates pelees', 400], ['tomate pelee', 400],
  ['chair de tomate', 400], ['sauce tomate', 400], ['concentre', 140],
  ['mais', 300], ['haricots rouges', 400], ['haricots blancs', 400],
  ['pois chiches', 400], ['lentilles', 400], ['flageolets', 400],
  ['thon', 140], ['sardine', 120], ['maquereau', 120], ['surimi', 200],
  ['pesto', 190], ['houmous', 200], ['tapenade', 100], ['tahini', 300],
  ['confiture', 350], ['miel', 250], ['moutarde', 200], ['mayonnaise', 250],
  ['cornichons', 200], ['compote', 400],
  ['ricotta', 250], ['mascarpone', 250], ['fromage blanc', 500], ['skyr', 450],
  ['yaourt', 500], ['creme de coco', 400], ['lait de coco', 400],
  ['tofu', 200], ['margarine', 250], ['bouillon', 60],
];
function cnPackSize(name) {
  const n = cnProdNorm(name);
  for (const [pat, size] of CN_PACK_SIZES) if (cnStartsWord(n, pat)) return size;
  return null;
}

/* Formats réellement vendus en rayon. On monte au suivant, jamais on ne descend :
   une recette qui demande 194 ml de crème fait acheter le pot de 200. */
const CN_LADDER_G  = [50, 100, 125, 150, 200, 250, 300, 400, 500, 750, 1000, 1500, 2000, 2500, 3000];
const CN_LADDER_ML = [100, 200, 250, 330, 500, 750, 1000, 1500, 2000, 3000];
function cnSnapUp(n, ladder) {
  return ladder.find(v => v >= n - 0.001) || Math.ceil(n / 1000) * 1000;
}

/* Au-delà du kilo ou du litre, on écrit comme on le dirait. */
function cnFormatMass(n, unit) {
  if (unit === 'g' && n >= 1000) return cnFormatQty(Math.round(n / 100) / 10, 'kg');
  if (unit === 'ml' && n >= 1000) return cnFormatQty(Math.round(n / 100) / 10, 'L');
  return cnFormatQty(n, unit);
}

/* La quantité à commander pour couvrir `need`. `need` est ce que réclament les
   recettes, mot pour mot ; la valeur rendue est ce qu'on met dans le panier. */
export function cnBuyQty(name, rayon, need) {
  const u = cnUnitFor(name, rayon);
  const courant = u.unit === 'g' || u.unit === 'ml'
    ? cnFormatMass(u.qty, u.unit) : cnFormatQty(u.qty, u.unit);
  const { n, unit } = cnSplitQty(need);
  if (!need || n == null) return courant;
  const nu = cnProdNorm(unit);

  /* Geste de cuisine : le nombre ne dit rien de ce qu'on achète. */
  if (cnIsSpoonUnit(unit) || CN_KITCHEN_UNITS.includes(nu)) return courant;

  /* Même unité que l'achat : on monte au conditionnement suivant, sans
     jamais descendre sous le plus petit format vendu. */
  if (nu === cnProdNorm(u.unit)) {
    if (u.unit === 'g' || u.unit === 'ml') {
      const ladder = u.unit === 'g' ? CN_LADDER_G : CN_LADDER_ML;
      return cnFormatMass(Math.max(cnSnapUp(n, ladder), u.qty), u.unit);
    }
    return cnFormatQty(Math.max(1, Math.ceil(n - 0.001)), u.unit);   // 8,5 aubergines → 9
  }

  /* La recette pèse, le produit se vend au contenant : combien d'articles ? */
  const factor = { g: 1, ml: 1, cl: 10, l: 1000, kg: 1000 }[nu];
  if (factor && cnIsContainer(u.unit)) {
    const size = cnPackSize(name);
    const k = size ? Math.max(1, Math.ceil(n * factor / size - 0.001)) : u.qty;
    return cnFormatQty(k, u.unit);
  }

  /* Conversion impossible sans inventer (des grammes vers des pièces, par
     exemple) : on propose l'achat courant plutôt qu'un chiffre faux. */
  return courant;
}

/* ── Le nom tel qu'on le cherchera au drive ──
   Les recettes décrivent un ingrédient préparé — « lentilles vertes cuites »,
   « gnocchis de p. de terre ». Le drive vend un produit. Une recherche sur
   l'état de préparation ne renvoie rien. */
const CN_PREP_WORDS = new Set([
  'cuit', 'cuits', 'cuite', 'cuites', 'precuit', 'precuits', 'precuite', 'precuites',
  'egoutte', 'egouttes', 'egouttee', 'egouttees', 'rince', 'rinces', 'rincee', 'rincees',
  'decongele', 'decongeles', 'decongelee', 'decongelees',
  'emince', 'eminces', 'emincee', 'emincees', 'tiede', 'tiedes',
  'refroidi', 'refroidis', 'ramolli', 'ramollis', 'fondu', 'fondus', 'fondue', 'fondues',
]);
const CN_PREP_TAILS = [' en des', ' en rondelles', ' en lamelles', ' en morceaux',
  ' en cubes', ' en tranches', ' en fines lamelles', ' a temperature ambiante',
  ' bien mur', ' bien murs', ' bien mure', ' bien mures'];
const CN_ABBREV = [[/\bp\.\s*de\s*terre\b/gi, 'pomme de terre']];

/* ── Le calibre n'est pas le produit ──
   « Gros champignons de Paris » et « champignons de Paris », ce sont les mêmes
   champignons : les garder distincts fait acheter deux barquettes. On retire
   donc le calibre en tête de nom — sauf quand il fait partie du produit. */
const CN_CALIBRE = ['gros', 'grosse', 'grosses', 'petit', 'petite', 'petits', 'petites',
  'moyen', 'moyenne', 'moyens', 'moyennes', 'grand', 'grande', 'grands', 'grandes'];
const CN_CALIBRE_GARDE = ['gros sel', 'petits pois', 'petit pois', 'petit epeautre',
  'petit sale', 'petit suisse', 'petits suisses', 'grand cru'];

export function cnBuyName(name) {
  let s = String(name || '').trim();
  CN_ABBREV.forEach(([re, to]) => { s = s.replace(re, to); });
  {
    const n = cnProdNorm(s);
    const first = n.split(' ')[0];
    if (CN_CALIBRE.includes(first) && !CN_CALIBRE_GARDE.some(k => n.startsWith(k))) {
      s = s.split(/\s+/).slice(1).join(' ');
    }
  }
  for (;;) {
    const tail = CN_PREP_TAILS.find(t => cnProdNorm(s).endsWith(t));
    if (!tail) break;
    s = s.slice(0, s.length - tail.length).trim();
  }
  s = s.split(/\s+/).filter(w => !CN_PREP_WORDS.has(cnProdNorm(w))).join(' ').trim();
  return s ? s[0].toUpperCase() + s.slice(1) : s;
}

/* ── Écrire un article comme on le dicterait ──
   Destiné à être collé dans un assistant qui remplit un panier drive : une
   ligne se lit « 400 g de filet mignon », « 2 briques de coulis de tomates »,
   « 9 aubergines ». La préposition compte — sans elle, « 400 g filet mignon »
   se lit comme deux articles distincts.

   Quand vous avez mémorisé une référence précise, c'est elle qui parle : elle
   porte déjà sa marque et son format, on ne lui ajoute qu'un multiplicateur. */
const CN_H_MUET = ['huile', 'huitre', 'herbe'];   // « d'huile », mais « de haricots »
function cnDe(name) {
  const n = cnProdNorm(name);
  if (/^[aeiou]/.test(n) || CN_H_MUET.some(h => n.startsWith(h))) return "d'";
  return 'de ';
}

/* Ces noms s'écrivent avec un s au singulier. */
const CN_INVARIABLE = ['ananas', 'mais', 'jus', 'riz', 'pois', 'cassis', 'anis',
  'couscous', 'houmous', 'brebis', 'radis', 'poids', 'os', 'temps', 'velours',
  'panais', 'chips', 'noix', 'cresson',
  /* adjectifs déjà terminés en s ou x */
  'frais', 'gras', 'epais', 'gris', 'doux', 'roux', 'vieux', 'faux'];
const CN_PREPS = ['de', 'du', 'des', 'a', 'au', 'aux', 'en', 'pour', 'sans', 'avec'];

/* Les sept noms en -ou qui font leur pluriel en -x. */
const CN_OU_X = ['bijou', 'caillou', 'chou', 'genou', 'hibou', 'joujou', 'pou'];

/* Une variété ne s'accorde pas : « pains pita », « courges butternut ». */
const CN_QUALIF_INV = ['pita', 'butternut', 'basmati', 'arborio', 'bio', 'nature',
  'extra', 'thai', 'roma', 'maison', 'express', 'label', 'primeur'];

function cnNumberWord(w, plural) {
  const n = cnProdNorm(w);
  if (n.length < 4 || CN_INVARIABLE.includes(n) || CN_QUALIF_INV.includes(n)) return w;
  if (plural) {
    if (/[sxz]$/i.test(w)) return w;
    if (/(eau|au|eu)$/i.test(w) || CN_OU_X.includes(n)) return w + 'x';   // poireaux, choux
    return w + 's';
  }
  /* « poireaux » → « poireau », « choux » → « chou » — mais « noix » ne bouge pas. */
  if (/(eaux|aux|eux)$/i.test(w) || (/ux$/i.test(w) && CN_OU_X.includes(n.slice(0, -1)))) return w.slice(0, -1);
  return /[^s]s$/i.test(w) ? w.slice(0, -1) : w;
}

/* Accorde le nom avec le nombre — « 1 aubergines » et « 2 salade verte » se
   lisent mal, et un assistant hésite sur ce qu'on lui demande. Seule la tête du
   nom s'accorde : ce qui suit une préposition n'a pas à bouger (« 2 laits de
   coco », pas « 2 laits de cocos »). */
function cnAgree(name, plural) {
  const words = name.split(' ');
  let head = words.length;
  for (let i = 1; i < words.length; i++) {
    if (CN_PREPS.includes(cnProdNorm(words[i])) || /^[d][’']/.test(words[i]) || words[i].startsWith('(')) { head = i; break; }
  }
  return words.map((w, i) => (i < head ? cnNumberWord(w, plural) : w)).join(' ');
}

/* ── Poids moyen d'une pièce, au rayon fruits et légumes ──
   Le drive vend le vrac au kilo : demander « 4 oignons » sans dire ce que ça
   pèse fait prendre le filet d'un kilo. Un ordre de grandeur suffit à viser
   le bon conditionnement. */
const CN_PIECE_G = [
  ['echalote', 25], ['gousse', 5], ['cebette', 20], ['citron vert', 70], ['citron', 100],
  ['champignon', 20], ['radis', 15], ['abricot', 50], ['figue', 60],
  ['kiwi', 90], ['carotte', 90], ['endive', 100], ['banane', 120],
  ['oignon nouveau', 40], ['oignon', 110], ['tomate cerise', 10], ['tomate', 120],
  ['navet', 120], ['clementine', 80], ['pomme de terre', 130], ['poivron', 150],
  ['betterave', 150], ['panais', 150], ['peche', 150], ['nectarine', 150],
  ['pomme', 160], ['orange', 180], ['poire', 170], ['courgette', 200],
  ['avocat', 200], ['poireau', 200], ['salade', 200], ['aubergine', 250],
  ['patate douce', 250], ['fenouil', 300], ['mangue', 350], ['concombre', 350],
  ['brocoli', 500], ['ananas', 900], ['chou-fleur', 800], ['chou', 900],
  ['butternut', 1000], ['courge', 1000], ['melon', 1000], ['potiron', 1500],
  ['pasteque', 3000],
];
function cnPieceWeight(name) {
  const n = cnProdNorm(name);
  /* « patates douces » doit retrouver « patate douce ». */
  const sing = n.split(' ').map(w => (w.length > 4 && /[^s]s$/.test(w) ? w.slice(0, -1) : w)).join(' ');
  for (const [pat, g] of CN_PIECE_G) if (cnStartsWord(n, pat) || cnStartsWord(sing, pat)) return g;
  return null;
}
function cnRoundWeight(g) {
  if (g >= 1000) return cnFormatQty(Math.round(g / 100) / 10, 'kg');
  const step = g >= 200 ? 50 : 25;
  return cnFormatQty(Math.max(25, Math.round(g / step) * step), 'g');
}

export function cnDriveLine(line) {
  const q = cnSplitQty(line.qty || '');
  /* Un nom de produit se dit en minuscule au fil de la phrase. */
  let name = line.name ? line.name[0].toLowerCase() + line.name.slice(1) : '';
  /* On n'accorde que ce qui se compte : « 400 g de tomates cerises » garde son
     pluriel quel que soit le poids. */
  if (q.n != null && !q.unit) name = cnAgree(name, q.n >= 2);

  const base = !line.qty ? name
    : q.n == null || !q.unit ? `${line.qty} ${name}`      // « 9 aubergines »
    : `${line.qty} ${cnDe(name)}${name}`;                 // « 400 g de bœuf »

  /* La référence mémorisée précise, elle ne remplace pas : le nom générique
     reste ce sur quoi l'assistant cherche si la marque manque en rayon. */
  if (line.exact) return `${base} (${line.exact})`;

  /* Sinon, l'indice qui évite le filet d'un kilo : ce que pèsent ces pièces.
     Le drive vend le vrac au poids — sans repère, « 4 oignons » devient 1 kg. */
  if (q.n != null && !q.unit && line.rayon === 'legumes') {
    const g = cnPieceWeight(line.name);
    if (g) return `${base} — environ ${cnRoundWeight(g * q.n)}`;
  }
  return base;
}

/* ── Estimation de budget ──
   Prix moyen d'un article par rayon — un ordre de grandeur de supermarché, pas
   un tarif. Un prix saisi sur un produit prend toujours le pas. « 26 articles »
   ne fait renoncer à rien ; « ≈ 68 € » si. */
const CN_RAYON_PRICE = {
  legumes: 2.4, boucherie: 7.5, cremerie: 3.2, boulangerie: 2.6, epicerie: 3.1,
  epices: 2.2, surgeles: 4.5, boissons: 3.4, hygiene: 4.2, entretien: 4.8, maison: 5.5,
};
export function cnPriceFor(name, rayon, price) {
  if (price != null && price !== '') {
    const p = parseFloat(String(price).replace(',', '.'));
    if (!isNaN(p) && p >= 0) return p;
  }
  return CN_RAYON_PRICE[rayon || cnRayon(name)] || 3;
}
export function cnFormatEuro(n) {
  const r = n >= 100 ? Math.round(n) : Math.round(n * 2) / 2;
  return String(r).replace('.', ',') + ' €';
}
