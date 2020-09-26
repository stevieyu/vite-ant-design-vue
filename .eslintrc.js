
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    './node_modules/vite-eslint/.eslintrc.js',
  ],
  // add your custom rules here
  rules: {
    'max-len': 0,
  },
  globals: {
  },
};
