<template>
  <div class="main-content">
      <div class="login-form" @keydown.enter="submitForm('userInfoForm')">
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
  import Constant from '@/utils/Constant'
  // import Cookies from "js-cookie";

  export default {
    components: {
      Footer
    },
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
          this.$message.error('请输入用户名');
          return;
        } else if (this.user.password.length === 0) {
          this.$message.error('请输入密码');
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
        let responseData = await checkLoginService(this.user);
        console.log(responseData.data);
        if (responseData.code === Constant.POPUP_EXCEPTION_CODE && responseData.msg !== '') {
          this.$alert(responseData.msg, {
            confirmButtonText: 'OK'
          });
        } else {
          // login success
          // Cookies.set("userType", responseData.data.userType);
          // Cookies.set("user", this.user.employName);
          sessionStorage.setItem("userType", responseData.data.userType);
          sessionStorage.setItem("user", this.user.employName);
          // Cookies.set("password", this.user.password);
          this.$router.push('/studentMaintenance');
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
