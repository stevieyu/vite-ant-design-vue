<script>
import FileSelect from './FileSelect.vue'
import FileUpload from '@/utils/FileUpload'

export default {
  extends: FileSelect,
  props: {
    dir: {
      type: String,
      default: 'temp',
    },
  },
  emits: ['update:modelValue'],
  created() {
    const d = new Date()
    let m = d.getMonth() + 1
    if (m < 10)
      m = `0${m}`
    this.fu = new FileUpload()
  },
  methods: {
    async filesHandle(files) {
      this.loading = true

      try {
        files = await Promise.all(files.map(file => this.fu.uploadFile(file)))
        this.loading = false
      }
      catch (e) {
        this.loading = false
        throw new Error(`上传失败:${JSON.stringify(e)}`)
      }

      if (this.multiple)
        this.$emit('update:modelValue', files)
      else
        this.$emit('update:modelValue', files[0])
    },
  },
}
</script>
