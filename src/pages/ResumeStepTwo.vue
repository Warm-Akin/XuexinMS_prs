<template>
  <div class="main-content" id="main-content">
    <div class="content-body">
      <el-row>
        <el-col :span="24">
          <el-col :span="3">
            <Menu></Menu>
          </el-col>
          <el-col :span="1">
            <div class="line"></div>
          </el-col>
          <el-col :span="20">
            <el-row class="content-title">上传简历照片</el-row>
            <el-row>&nbsp;</el-row>
            <el-row>
              <el-upload
                class="avatar-uploader"
                :action="uploadPhotoUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>
              </el-upload>
            </el-row>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from '@/components/Footer.vue';
  import Menu from '@/components/ResumeMenu.vue';
  import Constant from '@/utils/Constant';

  export default {
    components: {
      Footer, Menu
    },
    data() {
      return {
        userName: '',
        absoluteDisable: true,
        studentResume: {
          jobWant: '',
          studentName: '',
          orgName: '',
          schoolName: '北京理工大学珠海学院',
          major: '',
          majorInfo: '',
          englishLevel: '',
          softwareSkills: '',
          mobileNo: '',
          email: '',
          skillOne: '',
          oneInfo: '',
          skillTwo: '',
          twoInfo: '',
          skillThree: '',
          threeInfo: ''
        },
        uploadPhotoUrl: '',
        imageUrl: ''
      }
    },
    methods: {
      handleAvatarSuccess(response, file) {
        if (response.code === Constant.POPUP_EXCEPTION_CODE && response.msg !== '') {
          this.$alert(response.msg, {
            confirmButtonText: 'OK'
          });
        } else {
          this.imageUrl = URL.createObjectURL(file.raw);
          this.$message.success('图片上传成功');
        }
      },
      beforeAvatarUpload(file) {
        const isCorrectType = ( file.type === 'image/png' || file.type === 'image/jpeg');
        const isLt5M = file.size / (1024 * 1024 * 1024 * 1024 * 1024 ) < 5;
        if (!isCorrectType) {
          this.$message.error('上传头像图片仅支持 JPG/PNG 格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isCorrectType && isLt5M;
      }
    },
    created() {
      this.$store.dispatch('commitMenuIndex', 'resumeStepTwo');
      this.userName = sessionStorage.getItem('user');
      this.uploadPhotoUrl = Constant.PHOTO_UPLOAD_URL + `/${this.userName}`;
    },
    mounted() {
      document.title = '步骤二';
    }
  }
</script>

<style scoped>

  .main-content {
    position: fixed;
    top: 0;
    left: 200px;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding: 0;
    clear: both;
  }

  .content-body {
    position: relative;
    width: 100%;
  }

  .line {
    position: relative;
    width: 1px;
    height: 700px;
    background-color: #e6e6e6;
    margin-left: 5px;
    margin-top: 10px;
  }

  .content-title {
    margin-top: 20px;
  }

  >>>.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  >>>.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  >>>.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 140px;
    height: 160px;
    line-height: 178px;
    text-align: center;
  }

  >>>.avatar {
    width: 140px;
    height: 160px;
    display: block;
  }

</style>
