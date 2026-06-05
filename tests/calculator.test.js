// tests/calculator.test.js
// Unit tests for pure logic in assets/js/calculator.js

const { evaluate, calculateAgeFrom } = require('../assets/js/calculator');

// ═══════════════════════════════════════════════════
//  evaluate() — basic arithmetic
// ═══════════════════════════════════════════════════
describe('evaluate() — basic arithmetic', () => {

  test('adds two numbers', () => {
    expect(evaluate('2+3')).toBe(5);
  });

  test('subtracts two numbers', () => {
    expect(evaluate('10-4')).toBe(6);
  });

  test('multiplies two numbers', () => {
    expect(evaluate('6*7')).toBe(42);
  });

  test('divides two numbers', () => {
    expect(evaluate('20/4')).toBe(5);
  });

  test('handles decimal arithmetic', () => {
    expect(evaluate('0.1+0.2')).toBe(0.3); // floating-point fix
  });

  test('handles chained operations', () => {
    expect(evaluate('2+3*4')).toBe(14); // respects operator precedence
  });

  test('handles negative numbers', () => {
    expect(evaluate('5-8')).toBe(-3);
  });

  test('handles decimal result', () => {
    expect(evaluate('10/3')).toBeCloseTo(3.333, 2);
  });

});

// ═══════════════════════════════════════════════════
//  evaluate() — error handling
// ═══════════════════════════════════════════════════
describe('evaluate() — error handling', () => {

  test('throws on empty string', () => {
    expect(() => evaluate('')).toThrow('Expression must be a non-empty string');
  });

  test('throws on non-string input', () => {
    expect(() => evaluate(123)).toThrow('Expression must be a non-empty string');
  });

  test('throws on invalid characters', () => {
    expect(() => evaluate('2+alert(1)')).toThrow('Invalid characters in expression');
  });

  test('throws on division by zero (Infinity)', () => {
    expect(() => evaluate('5/0')).toThrow('Result is not finite');
  });

});

// ═══════════════════════════════════════════════════
//  calculateAgeFrom() — age calculator feature
// ═══════════════════════════════════════════════════
describe('calculateAgeFrom() — age calculator', () => {

  test('calculates exact age in years', () => {
    const result = calculateAgeFrom('2000-01-01', '2026-01-01');
    expect(result.years).toBe(26);
    expect(result.months).toBe(0);
    expect(result.days).toBe(0);
  });

  test('calculates years and months correctly', () => {
    const result = calculateAgeFrom('2000-03-15', '2026-06-15');
    expect(result.years).toBe(26);
    expect(result.months).toBe(3);
    expect(result.days).toBe(0);
  });

  test('handles day rollover correctly', () => {
    const result = calculateAgeFrom('2000-06-20', '2026-06-05');
    // Birthday hasn't happened yet this month
    expect(result.years).toBe(25);
    expect(result.months).toBe(11);
  });

  test('returns zero age for same day birth', () => {
    const result = calculateAgeFrom('2026-06-05', '2026-06-05');
    expect(result.years).toBe(0);
    expect(result.months).toBe(0);
    expect(result.days).toBe(0);
  });

  test('throws when no date of birth provided', () => {
    expect(() => calculateAgeFrom('')).toThrow('Date of birth is required');
  });

  test('throws on invalid date string', () => {
    expect(() => calculateAgeFrom('not-a-date')).toThrow('Invalid date of birth');
  });

  test('throws when date of birth is in the future', () => {
    expect(() => calculateAgeFrom('2099-01-01', '2026-06-05'))
      .toThrow('Date of birth cannot be in the future');
  });

  test('returns object with years, months, days keys', () => {
    const result = calculateAgeFrom('1995-05-20', '2026-06-05');
    expect(result).toHaveProperty('years');
    expect(result).toHaveProperty('months');
    expect(result).toHaveProperty('days');
  });

});
