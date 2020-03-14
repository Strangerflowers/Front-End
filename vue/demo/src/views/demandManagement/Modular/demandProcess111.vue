
<template>
  <div class="animated fadeIn col-lg-6-paddingleft0">
    <b-row>
    <b-col lg="12">
    <b-card>
      <b-form  class="inline-form-col-12" inline v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
        <!--  -->
        <!-- 需求id  需求名称 发包人 审核状态 任务类别  所需技能  需求预算 接包人 上架情况 -->

        <!-- <b-form-group  label-align="right"  label-cols-sm="5" label-class="require-input"  id="inputGroupAssetSimpleName"    label-for="assetSimpleName">
          <span slot="label">需求id：</span>
          <b-form-input  id="assetSimpleName"  type="text"  v-model.lazy.trim="form.assetSimpleName"  :state="chkState('assetSimpleName','form')"    />
          <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.form.assetSimpleName.required">必填项</span>
              <span v-if="!$v.form.assetSimpleName.chineseOrcharOrnumOrSpecial">支持汉字、字母 、数字、特殊字符等</span>
              <span v-if="!$v.form.assetSimpleName.maxLength">请输入少于100个汉字、字母 、数字、特殊字符等</span>
          </b-form-invalid-feedback>
        </b-form-group> -->

        <b-form-group  label-align="right"  label-cols-sm="5"  id="dmdTitle"  label="需求名称："  label-for="">
          <b-form-input  id="dmdTitle"  type="text"  v-model.lazy.trim="form.dmdTitle"  :state="chkState('dmdTitle','form')"   />
          <b-form-invalid-feedback tooltip ><div class="arrow"></div>
              <span v-if="!$v.form.dmdTitle.required">必填项</span>
              <!-- <span v-if="!$v.form.assetOldCode.chineseOrcharOrnumOrSpecial">支持汉字、字母 、数字、特殊字符等</span>
              <span v-if="!$v.form.assetOldCode.maxLength">请输入少于100个汉字、字母 、数字、特殊字符等</span> -->
          </b-form-invalid-feedback>
        </b-form-group>

          <b-form-group  label-align="right"   label-cols-sm="5" label-class="require-input" id="userIdGroup"    label-for="userId">
            <div slot="label"><span class="required-icon">*</span>发包人：</div>
            <b-form-select id="userId" v-model="form.userId" :state="chkState('userId','form')" :plain="true" >
              <option
                v-for="opt in bagSenderSelect"
                :value="opt.loginAcc"
                :key="opt.loginAcc"
              >
                {{opt.userName}}
              </option>
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"      label-cols-sm="5" label-class="require-input" id="statusGroup"    label-for="status">
            <div slot="label"><span class="required-icon">*</span>审核状态：</div>
            <b-form-select id="status" v-model="form.status" :state="chkState('status','form')" :plain="true" :options="auditStatusSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"      label-cols-sm="5" label-class="require-input" id="dmdTypeGroup"    label-for="managementCompany">
            <div slot="label"><span class="required-icon">*</span>任务类别：</div>
            <b-form-select id="dmdType" v-model="form.dmdType" :state="chkState('dmdType','form')" :plain="true" :options="dmdTypeSelect" @change="getRequireSkill">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"      label-cols-sm="5" label-class="require-input" id="requireSkillGroup"    label-for="requireSkill">
            <div slot="label"><span class="required-icon">*</span>所需技能：</div>
            <b-form-select id="requireSkill" v-model="form.requireSkill" :state="chkState('requireSkill','form')" :plain="true" :options="requireSkillSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"      label-cols-sm="5" label-class="require-input" id="dmdBudgetGroup"    label-for="dmdBudget">
            <div slot="label"><span class="required-icon">*</span>需求预算：</div>
            <b-form-input id="dmdBudget" v-model="form.dmdBudget" :state="chkState('dmdBudget','form')" :plain="true">
            </b-form-input>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"     label-cols-sm="5" label-class="require-input" id="bidderIdGroup"    label-for="bidderId">
            <div slot="label"><span class="required-icon">*</span>接包人：</div>
            <b-form-select id="bidderId" v-model="form.bidderId" @input="handleBidder" :state="chkState('bidderId','form')" :plain="true" >
               <option
                v-for="opt in bidderIdSelect"
                :value="opt.loginAcc"
                :key="opt.loginAcc"
              >
                {{opt.userName}}
              </option>
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group  label-align="right"    label-cols-sm="5" label-class="require-input"  id="assetCoveredAreaGroup"    label-for="assetCoveredArea">
            <!-- <div slot="label"><span class="required-icon">*</span>接包时间：</div>
            <b-form-input  id="assetCoveredArea"  type="text"  v-model.lazy.trim="form.assetCoveredArea"  :state="chkState('assetCoveredArea','form')"    />
            <b-form-invalid-feedback tooltip ><div class="arrow"></div>必填项</b-form-invalid-feedback> -->
            <div class="block" style="marginLeft:12px;marginTop:-17px">
              <span class="demonstration">接包时间：</span>
              <el-date-picker
                v-model="form.winBidTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </b-form-group>


            <el-row style="position:relative;width:100%;marginLeft:17px">
              <el-col :span="2" style="marginLeft:-20px;marginTop:8px;width:60px;marginLeft:50px;margin-right: 12px;">需求描述:</el-col>
              <el-col :span="12">
              <b-form-textarea
                id="textarea-rows"
                v-model.lazy.trim="form.description"
                rows="8"
              ></b-form-textarea>
              </el-col>
            </el-row>

          <!-- <el-row style="position:relative;width:100%;marginLeft:-14px">
            <el-col :span="2" style="marginTop:8px;width:80px;marginLeft:50px;margin-right: 12px;">上传照片：</el-col>
            <el-col :span="12">
            <div class="add">
              <imgUpload :src="'/api/imgs'" @addPicture="addPicture">
              </imgUpload>
            </div>
            </el-col>
          </el-row> -->

            <!-- <div slot="footer" class="form-footer">
              <b-button class="ml-1" type="submit" variant="primary" :disabled="submitted" >保存</b-button>
              <b-button class="ml-1" type="reset">取消</b-button>
            </div> -->

          </b-form>
          </b-card>
          </b-col>
          </b-row>
           <div>
              <el-table
                  :data="tableData"
                  ref="table"
                  :cell-style="{color:'#000',textAlign:'center'}"
                  :header-cell-style="{background:'#E4E7EA',color:'#5C6873',textAlign:'center'}"
                  style="width: 100%"
                  border
                >
                  <el-table-column
                    prop="stage"
                    width="100"
                    label="阶段"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="content"
                    label="内容"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="planStartTime"
                    width="100"
                    label="计划开始时间"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="planEndTime"
                    width="100"
                    label="计划结束时间"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    fixed="right"
                    label="实际结束时间"
                  >
                    <template slot-scope="scope">
                      <b-form-select id="manageTeam" v-model="form.actualEndTime" :state="chkState('manageTeam','projectForm')" :plain="true" :options="form.auditStatusSelect">
                      </b-form-select>
                    </template>
                  </el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="form-footer">
              <b-button class="ml-1" type="submit" variant="primary" :disabled="submitted" >保存</b-button>
              <b-button class="ml-1" type="reset">取消</b-button>
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
import PhotoListUpload from "@/components/asset/uploads";
import { formatDate } from "@/shared/utils";
import Regex from "@/shared/validate";
import imgUpload from "@/components/asset/imgUpload.vue";
// import demAPI from "@/api/workInfin/imgUpload.vue";

/*日历插件引用文件--start*/
import { setupCalendar, DatePicker } from "v-calendar";
import "v-calendar/lib/v-calendar.min.css";
import * as demAPI from "@/api/workInfin/demAPI.js";
import * as personAPI from "@/api/workInfin/personAPI.js";

setupCalendar({});

export default {
  name: "demand-add-update",
  components: {
    cTable,
    selectAddress,
    PhotoListUpload,
    "v-date-picker": DatePicker, //日历组件，属性available-dates设置选择范围
    zElTree,
    regionTree,
    imgUpload
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
    targetObj:{
      type: [String, Object],
      default: () => []
    }
  },
  data() {
    return {
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
        dmdTitle: "", //需求名称
        userId: "", //发包人
        status: "", //审核状态
        dmdType: "", //任务类别
        requireSkill: "",
        dmdBudget: "", //需求预算
        bidderId: "", //接包人
        winBidTime: "", //接标时间 数据库34行
        description: "", //需求描述
        picUrl: "", //上传照片
        actualEndTime: "",
        auditStatusSelect: []
      },
      tableData: [
        {
          stage: "第一阶段",
          content: "王小虎",
          planStartTime: "2019-10-12",
          planEndTime: "2019-12-12",
          actualEndTime: null
        },
        {
          stage: "第一阶段",
          content: "王小虎",
          planStartTime: "2019-10-12",
          planEndTime: "2019-12-12",
          actualEndTime: null
        },
        {
          stage: "第一阶段",
          content: "王小虎",
          planStartTime: "2019-10-12",
          planEndTime: "2019-12-12",
          actualEndTime: null
        },
        {
          stage: "第一阶段",
          content: "王小虎",
          planStartTime: "2019-10-12",
          planEndTime: "2019-12-12",
          actualEndTime: null
        },
        {
          stage: "第一阶段",
          content: "王小虎",
          planStartTime: "2019-10-12",
          planEndTime: "2019-12-12",
          actualEndTime: null
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
      requireSkill: "",
      demandBudget: "",
      bidderId: "", //接包人
      bagSender: "",
      auditStatus: "",
      status: "", //上架情况
      demandTitle: "", //需求名称
      //项目下拉框
      statusSelect: [
        { value: 1, text: "全部" },
        { value: 2, text: "上架" },
        { value: 3, text: "下架" }
      ],
      auditStatusSelect: [
        { value: 0, text: "全部" },
        { value: 2, text: "审核通过" },
        "审核未通过",
        { value: 1, text: "待审核" }
      ],
      dmdTypeSelect: [],
      bidderIdSelect: ["张三", "李四", "王五"],
      bagSenderSelect: ["刘德华", "张学友", "郭富城"],
      description: "",
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
  validations() {
    return {
      form: {
        dmdTitle: {
          required
        }, //需求名称
        userId: {
          required
        }, //发包人
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
        }, //接标时间 数据库34行
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
        console.log("subFormName", this.subFormName);
        console.log("this.$v.form", this.$v.form);
        console.log("this.$v[this.subFormName]", this.$v[this.subFormName]);
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
    this.getUser()
    this.getDmdType()
    if (this.modalType == "edit") {
      if(this.targetObj.bidderName){
        this.getDemandId()
      }else{
        this.getEdit()
      }
    }

  },
  methods: {
    // 获取需求过程回显
    getDemandId(){
      demAPI.getDemandId({
        id:this.targetObj.id
      })
      .then(res=>{
        this.form = res.data.result.demandDto;
        console.log('form.dem',this.form)
        console.log('requireSkill',this.form.requireSkill)
        this.getRequireSkill(this.form.dmdType)
        console.log('需求回显',res)
      })
    },
    handleBidder(val){
      console.log('val',val)
      if(val=="" || val==null || val==undefined){
        return
      }
      let arr = []
      arr = this.bidderIdSelect.filter(ele=>{
        return ele.loginAcc === val
      })
      console.log('arr',arr) //拿用户名跟账号
    },
    getUser(){
      personAPI.getPersonData({
      page: "1",
      limit: "20000",
        params: {}
      })
      .then(res=>{
        console.log('resren',res)
        this.bidderIdSelect = res.data.result.list
        this.bagSenderSelect = res.data.result.list
      })
    },
    getEdit(){
      demAPI.getDemEdit({
        page: 1,
        limit: 10,
        order: "desc",
        params: {
          id: this.targetObj.id
        }
      })
      .then(res => {
        this.form = res.data.result[0]
        console.log('form.dem',this.form)
        console.log('requireSkill',this.form.requireSkill)
        this.getRequireSkill(this.form.dmdType)
      });
    },
    getDmdType() {
      demAPI.getDmdType()
      .then(res => {
        this.dmdTypeSelect = this.getDmdTypeFun(res.data.result);
      });
    },
    getRequireSkill(val) {
      demAPI.getRequireSkill({
        typeId:val
      })
      .then(res => {
        this.requireSkillSelect = this.getRequireSkillFun(res.data.result);
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
      console.log("测试this.unitForm.unitType", this.unitForm.unitType);
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
</style>
