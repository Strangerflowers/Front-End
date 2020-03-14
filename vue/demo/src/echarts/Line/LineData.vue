<template>
    <div ref="myEchart" id="echartContainer"  :option="option"></div>
</template>

<script>

  import echarts from 'echarts'

  export default {
    name: "LineData",
    data () {
      return {
        chart: null,
        timeId:null,

      }
    },
    props: {
      //父组件需要传递的参数：id，width，height，option
      option: {
        type: Object,
        default: {}
      }
    },
    mounted () {
      let self = this;
      this.init();
      this.$nextTick(function () {
        self.initChart(self.option);
      })
    },
    beforeDestroy() {
      if (this.timeId) {
        clearTimeout(this.timeId)
        this.timeId = null
      }
    },

    methods: {
      init () {
        const self = this;//因为箭头函数不会改变this指向，指向windows。所以先把this保存
        this.timeId = setTimeout(() => {
          window.addEventListener("resize", function () {
            self.chart.resize()
          });
        }, 3)
      },

      initChart (option) {
        this.timeId = setTimeout(()=>{
          this.chart = this.$echarts.init(this.$refs.myEchart)
          // this.chart.clear()
          this.chart.setOption(option);
        },300)
      }
    },
    computed: {},
    watch: {
      option: {
        handler (newval, oldval) {
            // console.log('---newval---', newval)
          // this.chart(newval)
          this.$nextTick(()=>{
            this.chart.clear()
            this.chart.setOption(newval)
          })
      },
        deep: true
      }
    },

  }

</script>

<style lang="scss" scoped>
  .line {
    display: flex;
    justify-content: center;
    text-align: center;
  }
  #echartContainer{
    width: 100% !important;
    div {
      width: 100% !important;
      canvas {
        width: 100% !important;
      }
    }
  }
</style>
