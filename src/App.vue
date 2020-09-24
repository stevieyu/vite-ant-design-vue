<template>
  <ProLayout :menus="menus">
    <div class="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </ProLayout>
</template>
<script>
import ProLayout from '/src/components/ProLayout/index.vue';
import menus from './router/menus';

export default {
  components: {
    ProLayout,
  },
  setup() {
    return {
      menus,
    };
  },
};
</script>
<style lang="scss">
.nav {
  padding: 30px;
  text-align: center;
}

.nav a {
  font-weight: bold;
  color: #2c3e50;
}

.nav a.router-link-exact-active {
  color: #42b983;
}
</style>
