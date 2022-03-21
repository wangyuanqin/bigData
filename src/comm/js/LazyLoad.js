// Vue 图片懒加载，导出模块

export default (Vue, options = {}) => {
  // 初始化的选项，default是未加载图片时显示的默认图片
  // 数组item remove方法

  if (!Array.prototype.remove) {
    // eslint-disable-next-line no-extend-native
    Array.prototype.remove = function (item) {
      if (!this.length) return

      var index = this.indexOf(item)

      if (index > -1) {
        this.splice(index, 1)

        return this
      }
    }
  }

  var init = {
    default: require('@/assets/images/vLoad.png')
  }
  // 需要进行监听的图片列表，还没有加载过得
  var listenList = []
  // 已经加载过得图片缓存列表
  var imageCatcheList = []
  // 加载状态，如果正在加载则不重复加载
  var loadStu = false
  // 是否已经加载过了,判断是否已经加载过了这个图片
  const isAlredyLoad = (imageSrc) => {
    if (imageCatcheList.indexOf(imageSrc) > -1) {
      return true
    } else {
      return false
    }
  }
  // 检测图片是否可以加载，如果可以则进行加载
  const isCanShow = (item, binding) => {
    if (!item) return
    var ele = item.ele
    var src = item.src
    // 图片距离页面顶部的距离
    var top = ele.getBoundingClientRect().top
    // 页面可视区域的高度
    var windowHeight = window.innerHeight
    // 错误默认图片
    // eslint-disable-next-line no-unused-vars
    var imgAttr = ''
    if (binding.modifiers.a) {
      // 其他默认图片
    } else {
      imgAttr = require('@/assets/images/course_hd.png')
    }
    // top + 10 已经进入了可视区域10像素
    if (top + 10 < windowHeight) {
      var image = new Image()
      image.src = src

      image.onload = function () {
        ele.src = src
        imageCatcheList.push(src)
        listenList.remove(item)
      }
      image.onerror = function () {
        // imageCatcheList.push(imgAttr)
        // listenList.remove(item)
        var img = new Image()
        // 改变图片的src
        img.src = imgAttr
        if (img.filesize > 0 || (img.width > 0 && img.height > 0) || ele.src) {
          ele.src = imgAttr
        } else {
          // 默认图片也不存在的时候
        }
      }
      return true
    } else {
      return false
    }
  }
  const IsPc = () => {
    // 判断是否为pc端或移动端
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    if (isAndroid || isiOS) return true
    return false
  }
  // 添加监听事件scroll
  const onListenScroll = (binding) => {
    var affairNmae = IsPc ? 'touchend' : 'scroll'
    window.addEventListener(affairNmae, function (e) {
      if (!loadStu) {
        loadStu = true
        this.setTimeout(() => {
          var length = listenList.length
          for (let i = 0; i < length; i++) {
            isCanShow(listenList[i], binding)
            if (i === length - 1) {
              loadStu = false
            }
          }
        }, 1000)
      }
    })
  }

  // addListener为Vue指令的具体实现功能函数，我们这里为所有使用v-lazyload的指令的元素添加监听

  // ele 是dom元素，binding是绑定的具体值，

  // 例如：<img v-lazyload="imageSrc" > ele是img binding是imageSrc
  const addListenner = (ele, binding) => {
    // 绑定的图片地址
    var imageSrc = binding.value
    // 如果已经加载过，则无需重新加载，直接将src赋值
    if (isAlredyLoad(imageSrc)) {
      ele.src = imageSrc
      return false
    }
    var item = {
      ele: ele,
      src: imageSrc
    }
    // 图片显示默认的图片
    ele.src = init.default
    // 再看看是否可以显示此图片
    if (isCanShow(item, binding)) {
      return
    }
    // 否则将图片地址和元素均放入监听的lisenList里
    listenList.push(item)

    // 然后开始监听页面scroll事件
    onListenScroll(binding)
  }

  // Vue自定义指令，lazyload为指令的名称

  Vue.directive('lazyload', {
    inserted: addListenner,
    updated: addListenner
  }
    // function (e, binding, vnode, oldVnode) {
    //   addListenner(e, binding, vnode, oldVnode)
    // }
  )
}
