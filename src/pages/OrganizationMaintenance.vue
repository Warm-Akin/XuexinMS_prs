<template>
  <div>
    <InfoMenu></InfoMenu>
    <el-row class="text-align-left">
      <el-col :span="24">
        <el-col :xl="22" :lg="22" :offset="1" class="page-title">开课课程信息管理</el-col>
        <el-col :span="4" class="margin-top search-form">
          <el-form label-width="70px" label-position="left" :model="searchOrganization" ref="searchForm">
            <el-form-item label="机构名称">
              <el-input v-model="searchOrganization.orgName"></el-input>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="searchOrganization.contactMan">'</el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="searchOrganization.address"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" icon="el-icon-search" class="search-btn" @click="queryOrganization">搜索</el-button>
        </el-col>
        <el-col :span="1" class="margin-top">
          <div class="line"></div>
        </el-col>
        <el-col :span='18' class="margin-top table-body">
          <el-button class="el-button--primary" plain round @click="showAddDialog">添加</el-button>
          <el-button class="el-button--primary" plain round @click="showModifyDialog">修改</el-button>
          <!--<el-button class="el-button&#45;&#45;primary" plain round @click="uploadDialogVisible = true">上传</el-button>-->
          <!--<el-button class="el-button&#45;&#45;primary" plain round @click="exportTableData">导出</el-button>-->
          <el-button class="el-button--primary" plain round @click="handleDelete">删除</el-button>
          <el-table class="stakeholder-table" :data="organizationList"
                    ref="multipleTable" stripe max-height="515" @row-dblclick="handleRowDBClick"
                    style="width: 120%" highlight-current-row @selection-change="handleSelectionChange"
                    :default-sort="{prop: 'orgName', order: 'ascending'}"
                    v-loading="loadingStatus">
            <el-table-column type="selection" width="40" fixed></el-table-column>
            <el-table-column label="机构名称" sortable prop="orgName" align="center" width="160">
              <template slot-scope="scope">
                <span>{{scope.row.orgName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="联系人" sortable prop="contactMan" align="center" width="160">
              <template slot-scope="scope">
                <span>{{scope.row.contactMan}}</span>
              </template>
            </el-table-column>
            <el-table-column label="联系电话" align="center" width="180">
              <template slot-scope="scope">
                <span>{{scope.row.telephone}}</span>
              </template>
            </el-table-column>
            <el-table-column label="电子邮箱" align="center" width="180">
              <template slot-scope="scope">
                <span>{{scope.row.email}}</span>
              </template>
            </el-table-column>
            <el-table-column label="传真" align="center" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.fax}}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center" width="100" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.status}}</span>
              </template>
            </el-table-column>
            <el-table-column label="地址" align="center" width="180" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.address}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="table-nav" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="pageable.currentPage" background
                         :page-sizes="[20,40, 100, 200, 500]" :page-size="pageable.pageSize"
                         layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
          <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px" top="20px" @close='closeDialog'>
            <el-form label-width="90px" label-position="left" :model="updateOrganization" class="dialog-form"
                     ref="updateForm" :rules="rules">
              <el-form-item label="机构名称" prop="orgName">
                <el-input v-model="updateOrganization.orgName" :disabled="infoEditable"></el-input>
              </el-form-item>
              <el-form-item label="联系人" prop="contactMan">
                <el-input v-model="updateOrganization.contactMan"></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input v-model="updateOrganization.telephone"></el-input>
              </el-form-item>
              <el-form-item label="传真">
                <el-input v-model="updateOrganization.fax"></el-input>
              </el-form-item>
              <el-form-item label="电子邮箱" prop="email">
                <el-input v-model="updateOrganization.email"></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-input v-model="updateOrganization.status"></el-input>
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="updateOrganization.address" type="textarea" :autosize="{ minRows: 1, maxRows: 3}"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="handleCancel">取消</el-button>
              <el-button type="primary" @click="handleSaveOrganization">保存</el-button>
            </span>
          </el-dialog>
        </el-col>
      </el-col>
    </el-row>
    <el-row style="margin-top: 1%;">&nbsp;</el-row>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from '@/components/Footer';
  import InfoMenu from '@/components/InformationMenu';
  import { getOrganizationInfoPage, findOrganizationByConditions, saveOrganizationInfo, removeOrganizations } from '@/service/organization.service'
  import Constant from '@/utils/Constant';

  export default {
    components: {
      Footer, InfoMenu
    },
    data() {
      return {
        pageable: {
          currentPage: 1,
          pageSize: 20
        },
        totalCount: 0,
        loadingStatus: false,
        infoEditable: true,
        multipleSelection: [],
        searchOrganization: {
          orgName: '',
          contactMan: '',
          address: '',
          currentPage: 1,
          pageSize: 20
        },
        organizationList: [],
        updateOrganization: {
          orgName: '',
          contactMan: '',
          email: '',
          telephone: '',
          fax: '',
          email: '',
          address: '',
          status: ''
        },
        rules: {
          orgName: [
            {required: true, message: '请输入机构名称', trigger: ['blur', 'change']}
          ],
          contactMan: [
            {required: true, message: '请输入联系人信息', trigger: ['blur', 'change']}
          ],
          email: [
            {required: true, message: '请输入电子邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入正确的电子邮箱', trigger: ['blur', 'change']}
          ]
        },
        dialogTitle: '',
        dialogVisible: false
      };
    },
    methods: {
      async callOrganizationList(pageable) {
        this.$loading({fullscreen: true});
        let organizationInfo = await getOrganizationInfoPage(pageable);
        this.organizationList = organizationInfo.data.pageResultList;
        this.totalCount = organizationInfo.data.total;
        this.$loading({fullscreen: true}).close();
      },
      handleSaveOrganization() {
        this.$refs.updateForm.validate((valid) => {
          if (!valid) {
            return false;
          } else {
            this.saveOrganization();
          }
        });
      },
      async saveOrganization() {
        console.log(this.updateOrganization)
        this.$loading({fullscreen: true});
        let response = await saveOrganizationInfo(this.updateOrganization);
        if (response.code === Constant.POPUP_EXCEPTION_CODE && response.msg !== '') {
          this.$alert(response.msg, {
            confirmButtonText: 'OK'
          });
        } else {
          this.$message.success('数据保存成功！');
          this.dialogVisible = false;
          this.updateOrganization = {};
          // refresh data from DB
          this.pageable = {
            currentPage: 1,
            pageSize: 20
          };
          this.callOrganizationList(this.pageable);
        }
        this.$loading({fullscreen: true}).close();
      },
      handleCancel() {
        this.dialogVisible = false;
        this.$refs.updateForm.resetFields();
      },
      showAddDialog() {
        this.dialogTitle = '添加';
        this.dialogVisible = true;
        this.infoEditable = false;
      },
      closeDialog() {
        this.dialogVisible = false;
        this.$refs.updateForm.resetFields();
        this.updateOrganization = {};
      },
      showModifyDialog() {
        if (this.multipleSelection.length === 1) {
          this.dialogTitle = '修改';
          this.infoEditable = true;
          // deep clone
          this.updateOrganization = JSON.parse(JSON.stringify(this.multipleSelection[0]));
          this.dialogVisible = true;
        } else {
          this.$message.warning('请选择一条要修改的记录');
        }
      },
      handleSizeChange(val) {
        this.searchOrganization.pageSize = val;
        this.queryOrganization();
      },
      handleCurrentChange(val) {
        this.searchOrganization.currentPage = val;
        this.queryOrganization();
      },
      handleSelectionChange(value) {
        this.multipleSelection = value;
      },
      handleRowDBClick(row, event) {
        this.dialogTitle = '修改';
        this.infoEditable = true;
        this.updateOrganization = JSON.parse(JSON.stringify(row));
        this.dialogVisible = true;
      },
      async queryOrganization() {
        this.loadingStatus = true;
        let response = await findOrganizationByConditions(this.searchOrganization);
        this.organizationList = response.data.pageResultList;
        this.totalCount = response.data.total;
        this.loadingStatus = false;
      },
      handleDelete() {
        if (this.multipleSelection.length > 0) {
          this.$confirm('确定删除吗？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(action => {
            this.deleteRecords();
          }).catch(_ => {
            console.log('cancel')
          });
        } else {
          this.$message.warning('请选择要删除的记录');
        }
      },
      async deleteRecords() {
        let response = await removeOrganizations(this.multipleSelection);
        if (response.code === Constant.POPUP_EXCEPTION_CODE && response.msg !== '') {
          this.$alert(response.msg, {
            confirmButtonText: 'OK'
          });
        } else {
          this.$message.success('删除成功');
          this.callOrganizationList(this.pageable);
        }
      }
    },
    created() {
      this.$store.dispatch('commitInformationMenuIndex', 'organizationMaintenance');
    },
    mounted() {
      document.title = "组织机构信息管理";
      this.callOrganizationList(this.pageable);
    }
  }
</script>

<style scoped>
  .text-align-left {
    text-align: left;
  }

  .page-title {
    font-size: 20px;
  }

  .margin-top {
    margin-top: 20px;
  }

  .search-form {
    bottom: 40px;
  }

  .table-nav {
    /*position: fixed;*/
    /*bottom: 40px;*/
  }

  .line {
    width: 1px;
    height: 580px;
    background-color: #e6e6e6;
    margin-left: 20px;
  }

  .radio-margin {
    width: 28px;
  }

  .search-btn {
    text-align: center;
    width: 100%;
  }

  @media screen and (max-width: 970px) {
    .search-form {
      display: none;
    }

    .line {
      display: none;
    }

    .table-body {
      width: 100%;
    }
  }

  >>> .el-input.is-disabled .el-input__inner {
    background-color: #FFFFFF;
    border-color: #66b1ff;
    color: #c0c4cc;
  }

  >>>.el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 40px;
    line-height: 40px;
    /*border-bottom: 2px solid transparent;*/
    color: #909399;
  }
</style>
