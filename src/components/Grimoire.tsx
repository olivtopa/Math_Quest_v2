import React from 'react';
import { BookOpen, RefreshCw, Sparkles, ArrowLeft } from 'lucide-react';

interface GrimoireProps {
  onBack: () => void;
  grimoireCount: number;
}

export const Grimoire: React.FC<GrimoireProps> = ({ onBack, grimoireCount }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="mq-btn-secondary text-xs">
          <ArrowLeft className="w-4 h-4" /> Retour aux quêtes
        </button>
      </div>

      <div className="mq-glass p-8 space-y-8 border-l-4 border-l-amber-500">
        <div className="flex items-center gap-5 border-b border-slate-800 pb-6">
          <div className="p-4 bg-amber-500/20 border border-amber-500/40 rounded-2xl text-amber-400 shadow-lg shadow-amber-500/10">
            <BookOpen className="w-9 h-9" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-white">Grimoire des Faiblesses</h2>
            <p className="text-xs text-slate-400 font-medium">Algorithme de Répétition Espacée Ciblée (J+2, J+7, J+20)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="mq-glass p-6 space-y-3 border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400">Phase 1 : J+2</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-bold border border-amber-500/20">Mémoire Courte</span>
            </div>
            <p className="text-3xl font-extrabold text-white">{Math.min(grimoireCount, 2)} Notions</p>
            <p className="text-xs text-slate-400 leading-relaxed">Révision immédiate recommandée pour consolider les notions fragiles.</p>
          </div>

          <div className="mq-glass p-6 space-y-3 border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400">Phase 2 : J+7</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 font-bold border border-purple-500/20">Ancrage Intermédiaire</span>
            </div>
            <p className="text-3xl font-extrabold text-white">1 Notion</p>
            <p className="text-xs text-slate-400 leading-relaxed">Réinjection sous forme d'embuscade surprise pour fixer la logique.</p>
          </div>

          <div className="mq-glass p-6 space-y-3 border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400">Phase 3 : J+20</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 font-bold border border-blue-500/20">Mémoire Longue</span>
            </div>
            <p className="text-3xl font-extrabold text-white">0 Notion</p>
            <p className="text-xs text-slate-400 leading-relaxed">Notions verrouillées et maîtrisées pour l'épreuve du Brevet/Bac.</p>
          </div>
        </div>

        <div className="bg-slate-950/80 border border-amber-500/30 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-left">
            <h4 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Session de Récupération Socratique
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
              Lance un mini-défi de 3 sous-questions ciblées sur tes faiblesses pour regagner des Fioles d'Énergie et purifier ton Grimoire !
            </p>
          </div>
          <button onClick={onBack} className="mq-btn-primary text-xs px-6 py-3 shrink-0">
            <RefreshCw className="w-4 h-4" /> Lancer la Révision
          </button>
        </div>
      </div>
    </div>
  );
};
