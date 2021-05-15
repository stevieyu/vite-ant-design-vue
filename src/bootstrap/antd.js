import 'ant-design-vue/dist/antd.css';
import {
    Tree,
    Layout,
    Menu,
    ConfigProvider,
    Dropdown,
    message,
    Button,
    Card
} from 'ant-design-vue';

const components = [
    Tree,
    Layout,
    Menu,
    ConfigProvider,
    Dropdown,
    Button,
    Card
]

export default {
    install(app){
        app.config.globalProperties.$message = message;
        components.forEach((component) => {
            app.use(component);
        });
    }
}