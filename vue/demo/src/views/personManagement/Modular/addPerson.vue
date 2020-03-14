
<template>
  <div class="animated fadeIn col-lg-10-paddingleft0">
    <b-card>
      <b-form
        class="inline-form-col-6"
        inline
        v-on:submit.prevent="onSubmit"
        v-on:reset.prevent="onReset"
        novalidate
      >
        <template>
          <b-form-group
            label-align="right"
            label-cols-sm="5"
            label-class="require-input"
            id="loginAccGroup"
            label-for="loginAcc"
          >
            <div slot="label">
              <span class="required-icon">*</span>登录账号：
            </div>
            <b-form-input
              id="loginAcc"
              type="text"
              v-model.lazy.trim="addPerson.loginAcc"
              :state="chkState('loginAcc','addPerson')"
            />
            <b-form-invalid-feedback tooltip>
              <div class="arrow"></div>
              <span v-if="!$v.addPerson.loginAcc.required ">必填项</span>
              <span v-if="!$v.addPerson.loginAcc.maxLength ">长度不能超过20个字符</span>
              <span v-if="!$v.addPerson.loginAcc.charOrNum ">只能输入数字字母</span>
              <span v-if="!$v.addPerson.loginAcc.isExistLoginAcc ">该账号已存在</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            label-align="right"
            label-cols-sm="5"
            label-class="require-input"
            id="nickNameGroup"
            label-for="nickName"
          >
            <div slot="label">
              <span class="required-icon"></span>昵称：
            </div>
            <b-form-input
              id="nickName"
              type="text"
              v-model.lazy.trim="addPerson.nickName"
              :state="chkState('nickName','addPerson')"
            />
            <b-form-invalid-feedback tooltip>
              <div class="arrow"></div>
              <!-- <span v-if="!$v.addPerson.nickName.required">必填项</span> -->
              <span v-if="!$v.addPerson.nickName.maxLength">长度不能超过20个字符</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            label-align="right"
            label-cols-sm="5"
            label-class="require-input"
            id="wechatGroup"
            label-for="wechat"
          >
            <div slot="label">
              <span class="required-icon"></span>微信：
            </div>
            <b-form-input
              id="wechat"
              type="text"
              v-model.lazy.trim="addPerson.wechat"
              :state="chkState('wechat','addPerson')"
            />
            <b-form-invalid-feedback tooltip>
              <div class="arrow"></div>
              <!-- <span v-if="!$v.addPerson.wechat.required">必填项</span> -->
              <!-- <span v-if="!$v.addPerson.wechat.chineseOrcharOrnum ">请输入中文,英文字母或数字</span> -->
              <span v-if="!$v.addPerson.wechat.maxLength ">长度不能超过20个有效字符</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            label-align="right"
            label-cols-sm="5"
            label-class="require-input"
            id="qqGroup"
            label-for="pointSize"
          >
            <div slot="label">
              <span class="required-icon"></span>QQ：
            </div>
            <b-form-input
              id="qq"
              type="text"
              v-model.lazy.trim="addPerson.qq"
              :state="chkState('qq','addPerson')"
            />
            <b-form-invalid-feedback tooltip>
              <div class="arrow"></div>
              <!-- <span v-if="!$v.addPerson.qq.required">必填项</span> -->
              <span v-if="!$v.addPerson.qq.maxLength ">长度不能超过10个有效字符</span>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            label-align="right"
            label-cols-sm="5"
            label-class="require-input"
            id="mobileGroup"
            label-for="mobile"
          >
            <div slot="label">
              <span class="required-icon">*</span>手机号码：
            </div>
            <b-form-input
              id="mobile"
              type="text"
              v-model.lazy.trim="addPerson.mobile"
              :state="chkState('mobile','addPerson')"
            />
            <b-form-invalid-feedback tooltip>
              <div class="arrow"></div>
              <span v-if="!$v.addPerson.mobile.required">必填项</span>
              <span v-if="!$v.addPerson.mobile.isExistMobile ">该手机号已存在</span>
              <span v-if="!$v.addPerson.mobile.mobile ">请输入准确的手机号码</span>
            </b-form-invalid-feedback>
          </b-form-group>
        </template>
        <template>
          <b-tabs
            style="width:100%"
            @input="toggle"
            content-class="mt-3"
            v-model="tabIndex"
            active-nav-item-class="font-weight-bold text-uppercase"
          >
            <b-tab title="企业认证"></b-tab>
            <b-tab title="个人认证"></b-tab>
          </b-tabs>
          <template v-if="this.modalType=='edit'">
            <div style class="audit-status">
              <p
                :class="[auditStatus==1?'audit-status-success':'audit-status-warn']"
                v-if="this.form.customerType==1"
              >
                企业认证
                <span v-if="auditStatus ==0">审核不通过</span>
                <span v-if="auditStatus ==1">审核通过</span>
                <span v-if="auditStatus ==2">待审核</span>
              </p>
              <p
                :class="[auditStatus==1?'audit-status-success':'audit-status-warn']"
                style
                v-if="this.form.customerType==2"
              >
                个人认证
                <span v-if="auditStatus ==0">审核不通过</span>
                <span v-if="auditStatus ==1">审核通过</span>
                <span v-if="auditStatus ==2">待审核</span>
              </p>
              <p
                :class="[auditStatus==1?'audit-status-success':'audit-status-warn']"
                v-if="this.form.customerType==3"
              >
                待认证
                <span v-if="auditStatus ==0">审核不通过</span>
                <span v-if="auditStatus ==1">审核通过</span>
                <span v-if="auditStatus ==2">待审核</span>
              </p>
              <p
                :class="[auditStatus==1?'audit-status-success':'audit-status-warn']"
                style
                v-if="this.form.customerType==4"
              >
                认证通过
                <span v-if="auditStatus ==0">审核不通过</span>
                <span v-if="auditStatus ==1">审核通过</span>
                <span v-if="auditStatus ==2">待审核</span>
              </p>
              <p
                :class="[auditStatus==1?'audit-status-success':'audit-status-warn']"
                style
                v-if="this.form.customerType==5"
              >未填写认证信息</p>
            </div>
          </template>
          <template v-if="showPersonal">
            <b-form-group
              label-align="right"
              label-cols-sm="5"
              label-class="require-input"
              id="userNameGroup"
              label-for="userName"
            >
              <div slot="label">
                <span class="required-icon" v-if="this.isMustFill">*</span>姓名：
              </div>
              <b-form-input
                id="userName"
                type="text"
                :disabled="isShowper"
                v-model.lazy.trim="addPerson.userName"
                :state="chkState('userName','addPerson')"
              />
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>
                <span v-if="!$v.addPerson.userName.required">必填项</span>
                <span v-if="!$v.addPerson.userName.maxLength ">长度不能超过50个有效字符</span>
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              label-align="right"
              label-cols-sm="5"
              label-class="require-input"
              id="identNumGroup"
              label-for="identNum"
            >
              <div slot="label">
                <span class="required-icon" v-if="this.isMustFill">*</span>身份证号：
              </div>
              <b-form-input
                id="identNum"
                type="text"
                :disabled="isShowper"
                v-model.lazy.trim="personAuthDto.identNum"
                :state="chkState('identNum','personAuthDto')"
              />
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>
                <span v-if="!$v.personAuthDto.identNum.required">必填项</span>
                <span v-if="!$v.personAuthDto.identNum.IdentityCard">请输入正确的身份证号</span>
              </b-form-invalid-feedback>
            </b-form-group>
          </template>
          <template v-if="showEnterprise">
            <b-form-group
              label-align="right"
              label-cols-sm="5"
              label-class="require-input"
              id="customerNameGroup"
              label-for="customerName"
            >
              <div slot="label">
                <span class="required-icon" v-if="this.isMustFill">*</span>企业名称：
              </div>
              <b-form-input
                id="customerName"
                type="text"
                :disabled="isShowEnt"
                v-model.lazy.trim="companyAuthDto.customerName"
                :state="chkState('customerName','companyAuthDto')"
              />
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>
                <span v-if="!$v.companyAuthDto.customerName.required">必填项</span>
                <span v-if="!$v.companyAuthDto.customerName.maxLength">长度为20个字符</span>
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
                <span class="required-icon" v-if="this.isMustFill">*</span>所在城市：
              </div>
              <b-form-select
                id="city"
                v-model="companyAuthDto.cityCode"
                :disabled="isShowEnt"
                @input="selectCity"
                :state="chkState('cityCode','companyAuthDto')"
                :plain="true"
              >
                <option
                  v-for="opt in citySelectList"
                  :value="opt.districtCode"
                  :key="opt.districtCode"
                >{{opt.districtName}}</option>
              </b-form-select>
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>必填项
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              label-align="right"
              label-cols-sm="5"
              label-class="require-input"
              id="customerCodeGroup"
              label-for="customerCode"
            >
              <div slot="label">
                <span class="required-icon" v-if="this.isMustFill">*</span>信用代码：
              </div>
              <b-form-input
                id="customerCode"
                type="text"
                :disabled="isShowEnt"
                v-model.lazy.trim="companyAuthDto.customerCode"
                :state="chkState('customerCode','companyAuthDto')"
              />
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>
                <span v-if="!$v.companyAuthDto.customerCode.required">必填项</span>
                <span v-if="!$v.companyAuthDto.customerCode.maxLength">长度为20个字符</span>
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
              label-align="right"
              label-cols-sm="5"
              label-class="require-input"
              id="linkmanGroup"
              label-for="linkman"
            >
              <div slot="label">
                <span class="required-icon" v-if="this.isMustFill">*</span>联系人：
              </div>
              <b-form-input
                id="linkman"
                type="text"
                :disabled="isShowEnt"
                v-model.lazy.trim="companyAuthDto.linkman"
                :state="chkState('linkman','companyAuthDto')"
              />
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>
                <span v-if="!$v.companyAuthDto.linkman.required">必填项</span>
                <span v-if="!$v.companyAuthDto.linkman.maxLength">不超过10个字符</span>
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
              label-align="right"
              label-cols-sm="5"
              label-class="require-input"
              id="contactPhoneGroup"
              label-for="contactPhone"
            >
              <div slot="label">
                <span class="required-icon" v-if="this.isMustFill">*</span>联系号码：
              </div>
              <b-form-input
                id="contactPhone"
                type="text"
                :disabled="isShowEnt"
                v-model.lazy.trim="companyAuthDto.contactPhone"
                :state="chkState('contactPhone','companyAuthDto')"
              />
              <b-form-invalid-feedback tooltip>
                <div class="arrow"></div>
                <span v-if="!$v.companyAuthDto.contactPhone.required">必填项</span>
                <span v-if="!$v.companyAuthDto.contactPhone.maxLength">长度小于20个字符</span>
                <span v-if="!$v.companyAuthDto.contactPhone.NumBer">必须为数字</span>
              </b-form-invalid-feedback>
            </b-form-group>
          </template>
        </template>
        <template>
          <el-row style="position:relative;width:100%;magin:5px 0" v-if="showEnterprise">
            <el-col :span="2" style="marginTop:8px;width:80px;marginLeft:50px;margin-right: 12px;">
              <span class="required-icon" v-if="this.isMustFill">*</span>
              证件照：
            </el-col>
            <el-col :span="18" style="text-align:left">
              <uploads
                @handlePictrue="handlePictrue"
                :photoList="addPerson.certificates"
                @handlePhotoListRemove="handleIdNumRemove"
                :Num="1"
                :type="'en'"
                :limits="1"
                :showLimit="PaccsetLimitL"
                :modalType="this.modalType"
              ></uploads>
            </el-col>
          </el-row>
          <el-row style="position:relative;width:100%;magin:5px 0" v-if="showPersonal">
            <el-col :span="2" style="marginTop:8px;width:80px;marginLeft:50px;margin-right: 12px;">
              <span class="required-icon" v-if="this.isMustFill">*</span>证件照：
            </el-col>
            <el-col :span="18" style="text-align:left">
              <uploads
                @handlePictrue="handlePictrue"
                :photoList="addPerson.certifiPer"
                @handlePhotoListRemove="handleIdNumRemove"
                :type="'pe'"
                :Num="2"
                :limits="2"
                :modalType="this.modalType"
                :showLimit="accsetLimit"
              ></uploads>
            </el-col>
          </el-row>
          <el-row style="position:relative;width:100%;magin:10px 0;margin-top: 20px;">
            <el-col
              :span="2"
              style="marginTop:8px;width:80px;marginLeft:50px;margin-right: 12px;"
            >微简历：</el-col>
            <el-col :span="18" style="text-align:left">
              <uploads
                @handlePictrue="handleRusome"
                @handlePhotoListRemove="handlePhotoListRemove"
                :photoList="addPerson.pictureList"
                :type="'re'"
                :limits="4"
                :showLimit="resutLimit"
              ></uploads>
            </el-col>
          </el-row>
        </template>
        <!-- 需求/机会table -->
        <b-card style="width:100%" v-if="this.modalType=='edit'">
          <template>
            <b-row>
              <b-col>
                <div class="add-person-title">个人发布列表：</div>
              </b-col>
              <b-col>
                <b-form-group
                  label-align="right"
                  label-cols-sm="5"
                  label-class="require-input"
                  id="pointPosition"
                  label-for="pointPosition"
                >
                  <div slot="label">
                    <span class="required-icon"></span>状态：
                  </div>
                  <b-form-select
                    id="pointPosition"
                    v-model="addPerson.pointPosition"
                    :plain="true"
                    :options="[{value:0,text:'全部'},{value:1,text:'需求'},{value:2,text:'机会'}]"
                    @input="changeStatus"
                  ></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <div style="width:100%">
              <template>
                <el-table
                  :data="changeRealease.data"
                  ref="table"
                  :cell-style="{color:'#000',textAlign:'center'}"
                  :header-cell-style="{background:'#E4E7EA',color:'#5C6873',textAlign:'center'}"
                  style="width: 100%"
                  border
                >
                  <el-table-column prop="id" width="100" label="需求id" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column prop="dmdTitle" label="需求名称" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column prop="type" width="100" label="状态" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <span v-show="scope.row.type==1">需求</span>
                      <span v-show="scope.row.type==2">机会</span>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" @click="see(scope.row)">查看</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
              <Pagination
                :page="page"
                @currentChangeHandle="currentChangeHandle"
                @updateCurrentPage="updateCurrentPage"
              ></Pagination>
            </div>
          </template>
        </b-card>
        <div slot="footer" class="form-footer">
          <b-button
            class="ml-1"
            type="status"
            v-if="this.modalType=='edit'&& auditStatus!=1"
            :disabled="this.saveCustomerType==5"
            variant="primary"
            @click.prevent.stop="onStatus"
          >
            <!-- <span v-if="this.form.customerType ==5"></span> -->
            <span>通过认证</span>
          </b-button>
          <b-button class="ml-1" type="submit" variant="primary" :disabled="submitted">保存</b-button>
          <b-button class="ml-1" type="reset" variant="primary">关闭</b-button>
        </div>
      </b-form>
    </b-card>

    <!-- 弹框组 -->
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
      ></demandProcess>
    </b-modal>
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
  alphaNum,
  maxValue
} from "vuelidate/lib/validators";
import cTable from "@/components/asset/z-table.vue";
import PhotoListUpload from "@/components/asset/uploads";
import imgUpload from "@/components/imgUpload.vue";
import { formatDate } from "@/shared/utils";
import Regex from "@/shared/validate";
import uploads from "@/views/personManagement/Modular/upload.vue";
import Pagination from "@/components/z-pagination.vue";
import demandProcess from "@/views/demandManagement/Modular/demandProcess.vue";
import Func from "@/utils/func.js";
/*日历插件引用文件--start*/
import { setupCalendar, DatePicker } from "v-calendar";
import "v-calendar/lib/v-calendar.min.css";
import * as personAPI from "@/api/workInfin/personAPI.js";

setupCalendar({});

export default {
  name: "asset-add-update",
  components: {
    demandProcess,
    uploads,
    imgUpload,
    PhotoListUpload,
    "v-date-picker": DatePicker, //日历组件，属性available-dates设置选择范围
    Pagination
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
      saveCustomerType: null,
      isMustFillPe: false, //个人必填
      isMustFillEn: false, //必填判断
      isMustFill: false,
      isShowper: false,
      isShowEnt: false,
      auditStatus: "", //审核状态
      customerID: "",
      returnValue: {
        loginAcc: "",
        mobile: ""
      },
      modifyModal: {
        id: "modify-modal",
        title: "",
        modalType: "",
        targetObj: {},
        content: ""
      },
      receObj: {},
      page: {
        currentPage: 1,
        limit: 10,
        total: null,
        totalPage: 1
      },
      newPic: [],
      tabIndex: 0,
      form: {
        customerType: 1,
        user: null,
        personAuthDto: null,
        companyAuthDto: null,
        // 微简历
        userResumeDto: {
          urlList: [] //七牛云返回的key1",
        }
      },
      citySelectList: [],
      // 企业
      companyAuthDto: {
        customerName: "", //企业名称
        customerCode: "", //信用代码
        city: "",
        cityCode: "",
        linkman: "", //联系人
        contactPhone: "", //联系号码
        picUrl: ""
      },
      // 个人
      personAuthDto: {
        identNum: "", // 身份证号
        identPicList: [
          // 上传的图片封装到这里
          // {
          //     "type": "1",  // 身份证正面 标识 = 1
          //     "key": "FvuiSf8QnE3NNTp5oz2JCUx3Rgo9" // 七牛返回的KEY
          // },
          // {
          //     "type": "2", // 身份证反面 标识 = 2
          //     "key": "FvuiSf8QnE3NNTp5oz2JCUx3Rgo9"
          // }
        ]
      },
      addPerson: {
        id: "",
        loginAcc: "",
        mobile: "",
        // workNum: "",
        userType: 1,
        userName: "",
        nickName: "",
        qq: "",
        wechat: "",
        pointPosition: 0,
        pictureList: [],
        certificates: [],
        certifiPer: []
      },
      demData: {
        releaseData: []
      },
      changeRealease: {
        data: [],
        dataAll: [],
        changeData: [],
        realeaseData: []
      },
      accsetLimit: false,
      resutLimit: false,
      PaccsetLimitL: false,
      submitted: false,
      showEnterprise: false,
      showPersonal: false
    };
  },
  mixins: [validationMixin],
  validations() {
    return {
      addPerson: {
        loginAcc: {
          required,
          isExistLoginAcc(value) {
            if (value === "") return true;
            if (this.modalType == "edit") {
              if (this.receObj.loginAcc == value) {
                return true;
              }
            }
            return this.isExistLoginAcc(value);
          },
          charOrNum(value) {
            return Regex.charOrNum(value);
          },
          maxLength: maxLength(20)
        },
        mobile: {
          required,
          mobile(value) {
            return Regex.mobile(value);
          },
          isExistMobile(value) {
            if (value === "") return true;
            if (this.modalType == "edit") {
              if (this.receObj.mobile == value) {
                return true;
              }
            }
            return this.isExistMobile(value);
          }
        },
        userName: {
          required(value) {
            if (this.showPersonal && this.isMustFill) {
              return value + "" ? true : false;
            } else {
              return true;
            }
          },
          maxLength: maxLength(10)
        },
        nickName: {
          // required
          maxLength: maxLength(10)
        },
        qq: {
          // required
          maxLength: maxLength(10)
        },
        wechat: {
          // required
          maxLength: maxLength(20)
        }
      },
      companyAuthDto: {
        customerName: {
          required(value) {
            if (this.showEnterprise && this.isMustFill) {
              return value + "" ? true : false;
            } else {
              return true;
            }
          },
          maxLength: maxLength(20)
        }, //企业名称
        customerCode: {
          required(value) {
            if (this.showEnterprise && this.isMustFill) {
              return value + "" ? true : false;
            } else {
              return true;
            }
          },
          maxLength: maxLength(20)
        }, //信用代码
        linkman: {
          required(value) {
            if (this.showEnterprise && this.isMustFill) {
              return value + "" ? true : false;
            } else {
              return true;
            }
          },
          maxLength: maxLength(10)
        }, //联系人
        contactPhone: {
          required(value) {
            if (this.showEnterprise && this.isMustFill) {
              return value + "" ? true : false;
            } else {
              return true;
            }
          },
          NumBer(value) {
            return Regex.NumBer(value);
          },
          maxLength: maxLength(20)
        }, //联系号码
        cityCode: {
          required(value) {
            if (this.showEnterprise && this.isMustFill) {
              return value + "" ? true : false;
            } else {
              return true;
            }
          }
        }
      },
      personAuthDto: {
        identNum: {
          required(value) {
            if (this.showPersonal && this.isMustFill) {
              return value + "" ? true : false;
            } else {
              return true;
            }
          },
          IdentityCard(value) {
            let res = Regex.IdentityCard(value);
            console.log(res)
            return res
          },
        }
      },
      subFormName: ""
    };
  },
  computed: {
    formStr() {
      return JSON.stringify(this.form, null, 4);
    },
    isValid() {
      if (this.subFormName) {
        return (
          !this.$v.addPerson.$anyError && !this.$v[this.subFormName].$anyError
        );
      } else {
        return !this.$v.addPerson.$anyError;
      }
    },
    enterIsValid() {
      if (this.subFormName) {
        return !this.$v[this.subFormName].$anyError;
      } else {
        return !this.$v.addPerson.$anyError;
      }
    },
    isDirty() {
      return this.$v.form.$anyDirty;
    }
  },
  watch: {},
  created() {
    this.showEnterprise = true;
    this.getCity();
    if (this.modalType == "edit") {
      this.getQueryDemandAndChance();
      // this.addPerson.pictureList = []
      this.getEditUser();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.addPerson.pointPosition = 0;
    });
  },
  methods: {
    onStatus() {
      this.isMustFill = true;
      if (this.enterpriseValidate()) {
        if (
          this.personAuthDto.identPicList.length < 2 &&
          !this.companyAuthDto.picUrl
        ) {
          if (
            this.addPerson.certificates.length <= 0 &&
            this.addPerson.certificates.length < 2
          ) {
            if (this.form.customerType == 2) {
              if (this.personAuthDto.identPicList.length < 2) {
                this.$message.error("请上传身份证正面和反面两张照片");
              }
            } else {
              if (this.companyAuthDto.picUrl.length <= 0) {
                this.$message.error("请上传企业证件照");
              }
            }
            return false;
          }
        }
        if (
          this.personAuthDto.identPicList.length < 2 &&
          !this.companyAuthDto.picUrl
        ) {
          if (
            this.addPerson.certificates.length <= 0 &&
            this.addPerson.certificates.length < 2
          ) {
            if (this.form.customerType == 2) {
              if (this.personAuthDto.identPicList.length < 2) {
                this.$message.error("请上传身份证正面和反面两张照片");
              }
            } else {
              if (this.companyAuthDto.picUrl.length <= 0) {
                this.$message.error("请上传企业证件照");
              }
            }
            return false;
          }
        }
        personAPI
          .updateAuditStatus({
            customerId: this.customerID,
            status: 1
          })
          .then(res => {
            if (res.data.code == 0) {
              this.auditStatus = 1;
              this.$message.success("修改审核状态成功");
            } else {
              this.$message.error(res.data.message);
            }
          });
      }
    },
    resetmodifyModal() {
      this.modifyModal.title = "";
      this.modifyModal.content = "";
    },
    // 数据权限元素编辑
    see(item) {
      console.log("编辑的参数", item);
      //if(item.bidderName!==null||item.bidderName!==undefined){
      this.modifyModal.title = `修改`;
      this.modifyModal.modalType = "edit";
      this.modifyModal.targetObj = item;
      this.modifyModal.content = "修改";
      this.$root.$emit("bv::show::modal", this.modifyModal.id);
      //}
    },
    handlePhotoListRemove(val) {
      this.form.userResumeDto.urlList = [];
      val.map(ele => {
        return this.form.userResumeDto.urlList.push(ele.key);
      });
    },
    handleIdNumRemove(val) {
      this.personAuthDto.identPicList = [];
      val.map((ele, idx) => {
        console.log("ele", ele);
        return this.personAuthDto.identPicList.push({
          type: idx + 1, // 身份证正面 标识 = 1
          key: ele.key // 七牛返回的KEY
        });
      });
      console.log(
        "this.personAuthDto.identPicList",
        this.personAuthDto.identPicList
      );
    },
    // 编辑回填信息
    getEditUser() {
      let arr = [];
      let brr = [];
      // 获取编辑信息
      personAPI
        .getEditUser({ id: this.targetObj.id })
        .then(res => {
          this.receObj = res.data.result;
          this.addPerson.id = this.receObj.id;
          this.addPerson.loginAcc = this.receObj.loginAcc;

          this.addPerson.mobile = this.receObj.mobile;
          this.addPerson.userType = this.receObj.userType;
          this.addPerson.userName = this.receObj.userName;
          this.addPerson.nickName = this.receObj.nickName;
          this.addPerson.wechat = this.receObj.wechat;
          this.addPerson.qq = this.receObj.qq;
          this.addPerson.certificates = [];
          this.addPerson.certifiPer = [];
          this.addPerson.pointPosition = 0;
          this.form.customerType = res.data.result.customerType;
          console.log("编辑返回数据", this.form.customerType);
          // 保存customerType信息，用于切换个人与企业判断
          this.saveCustomerType = this.form.customerType;
          if (this.form.customerType == 2) {
            this.customerID = this.receObj.userAuthInfo.customer.id;
            this.auditStatus = this.receObj.userAuthInfo.customer.status;
            this.isShowEnt = true;
            this.subFormName = "personAuthDto";
            this.tabIndex = 1;
            // this.personAuthDto = this.receObj.userAuthInfo.customer
            this.personAuthDto.identNum = this.receObj.userAuthInfo.customer.paperworkNumber;
            this.showPersonal = true;
            // this.personAuthDto.identPicList.push({
            //     type: 1,  // 身份证正面 标识 = 1
            //     key: this.receObj.userAuthInfo.urlMap.front.key
            // })
            // this.personAuthDto.identPicList.push({
            //     type: 2,
            //     key: this.receObj.userAuthInfo.urlMap.back.key
            // })
            if (
              this.receObj.userAuthInfo.urlMap.front.key ||
              this.receObj.userAuthInfo.urlMap.back.key
            ) {
              this.addPerson.certifiPer.push({
                name: this.receObj.userAuthInfo.urlMap.front.key,
                url: this.receObj.userAuthInfo.urlMap.front.url,
                key: this.receObj.userAuthInfo.urlMap.front.key
              });
              this.addPerson.certifiPer.push({
                name: this.receObj.userAuthInfo.urlMap.back.key,
                url: this.receObj.userAuthInfo.urlMap.back.url,
                key: this.receObj.userAuthInfo.urlMap.back.key
              });
              this.personAuthDto.identPicList.push({
                type: 1, // 身份证正面 标识 = 1
                key: this.receObj.userAuthInfo.urlMap.front.key
              });
              this.personAuthDto.identPicList.push({
                type: 2,
                key: this.receObj.userAuthInfo.urlMap.back.key
              });

              if (this.addPerson.certifiPer.length >= 2) {
                this.accsetLimit = true;
              } else {
                this.accsetLimit = false;
              }
            } else {
              this.addPerson.certifiPer = [];
            }
          } else if (this.form.customerType == 1) {
            this.customerID = this.receObj.userAuthInfo.customer.id;
            this.auditStatus = this.receObj.userAuthInfo.customer.status;
            this.subFormName = "companyAuthDto";
            this.tabIndex = 0;
            this.isShowper = true;
            this.companyAuthDto.customerName = this.receObj.userAuthInfo.customer.customerName;
            this.companyAuthDto.customerCode = this.receObj.userAuthInfo.customer.customerCode;
            // this.companyAuthDto.city = this.receObj.userAuthInfo.customer.city
            this.companyAuthDto.contactPhone = this.receObj.userAuthInfo.customer.contactPhone;
            this.companyAuthDto.linkman = this.receObj.userAuthInfo.customer.linkman;
            this.companyAuthDto.cityCode = this.receObj.userAuthInfo.customer.areaCode;
            this.showEnterprise = true;
            this.companyAuthDto.picUrl = this.receObj.userAuthInfo.urlMap.front.key;
            if (this.receObj.userAuthInfo.urlMap.front.key) {
              this.addPerson.certificates.push({
                name: this.receObj.userAuthInfo.urlMap.front.key,
                url: this.receObj.userAuthInfo.urlMap.front.url,
                key: this.receObj.userAuthInfo.urlMap.front.key
              });
              console.log(
                "this.addPerson.certificates.length",
                this.addPerson.certificates.length
              );
              if (this.addPerson.certificates.length >= 1) {
                this.PaccsetLimit = true;
              } else {
                this.PaccsetLimit = false;
              }
            } else {
              this.addPerson.certificates = [];
            }
          }
          // =============
          // console.log('res.data.result.userResumeUrlList',res.data.result.userResumeUrlList)
          let SortArr = res.data.result.userResumeUrlList.sort(
            Func.pcompare("order", true)
          );
          console.log(
            "===============",
            SortArr,
            res.data.result.userResumeUrlList
          );
          SortArr.map(ele => {
            this.form.userResumeDto.urlList.push(ele.key);
            return arr.push({ name: ele.key, url: ele.url, key: ele.key });
          });

          this.addPerson.pictureList = arr;
          if (this.addPerson.pictureList.length >= 4) {
            this.resutLimit = true;
          } else {
            this.resutLimit = false;
          }

          console.log("arr", arr);
        })
        .catch(error => {
          console.log(error);
          this.$message.error("接口返回错误");
        });
    },
    selectCity(val) {
      let arr = [];
      arr = this.citySelectList.filter(item => {
        return item.districtCode === val;
      });
      this.city = arr[0].districtName;
      this.companyAuthDto.city = arr[0].districtName;
    },
    getCity() {
      personAPI.getCity().then(res => {
        this.citySelectList = res.data.result;
        // console.log('city',res)
      });
    },
    toggle(val) {
      if (this.modalType == "edit") {
        if (this.saveCustomerType == 5) {
          this.form.customerType = val * 1 + 1;
        }
      } else {
        this.form.customerType = val * 1 + 1;
      }
      this.showEnterprise = false;
      this.showPersonal = false;
      if (val == 0) {
        this.subFormName = "companyAuthDto";
        this.showEnterprise = true;
      } else {
        this.subFormName = "personAuthDto";
        this.showPersonal = true;
      }
      console.log("this.form.customerType = val*1+1;", this.form.customerType);
    },
    // <<前端分页
    pageData(data, currentPage, pageSize) {
      console.log("data", data);
      let startIdx = (currentPage - 1) * pageSize;
      let lastIdx = startIdx + pageSize;
      this.page.total = data.length;
      this.page.totalPage = Math.ceil(Number(data.length / pageSize));
      this.changeRealease.data = data.slice(startIdx, lastIdx);
    },
    currentChangeHandle(val) {
      this.page.currentPage = val;
      if (this.addPerson.pointPosition == 0) {
        this.pageData(
          this.changeRealease.dataAll,
          this.page.currentPage,
          this.page.limit
        );
      } else if (this.addPerson.pointPosition == 1) {
        this.pageData(
          this.changeRealease.realeaseData,
          this.page.currentPage,
          this.page.limit
        );
      } else {
        this.pageData(
          this.changeRealease.changeData,
          this.page.currentPage,
          this.page.limit
        );
      }
    },
    // 分页输入框值变化
    updateCurrentPage(page) {
      this.page.currentPage = page;
      if (this.addPerson.pointPosition == 0) {
        this.pageData(
          this.changeRealease.dataAll,
          this.page.currentPage,
          this.page.limit
        );
      } else if (this.addPerson.pointPosition == 1) {
        this.pageData(
          this.changeRealease.realeaseData,
          this.page.currentPage,
          this.page.limit
        );
      } else {
        this.pageData(
          this.changeRealease.changeData,
          this.page.currentPage,
          this.page.limit
        );
      }
    },
    //微简历
    handleRusome(val) {
      this.form.userResumeDto.urlList = [];
      val.map(ele => {
        console.log("ele", ele);
        return this.form.userResumeDto.urlList.push(ele.key);
      });
    },
    handlePictrue(val) {
      this.addPerson.pictureList = [];
      val.map(ele => {
        return this.addPerson.pictureList.push(ele.key);
      });
      if (this.form.customerType == 2) {
        let arr = [];
        this.addPerson.pictureList.map((ele, idx) => {
          const temp = {
            type: idx + 1,
            key: ele
          };
          return arr.push(temp);
        });
        this.personAuthDto.identPicList = arr;
      } else {
        this.companyAuthDto.picUrl = this.addPerson.pictureList[0];
      }
    },
    addPictrue(pictrue) {
      this.newPic = pictrue;
    },
    changeStatus(val) {
      console.log("inout", val);
      this.page.currentPage = 1;
      if (this.addPerson.pointPosition == 0) {
        this.pageData(
          this.changeRealease.dataAll,
          this.page.currentPage,
          this.page.limit
        );
      } else if (this.addPerson.pointPosition == 1) {
        this.pageData(
          this.changeRealease.realeaseData,
          this.page.currentPage,
          this.page.limit
        );
      } else {
        this.pageData(
          this.changeRealease.changeData,
          this.page.currentPage,
          this.page.limit
        );
      }
    },
    //保存或者更新资产信息
    onSubmit(bvModalEvt) {
      bvModalEvt.preventDefault();
      if (this.form.customerType == 2) {
        if (
          this.personAuthDto.identNum ||
          this.addPerson.userName ||
          this.personAuthDto.identPicList.length > 0
        ) {
          this.isMustFill = true;
        }
      } else {
        if (
          this.companyAuthDto.customerName ||
          this.companyAuthDto.customerCode ||
          this.companyAuthDto.cityCode ||
          this.companyAuthDto.linkman ||
          this.companyAuthDto.contactPhone ||
          this.companyAuthDto.picUrl
        ) {
          // 如果返回的是未填写认证信息状体，给默认值未企业认证
          if (this.saveCustomerType && this.saveCustomerType == 5) {
            this.form.customerType = 1;
          }
          this.isMustFill = true;
        }
      }
      // isMustFill为true时，认证信息为未填写状态
      if (!this.isMustFill) {
        this.form.customerType = 5;
      }

      if (this.validate()) {
        this.form.user = this.addPerson;
        let condition = {};
        if (this.form.customerType == 2) {
          this.form.personAuthDto = this.personAuthDto;
          this.form.personAuthDto.userName = this.addPerson.userName;
          this.showEnterprise = false;
        } else {
          this.showEnterprise = true;
          this.form.companyAuthDto = this.companyAuthDto;
        }
        if (this.isMustFill) {
          if (
            this.personAuthDto.identPicList.length < 2 &&
            !this.companyAuthDto.picUrl
          ) {
            if (
              this.addPerson.certificates.length <= 0 &&
              this.addPerson.certificates.length < 2
            ) {
              if (this.form.customerType == 2) {
                if (this.personAuthDto.identPicList.length < 2) {
                  this.$message.error("请上传身份证正面和反面两张照片");
                }
              } else {
                if (this.companyAuthDto.picUrl.length <= 0) {
                  this.$message.error("请上传企业证件照");
                }
              }
              return false;
            }
          }
        }
        condition = this.form;

        if (this.modalType == "add") {
          personAPI.addPersonUser(condition).then(res => {
            if (res.data.code === 0) {
              this.$message.success("新增成功！");
              this.$emit("refreshTable", "add");
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
              console.log("编辑更新");
              this.$emit("refreshTable", "edit");
            } else {
              this.$message.error("更新失败！");
            }
            this.$root.$emit("bv::hide::modal", this.modalId);
          });
        }
        this.submitted = true;
      }
    },
    // 获取机会
    getQueryDemandAndChance() {
      let loginAcc = JSON.parse(localStorage.getItem("userinfo")).loginAcc;
      personAPI
        .getQueryDemandAndChance({ loginAcc: loginAcc })
        .then(res => {
          // console.log('需求机会',res.data.result)
          if (res.data.code == 0) {
            this.changeRealease.dataAll = res.data.result.allList;
            this.changeRealease.changeData = res.data.result.chanceList;
            this.changeRealease.realeaseData = res.data.result.demandList;
            // console.log(' this.changeRealease.dataAll', this.changeRealease.dataAll)
            this.pageData(this.changeRealease.dataAll, 1, this.page.limit);

            // this.page.total = res.data.result
          } else {
            this.changeRealease.changeData = [];
          }
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
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
    enterpriseValidate() {
      this.$v.$touch();
      this.$nextTick(() => {
        return this.findFirstError();
      });
      return this.enterIsValid;
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
    // 账号查重
    isExistLoginAcc(value) {
      let condition = {
        loginAcc: value
      };
      let result = personAPI
        .checka(condition)
        .then(res => {
          if (res.data.code == 0) {
            if (res.result) {
              return false;
            } else {
              return true;
            }
          } else {
            // this.$message.error(res.data.message);
          }
        })
        .catch(err => {});
      return result;
    },
    // 电话号码查重
    isExistMobile(value) {
      let condition = {
        mobile: value
      };
      let result = personAPI
        .checka(condition)
        .then(res => {
          if (res.data.code == 0) {
            if (res.result) {
              return false;
            } else {
              return true;
            }
          } else {
            // this.$message.error(res.data.message);
          }
        })
        .catch(err => {});
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "@/assets/common/tableListStyle.scss";
.text-right {
  text-align: right;
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
.inline-form-col-6 .form-group {
  width: 50%;
  margin-right: 0;
  margin-bottom: 1rem;
}
.inline-form-col-6 .form-group-lg {
  width: 100%;
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
.required-icon {
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
.add-person-title {
  line-height: 43px;
  text-align: left;
}
.tab-content .tab-pane {
  padding: 0rem;
}
.audit-status {
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin-bottom: 1rem;
  .audit-status-warn {
    color: #e6a23c;
    background-color: #fdf6ec;
    border-color: #faecd8;
  }
  .audit-status-success {
    background-color: #f0f9eb;
    border-color: #e1f3d8;
    color: #67c23a;
  }
}
</style>
