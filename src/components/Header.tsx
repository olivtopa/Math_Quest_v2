import React from 'react';
import { CycleId, UserProfile } from '../types/mathquest';
import { Zap, Award, ShieldCheck, Cpu } from 'lucide-react';

interface HeaderProps {
  userProfile: UserProfile;
  onCycleChange: (cycle: CycleId) => void;
  apiMode: boolean;
  onToggleApiMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userProfile,
  onCycleChange,
  apiMode,
  onToggleApiMode
}) => {
  return (
    <header className="mq-glass sticky top-0 z-50 mx-4 my-3 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80">
      {/* Brand & Logo */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-purple-600 to-blue-500 p-0.5 shadow-lg shadow-amber-500/10">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-amber-400 text-xl tracking-tighter">
              TM
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-amber-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
                Tijob Math
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider">
                v2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Tuteur Socratique IA Incarné</p>
          </div>
        </div>

        {/* Cycle Tabs */}
        <div className="flex items-center bg-slate-950/80 p-1 rounded-2xl border border-slate-800/80">
          <button
            onClick={() => onCycleChange('3eme')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              userProfile.cycle === '3eme'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/25 scale-[1.02]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3ème / Brevet
          </button>
          <button
            onClick={() => onCycleChange('lycee')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              userProfile.cycle === 'lycee'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/25 scale-[1.02]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Seconde / 1ère
          </button>
          <button
            onClick={() => onCycleChange('terminale')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              userProfile.cycle === 'terminale'
                ? 'bg-gradient-to-r from-blue-600 to-pink-600 text-white shadow-lg shadow-blue-600/25 scale-[1.02]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Terminale Spé
          </button>
        </div>
      </div>

      {/* Gamification Stats (Energy Vials, XP, Grimoire, API Toggle) */}
      <div className="flex items-center gap-3">
        {/* Energy Vials */}
        <div className="mq-badge-energy">
          <Zap className="w-4 h-4 fill-red-500 text-red-500 animate-pulse" />
          <span>{userProfile.energyVials} / {userProfile.maxEnergyVials} Fioles</span>
        </div>

        {/* XP & Level Badge */}
        <div className="mq-badge-xp">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Niv. {userProfile.level} • {userProfile.xp} XP</span>
        </div>

        {/* Mode Toggle (Zéro API vs Proxy API) */}
        <button
          onClick={onToggleApiMode}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all ${
            !apiMode
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-md shadow-emerald-500/10'
              : 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300 shadow-md shadow-indigo-500/10'
          }`}
          title={!apiMode ? 'Mode Zéro-API Local (100% Gratuit, 0€ API, Offline)' : 'Mode Proxy LLM activé'}
        >
          {!apiMode ? (
            <>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zéro-API Local</span>
            </>
          ) : (
            <>
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>LLM Proxy</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
