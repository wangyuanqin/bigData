require('es6-promise').polyfill()
require('isomorphic-fetch')

export default function request (method, url, body) {
  method = method.toUpperCase()
  if (method === 'GET') {
    body = undefined
  } else {
    body = body && JSON.stringify(body)
  }

  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body
  }).then((res) => {
    if (res.status === 200) {
      return res
    } else {
      // return Promise.reject('请求失败！')
    }
  }).catch((error) => {
    console.log(error)
  })
}

export const get = path => request('GET', path)
export const post = (path, body) => request('POST', path, body)
export const put = (path, body) => request('PUT', path, body)
export const del = (path, body) => request('DELETE', path, body)
