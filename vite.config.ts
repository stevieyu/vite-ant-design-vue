import { UserConfig } from 'vite'
import voie from 'vite-plugin-voie';
import eslint from 'vite-eslint';

const config:UserConfig = {
  optimizeDeps: {
    include: [
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
      importMode: 'async',
    }),
  ],
  vueCompilerOptions: {
    isCustomElement: (tag) => tag.startsWith('ct-'),
  },
};

export default config
