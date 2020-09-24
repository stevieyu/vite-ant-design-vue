<template>
  <SiderMenu :menus="menus" :collapsed="collapsed"/>
</template>

<script>
import SiderMenu from './SiderMenu.vue';
import {ref} from 'vue';

export default {
  components: {
    SiderMenu,
  },
  props: ['menus', 'collapsed'],
  setup() {
    const visible = ref(true);

    return {
      visible,
      placement: 'left',
      onClose: () => {
        visible.value = true;
      },
    };
  },
};
</script>

<style scoped>

</style>
