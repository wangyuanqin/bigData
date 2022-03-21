<template>
  <div ref="EmploymentIndustry"
       style="height: 100%;">
    <ul v-for="(m,i) in EmploymentIndustry"
        :class="[EmploymentIndustryJusge?'EmploymentIndustry':'']"
        :style="{'--time':14*2+'s'}"
        :key="i">
      <li v-for="(item,index) in 14"
          :key="index">
        <span>
          <label><b>农，林，牧，渔业</b><strong>319</strong></label>
          <label><i :style="{ background:` linear-gradient(to right, ${Color[index]} )` }"></i><em></em></label>
        </span>
      </li>
    </ul>
  </div>
</template>

<script type="ecmascript-6">
export default {
  name: '',
  components: {},

  props: [],
  data () {
    return {
      EmploymentIndustry: 1,
      EmploymentIndustryJusge: true,
      Color: ['#1161ef, #87efff', '#F07517,#F8AB0A', '#059669,#1CE1AA', '#F07517,#F8AB0A']
    }
  },
  created () {
  },
  mounted () {
    // 是否滑动
    let EmployEv = this.$refs.EmploymentIndustry
    if (EmployEv.firstChild.clientHeight > EmployEv.clientHeight) {
      this.EmploymentIndustry = 2
      this.EmploymentIndustryJusge = true
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
ul {
  &.EmploymentIndustry {
    animation: scaleDraw var(--time) linear infinite;

    @keyframes scaleDraw {
      from {
        transform: translateY(0%);
      }

      to {
        transform: translateY(-100%);
      }
    }
  }

  li {
    padding-top: 0.24rem;

    span {
      display: block;

      label {
        &:nth-child(1) {
          display: flex;
          opacity: 0.85;
          margin-bottom: 0.08rem;

          b {
            flex: 1;
          }
        }

        &:nth-child(2) {
          height: 0.06rem;
          width: 100%;
          display: block;
          position: relative;

          i {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 30%;
            background: red;
            transition: all 0.3s;
          }

          em {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            background: #fff;
            opacity: 0.07;
          }
        }
      }
    }
  }
}
</style>
