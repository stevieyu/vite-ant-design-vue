import {
  Layout,
  Menu,
  ConfigProvider,
  Dropdown,
  message,
  Button,
  Card,
  Form,
  Input,
} from 'ant-design-vue';

const components = [
  Layout,
  Menu,
  ConfigProvider,
  Dropdown,
  Button,
  Card,
  Form,
  Input,
];

export default {
  install(app) {
    app.config.globalProperties.$message = message;
    components.forEach((component) => {
      app.use(component);
    });
  },
};
