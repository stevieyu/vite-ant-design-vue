<template>
<div class="flex flex-col min-h-screen">
  <div>
    <a-button @click="$router.push('/amisEditor')">添加</a-button>
    <a-button @click="$router.push('/vv')">渲染</a-button>
  </div>
  <AmisRender :schema="schema" class="px-12 flex-auto"/>
</div>
</template>
<script setup>
import AmisRender from '../components/libraries/AmisRender.vue';
import {useRouter} from 'vue-router';

const $router = useRouter();

const schema = {
  'type': 'page',
  'body': {
    'type': 'nav',
    'stacked': true,
    'className': 'min-h-screen',
    'draggable': true,
    'saveOrderApi': '/navs',
    'source': '/navs',
    'itemActions': [
      {
        'type': 'button-group',
        'buttons': [
          {
            'type': 'button',
            'label': '查看',
            'actionType': 'link',
            'link': '/render?id=${id}',
          },
          {
            'type': 'button',
            'label': '编辑',
            'actionType': 'link',
            'link': '/amisEditor?id=${id}',
          },
          {
            'type': 'dropdown-button',
            'level': 'button',
            'icon': 'fa fa-ellipsis-h',
            'hideCaret': true,
            'buttons': [
              {
                'type': 'button',
                'label': '删除',
                'source': {
                  'method': 'delete',
                  'url': '/navs/${id}',
                },
              },
            ],
          },
        ],
      },
    ],
  },
};
</script>
