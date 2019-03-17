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
        <el-row class="content-title"><i class="el-icon-success"></i> 会员缴费项目</el-row>
        <PaymentContent></PaymentContent>
      </el-col>
    </el-row>
    <Footer></Footer>
  </el-row>
</template>

<script>
  import Footer from '@/components/Footer';
  import CompanyMenu from '@/components/CompanyMenu';
  import PaymentContent from '@/components/PaymentContent';

  export default {
    components: {
      Footer, CompanyMenu, PaymentContent
    },
    // data() {
    //
    // },
    // methods: {
    //
    // },
    created() {
      this.$store.dispatch('commitCompanyMenuIndex', 'companyPayment');
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
