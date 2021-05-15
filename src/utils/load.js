/**
 * LoadJS is a tiny async loader for modern browsers (789 bytes).
 * https://github.com/muicss/loadjs
 *
 * import load from '@/helpers/load';
 * await load('https://cdn.jsdelivr.net/npm/tinymce@4/tinymce.min.js', 'tinymce');
 */
import loadjs from 'loadjs';

export default (urls, key, options = {}) =>
  new Promise((resolve, reject) => {
    const config = {
      success: resolve,
      error: reject,
      ...options,
    };
    if (loadjs.isDefined(key)) {
      loadjs.ready(key, config);
    } else {
      loadjs(urls, key, config);
    }
  });
