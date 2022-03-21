let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
function chartPaint () {
  let baseOption = {
    grid: {
      left: '3%',
      right: '4%',
      top: '10%',
      bottom: '8%',
      containLabel: true,
      show: true,
      backgroundColor: 'rgba(40,231,194,0.08)',
      borderColor: 'rgba(22,229,189,1)'
    },
    xAxis: {
      type: 'category',
      data: [],
      axisLabel: {
        show: true,
        // alignWithLabel: true,
        interval: 0
      },
      axisTick: {
        show: true,
        // alignWithLabel: true,
        interval: 0
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(22,229,189,1)'
        }
      },
      splitLine: {
        show: true,
        interval: 0,
        lineStyle: {
          color: 'rgba(22,229,189,1)'
        }
      }
    },
    yAxis: {
      type: 'value',
      min: function (value) {
        if (value.min < 10) {
          return 0
        } else {
          return value.min - 10
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(22,229,189,1)'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(22,229,189,1)'
        }
      }
    },
    series: [
      {
        name: '',
        type: 'line',
        symbol: 'circle',
        symbolSize: 6,
        data: [],
        itemStyle: {
          color: '#1FE7C3'
        }
      }
    ]
  }
  return {
    line1: function (data) {
      if (JSON.stringify(data) !== {}) {
        baseOption.xAxis.data = data.xList
        baseOption.series[0].data = data.datas
        return baseOption
      }
    }
  }
}
export {
  chartPaint,
  echarts
}
