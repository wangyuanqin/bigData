<!-- 自动退出提示信息 -->
<template>
  <div class="auto-quit-tips-container"
       ref="autoquittips"
       v-if="tipsShowStatu">
    <div>
      <p>{{message}}</p>
    </div>
  </div>
</template>

<script>
export default {
  // showStatu 显示状态
  props: {
    tipsShow: {
      type: String,
      default: ''
    },
    message: {
      type: String
    },
    top: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      tipsShowStatu: false,
      time: 1500
    }
  },

  components: {},

  created () {
  },

  mounted () {
  },

  methods: {
    closeTips () {
      const _this = this
      _this.tipsShowStatu = false
      if (_this.$parent.message) _this.$parent.message = ''
    }
  },

  computed: {},
  watch: {
    message (val) {
      if (!val) return
      const _this = this
      _this.tipsShowStatu = true
      _this.$nextTick(() => {
        if (_this.top === 0) {

        } else if (_this.top === 1) {
          _this.$refs.autoquittips.style.top = this.top + 'px'
        } else {
          _this.$refs.autoquittips.style.top = (document.body.clientHeight / 2) + this.top + 'px'
        }
      })
      setTimeout(function () {
        _this.closeTips()
      }, _this.time)
    }
  }
}

</script>
<style lang='stylus' rel='stylesheet/stylus'>
.auto-quit-tips-container {
  position: fixed;
  // display: block;
  top: 50%;
  width: 100%;
  height: 100vh;
  padding-left: 0.24rem;
  padding-right: 0.24rem;
  max-width: calc(100% - 0.48rem);
  min-height: 0.2rem;
  text-align: center;
  vertical-align: middle;
  left: 0px;
  right: 0px;
  // top: 0px;
  bottom: 0px;

  >div {
    width: 100%;
    display: flex;
    justify-content: center; /* 水平居中 */

    >p {
      padding: 0.12rem 0.12rem;
      color: #FFF;
      font-size: 0.14rem;
      background-color: rgba(51, 51, 51, 0.8);
      border-radius: 0.06rem;
      transition: all 0.3s;
    }
  }
}
</style>
