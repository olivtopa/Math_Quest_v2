import React from 'react';
import { GameState, UserProfile } from '../types/mathquest';
import { AvatarCard } from './AvatarCard';
import { Lock, Sparkles, ChevronRight } from 'lucide-react';

interface AventureViewProps {
  gameState: GameState;
  userProfile: UserProfile;
  onStartDungeon: (realm: string, questIdx: number) => void;
  onOpenGrimoire: () => void;
}

export const AventureView: React.FC<AventureViewProps> = ({
  gameState,
  userProfile,
  onStartDungeon,
  onOpenGrimoire
}) => {
  const realms = [
    {
      id: 'Algèbre',
      title: 'Semaine 1 : Nombres & Algèbre',
      color: 'border-violet-500/40 text-violet-400',
      badgeColor: 'bg-violet-500',
      minLevel: 1,
      quests: [
        { icon: '🔑', title: 'Décomposition & Fractions', sub: 'Nombres premiers, simplifications et additions' },
        { icon: '💥', title: 'Puissances & Écritures Scientifiques', sub: 'Calculs de puissances de 10, ordres de grandeur' },
        { icon: '🌀', title: 'Calcul Littéral & Factorisation', sub: 'Double distributivité et facteurs communs' },
        { icon: '🔒', title: 'Équations & Inéquations', sub: 'Résolution d\'égalités et d\'inégalités du 1er degré' }
      ]
    },
    {
      id: 'Fonctions',
      title: 'Semaine 2 : Royaume des Fonctions',
      color: 'border-pink-500/40 text-pink-400',
      badgeColor: 'bg-pink-500',
      minLevel: 2,
      quests: [
        { icon: '📉', title: 'Notion de Fonction', sub: 'Calculs et lectures d\'images et antécédents' },
        { icon: '📈', title: 'Fonctions Linéaires & Affines', sub: 'Coefficient directeur, tracés et droites y = ax + b' }
      ]
    },
    {
      id: 'Géométrie',
      title: 'Semaine 3 : Arène de la Géométrie',
      color: 'border-emerald-500/40 text-emerald-400',
      badgeColor: 'bg-emerald-500',
      minLevel: 3,
      quests: [
        { icon: '📐', title: 'Théorème de Pythagore', sub: 'Hypoténuse, calcul de côté et réciproque' },
        { icon: '🗼', title: 'Théorème de Thalès', sub: 'Proportions, configuration papillon et réciproque' },
        { icon: '🔗', title: 'Trigonométrie active', sub: 'Cosinus, Sinus, Tangente (angles et côtés)' },
        { icon: '🧊', title: 'Transformations & Espace', sub: 'Homothéties, rotations, sections 3D et volumes' }
      ]
    },
    {
      id: 'ProbasStatsAlgo',
      title: 'Semaine 4 : Stats, Probas & Algorithmes',
      color: 'border-amber-500/40 text-amber-400',
      badgeColor: 'bg-amber-500',
      minLevel: 4,
      quests: [
        { icon: '📊', title: 'Statistiques Descriptives', sub: 'Moyenne pondérée, étendue et médiane' },
        { icon: '🎲', title: 'Probabilités à 2 Épreuves', sub: 'Tirages successifs et arbres de probabilité' },
        { icon: '💻', title: 'Algorithmique & Scratch', sub: 'Variables, boucles et conditions (Si... Alors... Sinon)' }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 sm:space-y-8 overflow-hidden">
      {/* Avatar Card Header */}
      <AvatarCard userProfile={userProfile} onOpenGrimoire={onOpenGrimoire} />

      {/* Hero Banner */}
      <div className="mq-glass p-5 sm:p-8 relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-700/60 max-w-full">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-bold leading-tight">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Royaumes du Savoir — Préparation Brevet & Lycée</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Conquiers les 4 Piliers indispensables !
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Progresse étape par étape à travers les donjons socratiques pour forger tes réflexes et briller en Seconde et au Bac.
          </p>
        </div>
      </div>

      {/* Realms Grid */}
      <div className="space-y-6 sm:space-y-8">
        {realms.map((realm) => {
          const isUnlocked = gameState.level >= realm.minLevel;
          return (
            <div key={realm.id} className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${realm.badgeColor}`} />
                <h3 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${realm.color}`}>
                  {realm.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isUnlocked ? (
                  realm.quests.map((quest, qIdx) => (
                    <button
                      key={qIdx}
                      onClick={() => onStartDungeon(realm.id, qIdx)}
                      className="mq-glass mq-glass-interactive p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-between items-center text-left group gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-3xl sm:text-4xl shrink-0">{quest.icon}</span>
                        <div>
                          <h4 className="font-extrabold text-base sm:text-lg text-white group-hover:text-amber-400 transition-colors leading-tight">
                            {quest.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-snug">{quest.sub}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-amber-400 shrink-0">
                        <span>Combattre</span>
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="col-span-full mq-glass p-5 sm:p-6 rounded-2xl border border-dashed border-slate-800/80 flex items-center justify-between text-slate-500 opacity-60 gap-4">
                    <div className="flex items-center gap-4">
                      <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-slate-600 shrink-0" />
                      <div>
                        <h4 className="font-bold text-base sm:text-lg text-slate-400">{realm.title} (Verrouillé)</h4>
                        <p className="text-xs sm:text-sm text-slate-500">Requis : Niveau {realm.minLevel} (Terminer le royaume précédent)</p>
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-bold px-3 py-1 bg-slate-900 rounded-lg border border-slate-800 shrink-0">Verrouillé</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
