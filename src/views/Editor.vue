<template>
  <a-card class="m-4">
    <div class="flex">
      <div class="flex-1">{{ content }}</div>
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
      content: '',
    };
  },
};
</script>
