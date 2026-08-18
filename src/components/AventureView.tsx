import React from 'react';
import { GameState, UserProfile } from '../types/mathquest';
import { AvatarCard } from './AvatarCard';
import { Lock, ChevronRight, CheckCircle2 } from 'lucide-react';

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

  // Calcul du nombre de royaumes terminés
  const completedCount = realms.filter((realm) => {
    return realm.quests.every((_, qIdx) => gameState.completedQuests?.includes(`${realm.id}_${qIdx}`));
  }).length;

  // Lancer la première quête non terminée
  const handleContinueNextQuest = () => {
    for (const realm of realms) {
      if (gameState.level >= realm.minLevel) {
        for (let qIdx = 0; qIdx < realm.quests.length; qIdx++) {
          if (!gameState.completedQuests?.includes(`${realm.id}_${qIdx}`)) {
            onStartDungeon(realm.id, qIdx);
            return;
          }
        }
      }
    }
    // Si tout est terminé, lancer la première quête
    onStartDungeon(realms[0].id, 0);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-5 space-y-6 sm:space-y-8 overflow-hidden pb-24">
      {/* 2. Avatar Card Header & Chat CTA */}
      <AvatarCard
        userProfile={userProfile}
        onOpenGrimoire={onOpenGrimoire}
        onContinueQuest={handleContinueNextQuest}
      />

      {/* 3. Le bloc d'apprentissage : En-tête de section & Jauge Globale */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Royaumes du Savoir</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Parcours Brevet
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">Progresse pilier par pilier pour forger tes réflexes d'examen.</p>
        </div>

        {/* Jauge globale compacte */}
        <div className="flex items-center gap-3 bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-800 self-start sm:self-auto">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block font-semibold">Progression Piliers</span>
            <span className="text-sm font-black text-emerald-400 font-mono">{completedCount} / {realms.length} Terminés</span>
          </div>
          <div className="w-16 h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
              style={{ width: `${(completedCount / realms.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Affichage structuré des 4 Piliers */}
      <div className="space-y-6">
        {realms.map((realm) => {
          const isUnlocked = gameState.level >= realm.minLevel;
          const realmCompletedQuests = realm.quests.filter((_, qIdx) =>
            gameState.completedQuests?.includes(`${realm.id}_${qIdx}`)
          ).length;

          return (
            <div key={realm.id} className="space-y-3">
              {/* Titre du Pilier avec statut compact */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${realm.badgeColor}`} />
                  <h3 className={`text-base sm:text-lg font-extrabold tracking-tight ${realm.color}`}>
                    {realm.title}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">
                  {realmCompletedQuests}/{realm.quests.length} Quêtes
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {isUnlocked ? (
                  realm.quests.map((quest, qIdx) => {
                    const questKey = `${realm.id}_${qIdx}`;
                    const isCompleted = gameState.completedQuests?.includes(questKey);

                    return (
                      <button
                        key={qIdx}
                        onClick={() => onStartDungeon(realm.id, qIdx)}
                        className={`mq-glass mq-glass-interactive p-4 rounded-xl flex flex-col justify-between text-left group gap-3 transition-all ${
                          isCompleted
                            ? 'border border-emerald-500/40 bg-emerald-950/20 shadow-md shadow-emerald-500/5'
                            : 'border border-slate-800'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-2xl sm:text-3xl p-1.5 bg-slate-900 rounded-lg border border-slate-800">{quest.icon}</span>
                          {isCompleted ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Réussi
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 shrink-0">
                              En cours
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className="font-extrabold text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors leading-snug">
                            {quest.title}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{quest.sub}</p>
                        </div>

                        <div className="pt-2 border-t border-slate-900/80 flex items-center justify-between text-xs font-bold">
                          <span className={isCompleted ? 'text-emerald-400' : 'text-amber-400'}>
                            {isCompleted ? 'Rejouer' : 'Combattre'}
                          </span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="col-span-full mq-glass p-4 rounded-xl border border-dashed border-slate-800/80 flex items-center justify-between text-slate-500 opacity-60 gap-4">
                    <div className="flex items-center gap-3">
                      <Lock className="w-6 h-6 text-slate-600 shrink-0" />
                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-slate-400">{realm.title} (Verrouillé)</h4>
                        <p className="text-xs text-slate-500">Niveau {realm.minLevel} requis</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800 shrink-0">Verrouillé</span>
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
