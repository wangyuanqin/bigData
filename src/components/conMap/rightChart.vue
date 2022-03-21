<!--
/**
* @desc chart
* @author wangyuanqin
* @date 2020年06月18日20:46,星期四
*/
-->
<template>
  <div class="classChart"
       ref="classChart"></div>
</template>

<script>
export default {
  name: 'centerChart2',
  components: {

  },
  data () {
    return {
      chart: null,
      dataList: [],
      dataDateList: [],
      paperNationNumList: [],
      patentNationNumList: [],
      workNumList: [],
      time: '',
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['论文', '专利', '著作'],
          right: 10,
          icon: 'circle',
          itemHeight: 8, // 改变圆圈大小
          textStyle: {
            fontSize: 14,
            color: 'rgba(225,225,225,0.8)'
          }
        },
        grid: {
          top: '20',
          left: '10',
          right: '10',
          bottom: '10',
          containLabel: true
        },
        color: [new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,
          [{
            offset: 0,
            color: '#02BEFA'
          },
          {
            offset: 1,
            color: '#0442F3'
          }
          ]
        ), new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,
          [{
            offset: 0,
            color: '#F8AB0A'
          },
          {
            offset: 1,
            color: '#F07517'
          }
          ]
        ), new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,
          [{
            offset: 0,
            color: '#1CE0A9'
          },
          {
            offset: 1,
            color: '#06996B'
          }
          ]
        )],
        xAxis: {
          type: 'category',
          axisLabel: {
            textStyle: {
              fontSize: '12',
              color: 'rgba(225,225,225,0.8)'
            }
          },
          splitLine: {// 中间分隔线
            lineStyle: {
              color: 'rgba(225,225,225,0.2)'
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(225,225,225,0.2)'
            }
          },
          data: this.dataDateList
        },
        yAxis: [{
          type: 'value',
          axisLabel: {
            textStyle: {
              fontSize: '12',
              color: 'rgba(225,225,225,0.8)'
            }
          },
          // min: 0,
          // max: 6000,
          splitLine: {// 中间分隔线
            lineStyle: {
              color: 'rgba(225,225,225,0.2)'
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(225,225,225,0.2)'
            }
          },
          'axisTick': { // 轴刻度线
            'show': false
          }
        }, {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: 'rgba(225,225,225,0.3)'
            }
          }
        }],
        series: [{
          type: 'bar',
          name: '论文',
          barWidth: 15,
          data: this.paperNationNumList
        }, {
          type: 'bar',
          name: '专利',
          barWidth: 15,
          data: this.patentNationNumList
        }, {
          type: 'bar',
          name: '著作',
          barWidth: 15,
          data: this.workNumList
        }]
      }
    }
  },
  created () {
    this.getList()
  },
  mounted: function () {
    // 基于准备好的dom，初始化echarts实例
    this.chart = this.$echarts.init(this.$refs.classChart)
    this.dataChange()
    // window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('resize', this.handleWindowResize)
    this.animationAter()
  },
  methods: {
    drawChart (callbclk) {
      if (!this.chart) return
      // 绘制图表
      this.option.xAxis.data = this.dataDateList
      this.option.series[0].data = this.paperNationNumList
      this.option.series[1].data = this.patentNationNumList
      this.option.series[2].data = this.workNumList
      this.chart.setOption(this.option)
    }, /**
     * 当窗口缩放时，echart动态调整自身大小
     */
    animationAter (option) {
      var i = 0
      this.time = setInterval(() => {
        if (this.dataDateList.length > 0) {
          this.option.xAxis.data.shift()
          this.option.xAxis.data.push(this.dataList[i].dataDate)
          this.option.series[0].data.shift()
          this.option.series[1].data.shift()
          this.option.series[2].data.shift()
          this.option.series[0].data.push(parseFloat(this.dataList[i].paperNum))
          this.option.series[1].data.push(parseFloat(this.dataList[i].patentNum))
          this.option.series[2].data.push(parseFloat(this.dataList[i].opusNum))
          this.chart.setOption(this.option)
          i++
          if (!this.dataList[i]) i = 0
        }
      }, 3000)
    },
    handleWindowResize () {
      if (!this.chart) return
      setTimeout(() => {
        this.chart.resize()// 防止偏差让它后执行30毫秒
      }, 30)
    },
    dataChange () {
      const vm = this
      vm.$nextTick(() => {
        vm.drawChart()
      })
    },
    getList () {
      let _this = this
      // 历年各民族学生情况控制器
      _this.$http.get('/screenSchScientificResult/list').then(res => {
        if (res.code === '40001') {
          _this.dataList = res.content
          console.log(res)
          res.content.forEach(i => {
            _this.dataDateList.push(i.dataDate)
            _this.paperNationNumList.push(parseFloat(i.paperNum))
            _this.patentNationNumList.push(parseFloat(i.patentNum))
            _this.workNumList.push(parseFloat(i.opusNum))
          })
        }
      })
    }

  },
  computed: {
    echarts () {
      return 'echarts' + Math.random() * 100000
    },
    legendList () {
      let len = []
      if (this.dataList) {
        this.dataList.forEach(i => {
          len.push(i.name)
        })
      }
      return len
    }
  },
  // 数据发生变化重新生成echarts
  watch: {
    dataList (val) {
      this.dataChange()
    }
  },
  beforeDestroy () {
    // window.removeEventListener('resize', this.handleWindowResize)
    window.removeEventListener('resize', this.handleWindowResize)
  }
}
</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
.classChart {
  width: 100%;
  height: 100%;
}
</style>
