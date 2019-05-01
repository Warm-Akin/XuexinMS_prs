<template>
  <div>
    <InfoMenu></InfoMenu>
    <el-row class="text-align-left">
      <el-col :span="24">
        <el-col :xl="22" :lg="22" :offset="1" class="page-title">用户信息控制中心</el-col>
        <el-row>
          <el-col :span='24' class="margin-top table-body">
            <el-button class="el-button--primary" plain round @click="showModifyDialog">修改</el-button>
            <el-table class="stakeholder-table" :data="userList"
                      ref="multipleTable" stripe max-height="515" @row-dblclick="handleRowDBClick"
                      style="width: 120%" highlight-current-row @selection-change="handleSelectionChange"
                      :default-sort="{prop: 'employNo', order: 'ascending'}"
                      v-loading="loadingStatus">
              <el-table-column type="selection" width="40" fixed></el-table-column>
              <el-table-column label="登录用户名" sortable prop="employNo" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.employNo}}</span>
                </template>
              </el-table-column>
              <el-table-column label="用户名称" sortable prop="employName" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.employName}}</span>
                </template>
              </el-table-column>
              <el-table-column label="所属机构" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.organization.orgName}}</span>
                </template>
              </el-table-column>
              <el-table-column label="联系电话" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.telephone}}</span>
                </template>
              </el-table-column>
              <el-table-column label="电子邮箱" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.email}}</span>
                </template>
              </el-table-column>
              <el-table-column label="用户类型" align="center" width="120">
                <template slot-scope="scope">
                  <span>{{scope.row.userType == '1' ? '学生用户' : (scope.row.userType == '2' ? '管理员' : '企业用户')}}</span>
                </template>
              </el-table-column>
              <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.status === 0 ? '启用' : '禁用'}}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination class="table-nav" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="pageable.currentPage" background
                           :page-sizes="[20,40, 100, 200, 500]" :page-size="pageable.pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
            </el-pagination>
            <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="520px" top="20px" @close='closeDialog'>
              <el-form label-width="100px" label-position="left" :model="updateUser" class="dialog-form"
                       ref="updateForm" :rules="rules">
                <el-form-item label="用户登录名" prop="employNo">
                  <el-input v-model="updateUser.employNo" :disabled="infoEditable"></el-input>
                </el-form-item>
                <el-form-item label="用户名称" prop="employName">
                  <el-input v-model="updateUser.employName"></el-input>
                </el-form-item>
                <el-form-item label="所属机构">
                  <el-select v-model="organizationName" filterable placeholder="请选择" clearable>
                    <el-option v-for="item in organizationOptionList" :key="item.orgId" :label="item.orgName" :value="item.orgName"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="联系电话">
                  <el-input v-model="updateUser.telephone"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email">
                  <el-input v-model="updateUser.email"></el-input>
                </el-form-item>
                <el-form-item label="用户类型">
                  <el-radio-group v-model="updateUser.userType">
                    <el-radio :label="'1'">学生用户</el-radio>
                    <el-radio :label="'2'">管理员</el-radio>
                    <el-radio :label="'3'">企业用户</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="状态">
                  <el-radio-group v-model="updateUser.status">
                    <el-radio :label="0">启用</el-radio>
                    <el-radio :label="1">禁用</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="登录密码" prop="password">
                  <el-input v-model="updateUser.password" type="password"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取消</el-button>
                <el-button type="primary" @click="handleSaveUser">保存</el-button>
              </span>
            </el-dialog>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row style="margin-top: 1%;">&nbsp;</el-row>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from '@/components/Footer';
  import InfoMenu from '@/components/InformationMenu';
  import {getUserInfoPage, saveUserInfo} from '@/service/user.service';
  import { getOrganization } from '@/service/organization.service';
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
        userList: [],
        updateUser: {
          employNo: '',
          employName: '',
          telephone: '',
          email: '',
          userType: '',
          status: '',
          password: ''
        },
        organizationName: '',
        rules: {
          employNo: [
            {required: true, message: '请输入用户名', trigger: ['blur', 'change']}
          ],
          employName: [
            {required: true, message: '请输入用户名称', trigger: ['blur', 'change']}
          ],
          email: [
            {type: 'email', message: '请输入正确的电子邮箱', trigger: ['blur', 'change']}
          ],
          password: [
            {required: true, message: '请输入登录密码', trigger: ['blur', 'change']}
          ]
        },
        dialogTitle: '',
        dialogVisible: false,
        organizationOptionList: []
      };
    },
    methods: {
      async callUserList(pageable) {
        this.$loading({fullscreen: true});
        let response = await getUserInfoPage(pageable);
        this.userList = response.data.pageResultList;
        this.totalCount = response.data.total;
        this.$loading({fullscreen: true}).close();
      },
      handleSaveUser() {
        this.$refs.updateForm.validate((valid) => {
          if (!valid) {
            return false;
          } else {
            let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
            if (this.updateUser.telephone && !reg.test(this.updateUser.telephone)) {
              this.$alert('请输入正确的手机号码');
              return false;
            }
            this.saveUser();
          }
        });
      },
      async saveUser() {
        this.$loading({fullscreen: true});
        let response = await saveUserInfo(this.updateUser, this.organizationName);
        if (response.code === Constant.POPUP_EXCEPTION_CODE && response.msg !== '') {
          this.$alert(response.msg, {
            confirmButtonText: 'OK'
          });
        } else {
          this.$message.success('数据保存成功！');
          this.dialogVisible = false;
          this.updateUser = {};
          // refresh data from DB
          this.pageable = {
            currentPage: 1,
            pageSize: 20
          };
          this.callUserList(this.pageable);
        }
        this.$loading({fullscreen: true}).close();
      },
      handleCancel() {
        this.dialogVisible = false;
        this.$refs.updateForm.resetFields();
      },
      closeDialog() {
        this.dialogVisible = false;
        this.$refs.updateForm.resetFields();
        this.updateUser = {};
        this.organizationName = '';
      },
      showModifyDialog() {
        if (this.multipleSelection.length === 1) {
          this.dialogTitle = '修改';
          this.infoEditable = true;
          // deep clone
          this.updateUser = JSON.parse(JSON.stringify(this.multipleSelection[0]));
          this.organizationName = this.multipleSelection[0].organization.orgName;
          this.dialogVisible = true;
        } else {
          this.$message.warning('请选择一条要修改的记录');
        }
      },
      handleSizeChange(val) {
        this.pageable.pageSize = val;
        this.callUserList(this.pageable);
      },
      handleCurrentChange(val) {
        this.pageable.currentPage = val;
        this.callUserList(this.pageable);
      },
      handleSelectionChange(value) {
        this.multipleSelection = value;
      },
      handleRowDBClick(row, event) {
        this.dialogTitle = '修改';
        this.infoEditable = true;
        this.updateUser = JSON.parse(JSON.stringify(row));
        this.organizationName = row.organization.orgName;
        this.dialogVisible = true;
      },
      async getOrganizationInfo() {
        let response = await getOrganization();
        this.organizationOptionList = response.data;
      }
    },
    created() {
      this.$store.dispatch('commitInformationMenuIndex', 'userMaintenance');
    },
    mounted() {
      document.title = "系统登录用户信息管理";
      this.callUserList(this.pageable);
      this.getOrganizationInfo();
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

  > > > .el-input.is-disabled .el-input__inner {
    background-color: #FFFFFF;
    border-color: #66b1ff;
    color: #c0c4cc;
  }

  > > > .el-menu--horizontal > .el-submenu .el-submenu__title {
    height: 40px;
    line-height: 40px;
    /*border-bottom: 2px solid transparent;*/
    color: #909399;
  }
</style>
