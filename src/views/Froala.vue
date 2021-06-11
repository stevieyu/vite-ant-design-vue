<template>
<a-card class="m-4">
  <div class="flex">
    <div class="w-32">{{ content }}</div>
    <froala v-model="content" class="flex-auto" />
  </div>
</a-card>
</template>

<script>
import Froala from '@/components/libraries/Froala';
export default {
  components: {
    Froala,
  },
  data() {
    return {
      content: '<p>wdwqdwqdwqdqwddqd</p><p>dwdwdwdwdwd</p>',
    };
  },
};
</script>
