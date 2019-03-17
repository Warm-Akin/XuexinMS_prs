<template>
  <el-row>
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title">基础信息</template>
        <el-menu-item index="1-1">学生基本信息</el-menu-item>
        <el-menu-item index="1-2">教师基本信息</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">学生在校学习情况</template>
        <el-menu-item index="2-1">课程基本信息</el-menu-item>
        <el-menu-item index="2-2">学生选课详情</el-menu-item>
        <el-menu-item index="2-3">学生成绩详情</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">系统管理中心</template>
        <el-menu-item index="3-1">权限控制中心</el-menu-item>
        <el-menu-item index="3-2">修改密码</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-row>
</template>

<script>
  export default {
    name: "information-menu",
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
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
