<script setup>
import { computed, reactive, watch } from 'vue'
import { Table as ATable } from 'ant-design-vue'
import { reqDelete, reqPagination } from '@/utils/useRequest'

const {
  data: dataSource,
  loading,
  current,
  pageSize,
  total,
  run,
} = reqPagination('products')

const pagination = computed(() => ({
  total: total.value,
  current: current.value,
  pageSize: pageSize.value,
}))

const onTableChange = (pag, filters, sorter) => {
  run({
    per_page: pag.pageSize,
    page: pag?.current,
    sort: {
      [sorter.field]: sorter.order,
    },
    ...filters,
  })
}

const query = reactive({
  name: '',
})
watch(query, val => run(val))

const onDelete = async (id) => {
  $msg.confirm({
    content: '确认删除',
    onOk() {
      const { loading, error } = reqDelete(`products/${id}`)

      watch(loading, () => {
        if (error.value)
          return $msg.error('删除失败')
        run()
      })
    },
  })
}

const columns = [
  {
    title: '#',
    key: '#',
  },
  {
    title: '修改时间',
    dataIndex: 'updated_at',
    width: '120px',
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    width: '120px',
  },
  {
    title: '操作',
    key: 'action',
    width: '120px',
  },
]
</script>

<template>
  <a-card>
    <a-form class="pb-2">
      <a-input v-model:value="query.name" placeholder="名称关键字" />
    </a-form>

    <ATable
      size="small"
      :columns="columns"
      :data-source="dataSource && dataSource.data"
      :pagination="pagination"
      :loading="loading"
      @change="onTableChange"
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'action'">
          操作
          <router-link :to="$_append('add')">
            <a-button size="small">
              添加
            </a-button>
          </router-link>
        </template>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === '#'">
          <div class="flex">
            <div class="h-16 w-20 mr-2">
              <img :src="record.cover" alt="" class="max-w-full max-h-full">
            </div>
            <div class="flex-auto flex flex-col justify-between">
              <div>
                <span class="text-gray-300">{{ record.id }}:</span>
                {{ record.name }}
              </div>
              <div>
                ¥{{ record.price }}
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
          <router-link :to="$_append(record.id)">
            <a-button size="small">
              编辑
            </a-button>
          </router-link>
          <a-button type="link" size="small" @click="onDelete(record.id)">
            删除
          </a-button>
        </template>
      </template>
    </ATable>
  </a-card>
</template>
