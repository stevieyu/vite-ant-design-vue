import {createApp} from 'vue';
import bootstrap, {isReady} from './bootstrap';
import App from './App.vue';

import 'uno.css';

const app = createApp(App).use(bootstrap);
isReady().then(() => app.mount('#app'));

