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
             @click.stop.prevent="deleteImage(picture.imgUrl,index)">
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
                 @change.prevent="onFileChange" />
        </form>
      </div>
    </div>
    <auto-quit-tips :tipsShow="tipsShow"
                    :message="message">
    </auto-quit-tips>
  </div>
</template>

<script>
import { loginInfo, getRandom } from 'comm/js/utils.js'
export default {
  props: {
    pictureList: {
      type: Array
    }
  },
  data () {
    return {
      tipsShow: '',
      message: '',
      imgUrlList: [],
      isIOS: null,
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
      arr: [],
      fileIndex: 0
    }
  },

  components: {},

  created () {
  },

  mounted () {
    let info = navigator.userAgent.toLowerCase()
    if (info.match(/iPhone\sOS/i)) {
      document.querySelector('#File2').removeAttribute('capture')
      this.isIOS = true
    }
  },

  methods: {
    // 删除图片
    deleteImage (url, index) {
      this.$emit('parent', 'del', url, index)
    },
    // 压缩图片上传
    onFileChange (e) {
      const _this = this
      let formData = new FormData()
      let params = loginInfo()
      formData.append('systemCode', 'EXUEDAO')
      formData.append('universityId', params.universityId)
      formData.append('operatorId', params.operatorId)
      formData.append('clientCategory', params.clientCategory)
      let files = e.target.files || e.dataTransfer.files
      /* eslint-disable */
      _this.fileIndex = 0
      console.log(_this.fileIndex)
      _this.createImage1(files, e)
      // let i = 0
      // let len = files.length
      // for (i; i < len; i++) {
      //   _this.createImage({ file: files[i], sczt: '', index: i }).then(function (r) {
      //     // 清空input;
      //     e.target.value = ''
      //     let date = new Date().format('yyyyMMddhhmmss')
      //     formData.append('file', r, 'bighd' + date + '.jpg')
      //     _this.$axios.post(_this.$picture + '/imageUpload', formData).then(function (res) {
      //       var d = res.data
      //       if (d.code === '40001') {
      //         i++
      //         _this.$emit('parent', 'add', d.content.result[0].url, 0)
      //       }
      //     })
      //   })
      // }
    },
    // 图片旋转处理  direction  图片需要旋转的方向
    rotateImage(img, direction, canvas) {
      let minStep = 0
      let maxStep = 3
      let width = img.width
      let height = img.height
      let step = 2
      if (step === null) {
        step = minStep
      }
      if (direction === 'right') {
        step++
        step > maxStep && (step = minStep)
      } else {
        step--
        step < minStep && (step = maxStep)
      }
      // 旋转角度以弧度值为参数
      let degree = step * 90 * Math.PI / 180
      let ctx = canvas.getContext('2d')
      switch (step) {
        case 0:
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0)
          break
        case 1:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, 0, -height)
          break
        case 2:
          canvas.width = width
          canvas.height = height
          ctx.rotate(degree)
          ctx.drawImage(img, -width, -height)
          break
        case 3:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, -width, 0)
          break
      }
      console.log('ctx' + ctx)
      return ctx
    },
    // 创建和压缩图片
    createImage1(files, e) {
      const _this = this
      let formData = new FormData()
      let params = loginInfo()
      formData.append('systemCode', 'EXUEDAO')
      formData.append('universityId', params.universityId)
      formData.append('operatorId', params.operatorId)
      formData.append('clientCategory', params.clientCategory)
      let orientation = null
      let filesLength = files.length;
      let file = files[_this.fileIndex]
      if (_this.fileIndex < filesLength) {
        // 获取照片方向属性
        EXIF.getData(file, function () {
          EXIF.getAllTags(this);
          orientation = EXIF.getTag(this, 'Orientation');
        })
        var vm = this
        var reader = null
        reader = new window.FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (e) {
          vm.picIsLoaded(e.target.result, function () {
            // 压缩图片
            var im = vm.compress(this, file.size, '', orientation)
            // 存储base64图片 img标签展示
            vm.imagePath = im
            var imgfile = vm.base64ToFile(im)
            let size = imgfile.size / 1024 / 1024
            if (size > 10) {
              _this.tipsShow = getRandom()
              _this.message = '图片太大无法上传'
            } else {
              // 存储blob图片文件
              e.target.value = ''
              let date = new Date().format('yyyyMMddhhmmss')
              formData.append('file', imgfile, 'bighd' + date + '.jpg')
              _this.$axios.post(_this.$picture + '/imageUpload', formData).then(function (res) {
                var d = res.data
                if (d.code === '40001') {
                  _this.fileIndex++
                  _this.$emit('parent', 'add', d.content.result[0].url, 0)
                  _this.createImage1(files, _this.fileIndex, e, formData)
                } else {
                  _this.tipsShow = getRandom()
                  _this.message = res.message
                }
              })
            }
          })
        }
      }
    },
    // 创建和压缩图片
    createImage(file) {
      let orientation = null
      // 获取照片方向属性
      EXIF.getData(file.file, function () {
        EXIF.getAllTags(this);
        orientation = EXIF.getTag(this, 'Orientation');
      })
      var vm = this
      var reader = null
      reader = new window.FileReader()
      reader.readAsDataURL(file.file)
      // alert('原始大小' + file.file.size)
      return new Promise(function (resolve) {
        reader.onload = function (e) {
          vm.picIsLoaded(e.target.result, function () {
            // 压缩图片
            var im = vm.compress(this, file.file.size, '', orientation)
            // 存储base64图片 img标签展示
            vm.imagePath = im
            var imgfile = vm.base64ToFile(im)
            // 存储blob图片文件
            resolve(imgfile)
          })
        }
      })
    },
    // 图片压缩  参数:quality-图片大小 source_img_obj-图片对象 output_format-压缩对象格式  orientation 需要旋转方向
    compress: function (sourceImgObj, quality, outputFormat, orientation) {
      const _this = this
      let mimeType = 'image/jpeg'
      if (outputFormat !== undefined && outputFormat === 'png') {
        mimeType = 'image/png'
      }
      let orient = _this.getPhotoOrientation(sourceImgObj)
      let canvas = document.createElement('canvas')
      let width = sourceImgObj.width
      let height = sourceImgObj.height
      canvas.width = sourceImgObj.width
      canvas.height = sourceImgObj.height
      /* eslint-disable-next-line */
      // let ctx = canvas.getContext('2d').drawImage(sourceImgObj, 0, 0)
      let ctx = canvas.getContext('2d')
      // 如果图片方向为6，则旋转矫正，反之则不做处理
      if (orient == 6) {
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.rotate(90 * Math.PI / 180);
        ctx.drawImage(sourceImgObj, 0 - height / 2, 0 - width / 2, height, width);
        ctx.restore();
      } else {
        ctx.drawImage(sourceImgObj, 0, 0, width, height);
      }
      // canvas压缩图片生成base64图片流
      let newImageData = canvas.toDataURL(mimeType, 0.2)
      return newImageData
    },
    // 判断图片是否已经缓存或者加载完毕
    picIsLoaded(url, callback) {
      let img = new Image() // 创建一个Image对象，实现图片的预下载
      img.src = url
      if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
        callback.call(img)
        return // 直接返回，不用再处理onload事件
      }
      img.onload = function () { // 图片下载完毕时异步调用callback函数。
        callback.call(img)// 将回调函数的this替换为Image对象
      }
    },
    // base64转file
    base64ToFile: function (urlData) {
      let bytes = window.atob(urlData.split(',')[1])
      // 处理异常,将ascii码小于0的转换为大于0
      let ab = new ArrayBuffer(bytes.length)
      let ia = new Uint8Array(ab)
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], { type: 'image/png' })
    },
    //获取图片方向
    getPhotoOrientation(img) {
      var orient;
      EXIF.getData(img, function () {
        orient = EXIF.getTag(this, 'Orientation');
      });
      return orient;
    }
  },

  computed: {

  },
  watch: {
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
