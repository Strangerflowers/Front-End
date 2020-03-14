
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
              style="marginLeft:-4px"
              label-align="right"
              label-class="require-input"
              label-cols-sm="5"
              id="dmdTitleGroup"
              label="需求名称："
            >
              <div slot="label">
                <span class="required-icon">*</span>需求名称：
              </div>
              <b-form-input
                id="assetOldCode"
                type="text"
                v-model.lazy.trim="form.dmdTitle"
                :state="chkState('dmdTitle','form')"
              />
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>
                <span v-if="!$v.form.dmdTitle.required">必填项</span>
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              label-align="right"
              label-cols-sm="5"
              label-class="require-input"
              id="projectTypeGroup"
              label-for="projectType"
            >
              <div slot="label">
                <span class="required-icon">*</span>发包人：
              </div>
              <b-form-select
                id="projectType"
                v-model.lazy.trim="form.employerAcc"
                :state="chkState('employerAcc','form')"
                :plain="true"
                :options="bagSenderSelect"
              ></b-form-select>
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>
                <span v-if="!$v.form.employerAcc.required">必填项</span>
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              label-align="right"
              label-cols-sm="5"
              label-class="require-input"
              id="statusGroup"
              label-for="manageTeam"
            >
              <div slot="label">
                <span class="required-icon">*</span>审核状态：
              </div>
              <b-form-select
                id="manageTeam"
                v-model.lazy.trim="form.status"
                :state="chkState('status','form')"
                :plain="true"
                :options="auditStatusSelect"
              ></b-form-select>

              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>
                <span v-if="!$v.form.status.required">必填项</span>
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
                id="managementCompany"
                @change="getRequireSkill"
                v-model.lazy.trim="form.dmdType"
                :state="chkState('dmdType','form')"
                :plain="true"
                :options="dmdTypeSelect"
              ></b-form-select>
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>
                <span v-if="!$v.form.dmdType.required">必填项</span>
              </b-form-invalid-feedback>
            </b-form-group>

            <!-- <b-form-group  label-align="right"      label-cols-sm="5" label-class="require-input" id="requireSkillGroup"    label-for="propertyCompany">
            <div slot="label"><span class="required-icon">*</span>所需技能：</div>
            <b-form-select id="propertyCompany" v-model.lazy.trim="form.skill"  :state="chkState('skill','form')" :plain="true" :options="requireSkillSelect">
            </b-form-select>
            <b-form-invalid-feedback tooltip ><div class="arrow"></div> 
              <span v-if="!$v.form.skill.required">必填项</span>
            </b-form-invalid-feedback>
            </b-form-group>-->

            <b-form-group
              label-align="right"
              label-cols-sm="5"
              label-class="require-input"
              id="requireSkillGroup"
              label-for="propertyCompany"
            >
              <div slot="label">
                <span class="required-icon">*</span>所需技能：
              </div>
              <!-- <el-form style="display:flex;width:350px"> -->
              <!-- <span style="color:red;transform:scale(1.8);position:absolute;left:67px;top:128px">*</span> -->
              <!-- <el-form-item 
              prop="skill" style="marginLeft:66px;width:310px">-->
              <el-select v-model="form.skill" multiple collapse-tags placeholder="请选择所需技能">
                <el-option
                  v-for="item in requireSkillSelect"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"
                ></el-option>
              </el-select>
              <!-- </el-form-item>
              </el-form>-->
            </b-form-group>

            <b-form-group
              style="marginLeft:-2px"
              label-align="right"
              label-cols-sm="5"
              label-class="require-input"
              id="propertyCompanyGroup"
              label-for="propertyCompany"
            >
              <div slot="label">
                <span class="required-icon">*</span>需求预算：
              </div>
              <b-form-input
                placeholder="请输入具体金额"
                id="propertyCompany"
                v-model.lazy.trim="form.dmdBudget"
                :state="chkState('dmdBudget','form')"
                :plain="true"
              ></b-form-input>
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>
                <span v-if="!$v.form.dmdBudget.required">必填项</span>
                <!-- <span v-if="!$v.form.dmdBudget.NumBer">请输入数字</span> -->
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              label-align="right"
              label-cols-sm="5"
              label-class="require-input"
              id="propertyCompanyGroup"
              label-for="propertyCompany"
            >
              <div slot="label">接包人：</div>
              <b-form-select
                :disabled="isDisabled"
                id="propertyCompany"
                v-model.lazy.trim="form.demandBidder[0].bidderName"
                @input="handleChange"
                :plain="true"
              >
                <option
                  v-for="(bid,index) in bidderIdSelect"
                  :key="index"
                  :value="bid.value"
                >{{bid.text}}</option>
              </b-form-select>
            </b-form-group>

            <b-form-group
              label-align="right"
              label-cols-sm="5"
              label-class="require-input"
              id="propertyCompanyGroup"
              label-for="propertyCompany"
            >
              <div slot="label">
                <span class="required-icon">*</span>城市：
              </div>
              <b-form-select
                id="propertyCompany"
                v-model.lazy.trim="form.city"
                :state="chkState('city','form')"
                :plain="true"
                :options="districtNameSelect"
              ></b-form-select>
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>
                <span v-if="!$v.form.city.required">必填项</span>
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              label-align="left"
              label-cols-sm="12"
              style="width:400px"
              label-class="require-input"
              id="assetCoveredAreaGroup"
              label-for="assetCoveredArea"
            >
              <div style="marginLeft:60px;marginTop:-17px;">
                <span class="demonstration" style="marginRight:3px">接包时间：</span>
                <el-date-picker
                  style="marginLeft:6px"
                  :disabled="isDisabled"
                  type="datetime"
                  placeholder="选择日期时间"
                ></el-date-picker>
              </div>
            </b-form-group>

            <el-row style="position:relative;width:100%;marginLeft:17px">
              <el-col
                :span="2"
                style="marginLeft:-20px;marginTop:8px;width:60px;marginLeft:50px;margin-right: 12px;"
              >需求描述:</el-col>
              <el-col :span="12">
                <b-form-textarea
                  style="height:100px"
                  id="textarea-rows"
                  v-model.lazy.trim="form.description"
                  rows="8"
                ></b-form-textarea>
              </el-col>
            </el-row>

            <!-- <el-row style="position:relative;width:100%;marginLeft:-14px;marginTop:14px">
            <el-col :span="2" style="marginTop:8px;width:80px;marginLeft:50px;margin-right: 12px;">上传照片：</el-col>
            <el-col :span="12">
            <div class="add">
              <imgUpload :src="'/api/imgs'" @addPicture="addPicture">
              </imgUpload>
            </div> 
            </el-col>
            </el-row>-->

            <el-row style="position:relative;width:100%;margin:10px 0">
              <el-col
                :span="2"
                style="marginTop:8px;width:80px;marginLeft:50px;margin-right: 12px;"
              >上传图片：</el-col>
              <el-col :span="18">
                <uploads style="text-align:left" @handlePictrue="handlePictrue"></uploads>
                <!-- :photoList="newPic" -->
              </el-col>
            </el-row>

            <div slot="footer" class="form-footer" style="marginTop:20px">
              <b-button class="ml-1" type="submit" variant="primary" :disabled="submitted">保存</b-button>
              <b-button class="ml-1" type="reset">取消</b-button>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
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
import zElTree from "@/components/asset/tree.vue";
import regionTree from "@/components/asset/region-tree.vue";
import selectAddress from "@/components/asset/select-address.vue";
import pointupdate from "@/views/assetCenter/asset/pointupdate.vue";
import PhotoListUpload from "@/components/asset/uploads";
import { formatDate } from "@/shared/utils";
import Regex from "@/shared/validate";
import imgUpload from "@/components/asset/imgUpload.vue";
/*日历插件引用文件--start*/
import { setupCalendar, DatePicker } from "v-calendar";
import "v-calendar/lib/v-calendar.min.css";
import * as AssetAPI from "@/api/assetCenter/asset.js";
import * as demAPI from "@/api/workInfin/demAPI.js";
import "@/request/request.js";
import uploads from "@/views/demandManagement/Modular/upload.vue";
setupCalendar({});

export default {
  name: "demand-add-update",
  components: {
    uploads,
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
    }
  },
  //login acc，user name接包人 发包人
  data() {
    return {
      isDisabled: true,
      reArr: [],
      addAssetModal: {
        id: "addAsset-modal",
        title: "",
        content: ""
      },
      createBy: "",
      form: {
        skill: "",
        fileUrlList: [],
        //pictureList:[],
        dmdTitle: "", //需求名称
        dmdType: "", //任务类别
        dmdBudget: "", //需求预算
        status: 1, //审核状态
        city: "",
        preStatus: 1,
        delFlag: 0,
        employerAcc: "",
        demandBidder: [
          {
            bidderName: "",
            bidderAcc: "",
            status: "1",
            delFlag: 0
          }
        ],
        demandRequireSkillList: [],
        // userId: "", //发包人
        // bidderId: "", //接包人
        //winBidTime: "" //接标时间 数据库34行
        // description: "", //需求描述
        // picUrl: "", //上传照片picture
      },
      dmdType: "",
      submitted: false,
      requireSkill: "",
      demandBudget: "",
      bidderId: "", //接包人
      bagSender: "",
      auditStatus: "",
      demandTitle: "", //需求名称
      //项目下拉框
      //selected: 1,
      auditStatusSelect: [
        { value: 1, text: "待审核" },
        { value: 2, text: "审核通过" },
        { value: 3, text: "审核未通过" }
      ],
      //{value:0,text:'草稿'},{value:1,text:'已提交未审核'},{value:4,text:'已投标'},{value:5,text:'已选标'},{value:8,text:'已开工'},{value:10,text:'准时已完成'},{value:11,text:'逾期已完成'},{value:13,text:'已挂起'},{value:14,text:'已终止'},{value:15,text:'需求已过期'}
      dmdTypeSelect: [],
      bidderIdSelect: [],
      bagSenderSelect: [],
      districtNameSelect: [],
      description: "",
      requireSkillSelect: [],
      newPic: "" //picUrl
    };
  },
  mixins: [validationMixin],
  validations() {
    return {
      form: {
        skill: {
          required
        },
        city: {
          required
        },
        employerAcc: {
          required
        },
        dmdTitle: {
          required
        },
        dmdType: {
          required
        },
        dmdBudget: {
          required
        },
        status: {
          required
        }
      }
    };
  },
  created() {
    this.getDmdType();
    this.getRequireSkill();
    this.saveAssetInfo();
    this.getDistrictName();
    this.createBy = JSON.parse(localStorage.getItem("userinfo")).loginAcc;
    console.log(this.createBy);
    this.defaultStatus();
  },
  computed: {
    formStr() {
      return JSON.stringify(this.form, null, 4);
    },
    isValid() {
      console.log("this.$v.addPerson", this.$v.form);
      return !this.$v.form.$anyError;
    },
    isDirty() {
      return this.$v.form.$anyDirty;
    }
  },
  methods: {
    handlePictrue(val) {
      this.form.fileUrlList = [];
      val.map(ele => {
        return this.form.fileUrlList.push(ele.key);
      });
    },

    handleChange(val) {
      let arr = this.bidderIdSelect;
      this.reArr = arr.filter(item => {
        return item.value == val;
      });
    },
    getRequireSkill(val) {
      //console.log("skill",val);
      //axios.get("/os_kernel_appsysctr/app/dictionary/dictionaryitem/getDictionaryItemByTypeId/?typeId=" + val)
      this.form.skill = "";
      demAPI.getRequireSkill({ typeId: val }).then(res => {
        this.requireSkillSelect = this.getRequireSkillFun(res.data.result);
        console.log(res.data.result);
      });
    },
    defaultStatus() {
      this.form.status = 1;
    },
    // 当选择接包人时改变对应的审核状态
    changeStatus() {
      if (this.reArr.length > 0) {
        this.form.status = 5;
      } else {
        this.form.status = 2;
      }
    },
    // 当选择审核状态时改变接包人
    changeBidder() {
      if (this.form.status == 2) {
        this.reArr[0].text = "";
        this.reArr[0].value = "";
      }
    },
    saveAssetInfo() {
      demAPI
        .saveAssetInfo({
          pageDto: {
            page: 1,
            limit: 2000,
            params: {}
          },
          customerType: "0"
        })
        .then(res => {
          console.log(res.data.result.list);
          this.bidderIdSelect = this.getBidderIdFun(res.data.result.list);
          this.bagSenderSelect = this.getBidderIdFun(res.data.result.list);
        });
    },
    getDmdType() {
      // axios.get("os_kernel_appsysctr/app/dictionary/dictionarytype/getTypesByParentId/535?")
      demAPI.getDmdType().then(res => {
        console.log("dmdType", res);
        this.dmdTypeSelect = this.getDmdTypeFun(res.data.result);
      });
    },
    getDistrictName() {
      // axios.get("os_kernel_appsysctr/app/district/getAllCity")
      demAPI.getDistrictName().then(res => {
        //console.log(res);
        this.districtNameSelect = this.getDistrictNameFun(res.data.result);
      });
    },
    //获取图片url
    // addPicture(picture){
    //   this.newPic = picture
    // },
    // addNew(picture){
    //   let arr = []
    // },
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
    getBidderIdFun(object) {
      if (object == undefined || object == null) {
        return [];
      }
      let showData = object.map(item => {
        let itemObj = {
          value: item.loginAcc,
          text: item.loginAcc
          //text:item.userName
        };
        return itemObj;
      });
      return showData;
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

    //保存或者更新资产信息
    onSubmit(bvModalEvt) {
      bvModalEvt.preventDefault();
      console.log(22, this.modalType);
      if (this.validate()) {
        let condition = this.form;
        console.log("this.reArr", this.reArr);
        if (this.reArr.length > 0) {
          condition.demandBidder[0].bidderName = this.reArr[0].text;
          condition.demandBidder[0].bidderAcc = this.reArr[0].value;
          //   this.form.status=5
          //   condition.status=5
          // }else{
          //   this.form.status=2
          //   condition.status=2
        }
        this.form.skill.forEach(val => {
          return this.form.demandRequireSkillList.push({
            requireSkill: val,
            delFlag: 0
          });
        }),
          // condition.demandRequireSkillList[0].requireSkill=this.form.skill
          (condition.createBy = this.createBy);
        //console.log(this.createBy)
        console.log(this.modalType);
        if (this.modalType == "add") {
          // console.log("condition", condition);
          this.$loading();
          demAPI.addDemand(condition).then(res => {
            // console.log(res);
            this.$loading.close();
            if (res.data.code === 0) {
              this.$message.success("新增成功！");
              this.$emit("getAccountList");
            } else {
              this.$message.error("新增失败！");
            }
            this.submitted = true;
            this.$root.$emit("bv::hide::modal", this.modalId);
          });
        } else if (this.modalType == "edit") {
          personAPI.editUser(condition).then(res => {
            if (res.data.code === 0) {
              this.$message.success("更新成功！");
            } else {
              this.$message.error("更新失败！");
            }
            this.submitted = true;
            this.$root.$emit("bv::hide::modal", this.modalId);
          });
        }
      }
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
  }
};
</script>

<style lang="scss" scoped>
.el-form-item__content {
  width: 310px !important;
}
.form-footer {
  display: block;
  width: 100%;
  text-align: center;
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
