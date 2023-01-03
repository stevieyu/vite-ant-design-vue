import { usePagination, useRequest } from 'vue-request'
import stringify from 'qs/lib/stringify'

const getHeaders = () => new Headers({
  'Content-Type': 'application/json',
})

export const getUrl = (path, params = null) => {
  let origin = import.meta.env.VITE_ORIGIN
  origin += '/api/'

  origin += path

  if (params && Object.keys(params).length) {
    origin += origin.includes('?') ? '&' : '?'
    origin += stringify(params)
  }

  return origin
}

export const reqPagination = (path, query = {}) => usePagination(p => ({
  url: getUrl(path, Object.assign({}, query, p)),
  method: 'GET',
  headers: getHeaders(),
}), {
  // formatResult: res => res,
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'per_page',
    // totalKey: 'total',
    // totalPageKey: 'per_page',
  },
})

export const reqGet = (path, query = {}) => useRequest({
  url: getUrl(path, query),
  method: 'GET',
  headers: getHeaders(),
})

export const reqPut = (path, data = {}) => useRequest({
  url: getUrl(path),
  method: 'PUT',
  headers: getHeaders(),
  body: JSON.stringify(data),
})

export const reqPost = (path, data = {}) => useRequest({
  url: getUrl(path),
  method: 'POST',
  headers: getHeaders(),
  body: JSON.stringify(data),
})

export const reqDelete = (path, data = {}) => useRequest({
  url: getUrl(path),
  method: 'DELETE',
  headers: getHeaders(),
  body: JSON.stringify(data),
})
