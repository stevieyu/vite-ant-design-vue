import path from 'path'
import { UserConfig } from 'vite'
import voie from 'vite-plugin-voie';
import eslint from 'vite-eslint';
import { VitePWA } from 'vite-plugin-pwa'

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
    eslint(),
    voie({
      pagesDir: 'src/views',
      importMode: 'async',
    }),
    VitePWA({
      manifest: {
        name: 'Vitesse',
        short_name: 'Vitesse',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  vueCompilerOptions: {
    isCustomElement: (tag) => tag.startsWith('ct-'),
  },
};

export default config
