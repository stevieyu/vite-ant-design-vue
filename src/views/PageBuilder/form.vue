<template>
<PageBuilder :value="val" />
</template>

<script>
import PageBuilder from '/src/components/PageBuilder/index.vue';
export default {
  components: {
    PageBuilder,
  },
  setup() {
    return {
      val: {
        name: '页面',
        type: 'container',
        attrs: {
          style: {},

        },
        children: [

        ],
      },
    };
  },
};
</script>
