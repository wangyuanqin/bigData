<template>
  <div class="construction">
    <div class="construction-title">
      <div class="construction-title-let"><label><img src="static/images/loginBig.png">数据大屏</label></div>
      <div class="construction-title-center"><span>{{$contBigTile}}</span></div>
      <div class="construction-title-rit"></div>
    </div>
    <div class="construction-contre">
      <div class="construction-contre-let">
        <div class="construction-contre-let-title">
          <span>办学历程</span>
        </div>
        <div class="construction-contre-let-details"
             ref="schoolCourseDataSum">
          <ul v-for="(m,i) in schoolCourseDataSum"
              :class="[schoolCourseDataSumJusge?'schoolCourseDataSum':'']"
              :style="{'--time':schoolCourseData.length*4+'s'}"
              :key="i">
            <li v-for="(item,index) in schoolCourseData"
                :key="index">
              <img src="static/images/runBz.png">
              <span>
                <label>{{item.dataDate}}</label>
                <b>{{item.dataContents}}</b>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="construction-contre-center">
        <div class="text effect01"
             ref="effect01">
          <a ref='effect01A'>U P</a>
        </div>
        <div class="construction-contre-center-arrows">
          <img ref="effect01AImg"
               src="static/images/centre-arrows.png">
        </div>
        <div class="construction-contre-center-themePlan">
          <div class="construction-contre-center-title">
            <span>学校全国排名趋势</span>
          </div>
          <div class="construction-contre-center-themePlan-one"
               v-if="RankTrend[0]">
            <span><label>全国排名第 <b>{{RankTrend[0].schRank}}</b> 位</label><strong>{{RankTrend[0].dataDate}}年</strong></span>
            <i></i>
            <em></em>
          </div>
          <div class="construction-contre-center-themePlan-two"
               v-if="RankTrend[1]">
            <span><label>全国排名第 <b>{{RankTrend[1].schRank}}</b> 位</label><strong>{{RankTrend[1].dataDate}}年</strong></span>
            <i></i>
            <em></em>
          </div>
          <div class="construction-contre-center-themePlan-three"
               v-if="RankTrend[2]">
            <span><label>全国排名第 <b>{{RankTrend[2].schRank}}</b> 位</label><strong>{{RankTrend[2].dataDate}}年</strong></span>
            <i></i>
            <em></em>
          </div>
          <div class="construction-contre-center-themePlan-four"
               v-if="RankTrend[3]">
            <span><label>全国排名第 <b>{{RankTrend[3].schRank}}</b> 位</label><strong>{{RankTrend[3].dataDate}}年</strong></span>
            <i></i>
            <em></em>
          </div>
          <div class="construction-contre-center-themePlan-five"
               v-if="RankTrend[4]">
            <span><label>全国排名第 <b>{{RankTrend[4].schRank}}</b> 位</label><strong>{{RankTrend[4].dataDate}}年</strong></span>
            <i></i>
            <em></em>
          </div>
        </div>
      </div>
      <div class="construction-contre-rit">
        <div class="construction-contre-rit-title">
          <span>学生就业行业分布</span>
        </div>
        <div class="construction-contre-rit-details">
          <Employment :CollegeData="jobData"></Employment>
        </div>
      </div>
    </div>
    <div class="construction-bottom">
      <div class="construction-bottom-let">
        <div class="construction-bottom-let-title">
          <span>标志性成果</span>
        </div>
        <div class="construction-bottom-let-details"
             ref="marksDataSum">
          <ul v-for="(m,i) in marksDataSum"
              :class="[marksDataDataJusge?'marksDataSum':'']"
              :style="{'--time':marksData.length*4+'s'}"
              :key="i">
            <li v-for="(item,index) in marksData"
                :key="index">
              <img src="static/images/runBz.png">
              <span>
                <label><b>{{item.dataDate}}</b><strong><a v-if="item.resultLevel&&item.resultPrize">{{item.resultLevel}}·{{item.resultPrize}}</a></strong></label>
                <b>{{item.dataContents}}</b>
              </span>

            </li>
          </ul>
        </div>
      </div>
      <div class="construction-bottom-center">
        <div class="construction-bottom-let-title">
          <span>企业地域分布</span>
        </div>
        <div class="construction-bottom-let-details">
          <echartsMap :is="requestMap"
                      :mapData="mapData"
                      :mapSchRegione="mapSchRegione"
                      :mapMax="mapMax"></echartsMap>
        </div>
      </div>
      <div class="construction-bottom-rit">
        <div class="construction-bottom-rit-title">
          <span>科研成果</span>
        </div>
        <div class="construction-bottom-rit-details">
          <rightChart></rightChart>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="ecmascript-6">
import Employment from '@/components/conMap/Employment'
import echartsMap from '@/components/conMap/echartsMap'
import rightChart from '@/components/conMap/rightChart'
export default {
  name: '',
  components: { Employment, echartsMap, rightChart },
  data () {
    return {
      time: '',
      schoolCourseData: '', // 办学历程
      schoolCourseDataSum: 1, // 滚动新增一列数据 -办学历程
      schoolCourseDataSumJusge: false, // 是否停止动画-办学历程
      marksData: '', // 标志性成果
      marksDataSum: 1, // 滚动新增一列数据 -标志性成果
      marksDataDataJusge: false, // 是否停止动画 -标志性成果
      jobData: '', // 学生就业行业分布
      requestMap: '', // 按需加载
      RankTrend: '', // UP data
      mapData: '',
      mapSchRegione: '', // 学校所在地区
      mapMax: ''
    }
  },

  created () {
    this.initData()
  },
  destroyed () {
    clearInterval(this.time)
    this.time = null
  },
  mounted () {
    this.hitTerval()
  },
  methods: {
    initData () {
      let _this = this
      // 办学历程
      _this.$http.get('/screenRunSchCourse/list').then(res => {
        if (res.code === '40001') {
          _this.schoolCourseData = res.content || []
        }
        this.$nextTick(() => {
          // 是否滑动
          setTimeout(() => {
            let EmployEv = this.$refs.schoolCourseDataSum
            if (EmployEv.firstChild.clientHeight > EmployEv.clientHeight) {
              this.schoolCourseDataSum = 2
              this.schoolCourseDataSumJusge = true
            }
          }, 1000)
        })
      })
      // 标志性成果
      _this.$http.get('/screenIconicResult/list').then(res => {
        if (res.code === '40001') {
          _this.marksData = res.content || []
        }
        this.$nextTick(() => {
          // 是否滑动
          setTimeout(() => {
            let EmployEv = this.$refs.marksDataSum
            if (EmployEv.firstChild.clientHeight > EmployEv.clientHeight) {
              this.marksDataSum = 2
              this.marksDataDataJusge = true
            }
          }, 300)
        })
      })
      // 学生就业行业分布
      _this.$http.get('/screenStuJobTradeSpread/list').then(res => {
        if (res.code === '40001') {
          _this.jobData = res.content || []
        }
        this.$nextTick(() => {
          // 是否滑动
          let EmployEv = this.$refs.marksDataSum
          if (EmployEv.firstChild.clientHeight > EmployEv.clientHeight) {
            this.marksDataSum = 2
            this.marksDataDataJusge = true
          }
          setTimeout(() => {
            this.requestMap = echartsMap // 地图按需加载
          }, 300)
        })
      })
      // UP data数据
      _this.$http.get('/screenSchCountryRankTrend/list').then(res => {
        if (res.code === '40001') {
          _this.RankTrend = res.content || []
        }
      })
      // // 企业地域分布
      _this.$http.get('/screenEnterpriseRegion/list').then(res => {
        if (res.code === '40001') {
          this.mapData = res.content.map((r) => {
            let a = [{ name: r.enterpriseRegion, value: Number(r.enterpriseNum) }]
            return a
          })
          this.mapSchRegione = (res.content[0] && res.content[0].schRegion) || '重庆'
          let arrTuNum = this.mapData.map(r => r[0].value)
          let max = this.mapData.length > 0 ? Math.max(...arrTuNum) : 0
          this.mapMax = max
        }
      })
    },
    hitTerval () {
      var i = 0
      this.time = setInterval(() => {
        i = i + 1000
        if (i % 600000 === 0) { // 10 分钟
          this.$refs.effect01.style.animation = 'none'
          this.$refs.effect01AImg.style.animation = 'none'
        } else if (i % 300000 === 0) {
          this.$refs.effect01.style.animation = ''
          this.$refs.effect01AImg.style.animation = ''
        }
      }, 1000)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.construction {
  min-width: 1200px;
  overflow: auto;
  background: url('~@/../static/images/big.png') no-repeat;
  background-size: 100% 100%;

  &-title {
    // background-size: 100% 100%;
    // min-width: 1200px;
    height: 7.5%;
    // line-height: 7.5%;
    text-align: center;
    align-items: center;
    color: #fff;
    display: flex;

    >div {
      flex: 1;
    }

    &-let {
      text-align: left;
      position: relative;
      height: 100%;
      font-size: 0.2rem;

      label {
        margin-left: 0.24rem;
        position: absolute;
        top: 35%;
        height: 63%;
        display: flex;
        align-items: center;

        img {
          margin-right: 0.1rem;
          width: 0.32rem;
        }
      }
    }

    &-center {
      font-size: 0.32rem;
      text-align: center;

      span {
        font-weight: bold;
        background: linear-gradient(#87efff, #1161ef);
        -webkit-background-clip: text;
        color: transparent;
      }
    }

    &-rit {
      line-height: 0.8rem;
      text-align: left;
    }
  }

  &-contre {
    width: 100%;
    height: 50%;
    margin-top: 0.4rem;
    display: flex;

    &-let {
      position: relative;
      width: 5.5rem;
      margin-left: 0.24rem;
      background: url('~@/../static/images/centre-let.png') no-repeat;
      background-size: 100% 100%;

      &-title {
        position: absolute;
        width: 100%;
        height: 8%;
        top: 2%;
        display: flex;
        align-items: center;

        span {
          margin-left: 0.16rem;
          color: #01AEFD;
          font-size: 0.18rem;
          // font-family: serif;
          font-weight: bold;
        }
      }

      &-details {
        position: absolute;
        width: 100%;
        height: 90%;
        top: 10%;
        color: #fff;
        padding: 0 0.18rem;
        box-sizing: border-box;
        overflow: hidden;

        ul {
          &.schoolCourseDataSum {
            animation: scaleDraw var(--time) linear infinite;

            @keyframes scaleDraw {
              from {
                transform: translateY(0%);
              }

              to {
                transform: translateY(-100%);
              }
            }
          }

          li {
            padding-top: 0.32rem;
            display: flex;

            img {
              margin-right: 0.1rem;
            }

            span {
              font-size: 0.14rem;

              label {
                color: #01AEFD;
                margin-bottom: 0.16rem;
                display: block;
              }

              b {
                width: 100%;
                line-height: 1.5em;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
              }
            }
          }
        }
      }
    }

    &-center {
      position: relative;
      flex: 1;
      margin: 0 0.16rem;
      background: url('~@/../static/images/centre-cont.png') no-repeat;
      background-size: 100% 100%;

      &-title {
        position: absolute;
        width: 100%;
        height: 8%;
        top: 2%;
        display: flex;
        align-items: center;

        span {
          margin-left: 0.16rem;
          color: #01AEFD;
          font-size: 0.18rem;
          // font-family: serif;
          font-weight: bold;
        }
      }

      &-arrows {
        position: absolute;
        top: 17%;
        left: 5%;
        height: 40%;
        width: 39%;

        img {
          position: absolute;
          width: 100%;
          bottom: 0;
          height: 100%;
          animation: arrows ease 13s infinite;
          animation-iteration-count: 1;

          @keyframes arrows {
            0% {
              opacity: 1;
            }

            50% {
              opacity: 0.7;
            }

            100% {
              opacity: 1;
            }
          }
        }
      }

      .text {
        font-family: '微软雅黑', 'Dosis', sans-serif;
        font-size: 80px;
        text-align: center;
        font-weight: bold;
        text-transform: uppercase;
        position: relative;
      }

      .effect01 {
        position: absolute;
        left: 0;
        width: 30%;
        top: 20%;
        text-shadow: 0px 0px 0 #b89800, 1px -1px 0 #b39400, 2px -2px 0 #ad8f00, 3px -3px 0 #a88b00, 4px -4px 0 #a38700, 5px -5px 0 #9e8300, 6px -6px 0 #997f00, 7px -7px 0 #947a00, 8px -8px 0 #8f7600, 9px -9px 0 #8a7200, 10px -10px 0 #856e00, 11px -11px 0 #806a00, 12px -12px 0 #7a6500, 13px -13px 12px rgba(0, 0, 0, 0.55), 13px -13px 1px rgba(0, 0, 0, 0.5);

        a {
          color: #FFD300;
        }

        animation: run ease-in-out 13s infinite;
        animation-iteration-count: 1;

        @keyframes run {
          0% {
            transform: rotateX(5deg) rotateY(0);
          }

          30% {
            transform: rotateX(20deg) rotateY(0deg);
          }

          65% {
            transform: rotateX(0deg) rotateY(370deg);
            text-shadow: 1px 1px 1px #ccc, 0 0 10px #fff, 0 0 5px #fff, 0 0 30px #fff, 0 0 15px #3EFF3E, 0 0 70px #3EFFff, 0 0 80px #3EFFff, 0 0 100px #3EFFee, 0 0 150px #3EFFee;
          }

          100% {
            transform: rotateX(0deg) rotateY(360deg);
          }
        }
      }

      &-themePlan {
        position: absolute;
        right: 0;
        height: 100%;
        top: 0;
        width: 100%;

        &-one {
          width: 35%;

          span {
            background: linear-gradient(to right, rgba(17, 97, 239, 1), rgba(135, 238, 255, 0.8)) !important;

            label, b, strong {
              opacity: 1 !important;
            }

            &:before {
              border-right: 0.56rem solid rgba(17, 97, 239, 1) !important;
            }
          }

          i {
            background: rgba(17, 97, 239, 0.7) !important;

            &:before {
              border-right: 0.56rem solid rgba(17, 97, 239, 0.6) !important;
            }
          }

          em {
            background: rgba(17, 97, 239, 0.3) !important;

            &:before {
              border-right: 0.56rem solid rgba(17, 97, 239, 0.3) !important;
            }
          }
        }

        &-two {
          width: 40%;
          top: 35% !important;
          // margin-top .28rem
        }

        &-three {
          width: 50%;
          top: 50% !important;
        }

        &-four {
          width: 65%;
          top: 65% !important;
        }

        &-five {
          width: 80%;
          top: 80% !important;
        }

        &-one, &-two, &-three, &-four, &-five {
          position: absolute;
          top: 20%;
          color: #fff;
          right: 0.44rem;
          // width: 40%;
          height: 0.56rem;
          line-height: 0.56rem;

          span {
            top: 0;
            position: absolute;
            left: 0;
            width: 100%;
            background: linear-gradient(to right, rgba(7, 154, 109, 1) 30%, rgba(7, 154, 109, 0.3));
            height: 100%;
            z-index: 9;
            display: flex;
            align-items: center;
            font-size: 0.16rem;

            &:before {
              content: '';
              position: absolute;
              left: -0.56rem;
              height: 0;
              width: 0;
              border-top: 0.28rem solid transparent;
              border-right: 0.56rem solid rgba(7, 154, 109, 1);
              border-bottom: 0.28rem solid transparent;
              border-left: 0.0001rem solid transparent;
              box-sizing: border-box;
              top: 0;
            }

            label {
              opacity: 0.7;
              display: inherit;
            }

            b {
              font-size: 0.4rem;
              margin: -0.03rem 0.1rem auto;
              opacity: 0.7;
              font-weight: bold;
            }

            strong {
              flex: 1;
              text-align: right;
              margin-right: 0.4rem;
            }
          }

          i {
            top: 0;
            position: absolute;
            left: -0.56rem;
            height: 100%;
            width: 0.56rem;
            background: rgba(7, 154, 109, 0.7);
            animation: dmAnimation 1s linear infinite;

            @keyframes dmAnimation {
              from {
                left: 0rem;
              }

              to {
                left: -0.56rem;
              }
            }

            &:before {
              content: '';
              position: absolute;
              left: -0.56rem;
              height: 0;
              width: 0;
              border-top: 0.28rem solid transparent;
              border-right: 0.56rem solid rgba(7, 154, 109, 0.6);
              border-bottom: 0.28rem solid transparent;
              border-left: 0.0001rem solid transparent;
              box-sizing: border-box;
              top: 0;
            }
          }

          em {
            top: 0;
            position: absolute;
            left: -1.12rem;
            height: 100%;
            width: 0.56rem;
            background: rgba(7, 154, 109, 0.3);
            animation: dmAnimation1 1s linear infinite;

            @keyframes dmAnimation1 {
              from {
                left: -0.56rem;
              }

              to {
                left: -1.12rem;
              }
            }

            &:before {
              content: '';
              position: absolute;
              left: -0.56rem;
              height: 0;
              width: 0;
              border-top: 0.28rem solid transparent;
              border-right: 0.56rem solid rgba(7, 154, 109, 0.3);
              border-bottom: 0.28rem solid transparent;
              border-left: 0.0001rem solid transparent;
              box-sizing: border-box;
              top: 0;
            }
          }
        }
      }
    }

    &-rit {
      position: relative;
      margin-right: 0.24rem;
      width: 5.5rem;
      background: url('~@/../static/images/centre-rit.png') no-repeat;
      background-size: 100% 100%;

      &-title {
        position: absolute;
        width: 100%;
        height: 8%;
        top: 1.5%;
        display: flex;
        align-items: center;

        span {
          margin-left: 0.16rem;
          color: #01AEFD;
          font-size: 0.18rem;
          // font-family: serif;
          font-weight: bold;
        }
      }

      &-details {
        position: absolute;
        width: 100%;
        height: 90.5%;
        top: 9.5%;
        color: #fff;
        padding: 0.11rem 0.31rem 0.18rem 0.33rem;
        box-sizing: border-box;
        overflow: hidden;

        ul {
          &.EmploymentIndustry {
            animation: scaleDraw var(--time) linear infinite;

            @keyframes scaleDraw {
              from {
                transform: translateY(0%);
              }

              to {
                transform: translateY(-100%);
              }
            }
          }

          li {
            padding-top: 0.24rem;

            span {
              display: block;

              label {
                &:nth-child(1) {
                  display: flex;
                  opacity: 0.85;
                  margin-bottom: 0.08rem;

                  b {
                    flex: 1;
                  }
                }

                &:nth-child(2) {
                  height: 0.06rem;
                  width: 100%;
                  display: block;
                  position: relative;

                  i {
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: 30%;
                    background: red;
                    transition: all 0.3s;
                  }

                  em {
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: 100%;
                    background: #fff;
                    opacity: 0.07;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  &-all {
  }

  &-bottom {
    // min-width: 1200px;
    margin-top: 0.16rem;
    padding-bottom: 0.24rem;
    width: 100%;
    height: calc(100% - 57.5% - 0.56rem);
    display: flex;
    box-sizing: border-box;

    &-let {
      position: relative;
      margin-left: 0.24rem;
      width: 5.5rem;
      background: url('~@/../static/images/bottom-let.png') no-repeat;
      background-size: 100% 100%;

      &-title {
        position: absolute;
        width: 100%;
        height: 10%;
        top: 2%;
        display: flex;
        align-items: center;

        span {
          margin-left: 0.16rem;
          color: #01AEFD;
          font-size: 0.18rem;
          // font-family: serif;
          font-weight: bold;
        }
      }

      &-details {
        position: absolute;
        width: 100%;
        height: 88%;
        top: 12%;
        color: #fff;
        padding: 0 0.18rem;
        box-sizing: border-box;
        overflow: hidden;

        ul {
          &.marksDataSum {
            animation: scaleDraw var(--time) linear infinite;

            @keyframes scaleDraw {
              from {
                transform: translateY(0%);
              }

              to {
                transform: translateY(-100%);
              }
            }
          }

          // animation: scaleDraw var(--time) linear infinite;
          // @keyframes scaleDraw {
          // from {
          // transform: translateY(0%);
          // }

          // to {
          // transform: translateY(-100%);
          // }
          // }
          li {
            padding-top: 0.32rem;
            display: flex;

            img {
              margin-right: 0.1rem;
            }

            span {
              font-size: 0.14rem;

              label {
                color: #01AEFD;
                margin-bottom: 0.16rem;
                display: flex;
                align-items: center;

                img {
                  height: 0.32rem;
                }

                strong {
                  background: url('~@/../static/images/bottom-marks.png') no-repeat;
                  background-size: 100% 100%;
                  position: relative;
                  height: 0.32rem;
                  width: 1.8rem;
                  margin-left: 0.1rem;

                  a {
                    position: absolute;
                    top: 0;
                    left: 0.4rem;
                    line-height: 0.32rem;
                    color: #01AEFD;
                    white-space: nowrap;
                  }
                }
              }

              >b {
                width: 100%;
                line-height: 1.5em;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
              }
            }
          }
        }
      }
    }

    &-center {
      position: relative;
      margin: 0 0.16rem;
      flex: 1;
      background: url('~@/../static/images/bottom-cont.png') no-repeat;
      background-size: 100% 100%;

      &-title {
        position: absolute;
        width: 100%;
        height: 10%;
        top: 2%;
        display: flex;
        align-items: center;

        span {
          margin-left: 0.16rem;
          color: #01AEFD;
          font-size: 0.18rem;
          // font-family: serif;
          font-weight: bold;
        }
      }

      &-details {
        position: absolute;
        width: 100%;
        height: 88%;
        top: 12%;
        color: #fff;
        padding: 0 0.18rem;
        box-sizing: border-box;
        overflow: hidden;
      }
    }

    &-rit {
      position: relative;
      margin-right: 0.24rem;
      width: 9.5rem;
      background: url('~@/../static/images/bottom-rit.png') no-repeat;
      background-size: 100% 100%;

      &-title {
        position: absolute;
        width: 100%;
        height: 10%;
        top: 1.5%;
        display: flex;
        align-items: center;

        span {
          margin-left: 0.16rem;
          color: #01AEFD;
          font-size: 0.18rem;
          // font-family: serif;
          font-weight: bold;
        }
      }

      &-details {
        position: absolute;
        width: 100%;
        height: 88.5%;
        top: 11.5%;
        color: #fff;
        padding: 0.11rem 0.31rem 0.18rem 0.33rem;
        box-sizing: border-box;
        overflow: hidden;
      }
    }
  }
}
</style>
