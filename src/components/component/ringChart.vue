<!--
/**
* @desc chart
* @author wangyuanqin
* @date 2020年06月12日14:00,星期五
*/
-->
<template>
    <div class="classChart">
        <div class="classChart"
             v-show="showChart"
             ref="classChart"></div>
        <!-- <noContent v-if="!showChart"
               :count="dataList" /> -->
    </div>
</template>

<script>
// import noContent from 'base/no-content'// 暂无数据
export default {
    // name: 'resourceChart2',
    props: ["dataList"],
    // components: { noContent },
    data () {
        return {
            chart: null,
            showChart: true
        };
    },
    created () { },
    mounted: function () {
        let _this = this;
        // 基于准备好的dom，初始化echarts实例
        _this.chart = _this.$echarts.init(_this.$refs.classChart);
        _this.dataChange();
        // _this.$listen("resize", _this.handleWindowResize, "add");//监听window
        // 监听chartdiv变化
        _this.$erd.listenTo(_this.$refs.classChart, function (element) {
            // var width = element.offsetWidth;
            // var height = element.offsetHeight;
            // console.log("Size: " + width + "x" + height);
            _this.handleWindowResize();
        });
    },
    methods: {
        drawChart () {
            if (!this.chart) return;
            // 绘制图表
            this.chart.setOption({
                tooltip: {
                    trigger: "item",
                    formatter: "{b}: {c} ({d}%)"
                },
                legend: {
                    show: false,
                    orient: "vertical",
                    left: 10,
                    data: this.legend
                },
                color: this.colorList,
                series: [
                    {
                        name: "访问来源",
                        type: "pie",
                        radius: ["30%", "88%"],
                        itemStyle: {
                            normal: {
                                borderWidth: 2,
                                borderColor: "#fff",
                                label: {
                                    show: true,
                                    formatter: function (params) {
                                        return params["name"] + ":" + params["percent"] + "%";
                                    },
                                    textStyle: {
                                        color: "#909BA8",
                                        fontSize: 12
                                    }
                                }
                            }
                        },
                        data: this.dataList
                    },
                    {
                        type: "pie",
                        radius: ["90%", "93%"],
                        avoidLabelOverlap: false,
                        legendHoverLink: false,
                        label: {
                            show: false
                        },
                        tooltip: {
                            // 禁止鼠标悬停显示提示框
                            show: false
                        },
                        hoverAnimation: false, // 禁止鼠标悬停放大区域
                        color: ["rgba(225,225,225,0.5)"],
                        data: [
                            {
                                value: 1
                            }
                        ]
                    }
                ]
            });
        },
    /**
     * 当窗口缩放时，echart动态调整自身大小
     */ handleWindowResize () {
            if (!this.chart) return;
            setTimeout(() => {
                this.chart.resize(); // 防止偏差让它后执行30毫秒
            }, 30);
        },
        dataChange () {
            const _this = this;
            if (_this.dataList && _this.dataList.length > 0) {
                _this.$nextTick(() => {
                    _this.drawChart();
                });
                _this.showChart = true;
            } else {
                _this.showChart = false;
            }
        }
    },
    computed: {
        echarts () {
            return "echarts" + Math.random() * 100000;
        },
        colorList () {
            return [
                "#4DD0E1",
                "#C0CA33",
                "#5C6BC0",
                "#FBC02D",
                "#FF7043",
                "#8BC34A",
                "#FF8C33",
                "#FF80AB"
            ];
        },
        legend () {
            let arr = [];
            this.dataList.forEach(i => {
                arr.push(i.name);
            });
            return arr;
        }
    },
    // 数据发生变化重新生成echarts
    watch: {
        dataList (val) {
            this.dataChange();
        }
    },
    beforeDestroy () {
        // window.removeEventListener('resize', this.handleWindowResize)
        this.$listen("resize", this.handleWindowResize);
    }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.classChart {
    width: 100%
    height: 100%
}
</style>
