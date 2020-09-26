<template>
  <router-view v-if="isAuth"/>
  <ProLayout :menus="menus" v-else>
    <router-view class="p-4"/>
  </ProLayout>
</template>
<script setup>
export {default as ProLayout} from '/src/components/ProLayout/index.vue';
export {default as menus} from './router/menus';

import {useRoute} from 'vue-router';
import {computed} from 'vue';

const route = useRoute();

const isAuth = computed(() => route.fullPath.includes('/login'));

export {
  isAuth,
};
</script>
