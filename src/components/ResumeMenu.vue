<template>
  <el-row class="menu-bar">
    <el-col :span="3">
      <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
               background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">个人基本信息</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>简历制作</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">步骤一</el-menu-item>
            <el-menu-item index="1-2">步骤二</el-menu-item>
            <el-menu-item index="1-3">步骤三</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导出pdf</span>
        </el-menu-item>
        <!--<el-menu-item index="4">-->
          <!--<i class="el-icon-setting"></i>-->
          <!--<span slot="title">导航四</span>-->
        <!--</el-menu-item>-->
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    /*width: 200px;*/
    min-height: 800px;
    width: 200px;
    /*height: calc(100vw / 750 * 230);*/
    /*height: -moz-calc(100vw / 750 * 230);*/
    /*height: -webkit-calc(100vw / 750 * 230);*/
  }
</style>

<style scoped>

  /*>>>.el-submenu .el-menu-item {*/
    /*height: 50px;*/
    /*line-height: 50px;*/
    /*padding: 0 45px;*/
    /*!* min-width: 200px; *!*/
  /*}*/


</style>
