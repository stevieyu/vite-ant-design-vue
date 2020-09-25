import {createApp} from 'vue';
import App from '/src/App.vue';
import router from './router';
import store from './store';
import bootstrap from './bootstrap';

import './scss/main.scss';

createApp(App)
    .use(router)
    .use(store)
    .use(bootstrap)
    .mount('#app');
