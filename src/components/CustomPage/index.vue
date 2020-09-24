<template>
  <div class="flex">
    <div class="w-48 flex-none">
      <sortable class="flex flex-wrap -m-1" :options="sortableOps" :value="widgets" u="1">
        <div v-for="item in widgets" :key="item.type" v-is="item.type" static class="m-2"/>
      </sortable>
    </div>
    <Container class="list-group nested-sortable flex-auto" :value="data"/>
  </div>
</template>
<script>
import Container from './container/index.vue';
import Text from './text/index.vue';
import Media from './media/index.vue';
import sortable from './sortable.js';

export default {
  components: {
    Container,
    Text,
    Media,
    sortable,
  },
  data() {
    return {
      sortableOps: {
        sort: false,
        animation: 150,
        group: {
          name: 'advanced',
          pull: 'clone',
          put: false,
        },
      },
      widgets: [
        {
          type: 'container',
          children: [],
        },
        {
          type: 'text',
        },
        {
          type: 'media',
        },
      ],
      data: {
        children: [
          {
            type: 'container',
            children: [
              {
                type: 'text',
                val: '2xxxx',
              },
            ],
          },
          {
            type: 'text',
            val: 'xxxx',
          },
        ],
      },
    };
  },
  mounted() {
  },
  methods: {
  },
};
</script>
<style lang="scss">
.list-group-item {
  position: relative;
  display: block;
  padding: .75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,.125);
}
.nested-1 {
  background-color: #e6e6e6;
}
.nested-2 {
  background-color: #cccccc;
}
.nested-3 {
  background-color: #b3b3b3;
}
</style>
