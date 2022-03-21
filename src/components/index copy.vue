<template>
  <div class="index"
       ref="indexf">
    <div class="index-content"
         ref="indexContent">
      进入页面...
      <p style="height:500px">11111111111111</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p style="height:500px">23333333333333</p>v
      <p>1</p>
      <p>1</p>
      <p>1</p>v
      <p>1</p>v
      <p>1</p>
      <p style="height:500px">222222222222222222</p>
      <p>1</p>
      <p>1</p>
    </div>
    <!-- <div class="scrll"
    ref="scrll"></div>-->
    <!-- <canvas ref="canvas"
    @mouseover="qwe"></canvas>-->
    <!-- <div>123123123123123</div>
    <div class="e-calendar-toolbar-title">
      <transition :name="fadeXType">
        <div class="e-calendar-toolbar-title-content"
             :key="i">
          <strong @click="openYearList">
            -</strong> <span>{{i}}</span>
          <strong @click="openYearListr">
            +
          </strong>
        </div>
      </transition>
    </div>
    <svg viewBox="0 0 24 24"
         class="e-calendar-svg-icon">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
    </svg>-->
    <!-- <div class="container">
      <div class="cube">
        <div class="front"><a href=""
             target="_blank"
             rel="nofollow"
             style="font-size:28px;">个人博客</a></div>
        <div class="back"><a href=""
             target="_blank"
             rel="nofollow"
             style="font-size:28px;">个人博客</a></div>
        <div class="right"><a href=""
             target="_blank"
             rel="nofollow"
             style="font-size:28px;">个人博客</a></div>
        <div class="left"><a href=""
             target="_blank"
             rel="nofollow"
             style="font-size:28px;">个人博客</a></div>
        <div class="top"><a href=""
             target="_blank"
             rel="nofollow"
             style="font-size:28px;">个人博客</a></div>
        <div class="bottom"><a href=""
             target="_blank"
             rel="nofollow"
             style="font-size:28px;">个人博客</a></div>
      </div>
    </div>-->
  </div>
</template>

<script type="ecmascript-6">
export default {
  name: '',
  components: {},
  data () {
    return {
      fadeXType: '',
      i: 0
    }
  },
  created () {
    // console.log(this.$route)
  },
  mounted () { },
  methods: {
    roundedRect (ctx, x, y, width, height, radius) {
      // 绘制图形
      ctx.beginPath()
      ctx.moveTo(x, y + radius)
      ctx.lineTo(x, y + height - radius)
      ctx.quadraticCurveTo(x, y + height, x + radius, y + height)
      ctx.lineTo(x + width - radius, y + height)
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width,
        y + height - radius
      )
      ctx.lineTo(x + width, y + radius)
      ctx.quadraticCurveTo(x + width, y, x + width - radius, y)
      ctx.lineTo(x + radius, y)
      ctx.quadraticCurveTo(x, y, x, y + radius)
      ctx.stroke()
    },
    openYearList () {
      this.fadeXType = 'fadeX_Prev'
      this.i++
    },
    openYearListr () {
      // this.fadeXType = 'fadeX_Next'
      this.i--
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.index {
  position: relative !important;
  overflow: hidden;
}

.scrll {
  width: 18px;
  border-radius: 18px;
  position: absolute;
  top: 0;
  right: 0;
  background: red;
  cursor: pointer;
}

.cube div {
  width: 120px;
  height: 120px;
  display: block;
  margin: 0;
  position: absolute;

  &-content {
    position: absolute;
    width: 100%;
  }
}

.container {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  position: fixed;
  z-index: 999;
  -webkit-perspective: 1000px;
  perspective: 1000px;
  right: 0px;
  bottom: 0px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}

.cube {
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  transform: rotateX(20deg) rotateY(60deg) translateZ(-100px);
  transform-origin: center center -100px;
  animation: around 5s cubic-bezier(0.94, -0.6, 0.45, 1.31) infinite;
  // cubic-bezier(0.94, -0.6, 0.45, 1.31)
}

@keyframes around {
  from {
    // transform: rotate(0deg);
    transform: rotateX(0deg) rotateY(0deg) translateZ(-100px);
  }

  to {
    transform: rotateX(0deg) rotateY(360deg) translateZ(-100px);
  }
}

.cube .front {
  -webkit-transform: rotateY(0deg) translateZ(60px);
  transform: rotateY(0deg) translateZ(62px);
  background-color: rgba(0, 191, 255, 0.7);
  border: 2px solid rgba(0, 191, 255, 0.7);
}

.cube .back {
  -webkit-transform: rotateX(180deg) translateZ(60px);
  transform: rotateX(180deg) translateZ(62px);
  background-color: rgba(124, 252, 0, 0.7);
  border: 2px solid rgba(124, 252, 0, 0.7);
}

.cube .right {
  -webkit-transform: rotateY(90deg) translateZ(60px);
  transform: rotateY(90deg) translateZ(62px);
  background-color: rgba(255, 69, 0, 0.7);
  border: 2px solid rgba(255, 69, 0, 0.7);
}

.cube .left {
  -webkit-transform: rotateY(-90deg) translateZ(60px);
  transform: rotateY(-90deg) translateZ(62px);
  background-color: rgba(255, 215, 0, 0.7);
  border: 2px solid rgba(255, 215, 0, 0.7);
}

.cube .top {
  -webkit-transform: rotateX(90deg) translateZ(60px);
  transform: rotateX(90deg) translateZ(62px);
  background-color: rgba(255, 0, 157, 0.7);
  border: 2px solid rgba(255, 0, 157, 0.7);
}

.cube .bottom {
  -webkit-transform: rotateX(-90deg) translateZ(60px);
  transform: rotateX(-90deg) translateZ(62px);
  background-color: rgba(184, 111, 220, 0.7);
  border: 2px solid rgba(184, 111, 220, 0.7);
}
</style>
