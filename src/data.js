// Données extraites du livre « Chez nous à Paris » — texte uniquement
export const CHEZNOUS_DATA = {
 "chapters": [
  {
   "num": 1,
   "name": "Low-Carb",
   "desc": "Des recettes équilibrées, riches en légumes et protéines, pauvres en glucides. Idéales pour contrôler l'apport calorique sans jamais sacrifier la gourmandise."
  },
  {
   "num": 2,
   "name": "High-Carb",
   "desc": "Pâtes, riz, pommes de terre et céréales complètes : le carburant dont votre corps a besoin. Ces recettes nourrissent vos efforts sans jamais sacrifier le goût."
  },
  {
   "num": 3,
   "name": "Post Training",
   "desc": "Récupération musculaire et recharge en nutriments après l'effort. Protéines, glucides complexes et micronutriments pour des assiettes efficaces et savoureuses."
  },
  {
   "num": 4,
   "name": "Petit Déjeuner",
   "desc": "Commencez la journée du bon pied. Bowls protéinés, tartines healthy, pancakes avoine et smoothies vitaminés pour une énergie durable dès le matin."
  },
  {
   "num": 5,
   "name": "Encas",
   "desc": "Petites faims, grandes envies. Barres protéinées maison, energy balls, houmous frais et bouchées légères pour tenir entre les repas sans culpabiliser."
  }
 ],
 "recipes": [
  {
   "id": "p1",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Filet mignon farci au gorgonzola",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Bœuf"
   ],
   "dietTags": [
    "Sans gluten",
    "Sans arachide",
    "Sans œuf"
   ],
   "nutrition": {
    "kcal": 560,
    "lipides": 27,
    "glucides": 25,
    "proteines": 55
   },
   "prepMin": 15,
   "cookMin": 33,
   "prepRaw": "Prép. 15 min · Cuisson 33 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "407 g",
       "name": "filet mignon de bœuf"
      },
      {
       "q": "178 g",
       "name": "carotte(s)"
      },
      {
       "q": "178 g",
       "name": "panais"
      },
      {
       "q": "127 g",
       "name": "poire(s)"
      },
      {
       "q": "77 g",
       "name": "gorgonzola"
      },
      {
       "q": "20 g",
       "name": "noisettes"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "0.5 cube",
       "name": "bouillon de volaille"
      },
      {
       "q": "0.5 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "1 càc",
       "name": "thym"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-af",
     "title": "Astuce Airfryer",
     "text": "−10/20 °C · −20/30 % de temps."
    }
   ],
   "steps": [
    "Préchauffez le four à <strong>200 °C</strong>.",
    "Coupez les poires en dés, faites-les revenir 3 min avec l'huile d'olive.",
    "Mélangez poires, noisettes hachées et gorgonzola émietté.",
    "Incisez le filet en portefeuille, garnissez de farce, ficelez.",
    "Dorez sur toutes les faces 3 min. Ajoutez légumes + bouillon + thym. Enfournez <strong>30 min</strong>.",
    "Servez en tranches avec les légumes et le jus de cuisson."
   ],
   "claudy": [
    "Ficelez bien le filet : sans ficelle la farce s'échappe à la cuisson.",
    "Préférez le gorgonzola doux — il fond mieux et est moins salé."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "La température à cœur idéale est 63 °C pour un filet rosé et juteux."
    },
    {
     "label": "Suggestion",
     "text": "Un verre de vin blanc sec type Riesling."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · réchauffer au four à 160 °C couvert d'aluminium."
    }
   ],
   "num": 1,
   "totalMin": 48,
   "typeBadges": [
    "Bœuf"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p2",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Cordon végétal chili",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Végan"
   ],
   "dietTags": [
    "Végan",
    "Sans gluten",
    "Sans arachide"
   ],
   "nutrition": {
    "kcal": 507,
    "lipides": 23,
    "glucides": 44,
    "proteines": 32
   },
   "prepMin": 15,
   "cookMin": 25,
   "prepRaw": "Prép. 15 min · Cuisson 25 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "204 g",
       "name": "haché végétal"
      },
      {
       "q": "62 g",
       "name": "tofu fumé"
      },
      {
       "q": "40 g",
       "name": "fromage râpé végétal"
      },
      {
       "q": "30 g",
       "name": "tomates séchées"
      },
      {
       "q": "2 poignées",
       "name": "salade verte"
      },
      {
       "q": "10 feuilles",
       "name": "coriandre fraîche"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "102 g",
       "name": "quinoa"
      },
      {
       "q": "2 càc",
       "name": "concentré de tomates"
      },
      {
       "q": "1,5 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "épices chili"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-var",
     "title": "Variante carnée",
     "text": "Remplacez le haché végétal par du haché de bœuf ou de dinde. Même cuisson et temps identiques."
    },
    {
     "cls": "p-t-af",
     "title": "Astuce Airfryer",
     "text": "−10/20 °C · −20/30 % de temps."
    }
   ],
   "steps": [
    "Préchauffez le four à <strong>180 °C</strong>.",
    "Cuisez le quinoa à couvert dans 200 ml d'eau salée jusqu'à absorption.",
    "Faites revenir le haché avec l'huile, épices chili, concentré de tomates, tomates séchées. Mijotez <strong>3 min</strong>.",
    "Étalez le quinoa sur film alimentaire, garnissez, refermez en demi-lune.",
    "Posez sur plaque, badigeonnez d'huile. Enfournez <strong>35 min</strong>.",
    "Servez avec salade verte et tofu fumé."
   ],
   "claudy": [
    "Laissez le quinoa tiédir avant de le façonner : il se tient mieux.",
    "Badigeonnez une seconde fois d'huile à mi-cuisson pour plus de croustillant."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Un quinoa bien égoutté et légèrement refroidi se façonne beaucoup mieux."
    },
    {
     "label": "Suggestion",
     "text": "Sauce piquante maison ou yaourt de coco épicé."
    },
    {
     "label": "Conservation",
     "text": "À consommer le jour même · le croustillant disparaît au frigo."
    }
   ],
   "num": 2,
   "totalMin": 40,
   "typeBadges": [
    "Végan"
   ],
   "isVegan": true,
   "isVeggie": true
  },
  {
   "id": "p3",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Gnocchis aux légumes rôtis",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Végan"
   ],
   "dietTags": [
    "Végan",
    "Sans fruits à coque",
    "Sans arachide"
   ],
   "nutrition": {
    "kcal": 541,
    "lipides": 33,
    "glucides": 36,
    "proteines": 26
   },
   "prepMin": 10,
   "cookMin": 30,
   "prepRaw": "Prép. 10 min · Cuisson 30 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "244 g",
       "name": "saucisses végétales"
      },
      {
       "q": "204 g",
       "name": "courgette(s)"
      },
      {
       "q": "204 g",
       "name": "aubergine(s)"
      },
      {
       "q": "102 g",
       "name": "gnocchis de p. de terre"
      },
      {
       "q": "102 g",
       "name": "tomates cerises"
      },
      {
       "q": "102 g",
       "name": "oignon(s)"
      },
      {
       "q": "20 g",
       "name": "pesto"
      },
      {
       "q": "10 feuilles",
       "name": "basilic frais"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "1,5 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "ail en poudre"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-var",
     "title": "Variante carnée",
     "text": "Remplacez les saucisses végétales par des chipolatas ou des merguez. Même cuisson sur la plaque."
    },
    {
     "cls": "p-t-af",
     "title": "Astuce Airfryer",
     "text": "−10/20 °C · −20/30 % de temps."
    }
   ],
   "steps": [
    "Préchauffez le four à <strong>200 °C</strong>.",
    "Lavez les légumes et coupez-les en dés.",
    "Sur plaque : légumes, gnocchis, saucisses, pesto, huile, ail, sel, poivre. Mélangez.",
    "Enfournez <strong>30 min</strong> en remuant à mi-cuisson.",
    "Parsemez de basilic frais à la sortie du four."
   ],
   "claudy": [
    "Les gnocchis n'ont pas besoin d'être précuits : la chaleur du four suffit.",
    "Ajoutez une cuillère de levure nutritionnelle avec le pesto pour plus de croustillant."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Ne surchargez pas la plaque — les légumes rôtissent mieux en couche unique."
    },
    {
     "label": "Suggestion",
     "text": "Eau pétillante citronnée ou kombucha."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · repassez au four 10 min pour retrouver le croustillant."
    }
   ],
   "num": 3,
   "totalMin": 40,
   "typeBadges": [
    "Végan"
   ],
   "isVegan": true,
   "isVeggie": true
  },
  {
   "id": "p4",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Purée de haricots rouges, filet de bœuf et poivrons grillés",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Bœuf"
   ],
   "dietTags": [
    "Sans gluten",
    "Sans fruits à coque",
    "Sans arachide"
   ],
   "nutrition": {
    "kcal": 389,
    "lipides": 13,
    "glucides": 29,
    "proteines": 39
   },
   "prepMin": 10,
   "cookMin": 12,
   "prepRaw": "Prép. 10 min · Cuisson 12 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "204 g",
       "name": "bœuf émincé"
      },
      {
       "q": "204 g",
       "name": "poivron(s)"
      },
      {
       "q": "82 g",
       "name": "oignon(s)"
      },
      {
       "q": "20 feuilles",
       "name": "coriandre fraîche"
      },
      {
       "q": "2 gousses",
       "name": "ail"
      },
      {
       "q": "0.5",
       "name": "citron vert"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "204 g",
       "name": "haricots rouges cuits"
      },
      {
       "q": "2 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "paprika"
      },
      {
       "q": "2 càc",
       "name": "cumin"
      },
      {
       "q": "2 càc",
       "name": "ail en poudre"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Lavez et émincez les poivrons. Émincez l'ail et l'oignon.",
    "Faites revenir l'ail, l'oignon et les poivrons dans l'huile d'olive. Assaisonnez de sel, poivre et paprika. Laissez mijoter <strong>10 min</strong>.",
    "Ajoutez le bœuf émincé et poursuivez la cuisson <strong>2-3 min</strong>.",
    "Égouttez et rincez les haricots rouges. Mixez-les avec l'ail en poudre, le cumin, un filet d'huile, sel et poivre. Ajoutez un fond d'eau si nécessaire.",
    "Servez la purée de haricots avec le bœuf aux poivrons, la coriandre fraîche et un filet de jus de citron vert."
   ],
   "claudy": [
    "Mixez les haricots encore chauds pour une purée plus onctueuse — tiédis ils deviennent granuleux.",
    "Un trait de citron vert juste avant de servir réveille tous les arômes de ce plat."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Égouttez et rincez bien les haricots pour une purée plus légère."
    },
    {
     "label": "Suggestion",
     "text": "Eau pétillante au citron vert."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · purée séparément."
    }
   ],
   "num": 4,
   "totalMin": 22,
   "typeBadges": [
    "Bœuf"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p5",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Salade de maïs grillé à la mexicaine",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Poulet"
   ],
   "dietTags": [
    "Sans gluten",
    "Sans arachide",
    "Cuisine du monde"
   ],
   "nutrition": {
    "kcal": 431,
    "lipides": 16,
    "glucides": 32,
    "proteines": 39
   },
   "prepMin": 5,
   "cookMin": 8,
   "prepRaw": "Prép. 5 min · Cuisson 8 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "254 g",
       "name": "blanc de poulet"
      },
      {
       "q": "203 g",
       "name": "épi de maïs cuit"
      },
      {
       "q": "153 g",
       "name": "yaourt à la grecque"
      },
      {
       "q": "102 g",
       "name": "tomates cerises"
      },
      {
       "q": "102 g",
       "name": "chou kale"
      },
      {
       "q": "51 g",
       "name": "oignon(s) rouge(s)"
      },
      {
       "q": "8 feuilles",
       "name": "coriandre fraîche"
      },
      {
       "q": "0.5",
       "name": "citron vert"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "2 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "paprika"
      },
      {
       "q": "2 càc",
       "name": "ail en poudre"
      },
      {
       "q": "",
       "name": "piment d'Espelette"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Lavez le chou kale, dénervez-le et coupez-le en morceaux.",
    "Faites griller les épis de maïs assaisonnés à feu vif dans l'huile d'olive quelques minutes. Coupez les grains.",
    "Faites dorer le poulet en dés dans la même poêle avec sel, piment et paprika <strong>6-8 min</strong>.",
    "Préparez la sauce : mélangez le yaourt, l'ail en poudre, la coriandre, le jus de citron vert, sel et piment.",
    "Dressez la salade avec chou kale, maïs, tomates cerises coupées, poulet et sauce. Ajoutez l'oignon rouge."
   ],
   "claudy": [
    "Le chou kale se massez légèrement avec un filet d'huile d'olive pour l'attendrir avant de dresser.",
    "Grillez le maïs à sec dans une poêle très chaude pour un maximum de caramélisation."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Préparez la sauce à l'avance — elle s'améliore en reposant 30 min au frigo."
    },
    {
     "label": "Suggestion",
     "text": "Eau infusée citron vert et feuille de menthe."
    },
    {
     "label": "Conservation",
     "text": "2 jours · sauce séparément."
    }
   ],
   "num": 5,
   "totalMin": 13,
   "typeBadges": [
    "Poulet"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p6",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Casserole mexicaine «burrito»",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Bœuf haché"
   ],
   "dietTags": [
    "Sans fruits à coque",
    "Sans arachide",
    "Cuisine du monde"
   ],
   "nutrition": {
    "kcal": 467,
    "lipides": 18,
    "glucides": 33,
    "proteines": 42
   },
   "prepMin": 10,
   "cookMin": 25,
   "prepRaw": "Prép. 10 min · Cuisson 25 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "203 g",
       "name": "bœuf haché"
      },
      {
       "q": "61 g",
       "name": "oignon(s)"
      },
      {
       "q": "1 gousse",
       "name": "ail"
      },
      {
       "q": "8 feuilles",
       "name": "coriandre fraîche"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "407 g",
       "name": "pulpe de tomates"
      },
      {
       "q": "153 g",
       "name": "haricots rouges cuits"
      },
      {
       "q": "41 g",
       "name": "cheddar râpé"
      },
      {
       "q": "1",
       "name": "tortilla de maïs"
      },
      {
       "q": "1 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "1 càc",
       "name": "cumin"
      },
      {
       "q": "1 càc",
       "name": "paprika"
      },
      {
       "q": "",
       "name": "piment d'Espelette"
      },
      {
       "q": "",
       "name": "sel"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-af",
     "title": "Astuce Airfryer",
     "text": "−10/20 °C · −20/30 % de temps."
    }
   ],
   "steps": [
    "Préchauffez le four à <strong>200 °C</strong>.",
    "Détaillez la tortilla en triangles. Étalez-les sur une plaque avec un filet d'huile. Faites dorer <strong>10 min</strong>. Réservez.",
    "Émincez finement l'oignon et l'ail. Faites-les dorer dans l'huile restante.",
    "Ajoutez le bœuf haché, la pulpe de tomates, les haricots rouges, les épices et le sel. Mijotez <strong>20 min</strong>.",
    "Disposez dans un plat allant au four. Ajoutez le cheddar et faites fondre quelques minutes sous le grill.",
    "Servez avec les chips de tortilla et la coriandre fraîche."
   ],
   "claudy": [
    "Le cheddar fondu sous le grill est la touche finale — surveillez-le, ça va vite !",
    "Ajoutez un trait de tabasco dans la sauce pour plus de peps."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Laissez mijoter la sauce suffisamment longtemps pour que les saveurs se développent."
    },
    {
     "label": "Suggestion",
     "text": "Jus de citron vert frais ou horchata."
    },
    {
     "label": "Conservation",
     "text": "3 jours au frigo · les chips séparément pour garder le croustillant."
    }
   ],
   "num": 6,
   "totalMin": 35,
   "typeBadges": [
    "Bœuf haché"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p7",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Quiche sans pâte façon pizza",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Jambon"
   ],
   "dietTags": [
    "Sans gluten",
    "Sans fruits à coque"
   ],
   "nutrition": {
    "kcal": 389,
    "lipides": 22,
    "glucides": 15,
    "proteines": 34
   },
   "prepMin": 10,
   "cookMin": 30,
   "prepRaw": "Prép. 10 min · Cuisson 30 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "4",
       "name": "œuf(s)"
      },
      {
       "q": "112 g",
       "name": "dés de jambon blanc"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "204 ml",
       "name": "lait de soja"
      },
      {
       "q": "40 g",
       "name": "coulis de tomates"
      },
      {
       "q": "40 g",
       "name": "gruyère râpé"
      },
      {
       "q": "20 g",
       "name": "olives noires"
      },
      {
       "q": "20 g",
       "name": "fécule de maïs"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "origan"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-af",
     "title": "Astuce Airfryer",
     "text": "−10/20 °C · −20/30 % de temps."
    }
   ],
   "steps": [
    "Préchauffez le four à <strong>180 °C</strong>.",
    "Battez les œufs avec le lait de soja, la fécule de maïs, le sel et le poivre.",
    "Ajoutez le coulis de tomates, les dés de jambon, le gruyère râpé, les olives noires et l'origan.",
    "Versez dans un plat en verre beurré. Enfournez <strong>30 min</strong>.",
    "Servez chaud ou froid, découpé en parts."
   ],
   "claudy": [
    "La fécule de maïs est la clé de la texture : elle donne de la tenue sans pâte.",
    "Vous pouvez varier les garnitures à l'infini : thon, champignons, poivrons..."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Le plat en verre garantit une cuisson uniforme et une surveillance facile."
    },
    {
     "label": "Suggestion",
     "text": "Salade verte bien assaisonnée."
    },
    {
     "label": "Conservation",
     "text": "2-3 jours au frigo · consommer froid ou réchauffé."
    }
   ],
   "num": 7,
   "totalMin": 40,
   "typeBadges": [
    "Jambon"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p8",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Wrap de sarrasin roulé à la dinde",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Dinde"
   ],
   "dietTags": [
    "Sans gluten",
    "Sans fruits à coque",
    "Sans arachide"
   ],
   "nutrition": {
    "kcal": 361,
    "lipides": 12,
    "glucides": 27,
    "proteines": 37
   },
   "prepMin": 5,
   "cookMin": null,
   "prepRaw": "Prép. 5 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "254 g",
       "name": "blanc de dinde (tranché)"
      },
      {
       "q": "2 poignées",
       "name": "roquette"
      },
      {
       "q": "40 g",
       "name": "oignon(s) rouge(s)"
      },
      {
       "q": "40 g",
       "name": "cornichons"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "2",
       "name": "galettes de sarrasin"
      },
      {
       "q": "152 g",
       "name": "fromage à tartiner -20% MG"
      },
      {
       "q": "10 g",
       "name": "miel"
      },
      {
       "q": "2 càc",
       "name": "moutarde"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Préparez la sauce : mélangez le fromage à tartiner, le miel, la moutarde, le sel et le poivre.",
    "Répartissez les tranches de dinde sur les galettes de sarrasin.",
    "Étalez la sauce sur la dinde.",
    "Ajoutez les lamelles d'oignon rouge, les cornichons et la roquette.",
    "Roulez pour obtenir un wrap et coupez en deux."
   ],
   "claudy": [
    "Les galettes de sarrasin sont naturellement sans gluten et bien plus savoureuses que les wraps classiques.",
    "Remplacez la dinde par du jambon blanc ou du poulet rôti selon vos envies."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Étalez la sauce généreusement jusqu'aux bords pour que chaque bouchée soit goûteuse."
    },
    {
     "label": "Suggestion",
     "text": "Jus de pomme frais ou thé glacé."
    },
    {
     "label": "Conservation",
     "text": "À consommer immédiatement · la galette ramollit."
    }
   ],
   "num": 8,
   "totalMin": 5,
   "typeBadges": [
    "Dinde"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p9",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Salade de haricots et saumon caramélisé au zaatar",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Saumon"
   ],
   "dietTags": [
    "Pesco-végétarien",
    "Sans gluten",
    "Sans arachide"
   ],
   "nutrition": {
    "kcal": 426,
    "lipides": 20,
    "glucides": 25,
    "proteines": 37
   },
   "prepMin": 5,
   "cookMin": 15,
   "prepRaw": "Prép. 5 min · Cuisson 15 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "254 g",
       "name": "saumon frais"
      },
      {
       "q": "610 g",
       "name": "haricots verts"
      },
      {
       "q": "2",
       "name": "cébettes"
      },
      {
       "q": "4 g",
       "name": "graines de sésame"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "30 g",
       "name": "miel"
      },
      {
       "q": "10 g",
       "name": "tahini"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "épices zaatar"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-var",
     "title": "Variante carnée",
     "text": "Remplacez le saumon par un blanc de poulet grillé assaisonné de zaatar. Cuisson 6-8 min à la poêle bien chaude de chaque côté."
    },
    {
     "cls": "p-t-af",
     "title": "Astuce Airfryer",
     "text": "−10/20 °C · −20/30 % de temps."
    }
   ],
   "steps": [
    "Préchauffez le four à <strong>200 °C</strong> (ou Airfryer).",
    "Assaisonnez le saumon de zaatar, de la moitié du miel, de sel et de poivre. Enfournez <strong>10 min</strong>.",
    "Équeutez les haricots verts. Faites-les cuire à l'eau bouillante <strong>10-15 min</strong> (ou cuit-vapeur).",
    "Ajoutez le tahini, les graines de sésame, le miel restant, sel, poivre et la cébette ciselée aux haricots.",
    "Servez la salade de haricots avec le saumon grillé."
   ],
   "claudy": [
    "Le zaatar apporte une complexité d'épices unique — n'hésitez pas à en mettre une bonne couche sur le saumon.",
    "Pour un saumon parfaitement caramélisé, veillez à ce qu'il soit bien sec avant de l'assaisonner."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Gardez les haricots verts légèrement croquants pour un contraste de textures parfait."
    },
    {
     "label": "Suggestion",
     "text": "Limonade au gingembre ou thé à la menthe."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · saumon et haricots séparément."
    }
   ],
   "num": 9,
   "totalMin": 20,
   "typeBadges": [
    "Saumon"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p10",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Pizza d'aubergine",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Jambon"
   ],
   "dietTags": [
    "Sans gluten",
    "Sans fruits à coque",
    "Sans œuf"
   ],
   "nutrition": {
    "kcal": 391,
    "lipides": 23,
    "glucides": 15,
    "proteines": 32
   },
   "prepMin": 5,
   "cookMin": 25,
   "prepRaw": "Prép. 5 min · Cuisson 25 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "306 g",
       "name": "aubergine(s)"
      },
      {
       "q": "204 g",
       "name": "jambon blanc"
      },
      {
       "q": "102 g",
       "name": "champignons de Paris"
      },
      {
       "q": "12 feuilles",
       "name": "basilic frais"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "82 g",
       "name": "coulis de tomates"
      },
      {
       "q": "30 g",
       "name": "gruyère râpé"
      },
      {
       "q": "50 g",
       "name": "olives noires"
      },
      {
       "q": "10 g",
       "name": "pignons de pin"
      },
      {
       "q": "2 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "herbes de Provence"
      },
      {
       "q": "2 càc",
       "name": "ail en poudre"
      },
      {
       "q": "",
       "name": "sel"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-af",
     "title": "Astuce Airfryer",
     "text": "−10/20 °C · −20/30 % de temps."
    }
   ],
   "steps": [
    "Préchauffez le four à <strong>200 °C</strong>.",
    "Coupez l'aubergine en tranches de 2 cm. Badigeonnez d'huile d'olive, salez. Faites cuire <strong>15-20 min</strong> sur une plaque.",
    "Laissez refroidir, superposez les tranches pour former un disque. Étalez le coulis de tomates, saupoudrez herbes de Provence et ail.",
    "Ajoutez champignons en lamelles, jambon en morceaux, olives noires et gruyère râpé.",
    "Faites cuire à nouveau <strong>10 min</strong> à 200°C.",
    "Servez avec le basilic frais et les pignons de pin."
   ],
   "claudy": [
    "Bien égouttez les rondelles d'aubergine après la première cuisson — elles libèrent beaucoup d'eau.",
    "Superposez les tranches en les chevauchant légèrement pour un disque bien stable."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Toastez les pignons de pin à sec 2 min avant de servir pour plus de saveur."
    },
    {
     "label": "Suggestion",
     "text": "Roquette assaisonnée en accompagnement."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · réchauffer au four 10 min."
    }
   ],
   "num": 10,
   "totalMin": 30,
   "typeBadges": [
    "Jambon"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p11",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Courgette façon bolognaise",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Végan"
   ],
   "dietTags": [
    "Végan",
    "Sans œuf",
    "Sans fruits à coque"
   ],
   "nutrition": {
    "kcal": 350,
    "lipides": 16,
    "glucides": 27,
    "proteines": 25
   },
   "prepMin": 15,
   "cookMin": 20,
   "prepRaw": "Prép. 15 min · Cuisson 20 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "508 g",
       "name": "courgette(s)"
      },
      {
       "q": "204 g",
       "name": "haché végétal"
      },
      {
       "q": "204 g",
       "name": "carotte(s)"
      },
      {
       "q": "102 g",
       "name": "oignon(s)"
      },
      {
       "q": "2 gousses",
       "name": "ail"
      },
      {
       "q": "10 feuilles",
       "name": "basilic frais"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "366 g",
       "name": "pulpe de tomates"
      },
      {
       "q": "30 g",
       "name": "olives noires"
      },
      {
       "q": "2 càc",
       "name": "levure maltée"
      },
      {
       "q": "2 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-var",
     "title": "Variante carnée",
     "text": "Remplacez le haché végétal par du haché de bœuf ou de veau. Même cuisson."
    }
   ],
   "steps": [
    "Pelez la carotte, l'oignon et l'ail. Coupez en petits dés.",
    "Faites revenir carotte, oignon et ail avec l'huile d'olive <strong>3 min</strong>. Ajoutez pulpe de tomates, olives, basilic, sel, poivre. Mijotez <strong>20 min</strong>. Incorporez le haché végétal et cuisez quelques minutes.",
    "À l'aide d'un économe, taillez de longues lanières fines de courgette dans le sens de la longueur pour obtenir des tagliatelles.",
    "Faites revenir les tagliatelles de courgette dans une poêle chaude avec l'huile, sel et poivre <strong>3 min</strong>.",
    "Dressez avec la bolognaise et la levure maltée."
   ],
   "claudy": [
    "La levure maltée apporte une saveur umami et fromagée naturelle — ne la sautez pas.",
    "Tournez les courgettes en tagliatelles avec un économe : simple, rapide, sans matériel spécial."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Ne surcuisez pas les tagliatelles de courgette — 3 min maximum pour garder la texture."
    },
    {
     "label": "Suggestion",
     "text": "Eau infusée basilic et citron."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · les tagliatelles séparément."
    }
   ],
   "num": 11,
   "totalMin": 35,
   "typeBadges": [
    "Végan"
   ],
   "isVegan": true,
   "isVeggie": true
  },
  {
   "id": "p12",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Aubergine farcie",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Végan"
   ],
   "dietTags": [
    "Végan",
    "Sans gluten",
    "Sans œuf"
   ],
   "nutrition": {
    "kcal": 411,
    "lipides": 15,
    "glucides": 35,
    "proteines": 34
   },
   "prepMin": 15,
   "cookMin": 50,
   "prepRaw": "Prép. 15 min · Cuisson 50 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "1018 g",
       "name": "aubergine(s)"
      },
      {
       "q": "204 g",
       "name": "haché végétal"
      },
      {
       "q": "162 g",
       "name": "lentilles vertes cuites"
      },
      {
       "q": "102 g",
       "name": "oignon(s)"
      },
      {
       "q": "2 gousses",
       "name": "ail"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "30 g",
       "name": "pesto"
      },
      {
       "q": "2 càc",
       "name": "concentré de tomates"
      },
      {
       "q": "10 g",
       "name": "poudre d'amandes"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-var",
     "title": "Variante carnée",
     "text": "Remplacez le haché végétal par du haché de bœuf ou de dinde. Même cuisson."
    },
    {
     "cls": "p-t-af",
     "title": "Astuce Airfryer",
     "text": "−10/20 °C · −20/30 % de temps."
    }
   ],
   "steps": [
    "Préchauffez le four à <strong>200 °C</strong>.",
    "Lavez l'aubergine. Coupez le dessus dans le sens de la longueur et creusez pour enlever la chair. Piquez à la fourchette.",
    "Enfournez <strong>30 min</strong> environ.",
    "Émincez finement l'oignon, la chair de l'aubergine et l'ail. Faites-les revenir avec le pesto, un fond d'eau, sel et poivre <strong>10 min</strong>. Ajoutez le haché végétal, le concentré de tomates et les lentilles.",
    "Farcissez l'aubergine cuite, saupoudrez de poudre d'amande et remettez au four <strong>20 min</strong>."
   ],
   "claudy": [
    "Piquez bien l'aubergine avant la première cuisson pour une chair qui cuit uniformément.",
    "La poudre d'amandes en topping apporte un croustillant et une saveur grillée agréables."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Égouttez bien la chair de l'aubergine pour éviter que la farce soit trop humide."
    },
    {
     "label": "Suggestion",
     "text": "Salade verte à l'huile d'olive et citron."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · réchauffer au four."
    }
   ],
   "num": 12,
   "totalMin": 65,
   "typeBadges": [
    "Végan"
   ],
   "isVegan": true,
   "isVeggie": true
  },
  {
   "id": "p13",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Soupe de tomates rôties, jambon & œuf mollet",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Jambon"
   ],
   "dietTags": [
    "Sans fruits à coque",
    "Sans arachide",
    "Rapide"
   ],
   "nutrition": {
    "kcal": 445,
    "lipides": 20,
    "glucides": 24,
    "proteines": 43
   },
   "prepMin": 10,
   "cookMin": 45,
   "prepRaw": "Prép. 10 min · Cuisson 45 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "712 g",
       "name": "tomate(s)"
      },
      {
       "q": "204 g",
       "name": "dés de jambon blanc"
      },
      {
       "q": "2",
       "name": "œuf(s)"
      },
      {
       "q": "102 g",
       "name": "oignon(s)"
      },
      {
       "q": "6 gousses",
       "name": "ail"
      },
      {
       "q": "10 feuilles",
       "name": "basilic frais"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "184 g",
       "name": "skyr"
      },
      {
       "q": "2 cubes",
       "name": "bouillon de légumes"
      },
      {
       "q": "10 g",
       "name": "pignons de pin"
      },
      {
       "q": "2 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "origan"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-af",
     "title": "Astuce Airfryer",
     "text": "−10/20 °C · −20/30 % de temps."
    }
   ],
   "steps": [
    "Préchauffez le four à <strong>210 °C</strong>.",
    "Découpez les tomates et l'oignon, épluchez l'ail. Disposez sur plaque, arrosez d'huile, assaisonnez. Enfournez <strong>40 min</strong>.",
    "Mixez les légumes rôtis avec le bouillon chaud pour obtenir un velouté. Rectifiez.",
    "Cuisez les œufs <strong>6 min</strong> dans l'eau frémissante pour des œufs mollets. Refroidissez et écalez.",
    "Faites revenir les dés de jambon à sec <strong>2 min</strong>. Servez la soupe avec jambon, skyr, pignons de pin, œuf mollet et basilic."
   ],
   "claudy": [
    "La rôtisserie des tomates concentre et caramélise leurs sucres naturels — c'est toute la magie de cette soupe.",
    "Un œuf mollet bien réussi : 6 min exactement dans l'eau frémissante, puis bain d'eau froide immédiat."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Pelez les tomates rôties avant de mixer pour une texture plus lisse."
    },
    {
     "label": "Suggestion",
     "text": "Pain de campagne grillé pour tremper."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · œufs et jambon séparément."
    }
   ],
   "num": 13,
   "totalMin": 55,
   "typeBadges": [
    "Jambon"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p14",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Purée de patate douce, steak chimichurri & haricots",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Bœuf"
   ],
   "dietTags": [
    "Sans gluten",
    "Sans fruits à coque",
    "Sans œuf"
   ],
   "nutrition": {
    "kcal": 411,
    "lipides": 17,
    "glucides": 29,
    "proteines": 37
   },
   "prepMin": 10,
   "cookMin": 45,
   "prepRaw": "Prép. 10 min · Cuisson 45 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "254 g",
       "name": "bœuf (steak)"
      },
      {
       "q": "244 g",
       "name": "patate(s) douce(s)"
      },
      {
       "q": "244 g",
       "name": "haricots verts"
      },
      {
       "q": "10 feuilles",
       "name": "coriandre fraîche"
      },
      {
       "q": "10 feuilles",
       "name": "persil frais"
      },
      {
       "q": "2 gousses",
       "name": "ail"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "20 ml",
       "name": "huile d'olive"
      },
      {
       "q": "2 càc",
       "name": "vinaigre de cidre"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "piment d'Espelette"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-af",
     "title": "Astuce Airfryer",
     "text": "−10/20 °C · −20/30 % de temps."
    }
   ],
   "steps": [
    "Préchauffez le four à <strong>180 °C</strong>. Piquez la patate douce et enfournez <strong>45 min</strong>.",
    "Hachez finement l'ail, le persil et la coriandre. Mélangez avec l'huile d'olive, le piment d'Espelette et le vinaigre de cidre pour la sauce chimichurri.",
    "Faites dorer le steak dans une poêle très chaude <strong>4 min</strong> selon la cuisson désirée. Salez, poivrez.",
    "Cuisez les haricots verts à l'eau bouillante <strong>6 min</strong>, puis faites-les revenir à la poêle.",
    "Écrasez la patate douce en purée. Dressez avec les haricots, le steak découpé et la sauce chimichurri."
   ],
   "claudy": [
    "Laissez reposer le steak 2-3 min après cuisson avant de le couper — les sucs se redistribuent.",
    "La sauce chimichurri se prépare 1 heure à l'avance : les herbes infusent et le résultat est bien meilleur."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Servez la sauce chimichurri à température ambiante, jamais froide."
    },
    {
     "label": "Suggestion",
     "text": "Bière artisanale légère ou limonade maison."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · steak de préférence rosé pour la conservation."
    }
   ],
   "num": 14,
   "totalMin": 55,
   "typeBadges": [
    "Bœuf"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p15",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Wrap méditerranéen",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Jambon cru"
   ],
   "dietTags": [
    "Sans fruits à coque",
    "Sans arachide",
    "Gourmande"
   ],
   "nutrition": {
    "kcal": 376,
    "lipides": 23,
    "glucides": 24,
    "proteines": 20
   },
   "prepMin": 5,
   "cookMin": 5,
   "prepRaw": "Prép. 5 min · Cuisson 5 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "72 g",
       "name": "jambon cru"
      },
      {
       "q": "142 g",
       "name": "poivron(s)"
      },
      {
       "q": "62 g",
       "name": "tomates cerises"
      },
      {
       "q": "40 g",
       "name": "billes de mozzarella"
      },
      {
       "q": "1 poignée",
       "name": "roquette"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "2",
       "name": "wraps (tortillas)"
      },
      {
       "q": "82 g",
       "name": "houmous"
      },
      {
       "q": "1 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Lavez les poivrons et les tomates cerises. Coupez les poivrons en lamelles, les tomates en deux.",
    "Faites revenir les poivrons dans une poêle avec un filet d'huile d'olive <strong>5 min</strong>.",
    "Tartinez les wraps avec le houmous.",
    "Ajoutez la roquette, les poivrons, les tomates cerises, la mozzarella, le jambon cru et le poivre.",
    "Refermez les bords, roulez et coupez en deux."
   ],
   "claudy": [
    "Le houmous remplace avantageusement la mayonnaise — bien plus nutritif et savoureux.",
    "Chauffez légèrement le wrap 30 sec au micro-ondes avant de garnir : il se roule mieux."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Ne surchargez pas le wrap pour qu'il se roule facilement sans déborder."
    },
    {
     "label": "Suggestion",
     "text": "Eau pétillante au citron ou jus de grenade."
    },
    {
     "label": "Conservation",
     "text": "À consommer immédiatement · à préparer au dernier moment."
    }
   ],
   "num": 15,
   "totalMin": 10,
   "typeBadges": [
    "Jambon cru"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p16",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Omelette forestière, feta & noisettes grillées",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Végétarien"
   ],
   "dietTags": [
    "Végétarien",
    "Sans arachide",
    "Gourmande"
   ],
   "nutrition": {
    "kcal": 404,
    "lipides": 27,
    "glucides": 18,
    "proteines": 25
   },
   "prepMin": 7,
   "cookMin": 8,
   "prepRaw": "Prép. 7 min · Cuisson 8 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "4",
       "name": "œuf(s)"
      },
      {
       "q": "204 g",
       "name": "champignons de Paris"
      },
      {
       "q": "62 g",
       "name": "oignon(s)"
      },
      {
       "q": "40 g",
       "name": "feta"
      },
      {
       "q": "20 g",
       "name": "noisettes"
      },
      {
       "q": "6 feuilles",
       "name": "persil frais"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "90 g",
       "name": "pain complet"
      },
      {
       "q": "2 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-var",
     "title": "Variante carnée",
     "text": "Ajoutez des dés de jambon blanc ou des lardons fumés dans la poêlée de champignons avant de verser les œufs."
    }
   ],
   "steps": [
    "Nettoyez et émincez les champignons et l'oignon.",
    "Faites-les revenir dans une poêle avec l'huile d'olive <strong>7 min</strong> jusqu'à dorure. Salez, poivrez.",
    "Battez les œufs dans un bol avec sel et poivre. Versez sur les champignons cuits.",
    "Cuisez à feu doux sans remuer jusqu'à ce que l'omelette soit prise.",
    "Émiettez la feta par-dessus, ajoutez les noisettes concassées et le persil. Laissez fondre légèrement la feta. Accompagnez d'une tranche de pain."
   ],
   "claudy": [
    "Ne remuez jamais une omelette en train de cuire : la patience donne une texture crémeuse parfaite.",
    "Torréfiez les noisettes à sec 2 min avant de les incorporer — le goût est incomparable."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Feu très doux et couvercle pour les 2 dernières minutes : l'omelette cuit par le dessus sans croûte."
    },
    {
     "label": "Suggestion",
     "text": "Salade verte légèrement vinaigrée."
    },
    {
     "label": "Conservation",
     "text": "À déguster immédiatement · une omelette froide perd toute sa texture."
    }
   ],
   "num": 16,
   "totalMin": 15,
   "typeBadges": [
    "Végétarien"
   ],
   "isVegan": false,
   "isVeggie": true
  },
  {
   "id": "p17",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Lasagnes de courgettes",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Végétarien"
   ],
   "dietTags": [
    "Végétarien",
    "Sans arachide",
    "Sans œuf"
   ],
   "nutrition": {
    "kcal": 396,
    "lipides": 19,
    "glucides": 27,
    "proteines": 30
   },
   "prepMin": 15,
   "cookMin": 45,
   "prepRaw": "Prép. 15 min · Cuisson 45 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "509 g",
       "name": "courgette(s)"
      },
      {
       "q": "203 g",
       "name": "haché végétal"
      },
      {
       "q": "41 g",
       "name": "mozzarella râpée"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "407 g",
       "name": "coulis de tomates"
      },
      {
       "q": "81 ml",
       "name": "crème de soja"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-var",
     "title": "Variante carnée",
     "text": "Remplacez le haché végétal par du haché de bœuf ou de dinde. Même cuisson."
    },
    {
     "cls": "p-t-af",
     "title": "Astuce Airfryer",
     "text": "−10/20 °C · −20/30 % de temps."
    }
   ],
   "steps": [
    "Préchauffez le four à <strong>180 °C</strong>.",
    "Lavez les courgettes et taillez-les en fines lamelles à la mandoline.",
    "Mélangez le haché végétal avec le coulis de tomates, le sel et le poivre.",
    "Montez les lasagnes en alternant : courgettes, sauce tomate, filet de crème de soja. Répétez.",
    "Terminez par la mozzarella râpée.",
    "Enfournez <strong>45 min</strong> environ."
   ],
   "claudy": [
    "Salez légèrement les lamelles de courgette 15 min avant le montage — elles libèrent leur eau et les lasagnes seront moins liquides.",
    "La crème de soja apporte de la douceur sans alourdir : versez-la en filet à chaque couche."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Laissez reposer 10 min après cuisson avant de couper pour des parts bien nettes."
    },
    {
     "label": "Suggestion",
     "text": "Salade de roquette au parmesan."
    },
    {
     "label": "Conservation",
     "text": "3-4 jours au frigo · se réchauffent très bien."
    }
   ],
   "num": 17,
   "totalMin": 60,
   "typeBadges": [
    "Végétarien"
   ],
   "isVegan": false,
   "isVeggie": true
  },
  {
   "id": "p18",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Cabillaud et courgettes rôties",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Poisson"
   ],
   "dietTags": [
    "Pesco-végétarien",
    "Sans gluten",
    "Sans arachide"
   ],
   "nutrition": {
    "kcal": 404,
    "lipides": 19,
    "glucides": 21,
    "proteines": 38
   },
   "prepMin": 15,
   "cookMin": 20,
   "prepRaw": "Prép. 15 min · Cuisson 20 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "204 g",
       "name": "pavé(s) de cabillaud"
      },
      {
       "q": "306 g",
       "name": "courgette(s)"
      },
      {
       "q": "4 poignées",
       "name": "herbes fraîches"
      },
      {
       "q": "92 g",
       "name": "skyr"
      },
      {
       "q": "2",
       "name": "citron(s) jaune(s)"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "50 g",
       "name": "mozzarella"
      },
      {
       "q": "20 g",
       "name": "pignons de pin"
      },
      {
       "q": "20 g",
       "name": "miel"
      },
      {
       "q": "20 ml",
       "name": "sauce tamari"
      },
      {
       "q": "2 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "paprika"
      },
      {
       "q": "2 càc",
       "name": "origan"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-var",
     "title": "Variante carnée",
     "text": "Remplacez le cabillaud par des filets de poulet marinés de la même façon. Cuisson 20 min au four à 200 °C."
    },
    {
     "cls": "p-t-af",
     "title": "Astuce Airfryer",
     "text": "−10/20 °C · −20/30 % de temps."
    }
   ],
   "steps": [
    "Préchauffez le four à <strong>200 °C</strong>.",
    "Coupez les courgettes en deux et quadrillez-les.",
    "Préparez la marinade : mélangez l'huile d'olive, le paprika, la moitié du miel, l'origan et la sauce tamari. Badigeonnez courgettes et poisson.",
    "Disposez sur une plaque. Enfournez <strong>20 min</strong>.",
    "Préparez la sauce : mixez le skyr, la mozzarella, le jus de citron, les herbes, le reste de miel et du sel.",
    "Dressez avec la sauce, les courgettes rôties et le poisson. Parsemez de pignons de pin."
   ],
   "claudy": [
    "Quadriller les courgettes permet à la marinade de bien pénétrer — ne sautez pas cette étape.",
    "Séchez bien le cabillaud avant de le badigeonner pour que la marinade adhère parfaitement."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Toastez les pignons de pin à la poêle à sec pour plus de saveur et de croustillant."
    },
    {
     "label": "Suggestion",
     "text": "Vin blanc sec (Muscadet ou Picpoul de Pinet)."
    },
    {
     "label": "Conservation",
     "text": "1 jour · le poisson ne se conserve pas longtemps."
    }
   ],
   "num": 18,
   "totalMin": 35,
   "typeBadges": [
    "Poisson"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p19",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Mini burgers de courgette",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Bœuf haché"
   ],
   "dietTags": [
    "Sans gluten",
    "Sans arachide",
    "Sans œuf"
   ],
   "nutrition": {
    "kcal": 355,
    "lipides": 20,
    "glucides": 9,
    "proteines": 37
   },
   "prepMin": 5,
   "cookMin": 17,
   "prepRaw": "Prép. 5 min · Cuisson 17 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "508 g",
       "name": "courgette(s)"
      },
      {
       "q": "204 g",
       "name": "bœuf haché"
      },
      {
       "q": "162 g",
       "name": "tomate(s)"
      },
      {
       "q": "62 g",
       "name": "mozzarella"
      },
      {
       "q": "30 g",
       "name": "oignon(s)"
      },
      {
       "q": "2 gousses",
       "name": "ail"
      },
      {
       "q": "12 feuilles",
       "name": "basilic frais"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "10 g",
       "name": "mix de graines"
      },
      {
       "q": "2 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-af",
     "title": "Astuce Airfryer",
     "text": "−10/20 °C · −20/30 % de temps."
    }
   ],
   "steps": [
    "Préchauffez le four à <strong>200 °C</strong>. Coupez courgettes, tomate et mozzarella en rondelles de même taille.",
    "Faites revenir les rondelles de courgette dans l'huile d'olive <strong>4 min</strong> de chaque côté. Réservez.",
    "Mélangez oignon et ail hachés finement, basilic et bœuf haché. Salez, poivrez. Formez des petits steaks et cuisez <strong>2-3 min</strong> de chaque côté.",
    "Empilez : courgette, steak, tomate, mozzarella, courgette. Piquez d'un cure-dent. Ajoutez les graines.",
    "Enfournez <strong>10 min</strong>."
   ],
   "claudy": [
    "Découpez toutes les tranches à l'aide d'un emporte-pièce pour des mini-burgers parfaitement réguliers.",
    "Le cure-dent est indispensable pour maintenir l'empilement pendant la cuisson au four."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Faites bien dorer les courgettes avant l'assemblage — elles doivent être légèrement caramélisées."
    },
    {
     "label": "Suggestion",
     "text": "Sauce au yaourt et herbes fraîches en accompagnement."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · réchauffer au four 8 min."
    }
   ],
   "num": 19,
   "totalMin": 22,
   "typeBadges": [
    "Bœuf haché"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p20",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Courgettes farcies",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Bœuf haché"
   ],
   "dietTags": [
    "Sans gluten",
    "Sans arachide",
    "Sans fruits à coque"
   ],
   "nutrition": {
    "kcal": 351,
    "lipides": 17,
    "glucides": 11,
    "proteines": 39
   },
   "prepMin": 10,
   "cookMin": 50,
   "prepRaw": "Prép. 10 min · Cuisson 50 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "214 g",
       "name": "bœuf haché"
      },
      {
       "q": "407 g",
       "name": "courgette(s)"
      },
      {
       "q": "102 g",
       "name": "oignon(s)"
      },
      {
       "q": "1",
       "name": "œuf"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "31 g",
       "name": "gruyère râpé"
      },
      {
       "q": "1 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "ail en poudre"
      },
      {
       "q": "1 càc",
       "name": "herbes de Provence"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-af",
     "title": "Astuce Airfryer",
     "text": "−10/20 °C · −20/30 % de temps."
    }
   ],
   "steps": [
    "Préchauffez le four à <strong>180 °C</strong> (ou votre Airfryer).",
    "Coupez les courgettes en deux et évidez l'intérieur à l'aide d'une petite cuillère. Pelez l'oignon et coupez-le en morceaux.",
    "Faites revenir l'oignon et la chair des courgettes dans une poêle avec l'huile d'olive <strong>10 min</strong>. Mixez grossièrement en conservant quelques morceaux.",
    "Mélangez cette farce avec le bœuf haché, l'œuf, l'ail en poudre, les herbes de Provence, le sel, le poivre et la moitié du gruyère râpé.",
    "Garnissez l'intérieur des courgettes avec la farce. Ajoutez le gruyère restant sur le dessus.",
    "Disposez dans un plat allant au four. Enfournez <strong>50 min</strong>."
   ],
   "claudy": [
    "Évidez les courgettes sans les percer — une cuillère à melon est l'outil parfait pour cette opération.",
    "Mixez grossièrement la chair de courgette : quelques morceaux dans la farce apportent de la texture et du goût."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Égouttez bien la chair de courgette avant de l'incorporer à la farce pour éviter qu'elle soit trop humide."
    },
    {
     "label": "Suggestion",
     "text": "Salade verte assaisonnée ou yaourt à l'ail en accompagnement."
    },
    {
     "label": "Conservation",
     "text": "3-4 jours au frigo dans un Tupperware hermétique."
    }
   ],
   "num": 20,
   "totalMin": 60,
   "typeBadges": [
    "Bœuf haché"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p21",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Tagliatelles de courgette et crevettes au curry",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Crevettes"
   ],
   "dietTags": [
    "Sans gluten",
    "Sans lactose",
    "Rapide"
   ],
   "nutrition": {
    "kcal": 310,
    "lipides": 10,
    "glucides": 14,
    "proteines": 36
   },
   "prepMin": 5,
   "cookMin": 12,
   "prepRaw": "Prép. 5 min · Cuisson 12 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "300 g",
       "name": "crevettes décortiquées"
      },
      {
       "q": "2-3",
       "name": "courgette(s)"
      },
      {
       "q": "1",
       "name": "poivron vert"
      },
      {
       "q": "1",
       "name": "poivron rouge"
      },
      {
       "q": "1",
       "name": "oignon"
      },
      {
       "q": "1 gousse",
       "name": "ail"
      },
      {
       "q": "coriandre ou persil",
       "name": "(au goût)"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "4 càc",
       "name": "huile de coco"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "4 càc",
       "name": "curry en poudre"
      },
      {
       "q": "1 pincée",
       "name": "piment"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Faire revenir l'oignon épluché et émincé dans un wok chauffé avec l'huile de coco. Ajouter les poivrons coupés en lamelles et cuire <strong>5 min</strong>.",
    "Laver les courgettes, couper en deux puis détailler en tagliatelles avec un économe. Ajouter au wok, augmenter le feu et faire sauter <strong>quelques minutes</strong>.",
    "Dans une autre poêle, chauffer l'huile de coco restante, l'ail haché et le curry. Ajouter les crevettes avec un peu d'eau.",
    "Une fois les crevettes dorées, les verser dans le wok avec les légumes. Cuire encore <strong>5 min</strong> en ajoutant le piment selon convenance.",
    "Saupoudrer de coriandre ou persil avant de servir."
   ],
   "claudy": [
    "Le wok très chaud est essentiel : les légumes doivent sauter, pas bouillir — sinon les courgettes rendent de l'eau.",
    "Ajoutez les crevettes en fin de cuisson — elles durcissent si elles cuisent trop longtemps."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Coupez les tagliatelles de courgette juste avant de cuisiner pour éviter qu'elles ne détrempent."
    },
    {
     "label": "Suggestion",
     "text": "Eau infusée citron-gingembre ou thé vert glacé."
    },
    {
     "label": "Conservation",
     "text": "À consommer immédiatement · les courgettes ramollissent."
    }
   ],
   "num": 21,
   "totalMin": 17,
   "typeBadges": [
    "Crevettes"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p22",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Poke Bowl facile",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Saumon"
   ],
   "dietTags": [
    "Pesco-végétarien",
    "Sans gluten",
    "Sans lactose",
    "Rapide"
   ],
   "nutrition": {
    "kcal": 420,
    "lipides": 24,
    "glucides": 18,
    "proteines": 35
   },
   "prepMin": 10,
   "cookMin": null,
   "prepRaw": "Prép. 10 min · Cuisson -",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "2 pavés",
       "name": "saumon frais"
      },
      {
       "q": "1",
       "name": "avocat"
      },
      {
       "q": "100 g",
       "name": "carotte(s)"
      },
      {
       "q": "100 g",
       "name": "chou rouge"
      },
      {
       "q": "2 poignées",
       "name": "jeunes pousses de salade"
      },
      {
       "q": "ciboulette fraîche",
       "name": "(au goût)"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "2 càs",
       "name": "tamari (sauce soja japonaise)"
      },
      {
       "q": "2 càc",
       "name": "graines de chia"
      },
      {
       "q": "2 càc",
       "name": "graines de sésame"
      },
      {
       "q": "1 càs",
       "name": "huile de sésame (ou olive)"
      },
      {
       "q": "1 càc",
       "name": "vinaigre balsamique"
      },
      {
       "q": "1 càc",
       "name": "sauce soja"
      },
      {
       "q": "jus de citron vert",
       "name": ""
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "1 càc",
       "name": "gingembre en poudre"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Retirer la peau du saumon et le couper en dés. Dans un bol, mélanger le jus de citron, le tamari, les graines de chia et de sésame. Ajouter le saumon et laisser mariner <strong>5 min</strong>.",
    "Couper l'avocat en tranches, la carotte en lamelles fines, émincer le chou rouge.",
    "Préparer la vinaigrette : mélanger l'huile de sésame, le vinaigre, le jus de citron, la sauce soja et le gingembre. Saler et poivrer.",
    "Disposer dans deux bols les jeunes pousses, l'avocat, la carotte, le chou rouge et les dés de saumon marinés.",
    "Verser la vinaigrette et saupoudrer de ciboulette finement coupée."
   ],
   "claudy": [
    "Le tamari remplace la sauce soja classique — sans gluten et plus doux, il parfume délicatement le saumon.",
    "Marinez le saumon 5 min max : il doit rester nacré au cœur, pas cuit par l'acide du citron."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Coupez tous les légumes à la mandoline pour une présentation soignée et une texture homogène."
    },
    {
     "label": "Suggestion",
     "text": "Eau de coco ou thé matcha glacé."
    },
    {
     "label": "Conservation",
     "text": "À consommer immédiatement · le saumon mariné se tient 24h au frigo sans les légumes."
    }
   ],
   "num": 22,
   "totalMin": 10,
   "typeBadges": [
    "Saumon"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p23",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Escalope milanaise facile",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Poulet"
   ],
   "dietTags": [
    "Sans gluten",
    "Sans lactose",
    "Rapide"
   ],
   "nutrition": {
    "kcal": 460,
    "lipides": 22,
    "glucides": 18,
    "proteines": 48
   },
   "prepMin": 10,
   "cookMin": 12,
   "prepRaw": "Prép. 10 min · Cuisson 12 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "2 filets",
       "name": "blanc de poulet"
      },
      {
       "q": "12",
       "name": "tomates cerises"
      },
      {
       "q": "2",
       "name": "œuf(s)"
      },
      {
       "q": "1 càs",
       "name": "basilic frais"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "60 g",
       "name": "coulis de tomates 100%"
      },
      {
       "q": "40 g",
       "name": "flocons d'avoine"
      },
      {
       "q": "50 g",
       "name": "fromage de brebis râpé"
      },
      {
       "q": "10 g",
       "name": "huile de coco"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "herbes de Provence"
      },
      {
       "q": "2 càc",
       "name": "ail en poudre"
      },
      {
       "q": "",
       "name": "fleur de sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-af",
     "title": "Astuce Airfryer",
     "text": "−10/20 °C · −20/30 % de temps."
    }
   ],
   "steps": [
    "Faire revenir les tomates cerises avec le coulis de tomates, le basilic et la fleur de sel à petit feu dans une casserole en remuant régulièrement.",
    "Aplatir les filets de poulet avec un rouleau à pâtisserie pour former une escalope.",
    "Dans un bol, mélanger les flocons d'avoine, l'ail en poudre, les herbes de Provence, le poivre et 20 g de fromage râpé — c'est la panure. Battre les œufs dans un autre bol.",
    "Passer chaque filet dans l'œuf puis dans la panure.",
    "Faire chauffer l'huile de coco à feu vif. Cuire les escalopes <strong>5 min</strong> de chaque côté. Couvrir 5-7 min avec la sauce tomate et le reste de fromage."
   ],
   "claudy": [
    "Les flocons d'avoine comme panure, c'est la version low-carb croustillante — bien meilleure que la chapelure classique à mon goût.",
    "Couvrez la poêle pour les 5 dernières minutes : la sauce tomate parfume la viande de l'intérieur."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Aplatissez bien le filet pour une cuisson uniforme — plus c'est fin, plus c'est croustillant."
    },
    {
     "label": "Suggestion",
     "text": "Salade verte citronnée ou eau pétillante au citron."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · réchauffer à la poêle à sec pour garder le croustillant."
    }
   ],
   "num": 23,
   "totalMin": 22,
   "typeBadges": [
    "Poulet"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p24",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Dinde épicée & galettes de légumes",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Dinde"
   ],
   "dietTags": [
    "Sans lactose",
    "Sans gluten",
    "Rapide"
   ],
   "nutrition": {
    "kcal": 320,
    "lipides": 8,
    "glucides": 22,
    "proteines": 38
   },
   "prepMin": 5,
   "cookMin": 15,
   "prepRaw": "Prép. 5 min · Cuisson 15 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "300 g",
       "name": "blanc de dinde"
      },
      {
       "q": "graines au choix",
       "name": ""
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "1.5 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "1 càc",
       "name": "paprika"
      },
      {
       "q": "1 càc",
       "name": "curcuma"
      },
      {
       "q": "1 càc",
       "name": "piment en poudre"
      },
      {
       "q": "0.5 càc",
       "name": "cumin en poudre"
      },
      {
       "q": "0.5 càc",
       "name": "gingembre en poudre"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Préparer la marinade : mélanger l'huile d'olive et toutes les épices. Saler et poivrer.",
    "Retirer les parties blanches du blanc de dinde puis le faire mariner quelques minutes (ou toute une nuit) dans le mélange huile-épices.",
    "Faire dorer dans une poêle le blanc de dinde <strong>5 min</strong> de chaque côté à feu moyen-vif, puis baisser sur feu moyen.",
    "Déposer les galettes de légumes dans la même poêle et faire cuire <strong>10-12 min</strong>, en retournant à mi-cuisson.",
    "Saupoudrer de graines au choix avant de servir."
   ],
   "claudy": [
    "Si vous avez le temps, faites mariner la dinde une nuit au frigo — la différence est spectaculaire.",
    "Les galettes de légumes surgelées dans la même poêle que la dinde : elles absorbent tous les sucs épicés."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Utilisez un mélange de graines (courge, sésame, tournesol) pour varier les textures et les apports."
    },
    {
     "label": "Suggestion",
     "text": "Sauce yaourt à la menthe ou citron pressé."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · réchauffer à la poêle."
    }
   ],
   "num": 24,
   "totalMin": 20,
   "typeBadges": [
    "Dinde"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p25",
   "chapter": "Low-Carb",
   "ctag": "Low-Carb",
   "title": "Chakchouka",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Low-Carb · Faible en glucides",
    "Végétarien"
   ],
   "dietTags": [
    "Végétarien",
    "Sans gluten",
    "Gourmande"
   ],
   "nutrition": {
    "kcal": 504,
    "lipides": 29,
    "glucides": 34,
    "proteines": 28
   },
   "prepMin": 10,
   "cookMin": 15,
   "prepRaw": "Prép. 10 min · Cuisson 15 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "346 g",
       "name": "pulpe de tomates"
      },
      {
       "q": "122 g",
       "name": "poivron(s)"
      },
      {
       "q": "102 g",
       "name": "pois chiches cuits"
      },
      {
       "q": "82 g",
       "name": "oignon(s)"
      },
      {
       "q": "62 g",
       "name": "mozzarella"
      },
      {
       "q": "4",
       "name": "œuf(s)"
      },
      {
       "q": "10 feuilles",
       "name": "persil frais"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "20 ml",
       "name": "huile d'olive"
      },
      {
       "q": "2 càc",
       "name": "concentré de tomates"
      },
      {
       "q": "10 g",
       "name": "sucre de canne"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "cumin"
      },
      {
       "q": "2 càc",
       "name": "paprika"
      },
      {
       "q": "2 càc",
       "name": "ail en poudre"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      },
      {
       "q": "",
       "name": "piment d'Espelette"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-var",
     "title": "Variante carnée",
     "text": "Ajoutez 2 merguez ou quelques lardons fumés avant les œufs pour une version plus carnée."
    }
   ],
   "steps": [
    "Faites revenir l'oignon en lamelles avec l'huile d'olive <strong>3 min</strong>.",
    "Ajoutez poivrons, pulpe de tomates, concentré, sucre, épices. Couvrez <strong>10 min</strong>.",
    "Ajoutez les pois chiches.",
    "Creusez des nids, déposez les œufs, ajoutez la mozzarella. Couvrez quelques minutes.",
    "Salez, poivrez, parsemez de persil."
   ],
   "claudy": [
    "Creusez des nids bien délimités avant d'ajouter les œufs : ils cuisent plus uniformément.",
    "Pour un jaune coulant, retirez du feu dès que les blancs sont opaques."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Un couvercle transparent vous permet de surveiller la cuisson sans perdre la vapeur."
    },
    {
     "label": "Suggestion",
     "text": "Pain pita chaud ou pain de campagne grillé."
    },
    {
     "label": "Conservation",
     "text": "À déguster immédiatement · les œufs ne se réchauffent pas bien."
    }
   ],
   "num": 25,
   "totalMin": 25,
   "typeBadges": [
    "Végétarien"
   ],
   "isVegan": false,
   "isVeggie": true
  },
  {
   "id": "p26",
   "chapter": "High-Carb",
   "ctag": "High-Carb",
   "title": "Ballotine de poulet & riz",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "High-Carb · Riche en glucides",
    "Poulet"
   ],
   "dietTags": [
    "Sans gluten",
    "Sans fruits à coque",
    "Sans arachide"
   ],
   "nutrition": {
    "kcal": 406,
    "lipides": 10,
    "glucides": 43,
    "proteines": 37
   },
   "prepMin": 10,
   "cookMin": 20,
   "prepRaw": "Prép. 10 min · Cuisson 20 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "244 g",
       "name": "blanc de poulet"
      },
      {
       "q": "204 g",
       "name": "épinards frais"
      },
      {
       "q": "40 g",
       "name": "ricotta"
      },
      {
       "q": "2 poignées",
       "name": "herbes fraîches (basilic, persil)"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "102 g",
       "name": "riz basmati"
      },
      {
       "q": "2 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Faites cuire le riz basmati dans de l'eau bouillante salée selon le paquet. Égouttez et réservez.",
    "Faites revenir les épinards quelques minutes jusqu'à réduction. Égouttez soigneusement et hachez-les.",
    "Dans un bol, mélangez épinards, ricotta, herbes fraîches, sel et poivre.",
    "Ouvrez le filet de poulet en portefeuille. Déposez la farce au centre puis roulez en ballotine.",
    "Maintenez avec du film alimentaire spécial cuisson ou de la ficelle. Cuisez dans l'eau frémissante <strong>15-20 min</strong>.",
    "Retirez le film. Pour coloration, dorez rapidement à la poêle. Servez en tranches avec le riz."
   ],
   "claudy": [
    "Égouttez les épinards à fond avant de les incorporer à la farce — l'excès d'eau rend la ballotine molle.",
    "La farce ricotta-épinards est légère et savoureuse, mais vous pouvez y ajouter du parmesan râpé."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Attachez bien la ficelle à chaque extrémité pour que la farce ne s'échappe pas à la cuisson."
    },
    {
     "label": "Suggestion",
     "text": "Salade verte ou légumes vapeur en accompagnement."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · trancher au moment de servir."
    }
   ],
   "num": 26,
   "totalMin": 30,
   "typeBadges": [
    "Poulet"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p27",
   "chapter": "High-Carb",
   "ctag": "High-Carb",
   "title": "Bœuf sauce coco & citron",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "High-Carb · Riche en glucides",
    "Bœuf"
   ],
   "dietTags": [
    "Sans gluten",
    "Sans fruits à coque",
    "Sans arachide"
   ],
   "nutrition": {
    "kcal": 590,
    "lipides": 22,
    "glucides": 56,
    "proteines": 43
   },
   "prepMin": 7,
   "cookMin": 10,
   "prepRaw": "Prép. 7 min · Cuisson 10 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "254 g",
       "name": "bœuf (steak émincé)"
      },
      {
       "q": "204 g",
       "name": "champignons de Paris"
      },
      {
       "q": "2 gousses",
       "name": "ail"
      },
      {
       "q": "12 feuilles",
       "name": "persil frais"
      },
      {
       "q": "20 ml",
       "name": "jus de citron"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "122 g",
       "name": "riz basmati"
      },
      {
       "q": "122 ml",
       "name": "crème de coco"
      },
      {
       "q": "2 càc",
       "name": "moutarde"
      },
      {
       "q": "1,5 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Faites cuire le riz selon les indications du paquet.",
    "Dans une poêle, faites revenir l'ail, puis ajoutez les champignons. Cuisez jusqu'à évaporation de leur eau.",
    "Incorporez la crème de coco et la moutarde. Assaisonnez. Laissez mijoter quelques minutes.",
    "Dans une autre poêle, faites chauffer un filet d'huile d'olive et faites cuire le bœuf.",
    "Dressez dans une assiette avec le riz, la sauce coco-champignons, un filet de jus de citron et le persil ciselé."
   ],
   "claudy": [
    "La crème de coco doit être ajoutée hors du feu pour éviter qu'elle ne tranche — gardez le feu très doux.",
    "Un filet de jus de citron juste avant de servir équilibre parfaitement la richesse de la crème de coco."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Ne surchargez pas la poêle des champignons pour qu'ils dorent plutôt que de bouillir."
    },
    {
     "label": "Suggestion",
     "text": "Thé vert glacé au citron ou eau de coco."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · riz séparément."
    }
   ],
   "num": 27,
   "totalMin": 17,
   "typeBadges": [
    "Bœuf"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p28",
   "chapter": "High-Carb",
   "ctag": "High-Carb",
   "title": "Pavé de bœuf sauce Bercy & linguine",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "High-Carb · Riche en glucides",
    "Bœuf"
   ],
   "dietTags": [
    "Sans fruits à coque"
   ],
   "nutrition": {
    "kcal": 614,
    "lipides": 21,
    "glucides": 69,
    "proteines": 35
   },
   "prepMin": 10,
   "cookMin": 25,
   "prepRaw": "Prép. 10 min · Cuisson 25 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "2 pavés",
       "name": "bœuf mariné"
      },
      {
       "q": "2 gousses",
       "name": "ail"
      },
      {
       "q": "1",
       "name": "oignon"
      },
      {
       "q": "1 sachet",
       "name": "persil frais"
      },
      {
       "q": "¾",
       "name": "échalote"
      },
      {
       "q": "1",
       "name": "carotte"
      },
      {
       "q": "1 feuille",
       "name": "laurier"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "340 g",
       "name": "linguine"
      },
      {
       "q": "20 g",
       "name": "fromage râpé à l'italienne"
      },
      {
       "q": "160 ml",
       "name": "bouillon de bœuf"
      },
      {
       "q": "10 g",
       "name": "beurre"
      },
      {
       "q": "3 càc",
       "name": "vinaigre balsamique"
      },
      {
       "q": "2 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Ciseler l'ail, l'oignon, le persil et l'échalote. Éplucher la carotte en dés de 5 mm. Sortir la viande du frigo, préparer le bouillon.",
    "Faire chauffer l'huile d'olive à feu moyen dans une sauteuse. Faire revenir l'oignon, la carotte et l'ail <strong>3-5 min</strong>. Déglacer avec 40 ml de bouillon. Couvrir et mijoter <strong>6-9 min</strong>.",
    "Cuire les linguine avec la feuille de laurier <strong>12-14 min</strong>. Égoutter, retirer le laurier, ajouter un filet d'huile.",
    "Éponger le bœuf, saler et poivrer. Faire chauffer une poêle à feu vif, cuire la viande <strong>1-2 min</strong> de chaque côté. Réserver sur assiette couverte.",
    "Remettre la poêle sur feu moyen avec les sucs de cuisson. Faire revenir l'échalote <strong>3-5 min</strong>. Déglacer avec 1.5 càs de vinaigre et le bouillon restant. Réduire de moitié.",
    "Hors du feu, incorporer le beurre en petits morceaux au fouet. Saler, poivrer, ajouter ⅔ du persil. Servir les linguine avec la carotte, les tranches de viande et la sauce Bercy. Saupoudrer de fromage râpé."
   ],
   "claudy": [
    "La sauce Bercy, c'est le classique parisien du 18ème siècle : du vinaigre, du beurre monté et des échalotes. Simple mais technique — faites-la hors du feu.",
    "Prolongez la cuisson de la viande de 1-2 min si vous l'aimez bien cuite. Pour moi, saignante c'est la seule option !"
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Montez le beurre hors du feu et au fouet — si la poêle est encore chaude, la sauce tranche."
    },
    {
     "label": "Suggestion",
     "text": "Vin rouge de Bordeaux ou Bourgogne léger."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · sauce séparément."
    }
   ],
   "num": 28,
   "totalMin": 35,
   "typeBadges": [
    "Bœuf"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p29",
   "chapter": "High-Carb",
   "ctag": "High-Carb",
   "title": "Tacos de bœuf aux saveurs asiatiques",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "High-Carb · Riche en glucides",
    "Bœuf haché"
   ],
   "dietTags": [
    "Cuisine du monde",
    "Sans fruits à coque"
   ],
   "nutrition": {
    "kcal": 773,
    "lipides": 46,
    "glucides": 59,
    "proteines": 30
   },
   "prepMin": 10,
   "cookMin": 15,
   "prepRaw": "Prép. 10 min · Cuisson 15 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "200 g",
       "name": "bœuf haché"
      },
      {
       "q": "1 tête",
       "name": "pak choï"
      },
      {
       "q": "2",
       "name": "oignons"
      },
      {
       "q": "1",
       "name": "carotte"
      },
      {
       "q": "1",
       "name": "citron"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "6",
       "name": "mini tortillas"
      },
      {
       "q": "50 ml",
       "name": "mayonnaise"
      },
      {
       "q": "30 ml",
       "name": "sauce chili sucrée et épicée"
      },
      {
       "q": "20 ml",
       "name": "sauce soja"
      },
      {
       "q": "20 ml",
       "name": "huile de tournesol"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Éplucher et couper l'oignon en fines demi-lunes. Couper le citron en quartiers. Émincer le pak choï et râper la carotte.",
    "Faire chauffer l'huile de tournesol dans une grande poêle à feu vif. Faire revenir le bœuf haché, le pak choï et l'oignon <strong>2-4 min</strong> en remuant. Ajouter la sauce soja. Saler, poivrer.",
    "Réchauffer les tortillas dans leur sachet au micro-ondes <strong>35-40 sec</strong>. Ou les sortir et enfourner <strong>3-5 min</strong> à 180 °C.",
    "Mélanger la mayonnaise avec la sauce au chili dans un bol. Doser selon votre goût.",
    "Servir dans des bols la viande et le pak choï. Garnir de sauce, carotte râpée, quartiers de citron et mayo-chili."
   ],
   "claudy": [
    "Le pak choï se cuit très rapidement — 2-3 min max pour garder du croquant et une jolie couleur verte.",
    "La mayo au chili maison en 30 secondes : mélangez les deux sauces selon votre tolérance au piment."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Pour un repas à emporter : réalisez des wraps et emballez-les dans du papier d'aluminium."
    },
    {
     "label": "Suggestion",
     "text": "Bière légère asiatique ou limonade au gingembre."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · tortillas séparément."
    }
   ],
   "num": 29,
   "totalMin": 25,
   "typeBadges": [
    "Bœuf haché"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p30",
   "chapter": "High-Carb",
   "ctag": "High-Carb",
   "title": "Aubergine piquante à la viande hachée",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "High-Carb · Riche en glucides",
    "Bœuf haché"
   ],
   "dietTags": [
    "Sans fruits à coque",
    "Sans arachide"
   ],
   "nutrition": {
    "kcal": 550,
    "lipides": 13,
    "glucides": 65,
    "proteines": 44
   },
   "prepMin": 10,
   "cookMin": 20,
   "prepRaw": "Prép. 10 min · Repos 10 min · Cuisson 20 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "508 g",
       "name": "aubergine(s)"
      },
      {
       "q": "284 g",
       "name": "bœuf haché"
      },
      {
       "q": "4",
       "name": "cébettes"
      },
      {
       "q": "2 gousses",
       "name": "ail"
      },
      {
       "q": "2 càc",
       "name": "gingembre frais râpé"
      },
      {
       "q": "102 g",
       "name": "riz basmati"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "30 ml",
       "name": "vinaigre pour sushi"
      },
      {
       "q": "30 ml",
       "name": "sauce soja salée"
      },
      {
       "q": "10 g",
       "name": "sauce sriracha"
      },
      {
       "q": "20 g",
       "name": "fécule de maïs"
      },
      {
       "q": "8 g",
       "name": "sucre de canne"
      },
      {
       "q": "6 g",
       "name": "graines de sésame"
      },
      {
       "q": "1,5 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      },
      {
       "q": "",
       "name": "piment d'Espelette"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-af",
     "title": "Astuce Airfryer",
     "text": "−10/20 °C · −20/30 % de temps."
    }
   ],
   "steps": [
    "Bâtonnets d'aubergine 5×2 cm, salez, dégorger <strong>10 min</strong>.",
    "Enrobez dans la fécule de maïs.",
    "Revenir l'aubergine à la poêle avec l'huile jusqu'à dorure. Réservez.",
    "Dans la même poêle : ail, gingembre, cébettes, bœuf haché. Faites dorer.",
    "Sauce : soja + vinaigre + 2 càs eau + sucre + sriracha + épices.",
    "Remettre l'aubergine, incorporer la sauce, mijoter <strong>3 min</strong>.",
    "Parsemer sésame + vert cébettes. Servir avec riz basmati cuit."
   ],
   "claudy": [
    "Le dégorgement est l'étape clé : il libère l'humidité et garantit une texture fondante.",
    "Ajustez la sriracha selon votre tolérance — commencez avec 5 g et goûtez !"
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Salez généreusement l'aubergine au dégorgement : elle ne sera pas trop salée après."
    },
    {
     "label": "Suggestion",
     "text": "Thé glacé au gingembre et citron."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · réchauffer à la poêle à feu moyen."
    }
   ],
   "num": 30,
   "totalMin": 30,
   "typeBadges": [
    "Bœuf haché"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p31",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Patate douce farcie à la mexicaine",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Bœuf haché"
   ],
   "dietTags": [
    "Sans gluten",
    "Sans arachide",
    "Cuisine du monde"
   ],
   "nutrition": {
    "kcal": 544,
    "lipides": 17,
    "glucides": 60,
    "proteines": 38
   },
   "prepMin": 10,
   "cookMin": null,
   "prepRaw": "Prép. 10 min · Cuisson 1h10",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "406 g",
       "name": "patate(s) douce(s)"
      },
      {
       "q": "244 g",
       "name": "bœuf haché"
      },
      {
       "q": "162 g",
       "name": "carotte(s)"
      },
      {
       "q": "122 g",
       "name": "maïs cuit"
      },
      {
       "q": "66 g",
       "name": "yaourt à la grecque"
      },
      {
       "q": "62 g",
       "name": "oignon(s)"
      },
      {
       "q": "10 feuilles",
       "name": "coriandre fraîche"
      },
      {
       "q": "0.5",
       "name": "citron vert"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "2 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "épices chili"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-af",
     "title": "Astuce Airfryer",
     "text": "−10/20 °C · −20/30 % de temps."
    }
   ],
   "steps": [
    "Préchauffez le four à <strong>210 °C</strong>. Enfournez les patates douces entières <strong>1h10</strong>.",
    "Revenir oignons + carottes en julienne avec l'huile <strong>3 min</strong>.",
    "Ajouter bœuf haché + sel + poivre + chili. Cuire <strong>6 min</strong>. Ajouter le maïs.",
    "Sauce : yaourt + jus/zeste citron vert + coriandre + sel + poivre.",
    "Inciser les patates, garnir de la préparation viande, napper de sauce."
   ],
   "claudy": [
    "Piquez la patate douce avant d'enfourner : elle cuira plus uniformément.",
    "La sauce yaourt est meilleure préparée 30 min à l'avance."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Vérifiez la cuisson : la pointe d'un couteau doit s'enfoncer sans résistance."
    },
    {
     "label": "Suggestion",
     "text": "Eau infusée citron vert et coriandre fraîche."
    },
    {
     "label": "Conservation",
     "text": "2 jours · réchauffez la garniture séparément de la patate."
    }
   ],
   "num": 31,
   "totalMin": 10,
   "typeBadges": [
    "Bœuf haché"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p32",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Bol de poulet effiloché à la mexicaine",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Poulet"
   ],
   "dietTags": [
    "Sans gluten",
    "Sans arachide",
    "Cuisine du monde"
   ],
   "nutrition": {
    "kcal": 573,
    "lipides": 18,
    "glucides": 65,
    "proteines": 39
   },
   "prepMin": 5,
   "cookMin": 10,
   "prepRaw": "Prép. 5 min · Cuisson 10 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "254 g",
       "name": "blanc de poulet"
      },
      {
       "q": "162 g",
       "name": "tomates cerises"
      },
      {
       "q": "82 g",
       "name": "oignon(s) rouge(s)"
      },
      {
       "q": "0.5",
       "name": "avocat"
      },
      {
       "q": "2 gousses",
       "name": "ail"
      },
      {
       "q": "8 feuilles",
       "name": "coriandre fraîche"
      },
      {
       "q": "0.5",
       "name": "citron vert"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "122 g",
       "name": "riz basmati"
      },
      {
       "q": "20 g",
       "name": "miel"
      },
      {
       "q": "2 càc",
       "name": "concentré de tomates"
      },
      {
       "q": "1 cube",
       "name": "bouillon de volaille"
      },
      {
       "q": "2 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "cumin"
      },
      {
       "q": "2 càc",
       "name": "paprika"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "piment d'Espelette"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Cuire le riz basmati selon le paquet. Réserver.",
    "Revenir le poulet avec l'huile. Ajouter miel, ail, concentré, bouillon dilué dans 150 ml d'eau, cumin, paprika. Mijoter <strong>10 min</strong>.",
    "Effilocher le poulet avec deux fourchettes et remettre dans la sauce.",
    "Mélanger oignon rouge ciselé + tomates cerises + coriandre + jus citron vert + sel + piment.",
    "Écraser l'avocat avec sel et citron vert.",
    "Dresser le bol : riz, poulet, guacamole, salsa."
   ],
   "claudy": [
    "Plus le poulet mijote à feu doux, plus il s'effiloche facilement.",
    "Deux fourchettes en sens inverse : technique infaillible en quelques secondes."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Préparez le poulet la veille — le goût se développe merveilleusement."
    },
    {
     "label": "Suggestion",
     "text": "Jus de citron vert frais pressé avec une feuille de menthe."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · le riz séparément pour éviter qu'il absorbe la sauce."
    }
   ],
   "num": 32,
   "totalMin": 15,
   "typeBadges": [
    "Poulet"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p33",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Poêlé de champignons & poulet",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Poulet"
   ],
   "dietTags": [
    "Sans gluten",
    "Sans arachide",
    "Sans œuf"
   ],
   "nutrition": {
    "kcal": 457,
    "lipides": 15,
    "glucides": 45,
    "proteines": 37
   },
   "prepMin": 10,
   "cookMin": 15,
   "prepRaw": "Prép. 10 min · Cuisson 15 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "204 g",
       "name": "blanc de poulet"
      },
      {
       "q": "204 g",
       "name": "aubergine(s)"
      },
      {
       "q": "162 g",
       "name": "shitakés"
      },
      {
       "q": "142 g",
       "name": "champignons de Paris"
      },
      {
       "q": "82 g",
       "name": "oignon(s)"
      },
      {
       "q": "2",
       "name": "cébettes"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "82 g",
       "name": "riz basmati"
      },
      {
       "q": "20 ml",
       "name": "huile d'olive"
      },
      {
       "q": "10 g",
       "name": "graines de sésame"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Couper champignons en lamelles, oignons en émincé, aubergines en cubes.",
    "Revenir oignons + aubergines + champignons à feu moyen avec l'huile <strong>12 min</strong>.",
    "Cuire le riz basmati selon le paquet.",
    "Dorer le blanc de poulet avec l'huile <strong>6 min</strong> de chaque côté. Saler, poivrer.",
    "Remettre le poulet avec les légumes. Chauffer <strong>3 min</strong> ensemble.",
    "Parsemer de cébettes et graines de sésame."
   ],
   "claudy": [
    "Ne remuez pas trop souvent les champignons : laissez-les dorer d'un côté avant.",
    "Shitakés + champignons de Paris = profondeur umami incomparable."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Une poêle très chaude est essentielle pour dorer sans 'bouillir' les champignons."
    },
    {
     "label": "Suggestion",
     "text": "Sauce soja légère ou quelques gouttes de vinaigre de riz."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · réchauffer à la poêle avec un filet d'huile d'olive."
    }
   ],
   "num": 33,
   "totalMin": 25,
   "typeBadges": [
    "Poulet"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p34",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Poulet tikka massala et champignons",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Poulet"
   ],
   "dietTags": [
    "Sans fruits à coque",
    "Sans arachide",
    "Sans œuf"
   ],
   "nutrition": {
    "kcal": 459,
    "lipides": 10,
    "glucides": 51,
    "proteines": 41
   },
   "prepMin": 10,
   "cookMin": 15,
   "prepRaw": "Prép. 10 min · Cuisson 15 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "204 g",
       "name": "blanc de poulet"
      },
      {
       "q": "172 g",
       "name": "fromage blanc"
      },
      {
       "q": "162 g",
       "name": "coulis de tomates"
      },
      {
       "q": "102 g",
       "name": "champignons de Paris"
      },
      {
       "q": "62 g",
       "name": "oignon(s)"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "102 g",
       "name": "orzo (ou pâtes)"
      },
      {
       "q": "20 ml",
       "name": "jus de citron"
      },
      {
       "q": "2 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "tikka massala"
      },
      {
       "q": "1 càc",
       "name": "ail en poudre"
      },
      {
       "q": "",
       "name": "sel"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-af",
     "title": "Astuce Airfryer",
     "text": "−10/20 °C · −20/30 % de temps."
    }
   ],
   "steps": [
    "Cuire les pâtes orzo selon le paquet. Égoutter et réserver.",
    "Revenir oignon émincé + champignons en lamelles avec l'huile d'olive.",
    "Ajouter le poulet en morceaux, faire dorer.",
    "Incorporer ail en poudre, tikka massala, coulis de tomates, jus de citron, sel et fromage blanc.",
    "Mijoter à feu doux <strong>10 min</strong>. Servir avec les pâtes orzo."
   ],
   "claudy": [
    "Ajoutez le fromage blanc hors du feu pour éviter qu'il tourne.",
    "Plus la sauce mijote, plus elle est parfumée."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Le tikka massala maison (cumin, coriandre, paprika, gingembre, curcuma) est toujours meilleur."
    },
    {
     "label": "Suggestion",
     "text": "Pain naan ou pita pour saucer la sauce tikka."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · ajoutez un peu d'eau chaude au réchauffage."
    }
   ],
   "num": 34,
   "totalMin": 25,
   "typeBadges": [
    "Poulet"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p35",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Wrap de patate douce",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Jambon"
   ],
   "dietTags": [
    "Sans gluten",
    "Sans œuf",
    "Gourmande"
   ],
   "nutrition": {
    "kcal": 452,
    "lipides": 19,
    "glucides": 37,
    "proteines": 35
   },
   "prepMin": 10,
   "cookMin": 15,
   "prepRaw": "Prép. 10 min · Cuisson 15 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "366 g",
       "name": "patate(s) douce(s)"
      },
      {
       "q": "184 g",
       "name": "jambon blanc"
      },
      {
       "q": "82 g",
       "name": "gruyère râpé"
      },
      {
       "q": "8 poignées",
       "name": "mâche"
      },
      {
       "q": "40 g",
       "name": "fromage à tartiner -20%"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-af",
     "title": "Astuce Airfryer",
     "text": "−10/20 °C · −20/30 % de temps."
    },
    {
     "cls": "p-t-var",
     "title": "Variante",
     "text": "Remplacez le jambon par du blanc de dinde ou de poulet."
    }
   ],
   "steps": [
    "Préchauffez le four à <strong>180 °C</strong>.",
    "Pelez et tranchez finement la patate douce à la mandoline.",
    "Disposez en rectangle superposé sur papier cuisson. Assaisonnez, ajoutez le gruyère.",
    "Enfournez <strong>15 min</strong>, jusqu'à dorure.",
    "Étalez le fromage à tartiner encore chaud, garnissez de mâche et jambon, repliez."
   ],
   "claudy": [
    "La mandoline garantit une épaisseur uniforme — des tranches régulières cuisent toutes en même temps.",
    "Garnissez pendant que la patate est encore chaude : le fromage fond légèrement."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Serrez bien le wrap dès la sortie du four pour qu'il garde sa forme."
    },
    {
     "label": "Suggestion",
     "text": "Jus d'orange pressé ou smoothie banane-vanille."
    },
    {
     "label": "Conservation",
     "text": "À déguster chaud et immédiatement · la patate douce ramollit rapidement."
    }
   ],
   "num": 35,
   "totalMin": 25,
   "typeBadges": [
    "Jambon"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p36",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Tagliatelles façon carbonara Healthy",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Jambon"
   ],
   "dietTags": [
    "Sans fruits à coque",
    "Sans lactose",
    "Sans arachide"
   ],
   "nutrition": {
    "kcal": 560,
    "lipides": 25,
    "glucides": 52,
    "proteines": 33
   },
   "prepMin": 10,
   "cookMin": 8,
   "prepRaw": "Prép. 10 min · Cuisson 8 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "152 g",
       "name": "gros champignons de Paris"
      },
      {
       "q": "122 g",
       "name": "jambon blanc"
      },
      {
       "q": "40 g",
       "name": "bacon"
      },
      {
       "q": "50 g",
       "name": "oignon(s)"
      },
      {
       "q": "2 gousses",
       "name": "ail"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "162 g",
       "name": "tagliatelles"
      },
      {
       "q": "184 ml",
       "name": "crème de soja"
      },
      {
       "q": "10 g",
       "name": "parmesan râpé"
      },
      {
       "q": "2 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Épluchez et émincez l'oignon et l'ail. Lavez les champignons et émincez-les finement.",
    "Portez à ébullition un grand volume d'eau et faites cuire les tagliatelles selon les indications du paquet. Égouttez et réservez.",
    "Faites revenir l'ail, l'oignon et les champignons dans une poêle avec l'huile d'olive <strong>5 min</strong>, jusqu'à dorure.",
    "Versez la crème de soja et un peu d'eau selon la consistance souhaitée. Baissez le feu et laissez mijoter quelques minutes.",
    "Découpez le jambon en fines lamelles. Faites revenir jambon et bacon dans une deuxième poêle avec un filet d'huile d'olive <strong>2 min</strong>.",
    "Incorporez jambon et bacon à la poêle de crème de soja. Salez, poivrez. Laissez mijoter <strong>3 min</strong>.",
    "Dressez les tagliatelles et versez la sauce carbonara par-dessus. Saupoudrez de parmesan."
   ],
   "claudy": [
    "La clé d'une bonne carbonara healthy : garder la crème de soja à feu très doux pour qu'elle reste onctueuse sans trancher.",
    "Le bacon apporte le croustillant et le fumé qu'on attend d'une carbonara — ne le supprimez pas !"
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Ajoutez l'eau de cuisson des pâtes progressivement à la sauce pour l'allonger sans la dénaturer."
    },
    {
     "label": "Suggestion",
     "text": "Vin blanc sec ou eau pétillante citronnée."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · les pâtes absorbent la sauce, prévoir un filet d'eau à la réchauffée."
    }
   ],
   "num": 36,
   "totalMin": 18,
   "typeBadges": [
    "Jambon"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p37",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Cabillaud gratiné & riz basmati parfumé",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Poisson"
   ],
   "dietTags": [
    "Pesco-végétarien",
    "Sans gluten",
    "Sans fruits à coque"
   ],
   "nutrition": {
    "kcal": 608,
    "lipides": 23,
    "glucides": 57,
    "proteines": 45
   },
   "prepMin": 10,
   "cookMin": 15,
   "prepRaw": "Prép. 10 min · Cuisson 15 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "264 g",
       "name": "pavé(s) de cabillaud"
      },
      {
       "q": "10 feuilles",
       "name": "persil frais"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "142 g",
       "name": "riz basmati"
      },
      {
       "q": "50 g",
       "name": "gruyère râpé"
      },
      {
       "q": "50 ml",
       "name": "crème de soja"
      },
      {
       "q": "20 g",
       "name": "beurre"
      },
      {
       "q": "2 càc",
       "name": "moutarde"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "paprika"
      },
      {
       "q": "1,5 càc",
       "name": "jus de citron"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-var",
     "title": "Variante carnée",
     "text": "Remplacez le cabillaud par un blanc de poulet. Nappez de la même sauce et enfournez 12 min pour qu'il reste moelleux."
    },
    {
     "cls": "p-t-af",
     "title": "Astuce Airfryer",
     "text": "−10/20 °C · −20/30 % de temps."
    }
   ],
   "steps": [
    "Préchauffez le four à <strong>200 °C</strong> (ou votre Airfryer).",
    "Rincez le riz à l'eau froide. Portez à ébullition et faites cuire selon les indications du paquet. Égouttez.",
    "Assaisonnez le poisson avec le sel, le poivre, le paprika et quelques gouttes de jus de citron. Déposez dans un plat allant au four.",
    "Faites fondre le beurre dans une petite casserole. Ajoutez la moutarde et la crème de soja, fouettez pour bien lier. Versez cette sauce sur le cabillaud.",
    "Parsemez de gruyère râpé. Enfournez <strong>15 min</strong> jusqu'à ce que le dessus soit doré.",
    "Disposez le riz dans une assiette, posez le filet gratiné par-dessus. Nappez d'un filet de jus de cuisson et parsemez de persil frais."
   ],
   "claudy": [
    "Le beurre-moutarde-crème de soja est une sauce simple mais redoutablement efficace sur le poisson — préparez-la à l'avance.",
    "Pour un gratin encore plus doré, passez 2 minutes sous le grill en fin de cuisson."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Séchez bien le cabillaud avec du papier absorbant avant d'assaisonner pour que la sauce adhère parfaitement."
    },
    {
     "label": "Suggestion",
     "text": "Vin blanc sec (Muscadet ou Chablis)."
    },
    {
     "label": "Conservation",
     "text": "1 jour au frigo · le poisson se conserve peu longtemps."
    }
   ],
   "num": 37,
   "totalMin": 25,
   "typeBadges": [
    "Poisson"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p38",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Porc au caramel, riz basmati et brocolis",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Porc"
   ],
   "dietTags": [
    "Sans fruits à coque",
    "Sans arachide",
    "Gourmande"
   ],
   "nutrition": {
    "kcal": 553,
    "lipides": 17,
    "glucides": 56,
    "proteines": 46
   },
   "prepMin": 5,
   "cookMin": 20,
   "prepRaw": "Prép. 5 min · Cuisson 20 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "244 g",
       "name": "porc (émincé)"
      },
      {
       "q": "244 g",
       "name": "brocolis"
      },
      {
       "q": "4 gousses",
       "name": "ail"
      },
      {
       "q": "2 g",
       "name": "graines de sésame"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "102 g",
       "name": "riz basmati"
      },
      {
       "q": "20 ml",
       "name": "sauce soja salée"
      },
      {
       "q": "16 g",
       "name": "sucre de canne"
      },
      {
       "q": "2 càc",
       "name": "sauce nuoc-mâm"
      },
      {
       "q": "2 càc",
       "name": "vinaigre pour sushi"
      },
      {
       "q": "1,5 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "gingembre en poudre"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Rincez le riz sous l'eau froide puis cuisez-le dans de l'eau salée jusqu'à tendreté. Réservez au chaud.",
    "Coupez les brocolis en petits bouquets. Cuisez-les à la vapeur ou à l'eau bouillante pour qu'ils restent légèrement croquants.",
    "Coupez le porc en petits morceaux.",
    "Dans une poêle chaude, versez le sucre de canne et laissez fondre doucement pour obtenir un caramel léger. Ajoutez immédiatement un fond d'eau pour stopper la cuisson et mélangez.",
    "Incorporez la sauce soja, le vinaigre de riz et le nuoc-mâm. Ajoutez l'ail haché et le gingembre, laissez frémir <strong>30 sec</strong>.",
    "Ajoutez le porc et cuisez à feu moyen en remuant jusqu'à ce qu'il soit bien enrobé de sauce et légèrement caramélisé.",
    "Servez avec le riz basmati et les brocolis. Parsemez de graines de sésame et d'un tour de poivre."
   ],
   "claudy": [
    "Le secret du porc au caramel : surveiller attentivement le sucre qui fond — la limite entre caramel et amer est très fine.",
    "Ajoutez l'eau d'un coup dès que le caramel est formé pour créer un glaçage brillant et parfumé."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Coupez le porc en très petits morceaux pour une cuisson rapide et homogène dans le caramel."
    },
    {
     "label": "Suggestion",
     "text": "Bière légère asiatique ou thé vert jasmin glacé."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · le caramel se réabsorbe bien à la poêle à la réchauffée."
    }
   ],
   "num": 38,
   "totalMin": 25,
   "typeBadges": [
    "Porc"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p39",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Boulettes de bœuf, pommes de terre & haricots verts",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Bœuf haché"
   ],
   "dietTags": [
    "Sans fruits à coque",
    "Sans arachide",
    "Sans œuf"
   ],
   "nutrition": {
    "kcal": 542,
    "lipides": 17,
    "glucides": 57,
    "proteines": 40
   },
   "prepMin": 10,
   "cookMin": 20,
   "prepRaw": "Prép. 10 min · Cuisson 20 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "244 g",
       "name": "bœuf haché"
      },
      {
       "q": "406 g",
       "name": "pommes de terre"
      },
      {
       "q": "306 g",
       "name": "haricots verts"
      },
      {
       "q": "62 g",
       "name": "échalote(s)"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "62 ml",
       "name": "crème liquide 15%"
      },
      {
       "q": "14 g",
       "name": "chapelure de blé complet"
      },
      {
       "q": "2 cubes",
       "name": "bouillon de bœuf"
      },
      {
       "q": "2 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre concassé"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Épluchez les pommes de terre, coupez-les en morceaux et faites-les cuire dans de l'eau salée <strong>20 min</strong>.",
    "Formez 8 à 10 boulettes avec le bœuf haché et la chapelure, puis salez légèrement.",
    "Chauffez l'huile d'olive dans une poêle et faites dorer les boulettes. Retirez et réservez.",
    "Faites revenir les échalotes finement ciselées avec le poivre concassé dans la même poêle.",
    "Ajoutez les bouillons de bœuf dilués dans 300 ml d'eau, puis la crème. Laissez mijoter <strong>10-15 min</strong> à feu doux.",
    "Remettez les boulettes dans la sauce et maintenez à feu doux.",
    "Égouttez les pommes de terre, écrasez-les grossièrement avec l'huile d'olive et du sel.",
    "Faites cuire les haricots verts <strong>8-10 min</strong> à l'eau ou à la vapeur.",
    "Servez les boulettes nappées de sauce au poivre avec l'écrasé de pommes de terre et les haricots verts."
   ],
   "claudy": [
    "La chapelure dans les boulettes assure leur cohésion — ne la supprimez pas même si vous êtes pressé.",
    "Déglacez la poêle des boulettes directement avec le bouillon pour récupérer tous les sucs de cuisson."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Écrasez les pommes de terre à la fourchette (pas au mixeur) pour garder une texture rustique et généreuse."
    },
    {
     "label": "Suggestion",
     "text": "Jus de pomme artisanal ou bière brune légère."
    },
    {
     "label": "Conservation",
     "text": "2-3 jours au frigo · boulettes et sauce séparément des légumes."
    }
   ],
   "num": 39,
   "totalMin": 30,
   "typeBadges": [
    "Bœuf haché"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p40",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Velouté d'haricots blancs au lard & croûtons",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Lard"
   ],
   "dietTags": [
    "Sans fruits à coque",
    "Sans arachide",
    "Sans œuf"
   ],
   "nutrition": {
    "kcal": 480,
    "lipides": 12,
    "glucides": 57,
    "proteines": 37
   },
   "prepMin": 10,
   "cookMin": 30,
   "prepRaw": "Prép. 10 min · Cuisson 30 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "122 g",
       "name": "poireau(x)"
      },
      {
       "q": "82 g",
       "name": "oignon(s)"
      },
      {
       "q": "122 g",
       "name": "carotte(s)"
      },
      {
       "q": "4 gousses",
       "name": "ail"
      },
      {
       "q": "122 g",
       "name": "allumettes de bacon"
      },
      {
       "q": "82 g",
       "name": "pain complet"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "406 g",
       "name": "haricots blancs cuits"
      },
      {
       "q": "102 ml",
       "name": "crème liquide 15%"
      },
      {
       "q": "2 feuilles",
       "name": "laurier"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Émincez le poireau, l'oignon, la carotte et l'ail. Faites-les revenir <strong>5 min</strong> dans un filet d'huile d'olive.",
    "Ajoutez les haricots blancs, les feuilles de laurier, salez, poivrez et versez 200 ml d'eau.",
    "Couvrez et laissez mijoter <strong>20 min</strong>.",
    "Ajoutez la crème liquide, poursuivez la cuisson <strong>10 min</strong> puis retirez les feuilles de laurier.",
    "Mixez jusqu'à obtenir une texture lisse et rectifiez l'assaisonnement.",
    "Faites dorer les allumettes de bacon à sec dans une poêle chaude.",
    "Dans la même poêle, faites dorer les croûtons de pain complet.",
    "Servez le velouté bien chaud, garni de lardons dorés et de croûtons croustillants."
   ],
   "claudy": [
    "Un velouté réussi, c'est un mixage long à pleine puissance — prenez le temps, la texture soyeuse en vaut la peine.",
    "Les croûtons dans la même poêle que le bacon : ils absorbent les sucs et deviennent irrésistibles."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Réchauffez doucement le velouté à la casserole en ajoutant un filet d'eau si nécessaire — il épaissit au frigo."
    },
    {
     "label": "Suggestion",
     "text": "Pain de campagne grillé supplémentaire ou vin blanc de Loire."
    },
    {
     "label": "Conservation",
     "text": "3 jours au frigo · les croûtons séparément pour garder le croustillant."
    }
   ],
   "num": 40,
   "totalMin": 40,
   "typeBadges": [
    "Lard"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p41",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Areyes au poulet",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Poulet"
   ],
   "dietTags": [
    "Sans fruits à coque",
    "Sans arachide",
    "Cuisine du monde"
   ],
   "nutrition": {
    "kcal": 567,
    "lipides": 15,
    "glucides": 65,
    "proteines": 43
   },
   "prepMin": 5,
   "cookMin": 10,
   "prepRaw": "Prép. 5 min · Cuisson 10 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "254 g",
       "name": "blanc de poulet"
      },
      {
       "q": "41 g",
       "name": "oignon(s)"
      },
      {
       "q": "1 gousse",
       "name": "ail"
      },
      {
       "q": "102 g",
       "name": "yaourt à la grecque"
      },
      {
       "q": "10 feuilles",
       "name": "coriandre fraîche"
      },
      {
       "q": "5 g",
       "name": "zeste de citron"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "3",
       "name": "pains pita"
      },
      {
       "q": "2 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "cumin"
      },
      {
       "q": "2 càc",
       "name": "paprika"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Mixez le blanc de poulet avec l'oignon, l'ail, le sel, le poivre, la moitié des épices et la moitié des feuilles de coriandre.",
    "Coupez les pains pita en deux et garnissez-les généreusement de cette farce.",
    "Faites cuire les areyes <strong>2 min</strong> côté farce dans une poêle bien chaude avec l'huile d'olive, puis <strong>4-5 min</strong> de chaque côté.",
    "Préparez la sauce en mélangeant le yaourt à la grecque, les zestes de citron, le reste des épices, du sel et la coriandre ciselée.",
    "Servez les areyes bien chauds avec la sauce et un filet de citron."
   ],
   "claudy": [
    "Le secret des areyes : une poêle bien chaude pour une farce saisie et un pain croustillant en même temps.",
    "Mixez le poulet grossièrement — quelques petits morceaux dans la farce donnent plus de mâche."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Appuyez légèrement sur les areyes pendant la cuisson pour une coloration uniforme."
    },
    {
     "label": "Suggestion",
     "text": "Sauce tahini ou salade roquette citron en accompagnement."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · réchauffer à la poêle sans matière grasse."
    }
   ],
   "num": 41,
   "totalMin": 15,
   "typeBadges": [
    "Poulet"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p42",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Riz au saumon, sauce crème citronnée & carottes",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Saumon"
   ],
   "dietTags": [
    "Pesco-végétarien",
    "Sans gluten",
    "Sans arachide"
   ],
   "nutrition": {
    "kcal": 509,
    "lipides": 21,
    "glucides": 51,
    "proteines": 29
   },
   "prepMin": 5,
   "cookMin": 18,
   "prepRaw": "Prép. 5 min · Cuisson 18 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "204 g",
       "name": "saumon frais"
      },
      {
       "q": "224 g",
       "name": "carotte(s)"
      },
      {
       "q": "2",
       "name": "citrons jaunes"
      },
      {
       "q": "6 branches",
       "name": "aneth fraîche"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "92 g",
       "name": "riz basmati"
      },
      {
       "q": "62 ml",
       "name": "crème de soja"
      },
      {
       "q": "1,5 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-var",
     "title": "Variante carnée",
     "text": "Remplacez le saumon par un filet de poulet. Même cuisson 3 min de chaque côté à la poêle, puis déglacez avec la sauce citronnée."
    }
   ],
   "steps": [
    "Portez à ébullition et faites cuire le riz basmati selon les indications du paquet. Égouttez et réservez.",
    "Épluchez les carottes et coupez-les en fines rondelles. Faites-les cuire <strong>10 min</strong> à l'eau bouillante ou au cuit-vapeur jusqu'à tendreté.",
    "Faites revenir le pavé de saumon dans une poêle bien chaude avec l'huile d'olive <strong>3 min</strong> de chaque côté jusqu'à dorure. Réservez.",
    "Dans la même poêle, ajoutez la crème de soja avec le jus et le zeste de citron. Salez, poivrez, ajoutez l'aneth. Laissez épaissir <strong>2 min</strong> à feu doux.",
    "Dressez le riz, ajoutez les rondelles de carottes et le saumon par-dessus. Nappez de sauce citronnée. Décorez avec l'aneth frais."
   ],
   "claudy": [
    "La même poêle pour la sauce après le saumon : elle récupère tous les sucs et la sauce devient infiniment plus savoureuse.",
    "Un peu de zeste de citron dans la sauce fait toute la différence — n'utilisez que du citron non-traité."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Gardez les carottes légèrement al dente pour un contraste de textures agréable avec le riz."
    },
    {
     "label": "Suggestion",
     "text": "Vin blanc sec ou eau infusée citron-aneth."
    },
    {
     "label": "Conservation",
     "text": "2-3 jours au frigo dans un Tupperware hermétique · sauce séparément."
    }
   ],
   "num": 42,
   "totalMin": 23,
   "typeBadges": [
    "Saumon"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p43",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Pâtes bolognaises",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Bœuf haché"
   ],
   "dietTags": [
    "Sans lactose",
    "Sans œuf",
    "Sans fruits à coque"
   ],
   "nutrition": {
    "kcal": 516,
    "lipides": 14,
    "glucides": 60,
    "proteines": 38
   },
   "prepMin": 5,
   "cookMin": 18,
   "prepRaw": "Prép. 5 min · Cuisson 18 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "204 g",
       "name": "bœuf haché"
      },
      {
       "q": "102 g",
       "name": "oignon(s)"
      },
      {
       "q": "162 g",
       "name": "carotte(s)"
      },
      {
       "q": "2 gousses",
       "name": "ail"
      },
      {
       "q": "10 feuilles",
       "name": "basilic frais"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "122 g",
       "name": "spaghettis"
      },
      {
       "q": "204 g",
       "name": "pulpe de tomates"
      },
      {
       "q": "2 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "cumin"
      },
      {
       "q": "2 càc",
       "name": "herbes de Provence"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Portez à ébullition un grand volume d'eau et faites cuire les spaghettis selon les indications du paquet. Égouttez et réservez.",
    "Faites revenir l'oignon et l'ail émincés dans une poêle avec l'huile d'olive <strong>3 min</strong>, jusqu'à ce qu'ils soient translucides.",
    "Ajoutez la pulpe de tomates, les carottes en petits dés, les herbes de Provence, le cumin, le sel et le poivre. Laissez mijoter <strong>10 min</strong> à feu moyen.",
    "Ajoutez le bœuf haché émietté et prolongez la cuisson <strong>5 min</strong> à feu doux.",
    "Dressez les spaghettis et nappez de bolognaise. Parsemez de basilic frais."
   ],
   "claudy": [
    "La carotte dans la bolognaise, c'est le secret belge : elle apporte une douceur naturelle qui équilibre l'acidité de la tomate.",
    "Laissez vraiment mijoter la sauce — 10 min minimum pour que les saveurs se fondent."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Ajoutez quelques cuillères d'eau de cuisson des pâtes dans la sauce pour lier parfaitement."
    },
    {
     "label": "Suggestion",
     "text": "Verre de vin rouge léger ou eau pétillante."
    },
    {
     "label": "Conservation",
     "text": "2-3 jours au frigo · pâtes et sauce séparément de préférence."
    }
   ],
   "num": 43,
   "totalMin": 23,
   "typeBadges": [
    "Bœuf haché"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p44",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Boulettes de poulet sauce coco curry, riz & courgette",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Poulet"
   ],
   "dietTags": [
    "Sans fruits à coque",
    "Sans œuf",
    "Sans arachide"
   ],
   "nutrition": {
    "kcal": 478,
    "lipides": 18,
    "glucides": 48,
    "proteines": 32
   },
   "prepMin": 15,
   "cookMin": 15,
   "prepRaw": "Prép. 15 min · Cuisson 15 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "204 g",
       "name": "blanc de poulet"
      },
      {
       "q": "244 g",
       "name": "courgette(s)"
      },
      {
       "q": "62 g",
       "name": "oignon(s)"
      },
      {
       "q": "2 gousses",
       "name": "ail"
      },
      {
       "q": "1 tranche",
       "name": "pain de mie complet"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "82 g",
       "name": "riz basmati"
      },
      {
       "q": "102 ml",
       "name": "crème de coco"
      },
      {
       "q": "20 ml",
       "name": "lait demi-écrémé"
      },
      {
       "q": "2 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "curry"
      },
      {
       "q": "1 càc",
       "name": "origan"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-af",
     "title": "Astuce Airfryer",
     "text": "−10/20 °C · −20/30 % de temps."
    }
   ],
   "steps": [
    "Préparez les boulettes : mixez le poulet avec le pain trempé dans le lait, le sel, le poivre et une pincée d'origan. Formez 6-8 petites boulettes.",
    "Faites revenir les boulettes dans une poêle chaude avec l'huile d'olive <strong>6 min</strong> de chaque côté jusqu'à dorure. Réservez.",
    "Dans la même poêle, faites revenir l'oignon et l'ail émincés. Ajoutez la crème de coco, le curry, le sel, le poivre et l'origan. Laissez mijoter <strong>5 min</strong> jusqu'à épaississement.",
    "Remettez les boulettes dans la sauce et laissez-les finir de cuire doucement <strong>5 min</strong>.",
    "Faites cuire le riz basmati selon les indications du paquet.",
    "Pelez la courgette et coupez-la en dés. Faites-les revenir dans un filet d'huile d'olive <strong>5 min</strong>.",
    "Dressez le riz, les courgettes sautées et les boulettes nappées de sauce coco-curry."
   ],
   "claudy": [
    "Le pain de mie trempé dans le lait est le secret des boulettes moelleuses — ne le sautez pas !",
    "La crème de coco doit rester à feu doux pour ne pas séparer — surveillez et remuez."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Humidifiez légèrement vos mains pour former des boulettes bien rondes et lisses."
    },
    {
     "label": "Suggestion",
     "text": "Lassi à la mangue ou thé vert jasmin glacé."
    },
    {
     "label": "Conservation",
     "text": "2-3 jours au frigo · boulettes et sauce se conservent très bien."
    }
   ],
   "num": 44,
   "totalMin": 30,
   "typeBadges": [
    "Poulet"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p45",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Boulettes de bœuf sauce tomate, riz & courgette",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Bœuf haché"
   ],
   "dietTags": [
    "Sans œuf",
    "Sans fruits à coque",
    "Sans arachide"
   ],
   "nutrition": {
    "kcal": 461,
    "lipides": 13,
    "glucides": 51,
    "proteines": 35
   },
   "prepMin": 15,
   "cookMin": 15,
   "prepRaw": "Prép. 15 min · Cuisson 15 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "204 g",
       "name": "bœuf haché"
      },
      {
       "q": "244 g",
       "name": "courgette(s)"
      },
      {
       "q": "62 g",
       "name": "oignon(s)"
      },
      {
       "q": "2 gousses",
       "name": "ail"
      },
      {
       "q": "1 tranche",
       "name": "pain de mie complet"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "72 g",
       "name": "riz basmati"
      },
      {
       "q": "204 g",
       "name": "coulis de tomates"
      },
      {
       "q": "20 ml",
       "name": "lait demi-écrémé"
      },
      {
       "q": "2 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "origan"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Préparez les boulettes : mélangez le bœuf haché avec le pain trempé dans le lait, le sel, le poivre et l'origan. Formez 6-8 petites boulettes.",
    "Faites revenir les boulettes dans une poêle chaude avec l'huile d'olive <strong>5 min</strong> jusqu'à dorure. Réservez.",
    "Dans la même poêle, faites revenir l'oignon et l'ail émincés. Ajoutez le coulis de tomates, le sel, le poivre et l'origan. Laissez mijoter <strong>5 min</strong>.",
    "Remettez les boulettes dans la sauce et laissez-les finir de cuire doucement <strong>5 min</strong>.",
    "Faites cuire le riz basmati selon les indications du paquet. Égouttez.",
    "Coupez la courgette en dés et faites-les revenir <strong>5 min</strong> dans un filet d'huile d'olive.",
    "Dressez le riz, les courgettes sautées et les boulettes nappées de sauce tomate."
   ],
   "claudy": [
    "Déglacez la poêle des boulettes avec le coulis de tomates directement — tous les sucs s'incorporent à la sauce.",
    "L'origan est l'âme de cette recette : ne lésinez pas sur la quantité."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Servez avec un bon parmesan râpé si la diète le permet — ça change tout."
    },
    {
     "label": "Suggestion",
     "text": "Eau pétillante ou jus de tomate épicé."
    },
    {
     "label": "Conservation",
     "text": "2-3 jours au frigo · toujours meilleur le lendemain."
    }
   ],
   "num": 45,
   "totalMin": 30,
   "typeBadges": [
    "Bœuf haché"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p46",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Aubergine mijotée à la viande hachée et tomate",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Bœuf haché"
   ],
   "dietTags": [
    "Sans gluten",
    "Sans fruits à coque",
    "Sans arachide"
   ],
   "nutrition": {
    "kcal": 527,
    "lipides": 21,
    "glucides": 45,
    "proteines": 42
   },
   "prepMin": 10,
   "cookMin": 15,
   "prepRaw": "Prép. 10 min · Cuisson 15 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "204 g",
       "name": "bœuf haché"
      },
      {
       "q": "406 g",
       "name": "aubergine(s)"
      },
      {
       "q": "102 g",
       "name": "oignon(s)"
      },
      {
       "q": "2 gousses",
       "name": "ail"
      },
      {
       "q": "40 g",
       "name": "feta"
      },
      {
       "q": "8 feuilles",
       "name": "persil frais"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "92 g",
       "name": "quinoa"
      },
      {
       "q": "306 g",
       "name": "pulpe de tomates"
      },
      {
       "q": "2 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "cumin"
      },
      {
       "q": "2 càc",
       "name": "cannelle"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Rincez le quinoa à l'eau froide. Portez à ébullition et faites cuire selon les indications du paquet. Égouttez et réservez.",
    "Pelez l'aubergine et coupez-la en dés. Émincez l'ail et l'oignon.",
    "Faites revenir l'ail et l'oignon dans une poêle avec l'huile d'olive <strong>3 min</strong> jusqu'à ce qu'ils soient translucides.",
    "Ajoutez le bœuf haché et faites-le dorer. Incorporez la pulpe de tomates, le sel, le poivre, le cumin et la cannelle. Laissez mijoter <strong>10 min</strong> à feu doux.",
    "Ajoutez les dés d'aubergine dans la sauce. Laissez mijoter <strong>5 min</strong> pour qu'elles s'imprègnent bien des saveurs.",
    "Dressez le quinoa et les aubergines à la viande par-dessus. Parsemez de dés de feta et de persil frais."
   ],
   "claudy": [
    "La cannelle dans la bolognaise d'aubergine, c'est le clin d'œil grec (moussaka !) — elle ronde et réchauffe toute la sauce.",
    "Coupez l'aubergine en dés assez petits (1,5 cm) pour qu'elle cuise uniformément dans la sauce."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Salez l'aubergine 10 min avant cuisson pour enlever l'amertume et réduire l'absorption d'huile."
    },
    {
     "label": "Suggestion",
     "text": "Vin rouge léger ou eau infusée citron-menthe."
    },
    {
     "label": "Conservation",
     "text": "2-3 jours au frigo · se réchauffe très bien."
    }
   ],
   "num": 46,
   "totalMin": 25,
   "typeBadges": [
    "Bœuf haché"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p47",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Spaghettis courgette, crevettes & pesto d'avocat",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Crevettes"
   ],
   "dietTags": [
    "Pesco-végétarien",
    "Sans fruits à coque",
    "Sans lactose"
   ],
   "nutrition": {
    "kcal": 542,
    "lipides": 16,
    "glucides": 66,
    "proteines": 35
   },
   "prepMin": 5,
   "cookMin": 10,
   "prepRaw": "Prép. 5 min · Cuisson 10 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "204 g",
       "name": "crevettes décortiquées"
      },
      {
       "q": "306 g",
       "name": "courgette(s)"
      },
      {
       "q": "0.5",
       "name": "avocat(s)"
      },
      {
       "q": "10 feuilles",
       "name": "coriandre fraîche"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "162 g",
       "name": "spaghettis"
      },
      {
       "q": "40 ml",
       "name": "lait d'amande"
      },
      {
       "q": "1,5 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "paprika"
      },
      {
       "q": "2 càc",
       "name": "curry"
      },
      {
       "q": "1 càc",
       "name": "ail en poudre"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-var",
     "title": "Variante carnée",
     "text": "Remplacez les crevettes par des dés de blanc de poulet assaisonnés de paprika et curry. Cuisson 5-6 min à la poêle."
    }
   ],
   "steps": [
    "Réalisez des spaghettis de courgette avec un spiraliseur ou à l'économe. Réservez.",
    "Mixez l'avocat avec l'ail en poudre, le lait d'amande, la coriandre, le sel et la moitié des épices pour obtenir une sauce crémeuse. Ajoutez un peu d'eau si nécessaire.",
    "Portez à ébullition et faites cuire les spaghettis selon les indications du paquet. Égouttez.",
    "Faites revenir les spaghettis de courgette dans l'huile d'olive <strong>3 min</strong>. Salez et poivrez. Réservez.",
    "Dans la même poêle, faites cuire les crevettes avec le reste des épices <strong>2-3 min</strong>.",
    "Mélangez les spaghettis, les spaghettis de courgette et le pesto d'avocat. Ajoutez les crevettes et servez immédiatement."
   ],
   "claudy": [
    "Le pesto d'avocat s'oxyde rapidement — préparez-le au dernier moment et citronez-le si vous l'anticipez.",
    "Les spaghettis de courgette ne doivent cuire que 3 min : ils doivent rester légèrement croquants."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Servez immédiatement — le pesto d'avocat tient mal au réchauffage."
    },
    {
     "label": "Suggestion",
     "text": "Vin blanc fruité ou eau pétillante à la menthe."
    },
    {
     "label": "Conservation",
     "text": "À consommer le jour même · le pesto d'avocat noircit."
    }
   ],
   "num": 47,
   "totalMin": 15,
   "typeBadges": [
    "Crevettes"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p48",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Bœuf, champignons & purée de céleri",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Bœuf"
   ],
   "dietTags": [
    "Sans gluten",
    "Sans fruits à coque",
    "Sans arachide"
   ],
   "nutrition": {
    "kcal": 423,
    "lipides": 16,
    "glucides": 30,
    "proteines": 40
   },
   "prepMin": 10,
   "cookMin": 20,
   "prepRaw": "Prép. 10 min · Cuisson 20 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "306 g",
       "name": "rôti de bœuf"
      },
      {
       "q": "244 g",
       "name": "céleri-rave"
      },
      {
       "q": "122 g",
       "name": "pommes de terre"
      },
      {
       "q": "162 g",
       "name": "champignons de Paris"
      },
      {
       "q": "62 g",
       "name": "échalote(s)"
      },
      {
       "q": "2 gousses",
       "name": "ail"
      },
      {
       "q": "10 feuilles",
       "name": "persil frais"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "30 ml",
       "name": "crème liquide 15%"
      },
      {
       "q": "14 ml",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "thym"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Épluchez et coupez le céleri-rave et les pommes de terre en morceaux. Faites-les cuire <strong>20 min</strong> dans de l'eau bouillante (ou au cuit-vapeur). Égouttez.",
    "Mixez ou écrasez en purée avec la crème liquide, le sel et le poivre. Ajustez la texture avec un peu d'eau de cuisson si nécessaire.",
    "Coupez les champignons en lamelles. Faites-les revenir dans une poêle chaude avec l'huile d'olive <strong>5 min</strong> à feu vif jusqu'à évaporation de l'eau. Ajoutez l'ail haché, salez, poivrez, poursuivez <strong>1 min</strong>. Incorporez le persil hors du feu.",
    "Saisissez le bœuf dans une poêle chaude avec l'huile <strong>1 min 30 par face</strong> (saignant) ou <strong>2 min</strong> (à point). Ajoutez l'échalote émincée, le thym et l'ail écrasé. Arrosez avec les sucs de cuisson.",
    "Laissez reposer <strong>3 min</strong> à couvert. Coupez en tranches.",
    "Dressez la purée, ajoutez la poêlée de champignons et les tranches de bœuf. Parsemez de persil frais."
   ],
   "claudy": [
    "Laissez toujours reposer la viande après cuisson — les sucs se redistribuent et chaque bouchée est juteuse.",
    "La purée céleri-rave est bien plus intéressante que la pomme de terre seule : osez le mélange 50/50."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Chauffez l'assiette avant de dresser pour que la purée reste bien chaude."
    },
    {
     "label": "Suggestion",
     "text": "Vin rouge léger (Pinot Noir) ou eau pétillante."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · viande et purée séparément."
    }
   ],
   "num": 48,
   "totalMin": 30,
   "typeBadges": [
    "Bœuf"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p49",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Risotto d'orzo pesto & poulet grillé",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Poulet"
   ],
   "dietTags": [
    "Sans fruits à coque",
    "Sans œuf",
    "Cuisine du monde"
   ],
   "nutrition": {
    "kcal": 615,
    "lipides": 22,
    "glucides": 58,
    "proteines": 47
   },
   "prepMin": 10,
   "cookMin": 15,
   "prepRaw": "Prép. 10 min · Cuisson 15 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "224 g",
       "name": "blanc de poulet"
      },
      {
       "q": "20 feuilles",
       "name": "basilic frais"
      },
      {
       "q": "2 gousses",
       "name": "ail"
      },
      {
       "q": "40 g",
       "name": "oignon(s)"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "162 g",
       "name": "orzo (pâtes)"
      },
      {
       "q": "50 g",
       "name": "parmesan râpé"
      },
      {
       "q": "16 g",
       "name": "pignons de pin"
      },
      {
       "q": "1 cube",
       "name": "bouillon de volaille"
      },
      {
       "q": "1,5 càc",
       "name": "jus de citron"
      },
      {
       "q": "2 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "paprika"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Portez 200 ml d'eau à ébullition et diluez le demi-cube de bouillon. Réservez au chaud.",
    "Préparez le pesto : mixez le basilic, la moitié du parmesan, les pignons de pin, l'ail, l'huile d'olive, le jus de citron et une pincée de sel. Ajoutez 1-2 càs de bouillon chaud pour une texture crémeuse.",
    "Faites revenir l'oignon et l'ail émincés dans une poêle avec l'huile d'olive <strong>3 min</strong>. Ajoutez l'orzo et faites-le nacrer <strong>2 min</strong>.",
    "Versez le bouillon petit à petit en remuant. Laissez mijoter <strong>10 min</strong> jusqu'à ce qu'il soit crémeux. Incorporez le parmesan restant et 2-3 càs de pesto.",
    "Dans une autre poêle, faites revenir le poulet assaisonné de paprika <strong>5 min</strong> de chaque côté jusqu'à dorure. Laissez reposer quelques minutes, coupez en lamelles.",
    "Dressez l'orzo crémeux, ajoutez les lamelles de poulet, un filet de pesto et du basilic frais."
   ],
   "claudy": [
    "L'orzo se comporte comme un risotto : versez le bouillon progressivement et remuez — la patience est récompensée.",
    "Faites nacrer l'orzo 2 min à sec avant d'ajouter le bouillon : il développe une saveur de noisette."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Préparez le pesto en avance — il se conserve 3 jours au frigo recouvert d'huile d'olive."
    },
    {
     "label": "Suggestion",
     "text": "Vin blanc sec (Vermentino) ou eau infusée basilic-citron."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · l'orzo absorbe la sauce, ajoutez un peu d'eau à la réchauffée."
    }
   ],
   "num": 49,
   "totalMin": 25,
   "typeBadges": [
    "Poulet"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p50",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Mini pastilla poulet & salade verte",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Poulet"
   ],
   "dietTags": [
    "Sans arachide",
    "Cuisine du monde",
    "Gourmande"
   ],
   "nutrition": {
    "kcal": 443,
    "lipides": 20,
    "glucides": 24,
    "proteines": 43
   },
   "prepMin": 10,
   "cookMin": 15,
   "prepRaw": "Prép. 10 min · Cuisson 15 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "244 g",
       "name": "blanc de poulet (effiloché)"
      },
      {
       "q": "82 g",
       "name": "oignon(s)"
      },
      {
       "q": "2",
       "name": "œuf(s)"
      },
      {
       "q": "30 g",
       "name": "amandes effilées"
      },
      {
       "q": "10 feuilles",
       "name": "persil frais"
      },
      {
       "q": "2 poignées",
       "name": "salade verte"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "2 feuilles",
       "name": "brick"
      },
      {
       "q": "40 g",
       "name": "skyr"
      },
      {
       "q": "10 g",
       "name": "sucre de canne"
      },
      {
       "q": "2 càc",
       "name": "huile d'olive"
      },
      {
       "q": "2 càc",
       "name": "jus de citron"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "gingembre"
      },
      {
       "q": "2 càc",
       "name": "curcuma"
      },
      {
       "q": "2 càc",
       "name": "cannelle"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-af",
     "title": "Astuce Airfryer",
     "text": "−10/20 °C · −20/30 % de temps."
    }
   ],
   "steps": [
    "Préchauffez le four à <strong>180 °C</strong> (ou Airfryer).",
    "Faites revenir l'oignon émincé dans l'huile d'olive. Ajoutez le poulet effiloché, les épices, le sel, le poivre et le persil ciselé.",
    "Battez un œuf et incorporez-le à la farce pour lier. Ajoutez les amandes effilées concassées et le sucre de canne.",
    "Déposez chaque feuille de brick dans un petit moule. Garnissez de farce et refermez délicatement. Badigeonnez légèrement d'huile d'olive.",
    "Enfournez <strong>15 min</strong> jusqu'à dorure.",
    "Mélangez le skyr avec le jus de citron, le sel et le poivre.",
    "Servez les mini pastillas chaudes avec la sauce skyr et la salade verte."
   ],
   "claudy": [
    "La pastilla traditionnelle est sucrée-salée avec de la cannelle : ne réduisez pas les épices, c'est toute l'âme du plat.",
    "Effilochez le poulet encore chaud — il se défait bien mieux qu'une fois refroidi."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Badigeonnez généreusement les feuilles de brick d'huile pour un doré uniforme et croustillant."
    },
    {
     "label": "Suggestion",
     "text": "Thé à la menthe marocain ou eau infusée fleur d'oranger."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · réchauffer au four 8 min pour garder le croustillant."
    }
   ],
   "num": 50,
   "totalMin": 25,
   "typeBadges": [
    "Poulet"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p51",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Gnocchis d'automne",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Végétarien"
   ],
   "dietTags": [
    "Végétarien",
    "Sans gluten",
    "Sans fruits à coque"
   ],
   "nutrition": {
    "kcal": 574,
    "lipides": 21,
    "glucides": 63,
    "proteines": 35
   },
   "prepMin": 15,
   "cookMin": 12,
   "prepRaw": "Prép. 15 min · Cuisson 12 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "306 g",
       "name": "champignons de Paris"
      },
      {
       "q": "204 g",
       "name": "courge (butternut)"
      },
      {
       "q": "4",
       "name": "œuf(s)"
      },
      {
       "q": "10 brins",
       "name": "ciboulette fraîche"
      },
      {
       "q": "2 gousses",
       "name": "ail"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "306 g",
       "name": "gnocchis de pomme de terre"
      },
      {
       "q": "204 g",
       "name": "tofu soyeux"
      },
      {
       "q": "30 g",
       "name": "copeaux de parmesan"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-var",
     "title": "Variante carnée",
     "text": "Ajoutez des lardons fumés dorés à sec ou des dés de poulet rôti à la poêle. Incorporez-les avec les champignons."
    }
   ],
   "steps": [
    "Pelez la courge et coupez-la en dés. Faites-la cuire <strong>12 min</strong> à l'eau bouillante (ou au cuit-vapeur). Égouttez.",
    "Mixez la courge cuite avec le tofu soyeux, l'ail, le sel, le poivre et un peu de parmesan pour obtenir une sauce crémeuse.",
    "Cuisez les œufs <strong>6 min</strong> dans de l'eau frémissante pour des œufs mollets. Passez-les à l'eau froide et écalez-les. Réservez.",
    "Coupez les champignons en lamelles. Faites-les revenir dans une poêle chaude <strong>6 min</strong> jusqu'à évaporation complète de leur eau.",
    "Faites cuire les gnocchis selon les indications du paquet — ils sont cuits quand ils remontent à la surface. Égouttez.",
    "Ajoutez les gnocchis dans la sauce courge avec les champignons. Mélangez délicatement.",
    "Dressez dans un grand bol avec les œufs mollets coupés en deux, le parmesan restant et la ciboulette ciselée."
   ],
   "claudy": [
    "Le tofu soyeux dans la sauce courge, c'est la surprise : il apporte de l'onctuosité sans lactose et sans goût parasite.",
    "Saisissez les champignons à feu très vif sans remuer — ils dorent plutôt que de rendre leur eau."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Faites sauter les gnocchis 2 min à la poêle après cuisson pour les rendre légèrement croustillants."
    },
    {
     "label": "Suggestion",
     "text": "Vin blanc de Bourgogne ou jus de pomme artisanal."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · les gnocchis ramollissent, à réchauffer à la poêle."
    }
   ],
   "num": 51,
   "totalMin": 27,
   "typeBadges": [
    "Végétarien"
   ],
   "isVegan": false,
   "isVeggie": true
  },
  {
   "id": "p52",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Boulettes de viande & purée courge-pomme de terre",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Bœuf haché"
   ],
   "dietTags": [
    "Sans gluten",
    "Sans fruits à coque",
    "Sans arachide"
   ],
   "nutrition": {
    "kcal": 505,
    "lipides": 18,
    "glucides": 41,
    "proteines": 47
   },
   "prepMin": 15,
   "cookMin": 20,
   "prepRaw": "Prép. 15 min · Cuisson 20 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "244 g",
       "name": "bœuf haché"
      },
      {
       "q": "306 g",
       "name": "courge (butternut)"
      },
      {
       "q": "306 g",
       "name": "pommes de terre"
      },
      {
       "q": "60 g",
       "name": "oignon(s)"
      },
      {
       "q": "4 gousses",
       "name": "ail"
      },
      {
       "q": "16 feuilles",
       "name": "persil frais"
      },
      {
       "q": "2",
       "name": "œuf(s)"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "102 g",
       "name": "fromage blanc"
      },
      {
       "q": "10 g",
       "name": "fécule de maïs"
      },
      {
       "q": "1,5 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "paprika"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Préparez les boulettes : mélangez le bœuf haché avec un œuf, l'oignon et l'ail hachés, le persil ciselé, le paprika, le sel et le poivre. Formez 10-12 boulettes.",
    "Faites-les revenir dans une poêle chaude avec l'huile d'olive jusqu'à dorure. Réservez.",
    "Faites cuire les dés de pommes de terre <strong>20 min</strong> à l'eau bouillante, et les dés de courge <strong>15 min</strong> (ou au cuit-vapeur).",
    "Égouttez et écrasez ensemble en purée avec le fromage blanc et un filet d'huile d'olive. Salez et poivrez.",
    "Déglacez la poêle des boulettes avec un peu d'eau. Délayez la fécule de maïs dans 2 càs d'eau froide, versez dans la poêle et laissez épaissir <strong>2 min</strong>.",
    "Dressez la purée dans l'assiette, posez les boulettes par-dessus, nappez de sauce et parsemez de persil ciselé."
   ],
   "claudy": [
    "Déglacez bien la poêle des boulettes — tous les sucs caramélisés font la sauce, ne nettoyez jamais la poêle !",
    "La courge dans la purée apporte une douceur et une couleur orangée superbe — doublez la quantité si vous aimez."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Gardez un peu d'eau de cuisson des légumes pour ajuster la texture de la purée."
    },
    {
     "label": "Suggestion",
     "text": "Jus de pomme ou bière ambrée légère."
    },
    {
     "label": "Conservation",
     "text": "2-3 jours au frigo · toujours meilleur le lendemain."
    }
   ],
   "num": 52,
   "totalMin": 35,
   "typeBadges": [
    "Bœuf haché"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p53",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Soupe aztèque au poivron & au maïs",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Végétarien"
   ],
   "dietTags": [
    "Végétarien",
    "Sans fruits à coque"
   ],
   "nutrition": {
    "kcal": 548,
    "lipides": 16,
    "glucides": 57,
    "proteines": 17
   },
   "prepMin": 15,
   "cookMin": 30,
   "prepRaw": "Prép. 15 min · Cuisson 30 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "2",
       "name": "poivron(s)"
      },
      {
       "q": "1",
       "name": "oignon"
      },
      {
       "q": "2 gousses",
       "name": "ail"
      },
      {
       "q": "140 g",
       "name": "maïs en conserve"
      },
      {
       "q": "1",
       "name": "avocat"
      },
      {
       "q": "1",
       "name": "citron"
      },
      {
       "q": "coriandre fraîche",
       "name": ""
      },
      {
       "q": "2 poignées",
       "name": "salade"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "400 g",
       "name": "chair de tomates"
      },
      {
       "q": "4",
       "name": "mini-tortillas"
      },
      {
       "q": "80 g",
       "name": "fromage à la grecque"
      },
      {
       "q": "2 cubes",
       "name": "bouillon de légumes"
      },
      {
       "q": "2 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "paprika fumé"
      },
      {
       "q": "2 càc",
       "name": "cumin"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-var",
     "title": "Variante carnée",
     "text": "Ajoutez 200 g de blanc de poulet en dés revenus à la poêle avec paprika et cumin, ou des lardons fumés dorés à sec — à déposer sur la soupe au moment de servir."
    }
   ],
   "steps": [
    "Éplucher et ciseler l'oignon et l'ail. Couper le poivron en dés de 1 cm. Égoutter le maïs.",
    "Chauffer l'huile d'olive dans une grande casserole. Faire revenir l'oignon, l'ail et les dés de poivron <strong>2 min</strong>. Ajouter le paprika fumé et le cumin, poursuivre <strong>30 sec</strong>.",
    "Ajouter la chair de tomates, le bouillon chaud, le maïs. Couvrir et laisser mijoter <strong>15-20 min</strong> en remuant.",
    "Mixer jusqu'à obtenir une texture lisse. Si la soupe est trop épaisse, ajouter un filet d'eau. Rectifier l'assaisonnement.",
    "Couper les tortillas en triangles et faire griller à sec dans une poêle ou au four <strong>5 min</strong>. Réserver.",
    "Couper l'avocat en tranches. Effiler la coriandre. Servir la soupe avec avocat, chips de tortilla, fromage à la grecque, coriandre et jus de citron."
   ],
   "claudy": [
    "Faites bien revenir les épices à sec 30 sec dans l'huile chaude avant d'ajouter les liquides — ça libère tous les arômes.",
    "Le fromage à la grecque (skyr) en garniture refroidit légèrement la soupe et apporte un contraste parfait."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Mixez la soupe encore très chaude pour une texture ultra-lisse — tiède elle devient granuleuse."
    },
    {
     "label": "Suggestion",
     "text": "Limonade au citron vert ou agua fresca."
    },
    {
     "label": "Conservation",
     "text": "3 jours au frigo · garnitures séparément."
    }
   ],
   "num": 53,
   "totalMin": 45,
   "typeBadges": [
    "Végétarien"
   ],
   "isVegan": false,
   "isVeggie": true
  },
  {
   "id": "p54",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Bowl d'énergie crevettes & poireaux",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Crevettes"
   ],
   "dietTags": [
    "Sans gluten",
    "Sans lactose",
    "Rapide"
   ],
   "nutrition": {
    "kcal": 561,
    "lipides": 20,
    "glucides": 65,
    "proteines": 27
   },
   "prepMin": 5,
   "cookMin": 20,
   "prepRaw": "Prép. 5 min · Cuisson 20 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "240 g",
       "name": "crevettes décortiquées"
      },
      {
       "q": "1",
       "name": "poireau"
      },
      {
       "q": "2 gousses",
       "name": "ail"
      },
      {
       "q": "¼ bouquet",
       "name": "persil frais"
      },
      {
       "q": "20 g",
       "name": "noix de cajou concassées"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "160 g",
       "name": "riz basmati"
      },
      {
       "q": "2 càc",
       "name": "huile d'olive"
      },
      {
       "q": "5 g",
       "name": "beurre"
      },
      {
       "q": "1 càc",
       "name": "vinaigre balsamique blanc"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "2 càc",
       "name": "paprika"
      },
      {
       "q": "2 càc",
       "name": "cumin"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Faire cuire le riz dans de l'eau bouillante salée <strong>12-14 min</strong>. Égoutter et réserver à couvert.",
    "Laver bien le poireau et le couper en fines demi-lunes. Dans une poêle, chauffer l'huile d'olive sur feu moyen et faire revenir le poireau <strong>8-10 min</strong> jusqu'à tendreté. Égoutter et ciseler l'ail. Saler et poivrer.",
    "Baisser à feu moyen dans la même poêle, ajouter le beurre et faire dorer les crevettes <strong>2-3 min</strong>. Réserver.",
    "Remettre la poêle sur le feu, ajouter un petit filet d'huile d'olive, l'ail et les quantités de paprika et de cumin indiquées. Couper le feu. Ajouter le persil ciselé, le vinaigre et 1 càc d'eau. Mélanger.",
    "Servir le riz, puis la fondue de poireaux par-dessus. Disposer les crevettes et arroser de sauce. Saupoudrer de noix de cajou et du reste de persil."
   ],
   "claudy": [
    "Le poireau doit être vraiment fondant — prenez les 10 min de cuisson sans chercher à raccourcir.",
    "La sauce finale à la poêle (épices + vinaigre + eau) est le coup de génie de ce plat : elle lie tout."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Essuyez bien les crevettes avec du papier absorbant avant cuisson pour qu'elles dorent et ne bouillent pas."
    },
    {
     "label": "Suggestion",
     "text": "Vin blanc léger ou limonade maison."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · noix de cajou séparément."
    }
   ],
   "num": 54,
   "totalMin": 25,
   "typeBadges": [
    "Crevettes"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p55",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Riz à la Thaïe",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Poulet"
   ],
   "dietTags": [
    "Sans gluten",
    "Sans lactose",
    "Cuisine du monde",
    "Rapide"
   ],
   "nutrition": {
    "kcal": 420,
    "lipides": 10,
    "glucides": 48,
    "proteines": 36
   },
   "prepMin": 5,
   "cookMin": 15,
   "prepRaw": "Prép. 5 min · Cuisson 15 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "2 filets",
       "name": "blanc de poulet cuit"
      },
      {
       "q": "1",
       "name": "poivron jaune"
      },
      {
       "q": "1",
       "name": "poivron rouge"
      },
      {
       "q": "1",
       "name": "citron vert"
      },
      {
       "q": "coriandre ou persil",
       "name": ""
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "100 g",
       "name": "riz basmati"
      },
      {
       "q": "1 cube",
       "name": "bouillon miso bio"
      },
      {
       "q": "1 càs",
       "name": "huile d'olive"
      },
      {
       "q": "1 càs",
       "name": "sauce soja"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "0.5 càc",
       "name": "ail en poudre"
      },
      {
       "q": "0.5 càc",
       "name": "gingembre en poudre"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Couper le poulet et les poivrons en lamelles. Dans un bol, mélanger poulet, poivrons, l'ail en poudre, la sauce soja et le gingembre.",
    "Verser l'huile d'olive et assaisonner. Ajouter la moitié du jus de citron vert puis faire revenir <strong>10-12 min</strong> à la poêle.",
    "Plonger le cube de bouillon miso dans de l'eau bouillante salée puis ajouter le riz. Cuire environ la moitié du temps indiqué sur l'emballage.",
    "Incorporer le riz dans le mélange poulet-poivrons <strong>5 min</strong> avant la fin de cuisson. Mélanger.",
    "Rectifier l'assaisonnement, arroser du jus de citron vert restant et ajouter persil ou coriandre avant de servir."
   ],
   "claudy": [
    "Le bouillon miso dans le riz est la touche qui change tout — ses umamis s'infusent dans chaque grain.",
    "Incorporez le riz mi-cuit dans la poêle : il termine sa cuisson en absorbant les jus du poulet."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Le citron vert ajouté en fin de cuisson est essentiel — ne l'omettez pas, il réveille toute la recette."
    },
    {
     "label": "Suggestion",
     "text": "Eau infusée citron vert et basilic thaï."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · meilleur réchauffé avec un filet d'eau."
    }
   ],
   "num": 55,
   "totalMin": 20,
   "typeBadges": [
    "Poulet"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p56",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Bol poulet mexicain riz & maïs",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Poulet"
   ],
   "dietTags": [
    "Sans gluten",
    "Cuisine du monde"
   ],
   "nutrition": {
    "kcal": 520,
    "lipides": 18,
    "glucides": 62,
    "proteines": 35
   },
   "prepMin": 10,
   "cookMin": 20,
   "prepRaw": "Prép. 10 min · Cuisson 20 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "200 g",
       "name": "blanc de poulet"
      },
      {
       "q": "1",
       "name": "oignon"
      },
      {
       "q": "1 gousse",
       "name": "ail"
      },
      {
       "q": "140 g",
       "name": "maïs en conserve"
      },
      {
       "q": "1",
       "name": "avocat"
      },
      {
       "q": "½ bouquet",
       "name": "coriandre fraîche"
      },
      {
       "q": "80 g",
       "name": "yaourt à la grecque"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "150 g",
       "name": "riz basmati"
      },
      {
       "q": "1 sachet",
       "name": "épices mexicaines"
      },
      {
       "q": "500 ml",
       "name": "bouillon de volaille"
      },
      {
       "q": "1 càs",
       "name": "huile d'olive"
      },
      {
       "q": "2 càc",
       "name": "vinaigre de vin rouge"
      },
      {
       "q": "1 pincée",
       "name": "sucre"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Faire les pickles d'oignon : couper la moitié de l'oignon en fines demi-lunes. Dans un bol, mélanger avec 2 càc de vinaigre, une pincée de sel et de sucre. Laisser reposer.",
    "Cuire le riz pilaf : faire revenir le reste d'oignon dans l'huile d'olive <strong>2-3 min</strong>. Ajouter le riz et ½ sachet d'épices mexicaines. Nacrer <strong>1 min</strong>. Ajouter le bouillon et cuire à feu doux <strong>10-12 min</strong>.",
    "Recouper le poulet en petits dés. Dans un bol, mélanger poulet, ail, ½ sachet d'épices restant et l'huile d'olive. Saler et poivrer.",
    "Faire chauffer une poêle et dorer le poulet et sa marinade <strong>1 min</strong>. Ajouter le maïs et cuire <strong>5 min</strong>. Déglacer avec 1 càs de jus de pickles.",
    "Couper l'avocat en tranches. Effilocher la coriandre. Servir le riz dans des bols, garnir du poulet au maïs, avocat, pickles d'oignon, yaourt et coriandre."
   ],
   "claudy": [
    "Les pickles d'oignon maison prennent 5 min mais changent tout le profil gustatif du bol — l'acidité équilibre la richesse de l'avocat.",
    "Déglacez la poêle du poulet avec le jus de pickles : un filet suffit pour une sauce express."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Préparez les pickles en premier : plus ils reposent, meilleurs ils sont."
    },
    {
     "label": "Suggestion",
     "text": "Agua fresca au citron vert ou bière légère mexicaine."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · avocat et pickles séparément."
    }
   ],
   "num": 56,
   "totalMin": 30,
   "typeBadges": [
    "Poulet"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p57",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Curry vert thaï au poulet & poireau",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Poulet"
   ],
   "dietTags": [
    "Sans lactose",
    "Cuisine du monde"
   ],
   "nutrition": {
    "kcal": 895,
    "lipides": 47,
    "glucides": 72,
    "proteines": 28
   },
   "prepMin": 10,
   "cookMin": 25,
   "prepRaw": "Prép. 10 min · Cuisson 25 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "200 g",
       "name": "blanc de poulet"
      },
      {
       "q": "1",
       "name": "poireau"
      },
      {
       "q": "2",
       "name": "échalotes"
      },
      {
       "q": "gingembre frais",
       "name": ""
      },
      {
       "q": "½ bouquet",
       "name": "coriandre fraîche"
      },
      {
       "q": "1",
       "name": "citron"
      },
      {
       "q": "2 gousses",
       "name": "ail"
      },
      {
       "q": "20 g",
       "name": "cacahuètes non salées"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "130 g",
       "name": "riz basmati"
      },
      {
       "q": "250 ml",
       "name": "lait de coco"
      },
      {
       "q": "2 càc",
       "name": "curry vert"
      },
      {
       "q": "1 càs",
       "name": "sauce poisson"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Cuire le riz dans une grande casserole d'eau salée <strong>12-14 min</strong>. Égoutter et réserver à couvert.",
    "Couper le poireau en deux dans l'épaisseur, puis en fines demi-lunes. Râper le gingembre et ciseler les cacahuètes.",
    "Dorer le poulet coupé en morceaux dans un filet d'huile d'olive à feu moyen <strong>3 min</strong>. Saler et poivrer. Réserver.",
    "Dans le même wok, faire revenir l'échalote, l'ail, le gingembre et le poireau <strong>9-11 min</strong>, en ajoutant de l'eau si ça attache.",
    "Ajouter le curry vert, mélanger, puis verser le lait de coco et la sauce poisson. Mijoter <strong>5 min</strong>. Remettre le poulet.",
    "Servir le riz dans des assiettes creuses, disposer le curry au poulet et saupoudrer de coriandre, cacahuètes et quartiers de citron."
   ],
   "claudy": [
    "La sauce poisson donne l'authenticité thaïe — n'ayez pas peur de l'odeur à cru, à la cuisson elle se transforme en umami profond.",
    "Attention à bien respecter les quantités de curry vert indiquées : le sachet est très concentré."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Secouez bien le lait de coco avant de l'utiliser — la crème remonte et donne une sauce plus onctueuse."
    },
    {
     "label": "Suggestion",
     "text": "Bière thaïe (Singha) ou eau infusée citron-gingembre."
    },
    {
     "label": "Conservation",
     "text": "2 jours au frigo · la sauce s'épaissit, ajouter un filet d'eau à la réchauffée."
    }
   ],
   "num": 57,
   "totalMin": 35,
   "typeBadges": [
    "Poulet"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p58",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Moqueca brésilienne au lieu & lait de coco",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Poisson"
   ],
   "dietTags": [
    "Pesco-végétarien",
    "Sans gluten",
    "Sans lactose",
    "Cuisine du monde"
   ],
   "nutrition": {
    "kcal": 495,
    "lipides": 10,
    "glucides": 72,
    "proteines": 28
   },
   "prepMin": 10,
   "cookMin": 20,
   "prepRaw": "Prép. 10 min · Cuisson 20 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "200 g",
       "name": "filet de lieu"
      },
      {
       "q": "2",
       "name": "poivron(s)"
      },
      {
       "q": "1",
       "name": "oignon"
      },
      {
       "q": "1",
       "name": "tomate"
      },
      {
       "q": "2 gousses",
       "name": "ail"
      },
      {
       "q": "¼ bouquet",
       "name": "coriandre fraîche"
      },
      {
       "q": "1",
       "name": "citron"
      },
      {
       "q": "1",
       "name": "piment"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "150 g",
       "name": "riz basmati"
      },
      {
       "q": "250 ml",
       "name": "lait de coco"
      },
      {
       "q": "1 sachet",
       "name": "concentré de tomates"
      },
      {
       "q": "1 sachet",
       "name": "cumin en poudre"
      },
      {
       "q": "45 ml",
       "name": "huile de coco"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Faire cuire le riz <strong>12-14 min</strong> dans de l'eau bouillante salée. Égoutter et réserver à couvert.",
    "Laver le citron et prélever les zestes. Mélanger zestes, ail et oignon hachés, tomate et poivron en dés dans un bol. Saler et poivrer. Ciseler finement le piment.",
    "Faire chauffer l'huile de coco dans une sauteuse. Faire revenir oignon, poivron, ail et concentré de tomates <strong>3-4 min</strong>. Secouer le lait de coco, ajouter le cumin et laisser mijoter jusqu'à épaississement.",
    "Couper le lieu en gros dés. Ciseler finement ail et oignon restants. Ajouter le lieu dans la sauce. Laisser réduire <strong>2-4 min</strong> à feu moyen.",
    "Servir le riz dans des assiettes creuses et disposer la moqueca par-dessus. Saupoudrer de coriandre et ajouter les quartiers de citron."
   ],
   "claudy": [
    "La moqueca se fait avec du lait de coco entier — ne prenez pas la version allégée, la sauce ne sera pas la même.",
    "Le lieu est un poisson ferme qui tient bien à la cuisson — évitez de trop remuer pour garder les morceaux entiers."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Préparez la sauce 10 min à l'avance et ajoutez le poisson au dernier moment — il ne faut que 4-5 min."
    },
    {
     "label": "Suggestion",
     "text": "Caipirinha sans alcool (citron vert + sucre de canne + eau pétillante) ou eau de coco."
    },
    {
     "label": "Conservation",
     "text": "1 jour au frigo · le poisson ne se conserve pas longtemps."
    }
   ],
   "num": 58,
   "totalMin": 30,
   "typeBadges": [
    "Poisson"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p59",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Poulet thaï paléo, courge & patate douce",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Poulet"
   ],
   "dietTags": [
    "Sans gluten",
    "Sans lactose",
    "Cuisine du monde"
   ],
   "nutrition": {
    "kcal": 480,
    "lipides": 22,
    "glucides": 35,
    "proteines": 38
   },
   "prepMin": 10,
   "cookMin": 35,
   "prepRaw": "Prép. 10 min · Cuisson 35 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "300 g",
       "name": "blanc de poulet en dés"
      },
      {
       "q": "300 g",
       "name": "courge"
      },
      {
       "q": "200 g",
       "name": "patate douce"
      },
      {
       "q": "1 gousse",
       "name": "ail"
      },
      {
       "q": "½",
       "name": "oignon"
      },
      {
       "q": "coriandre et/ou basilic",
       "name": ""
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "200 ml",
       "name": "lait de coco"
      },
      {
       "q": "40 ml",
       "name": "crème de coco"
      },
      {
       "q": "1 càs",
       "name": "sauce soja"
      },
      {
       "q": "100 ml",
       "name": "eau ou bouillon"
      },
      {
       "q": "2 càc",
       "name": "huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "1 càc",
       "name": "chili en poudre"
      },
      {
       "q": "sauce nuoc-mâm",
       "name": "(facultatif)"
      },
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "poivre"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [],
   "steps": [
    "Faire dorer les dés de poulet à feu vif avec sel, poivre et un filet d'huile d'olive dans une poêle.",
    "Baisser le feu puis ajouter progressivement la courge et la patate douce lavées et coupées en dés de 1 cm, l'ail épluché et haché, l'oignon émincé.",
    "Ajouter le reste des ingrédients (lait de coco, crème de coco, sauce soja, chili, nuoc-mâm et bouillon). Sauf les herbes.",
    "Couvrir et laisser mijoter à feu doux <strong>30 min minimum</strong>, en remuant de temps en temps.",
    "Servir avec les herbes fraîches et un filet de jus de citron."
   ],
   "claudy": [
    "Coupez les légumes en dés d'exactement 1 cm : ils cuisent uniformément et restent légèrement fondants.",
    "Ce plat est encore meilleur le lendemain — les épices infusent davantage au repos."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "N'hésitez pas à abuser de ce plat en automne et en hiver — il se congèle parfaitement."
    },
    {
     "label": "Suggestion",
     "text": "Bière légère asiatique ou thé vert au jasmin."
    },
    {
     "label": "Conservation",
     "text": "3 jours au frigo · se congèle 2 mois."
    }
   ],
   "num": 59,
   "totalMin": 45,
   "typeBadges": [
    "Poulet"
   ],
   "isVegan": false,
   "isVeggie": false
  },
  {
   "id": "p60",
   "chapter": "Post Training",
   "ctag": "Post-Training",
   "title": "Burger italien",
   "portions": "Pour 2 personnes",
   "bigBadges": [
    "Post-Training · Récupération",
    "Bœuf haché"
   ],
   "dietTags": [
    "Sans arachide",
    "Sans œuf",
    "Gourmande"
   ],
   "nutrition": {
    "kcal": 373,
    "lipides": 17,
    "glucides": 17,
    "proteines": 38
   },
   "prepMin": 10,
   "cookMin": 5,
   "prepRaw": "Prép. 10 min · Cuisson 5 min",
   "ingredients": [
    {
     "section": "À Acheter",
     "items": [
      {
       "q": "244 g",
       "name": "steaks hachés"
      },
      {
       "q": "102 g",
       "name": "courgette(s)"
      },
      {
       "q": "62 g",
       "name": "tomate(s)"
      },
      {
       "q": "30 g",
       "name": "mozzarella"
      },
      {
       "q": "30 g",
       "name": "pesto"
      },
      {
       "q": "2",
       "name": "pains à hamburger"
      },
      {
       "q": "2 poignées",
       "name": "roquette"
      }
     ]
    },
    {
     "section": "Placard",
     "items": [
      {
       "q": "",
       "name": "filet d'huile d'olive"
      }
     ]
    },
    {
     "section": "Épices",
     "items": [
      {
       "q": "",
       "name": "sel"
      },
      {
       "q": "",
       "name": "piment d'Espelette"
      }
     ]
    }
   ],
   "portionLabel": "Quantités pour 2 personnes · valeurs crues",
   "tips": [
    {
     "cls": "p-t-var",
     "title": "Variantes",
     "text": "Version veggie, pousses d'épinards, pesto rosso, aubergines à la place des courgettes..."
    },
    {
     "cls": "p-t-af",
     "title": "Conseil",
     "text": "Préparez les courgettes grillées la veille."
    }
   ],
   "steps": [
    "Taillez de fines lamelles de courgette à l'économe.",
    "Grillez les courgettes avec sel, piment et huile d'olive <strong>3 min</strong>.",
    "Cuire les steaks <strong>2 min</strong>. Ajouter la mozzarella, couvrir pour faire fondre.",
    "Dorer les pains coupés quelques secondes dans la même poêle.",
    "Assembler : pesto sur les deux pains, steak, courgettes, tomate, roquette."
   ],
   "claudy": [
    "Grillez les courgettes à sec pour qu'elles caramélisent correctement.",
    "La clé : assemblez au dernier moment pour que le pain reste croustillant."
   ],
   "footerTips": [
    {
     "label": "Conseil",
     "text": "Faites fondre la mozzarella en couvrant la poêle seulement 10 secondes."
    },
    {
     "label": "Suggestion",
     "text": "Limonade maison ou bière artisanale belge."
    },
    {
     "label": "Conservation",
     "text": "Éléments séparément · assemblez toujours au dernier moment."
    }
   ],
   "num": 60,
   "totalMin": 15,
   "typeBadges": [
    "Bœuf haché"
   ],
   "isVegan": false,
   "isVeggie": false
  }
 ]
};
