<script setup>
import { reactive, watch } from 'vue'
import { reqGet } from '@/utils/useRequest'
import Tinymce from '@/components/libraries/Tinymce'
import FileUpload from '@/components/Base/FileUpload.vue'

const props = defineProps(['id'])

const id = ~~props.id

const form = reactive({
  name: '',
  cover: '',
  price: '',
  detail: '',
})
const fetch = (id) => {
  if (!id)
    return
  const { data } = reqGet(`products/${id}`)
  watch(data, (val) => {
    for (const key of Object.keys(form))
      form[key] = val[key]
  })
}
fetch(id)

const onSubmit = () => {
  let p
  if (!id)
    p = $api.post('products', { json: form }).then()
  else
    p = $api.put(`products/${id}`, { json: form }).then()

  p.then(() => {
    history.back()
  })
}
</script>

<template>
  <a-form @submit="onSubmit">
    <a-card>
      <div class="flex justify-between">
        <div class="w-5/12">
          <a-form-item label="名称">
            <a-input v-model:value="form.name" />
          </a-form-item>
          <a-form-item label="主图">
            <FileUpload v-model="form.cover">
              <img :src="form.cover" alt="" class="h-20">
            </FileUpload>
          </a-form-item>
          <a-form-item label="单价">
            <a-input v-model:value="form.price" type="number" />
          </a-form-item>
        </div>
        <div class="w-6/12">
          <a-form-item label="详情">
            <Tinymce v-model="form.detail" />
          </a-form-item>
        </div>
      </div>
    </a-card>
    <div class="sticky bottom-0 bg-white py-2">
      <div class="flex justify-around">
        <a-button @click="$router.back()">
          取消
        </a-button>
        <a-button type="primary" html-type="submit">
          提交
        </a-button>
      </div>
    </div>
  </a-form>
</template>
