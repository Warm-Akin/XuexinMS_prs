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
              <el-button type="primary" @click="changeClick">{{buttonText}}</el-button>
              <input type="file" id="true-button" accept="image/png, image/jpeg, image/jpg" @change="uploadImg($event,1)"/>
            </el-row>
            <el-row class="cropper-content">
              <div class="cropper">
                <vueCropper
                  ref="cropper"
                  :img="imageOption.img"
                  :outputSize="imageOption.size"
                  :outputType="imageOption.outputType"
                  :info="true"
                  :full="imageOption.full"
                  :canMove="imageOption.canMove"
                  :canMoveBox="imageOption.canMoveBox"
                  :original="imageOption.original"
                  :autoCrop="imageOption.autoCrop"
                  :autoCropWidth="imageOption.autoCropWidth"
                  :autoCropHeight="imageOption.autoCropHeight"
                  :fixedBox="imageOption.fixedBox"
                  :headers="{'Authentication-Token': jwtToken}"
                  @realTime="realTime"
                  @imgLoad="imgLoad"></vueCropper>
              </div>
              <div style="margin-left: 22%;">
                <div class="show-preview">
                  <div :style="previews.div" class="preview">
                    <img :src="previews.url" :style="previews.img">
                  </div>
                </div>
              </div>
            </el-row>
            <el-row v-if="imageOption.img !== ''">
              <el-col :span="8" class="upload-button">
                <el-button type="primary" @click="uploadImage">上传</el-button>
              </el-col>
            </el-row>
            <el-row>
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
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
  import { getUserResumeInfo } from '@/service/student.service';
  import axios from 'axios';
  import Cookies from "js-cookie";

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
          schoolName: '',
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
        previews: {},
        imageOption: {
          img: '',
          outputSize: 1, // 剪切后的图片质量（0.1 - 1）
          full: true, // 输出原图比例截图
          outputType: 'png', // 剪切后图片类型
          canMove: true,
          original: false,
          canMoveBox: true,
          autoCrop: true,
          autoCropWidth: 160,
          autoCropHeight: 230,
          fixedBox: true // 固定截图框大小
        },
        fileName: '',
        imageUrl: '',
        buttonText: '选择图片上传',
        jwtToken: Cookies.get('JWT-TOKEN')
      }
    },
    methods: {
      beforeAvatarUpload(file) {
        const isCorrectType = (file.type === 'image/png' || file.type === 'image/jpeg');
        const isLt5M = file.size / (1024 * 1024 * 1024 * 1024 * 1024) < 5;
        if (!isCorrectType) {
          this.$message.error('上传头像图片仅支持 JPG/PNG 格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isCorrectType && isLt5M;
      },
      async init() {
        let response = await getUserResumeInfo(this.userName);
        this.studentResume = response.data;
        let photoPath = this.studentResume.photoPath;
        if (photoPath !== '' && photoPath !== null) {
          this.buttonText = '重新上传照片';
        }
      },
      uploadImg(e, num) {
        // e => changeEvent, num => image's count
        let file = e.target.files[0];
        let validFlag = this.beforeAvatarUpload(file);
        if (!validFlag) {
          this.imageOption.img = '';
          return false;
        }
        this.fileName = file.name;
        let reader = new FileReader();
        reader.onload = (e) => {
          let data;
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64则不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]));
          }
          else {
            data = e.target.result;
          }
          if (num === 1) {
            this.imageOption.img = data;
          } else if (num === 2) {
            this.example2.img = data;
          }
        };
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file);
      },
      // 实时预览函数
      realTime(data) {
        this.previews = data
      },
      imgLoad(msg) {
        // 图片加载的回调 imgLoad ,返回结果 success / error
        console.log(msg)
      },
      //上传图片（点击上传按钮）
      uploadImage() {
        let formData = new FormData();
        this.$refs.cropper.getCropBlob((data) => {
          // 最后一个参数this.fileName给Blob对象取名
          formData.append("file", data, this.fileName);
          axios.post(this.uploadPhotoUrl, formData, {
            contentType: false,
            processData: false,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).then((response) => {
            let res = response.data;
            if ((res.code === Constant.POPUP_EXCEPTION_CODE || res.code === 'ERROR') && res.msg !== '') {
              this.$alert(res.msg, {
                confirmButtonText: 'OK'
              });
            } else {
              this.$message.success('图片上传成功');
            }
          });
        });
      },
      changeClick() {
        document.getElementById('true-button').click();
      }
    },
    created() {
      this.$store.dispatch('commitMenuIndex', 'resumeStepTwo');
      this.userName = sessionStorage.getItem('user');
      this.uploadPhotoUrl = Constant.PHOTO_UPLOAD_URL + `/${this.userName}`;
    },
    mounted() {
      document.title = '上传简历图片';
      this.init();
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

  #file-button {
    width: 50px;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
  }

  #true-button {
    position: relative;
    top: -30px;
    display: none;
  }

  .cropper-content {
    position: relative;
    display: flex;
    display: -webkit-flex;
    /*justify-content: flex-end;*/
    /*-webkit-justify-content: flex-end;*/
  }

  .cropper-content .cropper {
    width: 260px;
    height: 260px;
    position: relative;
    left: 20%;
  }

  .upload-button {
    position: relative;
    display: flex;
    display: -webkit-flex;
    margin-top: 15px;
    margin-left: 100px;
    padding-right: 2%;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
  }

  .show-preview {
    width: 160px;
    height: 235px;
    overflow: hidden;
    margin: 5px;
  }

  >>> .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  >>> .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  >>> .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 140px;
    height: 160px;
    line-height: 178px;
    text-align: center;
  }

  >>> .avatar {
    width: 140px;
    height: 160px;
    display: block;
  }

</style>
