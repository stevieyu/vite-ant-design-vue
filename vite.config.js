// @ts-check

/**
 * @type { import('vite').SharedConfig }
 */
module.exports = {
  optimizeDeps: {
    include: ['yup/es', 'lodash-es']
  }
}
