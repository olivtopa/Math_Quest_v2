import { useState, useEffect } from 'react';
import { CycleId, UserProfile, GameState, MainTab, DynamicQuestion } from './types/mathquest';
import { generateDynamicQuestion } from './engine/dynamicQuestions';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { AventureView } from './components/AventureView';
import { CombatView } from './components/CombatView';
import { RituelView } from './components/RituelView';
import { WidgetsView } from './components/WidgetsView';
import { ProfileView } from './components/ProfileView';
import { Grimoire } from './components/Grimoire';

export function App() {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('mathquest_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...parsed, cycle: '3eme' };
      } catch (e) {}
    }
    return {
      name: 'Chevalier',
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

  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('mathquest_game_state');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      level: 2,
      hp: 100,
      maxHp: 100,
      gold: 50,
      xp: 450,
      energyVials: 5,
      maxEnergyVials: 5,
      dungeonsCleared: 1,
      completedQuests: [],
      grimoireCount: 2,
      highScores: { mental: 0 }
    };
  });

  const [activeTab, setActiveTab] = useState<MainTab>('aventure');
  const [currentView, setCurrentView] = useState<'tab' | 'combat' | 'grimoire'>('tab');

  // Active Combat State
  const [activeDungeon, setActiveDungeon] = useState<{ realm: string; questIndex: number } | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<DynamicQuestion | null>(null);
  const [waveIndex, setWaveIndex] = useState(1);
  const [feedbackState, setFeedbackState] = useState<{
    show: boolean;
    isCorrect: boolean;
    title: string;
    message: string;
    explanationHtml: string;
  } | null>(null);

  useEffect(() => {
    localStorage.setItem('mathquest_user_profile', JSON.stringify(userProfile));
    localStorage.setItem('mathquest_game_state', JSON.stringify(gameState));
    document.body.className = `theme-${userProfile.cycle}`;
  }, [userProfile, gameState]);

  const handleCycleChange = (cycle: CycleId) => {
    setUserProfile(prev => ({ ...prev, cycle }));
  };

  const handleStartDungeon = (realm: string, questIdx: number) => {
    setActiveDungeon({ realm, questIndex: questIdx });
    setWaveIndex(1);
    const firstQ = generateDynamicQuestion(realm, questIdx);
    setCurrentQuestion(firstQ);
    setFeedbackState(null);
    setCurrentView('combat');
  };

  const handleAnswerSubmit = (userAnswer: string) => {
    if (!currentQuestion) return;
    const isCorrect = userAnswer.trim().toLowerCase() === currentQuestion.answer.trim().toLowerCase();

    if (isCorrect) {
      setGameState(prev => ({
        ...prev,
        gold: prev.gold + 10,
        xp: prev.xp + 50,
        level: Math.floor((prev.xp + 50) / 200) + 1
      }));
      setFeedbackState({
        show: true,
        isCorrect: true,
        title: 'Coup Critique ! (Réponse Exacte)',
        message: 'Bravo ! Tu as terrassé le monstre avec un raisonnement impeccable.',
        explanationHtml: currentQuestion.explanationHtml
      });
    } else {
      setGameState(prev => ({
        ...prev,
        hp: Math.max(10, prev.hp - 15)
      }));
      setFeedbackState({
        show: true,
        isCorrect: false,
        title: 'Attaque manquée ! (Réponse Incorrecte)',
        message: 'Le monstre t\'a infligé des dégâts. Analyse la fiche anti-piège ci-dessous !',
        explanationHtml: currentQuestion.explanationHtml
      });
    }
  };

  const handleNextQuestion = () => {
    if (!activeDungeon) return;
    if (waveIndex >= 4) {
      // Dungeon Cleared Victory
      setGameState(prev => ({
        ...prev,
        dungeonsCleared: prev.dungeonsCleared + 1,
        gold: prev.gold + 50,
        xp: prev.xp + 150
      }));
      setCurrentView('tab');
      setActiveTab('aventure');
    } else {
      setWaveIndex(prev => prev + 1);
      const nextQ = generateDynamicQuestion(activeDungeon.realm, activeDungeon.questIndex);
      setCurrentQuestion(nextQ);
      setFeedbackState(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-20">
      {/* Top Header */}
      <Header
        userProfile={userProfile}
        onCycleChange={handleCycleChange}
        purchasedCycles={['3eme']}
      />

      {/* Main Container */}
      <main className="flex-1">
        {currentView === 'tab' && (
          <>
            {activeTab === 'aventure' && (
              <AventureView
                gameState={gameState}
                userProfile={userProfile}
                onStartDungeon={handleStartDungeon}
                onOpenGrimoire={() => setCurrentView('grimoire')}
              />
            )}
            {activeTab === 'rituel' && <RituelView />}
            {activeTab === 'widgets' && <WidgetsView />}
            {activeTab === 'profile' && <ProfileView gameState={gameState} userProfile={userProfile} />}
          </>
        )}

        {currentView === 'combat' && currentQuestion && (
          <CombatView
            question={currentQuestion}
            monsterName="Spectre de l'Erreur"
            waveText={`Monstre ${waveIndex}/4`}
            onAnswerSubmit={handleAnswerSubmit}
            onNextQuestion={handleNextQuestion}
            onBackToMap={() => {
              setCurrentView('tab');
              setActiveTab('aventure');
            }}
            feedbackState={feedbackState}
          />
        )}

        {currentView === 'grimoire' && (
          <Grimoire
            onBack={() => {
              setCurrentView('tab');
              setActiveTab('aventure');
            }}
            grimoireCount={userProfile.grimoireCount}
          />
        )}
      </main>

      {/* Bottom Navigation (4 Main Tabs) */}
      {currentView === 'tab' && (
        <Navigation activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />
      )}
    </div>
  );
}

export default App;
