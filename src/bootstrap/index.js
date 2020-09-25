import ky from 'ky';

ky.get('https://httpbin.org/anything/sdadas');

import antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

export default {
  install(app) {
    app.use(antd);
  },
};
