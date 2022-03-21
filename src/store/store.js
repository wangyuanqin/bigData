import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
  navbar: [],
  // 学校编号
  xxbh: '',
  // 判断参会企业 目前已超过上限，是否继续添加
  pdchsx: '',
  // 展会信息
  zhxx: '',
  // 双选编号
  sxhbh: '',
  // 职位编号
  zwbh: '',
  // 双选详情
  sxhxq: {},
  // 宣讲会详情:
  xjhxq: {},
  // 单位编号
  dwbh: '',
  // 海报详情
  hbxq: {},
  // 企业管理添加
  qygltj: {},
  userinfo: {}
}

// 定义所需的 mutations
const mutations = {
  set_navbar (val, stus) {
    state.navbar = stus
  },
  set_zhxx (val, stus) {
    if (!state.zhxx) {
      Vue.set(state, 'zhxx', stus)
    } else {
      state.zhxx = Object.assign(state.zhxx, stus)
    }
  },
  set_xxbh (val, stus) {
    state.xxbh = stus
  },
  set_pdchsx (val, stus) {
    state.pdchsx = stus
  },
  set_sxhbh (val, stus) {
    state.sxhbh = stus
  },
  set_zwbh (val, stus) {
    state.zwbh = stus
  },
  set_sxhxq (val, stus) {
    if (JSON.stringify(state.sxhxq) === '{}') {
      Vue.set(state, 'sxhxq', stus)
    } else {
      // console.log(Object.assign(state.sxhxq, stus))
      state.sxhxq = Object.assign(stus)
    }
  },
  set_xjhxq (val, stus) {
    if (JSON.stringify(state.xjhxq) === '{}') {
      Vue.set(state, 'xjhxq', stus)
    } else {
      state.xjhxq = Object.assign(state.xjhxq, stus)
    }
  },
  set_userinfo (val, stus) {
    if (JSON.stringify(state.userinfo) === '{}') {
      Vue.set(state, 'userinfo', stus)
    } else {
      state.userinfo = Object.assign(state.userinfo ? state.userinfo : {}, stus)
    }
  },
  set_dwbh (val, stus) {
    state.dwbh = stus
  },
  set_hbxq (val, stus) {
    if (JSON.stringify(state.hbxq) === '{}') {
      Vue.set(state, 'hbxq', stus)
    } else {
      state.hbxq = Object.assign(state.hbxq, stus)
    }
  },
  set_qygltj (val, stus) {
    if (JSON.stringify(state.qygltj) === '{}') {
      Vue.set(state, 'qygltj', stus)
    } else {
      state.qygltj = Object.assign(state.qygltj, stus)
    }
  }
}

// 创建 store 实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
