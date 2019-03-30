<template>
  <el-row class="main-content">
    <AdminMenu></AdminMenu>
    <el-row>
      <el-col :span="1">
        <div class="line"></div>
      </el-col>
      <el-col :span="23" class="data-content">
        <el-row class="content-title"><i class="el-icon-document"></i>企业信息列表</el-row>
        <el-row class="search-bar">
          <el-col :span="15">
            <el-form  label-position="left" :model="searchCompany" ref="searchForm">
              <el-row>
                <el-col :span="7">
                  <el-form-item label="统一社会信用码/工商注册码">
                    <el-input v-model="searchCompany.soleCode"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="7">
                  <el-form-item label="公司名称">
                    <el-input v-model="searchCompany.companyName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="7">
                  <el-form-item label="法人名称">
                    <el-input v-model="searchCompany.legalName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
          <el-col :span="2">
            <el-row>&nbsp;</el-row>
            <el-row>&nbsp;</el-row>
            <el-button type="primary" size="small" icon="el-icon-search" @click="queryCompany">搜索</el-button>
          </el-col>
          <el-col :span="6">
            <el-row>&nbsp;</el-row>
            <el-row>&nbsp;</el-row>
            <el-row>
              <el-button type="primary" size="small" @click="showAddDialog">添加</el-button>
              <el-button type="primary" size="small" @click="showModifyDialog">修改</el-button>
              <el-button type="primary" size="small" @click="handleDelete">删除</el-button>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-table stripe style="width: 95%" :data="companyList" ref="multipleTable" max-height="530" highlight-current-row
                    @row-dblclick="handleRowDBClick" @selection-change="handleSelectionChange" v-loading="loadingStatus">
            <el-table-column type="selection" width="40" fixed></el-table-column>
            <el-table-column label="统一社会信用码/工商注册码" prop="soleCode" align="center" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.soleCode}}</span>
              </template>
            </el-table-column>
            <el-table-column label="公司名称" prop="companyName" align="center" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.companyName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="法人名称" prop="legalName" align="center" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.legalName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="法人联系电话" prop="legalPhone" align="center" width="400">
              <template slot-scope="scope">
                <span>{{scope.row.legalPhone}}</span>
              </template>
            </el-table-column>
            <el-table-column label="legalCertcode(待定)" prop="legalCertcode" align="center" width="250">
              <template slot-scope="scope">
                <span>{{scope.row.legalCertcode}}</span>
              </template>
            </el-table-column>
            <el-table-column label="公司电话" prop="companyPhone" align="center" width="250">
              <template slot-scope="scope">
                <span>{{scope.row.companyPhone}}</span>
              </template>
            </el-table-column>
            <el-table-column label="公司地址" prop="companyAddress" align="center" width="250">
              <template slot-scope="scope">
                <span>{{scope.row.companyAddress}}</span>
              </template>
            </el-table-column>
            <el-table-column label="备注" prop="remark" align="center" width="250">
              <template slot-scope="scope">
                <span>{{scope.row.remark}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="table-nav" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="pageable.currentPage" background
                         :page-sizes="[20,40, 100, 200, 500]" :page-size="pageable.pageSize"
                         layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </el-row>
          <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px" top="20px" @close='closeDialog' :modal="false">
            <el-form label-position="left" :model="updateCompany"  ref="updateForm" :rules="rules">
              <el-form-item label="统一社会信用码/工商注册码" prop="soleCode">
                <el-input v-model="updateCompany.soleCode" :disabled="formEditable"></el-input>
              </el-form-item>
              <el-form-item label="公司名称" prop="companyName">
                <el-input v-model="updateCompany.companyName" :disabled="formEditable"></el-input>
              </el-form-item>
              <el-form-item label="法人名称">
                <el-input v-model="updateCompany.legalName"></el-input>
              </el-form-item>
              <el-form-item label="法人电话">
                <el-input v-model="updateCompany.legalPhone"></el-input>
              </el-form-item>
              <el-form-item label="legalCertcode">
                <el-input v-model="updateCompany.legalCertcode"></el-input>
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input v-model="updateCompany.companyPhone"></el-input>
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 3}" v-model="updateCompany.companyAddress"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 3}" v-model="updateCompany.remark"></el-input>
              </el-form-item>
              <el-form-item label="登录密码" prop="password">
                <el-input type="password" v-model="updateCompany.password"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="handleCancel">取消</el-button>
              <el-button type="primary" @click="handleSave">保存</el-button>
            </span>
          </el-dialog>
      </el-col>
    </el-row>
    <Footer></Footer>
  </el-row>
</template>

<script>
  import Footer from '@/components/Footer';
  import AdminMenu from '@/components/AdminMenu';
  import { getActiveCompanyInfo, saveCompanyInfo, findCompanyByConditions, removeRecords } from '@/service/company.service';
  import Constant from '@/utils/Constant'

  export default {
    components: {
      Footer, AdminMenu
    },
    data() {
      return {
        formEditable: true,
        dialogVisible: false,
        loadingStatus: false,
        dialogTitle: '',
        multipleSelection: [],
        // resumeList: [],
        companyList: [],
        totalCount: 0,
        pageable: {
          currentPage: 1,
          pageSize: 20
        },
        searchCompany: {
          companyName: '',
          legalName: '',
          soleCode: '',
          currentPage: 1,
          pageSize: 20
        },
        updateCompany: {
          soleCode: '',
          companyName: '',
          legalName: '',
          legalPhone: '',
          legalCertcode: '',
          companyAddress: '',
          companyPhone: '',
          remark: '',
          password: ''
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
          ]
        }
      }
    },
    methods: {
      async initCompanyList(pageable) {
        this.$loading({fullscreen: true});
        let response = await getActiveCompanyInfo(pageable);
        this.companyList = response.data.pageResultList;
        this.totalCount = response.data.total;
        this.$loading({fullscreen: true}).close();
      },
      handleSizeChange(val) {
        this.pageable.pageSize = val;
        this.initCompanyList(this.pageable);
      },
      handleCurrentChange(val) {
        this.pageable.currentPage = val;
        this.initCompanyList(this.pageable);
      },
      showAddDialog() {
        this.dialogTitle = '添加';
        this.dialogVisible = true;
        this.formEditable = false;
      },
      showModifyDialog() {
        if (this.multipleSelection.length === 1) {
          this.dialogTitle = '修改';
          this.formEditable = true;
          // deep clone
          this.updateCompany = JSON.parse(JSON.stringify(this.multipleSelection[0]));
          this.dialogVisible = true;
        } else {
          this.$message.warning('请选择一条要修改的记录');
        }
        // this.updateCompany = {};
      },
      handleDelete() {
        if (this.multipleSelection.length > 0) {
          this.$confirm('确定删除吗？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(action => {
            this.deleteRecords();
            console.log('delete')
          }).catch(_ => {
            console.log('cancel')
          });
        } else {
          this.$message.warning('请选择要删除的记录');
        }
      },
      async deleteRecords() {
        // get the id column
        // let idList = this.multipleSelection.map(item => {
        //   return { id: item.id };
        // });
        let response = await removeRecords(this.multipleSelection);
        if (response.code === Constant.POPUP_EXCEPTION_CODE && response.msg !== '') {
          this.$alert(response.msg, {
            confirmButtonText: 'OK'
          });
        } else {
          this.$message.success('删除成功');
          this.initCompanyList(this.pageable);
        }
      },
      handleRowDBClick(row, event) {
        this.dialogTitle = '修改';
        this.formEditable = true;
        this.updateCompany = JSON.parse(JSON.stringify(row));
        this.dialogVisible = true;
      },
      handleSelectionChange(value) {
        this.multipleSelection = value;
      },
      closeDialog() {
        this.dialogVisible = false;
        this.$refs.updateForm.resetFields();
        this.updateCompany = {
          soleCode: '',
            companyName: '',
            legalName: '',
            legalPhone: '',
            legalCertcode: '',
            companyAddress: '',
            companyPhone: '',
            remark: '',
            password: ''
        };
      },
      handleCancel() {
        this.dialogVisible = false;
        this.$refs.updateForm.resetFields();
      },
      handleSave() {
        this.$refs.updateForm.validate((valid) => {
          if (!valid) {
            return false;
          } else {
            this.saveCompany();
          }
        });
      },
      async saveCompany() {
        this.$loading({fullscreen: true});
        let response = await saveCompanyInfo(this.updateCompany);
        if (response.code === Constant.POPUP_EXCEPTION_CODE && response.msg !== '') {
          this.$alert(response.msg, {
            confirmButtonText: 'OK'
          });
        } else {
          // todo 更新页面信息
          this.$message.success('数据保存成功！');
          this.dialogVisible = false;
          this.updateCompany = {};
          // todo pageable的值
          this.initCompanyList(this.pageable);
        }
        this.$loading({fullscreen: true}).close();
      },
      async queryCompany() {
        this.loadingStatus = true;
        // this.searchCompany.pageSize = this.pageable.pageSize;
        // this.searchCompany.currentPage = this.pageable.currentPage;
        let response = await findCompanyByConditions(this.searchCompany);
        this.companyList = response.data.pageResultList;
        this.totalCount = response.data.total;
        this.loadingStatus = false;
      }
    },
    created() {
      this.$store.dispatch('commitAdminMenuIndex', 'companyMaintenance');
    },
    mounted() {
      document.title = '企业信息管理';
      this.initCompanyList(this.pageable);
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

  .line {
    width: 1px;
    height: 700px;
    background-color: #e6e6e6;
    margin-left: 10px;
  }

  .content-title {
    font-weight: bold;
    line-height: 40px;
    margin-bottom: 5px;
  }

  .data-content {
    margin-top: 1%;
  }

  .table-nav {
    margin-bottom: 40px;
  }

  .btn-style {
    background-color: #545c64;
  }

</style>
