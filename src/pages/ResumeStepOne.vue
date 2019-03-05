<template>
  <div class="main-content">
    <el-row>
      <el-col :span="24">
        <el-col :span="3">
          <Menu></Menu>
        </el-col>
        <el-col :span="1">
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
                <el-col :span="19">
                  <el-form-item label="求职意向">
                    <el-input v-model="updateStudent.jobWant"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="9">
                  <el-form-item label="姓名">
                    <el-input v-model="updateStudent.studentName" :disabled="absoluteDisable"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="9">
                  <el-form-item label="电话">
                    <el-input v-model="updateStudent.mobileNo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="9">
                  <el-form-item label="专业">
                    <el-input v-model="updateStudent.major"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="9">
                  <el-form-item label="电子邮箱">
                    <el-input type="email" v-model="updateStudent.email"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="19">
                  <el-form-item label="毕业院校">
                    <el-input v-model="updateStudent.schoolName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="19">
                  <el-form-item label="教育/培训">
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="updateStudent.majorInfo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="9">
                  <el-form-item label="英语能力">
                    <el-input v-model="updateStudent.englishLevel"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="9">
                  <el-form-item label="软件能力">
                    <el-input v-model="updateStudent.softwareSkills"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row style="height: 45px;">
                  <el-tag>工作/社会经验</el-tag>
              </el-row>
              <el-row>
                <el-col :span="19">
                  <el-form-item label="1、经历">
                    <el-input v-model="updateStudent.skillOne"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="19">
                  <el-form-item label="1、描述">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="updateStudent.oneInfo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="19">
                  <el-form-item label="2、经历">
                    <el-input v-model="updateStudent.skillTwo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="19">
                  <el-form-item label="2、描述">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="updateStudent.twoInfo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="19">
                  <el-form-item label="3、经历">
                    <el-input v-model="updateStudent.skillThree"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="19">
                  <el-form-item label="3、描述">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="updateStudent.threeInfo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row style="margin-bottom: 40px;">
                <el-button type="primary" style="margin-left: 10px;width: 80px;" size="small" @click="handleSave" :disabled="relativeDisable">保存</el-button>
              </el-row>
            </el-form>
          </el-row>
        </el-col>
      </el-col>
    </el-row>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from '@/components/Footer.vue';
  import Menu from '@/components/ResumeMenu.vue';
  import Constant from '@/utils/Constant';
  import { getUserResumeInfo }from '@/service/student.service';

  export default {
    components: {
      Footer, Menu
    },
    data() {
      return {
        userName: '',
        absoluteDisable: true,
        relativeDisable: true,
        updateStudent: {
          jobWant: '',
          studentName: '',
          nation: '',
          nativePlace: '',
          orgName: '',
          schoolName: '北京理工大学珠海学院',
          major: '',
          majorInfo: '',
          englishLevel: '',
          softwareSkills: '',
          mobileNo: '',
          email: '',
          skillOne: '',
          oneInfo: '',
          skillTwo: '',
          twoInfo: '',
          skillThree: '',
          threeInfo: ''
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
        // let response = await updatePersonalInfo(this.updateStudent);
        // if (response.code === Constant.POPUP_EXCEPTION_CODE && response.msg !== '') {
        //   this.$alert(response.msg, {
        //     confirmButtonText: 'OK'
        //   });
        // } else {
        //   this.$message.success('数据更新成功！');
        //   this.$loading({fullscreen: true});
        //   this.getUserInformation(this.updateStudent.studentNo);
        //   this.$loading({fullscreen: true}).close();
        // }
        // this.relativeDisable = true;
      },
      init() {
        // init student Information
        this.getUserResume(this.userName);
      },
      async getUserResume (userName) {
        let response = await getUserResumeInfo(userName);
        this.updateStudent = response.data;
        console.log(this.updateStudent);
      }
    },
  created() {
    this.$store.dispatch('commitMenuIndex', 'resumeStepOne');
    this.userName = sessionStorage.getItem('user');
  },
    mounted() {
      document.title = '步骤一';
      this.init();
    }
  }
</script>

<style scoped>

  .main-content {
    position: relative;
    top: 0;
    left: 200px;
    margin: 0;
    padding: 0;
    clear: both;
  }

  .line {
    position: relative;
    width: 1px;
    height: 985px;
    background-color: #e6e6e6;
    margin-left: 5px;
  }

</style>
