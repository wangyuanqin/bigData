// test
import store from './store'
/* eslint-disable */
export const get_userinfo = state => {
  if (JSON.stringify(state.userinfo) === '{}') {
    store.commit('set_userinfo', JSON.parse(sessionStorage.getItem('userinfo')))
  }
  return state.userinfo
}
