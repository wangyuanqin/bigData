<!--
/**
* @desc 功能描述
* @author wangyuanqin
* @date 2020年06月18日20:28,星期四
*/
-->
<template>
    <div class="tableBox"
         @mouseenter="enter"
         @mouseleave="leave">
        <!-- <div class="tableHead">
            <div>学期</div>
            <div>教师</div>
            <div>课时数(节)</div>
        </div> -->
        <div class="tableBanner"
             ref="banner">
            <ul class="tableList"
                v-if="dataList.length"
                ref="list"
                :class="{'animate-up': animateUp}">
                <li v-for="(item,index) in dataList"
                    :key="index">
                    <!-- <div>{{item.termCode}}</div> -->
                    <div>{{item.tchName}}</div>
                    <!-- <div>{{item.classHourNum}}</div> -->
                </li>
            </ul>
            <p v-else
               class="noContent">暂无数据</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'leftList',
    props: {

    },
    components: {

    },
    data () {
        return {
            dataList: [],
            animateUp: false,
            timer: null
        }
    },
    created () {
        this.getList()
    },
    mounted () {
        // 内容大于滚动框容器才执行定时滚动
        this.$nextTick(() => {
            let listHeight = this.$refs.list.clientHeight
            let bannerHeight = this.$refs.banner.clientHeight
            if (listHeight > bannerHeight) {
                this.timer = setInterval(this.scrollAnimate, 1500)
            } else {
                clearInterval(this.timer)
                this.timer = null
            }
        })
        this.timer = setInterval(this.scrollAnimate, 1500);
    },
    methods: {
        initMap () {
            let listHeight = this.$refs.list.clientHeight
            let bannerHeight = this.$refs.banner.clientHeight
            if (listHeight > bannerHeight) this.scrollAnimate()
        },
        enter () {
            if (this.timer) clearInterval(this.timer)
        }, // 鼠标进入
        leave () {
            if (this.timer) this.timer = setInterval(this.scrollAnimate, 1500)
        }, // 鼠标离开
        scrollAnimate () { // 动画
            this.animateUp = true
            setTimeout(() => {
                this.dataList.push(this.dataList[0])
                this.dataList.shift()
                this.animateUp = false
            }, 500)
        },
        // 教授授课课时
        getList () {
            let _this = this
            // let arr = []
            // for (let i = 0; i < 100; i++) {
            //     arr.push({ tchName: `当日XX${i}志愿者在XX时间为XX老人提供Xx服务` })
            // }
            // _this.dataList = arr
            _this.$http.get('/Interface/SameDayService').then(res => {
                if (res.success === 0) {
                    if (res.data.listSameDay) {
                        if (res.data.listNowDAy.value.length === 0) {
                            _this.$emit('showRightFun', false)
                        } else {
                            _this.$emit('showRightFun', true)
                            _this.dataList = res.data.listNowDAy.value.map(i => {
                                i.tchName = `${i.jobuserName} ${i.startTime} 正在为 ${i.userName} 老人 ${i.itemName}`
                                return i
                            }) || []
                        }
                    }

                } else {
                    _this.$message.error(res.msg)
                }
            })
        }
    },
    computed: {

    },
    watch: {

    },
    destroyed () {
        clearInterval(this.timer)
        this.timer = null
    }
}
</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
.tableBox {
    // padding: 0 0.38rem 0.24rem 0.31rem
    // height: calc(100% - 0.71rem)
    height: 100%
    .tableHead {
        height: 0.54rem
        display: flex
        align-items: center
        color: #01AEFD
        font-size: 0.14rem
        font-weight: bold
        >div:nth-child(1) {
            flex: 2
            text-indent: 0.35rem
        }
        >div:nth-child(2) {
            flex: 1
        }
        >div:nth-child(3) {
            flex: 1
        }
    }
    .tableBanner {
        height: 100%
        overflow: hidden
        .tableList {
            >li {
                text-overflow: ellipsis
                overflow: hidden
                white-space: nowrap
                height: 0.32rem
                line-height: 0.32rem
                display: flex
                color: #ffffff
                font-size: 0.14rem
                background-image: url('~@/../static/images/bigDataImg/leftbg03.png')
                background-repeat: no-repeat
                background-size: 100% 100%
                margin-bottom: 0.14rem
                >div:nth-child(1) {
                    flex: 2
                    text-indent: 0.35rem
                }
                >div:nth-child(2) {
                    flex: 1
                }
                >div:nth-child(3) {
                    flex: 1
                }
            }
        }
        .animate-up {
            transition: all 0.5s ease-in-out
            transform: translateY(-0.4rem)
        }
    }
    .noContent {
        color: #ffffff
        text-align: center
        margin: 0.16rem
    }
}
</style>
