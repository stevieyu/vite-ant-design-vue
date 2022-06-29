export let errMsg = true;

export const url = (path, query) => {
  const uri = `${import.meta.env.VITE_API_ORIGIN}/records`;

  const url = new URL(`${uri}/${path}`);
  if (query) {
    for (const k of Object.keys(query)) {
      url.searchParams.set(k, query[k]);
    }
  }
  url.pathname = url.pathname.replace('//', '/');

  return url.toString();
};

export const req = async (path = '', method = 'get', query = null, json = null) => {
  const headers = new Headers();
  if (['post', 'put'].includes(method)) {
    headers.set('Content-Type', 'application/json');
  }

  try {
    let res = await fetch(url(path, query), {
      method,
      headers,
      body: json && JSON.stringify(json),
    });

    if (res.status >= 400) {
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }

    if (typeof res.json === 'function') res = await res.json();
    return res;
  } catch (err) {
    if (errMsg) $msg.error(err.message);
    throw err;
  }
};

export const get = (path = '', query = null) => req(path, 'get', query);
export const post = (path = '', json = null, query = null) => req(path, 'post', query, json);
export const put = (path = '', json = null, query = null) => req(path, 'put', query, json);
export const del = (path = '', query = null, json = null) => req(path, 'delete', query, json);
export const gppd = {get, post, put, delete: del};

export const resource = (name) => {
  return {
    get(id= '', query = null) {
      return get(`${name}/${id}`, query);
    },
    create(data) {
      return post(name, data);
    },
    update(id, data) {
      return put(`${name}/${id}`, data);
    },
    async updateOrCreate(id, data) {
      try {
        errMsg = false;
        if (id && await this.get(id)) {
          errMsg = true;
          return this.update(id, data);
        }
      } catch (e) {
        //
      }
      errMsg = true;
      return this.create(data);
    },
    delete(id) {
      return del(`${name}${id}`);
    },
  };
};

export default resource;
