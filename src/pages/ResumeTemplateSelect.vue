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
            <el-row class="content-title">导出简历</el-row>
            <el-row style="margin-top: 20px; margin-bottom: 1%;">
              <el-button type="primary" icon="el-icon-download" @click="downloadResume">生成简历</el-button>
            </el-row>
            <el-row>
              <el-col :span="4" class="template-image" v-for="item in pdfTemplateList" :key="item.templateId">
                <el-row>
                  <img :src="item.imageUrl" class="image-avatar" @click="previewTemplate(item.imageUrl)">
                </el-row>
                <el-row>
                  <el-checkbox :v-model="item.templateId" :true-label="item.templateId"
                               :false-label='"-" + item.templateId' @change="changeSelected">{{item.templateName.length < 20 ? item.templateName: item.templateName.substring(0, 20) + '...'}}
                  </el-checkbox>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-dialog title="简历模板预览" :visible.sync="previewDialogVisible" width="48%"
                         :before-close="handleClosePreview" center :modal-append-to-body="false"
                         style="margin-top: -5%;">
                <img :src="previewImageUrl" width="100%">
              </el-dialog>
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
  import {downloadResumePdf} from '@/service/studentResume.service';
  import axios from 'axios';

  export default {
    components: {
      Footer, Menu
    },
    data() {
      return {
        userName: '',
        pdfTemplateList: [],
        pdfTemplateIdList: [],
        previewDialogVisible: false,
        previewImageUrl: '',
        exportTemplateName: '',
        resumeTemplateId: ''
      }
    },
    methods: {
      downloadResume() {
        if (this.pdfTemplateIdList.length !== 1) {
          this.$message.error('请选择一个模板导出');
          return;
        } else {
          let templateInfo = this.pdfTemplateList.filter(item => {
            return item.templateId.indexOf(this.pdfTemplateIdList[0]) === 0;
          });
          this.exportTemplateName = this.userName + '_' + templateInfo[0].templateName;
          this.resumeTemplateId = templateInfo[0].templateId;
          this.callExportResumePdf();
        }
      },
      async callExportResumePdf() {
        // let response = await downloadResumePdf(this.userName);
        axios.get(`/xuexin/security/student/resume/export?studentNo=` + this.userName + `&&resumeTemplateId=` + this.resumeTemplateId, {
          responseType: `blob`
        }).then(response => {
          // console.log(response);
          if (response.status === 200 && response.data.size !== 0) { // request success
            let blob = new Blob([response.data], { // use Blob to handle response
              type: 'application/pdf'
            });
            let objectUrl = URL.createObjectURL(blob); // create a url object
            let link = document.createElement('a'); // create an a tag: <a></a>
            link.href = objectUrl; // set href
            let fileName = this.exportTemplateName; // download file's name
            link.setAttribute('download', fileName); // set link attribute
            document.body.appendChild(link); // put the link on the end of the body
            link.click();
            this.$loading({fullscreen: true}).close();
          } else {
            this.$message.error('导出失败，请重试');
            this.$loading({fullscreen: true}).close();
          }
        });
      },
      previewTemplate(value) {
        this.previewDialogVisible = true;
        this.previewImageUrl = value;
      },
      handleClosePreview() {
        this.previewDialogVisible = false;
        this.previewImageUrl = '';
      },
      initTemplateImageList() {
        axios.get(`/xuexin/security/student/resume/findAllActiveTemplate`).then(response => {
          this.pdfTemplateList = response.data.data;
        });
      },
      changeSelected(value) {
        // console.log(value)
        if (value.indexOf('-') < 0) { // = -1
          // selected
          this.pdfTemplateIdList.push(value);
        } else { // = 0
          // unselected
          // 删除被取消选中的元素 => item.indexOf(value.substring(1)) < 0 表示返回数组中不与取消选中的元素相匹配的元素
          this.pdfTemplateIdList = this.pdfTemplateIdList.filter(item => {
            return item.indexOf(value.substring(1)) < 0;
          });
        }
      }
    },
    created() {
      this.$store.dispatch('commitMenuIndex', 'resumeTemplateSelect');
      this.userName = sessionStorage.getItem('user');
    },
    mounted() {
      document.title = '选择模板生成简历';
      this.initTemplateImageList();
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

  > > > .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  > > > .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  > > > .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 140px;
    height: 160px;
    line-height: 178px;
    text-align: center;
  }

  > > > .avatar {
    width: 140px;
    height: 160px;
    display: block;
  }

  .image-avatar {
    position: relative;
    width: 90%;
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
