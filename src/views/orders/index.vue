<template>
  <a-card>
    <a-form class="pb-2">
<!--      <a-input v-model:value="form.name" placeholder="名称关键字"/>-->
    </a-form>

    <a-table
        size="small"
        :columns="columns"
        :data-source="dataSource && dataSource.data"
        :pagination="pagination"
        :loading="loading"
        @change="onTableChange"
    >
      <template #bodyCell="{ column, record, record:{receipt, ship} = {} }">
        <template v-if="column.key === '#'">
          <div>ID: {{ record.id }}</div>
          <div>总计: {{ record.total }}</div>
          <v-tag>{{ status[record.status] }}</v-tag>
        </template>
        <template v-if="column.key === 'remark'">
          <div v-html="record.remark" class="rich-text w-16"></div>
        </template>
        <template v-if="column.key === 'receipt'">
          <div>{{ receipt.name }} {{ receipt.phone }}</div>
          <div>
            {{ receipt.city }}
            {{ receipt.province }}
            {{ receipt.area }}<br/>
            {{ receipt.detail }}<br/>
            {{ receipt.postal }}
          </div>
        </template>
        <template v-if="column.key === 'ship' && ship">
          <div>
            {{ship.name}}<br/>
            {{ship.number}}
          </div>
        </template>
        <template v-if="column.key === 'items'">
          <div class="flex" v-for="item in record.items" :key="item.id">
            <img :src="item.cover" alt="" class="w-16 mr-2">
            <div class="flex-auto flex flex-col justify-between">
              <div>
                <span class="text-gray-300">{{ item.product_id }}</span>
                {{ item.name }}
              </div>
              <div>¥{{ item.price }} x {{ item.quantity }}</div>
            </div>
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-button size="small" v-if="record.status === 'paying'" @click="onChangeStatus('shipping', record)">
            通过
          </a-button>
          <a-button size="small" v-if="record.status === 'paying'" @click="onChangeStatus('close', record)">
            拒绝
          </a-button>
          <a-button size="small" v-if="record.status === 'shipping'" @click="onShip(record)">
            发货
          </a-button>
          <a-button size="small" v-if="record.status === 'shipped'" @click="onShip(record)">
            修改发货
          </a-button>
        </template>
      </template>
    </a-table>
  </a-card>
  <order-ship v-model:order="shipOrder" />
</template>
<script setup>
import {computed, reactive, ref, watch} from 'vue';
import {Table as ATable, Tag as VTag} from 'ant-design-vue';
import {reqPagination} from '@/utils/useRequest';
import OrderShip from '@/components/modals/orderShip.vue';

const query = reactive({
  name: '',
  withModel: 'items,receipt,ship',
});
watch(query, (val) => run(val));

const {
  data: dataSource,
  loading,
  current,
  pageSize,
  total,
  run,
} = reqPagination('orders', query);

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

const status = {
  paying: '待审核',
  shipping: '审核成功',
  shipped: '已发货',
  close: '审核失败',
};

const onChangeStatus = async (st, row) => {
  $msg.confirm({
    content: `确认${status[st]}操作?`,
    onOk() {
      $api.put(`orders/${row.id}`, {json: {status: st}}).json()
          .then(() => {
            run();
          });
    },
  });
};

const shipOrder = ref(null);
const onShip = (row) => (shipOrder.value = row);
watch(shipOrder, (val) => !val && run());

const columns = [
  {
    title: '#',
    key: '#',
  },
  {
    title: '转账凭证',
    key: 'remark',
  },
  {
    title: '收货地址',
    key: 'receipt',
  },
  {
    title: '发货信息',
    key: 'ship',
  },
  {
    title: '产品',
    key: 'items',
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
