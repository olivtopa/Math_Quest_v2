import React, { useState, useEffect, useRef } from 'react';
import { DynamicQuestion, SocraticHint } from '../types/mathquest';
import { MathRenderer } from './MathRenderer';
import { ArrowLeft, Lightbulb, Shield, Heart } from 'lucide-react';

interface CombatViewProps {
  question: DynamicQuestion;
  monsterName: string;
  waveText: string;
  onAnswerSubmit: (userAnswer: string) => void;
  onNextQuestion: () => void;
  onBackToMap: () => void;
  feedbackState: {
    show: boolean;
    isCorrect: boolean;
    title: string;
    message: string;
    explanationHtml: string;
  } | null;
}

export const CombatView: React.FC<CombatViewProps> = ({
  question,
  monsterName,
  waveText,
  onAnswerSubmit,
  onNextQuestion,
  onBackToMap,
  feedbackState
}) => {
  const [activeHintLevel, setActiveHintLevel] = useState<number>(0);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current && question.svgOverlay) {
      question.svgOverlay(svgRef.current);
    }
  }, [question]);

  const handleNextHint = () => {
    if (question.hints && activeHintLevel < question.hints.length) {
      setActiveHintLevel(prev => prev + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 overflow-hidden">
      {/* Top Header Wave Title */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full">
        <button onClick={onBackToMap} className="mq-btn-secondary text-xs sm:text-sm py-2 px-4 self-start sm:self-auto">
          <ArrowLeft className="w-4 h-4" /> Carte des Royaumes
        </button>
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          <span className="text-xs sm:text-sm font-black text-emerald-400 tracking-tight uppercase bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/30 text-center">
            {waveText} — {monsterName}
          </span>
          <span className="text-xs sm:text-sm font-bold text-rose-400 flex items-center gap-1.5 bg-rose-500/10 px-3 py-1.5 rounded-full border border-rose-500/30 shrink-0">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" /> Monstre Actif
          </span>
        </div>
      </div>

      {/* Main Question & Graphic Panel Container */}
      <div className="mq-glass p-5 sm:p-8 space-y-6 border-l-4 border-l-amber-500 max-w-full overflow-hidden">
        <div className="space-y-2 border-b border-slate-800 pb-5">
          <span className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wider">{question.title}</span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white leading-relaxed">
            <MathRenderer content={question.question} />
          </h2>
        </div>

        {/* SVG Diagram / Visual Overlay Container */}
        {question.svgOverlay && (
          <div className="w-full max-w-md mx-auto h-64 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center p-4 relative shadow-inner">
            <svg ref={svgRef} className="w-full h-full" viewBox="0 0 300 240"></svg>
          </div>
        )}

        {/* Options / Answer Buttons */}
        {!feedbackState?.show ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => onAnswerSubmit(opt)}
                  className="mq-glass mq-glass-interactive p-4 sm:p-5 rounded-xl text-left border border-slate-800 hover:border-amber-500/50 flex items-center justify-between text-slate-100 font-semibold group"
                >
                  <span className="text-base sm:text-lg"><MathRenderer content={opt} /></span>
                  <span className="text-xs sm:text-sm px-3 py-1 rounded-md bg-slate-900 text-slate-300 font-bold border border-slate-800 group-hover:text-amber-400 shrink-0">
                    Choix {idx + 1}
                  </span>
                </button>
              ))}
            </div>

            {/* Socratic Avatar Speech Box */}
            <div className="bg-slate-950/90 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-purple-600 p-0.5 shadow-md shrink-0">
                    <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-2xl">
                      🧙‍♂️
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Tuteur Socratique</h4>
                    <p className="text-xs sm:text-sm text-amber-400 font-semibold">Indices Maïeutiques (Zéro Spoil)</p>
                  </div>
                </div>

                {question.hints && activeHintLevel < question.hints.length && (
                  <button
                    onClick={handleNextHint}
                    className="mq-btn-secondary text-xs sm:text-sm px-4 py-2 text-amber-300 border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 self-start sm:self-auto"
                  >
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span>Indice ({activeHintLevel + 1}/{question.hints.length})</span>
                  </button>
                )}
              </div>

              {/* Display Unlocked Socratic Hints */}
              {activeHintLevel > 0 && question.hints && (
                <div className="space-y-3 pt-2">
                  {question.hints.slice(0, activeHintLevel).map((hint: SocraticHint, idx: number) => (
                    <div key={idx} className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs sm:text-sm space-y-1">
                      <span className="font-bold text-amber-400 text-sm">Indice Niv. {hint.level} — {hint.title} :</span>
                      <p className="text-slate-200 leading-relaxed"><MathRenderer content={hint.content} /></p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Didactic Anti-Trap Proof Sheet & Feedback */
          <div className="bg-slate-950/95 border border-amber-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{feedbackState.isCorrect ? '✨' : '💥'}</span>
              <h3 className={`text-lg sm:text-xl font-extrabold ${feedbackState.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                {feedbackState.title}
              </h3>
            </div>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
              <MathRenderer content={feedbackState.message} />
            </p>

            {/* Fiche Anti-Piège & Rigoureuse */}
            <div className="bg-slate-900/90 p-5 sm:p-6 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-violet-400 uppercase tracking-wider">
                <Shield className="w-5 h-5 text-violet-400" /> Fiche Anti-Piège & Démarche Rigoureuse
              </div>
              <div className="text-sm sm:text-base text-slate-200 leading-relaxed space-y-3">
                <MathRenderer content={feedbackState.explanationHtml} />
              </div>
            </div>

            <button onClick={onNextQuestion} className="mq-btn-primary w-full py-4 text-base">
              Continuer le combat →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
