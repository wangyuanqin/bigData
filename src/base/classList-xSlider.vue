<template>
  <div class="xSlider"
       ref="xSlider">
    <div class="slider-group"
         ref="sliderGroup">
      <div class="slider-content">
        <slot name="slider-content">
        </slot>
      </div>
      <div class="slider-group-btn">
        <slot name="slider-btn"></slot>
      </div>
    </div>
    <slot name="sign-solid"></slot>
  </div>
</template>

<script type="ecmascript-6">
import { addClass } from 'comm/js/dom'
import BScroll from 'better-scroll'
export default {
  name: 'classListSign',
  data () {
    return {
      pd_gz: true,
      pageIndex: 0
    }
  },

  activated () {
  },

  created () {
  },

  mounted () {
    this.setSliderWidth()
    this.init()
    // this.pd_gz = false
    // setTimeout(() => {
    //   this.pd_gz = true
    // }, 500)
  },
  deactivated () {
    this.pd_gz = false
  },
  methods: {
    setSliderWidth () {
      this.children = this.$refs.sliderGroup.children
      let sliderWidth = this.$refs.xSlider.clientWidth
      this.children[0].style.width = sliderWidth + 20 + 'px'
      let width = 0
      for (let i = 0; i < this.children.length; i++) {
        width += this.children[i].clientWidth
        addClass(this.children[i], 'slider-item')
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    init () {
      var vm = this
      // 实例化scroll
      this.scroll = new BScroll(this.$refs.xSlider, {
        scrollX: true,
        scrollY: false,
        momentum: false, // 关闭或者打开惯性运动的执行
        snap: true, // 隔断（翻页）
        snapSpeed: 400, // 滑动的时间
        probeType: 2
      })
      this.scroll.on('scrollStart', (e) => {
        this.$emit('scrollStart', vm)
      })
      this.scroll.on('scrollEnd', (pos) => {
        if (pos.x <= -1) {
          vm.initScroll(pos.x)
        } else {
          vm.initScroll()
        }
        this.pageIndex = this.scroll.getCurrentPage().pageX
        // console.log(this.pageIndex)
      })
    },
    initScroll (x) {
      this.scroll.goToPage(x ? 1 : 0, 0, 400)
    }
  },
  computed: {
    pd_type () {
      if (this.pd_gz) {
        return 'red'
      } else {
        return '#fff'
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slider-group {
  display: inline-block;
  white-space: nowrap;
  align-items: center;

  .slider-item {
    float: left;
    display: inherit;
    height: 100%;
  }

  .slider-group>div {
    display: inline-block;
    height: 100%;
  }
}

.slider-group>div:first-child {
  background-color: white;
  // .slider-item
  // height: .4rem
}

.slider-content {
  // float: left
}

.slider-group-btn {
  display: inline-block;
  color: white;
  padding: 0 0.15rem;
  position: fixed;
  background-color: red;
  // float: right
}
</style>
