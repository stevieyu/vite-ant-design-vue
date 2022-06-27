<template>
  <a-card>
    <a-form class="pb-2">
      <a-input v-model:value="query.name" placeholder="名称关键字"/>
    </a-form>

    <a-table
        size="small"
        :columns="columns"
        :data-source="dataSource && dataSource.data"
        :pagination="pagination"
        :loading="loading"
        @change="onTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === '#'">
          <div class="flex">
            <img :src="record.cover" alt="" class="w-20 mr-2">
            <div class="flex-auto flex flex-col justify-between">
              <div>
                <span class="text-gray-300">{{ record.id }}</span>
                {{ record.name }}
              </div>
              <div>¥{{ record.price }}</div>
            </div>
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
        </template>
      </template>
    </a-table>
  </a-card>
</template>
<script setup>
import {computed, reactive, watch} from 'vue';
import {Table as ATable} from 'ant-design-vue';
import {reqPagination} from '@/utils/useRequest';

const query = reactive({
  name: '',
  withModel: 'superior,grade',
});
watch(query, (val) => run(val));
const {
  data: dataSource,
  loading,
  current,
  pageSize,
  total,
  run,
} = reqPagination('users', query);

const pagination = computed(() => ({
  total: total.value,
  current: current.value,
  pageSize: pageSize.value,
}));
const onTableChange = (pag, filters, sorter) => {
  run({
    per_page: pag.pageSize,
    page: pag?.current,
    sort: {
      [sorter.field]: sorter.order,
    },
    ...filters,
  });
};

const columns = [
  {
    title: '姓名',
    dataIndex: 'full_name',
  },
  {
    title: '身份证',
    dataIndex: 'id_card',
  }, {
    title: '手机号',
    dataIndex: 'phone',
  }, {
    title: '身份等级',
    dataIndex: ['grade', 'name'],
  }, {
    title: '上级id',
    dataIndex: 'pid',
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
];
</script>
