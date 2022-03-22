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
            hanNationNumList: [],
            contSum: 0,
            option: {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['服务人次'],
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
                            color: 'rgba(225,225,225,0.3)'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(225,225,225,0.3)'
                        }
                    },
                    data: ['累计', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
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
                            color: 'rgba(225,225,225,0.3)'
                        }
                    },
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
                    type: 'bar',
                    name: '服务人次',
                    barWidth: 15,
                    data: this.hanNationNumList
                }]
            }
        }
    },
    created () {
    },
    destroyed () {
        this.contSum = 0
    },
    mounted: function () {
        // 基于准备好的dom，初始化echarts实例
        this.chart = this.$echarts.init(this.$refs.classChart)
        this.initMap()
        // window.addEventListener('resize', this.handleWindowResize)
        window.addEventListener('resize', this.handleWindowResize)
        // this.animationAter()
    },
    methods: {
        drawChart () {
            if (!this.chart) return
            // 绘制图表
            this.chart.setOption(this.option)
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
        initMap () {
            let _this = this
            // 助餐服务情况控制器
            _this.$http.get('/Interface/MealSubsidies').then(res => {
                if (res.success === 0) {
                    let countNumber = parseFloat(res.data.countNumber.value)
                    let i = res.data.monthNumber.value[0]
                    _this.hanNationNumList = [countNumber, i.January, i.February, i.March, i.April, i.May, i.June, i.July, i.August, i.September, i.October, i.November, i.December]
                    _this.option.series[0].data = _this.hanNationNumList
                    _this.dataChange()
                } else {
                    _this.$message.error(res.msg)
                }
            })
        }

    },
    computed: {
        echarts () {
            return 'echarts' + Math.random() * 100000
        },
    },
    // 数据发生变化重新生成echarts
    watch: {
    },
    beforeDestroy () {
        // window.removeEventListener('resize', this.handleWindowResize)
        window.removeEventListener('resize', this.handleWindowResize)
    }
}
</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
.classChart {
    width: 100%
    height: 100%
}
</style>
