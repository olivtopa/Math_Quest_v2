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
    <div className="mq-glass mq-glass-interactive p-6 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-l-amber-500">
      {/* Background ambient radial */}
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Left Avatar Identity */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${avatar.color} p-1 shadow-xl animate-float`}>
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-4xl shadow-inner">
              {avatar.icon}
            </div>
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-950"></span>
          </span>
        </div>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Posture Socratique Active</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">{avatar.name}</h3>
          <p className="text-xs text-slate-400 font-medium">{avatar.title}</p>
        </div>
      </div>

      {/* Center Dynamic Speech Bubble */}
      <div className="flex-1 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-300 space-y-1 relative">
        <div className="font-bold text-amber-400 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5" /> Message du Tuteur :
        </div>
        <p className="leading-relaxed">
          « Mon rôle n'est pas de te donner les réponses, mais de développer ton intuition mathématique pas à pas. Prêt pour la prochaine quête ? »
        </p>
      </div>

      {/* Right Quick Stats & Actions */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="text-center px-4 py-2 bg-slate-900/80 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400 font-medium flex items-center justify-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-500" /> Série
          </div>
          <div className="text-lg font-black text-amber-400">3 Jours</div>
        </div>

        <button
          onClick={onOpenGrimoire}
          className="mq-btn-secondary text-xs bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20"
        >
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>Grimoire ({userProfile.grimoireCount})</span>
        </button>
      </div>
    </div>
  );
};
