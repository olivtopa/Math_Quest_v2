import React, { useState } from 'react';
import { Wrench, TrendingUp, Triangle, Cpu } from 'lucide-react';

export const WidgetsView: React.FC = () => {
  const [activeWidget, setActiveWidget] = useState<string | null>(null);

  // Widget 1: Linear function slider state (y = ax + b)
  const [sliderA, setSliderA] = useState<number>(2);
  const [sliderB, setSliderB] = useState<number>(1);

  // Widget 2: Trigonometry slider state (angle)
  const [trigoAngle, setTrigoAngle] = useState<number>(30);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Banner */}
      <div className="mq-glass p-8 relative overflow-hidden bg-gradient-to-r from-teal-950/60 via-slate-900 to-slate-950 border border-teal-500/30">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold">
            <Wrench className="w-4 h-4 text-teal-400" />
            <span>Laboratoire d'Expérimentation visuelle</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Widgets & Manipulations Interactives
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Manipule en temps réel les concepts mathématiques pour forger des représentations mentales indestructibles.
          </p>
        </div>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Widget 1 */}
        <div className="mq-glass mq-glass-interactive p-6 space-y-4 border-slate-800 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="p-3 bg-teal-500/15 text-teal-400 rounded-xl w-fit border border-teal-500/30">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Labo des Fonctions ($y = ax + b$)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Glisse des curseurs pour observer en temps réel la droite se déplacer et varier la pente.</p>
          </div>
          <button onClick={() => setActiveWidget('functions')} className="mq-btn-secondary text-xs w-full text-teal-300 border-teal-500/30 bg-teal-500/10">
            Ouvrir le Labo →
          </button>
        </div>

        {/* Widget 2 */}
        <div className="mq-glass mq-glass-interactive p-6 space-y-4 border-slate-800 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="p-3 bg-emerald-500/15 text-emerald-400 rounded-xl w-fit border border-emerald-500/30">
              <Triangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Trigonométrie Active</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Modifie un angle et observe l'évolution en direct des rapports $\\cos, \\sin, \\tan$.</p>
          </div>
          <button onClick={() => setActiveWidget('trigonometry')} className="mq-btn-secondary text-xs w-full text-emerald-300 border-emerald-500/30 bg-emerald-500/10">
            Ouvrir le Labo →
          </button>
        </div>

        {/* Widget 3 */}
        <div className="mq-glass mq-glass-interactive p-6 space-y-4 border-slate-800 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="p-3 bg-purple-500/15 text-purple-400 rounded-xl w-fit border border-purple-500/30">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Labo Scratch & Algo</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Simule des blocs d'instructions Scratch et visualise le comportement d'un lutin.</p>
          </div>
          <button onClick={() => setActiveWidget('scratch')} className="mq-btn-secondary text-xs w-full text-purple-300 border-purple-500/30 bg-purple-500/10">
            Ouvrir le Labo →
          </button>
        </div>
      </div>

      {/* Interactive Modal Workspace */}
      {activeWidget && (
        <div className="fixed inset-0 bg-slate-950/95 z-50 flex items-center justify-center p-4">
          <div className="mq-glass p-8 max-w-2xl w-full space-y-6 relative border-teal-500/40">
            <button onClick={() => setActiveWidget(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold text-sm">
              ✕ Fermer
            </button>

            {activeWidget === 'functions' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Labo des Fonctions : $y = {sliderA}x {sliderB >= 0 ? '+ ' + sliderB : '- ' + Math.abs(sliderB)}$</h3>
                
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div>
                    <label className="text-xs text-slate-300 flex justify-between">
                      <span>Coefficient directeur (a) = {sliderA}</span>
                    </label>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      value={sliderA}
                      onChange={(e) => setSliderA(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 flex justify-between">
                      <span>Ordonnée à l'origine (b) = {sliderB}</span>
                    </label>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      value={sliderB}
                      onChange={(e) => setSliderB(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                </div>

                {/* SVG Live Line Plotting */}
                <div className="w-full h-56 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center p-4">
                  <svg className="w-full h-full" viewBox="0 0 300 200">
                    <line x1="0" y1="100" x2="300" y2="100" stroke="#334155" strokeWidth="2" />
                    <line x1="150" y1="0" x2="150" y2="200" stroke="#334155" strokeWidth="2" />
                    <line
                      x1={0}
                      y1={100 - (sliderA * (-5) + sliderB) * 15}
                      x2={300}
                      y2={100 - (sliderA * 5 + sliderB) * 15}
                      stroke="#f59e0b"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
              </div>
            )}

            {activeWidget === 'trigonometry' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Inspecteur Trigonométrique (Angle = {trigoAngle}°)</h3>
                <input
                  type="range"
                  min="10"
                  max="80"
                  value={trigoAngle}
                  onChange={(e) => setTrigoAngle(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block">$\sin({trigoAngle}^\circ)$</span>
                    <span className="text-amber-400 font-bold text-base">{Math.sin((trigoAngle * Math.PI) / 180).toFixed(3)}</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block">$\cos({trigoAngle}^\circ)$</span>
                    <span className="text-emerald-400 font-bold text-base">{Math.cos((trigoAngle * Math.PI) / 180).toFixed(3)}</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block">$\tan({trigoAngle}^\circ)$</span>
                    <span className="text-purple-400 font-bold text-base">{Math.tan((trigoAngle * Math.PI) / 180).toFixed(3)}</span>
                  </div>
                </div>
              </div>
            )}

            {activeWidget === 'scratch' && (
              <div className="space-y-4 text-center">
                <h3 className="text-xl font-bold text-white">Labo Scratch Express</h3>
                <p className="text-xs text-slate-300">Assemble des instructions conditionnelles et regarde le lutin avancer.</p>
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs font-mono">
                  si X &gt; 10 alors Mettre Score à 100 sinon Mettre Score à 30
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
