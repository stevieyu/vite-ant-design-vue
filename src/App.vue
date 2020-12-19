<template>
  <router-view v-if="isAuth"/>
  <ProLayout :menus="menus" v-else>
    <router-view class="p-4"/>
  </ProLayout>
</template>
<script>
import ProLayout from '/src/components/ProLayout/index.vue';
import menus from './mock/menus';

import {useRoute} from 'vue-router';
import {watch, ref} from 'vue';

export default {
  components: {
    ProLayout,
  },
  setup() {
    const route = useRoute();

    const isAuth = ref(true);
    watch(route, () => {
      isAuth.value = route.fullPath.includes('/login');
    });

    return {
      menus,
      isAuth,
    };
  },
};
</script>
