<template>
  <pro-layout
      v-model:collapsed="baseState.collapsed"
      v-model:selectedKeys="baseState.selectedKeys"
      v-model:openKeys="baseState.openKeys"
      v-bind="state"
      :loading="loading"
      :breadcrumb="{ routes: breadcrumb }"
      iconfont-url="//at.alicdn.com/t/font_2804900_nzigh7z84gc.js"
  >
    <template #menuHeaderRender>
      <h1>{{ watermarkContent }}</h1>
    </template>
    <!-- custom collapsed button -->
    <template #collapsedButtonRender="collapsed">
      <MenuUnfoldOutlined v-if="collapsed" />
      <MenuFoldOutlined v-else />
    </template>
    <!-- custom right-content -->
    <template #rightContentRender>
      <div style="margin-right: 12px">
        <a-avatar shape="square" size="small">
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
      </div>
    </template>
    <!-- custom breadcrumb itemRender  -->
    <template #breadcrumbRender="{ route, params, routes }">
      <span v-if="routes.indexOf(route) === routes.length - 1">{{ route.breadcrumbName }}</span>
      <router-link v-else :to="{ path: route.path, params }">
        {{ route.breadcrumbName }}
      </router-link>
    </template>

    <!-- content begin -->
    <router-view v-slot="{ Component }">
      <WaterMark :content="watermarkContent">
        <component :is="Component" />
      </WaterMark>
    </router-view>
  </pro-layout>
</template>

<script>
import {computed, defineComponent, reactive, ref, watchEffect, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {Avatar} from 'ant-design-vue';
import {getMenuData, clearMenuItem, WaterMark} from '@ant-design-vue/pro-layout';
import {getMenus} from '@/mock/menus';

export default defineComponent({
  name: 'BasicLayout',
  components: {
    WaterMark,
    [Avatar.name]: Avatar,
  },
  setup() {
    const loading = ref(false);
    const watermarkContent = import.meta.env.VITE_TITLE || '';
    const router = useRouter();

    const {menuData} = getMenuData([{
      path: '/',
      children: clearMenuItem(getMenus(router.getRoutes())),
    }]);

    const baseState = reactive({
      selectedKeys: [],
      openKeys: [],
      // default
      collapsed: false,
    });
    const state = reactive({
      menuData,
      splitMenus: true,
      // title: 'ProLayout',
      // logo: 'https://alicdn.antdv.com/v2/assets/logo.1ef800a8.svg',
      navTheme: 'dark',
      layout: 'side',
      fixSiderbar: true,
      fixedHeader: true,
    });
    const breadcrumb = computed(() =>
      router.currentRoute.value.matched.concat().map((item) => {
        return {
          path: item.path,
          breadcrumbName: item.meta.title || '',
        };
      }),
    );
    const handleCollapsed = () => {
      baseState.collapsed = !baseState.collapsed;
    };
    watchEffect(() => {
      if (router.currentRoute) {
        const matched = router.currentRoute.value.matched.concat();
        baseState.selectedKeys = matched.filter((r) => r.name !== 'index').map((r) => r.path);
        baseState.openKeys = matched.filter((r) => r.path !== router.currentRoute.value.path).map((r) => r.path);
      }
    });

    function handlePageLoadingClick() {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 2000);
    }

    onMounted(() => {
    });
    return {
      watermarkContent,
      baseState,
      state,
      loading,
      breadcrumb,
      handlePageLoadingClick,
      handleCollapsed,
    };
  },
});
</script>
