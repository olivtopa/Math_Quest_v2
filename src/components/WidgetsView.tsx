import React, { useState } from 'react';
import { Wrench, TrendingUp, Triangle, Cpu, Sparkles, Play, Layers } from 'lucide-react';
import { MathRenderer } from './MathRenderer';

export const WidgetsView: React.FC = () => {
  const [activeWidget, setActiveWidget] = useState<'functions' | 'trigonometry' | 'scratch' | 'pythagore' | null>(null);

  // Widget 1: Fonctions Affines & Linéaires (y = ax + b)
  const [sliderA, setSliderA] = useState<number>(2);
  const [sliderB, setSliderB] = useState<number>(1);
  const [testPointX, setTestPointX] = useState<number>(3);

  // Widget 2: Trigonométrie Interactive (Triangle rectangle dynamique)
  const [trigoAngle, setTrigoAngle] = useState<number>(35);
  const [hypothenuseLength, setHypothenuseLength] = useState<number>(10);

  // Widget 3: Simulateur Scratch & Algorithmique (Variables, Boucles & Tests)
  const [scratchInitialX, setScratchInitialX] = useState<number>(5);
  const [scratchLoopCount, setScratchLoopCount] = useState<number>(3);
  const [scratchStepAdd, setScratchStepAdd] = useState<number>(4);
  const [scratchThreshold] = useState<number>(15);

  // Widget 4: Simulateur Visuel de Pythagore & Aires carrées
  const [pythSideA, setPythSideA] = useState<number>(3);
  const [pythSideB, setPythSideB] = useState<number>(4);

  // Calculs dynamiques
  const computedY = sliderA * testPointX + sliderB;
  const radAngle = (trigoAngle * Math.PI) / 180;
  const oppLength = hypothenuseLength * Math.sin(radAngle);
  const adjLength = hypothenuseLength * Math.cos(radAngle);

  // Simulation Scratch
  const runScratchSimulation = () => {
    let x = scratchInitialX;
    const history: string[] = [`Initialisation : x = ${x}`];
    for (let i = 1; i <= scratchLoopCount; i++) {
      x += scratchStepAdd;
      history.push(`Tour ${i} : x = x + ${scratchStepAdd} ➔ x = ${x}`);
    }
    const isConditionTrue = x > scratchThreshold;
    const finalBonus = isConditionTrue ? 20 : 0;
    const finalX = isConditionTrue ? x + finalBonus : x;
    history.push(`Test si x (${x}) > ${scratchThreshold} ? ${isConditionTrue ? 'OUI (+20)' : 'NON (aucun bonus)'}`);
    history.push(`Résultat final : x = ${finalX}`);
    return { finalX, isConditionTrue, history };
  };

  const scratchResult = runScratchSimulation();
  const pythHyp = Math.sqrt(pythSideA * pythSideA + pythSideB * pythSideB);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Banner */}
      <div className="mq-glass p-6 sm:p-8 relative overflow-hidden bg-gradient-to-r from-teal-950/60 via-slate-900 to-slate-950 border border-teal-500/30">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs sm:text-sm font-bold">
            <Wrench className="w-4 h-4 text-teal-400" />
            <span>Laboratoire d'Expérimentation Visuelle & Dynamique</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Laboratoires Mathématiques Interactifs
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Manipule en temps réel les curseurs, observe la géométrie se déformer, exécute des algorithmes pas-à-pas et visualise les théorèmes clés du Brevet.
          </p>
        </div>
      </div>

      {/* 4 Rich Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Widget 1 : Fonctions */}
        <div className="mq-glass mq-glass-interactive p-6 space-y-5 border-slate-800 flex flex-col justify-between group hover:border-amber-500/40 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-amber-500/15 text-amber-400 rounded-xl w-fit border border-amber-500/30">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                Algèbre & Graphique
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
              Laboratoire des Droites & Fonctions Affines
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Fais varier la pente (coefficient a) et l'ordonnée à l'origine (b) pour observer en direct l'inclinaison et la translation de la droite.
            </p>
          </div>
          <button
            onClick={() => setActiveWidget('functions')}
            className="mq-btn-primary w-full py-3 text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold"
          >
            Expérimenter le Labo Fonctions →
          </button>
        </div>

        {/* Widget 2 : Trigonométrie */}
        <div className="mq-glass mq-glass-interactive p-6 space-y-5 border-slate-800 flex flex-col justify-between group hover:border-emerald-500/40 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-emerald-500/15 text-emerald-400 rounded-xl w-fit border border-emerald-500/30">
                <Triangle className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Trigonométrie Active
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
              Triangle Rectangle & Rapports SOH CAH TOA
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Modifie l'angle aigu et la longueur de l'hypoténuse. Observe en direct les côtés opposé et adjacent s'adapter avec le calcul du sinus, cosinus et tangente.
            </p>
          </div>
          <button
            onClick={() => setActiveWidget('trigonometry')}
            className="mq-btn-primary w-full py-3 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold"
          >
            Expérimenter la Trigonométrie →
          </button>
        </div>

        {/* Widget 3 : Scratch & Algorithmique */}
        <div className="mq-glass mq-glass-interactive p-6 space-y-5 border-slate-800 flex flex-col justify-between group hover:border-purple-500/40 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-purple-500/15 text-purple-400 rounded-xl w-fit border border-purple-500/30">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                Scratch & Boucles
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
              Simulateur d'Algorithmes & Blocs Scratch
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Configure les variables, le nombre d'itérations de la boucle « Répéter » et les conditions « Si / Alors ». Suis l'exécution pas-à-pas comme au Brevet.
            </p>
          </div>
          <button
            onClick={() => setActiveWidget('scratch')}
            className="mq-btn-primary w-full py-3 text-sm bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold"
          >
            Lancer le Simulateur Scratch →
          </button>
        </div>

        {/* Widget 4 : Pythagore Visuel */}
        <div className="mq-glass mq-glass-interactive p-6 space-y-5 border-slate-800 flex flex-col justify-between group hover:border-cyan-500/40 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-cyan-500/15 text-cyan-400 rounded-xl w-fit border border-cyan-500/30">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                Preuve Géométrique
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
              Puzzle Visuel de Pythagore (a² + b² = c²)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Comprends la preuve géométrique : la somme des aires des deux carrés construits sur les côtés de l'angle droit remplit exactement l'aire du carré de l'hypoténuse.
            </p>
          </div>
          <button
            onClick={() => setActiveWidget('pythagore')}
            className="mq-btn-primary w-full py-3 text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold"
          >
            Expérimenter le Puzzle d'Aire →
          </button>
        </div>
      </div>

      {/* Interactive Modal Workspace (Au-dessus du footer, scrollable et centré) */}
      {activeWidget && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="mq-glass p-6 sm:p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto space-y-6 relative border-teal-500/40 shadow-2xl rounded-2xl scrollbar-thin">
            <button
              onClick={() => setActiveWidget(null)}
              className="sticky top-0 float-right z-10 text-slate-400 hover:text-white px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 font-bold text-xs sm:text-sm backdrop-blur transition-colors"
            >
              ✕ Fermer
            </button>

            {/* 1. Modal Labo des Fonctions */}
            {activeWidget === 'functions' && (
              <div className="space-y-6">
                <div className="text-center space-y-1">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Laboratoire Interactif</span>
                  <h3 className="text-2xl font-black text-white">
                    Équation de droite : <span className="text-amber-400 font-mono">y = {sliderA}x {sliderB >= 0 ? '+ ' + sliderB : '- ' + Math.abs(sliderB)}</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-200">
                      <span>Coefficient directeur (a) : Pente</span>
                      <span className="text-amber-400 font-mono text-sm font-bold">{sliderA}</span>
                    </div>
                    <input
                      type="range"
                      min="-4"
                      max="4"
                      step="0.5"
                      value={sliderA}
                      onChange={(e) => setSliderA(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <p className="text-xs text-slate-400">
                      {sliderA > 0 ? '↗ Fonction croissante (la droite monte)' : sliderA < 0 ? '↘ Fonction décroissante (la droite descend)' : '→ Fonction constante (droite horizontale)'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-200">
                      <span>Ordonnée à l'origine (b)</span>
                      <span className="text-emerald-400 font-mono text-sm font-bold">{sliderB}</span>
                    </div>
                    <input
                      type="range"
                      min="-4"
                      max="4"
                      step="1"
                      value={sliderB}
                      onChange={(e) => setSliderB(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                    <p className="text-xs text-slate-400">
                      Intersection de la droite avec l'axe vertical au point (0, {sliderB}).
                    </p>
                  </div>
                </div>

                {/* Plot SVG & Calcul d'image */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div className="md:col-span-2 h-64 bg-slate-950 rounded-2xl border border-slate-800 p-2 relative flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 300 240">
                      {/* Repère cartésien */}
                      <line x1="20" y1="120" x2="280" y2="120" stroke="#475569" strokeWidth="1.5" />
                      <line x1="150" y1="20" x2="150" y2="220" stroke="#475569" strokeWidth="1.5" />
                      <text x="275" y="112" fill="#94a3b8" fontSize="11" fontWeight="bold">x</text>
                      <text x="156" y="30" fill="#94a3b8" fontSize="11" fontWeight="bold">y</text>
                      <circle cx="150" cy="120" r="3" fill="#94a3b8" />
                      <text x="140" y="134" fill="#94a3b8" fontSize="10">O</text>

                      {/* Tracé de la droite */}
                      <line
                        x1={30}
                        y1={120 - (sliderA * (-4) + sliderB) * 20}
                        x2={270}
                        y2={120 - (sliderA * 4 + sliderB) * 20}
                        stroke="#f59e0b"
                        strokeWidth="3.5"
                      />

                      {/* Point d'ordonnée à l'origine (0, b) */}
                      <circle cx={150} cy={120 - sliderB * 20} r="5" fill="#10b981" />
                      <text x={160} y={120 - sliderB * 20 + 4} fill="#10b981" fontSize="12" fontWeight="bold">
                        (0, {sliderB})
                      </text>
                    </svg>
                  </div>

                  <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3 text-left">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                      <Sparkles className="w-4 h-4" /> Calculateur d'Image
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300">Antécédent x :</label>
                      <input
                        type="number"
                        value={testPointX}
                        onChange={(e) => setTestPointX(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white font-mono text-sm"
                      />
                    </div>
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed font-mono">
                      f({testPointX}) = {sliderA} × {testPointX} {sliderB >= 0 ? '+ ' + sliderB : '- ' + Math.abs(sliderB)} = <strong>{computedY}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Modal Trigonométrie */}
            {activeWidget === 'trigonometry' && (
              <div className="space-y-6">
                <div className="text-center space-y-1">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Laboratoire Interactif</span>
                  <h3 className="text-2xl font-black text-white">
                    Trigonométrie dans le Triangle Rectangle
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-200">
                      <span>Angle aigu (degrés)</span>
                      <span className="text-emerald-400 font-mono text-sm font-bold">{trigoAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="75"
                      value={trigoAngle}
                      onChange={(e) => setTrigoAngle(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-200">
                      <span>Longueur de l'Hypoténuse</span>
                      <span className="text-amber-400 font-mono text-sm font-bold">{hypothenuseLength} cm</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="20"
                      value={hypothenuseLength}
                      onChange={(e) => setHypothenuseLength(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* 3 Formules & Visualisation */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-xs block mb-1">Sinus (Opp / Hyp)</span>
                    <span className="text-amber-400 font-mono font-bold text-lg">{Math.sin(radAngle).toFixed(3)}</span>
                    <span className="text-slate-400 text-xs block mt-1">Côté Opp = {oppLength.toFixed(1)} cm</span>
                  </div>

                  <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-xs block mb-1">Cosinus (Adj / Hyp)</span>
                    <span className="text-emerald-400 font-mono font-bold text-lg">{Math.cos(radAngle).toFixed(3)}</span>
                    <span className="text-slate-400 text-xs block mt-1">Côté Adj = {adjLength.toFixed(1)} cm</span>
                  </div>

                  <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-xs block mb-1">Tangente (Opp / Adj)</span>
                    <span className="text-purple-400 font-mono font-bold text-lg">{Math.tan(radAngle).toFixed(3)}</span>
                    <span className="text-slate-400 text-xs block mt-1">Rapport Opp/Adj</span>
                  </div>
                </div>

                {/* Dynamic SVG Triangle */}
                <div className="w-full h-56 bg-slate-950 rounded-2xl border border-slate-800 p-3 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 320 200">
                    <polygon
                      points={`40,160 ${40 + adjLength * 12},160 40,${160 - oppLength * 12}`}
                      fill="rgba(16, 185, 129, 0.15)"
                      stroke="#10b981"
                      strokeWidth="2.5"
                    />
                    <rect x="40" y={160 - 15} width="15" height="15" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="25" y="168" fill="#fff" fontSize="12" fontWeight="bold">A</text>
                    <text x={40 + adjLength * 12 + 6} y="168" fill="#fff" fontSize="12" fontWeight="bold">B ({trigoAngle}°)</text>
                    <text x="25" y={160 - oppLength * 12} fill="#fff" fontSize="12" fontWeight="bold">C</text>
                    <text x={40 + (adjLength * 12) / 2} y="180" fill="#cbd5e1" fontSize="11" textAnchor="middle">
                      Adjacent = {adjLength.toFixed(1)} cm
                    </text>
                    <text x="20" y={160 - (oppLength * 12) / 2} fill="#cbd5e1" fontSize="11" textAnchor="middle" transform={`rotate(-90 20 ${160 - (oppLength * 12) / 2})`}>
                      Opposé = {oppLength.toFixed(1)} cm
                    </text>
                    <text x={40 + (adjLength * 12) / 2 + 10} y={160 - (oppLength * 12) / 2 - 10} fill="#f59e0b" fontSize="12" fontWeight="bold">
                      Hyp = {hypothenuseLength} cm
                    </text>
                  </svg>
                </div>
              </div>
            )}

            {/* 3. Modal Scratch & Algorithmique */}
            {activeWidget === 'scratch' && (
              <div className="space-y-6">
                <div className="text-center space-y-1">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Laboratoire Interactif</span>
                  <h3 className="text-2xl font-black text-white">
                    Simulateur de Script Scratch & Algorithmique
                  </h3>
                </div>

                {/* Configuration des blocs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Valeur initiale de x :</label>
                    <input
                      type="number"
                      value={scratchInitialX}
                      onChange={(e) => setScratchInitialX(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Répéter (tours) :</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={scratchLoopCount}
                      onChange={(e) => setScratchLoopCount(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Ajout par tour :</label>
                    <input
                      type="number"
                      value={scratchStepAdd}
                      onChange={(e) => setScratchStepAdd(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white font-mono text-sm"
                    />
                  </div>
                </div>

                {/* Représentation visuelle des Blocs Scratch */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Blocs Scratch Stylisés */}
                  <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs">
                    <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                      🚩 quand drapeau cliqué
                    </div>
                    <div className="p-2.5 rounded-lg bg-orange-600 text-white font-bold ml-2">
                      mettre [ x ] à {scratchInitialX}
                    </div>
                    <div className="p-3 rounded-lg bg-amber-600/90 text-white font-bold ml-2 space-y-2 border-l-4 border-amber-300">
                      <div>répéter {scratchLoopCount} fois</div>
                      <div className="p-2 bg-orange-600 text-white rounded ml-3">
                        ajouter à [ x ] la valeur {scratchStepAdd}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-600 text-white font-bold ml-2 space-y-2 border-l-4 border-blue-300">
                      <div>si &lt; ( x ) &gt; {scratchThreshold} &gt; alors</div>
                      <div className="p-2 bg-orange-600 text-white rounded ml-3">
                        ajouter à [ x ] 20
                      </div>
                    </div>
                  </div>

                  {/* Trace d'exécution Pas-à-Pas */}
                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-2">
                        <Play className="w-4 h-4" /> Trace d'exécution de la machine
                      </div>
                      <ul className="space-y-1.5 text-xs font-mono text-slate-300">
                        {scratchResult.history.map((step, idx) => (
                          <li key={idx} className="p-1.5 rounded bg-slate-950/70 border border-slate-800/80">
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/40 text-center font-bold text-sm text-purple-200">
                      🎯 Valeur finale affichée : <span className="text-lg text-white font-mono">{scratchResult.finalX}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Modal Pythagore & Puzzle d'Aires */}
            {activeWidget === 'pythagore' && (
              <div className="space-y-6">
                <div className="text-center space-y-1">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Laboratoire Interactif</span>
                  <h3 className="text-2xl font-black text-white">
                    Preuve Géométrique de Pythagore : a² + b² = c²
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-200">
                      <span>Côté a</span>
                      <span className="text-cyan-400 font-mono text-sm font-bold">{pythSideA} cm</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="6"
                      value={pythSideA}
                      onChange={(e) => setPythSideA(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-200">
                      <span>Côté b</span>
                      <span className="text-amber-400 font-mono text-sm font-bold">{pythSideB} cm</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="8"
                      value={pythSideB}
                      onChange={(e) => setPythSideB(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Calcul d'Aires */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3.5 bg-cyan-500/10 rounded-xl border border-cyan-500/30">
                    <span className="text-xs text-slate-300 block">Carré sur côté a</span>
                    <span className="text-cyan-400 font-mono font-bold text-lg">Aire = {pythSideA * pythSideA} cm²</span>
                  </div>

                  <div className="p-3.5 bg-amber-500/10 rounded-xl border border-amber-500/30">
                    <span className="text-xs text-slate-300 block">Carré sur côté b</span>
                    <span className="text-amber-400 font-mono font-bold text-lg">Aire = {pythSideB * pythSideB} cm²</span>
                  </div>

                  <div className="p-3.5 bg-emerald-500/15 rounded-xl border border-emerald-500/40">
                    <span className="text-xs text-slate-300 block">Carré Hypoténuse c²</span>
                    <span className="text-emerald-400 font-mono font-bold text-lg">Aire = {pythSideA * pythSideA + pythSideB * pythSideB} cm²</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-2">
                  <div className="text-sm font-bold text-white">
                    <MathRenderer content={`Hypoténuse $c = \\sqrt{${pythSideA}^2 + ${pythSideB}^2} = \\sqrt{${pythSideA * pythSideA + pythSideB * pythSideB}} \\approx ${pythHyp.toFixed(2)}\\text{ cm}$`} />
                  </div>
                  <p className="text-xs text-slate-400">
                    L'aire du grand carré est exactement égale à la somme des aires des deux petits carrés.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
