import 'ant-design-vue/dist/antd.min.css';
// import 'ant-design-vue/dist/antd.dark.less';
import {
  Tree,
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
  Tree,
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
