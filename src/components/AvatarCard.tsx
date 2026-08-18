import React from 'react';
import { UserProfile } from '../types/mathquest';
import { ShieldAlert, Play, ArrowRight } from 'lucide-react';

interface AvatarCardProps {
  userProfile: UserProfile;
  onOpenGrimoire: () => void;
  onContinueQuest?: () => void;
}

export const AvatarCard: React.FC<AvatarCardProps> = ({ userProfile, onOpenGrimoire, onContinueQuest }) => {
  const getAvatarTitle = () => {
    switch (userProfile.cycle) {
      case '3eme': return { name: 'Archimage', title: 'Guide IA Brevet & Collège', icon: '🧙‍♂️', color: 'from-amber-500 to-emerald-500' };
      case 'lycee': return { name: 'Mentor Cyber-Math', title: 'Guide IA Seconde & 1ère', icon: '🤖', color: 'from-purple-500 to-cyan-500' };
      case 'terminale': return { name: 'Directeur du Lab', title: 'Guide IA Spé & Bac', icon: '⚡', color: 'from-blue-500 to-pink-500' };
    }
  };

  const avatar = getAvatarTitle();

  return (
    <div className="mq-glass p-5 sm:p-6 relative overflow-hidden space-y-4 border-l-4 border-l-amber-500 rounded-2xl max-w-full shadow-xl">
      {/* Background ambient radial */}
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. En-tête de la carte : Avatar avec badge vert de présence en ligne */}
      <div className="flex items-center gap-3.5">
        <div className="relative shrink-0">
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr ${avatar.color} p-0.5 shadow-lg animate-float`}>
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-2xl sm:text-3xl shadow-inner">
              {avatar.icon}
            </div>
          </div>
          {/* Badge vert de présence en ligne */}
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950"></span>
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-black text-white leading-tight">{avatar.name}</h3>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> En ligne
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">{avatar.title}</p>
        </div>
      </div>

      {/* 2. Bulle de dialogue stylisée façon Chat */}
      <div className="relative bg-slate-950/80 p-3.5 sm:p-4 rounded-2xl rounded-tl-sm border border-slate-800 text-xs sm:text-sm text-slate-200 shadow-inner space-y-1">
        <p className="leading-relaxed font-medium">
          « Prêt pour ta quête du jour ? Pose-moi tes questions, je t'aide à trouver la méthode pas à pas ! »
        </p>
      </div>

      {/* 3. Zone d'action intégrée (CTA Principal + Renforcement secondaire) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
        <button
          onClick={onContinueQuest}
          className="mq-btn-primary flex-1 py-3 text-xs sm:text-sm font-extrabold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/15 flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>Continuer la quête</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenGrimoire}
          className="mq-btn-secondary py-3 px-5 text-xs sm:text-sm font-bold border-amber-500/40 text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 flex items-center justify-center gap-2"
        >
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Renforcement ({userProfile.grimoireCount})</span>
        </button>
      </div>
    </div>
  );
};
