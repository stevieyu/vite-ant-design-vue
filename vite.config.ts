import path from 'path'
import { defineConfig } from 'vite'
import pages from 'vite-plugin-pages';
import vue from '@vitejs/plugin-vue';
import unocss from 'unocss/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';

import eslint from 'vite-plugin-eslint';
import Components from 'unplugin-vue-components/vite'
import {
  AntDesignVueResolver,
} from 'unplugin-vue-components/resolvers'

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
      }),
      enforce: 'pre'
    },
    pages({
      dirs : 'src/views',
      importMode: 'async',
    }),
    Components({
      dirs: ['src/components/import'],
      resolvers: [
        AntDesignVueResolver()
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
