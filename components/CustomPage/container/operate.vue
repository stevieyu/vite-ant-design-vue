<template>
  <sortable class="p-4 border border-blue-500" :options="sortableOps" :value="value" u="2">
    <slot />
  </sortable>
</template>

<script>
import sortable from '../sortable.vue'
export default {
  props: ['value'],
  components:{
    sortable
  },
  data(){
    return {
      sortableOps: {
        sort: true,
        animation: 150,
        // handle: '.drag-handle',
        group: {
          name: 'advanced',
          pull: false,
          put: true,
        },
      },
    }
  }
}
</script>
