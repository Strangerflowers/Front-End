<template>
  <!--这是柱状图-->
  <div

    style="height: 100%;width: 100%"
    class="charts"
    id="barId"
    ref="myEchart"
    :option="option"
  ></div>
</template>

<script>
// import ECharts from 'vue-echarts/components/ECharts'

import echarts from "echarts";

export default {
  name: "Bar",
  props: {
    //父组件需要传递的参数：id，width，height，option
    className: {
      type: String,
      default: "yourClassName"
    },
    id: {
      type: String,
      default: "yourID"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "400px"
    },
    option: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      chart: null,
      ChartLineGraph: null
    };
  },
  watch: {
    option: {
      handler(newval, oldval) {
        // console.log(newval,oldval)
        this.$nextTick(()=>{
          this.chart.clear()
          this.chart.setOption(newval)
        })
      },
      deep: true
    }
  },
  mounted() {
    let self = this;
    this.init();
    this.$nextTick(function() {
      self.initChart(self.id, self.option);
    });
  },
  methods: {
    init() {
      const self = this; //因为箭头函数会改变this指向，指向windows。所以先把this保存
      setTimeout(() => {
        window.addEventListener("resize", function() {
          self.chart.resize();
        });
      }, 3);
    },

    initChart(id, option) {
      // this.chart = echarts.init(document.getElementById(id));
      // let myChart = document.getElementById(id);
      setTimeout(()=>{
        this.chart = this.$echarts.init(this.$refs.myEchart);
        // this.chart.clear()
        this.chart.setOption(option);
      },3)

    }
  }
};
</script>

<style  lang="scss" scoped>
.bar {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  text-align: center;
}

.charts {
  width: 100%;
  height: 100%;
}
#barId {

  width: 100% !important;
  div {
    width: 100% !important;
    canvas {
      width: 100% !important;
    }
  }
}
</style>
