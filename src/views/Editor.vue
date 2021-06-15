<template>
  <a-card class="m-4">
    <div class="flex">
      <div class="w-64" @click="onClick">{{ content }}</div>
      <editor v-model="content" class="flex-auto"/>
    </div>
  </a-card>

</template>

<script>

import Editor from '../components/libraries/Editor';
export default {
  components: {
    Editor,
  },
  data() {
    return {
      content: {},
    };
  },
  methods: {
    onClick() {
      this.content = {'time': 1623749403342, 'blocks': [{'id': 'XekISS4gWk', 'type': 'paragraph', 'data': {'text': 's'}}, {'id': '6wJA0Cc0l0', 'type': 'paragraph', 'data': {'text': '是，马达'}}], 'version': '2.22.0'};
    },
  },
};
</script>
