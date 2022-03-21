<template>
  <div class="lectures">
    <!-- <a href="http://192.168.0.24/#/lectures">aa</a> -->
    <scroll ref="wapper"
            class="wapper">
      <div class="lectures-navigation">
        <p><span :class="{activeP:index===1,Message:true}"
                @click="index=1">首页<i></i></span>
          <span :class="{activeP:index===2,Message:true}"
                @click="index=2">消息<i></i></span></p>
      </div>
    </scroll>
    <auto-quit-tips :message="message">
    </auto-quit-tips>
  </div>
</template>

<script>
import scroll from 'base/classList-scroll'
import { loginInfo } from 'comm/js/utils.js'
// import bus from 'comm/js/bus.js'
export default {
  name: 'lectures',
  components: {
    // Slider: resolve => require(['base/Slider'], resolve), // 课堂信息
    scroll
  },
  data () {
    return {
      index: 1
    }
  },
  created () {
    // console.log(1)
  },
  activated () {
    // this.WebSocketTest()
    // console.log(2)
  },
  mounted () {

  },

  methods: {
    // WebSocketTest () {
    //   if ('WebSocket' in window) {
    //     alert('您的浏览器支持 WebSocket!')
    //     var ws = new WebSocket('wss://localhost:80')
    //     ws.onopen = function () {
    //       console.log(`“open''`)
    //       ws.send(`“hello”`)
    //     }
    //     ws.onmessage = function (evt) {
    //       console.log(evt.data)
    //     }
    //     ws.onclose = function (evt) {
    //       console.log(evt)
    //     }
    //     ws.onerror = function (evt) {
    //       console.log(evt)
    //     }
    //   } else {
    //     // 浏览器不支持 WebSocket
    //     alert('您的浏览器不支持 WebSocket!')
    //   }
    // },

  },
  computed: {
    params () {
      var p = loginInfo()
      var param = {
        userCode: p.userCode,
        universityId: p.universityId,
        operatorId: p.operatorId,
        clientCategory: p.clientCategory,
        addScores: this.Pdranking ? this.comScoresArr() : undefined,
        interactTypeCode: this.index === 1 ? 'INTERACT_TYPE_VIE_QUESTION' : 'INTERACT_TYPE_HOLD_UP_HAND',
        orgCode: p.orgCode,
        majorCode: p.majorCode,
        teacherCode: p.teacherCode,
        courseCode: p.courseCode,
        teachingClassCode: p.teachingClassCode,
        courseTimeTableDetailCode: p.courseTimeTableDetailCode,
        interactName: this.index === 1 ? '抢答活动' : '举手活动',
        maxPeopleRestrict: this.index === 1 ? this.thisSum : undefined,
        minPeopleRestrict: 1,
        interactStartTime: p.interactStartTime,
        interactEndTime: p.interactEndTime,
        interactStatus: 'INTERACT_STATUS_SIGN_UP_ING'// 报名中
      }
      return param
    },
    watch: {
      // index (val) {
      //   var vm = this
      //   vm.mcData.forEach(r => {
      //     r.val = 0
      //   })
      // document.title = val === 1 ? '抢答' : '举手'
      // }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to { /* .fade-leave-active below version 2.1.8 */
  opacity: 0;
}

.button-Img-types {
  display: flex;
  align-items: center;

  p {
    display: inline-block;
    width: 50%;
    float: left;
    text-align: center;
    padding: 0.4rem 0;

    img {
      width: 0.6rem;
      height: 0.6rem;
    }

    label {
      display: block;
      color: #333333;
      font-weight: bold;
      font-size: 0.12rem;
    }
  }
}

.lectures {
  user-select: none;
  font-size: 0.15rem;

  >a {
    position: relative;
    color: rgba(255, 255, 255, 1);
    text-decoration: none;
    background-color: rgba(219, 87, 51, 1);
    font-weight: 700;
    font-size: 3em;
    display: block;
    padding: 4px;
    border-radius: 8px;
    box-shadow: 0px 9px 0px rgba(219, 31, 5, 1), 0px 9px 25px rgba(0, 0, 0, 0.7);
    margin: 100px auto;
    width: 160px;
    text-align: center;
    transition: all 0.1s ease;
  }

  >a:active {
    box-shadow: 0px 3px 0px rgba(219, 31, 5, 1), 0px 3px 6px rgba(0, 0, 0, 0.9);
    position: relative;
    top: 6px;
    font-size: 3em;
  }

  &-slider {
    padding: 0rem 0.2rem 0.15rem 0.2rem;
  }

  &-navigation {
    background-color: #fff;
    border-bottom: 1px solid #F5F7F9;
    // box-shadow: 0px 1px 1px #E1E6ED;
    margin-bottom: 0.16rem;

    p:nth-child(1) {
      padding: 0 0.15rem;
      // height: 0.6rem;
      display: flex;
      align-items: center;
      // border-bottom: 1px solid #F5F7F9;
      box-sizing: border-box;
      font-size: 0.17rem;
      color: #666666;
      width: 100%;

      .activeP {
        vertical-align: inherit;
        font-size: 0.2rem;
        color: #333333;
        font-weight: bold;
        vertical-align: initial !important;

        i {
          position: absolute;
          left: 25%;
          right: 0;
          bottom: 0;
          border-radius: 50px;
          width: 40%;
          height: 3px;
          background-color: #2396f5;
          box-shadow: 0px 0px 1px #42a5fd;
        }
      }

      .Message:before {
        position: absolute;
        content: '';
        width: 0.1rem;
        height: 0.1rem;
        background-color: #F04646;
        top: 0.1rem;
        right: 0rem;
        border-radius: 50%;
      }

      span:nth-child(1) {
        margin-right: 0.2rem;
      }

      span {
        display: inline-block;
        vertical-align: middle;
        transition: all 0.3s;
        color: #999;
        line-height: 0.6rem;
        position: relative;
        width: 0.5rem;
        text-align: center;
      }
    }

    p:nth-child(2) {
      text-align: center;

      label {
        font-size: 0.75rem;
        color: #333;
        display: block;
      }

      span {
        font-size: 0.12rem;
        color: #999999;
      }
    }
  }
}
</style>
