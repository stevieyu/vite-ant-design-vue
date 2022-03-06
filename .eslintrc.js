const IS_DEV = process.env.VITE_USER_NODE_ENV === 'development';

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
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'google',
  ],
  rules: {
    'no-console': IS_DEV ? 0 : 2,
    'no-debugger': IS_DEV ? 0 : 2,
    'vue/multi-word-component-names': 0,
    'max-len': 0,
    'no-prototype-builtins': 0,
  },
  globals: {
    $ref: true,
    $shallowRef: true,
    $computed: true,
  },
};
