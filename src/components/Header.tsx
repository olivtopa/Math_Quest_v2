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
    <header className="mq-glass sticky top-0 z-50 mx-2 my-2 sm:mx-4 sm:my-3 px-3 py-3 sm:px-6 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800/80 max-w-full overflow-hidden">
      {/* Top Row / Left Section: Brand & Active Cycle Badge */}
      <div className="flex items-center justify-between w-full sm:w-auto gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-amber-500 via-purple-600 to-blue-500 p-0.5 shadow-md shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[10px] sm:rounded-[14px] flex items-center justify-center font-black text-amber-400 text-base sm:text-xl tracking-tighter">
              TM
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-amber-300 via-purple-300 to-blue-300 bg-clip-text text-transparent leading-none">
                Tijob Math
              </h1>
              <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider">
                v2.0
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Tuteur Socratique IA</p>
          </div>
        </div>

        {/* Cycle Tabs (Displays only purchased modules, default: 3ème / Brevet) */}
        <div className="flex items-center bg-slate-950/90 p-1 rounded-xl border border-slate-800/90 shrink-0">
          {purchasedCycles.includes('3eme') && (
            <button
              onClick={() => onCycleChange('3eme')}
              className={`px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all ${
                userProfile.cycle === '3eme'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              3ème / Brevet
            </button>
          )}

          {purchasedCycles.includes('lycee') && (
            <button
              onClick={() => onCycleChange('lycee')}
              className={`px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all ${
                userProfile.cycle === 'lycee'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Seconde / 1ère
            </button>
          )}

          {purchasedCycles.includes('terminale') && (
            <button
              onClick={() => onCycleChange('terminale')}
              className={`px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all ${
                userProfile.cycle === 'terminale'
                  ? 'bg-gradient-to-r from-blue-600 to-pink-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Terminale Spé
            </button>
          )}
        </div>
      </div>

      {/* Gamification Stats: Fioles & XP */}
      <div className="flex items-center justify-center sm:justify-end gap-2.5 w-full sm:w-auto">
        <div className="mq-badge-energy px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-xs">
          <Zap className="w-3.5 h-3.5 fill-red-500 text-red-500 animate-pulse shrink-0" />
          <span>{userProfile.energyVials} / {userProfile.maxEnergyVials} Fioles</span>
        </div>

        <div className="mq-badge-xp px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-xs">
          <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Niv. {userProfile.level} • {userProfile.xp} XP</span>
        </div>
      </div>
    </header>
  );
};
