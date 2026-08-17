import React from 'react';
import { Chapter, Exercise, UserProfile } from '../types/mathquest';
import { MathRenderer } from './MathRenderer';
import { AvatarCard } from './AvatarCard';
import { Sparkles, Trophy, CheckCircle2, ChevronRight, Calculator, Triangle, TrendingUp, Activity, Compass } from 'lucide-react';

interface QuestBoardProps {
  chapters: Chapter[];
  userProfile: UserProfile;
  onSelectExercise: (chapter: Chapter, exercise: Exercise) => void;
  onOpenGrimoire: () => void;
}

export const QuestBoard: React.FC<QuestBoardProps> = ({
  chapters,
  userProfile,
  onSelectExercise,
  onOpenGrimoire
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

  const totalExercises = chapters.flatMap(c => c.quests.flatMap(q => q.exercises)).length;
  const completedCount = chapters.flatMap(c => c.quests.flatMap(q => q.exercises))
    .filter(e => userProfile.completedExerciseIds.includes(e.id)).length;
  const progressPct = totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Embodied Avatar Companion Card */}
      <AvatarCard userProfile={userProfile} onOpenGrimoire={onOpenGrimoire} />

      {/* Hero Banner with World Map Ambient Light */}
      <div className="mq-glass p-8 relative overflow-hidden border border-slate-700/60 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Exploration des Royaumes du Savoir</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Choisis ta quête et développe ton raisonnement mathématique !
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Chaque quête est découpée en étapes socratiques guidées. Résous les étapes pas-à-pas, développe ton endurance intellectuelle et accumule de l'XP.
          </p>

          {/* Master Progress Bar */}
          <div className="pt-2 space-y-1.5 max-w-md">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-400">Progression du Cycle ({userProfile.cycle.toUpperCase()})</span>
              <span className="text-amber-400">{progressPct}% Complété</span>
            </div>
            <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 h-full transition-all duration-500 shadow-sm shadow-amber-500/50"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chapters & Quests Grid */}
      <div className="space-y-8">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
                {getIcon(chapter.icon)}
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">{chapter.title}</h3>
                <p className="text-xs text-slate-400 font-medium">{chapter.subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {chapter.quests.flatMap(quest => quest.exercises).map((exercise) => {
                const isCompleted = userProfile.completedExerciseIds.includes(exercise.id);
                return (
                  <div
                    key={exercise.id}
                    onClick={() => onSelectExercise(chapter, exercise)}
                    className="mq-glass mq-glass-interactive p-6 cursor-pointer flex flex-col justify-between space-y-5 border-l-4 border-l-amber-500 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                          exercise.difficulty === 'Facile' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                          exercise.difficulty === 'Moyen' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                          'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        }`}>
                          {exercise.difficulty}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                          <Trophy className="w-3.5 h-3.5" />
                          <span>+{exercise.rewardXP} XP</span>
                        </div>
                      </div>

                      <h4 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                        {exercise.title}
                      </h4>

                      <div className="text-sm text-slate-300 leading-relaxed">
                        <MathRenderer content={exercise.description} />
                      </div>
                    </div>

                    {/* Competencies Badges & Action */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {exercise.competencies.map((comp) => (
                          <span key={comp} className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800">
                            {comp}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-extrabold">
                        {isCompleted ? (
                          <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30">
                            <CheckCircle2 className="w-4 h-4" /> Complété
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-amber-400 group-hover:translate-x-1 transition-transform">
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
