<template>
  <div class="animated fadeIn">
    <b-row style="padding-top:20px;">
      <b-col sm="12" lg="12">
        <b-card>
          <b-card-body>
            <div>
              <div class="add-person">
                 <b-row>
                 <b-col>
                   <div class="tabs">进行中</div>
                 </b-col>
                 <b-col>
                   <div class="tabs">挂起</div>
                 </b-col>
                 <b-col>
                   <div class="tabs">完成</div>
                 </b-col>
                  <b-col>
                   <div class="tabs">完成</div>
                 </b-col>
                </b-row>
              </div>
              <div>
                <!-- <b-row>
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
                                    <b-button  class="btn btn-primary btn-block func-item func-btn btn-sm" size="sm" variant="primary" @click="resetSearch">清空</b-button>
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
                            <b-col sm="6" lg="4">
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
                            </b-col>
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
                                <b-col sm="3" lg="4" style="text-align:right">
                                  <label
                                    for="basicWork"
                                    class="col-form-label"
                                  >姓名：</label>
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
                                      <label
                                        for="exampleInputName3"
                                        class="inline"
                                      >认证状态：</label>
                                    </b-col>
                                    <b-form-select
                                      class="inline select-width"
                                      v-model="search.utopaIm"
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
                </b-row> -->
              </div>
              <div>
                <b-row class="mrt20">
                  <b-col>
                    <div class="datalist-tab">
                      <template>
                        <el-table
                          :data="personnel.personData"
                          ref="table"
                          :cell-style="{color:'#000',textAlign:'center'}"
                          :header-cell-style="{background:'#E4E7EA',color:'#5C6873',textAlign:'center'}"
                          style="width: 100%"
                          border
                        >
                          <el-table-column prop="id" label="需求id"></el-table-column>
                          <el-table-column
                            prop="nickName"
                            label="需求名称"
                            :show-overflow-tooltip="true"
                          ></el-table-column>
                          <el-table-column
                            fixed="right"
                            label="操作"
                            width="300"
                          >
                            <template slot-scope="scope">
                              <el-button type="text" size="small" @click="ResumeFunc(scope.row)">查看</el-button>
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
                          <span>每页显示{{personnel.limit}}
                           条</span>
                        </div>
                        <b-pagination
                          align="right"
                          class="inline-flex"
                          v-model="personnel.currentPage"
                          :per-page="personnel.limit"
                          @change="changeCurrentPage"
                          :total-rows="personnel.total"
                        ></b-pagination>
                        <div  class="inline-flex">
                          <span class="table-pageto">跳转到第<input class="form-control page-input" type="number" step="1" min="1"  v-model="currPage"  @change="updateCurrentPage($event)" >页，共{{personnel.totalPage}}页</span>
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
    <b-modal :id="addOrUpdateModal.id" :title="addOrUpdateModal.title"  size="lg" @hide="resetAddOrUpdateModal"  hide-footer no-close-on-backdrop  >
      <div slot="modal-title"><i class="fa fa-align-justify"></i>
        {{addOrUpdateModal.modalType == 'edit' ? '更新' : '新增'}}
      </div>
      <addPerson  :modalId="addOrUpdateModal.id" :modalType="addOrUpdateModal.modalType" :targetObj="addOrUpdateModal.targetObj" ></addPerson>
    </b-modal>

  </div>
</template>

<script>
import { Callout } from "@coreui/vue";
import axios from "axios";
import * as personAPI from '@/api/workInfin/personAPI.js'
import addPerson from "@/views/personManagement/Modular/addPerson.vue"
import opportunityRelease from "@/views/personManagement/Modular/opportunityRelease.vue"
import banner from "@/views/personManagement/Modular/banner.vue"
export default {
  name: "dashboard",
  components: {
    addPerson ,
    opportunityRelease,
    banner
  },
  data: function() {
    return {
      currPage:1,
      personnel:{
        personData: [],
        currentPage: 1,
        limit:10,
        total: 0,
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
        optionstatus: [
          { value: '0', text: "全部" },
          { value: '1', text: "个人认证" },
          { value: '2', text: "企业认证" },
          { value: 'rentalCustomer', text: "待认证" },
          { value: '3', text: "认证不通过" }
        ],
        // pageNo: 1,
        // pageSize: 10
      },
      confirmVisble:false,
      showResume:false,
      confirmTitle:'',
      confirmText:'',
      accountId: "",
      ids:null,
      status:'',
      infoModal: {
        id: 'info-modal',
        title: '',
        targetObj:{},
        content: ''
      },
      addOrUpdateModal: {
        id: 'add-update-modal',
        title: '',
        modalType:'',
        targetObj:{},
        content: ''
      },
    };
  },
  created() {
    this.accountId = JSON.parse(localStorage.getItem("userinfo")).userId;
    this.getAccountList()
  },
  methods: {
    indexMethod(index) {
      return index + 1 * 1;
    },
    //清空弹出框信息
    resetAddOrUpdateModal() {
      this.addOrUpdateModal.title = ''
      this.addOrUpdateModal.content = ''
    },



    // 获取用户list
    getAccountList() {
      let obj = {
        page: this.personnel.currentPage,
        limit:this.personnel.limit,
        params: {
          id:this.search.id ? `*${this.search.id}*` :undefined,
          fromSysId:this.search.fromSysId ? this.search.fromSysId :undefined,
          userName:this.search.userName ? `*${this.search.userName}*` :undefined,
          nickName:this.search.nickName ? `*${this.search.nickName}*` :undefined,
          mobile:this.search.mobile ? `*${this.search.mobile}*` :undefined,
          qq: this.search.qq ? `*${this.search.qq}*` :undefined,
          wechat:this.search.wechat ? `*${this.search.wechat}*` :undefined,
          utopaIm:this.search.utopaIm ? `*${this.search.utopaIm}*` :undefined,
        },
      };
      this.$loading();
      personAPI.getPersonData(obj)
        .then(res => {
          this.$loading.close();
          console.log('res.data.result.records',res.data.result)
          if(res.data.code==0){
            this.personnel.personData = res.data.result.list;
            this.personnel.total = res.data.result.totalCount;
            this.personnel.totalPage = res.data.result.totalPage;
          }else{
            console.log('异常信息')
            this.personnel.personData = [];
          }
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    // 跳转页码
    updateCurrentPage(page){
      if(this.currPage > 0){
        if(this.currPage > this.personnel.totalPage){
          this.currPage = this.personnel.totalPage
        }
        this.personnel.currentPage = this.currPage
        this.getAccountList()
      }
    },
    // 用户账号查询按钮
    handleSearch() {
      this.personnel.currentPage = 1;
      this.getAccountList()
    },
    // 数据权限元素编辑
    showEdit(item) {
      console.log('编辑的参数',item)
      this.addOrUpdateModal.title = `更新`
      this.addOrUpdateModal.modalType = 'edit'
      this.addOrUpdateModal.targetObj = item
      this.addOrUpdateModal.content = '修改'
      this.$root.$emit('bv::show::modal', this.addOrUpdateModal.id)
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
      this.currPage = num
       this.personnel.currentPage = num
      this.getAccountList()
    },
  },
};
</script>

<style lang="scss" scoped>
/* IE fix */
#card-chart-01,
#card-chart-02 {
  width: 100% !important;
}
.top-btns{
  padding:0 5px;
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
.inline-flex{
  display:inline-flex;
  padding: 0 10px;
}


.tabs{
  border:1px solid #eee;
  padding: 5px 0;
  text-align: center;
}
</style>
