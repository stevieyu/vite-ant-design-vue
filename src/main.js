import {createApp} from 'vue';
import store from './store';
import bootstrap from './bootstrap';
import App from './App.vue';

import './scss/main.scss';

createApp(App)
    .use(store)
    .use(bootstrap)
    .mount('#app');
