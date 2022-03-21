import axios from 'axios'
import md5 from 'js-md5'
import {
  loginInfo,
  timestamp
} from 'comm/js/utils'
// var qs = require('qs')
var headers = {}
const instance = axios.create({ // 实例化
  // eslint-disable-next-line no-undef
  baseURL: config.url
  // timeout: 10000
})
// instance.defaults.headers.common['token'] = 'deabea2de4229d073282620038bdec64' // 默认设置请求头
// 请求拦截
instance.interceptors.request.use(function (config) { // 预先请求默认
  let params = loginInfo()
  config.headers.userCode = params.xsuserCose
  config.headers.token = params.token
  // config.headers.token = 'deabea2de4229d073282620038bdec64'
  // config.headers.userCode = '1000032102A5F174E8422181C4818B4C'
  config.headers.timestamp = timestamp()
  if (config.headers.token) {
    let sign = md5(config.headers.timestamp + config.headers.token + 'yunhua')
    config.headers.sign = sign.toUpperCase()
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
const http = {
  get: function (url, params) {
    return new Promise((resolve, reject) => {
      instance.get(url, {
        // headers: http.getheaders(),
        params: params
      }).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        let message = error + ''
        reject(http.getErrorzt(message))
      })
    })
  },
  post: function (url, data, params) {
    headers['Content-Type'] = 'application/json'
    return new Promise((resolve, reject) => {
      // http.getheaders()['Content-Type'] = 'application/json'
      // axios.post(url, qs.stringify(params)).then((response) => {
      //   resolve(response.data)
      // }).catch((error) => {
      //   reject(error)
      // })
      instance({
        method: 'post',
        url: url,
        data: data,
        params: params,
        headers: headers
      }).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  },
  delete: function (url, params) {
    return new Promise((resolve, reject) => {
      instance.delete(url, {
        params: params
        // headers: http.getheaders()
      }).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  },
  put: function (url, params, data) {
    http.getheaders()['Content-Type'] = 'application/json'
    return new Promise((resolve, reject) => {
      instance({
        method: 'put',
        url: url,
        data: data,
        params: params
        // headers: http.getheaders()
      }).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  },
  qsPost: function (url, data) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded' // 默认form-data提交
    // 当action为get时候，浏览器用x-www-form-urlencoded的编码方式把form数据转换成一个字串（name1=value1&name2=value2…），然后把这个字串append到url后面，用?分割，加载这个新的url。
    // 当action为post时候，浏览器把form数据封装到http body中，然后发送到server。 如果没有type=file的控件，用默认的application/x-www-form-urlencoded就可以了。 但是如果有type=file的话，就要用到multipart/form-data了。浏览器会把整个表单以控件为单位分割，并为每个部分加上Content-Disposition(form-data或者file),Content-Type(默认为text/plain),name(控件name)等信息，并加上分割符(boundary)。
    return new Promise((resolve, reject) => {
      axios({
        url,
        method: 'post',
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        data: data
      }).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  getErrorzt (message) {
    var index
    if (message.search('Network Error') !== -1) {
      index = 2
    }
    if (message.search('timeout') !== -1) {
      index = 3
    }
    return index
  }
}

// export default http
export {
  http,
  axios
}
