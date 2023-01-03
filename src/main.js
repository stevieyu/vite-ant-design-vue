import { createApp } from 'vue'
import bootstrap, { isReady } from './bootstrap'
import App from './App.vue'

import 'uno.css'

if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object')
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {}

const app = createApp(App).use(bootstrap)
isReady().then(() => app.mount('#app'))
