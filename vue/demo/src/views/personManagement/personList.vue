<template>
  <div class="animated fadeIn">
    <b-row style="padding-top:20px;">
      <b-col sm="12" lg="12">
        <b-card>
          <b-card-body>
            <div>
              <div class="add-person">
                <b-row>
                  <div class="top-btns">
                    <b-button size="sm" variant="primary" style="margin-right:0px" @click="addFun">
                      <i class="fa fa-plus-square-o"></i>新增
                    </b-button>
                  </div>
                  <div class="top-btns">
                    <b-button size="sm" variant="primary" @click="exportProject">导出人员列表</b-button>
                  </div>
                </b-row>
              </div>
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
                                    <b-button
                                      class="btn btn-primary btn-block func-item func-btn btn-sm"
                                      size="sm"
                                      variant="primary"
                                      @click="resetSearch"
                                    >清空</b-button>
                                  </div>
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
                            <!-- <b-col sm="6" lg="4">
                              <div class="input-group">
                                <b-col sm="3" lg="4" style="text-align:right">
                                  <label for="basicName" class="col-form-label">人员id：</label>
                                </b-col>
                                <input
                                  id="basicName"
                                  type="text"
                                  ref="id"
                                  v-model="search.id"
                                  placeholder="请输入人员id查询"
                                  class="form-control auth-form-control border-3r"
                                />
                                <i
                                  v-show="search.id"
                                  @click="emitEmpty('id')"
                                  class="cui-circle-x icons clearIcon"
                                ></i>
                              </div>
                            </b-col>-->
                            <b-col sm="6" lg="4">
                              <div class="input-group">
                                <b-col sm="3" lg="4" style="text-align:right">
                                  <label for="basicAccount" class="col-form-label">昵称：</label>
                                </b-col>
                                <input
                                  v-model="search.nickName"
                                  id="basicAccount"
                                  type="text"
                                  ref="nickName"
                                  placeholder="请输入用户昵称查询"
                                  class="form-control auth-form-control border-3r"
                                />
                                <i
                                  v-show="search.nickName"
                                  @click="emitEmpty('nickName')"
                                  class="cui-circle-x icons clearIcon"
                                ></i>
                              </div>
                            </b-col>
                            <b-col sm="6" lg="4">
                              <div class="input-group">
                                <b-col sm="3" lg="4" style="text-align:right">
                                  <label for="basicMobile" class="col-form-label">微信：</label>
                                </b-col>
                                <input
                                  v-model="search.wechat"
                                  id="basicwechat"
                                  type="text"
                                  ref="wechat"
                                  placeholder="请输入微信查询"
                                  class="form-control auth-form-control border-3r"
                                />
                                <i
                                  v-show="search.wechat"
                                  @click="emitEmpty('wechat')"
                                  class="cui-circle-x icons clearIcon"
                                ></i>
                              </div>
                            </b-col>
                            <b-col sm="6" lg="4">
                              <div class="input-group">
                                <b-col sm="3" lg="4" style="text-align:right">
                                  <label for="basicQQ" class="col-form-label">QQ：</label>
                                </b-col>
                                <input
                                  v-model="search.qq"
                                  id="basicQQ"
                                  type="text"
                                  ref="qq"
                                  placeholder="请输入qq号查询"
                                  class="form-control auth-form-control border-3r"
                                />
                                <i
                                  v-show="search.qq"
                                  @click="emitEmpty('qq')"
                                  class="cui-circle-x icons clearIcon"
                                ></i>
                              </div>
                            </b-col>
                            <b-col sm="6" lg="4">
                              <div class="input-group">
                                <b-col sm="3" lg="4" style="text-align:right">
                                  <label for="basicMobile" class="col-form-label">手机号码：</label>
                                </b-col>
                                <input
                                  v-model="search.mobile"
                                  id="basicMobile"
                                  type="text"
                                  ref="mobile"
                                  placeholder="请输入手机号码查询"
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
                                <b-col sm="3" lg="4" style="text-align:right">
                                  <label for="basicWork" class="col-form-label">姓名：</label>
                                </b-col>
                                <input
                                  v-model="search.userName"
                                  id="basicuserName"
                                  type="text"
                                  ref="userName"
                                  placeholder="请输入姓名查询"
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
                              <div class="input-group" style="width:100%;">
                                <form class="form-inline" style="width:100%">
                                  <div class="form-group" style="width:100%">
                                    <b-col sm="3" lg="4" style="text-align:right">
                                      <label for="exampleInputName3" class="inline">认证状态：</label>
                                    </b-col>
                                    <b-form-select
                                      class="inline select-width"
                                      v-model="search.customerType"
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
                          :data="personnel.personData"
                          ref="table"
                          @select="handleSelect"
                          :cell-style="{color:'#000',textAlign:'center'}"
                          :header-cell-style="{background:'#E4E7EA',color:'#5C6873',textAlign:'center'}"
                          style="width: 100%"
                          border
                        >
                          <el-table-column type="selection" width="55"></el-table-column>
                          <el-table-column prop="id" label="人员id"></el-table-column>
                          <el-table-column prop="nickName" label="昵称" :show-overflow-tooltip="true"></el-table-column>
                          <el-table-column prop="userAvatar" label="头像">
                            <template slot-scope="scope">
                              <img
                                src="@/assets/img/null.jpg"
                                v-if="!scope.userAvatar"
                                alt
                                style="width:80%"
                              />
                              <img :src="scope.userAvatar" v-else alt style="width:80%" />
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="mobile"
                            width="100"
                            label="手机号码"
                            :show-overflow-tooltip="true"
                          ></el-table-column>
                          <el-table-column
                            prop="userName"
                            width="100"
                            label="姓名"
                            :show-overflow-tooltip="true"
                          ></el-table-column>
                          <el-table-column prop="wechat" label="微信" :show-overflow-tooltip="true"></el-table-column>
                          <el-table-column
                            prop="qq"
                            label="qq"
                            width="100"
                            :show-overflow-tooltip="true"
                          ></el-table-column>
                          <el-table-column fixed="right" label="操作" width="400">
                            <template slot-scope="scope">
                              <el-button type="text" size="small" @click="enablePolice(scope.row)">
                                <span v-show="scope.row.status===1">禁用</span>
                                <span v-show="scope.row.status===2">启用</span>
                              </el-button>
                              <el-button type="text" size="small" @click="demOppoFun(scope.row)">机会</el-button>
                              <el-button
                                type="text"
                                size="small"
                                @click="demReseaseFun(scope.row)"
                              >发布</el-button>
                              <el-button type="text" size="small" @click="ResumeFunc(scope.row)">微简历</el-button>
                              <el-button type="text" size="small">
                                <span>{{getAuthStr(scope.row)}}</span>
                                <!-- <span v-show="scope.row.customerType=='1'">公司客户</span>
                                <span v-show="scope.row.customerType=='2'">个人客户</span>
                                <span v-show="scope.row.customerType=='3'">待认证</span>
                                <span v-show="scope.row.customerType=='4'">认证不通过</span>-->
                              </el-button>
                              <el-button type="text" size="small" @click="showEdit(scope.row)">编辑</el-button>
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
                    <b-col style="text-align: right;">
                      <div class="inline-flex">
                        <span>
                          每页显示{{personnel.limit}}
                          条
                        </span>
                      </div>
                      <b-pagination
                        align="right"
                        class="inline-flex"
                        v-model="personnel.currentPage"
                        :per-page="personnel.limit"
                        @change="changeCurrentPage"
                        :total-rows="personnel.total"
                      ></b-pagination>
                      <div class="inline-flex">
                        <span class="table-pageto">
                          跳转到第
                          <input
                            class="form-control page-input"
                            type="number"
                            step="1"
                            min="1"
                            v-model="currPage"
                            @change="updateCurrentPage($event)"
                          />
                          页，共{{personnel.totalPage}}页
                        </span>
                      </div>
                    </b-col>
                  </div>
                </div>
              </template>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-modal
      :id="addOrUpdateModal.id"
      :title="addOrUpdateModal.title"
      size="lg"
      @hide="resetAddOrUpdateModal"
      hide-footer
      no-close-on-backdrop
    >
      <div slot="modal-title">
        <i class="fa fa-align-justify"></i>
        {{addOrUpdateModal.modalType == 'edit' ? '更新' : '新增'}}
      </div>
      <addPerson
        :modalId="addOrUpdateModal.id"
        @refreshTable="refreshTable"
        :modalType="addOrUpdateModal.modalType"
        @click="handleAddOrEdit"
        :targetObj="addOrUpdateModal.targetObj"
      ></addPerson>
    </b-modal>

    <b-modal :id="infoModal.id" :title="infoModal.title" size="lg" hide-footer no-close-on-backdrop>
      <div slot="modal-title">
        <i class="fa fa-align-justify"></i>
        {{infoModal.modalType == 'oppo' ? '我的机会' : '我的发布'}}
      </div>
      <opportunityRelease
        :modalId="infoModal.id"
        @refreshTable="refreshTable"
        :title="infoModal.title"
        :modalType="infoModal.modalType"
        :targetObj="infoModal.targetObj"
      ></opportunityRelease>
    </b-modal>

    <!--停用启用操作弹框-->
    <b-modal
      id="confirmClass"
      class="confirmClass"
      :title="confirmTitle"
      v-model="confirmVisble"
      @ok="submitConfirm"
      cancel-title="关闭"
      ok-title="确定"
    >
      <template v-slot:modal-title>
        <div>
          <i class="fa fa-align-justify"></i>
          <span class="mrl10">{{confirmTitle}}</span>
        </div>
      </template>
      <p style=" margin-bottom: 10px;">{{confirmText}}</p>
    </b-modal>
    <!--微简历弹框-->
    <b-modal
      id="resumeClass"
      :title="'微简历'"
      v-model="showResume"
      hide-footer
      @hidden="()=>{
        this.resumeArr = []
        }"
    >
      <template v-slot:modal-title>
        <div>
          <i class="fa fa-align-justify"></i>
          <span class="mrl10">微简历</span>
        </div>
      </template>
      <banner :resumeArr="resumeArr"></banner>
    </b-modal>
  </div>
</template>

<script>
import { Callout } from "@coreui/vue";
import axios from "axios";
import * as personAPI from "@/api/workInfin/personAPI.js";
import addPerson from "@/views/personManagement/Modular/addPerson.vue";
import opportunityRelease from "@/views/personManagement/Modular/opportunityRelease.vue";
import banner from "@/views/personManagement/Modular/banner.vue";
export default {
  name: "dashboard",
  components: {
    addPerson,
    opportunityRelease,
    banner
  },
  data: function() {
    return {
      selectedIdList: [], //勾选的数组
      resumeArr: [], //微简历传参
      currPage: 1,
      personnel: {
        personData: [],
        currentPage: 1,
        limit: 10,
        total: 0
      },
      search: {
        id: "",
        fromSysId: "",
        userName: "",
        nickName: "",
        mobile: "",
        qq: "",
        wechat: "",
        utopaIm: "",
        customerType: "0",
        optionstatus: [
          { value: "0", text: "全部" },
          { value: "1", text: "公司客户" },
          { value: "2", text: "个人客户" },
          { value: "3", text: "待认证" },
          { value: "4", text: "认证不通过" }
        ]
        // pageNo: 1,
        // pageSize: 10
      },
      confirmVisble: false,
      showResume: false,
      confirmTitle: "",
      confirmText: "",
      accountId: "",
      ids: null,
      status: "",
      infoModal: {
        id: "info-modal",
        title: "",
        targetObj: {},
        content: ""
      },
      addOrUpdateModal: {
        id: "add-update-modal",
        title: "",
        modalType: "",
        targetObj: {},
        content: ""
      }
    };
  },
  created() {
    this.accountId = JSON.parse(localStorage.getItem("userinfo")).userId;
    this.getAccountList();
  },
  methods: {
    //  status 状态(1:启用,2:待审核)
    //  客户类型 1:公司客户 2:个人客户 3:待认证 4:认证不通过 5:未填写认证信息 */
    getAuthStr(row) {
      // customerStatus
      // customerType

      const type = row.customerType;
      const status = row.customerStatus;
      const str1 = "待认证";
      const str4 = "已认证";
      const person = "个人客户";
      const company = "公司客户";

      if (type == 5) {
        return "未填写认证信息";
      }
      if (status == 0) {
        return "认证未通过";
      }
      // 待认证
      if (status == 2) {
        return "待认证";
      }
      // 已认证
      if (status == 1) {
        if (type === "1") {
          return company;
        }
        if (type == "2") {
          return person;
        }
      }
    },
    indexMethod(index) {
      return index + 1 * 1;
    },
    handleAddOrEdit() {},
    //微简历
    getQueryUserResumePicList(item) {
      console.log("item", item, item.id);
      personAPI
        .getQueryUserResumePicList({
          userId: item.id
        })
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.result.length > 0) {
              this.showResume = true;
              res.data.result.map(item => {
                return this.resumeArr.push(item.url);
              });
            } else {
              this.$message.error("暂无上传微简历");
            }
            console.log("简历", this.resumeArr);
          } else {
            this.resumeArr = [];
          }
        });
    },
    //清空弹出框信息
    resetAddOrUpdateModal() {
      this.addOrUpdateModal.title = "";
      this.addOrUpdateModal.content = "";
    },
    // 勾选的
    handleSelect(selection, item) {
      this.selectedIdList = [];
      selection.map(val => {
        return this.selectedIdList.push(val.id);
      });
    },
    // 导出表格
    exportProject() {
      let obj = {
        userPageDto: {
          page: 1,
          limit: 100,
          params: {
            userName: this.search.userName
              ? `*${this.search.userName}*`
              : undefined,
            nickName: this.search.nickName
              ? `*${this.search.nickName}*`
              : undefined,
            mobile: this.search.mobile ? `*${this.search.mobile}*` : undefined,
            qq: this.search.qq ? `*${this.search.qq}*` : undefined,
            wechat: this.search.wechat ? `*${this.search.wechat}*` : undefined
          }
        },
        selectedIdList: this.selectedIdList
      };
      personAPI.exportXls(obj).then(data => {
        console.log(data);
        if (!data) {
          this.$message.warning("文件下载失败");
          return;
        }
        if (typeof window.navigator.msSaveBlob !== "undefined") {
          window.navigator.msSaveBlob(
            new Blob([data.data]),
            "人员列表数据" + ".xls"
          );
        } else {
          let url = window.URL.createObjectURL(new Blob([data.data]));
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", "人员列表数据" + ".xls");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link); //下载完成移除元素
          window.URL.revokeObjectURL(url); //释放掉blob对象
        }
      });
    },
    refreshTable(type) {
      if (type == "add") {
        this.currentPage = 1; //插入数据显示在第一页
        this.getAccountList();
        // this.currentPage = Math.ceil((this.totalRows+1)/this.perPage);  //插入数据显示在最后一页
      } else {
        this.getAccountList();
      }
    },
    // 微简历弹框
    ResumeFunc(item) {
      this.getQueryUserResumePicList(item);
      // this.resumeObj = item
      // this.getAccountList()
    },
    // 清空查询条件
    resetSearch() {
      this.search.id = "";
      this.search.fromSysId = "";
      this.search.userName = "";
      this.search.nickName = "";
      this.search.mobile = "";
      this.search.qq = "";
      this.search.wechat = "";
      this.search.customerType = "0";
    },
    // 启用禁用提交
    submitConfirm(item) {
      console.log("item", item);
      personAPI
        .enablePolice({
          ids: this.ids,
          status: this.status === 1 ? 2 : 1
        })
        .then(res => {
          console.log("res", res);
          this.getAccountList();
        });
    },
    // 启用禁用弹框
    enablePolice(item) {
      this.confirmTitle = item.status === 1 ? "停用确定" : "启用确定";
      this.confirmVisble = true;
      this.confirmText =
        item.status === 1 ? "确定停用该用户？" : "确定启用该用户？";
      this.ids = item.id;
      this.status = item.status;
    },
    // 新增弹框
    addFun() {
      this.addOrUpdateModal.title = `新增`;
      this.addOrUpdateModal.modalType = "add";
      this.addOrUpdateModal.content = "新增form";
      this.$root.$emit("bv::show::modal", this.addOrUpdateModal.id);
    },
    //查看详情
    demOppoFun(item) {
      this.infoModal.title = `我的机会`;
      this.infoModal.targetObj = item;
      this.infoModal.modalType = "oppo";
      this.$root.$emit("bv::show::modal", this.infoModal.id);
    },
    demReseaseFun(item) {
      this.infoModal.title = `我的发布`;
      this.infoModal.targetObj = item;
      this.infoModal.modalType = "release";
      this.$root.$emit("bv::show::modal", this.infoModal.id);
    },
    // 获取用户list
    getAccountList() {
      let obj = {
        pageDto: {
          page: this.personnel.currentPage,
          limit: this.personnel.limit,
          params: {
            id: this.search.id ? this.search.id : undefined,
            // fromSysId:this.search.fromSysId ? this.search.fromSysId :undefined,
            userName: this.search.userName
              ? `*${this.search.userName}*`
              : undefined,
            nickName: this.search.nickName
              ? `*${this.search.nickName}*`
              : undefined,
            mobile: this.search.mobile ? `*${this.search.mobile}*` : undefined,
            qq: this.search.qq ? `*${this.search.qq}*` : undefined,
            wechat: this.search.wechat ? `*${this.search.wechat}*` : undefined,
            utopaIm: this.search.utopaIm
              ? `*${this.search.utopaIm}*`
              : undefined
          }
        },
        customerType: this.search.customerType
          ? this.search.customerType
          : undefined
      };
      this.$loading();
      personAPI
        .getPersonData(obj)
        .then(res => {
          this.$loading.close();
          console.log("res.data.result.records", res.data.result);
          if (res.data.code == 0) {
            this.personnel.personData = res.data.result.list;
            this.personnel.total = res.data.result.totalCount;
            this.personnel.totalPage = res.data.result.totalPage;
          } else {
            console.log("异常信息");
            this.personnel.personData = [];
          }
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    // 跳转页码
    updateCurrentPage(page) {
      if (this.currPage > 0) {
        if (this.currPage > this.personnel.totalPage) {
          this.currPage = this.personnel.totalPage;
        }
        this.personnel.currentPage = this.currPage;
        this.getAccountList();
      }
    },
    // 用户账号查询按钮
    handleSearch() {
      this.personnel.currentPage = 1;
      this.currPage = 1;
      this.getAccountList();
    },
    // 数据权限元素编辑
    showEdit(item) {
      console.log("编辑的参数", item);
      this.addOrUpdateModal.title = `更新`;
      this.addOrUpdateModal.modalType = "edit";
      this.addOrUpdateModal.targetObj = item;
      this.addOrUpdateModal.content = "修改";
      this.$root.$emit("bv::show::modal", this.addOrUpdateModal.id);
    },
    // input框删除操作
    emitEmpty(type) {
      const Picker = {
        // 账号管理
        id: () => {
          this.$refs.id.focus();
          this.search.id = "";
        },
        nickName: () => {
          this.$refs.nickName.focus();
          this.search.nickName = "";
        },
        wechat: () => {
          this.$refs.wechat.focus();
          this.search.wechat = "";
        },
        qq: () => {
          this.$refs.qq.focus();
          this.search.qq = "";
        },
        mobile: () => {
          this.$refs.mobile.focus();
          this.search.mobile = "";
        },
        userName: () => {
          this.$refs.userName.focus();
          this.search.userName = "";
        }
      }[type]();
    },
    changeCurrentPage(num) {
      this.currPage = num;
      this.personnel.currentPage = num;
      this.getAccountList();
    }
  }
};
</script>

<style lang="scss" scoped>
/* IE fix */
#card-chart-01,
#card-chart-02 {
  width: 100% !important;
}
.top-btns {
  padding: 0 5px;
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
.select-width {
  width: 150px;
}
.mrt20 {
  margin-top: 20px;
}
.inline-flex {
  display: inline-flex;
  padding: 0 10px;
}
</style>
