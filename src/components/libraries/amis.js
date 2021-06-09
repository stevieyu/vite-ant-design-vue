import {h, toRaw} from 'vue';
import load from '@/utils/load';

export default {
  render() {
    return h(
        'div',
        [this.$slots.default],
    );
  },
  props: {
    json: {
      type: Object,
      default: () => ({
        type: 'page',
        title: '表单页面',
        body: {
          type: 'form',
          mode: 'horizontal',
          api: '/saveForm',
          controls: [
            {
              label: 'Name',
              type: 'text',
              name: 'name',
            },
            {
              label: 'Email',
              type: 'email',
              name: 'email',
            },
          ],
        },
      }),
    },
  },
  watch: {
    json() {
      this.init();
    },
  },
  async mounted() {
    await this.load();
    this.init();
  },
  methods: {
    async load() {
      await load([
        'https://cdn.jsdelivr.net/npm/amis@1/sdk/sdk.min.js',
        'https://cdn.jsdelivr.net/npm/amis@1/sdk/sdk.min.css',
        'https://cdn.jsdelivr.net/npm/amis@1/sdk/antd.min.css',
      ], 'amis');

      const {amisRequire} = window;

      this._amis = amisRequire('amis/embed', {
      }, {
      }, {
        theme: 'antd',
      });
    },
    init() {
      this._amis.embed(this.$el, toRaw(this.json));
    },
  },
};
