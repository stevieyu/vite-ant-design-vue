import path from 'path'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import eslint from 'vite-plugin-eslint';
import {createStyleImportPlugin} from 'vite-plugin-style-import';

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
    !isProd && {
      ...eslint({
        fix: true,
        formatter: 'friendly',
        // include: /.*\.(vue|js|jsx|ts|tsx)$/m,
        // exclude: [/node_modules|vue&type/, /^src/],
        exclude: ['node_modules'],
      }),
      enforce: 'pre'
    },
    {
      ...Pages({
        dirs : 'src/views',
        importMode: 'async',
      }),
      enforce: 'pre'
    },
    createStyleImportPlugin({
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/css`;
          },
        },
      ],
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
