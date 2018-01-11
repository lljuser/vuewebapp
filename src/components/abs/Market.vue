<template>
<div class="appH5_body">
  <div id="root" class="appH5_content">
    <div class="appH5_panel  appH5_panel_mb">
<div class="appH5_title"><span>市场概要</span></div>
    <div>
      <table class="appH5_table">
        <tr>
          <th>分类</th>
          <th class="text-right">今年(单)</th>
          <th class="text-right">今年(亿)</th>
          <th class="text-right">累计(亿)</th>
        </tr>
        <tr v-if="marketSummary.length!=null&&marketSummary.length!=0&&index!=4" v-for="(product,index) in marketSummary">
          <td > <router-link v-bind:to="'/product/'+product.ProductTypeId"> <a href="javascript:;" style="color:#FEC447">{{product.SimpleProductType}}</a></router-link></td>
          <td class="text-right">{{product.DealCountCurrentYear}}</td>
          <td class="text-right appH5_color_red">{{product.BalanceCurrentYear}}</td>
          <td class="text-right">{{product.BalanceCumulative}}</td>
        </tr>
        <tr v-if="marketSummary.length!=null&&marketSummary.length!=0">
          <td><router-link to="/product"> <a href="javascript:;" style="color:#FEC447;font-weight:bold">{{marketSummary[4].SimpleProductType}}</a></router-link></td>
          <td class="text-right" style="font-weight:bold">{{marketSummary[4].DealCountCurrentYear}}</td>
          <td class="text-right appH5_color_red" style="font-weight:bold">{{marketSummary[4].BalanceCurrentYear}}</td>
          <td class="text-right" style="font-weight:bold">{{marketSummary[4].BalanceCumulative}}</td>
        </tr>
        <!-- <tr v-if="marketSummary.length!=0">
          <td > <router-link to="/product/2"> <a href="javascript:;" style="color:#FEC447">{{marketSummary[1].SimpleProductType}}</a></router-link></td>
          <td class="text-right">{{marketSummary[1].DealCountCurrentYear}}</td>
          <td class="text-right appH5_color_red">{{marketSummary[1].BalanceCurrentYear}}</td>
          <td class="text-right">{{marketSummary[1].BalanceCumulative}}</td>
        </tr>
        <tr v-if="marketSummary.length!=0">
          <td > <router-link to="/product/3"> <a href="javascript:;" style="color:#FEC447">{{marketSummary[2].SimpleProductType}}</a></router-link></td>
          <td class="text-right">{{marketSummary[2].DealCountCurrentYear}}</td>
          <td class="text-right appH5_color_red">{{marketSummary[2].BalanceCurrentYear}}</td>
          <td class="text-right">{{marketSummary[2].BalanceCumulative}}</td>
        </tr>
        <tr v-if="marketSummary.length!=0">
          <td > <router-link to="/product/4"> <a href="javascript:;" style="color:#FEC447">{{marketSummary[3].SimpleProductType}}</a></router-link></td>
          <td class="text-right">{{marketSummary[3].DealCountCurrentYear}}</td>
          <td class="text-right appH5_color_red">{{marketSummary[3].BalanceCurrentYear}}</td>
          <td class="text-right">{{marketSummary[3].BalanceCumulative}}</td>
        </tr>
        <tr v-if="marketSummary.length!=0">
          <td><router-link to="/product"> <a href="javascript:;" style="color:#FEC447;font-weight:bold">{{marketSummary[4].SimpleProductType}}</a></router-link></td>
          <td class="text-right" style="font-weight:bold">{{marketSummary[4].DealCountCurrentYear}}</td>
          <td class="text-right appH5_color_red" style="font-weight:bold">{{marketSummary[4].BalanceCurrentYear}}</td>
          <td class="text-right" style="font-weight:bold">{{marketSummary[4].BalanceCumulative}}</td>
        </tr> -->
      </table>
    </div>
  </div>
  <div class="appH5_panel">
    <div class="appH5_title"><span>发行统计</span></div>
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
        credits: {
          href: '',
          text: 'CNABS'
        },
      },
      marketSummary:[],
    };
  },
  created() {
   // this.fetchMarketSummary();
    // this.fetchPost();
  },
  mounted() {
    this.timer = setTimeout(() => {
      this.fetchMarketSummary(data=>{
        this.marketSummary=data;
        console.log(data);
      });
      this.fetchChartData();
    }, 600);
  },
  deactivated() {
    this.timer && clearTimeout(this.timer);
  },
  methods: {
    fetchMarketSummary(callback) {
      axios.post(webApi.Market.list).then((response)=>{
          const data=response.data.data;
          if(data){
              callback(data);
          }
      });
        // .then(response => response.json())
        // .then((json) => {
        //   this.marketSummary = json.data;
        //   console.log(json.data);
        // });
    },
    // fetchPost() {
    //   fetch(webApi.Market.list)
    //     .then(response => response.json())
    //     .then((json) => {
    //       this.list = json.data;
    //     });
    // },
    //
    fetchChartData() {
      axios.post(webApi.Market.chart)
        .then((response) => {
          const json = response.data
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
                text: ""
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
