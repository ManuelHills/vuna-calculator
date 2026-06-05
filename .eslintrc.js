// .eslintrc.js — ESLint configuration for VUNA Calculator
module.exports = {
  env: {
    browser: true,   // allows window, document, etc.
    es2021:  true,   // allows modern JS syntax
    node:    true,   // allows module.exports, require
    jest:    true    // allows describe, it, expect
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2021
  },
  rules: {
    // Code quality
    'no-unused-vars':  'error',   // catch dead code
    'eqeqeq':          'error',   // always use === not ==
    'no-console':      'warn',    // warn on console.log in prod code

    // We intentionally use eval() in calculator.js (safely, with sanitisation)
    'no-eval':         'off'
  }
};
