<template>
  <a-spin tip="Loading..." :spinning="spinning">
    <iframe :src="src" style="border: none;width: 100vw;height: 100vh;" ref="amisIframe"></iframe>
    <a-modal v-model:visible="modal.visible" title="基本信息" @ok="modalSave">
      <a-form :model="modal.form" autocomplete="off" ref="modalForm">
        <a-form-item label="名称" name="name" :rules="[{ required: true, message: '请填写名称!' }]">
          <a-input v-model:value="modal.form.name" />
        </a-form-item>
      </a-form>
    </a-modal>
  </a-spin>
</template>

<script setup>
import {onMounted, onBeforeUnmount, toRaw} from 'vue';
import {useRoute} from 'vue-router';
import messageEventListener from '../utils/messageEventListener';
import crud, {gppd} from '../utils/crud';

const src = `http://localhost:3000/?event_name=iframe-message`;
// const src = `http://amis-editor.surge.stevie.top/?event_name=iframe-message`;

const pagesCrud = crud('pages');
const route = useRoute();

let spinning = $ref(true);

const modalForm = $ref(null);
const modal = $ref({
  refForm: null,
  visible: false,
  formId: route.query.id || '',
  form: {
    name: '',
    data: null,
  },
});
const modalSave = async () => {
  if (!modal.visible) {
    modal.visible = true;
    return;
  }
  spinning = true;
  await modalForm.validate();
  const res = await pagesCrud.updateOrCreate(modal.formId, modal.form);

  const nav = await gppd.get('nav');
  if (!modal.formId) {
    nav.links.splice(0, 0, {
      label: res.name,
      id: res.id,
    });
  } else {
    //
  }

  await gppd.post('nav', nav);

  history.back();

  spinning = false;
};
const fetchPage = async () => {
  if (!modal.formId) return;
  const page = await pagesCrud.get(modal.formId);
  for (const k of Object.keys(modal.form)) {
    modal.form[k] = page[k] || '';
  }
};

const im = messageEventListener('iframe-message');

/**
 *
 * @type {RefValue<UnwrapRef<unknown>>|HTMLIFrameElement}
 */
const amisIframe = $ref(null);
onMounted(async () => {
  await Promise.all([
    new Promise((resolve) => amisIframe.onload = resolve),
    fetchPage(),
  ]);
  spinning = false;

  im.on((data) => {
    const {ac, value} = data;
    if (ac === 'save') {
      modal.form.data = value;
      modalSave();
    } else if (ac === 'cancel') {
      history.back();
    }
  });
  if (modal.form.data) {
    im.emit(toRaw(modal.form.data), amisIframe);
  }
});
onBeforeUnmount(() => {
  im.off();
});

</script>
