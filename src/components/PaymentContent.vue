<template>
  <el-row>
    <el-col :span="8" class="picture-region">
      <img src="@/assets/Payment.jpg" class="picture" />
    </el-col>
    <el-col :span="15">
      <el-row class="tip-title">
        <!-- 添加条件 -> 注册时显示即可 -->
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
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-tickets"></i>普通会员</span>
            <el-row class="detail-content">
              普通会员查询/下载学生简历按次数收取费用,具体标准为1元/次。
            </el-row>
            <el-row class="detail-content">
              普通会员缴费每次须不少于10元。
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "payment-content",
    data() {
      return {
        limitCount: 0
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

  >>>.el-tabs--border-card {
    width: 85%;
  }

</style>
