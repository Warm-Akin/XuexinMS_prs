<template>
  <el-row class="main-content">
    <Footer></Footer>
  </el-row>
</template>

<script>
  import Footer from '@/components/Footer.vue';

  export default {
    components: {
      Footer
    },
    mounted() {
      document.title = 'Page Not Found';
    }
  }
</script>

<style scoped>
  .main-content {
    background-image: url("../assets/404.jpg");
    background-size: cover;
    background-position: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
