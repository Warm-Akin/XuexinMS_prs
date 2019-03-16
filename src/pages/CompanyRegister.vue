<template>
  <div class="content">
    <el-row>
      <ActionBar></ActionBar>
      <el-row>&nbsp;</el-row>
      <el-row class="register-form">
        <span class="form-title"><i class="el-icon-edit"></i>企业注册</span>
        <el-form :model="companyInfo" ref="registerForm" :rules="rules">
          <el-row>
            <el-col :span="22">
              <el-form-item label="统一社会信用码/工商注册码" prop="soleCode">
                <el-input v-model="companyInfo.soleCode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="公司名称" prop="companyName">
                <el-input type="email" v-model="companyInfo.companyName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="法人名称">
                <el-input v-model="companyInfo.legalName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="法人联系电话">
                <el-input type="email" v-model="companyInfo.legalPhone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="legalCertcode(待定)">
                <el-input v-model="companyInfo.legalCertcode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="公司电话">
                <el-input type="email" v-model="companyInfo.companyPhone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="公司地址">
                <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" v-model="companyInfo.companyAddress"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="备注">
                <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" v-model="companyInfo.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="登录密码" prop="password"><!--onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" 禁止输入空格-->
                <el-input type="password" v-model="companyInfo.password" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">&nbsp;</el-col>
            <el-col :span="1">
              <el-button type="primary" style="margin-left: 50%; width: 80px;" size="small" @click="handleSave">注册</el-button>
            </el-col>
          </el-row>
          <el-row style="margin-bottom: 25px;">&nbsp;</el-row>
        </el-form>
      </el-row>
    </el-row>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from '@/components/Footer.vue';
  import ActionBar from '@/components/ActionBar.vue';
  import Constant from '@/utils/Constant';
  import { registerCompany } from '@/service/company.service';

  export default {
    components: {
      Footer, ActionBar
    },
    data () {
      return {
        companyInfo: {
          soleCode: '',
          companyName: '',
          legalName: '',
          legalPhone: '',
          legalCertcode: '', //
          companyAddress: '',
          companyPhone: '',
          remark: '',
          password: '',
          photoPath: '',
          pdfLimit: '',
          sysoprState: ''
        },
        rules: {
          soleCode: [
            {required: true, message: '请输入统一社会信用码/工商注册码', trigger: ['blur', 'change']}
          ],
          companyName: [
            {required: true, message: '请输入公司名称', trigger: ['blur', 'change']}
          ],
          password: [
            {required: true, message: '请输入登录密码', trigger: ['blur', 'change']}
          ],
          legalPhone: [
            // {required: true, message: '请输入电子邮箱', trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      handleSave() {
        this.$refs.registerForm.validate((valid) => {
          if (!valid) {
            this.$message.error('您的输入有误，请检查后重试');
            return false;
          } else {
            this.callSaveInfo();
          }
        });
      },
      async callSaveInfo() {
        let response = await registerCompany(this.companyInfo);
        // console.log(response)
        if (response.code === Constant.POPUP_EXCEPTION_CODE && response.msg !== '') {
          this.$alert(response.msg, {
            confirmButtonText: 'OK'
          });
        } else {
          // success and goto 付费页面
          // this.$confirm('注册成功, 是否继续?', '提示', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   type: 'warning'
          // }).then(() => {
          //   this.$message({
          //     type: 'success',
          //     message: '删除成功!'
          //   });
          // }).catch(() => {
          //   this.$message({
          //     type: 'info',
          //     message: '已取消删除'
          //   });
          // });
          // this.$message.success('');
          this.$router.push('');
        }
      }
    },
    mounted() {
      document.title = '企业注册';
    }
  }
</script>

<style scoped>

  .content {
    background-image: url("../assets/Code.jpg");
    background-size: cover;
    background-position: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    clear: both;
  }

  .form-title {
    font-family: 微软雅黑;
    font-size: 25px;
    font-weight: bold;
    color: #E6A23C;
    position: relative;
    left: 34%;
  }

  .register-form {
    position: relative;
    width: 60%;
    left: 20%;
    padding-left: 2.5%;
    padding-top: 1%;
    background: #333333;
    opacity: 0.8;
    border-radius: 10px;
  }

  >>>.el-form-item__label {
    color: white;
  }

</style>
