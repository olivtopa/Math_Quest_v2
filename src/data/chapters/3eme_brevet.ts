import { Chapter } from '../../types/mathquest';

export const chapters3eme: Chapter[] = [
  {
    id: 'chap_calcul_litteral_3eme',
    cycle: '3eme',
    title: 'Calcul Littéral & Équations',
    subtitle: 'Développement, factorisation et résolutions pour le Brevet',
    icon: 'Calculator',
    quests: [
      {
        id: 'quest_dev_distributivite',
        title: 'Le Défi de la Double Distributivité',
        description: 'Maîtrise le développement d\'expressions algébriques complexes.',
        iconName: 'Sparkles',
        isUnlocked: true,
        exercises: [
          {
            id: 'ex_dev_1',
            title: 'Développement d\'une expression produit',
            description: 'Développe et réduis l\'expression $A(x) = (2x + 3)(x - 4)$.',
            difficulty: 'Moyen',
            rewardXP: 150,
            competencies: ['Calculer', 'Raisonner'],
            steps: [
              {
                id: 'step_1',
                title: 'Étape 1 : Appliquer la double distributivité',
                instruction: 'Développe le produit $(2x + 3)(x - 4)$ sans réduire les termes.',
                expectedType: 'expression',
                expectedAnswers: ['2x^2 - 8x + 3x - 12', '2*x*x - 8*x + 3*x - 12'],
                hints: [
                  {
                    level: 1,
                    title: 'Rappel de la règle',
                    content: 'Applique la formule $(a + b)(c + d) = a \\times c + a \\times d + b \\times c + b \\times d$.'
                  },
                  {
                    level: 2,
                    title: 'Attention aux signes',
                    content: 'Multiplie chaque terme du premier facteur par chaque terme du second. Quel est le signe de $2x \\times (-4)$ ?'
                  },
                  {
                    level: 3,
                    title: 'Structure intermédiaire',
                    content: 'Identifie chacun des 4 produits non réduits avant de les assembler.'
                  }
                ],
                errorFeedback: {
                  '2x^2 + 8x + 3x - 12': 'Attention au signe lors de la multiplication de $2x$ par $-4$ ! $(+) \\times (-) = (-)$.',
                  '2x^2 - 8x + 3x + 12': 'Vérifie le produit des termes constants : $3 \\times (-4)$.'
                }
              },
              {
                id: 'step_2',
                title: 'Étape 2 : Réduire l\'expression',
                instruction: 'Rassemble les termes en $x$ pour donner la forme réduite de $A(x)$.',
                expectedType: 'expression',
                expectedAnswers: ['2x^2 - 5x - 12', '2x^2-5x-12'],
                hints: [
                  {
                    level: 1,
                    title: 'Regroupement',
                    content: 'Additionne les termes de même degré : ici, regroupe $-8x$ et $+3x$.'
                  },
                  {
                    level: 2,
                    title: 'Calcul relatif',
                    content: 'Combien font $-8 + 3$ ?'
                  },
                  {
                    level: 3,
                    title: 'Forme réduite',
                    content: 'Combine le terme en $x^2$, le nouveau coefficient de $x$ et la constante.'
                  }
                ],
                errorFeedback: {
                  '2x^2 - 11x - 12': 'Attention : $-8 + 3 = -5$ et non $-11$.'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chap_pythagore_thales_3eme',
    cycle: '3eme',
    title: 'Géométrie : Pythagore & Thalès',
    subtitle: 'Calculs de longueurs et démonstrations géométriques',
    icon: 'Triangle',
    quests: [
      {
        id: 'quest_thales_brevet',
        title: 'Le Théorème de Thalès en Action',
        description: 'Calcule des longueurs inconnues dans des triangles emboîtés.',
        iconName: 'Compass',
        isUnlocked: true,
        exercises: [
          {
            id: 'ex_thales_1',
            title: 'Calcul de la longueur d\'un côté',
            description: 'Dans le triangle $ABC$, $(MN)$ est parallèle à $(BC)$. On donne $AM = 3\\text{ cm}$, $AB = 9\\text{ cm}$ et $AN = 4\\text{ cm}$. Calcule $AC$.',
            difficulty: 'Moyen',
            rewardXP: 180,
            competencies: ['Modéliser', 'Calculer', 'Raisonner'],
            steps: [
              {
                id: 'step_thales_1',
                title: 'Étape 1 : Écrire l\'égalité des quotients',
                instruction: 'Quelle est l\'égalité des trois rapports donnée par le théorème de Thalès ?',
                expectedType: 'qcm',
                qcmChoices: [
                  '\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}',
                  '\\frac{AM}{AN} = \\frac{AB}{AC} = \\frac{MN}{BC}',
                  '\\frac{AB}{AM} = \\frac{AN}{AC} = \\frac{BC}{MN}'
                ],
                expectedAnswers: ['\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}'],
                hints: [
                  {
                    level: 1,
                    title: 'Formulation de Thalès',
                    content: 'Le rapport du petit côté sur le grand côté est égal pour les trois côtés correspondants.'
                  },
                  {
                    level: 2,
                    title: 'Sommet commun',
                    content: 'Repère le sommet commun $A$ et forme les trois rapports du type $\\frac{\\text{petit}}{\\text{grand}}$.'
                  }
                ]
              },
              {
                id: 'step_thales_2',
                title: 'Étape 2 : Calculer AC',
                instruction: 'Utilise le produit en croix pour déterminer la longueur $AC$ en cm.',
                expectedType: 'number',
                expectedAnswers: ['12', '12 cm'],
                hints: [
                  {
                    level: 1,
                    title: 'Produit en croix',
                    content: 'À partir de $\\frac{3}{9} = \\frac{4}{AC}$, isole $AC$.'
                  },
                  {
                    level: 2,
                    title: 'Méthode de calcul',
                    content: 'Applique le produit en croix : $AC$ s\'obtient en multipliant les termes de la diagonale connue puis en divisant par le troisième terme.'
                  },
                  {
                    level: 3,
                    title: 'Calcul final',
                    content: 'Effectue le calcul de la fraction $\\frac{9 \\times 4}{3}$.'
                  }
                ],
                errorFeedback: {
                  '6.75': 'Attention ! Tu as inversé le produit en croix : $AC = \\frac{9 \\times 4}{3}$.'
                }
              }
            ]
          }
        ]
      }
    ]
  }
];
