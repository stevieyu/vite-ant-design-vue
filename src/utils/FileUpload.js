import random from 'lodash-es/random';

import imgHandle from './imgHandle';
import {getUrl} from '@/utils/useRequest';

/**
 * xx
 */
export default class {
  /**
   * constructor
   * @param {String} uploadBasePath
   * @param {String} drive
   */
  constructor(uploadBasePath = '', drive = 'cos') {
    this.setUploadBasePath(uploadBasePath);
    this.drive = drive;
  }

  /**
   * 设置图片压缩选项
   * @param {*} imgOptions
   * @return {this}
   */
  imgOptions(imgOptions) {
    this.imgOptions = imgOptions;
    return this;
  }

  /**
   * 设置ajax请求选项
   * @param {Object} ajaxOptions
   * @return {this}
   */
  ajaxOptions(ajaxOptions) {
    this.ajaxOptions = ajaxOptions;
    return this;
  }

  /**
   * 把单个文件转成文件数组
   * @param {File|Array} files
   * @return {Array}
   */
  fileToFiles(files) {
    if (typeof files.length === 'undefined') files = [files];
    return Array.from(files);
  }

  /**
   * 获取上传进度获取
   * @param {function} callback
   * @return {this}
   */
  onUploadProgress(callback) {
    if (!this.ajaxOptions) this.ajaxOptions = {};
    this.ajaxOptions.onUploadProgress = callback;
    return this;
  }

  /**
   * 设置上传地址
   * @param {String} path
   * @return {this}
   */
  setUploadBasePath(path) {
    if (!path) path = '';
    this.uploadBasePath = path;
    this.uploadBasePath += !path || path.substr(-1) === '/' ? '' : '/';
    return this;
  }

  /**
   * 获取上传参数
   * @param {String} drive
   * @return {Promise<*>}
   */
  async uploadParameter(drive = null) {
    if (drive) this.drive = drive;
    if (!this.upload_parameter) {
      const {form, headers,
        upload_url: uploadUrl,
        access_url: accessUrl,
      } = await (await fetch(getUrl('supplier/upload'))).json();
      this.upload_parameter = {form, uploadUrl, accessUrl, headers};
    }

    return this.upload_parameter;
    // throw Error("缺失获取上传参数配置");
  }

  /**
   *
   * @param {Object} parameter
   * @return {*}
   */
  handleUploadParameter(parameter = null) {
    let {form, uploadUrl, accessUrl, headers} = parameter;
    if (!accessUrl) accessUrl = uploadUrl;
    if (accessUrl && accessUrl.substring(accessUrl.length - 1, accessUrl.length) !== '/') {
      accessUrl += '/';
    }

    if (!this.ajaxOptions) this.ajaxOptions = {};
    if (!(this.ajaxOptions.headers instanceof Object)) {
      this.ajaxOptions.headers = {};
    }
    if (headers instanceof Object) {
      Object.assign(this.ajaxOptions.headers, headers);
    }

    Object.assign(parameter, {
      access_url: accessUrl,
      headers,
      form: form,
      upload_url: uploadUrl,
    });
    return parameter;
  }

  /**
   *
   * @return {Promise<*>}
   */
  async getUploadParameter() {
    return this.handleUploadParameter(await this.uploadParameter());
  }

  /**
   * 开始批量上传
   * @param {Array} files
   * @return {Promise<Array>}
   */
  async uploadStart(files) {
    if (files) files = this.fileToFiles(files);

    const filesUrl = [];
    for (let i = 0; i < files.length; i++) {
      filesUrl.push(await this.uploadFile(files[i]));
    }
    return filesUrl;
  }

  async loading(txt = '图片上传中') {
    let l;
    const close = () => {
      l = 1;
    };
    return {close, l};
  }

  /**
   * 上传单个文件
   * @param {File} file
   * @return {Promise<*>}
   */
  async uploadFile(file) {
    const l = await this.loading();

    try {
      let uploadPath = this.uploadBasePath;
      const uploadParameter = await this.getUploadParameter();
      const uploadForm = uploadParameter.form;

      if (this.imgOptions) {
        file = await imgHandle(file, this.imgOptions);
      }

      const filename = this.genFileName(file);
      uploadPath += filename;

      const formData = new FormData();
      formData.append('key', uploadPath);
      for (const key in uploadForm) {
        if (!{}.hasOwnProperty.call(uploadForm, key)) continue;
        formData.append(key, uploadForm[key]);
      }
      formData.append('file', file, filename);

      await this.post(uploadParameter.upload_url, formData, this.ajaxOptions);

      l.close();

      return uploadParameter.access_url + uploadPath;
    } catch (e) {
      l.close();
      throw e;
    }
  }

  /**
   * 提交数据
   * @param {String} url
   * @param {Object} body
   * @param {Object} options
   * @return {Promise<unknown>}
   */
  post(url, body, options = {}) {
    const xhr = new XMLHttpRequest();
    Object.assign(xhr, options);

    // xhr.upload.onprogress = ({ lengthComputable, loaded, total }) => {
    //   if (lengthComputable) {
    //     const progress = +((loaded / total) * 100).toFixed(2);
    //     console.log(progress, loaded, total);
    //   }
    // };

    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = function() {
        if (this.readyState !== 4) return;

        if (this.status === 200) {
          let res;
          try {
            res = JSON.parse(this.responseText);
          } catch (e) {
            resolve(this.responseText, this);
          }
          resolve(res, this);
        }
        reject(new Error('上传失败'));
      };

      xhr.open('post', url, true);
      xhr.send(body);
    });
  }

  /**
   * 生成文件名
   * @param {File} file
   * @return {string}
   */
  genFileName(file) {
    const date = new Date();
    const filename = `${date.getTime()}${random(1, 999)}`;
    if (!file.name) {
      return `${filename}.jpg`;
    }
    const ext = file.name.split('.').pop();
    return `${filename}.${ext}`;
  }
}
