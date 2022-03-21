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
                '#2396f5,#F8AB0A',
                '#26a69a,#75f4e8',
                '#5c6bc0,#909eec',
                '#9575cd,#d1bdf2',
                '#ff8c33,#fac8a1',
                '#4dd0e1,#b2f2fa',
                '#ba68c8,#f1bafa',
                '#c0ca33,#eff873',
                '#78909c,#d9e6ec',
                '#66bb6a,#99ff9e',
                '#a1887f,#c8aea5',
                '#ff7043,#fea386',
                '#f5a227,#fecc83',
                '#8bc34a,#caff8d',
                '#ff80ab,#f2a6c0',
                '#ff5252,#fea3a3',
                '#51E0BC,#8df0d7'
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
