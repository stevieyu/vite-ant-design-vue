<template>
  <a-card class="m-4">
    <a-table :dataSource="dataSource" :columns="columns" />
  </a-card>
</template>
<script>
import {Table} from 'ant-design-vue'
export default {
  components:{
    [Table.name]:Table
  },
  setup() {
    return {
      dataSource: [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
      ],

      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '住址',
          dataIndex: 'address',
          key: 'address',
        },
      ],
    };
  },
};
</script>
