const IS_DEV = process.env.npm_lifecycle_event === 'dev'

module.exports = {
  extends: [
    '@antfu',
  ],
  rules: {
    'no-console': IS_DEV ? 0 : 2,
    'no-debugger': IS_DEV ? 0 : 2,
    'no-unused-vars': IS_DEV ? 0 : 2,
    'vue/multi-word-component-names': 0,
    'max-len': 0,
    'no-prototype-builtins': 0,
    'require-jsdoc': 0,
    'prefer-const': 0,
  },
  globals: {
    $ref: true,
    $shallowRef: true,
    $computed: true,
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',

    $msg: true,
    $api: true,
  },
}
