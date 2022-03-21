<!-- 底部菜单 -->
<template>
  <div class="bottom-menu-container">
    <div class="bottom-menu-bg"
         @click="onClickOutside"></div>
    <div ref="bottommenu"
         class="bottom-menu-list"
         v-if="type==='custom'">
      <slot name='button-Img'></slot>
    </div>
    <ul ref="bottommenu"
        class="bottom-menu-list"
        v-else>
      <li v-for="(item,index) in menu"
          :key="'menu'+index"
          @click="clickMenu(item.code,item.message)">
        <p>{{item.message}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // menu  菜单数据
  // type 类型
  props: ['menu', 'type'],
  data () {
    return {
      transformNum: 100,
      tipsShowStatu: ''
    }
  },

  components: {},

  created () {
  },

  mounted () {
    const _this = this
    _this.$refs.bottommenu.style.transform = 'translate3d(-50%, ' + _this.transformNum + '%, 0)'
    setTimeout(function () {
      _this.showBottomMenu()
    }, 10)
  },

  methods: {
    // 显示底部菜单
    showBottomMenu () {
      this.tipsShowStatu = true
      const _this = this
      _this.transformNum = _this.transformNum - 10
      _this.$refs.bottommenu.style.transform = 'translate3d(-50%, ' + _this.transformNum + '%, 0)'
      setTimeout(function () {
        if (_this.transformNum > 0) {
          _this.showBottomMenu()
        }
      }, 10)
    },
    // 隐藏底部菜单
    removeBottomMenu () {
      this.tipsShowStatu = false
      const _this = this
      _this.transformNum = _this.transformNum + 10
      if (_this.$refs.bottommenu) _this.$refs.bottommenu.style.transform = 'translate3d(-50%, ' + _this.transformNum + '%, 0)'
      setTimeout(function () {
        if (_this.transformNum < 100) {
          _this.removeBottomMenu()
        } else {
          _this.$emit('parent')
        }
      }, 10)
    },
    // 点击菜单项
    clickMenu (code, label) {
      this.$emit('parentMenu', this.type, code, label)
      this.removeBottomMenu()
    },
    // 操作区外点击事件
    onClickOutside () {
      this.removeBottomMenu()
    }
  },
  computed: {},
  watch: {
    tipsShowStatu (val) {
      this.$emit('navmenu', val)
      try {
        this.$parent.$parent.navmenu(val)
      } catch (error) {
        // console.log(error)
        return error
      }
    }
  }
}

</script>
<style lang='stylus' rel='stylesheet/stylus'>
.bottom-menu-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 3333;

  .bottom-menu-bg {
    width: 100%;
    height: 100%;
    background: #000;
    z-index: 3333;
    opacity: 0.5;
  }

  .bottom-menu-list {
    // width: calc(100% - 0.28rem);
    box-sizing: border-box;
    width: 100%;
    padding-left: 0.14rem;
    padding-right: 0.14rem;
    position: fixed;
    background: #fff;
    -webkit-transform: translate3d(-50%, 100%, 0);
    transform: translate3d(-50%, 100%, 0);
    z-index: 2022;
    top: auto;
    bottom: 0;
    left: 50%;
    z-index: 44444;

    >li {
      width: 100%;
      height: 0.49rem;
      display: flex;
      align-items: center; /* 垂直居中 */
      justify-content: center; /* 水平居中 */
      border-1px($color-s3);

      >p {
        font-size: 0.16rem;
        font-weight: bold;
      }
    }
  }
}
</style>
