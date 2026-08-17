import React from 'react';
import { BookOpen, RefreshCw, Sparkles, ArrowLeft } from 'lucide-react';

interface GrimoireProps {
  onBack: () => void;
  grimoireCount: number;
}

export const Grimoire: React.FC<GrimoireProps> = ({ onBack, grimoireCount }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="btn-secondary text-xs">
          <ArrowLeft className="w-4 h-4" /> Retour au monde
        </button>
      </div>

      <div className="glass-panel p-8 space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
          <div className="p-3 bg-amber-500/20 border border-amber-500/30 rounded-2xl text-amber-400">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-100">Grimoire des Faiblesses</h2>
            <p className="text-xs text-slate-400">Répétition Espacée Ciblée (J+2, J+7, J+20)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-semibold text-amber-400">J+2 (Mémoire à court terme)</span>
            <p className="text-2xl font-extrabold text-white">{Math.min(grimoireCount, 2)} Notions</p>
            <p className="text-xs text-slate-400">À réviser pour consolider les acquis récents.</p>
          </div>

          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-semibold text-purple-400">J+7 (Ancrage intermédiaire)</span>
            <p className="text-2xl font-extrabold text-white">1 Notion</p>
            <p className="text-xs text-slate-400">Réinjection sous forme d'embuscade.</p>
          </div>

          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
            <span className="text-xs font-semibold text-blue-400">J+20 (Mémoire à long terme)</span>
            <p className="text-2xl font-extrabold text-white">0 Notion</p>
            <p className="text-xs text-slate-400">Maîtrise complète validée pour le Brevet/Bac.</p>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-xl flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Entraînement de Récupération
            </h4>
            <p className="text-xs text-slate-300">
              Lancer une session de 3 sous-questions sur vos faiblesses récentes pour regagner des Fioles d'Énergie !
            </p>
          </div>
          <button onClick={onBack} className="btn-primary text-xs">
            <RefreshCw className="w-4 h-4" /> Réviser
          </button>
        </div>
      </div>
    </div>
  );
};
