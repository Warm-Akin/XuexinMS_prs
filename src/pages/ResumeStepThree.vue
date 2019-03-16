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
            <el-row class="content-title">导出为PDF</el-row>
            <el-row style="margin-top: 20px;">
              <el-button type="primary" icon="el-icon-download" @click="downloadResume">导出简历</el-button>
            </el-row>
            <el-row>&nbsp;</el-row>
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
  import { downloadResumePdf } from '@/service/studentResume.service';
  import axios from 'axios';

  export default {
    components: {
      Footer, Menu
    },
    data() {
      return {
        userName: ''
      }
    },
    methods: {
      async downloadResume() {
        // let response = await downloadResumePdf(this.userName);


        axios.get(`/xuexin/student/resume/export?studentNo=` + this.userName, {
          responseType: `blob`
        }).then(response => {
          console.log(response);
          if (response.status === 200 && response.data.size !== 0) { // request success
            let blob = new Blob([response.data], { // use Blob to handle response
              type: 'application/pdf'
            });
            let objectUrl = URL.createObjectURL(blob); // create a url object
            let link = document.createElement('a'); // create an a tag: <a></a>
            link.href = objectUrl; // set href
            let fileName = 'Resume-test'; // download file's name
            link.setAttribute('download', fileName); // set link attribute
            document.body.appendChild(link); // put the link on the end of the body
            link.click();
            this.$loading({fullscreen: true}).close();
          } else {
            this.$message.error('导出失败，请重试');
            this.$loading({fullscreen: true}).close();
          }
        });
        // console.log(response)
      }
    },
    created() {
      this.$store.dispatch('commitMenuIndex', 'resumeStepThree');
      this.userName = sessionStorage.getItem('user');
    },
    mounted() {
      document.title = '选择模板';
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
