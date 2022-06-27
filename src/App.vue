<template>
  <a-config-provider :locale="locale">
  <router-view v-if="!showLayout"/>
  <basic-layout v-else>
    <router-view />
  </basic-layout>
  </a-config-provider>
</template>
<script setup>
import BasicLayout from './components/BasicLayout.vue';
import {RouterView} from 'vue-router';
import {ConfigProvider as AConfigProvider} from 'ant-design-vue';

import {useRoute} from 'vue-router';
import locale from './utils/antdvLocale';

const route = useRoute();

const showLayout = $computed(() => {
  let show = false;

  const paths = [
    '/login',
    '/amis',
  ];

  const fullPath = route.fullPath;
  for (const path of paths) {
    show = !fullPath.includes(path);
    if (!show) break;
  }
  return show;
});

</script>
<style>
.rich-text img{
  cursor: pointer;
}
</style>
