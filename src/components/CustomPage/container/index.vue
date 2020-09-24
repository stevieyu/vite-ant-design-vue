<template>
  <static v-if="showStatic" />
  <operate :value="value" v-else>
    <div v-for="item in value.children" :key="item.type" v-is="item.type" :value="item" />
  </operate>
</template>

<script>
import Operate from './operate.vue';
import Static from './static.vue';
import Display from './display.vue';
import Text from '../text/index.vue';
import Media from '../media/index.vue';
export default {
  name: 'Container',
  components: {
    Operate,
    Static,
    Display,
    Text,
    Media,
  },
  props: ['static', 'operate', 'value'],
  computed: {
    showStatic() {
      return ['', true].includes(this.static);
    },
  },
  mounted() {
  },
};
</script>
