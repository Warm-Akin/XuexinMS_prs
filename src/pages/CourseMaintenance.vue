<template>
  <div>
    <InfoMenu></InfoMenu>
    <el-row class="text-align-left">
      <el-col :span="24">
        <el-col :xl="22" :lg="22" :offset="1" class="page-title">开课课程信息管理</el-col>
        <el-col :span="4" class="margin-top search-form">
          <el-form label-width="70px" label-position="left" :model="searchCourse" ref="searchForm">
            <el-form-item label="课程代码">
              <el-input v-model="searchCourse.courseCode"></el-input>
            </el-form-item>
            <el-form-item label="课程名称">
              <el-input v-model="searchCourse.courseName">'</el-input>
            </el-form-item>
            <el-form-item label="教师工号">
              <el-input v-model="searchCourse.teacherNo"></el-input>
            </el-form-item>
            <el-form-item label="教师姓名">
              <el-input v-model="searchCourse.teacherName"></el-input>
            </el-form-item>
            <el-form-item label="学年">
              <el-select v-model="searchCourse.academicYear" filterable placeholder="请选择">
                <el-option v-for="item in academicYearOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学期">
              <el-radio-group v-model="searchCourse.term" size="small">
                <el-radio label="1" class="radio-margin">1</el-radio>
                <el-radio label="2" class="radio-margin">2</el-radio>
                <el-radio label="" class="radio-margin">不限</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="课程性质">
              <el-select v-model="searchCourse.courseType" filterable placeholder="请选择">
                <el-option v-for="item in courseTypeOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学分">
              <el-select v-model="searchCourse.credit" filterable placeholder="请选择">
                <el-option v-for="item in creditOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button type="primary" icon="el-icon-search" class="search-btn" @click="queryCourse">搜索</el-button>
        </el-col>
        <el-col :span="1" class="margin-top">
          <div class="line"></div>
        </el-col>
        <el-col :span='18' class="margin-top table-body">
          <el-button class="el-button--primary" plain round @click="showAddDialog">添加</el-button>
          <el-button class="el-button--primary" plain round @click="showModifyDialog">修改</el-button>
          <el-button class="el-button--primary" plain round @click="uploadDialogVisible = true">上传</el-button>
          <el-button class="el-button--primary" plain round @click="exportTableData">导出</el-button>
          <el-button class="el-button--primary" plain round @click="handleDelete">删除</el-button>
          <el-table class="stakeholder-table" :data="courseList"
                    ref="multipleTable" stripe max-height="515" @row-dblclick="handleRowDBClick"
                    style="width: 120%" highlight-current-row @selection-change="handleSelectionChange"
                    :default-sort="{prop: 'teacherNo', order: 'ascending'}"
                    v-loading="loadingStatus">
            <el-table-column type="selection" width="40" fixed></el-table-column>
            <el-table-column label="课程代码" sortable prop="courseCode" align="center" width="160">
              <template slot-scope="scope">
                <span>{{scope.row.courseCode}}</span>
              </template>
            </el-table-column>
            <el-table-column label="课程名称" sortable prop="courseName" align="center" width="160">
              <template slot-scope="scope">
                <span>{{scope.row.courseName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="学年" sortable prop="academicYear" align="center" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.academicYear}}</span>
              </template>
            </el-table-column>
            <el-table-column label="学期" align="center" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.term}}</span>
              </template>
            </el-table-column>
            <el-table-column label="总学时" align="center" width="100" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.totalHours}}</span>
              </template>
            </el-table-column>
            <el-table-column label="实验学时" align="center" width="100" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.labHours}}</span>
              </template>
            </el-table-column>
            <el-table-column label="选课课号" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.selectedCourseNo}}</span>
              </template>
            </el-table-column>
            <el-table-column label="限选人数" align="center" width="100" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.limitStudentNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="选课人数" align="center" width="100" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.studentNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="学分" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.credit}}</span>
              </template>
            </el-table-column>
            <el-table-column label="课程性质" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.courseType}}</span>
              </template>
            </el-table-column>
            <el-table-column label="课程归属" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.belongTo}}</span>
              </template>
            </el-table-column>
            <el-table-column label="教师工号" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.teacherNo}}</span>
              </template>
            </el-table-column>
            <el-table-column label="教师姓名" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.teacherName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="教学班组成" align="left" width="300">
              <template slot-scope="scope">
                <span>{{scope.row.classInfo}}</span>
              </template>
            </el-table-column>
            <el-table-column label="备注" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.memo}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="table-nav" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="pageable.currentPage" background
                         :page-sizes="[20,40, 100, 200, 500]" :page-size="pageable.pageSize"
                         layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
          <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px" top="20px" @close='closeDialog'>
            <el-form label-width="90px" label-position="left" :model="updateCourse" class="dialog-form"
                     ref="updateForm" :rules="rules">
              <el-form-item label="课程代码" prop="courseCode">
                <el-input v-model="updateCourse.courseCode" :disabled="courseInfoEditable"></el-input>
              </el-form-item>
              <el-form-item label="课程名称" prop="courseName">
                <el-input v-model="updateCourse.courseName"></el-input>
              </el-form-item>
              <el-form-item label="选课课号" prop="selectedCourseNo">
                <el-input v-model="updateCourse.selectedCourseNo"></el-input>
              </el-form-item>
              <el-form-item label="学年">
                <el-input v-model="updateCourse.academicYear"></el-input>
                <!--todo 学年选择-->
                <!--<el-date-picker v-model="value5" type="year" placeholder="选择学年"></el-date-picker>-->
                <!--<el-date-picker v-model="value5" type="year" placeholder="选择学年"></el-date-picker>-->
              </el-form-item>
              <el-form-item label="学期">
                <el-radio-group v-model="updateCourse.term" prop="term">
                  <el-radio label="1">1</el-radio>
                  <el-radio label="2">2</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="总学时">
                <el-input v-model="updateCourse.totalHours" type="number"></el-input>
              </el-form-item>
              <el-form-item label="实验学时">
                <el-input v-model="updateCourse.labHours" type="number"></el-input>
              </el-form-item>
              <el-form-item label="限选人数">
                <el-input v-model="updateCourse.limitStudentNum" type="number"></el-input>
              </el-form-item>
              <el-form-item label="选课人数">
                <el-input v-model="updateCourse.studentNum" type="number"></el-input>
              </el-form-item>
              <el-form-item label="学分">
                <el-input v-model="updateCourse.credit" type="number"></el-input>
              </el-form-item>
              <el-form-item label="课程类别">
                <el-input v-model="updateCourse.courseType"></el-input>
              </el-form-item>
              <el-form-item label="课程归属">
                <el-input v-model="updateCourse.belongTo"></el-input>
              </el-form-item>
              <el-form-item label="教师工号">
                <el-input v-model="updateCourse.teacherNo"></el-input>
              </el-form-item>
              <el-form-item label="教师姓名">
                <el-input v-model="updateCourse.teacherName"></el-input>
              </el-form-item>
              <el-form-item label="教学班组成">
                <el-input v-model="updateCourse.classInfo" type="textarea" :autosize="{ minRows: 1, maxRows: 3}"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="updateCourse.memo"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="handleCancel">取消</el-button>
              <el-button type="primary" @click="handleSaveCourse">保存</el-button>
            </span>
          </el-dialog>
          <el-dialog title="上传开课课程信息" :visible.sync="uploadDialogVisible" width="30%" center :before-close="handleCloseUpload">
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="courseUploadUrl"
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
              <div slot="tip" class="el-upload__tip">仅支持 Excel 文件</div>
            </el-upload>
          </el-dialog>
        </el-col>
      </el-col>
    </el-row>
    <el-row style="margin-top: 1%;">&nbsp;</el-row>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from '@/components/Footer';
  import InfoMenu from '@/components/InformationMenu';
  import { initCourseInfo, getCourseInfoPage, findCoursesByConditions, saveCourseInfo, removeCourses } from '@/service/course.service'
  import Constant from '@/utils/Constant';
  import Cookies from "js-cookie";

  export default {
    components: {
      Footer, InfoMenu
    },
    data() {
      return {
        pageable: {
          currentPage: 1,
          pageSize: 20
        },
        totalCount: 0,
        loadingStatus: false,
        multipleSelection: [],
        courseList: [],
        courseInfoEditable: true,
        updateCourse: {
          courseCode: '',
          courseName: '',
          academicYear: '',
          term: '',
          totalHours: '',
          labHours: '',
          limitStudentNum: '',
          selectedCourseNo: '',
          studentNum: '',
          credit: '',
          courseType: '',
          belongTo: '',
          teacherNo: '',
          teacherName: '',
          classInfo: '',
          memo: ''
        },
        searchCourse: {
          courseCode: '',
          courseName: '',
          academicYear: '',
          term: '',
          teacherNo: '',
          teacherName: '',
          courseType: '',
          credit: '',
          currentPage: 1,
          pageSize: 20
        },
        dialogTitle: '',
        dialogVisible: false,
        academicYearOptions: [],
        courseTypeOptions: [],
        creditOptions: [],
        // orgNameOptions: [],
        // academicTitleOptions: [],
        politicalOptions: Constant.POLITICALOPTIONS,
        nationOptions: Constant.NATIONOPTIONS,
        rules: {
          courseCode: [
            {required: true, message: '请输入课程代码', trigger: ['blur', 'change']}
          ],
          courseName: [
            {required: true, message: '请输入课程名称', trigger: ['blur', 'change']}
          ],
          selectedCourseNo: [
            {required: true, message: '请输入选课课号', trigger: ['blur', 'change']}
          ]
        },
        courseUploadUrl: Constant.COURSE_UPLOAD_URL,
        fileList: [],
        uploadDialogVisible: false,
        jwtToken: Cookies.get('JWT-TOKEN')
      };
    },
    methods: {
      async callCourseList(pageable) {
        this.$loading({fullscreen: true});
        let courseInfo = await getCourseInfoPage(pageable);
        this.courseList = courseInfo.data.pageResultList;
        // format data
        this.totalCount = courseInfo.data.total;
        this.$loading({fullscreen: true}).close();
      },
      handleSaveCourse() {
        this.$refs.updateForm.validate((valid) => {
          if (!valid) {
            return false;
          } else {
            this.saveCourse();
          }
        });
      },
      async saveCourse() {
        this.$loading({fullscreen: true});
        let responseData = await saveCourseInfo(this.updateCourse);
        if (responseData.code === Constant.POPUP_EXCEPTION_CODE && responseData.msg !== '') {
          this.$alert(responseData.msg, {
            confirmButtonText: 'OK'
          });
        } else {
          this.$message.success('数据保存成功！');
          this.dialogVisible = false;
          this.updateCourse = {};
          // refresh data from DB
          this.pageable = {
            currentPage: 1,
            pageSize: 20
          };
          this.callCourseList(this.pageable);
          this.init();
        }
        this.$loading({fullscreen: true}).close();
      },
      handleCancel() {
        this.dialogVisible = false;
        this.$refs.updateForm.resetFields();
      },
      showAddDialog() {
        this.dialogTitle = '添加';
        this.dialogVisible = true;
        this.courseInfoEditable = false;
      },
      closeDialog() {
        this.dialogVisible = false;
        this.$refs.updateForm.resetFields();
        this.updateCourse = {};
      },
      showModifyDialog() {
        if (this.multipleSelection.length === 1) {
          this.dialogTitle = '修改';
          this.courseInfoEditable = true;
          // deep clone
          this.updateCourse = JSON.parse(JSON.stringify(this.multipleSelection[0]));
          this.dialogVisible = true;
        } else {
          this.$message.warning('请选择一条要修改的记录');
        }
      },
      async exportTableData() {
        if (this.multipleSelection.length > 0) {
          this.$confirm('是否导出当前所选的记录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.doExport(this.multipleSelection);
          }).catch(() => {
            return;
          });
        } else {
          // get all data
          this.$loading({fullscreen: true});
          let response = await initCourseInfo();
          // deep clone
          let teacherList = JSON.parse(JSON.stringify(response.data));
          this.doExport(teacherList);
          this.$loading({fullscreen: true}).close();
        }
      },
      doExport(courseList) {
        require.ensure([], () => {
          const {exportJsonToExcel} = require('@/utils/Export2Excel');
          let tHeader = ['课程代码', ' 课程名称', '学年', '学期', '总学时', '实验学时', '限选人数', '选课人数', '学分', '课程性质',
            '课程归属', '教师工号', '教师姓名', '教学班组成', '备注'];
          let filterVal = ['courseCode', 'courseName', 'academicYear', 'term', 'totalHours', 'labHours', 'limitStudentNum', 'studentNum', 'credit', 'courseType',
            'belongTo', 'teacherNo', 'teacherName', 'classInfo', 'memo'];
          // deep clone
          let exportTeacherList = courseList;
          let data = this.formatJson(filterVal, exportTeacherList);
          exportJsonToExcel(tHeader, data, '开课课程信息表');
        });
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      },
      handleSizeChange(val) {
        this.searchCourse.pageSize = val;
        this.queryCourse();
      },
      handleCurrentChange(val) {
        this.searchCourse.currentPage = val;
        this.queryCourse();
      },
      handleSelectionChange(value) {
        this.multipleSelection = value;
      },
      handleRowDBClick(row, event) {
        this.dialogTitle = '修改';
        this.courseInfoEditable = true;
        this.updateCourse = JSON.parse(JSON.stringify(row));
        this.dialogVisible = true;
      },
      // for upload
      handleCloseUpload(done) {
        this.$refs.upload.clearFiles();
        done();
      },
      validateFileType(file) {
        const extension = file.name.split('.')[1] === 'xls';
        const extension2 = file.name.split('.')[1] === 'xlsx';
        if (!extension && !extension2) {
          this.$message.error('仅支持Excel文件');
          return false;
        }
        return true;
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
        this.$message.warning('仅支持上传一份Excel文件');
      },
      handleOnProgress(event, file, fileList) {
        this.$loading({fullscreen: true});
      },
      handleSuccess(response, file, fileList) {
        if (response.code === Constant.POPUP_EXCEPTION_CODE && response.msg !== '') {
          this.$alert(response.msg, {
            confirmButtonText: 'OK'
          });
        } else {
          this.$alert('上传成功', {
            confirmButtonText: 'OK'
          }).then(value => {
            // recall getAll data
            this.pageable = {
              currentPage: 1,
              pageSize: 20
            };
            this.callCourseList(this.pageable);
            this.init();
          });
        }
        this.$refs.upload.clearFiles();
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
      async queryCourse() {
        this.loadingStatus = true;
        let courseListData = await findCoursesByConditions(this.searchCourse);
        this.courseList = courseListData.data.pageResultList;
        this.totalCount = courseListData.data.total;
        this.loadingStatus = false;
      },
      async init() {
        this.academicYearOptions = [];
        this.courseTypeOptions = [];
        this.creditOptions = [];
        let courseData = await initCourseInfo();
        let courseList = courseData.data;
        let academicYearSet = new Set();
        let courseTypeSet = new Set();
        let creditSet = new Set();
        courseList.forEach(course => {
          academicYearSet.add(course.academicYear);
          courseTypeSet.add(course.courseType);
          creditSet.add(course.credit);
        });
        academicYearSet.forEach(academicYear => {
          let academicYearObj = {name: academicYear};
          this.academicYearOptions.push(academicYearObj);
        });
        courseTypeSet.forEach(courseType => {
          let courseTypeObj = {name: courseType};
          this.courseTypeOptions.push(courseTypeObj);
        });
        creditSet.forEach(credit => {
          let creditObj = {name: credit};
          this.creditOptions.push(creditObj);
        });
        // todo sort
        this.creditOptions.sort(this.sortArray);
        // console.log(this.creditOptions)
      },
      sortArray(a, b){
        return b - a;
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
        let response = await removeCourses(this.multipleSelection);
        if (response.code === Constant.POPUP_EXCEPTION_CODE && response.msg !== '') {
          this.$alert(response.msg, {
            confirmButtonText: 'OK'
          });
        } else {
          this.$message.success('删除成功');
          this.callCourseList(this.pageable);
        }
      }
    },
    created() {
      this.$store.dispatch('commitInformationMenuIndex', 'courseMaintenance');
    },
    mounted() {
      document.title = "开课课程信息管理";
      this.init();
      this.callCourseList(this.pageable);
    }
  }
</script>

<style scoped>
  .text-align-left {
    text-align: left;
  }

  .page-title {
    font-size: 20px;
  }

  .margin-top {
    margin-top: 20px;
  }

  .search-form {
    bottom: 40px;
  }

  .table-nav {
    /*position: fixed;*/
    /*bottom: 40px;*/
  }

  .line {
    width: 1px;
    height: 580px;
    background-color: #e6e6e6;
    margin-left: 20px;
  }

  .radio-margin {
    width: 28px;
  }

  .search-btn {
    text-align: center;
    width: 100%;
  }

  @media screen and (max-width: 970px) {
    .search-form {
      display: none;
    }

    .line {
      display: none;
    }

    .table-body {
      width: 100%;
    }
  }

  >>> .el-input.is-disabled .el-input__inner {
    background-color: #FFFFFF;
    border-color: #66b1ff;
    color: #c0c4cc;
  }

  >>>.el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 40px;
    line-height: 40px;
    /*border-bottom: 2px solid transparent;*/
    color: #909399;
  }
</style>
