<template>
  <div id="peiId" :class="className" style="width: 100%;height: 100%" ref="myEchart" :option="option"></div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: "Pei",
    props: {
      //父组件需要传递的参数：id，width，height，option

      className: {
        type: String,
        default: 'yourClassName'
      },
      id: {
        type: String,
        default: 'yourID'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '400px'
      },
      option: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        ChartLineGraph: null,
        chart: null,
      }
    },
    mounted () {
      let self = this
      this.init();
      this.$nextTick(function () {
        self.initChart(self.id, self.option);
      })
    },
    watch: {
      option: {
        handler (newval, oldval) {
          // console.log('newval=',newval)
          // this.chart(newval)
          this.$nextTick(()=>{
             this.chart.setOption(newval)
          })
        },
        deep: true
      }
    },
    methods: {
      init () {
        const self = this;//因为箭头函数会改变this指向，指向windows。所以先把this保存
        window.addEventListener("resize", function () {
          // self.chart = self.$echarts.init(self.$refs.myEchart);
          self.chart.resize()
        });
      },
      initChart (id, option) {
        // let _this = this;
        // let myChart = document.getElementById(id)
        this.chart = this.$echarts.init(this.$refs.myEchart)
        this.chart.setOption(option,true);
      }
    }
  }

</script>

<style lang="scss" scoped>
  .pei {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
  }

  #peiId{
    width: 100% !important;
    div {
      width: 100% !important;
      canvas {
        width: 100% !important;
      }
    }
  }

</style>
