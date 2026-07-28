/* ── Table nutritionnelle ── GÉNÉRÉ, NE PAS MODIFIER À LA MAIN.
   Source : CIQUAL 2025 (ANSES), table de composition nutritionnelle des
   aliments. Sous-ensemble des 131 aliments référencés par les règles
   ci-dessous. Valeurs pour 100 g d'aliment cru, sauf mention contraire dans
   le nom CIQUAL.

   `CN_NUTRI_RULES` : premier motif qui commence un mot du nom de l'ingrédient
   gagne. `null` = apport nutritionnel nul (sel, poivre).
   `CN_PIECE_G` : poids moyen d'une pièce, pour les ingrédients comptés à l'unité.
   `CN_UNIT_G` : conversion des unités de mesure en grammes.

   Validé contre les 60 recettes du livre, dont les valeurs sont connues :
   écart médian 8,8 % sur les calories, 51 recettes sur 60 sous les 25 %. */

export const CN_FOODS = {
"11000": [
"Ail, cru",
109.0,
5.31,
18.6,
0.25
],
"11006": [
"Gingembre, poudre",
335.0,
8.98,
58.3,
4.24
],
"2028": [
"Jus de citron, pur jus",
29.4,
0.4,
6.1,
0.29
],
"13009": [
"Citron, chair sans peau, sans pépins, cru",
24.3,
0.25,
1.56,
0.25
],
"18041": [
"Lait de coco",
199.0,
1.94,
4.29,
19.2
],
"18111": [
"Boisson à l'amande, préemballée (aliment moyen)",
35.8,
1.06,
0.68,
3.2
],
"18113": [
"Boisson au soja, préemballée (aliment moyen)",
46.1,
3.21,
2.93,
2.04
],
"11214": [
"Préparation culinaire à base de soja, type \"crème de soja\"",
152.0,
3.25,
2.03,
14.7
],
"19590": [
"Mozzarella au lait de vache",
227.0,
16.5,
0.7,
17.7
],
"30181": [
"Haché végétal à base de soja, préemballé",
143.0,
11.5,
7.01,
5.8
],
"25232": [
"Saucisse végétale au blé ou seitan, préemballé",
250.0,
27.1,
7.53,
10.5
],
"20904": [
"Tofu nature, préemballé",
147.0,
13.4,
2.87,
8.5
],
"25621": [
"Houmous, préemballé",
258.0,
8.06,
9.0,
19.9
],
"11179": [
"Sauce pesto, préemballée",
370.0,
3.94,
6.6,
35.4
],
"13032": [
"Olive noire, en saumure, égouttée",
173.0,
1.38,
0.05,
17.2
],
"11097": [
"Cornichon, aigre-doux",
36.0,
1.25,
5.0,
0.35
],
"25947": [
"Bouillon de volaille, déshydraté reconstitué",
7.2,
1.23,
0.28,
0.13
],
"20260": [
"Tomate, coulis, appertisé (purée de tomates mi-réduite à 11%)",
45.5,
2.05,
7.57,
0.2
],
"20068": [
"Tomate, concentré, appertisé",
99.2,
4.4,
17.1,
0.53
],
"20137": [
"Tomate, pelée, appertisée, au jus, non égouttée",
21.8,
0.79,
3.15,
0.25
],
"20189": [
"Tomate, séchée",
257.1,
14.1,
43.5,
2.97
],
"20172": [
"Tomate cerise, crue",
31.8,
1.31,
5.62,
0.25
],
"20066": [
"Maïs doux, appertisé, égoutté",
105.0,
2.66,
18.3,
1.68
],
"25510": [
"Gnocchi à la pomme de terre, cuit",
178.0,
5.01,
34.1,
2.05
],
"7500": [
"Chapelure",
365.0,
9.41,
74.3,
1.6
],
"11009": [
"Levure de bière en paillettes",
334.0,
40.4,
21.8,
4.5
],
"11091": [
"Vinaigre balsamique",
91.7,
0.69,
18.0,
0.3
],
"11090": [
"Vinaigre de cidre",
3.7,
0.0,
0.93,
0.0
],
"11104": [
"Sauce soja, préemballée",
39.9,
7.25,
1.72,
0.25
],
"11194": [
"Sauce nuoc mâm ou sauce au poisson, préemballée",
81.2,
9.3,
10.9,
0.0
],
"11008": [
"Ketchup, préemballé",
108.0,
1.23,
23.7,
0.16
],
"11054": [
"Mayonnaise (70% MG min.), préemballée",
692.0,
1.33,
3.41,
74.5
],
"11013": [
"Moutarde",
151.0,
6.92,
4.33,
11.2
],
"17270": [
"Huile d'olive vierge extra",
899.0,
0.25,
0.0,
99.9
],
"31008": [
"Miel",
331.0,
0.65,
82.1,
0.0
],
"31016": [
"Sucre blanc",
399.0,
0.0,
99.7,
0.0
],
"15203": [
"Tahin ou purée de sésame",
631.0,
17.7,
13.8,
53.4
],
"9510": [
"Amidon de maïs ou fécule de maïs",
365.0,
0.26,
90.4,
0.05
],
"11005": [
"Curry, poudre",
301.0,
14.5,
2.63,
14.0
],
"11042": [
"Cumin, graine",
427.0,
17.8,
33.7,
22.3
],
"11049": [
"Paprika, poudre",
318.0,
14.1,
18.8,
12.9
],
"11089": [
"Curcuma, poudre",
291.0,
9.68,
44.4,
3.25
],
"11025": [
"Cannelle, poudre",
243.0,
3.99,
27.5,
1.24
],
"11035": [
"Origan, séché",
265.0,
9.0,
26.4,
4.28
],
"11053": [
"Laurier, feuille",
353.0,
7.61,
48.6,
8.36
],
"11070": [
"Thym, frais",
107.0,
5.56,
10.5,
1.68
],
"11060": [
"Herbes de Provence, séchées",
283.0,
11.5,
23.1,
7.2
],
"20151": [
"Piment, cru",
37.4,
1.87,
5.75,
0.44
],
"11033": [
"Basilic, frais",
35.2,
3.15,
3.4,
0.64
],
"11094": [
"Coriandre, fraiche",
22.3,
2.13,
0.87,
0.52
],
"11014": [
"Persil, frais",
42.5,
2.97,
4.1,
0.63
],
"11003": [
"Ciboule ou ciboulette, fraîche",
30.8,
2.55,
2.85,
0.46
],
"11093": [
"Aneth, frais",
48.2,
3.93,
3.9,
1.1
],
"11080": [
"Herbes aromatiques fraîches (aliment moyen)",
51.2,
3.26,
4.69,
0.93
],
"6116": [
"Boeuf, filet cru",
132.0,
21.6,
0.22,
4.95
],
"6210": [
"Boeuf, rosbif rôti/cuit au four",
126.0,
24.1,
0.3,
3.16
],
"6252": [
"Boeuf, steak haché 10% MG cru",
170.0,
20.0,
0.0,
10.0
],
"6201": [
"Boeuf, steak ou bifteck cru",
229.0,
18.7,
0.06,
17.2
],
"28302": [
"Porc, échine crue",
238.0,
17.1,
0.1,
18.8
],
"36007": [
"Poulet blanc, viande et peau crues",
122.0,
20.8,
0.0,
4.3
],
"36304": [
"Dinde, escalope crue",
108.0,
23.7,
0.0,
1.48
],
"28812": [
"Jambon sec",
230.0,
28.7,
0.48,
12.6
],
"28910": [
"Jambon cuit, choix",
125.0,
19.5,
1.7,
4.5
],
"28720": [
"Lardon fumé, cru",
272.0,
16.7,
0.35,
22.6
],
"26036": [
"Saumon, élevage, cru",
193.0,
20.5,
0.0,
12.4
],
"26043": [
"Cabillaud, cru",
77.4,
18.1,
0.0,
0.57
],
"26134": [
"Lieu noir, cru",
82.5,
18.8,
0.0,
0.8
],
"26053": [
"Thon, cru",
155.0,
24.0,
2.72,
5.38
],
"10007": [
"Crevette, cuite",
91.3,
20.5,
0.2,
0.79
],
"22000": [
"Oeuf cru",
140.0,
12.8,
0.06,
9.83
],
"16400": [
"Beurre à 80% MG minimum, doux",
753.0,
0.64,
0.71,
83.0
],
"12524": [
"Gorgonzola",
318.0,
19.5,
0.0,
26.9
],
"12060": [
"Fromage type feta, au lait de vache 100%",
273.0,
15.4,
1.22,
22.6
],
"12120": [
"Parmesan",
411.0,
31.1,
1.14,
31.0
],
"19585": [
"Ricotta",
145.2,
8.13,
4.09,
10.7
],
"12726": [
"Cheddar",
399.0,
24.7,
1.2,
32.6
],
"12114": [
"Gruyère, sans précision (origine France ou Suisse)",
408.0,
26.3,
0.78,
33.5
],
"12061": [
"Fromage type feta, au lait de brebis 100%",
264.7,
16.3,
0.83,
21.8
],
"12069": [
"Fromage frais ou spécialité fromagère non affinée, nature, à tartiner, en barquette, allégée en matière grasse",
133.0,
10.8,
5.12,
7.48
],
"19860": [
"Yaourt à la grecque nature",
103.0,
3.02,
3.73,
8.16
],
"19646": [
"Fromage blanc, nature, 2-3% MG",
75.7,
7.28,
3.86,
3.23
],
"19436": [
"Crème 12 à 20% MG, légère, fluide, rayon frais",
173.0,
2.96,
4.3,
16.0
],
"19041": [
"Lait demi-écrémé, UHT",
47.7,
3.48,
5.0,
1.56
],
"9119": [
"Riz thaï ou basmati, cru",
351.0,
7.08,
78.4,
0.63
],
"9340": [
"Quinoa, cru",
358.0,
13.2,
58.1,
6.07
],
"9810": [
"Pâtes sèches, standard, crues",
364.0,
12.0,
72.7,
1.6
],
"20587": [
"Lentille verte, bouillie/cuite à l'eau",
125.0,
10.1,
16.2,
0.58
],
"20507": [
"Pois chiche, bouilli/cuit à l'eau",
148.0,
8.31,
17.7,
3.0
],
"20503": [
"Haricot rouge, bouilli/cuit à l'eau",
116.0,
9.63,
12.3,
0.6
],
"20502": [
"Haricot blanc, bouilli/cuit à l'eau",
112.0,
6.75,
12.0,
1.1
],
"32140": [
"Flocons d'avoine",
369.0,
10.6,
57.7,
7.82
],
"9380": [
"Sarrasin complet, cru",
362.0,
13.3,
67.5,
3.4
],
"25557": [
"Brick à l'oeuf, fait maison, cuit",
255.0,
10.4,
12.3,
18.1
],
"7180": [
"Pain pita",
249.0,
7.48,
48.8,
1.5
],
"7200": [
"Pain de mie blanc, préemballé",
279.0,
7.06,
50.4,
4.37
],
"7110": [
"Pain complet ou intégral (à la farine T150)",
234.0,
8.66,
41.2,
1.7
],
"7815": [
"Tortilla souple (à garnir), à base de blé",
320.0,
8.01,
53.0,
7.48
],
"15004": [
"Noisette, sans sel ajouté",
632.0,
14.4,
7.16,
56.9
],
"15000": [
"Amande, avec peau, sans sel ajouté",
615.0,
18.8,
9.51,
51.3
],
"15054": [
"Noix de cajou, grillée, sans sel ajouté",
618.0,
17.4,
21.3,
48.1
],
"15053": [
"Cacahuète, grillée, sans sel ajouté",
644.0,
23.5,
14.4,
51.9
],
"15025": [
"Pignon de pin",
712.0,
13.7,
2.93,
68.4
],
"15010": [
"Sésame, graine",
606.0,
17.7,
12.8,
49.7
],
"15047": [
"Chia, graine, séchée",
454.0,
16.5,
7.72,
30.7
],
"20034": [
"Oignon, cru",
39.0,
1.1,
6.25,
0.62
],
"20097": [
"Échalote, crue",
61.7,
1.81,
12.2,
0.25
],
"20039": [
"Poireau, cru",
30.4,
1.5,
4.55,
0.3
],
"20009": [
"Carotte, crue",
30.2,
0.78,
5.16,
0.25
],
"20181": [
"Panais, cru",
67.9,
1.2,
12.6,
0.3
],
"20055": [
"Céleri-rave, cru",
26.3,
1.38,
3.98,
0.25
],
"20020": [
"Courgette, chair et peau, crue",
16.7,
1.21,
1.75,
0.32
],
"20053": [
"Aubergine, crue",
22.9,
0.98,
2.7,
0.18
],
"20085": [
"Poivron vert, cru",
22.5,
0.81,
3.43,
0.25
],
"20119": [
"Tomate verte, crue",
24.8,
1.2,
4.0,
0.2
],
"20010": [
"Champignon, tout type, cru",
24.3,
2.42,
2.25,
0.34
],
"20057": [
"Brocoli, cru",
31.9,
2.9,
2.15,
0.36
],
"20218": [
"Chou frisé, cru",
49.5,
4.28,
4.2,
0.93
],
"20014": [
"Chou rouge, cru",
26.4,
1.13,
4.33,
0.25
],
"20167": [
"Chou chinois pé-tsaï, cru",
16.4,
1.25,
2.1,
0.2
],
"20069": [
"Chou vert, cru",
24.4,
1.43,
2.74,
0.14
],
"20059": [
"Épinard, cru",
33.3,
2.68,
3.06,
0.39
],
"20099": [
"Mâche, crue",
15.0,
2.0,
0.5,
0.25
],
"20217": [
"Roquette, crue",
27.9,
2.58,
2.1,
0.66
],
"20272": [
"Mesclun ou salade, mélange de jeunes pousses",
22.0,
2.0,
2.5,
0.0
],
"20031": [
"Laitue, crue",
14.7,
1.35,
1.22,
0.2
],
"20061": [
"Haricot vert, cru",
31.9,
1.83,
4.14,
0.22
],
"4101": [
"Patate douce, crue",
81.2,
1.57,
17.1,
0.05
],
"4008": [
"Pomme de terre, sans peau, crue",
80.0,
2.02,
16.2,
0.09
],
"20138": [
"Courge butternut (doubeurre), chair sans peau, crue",
30.5,
1.0,
5.4,
0.1
],
"13004": [
"Avocat, chair sans peau, sans noyau, cru",
203.0,
1.56,
0.0,
20.6
],
"13037": [
"Poire, chair et peau, crue",
56.6,
0.36,
12.3,
0.27
]
};

export const CN_NUTRI_RULES = [["ail en poudre", 11000], ["gingembre en poudre", 11006], ["gingembre", 11006], ["jus de citron", 2028], ["zeste de citron", 13009], ["lait de coco", 18041], ["creme de coco", 18041], ["lait d amande", 18111], ["lait de soja", 18113], ["creme de soja", 11214], ["fromage rape vegetal", 19590], ["hache vegetal", 30181], ["saucisses vegetales", 25232], ["tofu", 20904], ["houmous", 25621], ["pesto", 11179], ["olives noires", 13032], ["cornichons", 11097], ["eau ou bouillon", null], ["bouillon", 25947], ["coulis de tomates", 20260], ["concentre de tomates", 20068], ["pulpe de tomates", 20137], ["chair de tomates", 20137], ["tomates sechees", 20189], ["tomates cerises", 20172], ["mais en conserve", 20066], ["mais cuit", 20066], ["epi de mais", 20066], ["gnocchis", 25510], ["chapelure", 7500], ["levure maltee", 11009], ["vinaigre balsamique", 11091], ["vinaigre", 11090], ["sauce soja", 11104], ["tamari", 11104], ["sauce nuoc", 11194], ["sauce poisson", 11194], ["sriracha", 11008], ["sauce chili", 11008], ["mayonnaise", 11054], ["moutarde", 11013], ["huile", 17270], ["miel", 31008], ["sucre", 31016], ["tahini", 15203], ["fecule de mais", 9510], ["sel", null], ["poivre", null], ["fleur de sel", null], ["au gout", null], ["facultatif", null], ["curry", 11005], ["cumin", 11042], ["paprika", 11049], ["curcuma", 11089], ["cannelle", 11025], ["origan", 11035], ["laurier", 11053], ["thym", 11070], ["herbes de provence", 11060], ["piment", 20151], ["chili", 11005], ["massala", 11005], ["zaatar", 11035], ["epices", 11005], ["basilic", 11033], ["coriandre", 11094], ["persil", 11014], ["ciboulette", 11003], ["aneth", 11093], ["herbes fraiches", 11080], ["filet mignon", 6116], ["roti de boeuf", 6210], ["boeuf hache", 6252], ["steaks haches", 6252], ["boeuf", 6201], ["porc", 28302], ["blanc de poulet", 36007], ["poulet", 36007], ["blanc de dinde", 36304], ["dinde", 36304], ["jambon cru", 28812], ["des de jambon", 28910], ["jambon", 28910], ["bacon", 28720], ["lardon", 28720], ["saumon", 26036], ["cabillaud", 26043], ["lieu", 26134], ["thon", 26053], ["crevettes", 10007], ["oeuf", 22000], ["beurre", 16400], ["gorgonzola", 12524], ["feta", 12060], ["mozzarella", 19590], ["parmesan", 12120], ["ricotta", 19585], ["cheddar", 12726], ["gruyere", 12114], ["fromage de brebis", 12061], ["fromage a tartiner", 12069], ["fromage a la grecque", 19860], ["yaourt a la grecque", 19860], ["fromage blanc", 19646], ["skyr", 19646], ["fromage rape", 12114], ["fromage", 12114], ["creme liquide", 19436], ["creme", 19436], ["lait", 19041], ["riz", 9119], ["quinoa", 9340], ["pates", 9810], ["linguine", 9810], ["spaghettis", 9810], ["tagliatelles", 9810], ["orzo", 9810], ["lentilles", 20587], ["pois chiches", 20507], ["haricots rouges", 20503], ["haricots blancs", 20502], ["flocons d avoine", 32140], ["galettes de sarrasin", 9380], ["brick", 25557], ["pains pita", 7180], ["pains a hamburger", 7200], ["pain de mie", 7200], ["pain", 7110], ["tortilla", 7815], ["wraps", 7815], ["noisettes", 15004], ["poudre d amandes", 15000], ["amandes", 15000], ["noix de cajou", 15054], ["cacahuetes", 15053], ["pignons", 15025], ["graines de sesame", 15010], ["graines de chia", 15047], ["mix de graines", 15010], ["ail", 11000], ["oignon", 20034], ["echalote", 20097], ["cebette", 11003], ["poireau", 20039], ["carotte", 20009], ["panais", 20181], ["celeri", 20055], ["courgette", 20020], ["aubergine", 20053], ["poivron", 20085], ["tomate", 20119], ["champignons", 20010], ["shitake", 20010], ["brocoli", 20057], ["chou kale", 20218], ["chou rouge", 20014], ["pak choi", 20167], ["chou", 20069], ["epinards", 20059], ["mache", 20099], ["roquette", 20217], ["jeunes pousses", 20272], ["salade", 20031], ["haricots verts", 20061], ["patate douce", 4101], ["pommes de terre", 4008], ["courge", 20138], ["butternut", 20138], ["avocat", 13004], ["citron", 13009], ["poire", 13037]];

export const CN_PIECE_G = {"carotte": 125, "panais": 150, "poire": 170, "courgette": 200, "aubergine": 250, "poivron": 150, "oignon": 110, "echalote": 25, "citron": 100, "citron vert": 70, "avocat": 150, "tomate": 120, "poireau": 150, "patate douce": 200, "pomme de terre": 130, "courge": 900, "brocoli": 500, "uf": 55, "oeuf": 55, "cebette": 15, "celeri": 800, "epi de mais": 100, "pak choi": 300, "chou": 800, "mini tortilla": 30, "tortilla": 60, "wraps": 60, "pains pita": 60, "pains a hamburger": 50, "galettes de sarrasin": 60, "brick": 12, "gousse": 5, "ail": 5, "concombre": 300, "banane": 120, "pomme": 150, "pave": 130, "piment": 10, "steaks haches": 125, "blanc de poulet": 150, "blanc de dinde": 100};

export const CN_UNIT_G = {"g": 1, "gr": 1, "gramme": 1, "kg": 1000, "ml": 1, "cl": 10, "l": 1000, "cas": 15, "c as": 15, "cuillere a soupe": 15, "cac": 5, "c ac": 5, "cuillere a cafe": 5, "pincee": 0.5, "poignee": 20, "poignees": 20, "gousse": 5, "gousses": 5, "tranche": 25, "tranches": 25, "cube": 10, "cubes": 10, "filet": 5, "trait": 3, "boite": 400, "sachet": 10, "feuille": 0.5, "feuilles": 0.5, "brin": 1, "brins": 1, "bouquet": 20, "tete": 300, "botte": 100, "branche": 10};
