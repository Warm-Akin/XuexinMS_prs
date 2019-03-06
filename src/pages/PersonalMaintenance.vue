<template>
  <div class="main-content">
    <div class="content-body">
      <el-row>
        <el-col :span="24">
          <el-col :span="3">
            <Menu></Menu>
          </el-col>
          <el-col :span="1" class="margin-top">
            <div class="line"></div>
          </el-col>
          <el-col :span="20">
            <el-row>
              <el-button type="primary" style="left: 80px; width: 80px;" size="small" @click="handleEdit" :disabled="!relativeDisable">编辑</el-button>
              <el-button type="primary" style="margin-left: 40px; width: 80px;" size="small" @click="handleCancel" :disabled="relativeDisable">取消</el-button>
            </el-row>
            <el-row>&nbsp;</el-row>
            <el-row>
              <el-form label-width="80px" label-position="left" :model="updateStudent" class="dialog-form" ref="updateForm" :rules="rules">
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="学号" prop="studentNo">
                      <el-input v-model="updateStudent.studentNo" :disabled="absoluteDisable"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="9">
                    <el-form-item label="姓名" prop="studentName">
                      <el-input v-model="updateStudent.studentName" :disabled="absoluteDisable"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="身份证号" prop="idcardNo">
                      <el-input v-model="updateStudent.idcardNo" :disabled="absoluteDisable"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="9">
                    <el-form-item label="性别">
                      <el-radio-group v-model="updateStudent.sex" :disabled="absoluteDisable">
                        <el-radio label="男">男</el-radio>
                        <el-radio label="女">女</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="政治面貌">
                      <el-select v-model="updateStudent.politicalStatus" filterable placeholder="请选择" :disabled="absoluteDisable">
                        <el-option v-for="item in politicalOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="9">
                    <el-form-item label="民族">
                      <el-select v-model="updateStudent.nation" filterable placeholder="请选择" :disabled="absoluteDisable">
                        <el-option v-for="item in nationOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="学院名称">
                      <el-input v-model="updateStudent.orgName" :disabled="absoluteDisable"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="9">
                    <el-form-item label="专业名称">
                      <el-input v-model="updateStudent.major" :disabled="absoluteDisable"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--<el-row>-->
                <!--<el-col :span="9">-->
                <!--<el-form-item label="专业类别">-->
                <!--<el-input v-model="updateStudent.majorCategories" :disabled="formEditable"></el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
                <!--</el-row>-->
                <el-row>
                  <!--<el-col :span="9">-->
                  <!--<el-form-item label="培育方向">-->
                  <!--<el-input v-model="updateStudent.cultivateDirection" :disabled="formEditable"></el-input>-->
                  <!--</el-form-item>-->
                  <!--</el-col>-->
                  <el-col :span="9">
                    <el-form-item label="行政班级">
                      <el-input v-model="updateStudent.className" :disabled="absoluteDisable"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="9">
                    <el-form-item label="电子邮箱">
                      <el-input type="email" v-model="updateStudent.email" :disabled="relativeDisable"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--<el-row>-->
                <!--<el-col :span="9">-->
                <!--<el-form-item label="学制">-->
                <!--<el-input-number v-model="updateStudent.educationSystem" :min="1" :max="10"-->
                <!--:disabled="formEditable"></el-input-number>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="1">&nbsp;</el-col>-->
                <!--<el-col :span="9">-->
                <!--<el-form-item label="入学日期">-->
                <!--<el-date-picker v-model="updateStudent.acceptanceDate" type="date" placeholder="选择日期"-->
                <!--:disabled="formEditable"></el-date-picker>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
                <!--</el-row>-->
                <!--<el-row>-->
                <!--<el-col :span="9">-->
                <!--<el-form-item label="毕业中学">-->
                <!--<el-input v-model="updateStudent.middleSchool"></el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->

                <!--</el-row>-->
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="手机号码">
                      <el-input v-model="updateStudent.mobileNo" :disabled="relativeDisable"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="9">
                    <el-form-item label="家庭电话">
                      <el-input v-model="updateStudent.familyTelNo" :disabled="relativeDisable"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--<el-row>-->
                <!--<el-col :span="9">-->
                <!--<el-form-item label="邮政编码">-->
                <!--<el-input v-model="updateStudent.postcode"></el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="1">&nbsp;</el-col>-->
                <!--<el-col :span="9">-->
                <!--<el-form-item label="乘车区间">-->
                <!--<el-input v-model="updateStudent.travelRange"></el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
                <!--</el-row>-->
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="家庭住址">
                      <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" v-model="updateStudent.address" :disabled="relativeDisable"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="9">
                    <el-form-item label="特长">
                      <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" v-model="updateStudent.skill" :disabled="relativeDisable"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="19">
                    <el-form-item label="籍贯">
                      <el-input v-model="updateStudent.nativePlace" :disabled="relativeDisable"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="margin-bottom: 15px;">
                  <!--<el-col :span="9">-->
                  <!--<el-button type="primary" slot="trigger" size="small" plain>选择文件</el-button>-->
                  <el-button type="primary" style="margin-left: 10px;width: 80px;" size="small" @click="handleSave" :disabled="relativeDisable">保存</el-button>
                </el-row>
                <!--<el-row>&nbsp;</el-row>-->
              </el-form>
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
  // import store from '@/store/store';
  // import Cookies from "js-cookie";
  import Constant from '@/utils/Constant';
  import { getStudentInfo, updatePersonalInfo }from '@/service/student.service';

  export default {
    components: {
      Footer, Menu
    },
    data() {
      return {
        absoluteDisable: true,
        relativeDisable: true,
        updateStudent: {
          studentNo: '',
          studentName: '',
          sex: '',
          birthday: '',
          politicalStatus: '',
          nation: '',
          nativePlace: '',
          // fromPlace: '',
          idcardNo: '',
          orgName: '',
          // department: '',
          major: '',
          // majorField: '',
          // majorCategories: '',
          // cultivateDirection: '',
          className: '',
          // schoolingLength: '',
          // acceptanceDate: '',
          // middleSchool: '',
          mobileNo: '',
          familyTelNo: '',
          email: '',
          // postcode: '',
          // travelRange: '',
          address: '',
          // skill: '',
          // selfDescription: '',
          // awards: '',
          // schoolStatus: '',
          // dqszj: '',
          // photopath: '',
          // graduateFlag: '',
          // alumniFlag: '',
          // createTime: '',
          // creator: '',
          // password: '',
          // parentOrgId: '',
          // score: '',
          // grade: ''
        },
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
          ]
        },
        politicalOptions: Constant.POLITICALOPTIONS,
        nationOptions: Constant.NATIONOPTIONS,
      }
    },
    methods: {
      handleEdit() {
        this.relativeDisable = false;
      },
      handleCancel() {
        this.relativeDisable = true;
      },
      async handleSave() {
        let response = await updatePersonalInfo(this.updateStudent);
        if (response.code === Constant.POPUP_EXCEPTION_CODE && response.msg !== '') {
          this.$alert(response.msg, {
            confirmButtonText: 'OK'
          });
        } else {
          this.$message.success('数据更新成功！');
          this.$loading({fullscreen: true});
          this.getUserInformation(this.updateStudent.studentNo);
          this.$loading({fullscreen: true}).close();
        }
        this.relativeDisable = true;
      },
      init() {
        // let userName = Cookies.get("user");
        // let userType = Cookies.get("userType");
        let userName = sessionStorage.getItem("user");
        let userType = sessionStorage.getItem("userType");
        if (userType !== '1') {
          // todo
          // access deny page
          this.$router.push('/login');
        } else {
          // init student Information
          this.getUserInformation(userName);
        }
      },
      async getUserInformation (userName) {
        let response = await getStudentInfo(userName);
        this.updateStudent = response.data;
      }
    },
  created() {
    this.$store.dispatch('commitMenuIndex', 'personal');
  },
    mounted() {
      document.title = '个人信息';
      this.init();
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
    margin: 0;
    padding: 0;
    overflow-y: scroll;
    clear: both;
  }

  .content-body {
    position: relative;
    margin-top: 10px;
    width: 100%;
  }

  /*.margin-top {*/
    /*margin-top: 20px;*/
  /*}*/

  .line {
    width: 1px;
    height: 700px;
    background-color: #e6e6e6;
    margin-left: 10px;
  }

</style>
