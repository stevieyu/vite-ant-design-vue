import path from 'path'
import { UserConfig } from 'vite'
import voie from 'vite-plugin-voie';
import vue from '@vitejs/plugin-vue';
// import eslint from 'vite-eslint';

const alias = {
  '/~/': path.resolve(__dirname, 'src'),
}

const config:UserConfig = {
  alias,
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
    vue(),
    // eslint(),
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
