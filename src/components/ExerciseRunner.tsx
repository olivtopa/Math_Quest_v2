import React, { useState } from 'react';
import { Exercise, ExerciseStep, SocraticHint } from '../types/mathquest';
import { MathRenderer } from './MathRenderer';
import { evaluateStepAnswer } from '../engine/evaluator';
import { CheckCircle2, AlertCircle, ArrowLeft, Send, Sparkles, Lightbulb } from 'lucide-react';

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
      }, 1500);
    } else {
      const errorMsg = evalResult.matchedFeedback || 'Regarde bien ton calcul ou l\'utilisation des signes. Souhaites-tu un indice socratique ?';
      setFeedbackMessage({
        type: 'error',
        text: errorMsg
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="btn-secondary text-xs">
          <ArrowLeft className="w-4 h-4" /> Retour aux quêtes
        </button>
        <div className="text-xs font-semibold text-slate-400">
          Étape {currentStepIndex + 1} sur {exercise.steps.length}
        </div>
      </div>

      {/* Main Exercise Card */}
      <div className="glass-panel p-8 space-y-6">
        <div className="space-y-2 border-b border-slate-800 pb-4">
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
            {exercise.difficulty} • +{exercise.rewardXP} XP
          </span>
          <h2 className="text-2xl font-bold text-slate-100">{exercise.title}</h2>
          <div className="text-slate-300 text-sm">
            <MathRenderer content={exercise.description} />
          </div>
        </div>

        {/* Current Step Section */}
        {!isCompleted ? (
          <div className="space-y-6">
            <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> {currentStep.title}
              </h3>
              <div className="text-slate-200 font-medium">
                <MathRenderer content={currentStep.instruction} />
              </div>
            </div>

            {/* Answer Input Section */}
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
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                        : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <span><MathRenderer content={choice} /></span>
                    <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-400 font-semibold">Option {idx + 1}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="input-submit-group">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                    placeholder="Saisis ta réponse mathématique..."
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 text-base"
                  />
                  <button onClick={() => handleSubmitAnswer()} className="btn-primary">
                    <Send className="w-4 h-4" /> Valider
                  </button>
                </div>

                {/* Virtual Math Toolbar */}
                <div className="flex items-center gap-2 flex-wrap pt-2">
                  <span className="text-xs font-semibold text-slate-400">Clavier Math :</span>
                  {['x', 'x^2', '+', '-', '\\times', '\\frac{a}{b}', '\\sqrt{x}'].map((sym) => (
                    <button
                      key={sym}
                      onClick={() => handleMathKeyboardInsert(sym)}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs text-amber-300 font-mono border border-slate-700 transition-colors"
                    >
                      {sym}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback Banner */}
            {feedbackMessage && (
              <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                feedbackMessage.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}>
                {feedbackMessage.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="text-sm font-medium">
                  <MathRenderer content={feedbackMessage.text} />
                </div>
              </div>
            )}

            {/* Socratic Avatar Hints Section */}
            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-purple-600 p-0.5">
                    <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-amber-400 text-lg font-bold">
                      🧙‍♂️
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">Tuteur Socratique</h4>
                    <p className="text-xs text-slate-400">Accompagnement Maïeutique (Zéro Spoil)</p>
                  </div>
                </div>

                {activeHintLevel < currentStep.hints.length && (
                  <button
                    onClick={handleNextHint}
                    className="btn-secondary text-xs px-3 py-1.5 text-amber-300 border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                    <span>Demander un indice ({activeHintLevel + 1}/{currentStep.hints.length})</span>
                  </button>
                )}
              </div>

              {/* Display Unlocked Hints */}
              {activeHintLevel > 0 && (
                <div className="space-y-3 pt-2">
                  {currentStep.hints.slice(0, activeHintLevel).map((hint: SocraticHint, idx: number) => (
                    <div key={idx} className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs space-y-1">
                      <span className="font-bold text-amber-400">Indice Niv. {hint.level} — {hint.title} :</span>
                      <p className="text-slate-300"><MathRenderer content={hint.content} /></p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Exercise Victory Screen */
          <div className="text-center py-8 space-y-4">
            <div className="inline-flex p-4 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">Quête accomplie avec succès !</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Tu as complété toutes les étapes socratiques et accumulé <span className="text-amber-400 font-bold">+{exercise.rewardXP} XP</span> !
            </p>
            <button onClick={onBack} className="btn-primary">
              Continuer l'aventure
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
