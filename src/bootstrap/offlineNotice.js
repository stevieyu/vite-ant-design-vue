import {debounce} from 'lodash-es';

window.addEventListener('offline', debounce(() => {
  alert('网络连接不稳定');
}, 1000));
