import React from 'react';
import { CycleId, UserProfile } from '../types/mathquest';
import { Zap, Award } from 'lucide-react';

interface HeaderProps {
  userProfile: UserProfile;
  onCycleChange: (cycle: CycleId) => void;
  purchasedCycles?: CycleId[];
}

export const Header: React.FC<HeaderProps> = ({
  userProfile,
  onCycleChange,
  purchasedCycles = ['3eme']
}) => {
  return (
    <header className="mq-glass sticky top-0 z-50 mx-2 my-2 sm:mx-4 sm:my-3 px-4 py-3.5 sm:px-6 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800/80 max-w-full overflow-hidden">
      {/* Top Row / Left Section: Brand & Active Cycle Badge */}
      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-amber-500 via-purple-600 to-blue-500 p-0.5 shadow-md shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[10px] sm:rounded-[14px] flex items-center justify-center font-black text-amber-400 text-lg sm:text-2xl tracking-tighter">
              TM
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-amber-300 via-purple-300 to-blue-300 bg-clip-text text-transparent leading-tight">
                Tijob Math
              </h1>
              <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider">
                v2.0
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">Tuteur Socratique IA</p>
          </div>
        </div>

        {/* Indicateur de Cycle / Programme (Élégant et informatif, non-bouton si unique) */}
        {purchasedCycles.length > 1 ? (
          <div className="flex items-center bg-slate-950/90 p-1.5 rounded-xl border border-slate-800/90 shrink-0">
            {purchasedCycles.includes('3eme') && (
              <button
                onClick={() => onCycleChange('3eme')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  userProfile.cycle === '3eme'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                3ème / Brevet
              </button>
            )}
            {purchasedCycles.includes('lycee') && (
              <button
                onClick={() => onCycleChange('lycee')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  userProfile.cycle === 'lycee'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Seconde / 1ère
              </button>
            )}
            {purchasedCycles.includes('terminale') && (
              <button
                onClick={() => onCycleChange('terminale')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  userProfile.cycle === 'terminale'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Terminale Spé
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 text-xs sm:text-sm font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-amber-400/80"></span>
            <span>Programme 3ème / Brevet</span>
          </div>
        )}
      </div>

      {/* Gamification Stats: Fioles & XP */}
      <div className="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
        <div className="mq-badge-energy px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
          <Zap className="w-4 h-4 fill-red-500 text-red-500 animate-pulse shrink-0" />
          <span>{userProfile.energyVials} / {userProfile.maxEnergyVials} Fioles</span>
        </div>

        <div className="mq-badge-xp px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
          <Award className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Niv. {userProfile.level} • {userProfile.xp} XP</span>
        </div>
      </div>
    </header>
  );
};
