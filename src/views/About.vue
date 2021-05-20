<template>
  <div class="about">
    <div class="flex items-center">
      <a-button>sdfsdfsdf</a-button>
      <ACalendar :fullscreen="false"/>
      <a-date-picker v-model:value="date"/>
    </div>
    <h1>This is an about page</h1>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import {Calendar, DatePicker} from 'ant-design-vue';
import dayjs from 'dayjs';

export default defineComponent({
  components: {
    [Calendar.name]: Calendar,
    [DatePicker.name]: DatePicker,
  },
  data() {
    return {
      date: dayjs('2020-01-12'),
    };
  },
});
</script>

