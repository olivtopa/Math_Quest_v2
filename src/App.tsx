import { useState, useEffect } from 'react';
import { CycleId, UserProfile, Chapter, Exercise } from './types/mathquest';
import { allChapters } from './data/chapters';
import { Header } from './components/Header';
import { QuestBoard } from './components/QuestBoard';
import { ExerciseRunner } from './components/ExerciseRunner';
import { Grimoire } from './components/Grimoire';

export function App() {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('mathquest_user_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      name: 'Élève',
      cycle: '3eme',
      xp: 450,
      level: 3,
      energyVials: 5,
      maxEnergyVials: 5,
      badges: ['Bienvenue'],
      completedExerciseIds: [],
      grimoireCount: 2
    };
  });

  const [currentView, setCurrentView] = useState<'board' | 'exercise' | 'grimoire'>('board');
  const [selectedExercise, setSelectedExercise] = useState<{ chapter: Chapter; exercise: Exercise } | null>(null);
  const [apiMode, setApiMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('mathquest_user_profile', JSON.stringify(userProfile));
    // Apply body theme class
    document.body.className = `theme-${userProfile.cycle}`;
  }, [userProfile]);

  const handleCycleChange = (cycle: CycleId) => {
    setUserProfile(prev => ({ ...prev, cycle }));
  };

  const handleSelectExercise = (chapter: Chapter, exercise: Exercise) => {
    setSelectedExercise({ chapter, exercise });
    setCurrentView('exercise');
  };

  const handleCompleteExercise = (rewardXP: number) => {
    setUserProfile(prev => {
      const newXP = prev.xp + rewardXP;
      const newLevel = Math.floor(newXP / 200) + 1;
      const completed = selectedExercise
        ? [...new Set([...prev.completedExerciseIds, selectedExercise.exercise.id])]
        : prev.completedExerciseIds;

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        completedExerciseIds: completed
      };
    });
  };

  const currentChapters = allChapters[userProfile.cycle] || [];

  return (
    <div className="min-h-screen flex flex-col pb-12">
      <Header
        userProfile={userProfile}
        onCycleChange={handleCycleChange}
        apiMode={apiMode}
        onToggleApiMode={() => setApiMode(!apiMode)}
      />

      <main className="flex-1">
        {currentView === 'board' && (
          <QuestBoard
            chapters={currentChapters}
            userProfile={userProfile}
            onSelectExercise={handleSelectExercise}
            onOpenGrimoire={() => setCurrentView('grimoire')}
          />
        )}

        {currentView === 'exercise' && selectedExercise && (
          <ExerciseRunner
            exercise={selectedExercise.exercise}
            onBack={() => setCurrentView('board')}
            onComplete={handleCompleteExercise}
          />
        )}

        {currentView === 'grimoire' && (
          <Grimoire
            onBack={() => setCurrentView('board')}
            grimoireCount={userProfile.grimoireCount}
          />
        )}
      </main>

      <footer className="text-center py-6 text-xs text-slate-500 border-t border-slate-900 mt-8">
        <p>Math Quest v2 • Plateforme Éducative Socratique Multi-Cycles (3ème à Terminale)</p>
      </footer>
    </div>
  );
}

export default App;
