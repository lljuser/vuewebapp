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
          <td > <router-link to="/product"> <a href="javascript:;" style="color:#FEC447">信贷ABS</a></router-link></td>
          <td class="text-right">1</td>
          <td class="text-right appH5_color_red">5.00</td>
          <td class="text-right">442.00</td>
        </tr>
        <tr>
          <td><router-link to="/product"> <a href="javascript:;" style="color:#FEC447">企业ABS</a></router-link></td>
          <td class="text-right">1</td>
          <td class="text-right appH5_color_red">1.00</td>
          <td class="text-right">1183.00</td>
        </tr>
        <tr>
          <td><router-link to="/product"> <a href="javascript:;" style="color:#FEC447">ABN</a></router-link></td>
          <td class="text-right">1</td>
          <td class="text-right appH5_color_red">10.00</td>
          <td class="text-right">67.00</td>
        </tr>
        <tr>
          <td><router-link to="/product"> <a href="javascript:;" style="color:#FEC447">保险ABS</a></router-link></td>
          <td class="text-right">1</td>
          <td class="text-right appH5_color_red">2.00</td>
          <td class="text-right">3.00</td>
        </tr>
        <tr>
          <td><router-link to="/product"> <a href="javascript:;" style="color:#FEC447;font-weight:bold">总计</a></router-link></td>
          <td class="text-right" style="font-weight:bold">11</td>
          <td class="text-right appH5_color_red" style="font-weight:bold">112.00</td>
          <td class="text-right" style="font-weight:bold">1113.00</td>
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
import * as webApi from '@/config/api'; 
 
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
          text: webApi.Product.list,
        },
        subtitle: {
          text: '数据来源：thesolarfoundation.com',
        },
        yAxis: {
          title: {
            text: '就业人数',
          },
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
      options: {}, 
    };
  },
  created() {
    this.fetchPost();
    this.fetchChartData();
  },
  methods: {
    fetchPost() {
      fetch(webApi.Demo.list)
        .then(response => response.json())
        .then((json) => {
          this.list = json.data;
        });
    },
    fetchChartData() {
      fetch('http://10.1.1.35/Demo/DemoProduct/getlist')//http://localhost:43400//MoMarket/GetIssueStatChartData
        .then(response => response.json())
        .then((json) => {
          var jsons = JSON.parse('{"status":"ok","code":200,"data":[{"SeriesName":"信贷资产证券化","Points":[{"X":"2014Q1","Y":482.60241608,"Tooltip":null,"DrillDown":null},{"X":"2014Q2","Y":356.36615223999996,"Tooltip":null,"DrillDown":null},{"X":"2014Q3","Y":885.0405880674,"Tooltip":null,"DrillDown":null},{"X":"2014Q4","Y":1095.7953164309,"Tooltip":null,"DrillDown":null},{"X":"2015Q1","Y":507.87413154959995,"Tooltip":null,"DrillDown":null},{"X":"2015Q2","Y":621.9506801299999,"Tooltip":null,"DrillDown":null},{"X":"2015Q3","Y":1224.2769074813002,"Tooltip":null,"DrillDown":null},{"X":"2015Q4","Y":1702.2315084219001,"Tooltip":null,"DrillDown":null},{"X":"2016Q1","Y":454.3756205078,"Tooltip":null,"DrillDown":null},{"X":"2016Q2","Y":891.4597926638,"Tooltip":null,"DrillDown":null},{"X":"2016Q3","Y":717.7313117586999,"Tooltip":null,"DrillDown":null},{"X":"2016Q4","Y":1844.9613266395,"Tooltip":null,"DrillDown":null},{"X":"2017Q1","Y":765.4709110354,"Tooltip":null,"DrillDown":null},{"X":"2017Q2","Y":1146.3399441247998,"Tooltip":null,"DrillDown":null},{"X":"2017Q3","Y":1314.0265738090004,"Tooltip":null,"DrillDown":null},{"X":"2017Q4","Y":2746.4548185118006,"Tooltip":null,"DrillDown":null},{"X":"2018Q1","Y":5,"Tooltip":null,"DrillDown":null},{"X":"2018Q4","Y":21.221049377699998,"Tooltip":null,"DrillDown":null}]},{"SeriesName":"企业资产证券化","Points":[{"X":"2014Q1","Y":34.7,"Tooltip":null,"DrillDown":null},{"X":"2014Q2","Y":107.66000000000001,"Tooltip":null,"DrillDown":null},{"X":"2014Q3","Y":120.73915,"Tooltip":null,"DrillDown":null},{"X":"2014Q4","Y":137.73,"Tooltip":null,"DrillDown":null},{"X":"2015Q1","Y":148.8614,"Tooltip":null,"DrillDown":null},{"X":"2015Q2","Y":362.769377,"Tooltip":null,"DrillDown":null},{"X":"2015Q3","Y":582.8169737311999,"Tooltip":null,"DrillDown":null},{"X":"2015Q4","Y":950.8796843599998,"Tooltip":null,"DrillDown":null},{"X":"2016Q1","Y":522.2803804100001,"Tooltip":null,"DrillDown":null},{"X":"2016Q2","Y":1296.3292174092,"Tooltip":null,"DrillDown":null},{"X":"2016Q3","Y":1543.18914522,"Tooltip":null,"DrillDown":null},{"X":"2016Q4","Y":1632.704784123501,"Tooltip":null,"DrillDown":null},{"X":"2017Q1","Y":1539.43924128,"Tooltip":null,"DrillDown":null},{"X":"2017Q2","Y":1592.5233529999998,"Tooltip":null,"DrillDown":null},{"X":"2017Q3","Y":2415.6591944099996,"Tooltip":null,"DrillDown":null},{"X":"2017Q4","Y":2879.2837889999987,"Tooltip":null,"DrillDown":null},{"X":"2018Q1","Y":2.94,"Tooltip":null,"DrillDown":null}]},{"SeriesName":"资产支持票据","Points":[{"X":"2014Q1","Y":35,"Tooltip":null,"DrillDown":null},{"X":"2014Q2","Y":10,"Tooltip":null,"DrillDown":null},{"X":"2014Q3","Y":21.2,"Tooltip":null,"DrillDown":null},{"X":"2014Q4","Y":23,"Tooltip":null,"DrillDown":null},{"X":"2015Q1","Y":20,"Tooltip":null,"DrillDown":null},{"X":"2015Q2","Y":12,"Tooltip":null,"DrillDown":null},{"X":"2015Q4","Y":3,"Tooltip":null,"DrillDown":null},{"X":"2016Q2","Y":33.68,"Tooltip":null,"DrillDown":null},{"X":"2016Q4","Y":132.8908,"Tooltip":null,"DrillDown":null},{"X":"2017Q1","Y":29.010257,"Tooltip":null,"DrillDown":null},{"X":"2017Q2","Y":84.286139,"Tooltip":null,"DrillDown":null},{"X":"2017Q3","Y":210.19182200000003,"Tooltip":null,"DrillDown":null},{"X":"2017Q4","Y":251.465719,"Tooltip":null,"DrillDown":null},{"X":"2018Q1","Y":10,"Tooltip":null,"DrillDown":null}]},{"SeriesName":"保险资产证券化","Points":[{"X":"2016Q1","Y":23.49,"Tooltip":null,"DrillDown":null},{"X":"2016Q4","Y":10,"Tooltip":null,"DrillDown":null},{"X":"2017Q2","Y":10,"Tooltip":null,"DrillDown":null}]}]}');
          if (jsons.status == "ok") {
            var chartData = jsons.data;
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
            Highcharts.setOptions({
              lang: {
                decimalPoint: '.',
                thousandsSep: ','
              }
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
                formatter: () => {
                  return Highcharts.numberFormat(this.value, 0, ".", ",") + ""
                }
              }
            },
            {
              min: 0,
              title: {
                enabled: !0,
                text: "发行总数"//"发行产品数量(个)"
              },
              opposite: !0
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
              href: 'https://cn-abs.com',
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
