<template>
  <div id="app"
       ref="app"
       v-cloak
       @touchmove.prevent>
    <!-- <transition :name="name"> -->
    <!-- v-scrllPull -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view :key="map"
                 v-if="!$route.meta.keepAlive"></router-view>
    <!-- </transition> -->
  </div>

</template>

<script>
// import 'comm/js/global-component'
import { adoptdevice, defaultFontSize } from 'comm/js/utils'
export default {
  name: 'App',
  data () {
    return {
      name: '',
      defaultFontSize: '',
      map: []
    }
  },
  created () {
    this.defaultFontSize = defaultFontSize()
    adoptdevice(1920, 100, this.defaultFontSize)
    window.addEventListener('resize', () => {
      setTimeout(() => {
        adoptdevice(1920, 100, this.defaultFontSize)
      }, 20)
    })
  },
  mounted () {
    // var odiv = document.createElement('div') // 创建一个div
    // var styles = {
    //   width: '10px',
    //   'border-radius': '18px',
    //   position: 'absolute',
    //   top: 0,
    //   right: 0,
    //   background: '#999',
    //   cursor: 'pointer',
    //   opacity: 0,
    //   transition: 'all 0s',
    //   display: 'none'
    // }
    // for (var i in styles) {
    //   odiv.style[i] = styles[i]
    // }
    // odiv.className = 'scrll'
    // if (!document.querySelector('.scrll')) this.$refs.app.appendChild(odiv) // 把div添加到body中
  },
  watch: {
    '$route' (to, from) {
      if (!this.map[to.path]) {
        this.map[to.path] = +new Date() + 1
      }
      if (!this.map[from.path]) {
        this.map[from.path] = +new Date()
      }
      if (this.map[to.path] > this.map[from.path]) {
        this.name = 'fadeX_Next'
      } else {
        this.name = 'fadeX_Prev'
      }
    }
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'comm/stylus/reset.styl';

.fadeX_Prev-enter-active, .fadeX_Prev-leave-active, .fadeX_Next-enter-active, .fadeX_Next-leave-active, .fadeY-enter-active, .fadeY-leave-active {
  transition: all 0.3s;
}

.fadeX_Prev-enter {
  transform: translateX(-100px);
  opacity: 0;
}

.fadeX_Prev-leave-active {
  transform: translateX(100px);
  opacity: 0;
}

.fadeX_Next-enter {
  transform: translateX(100px);
  opacity: 0;
}

.fadeX_Next-leave-active {
  transform: translateX(-100px);
  opacity: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif, PingFang SC;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  // min-width: 1200px;
  // overflow: auto;
  >div {
    font-size: 0.15rem;
    // position: fixed;
    width: 100%;
    height: 100% !important;
    font-family: PingFang-SC-Medium;
  }
}

[v-cloak] {
  display: none !important;
}
</style>
