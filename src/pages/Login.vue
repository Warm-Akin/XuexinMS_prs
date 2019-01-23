<template>
  <div class="main-content">
    <div class="login-form">
      <el-form :model="user" ref="userInfoForm" label-width="100px">
        <el-form-item label="用户名" class="label-region">
          <el-input type="text" v-model="user.employName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" class="label-region">
          <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userInfoForm')" class="btn-margin">登录</el-button>
          <el-button @click="resetForm('userInfoForm')" class="btn-margin">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {checkLoginService} from '@/service/user.service';

  export default {
    data () {
      return {
        user: {
          employName: '',
          password: ''
        }
      };
    },
    methods: {
      submitForm (formName) {
        if (this.user.employName.length === 0 ) {
          this.$message.error('请输入用户名！');
          return;
        } else if (this.user.password.length === 0) {
          this.$message.error('请输入密码！');
          return;
        } else {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // submit login information
              let loginResult = this.check();
              console.log(loginResult);
            } else {
              return false;
            }
          });
        }
      },
      resetForm (formName) {
        // this.$refs[formName].resetFields();
        this.user = {
          employName: '',
          password: ''
        };
      },
      async check () {
        let result = await checkLoginService(this.user);
        return result.data;
      }
    },
    mounted() {
      document.title = "登录";
    }
  }
</script>

<style scoped>
  .main-content {
    margin: 0;
    padding: 0;
    background-image: url("../assets/computer.jpg");
    background-size: cover;
    background-position: center;
    position: relative;
    width: 100%;
    height: 715px;
  }

  .login-form {
    width: 40%;
    position: relative;
    margin-left: 30%;
    top: 30%;
  }

  .btn-margin {
    width: 45%;
    margin-left: 3%;
  }

  >>> .el-form-item__label {
    color: #FFFFFF;
  }
</style>
