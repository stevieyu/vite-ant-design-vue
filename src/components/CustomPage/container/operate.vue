<template>
  <sortable class="p-4 border border-blue-500" :options="sortableOps" :value="value.children" u="2">
    <slot />
  </sortable>
</template>

<script>
import sortable from '../sortable.js';
export default {
  props: ['value'],
  components: {
    sortable,
  },
  data() {
    return {
      sortableOps: {
        sort: true,
        animation: 150,
        // handle: '.drag-handle',
        group: {
          name: 'advanced',
          pull: true,
          put: true,
        },
      },
    };
  },
};
</script>
