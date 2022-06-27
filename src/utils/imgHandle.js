/**
 * https://github.com/blueimp/JavaScript-Load-Image
 * toData_url: (window.URL || window.webkitURL).createObjectURL(blob)
 */
import load from '@/utils/load';

// const loadImage = require('blueimp-load-image/js/load-image')
// require('blueimp-load-image/js/load-image-scale')
// require('blueimp-canvas-to-blob/js/canvas-to-blob.min')

const url =
  'https://cdn.jsdelivr.net/combine/' +
  [
    'npm/blueimp-load-image/js/load-image.all.min.js',
    'npm/blueimp-canvas-to-blob/js/canvas-to-blob.min.js',
  ].join(',');

export default async (
    file,
    options = {
      maxWidth: 1000,
      maxHeight: 1000,
      crop: false,
    },
) => {
  if (!file.type.includes('image') || file.type.includes('gif')) return file;
  if (file.size && file.size < 500 * 1024) return file;

  await load([url], 'load-image');

  const loadImage = window.loadImage;
  options.canvas = true;

  const loadImagePromise = (file, options) => new Promise((resolve) => loadImage(file, resolve, options));
  const toBlob = (cvs) => new Promise((resolve) => cvs.toBlob(resolve, file.type || 'image/png', 0.9));

  file = await (new Promise((resolve) => {
    loadImagePromise(file, options)
        .then(toBlob)
        .then((blob)=> {
          blob.name = file.name;
          blob.lastModified = file.lastModified;
          blob.lastModifiedDate = file.lastModifiedDate;
          resolve(blob);
        });
  }));

  if (file.size && file.size > 500 * 1024) {
    alert('单个图片体积过大');
    throw Error('单个图片体积过大');
  }

  return file;
};

export const blobToFile = (blob, name = '', type = '') => {
  name = name || blob.name;
  type = type || blob.type;

  return new window.File([blob], name, {type});
};

export const createObjectURL = (object) =>
  (window.URL || window.webkitURL).createObjectURL(object);

export const objectUrlToFile = async (objectUrl) => {
  const blob = await (await fetch(objectUrl)).blob();
  return new window.File([blob], Date.now().toString(), {type: blob.type});
};
