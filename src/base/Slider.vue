<template>
  <div id="c-slider">
    <div id="test1">
      <!-- @touchmove="startTouchmove" //只用单个滑动事件  -->
      <div class="slider"
           @touchmove="startTouchmove">
        <div class="ruler"
             id="ruler"
             ref="ruler">
          <div ref="bar"
               v-if="rulerSum>=1"
               class="bar startbar"
               @touchstart="startTouchstart"
               @touchmove.stop="startTouchmove">
          </div>
          <div ref="endbar"
               v-if="rulerSum>=2"
               class="bar endbar"
               @touchstart="endTouchstart"
               @touchmove="endTouchmove"></div>
          <span v-if="rulerSum===1"
                :style="{width:stargetWidht}"></span>
        </div>
        <!-- 测试显示数据 -->
        <!-- <div class="date clearfix">
          <div class="fl">{{startStep | hoursFilter}}</div>
          <div class="fr">{{endStep | hoursFilter}}</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'slicer',
  props: {
    number: {
      type: Number,
      default: 1
    },
    intervalStart: {
      type: Number,
      default: 0
    },
    intervalEnd: {
      type: Number,
      default: 10
    },
    startStep: {
      type: Number,
      default: 0
    },
    endStep: {
      type: Number,
      default: 10
    },
    initSum: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      $ruler: '', // 滑竿
      $bar: '', // 左侧滑块
      $endbar: '', // 右侧滑块
      startX: '', // 左侧滑块位置
      endX: '', // 右侧滑块位置
      step: '', // 滑竿在限定范围内可以分多少步
      amountW: '', //  滑竿多长距离
      stargetWidht: '0px', // 滑动添加颜色
      Ewidht: ''// 获取点击按钮的坐标
    }
  },
  filters: {
    hoursFilter (date) {
      return date
      // if (date < 10) {
      //   return '0' + date + ':00'
      // } else {
      //   return date + ':00'
      // }
    }
  },
  created () {
    const vm = this
    vm.$nextTick(() => {
      vm.initSlider()
    })
  },
  methods: {
    initSlider () {
      const vm = this
      vm.$ruler = this.$refs.ruler
      vm.$bar = this.$refs.bar
      vm.$endbar = this.$refs.endbar

      vm.amountW = vm.$ruler.clientWidth - vm.$bar.clientWidth// 滑竿多长距离
      // console.log(vm.$ruler.clientWidth - vm.$bar.clientWidth)
      vm.step = vm.amountW / (vm.intervalEnd - vm.intervalStart) // 总共多少步
      if (vm.initSum > 0) vm.initValue()
    },
    initValue () {
      var vm = this
      var sum = vm.step * (vm.intervalEnd - vm.intervalStart)
      vm.startStep = vm.initSum
      vm.$bar.style.left = sum + 'px'
      vm.stargetWidht = sum + 'px' // 滑动添加颜色
    },
    startTouchstart (e) { // 按下 console.log(e)
      const vm = this
      vm.startX = e.touches[0].pageX // 开始滑动时滑块的位置
      vm.Ewidht = vm.startX - vm.$ruler.offsetLeft - vm.$bar.offsetLeft // 获取点击按钮的坐标
    },
    startTouchmove (e) { // 按下滑动
      const vm = this
      let slidedis = e.touches[0].pageX - vm.$ruler.offsetLeft - vm.Ewidht // 滑动距离=当前滑块x距离-最开始滑块距离 - 按钮的宽度的一半
      if (slidedis < 0 || (slidedis > vm.amountW && vm.rulerSum !== 1)) {
        return
      }
      let ste = Math.round(slidedis / vm.step)
      if (vm.rulerSum !== 1) {
        if ((ste + vm.intervalStart) >= vm.endStep) {
          return
        }
      } else {
        if ((ste + vm.intervalStart) > vm.endStep) {
          return
        }
      }
      vm.startStep = ste + vm.intervalStart
      vm.$bar.style.left = (ste * vm.step) + 'px'
      vm.stargetWidht = (ste * vm.step) + 'px' // 滑动添加颜色
    },
    endTouchstart (e) {
      const vm = this
      vm.endX = e.touches[0].pageX // 开始滑动时滑块的位置
      console.log(vm.endX)
    },
    endTouchmove (e) {
      const vm = this
      let slidedis = e.touches[0].pageX - vm.$ruler.offsetLeft // 滑动距离=当前滑块x距离-最开始滑块距离
      if (slidedis < 0 || slidedis > vm.amountW) {
        return
      }
      let ste = Math.round(slidedis / vm.step)
      if (vm.startStep >= (ste + vm.intervalStart)) {
        return
      }
      vm.endStep = ste + vm.intervalStart
      if (vm.endStep === 24) {
        vm.$endbar.style.left = ''
        vm.$endbar.style.right = '0px'
      } else {
        vm.$endbar.style.left = (ste * vm.step) + 'px'
      }
    },
    boxGetval (box1, box2) {
      this.$emit('SliderDataFun', box1, box2)
    }
  },
  computed: {
    rulerSum () {
      return this.number
    }
  },
  watch: {
    stargetWidht () {
      this.boxGetval(this.startStep, this.endStep)
    },
    endStep (val) { console.log(val) }
  }
}
</script>

<style  scoped lang="stylus" rel="stylesheet/stylus">
#c-slider {
  .clearfix {
    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }

  .slider {
    margin: auto;
    width: 80%;
    padding: 0.2rem;

    .date {
      color: #333;
      font-size: 0.7rem;
      margin-top: 1rem;

      .fl {
        float: left;
      }

      .fr {
        float: right;
      }
    }

    .ruler {
      background: #F5F7FA;
      height: 8px;
      position: relative;
      border-radius: 10px;

      // margin-top: 75px;
      >span {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        border-radius: 10px 0px 0px 10px;
        background: #2396F5;
        z-index: 1;
      }

      .bar {
        position: absolute;
        top: -10px;
        height: 28px;
        width: 28px;
        border-radius: 100%;
        background: #fff;
        box-shadow: 0px 1px 14px #CFD7E4;
        font-size: 0.3rem;
        line-height: 0.65rem;
        text-align: center;
        z-index: 2;
      }

      .startbar {
        position: relative;
        left: 0;
      }

      .endbar {
        right: 0;
        background: #879bae;
        position: relative;
      }
    }
  }
}
</style>
