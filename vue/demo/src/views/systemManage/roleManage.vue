<template >
  <div class="animated fadeIn" v-if="show=='true'">
    <b-row class="search">
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
                <div class="btn-box mrl10">
                  <button
                    icon="el-icon-plus"
                    type="button"
                    class="btn btn-primary btn-block func-item func-btn btn-sm"
                    @click="add"
                  >新增</button>
                </div>
                <!-- </b-col> -->
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
              <div>
                <b-row>
                  <b-col sm="12" lg="12">
                    <b-card no-body class="mr-30">
                      <!-- <b-card-body> -->
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
                                    ref="searchName"
                                    v-model="Search.roleName"
                                    placeholder="请输入角色名称查询"
                                    class="form-control auth-form-control border-3r"
                                  />
                                  <i
                                    v-show="Search.roleName"
                                    @click="emitEmpty('searchName')"
                                    class="cui-circle-x icons clearIcon"
                                  ></i>
                                </div>
                              </b-col>
                              <b-col sm="6" lg="4">
                                <div class="input-group">
                                  <label for="basicRoleCode" class="col-form-label">角色编码：</label>
                                  <input
                                    v-model="Search.roleCode"
                                    id="basicRoleCode"
                                    type="text"
                                    ref="searchCode"
                                    placeholder="请输入用户账号角色编码查询"
                                    class="form-control auth-form-control border-3r"
                                  />
                                  <i
                                    v-show="Search.roleCode"
                                    @click="emitEmpty('searchCode')"
                                    class="cui-circle-x icons clearIcon"
                                  ></i>
                                </div>
                              </b-col>

                              <b-col sm="6" lg="4">
                                <div class="input-group" style="width:100%;">
                                  <form class="form-inline">
                                    <div class="form-group">
                                      <label
                                        for="exampleInputName1"
                                        class="inline"
                                      >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;状态：</label>
                                      <b-form-select
                                        class="inline select-width mb-2 mr-sm-2"
                                        v-model="Search.status"
                                        id="exampleInputName1"
                                        :options="Search.optionstatus"
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
                    </b-card>
                  </b-col>
                </b-row>
              </div>
              <b-row style="margin-top:20px;">
                <b-col>
                  <template>
                    <el-table
                      :data="tableData"
                      style="width: 100%"
                      :cell-style="{color:'#000',textAlign:'center'}"
                      :header-cell-style="{background:'#E4E7EA',color:'#5C6873',textAlign:'center'}"
                      border
                    >
                      <el-table-column type="selection" width="55"></el-table-column>
                      <!-- <el-table-column type="index" :index="indexMethod"></el-table-column> -->
                      <el-table-column prop="roleName" label="角色名称" width="189"></el-table-column>
                      <el-table-column prop="roleCode" label="角色编码"></el-table-column>
                      <el-table-column
                        prop="description"
                        label="备注"
                        width="150"
                        :show-overflow-tooltip="true"
                      ></el-table-column>
                      <el-table-column prop="updateTime" label="更新时间"></el-table-column>
                      <el-table-column prop="updateTime" label="创建时间"></el-table-column>
                      <el-table-column prop="status" label="状态" width="70">
                        <template slot-scope="scope">
                          <span v-show="scope.row.status===1">启用</span>
                          <span v-show="scope.row.status===2">停用</span>
                        </template>
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" min-width="300">
                        <template slot-scope="scope">
                          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                          <el-button type="text" size="small" @click="handleAuth(scope.row)">授权</el-button>
                          <el-button type="text" size="small" @click="dataitem(scope.row)">配置数据元</el-button>
                          <el-button type="text" size="small" @click="handleStatus(scope.row)">
                            <span v-show="scope.row.status===2">启用</span>
                            <span v-show="scope.row.status===1" style="color:#f00;">停用</span>
                          </el-button>
                          <el-button type="text" size="small" @click="delrole(scope.row)">删除</el-button>
                          <el-button type="text" size="small" @click="bindAccount(scope.row)">绑定账号</el-button>
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
                    v-model="currentPage"
                    @change="changeCurrentPage"
                    :per-page="10"
                    :total-rows="total"
                  ></b-pagination>
                </div>
              </div>
            </template>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <!-- 授权控件弹框 -->
    <b-modal
      title="角色权限配置"
      v-model="dialogVisible"
      @ok="editPermission"
      @hide="()=>{
        this.funcPermissions = [];
        this.has_data = [];
        }"
      cancel-title="关闭"
      ok-title="确定"
    >
      <template v-slot:modal-title>
        <div>
          <i class="fa fa-align-justify"></i>
          <span class="mrr10">角色权限配置</span>
        </div>
      </template>
      <div class="datalist-content">
        <span>所拥有的权限:</span>
        <!--默认勾选的节点 :default-checked-keys="haspermission" -->
        <el-tree
          :props="props"
          :load="loadNode"
          node-key="id"
          ref="tree"
          show-checkbox
          highlight-current
          lazy
          :check-strictly="checkStrictly"
          @check="check"
        >
          <!-- :render-content="renderContent" -->
          <span class="custom-tree-node" slot-scope="{node,data}">
            <span style="padding-left: 4px;">{{node.label}}</span>
            <i
              @click="showGrantdata(data)"
              style="color:#f00;padding:0 10px;"
              v-show="data.icon"
              :class="data.icon"
            >数据权限配置</i>
            <i
              @click="showOperation(data)"
              style="color:blue;padding:0 10px;"
              v-show="data.icon1"
              :class="data.icon1"
            >通用操作配置</i>
          </span>
        </el-tree>
      </div>
    </b-modal>
    <!-- 授权---功能权限---分配操作（通用操作弹框） -->
    <b-modal
      title="通用操作配置"
      v-model="opaVisible"
      @ok="editopaPermission"
      @hidden="()=>{
        this.opechecked = []
        }"
      cancel-title="关闭"
      ok-title="确定"
    >
      <template v-slot:modal-title>
        <div>
          <i class="fa fa-align-justify"></i>
          <span class="mrr10">通用操作配置</span>
        </div>
      </template>
      <div class="datalist-content">
        <span class="data-check-title">所拥有的通用操作:</span>
        <template>
          <el-checkbox-group v-model="opahasData" class="data-check-item" style="margin-left: 5%;">
            <el-checkbox
              class="block"
              v-for="opa in opaData"
              :label="opa.id"
              :key="opa.id"
              @change="operation(opa)"
            >{{opa.modName}}</el-checkbox>
          </el-checkbox-group>
        </template>
      </div>
    </b-modal>
    <!--授权--- 数据权限配置 -->
    <b-modal
      title="数据权限配置"
      v-model="dataGrantVisible"
      @ok="editGrantPermission"
      @hide="()=>{this.checkedDatagrant = []}"
      cancel-title="关闭"
      ok-title="确定"
    >
      <template v-slot:modal-title>
        <div>
          <i class="fa fa-align-justify"></i>
          <span class="mrr10">数据权限配置</span>
        </div>
      </template>
      <div class="datalist-content">
        <span class="data-check-title">所拥有的数据权限元素:</span>
        <div class="data-check-item">
          <el-tree
            :data="datagrant"
            :default-checked-keys="has_datagrant"
            show-checkbox
            node-key="id"
            @check="checkdatagrant"
            :props="datagrantProps"
          ></el-tree>
        </div>
      </div>
    </b-modal>
    <!-- 数据权限元素 -->
    <b-modal
      title="数据权限配置"
      v-model="dataVisible"
      @ok="editPermissionElement"
      @hide="()=>{
        this.dataCheck = []
        }"
      cancel-title="关闭"
      ok-title="确定"
    >
      <template v-slot:modal-title>
        <div>
          <i class="fa fa-align-justify"></i>
          <span class="mrr10">数据权限配置</span>
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
                  :defaultProps="Asset.props"
                  :editRole="dataperItem"
                  :haspermission="Asset.hasCheckedData"
                  :strictly="Asset.strictly"
                  :loadNode="loadAsset"
                  @check="checkTree"
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
    <!-- 编辑弹框 -->
    <b-modal
      title="编辑"
      v-model="editVisible"
      @ok="submitEdit"
      @hidden="resetAddModal"
      cancel-title="关闭"
      ok-title="确定"
    >
      <template v-slot:modal-title>
        <div>
          <i class="fa fa-align-justify"></i>
          <span class="mrr10">编辑</span>
        </div>
      </template>
      <div class="input-group mr25 mrt0">
        <label for="basicName" class="col-form-label label-width">
          <span class="must">*</span>角色名称：
        </label>
        <input
          v-model="editdata.roleName"
          id="basicName"
          ref="editName"
          type="text"
          @blur="checkEditRules('roleName',editdata.roleName)"
          placeholder="请输入角色名称"
          class="form-control auth-form-control border-3r"
          :class="[editText.roleNameText?'errorColor':'']"
        />
        <i
          v-show="editdata.roleName"
          @click="emitEmpty('editName')"
          class="cui-circle-x icons clearIcon"
        ></i>
        <div class="error-box">
          <template>
            <span class="error-text" style>{{editText.roleNameText}}</span>
          </template>
        </div>
      </div>
      <div class="input-group mr25">
        <label for="basicName" class="col-form-label label-width">
          <span class="must">*</span>角色编码：
        </label>
        <input
          id="basicName"
          v-model="editdata.roleCode"
          type="text"
          disabled
          ref="editCode"
          @blur="checkEditRules('roleCode',editdata.roleCode)"
          placeholder="请输入角色编码"
          class="form-control auth-form-control border-3r"
          :class="[editText.roleCodeText?'errorColor':'']"
        />
        <!-- <i
          v-show="editdata.roleCode"
          @click="emitEmpty('editCode')"
          class="cui-circle-x icons clearIcon"
        ></i>-->
        <div class="error-box">
          <template>
            <span class="error-text" style>{{editText.roleCodeText}}</span>
          </template>
        </div>
      </div>
      <div class="input-group mr25">
        <label for="basicName" class="col-form-label label-width">
          <span class="must"></span>描述：
        </label>
        <input
          id="basicName"
          type="textarea"
          ref="editDesc"
          v-model="editdata.description"
          placeholder="描述"
          class="form-control auth-form-control border-3r"
        />
        <i
          v-show="editdata.description"
          @click="emitEmpty('editDesc')"
          class="cui-circle-x icons clearIcon"
        ></i>
        <!-- <div class="error-box">
          <template>
            <span class="error-text" style>{{editText.roleNameText}}</span>
          </template>
        </div>-->
      </div>
    </b-modal>
    <!-- 绑定账号 -->
    <b-modal
      title="绑定账号"
      v-model="accoutVisible"
      @ok="editAccout"
      @hide="()=>{
        this.search.userName = '';
        this.search.workNum = '';
        this.search.loginAcc = '';
        this.search.mobile = '';
        this.accountCheck = []
        }"
      cancel-title="关闭"
      ok-title="确定"
      size="lg"
    >
      <template v-slot:modal-title>
        <div>
          <i class="fa fa-align-justify"></i>
          <span class="mrr10">绑定账号</span>
        </div>
      </template>
      <div class="account">
        <b-row class="mr-30">
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
        <b-col sm="6" lg="6">
          <div class="input-group">
            <label for="basicAccountName" class="col-form-label">用户姓名：</label>
            <input
              id="basicAccountName"
              type="text"
              ref="accountName"
              v-model="search.userName"
              placeholder="请输入用户姓名查询"
              class="form-control auth-form-control border-3r"
            />
            <i
              v-show="search.userName"
              @click="emitEmpty('accountName')"
              class="cui-circle-x icons clearIcon"
            ></i>
          </div>
        </b-col>
        <b-col sm="6" lg="6">
          <div class="input-group">
            <label
              for="basicAccountWork"
              class="col-form-label"
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;工号：</label>
            <input
              v-model="search.workNum"
              id="basicAccountWork"
              type="text"
              ref="accountWorknum"
              placeholder="请输入工号查询"
              class="form-control auth-form-control border-3r"
            />
            <i
              v-show="search.workNum"
              @click="emitEmpty('accountWorknum')"
              class="cui-circle-x icons clearIcon"
            ></i>
          </div>
        </b-col>
        <b-col sm="6" lg="6">
          <div class="input-group">
            <label for="basicAccount" class="col-form-label">用户账号：</label>
            <input
              v-model="search.loginAcc"
              id="basicAccount"
              type="text"
              ref="accountLoginAcc"
              placeholder="请输入用户账号查询"
              class="form-control auth-form-control border-3r"
            />
            <i
              v-show="search.loginAcc"
              @click="emitEmpty('accountLoginAcc')"
              class="cui-circle-x icons clearIcon"
            ></i>
          </div>
        </b-col>
        <b-col sm="6" lg="6">
          <div class="input-group">
            <label for="basicAccountMobile" class="col-form-label">手机号码：</label>
            <input
              v-model="search.mobile"
              id="basicAccountMobile"
              type="text"
              ref="accountMobile"
              placeholder="请输入手机号码名称查询"
              class="form-control auth-form-control border-3r"
            />
            <i
              v-show="search.mobile"
              @click="emitEmpty('accountMobile')"
              class="cui-circle-x icons clearIcon"
            ></i>
          </div>
        </b-col>
      </b-row>
      <div class="datalist-tab">
        <template>
          <el-table
            :data="tableAccout"
            ref="table"
            :cell-style="{color:'#000',textAlign:'center'}"
            :header-cell-style="{background:'#E4E7EA',color:'#5C6873',textAlign:'center'}"
            style="width: 100%"
            @select="selectAccount"
            @select-all="selectAllAccount"
            border
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="userName" label="用户姓名" width="180"></el-table-column>
            <el-table-column prop="loginAcc" label="用户账号" width="180"></el-table-column>
            <el-table-column prop="workNum" label="工号"></el-table-column>
            <el-table-column prop="mobile" label="手机号码"></el-table-column>
          </el-table>
        </template>
        <template>
          <div class="pageFixed">
            <div class="overflow-auto">
              <b-pagination
                align="right"
                v-model="Account.currentPage"
                :per-page="10"
                @change="changeAccountpage"
                :total-rows="Account.total"
              ></b-pagination>
            </div>
          </div>
        </template>
      </div>
    </b-modal>
    <!-- 新增弹框 -->
    <b-modal
      title="新增"
      v-model="addVisible"
      @ok="submitAdd"
      @hidden="resetAddModal"
      cancel-title="关闭"
      ok-title="确定"
    >
      <template v-slot:modal-title>
        <div>
          <i class="fa fa-align-justify"></i>
          <span class="mrr10">新增</span>
        </div>
      </template>
      <div class="input-group mr25 mrt0">
        <label for="basicName" class="col-form-label label-width">
          <span class="must">*</span>角色名称：
        </label>
        <input
          v-model="newdata.roleName"
          id="basicName"
          ref="roleName"
          @blur="checkRules('roleName',newdata.roleName)"
          type="text"
          placeholder="请输入角色名称"
          class="form-control auth-form-control relativec border-3r"
          :class="[addText.roleNameText?'errorColor':'']"
        />
        <i
          v-show="newdata.roleName"
          @click="emitEmpty('roleName')"
          class="cui-circle-x icons clearIcon"
        ></i>
        <div class="error-box">
          <template>
            <span class="error-text" style>{{addText.roleNameText}}</span>
          </template>
        </div>
      </div>
      <div class="input-group mr25">
        <label for="basicName" class="col-form-label label-width">
          <span class="must">*</span>角色编码：
        </label>
        <input
          id="basicName"
          v-model="newdata.roleCode"
          @blur="checkRules('rolecode',newdata.roleCode)"
          type="text"
          ref="roleCode"
          placeholder="请输入角色编码"
          class="form-control auth-form-control relative border-3r"
          :class="[addText.roleCodeText?'errorColor':'']"
        />
        <i
          v-show="newdata.roleCode"
          @click="emitEmpty('roleCode')"
          class="cui-circle-x icons clearIcon"
        ></i>
        <div class="error-box">
          <template>
            <span class="error-text" style>{{addText.roleCodeText}}</span>
          </template>
        </div>
      </div>
      <div class="input-group mr25">
        <label for="basicName" class="col-form-label label-width">描述：</label>
        <input
          id="basicName"
          type="textarea"
          ref="description"
          v-model="newdata.description"
          @blur="checkRules('description',newdata.description)"
          placeholder="请输入角色相关描述"
          class="form-control auth-form-control relative border-3r"
        />
        <i
          v-show="newdata.description"
          @click="emitEmpty('description')"
          class="cui-circle-x icons clearIcon"
        ></i>
      </div>
    </b-modal>
    <!-- 二次确认框 -->
    <b-modal
      v-model="confirmVisible"
      @ok="handleComfirm"
      @hide="resetAddModal"
      cancel-title="关闭"
      ok-title="确定"
    >
      <template v-slot:modal-title>
        <div>
          <i class="fa fa-align-justify"></i>
          <span class="mrr10" style="margin-right:20px;">{{comText.title}}</span>
        </div>
      </template>
      <div style=" margin-bottom: 10px;">{{comText.content}}</div>
    </b-modal>
  </div>
</template>

<script>
import { Callout } from "@coreui/vue";
import axios from "axios";
import tree from "../../components/tree";
import dataelement from "@/components/Dataelement.vue";
export default {
  name: "dashboard",
  components: { tree },
  props:{
    show:String
  },
  data: function() {
    return {
      has_data: [],
      checkStrictly:false,
      // 资产树
      Asset: {
        selected: [],
        options: [],
        strictly: false,
        checkedNodes: {},
        toggleNum: 0,
        props: {
          label: "assetSimpleName", //这里是树结构中需显示的数据（即接口返回的需展示在页面上的参数）
          children: [],
          isLeaf: "leaf"
        },
        hasCheckedData: []
      },
      Account: {
        currentPage: 1,
        total: 0,
        perPage: 10
      },
      currentPage: 1,
      total: 0,
      perPage: 0,
      opaVisible: false, //通用操作
      opaData: [], //通用操作列表
      opahasData: [], //已勾选的通用操作
      opaItem: {}, //通用操作弹框保存的叶子节点信息
      opaProps: {
        //通用操作默认展示的tree
        //  children: "children",
        label: "modName"
      },
      Search: {
        roleName: "",
        roleCode: "",
        status: 0,
        optionstatus: [
          { value: 0, text: "全部" },
          { value: 1, text: "启用" },
          { value: 2, text: "禁用" }
        ]
      },
      // 启用禁用
      flag: false,
      // 错误信息提示
      addText: {
        roleNameText: "",
        roleCodeText: "",
        roleTypeText: "",
        descText: ""
      },
      editText: {
        roleNameText: "",
        roleCodeText: "",
        roleTypeText: "",
        descText: ""
      },
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
      datalist: [],
      leafList: [],
      childList: [],
      dialogVisible: false,
      editVisible: false,
      addVisible: false,
      dataVisible: false,
      accoutVisible: false,
      dataGrantVisible: false,
      confirmVisible: false,
      checked: true,
      checkbox: "",
      haspermission: [], //拥有的功能
      hasdataper: [], //拥有的数据元素
      dataperminssion: [],
      dataProps: {
        label: "permElemName"
      },
      props: {
        label: "modName", //这里是树结构中需显示的数据（即接口返回的需展示在页面上的参数）
        children: [],
        isLeaf: "leaf"
      },
      // dataOne: [], //树对象数据模型
      defaultProps: {
        children: "children",
        label: "modName"
      },
      // 角色人员列表数据
      tableData: [],
      // 根据id获取对应的角色信息
      editdata: {},
      newdata: {
        roleName: "",
        roleCode: "",
        description: "",
        status: 1
      },
      filterNode: [],
      editRole: {}, //点击授权，拿到该角色信息，并保存起来
      funcPermissions: [], //存放已修改的功能权限
      dataperItem: {}, //点击配置数据元按钮，保存角色信息
      dataCheck: [], //数据权限有勾选节点传参
      datagrant: [], //数据权限授权列表
      datagrantProps: {
        children: "children",
        label: "permName"
      },
      has_datagrant: [], //数据权限拥有的
      checkedDatagrant: [], //选中是数据权限
      data_auth_item: {}, //保存授权-功能权限被点击的item
      tableAccout: [], //用户账号
      account_has: [], //用户已被赋予的角色
      accountItem: {}, //用户保存角色信息
      accountCheck: [], //已勾选的（已改变的）用户id
      comText: {
        content: "",
        flag: "",
        title: ""
      },
      comItem: {},
      accountId: "",
      opechecked: [],
      opaFlag: "" //通用操作与功能权限的分配标志
    };
  },
  beforeRouteEnter: (to, from, next) => {
    console.log('show')
    next(vm => {
      // alert("hello" + vm.name);
    })
  },
  created() {
    console.log('show12')
    this.accountId = JSON.parse(localStorage.getItem("userinfo")).userId;
    // this.getList();
    // this.gethasFunc();
    this.getSystem();
  },
  mounted() {},
  methods: {
    hiddenClear() {},
    // 二次确认框提交
    handleComfirm() {
      if (this.comText.flag === "status") {
        this.submitStatus();
      } else if (this.comText.flag === "del") {
        this.submitDele();
      }
    },
    //启用停用
    submitStatus() {
      let idsArr = [];
      idsArr.push(this.comItem.id);
      let ids = idsArr.join();
      let status;
      if (this.comItem.status == 1) {
        status = 2;
      } else {
        status = 1;
      }
      this.$loading();
      axios
        .post(
          "/os_kernel_authzctr/app/role/editStatus?status=" +
            status +
            "&ids=" +
            ids +
            "&t=" +
            Date.now() +
            "&updateTime=" +
            Date.now()
        )
        .then(res => {
          this.$loading.close();
          console.log(res);
          if (res.data.code === 0) {
            this.getList();
            this.$message.success(res.data.message);
          } else {
            this.$message.error("更换状态失败");
          }
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    handleRoleSearch() {
      this.currentPage = 1;
      this.getList();
    },
    // 删除提交操作
    submitDele() {
      this.$loading();
      axios
        .post("/os_kernel_authzctr/app/role/delete?id=" + this.comItem.id)
        .then(res => {
          this.$loading.close();
          if (res.data.code === 0) {
            this.getList();
            this.$message.success(res.data.message);
          } else {
            this.$message.error("该角色当前正被使用不能删除该角色");
          }
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    // 绑定账号弹框
    bindAccount(item) {
      this.accountItem = item;
      // this.accoutVisible = true;
      this.getAccountList();
    },
    selectAllAccount(selection) {
      // console.log("触发全选");
      if (selection.length > 0) {
        this.accountCheck = selection.map(select => {
          return select.id;
        });
        this.accountCheck = this.accountCheck.filter((sele, idx) => {
          if (!this.account_has.includes(sele)) {
            return sele;
          }
        });
      } else {
        this.accountCheck = this.tableAccout.map(ele => {
          return ele.id;
        });
        this.accountCheck = this.accountCheck.filter((e, idx) => {
          if (this.account_has.includes(e)) {
            return e;
          }
        });
      }
    },
    // 勾选account多选框时触发的事件
    selectAccount(select, data) {
      console.log("单选");
      let idx = this.accountCheck.indexOf(data.id);
      if (idx == -1) {
        this.accountCheck.push(data.id);
      } else {
        this.accountCheck.splice(idx, 1);
      }
      console.log("已勾选checked", this.accountCheck);
    },
    // 根据角色查询账号
    roleSearch() {
      this.Account.currentPage = 1;
      this.getAccountList();
    },
    // 绑定账号-获取用户list
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
        pageNo: this.Account.currentPage,
        pageSize: 10,
        t: Date.now()
      };
      this.$loading();
      axios
        .get("/os_kernel_userorgctr/app/user/list", {
          params: obj
        })
        .then(res => {
          this.accoutVisible = true;
          //  this.$loading.close();
          // console.log(res);
          this.tableAccout = res.data.result.records;
          this.Account.total = res.data.result.total;
          // 获取该角色已赋予的账号

          axios
            .get("/os_kernel_authzctr/app/role/queryUserRoleMapByRoleId", {
              params: {
                role_id: this.accountItem.id,
                t: Date.now()
              }
            })
            .then(res => {
              this.$loading.close();
              // console.log(res);
              // this.account_has = res.data.result;
              this.account_has = res.data.result.map(item => {
                return item.userId;
              });
              this.tableAccout.forEach((row, index) => {
                this.account_has.forEach(item => {
                  if (row.id == item) {
                    this.$refs.table.toggleRowSelection(
                      this.tableAccout[index]
                    );
                  }
                });
              });
            })

            .catch(error => {
              this.$loading.close();
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 给角色绑定账号
    editAccout() {
      // console.log("accountCheck", this.accountCheck);
      let arr = [];
      this.accountCheck.map((item, idx) => {
        const temp = {
          userId: item,
          roleId: this.accountItem.id,
          delFlag: 0,
          updateTime: Date.now()
        };
        return arr.push(temp);
      });
      this.$loading();
      axios
        .post("/os_kernel_authzctr/app/role/editUserRoleMapping", arr)
        .then(res => {
          this.$loading.close();
          this.accountCheck = [];
          if (res.data.success) {
            this.$message.success(res.data.message);
          } else {
            this.$message.error("用户角色关联信息修改失败!");
          }
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    // 获取拥有的数据权限
    gethasDataPermission(item) {
      this.$loading();
      axios
        .get("/os_kernel_authzctr/app/userResourceAuthz/list", {
          params: {
            authzEntityId: item.id,
            authzEntityType: 4,
            authzResType: 3,
            pageSize: 100,
            dataPermId: this.Asset.selected,
            t: Date.now()
          }
        })

        .then(res => {
          this.$loading.close();
          this.hasdataper = res.data.result.records.map(item => {
            return item.authzResId;
          });
          // this.getdatalist();
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
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
          appSysId: this.dataperItem.appSysId
        };
        return arr.push(temp);
      });
      this.$loading();
      axios
        .post("/os_kernel_authzctr/app/userResourceAuthz/update", arr)
        .then(res => {
          this.$loading.close();
          if (res.data.success) {
            this.dataCheck = [];
            this.hasdataper = [];
            this.$message.success(res.data.message);
          } else {
            this.$message.error("修改失败！");
          }
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    checkDataPermission(data, checked) {
      let idx = this.dataCheck.indexOf(data.id);
      if (idx == -1) {
        this.dataCheck.push(data.id);
      } else {
        this.dataCheck.splice(idx, 1);
      }
    },
    // 根据系统查询
    chooseSystem() {
      this.getList();
    },
    // 获取各个系统
    getSystem() {
      this.$loading();
      axios
        .get("os_kernel_appsysctr/app/appsys/queryByUserId", {
          params: {
            // authz_entity_id: "0e08e153-b04a-11e9-b31b-b06ebf14a476"
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
          // this.getList();
        })
        .then(res => {
          this.getList();
        })
        .catch(err => {
          this.$loading.close();
          console.log(err);
        });
    },
    dataitem(item) {
      this.dataperItem = item;
      this.getDataPermEle();
      // this.gethasDataPermission(item);
      // this.getdatalist();
      // this.dataVisible = true;
    },
    // 树形控件渲染函数
    renderContent: function(h, { node, data, store }) {
      return (
        <span>
          <span style="padding-left: 4px;">{node.label}</span>
          <i style="color:#f00;padding:0 10px;" class={data.icon}></i>
          <i style="color:#f00;padding:0 10px;" class={data.icon1}></i>
        </span>
      );
    },
    // 新增角色---失去焦点判断
    checkRules(id, value) {
      if (id === "roleName") {
        if (!value) {
          this.addText.roleNameText = "不能为空";
        } else {
          if (value.length > 0 && value.length < 21) {
            // /^[a-zA-Z0-9-_\u4e00-\u9fa5]+$/
            if (!/^[0-9a-zA-Z-_\u4e00-\u9fa5]+$/.test(value)) {
              this.addText.roleNameText =
                "可以输入0-20个中文、数字、字母、下滑线、横杠等";
            } else {
              this.addText.roleNameText = "";
            }
          } else {
            this.addText.roleNameText =
              "可以输入0-20个中文、数字、字母、下滑线、横杠等";
          }
        }
      } else if (id === "rolecode") {
        if (!value) {
          this.addText.roleCodeText = "不能为空";
        } else {
          if (value.length > 0 && value.length < 51) {
            if (!/^[0-9a-zA-Z-_]+$/.test(value)) {
              this.addText.roleCodeText =
                "可以输入0-50个数字、字母、下滑线、横杠等";
            } else {
              this.addText.roleCodeText = "";
            }
          } else {
            this.addText.roleCodeText =
              "可以输入0-50个数字、字母、下滑线、横杠等";
          }
        }
      } else if (id === "roleType") {
        if (!value) {
          this.addText.roleTypeText = "不能为空";
        } else {
          this.addText.roleTypeText = "";
        }
      } else if (id === "description") {
        if (!value) {
          this.addText.descText = "不能为空";
        } else {
          if (value.length > 0 && value.length < 21) {
            if (!/^[0-9a-zA-Z-_\u4e00-\u9fa5]+$/.test(value)) {
              this.addText.descText =
                "可以输入0-50个中文、数字、字母、下滑线、横杠等等";
            } else {
              this.addText.descText = "";
            }
          } else {
            this.addText.descText =
              "可以输入0-50个中文、数字、字母、下滑线、横杠等等";
          }
        }
      }
    },
    // 编辑角色---失去焦点判断
    checkEditRules(id, value) {
      if (id === "roleName") {
        if (!value) {
          this.editText.roleNameText = "不能为空";
        } else {
          if (value.length > 0 && value.length < 21) {
            // /^[a-zA-Z0-9-_\u4e00-\u9fa5]+$/
            if (!/^[0-9a-zA-Z-_\u4e00-\u9fa5]+$/.test(value)) {
              this.editText.roleNameText =
                "可以输入0-20个中文、数字、字母、下滑线、横杠等";
            } else {
              this.editText.roleNameText = "";
            }
          } else {
            this.editText.roleNameText =
              "可以输入0-20个中文、数字、字母、下滑线、横杠等";
          }
        }
      }
      // else if (id === "roleCode") {
      //   if (!value) {
      //     this.editText.roleCodeText = "不能为空";
      //   } else {
      //     this.editText.roleCodeText = "";
      //   }
      // }
    },
    handleCheckChange(data, checked, indeterminate) {
      // console.log(data, checked, indeterminate);
    },
    // 分配操作勾选
    operation(data) {
      let idx = this.opechecked.indexOf(data.id);
      if (idx == -1) {
        this.opechecked.push(data.id);
      } else {
        this.opechecked.splice(idx, 1);
      }
      console.log("checked", this.opechecked);
    },
    check(data, checked) {
      this.checkStrictly=false;
      let idx = this.funcPermissions.indexOf(data.id);
      if (idx == -1) {
        this.funcPermissions.push(data.id);
      } else {
        this.funcPermissions.splice(idx, 1);
      }
      // 将点击的data在存放近数组前先去查找这个data在不在数组里面，如果存在则删除，不存在则添加
      // console.log('data',data)
      // console.log('checked',checked)
      // const checkedNodes = checked.checkedNodes;
      // const spliceArr = [];
      // checkedNodes.forEach((node, index) => {
      //   spliceArr.push(node.id);
      // });
      // this.filterNode = spliceArr;
      // console.log('spliceArr',spliceArr)
      // // 如果子节点都被勾选，则把父节点找到，只传父节点id
      // checkedNodes.forEach((e, index) => {
      //   checkedNodes.forEach((node, nodeIndex) => {
      //     if (
      //       e.appSysModuleDtoList &&
      //       e.appSysModuleDtoList.filter(child => child.id === node.id).length
      //     ) {
      //       spliceArr.push(node.id);
      //     }
      //   });
      // });
      // this.filterNode = checkedNodes.filter(node => !spliceArr.includes(node.id))
    },
    edit(item) {
      // this.editVisible = true;
      this.getItem(item.id);
    },
    // 编辑授权信息
    editPermission(flag) {
      // console.log(" this.funcPermissions", this.funcPermissions);
      // console.log("opechecked", this.opechecked);
      let editArr = [];
      if (flag == "opa") {
        editArr = this.opechecked;
      } else {
        editArr = this.funcPermissions;
      }
      let arr = [];
      editArr.map((item, idx) => {
        const temp = {
          delFlag: 0,
          roleId: this.editRole.id,
          funcPermId: item,
          dataPermId: "",
          updateTime: Date.now()
        };
        return arr.push(temp);
      });
      // console.log("editArr", editArr);
      if(arr.length<=0){
        return
      }
      this.$loading();
      axios
        .post("/os_kernel_authzctr/app/role/editRoleFuncMapping", arr)
        .then(res => {
          this.$loading.close();
          if (flag == "opa") {
            this.opechecked = [];
          } else {
            this.funcPermissions = [];
            this.has_data = [];
          }
          if (res.data.code === 0) {
            // this.dialogVisible = false;
            this.$message.success(res.data.message);
          } else {
            this.$message.error("角色功能权限关联信息修改失败!");
          }
        })
        .catch(error => {
          this.$loading.close();
        });
    },
    // 选中的数据授权权限
    checkdatagrant(data, checked) {
      let idx = this.checkedDatagrant.indexOf(data.id);
      if (idx == -1) {
        this.checkedDatagrant.push(data.id);
      } else {
        this.checkedDatagrant.splice(idx, 1);
      }
    },
    // 编辑授权数据权限
    editGrantPermission() {
      let arr = [];
      this.checkedDatagrant.map((item, idx) => {
        const temp = {
          delFlag: 0,
          roleId: this.editRole.id,
          funcPermId: this.data_auth_item.id,
          dataPermId: item,
          updateTime: Date.now()
        };
        return arr.push(temp);
      });
      if(arr.length<=0){
        return
      }
      console.log("arr", arr);
      this.$loading();
      axios
        .post("/os_kernel_authzctr/app/role/editRoleFuncDataMapping", arr)
        .then(res => {
          this.$loading.close();
          this.checkedDatagrant = [];
          if (res.data.success) {
            this.$message.success(res.data.message);
          } else {
            this.$message.error("角色权限关联信息修改失败!");
          }
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    // 授权----获取拥有的数据权限（授权）
    has_GrantPermission(item) {
      // console.log("pathCode", item);
      this.$loading();
      axios
        .get("/os_kernel_authzctr/app/dataperm/queryDataPermByRoleSysId", {
          params: {
            appSysId: item.appSysId,
            roleId: this.editRole.id,
            funcPermCode: item.pathCode
          }
        })
        .then(res => {
          this.$loading.close();
          this.has_datagrant = res.data.result.map(item => {
            return item.id;
          });
          console.log("数据权限操作拥有的权限", this.has_datagrant);
        });
    },
    //授权---数据权限列表
    showGrantdata(item) {
      this.data_auth_item = item;
      this.has_GrantPermission(item);
      this.$loading();
      axios
        .get("/os_kernel_authzctr/app/dataperm/queryDataPermByModId", {
          params: {
            modId: item.id
          }
        })
        .then(res => {
          this.$loading.close();
          this.datagrant = res.data.result;
          this.dataGrantVisible = true;
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    //授权--- 获取通用操作列表
    getopalist() {
      this.$loading();
      axios
        .get(
          "/os_kernel_appsysctr/app/appsysModule/queryAllOpWithFuncByAppSysModuleId",
          {
            params: {
              roleId: this.editRole.id,
              appSysId: this.opaItem.appSysId,
              id: this.opaItem.id
            }
          }
        )
        .then(res => {
          this.$loading.close();
          console.log("通用操作", res);
          this.opahasData = [];
          this.opaData = res.data.result;
          res.data.result.forEach(value => {
            if (value.funcPermStatus == 2) {
              this.opahasData.push(value.id);
            }
          });
        })
        // .then(res1 => {
        //   // let status = document.getElementsByClassName("allCheck");
        //   // console.log(status);
        //   // if (status.length > 0) {
        //   //   for (let i = 0; i < status.length; i++) {
        //   //     console.log("status", status[i]);
        //   //     status[
        //   //       i
        //   //     ].parentNode.previousElementSibling.firstChild.classList.add(
        //   //       "is-checked"
        //   //     );
        //   //   }
        //   // }
        // })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    showOperation(item) {
      // this.opaFlag = 'opa'
      this.opaItem = item;
      this.opaVisible = true;
      this.getopalist();
    },
    // 授权---编辑通用操作
    editopaPermission() {
      this.editPermission("opa");
    },
    add() {
      this.addVisible = true;
    },
    // 关闭弹框对input进行重置操作
    resetAddModal() {
      // 新建清空
      this.newdata.roleCode = "";
      this.newdata.roleName = "";
      this.newdata.description = "";
      this.addText.roleNameText = "";
      this.addText.roleCodeText = "";
      this.addText.roleTypeText = "";
      this.addText.descText = "";
      // this.editdata = {};
      // 清空编辑错误提示
      this.editText.roleNameText = "";
      this.editText.roleCodeText = "";
      this.editText.roleTypeText = "";
      this.editText.descText = "";
    },
    // 启用禁用
    handleStatus(item) {
      this.comItem = item;
      this.comText.flag = "status";
      if (item.status === 1) {
        this.comText.title = "停用确认";
        this.comText.content = "确定停用该角色?";
      } else {
        this.comText.title = "启用确认";
        this.comText.content = "确定启用该角色?";
      }
      this.confirmVisible = true;
    },
    // 删除角色
    delrole(item) {
      this.comItem = item;
      this.comText.flag = "del";
      this.comText.title = "删除确认";
      this.comText.content = "确定删除该角色？";
      this.confirmVisible = true;
      // axios
      //   .post("/os_kernel_authzctr/app/role/delete?id=" + item.id)
      //   .then(res => {
      //     console.log(res);
      //     this.getList();
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    },
    resetEditModal() {},
    // 新增
    submitAdd(bvModalEvt) {
      bvModalEvt.preventDefault();
      if (!this.newdata.roleName) {
        this.addText.roleNameText = "不能为空";
      } else {
        if (
          this.newdata.roleName.length > 0 &&
          this.newdata.roleName.length < 21
        ) {
          if (!/^[0-9a-zA-Z-_\u4e00-\u9fa5]+$/.test(this.newdata.roleName)) {
            this.addText.roleNameText =
              "可以输入0-20个中文、数字、字母、下滑线、横杠等";
          } else {
            this.addText.roleNameText = "";
          }
        } else {
          this.addText.roleNameText =
            "可以输入0-20个中文、数字、字母、下滑线、横杠等";
        }
        // this.addText.roleNameText = "";
      }
      if (!this.newdata.roleCode) {
        this.addText.roleCodeText = "不能为空";
      } else {
        if (
          this.newdata.roleCode.length > 0 &&
          this.newdata.roleCode.length < 51
        ) {
          if (!/^[0-9a-zA-Z-_]+$/.test(this.newdata.roleCode)) {
            this.addText.roleCodeText =
              "可以输入0-50个数字、字母、下滑线、横杠等";
          } else {
            this.addText.roleCodeText = "";
          }
        } else {
          this.addText.roleCodeText =
            "可以输入0-50个数字、字母、下滑线、横杠等";
        }
        // this.addText.roleCodeText = "";
      }
      // if (!this.newdata.description) {
      //   this.addText.descText = "不能为空";
      // } else {
      //   this.addText.descText = "";
      // }
      if (this.addText.roleNameText || this.addText.roleCodeText) {
        return false;
      }
      // console.log(332,this.newdata)
      this.newdata.appSysId = this.form.selected;
      this.$loading();
      axios
        .post("/os_kernel_authzctr/app/role/add", this.newdata)
        .then(res => {
          this.$loading.close();
          if (res.data.success) {
            this.getList();
            this.addVisible = false;
            this.$message.success(res.data.message);
          } else {
            this.$message.error("新增失败");
          }
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
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
          this.dataVisible = true;
          console.log("数据权限列表", res);
          this.dataperminssion = res.data.result.records;
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    // 编辑角色信息
    submitEdit(bvModalEvt) {
      bvModalEvt.preventDefault();
      if (!this.editdata.roleName) {
        this.editText.roleNameText = "不能为空";
      } else {
        if (
          this.editdata.roleName.length > 0 &&
          this.editdata.roleName.length < 21
        ) {
          if (!/^[0-9a-zA-Z-_\u4e00-\u9fa5]+$/.test(this.editdata.roleName)) {
            this.editText.roleNameText =
              "可以输入0-20个中文、数字、字母、下滑线、横杠等";
          } else {
            // this.editText.roleNameText = "";
          }
        } else {
          this.editText.roleNameText =
            "可以输入0-20个中文、数字、字母、下滑线、横杠等";
        }
      }
      if (this.editText.roleNameText) {
        return false;
      }
      this.editdata.t = Date.now();
      this.editdata.updateTime = Date.now();
      this.$loading();
      axios
        .post("os_kernel_authzctr/app/role/edit", this.editdata)
        .then(res => {
          this.$loading.close();
          if (res.data.success) {
            this.getList();
            this.editVisible = false;
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    indexMethod(index) {
      return index + 1 * 1;
    },
    handleNodeClick(data, node, item) {},
    // 异步树叶子节点懒加载逻辑
    loadNode(node, resolve) {
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
      this.$loading();
      axios
        .get("/os_kernel_appsysctr/app/appsysModule/queryChildNodeByParentId", {
          params: {
            parentId: node.data.id,
            appSysId: this.editRole.appSysId,
            roleId: this.editRole.id,
            status: 1
          }
        })
        .then(res => {
          this.$loading.close();
          // 此处需要后台传过来一个值来判断每个节点有无子节点,实际项目中必须加上（如isRealLeaf），不传都默认为叶子节点
          res.data.result.appSysModuleDtoList.forEach(value => {
            if (!value.appSysModuleDtoList) {
              value.leaf = true; //不为叶子节点
            } else {
              value.leaf = false; //为叶子节点
              // value.icon = "half";
            }
            if (value.isLeaf) {
              value.disabled = false;
              // console.log("value", value);
              if (value.funcPermStatus == 2) {
                value.icon = "el-icon-sunrise";
                value.icon1 = "el-icon-tickets";
              }
            } else {
              value.disabled = true;
            }
          });
          let data = res.data.result.appSysModuleDtoList;
          let halfArr = []  //用户存放半选状态的节点id
          res.data.result.appSysModuleDtoList.forEach(item => {
            if (item.funcPermStatus == 2) {
              return this.has_data.push(item.id);
            }
            if(item.funcPermStatus == 1){
              halfArr.push(item.id)
            }
          });
           // 解决父级选中状态在点击时会失效的问题
          if (this.has_data.length > 0 || halfArr.length <= 0) {
            this.checkStrictly = false;
          } else {
            this.checkStrictly = true;
          }
          resolve(data);
          // console.log("node", node);
          if (node.data.funcPermStatus === 1) {
            node.indeterminate = true;
          }
          if (node.data.funcPermStatus === 2) {
            node.checked = true;
          }
          node.childNodes.forEach(ele => {
            if (ele.data.funcPermStatus == 1) {
              ele.indeterminate = true;
            } else if (ele.data.funcPermStatus == 2) {
              ele.checked = true;
            }
          });
        })
        .then(res1 => {
          // node.indeterminate = true
          // node.childNodes[1].indeterminate = true;
          // let status = document.getElementsByClassName("half")
          // for(let i=0;i<status.length;i++){
          //   status[i].parentNode.previousElementSibling.firstChild.classList.add("is-indeterminate");
          // }
        })
        .catch(error => {
          this.$loading.close();
        });
    },
    // 首次加载一级节点数据函数
    requestTree(node, resolve, indeterminate) {
      console.log("item", this.editRole);
      this.$loading();
      axios
        .get(
          "/os_kernel_appsysctr/app/appsysModule/queryModuleRootNodeByAppSysId",
          {
            params: {
              // appSysId: "0d3cf02e6bda59431721a979a5209e28",
              roleId: this.editRole.id,
              appSysId: this.editRole.appSysId,
              status: 1
            }
          }
        )
        .then(res => {
          this.$loading.close();
          // console.log('授权',res)
          // 此处需要后台传过来一个值来判断每个节点有无子节点,实际项目中必须加上（如isRealLeaf），不传都默认为叶子节点
          res.data.result.appSysModuleDtoList.forEach(value => {
            if (!value.appSysModuleDtoList) {
              value.leaf = true; //为叶子节点
            } else {
              value.leaf = false; //不为叶子节点
              // value.icon = "el-icon-minus half";
            }
            if (value.isLeaf) {
              value.disabled = false;

              if (value.funcPermStatus == 2) {
                value.icon = "el-icon-sunrise";
                value.icon1 = "align-left";
              }
              // value.icon = "el-icon-sunrise";
            } else {
              value.disabled = true;
            }
          });

          let data = res.data.result.appSysModuleDtoList;
          res.data.result.appSysModuleDtoList.forEach(val => {
            if (val.funcPermStatus == 2) {
              return this.has_data.push(val.id);
            }
          });
          resolve(data);
          node.childNodes.forEach(ele => {
            if (ele.data.funcPermStatus == 1) {
              ele.indeterminate = true;
            } else if (ele.data.funcPermStatus == 2) {
              ele.checked = true;
            }
          });
          // console.log("node0000", node.childNodes[10].indeterminate);
          // node.childNodes[10].indeterminate = true;  funcPermStatus
        })
        .then(res1 => {
          let status = document.getElementsByClassName("half");
          for (let i = 0; i < status.length; i++) {
            status[
              i
            ].parentNode.previousElementSibling.firstChild.classList.add(
              "is-indeterminate"
            );
          }
          // cla.parentNode.previousElementSibling.firstChild.classList.add("is-indeterminate");

          //  let classicon = document.getElementsByClassName("half")[0].parentNode.previousElementSibling.firstChild.classList.add("is-indeterminate");

          //  let parent =.parentNode
          // console.log("ref", status);
        })
        .catch(error => {});
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // input框删除操作
    emitEmpty(type) {
      const Picker = {
        roleCode: () => {
          this.$refs.roleCode.focus();
          this.newdata.roleCode = "";
        },
        roleName: () => {
          this.$refs.roleName.focus();
          this.newdata.roleName = "";
        },
        description: () => {
          this.$refs.description.focus();
          this.newdata.description = "";
        },
        // 编辑
        editDesc: () => {
          this.$refs.editDesc.focus();
          this.editdata.description = "";
        },
        editName: () => {
          this.$refs.editName.focus();
          this.editdata.roleName = "";
        },
        editCode: () => {
          this.$refs.editCode.focus();
          this.editdata.roleCode = "";
        },
        // 查询角色
        searchCode: () => {
          this.$refs.searchCode.focus();
          this.Search.roleCode = "";
        },
        searchName: () => {
          this.$refs.searchName.focus();
          this.Search.roleName = "";
        },
        accountName: () => {
          this.$refs.accountName.focus();
          this.search.userName = "";
        },
        accountLoginAcc: () => {
          this.$refs.accountLoginAcc.focus();
          this.search.loginAcc = "";
        },
        accountWorknum: () => {
          this.$refs.accountWorknum.focus();
          this.search.workNum = "";
        },
        accountMobile: () => {
          this.$refs.accountMobile.focus();
          this.search.mobile = "";
        }
      }[type]();
    },
    // 授权弹框
    handleAuth(item) {
      // this.opaFlag = 'func'
      this.editRole = item;
      // this.dialogVisible = true;
      this.gethasFunc(item);
    },
    // 获取用户拥有的权限
    gethasFunc(item) {
      this.$loading();
      axios
        .get(
          "/os_kernel_appsysctr/app/appsysModule/getModuleTreeWithPermissionByRoleId",
          {
            params: {
              roleId: item.id,
              appSysId: item.appSysId
            }
          }
        )
        .then(res => {
          this.$loading.close();
          this.dialogVisible = true;
          // this.haspermission = res.data.result
          this.haspermission = res.data.result.map(item => {
            return item.id;
          });
          console.log("has", this.haspermission);
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    changeCurrentPage(num) {
      this.currentPage = num;
      this.getList();
    },
    changeAccountpage(num) {
      this.Account.currentPage = num;
      this.getAccountList();
    },
    // 获取table列表
    getList() {
      let obj = {
        appSysId: this.form.selected ? this.form.selected : undefined,
        roleName: this.Search.roleName
          ? "*" + this.Search.roleName + "*"
          : undefined,
        roleCode: this.Search.roleCode
          ? "*" + this.Search.roleCode + "*"
          : undefined,
        status: this.Search.status ? this.Search.status : undefined,
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
          this.perPage = res.data.result.size;
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    getItem(id) {
      if (!id) {
        id = "";
      }
      this.$loading();
      axios
        .get("/os_kernel_authzctr/app/role/list", {
          params: {
            id: id,
            t: Date.now()
          }
        })
        .then(res => {
          this.$loading.close();
          this.editVisible = true;
          this.editdata = res.data.result.records[0];
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    // 编辑资产树
    editAssetTree() {
      let condition = {};
      let delArr = [];
      let comArr = this.Asset.checkedNodes.checkedKeys.concat(
        this.Asset.checkedNodes.halfCheckedKeys
      );
      // 对比两个数组，如果hasCheckedData中的元素不存在comArr，则证明该节点已被删除
      this.Asset.hasCheckedData.forEach(e => {
        if (!comArr.includes(e)) {
          return delArr.push(e);
        }
      });

      let arr = [];
      this.filterNode.map(val => {
        const temp = {
          authzEntityId: this.dataperItem.id,
          authzEntityType: 4, // 被授权的实体类型（1：用户  2：组织org  3：组group  4：角色）
          authzResId: val.id,
          updateTime: Date.now()
        };
        return arr.push(temp);
      });
      let Drr = [];
      delArr.map(del => {
        const tem = {
          authzEntityId: this.dataperItem.id,
          authzEntityType: 4,
          authzResId: del,
          updateTime: Date.now()
        };
        return Drr.push(tem);
      });
      condition.userResAuthzList = arr;
      condition.unCheckUserResAuthzList = Drr;
      this.$loading();
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
          this.Asset.hasCheckedData = [];
          this.filterNode = [];
          if (res.data.code === 0) {
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
          this.$loading.close();
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    // 资产树选着子节点
    checkTree({ data, checked }) {
      // console.log('data',data)
      // console.log('checked',checked)
      this.Asset.checkedNodes = checked;
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
    },
    //  编辑数据权限元素与资产树
    editPermissionElement() {
      if (this.Asset.toggleNum === 0) {
        this.editAssetTree();
      } else {
        this.editDataPermission();
      }
    },
    // 切换资产树
    handleToggle(num) {
      this.Asset.toggleNum = num;
    },
    // 异步树叶子节点懒加载逻辑
    loadAsset(node, resolve) {
      // console.log("editRole1", this.editRole);
      // 一级节点处理
      if (node.level === 0) {
        this.requestAsseTree(node, resolve);
      }
      // 其余节点处理
      if (node.level >= 1) {
        // 注意！把resolve传到你自己的异步中去
        this.getAsseIndex(node, resolve);
      }
    },
    // 异步加载叶子节点数据函数
    getAsseIndex(node, resolve) {
      // this.editRole = this.dataperItem;
      // console.log("node", node.data);
      this.$loading();
      axios
        .get("/os_kernel_authzctr/app/funcperm/queryAssetTreeById", {
          params: {
            id: node.data.id,
            appSysId: this.form.selected,
            roleId: this.dataperItem.id
          },
          headers: {
            "metadata-version": "1.1"
          }
        })
        .then(res => {
          this.$loading.close();
          console.log("异步加载资产树", res);
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
              return this.Asset.hasCheckedData.push(val.id);
            }
            if (val.isChecked == 1) {
              halfCheck.push(val.id);
            }
          });
          // 解决父级选中状态在点击时会失效的问题
          if (this.Asset.hasCheckedData.length > 0 || halfCheck <= 0) {
            this.Asset.strictly = false;
          } else {
            this.Asset.strictly = true;
          }

          resolve(data);
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
          });
        })
        .catch(error => {
          this.$loading.close();
        });
    },
    // 首次加载一级节点数据函数
    requestAsseTree(node, resolve, indeterminate) {
      // this.editRole = this.dataperItem;
      // console.log("item", this.editRole);
      this.$loading();
      axios
        .get("/os_kernel_authzctr/app/funcperm/queryAssetTreeById", {
          params: {
            id: "0bd285d0e00611e99de100155d1b3d06",
            roleId: this.dataperItem.id,
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
              return this.Asset.hasCheckedData.push(val.id);
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
    },
    // 获取数据权限元素
    getDataPermEle() {
      this.$loading();
      axios
        .get("/os_kernel_authzctr/app/dataperm/list")
        .then(res => {
          this.$loading.close();
          this.dataVisible = true;
          if (res.data.code === 0) {
            this.Asset.options = res.data.result.records;
            this.Asset.selected = res.data.result.records[0].id;
            this.gethasDataPermission(this.dataperItem);
            this.getdatalist();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 根据数据元素查询数据列表
    getDataSearch() {
      this.gethasDataPermission(this.dataperItem);
      this.getdatalist();
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 0px;
}
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
.must {
  color: #f00;
}
.label-width {
  width: 95px;
  text-align: right;
  padding-right: 10px;
}
.input-group {
  margin: 10px 0px;
  position: relative;
}
#basicName {
  border-radius: 3px;
}
.relative {
  position: relative;
}
.mr25 {
  margin: 25px 0px;
}
.errorColor {
  border: 1px solid #f00;
}
.error-box {
  display: block;
  position: absolute;
  top: 36px;
  left: 123px;
  .error-text {
    color: #f00;
    font-size: 12px;
  }
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
.datalist-tab {
  width: 100%;
  text-align: left;
  height: 338px;
  overflow: hidden;
  overflow-y: auto;
  margin-top: 10px;
}
.data-check-title {
  padding-left: 21%;
}
.data-check-item {
  padding-left: 20%;
}
.block {
  display: block;
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
.modal-content {
  height: 80vh;
  overflow: hidden;
  overflow-y: auto;
  position: relative;
}
.mrl12 {
  margin-left: 12px;
}
.mrl-4 {
  margin-left: -4px;
}
.select-width {
  min-width: 150px;
  max-width: 200px;
}
.mr-30 {
  margin-top: -30px;
}
.mrl10 {
  margin-left: 10px;
}
.mrt0 {
  margin-top: 0px;
}
.grounp-check {
  text-align: left;
  padding-left: 30px;
}
.block {
  display: block;
}
.mrr10 {
  margin-left: 10px;
}
</style>
