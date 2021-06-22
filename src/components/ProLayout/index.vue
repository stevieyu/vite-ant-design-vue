<template>
  <a-config-provider :locale="locale">
    <a-layout class="pro-layout">
      <SiderMenuWrapper :menus="menus" :collapsed="collapsed" class="shadow"/>
      <a-layout class="max-h-screen">
        <Header v-model:collapsed="collapsed" />
        <a-layout-content class="overflow-y-auto">
          <slot />
        </a-layout-content>
        <a-layout-footer class="py-1 px-2 text-gray-300">
          ©2021 Created by XXX
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>
<script>
import SiderMenuWrapper from './SiderMenuWrapper.vue';
import Header from './Header.vue';

import locale from 'ant-design-vue/es/locale/zh_CN';

// import 'moment/dist/locale/zh-cn'
import '/src/utils/dayjsInit';

export default {
  components: {
    SiderMenuWrapper,
    Header,
  },
  props: ['menus'],
  data() {
    return {
      locale,
      collapsed: false,
    };
  },
};
</script>
