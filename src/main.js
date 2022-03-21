/*
 * @Author       : wangyuanqin
 * @desc         : 组件描述
 * @Date         : 2022-03-19 15:24:44
 * @LastEditTime : 2022-03-19 21:24:46
 * @LastEditors  : wangyuanqin
 * @FilePath     : \big-data-screen\src\main.js
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import 'comm/js/utils.js'
import 'api/api.js'
import global from 'comm/js/global-component.js' // 全局自定义指令
import 'comm/js/public'
import LazyLoad from 'comm/js/lazyLoad.js'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/china.js'
// import china from 'echarts/map/json/china.json'
Vue.use(LazyLoad)
// echarts.registerMap('china', china)
Vue.prototype.$echarts = echarts
// import FastClick from 'fastclick'
require('comm/icon.css')
Vue.use(require('vue-wechat-title'))
Vue.use(global)
Vue.use(ElementUI)
// FastClick.attach(document.body)
// sessionStorage.setItem('loginInfo', {
//   userCode: '100001Xyxo328',
//   userType: 'TEACHER',
//   universityId: '100001'
// })
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
