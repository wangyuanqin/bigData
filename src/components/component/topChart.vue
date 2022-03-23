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
    props: {
        dataList: {
            type: Array,
            default: (() => {
                return []
            })
        }
    },
    name: 'centerChart2',
    components: {

    },
    data () {
        return {
            time: null,
            chart: null,
            dataDateList: [],
            hanNationNumList: [],
            option: {
                title: {
                    show: false,
                    text: '老人类型',
                    subtext: 'Fake Data',
                    left: 'center',
                    textStyle: {
                        fontSize: 14,
                        color: 'rgba(225,225,225,0.8)'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    show: false,
                    data: ['服务人次', '补贴金额'],
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
                        color: '#059669'
                    },
                    {
                        offset: 1,
                        color: '#1CE1AA'
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
                    //   name: '服务人次',
                    barWidth: 15,
                    data: this.hanNationNumList
                }]
            }
        }
    },
    created () {
    },
    destroyed () {
        clearInterval(this.time)
        this.time = null
    },
    mounted: function () {
        // 基于准备好的dom，初始化echarts实例
        this.chart = this.$echarts.init(this.$refs.classChart)
        this.dataChange()
        // window.addEventListener('resize', this.handleWindowResize)
        window.addEventListener('resize', this.handleWindowResize)
        // this.animationAter()
    },
    methods: {
        drawChart () {
            if (!this.chart) return
            // 绘制图表
            this.option.xAxis.data = this.dataDateList
            this.option.series[0].data = this.hanNationNumList
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

    },
    computed: {
        echarts () {
            return 'echarts' + Math.random() * 100000
        },
    },
    // 数据发生变化重新生成echarts
    watch: {
        dataList (val) {
            let _this = this
            _this.time = null
            _this.dataDateList = []
            _this.hanNationNumList = []
            var pageSize = 6//每页条数
            if (val && val.length > 0) {
                if (val.length <= pageSize) {
                    val.forEach(i => {
                        _this.dataDateList.push(i.TagName)
                        _this.hanNationNumList.push(i.TagUserCount)
                    });
                    _this.dataChange()
                } else {//超过一页的时候,分多页
                    let dataArr = [[]]
                    let numPage = 0
                    let num = 0
                    val.forEach((item, index) => {
                        if (num < pageSize) {
                            dataArr[numPage].push(item)
                            num++
                        } else {
                            numPage++
                            num = 0
                            dataArr.push([])
                            dataArr[numPage].push(item)
                            num++
                        }
                    })
                    //首次执行开始
                    dataArr[0].forEach(i => {
                        _this.dataDateList.push(i.TagName)
                        _this.hanNationNumList.push(i.TagUserCount)
                    });
                    _this.dataChange()
                    //首次执行结束
                    //循环开始
                    var pageNum = 1//当前页
                    _this.time = setInterval(() => {
                        _this.dataDateList = []
                        _this.hanNationNumList = []
                        if (pageNum === dataArr.length) pageNum = 0
                        dataArr[pageNum].forEach(i => {
                            _this.dataDateList.push(i.TagName)
                            _this.hanNationNumList.push(i.TagUserCount)
                        });
                        pageNum = pageNum + 1
                        _this.dataChange()

                    }, 5000)
                    //循环结束
                }
            }
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
    width: 100%
    height: 100%
}
</style>
