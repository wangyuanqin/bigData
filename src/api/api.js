/*
 * @Author       : wangyuanqin
 * @desc         : 组件描述
 * @Date         : 2022-03-21 15:40:04
 * @LastEditTime : 2022-03-22 14:19:46
 * @LastEditors  : wangyuanqin
 * @FilePath     : \bigData\src\api\api.js
 */
import Vue from "vue";
import { http, axios } from "./http.js";

/*eslint-disable */
export const api = {
  MealSubsidies: "/Interface/MealSubsidies", //助餐服务情况接口
  ResidentialServices: "/Interface/ResidentialServices", //居家服务项目统计
  SituationServices: "/Interface/SituationServices", //服务机构情况
  UserServices: "/Interface/UserServices", //老年人数据统计
  SameDayService: "/Interface/SameDayService", //当日服务显示接口
  DataService: "/Interface/DataService" //数据汇总接口
  //   teacher: "/teachers",
  //   teacherCourse: "/teachers/course",
  //   questionnaires: "/reviewonline/questionnaires",
  //   evalTimeTable: "/eval/timetable",
  //   eval: "/eval",
  //   course: "/course",
  //   student: "/students"
};
// axios.defaults.baseURL = config.url
Vue.prototype.$http = http;
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.prototype.$url = config.url;
Vue.prototype.$picture = config.url2;
Vue.prototype.$clientCategory = config.clientCategory;
Vue.prototype.$bigDataTile = config.bigDataTile;
Vue.prototype.$contBigTile = config.contBigTile;
/*eslint-disable */
