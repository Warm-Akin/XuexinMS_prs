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
            <!--<el-table-column label="简历ID" prop="id" align="center" hidden>-->
              <!--<template slot-scope="scope">-->
                <!--<span>{{scope.row.id}}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column label="姓名" prop="studentName" align="center" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.studentName}}</span>
              </template>
            </el-table-column>
            <!--todo 添加性别属性到resume表-->
            <!--<el-table-column label="性别" prop="sex" align="center" width="150">-->
              <!--<template slot-scope="scope">-->
                <!--<span>{{scope.row.sex}}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
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
            <!--<el-table-column label="联系方式" prop="mobileNo" align="center" width="150">-->
              <!--<template slot-scope="scope">-->
                <!--<span>{{scope.row.mobileNo}}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="date" label="日期" width="180">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="name" label="姓名" width="180">-->
            <!--</el-table-column>-->
          </el-table>
          <el-pagination class="table-nav" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="pageable.currentPage" background
                         :page-sizes="[20,40, 100, 200, 500]" :page-size="pageable.pageSize"
                         layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </el-row>
      </el-col>
    </el-row>
    <Footer></Footer>
  </el-row>
</template>

<script>
  import Footer from '@/components/Footer';
  import CompanyMenu from '@/components/CompanyMenu';
  import { getResumeInfo } from '@/service/studentResume.service';

  export default {
    components: {
      Footer, CompanyMenu
    },
    data() {
      return {
        resumeList: [],
        totalCount: 0,
        pageable: {
          currentPage: 1,
          pageSize: 20
        }
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
      }

    },
    created() {
      this.$store.dispatch('commitCompanyMenuIndex', 'showResume');
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
