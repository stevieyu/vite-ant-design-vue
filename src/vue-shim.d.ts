declare module '*.vue' {
    import { defineComponent } from 'vue'
    const Component: ReturnType<typeof defineComponent>
    export default Component
}
// vite-env.d.ts
/// <reference types="vite-plugin-pages/client" />
