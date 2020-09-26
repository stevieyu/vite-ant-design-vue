
module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
  },
  extends: [
    'plugin:vue/vue3-essential',
    'google',
  ],
  rules: {
    'no-console': process.env.NODE_ENV !== 'development' ? 2 : 0,
    'no-debugger': process.env.NODE_ENV !== 'development' ? 2 : 0,
  },
  globals: {
  },
};
