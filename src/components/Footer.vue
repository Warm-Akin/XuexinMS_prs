<template>
  <el-col :span="24" class="footer">
    <div class="footer-wording">{{copyright}}</div>
  </el-col>
</template>

<script>
  // import { findAllLanguage } from '@/services/dictionary.service'
  // import { EMIT_SAVE_DICTIONARY } from '@/store/types'
  // import Constant from '../common/Constant';
  export default {
    data () {
      return {
        copyright: 'CopyRight © 2015 All Right Reserved. Powered by 北京理工大学珠海学院',
        // description: {
        //   content: '',
        //   tableContent: ''
        // }
      }
    }
    // ,
    // methods: {
    //   async findAllDisplay () {
    //     if (this.$store.state.dictionary[1] === undefined) {
    //       const allLanguage = await findAllLanguage();
    //       this.$store.dispatch(EMIT_SAVE_DICTIONARY, allLanguage.data);
    //       // store description information
    //       this.description.content = allLanguage.data[1].DESCRIPTION_CONTENT;
    //       this.description.tableContent = allLanguage.data[1].DESCRIPTION_CHOICE_TABLE;
    //     }
    //   },
    //   init () {
    //     var year = new Date().getFullYear();
    //     this.copyright = this.replaceAnswererText(Constant.FOOTTER_PAGE_TEXT, this.$store.state.dictionary[1].COPYRIGHT, year)
    //     this.$emit('init');
    //   },
    //   replaceAnswererText (target, info, year) {
    //     info = info.replace(new RegExp(target, 'g'), year);
    //     return info;
    //   }
    // }
    // ,
    // mounted () {
    //   this.findAllDisplay().then(val => {
    //     this.init();
    //     this.$emit('descriptionEvent', this.description);
    //   });
    // }
  }
</script>

<style scoped>
  .footer{
    background-color: #333333;
    height: 40px;
    position: fixed;
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
