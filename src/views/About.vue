<template>
  <div class="about">
    <div class="flex items-center">
      <a-button>sdfsdfsdf</a-button>
      <ACalendar :fullscreen="false"/>
    </div>
    <h1>This is an about page</h1>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import {Calendar} from 'ant-design-vue';


export default defineComponent({
  components: {
    [Calendar.name]: Calendar
  }
})
</script>

