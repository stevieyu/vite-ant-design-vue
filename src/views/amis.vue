<template>
  <textarea v-model="aJson" class="w-full"/>
  <LibAmis :json="json"/>
</template>

<script>
import LibAmis from '../components/libraries/LibAmis';
export default {
  components: {
    LibAmis,
  },
  data() {
    return {
      json: {
        type: 'page',
        title: '表单页面',
        body: {
          type: 'form',
          mode: 'horizontal',
          api: '/saveForm',
          controls: [
            {
              label: 'Name',
              type: 'text',
              name: 'name',
            },
            {
              label: 'Email',
              type: 'email',
              name: 'email',
            },
          ],
        },
      },
    };
  },
  computed: {
    aJson: {
      get() {
        return JSON.stringify(this.json);
      },
      set(val) {
        try {
          this.json = JSON.parse(val);
        } catch (e) {
          //
        }
      },
    },
  },
};
</script>
