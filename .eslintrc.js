
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
    'google',
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV !== 'development' ? 2 : 0,
    'no-debugger': process.env.NODE_ENV !== 'development' ? 2 : 0,
    'max-len': 0,
  },
  globals: {
  },
};
