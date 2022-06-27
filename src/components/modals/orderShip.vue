<template>
  <a-modal v-model:visible="visible" title="发货" @ok="onSubmit" @cancel="onClose">
    <a-form ref="modalFormRef" :model="form" layout="vertical">
      <a-form-item name="name" label="快递名" :rules="[{ required: true }]">
        <a-input v-model:value="form.name" />
      </a-form-item>
      <a-form-item name="number" label="快递单号" :rules="[{ required: true }]">
        <a-input v-model:value="form.number" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import {
  Modal as AModal,
} from 'ant-design-vue';
import {computed, reactive, ref, watch} from 'vue';

const props = defineProps({
  order: {
    type: Object,
    default: null,
  },
});
const emit = defineEmits(['update:order']);

const modalFormRef = ref();
const form = reactive({
  name: '',
  number: '',
});

const order = computed(() => props.order);
watch(order, (val) => {
  if (modalFormRef.value) modalFormRef.value.resetFields();
  if (!val || !val.ship) return;
  const ship = val.ship;
  for (const key of Object.keys(form)) {
    form[key] = ship[key];
  }
});

const visible = computed({
  get() {
    return !!order.value;
  },
  set(val) {
    if (val) return;
    emit('update:order', null);
  },
});

const onSubmit = () => {
  modalFormRef.value.validateFields().then(() => {
    const {id} = order.value;
    $api.put(`orders/${id}`, {json: {ship: form}}).then(() => {
      onClose();
    });
  });
};

const onClose = () => (visible.value = false);
</script>
