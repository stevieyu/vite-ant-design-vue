import { createApp } from 'vue'
import App from '/src/App.vue'
import router from './router'
import store from './store'

import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';

createApp(App)
  .use(router)
  .use(store)
  .use(antd)
  .mount('#app')
