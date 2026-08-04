/* ── Jetons de style ──
   Les valeurs de l'app étaient écrites à la main écran par écran : 83 couleurs,
   33 tailles de texte, 14 arrondis. Ce fichier est la source unique. Les écrans
   déjà migrés y puisent ; les autres suivront au fur et à mesure qu'on y touche.

   Les couleurs de texte respectent le contraste minimum sur le fond crème
   (4,5:1 pour le texte courant, 3:1 pour les icônes et les traits). */

export const CN_C = {
  /* fonds */
  paper:   '#FAFAF8',   // le fond de l'app
  card:    '#FFFFFF',
  sunk:    '#F5F2EC',   // une zone en retrait sur le fond

  /* texte — du plus fort au plus discret, tous lisibles */
  ink:     '#1A1918',   // titres                    16,8:1
  body:    '#3C3830',   // texte courant             11,2:1
  muted:   '#767066',   // texte secondaire           4,7:1
  faint:   '#8C8780',   // gros texte et icônes       3,4:1  — jamais sous 16 px

  /* traits */
  rule:    '#E4DDD2',   // bordure d'un champ, d'une carte
  hair:    '#EEE8DC',   // séparateur entre deux lignes
  edge:    '#D5CEBE',   // bordure d'un élément actionnable

  /* accents — un par application */
  olive:   '#506741',   // Cuisine                    6,0:1
  oliveSoft: '#EDF1E7',
  terra:   '#B85C38',   // Le Panier                  4,3:1 — à partir de 16 px
  terraSoft: '#FBEDE7',
  brun:    '#8A6B4A',   // notes, chiffres secondaires 4,7:1
  brunSoft:  '#F9F1E7',
};

/* Échelle typographique — sept crans, plus de demi-pixels.
   micro sert aux capitales espacées, jamais à une phrase. */
export const CN_T = { micro: 11, small: 13, base: 15, lead: 18, title: 22, display: 30, hero: 46 };

/* Arrondis — quatre valeurs, et une seule façon d'écrire « pilule ». */
export const CN_R = { sm: 6, md: 12, lg: 18, pill: 9999 };

/* Espacements — multiples de 4, comme les grilles de l'app. */
export const CN_S = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 36 };

/* Les deux applications et leur couleur. */
export const CN_ACCENTS = { cuisine: CN_C.olive, courses: CN_C.terra };
