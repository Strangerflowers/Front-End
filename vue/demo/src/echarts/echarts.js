import Vue from 'vue'
// import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue
import ECharts from 'vue-echarts/components/ECharts'

// import ECharts from 'vue-echarts/dist/vue-echarts';

// import ECharts from 'vue-echarts'

import 'echarts/lib/chart/line'
//柱状组件
import 'echarts/lib/chart/bar'
//polar图
import 'echarts/lib/component/polar'
import 'echarts/lib/component/axis'
//圆饼图
import 'echarts/lib/chart/pie';

//全部
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/radar';

import 'echarts/lib/chart/map';
import 'echarts/lib/chart/treemap';
import 'echarts/lib/chart/graph';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/chart/funnel';
import 'echarts/lib/chart/parallel';
import 'echarts/lib/chart/sankey';
import 'echarts/lib/chart/boxplot';
import 'echarts/lib/chart/candlestick';
import 'echarts/lib/chart/effectScatter';
import 'echarts/lib/chart/lines';
import 'echarts/lib/chart/heatmap';

import 'echarts/lib/component/graphic';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/legend';//小图标
import 'echarts/lib/component/tooltip';//文字提示
import 'echarts/lib/component/polar';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/parallel';
import 'echarts/lib/component/singleAxis';
import 'echarts/lib/component/brush';

import 'echarts/lib/component/title';//标题栏

import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/visualMap';

import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/markArea';

import 'echarts/lib/component/timeline';
import 'echarts/lib/component/toolbox';//导入工具栏

import 'zrender/lib/vml/vml';


// 提示框和title
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
Vue.component('v-chart', ECharts);
// Vue.use(ECharts);
// export default

