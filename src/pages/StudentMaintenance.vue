<template>
  <div>
    <InfoMenu></InfoMenu>
    <el-row class="text-align-left">
      <el-col :span="24">
        <el-col :xl="22" :lg="22" :offset="1" class="page-title">学生基本信息管理</el-col>
        <el-col :span="4" class="margin-top search-form">
          <el-form label-width="70px" label-position="left" :model="searchStudent" ref="searchForm">
            <el-form-item label="学号">
              <el-input v-model="searchStudent.studentNo"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
            <el-input v-model="searchStudent.studentName">'</el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="searchStudent.sex" size="small">
                <el-radio label="男" class="radio-margin">男</el-radio>
                <el-radio label="女" class="radio-margin">女</el-radio>
                <el-radio label="" class="radio-margin">不限</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="政治面貌">
              <el-select v-model="searchStudent.politicalStatus" filterable placeholder="请选择">
                <el-option v-for="item in politicalOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="民族">
              <el-select v-model="searchStudent.nation" filterable placeholder="请选择">
                <el-option v-for="item in nationOptions" :key="item.name" :label="item.name"
                           :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年级">
              <el-input v-model="searchStudent.acceptanceYear"></el-input>
            </el-form-item>
            <el-form-item label="学院名称">
              <el-input v-model="searchStudent.orgName"></el-input>
            </el-form-item>
            <el-form-item label="专业名称">
              <el-input v-model="searchStudent.major"></el-input>
            </el-form-item>
            <el-form-item label="行政班级">
              <el-input v-model="searchStudent.className"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" icon="el-icon-search" class="search-btn" @click="queryStudent">搜索</el-button>
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
          <el-table :data="studentList" ref="multipleTable" stripe max-height="515" @row-dblclick="handleRowDBClick"
                    style="width: 100%" highlight-current-row @selection-change="handleSelectionChange"
                    :default-sort="{prop: 'studentNo', order: 'ascending'}"
                    v-loading="loadingStatus">
            <el-table-column type="selection" width="40" fixed></el-table-column>
            <el-table-column label="学号" sortable prop="studentNo" align="center" width="150">
              <template slot-scope="scope">
                <span>{{scope.row.studentNo}}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" sortable prop="studentName" align="center" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.studentName}}</span>
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
            <el-table-column label="籍贯" sortable prop="nativePlace" align="center" width="120" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.nativePlace}}</span>
              </template>
            </el-table-column>
            <el-table-column label="来源地区" sortable prop="fromPlace" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.fromPlace}}</span>
              </template>
            </el-table-column>
            <el-table-column label="身份证号" align="center" width="120" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.idcardNo}}</span>
              </template>
            </el-table-column>
            <el-table-column label="学院名称" sortable prop="orgName" align="center" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.orgName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="专业名称" sortable prop="major" align="center" width="180" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.major}}</span>
              </template>
            </el-table-column>
            <el-table-column label="专业类别" sortable prop="majorCategories" align="center" width="120" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.majorCategories}}</span>
              </template>
            </el-table-column>
            <el-table-column label="培育方向" align="center" width="120" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.cultivateDirection}}</span>
              </template>
            </el-table-column>
            <el-table-column label="行政班级" sortable prop="className" align="center" width="180" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.className}}</span>
              </template>
            </el-table-column>
            <el-table-column label="学制" sortable prop="educationSystem" align="center" width="80">
              <template slot-scope="scope">
                <span>{{scope.row.educationSystem}}</span>
              </template>
            </el-table-column>
            <el-table-column label="学习年限" sortable prop="schoolingLength" align="center" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.schoolingLength}}</span>
              </template>
            </el-table-column>
            <el-table-column label="入学日期" align="center" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.acceptanceDate}}</span>
              </template>
            </el-table-column>
            <el-table-column label="毕业中学" sortable prop="middleSchool" align="center" width="180" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.middleSchool}}</span>
              </template>
            </el-table-column>
            <el-table-column label="邮箱" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.email}}</span>
              </template>
            </el-table-column>
            <el-table-column label="联系方式" align="center" width="150" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.mobileNo}}</span>
              </template>
            </el-table-column>
            <el-table-column label="家庭电话" align="center" width="120" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.familyTelNo}}</span>
              </template>
            </el-table-column>
            <el-table-column label="邮政编码" align="center" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.postcode}}</span>
              </template>
            </el-table-column>
            <el-table-column label="乘车区间" align="center" width="180" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.travelRange}}</span>
              </template>
            </el-table-column>
            <el-table-column label="家庭地址" align="center" width="180" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.address}}</span>
              </template>
            </el-table-column>
            <el-table-column label="特长" align="center" width="180" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.skill}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="table-nav" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="pageable.currentPage" background
                         :page-sizes="[20,40, 100, 200, 500]" :page-size="pageable.pageSize"
                         layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
          <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px" top="20px" @close='closeDialog'>
            <el-form label-width="80px" label-position="left" :model="updateStudent" class="dialog-form" ref="updateForm" :rules="rules">
              <el-form-item label="学号" prop="studentNo">
                <el-input v-model="updateStudent.studentNo" :disabled="formEditable"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="studentName">
                <el-input v-model="updateStudent.studentName"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="idcardNo">
                <el-input v-model="updateStudent.idcardNo"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="updateStudent.sex" prop="sex">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="政治面貌">
                <el-select v-model="updateStudent.politicalStatus" filterable placeholder="请选择" clearable>
                  <el-option v-for="item in politicalOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="民族">
                <el-select v-model="updateStudent.nation" filterable placeholder="请选择" clearable>
                  <el-option v-for="item in nationOptions" :key="item.name" :label="item.name"
                             :value="item.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="籍贯">
                <el-input v-model="updateStudent.nativePlace"></el-input>
              </el-form-item>
              <el-form-item label="来源地区">
                <el-input v-model="updateStudent.fromPlace"></el-input>
              </el-form-item>
              <el-form-item label="学院名称">
                <el-select v-model="updateStudent.orgName" filterable placeholder="请选择" clearable>
                  <el-option v-for="item in organizationOptionList" :key="item.orgId" :label="item.orgName" :value="item.orgName"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="专业类别">
                <el-input v-model="updateStudent.majorCategories" :disabled="formEditable"></el-input>
              </el-form-item>
              <el-form-item label="专业名称">
                <el-input v-model="updateStudent.major" :disabled="formEditable"></el-input>
              </el-form-item>
              <el-form-item label="培育方向">
                <el-input v-model="updateStudent.cultivateDirection" :disabled="formEditable"></el-input>
              </el-form-item>
              <el-form-item label="行政班级">
                <el-input v-model="updateStudent.className" :disabled="formEditable"></el-input>
              </el-form-item>
              <el-form-item label="学制">
                <el-input-number v-model="updateStudent.educationSystem" :min="1" :max="10"
                                 :disabled="formEditable"></el-input-number>
              </el-form-item>
              <el-form-item label="入学日期">
                <el-date-picker v-model="updateStudent.acceptanceDate" type="date" placeholder="选择日期"
                                :disabled="formEditable"></el-date-picker>
              </el-form-item>
              <el-form-item label="毕业中学">
                <el-input v-model="updateStudent.middleSchool"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input type="email" v-model="updateStudent.email"></el-input>
              </el-form-item>
              <el-form-item label="手机号码">
                <el-input v-model="updateStudent.mobileNo"></el-input>
              </el-form-item>
              <el-form-item label="家庭电话">
                <el-input v-model="updateStudent.familyTelNo"></el-input>
              </el-form-item>
              <el-form-item label="邮政编码">
                <el-input v-model="updateStudent.postcode"></el-input>
              </el-form-item>
              <el-form-item label="乘车区间">
                <el-input v-model="updateStudent.travelRange"></el-input>
              </el-form-item>
              <el-form-item label="家庭住址">
                <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 3}"
                          v-model="updateStudent.address"></el-input>
              </el-form-item>
              <el-form-item label="特长">
                <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}"
                          v-model="updateStudent.skill"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="handleCancel">取消</el-button>
              <el-button type="primary" @click="handleSaveStudent">保存</el-button>
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
  import { getStudentList, saveStudentInfo, findAllActiveStudents, findStudentByConditions, removeStudents } from '@/service/student.service'
  import { getOrganization } from '@/service/organization.service';
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
        studentList: [],
        formEditable: true,
        updateStudent: {
          studentNo: '',
          studentName: '',
          sex: '',
          birthday: '',
          politicalStatus: '',
          nation: '',
          nativePlace: '',
          fromPlace: '',
          idcardNo: '',
          orgName: '',
          department: '',
          major: '',
          majorField: '',
          majorCategories: '',
          cultivateDirection: '',
          className: '',
          educationSystem: '',
          schoolingLength: '',
          acceptanceDate: '',
          middleSchool: '',
          mobileNo: '',
          familyTelNo: '',
          email: '',
          postcode: '',
          travelRange: '',
          address: '',
          skill: '',
          selfDescription: '',
          awards: '',
          schoolStatus: '',
          dqszj: '',
          photoPath: '',
          graduateFlag: '',
          alumniFlag: '',
          createTime: '',
          creator: '',
          password: '',
          parentOrgId: '',
          score: '',
          grade: ''
        },
        searchStudent: {
          studentNo: '',
          studentName: '',
          sex: '',
          politicalStatus: '',
          nation: '',
          orgName: '',
          major: '',
          className: '',
          acceptanceYear: '',
          currentPage: 1,
          pageSize: 20
        },
        dialogTitle: '',
        dialogVisible: false,
        politicalOptions: Constant.POLITICALOPTIONS,
        nationOptions: Constant.NATIONOPTIONS,
        rules: {
          studentNo: [
            {required: true, message: '请输入学号', trigger: ['blur', 'change']}
          ],
          studentName: [
            {required: true, message: '请输入姓名', trigger: ['blur', 'change']}
          ],
          idcardNo: [
            {required: true, message: '请输入身份证号', trigger: ['blur', 'change']}
          ],
          email: [
            {required: true, message: '请输入电子邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入正确的电子邮箱', trigger: ['blur', 'change']}
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: ['blur', 'change']}
          ]
        },
        studentUploadUrl: Constant.STUDENT_UPLOAD_URL,
        fileList: [],
        uploadDialogVisible: false,
        organizationOptionList: [],
        jwtToken: Cookies.get('JWT-TOKEN')
      };
    },
    methods: {
      async callStudentList(pageable) {
        this.$loading({fullscreen: true});
        let students = await getStudentList(pageable);
        this.studentList = students.data.pageResultList;
        this.totalCount = students.data.total;
        this.$loading({fullscreen: true}).close();
      },
      handleSaveStudent() {
        this.$refs.updateForm.validate((valid) => {
          if (!valid) {
            return false;
          } else {
            let idNoReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            if (!idNoReg.test(this.updateStudent.idcardNo)) {
              this.$alert('请输入正确的身份证号码！');
              return false;
            }
            this.saveStudent();
          }
        });
      },
      async saveStudent() {
        this.$loading({fullscreen: true});
        let responseData = await saveStudentInfo(this.updateStudent);
        if (responseData.code === Constant.POPUP_EXCEPTION_CODE && responseData.msg !== '') {
          this.$alert(responseData.msg, {
            confirmButtonText: 'OK'
          });
        } else {
          this.$message.success('数据保存成功！');
          this.dialogVisible = false;
          this.updateStudent = {};
          // refresh data from DB
          // todo 获取页码和页面数量
          this.callStudentList(this.pageable);
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
        this.formEditable = false;
      },
      closeDialog() {
        this.dialogVisible = false;
        this.$refs.updateForm.resetFields();
        this.updateStudent = {};
      },
      showModifyDialog() {
        if (this.multipleSelection.length === 1) {
          this.dialogTitle = '修改';
          this.formEditable = true;
          // deep clone
          this.updateStudent = JSON.parse(JSON.stringify(this.multipleSelection[0]));
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
          let response = await findAllActiveStudents();
          // deep clone
          let studentArray = JSON.parse(JSON.stringify(response.data));
          this.doExport(studentArray);
        }
      },
      doExport (studentArray) {
        require.ensure([], () => {
          const {exportJsonToExcel} = require('@/utils/Export2Excel');
          let tHeader = ['学号', ' 姓名', '性别', '身份证号', '学院名称', '专业名称','专业类别', '行政班级', '出生日期', '政治面貌', '民族', '籍贯', '来源地区',
            '学制', '学习年限', '培育方向', '入学日期', '毕业中学', '邮箱', '联系方式', '家庭电话', '邮政编码', '乘车区间', '家庭地址', '特长'];
          let filterVal = ['studentNo', 'studentName', 'sex', 'idcardNo', 'orgName', 'major', 'majorCategories', 'className', 'birthday', 'politicalStatus', 'nation', 'nativePlace', 'fromPlace',
            'educationSystem', 'schoolingLength', 'cultivateDirection', 'acceptanceDate', 'middleSchool', 'email', 'mobileNo', 'familyTelNo', 'postcode', 'travelRange', 'address', 'skill'];
          let data = this.formatJson(filterVal, studentArray);
          exportJsonToExcel(tHeader, data, '学生表');
        });
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      },
      handleSizeChange(val) {
        // this.pageable.pageSize = val;
        this.searchStudent.pageSize = val;
        this.queryStudent();
      },
      handleCurrentChange(val) {
        this.searchStudent.currentPage = val;
        this.queryStudent();
      },
      handleSelectionChange(value) {
        this.multipleSelection = value;
      },
      handleRowDBClick(row, event) {
        this.dialogTitle = '修改';
        this.formEditable = true;
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
      async queryStudent() {
        this.loadingStatus = true;
        let studentListData = await findStudentByConditions(this.searchStudent);
        this.studentList = studentListData.data.pageResultList;
        this.totalCount = studentListData.data.total;
        this.loadingStatus = false;
      },
      async getOrganizationInfo() {
        let response = await getOrganization();
        this.organizationOptionList = response.data;
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
        let response = await removeStudents(this.multipleSelection);
        if (response.code === Constant.POPUP_EXCEPTION_CODE && response.msg !== '') {
          this.$alert(response.msg, {
            confirmButtonText: 'OK'
          });
        } else {
          this.$message.success('删除成功');
          this.callStudentList(this.pageable);
        }
      }
    },
    created() {
      this.$store.dispatch('commitInformationMenuIndex', 'studentMaintenance');
    },
    mounted() {
      document.title = '学生信息管理';
      this.callStudentList(this.pageable);
      this.getOrganizationInfo();
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
    /*position: fixed;*/
    /*bottom: 40px;*/
  }

  .line {
    width: 1px;
    height: 580px;
    background-color: #e6e6e6;
    margin-left: 20px;
  }

  .search-form {
    bottom: 40px;
  }

  .radio-margin {
    width: 20px;
  }

  .search-btn{
    text-align: center;
    width: 100%;
  }

  @media screen and (max-width: 900px) {
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

  >>>.el-form-item {
    margin-bottom: 16px;
  }

  >>>.el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 40px;
    line-height: 40px;
    /*border-bottom: 2px solid transparent;*/
    color: #909399;
  }

  /*>>>.el-submenu__title {*/
    /*font-size: 14px;*/
    /*color: #303133;*/
    /*padding: 0 20px;*/
    /*cursor: pointer;*/
  /*}*/

  /*>>>.el-menu-item, .el-submenu__title {*/
    /*height: 56px;*/
    /*line-height: 56px;*/
    /*position: relative;*/
    /*-webkit-box-sizing: border-box;*/
    /*white-space: nowrap;*/
    /*list-style: none;*/
  /*}*/

</style>
