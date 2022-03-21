<!-- 课堂信息 -->
<template>
  <div class="classes-info-container">
    <div class="classes-info-header">
      <p>课堂信息</p>
    </div>
    <div class="classes-infos">
      <ul>
        <li>
          <p>授课教师：<span>{{courseInfoVo.userName}}</span></p>
        </li>
        <li>
          <p>课程名称：<span>{{courseInfoVo.courseName}}</span></p>
        </li>
        <li>
          <p>所在学院：<span>{{courseInfoVo.orgName}}</span></p>
        </li>
        <li>
          <p>授课班级：<span>{{courseInfoVo.teachingClassName}}</span></p>
        </li>
        <li>
          <p>听课教室：<span>{{courseInfoVo.classroomName}}</span></p>
        </li>
        <li>
          <p>听课时间：<span>{{courseInfoVo.beginDate}} 第{{courseInfoVo.whatWeek}}周 （星期{{whatDay}}） 第{{courseInfoVo.beginSection}}~{{courseInfoVo.endSection}}节</span></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { DXnum } from 'comm/js/utils'
export default {
  props: ['courseInfoVo'],
  data () {
    return {
      whatDay: null
    }
  },

  components: {},

  created () {
  },

  mounted () {
  },

  methods: {},

  computed: {},
  watch: {
    courseInfoVo () {
      if (this.courseInfoVo != null) {
        this.whatDay = DXnum(parseInt(this.courseInfoVo.whatDay))
      }
    }
  }
}

</script>
<style lang='stylus' rel='stylesheet/stylus'>
.classes-info-container {
  padding-left: 0.14rem;
  padding-right: 0.14rem;
  width: calc(100% - 0.28rem);
  background-color: $content-background-color;

  .classes-info-header {
    width: 100%;
    height: 0.55rem;
    display: flex;
    align-items: center; /* 垂直居中 */
    border-1px($color-s3);

    // justify-content: center; /* 水平居中 */
    >p {
      font-size: 0.16rem;
      font-weight: bold;
    }
  }

  .classes-infos {
    width: 100%;
    border-1px($color-s3);

    >ul {
      padding-top: 0.13rem;
      padding-bottom: 0.05rem;

      >li {
        margin-bottom: 0.08rem;

        >p {
          font-size: 0.14rem;
          font-weight: bold;

          >span {
            font-weight: Medium !important;
          }
        }
      }
    }
  }

  >ul {
  }
}
</style>
