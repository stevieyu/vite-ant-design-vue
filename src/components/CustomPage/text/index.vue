<template>
  <static v-if="showStatic" />
  <div v-else>
    <operate>
      <slot />
    </operate>
  </div>
</template>

<script>
import Operate from './operate.vue';
import Static from './static.vue';
export default {
  components: {
    Operate,
    Static,
  },
  props: ['static'],
  computed: {
    showStatic() {
      return this.static !== undefined;
    },
  },
  mounted() {
  },
};
</script>
