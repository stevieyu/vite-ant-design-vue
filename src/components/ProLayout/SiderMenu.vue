<template>
  <a-layout-sider class="h-screen flex flex-col" :collapsed="collapsed" :trigger="null" collapsible>
    <div class="flex-none flex items-center justify-center h-16">
      <router-link to='/'>
        <img v-if="logo" :src="logo" alt="logo" />
        <h1 class="text-white">{{title}}</h1>
      </router-link>
    </div>
    <BaseMenu :menus="menus" :collapsed="collapsed" class="flex-auto overflow-y-auto" />
  </a-layout-sider>
</template>

<script>
import BaseMenu from './BaseMenu.vue';

export default {
  components: {
    BaseMenu,
  },
  props: ['menus', 'collapsed'],
  data() {
    return {
      selectedKeys: ['1'],
      logo: '',
      title: '',
    };
  },
};
</script>

