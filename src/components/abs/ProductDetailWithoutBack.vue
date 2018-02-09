<template>
  <div class="appH5_body" :class="isShowHeader ? 'paddintTop55': 'paddingTop0'">
    <div class="product-spinner" v-if="isProductLoading">
      <mt-spinner type="triple-bounce"></mt-spinner>
    </div>
    <div class="appH5_content" v-else>
      <div class="appH5_panel appH5_panel_mb">
          <div class="appH5_title">
              <span>产品要素</span>
          </div>
            <table class="appH5_list_two" v-if="productDetail.Basic!=null">
                <tr>
                  <td>产品名称</td>
                  <td>{{productDetail.Basic.DealNameChinese}}</td>
                </tr>
                <tr>
                  <td>产品分类</td>
                  <!-- <td v-if="isShowHeader"> -->
                  <td>
                    <div>{{productDetail.Basic.ProductType}}</div>
                    <div>&nbsp;└&nbsp;{{productDetail.Basic.DealType}}</div>
                    <div v-if="productDetail.Basic.AssetSubCategoryId != null">&nbsp;&nbsp;&nbsp;└&nbsp;{{productDetail.Basic.AssetSubCategory}}</div>
                  </td>
                  <!-- <td v-else>
                      <div><router-link to="/product"> <a href="javascript:;" style="color:#FEC447">{{productDetail.Basic.ProductType}}</a></router-link></div>
                      <div>&nbsp;└&nbsp;<router-link v-bind:to="'/product/'+productDetail.Basic.ProductTypeId+'/'+productDetail.Basic.DealTypeId"> <a href="javascript:;" style="color:#FEC447">{{productDetail.Basic.DealType}}</a></router-link></div>
                      <div v-if="productDetail.Basic.AssetSubCategoryId!=null">&nbsp;&nbsp;&nbsp;└&nbsp;{{productDetail.Basic.AssetSubCategory}}</div>
                  </td> -->
                </tr>
                <tr>
                <td>产品状态</td>
                <td>{{productDetail.Basic.CurrentStatus}}</td>
                </tr>
                <tr>
                <td>成立日期</td>
                <td v-if="productDetail.Basic.ClosingDate!=null">{{productDetail.Basic.ClosingDate.toString() | moment("YYYY年MM月DD日")}}</td>
                <td v-else>-</td>
                </tr>
                <tr>
                <td>发起机构</td>
                <td>
                    <div v-if="productDetail.Basic.DealOriginator!==null"><span v-for="(item, index) in productDetail.Basic.DealOriginator" :key="index" style="display:block">{{item}}</span></div>
                    <div v-else>-</div>
                </td>
                </tr>
                <tr>
                <td style="vertical-align: middle;">金额(亿)</td>
                <td class="appH5_font_largest appH5_color_red">{{productDetail.Basic.TotalOffering}}</td>
                </tr>
          </table>
    </div>
        <div class="appH5_panel appH5_panel_mb">
        <div class="appH5_title">
              <span>证券结构</span>
        </div>
        <div v-show="NoteStructureFlag">
            <div id="noteStructure"></div>
            
                <table class="structureTable appH5_color_white appH5_font_smaller" style="width:auto;margin-left: 1.3rem;" v-if="productDetail.NoteList!=null&&productDetail.NoteList.length!=0">
                    <tr>
                        <td class="text-center">
                            <div style="margin-left: 0.3rem;"><i class="Reimbursement"></i><span>已偿付</span></div>
                        </td>
                        <td class="text-center">
                             <div style="margin-left: 0.3rem;"><i class="Surplus"></i><span>剩余</span></div>
                        </td>
                    </tr>
                </table>
        </div>
        <div v-show="!NoteStructureFlag" class="appH5_color_details appH5_font_smaller" style="text-align:center"> <span>暂无数据</span> </div>
    </div>
    <div class="appH5_panel appH5_panel_mb">
        <div class="appH5_title">
              <span>证券列表</span>
        </div>
        <div v-if="productDetail.NoteList != null && productDetail.Basic!=null&&productDetail.NoteList.length!=0">
            <table class="appH5_table">
                <tr>
                    <th>简称</th>
                    <th class="text-right">初始(亿)</th>
                    <th class="text-right">利率</th>
                    <th class="text-right">期限(年)</th>
                    <th class="text-right">量化评级</th>
                    <th class="text-right">类型</th>
                </tr>
                <tr v-for="(item,index) in productDetail.NoteList" v-bind:key='index'>
                    <td><div class="appH5_white_space appH5_font_normal" style="width:0.8rem;">{{item.Name}}</div></td>
                    <td class="text-right"><span class="appH5_color_red">{{item.Notional}}</span></td>
                    <td class="text-right"><span class="appH5_color_skyblue">{{item.CurrentCoupon}}</span></td>
                    <td class="text-right"><span class="appH5_color_skyblue">{{item.CurrentWal}}</span></td>
                    <td class="text-center"><span class="appH5_color_skyblue">{{item.CurrentSuggestRatingCombineString==null||item.CurrentSuggestRatingCombineString==""?"-":item.CurrentSuggestRatingCombineString}}</span></td>
                    <td class="text-right"><span>{{item.RepaymentOfPrincipal.replace("型","")}}</span></td>
                </tr>
            </table>
        </div>
        <div v-else class="appH5_color_details appH5_font_smaller" style="text-align:center"> <span>暂无数据</span> </div>
    </div>
        <div class="appH5_panel">
            <div class="appH5_title">
                <span>证券偿付</span>
            </div>
            <div>
                <highcharts :options='options'></highcharts>
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

.paddingTop0 {
  padding-top: 0;
}
</style>
<style>
.structureTable {
    width: auto;
}
.structureTable {
  margin-top: 0.2rem;
}
.structureTable i {
  display: inline-block;
  width: 0.56rem;
  height: 0.3467rem;
  vertical-align: middle;
}
.structureTable tr td {
  padding-top: 0.1333rem;
  width: 3.12rem;
}
.Surplus {
  background-color: #615c55;
}
.Reimbursement {
  background-image: url("../../public/images/table_bg.png");
  background-repeat: repeat;
  margin-top: 0.03rem;
}
.structureTable span {
  vertical-align: middle;
  padding-left: 0.2rem;
}
</style>

<script>
import "@/public/css/structure.css";
import BusUtil from "./BusUtil";
import Vue from "vue";
import VueHighcharts from "vue-highcharts";
import Highcharts from "highcharts";
import util from "@/public/modules/expert/utils";
// some charts like solid gauge require `highcharts-more.js`, you can find it in official demo.
import * as chartTheme from "@/public/js/chartTheme";

import * as webApi from "@/config/api";
import axios from "axios";
import { NoteStructure } from "../../public/js/NoteStructure.js";

Vue.use(VueHighcharts, { Highcharts });
Vue.use(require('vue-moment'));
Highcharts.setOptions(chartTheme);

export default {
  name: "productDetailWithoutBack",
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
      NoteStructureFlag: true,
      isFetchDetailError: false,
      isExpertJump: false,
      isShowHeader: false
    };
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      var query = util.getQueryString();

      if (query.isShowHeader) {
        vm.isShowHeader = true;
        const busUtil = BusUtil.getInstance();
        busUtil.bus.$emit("showHeader", true);
        busUtil.bus.$emit("path", "expert.html?" + util.toQueryString(query) + "#" + from.path);
        busUtil.bus.$emit("headTitle", "产品要素");
      }
    });
  },
  mounted() {
    //clear all data cache
    this.productDetail = {};
    this.publishDate = "";
    this.noteConsTable = "";
    this.showChart=true;

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
    this.isProductLoading = true;
    const productId = util.isValidId(this.$route.params.dealId)
      ? this.$route.params.dealId
      : util.getQueryString().dealId;
    if (productId) {
      this.fetchProductDetail(productId, data => {
          this.productDetail = data;
          if (this.isShowHeader) {
            BusUtil.getInstance().bus.$emit("headTitle", data.Basic.DealName)
          }
          if (data.DealId != null && data.DealId > 0) {
            this.fetchDealStructure(data.DealId);
            this.fetchProductPaymentChart(data.DealId);
          }
      });
    }
  },
  updated() {
  },
  activated() {

  },

  methods: {
    fetchDealStructure(dealId) {
      axios(webApi.Security.structure.concat(["", dealId].join("/"))).then(
        response => {
          if (response.data.status == "ok") {
            this.NoteStructureFlag = true;
            NoteStructure({
              container: "noteStructure",
              data: response.data.data.Notes
            });
          } else {
            this.NoteStructureFlag = false;
          }
        }
      );
    },
    fetchProductDetail(id, callback) {
      // consoleconsole.log(webApi.Product.detail.concat(['',id].join('/')));
      axios(webApi.Product.detail.concat(["", id].join("/")))
        .then(response => {
          if (response.data.status == "ok") {
            const data = response.data.data;
            if (data) {
              this.isProductLoading = false;
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
      this.loading = false;
      this.isProductLoading = false;
      this.isFetchProductsError = true;
    },
    fetchProductPaymentChart(dealId) {
            var self = this;
            axios(webApi.Product.chart.concat(['', dealId].join('/')))
            .then((response) => {
                const json = response.data;
                if (json.status == "ok") {
                var chartData = json.data;
                var allSeries = [];
                var lineValue;
                var i = 0;
                var colors = chartTheme.colors;
                if (chartData && chartData.length > 0) {
                    var allSeriesLth = chartData.length;
                    var colorSeries = chartData.filter(function (item) { return item.Order > 100 }).length > 0 ?
                        Math.ceil(chartData.length / colors.length) : chartData.length;
                    for (var j = 0; j < colorSeries; j++) //get max color series
                        colors = colors.concat(colors);
                    var pSeries = chartData.filter(function (item) { return item.Order < 100 });
                    var lSeries = chartData.filter(function (item) { return item.Order > 100 && item.Order != 1000 });
                    var plotLine = chartData.filter(function (item) { return item.Order == 1000 });
                    var minDate = new Date(1970,1,1).valueOf();
                    pSeries.forEach(function (item, index) {
                        var point = [];
                        item.Points.forEach(function (e) {
                            point.push([new Date(e.X).valueOf() - minDate, e.Y*1]);
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
                        lSeries.forEach(function (item, index) {
                           var point = [];
                           item.Points.forEach(function (e) {
                              point.push([new Date(e.X).valueOf() - minDate, e.Y*1]);
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
                        lineValue = new Date(plotLine[0].Points[0].X).valueOf() - minDate;
                    }
                }
                        var option = {
                            title: {
                                text: ''
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
                                plotLines: [{
                                    color: "white",
                                    width: .8,
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
                                }],
                                plotBands: [{
                                    color: "#333",




                                    from: Date.UTC(2e3, 1, 1),
                                    to: lineValue
                                }]
                            },
                            yAxis: {
                                title: {
                                    enabled: !0,
                                    text: ""
                                },
                                labels: {
                                    format: "{value:.0f}"
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
                                formatter: function () {
                                    var t,
                                        e = new Date(this.x);
                                    return t = e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate() + "<br/>" + this.series.name + "剩余本金:<br/>" + Math.round(100 * this.y) / 100 + "%"
                                }
                            },
                            legend : {
                                style: {
                                    fontSize: '10px'
                                }
                            },
                            credits: {
                            href: '',
                            text: 'CNABS'
                            },
                            series: allSeries
                        };
                this.options = option;
                } else {
                    self.showChart = false;
                }
            });
        }


  }
};
</script>
