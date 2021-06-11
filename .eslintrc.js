module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'google',
  ],
  rules: {
    'no-console': 2,
    'no-debugger': 2,
    'max-len': 0,
    'no-prototype-builtins': 0,
  },
  globals: {
  },
};
