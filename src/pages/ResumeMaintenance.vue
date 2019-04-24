<template>
  <el-row class="main-content">
    <AdminMenu></AdminMenu>
    <el-row>
      <el-col :span="1">
        <div class="line"></div>
      </el-col>
      <el-col :span="23" class="data-content">
        <el-row class="content-title"><i class="el-icon-document"></i>简历信息列表</el-row>
        <el-row class="search-bar">
          <el-col :span="17">
            <el-form  label-position="left" :model="searchResume" ref="searchForm">
              <el-row>
                <el-col :span="5">
                  <el-form-item label="学生姓名">
                    <el-input v-model="searchResume.studentName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="5">
                  <el-form-item label="求职意向">
                    <el-input v-model="searchResume.jobWant"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="5">
                  <el-form-item label="学生专业">
                    <el-input v-model="searchResume.major"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="5">
                  <el-form-item label="毕业院校">
                    <el-input v-model="searchResume.schoolName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
          <el-col :span="3">
            <el-row>&nbsp;</el-row>
            <el-row>&nbsp;</el-row>
            <el-button type="primary" size="small" icon="el-icon-search" @click="queryResume">搜索</el-button>
          </el-col>
          <el-col :span="4">
            <el-row>&nbsp;</el-row>
            <el-row>&nbsp;</el-row>
            <el-row>
              <el-button type="primary" size="small" @click="handleDelete">删除</el-button>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-table stripe style="width: 95%" :data="resumeList" ref="multipleTable" max-height="530"
                    highlight-current-row @selection-change="handleSelectionChange" v-loading="loadingStatus">
            <el-table-column type="selection" width="40" fixed></el-table-column>
            <el-table-column label="姓名" prop="studentName" align="center" width="150">
              <template slot-scope="scope">
                <span @click="previewResumeDetail(scope.row)"><a href="javascript:void(0)">{{scope.row.studentName}}</a></span>
              </template>
            </el-table-column>
            <el-table-column label="求职意向" prop="jobWant" align="center" width="400">
              <template slot-scope="scope">
                <span>{{scope.row.jobWant}}</span>
              </template>
            </el-table-column>
            <el-table-column label="专业" prop="major" align="center" width="250">
              <template slot-scope="scope">
                <span>{{scope.row.major}}</span>
              </template>
            </el-table-column>
            <el-table-column label="毕业院校" prop="schoolName" align="center" width="250">
              <template slot-scope="scope">
                <span>{{scope.row.schoolName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="联系方式" prop="mobileNo" align="center" width="150">
            <template slot-scope="scope">
            <span>{{scope.row.mobileNo}}</span>
            </template>
            </el-table-column>
          </el-table>
          <el-pagination class="table-nav" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="pageable.currentPage" background
                         :page-sizes="[20,40, 100, 200, 500]" :page-size="pageable.pageSize"
                         layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
          <el-dialog title="简历预览" :visible.sync="previewDialogVisible" :before-close="handleClosePreview" width="48%" center :modal-append-to-body="false" style="margin-top: -5%;">
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
  import AdminMenu from '@/components/AdminMenu';
  import { getResumeInfoByAdmin, removeResumeRecords, findResumeByConditions } from '@/service/studentResume.service';
  import Constant from '@/utils/Constant';
  import axios from 'axios';

  export default {
    components: {
      Footer, AdminMenu
    },
    data() {
      return {
        loadingStatus: false,
        multipleSelection: [],
        resumeList: [],
        totalCount: 0,
        pageable: {
          currentPage: 1,
          pageSize: 20
        },
        searchResume: {
          studentName: '',
          jobWant: '',
          major: '',
          schoolName: '',
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
        let response = await getResumeInfoByAdmin(pageable);
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
      handleDelete() {
        if (this.multipleSelection.length > 0) {
          this.$confirm('确定删除吗？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(action => {
            this.deleteRecords();
          }).catch(_ => {
            console.log('cancel')
          });
        } else {
          this.$message.warning('请选择要删除的记录');
        }
      },
      async deleteRecords() {
        let response = await removeResumeRecords(this.multipleSelection);
        if (response.code === Constant.POPUP_EXCEPTION_CODE && response.msg !== '') {
          this.$alert(response.msg, {
            confirmButtonText: 'OK'
          });
        } else {
          this.$message.success('删除成功');
          this.initResume(this.pageable);
        }
      },
      handleSelectionChange(value) {
        this.multipleSelection = value;
      },
      async queryResume() {
        this.loadingStatus = true;
        let response = await findResumeByConditions(this.searchResume);
        this.resumeList = response.data.pageResultList;
        this.totalCount = response.data.total;
        this.loadingStatus = false;
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
        axios.get(`/xuexin/security/admin/resume/studentResumeExport?resumeUrl=` + resumeUrl, {
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
      }
    },
    created() {
      this.$store.dispatch('commitAdminMenuIndex', 'resumeMaintenance');
    },
    mounted() {
      document.title = '简历信息管理';
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

  .table-nav {
    margin-bottom: 40px;
  }

  .btn-style {
    background-color: #545c64;
  }

</style>
