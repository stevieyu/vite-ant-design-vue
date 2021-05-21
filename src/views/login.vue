<template>
  <a-form ref="formRef" :model="form" :rules="rules">
    <a-form-item ref="phone" label="手机号" name="phone">
      <a-input v-model:value="form.phone" />
    </a-form-item>
    <a-form-item ref="password" label="密码" name="password">
      <a-input type="password" v-model:value="form.password" />
    </a-form-item>
    <a-button @click="onSubmit">提交</a-button>
  </a-form>
</template>
<script>
import {reactive, ref} from 'vue';
export default {
  setup() {
    const form = reactive({
      phone: '',
      password: '',
    });
    const formRef = ref();

    const onSubmit = () => {
      formRef.value.validate()
          .then((res) => {
             console.log(res);
          })
          .catch((err)=>{
            // console.error(err);
          });
    };

    return {
      onSubmit,
      formRef,
      form,
      rules: {
        phone: [
          {
            required: true,
            message: '必须填写手机号',
            trigger: 'blur',
          },
          {
            min: 11,
            max: 11,
            message: '手机号长度不正确',
            trigger: 'blur',
          },
        ], password: [
          {
            required: true,
            message: '密码必须填写',
            trigger: 'blur',
          },
          {
            min: 6,
            message: '至少输入 6 位数',
            trigger: 'blur',
          },
        ],

      },
    };
  },
};
</script>

