<template>
  <div class="about">
    <div class="flex items-center">
      <a-button>sdfsdfsdf</a-button>
      <a-calendar :fullscreen="false"/>
      <a-date-picker v-model:value="date"/>
    </div>
    <h1>This is an about page</h1>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import dayjs from 'dayjs';

export default defineComponent({
  components: {
  },
  data() {
    return {
      date: dayjs('2020-01-12'),
    };
  },
});
</script>

