import {Plugin} from "vite";

interface Options {
}

declare function createPlugin(userOptions?: Options): Plugin;

export default createPlugin;
export { Options };