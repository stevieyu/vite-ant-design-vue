import 'ant-design-vue/dist/antd.css';
import {
    Tree,
    Layout,
    Menu,
    ConfigProvider,
    Dropdown,
    Button
} from 'ant-design-vue';

const components = [
    Tree,
    Layout,
    Menu,
    ConfigProvider,
    Dropdown,
    Button
]

export default {
    install(app){
        components.forEach((component) => {
            app.use(component);
        });
    }
}