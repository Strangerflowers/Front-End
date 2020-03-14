<template>
  <div class="pieModel">
    <div class="pieModel-header">
      <h3 class="card-header title">
        <strong>{{title}}</strong>
        <div class="col-sm-6 col-md-6 col-lg-5 col-6 title-icon">
          <!-- 下载按钮后续需求 -->
          <i class="icon-arrow-down-circle icon"></i>
          <i class="icon-list icon"></i>
        </div>
      </h3>
      <header
        class="header"
        v-if="keyId==='datactr:rpt:ads:src'"
        :class="[iSsingle ? 'single-margin-bottom':'']"
      >
        <div :class="[iSsingle ? 'header-h' : 'header-line']">
          <div :class="[iSsingle ? 'control-line-item':'line-item']">
            <p class="item-text">总资源数</p>
            <p>
              <strong class="item-number">{{pieTitle.allTotalSource?pieTitle.allTotalSource:'-'}}</strong>
            </p>
          </div>
          <div class="borders">

          </div>
          <div :class="[iSsingle ? 'control-line-item':'line-item']">
            <p class="item-text">资源总价值</p>
            <p>
              <strong class="item-number">{{pieTitle.allTotalWorth?pieTitle.allTotalWorth:'-'}}万</strong>
            </p>
          </div>
          <div class="borders">

          </div>
          <div :class="[iSsingle ? 'control-line-item':'line-item']">
            <p class="item-text">存量资源数</p>
            <p>
              <strong class="item-number">{{pieTitle.allStockSource?pieTitle.allStockSource:'-'}}</strong>
            </p>
            <p>
              <span class="item-num-percent">(占比{{pieTitle.stockSourceRate?pieTitle.stockSourceRate:'-'}}%)</span>
            </p>
          </div>
          <div class="borders">

          </div>
          <div
            :class="[iSsingle ? 'control-line-item':'line-item']"
            style="border-right:1px solid #fff;"
            >
            <p class="item-text">存量资源价值</p>
            <p>
              <strong class="item-number">{{pieTitle.allStockWorth?pieTitle.allStockWorth:'-'}} 万</strong>
            </p>
          </div>
          <div
            v-show="iSsingle"
            :class="[iSsingle ? 'control-line-item':'line-item']"
            style="border-right:1px solid #fff;"
            >
            <p class="item-text"></p>
            <p>
              <strong class="item-number"></strong>
            </p>
          </div>
        </div>
      </header>
      <header class="header" v-else>
        <div :class="[iSsingle ? 'header-h' : 'header-line']">
          <div :class="[iSsingle ? 'control-line-item':'line-item']">
            <p class="item-text">铺位总数</p>
            <p>
              <strong class="item-number">{{titleObject.allTotalShop?titleObject.allTotalShop:'-'}}</strong>
            </p>
          </div>
          <div class="borders">

          </div>
          <div :class="[iSsingle ? 'control-line-item':'line-item']">
            <p class="item-text">空置数</p>
            <p>
              <strong class="item-number">{{titleObject.allStoctShop?titleObject.allStoctShop:'-'}}</strong>
            </p>
          </div>
          <div class="borders">

          </div>
          <div :class="[iSsingle ? 'control-line-item':'line-item']">
            <p class="item-text">空置率</p>
            <p>
              <strong class="item-number">
                {{titleObject.allStoctShopRate?titleObject.allStoctShopRate:'-'}}
              </strong>
              <span class="item-num-percent">%</span>
              <span class="item-num-percent"></span>
            </p>
          </div>
          <div class="borders">

          </div>
          <div
            :class="[iSsingle ? 'control-line-item':'line-item']"
            style="border-right:1px solid #fff;"
            >
            <p class="item-text">出租数</p>
            <p>
              <strong class="item-number">{{titleObject.allRentOut?titleObject.allRentOut:'-'}}</strong>
            </p>
          </div>
          <div class="borders">

          </div>
          <div :class="[iSsingle ? 'control-line-item':'line-item']">
            <p class="item-text">出租率</p>
            <p>
              <strong class="item-number">
                {{titleObject.allRentOutRate?titleObject.allRentOutRate:'-'}}
              </strong>
              <span class="item-num-percent">%</span>
            </p>
          </div>
        </div>
      </header>
    </div>
    <div class="user-search">
      <slot name="piecontent"></slot>
    </div>
  </div>
</template>
<script>
import "v-calendar/lib/v-calendar.min.css";
import vSelect from "vue-select";

const today = new Date();
export default {
  name: "pieModel",
  components: {},
  props: {
    iSsingle: Boolean,
    titleObject: {
      type: Object,
      default: function() {
        return {};
      }
    },
    pieTitle: {
      type: Object,
      default: function() {
        return {};
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
    keyId: String,
    btns: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      // iSsingle:true
    };
  },

  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.pieModel {
  width: 100%;
  background: #ffffff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  .pieModel-header {
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
.header {
  text-align: center;
  margin-bottom: 30px;
  .header-line {

    padding:0 5%;
    display: flex;
    justify-content: space-around;
    // align-items: center;
    margin-top:20px;
    .borders{
      height:45px;
      width:1px;
      display:inline-block;
      background:#979797;
      opacity: 0.2;
    }
    .line-item {
      // border-right:1px solid #ccc;
      // width:40%;
      .item-text {
        font-family: PingFangSC-Medium;
        font-size: 13px;
        color: #708393;
        letter-spacing: -0.08px;
        text-align: center;
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
  .header-h {

    // // padding:0 15%;
    // display: flex;
    // justify-content: space-around;
    // align-items: center;
    .borders{
      height:1px;
      width:40px;
      display:inline-block;
      background:#979797;
    }
    .control-line-item{
      // border-right:1px solid #ccc;
      // width:40%;
      .item-text {
        font-family: PingFangSC-Medium;
        font-size: 13px;
        color: #708393;
        letter-spacing: -0.08px;
        text-align: center;
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
p {
  margin: 0px;
  padding: 0px;
}
// 单项时line-item的样式控制
.control-line-item {
  line-height: 44px;
}
.single-margin-bottom {
  // margin-bottom: 153px;
  // margin-bottom:53px;
}
.single-height {
  height: 435px;
}

</style>

