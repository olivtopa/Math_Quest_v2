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
        <button onClick={onBack} className="mq-btn-secondary text-sm sm:text-base py-2.5 px-5">
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> Retour aux quêtes
        </button>
      </div>

      <div className="mq-glass p-6 sm:p-8 space-y-8 border-l-4 border-l-amber-500">
        <div className="flex items-center gap-4 sm:gap-5 border-b border-slate-800 pb-6">
          <div className="p-4 bg-amber-500/20 border border-amber-500/40 rounded-2xl text-amber-400 shadow-lg shadow-amber-500/10 shrink-0">
            <BookOpen className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">Grimoire des Faiblesses</h2>
            <p className="text-sm sm:text-base text-slate-300 font-medium mt-1">
              Algorithme de Répétition Espacée Ciblée (J+2, J+7, J+20)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Phase 1 */}
          <div className="mq-glass p-6 space-y-4 border-slate-800 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base font-extrabold text-amber-400">Phase 1 : J+2</span>
                <span className="text-xs sm:text-sm px-2.5 py-1 rounded bg-amber-500/15 text-amber-300 font-bold border border-amber-500/30">
                  Mémoire Courte
                </span>
              </div>
              <p className="text-3xl sm:text-4xl font-black text-white">{Math.min(grimoireCount, 2)} Notions</p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Révision immédiate recommandée pour consolider les notions fragiles avant oubli.
              </p>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="mq-glass p-6 space-y-4 border-slate-800 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base font-extrabold text-purple-400">Phase 2 : J+7</span>
                <span className="text-xs sm:text-sm px-2.5 py-1 rounded bg-purple-500/15 text-purple-300 font-bold border border-purple-500/30">
                  Ancrage Intermédiaire
                </span>
              </div>
              <p className="text-3xl sm:text-4xl font-black text-white">1 Notion</p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Réinjection sous forme d'embuscade surprise pour fixer la logique sur le long terme.
              </p>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="mq-glass p-6 space-y-4 border-slate-800 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base font-extrabold text-blue-400">Phase 3 : J+20</span>
                <span className="text-xs sm:text-sm px-2.5 py-1 rounded bg-blue-500/15 text-blue-300 font-bold border border-blue-500/30">
                  Mémoire Longue
                </span>
              </div>
              <p className="text-3xl sm:text-4xl font-black text-white">0 Notion</p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Notions verrouillées et maîtrisées pour l'épreuve du Brevet des collèges.
              </p>
            </div>
          </div>
        </div>

        {/* Session Action Banner */}
        <div className="bg-slate-950/90 border border-amber-500/40 p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 shadow-xl">
          <div className="space-y-2 text-left">
            <h4 className="text-lg sm:text-xl font-bold text-amber-300 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" /> Session de Récupération Socratique
            </h4>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
              Lance un mini-défi de 3 sous-questions ciblées sur tes faiblesses pour regagner des Fioles d'Énergie et purifier ton Grimoire !
            </p>
          </div>
          <button onClick={onBack} className="mq-btn-primary text-sm sm:text-base px-7 py-3.5 shrink-0">
            <RefreshCw className="w-5 h-5" /> Lancer la Révision
          </button>
        </div>
      </div>
    </div>
  );
};
