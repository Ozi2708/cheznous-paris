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

export function cnRayon(name) {
  const n = cnProdNorm(name);
  if (!n) return 'epicerie';
  for (const [rayon, kws] of CN_RAYON_RULES) {
    if (kws.some(kw => cnStartsWord(n, kw))) return rayon;
  }
  return 'epicerie';
}

/* Entrées parasites présentes dans les données de recettes. */
const CN_JUNK = ['(au gout)', '(facultatif)', 'au gout', 'facultatif'];
export function cnIsJunkIngredient(name) {
  const n = cnProdNorm(name);
  return !n || CN_JUNK.includes(n);
}
