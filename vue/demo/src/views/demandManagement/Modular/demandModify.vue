
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
              label-cols-sm="5"
              id="dmdTitleGroup"
              label="需求名称："
            >
              <div slot="label">
                <span class="required-icon" style="color:red;transform:scale(5)">*</span>需求名称：
              </div>
              <b-form-input
                id="assetOldCode"
                type="text"
                v-model.lazy.trim="form.dmdTitle"
                :state="chkState('dmdTitle','form')"
              />
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>
                <!-- <span v-if="!$v.form.dmdTitle.required">必填项</span> -->
                <!-- <span v-if="!$v.form.dmdTitle.chineseOrcharOrnumOrSpecial">支持汉字、字母 、数字、特殊字符等</span>
                <span v-if="!$v.form.dmdTitle.maxLength">请输入少于100个汉字、字母 、数字、特殊字符等</span>-->
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
                :state="chkState('userId','form')"
                :plain="true"
                :options="bagSenderSelect"
              ></b-form-select>
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>
                <span v-if="!$v.form.dmdTitle.required">必填项</span>
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
                id="managementCompany"
               
                v-model.lazy.trim="form.dmdType"
                :state="chkState('dmdType','form')"
                :plain="true"
                :options="dmdTypeSelect"
              ></b-form-select>
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>必填项
              </b-form-invalid-feedback>
            </b-form-group>

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
              <b-form-select
                id="propertyCompany"
                v-model.lazy.trim="form.demandRequireSkillList[0].requireSkill"
                :state="chkState('requireSkill','form')"
                :plain="true"
                :options="requireSkillSelect"
              ></b-form-select>
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>
                <!-- <span v-if="!$v.form.demandRequireSkillList[0].requireSkill.required">必填项</span> -->
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
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
                id="propertyCompany"
                v-model.lazy.trim="form.dmdBudget"
                :state="chkState('propertyCompany','projectForm')"
                :plain="true"
              ></b-form-input>
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>
                <span v-if="!$v.form.dmdBudget.required">必填项</span>
                <span v-if="!$v.form.dmdBudget.NumBer">请输入数字</span>
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
                id="propertyCompany"
                v-model.lazy.trim="form.demandBidder[0].bidderName"
                @input="handleChange"
                :state="chkState('propertyCompany','unitForm')"
                :plain="true"
              >
                <option
                  v-for="(bid,index) in bidderIdSelect"
                  :key="index"
                  :value="bid.value"
                >{{bid.text}}</option>
              </b-form-select>
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>必填项
              </b-form-invalid-feedback>
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
                :state="chkState('propertyCompany','unitForm')"
                :plain="true"
                :options="districtNameSelect"
              ></b-form-select>
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>
                <!-- <span v-if="!$v.form.districtName.required">必填项</span> -->
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              label-align="right"
              style="marginLeft:52px"
              label-cols-sm="5"
              label-class="require-input"
              id="assetCoveredAreaGroup"
              label-for="assetCoveredArea"
            >
              <div class="block" style="marginLeft:11px;marginTop:-17px">
                <span class="demonstration">接包时间：</span>
                <el-date-picker v-model="winBidTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
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

            <el-row style="position:relative;width:100%;marginLeft:-14px;marginTop:14px">
              <el-col
                :span="2"
                style="marginTop:8px;width:80px;marginLeft:50px;margin-right: 12px;"
              >图片上传：</el-col>

                <div class="add" >
                  <imgUpload :src="'/api/imgs'" @addPicture="addPicture"></imgUpload>
                </div>
            </el-row>
            
            <!-- 有中标人时显示，没有就不用显示 -->
            <div v-if="this.targetObj.bidderName===false">
              <el-table
                :data="tableData"
                ref="table"
                :cell-style="{color:'#000',textAlign:'center'}"
                :header-cell-style="{background:'#E4E7EA',color:'#5C6873',textAlign:'center'}"
                style="width: 100%"
                border
              >
                <el-table-column prop="stage" width="100" label="阶段" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="content" label="内容" :show-overflow-tooltip="true"></el-table-column>
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
                <el-table-column fixed="right" label="实际结束时间">
                  <template slot-scope="scope">
                    <b-form-select
                      id="manageTeam"
                      v-model="form.actualEndTime"
                      :state="chkState('manageTeam','projectForm')"
                      :plain="true"
                      :options="form.auditStatusSelect"
                    ></b-form-select>
                  </template>
                </el-table-column>
              </el-table>
            </div>

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
import uploads from "@/views/demandManagement/Modular/upload.vue"
import "@/request/request.js";
import { log } from "util";
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
    targetObj: {
      type: Object,
      default: () => {}
    }
  },
  //login acc，user name接包人 发包人
  data() {
    return {
      bidderName: false,//阶段显示
      
      reArr: [],
      // requireStatus:false,//需求状态，默认为编辑页面
      addAssetModal: {
        id: "addAsset-modal",
        title: "",
        content: ""
      },
      form: {
        id:"",//1.需求ID
        dmdTitle: "", //2.需求名称
        employerAcc: "",//3.发包人
        status: "", //4.审核状态
        dmdType: "", //5.任务类别
        // requireSkill: "",//6.所需技能
        dmdBudget: "", //7.需求预算
        city: "",//8.选择城市
        // winBidTime:"",//9.中标时间
        description:"",//10.需求描述
        fileUrlList:"",//11.图片
        
        preStatus: 1,
        delFlag: 0,
        demandBidder: [
          {
            bidderName: "",
            bidderAcc: "",
            status: "1",
            delFlag: 0
          }
        ],
        demandRequireSkillList: [
          {
            requireSkill: "",
            delFlag: 0
          }
        ]
      },
       winBidTime: "", //接标时间 数据库34行
      dmdType: "",
      submitted: false,
      demandBudget: "",
      bidderId: "", //接包人
      bagSender: "",
      auditStatus: "",
      demandTitle: "", //需求名称
      //项目下拉框
      auditStatusSelect: [
        { value: 0, text: "全部" },
        { value: 2, text: "审核通过" },
        { value: 3, text: "审核未通过" },
        { value: 1, text: "待审核" }
      ],
      dmdTypeSelect: [],
      bidderIdSelect: [],
      bagSenderSelect: [],
      districtNameSelect: [],
      
      requireSkillSelect: [],
      newPic: [], //picUrl
     // userId: "", //发包人
        // bidderId: "", //接包人
       
        // description: "", //需求描述
        // picUrl: "", //上传照片
        // districtName: ""
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
        }
      ]
    };
  },
  mixins: [validationMixin],
  validations() {
    return {
      form: {
        dmdTitle: {
          required
        },
        dmdType: {
          required
        },
        dmdBudget: {
          required
        },
        userId: {
          required
        },
        status: {
          required
        },
        requireSkill: {
          required
        },
        bidderId: {
          required
        },
        winBidTime: {
          required
        },
        description: {
          required
        },
        assetOldCode: {
          chineseOrcharOrnumOrSpecial(value) {
            return Regex.chineseOrcharOrnumOrSpecial(value);
          },
          maxLength: maxLength(100)
        }
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
  created() {
    // console.log("targetObj", this.targetObj);
    // console.log("targetObj.id", this.targetObj.id);
    // console.log("targetObj.id", this.targetObj.city);
    // 拿到数据渲染
    // this.form.id=this.targetObj.id;//1.需求ID
    // console.log("this.targetObj.id",this.targetObj.id);
      if(this.targetObj.id){
        console.log("this.targetObj.id222",this.targetObj.id);
        // this.getModifyId()
        axios.post("/os_workinf_admin/app/admin/queryDemandPageListAsAdmin",
        {
          page:1,
          limit:10,
          
          params:{
          id:this.targetObj.id
          }
      })
        .then(res=>{
          // return res;
          console.log("res",res);
          console.log(this.res.data.result.records[0].dmdTitle);
          
   this.form.dmdTitle=this.res.data.result.records[0].dmdTitle;//需求名称
   this.form.employerAcc=this.targetObj.employerAcc//发包人
   this.form.status=this.targetObj.status//审核状态
   this.form.dmdType=this.targetObj.dmdType//任务类别
   this.form.demandRequireSkillList[0].requireSkill=this.targetObj.requireSkill//所需技能
   this.form.dmdBudget=this.targetObj.dmdBudget//需求预算
   this.form.demandBidder[0].bidderName=this.targetObj.bidderName//接包人
   this.form.city=this.targetObj.city//城市
   this.winBidTime=this.targetObj.winBidTime//中标时间
   this.form.description=this.targetObj.description//需求描述
          
        }).catch(err=>{
          return err;
        })
      }else{
        this.getEdit()
      }
 
    // this.form.id=this.targetObj.id;//1.需求ID
    // console.log("this.targetObj.id",this.targetObj.id);
    // if(this.targetObj.id){
    //   this.getModifyId();

    // }else{
    //    this.getEdit()
    // }

   
  




  

    // 遍历图片渲染
    // let arrpic=[];
    // this.newPic.map((item,index)=>{
    // const temppic={
    //   index:index+1
    // }
    // return arrpic.puch(temppic[index]);
    // })
    // this.form.fileUrlList=arrpic;
    // console.log("arrpic",arrpic);

  
  // this.form.fileUrlList=this.targetObj.fileUrlList//图片

    this.getDmdType();
    // this.getRequireSkill();
    this.saveAssetInfo();
    this.getDistrictName();


  },


  methods: {
    //requireStatus==false有中标人就跳到编辑无阶段列表页面
    //requireStatus==true没有中标人就跳到编辑有阶段列表页面
    //获取回显数据

    handleChange(val) {
      let arr = this.bidderIdSelect;
      this.reArr = arr.filter(item => {
        return item.value == val;
      });
    },
  
    saveAssetInfo() {
      demAPI
        .saveAssetInfo({
          page: 1,
          limit: 10000,
          order: "desc",
          params: {},
          isAll: true
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
    addPicture(picture) {
      this.newPic = picture;
    },
    //  addNew(picture){
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
          text: item.userName
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
      //if (this.validate() ) {

      let condition = this.form;
      condition.demandBidder.bidderName = this.reArr[0].text;
      condition.demandBidder.bidderAcc = this.reArr[0].value;

      if (this.modalType == "add") {
        console.log("condition", condition);
        demAPI.addDemand(condition).then(res => {
          console.log(res);
          if (res.data.code === 0) {
            this.$message.success("新增成功！");
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

      //}
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
    },
    // getRequireSkill(val) {
    //   axios
    //     .get(
    //       "os_kernel_appsysctr/app/dictionary/dictionaryitem/getDictionaryItemByTypeId/?typeId=" +
    //         val
    //     )
    //     .then(res => {
    //       this.requireSkillSelect = this.getRequireSkillFun(res.data.result);
    //     });
    // }
  }
};
</script>

<style lang="scss" scoped>

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
