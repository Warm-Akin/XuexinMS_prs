<template>
  <el-row class="main-content">
    <el-row>
      <el-col :span="3">
        <CompanyMenu></CompanyMenu>
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
                  <el-col>
                    <el-form-item label="原密码" prop="originalPassword">
                      <el-input type="password" v-model="pwdObject.originalPassword" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item label="新密码" prop="newPassword">
                      <el-input type="password" v-model="pwdObject.newPassword" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"></el-input>
                    </el-form-item>
                  </el-col>
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
  import CompanyMenu from '@/components/CompanyMenu';
  import PaymentContent from '@/components/PaymentContent';

  export default {
    components: {
      Footer, CompanyMenu, PaymentContent
    },
    data() {
      return {
        pwdObject: {
          originalPassword: '',
          newPassword: ''
        },
        rules: {
          originalPassword:  [
            { required: true, message: '请输入原密码', trigger: ['blur', 'change']}
          ],
          newPassword: [
            { required: true, message: '请输入新密码', trigger: ['blur', 'change']}
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
            // todo 更新密码
            this.$message.success('保存成功');
          }
        });
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
