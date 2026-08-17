import { Chapter, CycleId } from '../../types/mathquest';
import { chapters3eme } from './3eme_brevet';

export const allChapters: Record<CycleId, Chapter[]> = {
  '3eme': chapters3eme,
  'lycee': [
    {
      id: 'chap_fonctions_2nde',
      cycle: 'lycee',
      title: 'Généralités sur les Fonctions & Vecteurs',
      subtitle: 'Étude de variations, équations de droites et calcul vectoriel',
      icon: 'TrendingUp',
      quests: [
        {
          id: 'quest_variations_2nde',
          title: 'Étude de Variations & Droites',
          description: 'Analyse les propriétés des fonctions de référence et équations de droites.',
          iconName: 'LineChart',
          isUnlocked: true,
          exercises: [
            {
              id: 'ex_droite_1',
              title: 'Coefficient directeur d\'une droite',
              description: 'Soient $A(1, 2)$ et $B(4, 8)$. Détermine le coefficient directeur $m$ de la droite $(AB)$.',
              difficulty: 'Moyen',
              rewardXP: 160,
              competencies: ['Calculer', 'Raisonner'],
              steps: [
                {
                  id: 'step_drop_1',
                  title: 'Calcul de m',
                  instruction: 'Applique la formule $m = \\frac{y_B - y_A}{x_B - x_A}$.',
                  expectedType: 'number',
                  expectedAnswers: ['2'],
                  hints: [
                    {
                      level: 1,
                      title: 'Formule du taux',
                      content: '$m = \\frac{8 - 2}{4 - 1} = \\frac{6}{3}$.'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  'terminale': [
    {
      id: 'chap_analyse_term',
      cycle: 'terminale',
      title: 'Analyse Avancée, Dérivation & Limites',
      subtitle: 'Étude de fonctions exponentielles, logarithmes et récurrences',
      icon: 'Activity',
      quests: [
        {
          id: 'quest_exp_term',
          title: 'La Fonction Exponentielle & Tangente',
          description: 'Calculs de dérivées et équations de tangentes pour le Bac.',
          iconName: 'Cpu',
          isUnlocked: true,
          exercises: [
            {
              id: 'ex_exp_1',
              title: 'Dérivée d\'une fonction produit avec exp',
              description: 'Soit $f(x) = (3x + 1)e^x$. Détermine sa dérivée $f\'(x)$.',
              difficulty: 'Difficile',
              rewardXP: 250,
              competencies: ['Raisonner', 'Calculer'],
              steps: [
                {
                  id: 'step_exp_1',
                  title: 'Dérivation du produit uv',
                  instruction: 'Utilise la formule $(uv)\' = u\'v + uv\'$. Donne l\'expression factorisée par $e^x$.',
                  expectedType: 'expression',
                  expectedAnswers: ['(3x + 4)e^x', '(3x+4)e^x', 'e^x(3x+4)'],
                  hints: [
                    {
                      level: 1,
                      title: 'Identification',
                      content: 'Pose $u(x) = 3x+1 \\Rightarrow u\'(x) = 3$ et $v(x) = e^x \\Rightarrow v\'(x) = e^x$.'
                    },
                    {
                      level: 2,
                      title: 'Factorisation',
                      content: '$f\'(x) = 3e^x + (3x+1)e^x = e^x(3 + 3x + 1) = (3x+4)e^x$.'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
