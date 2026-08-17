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
    <div className="max-w-4xl mx-auto px-3 py-4 sm:px-4 sm:py-6 space-y-4 sm:space-y-6 overflow-hidden">
      {/* Top Header Wave Title */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 w-full">
        <button onClick={onBackToMap} className="mq-btn-secondary text-[11px] sm:text-xs py-1.5 px-3 self-start sm:self-auto">
          <ArrowLeft className="w-3.5 h-3.5" /> Carte des Royaumes
        </button>
        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
          <span className="text-[10px] sm:text-xs font-black text-emerald-400 tracking-tight uppercase bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 truncate max-w-[200px] sm:max-w-none text-center">
            {waveText} — {monsterName}
          </span>
          <span className="text-[10px] sm:text-xs font-bold text-rose-400 flex items-center gap-1 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/30 shrink-0">
            <Heart className="w-3 h-3 fill-rose-500 text-rose-500" /> Monstre Actif
          </span>
        </div>
      </div>

      {/* Main Question & Graphic Panel Container */}
      <div className="mq-glass p-4 sm:p-8 space-y-4 sm:space-y-6 border-l-4 border-l-amber-500 max-w-full overflow-hidden">
        <div className="space-y-2 border-b border-slate-800 pb-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">{question.title}</span>
          <h2 className="text-2xl font-extrabold text-white">
            <MathRenderer content={question.question} />
          </h2>
        </div>

        {/* SVG Diagram / Visual Overlay Container */}
        {question.svgOverlay && (
          <div className="w-full max-w-sm mx-auto h-60 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center p-4 relative shadow-inner">
            <svg ref={svgRef} className="w-full h-full" viewBox="0 0 300 240"></svg>
          </div>
        )}

        {/* Options / Answer Buttons */}
        {!feedbackState?.show ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {question.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => onAnswerSubmit(opt)}
                  className="mq-glass mq-glass-interactive p-4 rounded-xl text-left border border-slate-800 hover:border-amber-500/50 flex items-center justify-between text-slate-100 font-medium group"
                >
                  <span className="text-base"><MathRenderer content={opt} /></span>
                  <span className="text-xs px-2.5 py-1 rounded-md bg-slate-900 text-slate-400 font-bold border border-slate-800 group-hover:text-amber-400">
                    Choix {idx + 1}
                  </span>
                </button>
              ))}
            </div>

            {/* Socratic Avatar Speech Box */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-purple-600 p-0.5 shadow-md">
                    <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-xl">
                      🧙‍♂️
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Tuteur Socratique</h4>
                    <p className="text-xs text-amber-400 font-medium">Indices Maïeutiques (Zéro Spoil)</p>
                  </div>
                </div>

                {question.hints && activeHintLevel < question.hints.length && (
                  <button
                    onClick={handleNextHint}
                    className="mq-btn-secondary text-xs px-3 py-1.5 text-amber-300 border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20"
                  >
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span>Indice ({activeHintLevel + 1}/{question.hints.length})</span>
                  </button>
                )}
              </div>

              {/* Display Unlocked Socratic Hints */}
              {activeHintLevel > 0 && question.hints && (
                <div className="space-y-2 pt-2">
                  {question.hints.slice(0, activeHintLevel).map((hint: SocraticHint, idx: number) => (
                    <div key={idx} className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs space-y-1">
                      <span className="font-bold text-amber-400">Indice Niv. {hint.level} — {hint.title} :</span>
                      <p className="text-slate-200"><MathRenderer content={hint.content} /></p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Didactic Anti-Trap Proof Sheet & Feedback */
          <div className="bg-slate-950/90 border border-amber-500/40 rounded-2xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{feedbackState.isCorrect ? '✨' : '💥'}</span>
              <h3 className={`text-base font-extrabold ${feedbackState.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                {feedbackState.title}
              </h3>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              <MathRenderer content={feedbackState.message} />
            </p>

            {/* Fiche Anti-Piège & Rigoureuse */}
            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-violet-400 uppercase tracking-wider">
                <Shield className="w-4 h-4 text-violet-400" /> Fiche Anti-Piège & Démarche Rigoureuse
              </div>
              <div className="text-sm text-slate-300 leading-relaxed space-y-2">
                <MathRenderer content={feedbackState.explanationHtml} />
              </div>
            </div>

            <button onClick={onNextQuestion} className="mq-btn-primary w-full py-3.5 text-sm">
              Continuer le combat →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
