/**
 * https://next.antdv.com/docs/vue/introduce-cn/
 */
import {
  Layout,
  Menu,
  ConfigProvider,
  Dropdown,
  message,
  Modal,
  Button,
  Card,
  Form,
  Spin,
  Input,
} from 'ant-design-vue';

const components = [
  Layout,
  Menu,
  ConfigProvider,
  Dropdown,
  Button,
  Modal,
  Card,
  Form,
  Spin,
  Input,
];

export default {
  install(app) {
    const $msg = message;
    $msg.confirm = Modal.confirm;
    app.config.globalProperties.$msg = window.$msg = $msg;

    components.forEach((component) => {
      app.use(component);
    });
  },
};
