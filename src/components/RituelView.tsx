import React, { useState, useEffect } from 'react';
import { Clock, Play, X } from 'lucide-react';

export const RituelView: React.FC = () => {
  const [activeStage, setActiveStage] = useState<'flashcards' | 'mental' | 'geometry' | null>(null);
  const [timerLeft, setTimerLeft] = useState(60);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (activeStage === 'mental' && timerLeft > 0) {
      interval = setInterval(() => {
        setTimerLeft(prev => prev - 1);
      }, 1000);
    } else if (timerLeft === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [activeStage, timerLeft]);

  const handleStartStage = (stage: 'flashcards' | 'mental' | 'geometry') => {
    setActiveStage(stage);
    setTimerLeft(60);
    setScore(0);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="mq-glass p-6 sm:p-8 relative overflow-hidden bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/30">
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs sm:text-sm font-bold">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span>Méthode Scientifique d'Ancrage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Le Rituel Quotidien de 45 Minutes
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Trois étapes quotidiennes pour développer une vélocité calculatoire et une mémoire à long terme à toute épreuve.
          </p>
        </div>
      </div>

      {/* 3 Stages Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Stage 1 */}
        <div className="mq-glass p-6 space-y-4 border-slate-800 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-bold text-indigo-400 uppercase tracking-wider">Étape 1 (10 Min)</span>
            <h3 className="text-lg sm:text-xl font-bold text-white">Flashcards d'Apprentissage</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Rappels actifs des formules clés, définitions et astuces.</p>
          </div>
          <button
            onClick={() => handleStartStage('flashcards')}
            className="mq-btn-primary w-full py-3 text-xs sm:text-sm bg-gradient-to-r from-indigo-600 to-purple-600"
          >
            <Play className="w-4 h-4" /> Lancer Flashcards
          </button>
        </div>

        {/* Stage 2 */}
        <div className="mq-glass p-6 space-y-4 border-slate-800 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wider">Étape 2 (15 Min)</span>
            <h3 className="text-lg sm:text-xl font-bold text-white">Calcul Express (60s Time-Attack)</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Réponds à un maximum de calculs automatisés en 60 secondes.</p>
          </div>
          <button
            onClick={() => handleStartStage('mental')}
            className="mq-btn-primary w-full py-3 text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950"
          >
            <Play className="w-4 h-4" /> Lancer Calcul Express
          </button>
        </div>

        {/* Stage 3 */}
        <div className="mq-glass p-6 space-y-4 border-slate-800 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-bold text-emerald-400 uppercase tracking-wider">Étape 3 (20 Min)</span>
            <h3 className="text-lg sm:text-xl font-bold text-white">Résolution Géométrique</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Calculer des longueurs de solides, de trigonométrie et de Thalès.</p>
          </div>
          <button
            onClick={() => handleStartStage('geometry')}
            className="mq-btn-primary w-full py-3 text-xs sm:text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950"
          >
            <Play className="w-4 h-4" /> Lancer Géométrie
          </button>
        </div>
      </div>

      {/* Interactive Modal when activeStage is set */}
      {activeStage && (
        <div className="fixed inset-0 bg-slate-950/95 z-50 flex items-center justify-center p-4">
          <div className="mq-glass p-8 max-w-lg w-full space-y-6 text-center relative border-indigo-500/40">
            <button
              onClick={() => setActiveStage(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full bg-slate-900 border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {activeStage === 'mental' && (
              <div className="space-y-4">
                <span className="text-sm font-bold text-rose-400 bg-rose-500/10 px-4 py-1.5 rounded-full border border-rose-500/30">
                  Temps restant : {timerLeft}s
                </span>
                <h3 className="text-2xl font-bold text-white">Calcul Express</h3>
                <p className="text-2xl font-mono text-amber-300">12 × 7 = ?</p>
                <div className="flex gap-3 justify-center">
                  <button onClick={() => setScore(prev => prev + 1)} className="mq-btn-primary px-6 py-3 text-base">
                    84
                  </button>
                  <button onClick={() => setScore(prev => prev)} className="mq-btn-secondary px-6 py-3 text-base">
                    74
                  </button>
                </div>
                <p className="text-sm text-slate-300">Score : {score} calculs réussis</p>
              </div>
            )}

            {activeStage === 'flashcards' && (
              <div className="space-y-5">
                <h3 className="text-xl font-bold text-white">Flashcard : Double Distributivité</h3>
                <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 text-amber-300 text-xl font-mono">
                  $(a+b)(c+d) = ac + ad + bc + bd$
                </div>
                <button onClick={() => setActiveStage(null)} className="mq-btn-primary text-base">
                  Valider & Passer à la suivante
                </button>
              </div>
            )}

            {activeStage === 'geometry' && (
              <div className="space-y-5">
                <h3 className="text-xl font-bold text-white">Défi Géométrie Pratique</h3>
                <p className="text-base text-slate-200">Dans un triangle rectangle de côtés 3 cm et 4 cm, quelle est l'hypoténuse ?</p>
                <button onClick={() => setActiveStage(null)} className="mq-btn-primary text-base">
                  5 cm (Valider)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
