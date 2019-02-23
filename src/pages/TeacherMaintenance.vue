<template>
  <div>
    <el-row class="text-align-left">
      <el-col :span="24">
        <el-col :xl="22" :lg="22" :offset="1" class="page-title">教师基本信息管理</el-col>
        <el-col :span="4" class="margin-top">
          <!--:xl="3" :lg="4" :offset="1"-->
          <el-form label-width="70px" label-position="left" :model="searchTeacher" ref="searchForm">
            <el-form-item label="工号">
              <el-input v-model="searchTeacher.teacherNo"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
            <el-input v-model="searchTeacher.teacherName">'</el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="searchTeacher.sex" size="small">
                <el-radio label="0" class="radio-margin">男</el-radio>
                <el-radio label="1" class="radio-margin">女</el-radio>
                <el-radio label="" class="radio-margin">不限</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="学院">
              <el-select v-model="searchTeacher.orgName" filterable placeholder="请选择">
                <el-option v-for="item in orgNameOptions" :key="item.name" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职称">
              <el-select v-model="searchTeacher.academicTitle" filterable placeholder="请选择">
                <el-option v-for="item in academicTitleOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="教师资格">
              <el-radio-group v-model="searchTeacher.qualificationFlag" size="small">
                <el-radio label="Y" class="radio-margin">有</el-radio>
                <el-radio label="N" class="radio-margin">无</el-radio>
                <el-radio label="" class="radio-margin">不限</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="状态">
              <el-radio-group v-model="searchTeacher.jobStatus" size="small">
                <el-radio label="Y" class="radio-margin">在职</el-radio>
                <el-radio label="N" class="radio-margin">离职</el-radio>
                <el-radio label="" class="radio-margin">不限</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否外聘">
              <el-radio-group v-model="searchTeacher.isOutHire" size="small">
                <el-radio label="Y" class="radio-margin">是</el-radio>
                <el-radio label="N" class="radio-margin">否</el-radio>
                <el-radio label="" class="radio-margin">不限</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <el-button type="primary" icon="el-icon-search" class="search-btn" @click="queryTeacher">搜索</el-button>
        </el-col>
        <el-col :xl="1" :lg="1" class="margin-top">
          <div class="line"></div>
        </el-col>
        <el-col :span='18' class="margin-top"><!--:xl="18" :lg="17"-->
          <el-button class="el-button--primary" plain round @click="showAddDialog">添加</el-button>
          <el-button class="el-button--primary" plain round @click="showModifyDialog">修改</el-button>
          <el-button class="el-button--primary" plain round @click="uploadDialogVisible = true">上传</el-button>
          <el-button class="el-button--primary" plain round @click="exportTableData">导出</el-button>
          <el-table class="stakeholder-table" :data="teacherList"
                    ref="multipleTable" stripe max-height="700" @row-dblclick="handleRowDBClick"
                    style="width: 100%" highlight-current-row @selection-change="handleSelectionChange"
                    :default-sort="{prop: 'teacherNo', order: 'ascending'}"
                    v-loading="loadingStatus">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column label="工号" sortable prop="teacherNo" align="center" width="150">
              <template slot-scope="scope">
                <span>{{scope.row.teacherNo}}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" sortable prop="teacherName" align="center" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.teacherName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="性别" align="center" width="80">
              <template slot-scope="scope">
                <span>{{scope.row.sex}}</span>
              </template>
            </el-table-column>
            <el-table-column label="出生日期" sortable prop="birthday" align="center" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.birthday}}</span>
              </template>
            </el-table-column>
            <el-table-column label="学院名称" sortable prop="orgName" align="center" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.orgName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="职务" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.duty}}</span>
              </template>
            </el-table-column>
            <el-table-column label="职称" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.academicTitle}}</span>
              </template>
            </el-table-column>
            <el-table-column label="教职工类别" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.category}}</span>
              </template>
            </el-table-column>
            <el-table-column label="学历" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.education}}</span>
              </template>
            </el-table-column>
            <el-table-column label="学位" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.degree}}</span>
              </template>
            </el-table-column>
            <el-table-column label="毕业院校" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.graduateSchool}}</span>
              </template>
            </el-table-column>
            <el-table-column label="专业名称" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.major}}</span>
              </template>
            </el-table-column>
            <el-table-column label="教学研究方向" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.researchDirection}}</span>
              </template>
            </el-table-column>
            <el-table-column label="可否监考" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.invigilatorFlag" disabled></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="教师资格" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.qualificationFlag" disabled></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="在职状态" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.jobStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column label="是否实验室人员" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.isLab" disabled></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="是否外聘" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.isOutHire" disabled></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="政治面貌" sortable prop="politicalStatus" align="center" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.politicalStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column label="民族" sortable prop="nation" align="center" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.nation}}</span>
              </template>
            </el-table-column>
            <el-table-column label="联系方式" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.telNo}}</span>
              </template>
            </el-table-column>
            <el-table-column label="邮箱" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.email}}</span>
              </template>
            </el-table-column>
            <el-table-column label="联系地址" align="center" width="200" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.address}}</span>
              </template>
            </el-table-column>
            <el-table-column label="教师简介" align="center" width="200" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.introduce}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="table-nav" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="pageable.currentPage" background
                         :page-sizes="[20,40, 100, 200, 500]" :page-size="pageable.pageSize"
                         layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
          <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px" top="20px" @close='closeDialog'>
            <el-form label-width="80px" label-position="left" :model="updateTeacher" class="dialog-form" ref="updateForm"><!--:rules="rules"-->
              <el-form-item label="工号" prop="teacherNo">
                <el-input v-model="updateTeacher.teacherNo" :disabled="teacherInfoEditable"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="teacherName">
                <el-input v-model="updateTeacher.teacherName"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="updateTeacher.sex" prop="sex">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="出生日期">
                <el-date-picker v-model="updateTeacher.birthday" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="政治面貌">
                <el-select v-model="updateTeacher.politicalStatus" filterable placeholder="请选择">
                  <el-option v-for="item in politicalOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="民族">
                <el-select v-model="updateTeacher.nation" filterable placeholder="请选择">
                  <el-option v-for="item in nationOptions" :key="item.name" :label="item.name"
                             :value="item.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学院名称">
                <el-input v-model="updateTeacher.orgName"></el-input>
              </el-form-item>
              <el-form-item label="职务">
                <el-input v-model="updateTeacher.duty"></el-input>
              </el-form-item>
              <el-form-item label="职称">
                <el-input v-model="updateTeacher.academicTitle"></el-input>
              </el-form-item>
              <el-form-item label="教师类别">
                <el-input v-model="updateTeacher.category"></el-input>
              </el-form-item>
              <el-form-item label="学历">
                <el-input v-model="updateTeacher.education"></el-input>
              </el-form-item>
              <el-form-item label="学位">
                <el-input v-model="updateTeacher.degree"></el-input>
              </el-form-item>
              <el-form-item label="毕业院校">
                <el-input v-model="updateTeacher.graduateSchool"></el-input>
              </el-form-item>
              <el-form-item label="专业">
                <el-input v-model="updateTeacher.major"></el-input>
              </el-form-item>
              <el-form-item label="教师资格">
                <el-input v-model="updateTeacher.qualificationFlag"></el-input>
              </el-form-item>
              <el-form-item label="在职状态">
                <el-input v-model="updateTeacher.jobStatus"></el-input>
              </el-form-item>
              <el-form-item label="是否实验室人员">
                <el-input v-model="updateTeacher.isLab"></el-input>
              </el-form-item>
              <el-form-item label="是否外聘">
                <el-input v-model="updateTeacher.isOutHire"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input type="email" v-model="updateTeacher.email"></el-input>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input v-model="updateTeacher.telNo"></el-input>
              </el-form-item>
              <el-form-item label="联系地址">
                <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}"
                          v-model="updateTeacher.address"></el-input>
              </el-form-item>
              <el-form-item label="教师简介">
                <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}"
                          v-model="updateTeacher.introduce"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleSaveTeacher">保存</el-button>
          </span>
          </el-dialog>
          <el-dialog title="上传学生信息" :visible.sync="uploadDialogVisible" width="30%" center :before-close="handleCloseUpload">
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="studentUploadUrl"
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
  </div>

</template>

<script>
  // import {getStudentList, saveStudentInfo, findAllActiveStudents, findStdentsByConditions} from '@/service/student.service'
  import { getTeacherInfo, getTeacherInfoPage, findTeachersByConditions } from '@/service/teacher.service'

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
        // studentList: [],
        teacherList: [],
        teacherInfoEditable: true,
        updateTeacher: {
          teacherNo: '',
          teacherName: '',
          sex: '',
          birthday: '',
          politicalStatus: '',
          nation: '',
          orgName: '',
          telNo: '',
          email: '',
          duty: '',
          academicTitle: '',
          category: '',
          graduateSchool: '',
          major: '',
          education: '',
          degree: '',
          researchDirection: '',
          invigilatorFlag: '',
          qualificationFlag: '',
          isLab: '',
          isOutHire: '',
          address: '',
          introduce: ''
        },
        // searchStudent: {
        //   studentNo: '',
        //   studentName: '',
        //   sex: '',
        //   // birthdayFrom: '',
        //   // birthdayTo: '',
        //   politicalStatus: '',
        //   nation: '',
        //   orgName: '',
        //   major: '',
        //   className: '',
        //   acceptanceYear: '',
        //   currentPage: 1,
        //   pageSize: 20
        // },
        searchTeacher: {
          teacherNo: '',
          teacherName: '',
          sex: '',
          orgName: '',
          academicTitle: '', // 职称
          qualificationFlag: '', // '教师资格标志：Y:有；N：无'
          jobStatus: '', // '在职状态：Y:在职；N：离职'
          isOutHire: '', // '是否外聘：Y：是；N：否'
          currentPage: 1,
          pageSize: 2
        },
        dialogTitle: '',
        dialogVisible: false,
        orgNameOptions: [],
        academicTitleOptions: [],
        politicalOptions: Constant.POLITICALOPTIONS,
        nationOptions: Constant.NATIONOPTIONS,
        // rules: {
        //   studentNo: [
        //     {required: true, message: '请输入学号', trigger: ['blur', 'change']}
        //   ],
        //   studentName: [
        //     {required: true, message: '请输入姓名', trigger: ['blur', 'change']}
        //   ],
        //   idcardNo: [
        //     {required: true, message: '请输入身份证号', trigger: ['blur', 'change']}
        //   ],
        //   email: [
        //     {required: true, message: '请输入电子邮箱', trigger: 'blur'},
        //     {type: 'email', message: '请输入正确的电子邮箱', trigger: ['blur', 'change']}
        //   ],
        //   sex: [
        //     {required: true, message: '请选择性别', trigger: ['blur', 'change']}
        //   ]
        // },
        studentUploadUrl: Constant.STUDENT_UPLOAD_URL,
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
        this.teacherList = this.formatList(teacherList);
        this.totalCount = teachers.data.total;
        this.$loading({fullscreen: true}).close();
      },
      handleSaveTeacher() {
        // this.$refs.updateForm.validate((valid) => {
        //   if (!valid) {
        //     return false;
        //   } else {
        //     let idNoReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        //     if (!idNoReg.test(this.updateStudent.idcardNo)) {
        //       this.$alert('请输入正确的身份证号码！');
        //       return false;
        //     }
        //     this.saveStudent();
        //   }
        // });
      },
      async saveStudent() {
        // this.$loading({fullscreen: true});
        // let responseData = await saveStudentInfo(this.updateStudent);
        // if (responseData.code === Constant.POPUP_EXCEPTION_CODE && responseData.msg !== '') {
        //   this.$alert(responseData.msg, {
        //     confirmButtonText: 'OK'
        //   });
        // } else {
        //   this.$message.success('数据保存成功！');
        //   this.dialogVisible = false;
        //   this.updateStudent = {};
        //   // refresh data from DB
        //   // todo 获取页码和页面数量
        //   this.callStudentList(this.pageable);
        // }
        // this.$loading({fullscreen: true}).close();
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
        this.updateStudent = {};
      },
      showModifyDialog() {
        // if (this.multipleSelection.length === 1) {
        //   this.dialogTitle = '修改';
        //   this.teacherInfoEditable = true;
        //   // deep clone
        //   this.updateStudent = JSON.parse(JSON.stringify(this.multipleSelection[0]));
        //   this.dialogVisible = true;
        // } else {
        //   this.$message.warning('请选择一条要修改的记录');
        // }
      },
      async exportTableData() {
        this.$loading({fullscreen: true});
        // todo call findAll function or by criteria
        let response = await findAllActiveStudents();
        // let studentList = JSON.parse(JSON.stringify(this.studentList));
        // deep clone
        let studentArray = JSON.parse(JSON.stringify(response.data));
        require.ensure([], () => {
          const {exportJsonToExcel} = require('@/utils/Export2Excel');
          let tHeader = ['学号', ' 姓名', '性别', '身份证号', '学院名称', '专业名称','专业类别', '行政班级', '出生日期', '政治面貌', '民族', '籍贯', '来源地区',
             '学制', '学习年限', '培育方向', '入学日期', '毕业中学', '邮箱', '联系方式', '家庭电话', '邮政编码', '乘车区间', '家庭地址', '特长'];
          let filterVal = ['studentNo', 'studentName', 'sex', 'idcardNo', 'orgName', 'major', 'majorCategories', 'className', 'birthday', 'politicalStatus', 'nation', 'nativePlace', 'fromPlace',
             'educationSystem', 'schoolingLength', 'cultivateDirection', 'acceptanceDate', 'middleSchool', 'email', 'mobileNo', 'familyTelNo', 'postcode', 'travelRange', 'address', 'skill'];
          // deep clone
          // let exportStakeholderList = JSON.parse(JSON.stringify(StakeholderList.data));
          // studentList.forEach(item => {
          // todo format data
          // item.unsubscribed = item.unsubscribed === '1' ? 'YES' : 'NO';
          // item.modifiedDate = item.modifiedDate.substring(0, item.modifiedDate.lastIndexOf('.')).replace('T', ' ');
          // add the ['categoryName'] property
          // item['categoryName'] = item.esgStakeholderCategory.categoryName;
          // });
          let data = this.formatJson(filterVal, studentArray);
          exportJsonToExcel(tHeader, data, 'StudentList');
        });
        this.$loading({fullscreen: true}).close();
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
        this.updateStudent = JSON.parse(JSON.stringify(row));
        this.dialogVisible = true;
      },
      // for upload
      handleCloseUpload (done) {
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
        console.log(response);
        if (response.code === Constant.POPUP_EXCEPTION_CODE && response.msg !== '') {
          this.$alert(response.msg, {
            confirmButtonText: 'OK'
          });
        } else {
          // todo 异常情况
          this.$alert('上传成功', {
            confirmButtonText: 'OK'
          }).then(value => {
            // recall getAll data
            this.pageable = {
              currentPage: 1,
              pageSize: 20
            };
            this.callStudentList(this.pageable);
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
      async queryTeacher() {
        this.loadingStatus = true;
        let teacherListData = await findTeachersByConditions(this.searchTeacher);
        let teacherList = teacherListData.data.pageResultList;
        this.teacherList = this.formatList(teacherList);
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
          let orgNameObj = { name: orgName };
          this.orgNameOptions.push(orgNameObj);
        });
        academicTitleSet.forEach(academicTitle => {
          let academicTitleObj = { name: academicTitle };
          this.academicTitleOptions.push(academicTitleObj);
        });
      },
      formatList(teacherList) {
        // format data
        teacherList.forEach(teacher => {
          // sex
          if (teacher.sex === '0') {
            teacher.sex = '男';
          } else {
            teacher.sex = '女';
          }
          // invigilatorFlag
          if (teacher.invigilatorFlag === 'T') {
            teacher.invigilatorFlag = true;
          } else {
            teacher.invigilatorFlag = false;
          }
          // jobStatus
          if (teacher.jobStatus === 'Y') {
            teacher.jobStatus = '在职';
          } else {
            teacher.jobStatus = '离职';
          }
          // qualificationFlag
          if (teacher.qualificationFlag === 'Y') {
            teacher.qualificationFlag = true;
          } else {
            teacher.qualificationFlag = false;
          }
          // isLab
          if (teacher.isLab === 'Y') {
            teacher.isLab = true;
          } else {
            teacher.isLab = false;
          }
          // isOutHire
          if (teacher.isOutHire === 'Y') {
            teacher.isOutHire = true;
          } else {
            teacher.isOutHire = false;
          }
        });
        return teacherList;
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

  .search-btn{
    text-align: center;
    width: 100%;
  }

  > > > .el-input.is-disabled .el-input__inner {
    background-color: #FFFFFF;
    border-color: #66b1ff;
    color: #c0c4cc;
  }

</style>
