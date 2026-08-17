import React from 'react';
import { Chapter, Exercise } from '../types/mathquest';
import { MathRenderer } from './MathRenderer';
import { Sparkles, Trophy, CheckCircle2, ChevronRight, Calculator, Triangle, TrendingUp, Activity } from 'lucide-react';

interface QuestBoardProps {
  chapters: Chapter[];
  onSelectExercise: (chapter: Chapter, exercise: Exercise) => void;
  completedExerciseIds: string[];
}

export const QuestBoard: React.FC<QuestBoardProps> = ({
  chapters,
  onSelectExercise,
  completedExerciseIds
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator': return <Calculator className="w-6 h-6 text-amber-400" />;
      case 'Triangle': return <Triangle className="w-6 h-6 text-emerald-400" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-purple-400" />;
      case 'Activity': return <Activity className="w-6 h-6 text-blue-400" />;
      default: return <Sparkles className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Banner */}
      <div className="glass-panel p-8 relative overflow-hidden bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-slate-700/50">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Monde d'Exploration Mathématique</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Choisis ta quête et développe ton raisonnement !
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Chaque quête est découpée en étapes socratiques guidées. Débloque les chapitres, accumule de l'XP et perfectionne ton intuition mathématique.
          </p>
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="space-y-6">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                {getIcon(chapter.icon)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">{chapter.title}</h3>
                <p className="text-xs text-slate-400">{chapter.subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chapter.quests.flatMap(quest => quest.exercises).map((exercise) => {
                const isCompleted = completedExerciseIds.includes(exercise.id);
                return (
                  <div
                    key={exercise.id}
                    onClick={() => onSelectExercise(chapter, exercise)}
                    className="glass-panel glass-panel-hover p-6 cursor-pointer flex flex-col justify-between space-y-4 border-l-4 border-l-amber-500"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                          exercise.difficulty === 'Facile' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          exercise.difficulty === 'Moyen' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}>
                          {exercise.difficulty}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                          <Trophy className="w-3.5 h-3.5" />
                          <span>+{exercise.rewardXP} XP</span>
                        </div>
                      </div>

                      <h4 className="text-lg font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                        {exercise.title}
                      </h4>

                      <div className="text-sm text-slate-300 line-clamp-2">
                        <MathRenderer content={exercise.description} />
                      </div>
                    </div>

                    {/* Competencies Badges */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {exercise.competencies.map((comp) => (
                          <span key={comp} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                            {comp}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1 text-xs font-semibold text-amber-400">
                        {isCompleted ? (
                          <span className="flex items-center gap-1 text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" /> Complété
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 hover:translate-x-1 transition-transform">
                            Lancer <ChevronRight className="w-4 h-4" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
