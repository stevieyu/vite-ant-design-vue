<script setup>
import { RouterView, useRoute } from 'vue-router'
import { ConfigProvider as AConfigProvider } from 'ant-design-vue'

import BasicLayout from './components/BasicLayout.vue'
import locale from './utils/antdvLocale'

const route = useRoute()

const showLayout = $computed(() => {
  let show = false

  const paths = [
    '/login',
    '/amis',
  ]

  const fullPath = route.fullPath
  for (const path of paths) {
    show = !fullPath.includes(path)
    if (!show)
      break
  }
  return show
})
</script>

<template>
  <AConfigProvider :locale="locale">
    <RouterView v-if="!showLayout" />
    <BasicLayout v-else>
      <RouterView />
    </BasicLayout>
  </AConfigProvider>
</template>

<style>
.rich-text img{
  cursor: pointer;
}
</style>
