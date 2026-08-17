export type CycleId = '3eme' | 'lycee' | 'terminale';

export type ErrorType = 'inattention' | 'consigne' | 'conceptuelle' | 'methode';

export interface SocraticHint {
  level: 1 | 2 | 3;
  title: string;
  content: string; // May contain LaTeX ($...$)
}

export interface ExerciseStep {
  id: string;
  title: string;
  instruction: string; // LaTeX formatted
  expectedType: 'number' | 'expression' | 'qcm';
  expectedAnswers: string[]; // Normalized valid mathematical answers
  qcmChoices?: string[]; // Only if expectedType === 'qcm'
  hints: SocraticHint[];
  errorFeedback?: Record<string, string>; // Maps regex pattern/common error to Socratic feedback
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
