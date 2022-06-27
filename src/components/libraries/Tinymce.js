/* eslint-disable */

//https://github.com/tinymce/tinymce
//https://www.tinymce.com/docs/
import {h} from 'vue'
import load from '@/utils/load';
import FileUpload from "@/utils/FileUpload";

export default {
  name: 'Tinymce',
  render() {
    return h('input', {
      type: 'hidden',
      name: this.name,
      value: this.modelValue,
    });
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: () => {}
    },
    modelValue: {
      type:String,
      default: ''
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      is_focus: false,
      dcf: {
        language: 'zh_CN',
        relative_urls: false,
        convert_urls: false,
        autoresize_bottom_margin: 1,
        plugins: 'fullscreen preview autoresize image media link table code help quickbars',
        toolbar: 'imageupload audioupload',
        images_upload_handler: this.imagesUploadHandler,
        init_instance_callback: this.initInstanceCallback,
        // file_picker_callback: function (callback, value, meta) { },
        content_style: `img { max-width: 100%;max-height: 100%;vertical-align: middle; }`
      },
    };
  },
  watch: {
    modelValue(newVal, oldVal) {
      if (this.instance && !this.is_focus) {
        const content = this.instance.getContent();
        if (newVal && newVal !== content) {
          this.instance.setContent(newVal);
        } else if (!newVal) {
          this.instance.setContent('');
        }
      }
    },
  },
  methods: {
    initInstanceCallback(editor) {
      editor.on('KeyUp', (e) => {
        this.$emit('update:modelValue', editor.getContent());
      });
      editor.on('Change', (e) => {
        this.$emit('update:modelValue', editor.getContent());
      });
      editor.on('focus', (e) => {
        this.is_focus = true;
      });
      editor.on('blur', (e) => {
        this.is_focus = false;
      });
      editor.setContent(this.modelValue || '');
    },
    imagesUploadHandler(blobInfo) {
      return new Promise((resolve, reject) => {
        (new FileUpload())
            .imgOptions({
              maxWidth: 1500,
            })
            .uploadFile(blobInfo.blob())
            .then((e) => {
              resolve(e)
            })
            .catch((e) => {
              reject(e)
              this.instance.undoManager.undo()
            });
      })
    },
    async init() {
      let config = this.dcf;
      this.config && Object.assign(config, this.config);
      config.target = this.$el;
      let instance = await tinymce.init(config);
      this.instance = instance.length && instance[0];
    },
  },
  created() { },
  async mounted() {
    await load('https://cdn.jsdelivr.net/npm/tinymce@6/tinymce.min.js', 'tinymce');
    await load([
        'https://cdn.jsdelivr.net/npm/tinymce-i18n/langs5/zh_CN.min.js'
    ], 'tinymce-ext');

    await this.init();
  },
  beforeUnmount() {
    this.instance && this.instance.destroy();
  },
};





