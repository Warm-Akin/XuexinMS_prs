<template>
  <el-row class="main-content">
    <el-row>
      <el-col :span="3">
        <AdminMenu></AdminMenu>
      </el-col>
      <el-col :span="1">
        <div class="line"></div>
      </el-col>
      <el-col :span="20">
        <el-row class="content-title"><i class="el-icon-news"></i>  简历模板维护</el-row>
        <el-row>
          <el-button class="el-button--primary" plain round @click="uploadDialogVisible = true">上传</el-button>
        </el-row>
        <!--template list-->
        <el-row>
          <el-col :span="4">
            <!--<img v-if="imageUrl" :src="imageUrl" class="image-avatar">-->
            <img src=" http://pqcwuate5.bkt.clouddn.com/pdfModel_test-2.png" class="image-avatar">
          </el-col>
        </el-row>
        <el-row>
          <el-dialog title="上传简历模板" :visible.sync="uploadDialogVisible" width="30%" center :before-close="handleCloseUpload" :modal-append-to-body="false">
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="pdfUploadUrl"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :on-success="handleSuccess"
              :on-progress="handleOnProgress"
              :file-list="fileList"
              :limit="1"
              :on-exceed="handleExceed"
              :auto-upload="false"
              :headers="{'Authentication-Token': jwtToken}">
              <el-button type="primary" slot="trigger" size="small" plain>选择文件</el-button>
              <el-button type="primary" style="margin-left: 10px;width: 80px;" size="small" @click="submitUpload" plain>上传</el-button>
              <div slot="tip" class="el-upload__tip">仅支持 PDF 文件</div>
            </el-upload>
          </el-dialog>
        </el-row>
      </el-col>
    </el-row>
    <Footer></Footer>
  </el-row>
</template>

<script>
  import Footer from '@/components/Footer';
  import AdminMenu from '@/components/AdminMenu';
  import Constant from '@/utils/Constant';
  import Cookies from "js-cookie";
  import axios from 'axios';

  export default {
    components: {
      Footer, AdminMenu
    },
    data() {
      return {
        pdfUploadUrl: Constant.PDF_UPLOAD_URL,
        fileList: [],
        uploadDialogVisible: false,
        jwtToken: Cookies.get('JWT-TOKEN'),
        imageUrl: ''
      }
    },
    methods: {
      initTemplateImageList() {
        //
        axios.get(`/xuexin/security/admin/resumeTemplate/findAllActive`, { responseType: 'arraybuffer'}).then(response => {
          let bytes = new Uint8Array(response.data);
          if (bytes.length > 0) {
            let blob = new Blob([bytes], {type: "image/png"});
            let url = URL.createObjectURL(blob);
            this.imageUrl = url;
          }
        });
      },
      handleCloseUpload(done) {
        this.$refs.upload.clearFiles();
        done();
      },
      handleRemove(file, fileList) {
        this.fileList = fileList;
      },
      handlePreview(file) {
        console.log(file);
      },
      handleChange(file, fileList) {
        if (this.validateFileType(file)) {
          this.fileList = fileList;
          this.$loading({fullscreen: true}).close();
        } else {
          this.$refs.upload.clearFiles();
        }
      },
      handleExceed(file, fileList) {
        this.$message.warning('仅支持上传一份PDF文件');
      },
      validateFileType(file) {
        const extension = file.name.split('.')[1] === 'pdf';
        if (!extension) {
          this.$message.error('仅支持PDF文件');
          return false;
        }
        return true;
      },
      async submitUpload() {
        if (this.fileList.length === 0) {
          this.$alert('请选择要上传的文件', {
            confirmButtonText: 'OK'
          });
          return;
        }
        this.$refs.upload.submit();
        this.uploadDialogVisible = false;
        this.$loading({fullscreen: true}).close();
      },
      handleOnProgress(event, file, fileList) {
        this.$loading({fullscreen: true});
      },
      handleSuccess(response, file, fileList) {
        console.log('response', response)
        if (response.code === Constant.POPUP_EXCEPTION_CODE && response.msg !== '') {
          this.$alert(response.msg, {
            confirmButtonText: 'OK'
          });
        } else {
          this.$alert('上传成功', {
            confirmButtonText: 'OK'
          }).then(value => {
            // console.log('response', value)
            // recall getAll data
            // todo
            console.log('success')
          });
        }
        this.$refs.upload.clearFiles();
      }
    },
    created() {
      this.$store.dispatch('commitAdminMenuIndex', 'resumePdfMaintenance');
    },
    mounted() {
      document.title = '简历模板维护';
      // this.initTemplateImageList();
    }
  }
</script>

<style scoped>
  .main-content {
    position: fixed;
    top: 0;
    left: 200px;
    width: 90%;
    height: 100%;
    overflow-y: scroll;
    padding: 0;
    clear: both;
  }

  .line {
    width: 1px;
    height: 700px;
    background-color: #e6e6e6;
    margin-left: 10px;
  }

  .content-title {
    margin-top: 1%;
    font-weight: bold;
    line-height: 40px;
    margin-bottom: 5px;
  }

  .image-avatar {
    position: relative;
    width: 160px;
    height: 220px;
    display: block;
  }

</style>
