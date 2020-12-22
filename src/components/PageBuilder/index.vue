<template>
<div class="flex shadow bg-white m-2">
  <navigation class="flex-1" :value="value">层级</navigation>
  <div class="flex-1">属性</div>
  <div class="flex-1">预览</div>
</div>
</template>

<script>
import navigation from './navigation.vue';
import Types from 'vue-types';

export default {
  components: {
    navigation,
  },
  props: {
    value: Types.object.def({}),
  },
};
</script>
