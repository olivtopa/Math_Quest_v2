import React from 'react';
import { BookOpen, RefreshCw, Sparkles, ArrowLeft, Target } from 'lucide-react';
import { GameState } from '../types/mathquest';

interface GrimoireProps {
  onBack: () => void;
  grimoireCount: number;
  gameState: GameState;
  onStartRenforcement: (realm: string, questIdx: number) => void;
}

export const Grimoire: React.FC<GrimoireProps> = ({
  onBack,
  gameState,
  onStartRenforcement
}) => {
  // Liste par défaut ou enregistrée des axes d'amélioration
  const weakTopics = gameState.weakTopics && gameState.weakTopics.length > 0
    ? gameState.weakTopics
    : [
        { topicId: 'frac_calc', realm: 'Nombres & Calculs', questIndex: 0, title: 'Opérations sur les Fractions & Priorités', errorCount: 2, lastFailedAt: Date.now() - 86400000 },
        { topicId: 'thales', realm: 'Géométrie', questIndex: 1, title: 'Théorème de Thalès & Égalités de rapports', errorCount: 1, lastFailedAt: Date.now() - 172800000 }
      ];

  const targetTopic = weakTopics[0];

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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">Zone de Renforcement</h2>
            <p className="text-sm sm:text-base text-slate-300 font-medium mt-1">
              Algorithme de Répétition Espacée Ciblée (J+2, J+7, J+20)
            </p>
          </div>
        </div>

        {/* 3 Phases de Répétition Espacée */}
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
              <p className="text-3xl sm:text-4xl font-black text-white">{weakTopics.length} Notions</p>
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

        {/* Détail des Notions Ciblées */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white">Notions identifiées nécessitant un renforcement</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {weakTopics.map((topic, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {topic.errorCount} hésitation{topic.errorCount > 1 ? 's' : ''}
                    </span>
                    <span className="text-xs text-slate-400">{topic.realm}</span>
                  </div>
                  <p className="text-sm font-bold text-white">{topic.title}</p>
                </div>
                <button
                  onClick={() => onStartRenforcement(topic.realm, topic.questIndex)}
                  className="mq-btn-secondary text-xs py-2 px-3 shrink-0 hover:border-amber-400 hover:text-amber-300"
                >
                  Cibler
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Session Action Banner */}
        <div className="bg-slate-950/90 border border-amber-500/40 p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 shadow-xl">
          <div className="space-y-2 text-left">
            <h4 className="text-lg sm:text-xl font-bold text-amber-300 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" /> Session de Renforcement Ciblée
            </h4>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
              Lance un mini-défi de 3 questions ultra-ciblées sur <strong>{targetTopic.title}</strong> pour consolider ta maîtrise et regagner tes Fioles d'Énergie !
            </p>
          </div>
          <button
            onClick={() => onStartRenforcement(targetTopic.realm, targetTopic.questIndex)}
            className="mq-btn-primary text-sm sm:text-base px-7 py-3.5 shrink-0 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold"
          >
            <RefreshCw className="w-5 h-5" /> Lancer le Renforcement
          </button>
        </div>
      </div>
    </div>
  );
};

