<template>
  <el-row class="menu-bar">
    <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
             :router="true" :default-active="menuRouter">
      <el-menu-item index="#" :disabled="true">
        <i class="el-icon-location"></i>
        <span slot="title">{{userName}}</span>
      </el-menu-item>
      <el-menu-item index="companyMaintenance">
        <i class="el-icon-document"></i>
        <span slot="title">企业信息管理</span>
      </el-menu-item>
      <!--todo 修改路径-->
      <el-menu-item index="resumeMaintenance">
        <i class="el-icon-search"></i>
        <span slot="title">学生简历</span>
      </el-menu-item>
      <el-menu-item index="resumePdfMaintenance">
        <i class="el-icon-setting"></i>
        <span slot="title">简历模板管理</span>
      </el-menu-item>
      <!--todo modify the component-->
      <el-menu-item index="resetPassword">
        <i class="el-icon-message"></i>
        <span slot="title">修改密码</span>
      </el-menu-item>
    </el-menu>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        menuRouter: '',
        userName: sessionStorage.getItem('user')
      }
    },
    mounted() {
      this.menuRouter = this.$store.state.adminMenuIndex;
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
    opacity: 0.8;
  }
</style>
