<template>
  <div class="Alert"
       v-show="Show"
       @click="(cancel && affirm) || boxcancel()"
       ref="Alert">
    <div class="Alert-weui-mask"></div>
    <div class="Alert-weui-content"
         :class="{Activearise:parentShow,Activevanish:!parentShow}">
      <img v-if="Alertsrc!==''"
           :src='Alertsrc'>
      <strong v-else-if="title!==''"
              class="weui-dialog__title weui-dialog__hd">{{title}}</strong>
      <div class="weui-dialog__bd"
           :class="{comAlignText:comAlign}">
        {{textHint}}
      </div>
      <div class="weui-dialog__ft"
           v-if="cancel||affirm">
        <a href="javascript:;"
           v-if="cancel!==''"
           class="weui-dialog__btn weui-dialog__btn_primary qx"
           @click.stop="boxcancel">{{cancel}}</a>
        <a href="javascript:;"
           v-if="affirm!==''"
           class="weui-dialog__btn weui-dialog__btn_primary qr"
           @click.stop="boxaffirm">{{affirm}}</a>
      </div>
    </div>
  </div>
</template>

<script type="ecmascript-6">

export default {
  data () {
    return {
      Show: false
    }
  },
  props: {
    // parentAShow: {
    //   type: Number,
    //   default: 1
    // },
    parentShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    textHint: {
      type: String,
      default: ''
    },
    cancel: {
      type: String,
      default: ''
    },
    affirm: {
      type: String,
      default: ''
    },
    Alertsrc: {
      type: String,
      default: ''
    }
  },
  created () {
    setTimeout(() => {
      this.Show = this.parentShow
    }, 200)
  },

  mounted () {
  },
  deactivated () {
  },
  methods: {
    boxcancel () {
      setTimeout(() => {
        this.$emit('update:parentShow', false)
        this.$emit('boxcancel', this.cancel)
        if (this.cancel === '不在提示') {
          sessionStorage.setItem('sign_init', true)
        }
      }, 300)
    },
    boxaffirm () {
      setTimeout(() => {
        this.$emit('update:parentShow', false)
        this.$emit('boxaffirm', this.affirm)
      }, 300)
    }
  },
  computed: {
    comAlign () {
      return !this.affirm && !this.cancel
    }
  },
  watch: {
    parentShow (val) {
      if (!val) {
        this.$refs.Alert.style.opacity = 0.9
      } else {
        this.$refs.Alert.style.opacity = 1
      }
      console.log(val)
      setTimeout(() => {
        this.Show = val
      }, 200)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.Alert {
  transition: opacity 0.2s;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3333;

  &-weui-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .Activearise {
    // transition: all 0.3s;
    // ease-in ease-out ease-in-out;
    // infinite //循环播放
    // forwards  //加载保留最后值
    animation: tttPi 0.2s 1 forwards;
  }

  @keyframes tttPi {
    0% {
      max-width: 310px;
      opacity: 0.3;
      bottom: 0.1rem;
    }

    50% {
      max-width: 290px;
      opacity: 0.8;
      bottom: 0.02rem;
    }

    100% {
      max-width: 289px;
      bottom: 0;
      opacity: 1;
    }
  }

  .Activevanish {
    // transition: all 0.3s;
    // ease-in ease-out ease-in-out;
    // infinite //循环播放
    // forwards  //加载保留最后值
    animation: tttPz 0.2s 1 forwards;
  }

  @keyframes tttPz {
    0% {
      max-width: 280px;
      bottom: 0.08rem;
      top: 0.08rem;
    }

    50% {
      max-width: 279px;
      bottom: 0.05rem;
      top: 0.05rem;
    }

    100% {
      max-width: 275px;
      bottom: 0;
      top: 0;
    }
  }

  &-weui-content {
    position: fixed;
    display: table;
    z-index: 5000;
    width: 80%;
    max-width: 289px;
    top: 50%;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateY(-50%);
    margin: 0 auto;
    background-color: #fff;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
    padding-top: 5px;
    transition: all 0.3s;
    box-shadow: 0px 1px 3px #eee;

    >img {
      margin-top: 0.1rem;
      width: 0.73rem;
    }

    >strong {
      font-weight: bold;
    }
  }

  .weui-dialog__hd {
    // padding: 1.3em 1.6em 0.5em;
  }

  .comAlignText {
    text-align: left;
  }

  .weui-dialog__bd {
    padding: 1.2em 0.8em;
    min-height: 40px;
    font-size: 15px;
    line-height: 1.3;
    word-wrap: break-word;
    word-break: break-all;
    color: #666666;
    max-width: 280px;
    overflow: auto;
    max-height: 400px;
  }

  .weui-dialog__ft {
    position: relative;
    line-height: 48px;
    font-size: 18px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    border-top: 1px solid #eee;

    a:active {
      background-color: #eee;
    }

    .qx {
      border-right: 1px solid #eee;
      color: #333333;
    }

    .qr {
      // border-left: 1px solid #eee;
      color: #0A82E6;
    }

    a {
      border-right: 1px solid #eee;
      font-weight: bold;
      font-size: 0.14rem;
      width: 50%;
      text-align: center;
      flex: 1;
    }
  }
}
</style>
