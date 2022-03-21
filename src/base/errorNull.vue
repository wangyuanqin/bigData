<template>
  <div class="errorNull">
    <div class="errorNull-one">
      <img :src="setImgattr(textNull)">
      <p>{{text}}</p>
      <P v-if="textNull===2"
         style="color:#999999">检查网络连接或当前网络状态</P>
    </div>
  </div>
</template>

<script type="ecmascript-6">

export default {
  data () {
    return {
      text: ''
    }
  },
  props: {
    urlImg: {
      type: String,
      default: ''
    },
    textcustom: {
      type: String,
      default: '无数据'
    },
    textNull: {
      type: Number,
      default: 0
    }
  },
  methods: {
    setImgattr (val) {
      // eslint-disable-next-line no-unused-vars
      var urlName = require('@/assets/images/errorNull_wsj.png')
      this.text = '暂无数据'
      switch (val) {
        case 0:
          this.text = this.textcustom
          urlName = this.urlImg// 自定义
          break
        case 1:
          this.text = '暂无数据'
          urlName = require('@/assets/images/errorNull_wsj.png')// 无数据
          break
        case 2:
          this.text = '无可用网络'
          urlName = require('@/assets/images/errorNull_wsj.png')// 无网络
          break
        case 3:
          this.text = '请求超时'
          urlName = require('@/assets/images/errorNull_wsj.png')// 请求超时
          break
      }
      return urlName
    }
  },
  computed: {

  }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.errorNull {
  font-size: 0.14rem;
  // display: inline-block;
  // width: 100%;
  // height: 100%;
  text-align: center;

  &-one {
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    img {
      width: 1.75rem;
      height: 1.75rem;
    }

    p {
      font-size: 0.15rem;
      color: #333;
    }
  }
}
</style>
