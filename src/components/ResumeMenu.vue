<template>
  <el-row class="menu-bar">
    <el-row>
      <el-col :span="3">
        <el-menu class="el-menu-vertical-demo" mode="vertical" @open="handleOpen" @close="handleClose"
                 :default-openeds="resumeSteps" :router="true" :collapse="isCollapse" :default-active="menuIndex"
                 :active="menuIndex"
                 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="#" :disabled="true">
            <i class="el-icon-location"></i>
            <span slot="title">{{userName}}</span>
          </el-menu-item>
          <el-menu-item index="personal">
            <i class="el-icon-menu"></i>
            <span slot="title">个人基本信息</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>简历制作</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="resumeStepOne">简历基本信息</el-menu-item>
              <el-menu-item index="resumeStepTwo">上传简历照片</el-menu-item>
              <!--<el-menu-item index="resumeStepThree">选择模板</el-menu-item>-->
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="resumeStepThree">
            <i class="el-icon-document"></i>
            <span slot="title">导出pdf</span>
          </el-menu-item>
          <el-menu-item index="studentPassword">
            <i class="el-icon-refresh"></i>
            <span slot="title">密码修改</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>

  export default {
    data() {
      return {
        userName: sessionStorage.getItem('user'),
        isCollapse: false,
        menuIndex: '',
        resumeSteps: ['personal', '2', 'export']
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
      // ,
      // handleSelect(key, keyPath) {
      //   console.log(key, keyPath);
      // }
    },
    mounted() {
      this.menuIndex = this.$store.state.menuIndex;
      // let userType = sessionStorage.getItem("userType");
      // if (userType !== 'STUDENT') {
      //   this.$router.push('/404');
      // }
    }
  }
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-height: 800px;
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
    opacity: 0.81;
  }

  /*>>>.el-submenu .el-menu-item {*/
  /*height: 50px;*/
  /*line-height: 50px;*/
  /*padding: 0 45px;*/
  /*!* min-width: 200px; *!*/
  /*}*/

</style>
