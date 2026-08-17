import React, { useState } from 'react';
import { Exercise, ExerciseStep, SocraticHint } from '../types/mathquest';
import { MathRenderer } from './MathRenderer';
import { evaluateStepAnswer } from '../engine/evaluator';
import { CheckCircle2, AlertCircle, ArrowLeft, Send, Sparkles, Lightbulb, Award } from 'lucide-react';

interface ExerciseRunnerProps {
  exercise: Exercise;
  onBack: () => void;
  onComplete: (rewardXP: number) => void;
}

export const ExerciseRunner: React.FC<ExerciseRunnerProps> = ({
  exercise,
  onBack,
  onComplete
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [activeHintLevel, setActiveHintLevel] = useState<number>(0);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeMathTab, setActiveMathTab] = useState<'basic' | 'algebra' | 'advanced'>('basic');

  const currentStep: ExerciseStep = exercise.steps[currentStepIndex];

  const handleMathKeyboardInsert = (symbol: string) => {
    setUserAnswer(prev => prev + symbol);
  };

  const handleNextHint = () => {
    if (activeHintLevel < currentStep.hints.length) {
      setActiveHintLevel(prev => prev + 1);
    }
  };

  const handleSubmitAnswer = (answerToSubmit?: string) => {
    const finalAnswer = answerToSubmit !== undefined ? answerToSubmit : userAnswer;
    if (!finalAnswer.trim()) return;

    const evalResult = evaluateStepAnswer(currentStep, finalAnswer);

    if (evalResult.isCorrect) {
      setFeedbackMessage({
        type: 'success',
        text: 'Bravo ! Ta démarche est exacte. Poursuivons le raisonnement !'
      });

      setTimeout(() => {
        setFeedbackMessage(null);
        setUserAnswer('');
        setActiveHintLevel(0);

        if (currentStepIndex + 1 < exercise.steps.length) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          setIsCompleted(true);
          onComplete(exercise.rewardXP);
        }
      }, 1400);
    } else {
      const errorMsg = evalResult.matchedFeedback || 'Regarde bien ton calcul ou l\'utilisation des signes. Souhaites-tu un indice socratique ?';
      setFeedbackMessage({
        type: 'error',
        text: errorMsg
      });
    }
  };

  const mathKeys = {
    basic: ['x', 'x^2', '+', '-', '\\times', '\\div', '(', ')'],
    algebra: ['\\frac{a}{b}', '\\sqrt{x}', 'x^3', '=', '<', '>', '\\le', '\\ge'],
    advanced: ['\\pi', '\\Delta', '\\theta', '\\infty', 'e^x', '\\ln(x)', '\\int', '\\sum']
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="mq-btn-secondary text-xs">
          <ArrowLeft className="w-4 h-4" /> Retour aux quêtes
        </button>

        {/* Step Progress Dots */}
        <div className="flex items-center gap-2">
          {exercise.steps.map((step, idx) => (
            <div
              key={step.id}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                idx === currentStepIndex
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 scale-105'
                  : idx < currentStepIndex
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-900 text-slate-500 border border-slate-800'
              }`}
            >
              <span>Étape {idx + 1}</span>
              {idx < currentStepIndex && <CheckCircle2 className="w-3.5 h-3.5" />}
            </div>
          ))}
        </div>
      </div>

      {/* Main Exercise View (Split Layout) */}
      {!isCompleted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Problem Description & Socratic Tutor Avatar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="mq-glass p-6 space-y-4 border-l-4 border-l-amber-500">
              <div className="flex items-center justify-between">
                <span className={`text-xs px-3 py-0.5 rounded-full font-bold ${
                  exercise.difficulty === 'Facile' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                  exercise.difficulty === 'Moyen' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  {exercise.difficulty}
                </span>
                <span className="text-xs font-bold text-amber-400">+{exercise.rewardXP} XP</span>
              </div>

              <h2 className="text-2xl font-extrabold text-white">{exercise.title}</h2>
              <div className="text-slate-300 text-sm leading-relaxed">
                <MathRenderer content={exercise.description} />
              </div>
            </div>

            {/* Socratic Avatar Companion Speech Box */}
            <div className="mq-glass p-6 space-y-4 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-amber-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-purple-600 p-0.5 shadow-lg animate-float">
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-2xl">
                      🧙‍♂️
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Tuteur Socratique</h4>
                    <p className="text-xs text-amber-400 font-medium">Accompagnement Maïeutique</p>
                  </div>
                </div>

                {activeHintLevel < currentStep.hints.length && (
                  <button
                    onClick={handleNextHint}
                    className="mq-btn-secondary text-xs px-3 py-1.5 text-amber-300 border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20"
                  >
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span>Indice ({activeHintLevel + 1}/{currentStep.hints.length})</span>
                  </button>
                )}
              </div>

              {/* Unlocked Socratic Hints */}
              {activeHintLevel > 0 ? (
                <div className="space-y-3 pt-2">
                  {currentStep.hints.slice(0, activeHintLevel).map((hint: SocraticHint, idx: number) => (
                    <div key={idx} className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs space-y-1">
                      <span className="font-bold text-amber-400 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> Indice Niv. {hint.level} — {hint.title} :
                      </span>
                      <p className="text-slate-200 leading-relaxed"><MathRenderer content={hint.content} /></p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 leading-relaxed italic">
                  « Prends le temps d'observer le problème. Si tu bloques, clique sur 'Indice' pour débloquer des pistes guidées sans spoiler ! »
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Resolution Canvas & Keyboard */}
          <div className="lg:col-span-7 space-y-6">
            <div className="mq-glass p-8 space-y-6">
              <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Sparkles className="w-4 h-4" />
                  <span>{currentStep.title}</span>
                </div>
                <div className="text-base text-white font-medium leading-relaxed">
                  <MathRenderer content={currentStep.instruction} />
                </div>
              </div>

              {/* Response Section */}
              {currentStep.expectedType === 'qcm' ? (
                <div className="grid grid-cols-1 gap-3">
                  {currentStep.qcmChoices?.map((choice, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setUserAnswer(choice);
                        handleSubmitAnswer(choice);
                      }}
                      className={`p-4 rounded-xl text-left border transition-all text-slate-100 font-medium flex items-center justify-between ${
                        userAnswer === choice
                          ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-lg shadow-amber-500/20'
                          : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-base"><MathRenderer content={choice} /></span>
                      <span className="text-xs px-3 py-1 rounded-lg bg-slate-800 text-slate-400 font-bold border border-slate-700">Option {idx + 1}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="mq-input-group">
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                      placeholder="Saisis ta réponse mathématique..."
                      className="bg-slate-950 border border-slate-700 rounded-xl px-5 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-base shadow-inner"
                    />
                    <button onClick={() => handleSubmitAnswer()} className="mq-btn-primary">
                      <Send className="w-4 h-4" /> Valider
                    </button>
                  </div>

                  {/* Tabbed Virtual Math Keypad */}
                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-bold text-slate-400">Clavier Mathématique :</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setActiveMathTab('basic')}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                            activeMathTab === 'basic' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          De base
                        </button>
                        <button
                          onClick={() => setActiveMathTab('algebra')}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                            activeMathTab === 'algebra' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          Algèbre
                        </button>
                        <button
                          onClick={() => setActiveMathTab('advanced')}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                            activeMathTab === 'advanced' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          Avancé
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {mathKeys[activeMathTab].map((sym) => (
                        <button
                          key={sym}
                          onClick={() => handleMathKeyboardInsert(sym)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs text-amber-300 font-mono border border-slate-800 hover:border-amber-500/40 transition-all shadow-sm"
                        >
                          {sym}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Feedback Banner */}
              {feedbackMessage && (
                <div className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                  feedbackMessage.type === 'success'
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-lg shadow-emerald-500/10'
                    : 'bg-rose-500/15 border-rose-500/40 text-rose-300 shadow-lg shadow-rose-500/10'
                }`}>
                  {feedbackMessage.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="text-sm font-medium leading-relaxed">
                    <MathRenderer content={feedbackMessage.text} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Victory Screen */
        <div className="mq-glass p-12 text-center space-y-6 max-w-2xl mx-auto border-emerald-500/40 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <div className="inline-flex p-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-xl shadow-emerald-500/20 animate-bounce">
            <Award className="w-16 h-16" />
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-extrabold text-white">Quête accomplit avec succès !</h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              Tu as franchi toutes les étapes socratiques avec succès et accumulé <span className="text-amber-400 font-bold">+{exercise.rewardXP} XP</span> !
            </p>
          </div>
          <button onClick={onBack} className="mq-btn-primary text-base px-8 py-3.5">
            Continuer l'Aventure
          </button>
        </div>
      )}
    </div>
  );
};
