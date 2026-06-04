// assets/js/script.js — VUNA Calculator Logic

let expression = '';

// Update the display input field
function updateDisplay() {
  const display = document.getElementById('result');
  display.value = expression || '0';
}

// Add a number or decimal point to the expression
function appendToResult(value) {
  expression += value.toString();
  updateDisplay();
}

// Clear everything (AC button)
function clearResult() {
  expression = '';
  updateDisplay();
}

// Remove the last character (backspace button)
function backspace() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

// Add a bracket ( or )
function bracketToResult(bracket) {
  expression += bracket;
  updateDisplay();
}

// Add an operator: +, -, *, /
function operatorToResult(op) {
  if (expression === '' && op === '-') {
    // Allow negative numbers
    expression += op;
    updateDisplay();
    return;
  }
  if (expression !== '' && !'+-*/'.includes(expression.slice(-1))) {
    expression += op;
    updateDisplay();
  }
}

// Handle percentage
function percentToResult() {
  if (expression === '') return;
  try {
    const value = eval(expression);
    expression = (value / 100).toString();
    updateDisplay();
  } catch (e) {
    document.getElementById('result').value = 'Error';
    expression = '';
  }
}

// Calculate the final result (= button)
function calculateResult() {
  if (expression === '') return;
  try {
    // Replace display symbols with actual operators
    const sanitized = expression
      .replace(/÷/g, '/')
      .replace(/×/g, '*')
      .replace(/[^0-9+\-*/().%]/g, '');

    // eslint-disable-next-line no-eval
    let result = eval(sanitized);

    if (!isFinite(result)) throw new Error('Cannot divide by zero');

    // Round to avoid floating point issues (e.g., 0.1 + 0.2 = 0.30000000000000004)
    result = Math.round(result * 1e10) / 1e10;

    expression = result.toString();
    updateDisplay();
  } catch (e) {
    document.getElementById('result').value = 'Error';
    setTimeout(() => {
      expression = '';
      updateDisplay();
    }, 1500);
  }
}

// Toggle dark/light theme
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const btn = document.getElementById('theme-toggle');
  if (document.body.classList.contains('dark-mode')) {
    btn.textContent = '☀️';
    btn.title = 'Switch to Light Mode';
  } else {
    btn.textContent = '🌙';
    btn.title = 'Switch to Dark Mode';
  }
}

// Keyboard support — type numbers and operators directly
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') appendToResult(e.key);
  else if (e.key === '.') appendToResult('.');
  else if (e.key === '+') operatorToResult('+');
  else if (e.key === '-') operatorToResult('-');
  else if (e.key === '*') operatorToResult('*');
  else if (e.key === '/') { e.preventDefault(); operatorToResult('/'); }
  else if (e.key === 'Enter' || e.key === '=') calculateResult();
  else if (e.key === 'Backspace') backspace();
  else if (e.key === 'Escape') clearResult();
  else if (e.key === '(' || e.key === ')') bracketToResult(e.key);
  else if (e.key === '%') percentToResult();
});

// Scroll-to-top button visibility
window.addEventListener('scroll', () => {
  const btn = document.getElementById('scroll-to-calculator');
  if (btn) {
    btn.style.display = window.scrollY > 200 ? 'block' : 'none';
  }
});

document.getElementById('scroll-to-calculator')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
