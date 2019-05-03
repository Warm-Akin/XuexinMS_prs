<template>
  <el-col :span="24" class="footer">
    <div class="footer-wording">{{copyright}}</div>
  </el-col>
</template>

<script>

  export default {
    data () {
      return {
        copyright: 'Copyright © 2019 All Right Reserved. Powered by 北京理工大学珠海学院'
      }
    }
  }
</script>

<style scoped>
  .footer{
    background-color: #333333;
    height: 40px;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 9;
  }

  .footer-wording{
    font-size: 14px;
    color: #eeeeee;
    text-align: center;
    padding-top: 13px;
  }
</style>
