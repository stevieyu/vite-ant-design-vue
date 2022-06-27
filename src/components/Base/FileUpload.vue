<script>
import FileUpload from '@/utils/FileUpload';

import FileSelect from './FileSelect.vue';

export default {
  props: {
    dir: {
      type: String,
      default: 'temp',
    },
  },
  extends: FileSelect,
  created() {
    const d = new Date();
    let m = d.getMonth() + 1;
    if (m < 10) m = '0' + m;
    this.fu = new FileUpload();
  },
  methods: {
    async filesHandle(files) {
      this.loading = true;

      try {
        files = await Promise.all(files.map((file) => this.fu.uploadFile(file)));
        this.loading = false;
      } catch (e) {
        alert('上传失败:' + JSON.stringify(e));
        this.loading = false;
        return;
      }

      if (this.multiple) {
        this.$emit('update:modelValue', files);
      } else {
        this.$emit('update:modelValue', files[0]);
      }
    },
  },
};
</script>
