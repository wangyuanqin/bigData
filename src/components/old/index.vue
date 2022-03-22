<!--
 * @Author       : wangyuanqin
 * @desc         : 智慧养老大数据服务平台
 * @Date         : 2022-03-19 15:42:17
 * @LastEditTime : 2022-03-22 17:52:00
 * @LastEditors  : wangyuanqin
 * @FilePath     : \bigData\src\components\old\index.vue
-->
<template>
    <div class="bigData">
        <div class="bigData-top">
            <p class="left"></p>
            <span class="title">{{ $bigDataTile }}</span>
            <p class="right"><label>{{nowDate}}</label></p>
        </div>
        <div class="bigData-body">
            <div class="dataContent">
                <div class="dataContent-left">
                    <div class="top">
                        <div class="titleBox">老年人数据统计</div>
                        <div class="bing">
                            <p class="bing-title">
                                <span>街道:{{oldObj.sites}}</span>
                                <span>社区:{{oldObj.communitys}}</span>
                                <span>老人:{{oldObj.users}}</span>
                            </p>
                            <div class="bing-report">
                                <div class="reportChart">
                                    <ringChart ref="ringChart"
                                               :dataList="oldList"></ringChart>
                                </div>
                            </div>
                        </div>
                        <div class="oldtype">
                            <div class="chartOld">
                                <topChart ref="topChart"
                                          :dataList="tagUserList" />
                            </div>
                        </div>
                    </div>
                    <div class="banner">
                        <div class="titleBox">服务机构情况</div>
                        <div class="chartBox">
                            <leftChart ref="leftChart" />
                        </div>
                    </div>
                </div>
                <div class="dataContent-center">
                    <div class="top">
                        <div>
                            <img src="~@/../static/images/bigDataImg/centercion01.png">
                            <div><span v-countRunning="centertop.userCount"></span>
                                <p>登记老人数量</p>
                            </div>
                        </div>
                        <div>
                            <img src="~@/../static/images/bigDataImg/centercion02.png">
                            <div><span v-countRunning="centertop.departmentCount"></span>
                                <p>服务机构数量</p>
                            </div>
                        </div>
                        <div>
                            <img src="~@/../static/images/bigDataImg/centercion03.png">
                            <div><span v-countRunning="centertop.jobUserCount"></span>
                                <p>志愿者数量</p>
                            </div>
                        </div>
                        <div>
                            <img src="~@/../static/images/bigDataImg/centercion04.png">
                            <div><span v-countRunning="centertop.servicerecordCount"></span>
                                <p>累计服务总人次</p>
                            </div>
                        </div>
                    </div>
                    <div class="top2">
                        <leftList ref="leftList" />
                        <!-- <div class="advert-top"
                             v-if="message">
                            <div class="ico-horn">
                                <img :src="ico_horn"
                                     alt="">
                            </div>
                            <div class="marquee-wrap">
                                <ul class="marquee-box"
                                    id="marquee-box">
                                    <li class="marquee-list"
                                        v-for="i in 3"
                                        key="i"
                                        v-html="message"
                                        :id="i==1?'marquee':''"></li>
                                </ul>
                            </div>
                        </div> -->
                    </div>
                    <div class="banner">
                        <div class="titleBox">地图位置</div>

                    </div>
                </div>
                <div class="dataContent-right">
                    <div class="top">
                        <div class="titleBox">居家服务项目统计</div>
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
/* eslint-disable */
import leftList from '../component/leftList'
import topChart from '../component/topChart'
import rightChart from '../component/rightChart'
import leftChart from '../component/leftChart'
import ringChart from '../component/ringChart'
import Employment from '@/components/conMap/Employment'
export default {
    props: {},
    components: {
        topChart,
        rightChart,
        Employment,
        ringChart,
        leftChart,
        leftList
    },
    data () {
        return {
            tagUserList: [],
            oldList: [
                { name: '60岁以下', value: 0 },
                { name: '60-69岁', value: 0 },
                { name: '70-79岁', value: 0 },
                { name: '80-89岁', value: 0 },
                { name: '90岁以上', value: 0 },
            ],
            oldObj: {
                sites: 0,
                communitys: 0,
                users: 0
            },
            CollegeData: '',
            time: '', // 定时器
            ico_horn: require('@/../static/images/message-icon.png'),
            mesList: [
                { msg: '2022-03-19 张无忌 志愿者 在内江市区内 为福州新城社区 <span>张三丰</span> 老人提供了<span>扶过马路</span>服务' },
                { msg: '嘎嘎嘎嘎' }
            ],
            centertop: {
                userCount: 10, // 登记老人数量
                departmentCount: 58, // 服务机构数量
                jobUserCount: 33, // 志愿者总数
                servicerecordCount: 24 // 累计服务总人次
            },
            nowDate: '',//当前日期
        }
    },
    created () { },
    mounted () {
        this.currentTime()//设置当前日期时间
        this.getList()
        this.setTime()
        // setTimeout(() => {
        //     this.runMarquee()
        // }, 1000)
    },
    destroyed () {
        clearInterval(this.time)
        this.time = null
        if (this.formatDate) {
            clearInterval(this.formatDate);
        }
    },
    methods: {
        setTime () {
            var i = 0
            this.time = setInterval(() => {
                i = i + 1000
                // if (i % 10000 === 0) {
                //     // this.message+="gagagaggag"
                //     this.mesList.push({ msg: i + '----2022-03-19 张无忌 志愿者 在内江市区内 为福州新城社区 <span>张三丰</span> 老人提供了<span>扶过马路</span>服务' })
                //     this.mesList.splice(0, 1)
                //     console.log(this.mesList, 'mesList')
                // }
                if (i % 4500 === 0) {
                    this.$refs.leftList.initMap() // 当日服务显示
                }
                // if (i % 5800 === 0) {
                //     this.$refs.topChart.initMap() // 老年人数据统计
                // }
                if (i % 4800 === 0) {
                    this.$refs.rightChart.initMap() // 助餐服务情况
                }
                if (i % 5000 === 0) {
                    this.$refs.leftChart.initMap() // 服务机构情况
                }
                // if (i % 5500 === 0) {
                //     this.$refs.ringChart.initMap() // 老年人数据统计
                // }
                if (i % 6000 === 0) {
                    this.getList()
                }
            }, 1000)
        },
        runMarquee () {
            // 获取文字 计算后宽度
            var width = document.getElementById('marquee').getBoundingClientRect().width
            var marquee = document.getElementById('marquee-box')
            var disx = 0 // 位移距离
            setInterval(() => {
                //设置位移
                disx-- // disx-=1; 滚动步长
                if (-disx >= width) {
                    disx = 10 // 如果位移超过文字宽度，则回到起点  marquee-list的margin值
                }
                // marquee.style.transform = 'translateX(' + disx + 'px)'
                marquee.style.left = disx + 'px'
            }, 30) //滚动速度
        },
        getList () {
            let _this = this
            // 家居服务项目统计
            _this.$http.get('/Interface/ResidentialServices').then(res => {
                if (res.success === 0) {
                    let arr = []
                    let residential = res.data.residential.value
                    residential.forEach(i => {
                        arr.push({ tradeName: i.ProjectName, jobNum: parseFloat(i.Count) || 0, jobNum2: parseFloat(i.CountTime) || 0 })

                    })
                    this.CollegeData = arr

                } else {
                    _this.$message.error(res.msg)
                }
            })
            //老年人数据统计
            _this.$http.get('/Interface/UserServices').then(res => {
                if (res.success === 0) {
                    let ages = res.data.ages.value[0]
                    _this.oldObj.sites = res.data.sites.value
                    _this.oldObj.communitys = res.data.communitys.value
                    _this.oldObj.users = res.data.users.value
                    _this.oldList = [
                        { name: '60岁以下', value: ages.age60Under || 0 },
                        { name: '60-69岁', value: ages.age60between69 || 0 },
                        { name: '70-79岁', value: ages.age70between79 || 0 },
                        { name: '80-89岁', value: ages.age80between89 || 0 },
                        { name: '90岁以上', value: ages.age90Above || 0 },
                    ]
                    _this.tagUserList = res.data.TagUser.value || []
                } else {
                    _this.$message.error(res.msg)
                }
            })
            //数据汇总
            _this.$http.get('/Interface/DataService').then(res => {
                if (res.success === 0) {
                    _this.centertop.userCount = parseFloat(res.data.userCount.value) || 0
                    _this.centertop.jobUserCount = parseFloat(res.data.jobUserCount.value) || 0
                    _this.centertop.departmentCount = parseFloat(res.data.departmentCount.value) || 0
                    _this.centertop.servicerecordCount = parseFloat(res.data.servicerecordCount.value) || 0
                } else {
                    _this.$message.error(res.msg)
                }
            })
        },

        currentTime () {
            setInterval(this.formatDate, 500);
        },
        formatDate () {
            let date = new Date();
            let year = date.getFullYear(); // 年
            let month = date.getMonth() + 1; // 月
            let day = date.getDate(); // 日
            let week = date.getDay(); // 星期
            let weekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            let hour = date.getHours(); // 时
            hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
            let minute = date.getMinutes(); // 分
            minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
            let second = date.getSeconds(); // 秒
            second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
            this.nowDate = `${year}-${month}-${day} ${hour}:${minute}:${second} ${weekArr[week]}`;
        },
    },
    computed: {
        message () {
            let txt = ''
            this.mesList.forEach(i => {
                txt += i.msg
            });
            return txt
        },
    },
    watch: {}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.bigData {
    width: 100%
    height: 100%
    overflow: hidden
    background-image: url('~@/../static/images/bigDataImg/bg.png')
    background-repeat: no-repeat
    background-size: 100% 100%
    &-top {
        width: 100%
        height: 7.5%
        overflow: hidden
        background-image: url('~@/../static/images/bigDataImg/topbg.png')
        background-repeat: no-repeat
        background-size: 100% 100%
        color: #ffffff
        display: flex
        align-items: center
        >p {
            flex: 1
        }
        .left {
            height: 100%
            // text-indent: 0.3rem;
            font-size: 0.2rem
            position: relative
            label {
                position: absolute
                top: 35%
                height: 63%
                margin-left: 0.24rem
                display: flex
                align-items: center
                left: 0
                >img {
                    width: 0.32rem
                    margin-right: 0.1rem
                }
            }
        }
        .right {
            height: 100%
            // text-indent: 0.3rem;
            font-size: 0.2rem
            position: relative
            label {
                position: absolute
                top: 50%
                margin-right: 0.24rem
                right: 0
            }
        }
        >span {
            font-size: 0.32rem
            margin-bottom: 0.05rem
            font-weight: bold
            background: linear-gradient(#87efff, #1161ef)
            -webkit-background-clip: text
            color: transparent
        }
    }
    &-body {
        width: 100%
        height: calc(100% - 7.5%)
        .dataContent {
            margin: 0.4rem 0.24rem 0.24rem 0.24rem
            height: calc(100% - 0.64rem)
            display: flex
            justify-content: space-between
            &-left {
                // flex: 1;
                width: 30%
                margin-right: 0.16rem
                display: flex
                flex-direction: column
                .top {
                    height: 60%
                    margin-bottom: 0.16rem
                    background-image: url('~@/../static/images/bigDataImg/rightbg01.png')
                    background-repeat: no-repeat
                    background-size: 100% 100%
                    .bing {
                        height: 50%
                        padding: 0.16rem
                        &-title {
                            margin-bottom: 0.16rem
                            >span {
                                margin-right: 0.5rem
                                font-weight: bold
                                font-size: 0.16rem
                                &:nth-child(1) {
                                    color: #1CE1AA
                                }
                                &:nth-child(2) {
                                    color: #87efff
                                }
                                &:nth-child(3) {
                                    color: #F8AB0A
                                }
                            }
                        }
                        &-report {
                            width: 100%
                            height: calc(100% - 0.32rem)
                            .reportChart {
                                width: 100%
                                height: 100%
                            }
                        }
                    }
                    .oldtype {
                        height: 35%
                        .chartOld {
                            width: 100%
                            height: 100%
                        }
                    }
                }
                .banner {
                    flex: 1
                    background-image: url('~@/../static/images/bigDataImg/rightbg02.png')
                    background-repeat: no-repeat
                    background-size: 100% 100%
                }
            }
            &-center {
                min-width: 9.11rem
                flex: 1
                display: flex
                flex-direction: column
                .top {
                    height: 0.88rem
                    display: flex
                    flex-direction: row
                    >div {
                        flex: 1
                        background-image: url('~@/../static/images/bigDataImg/centerbg01.png')
                        background-repeat: no-repeat
                        background-size: 100% 100%
                        margin-right: 0.16rem
                        display: flex
                        align-items: center
                        >img {
                            width: 0.32rem
                            height: 0.32rem
                            margin: 0 0.2rem 0 0.24rem
                        }
                        >div {
                            overflow: hidden
                            >span {
                                color: #F7A20C
                                font-weight: bold
                                font-size: 0.3rem
                                height: 0.3rem
                                line-height: 0.3rem
                                white-space: nowrap
                            }
                            >p {
                                color: #ffffff
                                font-size: 0.14rem
                                margin-top: 0.08rem
                                white-space: nowrap
                            }
                        }
                    }
                    >div:last-child {
                        margin-right: 0
                    }
                }
                .top2 {
                    margin-top: 0.12rem
                    height: 1.8rem
                    .advert-top {
                        position: relative
                        display: flex
                        width: 100%
                        height: 0.88rem
                        background: linear-gradient(
                            270deg,
                            rgba(80, 175, 255, 1) 0,
                            rgba(13, 132, 248, 1) 48%,
                            rgba(55, 159, 248, 1) 86%,
                            rgba(81, 176, 255, 1) 100%
                        )
                        color: #fff
                        font-size: 0.32rem
                        align-items: center
                    }
                    .ico-horn {
                        display: flex
                        width: 0.88rem
                        height: 0.88rem
                        justify-content: center
                        align-items: center
                    }
                    .ico-horn>img {
                        width: 0.32rem
                        height: 0.32rem
                    }
                    /* 以下代码与滚动相关 */
                    .marquee-wrap {
                        position: relative
                        display: flex
                        overflow: hidden
                        width: 100%
                        height: 100%
                    }
                    .marquee-box {
                        position: absolute
                        top: 50%
                        display: flex
                        white-space: nowrap
                        transform: translateY(-50%)
                    }
                    .marquee-list {
                        margin-right: 10px
                    }
                    /* 此处“px”方便回到起点 */
                    .marquee-list span {
                        padding: 0 0.04rem
                        color: #ffe17b
                        font-weight: 700
                    }
                }
                .banner {
                    flex: 1
                    background-image: url('~@/../static/images/bigDataImg/centerbg02.png')
                    background-repeat: no-repeat
                    background-size: 100% 100%
                    margin-top: 0.16rem
                }
            }
            &-right {
                // flex: 1;
                width: 30%
                margin-left: 0.16rem
                display: flex
                flex-direction: column
                .top {
                    height: 60%
                    margin-bottom: 0.16rem
                    background-image: url('~@/../static/images/bigDataImg/rightbg01.png')
                    background-repeat: no-repeat
                    background-size: 100% 100%
                }
                .banner {
                    flex: 1
                    background-image: url('~@/../static/images/bigDataImg/rightbg02.png')
                    background-repeat: no-repeat
                    background-size: 100% 100%
                }
            }
        }
    }
    .titleBox {
        height: 0.4rem
        padding-left: 0.17rem
        line-height: 0.4rem
        color: #01AEFD
        font-weight: bold
        font-size: 0.18rem
        // font-family: serif;
        margin-top: 0.07rem
        background: linear-gradient(90deg, rgba(12, 75, 245, 0.6) 0%, rgba(71, 186, 198, 0) 100%)
    }
    .chartBox {
        width: 100%
        height: calc(100% - 0.47rem)
        overflow: hidden
    }
    .job {
        color: #fff
        padding: 0.11rem 0.31rem 0.18rem 0.33rem
        box-sizing: border-box
    }
}
</style>
