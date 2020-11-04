import ky from 'ky';

import antd from 'ant-design-vue/es';
import 'ant-design-vue/dist/antd.css';

ky.get('https://httpbin.org/anything/sdadas');

export default {
  install(app) {
    app.use(antd);
  },
};
