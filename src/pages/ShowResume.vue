<template>
  <el-row class="main-content">
    <CompanyMenu></CompanyMenu>
    <el-row>
      <el-col :span="1">
        <div class="line"></div>
      </el-col>
      <el-col :span="23" class="data-content">
        <el-row class="content-title"><i class="el-icon-document"></i> 学生简历列表</el-row>
        主要内容
      </el-col>
    </el-row>
    <Footer></Footer>
  </el-row>
</template>

<script>
  import Footer from '@/components/Footer';
  import CompanyMenu from '@/components/CompanyMenu';

  export default {
    components: {
      Footer, CompanyMenu
    },
    // data() {
    //
    // },
    // methods: {
    //
    // },
    created() {
      this.$store.dispatch('commitCompanyMenuIndex', 'showResume');
    },
    mounted() {
      document.title = '学生简历';
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
    overflow-y: auto;
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
    font-weight: bold;
    line-height: 40px;
    margin-bottom: 5px;
  }

  .data-content {
    margin-top: 1%;
  }
</style>
