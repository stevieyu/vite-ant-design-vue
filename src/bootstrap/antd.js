/**
 * https://next.antdv.com/docs/vue/introduce-cn/
 */
import {
  Button,
  Card,
  ConfigProvider,
  Dropdown,
  Form,
  Input,
  Layout,
  Menu,
  Modal,
  Spin,
  message,
} from 'ant-design-vue'

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
]

export default {
  install(app) {
    const $msg = message
    $msg.confirm = Modal.confirm
    app.config.globalProperties.$msg = window.$msg = $msg

    components.forEach((component) => {
      app.use(component)
    })
  },
}
