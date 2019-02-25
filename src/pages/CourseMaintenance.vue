<template>
  <div>
    <el-row class="text-align-left">
      <el-col :span="24">
        <el-col :xl="22" :lg="22" :offset="1" class="page-title">开课课程信息管理</el-col>
        <el-col :span="4" class="margin-top">
          <!--:xl="3" :lg="4" :offset="1"-->
          <el-form label-width="70px" label-position="left" :model="searchCourse" ref="searchForm">
            <el-form-item label="课程代码">
              <el-input v-model="searchCourse.courseCode"></el-input>
            </el-form-item>
            <el-form-item label="课程名称">
              <el-input v-model="searchCourse.courseName">'</el-input>
            </el-form-item>
            <el-form-item label="教师工号">
              <el-input v-model="searchTeacher.teacherNo"></el-input>
            </el-form-item>
            <el-form-item label="教师姓名">
              <el-input v-model="searchTeacher.teacherName"></el-input>
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
        <el-col :xl="1" :lg="1" class="margin-top">
          <div class="line"></div>
        </el-col>
        <el-col :span='18' class="margin-top"><!--:xl="18" :lg="17"-->
          <el-button class="el-button--primary" plain round @click="showAddDialog">添加</el-button>
          <el-button class="el-button--primary" plain round @click="showModifyDialog">修改</el-button>
          <el-button class="el-button--primary" plain round @click="uploadDialogVisible = true">上传</el-button>
          <el-button class="el-button--primary" plain round @click="exportTableData">导出</el-button>
          <el-table class="stakeholder-table" :data="courseList"
                    ref="multipleTable" stripe max-height="700" @row-dblclick="handleRowDBClick"
                    style="width: 100%" highlight-current-row @selection-change="handleSelectionChange"
                    :default-sort="{prop: 'teacherNo', order: 'ascending'}"
                    v-loading="loadingStatus">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column label="课程代码" sortable prop="courseCode" align="center" width="150">
              <template slot-scope="scope">
                <span>{{scope.row.courseCode}}</span>
              </template>
            </el-table-column>
            <el-table-column label="课程名称" sortable prop="courseName" align="center" width="100">
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
            <el-table-column label="总学时" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.totalHours}}</span>
              </template>
            </el-table-column>
            <el-table-column label="实验学时" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.labHours}}</span>
              </template>
            </el-table-column>
            <el-table-column label="选课课号" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.category}}</span>
              </template>
            </el-table-column>
            <el-table-column label="限选人数" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.limitStudentNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="选课人数" align="center" width="150" :show-overflow-tooltip="true">
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
            <el-table-column label="教学班组成" align="center" width="150" :show-overflow-tooltip="true">
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
              <el-form-item label="工号" prop="teacherNo">
                <el-input v-model="updateCourse.teacherNo" :disabled="teacherInfoEditable"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="teacherName">
                <el-input v-model="updateCourse.teacherName"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="updateCourse.sex" prop="sex">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="出生日期">
                <el-date-picker v-model="updateCourse.birthday" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="政治面貌">
                <el-select v-model="updateCourse.politicalStatus" filterable placeholder="请选择">
                  <el-option v-for="item in politicalOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="民族">
                <el-select v-model="updateCourse.nation" filterable placeholder="请选择">
                  <el-option v-for="item in nationOptions" :key="item.name" :label="item.name"
                             :value="item.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学院名称">
                <el-input v-model="updateCourse.orgName"></el-input>
              </el-form-item>
              <el-form-item label="职务">
                <el-input v-model="updateCourse.duty"></el-input>
              </el-form-item>
              <el-form-item label="职称">
                <el-input v-model="updateCourse.academicTitle"></el-input>
              </el-form-item>
              <el-form-item label="教职工类别">
                <el-input v-model="updateCourse.category"></el-input>
              </el-form-item>
              <el-form-item label="学历">
                <el-input v-model="updateCourse.education"></el-input>
              </el-form-item>
              <el-form-item label="学位">
                <el-input v-model="updateCourse.degree"></el-input>
              </el-form-item>
              <el-form-item label="毕业院校">
                <el-input v-model="updateCourse.graduateSchool"></el-input>
              </el-form-item>
              <el-form-item label="专业">
                <el-input v-model="updateCourse.major"></el-input>
              </el-form-item>
              <el-form-item label="教师资格">
                <el-radio-group v-model="updateCourse.qualificationFlag">
                  <el-radio :label="true">有</el-radio>
                  <el-radio :label="false">无</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="在职状态">
                <el-radio-group v-model="updateCourse.jobStatus">
                  <el-radio label="在职">在职</el-radio>
                  <el-radio label="离职">离职</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="可否监考">
                <el-radio-group v-model="updateCourse.invigilatorFlag">
                  <el-radio :label="true">可以</el-radio>
                  <el-radio :label="false">不可以</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="实验室人员">
                <el-radio-group v-model="updateCourse.isLab">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="外聘">
                <el-radio-group v-model="updateCourse.isOutHire">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input type="email" v-model="updateCourse.email"></el-input>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input v-model="updateCourse.telNo"></el-input>
              </el-form-item>
              <el-form-item label="联系地址">
                <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}"
                          v-model="updateCourse.address"></el-input>
              </el-form-item>
              <el-form-item label="教师简介">
                <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}"
                          v-model="updateCourse.introduce"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleSaveTeacher">保存</el-button>
          </span>
          </el-dialog>
          <el-dialog title="上传教师信息" :visible.sync="uploadDialogVisible" width="30%" center
                     :before-close="handleCloseUpload">
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="teacherUploadUrl"
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
              <el-button type="primary" style="margin-left: 10px;width: 80px;" size="small" @click="submitUpload" plain>
                上传
              </el-button>
              <div slot="tip" class="el-upload__tip">仅支持 Excel 文件</div>
            </el-upload>
          </el-dialog>
        </el-col>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import {
    getTeacherInfo,
    getTeacherInfoPage,
    findTeachersByConditions,
    saveTeacherInfo
  } from '@/service/teacher.service'

  import Constant from '@/utils/Constant'

  export default {
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
        teacherInfoEditable: true,
        updateCourse: {
          courseCode: '',
          courseName: '',
          academicYear: '',
          term: '',
          totalHours: '',
          labHours: '',
          selectedCourseNo: '',
          limitStudentNum: '',
          studentNum: '',
          credit: '',
          courseType: '',
          belongTo: '',
          teacherNo: '',
          teacherName: '',
          classInfo: '',
          memo: ''
        },
        // searchTeacher: {
        //   teacherNo: '',
        //   teacherName: '',
        //   sex: '',
        //   orgName: '',
        //   academicTitle: '', // 职称
        //   qualificationFlag: '', // '教师资格标志：Y:有；N：无'
        //   jobStatus: '', // '在职状态：Y:在职；N：离职'
        //   isOutHire: '', // '是否外聘：Y：是；N：否'
        //   currentPage: 1,
        //   pageSize: 20
        // },
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
          teacherNo: [
            {required: true, message: '请输入工号', trigger: ['blur', 'change']}
          ],
          teacherName: [
            {required: true, message: '请输入姓名', trigger: ['blur', 'change']}
          ],
          email: [
            {type: 'email', message: '请输入正确的电子邮箱', trigger: ['blur', 'change']}
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: ['blur', 'change']}
          ]
        },
        teacherUploadUrl: Constant.TEACHER_UPLOAD_URL,
        fileList: [],
        uploadDialogVisible: false,
      };
    },
    methods: {
      async callTeacherList(pageable) {
        this.$loading({fullscreen: true});
        let teachers = await getTeacherInfoPage(pageable);
        let teacherList = teachers.data.pageResultList;
        // format data
        this.courseList = this.formatList(teacherList);
        this.totalCount = teachers.data.total;
        this.$loading({fullscreen: true}).close();
      },
      handleSaveTeacher() {
        this.$refs.updateForm.validate((valid) => {
          if (!valid) {
            return false;
          } else {
            this.saveTeacher();
          }
        });
      },
      async saveTeacher() {
        this.$loading({fullscreen: true});
        let teacher = this.decodeTeacherInfo(this.updateCourse);
        let responseData = await saveTeacherInfo(teacher);
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
          this.callTeacherList(this.pageable);
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
        this.teacherInfoEditable = false;
      },
      closeDialog() {
        this.dialogVisible = false;
        this.$refs.updateForm.resetFields();
        this.updateCourse = {};
      },
      showModifyDialog() {
        if (this.multipleSelection.length === 1) {
          this.dialogTitle = '修改';
          this.teacherInfoEditable = true;
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
          let response = await getTeacherInfo();
          // deep clone
          let teacherList = JSON.parse(JSON.stringify(response.data));
          this.doExport(teacherList);
          this.$loading({fullscreen: true}).close();
        }
      },
      doExport(teacherList) {
        require.ensure([], () => {
          const {exportJsonToExcel} = require('@/utils/Export2Excel');
          let tHeader = ['职工号', ' 姓名', '性别', '出生日期', '学院名称', '联系电话', '邮箱地址', '联系地址', '教职工类别', '学历', '学位', '职务', '职称',
            '可否监考', '教学研究方向', '教师简介', '专业名称', '毕业院校', '教师资格', '在职类别', '实验室人员', '外聘', '政治面貌', '民族'];

          let filterVal = ['teacherNo', 'teacherName', 'sex', 'birthday', 'orgName', 'telNo', 'email', 'address', 'category', 'education', 'degree', 'duty', 'academicTitle',
            'invigilatorFlag', 'researchDirection', 'introduce', 'major', 'graduateSchool', 'qualificationFlag', 'jobStatus', 'isLab', 'isOutHire', 'politicalStatus', 'nation'];
          // deep clone
          let exportTeacherList = this.formatForExport(teacherList);
          let data = this.formatJson(filterVal, exportTeacherList);
          exportJsonToExcel(tHeader, data, '教职工表');
        });
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      },
      handleSizeChange(val) {
        this.pageable.pageSize = val;
        this.callStudentList(this.pageable);
        // this.stakeholderSearchInfo = JSON.parse(sessionStorage.getItem(Constant.STAKEHOLDER_SEARCH_CONDITIONS));
        // this.stakeholderSearchInfo.pageSize = val;
        // sessionStorage.setItem(Constant.STAKEHOLDER_SEARCH_CONDITIONS, JSON.stringify(this.stakeholderSearchInfo));
        // this.callSearchInfo();
      },
      handleCurrentChange(val) {
        this.pageable.currentPage = val;
        this.callStudentList(this.pageable);
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
        this.teacherInfoEditable = true;
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
            this.callTeacherList(this.pageable);
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
        let teacherListData = await findTeachersByConditions(this.searchTeacher);
        let teacherList = teacherListData.data.pageResultList;
        this.courseList = this.formatList(teacherList);
        this.totalCount = teacherListData.data.total;
        this.loadingStatus = false;
      },
      async init() {
        let teachersData = await getTeacherInfo();
        let teacherList = teachersData.data;
        let orgNameSet = new Set();
        let academicTitleSet = new Set();
        teacherList.forEach(teacher => {
          orgNameSet.add(teacher.orgName);
          academicTitleSet.add(teacher.academicTitle);
        });
        orgNameSet.forEach(orgName => {
          let orgNameObj = {name: orgName};
          this.orgNameOptions.push(orgNameObj);
        });
        academicTitleSet.forEach(academicTitle => {
          let academicTitleObj = {name: academicTitle};
          this.academicTitleOptions.push(academicTitleObj);
        });
      },
      formatList(teacherList) {
        // format data
        teacherList.forEach(teacher => {
          // sex
          teacher.sex = (teacher.sex === '0') ? '男' : '女';
          // invigilatorFlag
          teacher.invigilatorFlag = (teacher.invigilatorFlag === 'T') ? true : false;
          // jobStatus
          teacher.jobStatus = (teacher.jobStatus === 'Y') ? '在职' : '离职';
          // qualificationFlag
          teacher.qualificationFlag = (teacher.qualificationFlag === 'Y') ? true : false;
          // isLab
          teacher.isLab = (teacher.isLab === 'Y') ? true : false;
          // isOutHire
          teacher.isOutHire = (teacher.isOutHire === 'Y') ? true : false;
        });
        return teacherList;
      },
      formatForExport(teacherList) {
        // format data
        teacherList.forEach(teacher => {
          // sex
          teacher.sex = (teacher.sex === '0') ? '男' : '女';
          // invigilatorFlag
          teacher.invigilatorFlag = (teacher.invigilatorFlag === 'T') ? '可以' : '不可以';
          // jobStatus
          teacher.jobStatus = (teacher.jobStatus === 'Y') ? '在职' : '离职';
          // qualificationFlag
          teacher.qualificationFlag = (teacher.qualificationFlag === 'Y') ? '有' : '没有';
          // isLab
          teacher.isLab = (teacher.isLab === 'Y') ? '是' : '否';
          // isOutHire
          teacher.isOutHire = (teacher.isOutHire === 'Y') ? '是' : '否';
        });
        return teacherList;
      },
      decodeTeacherInfo(teacher) {
        // sex
        teacher.sex = (teacher.sex === '男') ? '0' : '1';
        // invigilatorFlag
        teacher.invigilatorFlag = (teacher.invigilatorFlag === true) ? 'T' : 'F';
        // jobStatus
        teacher.jobStatus = (teacher.jobStatus === '在职') ? 'Y' : 'N';
        // qualificationFlag
        teacher.qualificationFlag = (teacher.qualificationFlag === true) ? 'Y' : 'N';
        // isLab
        teacher.isLab = (teacher.isLab === true) ? 'Y' : 'N';
        // isOutHire
        teacher.isOutHire = (teacher.isOutHire === true) ? 'Y' : 'N';
        return teacher;
      }
    },
    mounted() {
      document.title = "教师信息管理";
      this.init();
      this.callTeacherList(this.pageable);
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

  .table-nav {
    position: fixed;
    bottom: 40px;
  }

  .line {
    width: 1px;
    height: 700px;
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

  > > > .el-input.is-disabled .el-input__inner {
    background-color: #FFFFFF;
    border-color: #66b1ff;
    color: #c0c4cc;
  }

</style>
