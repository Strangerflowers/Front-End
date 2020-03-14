<template>
  <div class="animated fadeIn">
    <b-row style="padding-top:20px;">
      <b-col sm="12" lg="12">
        <b-card no-body>
          <b-card-body>
            <div class="search-body card-body">
              <b-row class="mrl-4">
                <form class="form-inline">
                  <div class="form-group" style="margin-right:5px;">
                    <label for="exampleInputName2">系统名称：</label>
                    <b-form-select
                      v-model="form.selected"
                      id="exampleInputName2"
                      :options="form.options"
                      :plain="true"
                      class="system-select-width"
                    ></b-form-select>
                  </div>
                </form>
                <!-- <b-col> -->
                <div class="btn-box mrl10">
                  <button
                    type="button"
                    class="btn btn-primary btn-block func-item func-btn btn-sm"
                    @click="chooseSystem"
                  >查询</button>
                </div>
                <!-- <div class="text-center my-3">
                  <b-button
                    v-b-popover.hover.top="'I am popover directive content!'"
                    title="Popover Title"
                  >Hover Me</b-button>

                  <b-button id="popover-target-1">Hover Me</b-button>
                  <b-popover target="popover-target-1" triggers="hover" placement="top">
                    <template v-slot:title>Popover Title</template>
                    I am popover
                    <b>component</b> content!
                  </b-popover>
                </div> -->
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
              <b-tabs
                content-class="mt-3"
                @input="toggle"
                active-nav-item-class="font-weight-bold text-uppercase "
              >
                <b-tab title="用戶管理" active>
                  <!-- <b-card-text> -->
                  <div>
                    <b-row>
                      <b-col sm="12" lg="12">
                        <!-- <b-card no-body> -->
                        <!-- <b-card-body> -->
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
                        <!-- </b-card-body> -->
                        <!-- </b-card> -->
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
                              <!-- <el-table-column type="selection" width="55"></el-table-column> -->
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
                                    @click="showEdit(scope.row,1)"
                                  >配置数据元</el-button>
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
                  <!-- </b-card-text> -->
                </b-tab>
                <b-tab title="角色管理">
                  <!-- <b-card-text> -->
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
                                <!-- <el-table-column type="selection" width="55"></el-table-column> -->
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
                                      @click="showEdit(scope.row,4)"
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
                  <!-- </b-card-text> -->
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
      @ok="editPermissionElement"
      @hide="()=>{
        this.hasCheckedData = []
      }"
      cancel-title="关闭"
      ok-title="确定"
    >
      <template v-slot:modal-title>
        <div>
          <i class="fa fa-align-justify"></i>
          <span class="mrl10">数据权限配置</span>
        </div>
      </template>
      <b-tabs
        content-class="mt-3"
        @input="handleToggle"
        active-nav-item-class="font-weight-bold text-uppercase "
      >
        <b-tab title="资产树" active>
          <div class="datalist-content1">
            <span class="data-check-title">所拥有的数据权限元素:</span>
            <div class="data-check-item">
              <div v-if="dataperItem">
                <tree
                  :haspermission="hasCheckedData"
                  :defaultProps="props"
                  :editRole="dataperItem"
                  @check="check"
                  :strictly="strictly"
                  :loadNode="loadNode"
                  @checkChange="checkChange"
                  :appSysId="this.form.selected"
                ></tree>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab title="数据元素">
          <div class="datalist-content1">
            <div>
              <div>
                <form class="form-inline">
                  <div class="form-group" style="margin-right:5px;">
                    <label for="exampleInputName2">数据权限：</label>
                    <b-form-select
                      v-model="Asset.selected"
                      id="exampleInputName2"
                      :plain="true"
                      @input="getDataSearch"
                    >
                      <option
                        v-for="opt in Asset.options"
                        :value="opt.id"
                        :key="opt.id"
                      >{{opt.permName}}</option>
                    </b-form-select>
                  </div>
                </form>
                <!-- <div class="btn-box mrl10">
                  <button
                    type="button"
                    class="btn btn-primary btn-block func-item func-btn btn-sm"
                    @click="chooseSystem"
                  >查询</button>
                </div>-->
              </div>
            </div>
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
      strictly: false,
      Asset: {
        checkedNodes: {},
        options: [],
        dataSelect: ""
      },
      editRole: {},
      toggleNum: 0,
      dataperItem: {},
      props: {
        label: "assetSimpleName", //这里是树结构中需显示的数据（即接口返回的需展示在页面上的参数）
        children: [],
        isLeaf: "leaf"
      },
      filterNode: [],
      AssetTreeData: [], //资产树
      // 弹框
      haspermission: [], //拥有的功能
      hasdataper: [], //拥有的数据元素
      dataperminssion: [],
      dataCheck: [],
      dataProps: {
        label: "permElemName",
        children: "childAssetTree"
      },
      dataVisible: false,
      currentPage: 1,
      total: 0,
      tabsId: 0,
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
      accountId: "",
      hasCheckedData: [] //保存资产树已勾选的数据
    };
  },
  created() {
    this.accountId = JSON.parse(localStorage.getItem("userinfo")).userId;
    this.getSystem();
    // this.getAccountList();
    // this.getList();
  },
  methods: {
    // 获取各个系统
    getSystem() {
      this.$loading();
      axios
        .get("os_kernel_appsysctr/app/appsys/queryByUserId", {
          params: {
            authz_entity_id: this.accountId,
            t: Date.now()
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
        })
        .then(res => {
          // this.getList();
          this.getAccountList();
        })
        .catch(err => {
          this.$loading.close();
          console.log(err);
        });
    },
    indexMethod(index) {
      return index + 1 * 1;
    },
    // 根据系统查询
    chooseSystem() {
      if (this.tabsId == 0) {
        this.getAccountList();
      } else {
        this.getList();
      }
    },
    // 获取用户list
    getAccountList() {
      let obj = {
        appSysId: this.form.selected ? this.form.selected : undefined,
        userName: this.search.userName
          ? "*" + this.search.userName + "*"
          : undefined,
        workNum: this.search.workNum
          ? "*" + this.search.workNum + "*"
          : undefined,
        loginAcc: this.search.loginAcc
          ? "*" + this.search.loginAcc + "*"
          : undefined,
        mobile: this.search.mobile ? "*" + this.search.mobile + "*" : undefined,
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
          // console.log(res);
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
      this.tabsId = id;
      if (id === 0) {
        this.getAccountList();
      } else {
        this.getList();
      }
    },
    // 用户账号查询按钮
    handleSearch() {
      this.currentPage = 1;
      this.getAccountList();
    },
    // 获取角色列表
    getList() {
      let obj = {
        appSysId: this.form.selected ? this.form.selected : undefined,
        roleName: this.roleSearch.roleName
          ? "*" + this.roleSearch.roleName + "*"
          : undefined,
        roleCode: this.roleSearch.roleCode
          ? "*" + this.roleSearch.roleCode + "*"
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
    // 根据数据元素查询数据列表
    getDataSearch() {
      this.gethasDataPermission(this.dataperItem);
      this.getdatalist();
    },
    // 获取数据权限元素
    getDataPermEle() {
      axios
        .get("/os_kernel_authzctr/app/dataperm/list")
        .then(res => {
          console.log(res);
          this.dataVisible = true;
          if (res.data.code === 0) {
            this.Asset.options = res.data.result.records;
            this.Asset.selected = res.data.result.records[0].id;
            this.gethasDataPermission(this.dataperItem);
            this.getdatalist();
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 数据权限元素编辑
    showEdit(item, authzEntityType) {
      this.dataperItem = item;
      this.dataperItem.authzEntityType = authzEntityType;
      this.getDataPermEle();
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
      this.currentPage = 1;
      this.getList();
    },
    changeCurrentPage(num) {
      this.currentPage = num;
      if (this.tabsId == 0) {
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
    // 编辑数据权限元素
    editDataPermission() {
      let arr = [];
      this.dataCheck.map((item, idx) => {
        const temp = {
          authzEntityId: this.dataperItem.id, //角色id
          authzEntityType: this.dataperItem.authzEntityType,
          authzResId: item, //数据元素id
          authzResType:
            this.Asset.selected == "250a4f656853405f92e08bc837cfc9d1" ? 22 : 3,
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
          if (res.data.code === 0) {
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
          console.log(res);
          this.dataCheck = [];
          this.hasdataper = [];
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 编辑资产树
    editAssetTree() {
      // console.log("this.checkedNodes", this.checkedNodes);
      let condition = {};
      let delArr = [];
      let comArr = this.checkedNodes.checkedKeys.concat(
        this.checkedNodes.halfCheckedKeys
      );
      this.hasCheckedData.forEach(e => {
        if (!comArr.includes(e)) {
          return delArr.push(e);
        }
      });

      let arr = [];
      // console.log('filterNode',this.filterNode)
      this.filterNode.map(val => {
        const temp = {
          authzEntityId: this.dataperItem.id,
          authzEntityType: this.dataperItem.authzEntityType, // 被授权的实体类型（1：用户  2：组织org  3：组group  4：角色）
          authzResId: val.id,
          updateTime: Date.now()
        };
        return arr.push(temp);
      });
      let Drr = [];
      delArr.map(del => {
        const tem = {
          authzEntityId: this.dataperItem.id,
          authzEntityType: this.dataperItem.authzEntityType,
          authzResId: del,
          updateTime: Date.now()
        };
        return Drr.push(tem);
      });
      condition.userResAuthzList = arr;
      condition.unCheckUserResAuthzList = Drr;
      console.log("condition", condition);
      axios
        .post(
          "/os_kernel_authzctr/app/userResourceAuthz/editAssetMapping",
          condition,
          {
            headers: {
              "metadata-version": "1.1"
            }
          }
        )
        .then(res => {
          this.hasCheckedData = [];
          if (res.data.code === 0) {
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //  编辑数据权限元素与资产树
    editPermissionElement() {
      if (this.toggleNum === 0) {
        this.editAssetTree();
      } else {
        this.editDataPermission();
      }
    },
    // 获取数据权限列表
    getdatalist() {
      this.$loading();
      axios
        .get("/os_kernel_authzctr/app/datapermelem/list", {
          params: {
            pageSize: 100,
            dataPermId: this.Asset.selected
          }
        })
        .then(res => {
          this.$loading.close();
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
      axios
        .get("/os_kernel_authzctr/app/userResourceAuthz/list", {
          params: {
            authzEntityId: data.id,
            authzEntityType: this.dataperItem.authzEntityType,
            authzResType: 3,
            pageSize: 100,
            dataPermId: this.Asset.selected
          }
        })
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
    // 资产树选中子节点
    check({ data, checked }) {
      // 将点击的data在存放近数组前先去查找这个data在不在数组里面，如果存在则删除，不存在则添加
      // console.log('checked',checked)
      this.checkedNodes = checked;

      const checkedNodes = checked.checkedNodes;
      const spliceArr = [];

      // 如果子节点都被勾选，则把父节点找到，只传父节点id
      checkedNodes.forEach((e, index) => {
        checkedNodes.forEach((node, nodeIndex) => {
          if (
            e.childAssetTree &&
            e.childAssetTree.filter(child => child.id === node.id).length
          ) {
            spliceArr.push(node.id);
          }
        });
      });
      this.filterNode = checkedNodes.filter(
        node => !spliceArr.includes(node.id)
      );

      // console.log('spliceArr',spliceArr)
      console.log("filterNode111", this.filterNode);
    },
    checkChange() {},
    // 切换资产树
    handleToggle(num) {
      this.toggleNum = num;
    },
    // 异步树叶子节点懒加载逻辑
    loadNode(node, resolve) {
      // console.log("editRole1", this.editRole);
      // 一级节点处理
      if (node.level === 0) {
        this.requestTree(node, resolve);
      }
      // 其余节点处理
      if (node.level >= 1) {
        // 注意！把resolve传到你自己的异步中去
        this.getIndex(node, resolve);
      }
    },
    // 异步加载叶子节点数据函数
    getIndex(node, resolve) {
      // this.editRole = this.dataperItem;
      console.log("node++", node);
      this.$loading();
      axios
        .get("/os_kernel_authzctr/app/funcperm/queryAssetTreeById", {
          params: {
            id: node.data.id,
            appSysId: this.form.selected,
            userId:
              this.dataperItem.authzEntityType == 1
                ? this.dataperItem.id
                : undefined,
            roleId:
              this.dataperItem.authzEntityType == 4
                ? this.dataperItem.id
                : undefined
          },
          headers: {
            "metadata-version": "1.1"
          }
        })
        .then(res => {
          this.$loading.close();
          let halfCheck = []; //声明一个数组来存放半选状态的节点id
          // 此处需要后台传过来一个值来判断每个节点有无子节点,实际项目中必须加上（如isRealLeaf），不传都默认为叶子节点
          res.data.result.forEach(value => {
            if (!value.childAssetTree || value.childAssetTree.length <= 0) {
              value.leaf = true; //不为叶子节点
            } else {
              value.leaf = false; //为叶子节点
            }
          });
          let data = res.data.result;
          res.data.result.forEach(val => {
            if (val.isChecked == 2) {
              return this.hasCheckedData.push(val.id);
            }
            if (val.isChecked == 1) {
              halfCheck.push(val.id);
            }
          });
          // 解决父级选中状态在点击时会失效的问题
          if (this.hasCheckedData.length > 0 || halfCheck <= 0) {
            this.strictly = false;
          } else {
            this.strictly = true;
          }
          resolve(data);
          console.log("node--", node);
          // 保证父节点勾选状态不改变
          if (node.data.isChecked === 1) {
            node.indeterminate = true;
          }
          if (node.data.isChecked === 2) {
            node.checked = true;
          }
          node.childNodes.forEach(ele => {
            if (ele.data.isChecked == 1) {
              ele.indeterminate = true;
            } else if (ele.data.isChecked == 2) {
              ele.checked = true;
            }
            // console.log('child-ele',ele)
          });
        })
        .catch(error => {
          this.$loading.close();
        });
    },
    // 首次加载一级节点数据函数
    requestTree(node, resolve, indeterminate) {
      // console.log("item", this.editRole);
      this.$loading();
      axios
        .get("/os_kernel_authzctr/app/funcperm/queryAssetTreeById", {
          params: {
            id: "0bd285d0e00611e99de100155d1b3d06",
            userId:
              this.dataperItem.authzEntityType == 1
                ? this.dataperItem.id
                : undefined,
            roleId:
              this.dataperItem.authzEntityType == 4
                ? this.dataperItem.id
                : undefined,
            appSysId: this.form.selected
          },
          headers: {
            "metadata-version": "1.1"
          }
        })
        .then(res => {
          this.$loading.close();
          // 此处需要后台传过来一个值来判断每个节点有无子节点,
          res.data.result.forEach(value => {
            if (!value.childAssetTree || value.childAssetTree.length <= 0) {
              value.leaf = true; //不为叶子节点
            } else {
              value.leaf = false; //为叶子节点
            }
          });
          let data = res.data.result;
          res.data.result.forEach(val => {
            if (val.isChecked == 2) {
              return this.hasCheckedData.push(val.id);
            }
          });
          resolve(data);
          node.childNodes.forEach(ele => {
            if (ele.data.isChecked == 1) {
              ele.indeterminate = true;
            } else if (ele.data.isChecked == 2) {
              ele.checked = true;
            }
          });
        })
        .catch(error => {
          this.$loading.close();
        });
    }
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
  height: 500px;
  // height:338px;
  overflow: hidden;
  overflow-y: auto;
}
.datalist-content1 {
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
.mrl-4 {
  margin-left: -4px;
}
</style>
