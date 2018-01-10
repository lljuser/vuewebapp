<template>
<div class="appH5_body">
  <div id="root" class="appH5_content">
    <div class="appH5_panel  appH5_panel_mb">
<div class="appH5_title"><span>市场概要</span></div>
    <div>
      <table class="appH5_table">
        <tr>
          <th> </th>
          <th class="text-right">今年总数</th>
          <th class="text-right">今年总额(亿)</th>
          <th class="text-right">累计总额(亿)</th>
        </tr>
        <tr>
          <td > <router-link to="/product"> <a href="javascript:;" style="color:#FEC447">{{marketSummary[0].SimpleProductType}}</a></router-link></td>
          <td class="text-right">{{marketSummary[0].DealCountCurrentYear}}</td>
          <td class="text-right appH5_color_red">{{marketSummary[0].BalanceCurrentYear.toFixed(2)}}</td>
          <td class="text-right">{{marketSummary[0].BalanceCumulative.toFixed(2)}}</td>
        </tr>
        <tr>
          <td > <router-link to="/product"> <a href="javascript:;" style="color:#FEC447">{{marketSummary[1].SimpleProductType}}</a></router-link></td>
          <td class="text-right">{{marketSummary[1].DealCountCurrentYear}}</td>
          <td class="text-right appH5_color_red">{{marketSummary[1].BalanceCurrentYear.toFixed(2)}}</td>
          <td class="text-right">{{marketSummary[1].BalanceCumulative.toFixed(2)}}</td>
        </tr>
        <tr>
          <td > <router-link to="/product"> <a href="javascript:;" style="color:#FEC447">{{marketSummary[2].SimpleProductType}}</a></router-link></td>
          <td class="text-right">{{marketSummary[2].DealCountCurrentYear}}</td>
          <td class="text-right appH5_color_red">{{marketSummary[2].BalanceCurrentYear.toFixed(2)}}</td>
          <td class="text-right">{{marketSummary[2].BalanceCumulative.toFixed(2)}}</td>
        </tr>
        <tr>
          <td > <router-link to="/product"> <a href="javascript:;" style="color:#FEC447">{{marketSummary[3].SimpleProductType}}</a></router-link></td>
          <td class="text-right">{{marketSummary[3].DealCountCurrentYear}}</td>
          <td class="text-right appH5_color_red">{{marketSummary[3].BalanceCurrentYear.toFixed(2)}}</td>
          <td class="text-right">{{marketSummary[3].BalanceCumulative.toFixed(2)}}</td>
        </tr>
        <tr>
          <td><router-link to="/product"> <a href="javascript:;" style="color:#FEC447;font-weight:bold">{{marketSummary[4].SimpleProductType}}</a></router-link></td>
          <td class="text-right" style="font-weight:bold">{{marketSummary[4].DealCountCurrentYear}}</td>
          <td class="text-right appH5_color_red" style="font-weight:bold">{{parseFloat(marketSummary[0].BalanceCurrentYear.toFixed(2))+parseFloat(marketSummary[1].BalanceCurrentYear.toFixed(2))+parseFloat(marketSummary[2].BalanceCurrentYear.toFixed(2))+parseFloat(marketSummary[3].BalanceCurrentYear.toFixed(2)).toFixed(2)}}</td>
          <td class="text-right" style="font-weight:bold">{{(parseFloat(marketSummary[0].BalanceCumulative.toFixed(2))+parseFloat(marketSummary[1].BalanceCumulative.toFixed(2))+parseFloat(marketSummary[2].BalanceCumulative.toFixed(2))+parseFloat(marketSummary[3].BalanceCumulative.toFixed(2))).toFixed(2)}}</td>
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
import axios from 'axios';
// load these modules as your need 
import * as chartTheme from '@/public/js/chartTheme'; 
import * as webApi from '@/config/api';  
 
Highcharts.setOptions(chartTheme);  
Vue.use(VueHighcharts, { Highcharts });    
 
export default {
  name: 'market',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      list: [],
      options: {
        title: {
          text: '暂无数据'
        },
      },
      marketSummary:[],
    };
  },
  created() {
    this.fetchMarketSummary();
    this.fetchPost();
    this.fetchChartData();
  },
  methods: {
    fetchMarketSummary() {
      axios.post(webApi.Market.list).then((response)=>{
          this.marketSummary=response.data.data;
      });
        // .then(response => response.json())
        // .then((json) => {
        //   this.marketSummary = json.data;
        //   console.log(json.data);
        // });
    },
    fetchPost() {
      fetch(webApi.Market.list)
        .then(response => response.json())
        .then((json) => {
          this.list = json.data;
        });
    },
    fetchChartData() {
      fetch(webApi.Market.chart)
        .then(response => response.json())
        .then((json) => {
          if (json.status == "ok") {
            var chartData = json.data;
            var seriesList = [];
            var Xcategory = new Set();
            chartData.forEach(function (content,i) {
              content.Points.forEach(function (content,j) {
                Xcategory.add(content.X);
              });
            });
            var category = Array.from(Xcategory).sort();
            chartData.forEach(function (content) {
              var dataList = [];
              var tempAll = Array.from(category);
              content.Points.forEach(function (content) {
                if (tempAll.indexOf(content.X) != -1) {
                  tempAll.splice(tempAll.indexOf(content.X), 1, content.Y);
                }
              });
              var seriesData = [];
              tempAll.forEach(function (value,idx) {
                if (Number(value) != NaN) {
                  seriesData.push(value);
                } else {
                  seriesData.push(0);
                }
              });
              seriesList.push({ name: content.SeriesName, data: seriesData, type: "column" });
            });
            const data = {
            title: {
              text: '市场发行总览',
            },
            xAxis: {
              categories: category,
                labels: {
                  rotation: -45
                }
            },
            yAxis: [{
              title: {
                enabled: !0,
                text: "发行总额(亿)"
              },
              labels: {
                formatter: function () {
                  return Highcharts.numberFormat(this.value, 0, ".", ",") + ""
                }
              }
            }],
            plotOptions: {
              column: {
                stacking: 'normal',
                borderWidth: 0,
              }
            },
            tooltip: {
              useHTML: true,
              shared: true,
              formatter: function () {
                var idx = this.x.indexOf('Q');
                var show = this.x.substring(0, idx) + '第' + this.x.substring(idx + 1) + '季度';
                var s = '<b>' + show + '</b>';
                this.points.forEach(function (item) {
                  s += '<br/>' + '<span style="color:' + item.series.color + ';font-size: 14px;">' +
                  item.series.name + '</span>: <b>' +
                  Highcharts.numberFormat(item.y, 2, ".", ",") + '</b>亿';
                });
                return s;
              },
            },
            credits: {
              href: '',
              text: 'CNABS'
            },
            series: seriesList,
            };
            this.options = data;
          }
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
