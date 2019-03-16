<template>
  <el-row class="action-bar">
    <i class="el-icon-back go-back" @click="goBackLogin"></i>
  </el-row>
</template>

<script>
  export default {
    name: "action-bar",
    methods: {
      goBackLogin() {
        this.$router.push('/login');
      }
    }
  }
</script>

<style scoped>

  .action-bar {
    background: #333333;
    padding-left: 10px;
    vertical-align: middle;
    line-height: 35px;
    color: #eeeeee;
    height: 35px;
    font-size: 20px;
  }

  .go-back {
    cursor: pointer;
  }


</style>
