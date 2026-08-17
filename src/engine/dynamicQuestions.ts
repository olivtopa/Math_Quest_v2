import { DynamicQuestion } from '../types/mathquest';

export function generateDynamicQuestion(realm: string, questIndex: number): DynamicQuestion {
  let q: DynamicQuestion = {
    id: `q_${realm}_${questIndex}_${Date.now()}`,
    title: '',
    question: '',
    options: [],
    answer: '',
    explanationHtml: '',
    hints: []
  };

  const setupOptions = (correct: string, list: string[]) => {
    let opts = [correct, ...list].map(String);
    opts = opts.filter((v, i, self) => self.indexOf(v) === i);
    opts.sort(() => Math.random() - 0.5);
    if (opts.indexOf(String(correct)) === -1) {
      opts[0] = String(correct);
    }
    q.options = opts.slice(0, 4);
    q.answer = String(correct);
  };

  if (realm === 'Algèbre') {
    if (questIndex === 0) {
      const isAddition = Math.random() > 0.5;
      if (isAddition) {
        const pairs = [
          { b: 2, d: 4, k: 2 },
          { b: 2, d: 6, k: 3 },
          { b: 3, d: 6, k: 2 },
          { b: 3, d: 9, k: 3 },
          { b: 4, d: 8, k: 2 }
        ];
        const pair = pairs[Math.floor(Math.random() * pairs.length)];
        const { b, d, k } = pair;
        const a = Math.floor(Math.random() * (b - 1)) + 1;
        const c = Math.floor(Math.random() * (d - 1)) + 1;
        const num = a * k + c;
        const correctVal = `${num}/${d}`;

        q.title = 'Addition de Fractions';
        q.question = `Calcule et simplifie le résultat : $A = \\frac{${a}}{${b}} + \\frac{${c}}{${d}}$`;
        setupOptions(correctVal, [
          `${a + c}/${b + d}`,
          `${a * c}/${b * d}`,
          `${num + 2}/${d}`,
          `${Math.max(1, num - 3)}/${d}`
        ]);
        q.explanationHtml = `
          <div><strong>Données :</strong> L'expression $\\frac{${a}}{${b}} + \\frac{${c}}{${d}}$.</div>
          <div><strong>Règle :</strong> Pour additionner deux fractions, on les met au même dénominateur. Ici, le dénominateur commun est $${d}$.</div>
          <div><strong>Calcul :</strong> $\\frac{${a} \\times ${k}}{${b} \\times ${k}} + \\frac{${c}}{${d}} = \\frac{${a * k}}{${d}} + \\frac{${c}}{${d}} = \\frac{${num}}{${d}}$.</div>
          <div><strong>Conclusion :</strong> Le résultat est $\\frac{${num}}{${d}}$.</div>
        `;
        q.hints = [
          { level: 1, title: 'Dénominateur commun', content: 'Met les deux fractions au même dénominateur : $${d}$.' },
          { level: 2, title: 'Conversion', content: '$\\frac{${a}}{${b}} = \\frac{${a \\times k}}{${d}}$.' },
          { level: 3, title: 'Addition', content: 'Additionne les numérateurs $${a * k} + ${c}$.' }
        ];
        q.svgOverlay = (svg) => {
          svg.innerHTML = `
            <text x="150" y="30" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Visualisation : ${a}/${b} + ${c}/${d}</text>
            <circle cx="80" cy="120" r="35" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" stroke-width="2"/>
            <text x="80" y="125" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">${a}/${b}</text>
            <text x="150" y="125" fill="#fff" font-size="20" font-weight="bold" text-anchor="middle">+</text>
            <circle cx="220" cy="120" r="35" fill="rgba(139, 92, 246, 0.4)" stroke="#8b5cf6" stroke-width="2"/>
            <text x="220" y="125" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">${c}/${d}</text>
          `;
        };
      } else {
        const primes = [2, 3, 5, 7];
        const f1 = primes[Math.floor(Math.random() * primes.length)];
        let f2 = primes[Math.floor(Math.random() * primes.length)];
        while (f2 === f1) f2 = primes[Math.floor(Math.random() * primes.length)];
        const common = 2;
        const num = f1 * common;
        const den = f2 * common;
        const correctVal = `${f1}/${f2}`;

        q.title = 'Simplification de Fraction';
        q.question = `Simplifie la fraction $B = \\frac{${num}}{${den}}$ en décomposant en facteurs premiers.`;
        setupOptions(correctVal, [`${f1 + 1}/${f2}`, `${f1}/${den}`, `${num}/${f2}`]);
        q.explanationHtml = `
          <div><strong>Données :</strong> $\\frac{${num}}{${den}}$.</div>
          <div><strong>Règle :</strong> Décomposer numérateur et dénominateur en facteurs premiers.</div>
          <div><strong>Décomposition :</strong> $${num} = ${f1} \\times ${common}$ et $${den} = ${f2} \\times ${common}$.</div>
          <div><strong>Conclusion :</strong> En simplifiant par $${common}$, on obtient $\\frac{${f1}}{${f2}}$.</div>
        `;
        q.hints = [
          { level: 1, title: 'Facteur commun', content: 'Trouve un diviseur commun à $${num}$ et $${den}$.' },
          { level: 2, title: 'Décomposition', content: '$${num} = ${f1} \\times ${common}$ et $${den} = ${f2} \\times ${common}$.' },
          { level: 3, title: 'Simplification', content: 'Divise en haut et en bas par $${common}$.' }
        ];
      }
    } else if (questIndex === 1) {
      const n = Math.floor(Math.random() * 4) + 2;
      const m = Math.floor(Math.random() * 3) + 2;
      const p = Math.floor(Math.random() * 4) + 1;
      const correctExp = n + m - p;
      const correctVal = `10^${correctExp}`;

      q.title = 'Puissances de 10';
      q.question = `Simplifie l'expression $C = \\frac{10^{${n}} \\times 10^{${m}}}{10^{${p}}}$ sous la forme $10^k$.`;
      setupOptions(correctVal, [`10^${n + m + p}`, `10^${n * m - p}`, `10^${n + m}`]);
      q.explanationHtml = `
        <div><strong>Règles :</strong> $10^a \\times 10^b = 10^{a+b}$ et $\\frac{10^a}{10^b} = 10^{a-b}$.</div>
        <div><strong>Calcul :</strong> $10^{${n}+${m}} / 10^{${p}} = 10^{${n + m} - ${p}} = 10^{${correctExp}}$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Règle de multiplication', content: '$10^a \\times 10^b = 10^{a+b}$.' },
        { level: 2, title: 'Règle de division', content: '$\\frac{10^a}{10^b} = 10^{a-b}$.' },
        { level: 3, title: 'Calcul final', content: 'Fais $(${n} + ${m}) - ${p}$.' }
      ];
    } else if (questIndex === 2) {
      const a = Math.floor(Math.random() * 3) + 2;
      const b = Math.floor(Math.random() * 4) + 2;
      const correctVal = `x² + ${a + b}x + ${a * b}`;

      q.title = 'Double Distributivité';
      q.question = `Développe et réduis l'expression $D = (x + ${a})(x + ${b})$.`;
      setupOptions(correctVal, [`x² + ${a * b}`, `x² + ${a + b}x + ${a + b}`, `x² - ${a + b}x + ${a * b}`]);
      q.explanationHtml = `
        <div><strong>Formule :</strong> $(x+a)(x+b) = x^2 + (a+b)x + ab$.</div>
        <div><strong>Calcul :</strong> $x^2 + ${b}x + ${a}x + ${a * b} = x^2 + ${a + b}x + ${a * b}$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Double distributivité', content: 'Applique $(a+b)(c+d) = ac + ad + bc + bd$.' },
        { level: 2, title: 'Produits', content: 'Multiplie $x \\times x$, $x \\times ${b}$, $${a} \\times x$, et $${a} \\times ${b}$.' },
        { level: 3, title: 'Réduction', content: 'Regroupe les termes en $x$ : $${a}x + ${b}x = ${a + b}x$.' }
      ];
    } else {
      const a = Math.floor(Math.random() * 3) + 2;
      const correctX = Math.floor(Math.random() * 5) + 1;
      const b = Math.floor(Math.random() * 6) + 2;
      const c = a * correctX + b;
      const correctVal = `x = ${correctX}`;

      q.title = "Résolution d'Équation";
      q.question = `Résous l'équation $${a}x + ${b} = ${c}$. Quelle est la valeur de $x$ ?`;
      setupOptions(correctVal, [`x = ${correctX + 1}`, `x = ${correctX - 1}`, `x = ${correctX + 2}`]);
      q.explanationHtml = `
        <div><strong>Étape 1 :</strong> Soustraire $${b}$ des deux côtés : $${a}x = ${c} - ${b} = ${c - b}$.</div>
        <div><strong>Étape 2 :</strong> Diviser par $${a}$ : $x = \\frac{${c - b}}{${a}} = ${correctX}$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Isoler le terme en x', content: 'Soustrais $${b}$ des deux côtés de l\'égalité.' },
        { level: 2, title: 'Résultat intermédiaire', content: 'Tu obtiens $${a}x = ${c - b}$.' },
        { level: 3, title: 'Division finale', content: 'Divise $${c - b}$ par $${a}$.' }
      ];
    }
  } else if (realm === 'Fonctions') {
    const a = Math.floor(Math.random() * 3) + 1;
    const b = Math.floor(Math.random() * 5) - 2;
    const x0 = 2;
    const correctRes = a * x0 + b;
    const correctVal = String(correctRes);

    q.title = 'Calcul d\'Image (Fonction Affine)';
    q.question = `Soit la fonction affine $f(x) = ${a}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}$. Calcule l'image de $${x0}$ par $f$.`;
    setupOptions(correctVal, [String(correctRes + 2), String(correctRes - 3), String(a + x0)]);
    q.explanationHtml = `
      <div><strong>Méthode :</strong> Remplace $x$ par $${x0}$ dans $f(x)$.</div>
      <div>$f(${x0}) = ${a} \\times (${x0}) ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)} = ${correctRes}$.</div>
    `;
    q.hints = [
      { level: 1, title: 'Substitution', content: 'Remplace $x$ par $${x0}$ dans la formule.' },
      { level: 2, title: 'Multiplication', content: 'Calcule d\'abord $${a} \\times ${x0} = ${a * x0}$.' },
      { level: 3, title: 'Addition', content: 'Ajoute $${b}$ au résultat.' }
    ];
  } else if (realm === 'Géométrie') {
    if (questIndex === 0) {
      const correctVal = '10 cm';
      q.title = 'Théorème de Pythagore';
      q.question = 'Dans un triangle $ABC$ rectangle en $A$, on donne $AB = 6\\text{ cm}$ et $AC = 8\\text{ cm}$. Calcule l\'hypoténuse $BC$.';
      setupOptions(correctVal, ['14 cm', '9 cm', '12 cm']);
      q.explanationHtml = `
        <div><strong>Théorème :</strong> D'après Pythagore, $BC^2 = AB^2 + AC^2$.</div>
        <div><strong>Calcul :</strong> $BC^2 = 6^2 + 8^2 = 36 + 64 = 100 \\implies BC = \\sqrt{100} = 10\\text{ cm}$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Pythagore', content: 'Écris $BC^2 = AB^2 + AC^2$.' },
        { level: 2, title: 'Carrés', content: '$6^2 = 36$ et $8^2 = 64$.' },
        { level: 3, title: 'Racine carrée', content: 'Calcule $\\sqrt{100}$.' }
      ];
    } else {
      const correctVal = '12 cm';
      q.title = 'Théorème de Thalès';
      q.question = 'Dans le triangle $ABC$, $(MN) \\parallel (BC)$. Si $AM = 3\\text{ cm}$, $AB = 9\\text{ cm}$ et $AN = 4\\text{ cm}$, calcule $AC$.';
      setupOptions(correctVal, ['10 cm', '8 cm', '6.75 cm']);
      q.explanationHtml = `
        <div><strong>Théorème :</strong> $\\frac{AM}{AB} = \\frac{AN}{AC} \\implies \\frac{3}{9} = \\frac{4}{AC}$.</div>
        <div><strong>Produit en croix :</strong> $AC = \\frac{9 \\times 4}{3} = 12\\text{ cm}$.</div>
      `;
      q.hints = [
        { level: 1, title: 'Égalité de Thalès', content: '$\\frac{AM}{AB} = \\frac{AN}{AC}$.' },
        { level: 2, title: 'Application numérique', content: '$\\frac{3}{9} = \\frac{4}{AC}$.' },
        { level: 3, title: 'Produit en croix', content: '$AC = \\frac{9 \\times 4}{3}$.' }
      ];
    }
  } else {
    const correctVal = '1/4';
    q.title = 'Probabilités à 2 épreuves';
    q.question = 'Une urne contient 2 boules Rouges et 2 Bleues. On tire deux boules successivement avec remise. Quelle est la probabilité d\'obtenir $(R, R)$ ?';
    setupOptions(correctVal, ['1/2', '1/8', '1/3']);
    q.explanationHtml = `
      <div><strong>Calcul :</strong> $P(R_1) = \\frac{2}{4} = \\frac{1}{2}$ et $P(R_2) = \\frac{1}{2}$.</div>
      <div>$P(R, R) = \\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}$.</div>
    `;
    q.hints = [
      { level: 1, title: 'Probabilité simple', content: 'Calcul la probabilité d\'une boule Rouge : $\\frac{2}{4} = \\frac{1}{2}$.' },
      { level: 2, title: 'Événements indépendants', content: 'Multiplie les probabilités des deux tirages.' },
      { level: 3, title: 'Produit', content: '$\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}$.' }
    ];
  }

  return q;
}
