import path from 'path'
import { defineConfig } from 'vite'
import voie from 'vite-plugin-voie';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import eslint from '@rollup/plugin-eslint';

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, 'src'),
      'moment': 'dayjs'
    }
  },
  optimizeDeps: {
    include: [
        // 'moment',
        // 'lodash-es',
        // 'ant-design-vue/es/locale/zh_CN'
    ]
  },
  plugins: [
    !isProd && eslint({
      fix: true,
      formatter: 'friendly',
      include: /.*\.(vue|js|jsx|ts|tsx)$/m,
      exclude: [/node_modules|vue&type/, /^src/],
    }),
    voie({
      pagesDir: 'src/views',
      // importMode: 'sync',
    }),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => !!['wc-', 'ce-'].filter(i => tag.startsWith(i)).length
        }
      }
    }),
    vueJsx(),
  ],
});
