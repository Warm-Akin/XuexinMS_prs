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
            <!--<el-row>-->
            <!--<el-upload-->
            <!--class="avatar-uploader"-->
            <!--:action="uploadPhotoUrl"-->
            <!--:show-file-list="false"-->
            <!--:on-success="handleAvatarSuccess"-->
            <!--:before-upload="beforeAvatarUpload">-->
            <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
            <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
            <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>-->
            <!--</el-upload>-->
            <!--</el-row>-->
            <el-row>
              <el-button type="primary" @click="changeClick">选择图片</el-button>
              <input type="file" id="true-button" accept="image/png, image/jpeg, image/jpg"
                     @change="uploadImg($event,1)"/>
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
        // imageUrl: '',
        // todo
        // headImg: '',
        //剪切图片上传
        // crap: false,
        previews: {},
        imageOption: {
          img: '',
          outputSize: 1, // 剪切后的图片质量（0.1-1）
          full: true, // 输出原图比例截图 props名full
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
        imageUrl: ''
        // imgFile: '',
        // uploadImgRealPath: '' //上传后的图片的地址（不带服务器域名）
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
          console.log('URL => ', this.imageUrl);
          this.$message.success('图片上传成功');
        }
      },
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
        this.initPhoto(photoPath);
        // let blobObj = this.convertBase64UrlToBlob(this.studentResume.photoPath);
        // this.imageUrl = URL.createObjectURL(blobObj);
        // this.imageUrl = this.studentResume.photoPath;
        // console.log('URL  ', this.imageUrl);
      },
      initPhoto(photoPath) {
        let image = new Image();
        image.crossOrigin = '';
        image.src = photoPath;
        let imageBase64 = this.getBase64Image(image);
        console.log('base64==>', imageBase64);
        let blobObj = this.convertBase64UrlToBlob(imageBase64);
        this.imageUrl = URL.createObjectURL(blobObj);
        // this.imageUrl = this.studentResume.photoPath;
        console.log('URL  ', this.imageUrl);
      },
      convertBase64UrlToBlob(urlData) {
        var bytes = window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
        //处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], {type: 'image/jpeg'});
      },
      getBase64Image(img) {
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        let ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
        let dataURL = canvas.toDataURL("image/"+ext);
        return dataURL;
      },
      // todo add
      uploadImg(e, num) {
        // e => changeEvent, num => image's count
        console.log('uploadImg');
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
            // 把Array Buffer转化为blob 如果是base64不需要
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
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file);
      },
      // 实时预览函数
      realTime(data) {
        console.log('preview');
        console.log(data)
        this.previews = data
      },
      imgLoad(msg) {
        // 图片加载的回调 imgLoad ,返回结果 success / error
        console.log(msg)
      },
      //上传图片（点击上传按钮）
      uploadImage() {
        console.log('uploadImage')
        let formData = new FormData();
        this.$refs.cropper.getCropBlob((data) => {
          // let img = window.URL.createObjectURL(data);
          // this.model = true;
          // this.modelSrc = img;
          // 最后一个参数this.fileName给Blob对象取名
          formData.append("file", data, this.fileName);
          axios.post(this.uploadPhotoUrl, formData, {
            contentType: false,
            processData: false,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).then((response) => {
            console.log('upload===')
            console.log(response);
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
      document.title = '步骤二';
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
