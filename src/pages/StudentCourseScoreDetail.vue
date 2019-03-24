<template>
  <div>
    <InfoMenu></InfoMenu>
    <el-row class="text-align-left">
      <el-col :span="24">
        <el-col :xl="22" :lg="22" :offset="1" class="page-title">学生选课及成绩明细管理</el-col>
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
          <el-table class="stakeholder-table" :data="stuCourseScoreDetailList"
                    ref="multipleTable" stripe max-height="515" @row-dblclick="handleRowDBClick"
                    style="width: 120%" highlight-current-row @selection-change="handleSelectionChange"
                    :default-sort="{prop: 'studentNo', order: 'ascending'}"
                    v-loading="loadingStatus">
            <el-table-column type="selection" width="40" fixed></el-table-column>
            <el-table-column label="学号" sortable prop="studentNo" align="center" width="160">
              <template slot-scope="scope">
                <span>{{scope.row.studentNo}}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" sortable prop="studentName" align="center" width="160">
              <template slot-scope="scope">
                <span>{{scope.row.studentName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="学院" align="center" width="160">
              <template slot-scope="scope">
                <span>{{scope.row.orgName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="班级" sortable prop="className" align="center" width="160">
              <template slot-scope="scope">
                <span>{{scope.row.className }}</span>
              </template>
            </el-table-column>
            <el-table-column label="专业" sortable prop="major" align="center" width="160">
              <template slot-scope="scope">
                <span>{{scope.row.major }}</span>
              </template>
            </el-table-column>
            <el-table-column label="选课课号" sortable prop="selectedCourseNo" align="center" width="160">
              <template slot-scope="scope">
                <span>{{scope.row.selectedCourseNo }}</span>
              </template>
            </el-table-column>
            <el-table-column label="课程代码" align="center" width="160">
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
            <!-- todo checkBox-->
            <el-table-column label="是否补考" align="center" width="120">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.qualificationFlag" disabled></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="平时成绩" align="center" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.usualScore}}</span>
              </template>
            </el-table-column>
            <el-table-column label="期中成绩" align="center" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.middleScore}}</span>
              </template>
            </el-table-column>
            <el-table-column label="期末成绩" align="center" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.endScore}}</span>
              </template>
            </el-table-column>
            <el-table-column label="实验成绩" align="center" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.labScore}}</span>
              </template>
            </el-table-column>
            <el-table-column label="总评成绩" align="center" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.finalScore}}</span>
              </template>
            </el-table-column>
            <el-table-column label="折算成绩" align="center" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.convertScore}}</span>
              </template>
            </el-table-column>
            <el-table-column label="补考成绩" align="center" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.resitScore}}</span>
              </template>
            </el-table-column>
            <el-table-column label="补考备注" align="center" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.resitMemo}}</span>
              </template>
            </el-table-column>
            <el-table-column label="重修成绩" align="center" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.repairScore}}</span>
              </template>
            </el-table-column>
            <el-table-column label="绩点" align="center" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.gradePoint}}</span>
              </template>
            </el-table-column>
            <el-table-column label="备注" align="center" width="120">
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
          <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="800px" top="20px" @close='closeDialog'>
            <el-form label-width="90px" label-position="left" :model="stuCourseScoreDetail" class="dialog-form"
                     ref="updateForm" :rules="rules">
              <el-row>
                <el-col :span="11">
                  <el-form-item label="学号">
                    <!--<el-select v-model="stuCourseScoreDetail.studentNo" clearable filterable remote reserve-keyword-->
                      <!--placeholder="请输入学号" :remote-method="filterStudentNo" :loading="loadingStatus">-->
                      <!--<el-option v-for="item in studentNoOption" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
                    <!--</el-select>-->
                    <el-select v-model="stuCourseScoreDetail.studentNo" clearable filterable remote reserve-keyword
                               placeholder="请输入学号" :remote-method="filterStudentNo" :loading="loadingStatus" @change="filterListByStudentNo" @clear="clearDetail">
                      <el-option v-for="item in selectOptionList" :key="item.stuId" :label="item.studentNo" :value="item.studentNo"></el-option>
                    </el-select>
                    <!--<el-input v-model="stuCourseScoreDetail.studentNo"></el-input>-->
                  </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="11">
                  <el-form-item label="选课课号">
                    <el-input v-model="stuCourseScoreDetail.selectedCourseNo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="姓名" prop="studentName">
                    <el-select v-model="stuCourseScoreDetail.studentName" clearable filterable remote reserve-keyword
                               placeholder="请输入姓名" :remote-method="filterStudentName" :loading="loadingStatus" @clear="clearDetail" @change="filterListByStudentName">
                      <el-option v-for="item in selectOptionList" :key="item.stuId" :label="item.studentName" :value="item.studentName"></el-option>
                    </el-select>
                    <!--<el-input v-model="stuCourseScoreDetail.studentName"></el-input>-->
                  </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="11">
                  <el-form-item label="课程代码" prop="courseCode">
                    <el-input v-model="stuCourseScoreDetail.courseCode"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="学院名称" prop="orgName">
                    <el-input v-model="stuCourseScoreDetail.orgName" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="11">
                  <el-form-item label="课程名称" prop="courseName">
                    <el-input v-model="stuCourseScoreDetail.courseName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="专业名称">
                    <el-input v-model="stuCourseScoreDetail.major" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="11">
                  <el-form-item label="学年">
                    <el-input v-model="stuCourseScoreDetail.academicYear"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="班级" prop="className">
                    <el-input v-model="stuCourseScoreDetail.className"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="11">
                  <el-form-item label="学期">
                    <el-radio-group v-model="stuCourseScoreDetail.term" prop="term">
                      <el-radio label="1">1</el-radio>
                      <el-radio label="2">2</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="平时成绩">
                    <el-input v-model="stuCourseScoreDetail.usualScore" type="number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="11">
                  <el-form-item label="期中成绩">
                    <el-input v-model="stuCourseScoreDetail.middleScore" type="number"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="期末成绩">
                    <el-input v-model="stuCourseScoreDetail.endScore" type="number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="11">
                  <el-form-item label="实验成绩">
                    <el-input v-model="stuCourseScoreDetail.labScore" type="number"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="总评成绩">
                    <el-input v-model="stuCourseScoreDetail.finalScore" type="number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="11">
                  <el-form-item label="折算成绩">
                    <el-input v-model="stuCourseScoreDetail.convertScore" type="number"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="是否补考">
                    <el-radio-group v-model="stuCourseScoreDetail.retakeFlag">
                      <el-radio :label="true">是</el-radio>
                      <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="11">
                  <el-form-item label="补考成绩">
                    <el-input v-model="stuCourseScoreDetail.resitScore" type="number"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="重修成绩">
                    <el-input v-model="stuCourseScoreDetail.repairScore" type="number"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="11">
                  <el-form-item label="绩点">
                    <el-input v-model="stuCourseScoreDetail.gradePoint" type="number"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="23">
                  <el-form-item label="补考备注">
                    <el-input v-model="stuCourseScoreDetail.resitMemo" type="textarea" :autosize="{ minRows: 1, maxRows: 3}"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="23">
                  <el-form-item label="备注">
                    <el-input v-model="stuCourseScoreDetail.memo" type="textarea" :autosize="{ minRows: 1, maxRows: 3}"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取消</el-button>
                <el-button type="primary" @click="handleSaveCourse">保存</el-button>
              </span>
          </el-dialog>
          <el-dialog title="上传教师信息" :visible.sync="uploadDialogVisible" width="30%" center :before-close="handleCloseUpload">
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
              :auto-upload="false">
              <!--:headers="{'Authentication-Token': jwtToken}"-->
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
  import { getStudentCourseDetailPage } from '@/service/studentCourseDetail.service'
  import { initCourseInfo, getCourseInfoPage, findCoursesByConditions, saveCourseInfo } from '@/service/course.service'
  import { findAllActiveStudents } from '@/service/student.service'
  import Constant from '@/utils/Constant'

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
        stuCourseScoreDetailList: [],
        studentList: [],
        studentNoList: [],
        studentNoOption: [],
        selectOptionList: [],
        studentNameOption: [],
        courseList: [],
        courseInfoEditable: true,
        stuCourseScoreDetail: {
          courseCode: '',
          courseName: '',
          studentId: '',
          studentNo: '',
          studentName: '',
          orgId: '',
          orgName: '',
          className: '',
          majorCode: '',
          major: '',
          retakeFlag: '',
          usualScore: '',
          middleScore: '',
          endScore: '',
          labScore: '',
          finalScore: '',
          convertScore: '',
          resitScore: '',
          resitMemo: '',
          repairScore: '',
          gradePoint: '',
          memo: '',
          createTime: '',
          creator: '',
          parentOrgId: '',
          totalHours: '',
          grade: '',
          academicYear: '',
          term: '',
          teacherNo: '',
          teacherName: '',
          selectedCourseNo: '',
          courseType: '',
          credit: '',
          active: ''
        },
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
          ]
        },
        courseUploadUrl: Constant.COURSE_UPLOAD_URL,
        fileList: [],
        uploadDialogVisible: false
      };
    },
    methods: {
      async callStudentCourseDetails(pageable) {
        this.$loading({fullscreen: true});
        let response = await getStudentCourseDetailPage(pageable);
        let stuCourseScoreDetailList = response.data.pageResultList;
        // format data
        this.stuCourseScoreDetailList = this.formatList(stuCourseScoreDetailList);
        this.totalCount = response.data.total;
        this.$loading({fullscreen: true}).close();
      },
      formatList(dataList) {
        dataList.forEach(data => {
          data.retakeFlag = (data.retakeFlag === 'N' || data.retakeFlag === 'n') ? false : true;
        });
        return dataList;
      },
      async getAllStudents() {
        let response = await findAllActiveStudents();
        let studentList = response.data;
        this.studentList = studentList;
        this.studentNoList = studentList.map(item => {
          return { value: item.studentNo, label: item.studentNo};
        });
      },
      filterStudentNo(query) {
        if (query !== '') {
          this.loadingStatus = true;
          setTimeout(() => {
            this.loadingStatus = false;
            this.selectOptionList = this.studentList.filter(item => {
              return item.studentNo.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.selectOptionList = [];
        }
      },
      filterListByStudentNo(value) {
        if (value !== '') {
          this.selectOptionList = this.selectOptionList.filter(item => {
            return item.studentNo.toLowerCase().indexOf(value.toLowerCase()) > -1;
          });
        } else {
          this.selectOptionList = [];
        }
      },
      filterListByStudentName(value) {
        if (value !== '') {
          this.selectOptionList = this.selectOptionList.filter(item => {
            return item.studentName.toLowerCase().indexOf(value.toLowerCase()) > -1;
          });
        } else {
          this.selectOptionList = [];
        }
      },
      clearDetail() {
        this.stuCourseScoreDetail.studentNo = '';
        this.stuCourseScoreDetail.studentName = '';
      },
      filterStudentName(query) {
        if (query !== '') {
          this.loadingStatus = true;
          setTimeout(() => {
            this.loadingStatus = false;
            this.selectOptionList = this.studentList.filter(item => {
              return item.studentName.indexOf(query) > -1;
            });
            console.log('name', this.selectOptionList);
          }, 200);
        } else {
          this.selectOptionList = [];
        }
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
        this.stuCourseScoreDetail = {};
      },
      showModifyDialog() {
        if (this.multipleSelection.length === 1) {
          this.dialogTitle = '修改';
          // this.courseInfoEditable = true;
          // deep clone
          this.stuCourseScoreDetail = JSON.parse(JSON.stringify(this.multipleSelection[0]));
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
          let filterVal = ['courseCode', 'courseName', 'academicYear', 'term', 'totalHours', 'labHours', 'limitStudentNum', 'selectedCourseNo', 'studentNum',
            'credit', 'courseType', 'belongTo', 'teacherNo', 'teacherName', 'classInfo', 'memo'];
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
        this.pageable.pageSize = val;
        this.callCourseList(this.pageable);
        // this.stakeholderSearchInfo = JSON.parse(sessionStorage.getItem(Constant.STAKEHOLDER_SEARCH_CONDITIONS));
        // this.stakeholderSearchInfo.pageSize = val;
        // sessionStorage.setItem(Constant.STAKEHOLDER_SEARCH_CONDITIONS, JSON.stringify(this.stakeholderSearchInfo));
        // this.callSearchInfo();
      },
      handleCurrentChange(val) {
        this.pageable.currentPage = val;
        this.callCourseList(this.pageable);
        // this.stakeholderSearchInfo = JSON.parse(sessionStorage.getItem(Constant.STAKEHOLDER_SEARCH_CONDITIONS));
        // this.stakeholderSearchInfo.currentPage = val;
        // sessionStorage.setItem(Constant.STAKEHOLDER_SEARCH_CONDITIONS, JSON.stringify(this.stakeholderSearchInfo));
        // this.callSearchInfo();
      },
      handleSelectionChange(value) {
        this.multipleSelection = value;
      },
      handleRowDBClick(row, event) {
        this.dialogTitle = '修改';
        // this.courseInfoEditable = true;
        this.stuCourseScoreDetail = JSON.parse(JSON.stringify(row));
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
        // console.log(response);
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
        // let courseList = courseListData.data.pageResultList;
        // this.courseList = courseList;
        // this.courseList = this.formatList(courseList);
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
      }
    },
    computed: {
      //   if (this.stuCourseScoreDetail.studentName !== '') {
      //     this.studentList.filter(item => {
      //       return item.studentName.indexOf(this.stuCourseScoreDetail.studentName) > -1;
      //     });
      //   }
        // return [];
      // }
    },
    created() {
      this.$store.dispatch('commitInformationMenuIndex', 'studentCourseScoreDetail');
    },
    mounted() {
      document.title = "学生选课及成绩明细";
      // this.init();
      this.callStudentCourseDetails(this.pageable);
      this.getAllStudents();
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

  >>>.el-select {
    width: 100%;
  }
</style>
