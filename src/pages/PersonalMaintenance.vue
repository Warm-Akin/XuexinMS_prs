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
              <el-button type="primary" style="left: 80px; width: 80px;" size="small" @click="handleEdit"
                         :disabled="!relativeDisable">编辑
              </el-button>
              <el-button type="primary" style="margin-left: 40px; width: 80px;" size="small" @click="handleCancel"
                         :disabled="relativeDisable">取消
              </el-button>
            </el-row>
            <el-row>&nbsp;</el-row>
            <el-row>
              <el-form label-width="80px" label-position="left" :model="updateStudent" class="dialog-form"
                       ref="updateForm" :rules="rules">
                <el-row>
                  <!--3行 右侧作为图片区域-->
                  <el-col :span="9">
                    <el-row>
                      <el-col>
                        <el-form-item label="姓名" prop="studentName">
                          <el-input v-model="updateStudent.studentName" :disabled="absoluteDisable"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <el-form-item label="学号" prop="studentNo">
                          <el-input v-model="updateStudent.studentNo" :disabled="absoluteDisable"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <el-form-item label="政治面貌">
                          <el-select v-model="updateStudent.politicalStatus" filterable placeholder="请选择"
                                     :disabled="absoluteDisable">
                            <el-option v-for="item in politicalOptions" :key="item.value" :label="item.label"
                                       :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <el-form-item label="学院名称">
                          <el-input v-model="updateStudent.orgName" :disabled="absoluteDisable"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="1">
                    <el-row>&nbsp;</el-row>
                  </el-col>
                  <el-col :span="9">
                    <el-row>
                      <el-col>
                        <el-form-item label="性别">
                          <el-radio-group v-model="updateStudent.sex" :disabled="absoluteDisable">
                            <el-radio label="男">男</el-radio>
                            <el-radio label="女">女</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <el-form-item label="身份证号" prop="idcardNo">
                          <el-input v-model="updateStudent.idcardNo" :disabled="absoluteDisable" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <el-form-item label="民族">
                          <el-select v-model="updateStudent.nation" filterable placeholder="请选择"
                                     :disabled="absoluteDisable">
                            <el-option v-for="item in nationOptions" :key="item.name" :label="item.name"
                                       :value="item.name"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <el-form-item label="专业名称">
                          <el-input v-model="updateStudent.major" :disabled="absoluteDisable"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="1">
                    <el-row>&nbsp;</el-row>
                  </el-col>
                  <el-col :span="2">
                    <img v-if="imageUrl" :src="imageUrl" class="photo-avatar">
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
                    <el-form-item label="电子邮箱" prop="email">
                      <el-input type="email" v-model="updateStudent.email" :disabled="relativeDisable" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"></el-input>
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
                      <el-input v-model="updateStudent.mobileNo" :disabled="relativeDisable" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="9">
                    <el-form-item label="家庭电话">
                      <el-input v-model="updateStudent.familyTelNo" :disabled="relativeDisable" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"></el-input>
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
                      <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" v-model="updateStudent.address"
                                :disabled="relativeDisable"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1">&nbsp;</el-col>
                  <el-col :span="9">
                    <el-form-item label="特长">
                      <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" v-model="updateStudent.skill"
                                :disabled="relativeDisable"></el-input>
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
                  <el-button type="primary" style="margin-left: 10px;width: 80px;" size="small" @click="handleSave"
                             :disabled="relativeDisable">保存
                  </el-button>
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
  import {getStudentInfo, updatePersonalInfo} from '@/service/student.service';
  import axios from 'axios';

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
          // photoPath: '',
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
        imageUrl: '',
        studentNo: ''
      }
    },
    methods: {
      handleEdit() {
        this.relativeDisable = false;
      },
      handleCancel() {
        this.relativeDisable = true;
        // reload the user data
        this.init();
        this.initImage();
      },
      handleSave() {
        this.$refs.updateForm.validate((valid) => {
          if (!valid) {
            return false;
          } else {
            let idNoReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            if (!idNoReg.test(this.updateStudent.idcardNo)) {
              this.$alert('请输入正确的身份证号码');
              return false;
            }
            let phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
            if (!phoneReg.test(this.updateStudent.mobileNo)) {
              this.$alert('请输入正确的手机号码');
              return false;
            }
            this.saveStudentInfo();
          }
        });
      },
      async saveStudentInfo() {
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
        let userName = sessionStorage.getItem("user");
        this.studentNo = userName;
        this.getUserInformation(userName);
      },
      async getUserInformation(userName) {
        let response = await getStudentInfo(userName);
        this.updateStudent = response.data;
      },
      initImage() {
        axios.get(`/xuexin/security/student/resume/findImageByStudentNo/${this.studentNo}`, {responseType: 'arraybuffer'}).then(response => {
          let bytes = new Uint8Array(response.data);
          if (bytes.length > 0) {
            let blob = new Blob([bytes], {type: "image/jpeg"});
            let url = URL.createObjectURL(blob);
            this.imageUrl = url;
          }
        });
      }
    },
    created() {
      this.$store.dispatch('commitMenuIndex', 'personal');
    },
    mounted() {
      document.title = '个人信息';
      this.init();
      this.initImage();
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

  .line {
    width: 1px;
    height: 700px;
    background-color: #e6e6e6;
    margin-left: 10px;
  }

  .photo-avatar {
    position: relative;
    width: 140px;
    height: 190px;
    display: block;
  }

</style>
