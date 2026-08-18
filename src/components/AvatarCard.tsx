import React from 'react';
import { UserProfile } from '../types/mathquest';
import { Sparkles, Compass, Flame, ShieldAlert } from 'lucide-react';

interface AvatarCardProps {
  userProfile: UserProfile;
  onOpenGrimoire: () => void;
}

export const AvatarCard: React.FC<AvatarCardProps> = ({ userProfile, onOpenGrimoire }) => {
  const getAvatarTitle = () => {
    switch (userProfile.cycle) {
      case '3eme': return { name: 'Archimage Maïeutique', title: 'Guide du Brevet & Collège', icon: '🧙‍♂️', color: 'from-amber-500 to-emerald-500' };
      case 'lycee': return { name: 'Mentor Cyber-Math', title: 'Stratège Seconde & 1ère', icon: '🤖', color: 'from-purple-500 to-cyan-500' };
      case 'terminale': return { name: 'Directeur du Lab d\'Élite', title: 'Expert Spé & Bac', icon: '⚡', color: 'from-blue-500 to-pink-500' };
    }
  };

  const avatar = getAvatarTitle();

  return (
    <div className="mq-glass mq-glass-interactive p-4 sm:p-6 relative overflow-hidden flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6 border-l-4 border-l-amber-500 max-w-full">
      {/* Background ambient radial */}
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Left Avatar Identity */}
      <div className="flex items-center gap-4 sm:gap-5">
        <div className="relative shrink-0">
          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-tr ${avatar.color} p-1 shadow-xl animate-float`}>
            <div className="w-full h-full bg-slate-950 rounded-[10px] sm:rounded-[14px] flex items-center justify-center text-3xl sm:text-4xl shadow-inner">
              {avatar.icon}
            </div>
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-950"></span>
          </span>
        </div>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Posture Socratique Active</span>
          </div>
          <h3 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight leading-tight">{avatar.name}</h3>
          <p className="text-xs sm:text-sm text-slate-300 font-medium">{avatar.title}</p>
        </div>
      </div>

      {/* Center Dynamic Speech Bubble */}
      <div className="flex-1 bg-slate-950/70 p-4 sm:p-5 rounded-xl border border-slate-800/80 text-xs sm:text-sm text-slate-200 space-y-1.5 relative max-w-full">
        <div className="font-extrabold text-amber-400 flex items-center gap-2 text-xs sm:text-sm">
          <Compass className="w-4 h-4 shrink-0" /> Message du Tuteur :
        </div>
        <p className="leading-relaxed">
          « Mon rôle n'est pas de te donner les réponses, mais de développer ton intuition mathématique pas à pas. Prêt pour la prochaine quête ? »
        </p>
      </div>

      {/* Right Quick Stats & Actions */}
      <div className="flex items-center justify-between sm:justify-start gap-3 shrink-0 w-full sm:w-auto">
        <div className="text-center px-4 py-2 sm:px-5 sm:py-2.5 bg-slate-900/90 rounded-xl border border-slate-800 flex-1 sm:flex-initial">
          <div className="text-xs text-slate-300 font-semibold flex items-center justify-center gap-1">
            <Flame className="w-4 h-4 text-amber-500 shrink-0" /> Série
          </div>
          <div className="text-lg sm:text-xl font-black text-amber-400">3 Jours</div>
        </div>

        <button
          onClick={onOpenGrimoire}
          className="mq-btn-secondary text-xs sm:text-sm py-2.5 px-4 bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20 flex-1 sm:flex-initial"
        >
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Renforcement ({userProfile.grimoireCount})</span>
        </button>
      </div>
    </div>
  );
};
