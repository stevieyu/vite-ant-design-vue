// https://froala.com/wysiwyg-editor/
// https://froala.com/wysiwyg-editor/docs/
import {h, toRaw} from 'vue';
import load from '@/utils/load';

export default {
  name: 'EditorJs',
  props: ['modelValue', 'config'],
  emits: ['update:modelValue'],
  render() {
    return h(
        this.currentTag,
        [this.$slots.default],
    );
  },
  data() {
    return {
      currentTag: 'div',
      model: null,
      oldModel: null,
    };
  },
  computed: {
    currentConfig() {
      return {
        autofocus: true,
        ...Object(this.config),
        data: this.modelValue,
      };
    },
  },
  watch: {
    modelValue(val) {
      val = toRaw(val);
      if (JSON.stringify(val) === JSON.stringify(toRaw(this.model))) return;
      this.model = val;

      if (!this._editor) return;
      this._editor.render(val);
    },
  },
  created() {
    this.model = this.modelValue;
  },
  async mounted() {
    await load([
      'https://cdn.jsdelivr.net/npm/@editorjs/editorjs',
      'https://cdn.jsdelivr.net/npm/@editorjs/header',
      'https://cdn.jsdelivr.net/npm/@editorjs/list',
      'https://cdn.jsdelivr.net/npm/@editorjs/simple-image',
    ], 'editorjs');
    this.init();
  },
  unmounted() {
    if (this._editor && this._editor.destroy) {
      this._editor.destroy();
      this._editor = null;
    }
  },
  methods: {
    init() {
      const {EditorJS, Header, List, SimpleImage} = window;
      this._editor = new EditorJS({
        ...this.currentConfig,
        holder: this.$el,
        i18n,
        tools: {
          image: SimpleImage,
          header: {
            class: Header,
            config: {
              placeholder: '请输入标题',
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 3,
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
        },
        onChange: this.onChange,
      });
    },
    onChange() {
      if (!this._editor) return;
      this._editor.save()
          .then((savedData) => {
            if (JSON.stringify(toRaw(this.model)) === savedData) return;
            this.model = savedData;
            this.$emit('update:modelValue', savedData);
          });
    },
  },
};

const i18n = {
  messages: {
    ui: {
      'blockTunes': {
        'toggler': {
          'Click to tune': '点击调整',
          'or drag to move': '拖拽移动',
        },
      },
      'inlineToolbar': {
        'converter': {
          'Convert to': '转换成',
        },
      },
      'toolbar': {
        'toolbox': {
          'Add': '添加',
        },
      },
    },
    toolNames: {
      'Text': '文本',
      'Heading': '标题',
      'List': '列表',
      'Checklist': '检查项',
      'Quote': '引用',
      'Code': '代码',
      'Table': '表格',
      'Link': '链接',
      'Bold': '加粗',
      'Italic': '斜体',
    },
    tools: {
      'link': {
        'Add a link': '输入链接',
      },
      'list': {
        'Ordered': '有序',
        'Unordered': '无序',
      },
    },
    blockTunes: {
      'delete': {
        'Delete': '删除',
      },
      'moveUp': {
        'Move up': '上移',
      },
      'moveDown': {
        'Move down': '下移',
      },
    },
  },
};
