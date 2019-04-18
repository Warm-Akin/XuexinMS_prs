<template>
  <el-row class="menu-bar">
    <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
             :router="true" :default-active="menuRouter">
      <el-menu-item index="" :disabled="true">
        <i class="el-icon-location"></i>
        <span slot="title">{{userName}}</span>
      </el-menu-item>
      <el-menu-item index="companyBasic">
        <i class="el-icon-document"></i>
        <span slot="title">公司基本信息</span>
      </el-menu-item>
      <el-menu-item index="showResume">
        <i class="el-icon-search"></i>
        <span slot="title">查看学生简历</span>
      </el-menu-item>
      <el-menu-item index="companyPayment">
        <i class="el-icon-setting"></i>
        <span slot="title">会员缴费</span>
      </el-menu-item>
      <el-menu-item index="companyPassword">
        <i class="el-icon-message"></i>
        <span slot="title">修改密码</span>
      </el-menu-item>
    </el-menu>
  </el-row>
</template>

<script>
  import {checkCompanyUser} from '@/service/company.service';

  export default {
    data() {
      return {
        menuRouter: '',
        userName: sessionStorage.getItem('user')
      }
    },
    methods: {
      // todo forbidden from security
      async checkUserInfo() {
        let response = await checkCompanyUser(this.userName);
        let userType = response.data;
        if (userType === '' || userType !== 'ROLE_COMPANY') {
          this.$message.error('您暂无权限访问该页面');
          this.$router.push('/login');
        }
      }
    },
    mounted() {
      this.menuRouter = this.$store.state.companyMenuIndex;
      this.checkUserInfo();
    }
  }
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-height: 730px;
    width: 200px;
  }
</style>

<style scoped>

  .menu-bar {
    background-color: #545c64;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
  }

  >>>.el-menu-item.is-disabled {
    opacity: 1;
  }
</style>
