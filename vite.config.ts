import path from 'path'
import { defineConfig } from 'vite'
import voie from 'vite-plugin-voie';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import eslint from '@rollup/plugin-eslint';
import styleImport from 'vite-plugin-style-import';

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
        include: /.*\.(vue|js|jsx|ts|tsx)$/m,
        exclude: [/node_modules|vue&type/, /^src/],
      }),
      enforce: 'pre'
    },
    {
      ...voie({
        pagesDir: 'src/views',
        // importMode: 'sync',
      }),
      enforce: 'pre'
    },
    styleImport({
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/index`;
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
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
});
