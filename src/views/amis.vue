<template>
  <textarea v-model="aJson" class="w-full"/>
  <amis :json="json"/>
</template>

<script>
import amis from '../components/libraries/amis';
export default {
  components: {
    amis,
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
