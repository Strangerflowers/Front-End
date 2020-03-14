<template>
  <div class="echartsModel">
    <div class="echartsModel-header">
      <h3 class="card-header title">
        <strong>{{title}}</strong>
        <div class="col-sm-4 col-md-3 col-lg-2 col-6 title-icon">
          <!-- 下载按钮后续需求 -->
          <i class="icon-arrow-down-circle icon"></i>
          <i class="icon-list icon"></i>
        </div>
      </h3>
      <div class="func">
        <div class="func-scroll">
          <template v-if="!isSingle">
            <label class="fontColor func-margin">{{selectTitle}}:</label>
            <el-select
            slot="prefix-icon"
              v-model="selectcartname"
              @change="selectChange"
              placeholder="请选择"
              class="mleft"
            >
 <i slot="prefix-icon" class="el-icon-caret-bottom"></i>
              <el-option
                v-for="item in lengedData"
                :key="item.originDataId"
                :label="item.permElemName"
                :value="item.originDataId"
              >
              </el-option>
            </el-select>
          </template>
          <b-form-group class="inline func-item">
            <b-form-radio-group id="basicCustomRadios1" name="customRadioInline1">
              <div @change="handleRadio">
                <label class="fontColor func-margin">统计维度:</label>
                <template>
                  <el-radio-group
                    v-model="initData.dimensionCode"
                    style="vertical-align: bottom;padding-left:10px;"
                  >
                    <el-radio :label="'day'" style="margin-right:10px">日</el-radio>
                    <el-radio :label="'week'" style="margin-right:10px">周</el-radio>
                    <el-radio :label="'month'" style="margin-right:10px">月</el-radio>
                  </el-radio-group>
                </template>
              </div>
            </b-form-radio-group>
          </b-form-group>
          <label class="func-item fontColor func-margin right">周期:</label>
          <template>
            <div class="block" id="el-week">
              <el-date-picker
                style="width:130px"
                v-show="initData.dimensionCode=='week'"
                ref="weekText"
                :picker-options="pickerWeek0"
                id="getWeekStart"
                v-model="value2"
                type="week"
                @focus="handleStart"
                @change="(e) => selectStartWeek(e)"
                format="yyyy W WW"
                :placeholder="initData.startTime?initData.startTime:'选择周'"
              ></el-date-picker>
            </div>
            <span v-show="initData.dimensionCode=='week'">至</span>
            <div class="block">
              <el-date-picker
                style="width:130px"
                v-model="value3"
                id="getWeekEnd"
                v-show="initData.dimensionCode=='week'"
                :picker-options="pickerWeek1"
                type="week"
                @focus="handleEnd"
                @change="(e) => selectEndWeek(e)"
                format="yyyy W WW"
                :placeholder="initData.endTime?initData.endTime:'选择周'"
              ></el-date-picker>
            </div>
          </template>
          <template>
            <div class="block">
              <el-date-picker
                v-show="initData.dimensionCode =='day'"
                :picker-options="pickerOptions"
                @focus="handleDateType"
                @change="handllRange"
                v-model="value1"
                type="daterange"
                range-separator="至"
                :start-placeholder="initData.startTime?initData.startTime:'开始日期'"
                :end-placeholder="initData.endTime?initData.endTime:'结束日期'"
              ></el-date-picker>
            </div>
          </template>
          <template>
            <div class="block">
              <el-date-picker
                v-show="initData.dimensionCode =='month'"
                :picker-options="pickerOptions"
                @focus="handleDateType"
                @change="handllRange"
                v-model="value1"
                type="monthrange"
                range-separator="至"
                :start-placeholder="initData.startTime?initData.startTime:'开始日期'"
                :end-placeholder="initData.endTime?initData.endTime:'结束日期'"
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
        </div>
      </div>
      <header class="header" v-if="keyId==='datactr:rpt:uts:stats'">
        <div class="header-line">
          <div class="line-item">
            <p class="item-text">下单总数</p>
            <p>
              <strong class="item-number">{{titleData.totalOrder?titleData.totalOrder:'-'}}</strong>
            </p>
          </div>
          <div class="borders">

          </div>
          <div class="line-item">
            <p class="item-text">完成单数</p>
            <p>
              <strong class="item-number">{{titleData.finishedOrder?titleData.finishedOrder:'-'}}</strong>
            </p>
          </div>
          <div class="borders">

          </div>
          <div class="line-item">
            <p class="item-text">完成率</p>
            <p>
              <strong class="item-number">{{titleData.completeRate?titleData.completeRate:'-'}}</strong>
              <span class="item-num-percent">%</span>
            </p>
          </div>
          <div class="borders">

          </div>
          <div class="line-item" style="border-right:1px solid #fff;">
            <p class="item-text">完成工单平均耗时</p>
            <p>
              <strong
                class="item-number"
              >{{titleData.avgCompletionTime?parseInt(titleData.avgCompletionTime/60):'-'}}</strong>小时
               <strong
                class="item-number"
              >{{titleData.avgCompletionTime?parseInt(titleData.avgCompletionTime%60):'-'}}</strong>分钟
            </p>
          </div>
          <div class="borders">

          </div>
          <div class="line-item" style="border-right:1px solid #fff;">
            <p class="item-text">平均到场时间</p>
            <p class="item-num-percent">
              <strong class="item-number">{{titleData.avgArrivalTime?parseInt(Number(titleData.avgArrivalTime)/60):'-'}}</strong>小时
              <strong class="item-number">{{titleData.avgArrivalTime?parseInt(Number(titleData.avgArrivalTime)%60):'-'}}</strong>分钟
            </p>
          </div>
        </div>
      </header>
    </div>
    <div class="user-search">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
import { setupCalendar, DatePicker, RadioGroup, Radio } from "v-calendar";
import "v-calendar/lib/v-calendar.min.css";
import vSelect from "vue-select";
var moment = require("moment");
moment.locale("zh-cn");

setupCalendar({
  firstDayOfWeek: 2 // Monday
});
const today = new Date();
export default {
  name: "echartsModel",
  components: {
    "v-date-picker": DatePicker,
    setupCalendar,
    vSelect,
    RadioGroup,
    Radio
    // Select,
  },
  props: {
    lengedData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 工单数据文本展示
    titleData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // 控制header是否显示
    keyId: String,
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
    isSingle: Boolean
  },
  data() {
    return {
      // initData:{},
      range: {
        start: new Date(),
        end: new Date()
      },
      radio: "day",
      datetype: "",
      value1: "",
      value2: "",
      value3: "",
      value6: "",
      pickerWeek0: {
        disabledDate: time => {
          if (this.value3) {
            // if((this.value2.getTime() -  Date.now().getTime())/(1000 * 60 * 60 * 24) > 28){
            return (
              time.getTime() + 2 * 8.64e7 > this.value3.getTime() ||
              time.getTime() + 1 * 8.64e7 < this.value3.getTime() - 42 * 8.64e7
            );
          } else {
            // // 以周日为当前的第一天
            // return time.getTime() + (1 * 8.64e7) >  Date.now() - (new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getDay() * 8.64e7)

            // 以周一为当前的第一天
            return (
              time.getTime() >
              Date.now() -
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  new Date().getDate()
                ).getDay() *
                  8.64e7
            );
          }
        },
        firstDayOfWeek: 1
      },
      pickerWeek1: {
        disabledDate: time => {
          if (this.value2) {
            if (
              Math.abs(new Date().getTime() - new Date(this.value2).getTime()) /
                (1000 * 60 * 60 * 24) >
              49
            ) {
              return (
                time.getTime() - 7 * 8.64e7 >
                  this.value2.getTime() + 40 * 8.64e7 ||
                time.getTime() - 7 * 8.64e7 < this.value2.getTime() - 1 * 8.64e7
              );
            } else {
              return (
                time.getTime() < this.value2.getTime() + 6 * 8.64e7 ||
                time.getTime() >
                  Date.now() -
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      new Date().getDate()
                    ).getDay() *
                      8.64e7
              );
            }
            // return  time.getTime() - (7 * 8.64e7)  > this.value2.getTime() + (40 * 8.64e7) || time.getTime() - (7 * 8.64e7)  < this.value2.getTime() - (1*8.64e7);
          } else {
            return (
              time.getTime() >
              Date.now() -
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  new Date().getDate()
                ).getDay() *
                  8.64e7
            );
            //  return  time.getTime() >  Date.now()
          }
        },
        firstDayOfWeek: 1
      },
      pickerOptions: {
        onPick: a => {
          // this.minDate = a.minDate.getTime()//转成时间戳
          this.minDate = a.minDate;
          this.maxDate = a.maxDate;
        },
        disabledDate: time => {
          // 如果函数里处理的数据比较麻烦,也可以单独放在一个函数里,避免data数据太臃肿
          if (this.minDate) {
            return this.dealDisabledDate(time);
          } else {
            if (this.initData.dimensionCode === "day") {
              return time.getTime() > Date.now() - 8.64e7; //当天之前的时间可选
            } else {
              return time.getTime() > Date.now();
            }
          }
        }
      },
      minDate: "",
      maxDate: "",
      minWeek: "",
      displayPeriod: "",
      selectData: [],
      selectradios: "",
      selectcartname: "",
      rangeStart: "",
      rangeEnd: "",
      selectedDate: {
        start: new Date(2018, 0, 1),
        end: new Date(2019, 12, 31)
      },
      selectedValue: "",
      isShowDate: false,
      // minDate: null,
      // maxDate: null,
      flag: false
    };
  },
  watch: {
    initData: function(newVal, oldVal) {},
    lengedData: function(newVal, oldVal) {
      this.$nextTick(() => {
        // this.lengedData = newVal
        // this.selectcartname = this.lengedData[0].originDataId
      });
    }
  },
  created() {
    this.selectcartname = "";
    // this.selectcartname = this.initData.projectCode
  },
  mounted() {},
  methods: {
    // 处理时间格式需要传年月日的时间格式
    handlePaddingZero(time = new Date()) {
      const str = moment(time).format("YYYY/MM/DD");
      const PaddingZero = `${str.split("/")[0]}${
        str.split("/")[1].length > 1
          ? str.split("/")[1]
          : `0${str.split("/")[1]}`
      }${
        str.split("/")[2].length > 1
          ? str.split("/")[2]
          : `0${str.split("/")[2]}`
      }`;
      // const PaddingZero = `${str.split('/')[0]}-${str.split('/')[1].length > 1 ? str.split('/')[1] : `0${str.split('/')[1]}`}-${str.split('/')[2].length > 1 ? str.split('/')[2] : `0${str.split('/')[2]}`}`
      return PaddingZero;
    },
    // 处理时间格式年月
    PaddingZero(time = new Date()) {
      const str = moment(time).format("YYYY/MM/DD");
      const PaddingZero = `${str.split("/")[0]}${
        str.split("/")[1].length > 1
          ? str.split("/")[1]
          : `0${str.split("/")[1]}`
      }`;
      // const PaddingZero = `${str.split('/')[0]}-${str.split('/')[1].length > 1 ? str.split('/')[1] : `0${str.split('/')[1]}`}`
      return PaddingZero;
    },
    handleSelect(e) {
      this.$emit("handleSelect", {
        e
      });
    },
    serarch() {
      // this.initData.projectCode = JSON.stringify(this.selectcartname);
      this.initData.projectCode = this.selectcartname;
      // 获取年周
      let weekstart = document.querySelector("#getWeekStart").value;
      // weekstart=(weekstart.substr(0,weekstart.length-1)).replace(/\s*/g, "")
      let weekend = document.querySelector("#getWeekEnd").value;

      // console.log('weekstart==',weekstart,'weekend==',weekend,'#getWeekStart==',this.$refs)
      // weekend = (weekend.substr(0,weekend.length-1)).replace(/\s*/g, "")
      if (this.initData.dimensionCode == "week") {
        // this.initData.startTime = weekstart ? weekstart.replace(/\s*/g, "") :this.initData.startTime
        // this.initData.endTime = weekend ? weekend.replace(/\s*/g, "") : this.initData.endTime
      } else if (this.initData.dimensionCode == "month") {
        this.initData.startTime = this.value1[0]
          ? this.PaddingZero(this.value1[0])
          : this.initData.startTime;
        this.initData.endTime = this.value1[1]
          ? this.PaddingZero(this.value1[1])
          : this.initData.endTime;
      } else {
        this.initData.startTime = this.value1[0]
          ? this.handlePaddingZero(this.value1[0])
          : this.initData.startTime;
        this.initData.endTime = this.value1[1]
          ? this.handlePaddingZero(this.value1[1])
          : this.initData.endTime;
      }

      let conditions = {};

      conditions = this.initData;
      // console.log('this.initData;',this.initData)
      // console.log('table==condition',conditions)
      this.$emit("serarch", {
        conditions
      });
    },
    handleStart(e) {
      if (this.value3) {
      }
    },
    handleEnd(e) {
      if (this.value2) {
      }
    },
    handleRadio(radio) {
      this.value1 = "";
      this.value2 = "";
      this.value3 = "";
      this.value6 = "";
      this.initData.startTime = "";
      this.initData.endTime = "";
      radio = this.initData.dimensionCode;
      this.$emit("handleRadio", {
        radio
      });
    },
    handleDateType() {
      if(this.value1){

      }else{
        this.value1=[moment(this.initData.startTime,'YYYYMMDD').format("YYYY-MM-DD"),moment(this.initData.endTime,'YYYYMMDD').format("YYYY-MM-DD")]
      }

      // 获得焦点时判断type类型
      this.datetype = this.initData.dimensionCode;
    },
    // 选择时间设置不可选范围
    handllRange(e) {
      this.minDate = "";
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
    },
    selectEndWeek(e) {
      if (!this.value3) {
        this.initData.startTime = "";
        this.initData.endTime = "";
        return;
      }
      this.handleFormatDate();
      const vYear = new Date(this.value3).Format("yyyy");
      const vMonth = new Date(this.value3).Format("M");
      const vDay = new Date(this.value3).Format("d");
      let Week = this.handleGetYearWeek(vYear, vMonth, vDay);
      Week = Week < 10 ? "0" + Week : Week;
      const result = `${vYear}W${Week}`;
      this.initData.endTime = result
        ? result.replace(/\s*/g, "")
        : this.initData.endTime;
    },
    selectStartWeek(e) {
      if (!this.value2) {
        this.initData.startTime = "";
        this.initData.endTime = "";
        return;
      }
      this.handleFormatDate();
      const vYear = new Date(this.value2).Format("yyyy");
      const vMonth = new Date(this.value2).Format("M");
      const vDay = new Date(this.value2).Format("d");
      let Week = this.handleGetYearWeek(vYear, vMonth, vDay);
      Week = Week < 10 ? "0" + Week : Week;
      const result = `${vYear}W${Week}`;
      this.initData.startTime = result
        ? result.replace(/\s*/g, "")
        : this.initData.startTime;

      // 不能小于7周
      // const isLg7 = Math.abs((new Date(this.value2).getTime()-new Date().getTime())/8.64e7) < 49
      const isLg2 =
        Math.abs(
          (new Date(this.value2).getTime() - new Date().getTime()) / 8.64e7
        ) < 14;

      // 当前时间所处的年周 这里需要优化，要用时间戳去做判断
      const nowResult = this.handleGetYearWeek(
        new Date().Format("yyyy"),
        new Date().Format("M"),
        new Date().Format("d")
      );
      // console.log(nowResult-Week)
      //判断选择的开始周数是否小于7周，如果小于7周则重新输入值
      if (isLg2) {
        this.value2 = "";
        this.value3 = "";
        this.initData.startTime = "";
        this.initData.endTime = "";
        this.$message.error("开始时间距离现在时间较近,请重新选择");
      }
    },
    handleGetYearWeek(Y, M, D) {
      let date1 = new Date(Y, parseInt(M) - 1, D),
        date2 = new Date(Y, 0, 1),
        d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
      // return Math.ceil((d + (date2.getDay() + 1 - 1)) / 7);
      return Math.ceil((d + (date2.getDay() + 1 - 1)) / 7);
    },
    handleFormatDate() {
      Date.prototype.Format = function(fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
        return fmt;
      };
    },
    selectChange(e) {
      // if(e.includes('ALL')){
      //   this.selectcartname =['ALL']
      // }
    },
    DefaultValues() {},
    // 时间控件设置可选时间
    dealDisabledDate(time) {
      // console.log('time',this.initData.dimensionCode)
      const self = this;
      if (self.minDate) {
        if (self.initData.dimensionCode == "day") {
          if (
            Math.abs(new Date().getTime() - self.minDate.getTime()) /
              (1000 * 60 * 60 * 24) >
            7
          ) {
            return (
              time.getTime() > self.minDate.getTime() + 6 * 8.64e7 ||
              time.getTime() < self.minDate.getTime()
            );
          } else {
            // return time.getTime() > Date.now() - 8.64e7;
            return (
              time.getTime() < self.minDate.getTime() ||
              time.getTime() > Date.now() - 8.64e7
            );
          }
          // return  time.getTime() > self.minDate.getTime() + (6 * 8.64e7) || time.getTime() < self.minDate.getTime();
        } else {
          if (
            Math.abs(new Date().getTime() - self.minDate.getTime()) /
              (1000 * 60 * 60 * 24) >
            365
          ) {
            // console.log(111,(new Date() - self.minDate.getTime())/(1000 * 60 * 60 * 24))
            return (
              time.getTime() > self.minDate.getTime() + 335 * 8.64e7 ||
              time.getTime() < self.minDate.getTime()
            );
          } else {
            //
            return (
              time.getTime() < self.minDate.getTime() ||
              time.getTime() > Date.now() - 8.64e7
            );

            // return time.getTime() > Date.now() - 8.64e7;
          }
          // return  time.getTime() > self.minDate.getTime() +  (335 * 8.64e7) ||  time.getTime() < self.minDate.getTime();
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.echartsModel {
  // height:582px;

  width: 100%;
  background: #ffffff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  .echartsModel-header {
    .title {
      // font-weight: 500;
      // font-family: PingFangSC-Semibold;
      position: relative;
      font-size: 14px;
      margin-bottom: 38px;
      // color: #000000;
      // letter-spacing: -0.09px;
      // padding: 14px 0px;
      // background-color: #f0f3f5;
      // border-bottom: 1px solid #c8ced3;
      // padding-left: 14px;
      // font-weight: 550;
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
      margin-bottom: 20px;
      .func-item {
        margin-left: 15px;
      }
      .func-btn {
        font-size: 14px;
        // padding: 2px 18px;
        // border-radius: 5px;
        // margin-top: -2px;
        // vertical-align: middle;
      }
      .btn-box {
        width: 68px;
        display: inline-block;
      }
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      .header-line {
        padding:0 15%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .borders{
          height:40px;
          width:1px;
          display:inline-block;
          background:#979797;
          opacity: 0.2;
        }
        .line-item {
          // :after{
          //   content:'|';
          //   width:1px;
          //   height:40px;
          //   background:#f00;
          // }
          // border-right:1px solid #ccc;
          // width:40%;
          .item-text {
            font-family: PingFangSC-Medium;
            font-size: 13px;
            color: #708393;
            letter-spacing: -0.08px;
            text-align: center;
            // line-height: 30px;
          }
          .item-number {
            font-family: PingFangSC-Semibold;
            font-size: 24px;
            color: #2F353A;
            letter-spacing: -0.16px;
            text-align: center;
            line-height: 30px;
          }
          .item-num-percent {
            font-family: PingFangSC-Semibold;
            font-size: 10px;
            color: #2F353A;
            letter-spacing: -0.06px;
            text-align: center;
            line-height: 30px;
          }
        }
        .line-item p {
          font-size: 12px;
        }
        .line-item p strong {
          font-size: 14px;
        }
        .line-item p span {
          font-size: 12px;
          color: #f00;
        }
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
  margin-left: 10px;
}
.right {
  margin-right: 10px;
}
.mleft {
  margin-left: 10px;
}
.block {
  position: relative;
  display: inline-block;
}
p {
  margin: 0px;
  padding: 0px;
}
.func-scroll {
  // overflow-x: scroll;
  // overflow-y: hidden;
  // width:1000px;
}
</style>

