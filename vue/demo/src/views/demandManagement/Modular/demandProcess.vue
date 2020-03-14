
<template>
  <div class="animated fadeIn col-lg-6-paddingleft0">
    <b-row>
      <b-col lg="12">
        <b-card>
          <b-form
            class="inline-form-col-12"
            inline
            v-on:submit.prevent="onSubmit"
            v-on:reset.prevent="onReset"
            novalidate
          >
            <!-- 需求id  需求名称 发包人 审核状态 任务类别  所需技能  需求预算 接包人 上架情况 -->
            <b-form-group
              label-align="right"
              label-cols-sm="5"
              id="dmdTitle"
              label="需求名称："
              label-for
            >
              <b-form-input
                :disabled="isDisabled"
                id="dmdTitle"
                type="text"
                v-model.lazy.trim="form.dmdTitle"
                :state="chkState('dmdTitle','form')"
              />
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>
                <span v-if="!$v.form.dmdTitle.required">必填项</span>
                <!-- <span v-if="!$v.form.assetOldCode.chineseOrcharOrnumOrSpecial">支持汉字、字母 、数字、特殊字符等</span>
                <span v-if="!$v.form.assetOldCode.maxLength">请输入少于100个汉字、字母 、数字、特殊字符等</span>-->
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              style="marginLeft:-10px;"
              label-align="right"
              label-cols-sm="5"
              label-class="require-input"
              id="employerAccGroup"
              label-for="employerAcc"
            >
              <div slot="label">
                <span class="fabaoren required-icon">*</span>发包人：
              </div>
              <b-form-select
                id="employerAcc"
                v-model="form.employerAcc"
                :disabled="isDisabled3"
                :state="chkState('employerAcc','form')"
                :plain="true"
              >
                <option
                  v-for="opt in bagSenderSelect"
                  :value="opt.loginAcc"
                  :key="opt.loginAcc"
                >{{opt.loginAcc}}</option>
              </b-form-select>
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>必填项
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              label-align="right"
              label-cols-sm="5"
              label-class="require-input"
              id="statusGroup"
              label-for="status"
            >
              <div slot="label">
                <span class="required-icon">*</span>审核状态：
              </div>
              <b-form-select
                id="status"
                disabled
                v-model="form.status"
                :state="chkState('status','form')"
                :plain="true"
                :options="optionstatus"
              ></b-form-select>
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>必填项
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              label-align="right"
              label-cols-sm="5"
              label-class="require-input"
              id="dmdTypeGroup"
              label-for="managementCompany"
            >
              <div slot="label">
                <span class="required-icon">*</span>任务类别：
              </div>
              <b-form-select
                id="dmdType"
                :disabled="isDisabled"
                v-model="form.dmdType"
                :state="chkState('dmdType','form')"
                :plain="true"
                :options="dmdTypeSelect"
                @change="getRequireSkill"
              ></b-form-select>
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>必填项
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              label-align="right"
              label-cols-sm="5"
              label-class="require-input"
              id="dmdTypeGroup"
              label-for="managementCompany"
            >
              <template>
                <div slot="label">
                  <span class="required-icon">*</span>所需技能：
                </div>
                <el-select
                  style="display:inline-block;"
                  :disabled="isDisabled"
                  v-model="selctrRequire"
                  multiple
                  collapse-tags
                  @change="handleChange"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in requireSkillSelect"
                    :key="item.id"
                    :label="item.itemName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </template>
            </b-form-group>

            <b-form-group
              label-align="right"
              label-cols-sm="5"
              label-class="require-input"
              id="dmdBudgetGroup"
              label-for="dmdBudget"
            >
              <div slot="label">
                <span class="required-icon">*</span>需求预算：
              </div>
              <b-form-input
                id="dmdBudget"
                :disabled="isDisabled"
                v-model="form.dmdBudget"
                :state="chkState('dmdBudget','form')"
                :plain="true"
              ></b-form-input>
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>必填项
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              label-align="right"
              label-cols-sm="5"
              label-class="require-input"
              id="cityGroup"
              label-for="city"
            >
              <div slot="label">
                <span class="required-icon">*</span>所选城市：
              </div>
              <b-form-select
                id="city"
                :disabled="isDisabled"
                v-model.lazy.trim="form.city"
                :state="chkState('city','form')"
                :plain="true"
                :options="districtNameSelect"
              ></b-form-select>
              <b-form-invalid-feedback tooltip v-if="!$v.form.city.required">
                <div class="arrow"></div>必填项
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              label-align="right"
              label-cols-sm="5"
              label-class="require-input"
              id="bidderIdGroup"
              label-for="bidderId"
            >
              <div slot="label">
                <!-- <span class="required-icon">*</span> -->
                接包人：
              </div>
              <b-form-select
                id="bidderId"
                :disabled="isDisabled"
                v-model="form.bidderId"
                @input="handleBidder"
                :state="chkState('bidderId','form')"
                :plain="true"
              >
                <option
                  v-for="opt in bidderIdSelect"
                  :value="opt.bidderAcc"
                  :key="opt.bidderAcc"
                >{{opt.bidderAcc}}</option>
              </b-form-select>
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>必填项
              </b-form-invalid-feedback>
            </b-form-group>

            <!-- <b-form-group
              label-align="right"
              label-cols-sm="5"
              label-class="require-input"
              id="assetCoveredAreaGroup"
              label-for="assetCoveredArea"
            >-->
            <b-form-group
              label-align="left"
              label-cols-sm="12"
              style="width:400px"
              label-class="require-input"
              id="assetCoveredAreaGroup"
              label-for="assetCoveredArea"
            >
              <div class="block" style="marginLeft:42px;marginTop:-17px">
                <span class="demonstration">接包时间：</span>

                <el-date-picker
                  style="display:inline-block;marginLeft:8px"
                  disabled
                  v-model="form.winBidTime"
                  type="datetime"
                  placeholder="选择日期时间"
                ></el-date-picker>
              </div>
            </b-form-group>

            <el-row style="position:relative;width:100%;marginLeft:17px">
              <el-col
                :span="2"
                style="marginTop:8px;width:80px;marginLeft:28px;margin-right: 12px;"
              >需求描述:</el-col>
              <el-col :span="12">
                <b-form-textarea
                  id="textarea-rows"
                  v-model.lazy.trim="form.description"
                  rows="8"
                  :disabled="isDisabled"
                ></b-form-textarea>
              </el-col>
            </el-row>
            <el-row style="position:relative;width:100%;magin:10px 0;margin-top: 20px;">
              <el-col
                :span="2"
                style="marginTop:8px;width:80px;marginLeft:50px;margin-right: 12px;"
              >图片展示：</el-col>
              <el-col :span="18" style="text-align:left">
                <uploads
                  @handlePictrue="handleRusome"
                  @handlePhotoListRemove="handlePhotoListRemove"
                  :photoList="form.pictureList"
                  :limits="9"
                  :disabled="isDisabled"
                ></uploads>
              </el-col>
            </el-row>
          </b-form>
        </b-card>
      </b-col>
    </b-row>

    <div v-if="form.bidderId">
      <el-table
        :data="tableData"
        ref="table"
        :cell-style="{color:'#000',textAlign:'center'}"
        :header-cell-style="{background:'#E4E7EA',color:'#5C6873',textAlign:'center'}"
        style="width: 100%"
        border
      >
        <el-table-column prop="wbsTaskOrder" width="100" label="阶段" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="wbsTaskName" label="内容" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column
          prop="planStartDatetime"
          width="100"
          label="计划开始时间"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="planEndDatetime"
          width="100"
          label="计划结束时间"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column fixed="right" label="实际结束时间">
          <template slot-scope="scope">
            <b-form-select
              id="manageTeam"
              v-model="scope.row.status"
              disabled
              :state="chkState('manageTeam','projectForm')"
              :plain="true"
              :options="auditStatusSelect"
            ></b-form-select>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div slot="footer" class="form-footer">
      <b-button
        class="ml-1"
        type="submit"
        variant="primary"
        :disabled="submitted"
        @click="onSubmit"
      >保存</b-button>
      <b-button class="ml-1" type="reset" @click="offSubmit">取消</b-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
var moment = require("moment");
moment.locale("zh-cn");
import {
  required,
  minLength,
  maxLength,
  between,
  alphaNum
} from "vuelidate/lib/validators";
import cTable from "@/components/asset/z-table.vue";
// import zElTree from '@/components/el-tree.vue'
import zElTree from "@/components/asset/tree.vue";
import regionTree from "@/components/asset/region-tree.vue";
import selectAddress from "@/components/asset/select-address.vue";
import pointupdate from "@/views/assetCenter/asset/pointupdate.vue";
// import PhotoListUpload from "@/components/asset/uploads";
import uploads from "@/views/personManagement/Modular/upload.vue";
import { formatDate } from "@/shared/utils";
import Regex from "@/shared/validate";
// 图片排序
import Func from "@/utils/func.js";
// import imgUpload from "@/components/asset/imgUpload.vue";
// import demAPI from "@/api/workInfin/imgUpload.vue";

/*日历插件引用文件--start*/
import { setupCalendar, DatePicker } from "v-calendar";
import "v-calendar/lib/v-calendar.min.css";
import * as demAPI from "@/api/workInfin/demAPI.js";
import * as personAPI from "@/api/workInfin/personAPI.js";
import { log } from "util";

setupCalendar({});

export default {
  name: "demand-add-update",
  components: {
    uploads,
    cTable,
    selectAddress,
    "v-date-picker": DatePicker, //日历组件，属性available-dates设置选择范围
    zElTree,
    regionTree
  },
  props: {
    modalId: {
      type: String,
      default: ""
    },
    modalType: {
      type: String,
      default: "add"
    },
    targetObj: {
      type: [String, Object],
      default: () => []
    }
  },
  data() {
    return {
      selctrRequire: [],
      districtNameSelect: [],
      ishide: false,
      isDisabled: false,
      isDisabled2: false,
      isDisabled3: true,
      addAssetModal: {
        id: "addAsset-modal",
        title: "",
        content: ""
      },
      addRegionModal: {
        id: "addRegion-modal",
        title: "",
        content: ""
      },
      form: {
        // winBidTime: "", //接包时间
        requireSkill: [],
        dmdType: "", //任务类别
        dmdTitle: "", //需求名称
        dmdTypeName: "",
        dmdBudget: "", //需求预算
        employerAcc: "", //发包人
        // bidderName: "", //接包人
        updateBy: "",
        status: "", //审核状态
        city: "", //所选城市
        description: "", //需求描述
        fileUrlList: [],
        demandBidder: [],
        requireSkillList: []
      },

      tableData: [
        {
          stage: "第一阶段",
          content: "王小虎",
          planStartTime: "2019-10-12",
          planEndTime: "2019-12-12",
          actualEndTime: ["完成", "延迟", "进行中"]
        }
      ],
      // 广告单元点位
      assetUnitAdvert: {
        pictureList: [
          {
            photoType: 1,
            photoKey: null
          }
        ] // 点位图片
      },
      submitted: false,
      assetTypes: [],
      // requireSkill: "",
      demandBudget: "",
      // bidderId: "", //接包人
      bagSender: "",
      status: ["10", "5", "11"],
      demandTitle: "", //需求名称
      BidderItem: [],
      //项目下拉框
      statusSelect: [
        { value: 1, text: "全部" },
        { value: 2, text: "上架" },
        { value: 3, text: "下架" }
      ],
      auditStatusSelect: [
        { value: 0, text: "草稿" },
        { value: 1, text: "未开始" },
        { value: 5, text: "进行中" },
        { value: 10, text: "已完成" },
        { value: 11, text: "已挂起" },
        { value: 12, text: "已终止" }
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
      ],

      dmdTypeSelect: [],
      bidderIdSelect: ["张三", "李四", "王五"],
      bagSenderSelect: ["刘德华", "张学友", "郭富城"],
      // description: "",
      requireSkillSelect: [],

      regionTree: [],
      centralAirConditioningSelect: [
        { text: "是", value: "1" },
        { text: "否", value: "0" }
      ] //中央空调下拉
    };
  },
  mixins: [validationMixin],
  validations() {
    return {
      form: {
        dmdTitle: {
          required
        }, //需求名称
        employerAcc: {
          required
        }, //发包人
        city: {
          required
        },
        status: {
          required
        }, //审核状态
        dmdType: {
          required
        }, //任务类别
        requireSkill: {
          required
        },
        dmdBudget: {
          required
        }, //需求预算
        bidderId: {
          required
        }, //接包人
        winBidTime: {
          required
        } //接标时间 数据库34行
      },
      projectForm: {
        projectType: {
          required
        },
        manageTeam: {
          required
        },
        managementCompany: {
          required
        },
        propertyCompany: {
          required
        }
      },
      unitForm: {
        managementCompany: {
          required(value) {
            if (this.isShowPublicField) {
              return value + "" ? true : false;
            } else {
              return true;
            }
          }
        },
        propertyCompany: {
          required(value) {
            if (this.isPropertyCompanyShow) {
              return value + "" ? true : false;
            } else {
              return true;
            }
          }
        }
      }
    };
  },
  computed: {
    formStr() {
      return JSON.stringify(this.form, null, 4);
    },
    isValid() {
      if (this.subFormName) {
        return !this.$v.form.$anyError && !this.$v[this.subFormName].$anyError;
      } else {
        return !this.$v.form.$anyError;
      }
    },
    isDirty() {
      return this.$v.form.$anyDirty;
    }
  },

  created() {
    //显示是否可以编辑
    if (
      this.targetObj.theDemandBidder &&
      this.targetObj.theDemandBidder.bidderName
    ) {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
    if (
      this.targetObj.theDemandBidder &&
      this.targetObj.theDemandBidder.bidderName
    ) {
      this.isDisabled2 = true;
    } else {
      this.isDisabled2 = false;
    }

    this.handleChange();
    this.getRequireSkill();
    this.handleBidder();
    this.getDistrictName();
    this.getUser();
    this.getDmdType();
    this.getRoles();
    if (this.modalType == "edit") {
      // this.getEdit()
      if (
        this.targetObj.theDemandBidder &&
        this.targetObj.theDemandBidder.bidderName
      ) {
        // 有中标人
        this.getDemandId();
        this.getEditStage();
      } else {
        //无中标人
        this.getEdit();
      }
    }
    // console.log(this.targetObj.id);
  },
  methods: {
    // 编辑需求技能下拉显示
    handleChange(val) {
      console.log("5555", val);
      console.log("this,form", this.selctrRequire);
    },
    // 获取城市
    getDistrictName() {
      // axios.get("os_kernel_appsysctr/app/district/getAllCity")
      demAPI.getDistrictName().then(res => {
        this.districtNameSelect = this.getDistrictNameFun(res.data.result);
      });
    },
    getDistrictNameFun(object) {
      if (object == undefined || object == null) {
        return [];
      }
      let showData = object.map(item => {
        let itemObj = {
          value: item.districtName,
          text: item.districtName
        };
        return itemObj;
      });
      return showData;
    },
    // 获取阶段回显
    getEditStage() {
      demAPI.updateEditStage({ dmdId: this.targetObj.id }).then(res => {
        if (res.data.result.length) {
          let updatetableData = res.data.result[0].projectWbsTaskList;

          this.tableData = res.data.result[0].projectWbsTaskList;
        }
      });
    },
    handlePhotoListRemove(val) {
      // this.form.userResumeDto.urlList = [];
      // val.map(ele => {
      //   return this.form.userResumeDto.urlList.push(ele.key);
      // });
      this.form.fileUrlList = [];
      val.map(ele => {
        console.log("删除图片", ele);

        return this.form.fileUrlList.push(ele.key);
      });
    },
    // 图片
    handleRusome(val) {
      this.form.fileUrlList = [];
      val.map(ele => {
        return this.form.fileUrlList.push(ele.key);
      });
    },
    // 保存
    onSubmit() {
      this.updateEdit();
      // 修改更新
      this.$emit("getAccountList");
    },
    // 取消
    offSubmit() {
      this.$root.$emit("bv::hide::modal", this.modalId);
    },
    //编辑需求
    updateEdit() {
      console.log("fileUrlList", this.form.fileUrlList);
      this.form.demandBidder = []; //投标人
      this.form.requireSkillList = []; //需求技能
      if (!this.form.fileUrlList) {
        this.form.fileUrlList = [];
      }
      let Obj = {};
      if (this.BidderItem && this.BidderItem.length > 0) {
        Obj.bidderAcc = this.BidderItem[0].loginAcc;
        Obj.bidderName = this.BidderItem[0].userName;
      } else {
        Obj.bidderAcc = "";
        Obj.bidderName = "";
      }
      this.form.demandBidder.push(Obj);
      let arr = [];
      this.selctrRequire.map(val => {
        return arr.push({ dmdId: this.form.id, requireSkill: val });
      });
      this.form.demandRequireSkillList = arr;
      // 切割时间
      // this.form.winBidTime = moment(this.form.winBidTime).format(
      //   "YYYY-MM-DD hh:mm:ss"
      // );
      demAPI.updateEdit(this.form).then(res => {
        if (res.data.code === 0) {
          this.$message.success("更新成功！");
          this.$emit("getAccountList");
        } else {
          this.$message.error("更新失败！");
        }
        this.submitted = true;
        this.$root.$emit("bv::hide::modal", this.modalId);
        return res;
      });
    },
    // 获取接包人列表
    getRoles() {
      demAPI.getReloes({ id: this.targetObj.id }).then(res => {
        this.bidderIdSelect = res.data.result;
      });
    },
    handleBidder(val) {
      if (val == "" || val == null || val == undefined) {
        return;
      }
      let arr = [];
      arr = this.bidderIdSelect.filter(ele => {
        return ele.loginAcc === val;
      });
      this.BidderItem = arr;
    },

    // 获取需求过程回显  有中标人接口
    getDemandId() {
      demAPI
        .getDemandId({
          id: this.targetObj.id
        })
        .then(res => {
          this.form.fileUrlList = []

          this.form = res.data.result.demandDto;
          let skill = [];
          this.form.demandRequireSkillList.map(item => {
            return skill.push(item.requireSkill);
          });

          this.selctrRequire = skill.map(item => {
            return item * 1;
          });
          this.getRequireSkill(this.form.dmdType, 1);

          this.form.bidderId = this.form.demandBidderDtoList[0].bidderAcc;
          //let ImgSort = res.data.result.userResumeUrlList.sort(
           let ImgSort = res.data.result.demandFileUrlList.sort(
            Func.pcompare("order", true)
          );
          let arr = [];
          let fileArr = []
           console.log('ImgSort',ImgSort)
          ImgSort.map(ele => {
            fileArr.push(ele.key)
            // console.log('ele',this.form.fileUrlList)
            // this.form.fileUrlList.push(ele.key);
          
            return arr.push({ name: ele.key, url: ele.url, key: ele.key });
          });
          this.form.fileUrlList = fileArr
          this.form.pictureList = arr;
        });
    },

    getUser() {
      personAPI
        .getPersonData({
          pageDto: {
            page: 1,
            limit: 1000,
            params: {}
          },
          customerType: "0"
        })
        .then(res => {
          // console.log('resren',res)
          // this.bidderIdSelect = res.data.result.list
          this.bagSenderSelect = res.data.result.list;
        });
    },
    getEdit() {
      demAPI
        .getEditItem({
          page: 1,
          limit: 1000,
          order: "desc",
          params: {
            id: this.targetObj.id
          }
        })
        .then(res => {
          console.log(114, res.data.result.records);
          this.form.pictureList = [];
          this.form.fileUrlList = [];
          this.form = res.data.result.records[0];
          let arr = [];
          let brr = [];
          let ImgSort = this.form.demandFileUrlList.sort(
            Func.pcompare("order", true)
          );
          if (this.form.demandFileUrlList.length > 0) {
            ImgSort.map(item => {
              brr.push(item.key);
              return arr.push({ name: item.key, url: item.url, key: item.key });
            });
          }
          this.form.fileUrlList = brr;
          this.form.pictureList = arr;
          // console.log("回显图片", this.form.fileUrlList);
          let skill = this.form.requireSkill.split(",");
          this.selctrRequire = skill.map(item => {
            return item * 1;
          });
          this.getRequireSkill(this.form.dmdType, 1);
        });
    },
    // 需求类型
    getDmdType() {
      demAPI.getDmdType().then(res => {
        this.dmdTypeSelect = this.getDmdTypeFun(res.data.result);
      });
    },
    // 需求技能
    getRequireSkill(val, id) {
      if (!id) {
        this.selctrRequire = [];
      }
      demAPI
        .getRequireSkill({
          typeId: val
        })
        .then(res => {
          // console.log("wangwang", res.data.result);
          // this.requireSkillSelect = this.getRequireSkillFun(res.data.result);
          this.requireSkillSelect = res.data.result;
          console.log("需求技能1111:", this.requireSkillSelect);
        });
    },

    //清除资产树弹框
    resetAddAssetModal() {
      this.addAssetModal.title = "";
      this.addAssetModal.content = "";
    },
    //上级机构资产树弹出框确定和关闭功能
    setAssetFun() {
      this.$root.$emit("bv::hide::modal", this.addAssetModal.id);
    },
    resetAssetFun() {
      this.$root.$emit("bv::hide::modal", this.addAssetModal.id);
    },

    //返回遍历数据，用于下拉框获取数据
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
    // 需求技能
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
    // 关闭弹框
    onReset() {
      this.$root.$emit("bv::hide::modal", this.modalId);
    },
    // 非空校验
    chkState(val, formName) {
      let field = this.$v[formName][val];
      return !field.$dirty || !field.$invalid;
    },
    findFirstError(component = this) {
      if (component.state === false) {
        if (component.$refs.input) {
          component.$refs.input.focus();
          return true;
        }
        if (component.$refs.check) {
          component.$refs.check.focus();
          return true;
        }
      }
      let focused = false;
      component.$children.some(child => {
        focused = this.findFirstError(child);
        return focused;
      });
      return focused;
    },
    validate() {
      this.$v.$touch();
      this.$nextTick(() => {
        return this.findFirstError();
      });
      return this.isValid;
    },
    // element的下拉表单校验
    valiDateRule() {
      if (this.unitForm.unitType) {
        this.isUnitTypeError = false;
        return false;
      } else {
        this.isUnitTypeError = true;
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form-footer {
  display: block;
  width: 100%;
  text-align: center;
  padding: 20px;
}
.form-inline.btn {
  margin-right: 1rem;
  margin-bottom: 1rem;
}

.btn.disabled {
  cursor: auto;
}
.form-group {
  position: relative;
}

.form-control.is-valid {
  background-image: none;
  border-color: #c8ced3;
}

.inline-form-col-12 .form-group {
  width: 50%;
  margin-right: 0;
  margin-bottom: 1rem;
}
.inline-form-col-6 .form-group-lg {
  width: 50%;
}

.form-inline .form-group-lg label {
  width: 20%;
}

.arrow {
  position: absolute;
  display: block;
  width: 1rem;
  height: 0.5rem;
  margin: 0 0.3rem;
  bottom: calc((0.5rem + 1px) * -1);
  left: 0px;
}
.form-control.is-invalid ~ .invalid-tooltip .arrow::before {
  bottom: 0;
  border-width: 0.5rem 0.5rem 0;
  border-top-color: rgba(0, 0, 0, 0.25);
}
.form-control.is-invalid ~ .invalid-tooltip .arrow::after {
  bottom: 1px;
  border-width: 0.5rem 0.5rem 0;
  border-top-color: rgba(248, 108, 107, 0.9);
}

.arrow::before,
.arrow::after {
  position: absolute;
  display: block;
  content: "";
  border-color: transparent;
  border-style: solid;
  bottom: 0;
  border-width: 0.5rem 0.5rem 0;
  border-top-color: rgba(0, 0, 0, 0.25);
}

.invalid-tooltip {
  position: absolute;
  top: -100%;
  z-index: 5;
  display: none;
  max-width: 100%;
  padding: 0.25rem 0.5rem;
  margin-top: 0.1rem;
  font-size: 0.76563rem;
  line-height: 1.5;
  color: #fff;
  background-color: rgba(248, 108, 107, 0.9);
  border-radius: 0.25rem;
}

.modal-body .form-control.is-invalid {
  background-image: none;
}
.modal-body .top-inform .card-body {
  // border: #ccc 1px solid;
  // background-color: #f0f3f5;
  padding: 0.5rem 1rem;
}

.modal-body .form-title {
  width: 100%;
  height: 0.85rem;
  margin-bottom: 1.5rem;
  border-bottom: #ccc 1px solid;
  position: relative;
}

.modal-body .form-title span {
  line-height: 2rem;
  font-size: 1rem;
  padding-right: 10px;
  position: absolute;
  top: -25%;
  background: #fff;
}
.btn-box {
  margin-bottom: 0.5rem;
}

.btn-box-right {
  text-align: right;
}
.require-input .required-icon {
  font-size: 24px;
  line-height: 18px;
  vertical-align: middle;
  margin-right: 5px;
  color: #f00;
}

.tc {
  width: 80px;
  text-align: center;
  line-height: 30px;
}
.checkboxClass {
  text-align: left;
  padding-left: 22px;
}
</style>
