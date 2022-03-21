<template>
  <div ref="wrapper"
       class="wapper-content"
       :probeType="3">
    <div>
      <!--  -->
      <div class="strgetMore"
           ref="strgetMore"
           :style="{'height':RefreshHeight}"
           v-if="PDstr&&strenoughTop">
        <p :class="{'getMore-stu-gray': !loadSTRef}"
           ref="wapper_P">
          <img v-show='loadSTRef'
               ref="wapper_Img"
               src="../assets/images/scroll_Refres.gif"
               class="wrapper-loading">{{loadSTRef?'松开刷新...':loadStrRefresh?'刷新成功!' : '刷新失败!'}}</p>
      </div>
      <slot></slot>
      <div v-if="enoughHeight">
        <div v-if="loadStu && isWXGD"
             class="getMore"><img src="../assets/images/loading-srcl.gif"
               class="wrapper-loading">加载中</div>
        <div v-else-if="!loadStu && isWXGD"
             class="getMore getMore-stu"
             :class="{'getMore-stu-gray': !loadCode}"><span>{{loadStuMessage?'上拉加载更多':(loadCode?'我也是有底线的':'加载失败')}}</span></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      // 刷新状态的高度
      RefreshHeight: 0,
      // 顶部是否下拉距离
      strenoughTop: false,
      // 鼠标按下(刷新)
      strButTop: false,
      // 高度是否达标
      enoughHeight: false,
      // 刷新加载状态
      loadSTRef: true,
      // 加载状态，如果正在加载则不重复加载
      loadStu: false,
      // 刷新成功;true:40001
      loadStrRefresh: false,
      // 是否加载成功;true:40001
      loadStuMessage: true,
      // 是否还有数据
      loadCode: true,
      // 无限加载参数
      wxjzParams: {
        pageNum: 2
      }
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    },
    pullup: {
      type: Boolean,
      default: false
    },
    beforeScroll: {
      type: Boolean,
      default: false
    },
    touchend: {
      type: Boolean,
      default: false
    },
    scrollEnd: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    bounce: {
      type: Boolean,
      default: true
    },
    stopPropagation: {
      type: Boolean,
      default: false
    },
    PDstr: { // 开启下拉刷新
      type: Boolean,
      default: false
    },
    // 是否开启无限滚动加在
    isWXGD: {
      type: Boolean,
      default: false
    },
    loadUrl: {
      type: String,
      default: ''
    },
    loadParams: {}
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        bounce: this.bounce,
        stopPropagation: this.stopPropagation // 点击冒泡
      })
      if (this.listenScroll) {
        let me = this
        this.scroll.on('scroll', (pos) => {
          me.$emit('scrolly', pos)
          // 判断是否是无限加载并添加加载模块  - 上拉
          if (me.isWXGD && !this.enoughHeight && this.scroll.maxScrollY < 0) {
            this.enoughHeight = true
          }
          // 刷新->
          if (this.$refs.strgetMore && pos.y / 100 > 0.2) {
            this.RefreshHeight = pos.y / 100 + 'rem'
            this.$refs.wapper_Img.style.width = `${pos.y / 100 > 0.5 ? 0.5 : pos.y / 100}rem`
          }
          if (me.PDstr && (!this.strenoughTop || !this.loadStrRefresh) && pos.y >= 40 && this.scroll.distY >= 150 && me.strButTop) {
            this.strenoughTop = true
            this.loadSTRef = true
          }
        })
      }

      if (this.pullup) { // 滑动停止触发
        let me = this
        this.scroll.on('scrollEnd', () => {
          if (me.PDstr && this.strenoughTop && this.scroll.y >= 0 && this.scroll.distY >= 150) { // 上拉
            me.getStrData()
          }
          // console.log(me.PDstr, this.scroll.y, this.scroll.maxScrollY, Math.abs(this.scroll.maxScrollY), this.scroll.maxScrollY, this.scroll.distY)
          if (me.isWXGD && this.scroll.y <= (this.scroll.maxScrollY) && Math.abs(this.scroll.maxScrollY) > 0) { // 刷新
            me.getMoreData()
          }
        })
      }

      if (this.scrollEnd) {
        this.scroll.on('scrollEnd', (pos) => {
          this.$emit('scrollEnd', pos)
        })
      }
      if (this.beforeScroll) {
        let me = this
        this.scroll.on('beforeScrollStart', () => {
          me.strButTop = true
        })
      }
      if (this.touchend) {
        let me = this
        this.scroll.on('touchEnd', (pos) => {
          me.strButTop = false
        })
      }
    },

    initEnoughHeight () {
      this.enoughHeight = false
    },
    initPage (pageNum) {
      this.wxjzParams.pageNum = pageNum
    },
    // 刷新数据
    getStrData () {
      var vm = this
      if (!vm.strButTop) { // 按下下拉刷新
        if (vm.loadStu) {
          return
        }
        vm.loadStu = true
        const params = Object.assign(vm.loadParams, { pageNum: 1, pageSize: vm.loadParams.pageSize * (vm.wxjzParams.pageNum - 1) })
        setTimeout(() => {
          vm.$http.get(vm.loadUrl, params).then((res) => {
            var d = res
            if (d.code === '40001') {
              vm.$emit('scrollToEndPDstr', res.content.list)
              vm.loadStrRefresh = true
              setTimeout(() => {
                vm.comstrShow()
              }, 1000)
            } else {
              vm.loadStrRefresh = false
            }
            vm.loadStu = false
            vm.loadSTRef = false
          }).catch((res) => {
            vm.loadStrRefresh = false
            vm.loadStu = false
            vm.loadSTRef = false
          })
          this.initPage(2)
        }, 200)
      }
    },
    comstrShow () {
      var vm = this
      if (!vm.strButTop) {
        if (vm.$refs.strgetMore) vm.$refs.strgetMore.style.height = 0
        setTimeout(() => {
          vm.strenoughTop = false
        }, 1000)
      } else {
        setTimeout(() => {
          this.comstrShow()
        }, 1000)
      }
    },
    // 加载更多数据
    getMoreData () {
      var vm = this
      if (vm.loadStu) {
        return
      }
      vm.loadStu = true
      const params = Object.assign(vm.loadParams, vm.wxjzParams)
      setTimeout(() => {
        this.$http.get(vm.loadUrl, params).then((res) => {
          var d = res
          if (d.code === '40001') {
            if (d.content.list.length < 1) {
              vm.loadCode = true
              vm.loadStuMessage = false
            } else {
              vm.loadCode = true
              vm.loadStuMessage = true
              vm.wxjzParams.pageNum += 1
              vm.$emit('getMore', d.content)
            }
          } else if (d.code === '30005') {
            vm.loadCode = true
            vm.loadStuMessage = false
          } else {
            vm.loadCode = false
            vm.loadStuMessage = false
          }
          vm.loadStu = false
        }).catch((res) => {
          console.log(res)
          vm.loadStuMessage = false
          vm.loadCode = false
          vm.loadStu = false
        })
      }, 200)
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    scrollTo (obj) {
      this.scroll && this.scroll.scrollTo(obj.x, obj.y, 0, '')
      // this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement (el) {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  updated () {
    // if (!this.strenoughTop) this.refresh()
  },
  watch: {
    data () {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.wapper-content {
  height: 100%;
}

.strgetMore {
  text-align: center;
  font-size: 0.12rem;
  color: #333;
  overflow: hidden;
  line-height: 0.2rem;
  height: 0.2rem;
  transition: all 0.3s;
  // position: absolute;
  // width: 100%;
  // transition: all 0.1s;
}

.getMore {
  position: relative;
  text-align: center;
  height: 0.3rem;
  line-height: 0.3rem;
  font-size: 0.12rem;
  z-index: 9;

  img {
    // transition: all 0.3s;
    width: 0.2rem;
  }
}

.getMore-stu {
  position: relative;
}

.getMore-stu {
  span {
    position: relative;
  }

  span:before {
    content: '';
    position: absolute;
    width: 0.15rem;
    height: 0.01rem;
    background: #e8ebed;
    left: -0.2rem;
    top: 50%;
    transform: translateY(-50%);
  }

  span:after {
    content: '';
    position: absolute;
    width: 0.15rem;
    height: 0.01rem;
    background: #e8ebed;
    right: -0.2rem;
    top: 50%;
    transform: translateY(-50%);
  }
}

.getMore-stu-gray {
  color: rgb(153, 153, 153);
}

.wrapper-loading {
  width: 0.2rem;
  margin-right: 0.05rem;
  vertical-align: middle;
  margin-top: -0.02rem;
  transition: all 0.2s;
}
</style>
