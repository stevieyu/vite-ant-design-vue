<template>
<div>single user {{ fId }}</div>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    fId() {
      return ~~this.id;
    },
  },
  mounted() {
  },
};
</script>

<style scoped>

</style>
