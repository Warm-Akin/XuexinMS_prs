<template>
  <el-row class="main-content">
    <el-row>
      <el-col :span="3">
        <CompanyMenu></CompanyMenu>
      </el-col>
      <el-col :span="1">
        <div class="line"></div>
      </el-col>
      <el-col :span="20">
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
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding: 0;
    clear: both;
    border: 2px solid red;
  }

  .line {
    width: 1px;
    height: 700px;
    background-color: #e6e6e6;
    margin-left: 10px;
  }
</style>
