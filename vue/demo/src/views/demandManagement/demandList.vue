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
                    <b-button size="sm" variant="primary" @click="addFun">
                      <i class="fa fa-plus-square-o"></i>新增需求
                    </b-button>
                  </div>
                  <div class="top-btns">
                    <b-button size="sm" variant="primary" @click="exportProject">导出需求列表</b-button>
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
                                <div class="search-title">需求查询</div>
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
                            <b-col sm="6" lg="4">
                              <div class="input-group">
                                <b-col sm="3" lg="4" style="text-align:right">
                                  <label for="basicName" class="col-form-label">需求id：</label>
                                </b-col>
                                <input
                                  id="basicName"
                                  type="text"
                                  ref="id"
                                  v-model="search.id"
                                  placeholder="请输入需求id查询"
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
                                  <label for="basicAccount" class="col-form-label">需求名称：</label>
                                </b-col>
                                <input
                                  v-model="search.dmdTitle"
                                  id="basicAccount"
                                  type="text"
                                  ref="dmdTitle"
                                  placeholder="请输入需求名称查询"
                                  class="form-control auth-form-control border-3r"
                                />
                                <i
                                  v-show="search.dmdTitle"
                                  @click="emitEmpty('dmdTitle')"
                                  class="cui-circle-x icons clearIcon"
                                ></i>
                              </div>
                            </b-col>
                            <b-col sm="6" lg="4">
                              <div class="input-group">
                                <b-col sm="3" lg="4" style="text-align:right">
                                  <label for="basicMobile" class="col-form-label">任务类别：</label>
                                </b-col>
                                <b-form-select
                                  class="inline select-width"
                                  v-model="search.dmdType"
                                  id="exampleInputName3"
                                  :options="search.dmdTypeSelect"
                                  :plain="true"
                                  @change="getRequireSkill"
                                ></b-form-select>
                              </div>
                            </b-col>
                            <!-- <b-col sm="6" lg="4">
                              <div class="input-group">
                                 <b-col sm="3" lg="4" style="text-align:right">
                                  <label for="basicQQ" class="col-form-label">所需技能：</label>
                                </b-col>
                                <b-form-select
                                      class="inline select-width"
                                      v-model="search.requireSkill"
                                      id="exampleInputName3"
                                      :options="search.requireSkillSelect"
                                      :plain="true"
                                ></b-form-select>
                                </div>
                            </b-col>-->

                            <b-col sm="6" lg="4">
                              <div class="input-group">
                                <b-col sm="3" lg="4" style="text-align:right">
                                  <label for="basicMobile" class="col-form-label">所需技能：</label>
                                </b-col>
                                <el-select
                                  label="所需技能："
                                  style="marginLeft:2px"
                                  v-model="search.skillList"
                                  multiple
                                  collapse-tags
                                  placeholder="请选择所需技能"
                                >
                                  <el-option
                                    v-for="item in search.requireSkillSelect"
                                    :key="item.value"
                                    :label="item.text"
                                    :value="item.value"
                                  ></el-option>
                                </el-select>
                              </div>
                            </b-col>

                            <b-col sm="6" lg="4">
                              <div class="input-group">
                                <b-col sm="3" lg="4" style="text-align:right">
                                  <label for="basicWork" class="col-form-label">发包人：</label>
                                </b-col>
                                <b-form-select
                                  class="inline select-width"
                                  v-model="search.employerAcc"
                                  id="exampleInputName3"
                                  :plain="true"
                                >
                                  <option
                                    v-for="opt in ConSelect"
                                    :value="opt.loginAcc"
                                    :key="opt.loginAcc"
                                  >{{opt.loginAcc}}</option>
                                </b-form-select>
                              </div>
                            </b-col>
                            <b-col sm="6" lg="4">
                              <div class="input-group">
                                <b-col sm="3" lg="4" style="text-align:right">
                                  <label for="basicWork" class="col-form-label">审核状态：</label>
                                </b-col>
                                <b-form-select
                                  class="inline select-width"
                                  v-model="search.status"
                                  id="exampleInputName3"
                                  :options="search.optionstatus"
                                  :plain="true"
                                ></b-form-select>
                              </div>
                            </b-col>
                            <b-col sm="6" lg="4">
                              <div class="input-group">
                                <b-col sm="3" lg="4" style="text-align:right">
                                  <label for="basicMobile" class="col-form-label">需求预算：</label>
                                </b-col>
                                <input
                                  v-model="search.dmdBudget"
                                  id="basicMobile"
                                  type="text"
                                  ref="dmdBudget"
                                  placeholder="请输入具体查询金额"
                                  class="form-control auth-form-control border-3r"
                                />
                                <i
                                  v-show="search.dmdBudget"
                                  @click="emitEmpty('dmdBudget')"
                                  class="cui-circle-x icons clearIcon"
                                ></i>
                              </div>
                            </b-col>
                            <b-col sm="6" lg="4">
                              <div class="input-group">
                                <b-col sm="3" lg="4" style="text-align:right">
                                  <label for="basicWork" class="col-form-label">接包人：</label>
                                </b-col>
                                <!-- @input="handleBidder" -->

                                <b-form-select
                                  class="inline select-width"
                                  v-model.lazy.trim="search.bidderAcc"
                                  id="exampleInputName3"
                                  :plain="true"
                                  :options="ReceSelect"
                                >
                                  <!-- <option
                                  v-for="opt in ReceSelect"
                                    :value="opt.bidderAcc"
                                    :key="opt.bidderAcc"
                                  >
                                    {{opt.bidderAcc}}
                                  </option>-->
                                  <!-- <option
                                    v-for="(opt,index) in ReceSelect"
                                    :value="opt.value"
                                    :key="index"
                                  >{{opt.bidderAcc}}</option>-->
                                </b-form-select>
                              </div>
                            </b-col>
                            <b-col sm="12" lg="4">
                              <div class="input-group" style="width:100%;">
                                <form class="form-inline" style="width:100%">
                                  <div class="form-group" style="width:100%">
                                    <b-col sm="3" lg="4" style="text-align:right">
                                      <label for="exampleInputName3" class="inline">需求发布时间：</label>
                                    </b-col>
                                    <!-- <el-date-picker
                                        v-model="search.submitTime"
                                        type="datetimerange"
                                         @change="handleTime"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                    </el-date-picker>-->

                                    <el-date-picker
                                      v-model="search.value2"
                                      type="daterange"
                                      align="right"
                                      unlink-panels
                                      @change="handleTime"
                                      range-separator="至"
                                      start-placeholder="开始日期"
                                      end-placeholder="结束日期"
                                      :default-time="['00:00:00', '23:59:59']"
                                      :picker-options="pickerOptions"
                                    ></el-date-picker>
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
                          :data="tableData"
                          @select="handleSelect"
                          ref="table"
                          :cell-style="{color:'#000',textAlign:'center'}"
                          :header-cell-style="{background:'#E4E7EA',color:'#5C6873',textAlign:'center'}"
                          style="width: 100%"
                          border
                        >
                          <el-table-column type="selection" width="55"></el-table-column>
                          <el-table-column prop="id" label="需求id"></el-table-column>
                          <el-table-column
                            prop="dmdTitle"
                            label="需求名称"
                            :show-overflow-tooltip="true"
                          ></el-table-column>

                          <el-table-column
                            prop="dmdTypeName"
                            width="100"
                            label="任务类别"
                            :show-overflow-tooltip="true"
                          ></el-table-column>
                          <el-table-column
                            prop="requireSkillList"
                            width="100"
                            label="所需技能"
                            :formatter="formatter"
                            :show-overflow-tooltip="true"
                          ></el-table-column>
                          <el-table-column
                            prop="submitTime"
                            label="发布时间"
                            :show-overflow-tooltip="true"
                          ></el-table-column>
                          <el-table-column
                            prop="dmdBudget"
                            label="需求预算"
                            width="100"
                            :show-overflow-tooltip="true"
                          ></el-table-column>
                          <!-- <el-table-column prop="userAvatar" label="图片预览" > -->
                          <el-table-column prop="fileUrlList" label="图片预览">
                            <template slot-scope="scope">
                              <!-- <img v-if="scope.row.fileUrlList" v-for="(item,idx) in scope.row.fileUrlList" style="width:80%" :src="item" :key="idx" /> -->
                              <img
                                :src="scope.row.demandFileUrlList[0].url"
                                v-if="scope.row.demandFileUrlList.length>0"
                                style="width:80%"
                              />
                              <img v-else src="@/assets/img/null.jpg" alt style="width:80%" />
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="employerAcc"
                            width="100"
                            label="发包人"
                            :show-overflow-tooltip="true"
                          ></el-table-column>

                          <el-table-column fixed="right" label="状态" width="75">
                            <template slot-scope="scope">
                              <el-button type="text" size="small" class="black" style="cursor:text">
                                <span v-show="scope.row.status===1">待审核</span>
                                <span v-show="scope.row.status===2">审核通过</span>
                                <span v-show="scope.row.status===3">审核未通过</span>
                                <span v-show="scope.row.status===4">已投标</span>
                                <span v-show="scope.row.status===5">已选标</span>
                                <span v-show="scope.row.status===8">已开工</span>
                                <span v-show="scope.row.status===10">准时已完成</span>
                                <span v-show="scope.row.status===11">逾期已完成</span>
                                <span v-show="scope.row.status===13">已挂起</span>
                                <span v-show="scope.row.status===14">已终止</span>
                                <span v-show="scope.row.status===15">需求已过期</span>
                              </el-button>
                            </template>
                          </el-table-column>

                          <el-table-column
                            fixed="right"
                            width="75"
                            label="中标人"
                            :show-overflow-tooltip="true"
                          >
                            <template slot-scope="scope">
                              <span v-if="scope.row.theDemandBidder===null">暂无</span>
                              <span v-else>{{scope.row.theDemandBidder.bidderAcc}}</span>
                            </template>
                          </el-table-column>

                          <el-table-column fixed="right" label="操作" width="150">
                            <template slot-scope="scope">
                              <el-button type="text" size="small" @click="applicant(scope.row)">报名人员</el-button>
                              <el-button type="text" size="small">
                                <!-- <span>{{scope.row.bidderName}}</span> -->
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
              <!-- <Pagination :page="page" @currentChangeHandle="currentChangeHandle" @updateCurrentPage="updateCurrentPage"></Pagination> -->
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
      <demandAdd
        :modalId="addOrUpdateModal.id"
        @getAccountList="getAccountList"
        :modalType="addOrUpdateModal.modalType"
        :targetObj="addOrUpdateModal.targetObj"
      ></demandAdd>
    </b-modal>

    <b-modal
      :id="modifyModal.id"
      :title="modifyModal.title"
      size="lg"
      @hide="resetmodifyModal"
      hide-footer
      no-close-on-backdrop
    >
      <div slot="modal-title">
        <i class="fa fa-align-justify"></i>
        {{modifyModal.modalType == 'edit' ? '修改' : '修改'}}
      </div>
      <demandProcess
        :modalId="modifyModal.id"
        :modalType="modifyModal.modalType"
        :targetObj="modifyModal.targetObj"
        @getAccountList="getAccountList"
      ></demandProcess>
    </b-modal>

    <!-- <b-modal :id="infoModal.id" :title="infoModal.title" size="lg" hide-footer no-close-on-backdrop>
      <div slot="modal-title">
        <i class="fa fa-align-justify"></i>
        {{infoModal.modalType == 'oppo' ? '我的机会' : '我的发布'}}
      </div>
      <opportunityRelease
        :modalId="infoModal.id"
        :title="infoModal.title"
        :modalType="infoModal.modalType"
        :targetObj="infoModal.targetObj"
      ></opportunityRelease>
    </b-modal> -->

    <!--停用启用操作弹框-->
    <!-- <b-modal
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
    </b-modal> -->
    <!--微简历弹框-->
    <!-- <b-modal :title="'微简历'" v-model="showResume" size="lg" hide-footer>
      <template v-slot:modal-title>
        <div>
          <i class="fa fa-align-justify"></i>
          <span class="mrl10">报名人员</span>
        </div>
      </template>
      <applicant :targetObj="applicantObj"></applicant>
    </b-modal> -->
  </div>
</template>

<script>
import { Callout } from "@coreui/vue";
import axios from "axios";
import applicant from "@/views/demandManagement/Modular/applicant.vue";
import Pagination from "@/components/z-pagination.vue";
import * as personAPI from "@/api/workInfin/personAPI.js";
import demandProcess from "@/views/demandManagement/Modular/demandProcess.vue";
import demandAdd from "@/views/demandManagement/Modular/demandAdd.vue";
import demandModify from "@/views/demandManagement/Modular/demandModify.vue";
import opportunityRelease from "@/views/personManagement/Modular/opportunityRelease.vue";
import banner from "@/views/personManagement/Modular/banner.vue";
import * as demAPI from "@/api/workInfin/demAPI.js";

import "@/request/request.js";
var moment = require("moment");
moment.locale("zh-cn");
export default {
  name: "dashboard",
  components: {
    demandProcess,
    demandAdd,
    demandModify,
    opportunityRelease,
    banner,
    Pagination,
    applicant
  },
  data: function() {
    return {
      demandIdList: [], //勾选的列表数组
      requireSkill: [],
      applicantObj: {},
      // tableData: [{ itemName: "" }],
      tableData: [],
      page: {
        currentPage: 1,
        limit: 10,
        total: null,
        totalPage: 1
      },
      currPage: 1,
      personnel: {
        personData: [],
        currentPage: 1,
        limit: 10,
        total: 0
      },
      ReceSelect: [],
      ConSelect: [],
      bidderIdObj: {
        bidderName: "",
        bidderAcc: ""
      },
      search: {
        skillList: [],
        demandRequireSkillList: [],
        id: "",
        dmdTitle: "",
        dmdType: "",
        dmdTypeName: "",
        requireSkill: "",
        employerAcc: "",
        userId: "",
        dmdBudget: "",
        bidderId: "",
        utopaIm: "",
        value2: "",
        value: "",
        startTime: "",
        endTime: "",
        submitTime: "",
        dmdTypeSelect: [],
        requireSkillSelect: [],

        dmdBudgetSelect: [
          { value: 0, text: "全部" },
          { value: 1, text: "500以下" },
          { value: 2, text: "500~3000" },
          { value: 3, text: "3000~5000" },
          { value: 4, text: "5000以上" },
          { value: 5, text: "面议" }
        ],
        condition: [
          { value: 0, text: "全部" },
          { value: 1, text: "上架" },
          { value: 0, text: "下架" }
        ],
        optionstatus: [
          { value: 1, text: "待审核" },
          { value: 2, text: "审核通过" },
          { value: 3, text: "审核未通过" },
          { value: 4, text: "已投标" },
          { value: 5, text: "已选标" },
          { value: 8, text: "已开工" },
          { value: 10, text: "准时已完成" },
          { value: 11, text: "逾期已完成" },
          { value: 13, text: "已挂起" },
          { value: 14, text: "已终止" },
          { value: 15, text: "需求已过期" }
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
      },
      modifyModal: {
        id: "modify-modal",
        title: "",
        modalType: "",
        targetObj: {},
        content: ""
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value2: "",
      imgurls: []
    };
  },
  watch: {
    tableData() {
      if (this.tableData.length > 0) {
        this.tableData.forEach(item => {
          this.formatter(item);
        });
      }
    }
  },
  created() {
    this.accountId = JSON.parse(localStorage.getItem("userinfo")).userId;
    this.getAccountList();
    this.getDmdType();
    this.getUser();
    this.getReceiver();
  },
  methods: {
    resetList() {},
    // 排序
    formatter(row) {
      // console.log("我看看", row.requireSkillList, row.requireSkillList.length);
      if (row.requireSkillList.length > 0) {
        let requireSkillLists = row.requireSkillList.map(item => {
          return item.itemName + " ";
        });
        // console.log("8888=====", requireSkillLists);
        // console.log("里面", row.requireSkillList.length, requireSkillLists);
        return requireSkillLists;
      }
    },
    zeroFill(time) {
      if (time < 10) {
        return "0" + time;
      } else {
        return "" + time;
      }
    },
    currentChangeHandle(val) {
      this.page.currentPage = val;
      // if(this.addPerson.pointPosition == 0){
      this.pageData(
        this.personnel.personData,
        this.page.currentPage,
        this.page.limit
      );
      // }else if(this.addPerson.pointPosition == 1){
      //   this.pageData(this.changeRealease.realeaseData,this.page.currentPage , this.page.limit)
      // }else{
      //   this.pageData(this.changeRealease.changeData,this.page.currentPage , this.page.limit)
      // }
    },
    // // 分页输入框值变化
    // updateCurrentPage(page){
    //   this.page.currentPage = page
    //     this.pageData(this.personnel.personData ,this.page.currentPage , this.page.limit)
    // },
    // 前端分页
    pageData(data, currentPage, pageSize) {
      let startIdx = (currentPage - 1) * pageSize;
      let lastIdx = startIdx + pageSize;
      this.page.total = data.length;
      this.page.totalPage = Math.ceil(Number(data.length / pageSize));
      this.tableData = data.slice(startIdx, lastIdx);
    },
    handleTime(val) {
      console.log("获取到的时间", val);
      var d = val[0];
      let strAndEnd = [];
      val.forEach(item => {
        let getyear = item.getFullYear().toString();
        let getmonth = this.zeroFill(item.getMonth() + 1);
        let getday = this.zeroFill(item.getDate());

        var myHours = this.zeroFill(item.getHours()); // 获取当前小时(0-23)
        var myMinu = this.zeroFill(item.getMinutes()); // 获取当前分钟(0-59)
        var mySec = this.zeroFill(item.getSeconds()); // 获取当前秒数(0-59)
        let getDate =
          getyear +
          "-" +
          getmonth +
          "-" +
          getday +
          " " +
          myHours +
          ":" +
          myMinu +
          ":" +
          mySec;
        strAndEnd.push(getDate);
      });
      this.search.startTime = strAndEnd[0];
      this.search.endTime = strAndEnd[1];
      console.log("获取到的时间", this.search.startTime, this.search.endTime);
    },
    // 接包人
    // handleBidder(val) {
    //   if (val == "" || val == null || val == undefined) {
    //     return;
    //   }
    //   let arr = [];
    //   arr = this.ReceSelect.filter(ele => {
    //     return ele.loginAcc === val;
    //   });
    //   this.bidderIdObj.bidderName = arr[0].userName;
    //   this.bidderIdObj.bidderAcc = arr[0].loginAcc;
    //   console.log("arr", arr); //拿用户名跟账号
    // },

    getUser() {
      let obj = {
        pageDto: {
          page: 1,
          limit: 2000,
          params: {}
        },
        customerType: "0"
      };
      personAPI.getPersonData(obj).then(res => {
        console.log("resren", res);
        this.ConSelect = res.data.result.list;
      });
    },
    getReceiver() {
      let obj = {
        page: 1,
        limit: 2000,
        params: {}
      };
      demAPI.getReceiver(obj).then(res => {
        console.log("receiver", res);
        this.ReceSelect = this.getBidderIdFun(res.data.result);
      });
    },
    getBidderIdFun(object) {
      if (object == undefined || object == null) {
        return [];
      }
      let showData = object.map(item => {
        let itemObj = {
          value: item.bidderAcc,
          text: item.bidderAcc
          //text:item.userName
        };
        return itemObj;
      });
      return showData;
    },
    getDmdType() {
      demAPI.getDmdType().then(res => {
        this.search.dmdTypeSelect = this.getDmdTypeFun(res.data.result);
      });
    },
    getDmdTypeFun(object) {
      if (object == undefined || object == null) {
        return [];
      }
      let showData = object.map(item => {
        let itemObj = {
          value: item.id,
          text: item.typeName
        };
        return itemObj;
      });
      return showData;
    },
    getRequireSkill(val) {
      this.search.requireSkill = "";
      demAPI
        .getRequireSkill({
          typeId: val
        })
        .then(res => {
          console.log("获取所需技能888", res.data.result);
          this.search.requireSkillSelect = this.getRequireSkillFun(
            res.data.result
          );
        });
    },
    getRequireSkillFun(object) {
      if (object == undefined || object == null) {
        return [];
      }
      let showData = object.map(item => {
        let itemObj = {
          value: item.id,
          text: item.itemName
        };
        return itemObj;
      });
      return showData;
    },
    indexMethod(index) {
      return index + 1 * 1;
    },
    //清空弹出框信息
    resetAddOrUpdateModal() {
      this.addOrUpdateModal.title = "";
      this.addOrUpdateModal.content = "";
    },
    resetmodifyModal() {
      this.modifyModal.title = "";
      this.modifyModal.content = "";
    },
    // 勾选的
    handleSelect(selection, item) {
      this.demandIdList = [];
      selection.map(val => {
        return this.demandIdList.push(val.id);
      });
      
    },
    // 导出表格
    exportProject() {
      let obj = {
        //page: this.personnel.currentPage,
        //page: 1,
        // limit: 1000,
        // params: {
        //   fromSysId: "ddcbdcf4f799fc42e540dd127b8d5ba0"
        // }
        page: this.personnel.currentPage,
        limit: 1000,
        // limit: this.personnel.limit,
        params: {
          skillList: this.search.skillList ? this.search.skillList : undefined,
          id: this.search.id ? this.search.id : undefined,
          dmdTitle: this.search.dmdTitle ? this.search.dmdTitle : undefined,
          dmdType: this.search.dmdType ? this.search.dmdType : undefined,
          demandRequireSkillList: this.search.demandRequireSkillList
            ? this.search.demandRequireSkillList
            : undefined,
          userId: this.search.userId ? this.search.userId : undefined,
          dmdBudget: this.search.dmdBudget
            ? this.search.dmdBudget * 1
            : undefined,
          status: this.search.status ? this.search.status * 1 : undefined,
          bidderAcc: this.search.bidderAcc ? this.search.bidderAcc : undefined,
          employerAcc: this.search.employerAcc
            ? this.search.employerAcc
            : undefined,
          startTime: this.search.startTime ? this.search.startTime : undefined,
          endTime: this.search.endTime ? this.search.endTime : undefined,
          utopaIm: this.search.utopaIm ? this.search.utopaIm : undefined,
          demandIdList: this.demandIdList
        },
       
      };
      this.$loading("正在导出数据，请稍候......");
      demAPI.exportXls(obj).then(data => {
        this.$loading.close();
        console.log("导出的数据wang", data);
        //this.$message("正在导出数据，请稍候......");
        if (!data) {
          this.$message.warning("文件下载失败");
          return;
        }
        if (typeof window.navigator.msSaveBlob !== "undefined") {
          window.navigator.msSaveBlob(
            new Blob([data.data]),
            "需求列表" + ".xlsx"
          );
        } else {
          
          let url = window.URL.createObjectURL(new Blob([data.data]));
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", "需求列表" + ".xlsx");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link); //下载完成移除元素
          window.URL.revokeObjectURL(url); //释放掉blob对象
        }
      });
    },

    // 微简历弹框
    applicant(item) {
      this.showResume = true;
      this.applicantObj = item;
    },
    // 清空查询条件
    resetSearch() {
      this.search.id = "";
      this.search.dmdTitle = "";
      this.search.dmdType = "";
      this.search.userId = "";
      this.search.requireSkill = "";
      this.search.dmdBudget = "";
      this.search.bidderId = "";
      this.search.value2 = "";
      this.search.utopaIm = "";
      this.search.employerAcc = "";
      this.search.status = "";
      this.search.submitTime = "";
      this.search.requireSkillSelect = "";
      this.search.startTime = "";
      this.search.endTime = "";
      this.search.skillList = "";
      this.search.bidderAcc = "";
    },
    // 启用禁用提交
    submitConfirm(item) {
      console.log("item", item);
      personAPI
        .enablePolice({
          ids: this.ids,
          status: this.status === 1 ? 2 : 1
        })
        // axios.post('/app/demand/delete',{
        //    id:this.ids,
        //    status:this.status === 1 ? 2 : 1
        // })
        .then(res => {
          console.log("res", res);
          this.getAccountList();
        });
    },
    // // 启用禁用弹框
    // enablePolice(item) {
    //   this.confirmTitle = item.status === 1 ? "下架确定" : "上架确定";
    //   this.confirmVisble = true;
    //   this.confirmText =
    //     item.status === 1 ? "确定下架该需求？" : "确定上架该需求？";
    //   this.ids = item.id;
    //   this.status = item.status;
    // },
    // 新增弹框
    addFun() {
      this.addOrUpdateModal.title = `新增`;
      this.addOrUpdateModal.modalType = "add";
      this.addOrUpdateModal.content = "新增form";
      this.$root.$emit("bv::show::modal", this.addOrUpdateModal.id);
    },
    //查看详情
    demOppoFun(id) {
      this.infoModal.title = `我的机会`;
      // this.infoModal.targetObj =id
      this.infoModal.modalType = "oppo";
      this.$root.$emit("bv::show::modal", this.infoModal.id);
    },
    demReseaseFun() {
      this.infoModal.title = `我的发布`;
      this.infoModal.modalType = "release";
      this.$root.$emit("bv::show::modal", this.infoModal.id);
    },
    // 获取用户list
    getAccountList() {
      // this.search.requireSkill.forEach(val=>{
      //     return this.search.demandRequireSkillList.push({requireSkill: val,
      //       dmdId: this.dmdId})
      //     })
      let obj = {
        page: this.personnel.currentPage,
        limit: this.personnel.limit,
        params: {
          skillList: this.search.skillList ? this.search.skillList : undefined,
          id: this.search.id ? this.search.id : undefined,
          dmdTitle: this.search.dmdTitle ? this.search.dmdTitle : undefined,
          dmdType: this.search.dmdType ? this.search.dmdType : undefined,
          demandRequireSkillList: this.search.demandRequireSkillList
            ? this.search.demandRequireSkillList
            : undefined,
          userId: this.search.userId ? this.search.userId : undefined,
          dmdBudget: this.search.dmdBudget
            ? this.search.dmdBudget * 1
            : undefined,
          bidderAcc: this.search.bidderAcc ? this.search.bidderAcc : undefined,
          status: this.search.status ? this.search.status * 1 : undefined,
          // bidderAcc: this.bidderIdObj.bidderAcc
          //   ? this.bidderIdObj.bidderAcc
          //   : undefined,
          // bidderName: this.bidderIdObj.bidderName
          //   ? this.bidderIdObj.bidderName
          //   : undefined,
          employerAcc: this.search.employerAcc
            ? this.search.employerAcc
            : undefined,
          startTime: this.search.startTime ? this.search.startTime : undefined,
          endTime: this.search.endTime ? this.search.endTime : undefined,
          utopaIm: this.search.utopaIm ? this.search.utopaIm : undefined
        }
      };
      this.$loading();
      // axios
      //   .post("/os_workinf_admin/app/demand/queryDemandPageListAsAdmin", {
      //     page: 1,
      //     limit: 10,
      //     order: "desc",
      //     params: {}
      //   })
      demAPI
        .getDemList(obj)
        .then(res => {
          this.$loading.close();
          if (res.data.code == 0) {
            console.log("数据2", res.data.result.records);
            this.tableData = res.data.result.records;
            // console.log("数据2的table", this.tableData);

            this.personnel.total = res.data.result.total;
            this.personnel.totalPage = res.data.result.pages;
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
      console.log("this.submitTime", this.search.submitTime);
      this.personnel.currentPage = 1;
      this.getAccountList();
    },
    // 数据权限元素编辑
    showEdit(item) {
      console.log("编辑的参数", item);
      //if(item.bidderName!==null||item.bidderName!==undefined){
      this.modifyModal.title = `修改`;
      this.modifyModal.modalType = "edit";
      this.modifyModal.targetObj = item;
      this.modifyModal.content = "修改";
      this.$root.$emit("bv::show::modal", this.modifyModal.id);

      //}
    },
    // showEdit(item) {
    //   console.log("编辑的参数", item);
    //     this.addOrUpdateModal.title = `查看`;
    //     this.addOrUpdateModal.modalType = "edit";
    //     this.addOrUpdateModal.targetObj = item;
    //     this.addOrUpdateModal.content = "修改";
    //     this.$root.$emit("bv::show::modal", this.addOrUpdateModal.id);
    // },
    // input框删除操作
    emitEmpty(type) {
      const Picker = {
        // 账号管理
        id: () => {
          this.$refs.id.focus();
          this.search.id = "";
        },
        dmdTitle: () => {
          this.$refs.dmdTitle.focus();
          this.search.dmdTitle = "";
        },
        userId: () => {
          this.$refs.userId.focus();
          this.search.userId = "";
        },
        bidderId: () => {
          this.$refs.bidderId.focus();
          this.search.bidderId = "";
        },
        dmdBudget: () => {
          this.$refs.dmdBudget.focus();
          this.search.dmdBudget = "";
        }
      }[type]();
    },
    changeCurrentPage(num) {
      this.currPage = num;
      this.personnel.currentPage = num;
      this.getAccountList();
    }
    // loadData(){
    //   aixos.post('/app/flowable/getUserTaskListByAcc',{loginAcc:'ptest'}).then(res=>{
    //     console.log(res.data.result)
    //   })
    // },
    // loadData1(){
    //   axios.post('',{}).then(res=>{
    //     console.log(res.data.result)
    //   })
    // }
  }
};
</script>

<style lang="scss" scoped>
.black {
  color: #000;
}
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
