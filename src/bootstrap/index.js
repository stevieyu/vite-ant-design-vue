import './polyfill'

// import './offlineNotice';
import './req'

import '../utils/finder'

import '@ant-design-vue/pro-layout/dist/style.css'
import ProLayout, { PageContainer } from '@ant-design-vue/pro-layout'

import { useRoute } from 'vue-router'
import antd from './antd'
import icons from './icons'

import router from './router'

export const isReady = router.isReady

export default {
  async install(app) {
    app.use(router)
    app.config.globalProperties.$_append = (pathToAppend) => {
      const path = useRoute().path
      return path + (path.endsWith('/') ? '' : '/') + pathToAppend
    }

    app.use(icons)
    app.use(antd)
    app.use(ProLayout).use(PageContainer)
  },
}
