<template>
<a-card class="m-4">
  <div class="flex">
    <div class="flex-1">{{ content }}</div>
    <froala v-model="content" class="flex-2" />
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
      content: '',
    };
  },
};
</script>
