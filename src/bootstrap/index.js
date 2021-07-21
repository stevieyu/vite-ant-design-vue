import ky from 'ky';

ky.get('https://httpbin.org/anything/sdadas');

import './offlineNotice';

import router from './router';
import {useRoute} from 'vue-router';

export default {
  install(app) {
    app.use(router);
    app.config.globalProperties.$_append = (pathToAppend) => {
      const path = useRoute().path;
      return path + (path.endsWith('/') ? '' : '/') + pathToAppend;
    };
  },
};
