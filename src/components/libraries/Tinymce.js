/* eslint-disable */

//https://github.com/tinymce/tinymce
//https://www.tinymce.com/docs/
import {h} from 'vue'
import load from '@/helpers/load';
import FileUpload from "@/helpers/FileUpload";

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
        plugins: 'fullscreen preview print autoresize image media link table code help quickbars imgUpload audioUpload',
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
    imagesUploadHandler(blobInfo, success, failure) {
      // console.log(blobInfo.blob());
      // success('data:image/png;base64,' + blobInfo.base64());
      (new FileUpload(getPath()))
        .imgOptions({
          maxWidth: 1500,
        })
        .uploadFile(blobInfo.blob())
        .then(success)
        .catch((e) => {
          failure(e)
          this.instance.undoManager.undo()
        });
    },
    async init() {
      tinymce.PluginManager.add('imgUpload', imageUpload);
      tinymce.PluginManager.add('audioUpload', audioUpload);

      let config = this.dcf;
      this.config && Object.assign(config, this.config);
      config.target = this.$el;
      let instance = await tinymce.init(config);
      this.instance = instance.length && instance[0];
    },
  },
  created() { },
  async mounted() {
    await load('https://cdn.jsdelivr.net/npm/tinymce/tinymce.min.js', 'tinymce');
    await load([
        '/tinymce/media.js',
        'https://cdn.jsdelivr.net/npm/tinymce-i18n/langs5/zh_CN.min.js'
    ], 'tinymce-media');

    await this.init();
  },
  beforeUnmount() {
    this.instance && this.instance.destroy();
  },
};

const getPath = (subDir = 'images') => `editors/${subDir}/${new Date().format('yyyy/MM/dd')}`

const imageUpload = (editor) => {
  let fileInput;
  const event = {
    async fileChange(event) {
      if (!event.target.files || !event.target.files.length) return;
      const loadingInstance = $ele.$loading({
        target: editor.editorContainer.parentElement,
      });

      let filesUrl

      try {
        filesUrl = await ((new FileUpload(getPath())))
          .imgOptions({
            maxWidth: 1500,
          })
          .uploadStart(event.target.files)
      }catch (e){
        loadingInstance.close()
        return
      }


      let html = `<div>`
      for (const fileUrl of filesUrl) {
        html += `<img src="${fileUrl}">`;
      }
      html += `</div>`
      editor.insertContent(html);

      fileInput.value = '';
      loadingInstance.close();
    },
    click() {
      if (!fileInput) {
        fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('multiple', 'true');
        fileInput.setAttribute('accept', 'image/*');
        fileInput.classList.add('tinymce-img');
        fileInput.classList.add('hide');
        fileInput.addEventListener('change', event.fileChange);
      }
      fileInput.click();
    },
  };

  editor.ui.registry.addButton('imageupload', {
    // icon: 'image',
    // tooltip: '图片',
    text: '多图批量图片',
    onAction: event.click,
  });

  return {
  };
}

const audioUpload = (editor) => {
  let audioFile;

  const event = {
    async fileChange(event) {
      if (!event.target.files || !event.target.files.length) return;
      const loadingInstance = $ele.$loading({
        target: editor.editorContainer.parentElement,
      });

      let filesUrl
      try {
        filesUrl = await ((new FileUpload(getPath('audio'))))
          .uploadStart(event.target.files)
      }catch (e){
        loadingInstance.close()
        return
      }

      let html = `<div>`
      for (const fileUrl of filesUrl) {
        html += `<audio controls controlslist="nodownload" style="background-color:rgb(241, 243, 244);width:100%">
                  <source src="${fileUrl}"  type="audio/mp3">
                </audio>`;
      }
      html += `</div>`
      editor.selection.setContent(html)

      audioFile.value = '';
      loadingInstance.close();
    },
    click() {
      if (!audioFile) {
        audioFile = document.createElement('input');
        audioFile.setAttribute('type', 'file');
        audioFile.setAttribute('accept', '.mp3');
        audioFile.classList.add('tinymce-img');
        audioFile.classList.add('hide');
        audioFile.addEventListener('change', event.fileChange);
      }
      audioFile.click();
    },
  };
  editor.ui.registry.addButton('audioupload', {
    // icon: 'image',
    // tooltip: '图片',
    text: '上传音频',
    onAction: event.click,
  });

  return {
  };
}


