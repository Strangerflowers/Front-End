<template >
  <div class="selectModel">
    <div class="selectModel-header">
      <h3 class="card-header title">
        <strong>{{title}}</strong>
        <div class="col-sm-6 col-md-6 col-lg-5 col-6 title-icon">
          <!-- 下载按钮后续需求 -->
          <i class="icon-arrow-down-circle icon"></i>
          <i class="icon-list icon"></i>
        </div>
      </h3>
      <!-- :style="{initData.key=='datactr:rpt:lmsys:revenue'?'marginBottom':'':'' }" -->
      <header :class="[initData.key=='datactr:rpt:lmsys:revenue'?'header':'lmys']" >
        <template v-show="initData.key=='datactr:rpt:lmsys:revenue'">
          <label v-show="initData.key=='datactr:rpt:lmsys:revenue'" class="fontColor">{{selectTitle}}:</label>
          <el-select
            v-show="initData.key=='datactr:rpt:lmsys:revenue'"
            v-model="selectcartname"
            @change="selectChange"
            placeholder="请选择"
            class="mleft"
          >
            <el-option
              v-for="item in lengedData"
              :key="item.originDataId"
              :label="item.permElemName"
              :value="item.originDataId"
            ></el-option>
          </el-select>
        </template>

        <!-- <b-form class="inline func-item">
          <b-form-group
            class="fontColor"
            label=""
            label-for="basicSelectSm">
            <b-form-select  v-model="selectcartname" :placeholder="lengedData[0]"   id="basicSelectSm"      class="select-input"
              size="sm"
              :plain="true"
              :options="lengedData"
              value="Please select">
            </b-form-select>
          </b-form-group>
        </b-form>-->
        <label class="fontColor func-item">{{isSingle ? "统计周期" : "月份" }}:</label>
        <template v-if="isSingle">
          <div class="block">
            <el-date-picker
              v-show="initData.dimensionCode =='month'"
              :picker-options="pickerOptions1"
              @change="handllRange"
              @focus="normal2"
              v-model="value2"
              type="monthrange"
              range-separator="至"
              :start-placeholder="initData.startTime?initData.startTime:'开始日期'"
              :end-placeholder="initData.endTime?initData.endTime:'结束日期'"
            ></el-date-picker>
          </div>
        </template>
        <template v-else>
          <div class="block">
            <el-date-picker
              style="width:120px"
              v-model="value1"
              type="month"
              @change="handlechange"
              @focus="normal"
              :picker-options="pickerOptions"
              :placeholder="initData.startTime? initData.startTime :'选择月'"
            ></el-date-picker>
          </div>
        </template>

        <div class="btn-box">
          <button
            type="button"
            class="btn btn-primary btn-block func-item func-btn btn-sm"
            @click="serarch"
          >查询</button>
        </div>
      </header>
    </div>
    <div class="user-search">
      <slot name="selectcontent"></slot>
    </div>
  </div>
</template>
<script>
import "v-calendar/lib/v-calendar.min.css";
import vSelect from "vue-select";
import { log } from "util";
var moment = require("moment");
moment.locale("zh-cn");
const today = new Date();
export default {
  name: "pieModel",
  components: {},
  props: {
    lengedData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    data_tree: {
      type: Boolean,
      default: false
    },
    title: String,
    selectTitle: String,
    width: {
      type: String,
      default: ""
    },
    initData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    btns: {
      type: Array,
      default: function() {
        return [];
      }
    },
    isSingle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value1: "",
      value2: "",
      selectcartname: "",
      pickerOptions: {
        // onPick:(a)=>{
        //   // this.minDate = a.minDate.getTime()//转成时间戳
        //   // this.minDate = a.minDate
        // },
        disabledDate(time) {
          // return time.getTime() < Date.now() - 8.64e7;//当天之后的时间可选
          // return time.getTime() > Date.now() - 8.64e7;//当天之前的时间可选
          // return time.getTime() + (30*8.64e7) > Date.now() ;//当月之前的时间可选---不包括当月
          return time.getTime() > Date.now(); //当月之前的时间可选---不包括当月
        }
      },
      pickerOptions1: {
        onPick: a => {
          this.minDate = a.minDate;
          this.maxDate = a.maxDate;
        },
        disabledDate: time => {
          // 如果函数里处理的数据比较麻烦,也可以单独放在一个函数里,避免data数据太臃肿
          if (this.minDate) {
            return this.dealDisabledDate1(time);
          } else {
            return time.getTime() > Date.now();
          }
        }
      }
    };
  },
  watch: {
    lengedData: {
      handler(newval, oldval) {
        this.$nextTick(() => {
          this.selectcartname = newval[0].originDataId;
        });
      },
      deep: true
    }
  },
  created() {
    // let reg = /[\u4e00-\u9fa5]/g
    // '2019年09月20日'.replace(reg, '.')
    //  console.log('moment','2019年09月20日'.replace(reg, '.'))
    //  console.log('moment11','2019年09月20日'.split(reg))
  },
  mounted() {
    // console.log('lengedData',this.lengedData)
    // if(this.lengedData.length>0){
    //   this.selectcartname = this.lengedData[0].originDataId
    // }
    // // console.log('initdata',this.initData.projectCode )
    // console.log('initdata',this.initdata)
    // this.selectcartname = this.lengedData[0].originDataId
  },
  methods: {
    normal(){
      if( this.value1){

      }else{
        this.value1 =  moment(this.initData.startTime,'YYYYMMDD').format("YYYY-MM-DD");
      }
    },
    normal2(){
      if(this.value2){

      }else{
        this.value2 = [moment(this.initData.startTime,'YYYYMMDD').format("YYYY-MM-DD"), moment(this.initData.endTime,'YYYYMMDD').format("YYYY-MM-DD")]

      }

    },
    // 处理时间格式
    handlePaddingZero(time = new Date()) {
      // 存在兼容性ie11、360不兼容
      // const str = time.toLocaleDateString();
      const str = moment(time).format("YYYY/MM/DD");
      const PaddingZero = `${str.split("/")[0]}${
        str.split("/")[1].length > 1
          ? str.split("/")[1]
          : `0${str.split("/")[1]}`
      }`;
      return PaddingZero;
    },
    selectChange(e) {
      // if(e.includes('ALL')){
      //   this.selectcartname =['ALL']
      // }
    },
    serarch() {
      // 下拉为多选时传参格式转换
      //  this.initData.projectCode = JSON.stringify(this.selectcartname);
      this.initData.projectCode = this.selectcartname;
      if (this.isSingle) {
        this.initData.startTime = this.value2[0]
          ? this.handlePaddingZero(this.value2[0])
          : this.initData.startTime;
        this.initData.endTime = this.value2[1]
          ? this.handlePaddingZero(this.value2[1])
          : this.initData.endTime;
      } else {
        this.initData.startTime = this.value1
          ? this.handlePaddingZero(this.value1)
          : this.initData.startTime;
        if (this.initData.key === "datactr:rpt:ads:revenue") {
          this.initData.endTime = this.value1
            ? this.handlePaddingZero(this.value1)
            : this.initData.endTime;
        }
      }

      let conditions = {};
      conditions = this.initData;
      console.log("conditions", conditions);
      this.$emit("serarch", {
        conditions
      });
    },
    handlechange() {
      if (!this.value1) {
        this.initData.startTime = "";
      }
    },
    // 选择时间设置不可选范围
    handllRange(e) {
      this.minDate = "";
      // console.log('value11',this.value1)
      if (!this.value1) {
        this.initData.startTime = "";
        this.initData.endTime = "";
        return;
      }
      if (this.initData.dimensionCode == "day") {
        let offset =
          new Date(this.value1[1]).getTime() -
          new Date(this.value1[0]).getTime();
        const comparedata = 6 * 8.64e7;
        // console.log((new Date(this.value1[1]).getTime() - new Date(this.value1[0]).getTime())>comparedata)
        // if(offset > comparedata ){
        //   // console.log('this.value1',offset)
        //   this.value1 = '';
        //   this.initData.startTime = '';
        //   this.initData.endTime = '';
        //   this.$message.error("结束时间于开始时间不能一样,请重新选择");
        // }
      }
      // this.date_date_begin = this.value1[0] ? this.value1[0].toLocaleDateString().replace(/\//g, '-') : ''
      // this.date_date_end = this.value1[1] ? this.value1[1].toLocaleDateString().replace(/\//g, '-') : ''
    },
    // 时间控件设置可选时间
    dealDisabledDate1(time) {
      const self = this;
      if (self.minDate) {
        if (
          Math.abs(new Date().getTime() - self.minDate.getTime()) /
            (1000 * 60 * 60 * 24) >
          365
        ) {
          return (
            time.getTime() > self.minDate.getTime() + 335 * 8.64e7 ||
            time.getTime() < self.minDate.getTime()
          );
        } else {
          return (
            time.getTime() < self.minDate.getTime() ||
            time.getTime() > Date.now() - 8.64e7
          );
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.selectModel {
  width: 100%;
  background: #ffffff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  .selectModel-header {
    .title {
      position: relative;
      font-size: 14px;
      margin-bottom: 14px;
      .title-icon {
        position: absolute;
        right: 10px;
        top: 10px;
        vertical-align: middle;
        text-align: right;
        .icon {
          color: #73818f;
          margin-left: 10px;
          vertical-align: middle;
        }
      }
    }
    .func {
      padding: 0px 20px;
      margin-bottom: 40px;

      .func-btn {
        font-size: 14px;
        // padding: 2px 18px;
        // border-radius: 5px;
        // margin-top: -2px;
        // vertical-align: middle;
      }
    }
  }
  .user-search {
    padding: 0px 20px;
  }
}
.inline {
  display: inline-block;
}
.select-input {
  margin-top: 3px;
  margin-right: 20px;
  // margin-left: -20px;
}
.fontColor {
  font-size: 14px;
  color: #666;
  label {
    font-size: 14px;
    color: #666;
  }
}
.func-margin {
  margin-right: -12px;
}
.block {
  position: relative;
  display: inline-block;
}
// .lmys{
//   margin-bottom:-20px;
// }
.lmys {
  // text-align: center;
  padding: 0 20px;
  // margin-bottom: -30px;
  // padding-bottom: 16px;
  .header-line {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .line-item {
      // border-right:1px solid #ccc;
      // width:40%;
      .item-text {
        font-family: PingFangSC-Medium;
        font-size: 12px;
        color: #8ca0b3;
        letter-spacing: -0.08px;
        text-align: center;
        // line-height: 30px;
      }
      .item-number {
        font-family: PingFangSC-Semibold;
        font-size: 24px;
        color: #6c6c6c;
        letter-spacing: -0.16px;
        text-align: center;
        line-height: 30px;
      }
      .item-num-percent {
        font-family: PingFangSC-Semibold;
        font-size: 10px;
        color: #f16072;
        letter-spacing: -0.06px;
        text-align: center;
        line-height: 30px;
      }
    }
    .line-item p {
      font-size: 14px;
    }
    .line-item p strong {
      font-size: 20px;
    }
    .line-item p span {
      font-size: 12px;
      color: #f00;
    }
  }
  .btn-box {
    width: 68px;
    display: inline-block;
    // margin-left: 10px;
  }
}
.header {
  // text-align: center;
  padding: 0 20px;
  margin-bottom: 30px;
  padding-bottom: 16px;
  .header-line {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .line-item {
      // border-right:1px solid #ccc;
      // width:40%;
      .item-text {
        font-family: PingFangSC-Medium;
        font-size: 12px;
        color: #8ca0b3;
        letter-spacing: -0.08px;
        text-align: center;
        // line-height: 30px;
      }
      .item-number {
        font-family: PingFangSC-Semibold;
        font-size: 24px;
        color: #6c6c6c;
        letter-spacing: -0.16px;
        text-align: center;
        line-height: 30px;
      }
      .item-num-percent {
        font-family: PingFangSC-Semibold;
        font-size: 10px;
        color: #f16072;
        letter-spacing: -0.06px;
        text-align: center;
        line-height: 30px;
      }
    }
    .line-item p {
      font-size: 14px;
    }
    .line-item p strong {
      font-size: 20px;
    }
    .line-item p span {
      font-size: 12px;
      color: #f00;
    }
  }
  .btn-box {
    width: 68px;
    display: inline-block;
    // margin-left: 10px;
  }
}
p {
  margin: 0px;
  padding: 0px;
}
.func-item {
  margin-left: 15px;
  margin-right: 10px;
  padding: 5px;
}
.right {
  margin-right: 10px;
}
.mleft {
  margin-left: 10px;
}
</style>

