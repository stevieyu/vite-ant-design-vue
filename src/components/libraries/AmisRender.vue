<template>
  <div><slot /></div>
</template>
<script>
import load from '@/utils/load';
import {url} from '@/utils/crud';

export default {
  name: 'AmisRender',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    schema: {
      type: [Object, null],
      default: () => ({}),
    },
  },
  computed: {
    amisSchema() {
      const defaultSchema = {
      };
      return this.schema || defaultSchema;
    },
    amisProps() {
      const defaultProps = {

      };
      return {...defaultProps};
    },
    amisConfig() {
      const defaultConfig = {
        theme: 'antd',
        requestAdaptor: (api) => {
          // console.log('requestAdaptor', api);

          if (api.url.startsWith('/')) api.url = url(api.url);
          api.withCredentials = false;

          return api;
        },
        responseAdaptor: (api, payload, query, request, response) => {
          // console.log('responseAdaptor', api, payload, query, request, response);
          return typeof payload.records !== 'undefined' ? payload.records : payload;
        },
        jumpTo: (to) => {
          if (!to) return;
          if (typeof to === 'string') {
            if (to.startsWith('/')) return this.$router.push(to);
            if (to.startsWith('?')) return this.$router.replace(to);
          }
          location.href = to;
        },
      };
      return {...this.config, ...defaultConfig};
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      load([
        'https://jsdelivr.stevie.top/npm/amis@2.0.0-rc.16/sdk/sdk.min.css',
        'https://jsdelivr.stevie.top/npm/amis@2.0.0-rc.16/sdk/helper.min.css',
        'https://jsdelivr.stevie.top/npm/amis@2.0.0-rc.16/sdk/iconfont.min.css',
        'https://jsdelivr.stevie.top/npm/amis@2.0.0-rc.16/sdk/antd.min.css',
      ], 'amisCss');
      await load('https://jsdelivr.stevie.top/npm/amis@2.0.0-rc.16/sdk/sdk.min.js', 'amisJs');

      const {amisRequire} = window;

      this._amis = amisRequire('amis/embed');

      this.init();
    },
    init() {
      this._amisInstance = this._amis.embed(this.$el,
          this.amisSchema,
          this.amisProps,
          this.amisConfig,
      );
      // console.log('amisSchema', this.amisSchema, this._amisInstance);
    },
  },
};
</script>
