
<!-- slint-disable indent -->
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
import symbolImg from '../../../static/images/bigDataImg/chartPoint.png'
let symbolUrl = 'image://' + symbolImg
export default {
  name: 'classChart',
  components: {

  },
  data () {
    return {
      chart: null,
      dataList: [],
      dataDateList: [],
      stuNumList: [],
      maxSum: 0, // 最大值
      minSum: 0// 最小值
    }
  },
  created () {
    this.getList()
  },
  mounted: function () {
    // 基于准备好的dom，初始化echarts实例
    this.chart = this.$echarts.init(this.$refs.classChart)
    // this.dataChange()
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
        grid: {
          top: '30',
          left: '10',
          right: '20',
          bottom: '10',
          containLabel: true
        },
        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,
          [
            {
              offset: 0,
              color: 'rgba(12,75,245,0.8)'
            },
            {
              offset: 1,
              color: 'rgba(71,186,198,0)'
            }
          ]),
        legend: { data: [] },
        xAxis: {
          type: 'category',
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
        series: [{
          data: this.stuNumList,
          type: 'line',
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: { // 数值样式
                color: 'rgba(225,225,225,1)',
                fontSize: 12
              }
            }
          },
          symbol: symbolUrl,
          symbolSize: 16, // 设定点的大小,
          lineStyle: {
            color: '#01AEFD',
            width: 4
          },
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
              yAxis: this.maxSum // 取最大值，顶部线
            }]
          },
          areaStyle: {}
        }]
      })
    },
    initMap () {
      if (this.dataList.length > 0) {
        var option1 = this.chart.getOption()
        this.chart.clear()
        this.chart.setOption(option1, true)
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
      // 招生人数趋势
      _this.$http.get('/screenSchRecStuNumTrend/list').then(res => {
        if (res.code === '40001') {
          _this.dataList = res.content
          res.content.forEach(i => {
            _this.dataDateList.push(i.dataDate)
            _this.stuNumList.push(parseFloat(i.stuNum))
          })
          let arrTuNum = this.dataList.map(r => r.stuNum)
          let max = this.dataList.length > 0 ? Math.max(...arrTuNum) : 0
          let min = this.dataList.length > 0 ? Math.min(...arrTuNum) : 0
          this.maxSum = max + parseInt(max / 3)
          this.minSum = min - parseInt(max / 3)
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
