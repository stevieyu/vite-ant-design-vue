<template>
  <div class="file-select" @click="click" :loading="loading">
    <UploadOutlined v-if="multiple || (!multiple && !modelValue)"/>
    <slot :urls="filesObjectUrls" />
    <input
      ref="file"
      class="file-input"
      :accept="accept"
      :disabled="disabled"
      :multiple="multiple"
      type="file"
      @change="onChange"
    />
  </div>
</template>

<script>
import {createObjectURL, default as imgHandle} from '@/utils/imgHandle';

export default {
  props: {
    modelValue: {
      type: [String, Array, Object, null],
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: '.jpg,.png,.gif',
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      files: [],
      loading: false,
    };
  },
  computed: {
    filesObjectUrls() {
      const files = this.files.map((i) => createObjectURL(i));

      if (!this.multiple) return files[0] || '';

      return files;
    },
  },
  methods: {
    click(e) {
      if (this.disabled) return;
      this.$refs.file.click();
    },
    async onChange(event) {
      const files = [...event.target.files];
      if (!files.length) return;
      this.$refs.file.value = '';

      for (let [index, file] of new Map( files.map( ( item, i ) => [i, item] ) )) {
        if (!file) continue;
        file = await imgHandle(file, {
          maxWidth: 1000,
          maxHeight: 1000,
        });
        files.splice(index, 1, file);
      }

      this.files = files;

      if ({}.propertyIsEnumerable.call(this, 'filesHandle')) {
        return this.filesHandle(files);
      }
      this.$emit('update:modelValue', this.multiple ? files : files[0] || null);
    },
  },
};
</script>

<style lang="scss">
.file-select {
  display: inline-block;
  cursor: pointer;
  position: relative;

  .file-input {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    padding: 0;
    margin: 0;
    z-index: -1;
    display: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .progress {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);
    color: #000;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
}
</style>
