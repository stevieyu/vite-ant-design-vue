<template>
<a-menu :mode="mode" :theme="theme" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" >
  <template v-for="menu in menuItems">
    <a-menu-item :key="menu.fullPath" v-if="!menu.children?.length">
      <router-link :to="menu.fullPath">
        <MenuOutlined /><span>{{menu.meta.title}}</span>
      </router-link>
    </a-menu-item>
    <a-sub-menu :key="menu.fullPath" v-else>
      <template v-slot:title>
        <MenuOutlined /><span>{{menu.meta.title}}</span>
      </template>
      <a-menu-item v-for="cMenu in menu.children" :key="cMenu.fullPath">
        <router-link :to="cMenu.fullPath">
          {{ cMenu.meta.title }}
        </router-link>
      </a-menu-item>
    </a-sub-menu>
  </template>
</a-menu>
</template>

<script>
import {MenuOutlined} from '@ant-design/icons-vue';
import Types from 'vue-types';
import {debounce, cloneDeep} from 'lodash-es';
export const BaseMenuProps = {
  menus: Types.array,
  theme: Types.string.def('dark'),
  mode: Types.string.def('inline'),
  collapsed: Types.bool.def(false),
  i18nRender: Types.oneOfType([Types.func, Types.bool]).def(false),
};

export default {
  components: {
    MenuOutlined,
  },
  props: BaseMenuProps,
  name: 'BaseMenu',
  data() {
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: [],
      matchedMenuItems: [],
    };
  },
  computed: {
    menuItems() {
      const fn = (arr, parent = null) => arr
          .map((i) => ({
            path: i.path,
            meta: {
              title: i.title,
            },
            children: i.children,
          }))
          .filter((i) => i.meta && !i.hidden)
          .map((i) => {
            i.fullPath = [];
            if (parent) i.fullPath.push(parent.fullPath);
            i.fullPath.push(i.path);
            i.fullPath = i.fullPath.filter(Boolean).join('/').replace(`\/\/`, '');

            if (i.children?.length) {
              i.children = fn(i.children, i);
            }

            return i;
          });

      return fn(this.menus);
    },
  },
  watch: {
    '$route'(val) {
      this.debounceUpdateMenu();
    },
    collapsed(val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys.concat();
        this.openKeys = [];
      } else {
        this.openKeys = this.cachedOpenKeys;
      }
    },
  },
  mounted() {
  },
  methods: {
    debounceUpdateMenu: debounce(function() {
      /* eslint-disable */
      this.$nextTick(() => {
        this.handleMatchedMenuItems();
        this.updateMenu();
      })
    }, 1),
    updateMenu() {
      const currentRoute = this.$route
        const { hidden } = currentRoute.meta
      const routes = this.matchedMenuItems;

      if (routes.length >= 3 && hidden) {
        routes.pop()
        this.selectedKeys = [routes[routes.length - 1].path]
      } else {
        this.selectedKeys = [routes.pop().fullPath]
      }

      const openKeys = [];
      if (this.mode === 'inline') {
        routes.forEach((item) => {
          item.fullPath && openKeys.push(item.fullPath);
        });
      }

      this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys);
    },
    handleMatchedMenuItems() {
      const pathname = location.pathname

      const items = [];
      const fn = (arr) => {
        const item = arr.find((i) => {
          if (i.children?.length) {
            return fn(i.children);
          }
          return pathname === i.fullPath
        })
        items.push(item)

        return item;
      }
      fn(cloneDeep(this.menuItems))

      this.matchedMenuItems = items.reverse();
    },
  },
};
</script>

