<template>
  <el-row class="main-content">
    <el-row>
      <el-col :span="3">
        <CompanyMenu></CompanyMenu>
      </el-col>
      <el-col :span="1">
        <div class="line"></div>
      </el-col>
      <el-col :span="8">
        <el-row class="content-title"><i class="el-icon-success"></i> 会员缴费成功</el-row>
        <el-row>
          您当前已经成缴费<span style="color: #67C23A">{{paymentTotal}}</span>元
        </el-row>
      </el-col>
      <el-col :span="11">
        <img src="@/assets/key.jpg" width="90%" style="position: relative; left: 5%; margin-top: 10%;"/>
      </el-col>
    </el-row>
    <Footer></Footer>
  </el-row>
</template>

<script>
  import Footer from '@/components/Footer';
  import CompanyMenu from '@/components/CompanyMenu';
  import {updateCompanyAfterPayment} from "@/service/company.service";

  export default {
    components: {
      Footer, CompanyMenu
    },
    data() {
      return {
        paymentTotal: '',
        paymentObj: {}
      }
    },
    methods: {
      async updateCompanyInfo() {
        if (this.paymentObj !== null && JSON.stringify(this.paymentObj) !== '{}') {
          // update
          let response = await updateCompanyAfterPayment(this.paymentObj);
          console.log(response)
        }
      }
    },
    created() {
      let paymentObj = sessionStorage.getItem('paymentObj');
      if (paymentObj !== null) {
        this.paymentObj = JSON.parse(paymentObj)
        this.paymentTotal = this.paymentObj.totalFee;
        sessionStorage.removeItem('paymentObj');
      }
    },
    mounted() {
      document.title = '会员缴费成功';
      this.updateCompanyInfo();
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
