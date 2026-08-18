export type CycleId = '3eme' | 'lycee' | 'terminale';

export type MainTab = 'aventure' | 'rituel' | 'widgets' | 'profile';

export type ErrorType = 'inattention' | 'consigne' | 'conceptuelle' | 'methode';

export interface SocraticHint {
  level: 1 | 2 | 3;
  title: string;
  content: string;
}

export interface ExerciseStep {
  id: string;
  title: string;
  instruction: string;
  expectedType: 'number' | 'expression' | 'qcm';
  expectedAnswers: string[];
  qcmChoices?: string[];
  hints: SocraticHint[];
  errorFeedback?: Record<string, string>;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile' | 'Boss';
  rewardXP: number;
  competencies: ('Chercher' | 'Modéliser' | 'Représenter' | 'Raisonner' | 'Calculer' | 'Communiquer')[];
  steps: ExerciseStep[];
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  iconName: string;
  isUnlocked: boolean;
  exercises: Exercise[];
}

export interface Chapter {
  id: string;
  cycle: CycleId;
  title: string;
  subtitle: string;
  icon: string;
  quests: Quest[];
}

export interface UserProfile {
  name: string;
  cycle: CycleId;
  xp: number;
  level: number;
  energyVials: number;
  maxEnergyVials: number;
  badges: string[];
  completedExerciseIds: string[];
  grimoireCount: number;
}

export interface DynamicQuestion {
  id: string;
  title: string;
  question: string;
  options: string[];
  answer: string;
  explanationHtml: string;
  svgOverlay?: (svg: SVGSVGElement) => void;
  hints: SocraticHint[];
}

export interface GameState {
  level: number;
  hp: number;
  maxHp: number;
  gold: number;
  xp: number;
  energyVials: number;
  maxEnergyVials: number;
  dungeonsCleared: number;
  completedQuests: string[];
  grimoireCount: number;
  weakTopics?: {
    topicId: string;
    realm: string;
    questIndex: number;
    title: string;
    errorCount: number;
    lastFailedAt: number;
  }[];
  highScores: {
    mental: number;
    flashcards?: number;
    geometry?: number;
  };
}

export interface Trophy {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
}
