<template>
  <router-view v-if="isAuthPage"/>
    <pro-layout v-else :menus="menus">
      <router-view />
    </pro-layout>
</template>
<script>
import ProLayout from './components/ProLayout/index.vue';
import menus from './mock/menus';

import {useRoute} from 'vue-router';
import {watch, ref} from 'vue';

export default {
  components: {
    ProLayout,
  },
  setup() {
    const route = useRoute();

    const isAuthPage = ref(true);
    watch(route, () => {
      isAuthPage.value = route.fullPath.includes('/login');
    });

    return {
      menus,
      isAuthPage,
    };
  },
};
</script>
