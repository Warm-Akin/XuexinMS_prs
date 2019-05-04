<template>
  <el-row>
    <el-col :span="8" class="picture-region">
      <img src="@/assets/Payment.jpg" class="picture"/>
    </el-col>
    <el-col :span="15">
      <el-row class="tip-title">
        <p>您的公司账号注册成功!</p>
        <p>当前账号查看简历次数为<span style="color: #E6A23C">&nbsp;{{limitCount}}</span>，请从下列中选择缴费项目便于您的后续操作，谢谢！</p>
      </el-row>
      <el-row class="payment-content">
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-time"></i>年费会员</span>
            <el-row class="detail-content">
              年费会员每年拥有查询/下载学生简历不限次数的特权,费用为200元/年
            </el-row>
            <el-row class="detail-content">
              缴费方式按年收取，从缴费之日起计算，过期后可续费。
            </el-row>
            <el-row class="detail-content">
                <span style="display: block; font-size: 12px;">使用支付宝支付：<el-radio
                  :v-model="annualFee">200元</el-radio></span>
              <el-button type="primary" @click="handlePayment('1')">去支付</el-button>
            </el-row>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-tickets"></i>普通会员</span>
            <el-row class="detail-content">
              普通会员查询/下载学生简历按次数收取费用,具体标准为1元/次。
            </el-row>
            <el-row class="detail-content">
              普通会员缴费每次须不少于10元。
            </el-row>
            <el-row class="detail-content">
              <span style="display: block; font-size: 12px;">
                使用支付宝支付：<el-input-number v-model="normalFee" :step="10" :min="10"></el-input-number>
              </span>
              <el-button type="primary" @click="handlePayment('2')">去支付</el-button>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import {getPaymentAPI} from "@/service/company.service";

  export default {
    name: "payment-content",
    data() {
      return {
        limitCount: 0,
        annualFee: 200,
        normalFee: 10,
        htmlContent: ''
      }
    },
    methods: {
      handlePayment(value) {
        let paymentObj = {
          'totalFee': 0,
          'type': '',
          'companySoleCode': sessionStorage.getItem('user')
        };
        if (value === '1') {
          paymentObj.totalFee = this.annualFee;
          paymentObj.type = '1';
        } else {
          paymentObj.totalFee = this.normalFee;
          paymentObj.type = '2';
        }
        this.callPayment(paymentObj);
      },
      async callPayment(param) {
        let response = await getPaymentAPI(param);
        sessionStorage.setItem('paymentObj', JSON.stringify(param));
        let htmlString = response.data;
        console.log(htmlString);
        this.htmlContent = htmlString;
        // let routerData = this.$router.resolve({
        //   path: '/finance/applyText', query: {
        //     htmls: htmlString
        //   }
        // });
        // window.open(routerData.href, '_blank');
        const div = document.createElement('div');
        div.innerHTML = htmlString;
        document.body.appendChild(div);
        document.forms[0].submit();
      }
    }
  }
</script>

<style scoped>

  .picture-region {
    position: relative;
    padding: 0;
  }

  .picture {
    position: relative;
    margin-top: 30%;
    width: 100%;
  }

  .tip-title {
    margin-top: 25px;
    margin-left: 2%;
    padding-left: 10px;
    padding-right: 5%;
    font-family: 微软雅黑;
    font-weight: bolder;
    font-size: 20px;
    color: #303133;
  }

  .payment-content {
    position: relative;
    margin-left: 2%;
  }

  .detail-content {
    font-family: 宋体;
    color: #333333;
    line-height: 30px;
  }

  /*>>>.el-tabs--border-card>.el-tabs__header .el-tabs__item {*/
  /*!*width: 100%;*!*/
  /*}*/

  > > > .el-tabs--border-card {
    width: 85%;
  }

</style>
