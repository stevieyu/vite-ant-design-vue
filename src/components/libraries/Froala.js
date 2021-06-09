
// https://froala.com/wysiwyg-editor/
// https://froala.com/wysiwyg-editor/docs/
import {h} from 'vue';
import load from '@/utils/load';

export default {
  props: ['tag', 'modelValue', 'config', 'onManualControllerReady'],
  emits: ['update:modelValue'],
  watch: {
    modelValue() {
      this.model = this.modelValue;
      this.updateValue();
    },
  },

  render() {
    return h(
        this.currentTag,
        [this.$slots.default],
    );
  },

  created() {
    this.currentTag = this.tag || this.currentTag;
    this.model = this.modelValue;
  },

  // After first time render.
  async mounted() {
    await load([
      'https://cdn.jsdelivr.net/npm/froala-editor/js/froala_editor.min.js',
    ], 'froala');
    await load([
      'https://cdn.jsdelivr.net/npm/froala-editor/css/froala_editor.min.css',
      'https://cdn.jsdelivr.net/npm/froala-editor/css/plugins.pkgd.min.css',
      'https://cdn.jsdelivr.net/npm/froala-editor/js/plugins.pkgd.min.js',
      'https://cdn.jsdelivr.net/npm/froala-editor/js/languages/zh_cn.min.js',
    ], 'froala-cn');
    if (this.SPECIAL_TAGS.includes(this.currentTag)) {
      this.hasSpecialTag = true;
    }

    if (this.onManualControllerReady) {
      this.generateManualController();
    } else {
      this.createEditor();
    }
  },

  beforeUnmount() {
    this.destroyEditor();
  },

  data() {
    return {
      initEvents: [],
      // Tag on which the editor is initialized.
      currentTag: 'div',

      editorInitialized: false,

      SPECIAL_TAGS: ['img', 'button', 'input', 'a'],
      INNER_HTML_ATTR: 'innerHTML',
      hasSpecialTag: false,

      model: null,
      oldModel: null,
    };
  },
  computed: {
    currentConfig() {
      return {
        immediateVueModelUpdate: false,
        vueIgnoreAttrs: null,
        language: 'zh_cn',
        ...Object(this.config),
      };
    },
  },
  methods: {
    updateValue() {
      if (JSON.stringify(this.oldModel) === JSON.stringify(this.model)) return;

      this.setContent();
    },

    async createEditor() {
      if (this.editorInitialized) return;

      const {FroalaEditor} = window;

      this.setContent(true);

      // Bind editor events.
      this.registerEvents();
      this.initListeners();

      this._editor = new FroalaEditor(this.$el, {
        ...this.currentConfig,
      });

      this.editorInitialized = true;

      this.removeLicense();
    },
    removeLicense() {
      const style = document.createElement('style');
      style.innerHTML = `
        .fr-wrapper div:first-child{
          display:none;
        }
        .fr-wrapper .fr-placeholder{
          margin-top: 0 !important;
        }
      `;
      this.$el.parentElement.appendChild(style);
    },
    setContent(firstTime) {
      if (!this.editorInitialized && !firstTime) return;

      if (this.model || this.model === '') {
        this.oldModel = this.model;

        if (this.hasSpecialTag) {
          this.setSpecialTagContent();
        } else {
          this.setNormalTagContent(firstTime);
        }
      }
    },
    setNormalTagContent(firstTime) {
      const htmlSet = () => {
        this._editor.html.set(this.model || '');

        // This will reset the undo stack everytime the model changes externally. Can we fix this?

        this._editor.undo.saveStep();
        this._editor.undo.reset();
      };

      if (firstTime) {
        this.registerEvent('initialized', () =>{
          htmlSet();
        });
      } else {
        htmlSet();
      }
    },

    setSpecialTagContent() {
      const tags = this.model;

      // add tags on element
      if (tags) {
        for (const attr in tags) {
          if (tags.hasOwnProperty(attr) && attr !== this.INNER_HTML_ATTR) {
            this.$el.setAttribute(attr, tags[attr]);
          }
        }

        if (tags.hasOwnProperty(this.INNER_HTML_ATTR)) {
          this.$el.innerHTML = tags[this.INNER_HTML_ATTR];
        }
      }
    },

    destroyEditor() {
      if (this._editor) {
        this._editor.destroy();
        this.editorInitialized = false;
        this._editor = null;
      }
    },

    getEditor() {
      return this._editor;
    },

    generateManualController() {
      const controls = {
        initialize: this.createEditor,
        destroy: this.destroyEditor,
        getEditor: this.getEditor,
      };

      this.onManualControllerReady(controls);
    },

    updateModel() {
      let modelContent = '';

      if (this.hasSpecialTag) {
        const attributeNodes = this.$el[0].attributes;
        const attrs = {};

        for (let i = 0; i < attributeNodes.length; i++ ) {
          const attrName = attributeNodes[i].name;
          if (this.currentConfig.vueIgnoreAttrs && this.currentConfig.vueIgnoreAttrs.includes(attrName)) {
            continue;
          }
          attrs[attrName] = attributeNodes[i].value;
        }

        if (this.$el[0].innerHTML) {
          attrs[this.INNER_HTML_ATTR] = this.$el[0].innerHTML;
        }

        modelContent = attrs;
      } else {
        const returnedHtml = this._editor.html.get();
        if (typeof returnedHtml === 'string') {
          modelContent = returnedHtml;
        }
      }

      this.oldModel = modelContent;
      this.$emit('update:modelValue', modelContent);
    },
    initListeners() {
      this.registerEvent('initialized', () => {
        if (this._editor.events) {
          // bind contentChange and keyup event to froalaModel
          this._editor.events.on('contentChanged', () => {
            this.updateModel();
          });

          if (this.currentConfig.immediateVueModelUpdate) {
            this._editor.events.on('keyup', () => {
              this.updateModel();
            });
          }
        }
      });
    },

    // register event on editor element
    registerEvent(eventName, callback) {
      if (!eventName || !callback) {
        return;
      }

      // Initialized event.
      if (eventName === 'initialized') {
        this.initEvents.push(callback);
      } else {
        if (!this.currentConfig.events) {
          this.currentConfig.events = {};
        }

        this.currentConfig.events[eventName] = callback;
      }
    },

    registerEvents() {
      // Handle initialized on its own.
      this.registerInitialized();

      // Get current events.
      const events = this.currentConfig.events;

      if (!events) {
        return;
      }

      for (const event in events) {
        if (events.hasOwnProperty(event) && event !== 'initialized') {
          this.registerEvent(event, events[event]);
        }
      }
    },

    registerInitialized() {
      // Bind initialized.
      if (!this.currentConfig.events) {
        this.currentConfig.events = {};
      }

      // Set original initialized event.
      if (this.currentConfig.events.initialized) {
        this.registerEvent('initialized', this.currentConfig.events.initialized);
      }

      // Bind initialized event.
      this.currentConfig.events.initialized = () => {
        for (let i = 0; i < this.initEvents.length; i++) {
          this.initEvents[i].call(this._editor);
        }
      };
    },
  },
};
