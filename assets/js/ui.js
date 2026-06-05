// assets/js/ui.js
// DOM interaction — runs only in the browser

let expression = '';

function updateDisplay() {
  document.getElementById('display').value = expression || '0';
}

function appendNum(num) {
  expression += num;
  updateDisplay();
}

function appendDot() {
  // Prevent multiple dots in the current number
  const parts = expression.split(/[+\-*/]/);
  const last  = parts[parts.length - 1];
  if (!last.includes('.')) {
    expression += '.';
    updateDisplay();
  }
}

function appendOp(op) {
  if (expression === '' && op === '-') { expression = '-'; updateDisplay(); return; }
  if (expression !== '' && !/[+\-*/]$/.test(expression)) {
    expression += op;
    updateDisplay();
  }
}

function clearDisplay() {
  expression = '';
  updateDisplay();
}

function backspace() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    const result = evaluate(expression);
    expression   = String(result);
    updateDisplay();
  } catch {
    document.getElementById('display').value = 'Error';
    expression = '';
  }
}

function calculateAge() {
  const dob    = document.getElementById('dob-input').value;
  const result = document.getElementById('age-result');
  try {
    const age = calculateAgeFrom(dob);
    result.innerHTML =
      `<strong>${age.years}</strong> years, 
       <strong>${age.months}</strong> months, 
       <strong>${age.days}</strong> days`;
    result.style.display = 'block';
  } catch (e) {
    result.innerHTML = `<span class="text-danger">${e.message}</span>`;
    result.style.display = 'block';
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  document.getElementById('theme-toggle').textContent =
    document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9')        appendNum(e.key);
  else if (e.key === '.')                   appendDot();
  else if (['+','-','*','/'].includes(e.key)) appendOp(e.key);
  else if (e.key === 'Enter' || e.key === '=') calculate();
  else if (e.key === 'Backspace')           backspace();
  else if (e.key === 'Escape')              clearDisplay();
});
