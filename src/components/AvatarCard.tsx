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
      <div className="flex items-center gap-3.5 sm:gap-5">
        <div className="relative shrink-0">
          <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-tr ${avatar.color} p-1 shadow-xl animate-float`}>
            <div className="w-full h-full bg-slate-950 rounded-[10px] sm:rounded-[14px] flex items-center justify-center text-2xl sm:text-4xl shadow-inner">
              {avatar.icon}
            </div>
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-emerald-500 border-2 border-slate-950"></span>
          </span>
        </div>

        <div className="space-y-0.5 sm:space-y-1">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] sm:text-[11px] font-bold">
            <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
            <span>Posture Socratique Active</span>
          </div>
          <h3 className="text-base sm:text-xl font-extrabold text-white tracking-tight leading-tight">{avatar.name}</h3>
          <p className="text-[11px] sm:text-xs text-slate-400 font-medium">{avatar.title}</p>
        </div>
      </div>

      {/* Center Dynamic Speech Bubble */}
      <div className="flex-1 bg-slate-950/60 p-3.5 sm:p-4 rounded-xl border border-slate-800/80 text-[11px] sm:text-xs text-slate-300 space-y-1 relative max-w-full">
        <div className="font-bold text-amber-400 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 shrink-0" /> Message du Tuteur :
        </div>
        <p className="leading-relaxed">
          « Mon rôle n'est pas de te donner les réponses, mais de développer ton intuition mathématique pas à pas. Prêt pour la prochaine quête ? »
        </p>
      </div>

      {/* Right Quick Stats & Actions */}
      <div className="flex items-center justify-between sm:justify-start gap-2.5 shrink-0 w-full sm:w-auto">
        <div className="text-center px-3.5 py-1.5 sm:px-4 sm:py-2 bg-slate-900/80 rounded-xl border border-slate-800 flex-1 sm:flex-initial">
          <div className="text-[10px] sm:text-xs text-slate-400 font-medium flex items-center justify-center gap-1">
            <Flame className="w-3 h-3 text-amber-500 shrink-0" /> Série
          </div>
          <div className="text-base sm:text-lg font-black text-amber-400">3 Jours</div>
        </div>

        <button
          onClick={onOpenGrimoire}
          className="mq-btn-secondary text-[11px] sm:text-xs py-2 px-3 sm:px-4 bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20 flex-1 sm:flex-initial"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Grimoire ({userProfile.grimoireCount})</span>
        </button>
      </div>
    </div>
  );
};
