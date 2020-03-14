
<template>
  <div class="animated fadeIn">
    <b-row style="padding-top:20px;">
      <b-col sm="12" lg="12">
        <b-card>
          <b-card-body>
            <div class="dashboard-person">
              <b-tabs
                @input="toggle"
                content-class="mt-3"
                v-model="tabIndex"
                active-nav-item-class="font-weight-bold text-uppercase"
              >
                <b-tab :title="`进行中(${demStatus.underway})`"></b-tab>
                <!-- <b-tab title="挂起"></b-tab> -->
                <b-tab :title="`已完成(${demStatus.complete})`"></b-tab>
                <b-tab :title="`已延迟(${demStatus.delayed})`"></b-tab>
              </b-tabs>
              <div class="dem-tabs-box">
                <div class="dem-tabs-item" @click="handJump('pending')">
                  <div
                    class="dem-tabs-num"
                    :class="[btnState=='pending'?'active1':'']"
                  >{{demStatus.underway}}</div>
                  <span class="dem-tabs-text" :class="[btnState=='pending'?'active1-text':'']">进行中</span>
                </div>
                <div class="dem-tabs-item" @click="handJump('complete')">
                  <div
                    class="dem-tabs-num"
                    :class="[btnState=='complete'?'active1':'']"
                  >{{demStatus.complete}}</div>
                  <span class="dem-tabs-text" :class="[btnState=='complete'?'active1-text':'']">已完成</span>
                </div>
                <div class="dem-tabs-item" @click="handJump('delay')">
                  <div
                    class="dem-tabs-num"
                    :class="[btnState=='delay'?'active1':'']"
                  >{{demStatus.delayed}}</div>
                  <span class="dem-tabs-text" :class="[btnState=='delay'?'active1-text':'']">延迟</span>
                </div>
              </div>
            </div>
            <div>
              <b-row class="mrt20">
                <b-col>
                  <div class="datalist-tab">
                    <div style="width:100%">
                      <template>
                        <el-table
                          :data="demData.releaseData"
                          ref="table"
                          :cell-style="{color:'#000',textAlign:'center'}"
                          :header-cell-style="{background:'#E4E7EA',color:'#5C6873',textAlign:'center'}"
                          style="width: 100%"
                          border
                        >
                          <el-table-column prop="id" label="需求id" :show-overflow-tooltip="true"></el-table-column>
                          <el-table-column
                            prop="dmdTitle"
                            label="需求名称"
                            :show-overflow-tooltip="true"
                          ></el-table-column>
                          <el-table-column
                            prop="createTime"
                            label="需求时间"
                            :show-overflow-tooltip="true"
                          ></el-table-column>
                          <el-table-column fixed="right" label="操作">
                            <template slot-scope="scope">
                              <el-button type="text" size="small" @click="showDetail(scope.row)">查看</el-button>
                              <!-- <el-button type="text" size="small" @click="showEdit(scope.row)">编辑</el-button> -->
                            </template>
                          </el-table-column>
                        </el-table>
                      </template>
                      <template>
                        <div class="pageFixed">
                          <div class="overflow-auto">
                            <b-col style="text-align: right;">
                              <div>
                                <div class="inline-flex">
                                  <span>
                                    每页显示
                                    {{demData.limit}}
                                    条
                                  </span>
                                </div>
                                <b-pagination
                                  align="right"
                                  class="inline-flex"
                                  v-model="demData.currentPage"
                                  :per-page="demData.limit"
                                  @change="changeCurrentPage"
                                  :total-rows="demData.total"
                                ></b-pagination>
                                <div class="inline-flex">
                                  <div class="table-pageto">
                                    <p class="inline-flex">跳转到第</p>
                                    <input
                                      class="form-control page-input"
                                      type="number"
                                      step="1"
                                      min="1"
                                      v-model="currPage"
                                      @change="updateCurrentPage($event)"
                                    />页，
                                    <p class="inline-flex">共{{demData.totalPage}}页</p>
                                  </div>
                                </div>
                              </div>
                            </b-col>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <!-- 弹框 -->
    <b-modal
      :id="editOrDetailModal.id"
      :title="editOrDetailModal.title"
      size="lg"
      @hide="reseteditOrDetailModal"
      hide-footer
      no-close-on-backdrop
    >
      <div slot="modal-title">
        <i class="fa fa-align-justify"></i>
        {{editOrDetailModal.modalType == 'edit' ? '更新' : '新增'}}
      </div>
      <demTable
        :modalId="editOrDetailModal.id"
        :modalType="editOrDetailModal.modalType"
        :targetObj="editOrDetailModal.targetObj"
      ></demTable>
    </b-modal>
  </div>
</template>

<script>
import * as workAPI from "@/api/workInfin/workInfin.js";
import demTable from "@/views/dashModule/table.vue";
export default {
  name: "asset-add-update",
  components: {
    demTable
  },
  props: {},
  data() {
    return {
      btnState: null,
      tabIndex: 0,
      editOrDetailModal: {
        id: "edit-detail-modal",
        title: "",
        modalType: "",
        targetObj: {}
      },
      currPage: 1,
      loginAcc: "",
      demData: {
        releaseData: [],
        currentPage: 1,
        limit: 10,
        total: null,
        totalPage: null
      },
      demStatus: {
        underway: 2,
        hangUp: null,
        complete: 4,
        delayed: 4
      }
    };
  },

  computed: {},
  watch: {},
  created() {
    this.getHaving();
    this.btnState = "pending";
  },
  mounted() {
    this.queryDemandStatus();
  },
  methods: {
    toggle(num) {
      console.log("toggle", num);
      if (num == 0) {
        this.btnState = "pending";
        this.getHaving();
      } else if (num == 1) {
        this.btnState = "complete";
        this.getCompleted();
      } else if (num == 2) {
        this.btnState = "delay";
        this.getDelayedDemandList();
      }
    },
    handJump(val) {
      console.log("val", val);
      this.btnState = val;
      if (val == "pending") {
        this.tabIndex = 0;
      } else if (val == "complete") {
        this.tabIndex = 1;
      } else if (val == "delay") {
        this.tabIndex = 2;
      }
    },
    reseteditOrDetailModal() {
      this.editOrDetailModal.title = "";
      this.editOrDetailModal.content = "";
    },
    showEdit(item) {
      console.log("item", item);
      this.editOrDetailModal.title = `更新`;
      this.editOrDetailModal.modalType = "edit";
      this.editOrDetailModal.targetObj = item;
      this.editOrDetailModal.content = "修改";
      this.$root.$emit("bv::show::modal", this.editOrDetailModal.id);
    },
    showDetail(item) {
      this.editOrDetailModal.title = `查看`;
      this.editOrDetailModal.modalType = "edit";
      this.editOrDetailModal.targetObj = item;
      this.editOrDetailModal.content = "修改";
      this.$root.$emit("bv::show::modal", this.editOrDetailModal.id);
    },
    // 获取进行中的需求
    getHaving() {
      let obj = {
        page: this.demData.currentPage,
        limit: this.demData.limit,
        params: {
          // employerAcc: this.loginAcc
          // employerAcc:18819446446
        },
        order: "id"
      };
      this.$loading();
      workAPI
        .getHaving(obj)
        .then(res => {
          console.log("765432", res);
          this.$loading.close();
          if (res.data.result.list.length > 0) {
            this.demData.releaseData = res.data.result.list;
            this.demData.totalPage = res.data.result.totalPage;
            this.demData.total = res.data.result.totalCount;
          } else {
            this.demData.releaseData = [];
          }
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    // 获取已完成的需求
    getCompleted() {
      let obj = {
        page: this.demData.currentPage,
        limit: this.demData.limit,
        params: {
          employerAcc: "18819446446"
        }
      };
      workAPI.getCompleted(obj).then(res => {
        console.log("res", res);
        if (res.data.code == 0) {
          this.demData.releaseData = res.data.result.list;
          this.demData.totalPage = res.data.result.totalPage;
          this.demData.total = res.data.result.totalCount;
        } else {
          this.demData.releaseData = [];
        }
        console.log("res", res);
      });
    },
    // 查询已延时的需求
    getDelayedDemandList() {
      let obj = {
        page: this.demData.currentPage,
        limit: this.demData.limit,
        params: {
          employerAcc: "18819446446"
        }
      };
      workAPI.getDelayedDemandList(obj).then(res => {
        console.log("res", res);
        if (res.data.code == 0) {
          this.demData.releaseData = res.data.result.list;
          this.demData.totalPage = res.data.result.totalPage;
          this.demData.total = res.data.result.totalCount;
        } else {
          this.demData.releaseData = [];
        }
        console.log("res", res);
      });
    },
    // 需求状态统计
    queryDemandStatus() {
      workAPI.queryDemandStatus().then(res => {
        let result = res.data.result;
        this.demStatus.underway = result.underway;
        this.demStatus.complete = result.complete;
        this.demStatus.delayed = result.delayed;
        // console.log('需求状态',res)
      });
    },
    changeCurrentPage(num) {
      this.currPage = num;
      this.demData.currentPage = num;
      if (this.modalType == "oppo") {
        this.getMyChance();
      } else {
        this.getMyRelease();
      }
    },
    updateCurrentPage() {
      if (this.currPage > 0) {
        if (this.currPage > this.demData.totalPage) {
          this.currPage = this.demData.totalPage;
        }
        this.demData.currentPage = this.currPage;
        if (this.modalType == "oppo") {
          this.getMyChance();
        } else {
          this.getMyRelease();
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.inline-flex {
  display: inline-flex;
  padding: 0 10px;
}
.pageFixed {
  margin-top: 20px;
}
.dashboard-person {
  // margin:20px;
}
.tabs {
  // border:1px solid #eee;
  padding: 5px 0;
  text-align: center;
}
.page-input {
  display: inline;
  max-width: 75px;
  margin: 0 10px;
}
.tab-pane {
  padding: 0px;
}
.dem-tabs-box {
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .active1 {
    background: #007bff;
  }
  .active1-text {
    color: #007bff;
  }
  .dem-tabs-item {
    .dem-tabs-num {
      width: 100%;
      height: 150px;
      border: 1px solid #ccc;
      text-align: center;
      line-height: 150px;
      font-size: 30px;
    }
    .dem-tabs-text {
      display: inline-block;
      width: 100px;
      text-align: center;
    }
  }
}
</style>
