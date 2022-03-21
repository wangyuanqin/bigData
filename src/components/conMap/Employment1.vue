<template>
    <div ref="EmploymentIndustry"
         style="height: 100%;">
        <ul v-for="(m,i) in EmploymentIndustry"
            :class="[EmploymentIndustryJusge?'EmploymentIndustry':'']"
            :style="{'--time':data.length*2+'s'}"
            :key="i">
            <li v-for="(item,index) in data"
                :key="index">
                <span>
                    <label><b>{{item.collegeName|| item.tradeName}}</b>
                        <strong :data-value="item.stuNum || item.jobNum"
                                :ref="'strong1'+index">
                            <!-- {{item.stuNum || item.jobNum}} -->
                        </strong>
                        <strong :ref="'strong2'+ index"
                                :data-value="item.ratio"
                                v-if="item.ratio">
                            <!-- {{item.ratio}}% -->
                        </strong></label>
                    <label><i :ref="'evI'+index"
                           :style="{ background:` linear-gradient(to right, ${item.Color} )`}"></i><em></em></label>
                </span>
            </li>
        </ul>
    </div>
</template>

<script type="ecmascript-6">
export default {
    name: '',
    components: {},

    props: ['CollegeData'],
    data () {
        return {
            data: '',
            EmploymentIndustry: 1,
            EmploymentIndustryJusge: false,
            Color: ['#1161ef, #87efff', '#F07517,#F8AB0A', '#059669,#1CE1AA', '#F07517,#F8AB0A']
        }
    },
    created () {
    },
    mounted () {
    },
    methods: {
        setTime (ev, sum) {
            var i = 0
            var time = setInterval(() => {
                i = i + sum / 10
                ev.innerHTML = Math.round(i)
                if (i >= sum) {
                    ev.innerHTML = sum
                    clearInterval(time)
                }
            }, 100)
        }
    },
    watch: {
        CollegeData () {
            let arrTuNum = this.CollegeData.map(r => r.stuNum || r.jobNum)
            let max = this.CollegeData.length > 0 ? Math.max(...arrTuNum) : 0
            // console.log(this.CollegeData, max)
            let i = 0
            this.data = this.CollegeData.map(r => {
                i++
                if (!this.Color[i]) {
                    i = 0
                }
                r.Color = this.Color[i]
                return r
            })
            this.$nextTick(() => {
                // 是否滑动
                let EmployEv = this.$refs.EmploymentIndustry
                if (EmployEv.firstChild.clientHeight > EmployEv.clientHeight) {
                    this.EmploymentIndustry = 2
                    this.EmploymentIndustryJusge = true
                }
                setTimeout(() => {
                    this.data.forEach((r, i) => {
                        let sum = this.$refs['strong1' + i][0].dataset.value
                        this.setTime(this.$refs['strong1' + i][0], sum)
                        if (this.EmploymentIndustryJusge) {
                            this.setTime(this.$refs['strong1' + i][1], sum)
                            this.$refs['evI' + i][1].style.width = (r.stuNum || r.jobNum) / max * 100 + '%'
                        }
                        this.$refs['evI' + i][0].style.width = (r.stuNum || r.jobNum) / max * 100 + '%'
                    })
                }, 300)
            })
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
ul {
    &.EmploymentIndustry {
        animation: scaleDraw var(--time) linear infinite
        @keyframes scaleDraw {
            from {
                transform: translateY(0%)
            }
            to {
                transform: translateY(-100%)
            }
        }
    }
    li {
        padding-top: 0.24rem
        span {
            display: block
            label {
                &:nth-child(1) {
                    display: flex
                    opacity: 0.85
                    margin-bottom: 0.08rem
                    b {
                        flex: 1
                        text-overflow: ellipsis
                        white-space: nowrap
                        overflow: hidden
                    }
                    strong {
                        margin-left: 0.24rem
                        transition: width 1s ease-out
                    }
                }
                &:nth-child(2) {
                    height: 0.06rem
                    width: 100%
                    display: block
                    position: relative
                    i {
                        position: absolute
                        left: 0
                        top: 0
                        height: 100%
                        width: 0%
                        background: red
                        transition: width 1s ease-out
                    }
                    em {
                        position: absolute
                        left: 0
                        top: 0
                        height: 100%
                        width: 100%
                        background: #fff
                        opacity: 0.07
                    }
                }
            }
        }
    }
}
</style>
