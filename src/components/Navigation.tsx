import React from 'react';
import { MainTab } from '../types/mathquest';
import { Compass, Clock, Wrench, Shield } from 'lucide-react';

interface NavigationProps {
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: MainTab; label: string; icon: React.ReactNode }[] = [
    { id: 'aventure', label: 'Aventure', icon: <Compass className="w-5 h-5" /> },
    { id: 'rituel', label: 'Rituel 45\'', icon: <Clock className="w-5 h-5" /> },
    { id: 'widgets', label: 'Widgets', icon: <Wrench className="w-5 h-5" /> },
    { id: 'profile', label: 'Profil', icon: <Shield className="w-5 h-5" /> }
  ];

  return (
    <nav className="mq-glass fixed bottom-0 left-0 right-0 z-50 px-6 py-2 border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-2xl flex items-center justify-around shadow-2xl">
      {tabs.map((t) => {
        const isActive = activeTab === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onTabChange(t.id)}
            className={`flex flex-col items-center gap-1 py-1.5 px-4 rounded-xl transition-all ${
              isActive
                ? 'text-amber-400 bg-amber-500/15 border border-amber-500/30 shadow-lg shadow-amber-500/10 scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.icon}
            <span className="text-[11px] font-extrabold tracking-wide">{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
