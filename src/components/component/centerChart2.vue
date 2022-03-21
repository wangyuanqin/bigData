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
      addMajorNumList: [],
      stopMajorNumList: [],
      maxSum: 0,
      minSum: 0
    }
  },
  created () {

  },
  mounted: function () {
    // 基于准备好的dom，初始化echarts实例
    this.chart = this.$echarts.init(this.$refs.classChart)
    this.getList()
    // window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('resize', this.handleWindowResize)
  },
  methods: {
    drawChart () {
      if (!this.chart) return
      // 绘制图表
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['新增专业', '停招专业'],
          right: 20,
          icon: 'circle',
          itemHeight: 8, // 改变圆圈大小
          textStyle: {
            fontSize: 14,
            color: 'rgba(225,225,225,0.8)'
          }
        },
        grid: {
          top: '30',
          left: '20',
          right: '20',
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
        )],
        xAxis: {
          axisLabel: {
            interval: 0, // 横轴信息全部显示
            textStyle: {
              fontSize: '12',
              color: 'rgba(225,225,225,0.8)'
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(225,225,225,0.3)'
            }

          },
          'axisTick': {
            'show': false
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
          splitLine: { show: false },
          min: this.minSum,
          max: this.maxSum,
          axisLine: {
            lineStyle: {
              color: 'rgba(225,225,225,0.3)'
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
        series: [
          {
            name: '新增专业',
            type: 'bar',
            barWidth: 18,
            stack: 'one',
            markLine: { // 顶部线（平均线）设置
              silent: true, // true 去掉鼠标悬浮该线上的动画
              label: {
                show: false// 不显示值
              },
              symbol: 'none', // 该线无样式
              lineStyle: { // 设置该线样式
                normal: {
                  color: 'rgba(225,225,225,0.3)',
                  type: 'solid'
                }
              },
              data: [{
                yAxis: 20 // 取最大值，顶部线
              }]
            },
            data: this.addMajorNumList
          },
          {
            name: '停招专业',
            type: 'bar',
            barWidth: 18,
            stack: 'one',
            data: this.stopMajorNumList
          }
        ]
      })
    },
    initMap () {
      if (this.dataList.length > 0) {
        this.chart.setOption({
          legend: {
            selected: {
              '新增专业': false,
              '停招专业': false
            }
          }
        })
        this.chart.setOption({
          legend: {
            selected: {
              '新增专业': true,
              '停招专业': true
            }
          }
        })
      }
    },
    /**
     * 当窗口缩放时，echart动态调整自身大小
     */
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
      // 招生专业变动趋势
      _this.$http.get('/screenSchRecStuMajorTrend/list').then(res => {
        if (res.code === '40001') {
          _this.dataList = res.content
          res.content.forEach(i => {
            _this.dataDateList.push(i.dataDate)
            _this.addMajorNumList.push(parseFloat(i.addMajorNum))
            _this.stopMajorNumList.push(parseFloat(i.stopMajorNum) - (parseFloat(i.stopMajorNum) * 2))
          })
          let arrTuNum = this.dataList.map(r => r.addMajorNum)
          let arrMajorNum = this.dataList.map(r => r.stopMajorNum)
          let max = this.dataList.length > 0 ? Math.max(...arrTuNum) : 0
          let min = this.dataList.length > 0 ? Math.max(...arrMajorNum) : 0
          this.maxSum = max + parseInt(max / 3)
          this.minSum = -min - parseInt(min / 3)
          this.dataChange()
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
