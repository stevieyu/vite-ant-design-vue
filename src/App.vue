<template>
  <div class="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
<script setup>
import momentDefineLocaleZhCn from './utils/momentDefineLocaleZhCn'
momentDefineLocaleZhCn();

import zhCN from 'ant-design-vue/es/locale/zh_CN';
export const locale = zhCN
</script>
<style lang="scss">
//@tailwind base;
@tailwind utilities;
//@tailwind components;


.nav {
  padding: 30px;
  text-align: center;
}

.nav a {
  font-weight: bold;
  color: #2c3e50;
}

.nav a.router-link-exact-active {
  color: #42b983;
}
</style>
