import { ExerciseStep } from '../types/mathquest';

/**
 * Clean and normalize mathematical strings for evaluation
 */
export function normalizeMathString(str: string): string {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '') // Remove all whitespaces
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/,/g, '.')
    .replace(/\\left|\\right/g, '')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)');
}

/**
 * Test numerical equivalence for simple mathematical expressions
 */
export function isMathematicallyEquivalent(userAnswer: string, expectedAnswer: string): boolean {
  const normUser = normalizeMathString(userAnswer);
  const normExpected = normalizeMathString(expectedAnswer);

  if (normUser === normExpected) return true;

  // Numerical check
  const numUser = parseFloat(normUser);
  const numExpected = parseFloat(normExpected);
  if (!isNaN(numUser) && !isNaN(numExpected)) {
    return Math.abs(numUser - numExpected) < 0.0001;
  }

  // Expression algebraic test (simplistic sampling test for 1-variable equations)
  try {
    const testValues = [0, 1, 2, 5, 10];
    const userExpr = normUser.replace(/x/g, '*x');
    const expectedExpr = normExpected.replace(/x/g, '*x');
    
    // Safe evaluation function
    const safeEval = (expr: string, val: number) => {
      const fn = new Function('x', `return (${expr});`);
      return fn(val);
    };

    for (const val of testValues) {
      const evalUser = safeEval(userExpr, val);
      const evalExpected = safeEval(expectedExpr, val);
      if (Math.abs(evalUser - evalExpected) > 0.0001) {
        return false;
      }
    }
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Evaluate step answer and return result with feedback
 */
export function evaluateStepAnswer(step: ExerciseStep, userAnswer: string): {
  isCorrect: boolean;
  matchedFeedback?: string;
} {
  for (const expected of step.expectedAnswers) {
    if (isMathematicallyEquivalent(userAnswer, expected)) {
      return { isCorrect: true };
    }
  }

  // Check common error feedback
  if (step.errorFeedback) {
    for (const [errorPattern, feedback] of Object.entries(step.errorFeedback)) {
      if (normalizeMathString(errorPattern) === normalizeMathString(userAnswer)) {
        return { isCorrect: false, matchedFeedback: String(feedback) };
      }
    }
  }

  return { isCorrect: false };
}
