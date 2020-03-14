<template>
  <div class="line">
    <!--这是折線(多条)-->
    <v-chart :options="line"/>
  </div>
</template>

<script>

  export default {
    name: "LineData",
    data () {
      return {
        //  折线(ok)
        line: {
          title: {
            text: '折线图堆叠'
          },
          legend: {
            top: 30,//调节高度 同样还有left right bottom
            data: ['立方科學城廣場', '邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
          },
          grid: {//设置图标xy轴间距
            left: '3%',
            right: '5%',
            bottom: '3%',
            containLabel: true
          },

          toolbox: {
            show: true,
            feature: {
              /*dataZoom: {
                yAxisIndex: 'none'
              },*/
              /*dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},*/
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['8月1日', '8月2日', '8月2日', '8月2日', '8月2日', '8月2日', '8月2日']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '立方科學城廣場',
              type: 'line',
              stack: '总量',
              symbolSize: 10,   //设定实心点的大小
              animation: false,//false: hover圆点不缩放 .true:hover圆点默认缩放
              hoverAnimation: true,
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              symbolSize: 10,   //设定实心点的大小
              animation: false,//false: hover圆点不缩放 .true:hover圆点默认缩放
              hoverAnimation: true,
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              stack: '总量',
              symbolSize: 10,   //设定实心点的大小
              animation: false,//false: hover圆点不缩放 .true:hover圆点默认缩放
              hoverAnimation: true,
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '直接访问',
              type: 'line',
              stack: '总量',
              symbolSize: 10,   //设定实心点的大小
              animation: false,//false: hover圆点不缩放 .true:hover圆点默认缩放
              hoverAnimation: true,
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              symbolSize: 10,   //设定实心点的大小
              animation: false,//false: hover圆点不缩放 .true:hover圆点默认缩放
              hoverAnimation: true,
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        },

      }
    }
  }

</script>

<style scoped>
  .line{
    width: 100%;
    height:582px;
  }

</style>
