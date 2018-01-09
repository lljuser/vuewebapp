<template>
<div class="appH5_body">
  <div id="root" class="appH5_content">
    <div class="appH5_panel  appH5_panel_mb">
<div class="appH5_title"><span>市场概要</span></div>
    <div>
      <table class="appH5_table">
        <tr>
          <th> </th>
          <th>今年总数</th>
          <th>今年总额(亿)</th>
          <th>累计总额(亿)</th>
        </tr>
        <tr>
          <td>信贷ABS</td>
          <td class="text-right">1</td>
          <td class="text-right">5</td>
          <td class="text-right">442</td>
        </tr>
        <tr>
          <td>企业ABS</td>
          <td class="text-right">0</td>
          <td class="text-right">0</td>
          <td class="text-right">1183</td>
        </tr>
        <tr>
          <td>ABN</td>
          <td class="text-right">1</td>
          <td class="text-right">10</td>
          <td class="text-right">67</td>
        </tr>
        <tr>
          <td>保险ABS</td>
          <td class="text-right">1</td>
          <td class="text-right">2</td>
          <td class="text-right">3</td>
        </tr>
        <tr>
          <td>总计</td>
          <td class="text-right">11</td>
          <td class="text-right">112</td>
          <td class="text-right">1113</td>
        </tr>
      </table>
    </div>
  </div>
  <div class="appH5_panel">
    <div class="appH5_title" style="margin-top:0.25rem"><span>发行统计</span></div>
    <div>
      <highcharts :options='options'></highcharts>
    </div>
  </div>
      
  </div>

</div>

</template>

<script>
import Vue from 'vue';
import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts';

// load these modules as your need
import loadStock from 'highcharts/modules/stock';
import loadMap from 'highcharts/modules/map';
import loadDrilldown from 'highcharts/modules/drilldown';
// some charts like solid gauge require `highcharts-more.js`, you can find it in official demo.
import loadHighchartsMore from 'highcharts/highcharts-more';
import loadSolidGauge from 'highcharts/modules/solid-gauge';
import * as chartTheme from '@/public/js/chartTheme';

loadStock(Highcharts);
loadMap(Highcharts);
loadDrilldown(Highcharts);
loadHighchartsMore(Highcharts);
loadSolidGauge(Highcharts); 
Vue.use(VueHighcharts, { Highcharts }); 

Highcharts.setOptions(chartTheme); 

export default {
  name: 'market',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      list: [],
      options: {
        title: {
          text: '2010 ~ 2016 年太阳能行业就业人员发展情况',
        },
        subtitle: {
          text: '数据来源：thesolarfoundation.com',
        },
        yAxis: {
          title: {
            text: '就业人数',
          },
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false,
            },
            pointStart: 2010,
          },
        },
        series: [
          {
            name: '安装，实施人员',
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
          },
          {
            name: '工人',
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
          },
          {
            name: '销售',
            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
          },
          {
            name: '项目开发',
            data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
          },
          {
            name: '其他',
            data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom',
                },
              },
            },
          ],
        },
      },
    };
  },
  created() {
    this.fetchPost();
  },
  methods: {
    fetchPost() {
      fetch('http://10.1.1.35/Demo/DemoProduct/getlist')
        .then(response => response.json())
        .then((json) => {
          this.list = json.data;
        });
    },
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
