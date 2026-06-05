// assets/js/calculator.js
// Pure logic functions — no DOM, fully testable with Jest

/**
 * Evaluate a mathematical expression string safely.
 * Returns the result as a number, or throws on invalid input.
 */
function evaluate(expression) {
  if (typeof expression !== 'string' || expression.trim() === '') {
    throw new Error('Expression must be a non-empty string');
  }
  // Only allow safe characters: digits, operators, dot, whitespace
  if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
    throw new Error('Invalid characters in expression');
  }
  // eslint-disable-next-line no-eval
  const result = eval(expression);
  if (!isFinite(result)) throw new Error('Result is not finite');
  // Round to avoid floating-point artefacts (e.g. 0.1 + 0.2)
  return Math.round(result * 1e10) / 1e10;
}

/**
 * Calculate age from a date of birth string (YYYY-MM-DD) and an optional
 * reference date (defaults to today). Returns { years, months, days }.
 */
function calculateAgeFrom(dobString, referenceDate) {
  if (!dobString) throw new Error('Date of birth is required');

  const dob = new Date(dobString);
  if (isNaN(dob.getTime())) throw new Error('Invalid date of birth');

  const ref = referenceDate ? new Date(referenceDate) : new Date();
  if (dob > ref) throw new Error('Date of birth cannot be in the future');

  let years  = ref.getFullYear() - dob.getFullYear();
  let months = ref.getMonth()    - dob.getMonth();
  let days   = ref.getDate()     - dob.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(ref.getFullYear(), ref.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years  -= 1;
    months += 12;
  }

  return { years, months, days };
}

// Export for Jest (Node.js); ignored in browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { evaluate, calculateAgeFrom };
}
