
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
            <b-form-group
              label-align="right"
              label-cols-sm="5"
              id="dmdTitle"
              label="需求名称："
              label-for
            >
              <b-form-input
                id="dmdTitle"
                type="text"
                v-model.lazy.trim="form.dmdTitle"
                plaintext
              />
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
                <span class="fabaoren required-icon"></span>发包人：
              </div>
               <b-form-input  id="employerAcc"  type="text"  v-model="form.employerAcc" plaintext    />
            </b-form-group>

            <b-form-group
              label-align="left"
              label-cols-sm="5"
              label-class="require-input"
              id="statusGroup"
              label-for="status"
            >
              <div slot="label">
                <span class="required-icon"></span>审核状态：
              </div>
              <span style="text-align: left;">{{optionstatus[form.status]}}</span>
            </b-form-group>

            <b-form-group
              label-align="right"
              label-cols-sm="5"
              label-class="require-input"
              id="dmdTypeGroup"
              label-for="managementCompany"
            >
              <div slot="label">
                <span class="required-icon"></span>任务类别：
              </div>
                <span v-if="form.dmdType">
                  {{
                    this.dmdTypeSelect.filter(val=>{
                    return  val.value==form.dmdType})[0].text
                  }}
                </span>
               <!-- <b-form-input  id="dmdType"  type="text"  v-model="form.dmdType" plaintext    /> -->
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
                  <span class="required-icon"></span>所需技能：
                </div>
                <span v-for="skil in skillArray" :key="skil.id">{{skil.itemName}}&nbsp;</span>
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
                <span class="required-icon"></span>需求预算：
              </div>
              <b-form-input  id="dmdBudget"  type="text"  v-model="form.dmdBudget" plaintext    />

            </b-form-group>

            <b-form-group
              label-align="right"
              label-cols-sm="5"
              label-class="require-input"
              id="cityGroup"
              label-for="city"
            >
              <div slot="label">
                <span class="required-icon"></span>所选城市：
              </div>
              <b-form-input  id="city"  type="text"  v-model="form.city" plaintext    />

            </b-form-group>

            <b-form-group
              label-align="right"
              label-cols-sm="5"
              label-class="require-input"
              id="bidderIdGroup"
              label-for="bidderId"
            >
              <div slot="label">
                接包人：
              </div>
              <b-form-input  id="bidderId"  type="text"  v-model="form.bidderId" plaintext    />
            </b-form-group>

            <b-form-group
               label-align="right"
              label-cols-sm="5"
              id="winBidTime"
              label-class="require-input"
              label-for
            >
             <div slot="label" style="margin-right:3px;">
               接包时间：
              </div>
              <b-form-input  id="winBidTime"  type="text"  v-model="winBidTime" plaintext    />
            </b-form-group>

            <el-row style="position:relative;width:100%;">
                <el-col
                :span="2"
                style="marginTop:8px;width:80px;marginLeft:50px;margin-right: 12px;"
              >需求描述：</el-col>

              <el-col :span="18" style="text-align:left;margin-top:8px;">
                {{form.description}}
              </el-col>
            </el-row>

            <el-row style="position:relative;width:100%;magin:10px 0;margin-top: 20px;">
              <el-col
                :span="2"
                style="marginTop:8px;width:80px;marginLeft:50px;margin-right: 12px;"
              >图片展示：</el-col>
              <el-col :span="18" style="text-align:left;">
                <uploads
                  @handlePictrue="handleRusome"
                  :photoList="form.pictureList"
                  :limits="9"
                  :disabled="true"
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
      <!-- <b-button
        class="ml-1"
        type="submit"
        variant="primary"
        :disabled="submitted"
        @click="onSubmit"
      >保存</b-button> -->
      <b-button class="ml-1" type="reset" @click="offSubmit">取消</b-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
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
      skillArray:[],
      selctrRequire: [],
      districtNameSelect: [],
      ishide: false,
      isDisabled: false,
      isDisabled2: false,
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

      optionstatus: {
         1: "待审核" ,
         2: "审核通过" ,
          3: "审核未通过" ,
          4: "已投标" ,
          5: "已选标" ,
          8: "已开工" ,
          10: "准时已完成" ,
          11: "逾期已完成" ,
          13: "已挂起" ,
          14: "已终止" ,
          15: "需求已过期"
      },

      dmdTypeSelect: [],
      bidderIdSelect: ["张三", "李四", "王五"],
      bagSenderSelect: ["刘德华", "张学友", "郭富城"],
      // description: "",
      requireSkillSelect: [],
      winBidTime: "", //接包时间
      regionTree: [],
      centralAirConditioningSelect: [
        { text: "是", value: "1" },
        { text: "否", value: "0" }
      ] //中央空调下拉
    };
  },
  mixins: [validationMixin],

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
    this.handleBidder();
    this.getDmdType();
    this.getEdit();
  },
  methods: {
    getAuthStr(){
      let arr = []
      this.dmdTypeSelect.filter(val=>{
      return  val.value==form.dmdType})
    },
    // 编辑需求技能下拉显示
    handleChange(val) {

    },
    // 获取城市
    getDistrictName() {
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
      this.form.fileUrlList = [];
      val.map(ele => {
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
      // this.updateEdit();
      // 修改更新
      // this.$emit("getAccountList");
    },
    // 取消
    offSubmit() {
      this.$root.$emit("bv::hide::modal", this.modalId);
    },
    // //编辑需求
    // updateEdit() {
    //   this.form.demandBidder = []; //投标人
    //   this.form.requireSkillList = []; //需求技能
    //   if (!this.form.fileUrlList) {
    //     this.form.fileUrlList = [];
    //   }
    //   let Obj = {};
    //   if (this.BidderItem && this.BidderItem.length > 0) {
    //     Obj.bidderAcc = this.BidderItem[0].loginAcc;
    //     Obj.bidderName = this.BidderItem[0].userName;
    //   } else {
    //     Obj.bidderAcc = "";
    //     Obj.bidderName = "";
    //   }
    //   this.form.demandBidder.push(Obj);
    //   let arr = [];
    //   this.selctrRequire.map(val => {
    //     return arr.push({ dmdId: this.form.id, requireSkill: val });
    //   });
    //   this.form.demandRequireSkillList = arr;
    //   demAPI.updateEdit(this.form).then(res => {
    //     // console.log("wangwang99", res);
    //     this.$root.$emit("bv::hide::modal", this.modalId);
    //     return res;
    //   });
    // },
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
          // console.log("大王八数据", res.data.result.demandDto);
          this.form = res.data.result.demandDto;
          let skill = [];
          this.form.demandRequireSkillList.map(item => {
            return skill.push(item.requireSkill);
          });
          // console.log("skill", skill);
          this.selctrRequire = skill.map(item => {
            return item * 1;
          });
          this.getRequireSkill(this.form.dmdType, 1);
          // console.log(
          //   "大王八数据技能",
          //   typeof this.form.dmdType,
          //   this.form.dmdType
          // );
          this.form.bidderId = this.form.demandBidderDtoList[0].bidderAcc;
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
          if (this.form.demandFileUrlList.length > 0) {
            this.form.demandFileUrlList.map(item => {
              brr.push(item.key);
              return arr.push({ name: item.key, url: item.url, key: item.key });
            });
          }
          this.form.fileUrlList = brr;
          this.form.pictureList = arr;
          let skill = this.form.requireSkill.split(",");
          this.selctrRequire = skill.map(item => {
            return item * 1;
          });
          console.log('技能',this.selctrRequire)
          this.getRequireSkill(this.form.dmdType);
        });
    },
    // 需求类型
    getDmdType() {
      demAPI.getDmdType().then(res => {
        this.dmdTypeSelect = this.getDmdTypeFun(res.data.result);
        console.log('任务类别',this.dmdTypeSelect)
      });
    },
    // 需求技能
    getRequireSkill(val, id) {
      demAPI
        .getRequireSkill({
          typeId: val
        })
        .then(res => {
          this.requireSkillSelect = res.data.result;
          let arr = []
          this.requireSkillSelect.map(item=>{
            console.log('item',item.id,this.selctrRequire)
            if(this.selctrRequire.includes(Number(item.id))){
              return arr.push(item)
            }
          })
          this.skillArray = arr;
          console.log('skillArray',this.skillArray)

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
    // 图片处理结束
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
.form-row > .col, .form-row > [class*="col-"] {
    padding-right: 5px;
    padding-left: 5px;
    text-align: left;
}
</style>
<style >
.form-row > .col, .form-row > [class*="col-"] {
    padding-right: 5px;
    padding-left: 5px;
    text-align: left;
}
</style>
