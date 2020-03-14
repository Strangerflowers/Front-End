<template>
  <div class="animated fadeIn">
    <b-row class="search">
      <b-col sm="12" lg="12">
        <b-card no-body>
          <b-card-body>
            <div class="search-body">
              <b-row>
                <b-col>
                  <div class="account">
                    <b-row>
                      <b-col sm="6" lg="6">
                        <div class="search-title">用户查询</div>
                      </b-col>
                      <b-col sm="6" lg="6">
                        <div class="right">
                          <div class="btn-box">
                            <button
                              type="button"
                              class="btn btn-primary btn-block func-item func-btn btn-sm"
                              @click="roleSearch"
                            >查询</button>
                          </div>
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                  <b-row>
                    <b-col sm="6" lg="4">
                      <div class="input-group">
                        <label for="basicName" class="col-form-label">用户姓名：</label>
                        <input
                          id="basicName"
                          type="text"
                          v-model="search.userName"
                          placeholder="请输入用户姓名查询"
                          class="form-control auth-form-control border-3r"
                        />
                      </div>
                    </b-col>
                    <b-col sm="6" lg="4">
                      <div class="input-group">
                        <label for="basicName" class="col-form-label">用户账号：</label>
                        <input
                          v-model="search.loginAcc"
                          id="basicName"
                          type="text"
                          placeholder="请输入用户账号查询"
                          class="form-control auth-form-control border-3r"
                        />
                      </div>
                    </b-col>
                    <b-col sm="6" lg="4">
                      <div class="input-group">
                        <label
                          for="basicName"
                          class="col-form-label"
                        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;工号：</label>
                        <input
                          v-model="search.workNum"
                          id="basicName"
                          type="text"
                          placeholder="请输入工号查询"
                          class="form-control auth-form-control border-3r"
                        />
                      </div>
                    </b-col>
                    <b-col sm="6" lg="4">
                      <div class="input-group">
                        <label for="basicName" class="col-form-label">手机号码：</label>
                        <input
                          v-model="search.mobile"
                          id="basicName"
                          type="text"
                          placeholder="请输入手机号码名称查询"
                          class="form-control auth-form-control border-3r"
                        />
                      </div>
                    </b-col>
                    <b-col sm="6" lg="4">
                      <div class="input-group" style="width:100%;">
                        <form class="form-inline">
                          <div class="form-group">
                            <label for="exampleInputName2" class="inline">系统名称 :</label>
                            <b-form-select
                              class="inline system-select-width"
                              v-model="form.selected"
                              id="exampleInputName2"
                              :options="form.options"
                              :plain="true"
                            ></b-form-select>
                          </div>
                        </form>
                      </div>
                    </b-col>
                    <b-col sm="6" lg="4">
                      <div class="input-group" style="width:100%;">
                        <form class="form-inline">
                          <div class="form-group">
                            <label for="exampleInputName2" class="inline">系统名称 :</label>
                            <b-form-select
                              class="inline"
                              v-model="form.selected"
                              id="exampleInputName2"
                              :options="form.options"
                              :plain="true"
                            ></b-form-select>
                          </div>
                        </form>
                      </div>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" lg="12">
        <b-card>
          <b-card-body>
            <div>
              <b-row>
                <b-col>
                  <div class="datalist-tab">
                    <template>
                      <el-table
                        :data="tableAccout"
                        ref="table"
                        style="width: 100%"
                        @select="selectAccount"
                        @select-all="selectAllAccount"
                      >
                        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                        <el-table-column type="index" :index="indexMethod" label="序号" width="120"></el-table-column>
                        <el-table-column prop="workNum" label="工号" width="120"></el-table-column>
                        <el-table-column
                          prop="userName"
                          label="用户姓名"
                          width="120"
                          :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column prop="gender" label="性别" width="120">
                          <template slot-scope="scope">
                            <span v-show="scope.row.gender===1">男</span>
                            <span v-show="scope.row.gender===2">女</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="email"
                          label="邮箱"
                          width="120"
                          :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column prop="mobile" label="手机号码" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="status" label="状态" width="120">
                          <template slot-scope="scope">
                            <span v-show="scope.row.status===1" style="color:#409EFF">启用</span>
                            <span v-show="scope.row.status===2" style="color:#f00;">禁用</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="userType" label="是否外部人员" width="120">
                          <template slot-scope="scope">
                            <span v-show="scope.row.userType===1">是</span>
                            <span v-show="scope.row.userType===2">否</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="description"
                          label="备注"
                          :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                          fixed="right"
                          label="操作"
                          width="120"
                          :show-overflow-tooltip="true"
                        >
                          <template slot-scope="scope">
                            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                            <el-button type="text" size="small">授权</el-button>
                            <el-button type="text" size="small" >数据权限元素</el-button>
                            <el-button type="text" size="small" @click="delrole(scope.row)">删除</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </template>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="pageFixed">
      <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
import { Callout } from "@coreui/vue";
import axios from "axios";
import tree from "../../components/tree";

export default {
  name: "dashboard",
  components: { tree },
  data: function() {
    return {
      form: {
        //下拉选项
        selected: [],
        options: []
      },
      search: {
        userName: "",
        workNum: "",
        loginAcc: "",
        mobile: "",
        pageNo: 1,
        pageSize: 10
      },
      tableAccout: []
    };
  },
  created() {
    this.getSystem();
    this.getAccountList();
  },
  methods: {
    // 获取各个系统
    getSystem() {
      axios
        .get("os_kernel_appsysctr/app/appsys/queryByUserId", {
          params: {
            authz_entity_id: "0e08e153-b04a-11e9-b31b-b06ebf14a476"
          }
        })
        .then(res => {
          let o = [];
          res.data.result.map(item => {
            // console.log(item);
            let data = {};
            data["value"] = item.id;
            data["text"] = item.appsysName;
            o.push(data);
          });
          this.form.options = o;
          this.form.selected = o[0].value;
          this.ruleForm.system = o;
        })
        .then(res => {
          this.getList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    indexMethod(index) {
      return index + 1 * 1;
    },
    // 获取用户list
    getAccountList() {
      let obj = {
        userName: this.search.userName ? this.search.userName : undefined,
        workNum: this.search.workNum ? this.search.workNum : undefined,
        loginAcc: this.search.loginAcc ? this.search.loginAcc : undefined,
        mobile: this.search.mobile ? this.search.mobile : undefined,
        pageNo: 1,
        pageSize: 10,
        t: Date.now()
      };
      axios
        .get("/os_kernel_userorgctr/app/user/list", {
          params: obj
        })
        .then(res => {
          console.log(res);
          this.tableAccout = res.data.result.records;
        })
        .catch(error => {
          console.log(error);
        });
    },
    add() {},
    roleSearch() {
      this.getAccountList();
    },
    selectAccount() {},
    selectAllAccount() {},
    edit() {},
    delrole() {}
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
/* IE fix */
#card-chart-01,
#card-chart-02 {
  width: 100% !important;
}

.search {
  padding: 20px 0;
}

.btn-box {
  width: 68px;
  display: inline-block;
  margin: 5px;
}

// .pageFixed{
//   position:fixed;
//   bottom:0px;
// }
.page {
  background: #fff;
  text-align: right;
}

.account {
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  .search-title {
    height: 100%;
    vertical-align: middle;
    line-height: 57px;
    font-weight: blod;
    font-weight: bold;
    text-align: left;
  }
  .right {
    text-align: right;
    line-height: 57px;
  }
}
.input-group {
  margin: 10px 0px;
}
.inline {
  display: inline-block;
}
</style>
