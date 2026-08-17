import React from 'react';
import { CycleId, UserProfile } from '../types/mathquest';
import { Zap, Award, BookOpen, ShieldCheck, Cpu } from 'lucide-react';

interface HeaderProps {
  userProfile: UserProfile;
  onCycleChange: (cycle: CycleId) => void;
  apiMode: boolean;
  onToggleApiMode: () => void;
  onOpenGrimoire: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userProfile,
  onCycleChange,
  apiMode,
  onToggleApiMode,
  onOpenGrimoire
}) => {
  return (
    <header className="glass-panel sticky top-0 z-50 mx-4 my-3 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
      {/* Brand & Cycle Selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-purple-600 to-blue-500 p-0.5 flex items-center justify-center shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-extrabold text-amber-400 text-xl">
              MQ
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-amber-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
              Math Quest <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">v2</span>
            </h1>
            <p className="text-xs text-slate-400">Tuteur Socratique IA Incarné</p>
          </div>
        </div>

        {/* Cycle Tabs */}
        <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => onCycleChange('3eme')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              userProfile.cycle === '3eme'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3ème / Brevet
          </button>
          <button
            onClick={() => onCycleChange('lycee')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              userProfile.cycle === 'lycee'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Seconde / 1ère
          </button>
          <button
            onClick={() => onCycleChange('terminale')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              userProfile.cycle === 'terminale'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Terminale Spé
          </button>
        </div>
      </div>

      {/* Gamification Stats (Energy Vials, XP, Grimoire, API Toggle) */}
      <div className="flex items-center gap-3">
        {/* Grimoire button */}
        <button
          onClick={onOpenGrimoire}
          className="btn-secondary text-xs px-3 py-1.5 bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20 flex items-center gap-1.5"
          title="Grimoire des Faiblesses (Répétition espacée)"
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>Grimoire ({userProfile.grimoireCount})</span>
        </button>

        {/* Energy Vials */}
        <div className="energy-vial">
          <Zap className="w-4 h-4 fill-red-500 text-red-500 animate-pulse" />
          <span>{userProfile.energyVials} / {userProfile.maxEnergyVials} Fioles</span>
        </div>

        {/* XP & Level */}
        <div className="xp-badge">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Niv. {userProfile.level} • {userProfile.xp} XP</span>
        </div>

        {/* Mode Toggle (Zéro API vs Proxy API) */}
        <button
          onClick={onToggleApiMode}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
            !apiMode
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
          }`}
          title={!apiMode ? 'Mode Zéro-API Local activé (0€, 100% Hors-Ligne)' : 'Mode Proxy LLM activé'}
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
