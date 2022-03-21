<!-- 添加图片 -->
<template>
  <div class="add-image-container">
    <div class="add-image-container-header">
      <p>添加图片</p>
    </div>
    <div class="add-image-list">
      <div class="add-image-icons"
           v-for="(picture,index) in pictureList"
           :key="'picture'+index">
        <img :src="picture.imgUrl">
        <div class="right-delete-options"
             @click="deleteImage(picture.imgUrl,index)">
          <!-- <img src="../assets/images/image-delete.png"> -->
          <div></div>
        </div>
      </div>
      <div class="add-image-icon">
        <img src="../assets/images/add_image.png">
        <form ref="fromd">
          <input id="File2"
                 ref="file2"
                 runat="server"
                 type="file"
                 name="file"
                 accept="image/*"
                 capture='camera'
                 style="width:100%"
                 multiple="multiple"
                 @change="onFileChange" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { loginInfo } from 'comm/js/utils.js'
export default {
  props: {
    pictureList: {
      type: Array
    }
  },
  data () {
    return {
      imgUrlList: [],
      images: [],
      id: this.$route.query.id,
      list: [],
      image: '',
      msg: '',
      camerashow: true,
      file: '',
      // 是否上传
      sfsc: false,
      // 已上传图片个数
      numimg: 0,
      arr: []
    }
  },

  components: {},

  created () {
  },

  mounted () {
    let info = navigator.userAgent.toLowerCase()
    if (info.match(/iPhone\sOS/i)) {
      document.querySelector('#File2').removeAttribute('capture')
    }
  },

  methods: {
    // 删除图片
    deleteImage (url, index) {
      this.$emit('parent', 'del', url, index)
    },
    showcamera () {
      if (this.images.length > 3) {
        this.camerashow = false
      } else {
        this.camerashow = true
      }
    },

    // 图片上传压缩
    onFileChange (e) {
      var vm = this
      var formData = new FormData()
      let params = loginInfo()
      formData.append('systemCode', 'EXUEDAO')
      formData.append('universityId', params.universityId)
      formData.append('operatorId', params.operatorId)
      formData.append('clientCategory', params.clientCategory)
      var files = e.target.files || e.dataTransfer.files
      for (var i = 0; i < files.length; i++) {
        this.createImage({ file: files[i], sczt: '', index: i }).then(function (r) {
          // 清空input;
          // alert('压缩大小' + r.size)
          e.target.value = ''
          let date = new Date().format('yyyyMMddhhmmss')
          formData.append('file', r, 'bighd' + date + '.jpg')
          vm.$axios.post(vm.$picture + '/imageUpload', formData).then(function (res) {
            var d = res.data
            if (d.code === '40001') {
              console.log('添加图片')
              console.log(d.content.result)
              vm.$emit('parent', 'add', d.content.result[0].url, 0)
            }
          })
        })
      }
    },
    // 创建和压缩图片
    createImage (file) {
      var vm = this
      var reader = null
      reader = new window.FileReader()
      reader.readAsDataURL(file.file)
      // alert('原始大小' + file.file.size)
      return new Promise(function (resolve) {
        reader.onload = function (e) {
          vm.picIsLoaded(e.target.result, function () {
            // 压缩图片
            var im = vm.compress(this, file.file.size, '')
            // 存储base64图片 img标签展示
            vm.imagePath = im
            var imgfile = vm.base64ToFile(im)
            // 存储blob图片文件
            resolve(imgfile)
          })
        }
      })
    },
    // 图片压缩
    // 参数:
    //  quality-图片大小
    //  source_img_obj-图片对象
    //  output_format-压缩对象格式
    compress: function (sourceImgObj, quality, outputFormat) {
      var mimeType = 'image/jpeg'
      if (outputFormat !== undefined && outputFormat === 'png') {
        mimeType = 'image/png'
      }
      var cvs = document.createElement('canvas')
      cvs.width = sourceImgObj.width
      cvs.height = sourceImgObj.height
      /* eslint-disable-next-line */
      var ctx = cvs.getContext('2d').drawImage(sourceImgObj, 0, 0)
      // canvas压缩图片生成base64图片流
      var newImageData = cvs.toDataURL(mimeType, 0.2)
      return newImageData
    },
    // base64转file
    base64ToFile: function (urlData) {
      var bytes = window.atob(urlData.split(',')[1])
      // 处理异常,将ascii码小于0的转换为大于0
      var ab = new ArrayBuffer(bytes.length)
      var ia = new Uint8Array(ab)
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], { type: 'image/png' })
    },
    // 判断图片是否已经缓存或者加载完毕
    picIsLoaded (url, callback) {
      var img = new Image() // 创建一个Image对象，实现图片的预下载
      img.src = url
      if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
        callback.call(img)
        return // 直接返回，不用再处理onload事件
      }
      img.onload = function () { // 图片下载完毕时异步调用callback函数。
        callback.call(img)// 将回调函数的this替换为Image对象
      }
    },
    removeImage: function (e) {
      this.images = []
    },
    // delImage: function (index) {
    //   this.list.splice(index,"1",1);
    //   this.$nextTick(() => {
    //     if(this.list.length===1){
    //       this.camerashow=true;
    //     }
    //   });
    // },
    // 删除对象
    delImage (index) {
      var vm = this
      var size = vm.list.length
      if (index < size) {
        for (var i = (size - 1); i >= index; i--) {
          if (i > index) {
            vm.arr.push(vm.list.pop())
          } else if (i === index) {
            vm.list.pop()
          }
        }
        vm.$nextTick(() => {
          // 翻转数组
          vm.arr.reverse().forEach(function (r, i) {
            vm.list.push(r)
          })
          vm.arr = []
        })
      } else {
        vm.list.pop()
      }
    },
    loadImgs (event) {
      event.preventDefault()
      var vm = this
      vm.$axios({
        method: 'post',
        url: 'http://192.168.2.17:11019' + '/imageserver/target_dtfb?id=' + vm.id + '&content=' + encodeURI(encodeURI(vm.msg)) + '&pics=' + vm.list.join()
        // params: vm.$getIdentity()
      }).then((res) => {
        var d = res.data
        if (d.code === '40001') {
          vm.$Toast('发表成功')
          vm.$router.go(-1)
        } else {
          vm.$Toast('发布失败')
        }
      })
    },
    submit: function () {
      console.log('提交动态')
      this.$axios({
        method: 'post',
        url: '',
        params: ''
      }).then(function (res) {

      })
    }
  },

  computed: {
    nowsc: function () {
      return this.list.length === this.numimg
    }
  },
  watch: {
    images: 'showcamera',
    msg: {
      handler: function (val, old) {
      }
    }
  }
}

</script>
<style lang='stylus' rel='stylesheet/stylus'>
.add-image-container {
  padding-left: 0.14rem;
  padding-right: 0.14rem;
  width: calc(100% - 0.28rem);
  padding-bottom: 0.2rem;
  background-color: $content-background-color;

  .add-image-container-header {
    width: 100%;
    height: 0.58rem;
    display: flex;
    align-items: center;

    >p {
      font-size: 0.16rem;
      font-weight: bold;
    }
  }

  .add-image-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    >div {
      width: 1.08rem;
      height: 1.08rem;
      margin-right: 0.12rem;
      margin-bottom: 0.2rem;
      flex: 0 0 calc(33.5% - 0.12rem);
      border: 1px dashed rgba(197, 211, 224, 1);
    }

    >div:nth-child(3n+3) {
      margin-right: 0px;
    }
  }

  .add-image-icon {
    width: 1.08rem;
    height: 1.08rem;
    border: 1px dashed rgba(197, 211, 224, 1);
    opacity: 1;
    border-radius: 0.02rem;
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    position: relative;

    >form {
      // height: 100%;
      // width: 100%;
      >input {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        opacity: 0;
      }
    }
  }

  .add-image-icons {
    width: 1.08rem;
    height: 1.08rem;
    border: 1px dashed rgba(197, 211, 224, 1);
    opacity: 1;
    border-radius: 0.02rem;
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    position: relative;

    >img {
      width: 100%;
      height: 100%;
    }

    .right-delete-options {
      position: absolute;
      width: 0.2rem;
      height: 0.2rem;
      // border: 1px solid red;
      right: -0.1rem;
      top: -0.1rem;
      border-radius: 50%;
      background-color: #FFFFFF;
      display: flex;
      align-items: center; /* 垂直居中 */
      justify-content: center; /* 水平居中 */

      >div {
        width: 0.15rem;
        height: 0.15rem;
        bg-image('../assets/images/image-delete');
        background-size: 100% 100%;
        border-radius: 50%;
      }
    }
  }
}
</style>
