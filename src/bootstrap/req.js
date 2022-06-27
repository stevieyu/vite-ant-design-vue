import ky from 'ky';
import stringify from 'qs/lib/stringify';

export const getUrl = (path = '', params = null) => {
  let origin = import.meta.env.VITE_ORIGIN;
  origin += '/api/';

  origin += path;

  if (params && Object.keys(params).length) {
    origin += origin.includes('?') ? '&' : '?';
    origin += stringify(params);
  }

  return origin;
};

window.$api = ky.create({
  prefixUrl: getUrl(),
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set('Authorization', `Bearer `);
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 422) {
          const res = await response.json();
          $msg.error(Object.values(res)[0][0]);
        }
        if (response.status === 404) {
          $msg.error('找不到数据');
        }
        if (response.status === 403) {
          $msg.error('拒绝访问');
        }
        if (response.status === 401) {
          $msg.error('未登录');
        }
      },
    ],
  },
});
