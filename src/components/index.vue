<!--
/**
* @desc 大数据2
* @author wangyuanqin
* @date 2020年06月18日15:17,星期四
*/
-->
<template>
  <div class="bigData">
    <div class="bigData-top">
      <p class="left"><label><img src="static/images/bigDataImg/topIcon01.png"> 数据大屏</label></p>
      <span class="title">{{$bigDataTile}}</span>
      <p></p>
    </div>
    <div class="bigData-body">
      <div class="dataContent">
        <div class="dataContent-left">
          <div class="top">
            <div class="titleBox">纸质图书总量</div>
            <div class="box">
              <div>
                <img src="~@/../static/images/bigDataImg/lefticon01.png">
                <div><span v-countRunning="bookNum"></span>
                  <p>纸质图书总量(册)</p>
                </div>
              </div>
              <div>
                <img src="~@/../static/images/bigDataImg/lefticon02.png">
                <div><span v-countRunning="addNum"></span>
                  <p>新增图书(册)</p>
                </div>
              </div>
            </div>
          </div>
          <div class="top">
            <div class="titleBox">数字资源</div>
            <div class="box">
              <div>
                <img src="~@/../static/images/bigDataImg/lefticon03.png">
                <div><span v-countRunning="numResourceCapacity"></span>
                  <p>数字资源(GB)</p>
                </div>
              </div>
              <div>
                <img src="~@/../static/images/bigDataImg/lefticon04.png">
                <div><span v-countRunning="ebookNum"></span>
                  <p>电子图书(册)</p>
                </div>
              </div>
            </div>
          </div>
          <div class="banner">
            <div class="titleBox">教师授课课时·TOP10</div>
            <leftList ref="leftList" />
          </div>
        </div>
        <div class="dataContent-center">
          <div class="top">
            <div>
              <img src="~@/../static/images/bigDataImg/centercion01.png">
              <div><span v-countRunning="centertop.secondLevelCollegeNum"></span>
                <p>二级学院</p>
              </div>
            </div>
            <div>
              <img src="~@/../static/images/bigDataImg/centercion02.png">
              <div><span v-countRunning="centertop.functionDepNum"></span>
                <p>职能部门</p>
              </div>
            </div>
            <div>
              <img src="~@/../static/images/bigDataImg/centercion03.png">
              <div><span v-countRunning="centertop.inSchStuNum"></span>
                <p>在校学生人数</p>
              </div>
            </div>
            <div>
              <img src="~@/../static/images/bigDataImg/centercion04.png">
              <div><span v-countRunning="centertop.inSchTchNum"></span>
                <p>在校教师人数</p>
              </div>
            </div>
          </div>
          <div class="banner">
            <div class="titleBox">学校招生人数趋势</div>
            <div class="chartBox">
              <centerChart1 ref="centerChart1" />
            </div>
          </div>
          <div class="banner">
            <div class="titleBox">学校招生专业变动趋势</div>
            <div class="chartBox">
              <centerChart2 ref="centerChart2" />
            </div>
          </div>
        </div>
        <div class="dataContent-right">
          <div class="top">
            <div class="titleBox">各学院在校生人数</div>
            <div class="chartBox job">
              <Employment :CollegeData="CollegeData"></Employment>
            </div>
          </div>
          <div class="banner">
            <div class="titleBox">助餐服务情况</div>
            <div class="chartBox">
              <rightChart ref="rightChart" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import leftList from './component/leftList'
import centerChart1 from './component/centerChart1'
import centerChart2 from './component/centerChart2'
import rightChart from './component/rightChart'
import Employment from '@/components/conMap/Employment'
export default {
  props: {

  },
  components: {
    leftList, centerChart1, centerChart2, rightChart, Employment
  },
  data () {
    return {
      addNum: 0, // 新增图书
      bookNum: 0, // 纸质图书总量
      numResourceCapacity: 0, // 数字资源（GB）
      ebookNum: 0, // 电子图书（册）
      centertop: {
        secondLevelCollegeNum: 0, // 二级学院数
        functionDepNum: 0, // 职能部门数
        inSchStuNum: 0, // 在校学生数
        inSchTchNum: 0 // 在校教师数
      },
      CollegeData: '',
      time: ''// 定时器
    }
  },
  created () {
  },
  mounted () {
    this.getList()
    this.setTime()
  },
  destroyed () {
    clearInterval(this.time)
    this.time = null
  },
  methods: {
    setTime () {
      var i = 0
      this.time = setInterval(() => {
        i = i + 1000
        if (i % 10000 === 0) {
          this.$refs.centerChart2.initMap() // 学校招生专业变动趋势
        }
        if (i % 25000 === 0) {
          this.$refs.centerChart1.initMap()// 折线 学校招生人数趋势
        }
        if (i % 1500 === 0) {
          this.$refs.leftList.initMap() // 教师授课课时·TOP10
        }
        if (i % 3000 === 0) {
          this.$refs.rightChart.initMap() // 助餐服务情况
        }
      }, 1000)
    },
    getList () {
      let _this = this
      // 纸质图书总量
      _this.$http.get('/screenPaperBooksStatistics/list').then(res => {
        if (res.code === '40001') {
          _this.addNum = res.content[0].addNum// 新增图书
          _this.bookNum = res.content[0].bookNum// 纸质图书总量
        }
      })
      // 数字资源
      _this.$http.get('/screenNumResourceStatistics/list').then(res => {
        if (res.code === '40001') {
          _this.numResourceCapacity = res.content[0].numResourceCapacity// 数字资源（GB）
          _this.ebookNum = res.content[0].ebookNum// 电子图书（册）
        }
      })
      // 学校部门人数情况
      _this.$http.get('/screenDepPeopleStatistics/list').then(res => {
        if (res.code === '40001') {
          this.centertop = {
            secondLevelCollegeNum: res.content[0].secondLevelCollegeNum, // 二级学院数
            functionDepNum: res.content[0].functionDepNum, // 职能部门数
            inSchStuNum: res.content[0].inSchStuNum, // 在校学生数
            inSchTchNum: res.content[0].inSchTchNum // 在校教师数
          }
        }
      })
      // 各学院在校生人数
      _this.$http.get('/screenCollegeStuNumTotal/list').then(res => {
        if (res.code === '40001') {
          this.CollegeData = res.content
        }
      })
    }
  },
  computed: {

  },
  watch: {

  }
}
</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
.bigData {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url('~@/../static/images/bigDataImg/bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;

  &-top {
    width: 100%;
    height: 7.5%;
    overflow: hidden;
    background-image: url('~@/../static/images/bigDataImg/topbg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #ffffff;
    display: flex;
    align-items: center;

    >p {
      flex: 1;
    }

    .left {
      height: 100%;
      // text-indent: 0.3rem;
      font-size: 0.2rem;
      position: relative;

      label {
        position: absolute;
        top: 35%;
        height: 63%;
        margin-left: 0.24rem;
        display: flex;
        align-items: center;
        left: 0;

        >img {
          width: 0.32rem;
          margin-right: 0.1rem;
        }
      }
    }

    >span {
      font-size: 0.32rem;
      margin-bottom: 0.05rem;
      font-weight: bold;
      background: linear-gradient(#87efff, #1161ef);
      -webkit-background-clip: text;
      color: transparent;
    }
  }

  &-body {
    width: 100%;
    height: calc(100% - 7.5%);

    .dataContent {
      margin: 0.4rem 0.24rem 0.24rem 0.24rem;
      height: calc(100% - 0.64rem);
      display: flex;
      justify-content: space-between;

      &-left {
        // flex: 1;
        width: 25%;
        margin-right: 0.16rem;
        display: flex;
        flex-direction: column;

        .top {
          height: 20%;
          min-height: 1.69rem;
          margin-bottom: 0.16rem;
          background-image: url('~@/../static/images/bigDataImg/leftbg01.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;

          .box {
            padding: 0.2rem 0.16rem 0;
            display: flex;

            >div {
              height: 0.8rem;
              border: 1px solid #01AEFD;
              flex: 1;
              display: flex;
              align-items: center;

              >img {
                width: 0.56rem;
                height: 0.56rem;
                margin: 0 0.12rem;
              }

              >div {
                overflow: hidden;

                >span {
                  color: #1CE0A9;
                  font-weight: bold;
                  font-size: 0.24rem;
                  height: 0.24rem;
                  line-height: 0.24rem;
                  white-space: nowrap;
                }

                >p {
                  color: #ffffff;
                  font-size: 0.14rem;
                  margin-top: 0.08rem;
                  white-space: nowrap;
                }
              }
            }

            >div:nth-child(1) {
              margin-right: 0.08rem;
            }
          }
        }

        .banner {
          flex: 1;
          background-image: url('~@/../static/images/bigDataImg/leftbg02.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          overflow: hidden;
        }
      }

      &-center {
        min-width: 9.11rem;
        flex: 1;
        display: flex;
        flex-direction: column;

        .top {
          height: 0.88rem;
          display: flex;
          flex-direction: row;

          >div {
            flex: 1;
            background-image: url('~@/../static/images/bigDataImg/centerbg01.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            margin-right: 0.16rem;
            display: flex;
            align-items: center;

            >img {
              width: 0.32rem;
              height: 0.32rem;
              margin: 0 0.2rem 0 0.24rem;
            }

            >div {
              overflow: hidden;

              >span {
                color: #F7A20C;
                font-weight: bold;
                font-size: 0.3rem;
                height: 0.3rem;
                line-height: 0.3rem;
                white-space: nowrap;
              }

              >p {
                color: #ffffff;
                font-size: 0.14rem;
                margin-top: 0.08rem;
                white-space: nowrap;
              }
            }
          }

          >div:last-child {
            margin-right: 0;
          }
        }

        .banner {
          flex: 1;
          background-image: url('~@/../static/images/bigDataImg/centerbg02.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          margin-top: 0.16rem;
        }
      }

      &-right {
        // flex: 1;
        width: 25%;
        margin-left: 0.16rem;
        display: flex;
        flex-direction: column;

        .top {
          height: 60%;
          margin-bottom: 0.16rem;
          background-image: url('~@/../static/images/bigDataImg/rightbg01.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }

        .banner {
          flex: 1;
          background-image: url('~@/../static/images/bigDataImg/rightbg02.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }

  .titleBox {
    height: 0.4rem;
    padding-left: 0.17rem;
    line-height: 0.4rem;
    color: #01AEFD;
    font-weight: bold;
    font-size: 0.18rem;
    // font-family: serif;
    margin-top: 0.07rem;
    background: linear-gradient(90deg, rgba(12, 75, 245, 0.6) 0%, rgba(71, 186, 198, 0) 100%);
  }

  .chartBox {
    width: 100%;
    height: calc(100% - 0.47rem);
    overflow: hidden;
  }

  .job {
    color: #fff;
    padding: 0.11rem 0.31rem 0.18rem 0.33rem;
    box-sizing: border-box;
  }
}
</style>
