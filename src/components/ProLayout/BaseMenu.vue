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
import stringSimilarity from 'string-similarity';

const {compareTwoStrings} = stringSimilarity;

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
          .filter((i) => i.title && !i.hidden)
          .map((i) => ({
            path: i.path,
            meta: {
              title: i.title,
            },
            children: i.children,
          }))
          .map((i) => {
            i.fullPath = [];
            if (parent) i.fullPath.push(parent.fullPath);
            i.fullPath.push(i.path);
            i.fullPath = i.fullPath.filter(Boolean).join('/').replace(`//`, '');

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
      /* eslint-enable */
    }, 1),
    updateMenu() {
      const currentRoute = this.$route;
      const {hidden} = currentRoute.meta;
      const routes = this.matchedMenuItems;

      if (routes.length >= 3 && hidden) {
        routes.pop();
        this.selectedKeys = [routes[routes.length - 1].fullPath];
      } else if (routes.length) {
        this.selectedKeys = [routes.pop().fullPath];
      }

      const openKeys = [];
      if (this.mode === 'inline') {
        routes.forEach((item) => {
          item.fullPath && openKeys.push(item.fullPath);
        });
      }

      if (openKeys.length) {
        this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys);
      }
    },
    handleMatchedMenuItems() {
      const pathname = location.pathname;

      const items = [];
      const fn = (arr, pPaths = []) => {
        const item = arr.find((i) => {
          const fullPath = [...pPaths, i.path].filter((i) => Boolean(i) && i !== '/');
          i.fullPath = fullPath.join('/') || '/';
          i.match = compareTwoStrings(pathname, i.fullPath+'/');
          if (i.children?.length) {
            const children = cloneDeep(fn(i.children, fullPath));
            delete i.children;
            if (!children && pathname.includes(i.fullPath)) {
              items.push(i);
            }
            return children;
          } else if (pathname.includes(i.fullPath) && i.match > 0.7) {
            items.push(i);
          }
          delete i.children;

          return pathname === i.fullPath;
        });
        if (item) items.push(item);

        return item;
      };
      fn(cloneDeep(this.menus));
      this.matchedMenuItems = items.reverse().sort((a, b) => a.match - b.match);
    },
  },
};
</script>

