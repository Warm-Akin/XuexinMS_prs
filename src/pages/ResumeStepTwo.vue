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
              <input type="file" id="true-button" accept="image/png, image/jpeg, image/jpg" @change="uploadImg($event,1)" />
            </el-row>
            <el-row class="cropper-content">
              <!--<div class="cropper-content" style="margin-top:-60px;margin-left:260px;">-->
                <div class="cropper">
                  <vueCropper
                    ref="cropper"
                    :img="option.img"
                    :outputSize="option.size"
                    :outputType="option.outputType"
                    :info="true"
                    :full="option.full"
                    :canMove="option.canMove"
                    :canMoveBox="option.canMoveBox"
                    :original="option.original"
                    :autoCrop="option.autoCrop"
                    :autoCropWidth="option.autoCropWidth"
                    :autoCropHeight="option.autoCropHeight"
                    :fixedBox="option.fixedBox"
                    @realTime="realTime"
                    @imgLoad="imgLoad"></vueCropper>
                </div>
                <div style="margin-left: 22%;">
                  <div class="show-preview"
                       :style="{'width': '150px', 'height':'155px',  'overflow': 'hidden', 'margin': '5px'}">
                    <div :style="previews.div" class="preview">
                      <img :src="previews.url" :style="previews.img">
                    </div>
                  </div>
                </div>
              <!--</div>-->
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
        imageUrl: '',
        // todo
        headImg: '',
        //剪切图片上传
        crap: false,
        previews: {},
        option: {
          img: '',
          outputSize: 1, //剪切后的图片质量（0.1-1）
          full: false, //输出原图比例截图 props名full
          outputType: 'png',
          canMove: true,
          original: false,
          canMoveBox: true,
          autoCrop: true,
          autoCropWidth: 150,
          autoCropHeight: 150,
          fixedBox: false // 固定截图框大小
        },
        fileName: '',  //本机文件地址
        downImg: '#',
        imgFile: '',
        uploadImgRealPath: '' //上传后的图片的地址（不带服务器域名）
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
        const isCorrectType = ( file.type === 'image/png' || file.type === 'image/jpeg');
        const isLt5M = file.size / (1024 * 1024 * 1024 * 1024 * 1024 ) < 5;
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
        let blobObj = this.convertBase64UrlToBlob(this.studentResume.photoPath);
        this.imageUrl = URL.createObjectURL(blobObj);
        // this.imageUrl = this.studentResume.photoPath;
        console.log('URL  ', this.imageUrl);
      },
      convertBase64UrlToBlob(urlData){
        var bytes = window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
        //处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i);
        }
        return new Blob( [ab] , {type : 'image/jpeg'});
      },
      // todo add
      uploadImg(e, num) {
        console.log('uploadImg');
        var _this = this;
        //上传图片
        var file = e.target.files[0]
        this.beforeAvatarUpload(file);
        // _this.fileName = file.name;
        // if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        //   alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        //   return false
        // }
        var reader = new FileReader();
        reader.onload = (e) => {
          let data;
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          }
          else {
            data = e.target.result
          }
          if (num === 1) {
            _this.option.img = data
          } else if (num === 2) {
            _this.example2.img = data
          }
        }
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
        console.log('imgLoad')
        console.log(msg)
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

      // this.init();
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
