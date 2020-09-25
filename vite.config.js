// @ts-check
import voie from 'vite-plugin-voie';
import eslint from 'vite-eslint';

/**
 * @type { import('vite').UserConfig }
 */
module.exports = {
  optimizeDeps: {
    include: [
      'ky',
      'yup/es',
      'lodash-es',
      'moment',
      'ant-design-vue/es',
      'ant-design-vue/es/locale/zh_CN',
    ],
  },
  plugins: [
    eslint(),
    voie({
      pagesDir: 'src/views',
      extensions: ['vue', 'ts', 'tsx', 'jsx', 'js'],
      importMode: 'async',
    }),
  ],
  vueCompilerOptions: {
    isCustomElement: (tag) => tag.startsWith('ct-'),
  },
};

