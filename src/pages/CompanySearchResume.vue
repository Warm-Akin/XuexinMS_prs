<template>
  <el-row class="main-content">
    <CompanyMenu></CompanyMenu>
    <el-row>
      <el-col :span="1">
        <div class="line"></div>
      </el-col>
      <el-col :span="23" class="data-content">
        <el-row class="content-title"><i class="el-icon-document"></i> 学生简历列表</el-row>
        <el-row>
          <el-table stripe style="width: 90%" :data="resumeList" ref="multipleTable" max-height="530">
            <el-table-column type="selection" width="40" fixed></el-table-column>
            <el-table-column label="姓名" prop="studentName" align="center" width="200">
              <template slot-scope="scope">
                <span @click="previewResumeDetail(scope.row)"><a href="javascript:void(0)">{{scope.row.studentName}}</a></span>
              </template>
            </el-table-column>
            <el-table-column label="求职意向" prop="jobWant" align="center" width="400">
              <template slot-scope="scope">
                <span>{{scope.row.jobWant}}</span>
              </template>
            </el-table-column>
            <el-table-column label="毕业院校" prop="schoolName" align="center" width="250">
              <template slot-scope="scope">
                <span>{{scope.row.schoolName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="专业" prop="major" align="center" width="250">
              <template slot-scope="scope">
                <span>{{scope.row.major}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="table-nav" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="pageable.currentPage" background
                         :page-sizes="[20,40, 100, 200, 500]" :page-size="pageable.pageSize"
                         layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
          <el-dialog title="简历预览" :visible.sync="previewDialogVisible" :before-close="handleClosePreview" width="48%"
                     center :modal-append-to-body="false" style="margin-top: -5%;">
            <el-row>
              <el-button type="primary" size="small" @click="downloadStudentResume(studentResumeUrl)">下载</el-button>
            </el-row>
            <el-row>
              <img :src="previewImageUrl" width="100%">
            </el-row>
          </el-dialog>
        </el-row>
      </el-col>
    </el-row>
    <Footer></Footer>
  </el-row>
</template>

<script>
  import Footer from '@/components/Footer';
  import CompanyMenu from '@/components/CompanyMenu';
  import {getResumeInfo} from '@/service/studentResume.service';
  import Constant from '@/utils/Constant';
  import axios from 'axios';

  export default {
    components: {
      Footer, CompanyMenu
    },
    data() {
      return {
        userName: sessionStorage.getItem('user'),
        resumeList: [],
        totalCount: 0,
        pageable: {
          currentPage: 1,
          pageSize: 20
        },
        previewDialogVisible: false,
        previewImageUrl: '',
        studentResumeUrl: '',
        exportTemplateName: ''
      }
    },
    methods: {
      async initResume(pageable) {
        this.$loading({fullscreen: true});
        let response = await getResumeInfo(pageable);
        this.resumeList = response.data.pageResultList;
        this.totalCount = response.data.total;
        this.$loading({fullscreen: true}).close();
      },
      handleSizeChange(val) {
        this.pageable.pageSize = val;
        this.initResume(this.pageable);
      },
      handleCurrentChange(val) {
        this.pageable.currentPage = val;
        this.initResume(this.pageable);
      },
      handleClosePreview() {
        this.previewDialogVisible = false;
        this.previewImageUrl = '';
        this.studentResumeUrl = '';
        this.exportTemplateName = '';
      },
      previewResumeDetail(studentResumeObj) {
        this.previewDialogVisible = true;
        this.previewImageUrl = studentResumeObj.resumeImageUrl;
        this.studentResumeUrl = studentResumeObj.resumeUrl;
        this.exportTemplateName = studentResumeObj.studentNo + "_" + studentResumeObj.studentName + ".pdf";
      },
      async downloadStudentResume(resumeUrl) {
        axios.get(`/xuexin/security/company/resume/studentResumeExport?resumeUrl=` + resumeUrl + `&&soleCode=` + this.userName, {
          responseType: `blob`
        }).then(response => {
          if (response.status === 200 && response.data.size !== 0 && response.data.type === 'multipart/form-data') { // request success
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
            // close the dialog
            this.previewDialogVisible = false;
            this.previewImageUrl = '';
            this.studentResumeUrl = '';
            this.exportTemplateName = '';
            this.$loading({fullscreen: true}).close();
            this.$alert('当前账号没有下载权限，请前往会员缴费页面成为会员后重试', {
              confirmButtonText: 'OK'
            });
          }
        });
      }
    },
    created() {
      this.$store.dispatch('commitCompanyMenuIndex', 'searchResume');
    },
    mounted() {
      document.title = '学生简历';
      this.initResume(this.pageable);
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
    overflow-y: auto;
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
    font-weight: bold;
    line-height: 40px;
    margin-bottom: 5px;
  }

  .data-content {
    margin-top: 1%;
  }
</style>
