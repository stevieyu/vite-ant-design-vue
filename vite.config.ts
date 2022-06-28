import path from 'path'
import { defineConfig } from 'vite'
import pages from 'vite-plugin-pages';
import vue from '@vitejs/plugin-vue';
import unocss from 'unocss/vite';
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
    ]
  },
  plugins: [
    !isProd && {
      ...eslint({
        fix: true,
        formatter: 'friendly',
      }),
      enforce: 'pre'
    },
    pages({
      dirs : 'src/views',
      importMode: 'async',
    }),
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
    unocss({}),
    vue({
      // https://staging-cn.vuejs.org/guide/extras/reactivity-transform.html
      reactivityTransform: true,
      template: {
        compilerOptions: {
          isCustomElement: tag => !!['wc-', 'ce-'].filter(i => tag.startsWith(i)).length
        }
      }
    }),
    vueJsx(),
  ],
});
