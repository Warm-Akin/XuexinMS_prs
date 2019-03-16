<template>
  <div class="main-content" id="main-content">
    <div class="content-body">
      <el-row>
        <el-col :span="24">
          <el-col :span="3">
            <Menu></Menu>
          </el-col>
          <el-col :span="1">
            <div class="line"></div>
          </el-col>
          <el-col :span="20">
            <!--<el-row>-->
            <!--<el-button type="primary" style="left: 80px; width: 80px;" size="small" @click="handleEdit" :disabled="!relativeDisable">编辑</el-button>-->
            <!--<el-button type="primary" style="margin-left: 40px; width: 80px;" size="small" @click="handleCancel" :disabled="relativeDisable">取消</el-button>-->
            <!--</el-row>-->
            <el-row>&nbsp;</el-row>
            <el-row>
              <el-form label-width="85px" label-position="left" :model="studentResume" class="dialog-form" ref="updateForm" :rules="rules">
                <el-row>
                  <el-col :span="19">
                    <el-form-item label="求职意向" prop="jobWant">
                      <el-input v-model="studentResume.jobWant"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="姓名" prop="studentName">
                      <el-input v-model="studentResume.studentName" :disabled="absoluteDisable"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="9">
                    <el-form-item label="电话" prop="mobileNo">
                      <el-input v-model="studentResume.mobileNo"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="专业" prop="major">
                      <el-input v-model="studentResume.major" :disabled="absoluteDisable"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="9">
                    <el-form-item label="电子邮箱" prop="email">
                      <el-input type="email" v-model="studentResume.email"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="19">
                    <el-form-item label="毕业院校" prop="schoolName">
                      <el-input v-model="studentResume.schoolName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="19">
                    <el-form-item label="教育/培训" prop="majorInfo">
                      <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="studentResume.majorInfo"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="英语能力" prop="englishLevel">
                      <el-input v-model="studentResume.englishLevel"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="9">
                    <el-form-item label="软件能力" prop="softwareSkills">
                      <el-input v-model="studentResume.softwareSkills"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="height: 45px;">
                  <el-tag>工作/社会经验</el-tag>
                </el-row>
                <el-row>
                  <el-col :span="19">
                    <el-form-item label="1、经历">
                      <el-input v-model="studentResume.skillOne"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="19">
                    <el-form-item label="1、描述">
                      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}"
                                v-model="studentResume.oneInfo"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="19">
                    <el-form-item label="2、经历">
                      <el-input v-model="studentResume.skillTwo"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="19">
                    <el-form-item label="2、描述">
                      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}"
                                v-model="studentResume.twoInfo"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="19">
                    <el-form-item label="3、经历">
                      <el-input v-model="studentResume.skillThree"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="19">
                    <el-form-item label="3、描述">
                      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}"
                                v-model="studentResume.threeInfo"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row style="margin-bottom: 50px;">
                  <el-button type="primary" style="margin-left: 10px;width: 80px;" size="small" @click="handleSave">保存</el-button>
                </el-row>
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
  import Constant from '@/utils/Constant';
  import { getUserResumeInfo } from '@/service/student.service';
  import { saveResumeInfo } from '@/service/studentResume.service';

  export default {
    components: {
      Footer, Menu
    },
    data() {
      return {
        userName: '',
        absoluteDisable: true,
        studentResume: {
          jobWant: '',
          studentName: '',
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
          jobWant: [
            {required: true, message: '请输入求职意向', trigger: ['blur', 'change']}
          ],
          studentName: [
            {required: true, message: '请输入姓名', trigger: ['blur', 'change']}
          ],
          mobileNo: [
            {required: true, message: '请输入手机号码', trigger: ['blur', 'change']}
          ],
          email: [
            {required: true, message: '请输入电子邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入正确的电子邮箱', trigger: ['blur', 'change']}
          ],
          major: [
            {required: true, message: '请输入专业名称', trigger: ['blur', 'change']}
          ],
          schoolName: [
            {required: true, message: '请输入学校名称', trigger: ['blur', 'change']}
          ],
          majorInfo: [
            {required: true, message: '请输入教育/培训信息', trigger: ['blur', 'change']}
          ],
          englishLevel: [
            {required: true, message: '请输入英语水平信息', trigger: ['blur', 'change']}
          ],
          softwareSkills: [
            {required: true, message: '请输入软件能力信息', trigger: ['blur', 'change']}
          ],
          schoolName: [
            {required: true, message: '请输入学校名称', trigger: ['blur', 'change']}
          ]
          // ,
          // schoolName: [
          //   {required: true, message: '请输入学校名称', trigger: ['blur', 'change']}
          // ],
          // schoolName: [
          //   {required: true, message: '请输入学校名称', trigger: ['blur', 'change']}
          // ],
          // schoolName: [
          //   {required: true, message: '请输入学校名称', trigger: ['blur', 'change']}
          // ]
        },
        politicalOptions: Constant.POLITICALOPTIONS,
        nationOptions: Constant.NATIONOPTIONS,
      }
    },
    methods: {
      // handleEdit() {
      //   this.relativeDisable = false;
      // },
      // handleCancel() {
      //   this.relativeDisable = true;
      // },
      async handleSave() {
        this.$refs.updateForm.validate((valid) => {
          if (!valid) {
            return false;
          } else {
            this.callSaveInfo();
          }
        });

        // this.relativeDisable = true;
      },
      async callSaveInfo() {
        let response = await saveResumeInfo(this.studentResume);
        if (response.code === Constant.POPUP_EXCEPTION_CODE && response.msg !== '') {
          this.$alert(response.msg, {
            confirmButtonText: 'OK'
          });
        } else {
          this.$message.success('数据保存成功！');
          this.$loading({fullscreen: true});
          this.getUserResume(this.studentResume.studentNo);
          this.$loading({fullscreen: true}).close();
        }
      },
      init() {
        // init student Information
        this.getUserResume(this.userName);
      },
      async getUserResume(userName) {
        let response = await getUserResumeInfo(userName);
        this.studentResume = response.data;
      }
    },
    created() {
      this.$store.dispatch('commitMenuIndex', 'resumeStepOne');
      this.userName = sessionStorage.getItem('user');
    },
    mounted() {
      document.title = '简历基本信息';
      // let width = document.body.clientWidth - 200;
      // console.log('width', width);
      // // $(".main-content").css('width', width + 'px');
      // document.getElementById('main-content').style.width = width + 'px';
      this.init();
    }
  }
</script>

<style scoped>

  .main-content {
    position: fixed;
    top: 0;
    /*margin-bottom: 35px;*/
    left: 200px;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    /*overflow-x:hidden;*/
    /*margin: 0;*/
    padding: 0;
    clear: both;
  }

  .content-body {
    position: relative;
    width: 100%;
  }

  .line {
    position: relative;
    width: 1px;
    height: 985px;
    background-color: #e6e6e6;
    margin-left: 5px;
    margin-top: 10px;
  }

</style>
