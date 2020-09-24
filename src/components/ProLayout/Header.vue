<template>
  <a-layout-header class="shadow p-0 flex justify-between">
    <div class="px-6 cursor-pointer" @click="onClickMenuIco">
      <menu-unfold-outlined v-if="collapsed"/>
      <menu-fold-outlined v-else  />
    </div>
    <a-dropdown class="mx-4">
      <div class="hover:bg-gray-100 cursor-pointer text-center px-4">nick name</div>
      <template v-slot:overlay>
        <a-menu>
          <a-menu-divider />
          <a-menu-item @click="logout">
            <LogoutOutlined /><span>退出登录</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-layout-header>
</template>

<script>
import {MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined} from '@ant-design/icons-vue';
export default {
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LogoutOutlined,
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    onClickMenuIco() {
      this.$emit('update:collapsed', !this.collapsed);
    },
    logout() {
      this.$message.info('logout');
    },
  },
};
</script>

