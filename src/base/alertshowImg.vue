<template>
  <div class="alertshowImg"
       v-if="alertshow"
       @click="boxshow">
    <div class="alertshowImg-bsg"></div>
    <div class="alertshowImg-content">
      <slot name="alertshowImg-content"></slot>
    </div>
  </div>
</template>

<script type="ecmascript-6">

export default {
  props: {
    alertshow: {
      type: Boolean,
      default: false
    }
  },
  name: '',
  components: {
  },
  mounted () {
  },
  methods: {
    boxshow () {
      setTimeout(() => {
        this.$parent.alertshow = false
      }, 300)
      this.$parent.imgTime = false
    }
  },
  watch: {
    alertshow (val) {
      if (!this.$parent.alertshow) return
      setTimeout(() => {
        this.$parent.imgTime = true
      }, 300)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.alertshowImg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3333;

  &-bsg {
    width: 100%;
    height: 100%;
    background: #000;
    z-index: 3333;
    opacity: 0.5;
  }

  &-content {
    width: 100%;
    position: fixed;
    z-index: 44444;
    display: table;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
