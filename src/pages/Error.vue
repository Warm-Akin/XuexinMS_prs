<template>
  <el-row>
    <el-col :span="12">
      <img src="@/assets/error.jpg" width="100%">
    </el-col>
    <el-col :span="10" class="error-content">
      <el-row class="error-msg"><i class="el-icon-warning" style="color: #F56C6C; margin-right: 10px;"></i>Sorry, there has error with the request. The error message is : <span style="color: #F56C6C;">{{this.$route.params.errorMsg}}</span></el-row>
      <el-row class="error-msg">Please retry again or contact with the administrator.</el-row>
      <el-row class="a-link">Go back to <a href="javascript:void(0)" @click="goBackLogin">login</a> page</el-row>
    </el-col>
    <Footer></Footer>
  </el-row>
</template>

<script>
  import Footer from '@/components/Footer.vue';

  export default {
    components: {
      Footer
    },
    data () {
      return {}
    },
    methods: {
      goBackLogin() {
        this.$router.push('/login');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error-content {
    position: relative;
    margin-top: 10%;
  }

  .error-msg {
    line-height: 28px;
    font-size: larger;
    font-family: "Courier New";
    font-weight: bolder;
  }

  .a-link {
    margin-top: 10px;
    font-size: 14px;
  }
</style>
