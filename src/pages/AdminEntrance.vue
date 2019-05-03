<template>
  <el-row class="content">
    <el-row class="entrance-body">
      <el-row  class="entrance-button">
        <el-button type="primary" style="width: 100%" round @click="gotoBasicDataMaintenance">基础数据管理入口</el-button>
      </el-row>
      <el-row  class="entrance-button">
        <el-button type="primary" style="width: 100%" round @click="gotoResumeMaintenance">简历模块管理入口</el-button>
      </el-row>
    </el-row>
    <Footer></Footer>
  </el-row>
</template>

<script>
  import Footer from '@/components/Footer.vue';

  export default {
    components: {
      Footer
    },
    methods: {
      gotoBasicDataMaintenance() {
        this.$router.push('/studentMaintenance')
      },
      gotoResumeMaintenance() {
        this.$router.push('/companyMaintenance')
      }
    },
    mounted() {
      document.title = "系统入口";
    }
  }
</script>

<style scoped>
  .content {
    background-image: url("../assets/Keyboard.jpg");
    background-size: cover;
    background-position: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .entrance-body {
    width: 40%;
    height: 40%;
    position: relative;
    margin-left: 30%;
    top: 20%;
    background: black;
    opacity: 0.7;
    padding: 6% 5%;
    z-index: 1;
  }

  .entrance-button {
    /*z-index: 5;*/
    margin-bottom: 5%;
  }

</style>
