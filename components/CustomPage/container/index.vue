<template>
  <static v-if="showStatic" />
  <operate :value="value" v-else>
    <template v-for="item in value" :key="item.type">
      <Container v-if="item.type === 'container'" :value="item.children"/>
      <Text v-if="item.type === 'text'"/>
      <Media v-if="item.type === 'media'"/>
    </template>
  </operate>
</template>

<script>
import Operate from './operate.vue'
import Static from './static.vue'
import Display from './display.vue'
import Text from '../text/index.vue'
import Media from '../media/index.vue'
export default {
  name: 'Container',
  components:{
    Operate,
    Static,
    Display,
    Text,
    Media
  },
  props: ['static', 'operate', 'value'],
  computed: {
    showStatic(){
      return ['', true].includes(this.static);
    },
  },
  mounted() {
  },
}
</script>
