// @ts-check
import voie from 'vite-plugin-voie';
/**
 * @type { import('vite').SharedConfig }
 */
module.exports = {
  optimizeDeps: {
    include: [
      'yup/es',
      'lodash-es',
      'moment',
      'ant-design-vue/es/locale/zh_CN'
    ]
  },
  plugins: [
    voie({
      pagesDir: 'src/views',
      extensions: ['vue', 'ts', 'tsx','jsx', 'js'],
      importMode: 'async'
    }),
  ],
  vueCompilerOptions: {
    isCustomElement: tag => tag.startsWith('ct-')
  }
}

