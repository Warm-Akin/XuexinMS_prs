<template>
  <el-row>
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" :router="true">
      <el-submenu index="1">
        <template slot="title">基础信息</template>
        <el-menu-item index="studentMaintenance">学生基本信息</el-menu-item>
        <el-menu-item index="teacherMaintenance">教师基本信息</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">学生在校学习情况</template>
        <el-menu-item index="courseMaintenance">课程基本信息</el-menu-item>
        <el-menu-item index="studentCourseScoreDetail">学生选课及成绩详情</el-menu-item>
        <!--<el-menu-item index="">学生成绩详情</el-menu-item>-->
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">系统管理中心</template>
        <el-menu-item index="organizationMaintenance">组织机构管理</el-menu-item>
        <el-menu-item index="userMaintenance">用户信息控制中心</el-menu-item>
        <!--<el-menu-item index="">修改密码</el-menu-item>-->
      </el-submenu>
    </el-menu>
  </el-row>
</template>

<script>
  export default {
    name: "information-menu",
    data() {
      return {
        activeIndex: '',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    mounted() {
      this.activeIndex = this.$store.state.informationMenuIndex;
    }
  }
</script>

<style scoped>
  >>>.el-menu{
    padding: 0;
    margin: 0;
    /*height: 40px;*/
  }

  /*>>>.el-menu--horizontal>.el-submenu .el-submenu__title {*/
    /*height: 50px;*/
    /*line-height: 30px;*/
    /*border-bottom: 2px solid transparent;*/
    /*color: #909399;*/
  /*}*/

</style>
