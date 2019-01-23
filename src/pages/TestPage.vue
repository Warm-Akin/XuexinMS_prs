<template>
  <div>
    <div>This is test page</div>
    <div>{{helloWorld}}</div>
  </div>
</template>

<script>
  import { getHelloService } from '../service/hello.service';

  export default {
    name: "TestPage",
    data() {
      return {
        helloWorld: ''
      }
    },
    methods: {
      async callHelloApi () {
        let response = await getHelloService();
        this.helloWorld = response.data;
        console.log(this.helloWorld);
      }
    },
    mounted() {
      this.callHelloApi();
    }
  }
</script>

<style scoped>

</style>
