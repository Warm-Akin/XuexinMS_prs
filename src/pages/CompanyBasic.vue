<template>
  <el-row class="main-content">
    <CompanyMenu></CompanyMenu>
    <el-row>
      <el-col :span="1">
        <div class="line"></div>
      </el-col>
      <el-col :span="23" class="data-content">
        <el-row class="content-title"><i class="el-icon-edit-outline"></i> 公司基本信息</el-row>
        <el-row>
          <el-button type="primary" style="left: 80px; width: 80px;" size="small" @click="handleEdit" :disabled="!relativeDisable">编辑</el-button>
          <el-button type="primary" style="margin-left: 40px; width: 80px;" size="small" @click="handleCancel" :disabled="relativeDisable">取消</el-button>
        </el-row>
        <el-row>&nbsp;</el-row>
        <el-row>
          <el-form label-width="200px" label-position="left" :model="companyInfo" class="dialog-form" ref="updateForm" :rules="rules">
            <el-row>
              <el-col :span="20">
                <el-form-item label="统一社会信用码/工商注册码" prop="soleCode">
                  <el-input v-model="companyInfo.soleCode" :disabled="absoluteDisable"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="公司名称">
                  <el-input type="email" v-model="companyInfo.companyName" :disabled="absoluteDisable"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="法人名称">
                  <el-input v-model="companyInfo.legalName" :disabled="relativeDisable"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="法人联系电话">
                  <el-input type="email" v-model="companyInfo.legalPhone" :disabled="relativeDisable"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="legalCertcode(待定)">
                  <el-input v-model="companyInfo.legalCertcode" :disabled="relativeDisable"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="公司电话">
                  <el-input type="email" v-model="companyInfo.companyPhone" :disabled="relativeDisable"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="公司地址">
                  <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" v-model="companyInfo.companyAddress" :disabled="relativeDisable"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="备注">
                  <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" v-model="companyInfo.remark" :disabled="relativeDisable"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
        <el-row>
          <el-button type="primary" style="width: 80px;" size="small" @click="handleSave" :disabled="relativeDisable">保存</el-button>
        </el-row>
      </el-col>
    </el-row>
    <Footer></Footer>
  </el-row>
</template>

<script>
  import Footer from '@/components/Footer';
  import CompanyMenu from '@/components/CompanyMenu';

  export default {
    components: {
      Footer, CompanyMenu
    },
    data() {
      return {
        relativeDisable: true,
        absoluteDisable: true,
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
          ]
        }
      }
    },
    methods: {
      handleEdit() {
        this.relativeDisable = false;
      },
      handleCancel() {
        this.relativeDisable = true;
      },
      handleSave() {
        // todo
        this.relativeDisable = true;
      }
    },
    created() {
      this.$store.dispatch('commitCompanyMenuIndex', 'companyBasic');
    },
    mounted() {
      document.title = '基本信息';
    }
  }
</script>

<style scoped>
  .main-content {
    position: fixed;
    top: 0;
    left: 200px;
    width: 90%;
    height: 100%;
    overflow-y: auto;
    padding: 0;
    clear: both;
  }

  .content-title {
    font-weight: bold;
    line-height: 40px;
    margin-bottom: 5px;
  }

  .line {
    width: 1px;
    height: 700px;
    background-color: #e6e6e6;
    margin-left: 10px;
  }

  .data-content {
    margin-top: 1%;
  }
</style>
