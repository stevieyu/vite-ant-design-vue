import path from 'path'
import { defineConfig } from 'vite'
import voie from 'vite-plugin-voie';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import eslint from 'vite-eslint';

const alias = {
  '/~/': path.resolve(__dirname, 'src'),
}

export default defineConfig({
  resolve: {
    alias
  },
  optimizeDeps: {
    include: [
        'moment',
        'lodash-es',
        'ant-design-vue/es/locale/zh_CN'
    ]
  },
  plugins: [
    vue(),
    vueJsx(),
    eslint(),
    voie({
      pagesDir: 'src/views',
      importMode: 'async',
    }),
  ],
});
