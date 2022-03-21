<template>
    <div ref="EmploymentIndustry"
         style="height: 100%;">
        <ul v-for="(m,i) in EmploymentIndustry"
            :class="[EmploymentIndustryJusge?'EmploymentIndustry':'']"
            :style="{'--time':data.length*2+'s'}"
            :key="i">
            <li v-for="(item,index) in data"
                :key="index">
                <span>{{item.tradeName}}</span>
                <div>
                    <p class="progress"><i
                           :style="{width:`${item.jobNum}%`,background:`linear-gradient(to right, ${item.Color} )`}"></i>
                    </p><span>总人次{{item.jobNum}}</span>
                </div>
                <div>
                    <p class="progress"><i
                           :style="{width:`${item.jobNum2}%`,background:`linear-gradient(to right, ${item.Color} )`}"></i>
                    </p><span>总时长{{item.jobNum2}}</span>
                </div>
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
            Color: [
                '#1161ef, #87efff',
                '#F07517,#F8AB0A',
                '#059669,#1CE1AA',
                '#F07517,#F8AB0A',
                '#2396f5,#F8AB0A',
                '#fbc02d,#F8AB0A',
                '#26a69a,#F8AB0A',
                '#5c6bc0,#F8AB0A',
                '#9575cd,#F8AB0A',
                '#ff8c33,#F8AB0A',
                '#4dd0e1,#F8AB0A',
                '#ba68c8,#F8AB0A',
                '#c0ca33,#F8AB0A',
                '#78909c,#F8AB0A',
                '#66bb6a,#F8AB0A',
                '#a1887f,#F8AB0A',
                '#ff7043,#F8AB0A',
                '#f5a227,#F8AB0A',
                '#8bc34a,#F8AB0A',
                '#ff80ab,#F8AB0A',
                '#ff5252,#F8AB0A',
                '#9e9e9e,#F8AB0A',
                '#51E0BC,#F8AB0A'
            ]


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
            console.log(this.data, 'dat')
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
        }
        >div {
            display: flex
            justify-content: space-between
            align-items: center
            padding: 5px 0
            .progress {
                border-radius: 12px
                overflow: hidden
                width: 100%
                height: 8px
                background: rgba(225, 225, 225, 0.3)
                position: relative
                font-size: 0.12rem
                margin-right: 10px
                >i {
                    height: 8px
                    display: block
                }
            }
            >span {
                white-space: nowrap
            }
        }
    }
}
</style>
