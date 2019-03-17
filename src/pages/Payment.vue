<template>
    <el-row>
      <ActionBar></ActionBar>
      <PaymentContent></PaymentContent>
      <Footer></Footer>
    </el-row>
</template>

<script>
  import Footer from '@/components/Footer';
  import ActionBar from '@/components/ActionBar';
  import PaymentContent from '@/components/PaymentContent';

  export default {
    components: { Footer, ActionBar, PaymentContent },
    data() {
      return {
        test: ''
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
