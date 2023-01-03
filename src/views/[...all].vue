<script setup>
import { useRoute } from 'vue-router'
import AmisRender from '../components/libraries/AmisRender.vue'
import crud from '@/utils/crud'

const route = useRoute()
let spinning = $ref(false)

let schema = $ref(null)
const fetchData = async () => {
  if (!route.query.id) {
    schema = {
      type: 'page',
      title: '404',
    }
    return
  }
  spinning = true

  const res = await crud('pages').get(route.query.id)
  schema = res.data
  spinning = false
}
fetchData()
</script>

<template>
  <a-spin tip="Loading..." :spinning="spinning" class="w-full">
    <AmisRender v-if="schema" :schema="schema" />
  </a-spin>
</template>
