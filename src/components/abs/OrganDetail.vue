<template>
  <div class="appH5_body">
    <div class="product-spinner" v-if="isProductLoading">
      <mt-spinner type="triple-bounce"></mt-spinner>
    </div>

    <div class="appH5_content" v-else>
      <div>
        <div class="appH5_panel appH5_panel_mb">
          <div class="appH5_title">
              <span>{{productDetail.Basic.DealNameChinese}}</span>
          </div>
          <!-- 机构单页-资产方 -->
          <div v-if="1>0">
              <table class="appH5_list_two" v-if="productDetail.Basic!=null">
                <tr>
                    <td>总资产</td>
                    <td>{{productDetail.Basic.TotalOffering}}(亿)</td>
                </tr>   
                <tr>
                    <td>资产负债率</td>
                    <td>{{productDetail.Basic.TotalOffering}}%</td>
                </tr> 
                <tr>
                    <td>企业性质</td>
                    <td>{{productDetail.Basic.CurrentStatus}}</td>
                </tr> 
                <tr>
                    <td>成立日期</td>
                    <td>2017-11-18</td>
                </tr>   
                <tr>
                    <td>公司网址</td>
                    <td>http://cn.bing.com/</td>
                </tr>                                                                                             
              </table> 
          </div>
          <!-- 机构单页-资产方-END -->

          <!-- 机构单页 -->
          <div v-if="1>2">
              <table class="appH5_list_two" v-if="productDetail.Basic!=null">                  
                <tr>
                    <td>机构网址</td>
                    <td>http://cn.bing.com/</td>
                </tr> 
              </table>
          </div>         
          <!-- 机构单页-END -->
          </div>

          <div class="organIconsDiv appH5_float_right appH5_panel appH5_panel_mb">
              <div class="appH5_float_left organIconDiv"> 
                <router-link :to="`/institutionalExperts/1`"> 
                  <a href="javascript:;" style="color:#FEC447">
                    <div>
                      <font-awesome-icon :icon="['far', 'user']" class="appH5_icon" />
                      <div style="color:#fff;">机构专家</div>
                    </div>                  
                  </a>
                </router-link>               
              </div>
              <div class="appH5_float_left organIconDiv"> 
                <router-link :to="`/organDeal/1`"> 
                  <a href="javascript:;" style="color:#FEC447">
                    <div>
                      <font-awesome-icon :icon="['far', 'chart-bar']" class="appH5_icon" />
                      <div style="color:#fff;">参与项目</div>
                    </div>                  
                  </a>
                </router-link>               
              </div>
              <div class="appH5_float_left organIconDiv"> 
                <router-link :to="`/institutionalArticle/1`"> 
                  <a href="javascript:;" style="color:#FEC447">
                    <div>
                      <font-awesome-icon :icon="['far', 'edit']" class="appH5_icon"/>
                      <div style="color:#fff;">机构文章</div>
                    </div>                  
                  </a>
                </router-link>               
              </div>                            
          </div>

          <div style="clear:both"></div>

          <div class="appH5_panel appH5_panel_mb">
              <div class="appH5_title">
                  <span>机构奖章</span>
              </div>
          </div>

          <div class="appH5_panel appH5_panel_mb">
              <div class="appH5_title">
                  <span>参与ABS产品</span>
              </div>
              <table class="appH5_list_two" v-if="productDetail.Basic!=null">
                <tr>
                    <td>总数</td>
                    <td>{{productDetail.Basic.TotalOffering}}单</td>
                </tr>
                <tr>
                    <td>总额</td>
                    <td>{{productDetail.Basic.TotalOffering}}亿</td>
                </tr>                                   
              </table>
          </div> 

          <div class="appH5_panel appH5_panel_mb">
              <div class="appH5_title">
                  <span>机构简介</span>
              </div>
              <div>
                  上海联合金融机构简介
              </div>              
          </div>

          <div class="appH5_panel appH5_panel_mb">
              <div class="appH5_title">
                  <span>机构专家</span>
              </div>
              <div>
                  上海联合机构专家
              </div>              
          </div>                  
      </div>
    </div>
  </div>
</template>

<style scoped>
.backTablePic {
  float: left;
  margin: 4px 4px 4px 2px;
  width: 12px;
  height: 11px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAGCAYAAAD37n+BAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABPSURBVChTY1y3esV/BiDYtX09iGJw8wwE0zAAE/f39QPTTGCSBMCYkRQOtgFmMifLXzC9cfMmMI1uI+k2wPwAA+hu/v6HGUzDxEm0gYEBALKKGjTje4yiAAAAAElFTkSuQmCC);
  background-repeat: repeat;
}

.organIconsDiv {
  width: 100%;
}
.organIconDiv {
  width: 33%;
  text-align: center;
}
.promptContent {
  color: #fec447;
  font-size: 14px;
}
</style>
<style>

</style>

<script>
import BusUtil from "./BusUtil";
import Vue from "vue";
import VueHighcharts from "vue-highcharts";
import Highcharts from "highcharts";
import getParams from "../../public/js/getParams";

// some charts like solid gauge require `highcharts-more.js`, you can find it in official demo.
import * as chartTheme from "@/public/js/chartTheme";

import * as webApi from "@/config/api";
import axios from "axios";
import { Toast } from "mint-ui";
Vue.use(VueHighcharts, { Highcharts });
Highcharts.setOptions(chartTheme);

export default {
  name: "organDetail",
  data() {
    return {
      productDetail: {},
      publishDate: "",
      noteConsTable: "",
      isProductLoading: false,
      options: {
        title: {
          text: "暂无数据"
        },
        credits: {
          href: "",
          text: "CNABS"
        }
      },
      chartWidthRem: 3,
      chartWidthPx: 280,
      showChart: true,
      isFetchDetailError: false,
      tableFlag: 0
    };
  },
  created() {
    const busUtil = BusUtil.getInstance();
    busUtil.bus.$emit("showHeader", true);
    busUtil.bus.$emit("path", "/organ");
    busUtil.bus.$emit("headTitle", "");
    this.tableFlag = 0;
  },
  mounted() {
    this.isProductLoading = true;
  },
  updated() {
    if (this.noteConsTable.indexOf("table") != -1 && this.tableFlag == 0) {
      // if(this.productDetail.NoteList!=null&&this.productDetail.NoteList.length>0){
      //     let num=document.getElementById("structureTable").childNodes[0].childElementCount;
      //     if(num>4){
      //         this.chartWidthPx=320;
      //     }else{
      //         this.chartWidthPx=260;
      //     }
      // }
      var paidList = document.getElementsByClassName("divHasPaid");
      for (var i = 0; i < paidList.length; i++) {
        paidList[i].style.backgroundImage =
          "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAGCAYAAAD37n+BAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABPSURBVChTY1y3esV/BiDYtX09iGJw8wwE0zAAE/f39QPTTGCSBMCYkRQOtgFmMifLXzC9cfMmMI1uI+k2wPwAA+hu/v6HGUzDxEm0gYEBALKKGjTje4yiAAAAAElFTkSuQmCC)";
      }
      var bgList = document.getElementsByClassName("structure_bg");
      for (var i = 0; i < bgList.length; i++) {
        bgList[i].style.backgroundColor = "#B7AFA5";
        var aList = bgList[i].getElementsByTagName("a");
        for (var j = 0; j < aList.length; j++) {
          aList[j].href = "javascript:;";
          aList[j].title = "";
        }
      }
      var nameList = document.getElementsByClassName("str_n");
      for (var k = 0; k < nameList.length; k++) {
        nameList[k].style.color = "black";
      }
      var pctList = document.getElementsByClassName("str_npct");
      for (var x = 0; x < pctList.length; x++) {
        pctList[x].style.color = "#06c";
      }
      this.tableFlag = 1;
    }
  },
  activated() {
    //clear all data cache
    this.isProductLoading = true;
    this.productDetail = {};
    this.publishDate = "";
    this.noteConsTable = "";
    this.options = {
      title: {
        text: "暂无数据"
      },
      credits: {
        href: "",
        text: "CNABS"
      }
    };
    window.scrollTo(0, 0);
    const busUtil = BusUtil.getInstance();
    busUtil.bus.$emit("showHeader", true);
    busUtil.bus.$emit("path", "/organ");
    busUtil.bus.$emit("headTitle", "");
    this.id = this.$route.params.id;
    if (this.id) {
      setTimeout(() => {
        this.fetchProductDetail(this.id, data => {
          busUtil.bus.$emit("headTitle", data.Basic.DealName);
          this.productDetail = data;
          this.isProductLoading = false;
          if (data.DealId != null && data.DealId > 0) {
            this.fetchNoteConsTable(data.DealId, 280, 200);
            this.tableFlag = 0;
          }
        });
      }, 600);
      setTimeout(() => {
        this.fetchProductPaymentChart(this.id);
      }, 600);
    }
    busUtil.bus.$emit("showHeader", true);
    busUtil.bus.$emit("path", "/organ");
  },

  methods: {
    fetchNoteConsTable(dealId, width, height) {
      axios(
        webApi.Product.structure + "/" + dealId + "/" + width + "/" + height
      ).then(response => {
        // console.log(response);
        if (response.data.status == "ok") {
          this.noteConsTable = response.data.data;
        }
      });
    },
    fetchProductDetail(id, callback) {
      // consoleconsole.log(webApi.Product.detail.concat(['',id].join('/')));
      axios(webApi.Product.detail.concat(["", id].join("/")))
        .then(response => {
          if (response.data.status == "ok") {
            const data = response.data.data;
            if (data) {
              callback(data);
            } else {
              this.doCatch();
            }
          }
        })
        .catch(error => {
          this.doCatch();
        });
    },
    doCatch() {
      Toast("服务器繁忙，请重试！");
      this.isProductLoading = false;
      this.isFetchDetailError = true;
    },
    fetchProductPaymentChart(dealId) {
      var self = this;
      axios(webApi.Product.chart.concat(["", dealId].join("/"))).then(
        response => {
          const json = response.data;
          if (json.status == "ok") {
            var chartData = json.data;
            var allSeries = [];
            var lineValue;
            var i = 0;
            var colors = chartTheme.colors;
            if (chartData && chartData.length > 0) {
              var allSeriesLth = chartData.length;
              var colorSeries =
                chartData.filter(function(item) {
                  return item.Order > 100;
                }).length > 0
                  ? Math.ceil(chartData.length / colors.length)
                  : chartData.length;
              for (
                var j = 0;
                j < colorSeries;
                j++ //get max color series
              )
                colors = colors.concat(colors);
              var pSeries = chartData.filter(function(item) {
                return item.Order < 100;
              });
              var lSeries = chartData.filter(function(item) {
                return item.Order > 100 && item.Order != 1000;
              });
              var plotLine = chartData.filter(function(item) {
                return item.Order == 1000;
              });
              var minDate = new Date(1970, 1, 1).valueOf();
              pSeries.forEach(function(item, index) {
                var point = [];
                item.Points.forEach(function(e) {
                  point.push([new Date(e.X).valueOf() - minDate, e.Y * 1]);
                });
                allSeries.push({
                  name: item.SeriesName,
                  data: point,
                  dashStyle: item.Type,
                  step: true,
                  color: colors[i]
                });
                i++;
              });
              if (lSeries.length > 0) {
                i = 0;
                lSeries.forEach(function(item, index) {
                  var point = [];
                  item.Points.forEach(function(e) {
                    point.push([new Date(e.X).valueOf() - minDate, e.Y * 1]);
                  });
                  allSeries.push({
                    name: item.SeriesName,
                    data: point,
                    dashStyle: item.Type,
                    step: true,
                    color: colors[i],
                    lineWidth: 3
                  });
                  i++;
                });
              }
              if (plotLine.length == 1) {
                lineValue =
                  new Date(plotLine[0].Points[0].X).valueOf() - minDate;
              }
            }
            var option = {
              title: {
                text: ""
              },
              xAxis: {
                type: "datetime",
                dateTimeLabelFormats: {
                  second: "%Y-%m-%d %H:%M:%S",
                  minute: "%Y-%m-%d %H:%M",
                  hour: "%Y-%m-%d %H:%M",
                  day: "%Y-%m-%d",
                  week: "%Y.%m",
                  month: "%Y.%m",
                  year: "%Y.%m"
                },
                plotLines: [
                  {
                    color: "white",
                    width: 0.8,
                    value: lineValue,
                    dashStyle: "dash",
                    label: {
                      text: plotLine[0].Points[0].X,
                      verticalAlign: "middle",
                      textAlign: "left",
                      style: {
                        color: "#E0E0E3"
                      }
                    }
                  }
                ],
                plotBands: [
                  {
                    color: "#333",
                    from: Date.UTC(2e3, 1, 1),
                    to: lineValue
                  }
                ]
              },
              yAxis: {
                title: {
                  enabled: !0,
                  text: ""
                },
                labels: {
                  format: "{value:.0f}%"
                },
                max: 100
              },
              plotOptions: {
                series: {
                  marker: {
                    enabled: !1
                  }
                }
              },
              tooltip: {
                formatter: function() {
                  var t,
                    e = new Date(this.x);
                  return (t =
                    e.getFullYear() +
                    "-" +
                    (e.getMonth() + 1) +
                    "-" +
                    e.getDate() +
                    "<br/>" +
                    this.series.name +
                    "剩余本金:<br/>" +
                    Math.round(100 * this.y) / 100 +
                    "%");
                }
              },
              legend: {
                style: {
                  fontSize: "10px"
                }
              },
              credits: {
                href: "",
                text: "CNABS"
              },
              series: allSeries
            };
            this.options = option;
          } else {
            self.showChart = false;
          }
        }
      );
    }
  }
};
</script>
