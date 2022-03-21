/* eslint-disable space-before-function-paren */
// 全局组件
export default {
  install: function (Vue) {
    Vue.component('autoQuitTips', resolve => require(['base/auto-quit-tips'], resolve)) // group组件
    // 自定义指令-添加全局资源（默认图片）
    Vue.directive('handleImgTX', function (e, binding, vnode, oldVnode) {
      e.src = binding.value
      e.onerror = function () {
        var img = new Image()
        var imgAttr = require('@/assets/images/course_ntx.png')
        // 改变图片的src
        img.src = imgAttr
        if (img.filesize > 0 || (img.width > 0 && img.height > 0) || e.src) {
          e.src = imgAttr
        } else {
          // 默认图片也不存在的时候
        }
      }
    })
    // 自定义过滤器
    Vue.filter('to-uppercase', function (value) { // 变为大写
      return value.toUpperCase()
    })
    Vue.prototype.RkeypadBlur = function () { // 移动端失去聚焦
      console.log('测试全局函数')
    }
    // type(add表示添加)
    Vue.prototype.$listen = function (name, callBack, type, init, ev) {
      if (!ev) {
        if (init) callBack()
        type === 'add' ? window.addEventListener(name, callBack) : window.removeEventListener(name, callBack)
      } else {
        let MutationObserver =
          window.MutationObserver ||
          window.WebKitMutationObserver ||
          window.MozMutationObserver
        let observer = new MutationObserver((mutationList, r) => {
          callBack(mutationList)
        })
        if (type === 'add') {
          observer.observe(ev.event, ev.objAttr)
        } else {
          observer.disconnect()
          // this.observer.takeRecords() // 通知队列中删除所有待处理的通知， 并将它们返回到一个MutationRecord对象构成的新数组中。
          observer = null
        }
      }
    }
    Vue.directive('scrllPull', {
      bind(e, binding) {
        Vue.nextTick(() => {
          var demo = e.parentElement
          var dp = e
          demo.style.position = 'fixed'
          demo.style.width = '100%'
          demo.style.height = '100%'
          e.style.transition = 'all 0.1s'
          e.style.height = '100%'
          e.style.position = 'initial'
          e.style.height = 'auto'
          // scrll.style.opacity = 1
          // scrll.style.transition = 'all 0s'
          // scrll.style.display = 'block'
          var odiv = document.createElement('div') // 创建一个div
          var styles = {
            width: '10px',
            'border-radius': '18px',
            position: 'absolute',
            top: 0,
            right: 0,
            background: '#999',
            cursor: 'pointer',
            opacity: 1,
            transition: 'all 0s',
            display: 'block'
          }
          // 获取dp的长度
          var dpHeight = e.offsetHeight
          // 获取demo的长度
          var demoHeight = demo.offsetHeight
          // 根据比值计算scrll的长度
          var scrllHeight = demoHeight * demoHeight / dpHeight
          if (dp.offsetHeight < demo.offsetHeight) {
            scrllHeight = 0
          }
          styles.height = scrllHeight + 'px'
          // scrll.style.height = scrllHeight + 'px'
          // 获取滚动条和内容移动距离的比例
          for (var i in styles) {
            odiv.style[i] = styles[i]
          }
          odiv.className = 'scrll'
          if (!document.querySelector('.scrll')) {
            demo.appendChild(odiv) // 把div添加到body中
          }
          let scrll = document.querySelector('.scrll')
          var bilu = (dp.offsetHeight - demo.offsetHeight) / (demo.offsetHeight - scrll.offsetHeight)
          // 滚动条滚动事件
          scrll.addEventListener('mousedown', function (event) {
            scrll.style.transition = 'all 0.05s'
            scrll.style.opacity = 1
            incident(event, bilu, demo, scrll, dp)
            scrll.onmouseleave = null
          })
          if (scrllHeight > 0 && document.addEventListener) {
            if (document.addEventListener) { // 兼容问题
              // W3C FF
              document.addEventListener('DOMMouseScroll', function (event) {
                e.style.transition = 'all .1s'
                scrll.style.transition = 'all 0.1s'
                scrll.style.opacity = 1
                incidentScr(event, bilu, demo, scrll, dp)
              }, false)
            }
            // IE/Opera/Chrome/Safari
            window.onmousewheel = document.onmousewheel = function (event) {
              e.style.transition = 'all .1s'
              scrll.style.transition = 'all 0.1s'
              scrll.style.opacity = 1
              incidentScr(event, bilu, demo, scrll, dp)
            }
          }

          scrll.onmouseover = function (event) {
            // event.stopPropagation()
            scrll.style.transition = 'all 0s'
            scrll.style.opacity = 1
          }
          scrll.onmouseleave = function (event) {
            scrll.style.transition = 'all .5s'
            scrll.style.opacity = 0
          }
          document.onmouseup = function () {
            document.onmousemove = null
            scrll.style.transition = 'all 1s'
            window.setTimeout(() => {
              scrll.style.opacity = 0
            }, 300)
          }
        })
      }
      // updated (e) {
      //   console.log(e)
      // }
    })

    function incidentScr(event, bilu, demo, scrll, dp) {
      // eslint-disable-next-line no-redeclare
      var moveY = scrll.offsetTop
      if (event.detail) {
        moveY = event.detail > 0 ? moveY + 50 : moveY - 50
      } else if (event.wheelDelta) {
        moveY = event.wheelDelta < 0 ? moveY + 50 : moveY - 50
      } else {
        moveY = event.deltaY > 0 ? moveY + 50 : moveY - 50
      }

      if (moveY < 0) {
        moveY = 0
      };
      if (moveY > demo.offsetHeight - scrll.offsetHeight) {
        moveY = demo.offsetHeight - scrll.offsetHeight
      };
      scrll.style.top = moveY + 'px'
      dp.style.top = -moveY * bilu + 'px'
    }

    function incident(event, bilu, demo, scrll, dp) {
      console.log(scrll)
      // event兼容性解决
      // console.log(demo.offsetTop)
      // eslint-disable-next-line no-redeclare
      var event = event || window.event
      // 获取鼠标按下的页面坐标
      // 滚动条滚动时只有top值改变，所有不需要获取pageX
      var pageY = event.pageY || event.clientY + document.documentElement.scrollTop
      // 获取鼠标在scrll内的坐标
      var scrllY = pageY - demo.offsetTop - scrll.offsetTop

      // 给document绑定鼠标移动事件
      document.onmousemove = function (event) {
        // eslint-disable-next-line no-redeclare
        var event = event || window.event
        // 获取鼠标移动时的坐标
        var moveY = event.pageY || event.clientY + document.documentElement.scrollTop
        // 获取滚动条的移动坐标
        var trueY = moveY - scrllY - demo.offsetTop
        // 限制滚动条移动的范围
        if (trueY < 0) {
          trueY = 0
        };
        if (trueY > demo.offsetHeight - scrll.offsetHeight) {
          trueY = demo.offsetHeight - scrll.offsetHeight
        };
        scrll.style.top = trueY + 'px'
        // 清除选中文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
        // 获取文字区域移动的距离
        var dpY = trueY * bilu
        dp.style.top = -dpY + 'px'
      }
    }
    // Vue.directive('handleImg', function (e, data, vnode, oldVnode) {
    // console.log(e)
    // bind和update  触发相同行为
    // if (e) {
    //   Vue.nextTick(function () {
    //     var dom = e
    //     Vue.prototype.$imgSp(dom, data.value, e.className)
    //     window.addEventListener('orientationchange', function () {
    //       Vue.prototype.$imgSp(dom, data.value, e.className)
    //     })
    //   })
    // }
    // 每当指令绑定到元素上时，会立即执行这个bind函数，只执行一次
    // inserted表示元素插入到DOM中时，会执行inserted函数，只触发一次，el表示被绑定的那个原生js对象
    // inserted: function (el) {
    //  el.focus()
    // },
    // 当VNode更新时会执行updated，可能触发多次
    // updated:function(){}
    // })
  }
}
