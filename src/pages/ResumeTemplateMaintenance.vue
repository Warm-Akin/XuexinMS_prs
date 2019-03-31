<template>
  <el-row class="main-content">
    <el-row>
      <el-col :span="3">
        <AdminMenu></AdminMenu>
      </el-col>
      <el-col :span="1">
        <div class="line"></div>
      </el-col>
      <el-col :span="20">
        <el-row class="content-title"><i class="el-icon-picture"></i> 简历模板管理</el-row>
      </el-col>
    </el-row>
    <Footer></Footer>
  </el-row>
</template>

<script>
  import Footer from '@/components/Footer';
  import AdminMenu from '@/components/AdminMenu';

  export default {
    components: {
      Footer, AdminMenu
    },
    data() {
      return {
      }
    },
    methods: {
    },
    created() {
      this.$store.dispatch('commitAdminMenuIndex', 'resumeTemplateMaintenance');
    },
    mounted() {
      document.title = '简历模板管理';
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
