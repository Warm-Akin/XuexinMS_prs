<template>
  <div class="main-content">
      <div class="login-form" @keydown.enter="submitForm('userInfoForm')">
        <el-form :model="user" ref="userInfoForm" label-width="100px">
          <el-form-item label="用户名" class="label-region">
            <el-input type="text" v-model="user.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" class="label-region">
            <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('userInfoForm')" class="btn-margin">登录</el-button>
            <el-button @click="resetForm('userInfoForm')" class="btn-margin">重置</el-button>
          </el-form-item>
        </el-form>
        <el-row class="register-button">
          <el-button size="small" class="btn-register" @click="gotoRegister">企业注册</el-button>
        </el-row>
      </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from '@/components/Footer.vue';
  import {checkLoginService} from '@/service/user.service';
  import { RSAEncrypt } from '@/utils/jsencryptKey';

  export default {
    components: {
      Footer
    },
    data () {
      return {
        user: {
          userName: '',
          password: ''
        }
      };
    },
    methods: {
      submitForm (formName) {
        if (this.user.userName.length === 0 ) {
          this.$message.error('请输入用户名');
          return;
        } else if (this.user.password.length === 0) {
          this.$message.error('请输入密码');
          return;
        } else {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // submit login information
              this.check();
            } else {
              return false;
            }
          });
        }
      },
      resetForm (formName) {
        // this.$refs[formName].resetFields();
        this.user = {
          userName: '',
          password: ''
        };
      },
      async check () {
        let login = JSON.parse(JSON.stringify(this.user));
        login.userName = RSAEncrypt(login.userName);
        login.password = RSAEncrypt(login.password);
        let response = await checkLoginService(login);
        if (response.data.code === 'ERROR' && response.data.msg !== '') {
          this.$message.error(response.data.msg);
          return;
        } else {
          // login success
          let userType = response.data.data.accessToken['claims']['scopes'][0];
          sessionStorage.setItem("userType", userType);
          sessionStorage.setItem("user", this.user.userName);
          if (userType === 'ROLE_STUDENT') {
            this.$router.push('/personal');
          } else if (userType === 'ROLE_COMPANY') {
            this.$router.push('/companyBasic');
          } else if (userType == 'ROLE_ADMIN') {
            this.$router.push('/adminEntrance');
          }
        }
      },
      gotoRegister() {
        this.$router.push('/register');
      }
    },
    mounted() {
      document.title = "登录";
    }
  }
</script>

<style scoped>
  .main-content {
    background-image: url("../assets/Keyboard.jpg");
    background-size: cover;
    background-position: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .login-form {
    width: 40%;
    position: relative;
    margin-left: 28%;
    top: 30%;
    background: black;
    opacity: 0.75;
    padding: 2% 5% 1% 0;
    border-radius: 10px;
  }

  .btn-margin {
    width: 45%;
    margin-left: 3%;
  }

  .register-button {
    position: relative;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
    right: 0;
    right: -10%;
  }

  .btn-register {
    border: 0;
    background: #000000;
    color: white;
  }

  .btn-register :hover {
    color: #409EFF;
    font-weight: bolder;
  }

  /*.decoration {*/
    /*background: gray;*/
    /*opacity: 0.75;*/
  /*}*/

  >>> .el-form-item__label {
    color: #FFFFFF;
  }
</style>
