import React from 'react';
import { GameState, UserProfile } from '../types/mathquest';
import { Trophy as TrophyIcon } from 'lucide-react';

interface ProfileViewProps {
  gameState: GameState;
  userProfile: UserProfile;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ gameState, userProfile }) => {
  const readinessPct = Math.min(100, Math.max(20, (gameState.level - 1) * 25 + 20));

  const trophies = [
    { id: 't1', title: 'Premier Sang', desc: 'Terminer le premier donjon socratique', icon: '🥇', isUnlocked: gameState.level >= 2 },
    { id: 't2', title: 'Vitesse Absolue', desc: 'Réussir le Calcul Express 60s', icon: '⚡', isUnlocked: gameState.highScores.mental >= 5 },
    { id: 't3', title: 'Géomètre d\'Or', desc: 'Valider les donjons de Pythagore et Thalès', icon: '📐', isUnlocked: gameState.level >= 4 },
    { id: 't4', title: 'Paré au Lycée', desc: 'Atteindre le niveau 5 et compléter le cycle', icon: '🚀', isUnlocked: gameState.level >= 5 }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Main Profile Card */}
      <div className="mq-glass p-6 sm:p-8 text-center space-y-6 relative overflow-hidden border-slate-800">
        <div className="w-24 h-24 bg-gradient-to-tr from-amber-500 via-purple-600 to-blue-500 rounded-3xl mx-auto p-1 shadow-2xl animate-float">
          <div className="w-full h-full bg-slate-950 rounded-[20px] flex items-center justify-center text-4xl">
            ⚔️
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Chevalier des Mathématiques</h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium">Parcours de Réussite de la 3ème à la Terminale</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-slate-800/80">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <span className="block text-xl sm:text-2xl font-black text-amber-400">🪙 {gameState.gold}</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Or accumulé</span>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <span className="block text-xl sm:text-2xl font-black text-purple-400">Niv. {gameState.level}</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Niveau Atteint</span>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <span className="block text-xl sm:text-2xl font-black text-emerald-400">{userProfile.xp} XP</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">XP Totale</span>
          </div>
        </div>
      </div>

      {/* Seconde / Bac Readiness Meter */}
      <div className="mq-glass p-6 space-y-4 border-slate-800">
        <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
          <span className="text-slate-200 uppercase tracking-wider">Indicateur de Préparation Seconde & Lycée</span>
          <span className="text-amber-400 text-sm sm:text-base">{readinessPct}% Prêt</span>
        </div>
        <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 h-full transition-all duration-500"
            style={{ width: `${readinessPct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs font-bold text-slate-400">
          <span>DÉBUTANT 3ÈME</span>
          <span>PARÉ POUR LE LYCÉE 🚀</span>
        </div>
      </div>

      {/* Trophies Grid */}
      <div className="space-y-4">
        <h3 className="text-xs sm:text-sm font-black uppercase text-slate-300 tracking-wider flex items-center gap-2">
          <TrophyIcon className="w-4 h-4 text-amber-400" /> Trophées & Hauts Faits Débloqués
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trophies.map((t) => (
            <div
              key={t.id}
              className={`mq-glass p-5 rounded-xl border flex items-center gap-4 transition-all ${
                t.isUnlocked
                  ? 'bg-slate-900/80 border-emerald-500/40 text-slate-100'
                  : 'bg-slate-950/40 border-slate-900 opacity-50'
              }`}
            >
              <span className="text-3xl sm:text-4xl">{t.icon}</span>
              <div>
                <h4 className="font-bold text-base text-white">{t.title}</h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
