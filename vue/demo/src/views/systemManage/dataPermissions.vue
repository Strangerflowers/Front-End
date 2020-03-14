<template>
  <div class="animated fadeIn">
    <b-row class="search">
      <b-col sm="12" lg="12">
        <b-card>
          <b-card-body>
            <div>
              <b-tabs content-class="mt-3" active-nav-item-class="font-weight-bold text-uppercase ">
                <b-tab title="用戶管理" active @click="toggle('user')">
                  <div>
                    <b-row>
                      <b-col sm="12" lg="12">
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
                                          @click="handleSearch"
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
                                      ref="userName"
                                      v-model="search.userName"
                                      placeholder="请输入用户姓名查询"
                                      class="form-control auth-form-control border-3r"
                                    />
                                    <i
                                      v-show="search.userName"
                                      @click="emitEmpty('userName')"
                                      class="cui-circle-x icons clearIcon"
                                    ></i>
                                  </div>
                                </b-col>
                                <b-col sm="6" lg="4">
                                  <div class="input-group">
                                    <label for="basicAccount" class="col-form-label">用户账号：</label>
                                    <input
                                      v-model="search.loginAcc"
                                      id="basicAccount"
                                      type="text"
                                      ref="loginAcc"
                                      placeholder="请输入用户账号查询"
                                      class="form-control auth-form-control border-3r"
                                    />
                                    <i
                                      v-show="search.loginAcc"
                                      @click="emitEmpty('loginAcc')"
                                      class="cui-circle-x icons clearIcon"
                                    ></i>
                                  </div>
                                </b-col>
                                <b-col sm="6" lg="4">
                                  <div class="input-group" style="width:100%;">
                                    <form class="form-inline">
                                      <div class="form-group">
                                        <label for="exampleInputName2" class="inline">外部人员 :</label>
                                        <b-form-select
                                          class="inline select-width"
                                          v-model="search.userType"
                                          id="exampleInputName2"
                                          :options="search.optionstype"
                                          :plain="true"
                                        ></b-form-select>
                                      </div>
                                    </form>
                                  </div>
                                </b-col>

                                <b-col sm="6" lg="4">
                                  <div class="input-group">
                                    <label for="basicMobile" class="col-form-label">手机号码：</label>
                                    <input
                                      v-model="search.mobile"
                                      id="basicMobile"
                                      type="text"
                                      ref="mobile"
                                      placeholder="请输入手机号码名称查询"
                                      class="form-control auth-form-control border-3r"
                                    />
                                    <i
                                      v-show="search.mobile"
                                      @click="emitEmpty('mobile')"
                                      class="cui-circle-x icons clearIcon"
                                    ></i>
                                  </div>
                                </b-col>
                                <b-col sm="6" lg="4">
                                  <div class="input-group">
                                    <label
                                      for="basicWork"
                                      class="col-form-label"
                                    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;工号：</label>
                                    <input
                                      v-model="search.workNum"
                                      id="basicWork"
                                      type="text"
                                      ref="workNum"
                                      placeholder="请输入工号查询"
                                      class="form-control auth-form-control border-3r"
                                    />
                                    <i
                                      v-show="search.workNum"
                                      @click="emitEmpty('workNum')"
                                      class="cui-circle-x icons clearIcon"
                                    ></i>
                                  </div>
                                </b-col>
                                <b-col sm="6" lg="4">
                                  <div class="input-group" style="width:100%;">
                                    <form class="form-inline">
                                      <div class="form-group">
                                        <label
                                          for="exampleInputName3"
                                          class="inline"
                                        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;状态 :</label>
                                        <b-form-select
                                          class="inline select-width"
                                          v-model="search.status"
                                          id="exampleInputName3"
                                          :options="search.optionstatus"
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
                      </b-col>
                    </b-row>
                  </div>
                  <div>
                    <b-row class="mrt20">
                      <b-col>
                        <div class="datalist-tab">
                          <template>
                            <el-table
                              :data="tableAccout"
                              ref="table"
                              :cell-style="{color:'#000',textAlign:'center'}"
                              :header-cell-style="{background:'#E4E7EA',color:'#5C6873',textAlign:'center'}"
                              style="width: 100%"
                              border
                              @select="selectAccount"
                              @select-all="selectAllAccount"
                            >
                              <el-table-column
                                type="index"
                                :index="indexMethod"
                                label="序号"
                                width="50"
                              ></el-table-column>
                              <el-table-column prop="workNum" label="工号" width="100"></el-table-column>
                              <el-table-column
                                prop="userName"
                                label="用户姓名"
                                :show-overflow-tooltip="true"
                              ></el-table-column>
                              <el-table-column prop="gender" label="性别" width="50">
                                <template slot-scope="scope">
                                  <span v-show="scope.row.gender===1">男</span>
                                  <span v-show="scope.row.gender===2">女</span>
                                </template>
                              </el-table-column>
                              <el-table-column
                                prop="email"
                                label="邮箱"
                                :show-overflow-tooltip="true"
                              ></el-table-column>
                              <el-table-column
                                prop="mobile"
                                width="100"
                                label="手机号码"
                                :show-overflow-tooltip="true"
                              ></el-table-column>
                              <el-table-column prop="status" label="状态" width="60">
                                <template slot-scope="scope">
                                  <span v-show="scope.row.status===1">启用</span>
                                  <span v-show="scope.row.status===2">禁用</span>
                                </template>
                              </el-table-column>
                              <el-table-column prop="userType" label="是否外部人员" width="100">
                                <template slot-scope="scope">
                                  <span v-show="scope.row.userType===1">是</span>
                                  <span v-show="scope.row.userType===2">否</span>
                                </template>
                              </el-table-column>
                              <el-table-column
                                prop="description"
                                label="备注"
                                width="100"
                                :show-overflow-tooltip="true"
                              ></el-table-column>
                              <el-table-column
                                fixed="right"
                                label="操作"
                                width="120"
                                :show-overflow-tooltip="true"
                              >
                                <template slot-scope="scope">
                                  <el-button
                                    type="text"
                                    size="small"
                                    @click="editAccountData(scope.row)"
                                  >数据权限元素</el-button>
                                </template>
                              </el-table-column>
                            </el-table>
                          </template>
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                  <template>
                    <div class="pageFixed">
                      <div class="overflow-auto">
                        <b-pagination
                          align="right"
                          v-model="currentPage"
                          :per-page="10"
                          @change="changeCurrentPage"
                          :total-rows="total"
                        ></b-pagination>
                      </div>
                    </div>
                  </template>
                </b-tab>
                <b-tab title="角色管理" @click="toggle('role')">
                  <div>
                    <b-row>
                      <b-col sm="12" lg="12">
                        <div class="search-body">
                          <b-row>
                            <b-col>
                              <div class="account">
                                <b-row>
                                  <b-col sm="6" lg="6">
                                    <div class="search-title">角色查询</div>
                                  </b-col>
                                  <b-col sm="6" lg="6">
                                    <div class="right">
                                      <div class="btn-box">
                                        <button
                                          type="button"
                                          class="btn btn-primary btn-block func-item func-btn btn-sm"
                                          @click="handleRoleSearch"
                                        >查询</button>
                                      </div>
                                    </div>
                                  </b-col>
                                </b-row>
                              </div>
                              <b-row>
                                <b-col sm="6" lg="4">
                                  <div class="input-group">
                                    <label for="basicRoleName" class="col-form-label">角色名称：</label>
                                    <input
                                      id="basicRoleName"
                                      type="text"
                                      v-model="roleSearch.roleName"
                                      ref="roleName"
                                      placeholder="请输入角色名称查询"
                                      class="form-control auth-form-control border-3r"
                                    />
                                    <i
                                      v-show="roleSearch.roleName"
                                      @click="emitEmpty('roleName')"
                                      class="cui-circle-x icons clearIcon"
                                    ></i>
                                  </div>
                                </b-col>
                                <b-col sm="6" lg="4">
                                  <div class="input-group">
                                    <label for="basicRoleCode" class="col-form-label">角色编码：</label>
                                    <input
                                      v-model="roleSearch.roleCode"
                                      id="basicRoleCode"
                                      type="text"
                                      ref="roleCode"
                                      placeholder="请输入用户账号角色编码查询"
                                      class="form-control auth-form-control border-3r"
                                    />
                                    <i
                                      v-show="roleSearch.roleCode"
                                      @click="emitEmpty('roleCode')"
                                      class="cui-circle-x icons clearIcon"
                                    ></i>
                                  </div>
                                </b-col>

                                <b-col sm="6" lg="4">
                                  <div class="input-group" style="width:100%;">
                                    <form class="form-inline">
                                      <div class="form-group">
                                        <label
                                          for="exampleInputName5"
                                          class="inline"
                                        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;状态 :</label>
                                        <b-form-select
                                          class="inline select-width"
                                          v-model="roleSearch.status"
                                          id="exampleInputName5"
                                          :options="roleSearch.optionstatus"
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
                      </b-col>
                    </b-row>
                  </div>
                  <b-row style="margin-top:20px;">
                    <b-col sm="12" lg="12">
                      <div>
                        <b-row>
                          <b-col>
                            <template>
                              <el-table
                                :data="tableData"
                                style="width: 100%"
                                :cell-style="{color:'#000',textAlign:'center'}"
                                :header-cell-style="{background:'#E4E7EA',color:'#5C6873',textAlign:'center'}"
                                border
                              >
                                <el-table-column type="index" :index="indexMethod" label="序号"></el-table-column>
                                <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
                                <el-table-column prop="roleCode" label="角色编码" width="180"></el-table-column>
                                <el-table-column prop="description" label="备注"></el-table-column>
                                <el-table-column prop="updateTime" label="更新时间"></el-table-column>
                                <el-table-column prop="updateTime" label="创建时间"></el-table-column>
                                <el-table-column prop="status" label="状态" width="180">
                                  <template slot-scope="scope">
                                    <span v-show="scope.row.status===1">启用</span>
                                    <span v-show="scope.row.status===2">禁用</span>
                                  </template>
                                </el-table-column>
                                <el-table-column fixed="right" label="操作" width="120">
                                  <template slot-scope="scope">
                                    <el-button
                                      type="text"
                                      size="small"
                                      @click="editRoleData(scope.row)"
                                    >数据权限元素</el-button>
                                  </template>
                                </el-table-column>
                              </el-table>
                            </template>
                          </b-col>
                        </b-row>
                      </div>
                      <template>
                        <div class="pageFixed">
                          <div class="overflow-auto">
                            <b-pagination
                              align="right"
                              :per-page="10"
                              v-model="currentPage"
                              @change="changeCurrentPage"
                              :total-rows="total"
                            ></b-pagination>
                          </div>
                        </div>
                      </template>
                    </b-col>
                  </b-row>
                </b-tab>
              </b-tabs>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <!-- 数据权限元素 -->
    <b-modal
      title="数据权限配置"
      v-model="dataVisible"
      @ok="editDataPermission"
      cancel-title="关闭"
      ok-title="确定"
    >
      <template v-slot:modal-title>
        <div>
          <i class="fa fa-align-justify"></i>
          <span class="mrl10">数据权限配置</span>
        </div>
      </template>
      <b-tabs content-class="mt-3" active-nav-item-class="font-weight-bold text-uppercase ">
        <b-tab title="资产树" active>
            <div class="datalist-content">
            <span class="data-check-title">所拥有的数据权限元素:</span>
            <div class="data-check-item">
               <div v-if="dataperItem">
            <tree :defaultProps="props" :editRole="dataperItem" @check="check"></tree>
          </div>
            </div>
          </div>

        </b-tab>
        <b-tab title="数据元素">
          <div class="datalist-content">
            <span class="data-check-title">所拥有的数据权限元素:</span>
            <div class="data-check-item">
              <el-tree
                :data="dataperminssion"
                :default-checked-keys="hasdataper"
                show-checkbox
                node-key="id"
                @check="checkDataPermission"
                :props="dataProps"
              ></el-tree>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </b-modal>
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
      // 弹框
      haspermission: [], //拥有的功能
      hasdataper: [], //拥有的数据元素
      dataperminssion: [],
      dataCheck: [],
      dataProps: {
        label: "permElemName"
      },
      dataVisible: false,
      currentPage: 1,
      total: 0,
      tabsId: "user",
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
        userType: 0,
        optionstype: [
          { value: 0, text: "全部" },
          { value: 1, text: "是" },
          { value: 2, text: "否" }
        ],
        status: 0,
        optionstatus: [
          { value: 0, text: "全部" },
          { value: 1, text: "启用" },
          { value: 2, text: "禁用" }
        ],
        pageNo: 1,
        pageSize: 10
      },
      roleSearch: {
        roleName: "",
        roleCode: "",
        status: 0,
        optionstatus: [
          { value: 0, text: "全部" },
          { value: 1, text: "启用" },
          { value: 2, text: "禁用" }
        ]
      },
      tableAccout: [],
      tableData: [],
      datalist: [],

      //<<< tree
      dataperItem: {},
      props: {
        label: "modName", //这里是树结构中需显示的数据（即接口返回的需展示在页面上的参数）
        children: [],
        isLeaf: "leaf"
      },
      filterNode:[],
      // >>>>
    };
  },
  created() {
    this.getSystem();
    this.getAccountList();
    // this.getList();
  },
  methods: {
    // 获取各个系统
    getSystem() {
      this.$loading();
      axios
        .get("os_kernel_appsysctr/app/appsys/queryByUserId", {
          params: {
            authz_entity_id: "0e08e153-b04a-11e9-b31b-b06ebf14a476"
          }
        })
        .then(res => {
          this.$loading.close();
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
          this.$loading.close();
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
        status: this.search.status ? this.search.status : undefined,
        userType: this.search.userType ? this.search.userType : undefined,
        pageNo: this.currentPage,
        pageSize: 10,
        t: Date.now()
      };
      this.$loading();
      axios
        .get("/os_kernel_userorgctr/app/user/list", {
          params: obj
        })
        .then(res => {
          this.$loading.close();
          console.log(res);
          this.tableAccout = res.data.result.records;
          this.total = res.data.result.total;
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    toggle(id) {
      this.currentPage = 1;
      if (id === "user") {
        this.tabsId = "user";
        this.getAccountList();
      } else if (id === "role") {
        this.tabsId = "role";
        this.getList();
      }
    },
    // 用户账号查询按钮
    handleSearch() {
      this.getAccountList();
    },
    // 获取角色列表
    getList() {
      let obj = {
        roleName: this.roleSearch.roleName
          ? this.roleSearch.roleName
          : undefined,
        roleCode: this.roleSearch.roleCode
          ? this.roleSearch.roleCode
          : undefined,
        status: this.roleSearch.status ? this.roleSearch.status : undefined,
        pageNo: this.currentPage,
        pageSize: 10,
        t: Date.now()
      };
      this.$loading();
      axios
        .get("/os_kernel_authzctr/app/role/list", {
          params: obj
        })
        .then(res => {
          this.$loading.close();
          this.tableData = res.data.result.records;
          this.datalist = res.data.result;
          this.total = res.data.result.total;
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    // 数据权限
    editRoleData(item) {
      this.dataperItem = item;
      this.gethasDataPermission(item);
      this.getdatalist();
      this.dataVisible = true;
    },
    editAccountData(item) {
      this.dataperItem = item;
      this.gethasDataPermission(item);
      this.getdatalist();
      this.dataVisible = true;
    },
    // input框删除操作
    emitEmpty(type) {
      const Picker = {
        roleCode: () => {
          this.$refs.roleCode.focus();
          this.roleSearch.roleCode = "";
        },
        roleName: () => {
          this.$refs.roleName.focus();
          this.roleSearch.roleName = "";
        },
        // 账号管理
        userName: () => {
          this.$refs.userName.focus();
          this.search.userName = "";
        },
        loginAcc: () => {
          this.$refs.loginAcc.focus();
          this.search.loginAcc = "";
        },
        workNum: () => {
          this.$refs.workNum.focus();
          this.search.workNum = "";
        },
        mobile: () => {
          this.$refs.mobile.focus();
          this.search.mobile = "";
        }
      }[type]();
    },
    // 角色查询按钮
    handleRoleSearch() {
      this.getList();
    },
    changeCurrentPage(num) {
      this.currentPage = num;
      if (this.tabsId == "user") {
        this.getAccountList();
      } else {
        this.getList();
      }
    },
    selectAccount() {},
    selectAllAccount() {},
    checkDataPermission(data, checked) {
      let idx = this.dataCheck.indexOf(data.id);
      if (idx == -1) {
        this.dataCheck.push(data.id);
      } else {
        this.dataCheck.splice(idx, 1);
      }
    },
    // 资产树选着子节点
    check({ data, checked }) {

      // 将点击的data在存放近数组前先去查找这个data在不在数组里面，如果存在则删除，不存在则添加
      // console.log('data',data)
      // console.log('checked',checked)
      const checkedNodes = checked.checkedNodes;
      const spliceArr = [];
      // checkedNodes.forEach((node, index) => {
      //   spliceArr.push(node.id);
      // });
      // this.filterNode = spliceArr;

      // 如果子节点都被勾选，则把父节点找到，只传父节点id
      checkedNodes.forEach((e, index) => {
        checkedNodes.forEach((node, nodeIndex) => {
          if (
            e.appSysModuleDtoList &&
            e.appSysModuleDtoList.filter(child => child.id === node.id).length
          ) {
            spliceArr.push(node.id);
          }
        });
      });
      this.filterNode = checkedNodes.filter(node => !spliceArr.includes(node.id))
      // console.log('spliceArr',spliceArr)
      // console.log('filterNode',this.filterNode)
    },
    // 编辑数据权限元素
    editDataPermission() {
      let arr = [];
      this.dataCheck.map((item, idx) => {
        const temp = {
          authzEntityId: this.dataperItem.id, //角色id
          authzEntityType: 4,
          authzResId: item, //数据元素id
          authzResType: 3,
          updateTime: Date.now(),
          delFlag: 0,
          isExternalRes: 0,
          appSysId: this.dataperItem.appsysid
        };
        return arr.push(temp);
      });
      this.$loading();
      axios
        .post("/os_kernel_authzctr/app/userResourceAuthz/update", arr)
        .then(res => {
          this.$loading.close();
          console.log(res);
          this.dataCheck = [];
          this.hasdataper = [];
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取数据权限列表
    getdatalist() {
      this.$loading();
      axios
        .get("/os_kernel_authzctr/app/datapermelem/list?pageSize=100")
        .then(res => {
          this.$loading.close();
          console.log("数据权限列表", res);
          this.dataperminssion = res.data.result.records;
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    // 获取拥有的数据权限
    gethasDataPermission(data) {
      this.$loading();
      // console.log('this.routers.id',this.routers.id )
      axios
        .get(
          "/os_kernel_authzctr/app/userResourceAuthz/list?authzEntityId=" +
            data.id +
            "&authzEntityType=4&authzResType=3&pageSize=100"
        )
        .then(res => {
          this.$loading.close();
          this.hasdataper = res.data.result.records.map(item => {
            return item.authzResId;
          });
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },

    // // 以下代码是异步加载tree的部分
    // // 异步加载叶子节点数据函数
    // getIndex(node, resolve) {
    //   this.$loading();
    //   axios
    //     .get("/os_kernel_appsysctr/app/appsysModule/queryChildNodeByParentId", {
    //       params: {
    //         parentId: node.data.id,
    //         appSysId: this.dataperItem.appSysId,
    //         roleId: this.dataperItem.id
    //       }
    //     })
    //     .then(res => {
    //       this.$loading.close();
    //       // 此处需要后台传过来一个值来判断每个节点有无子节点,实际项目中必须加上（如isRealLeaf），不传都默认为叶子节点
    //       res.data.result.appSysModuleDtoList.forEach(value => {
    //         if (!value.appSysModuleDtoList) {
    //           value.leaf = true; //不为叶子节点
    //         } else {
    //           value.leaf = false; //为叶子节点
    //           // value.icon = "half";
    //         }
    //         if (value.isLeaf) {
    //           value.disabled = false;
    //           // console.log("value", value);
    //           if (value.funcPermStatus == 2) {
    //             value.icon = "el-icon-sunrise";
    //             value.icon1 = "el-icon-tickets";
    //           }
    //         } else {
    //           value.disabled = true;
    //         }
    //       });
    //       let data = res.data.result.appSysModuleDtoList;
    //       resolve(data);
    //       if (node.data.funcPermStatus === 1) {
    //         node.indeterminate = true;
    //       }
    //       if (node.data.funcPermStatus === 2) {
    //         node.checked = true;
    //       }
    //       node.childNodes.forEach(ele => {
    //         if (ele.data.funcPermStatus == 1) {
    //           ele.indeterminate = true;
    //         } else if (ele.data.funcPermStatus == 2) {
    //           ele.checked = true;
    //         }
    //       });
    //     })
    //     // .then(res1 => {
    //     //   // node.indeterminate = true
    //     //   // node.childNodes[1].indeterminate = true;
    //     //   // let status = document.getElementsByClassName("half")
    //     //   // for(let i=0;i<status.length;i++){
    //     //   //   status[i].parentNode.previousElementSibling.firstChild.classList.add("is-indeterminate");
    //     //   // }
    //     // })
    //     .catch(error => {
    //       this.$loading.close();
    //     });
    // },
    // // 首次加载一级节点数据函数
    // requestTree(node, resolve, indeterminate) {
    //   console.log("item", this.dataperItem);
    //   this.$loading();
    //   axios
    //     .get(
    //       "/os_kernel_appsysctr/app/appsysModule/queryModuleRootNodeByAppSysId",
    //       {
    //         params: {
    //           // appSysId: "0d3cf02e6bda59431721a979a5209e28",
    //           roleId: this.dataperItem.id,
    //           appSysId: this.dataperItem.appSysId
    //         }
    //       }
    //     )
    //     .then(res => {
    //       console.log("tedt", res);
    //       this.$loading.close();
    //       // console.log('授权',res)
    //       // 此处需要后台传过来一个值来判断每个节点有无子节点,实际项目中必须加上（如isRealLeaf），不传都默认为叶子节点
    //       res.data.result.appSysModuleDtoList.forEach(value => {
    //         if (!value.appSysModuleDtoList) {
    //           value.leaf = true; //为叶子节点
    //         } else {
    //           value.leaf = false; //不为叶子节点
    //           // value.icon = "el-icon-minus half";
    //         }
    //         if (value.isLeaf) {
    //           value.disabled = false;

    //           if (value.funcPermStatus == 2) {
    //             value.icon = "el-icon-sunrise";
    //             value.icon1 = "align-left";
    //           }
    //           // value.icon = "el-icon-sunrise";
    //         } else {
    //           value.disabled = true;
    //         }
    //       });

    //       let data = res.data.result.appSysModuleDtoList;
    //       resolve(data);
    //       node.childNodes.forEach(ele => {
    //         if (ele.data.funcPermStatus == 1) {
    //           ele.indeterminate = true;
    //         } else if (ele.data.funcPermStatus == 2) {
    //           ele.checked = true;
    //         }
    //       });
    //     })
    //     .then(res1 => {
    //       let status = document.getElementsByClassName("half");
    //       for (let i = 0; i < status.length; i++) {
    //         status[
    //           i
    //         ].parentNode.previousElementSibling.firstChild.classList.add(
    //           "is-indeterminate"
    //         );
    //       }
    //       // cla.parentNode.previousElementSibling.firstChild.classList.add("is-indeterminate");

    //       //  let classicon = document.getElementsByClassName("half")[0].parentNode.previousElementSibling.firstChild.classList.add("is-indeterminate");

    //       //  let parent =.parentNode
    //       // console.log("ref", status);
    //     })
    //     .catch(error => {});
    // }
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
.pageFixed {
  margin-top: 30px;
}
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
.tab-content {
  margin-top: -1px;
  background: #fff;
  border: 0px solid #c8ced3;
  border-radius: 0 0 0.25rem 0.25rem;
}
.select-width {
  width: 150px;
  margin-left: 8px;
}
.mrt20 {
  margin-top: 20px;
}
.text-uppercase {
  color: #007bff;
}
.mrl10 {
  margin-left: 10px;
}
.datalist-content {
  width: 100%;
  text-align: left;
  height: 400px;
  // height:338px;
  overflow: hidden;
  overflow-y: auto;
}
.data-check-title {
  padding-left: 10%;
}
.data-check-item {
  padding-left: 20%;
}
</style>
