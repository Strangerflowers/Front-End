
<template>
  <div class="animated fadeIn col-lg-6-paddingleft0">
    <b-row>
      <b-col lg="12">
        <b-card>
          <div class="content">
            <p class="p1">需求id：</p>
            <p class="p2"> {{form.id}}</p>
            <p class="p2"
               v-if="!form.id">暂无</p>
          </div>
          <div class="content">
            <p class="p1">需求名称：</p>
            <p class="p2">{{form.dmdTitle}}</p>
            <p class="p2"
               v-if="!form.dmdTitle">暂无</p>
          </div>
          <div class="content">
            <p class="p1">发包人：</p>
            <p class="p2">{{form.employerAcc}}</p>
            <p class="p2"
               v-if="!form.employerAcc">暂无</p>
          </div>
          <div class="content">
            <p class="p1">接包人：</p>
            <p class="p2">{{form.demandBidder}}</p>
            <p class="p2"
               v-if="!form.demandBidder">暂无</p>
          </div>
          <div class="content">
            <p class="p1">需求描述：</p>
            <p class="p2">{{form.description}}</p>
            <p class="p2"
               v-if="!form.description">暂无</p>
          </div>
          <div class="content">
            <p class="p1">任务类型：</p>
            <p class="p2">{{form.dmdTypeName}}</p>
            <p class="p2"
               v-if="!form.dmdTypeName">暂无</p>
          </div>
          <div class="content">
            <p class="p1">所需技能：</p>
            <p class="p2">{{skill.join("、")}}</p>
            <p class="p2"
               v-if="!skill.length">暂无</p>
          </div>
          <div class="content">
            <p class="p1">项目预算：</p>
            <p class="p2">{{form.dmdBudget}}</p>
            <p class="p2"
               v-if="!form.dmdBudget">暂无</p>
          </div>
          <div class="piccontent">
            <p class="p3">图片描述：</p>
            <p class="p2"
               v-if="!imgurl.length">暂无</p>
            <img v-for="(item,index) in imgurl"
                 :src="item"
                 :key="index"
                 class="pic"
                 alt="">
          </div>
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
  data () {
    return {
      form: {},
      skill: [],
      imgurl: []
    }
  },
  created () {
    console.log("需求", this.targetObj)
    this.getDemandId()
  },
  methods: {
    getDemandId () {
      this.$loading('正在加载中...')
      demAPI
        .getDemList({
          page: 1,
          limit: 1000,
          params: {
            id: this.targetObj.id
          }
        })
        .then(res => {
          console.log("需求回显", res);
          this.form = res.data.result.records[0]
          res.data.result.records[0].demandFileUrlList.forEach(val => {
            return this.imgurl.push(val.url)
          })
          console.log(this.imgurl)
          this.form.requireSkillList.forEach(val => {
            return this.skill.push(val.itemName)

          })
          // console.log("表单", this.form)
          this.$loading.close()
        });
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
  content: '';
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
.content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .p1 {
    width: 80px;
    text-align: left;
    font-size: 16px;
    font-weight: bold;
  }
  .p2 {
    font-size: 14px;
  }
}
.p3 {
  width: 80px;
  text-align: left;
  font-size: 16px;
  font-weight: bold;
}
.piccontent {
  width: 100%;
  .pic {
    max-width: 80%;
    padding: 10px;
  }
}
</style>
