<template>
  <div class="bar">
    <!--这个模板还没用-->
    <!--这是多条柱状图-->
    <div  :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart" :data="data"></div>
  </div>
</template>

<script>
  // import ECharts from 'vue-echarts/components/ECharts'

  import echarts from 'echarts'
  export default {
    name: "BarMore",
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
      data:{
        type:Object,
        default:{}
      }
    },
    data () {
      return {
        chart: null

        //柱状
     /*   zhuzi: {
          title: {
            // text: '各停车场收入情况统计--日维度',
            // subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
          },
          color: ['#73CAFF'],
          tooltip: {},
          grid: {//坐标控制
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [//横坐标
            {
              type: 'category',
              data: ['8月1日', '8月2日', '8月3日', '8月4日', '8月5日', '8月6日'],

              //去掉轴线和网格线
              "axisLine": {       //y轴
                "show": false
              },
              "axisTick": {       //y轴刻度线
                "show": false
              },
              splitLine: {//去掉网格线
                show: false
              },
            }
          ],
          yAxis: [//纵坐标
            {
              type: 'value',
              name: '单位:(元)',
              nameTextStyle: {
                fontWeight: 'normal',
                color: 'black'
              },
              //去掉轴线和网格线
              "axisLine": {       //y轴
                "show": false
              },
              "axisTick": {       //y轴刻度线
                "show": false
              },
              splitLine: {//去掉网格线
                show: false
              },

              // min: 0, //y轴的最小值
              // max: 70000, //y轴最大值
              // interval: 10000, //值之间的间隔
              //上面的三个值可以根据自己需求随意设置 不设置时会根据图中的值自动生成相应的值
            }
          ],
          series: [//鼠标移上去的文字
            {
              name: '当天车流总量',
              type: 'bar',
              barWidth: '60%',
              data: [68614, 71394, 68023, 68204, 55726, 63036],
              // barWidth: 30,
              itemStyle: {
                normal: {
                  label: {//开启上方数字
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: { //数值样式
                      color: 'black',
                      fontSize: 14,
                      // fontWeight: 600
                    }
                  }
                }
              }

            }
          ]
        },*/
      }
    },
    mounted () {
      this.init();
      this.initChart(this.data);
    },
    watch:{
      data:{
        handler(newval,oldval){
          // console.log('newval',newval)
           this.$nextTick(()=>{
             this.chart.clear()
             this.chart.setOption(newval)
          })
        },
        deep:true
      }
    },
    methods:{
      init() {
        const self = this;//因为箭头函数会改变this指向，指向windows。所以先把this保存
        // setTimeout(() => {
          /*window.onresize = function() {
            self.chart = echarts.init(self.$refs.myEchart);
            self.chart.resize();
          }*/
        // },20)
        window.addEventListener("resize", function () {
          self.chart.resize();
        });
      },

      initChart (data) {
        this.chart = echarts.init(this.$refs.myEchart);
        // 把配置和数据放这里
        /*this.chart.setOption({
      /!*  /!*  tooltip: {
            trigger: 'axis',
          },*!/
          legend: {
           /!* icon: 'rect',
            itemWidth: 15,
            itemHeight: 8,
            itemGap: 10,
            data: ['本月流量', '上月流量'],
            right: '20px',
            textStyle: {
              fontSize: 12,
              color: '#ccc'
            }*!/
          },
          color: ['#73CAFF'],
          tooltip: {},
          grid: {//坐标控制
            left: '3%',
            right: '3%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [//横坐标
            {
              type: 'category',
              // data: ['8月1日', '8月2日', '8月3日', '8月4日', '8月5日', '8月6日'],

              //去掉轴线和网格线
              "axisLine": {       //y轴
                "show": false
              },
              "axisTick": {       //y轴刻度线
                "show": false
              },
              splitLine: {//去掉网格线
                show: false
              },
            }
          ],

          yAxis: [//纵坐标
            {
              type: 'value',
              name: '单位:(元)',
              nameTextStyle: {
                fontWeight: 'normal',
                color: 'black'
              },
              //去掉轴线和网格线
              "axisLine": {       //y轴
                "show": false
              },
              "axisTick": {       //y轴刻度线
                "show": false
              },
              splitLine: {//去掉网格线
                show: false
              },

              // min: 0, //y轴的最小值
              // max: 70000, //y轴最大值
              // interval: 10000, //值之间的间隔
              //上面的三个值可以根据自己需求随意设置 不设置时会根据图中的值自动生成相应的值
            }
          ],
          series: [//鼠标移上去的文字
            {
              name: '当天车流总量',
              type: 'bar',
              barWidth: '60%',
              dimensions: ['8月1日', '8月2日', '8月3日', '8月4日', '8月5日', '8月6日'],
              dataset:{
                source: [68614, 71394, 68023, 68204, 55726, 63036],
              },
              // barWidth: 30,
              itemStyle: {
                normal: {
                  label: {//开启上方数字
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    top:'36px',
                    textStyle: { //数值样式
                      color: 'black',
                      fontSize: 14,
                      // fontWeight: 600
                    }
                  }
                }
              }

            }
          ]*!/
        })*/
        this.chart.clear();
        this.chart.setOption(data)
        // this.chart.showLoading();// 加载动画
      }
    }
  }

</script>

<style scoped>
  .bar{
    display: flex;
    justify-content: center;
    text-align: center;
  }
  .charts {
    width: 19rem;
    height: 19rem;
  }
</style>
