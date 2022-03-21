import Vue from 'vue'
import {
  http,
  axios
} from './http.js'

/*eslint-disable */
export const api = {
  teacher: '/teachers',
  teacherCourse: '/teachers/course',
  questionnaires: '/reviewonline/questionnaires',
  evalTimeTable: '/eval/timetable',
  eval: '/eval',
  course: '/course',
  student: '/students'
}
// axios.defaults.baseURL = config.url
Vue.prototype.$http = http
Vue.prototype.$axios = axios
Vue.prototype.$api = api
Vue.prototype.$url = config.url
Vue.prototype.$picture = config.url2
Vue.prototype.$clientCategory = config.clientCategory
Vue.prototype.$bigDataTile = config.bigDataTile
Vue.prototype.$contBigTile = config.contBigTile
/*eslint-disable */
