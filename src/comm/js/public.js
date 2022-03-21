/* eslint-disable space-before-function-paren */
import Vue from 'vue'
const countRunningFun = (el, binding, vnode, oldVnode) => {
  el.style['font-family'] = 'alternate'
  const data = parseFloat(binding.value) // 传回来的数值目标值
  let addNumber = 1.11
  if (data > 200) addNumber = data / 100
  else if (data > 100 && data < 200) addNumber = 2.22
  // const countPoint = data / 100
  let nowCount = 0 // 当前页面显示值
  let totalCount = 0 // 数值每次变化做记录
  let goNumber = data > 200 ? 200 : 100 // 执行次数
  // 回调函数
  var stop = null
  let render = function () {
    // 在动画没有结束前，递归渲染
    stop = requestAnimationFrame(render)
    if (nowCount < data && totalCount < goNumber) {
      if (data.toString().indexOf('.') > 0) {
        // 如果包含小数点表示是小数
        let cutVal = data.toString().split('.')[1].length // 小数点个数
        if (cutVal === 1) {
          // 包含1个小数点
          nowCount = (parseFloat(nowCount) + parseFloat(addNumber)).toFixed(1)
        } else {
          // 包含多个小数点就只保留两位小数点
          nowCount = (parseFloat(nowCount) + parseFloat(addNumber)).toFixed(2)
        }
      } else {
        nowCount = (parseFloat(nowCount) + parseFloat(addNumber)).toFixed(0)
      }
      totalCount++
    } else if (nowCount !== data && totalCount === goNumber) {
      // 控制时间最多1000毫秒（10*100）,大于1000次就直接赋值，不允许无限制滚动
      nowCount = data
      // if (nowCount.length > 3) {
      //   nowCount = nowCount
      // }
      el.innerHTML = getNUm(nowCount)
    } else if (nowCount >= data) {
      nowCount = data
      cancelAnimationFrame(stop) // 可以取消该次动画。
      // debugger;
      el.innerHTML = getNUm(nowCount)
    }
    el.innerHTML = getNUm(nowCount)
  }
  render()
}
// 拆分逗号
function getNUm(value) {
  let show = value.toString()
  let text = show
  if (show.length > 3 && show.length <= 6) {
    text =
      show.substring(0, show.length - 3) +
      ',' +
      show.substring(show.length - 3, show.length)
  } else if (show.length > 6) {
    text =
      show.substring(0, show.length - 6) +
      ',' +
      show.substring(show.length - 6, show.length - 3) +
      ',' +
      show.substring(show.length - 3, show.length)
  }
  return text
}
// 数字滚动指令
Vue.directive('countRunning', {
  bind(el, binding, vnode, oldVnode) {
    countRunningFun(el, binding, vnode, oldVnode)
  },
  update(el, binding, vnode, oldVnode) {
    if (binding.value === binding.oldValue) return // 相同值不操作
    countRunningFun(el, binding, vnode, oldVnode)
  }
})
