<template>
  <el-row class="main-content">
    <el-row>
      <el-col :span="3">
        <Menu></Menu>
      </el-col>
      <el-col :span="1">
        <div class="line"></div>
      </el-col>
      <el-col :span="20">
        <el-row class="content-title"><i class="el-icon-edit"></i> 修改登录密码</el-row>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-form label-position="left" :model="pwdObject" class="dialog-form" ref="updateForm" :rules="rules">
                <el-row>
                  <el-form-item label="原密码" prop="originalPassword">
                    <el-input type="password" v-model="pwdObject.originalPassword"
                              onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"></el-input>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="新密码" prop="newPassword">
                    <el-input type="password" v-model="pwdObject.newPassword"
                              onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"></el-input>
                  </el-form-item>
                </el-row>
              </el-form>
            </el-row>
            <el-row>
              <el-button type="primary" style="width: 80px;" size="small" @click="handleSave">保存</el-button>
            </el-row>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="11">
            <img src="@/assets/Lock.jpg" width="65%" style="position: relative; left: 10%;"/>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <Footer></Footer>
  </el-row>
</template>

<script>
  import Footer from '@/components/Footer';
  import Menu from '@/components/ResumeMenu.vue';
  import Constant from '@/utils/Constant';
  import {updateStudentPwd} from '@/service/student.service'

  export default {
    components: {
      Footer, Menu
    },
    data() {
      return {
        pwdObject: {
          originalPassword: '',
          newPassword: ''
        },
        rules: {
          originalPassword: [
            {required: true, message: '请输入原密码', trigger: ['blur', 'change']}
          ],
          newPassword: [
            {required: true, message: '请输入新密码', trigger: ['blur', 'change']}
          ]
        }
      }
    },
    methods: {
      handleSave() {
        this.$refs.updateForm.validate((valid) => {
          if (!valid) {
            this.$message.error('您的输入有误，请检查后重试');
            return false;
          } else {
            // 更新密码
            this.updatePassword(this.pwdObject);
          }
        });
      },
      async updatePassword(param) {
        this.$loading({fullscreen: true});
        let response = await updateStudentPwd(param);
        if (response.code === Constant.POPUP_EXCEPTION_CODE && response.msg !== '') {
          this.$alert(response.msg, {
            confirmButtonText: 'OK'
          });
        } else {
          this.$refs.updateForm.resetFields();
          this.$message.success('数据更新成功！');
          this.pwdObject = {
            userName: '',
            originalPassword: '',
            newPassword: ''
          };
        }
        this.$loading({fullscreen: true}).close();
      }
    },
    created() {
      this.$store.dispatch('commitCompanyMenuIndex', 'companyPassword');
    },
    mounted() {
      document.title = '修改密码';
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
    overflow-y: scroll;
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
    margin-top: 1%;
    font-weight: bold;
    line-height: 40px;
    margin-bottom: 5px;
  }
</style>
