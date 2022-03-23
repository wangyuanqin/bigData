/*
 * @Author       : wangyuanqin
 * @desc         : 组件描述
 * @Date         : 2022-03-19 15:24:44
 * @LastEditTime : 2022-03-19 22:03:57
 * @LastEditors  : wangyuanqin
 * @FilePath     : \big-data-screen\src\router\index.js
 */
/* eslint-disable indent */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      redirect: "oldIndex"
    },
    // {
    //   path: '/index/:id/:if',
    //   name: 'index',
    //   component: resolve => require(['@/components/index'], resolve),
    //   meta: {
    //     title: '进入页面'
    //   }
    // },
    // {
    //   path: '/lectures',
    //   name: 'lectures',
    //   component: resolve => require(['@/components/lectures'], resolve),
    //   meta: {
    //     title: '课程活动详情页',
    //     keepAlive: true
    //   }
    // },
    {
      path: "/contBIg",
      name: "construction",
      component: resolve => require(["@/components/construction"], resolve),
      meta: {
        title: "学校建设成果"
      }
    },
    {
      path: "/bigData",
      name: "bigData",
      component: resolve => require(["@/components/index"], resolve),
      meta: {
        title: "学校竞争力"
      }
    },
    {
      path: "/oldIndex",
      name: "oldIndex",
      component: resolve => require(["@/components/old/index"], resolve),
      meta: {
        title: "高新区智慧养老大数据服务平台"
      }
    }
  ]
});
