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
        <el-row style="margin-bottom: 1%;">
          <el-button class="el-button--primary" plain round @click="uploadDialogVisible = true">添加模板</el-button>
          <el-button class="el-button--primary" plain round @click="handleDelete">删除模板</el-button>
        </el-row>
        <!--template list-->
        <el-row>
          <el-col :span="4" class="template-image" v-for="item in pdfTemplateList" :key="item.templateId">
            <el-row>
              <img :src="item.imageUrl" class="image-avatar" @click="previewTemplate(item.imageUrl)">
            </el-row>
            <el-row>
              <el-checkbox :v-model="item.templateId" :true-label="item.templateId" :false-label='"-" + item.templateId' @change="changeSelected">{{item.templateName.length < 20 ? item.templateName: item.templateName.substring(0, 20) + '...'}}</el-checkbox>
            </el-row>
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
        <el-row>
          <el-dialog title="简历模板预览" :visible.sync="previewDialogVisible" :before-close="handleClosePreview" width="48%" center :modal-append-to-body="false" style="margin-top: -5%;">
            <img :src="previewImageUrl" width="100%">
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
  import { deletePdfTemplates } from '@/service/resumeTemplate.service';

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
        pdfTemplateList: [],
        pdfTemplateIdList: [],
        previewDialogVisible: false,
        previewImageUrl: ''
      }
    },
    methods: {
      initTemplateImageList() {
        axios.get(`/xuexin/security/admin/resumeTemplate/findAllActive`).then(response => {
          this.pdfTemplateList = response.data.data;
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
            // recall getAllTemplate data
            this.initTemplateImageList();
          });
        }
        this.$refs.upload.clearFiles();
      },
      changeSelected(value) {
        if (value.indexOf('-') < 0) { // = -1
          // selected
          this.pdfTemplateIdList.push(value);
        } else { // = 0
          // unselected
          // 删除被取消选中的元素 => item.indexOf(value.substring(1)) < 0 表示返回数组中不与取消选中的元素相匹配的元素
          this.pdfTemplateIdList = this.pdfTemplateIdList.filter( item => {
            return item.indexOf(value.substring(1)) < 0;
          });
        }
      },
      handleDelete() {
        // delete template
        if (this.pdfTemplateIdList.length === 0) {
          this.$message.error('请选择要删除的模板')
        } else {
          this.$confirm('当前已选择<span style="color: tomato">' + this.pdfTemplateIdList.length + '</span>项 , 是否继续?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            dangerouslyUseHTMLString: true
          }).then(() => {
            // call delete
            this.callDeleteTemplate();
          }).catch(() => {
            return;
          });
        }
      },
      async callDeleteTemplate() {
        let response = await deletePdfTemplates(this.pdfTemplateIdList);
        if (response.code === Constant.POPUP_EXCEPTION_CODE && response.msg !== '') {
          this.$alert(response.msg, {
            confirmButtonText: 'OK'
          });
        } else {
          this.initTemplateImageList();
          this.$message.success('删除成功');
          this.pdfTemplateIdList = [];
        }
      },
      previewTemplate(value) {
        this.previewDialogVisible = true;
        this.previewImageUrl = value;
      },
      handleClosePreview() {
        this.previewDialogVisible = false;
        this.previewImageUrl = '';
      }
    },
    created() {
      this.$store.dispatch('commitAdminMenuIndex', 'resumePdfMaintenance');
    },
    mounted() {
      document.title = '简历模板维护';
      this.initTemplateImageList();
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
    width: 90%;
    /*width: 170px;*/
    /*height: 240px;*/
    display: block;
    margin-bottom: 8px;
    margin-left: 7px;
    text-align: center;
  }

  .template-image {
    margin-right: 3%;
    margin-bottom: 1%;
    text-align: center;
  }

</style>
