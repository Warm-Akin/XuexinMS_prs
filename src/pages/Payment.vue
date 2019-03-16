<template>
    <el-row>
      <el-row>
        <el-col :span="5">图片区域</el-col>
        <el-col :span="15">内容区域</el-col>
      </el-row>
      <Footer></Footer>
    </el-row>
</template>

<script>
  import Footer from '@/components/Footer.vue';

  export default {
    components: { Footer },
    data() {
      return {

      }
    },
    methods: {

    },
    mounted() {
      document.title = '付费项目';
    }
  }
</script>

<style scoped>

</style>
