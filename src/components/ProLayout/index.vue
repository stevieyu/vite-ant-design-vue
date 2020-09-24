<template>
  <a-config-provider :locale="locale" class="pro-layout">
    <a-layout>
      <SiderMenuWrapper :menus="menus" :collapsed="collapsed" class="shadow"/>
      <a-layout class="max-h-screen">
        <Header v-model:collapsed="collapsed" />
        <a-layout-content class="overflow-y-auto">
          <slot />
        </a-layout-content>
        <a-layout-footer>
          ©2020 Created by XXX
        </a-layout-footer>
      </a-layout>
      </a-layout>
  </a-config-provider>
</template>
<script>
import SiderMenuWrapper from './SiderMenuWrapper.vue';
import Header from './Header.vue';
import locale from 'ant-design-vue/es/locale/zh_CN';

import momentDefineLocaleZhCn from '/src/utils/momentDefineLocaleZhCn';
momentDefineLocaleZhCn();

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
<style lang="scss">
.pro-layout{
  .ant-layout-header{
    background: #fff;
  }
  .ant-layout-footer{
    padding: 12px 24px;
  }
}

</style>
