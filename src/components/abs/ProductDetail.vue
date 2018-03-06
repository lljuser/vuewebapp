<template>
  <div class="appH5_body" id="productDetailDiv">
    <div class="product-spinner" v-if="isProductLoading">
      <mt-spinner type="triple-bounce"></mt-spinner>
    </div>
    <div class="appH5_content" v-else>
      <div class="appH5_panel appH5_panel_mb">
          <div v-if="productDetail.Basic!=null">
            <div>{{productDetail.Basic.DealNameChinese}}</div>
            <table class="appH5_list_five">
              <tr>
                <td colspan="2" rowspan="2" class="appH5_color_red">
                  <span class="appH5_font_largest">{{productDetail.Basic.TotalOffering}}</span>
                  <span class="appH5_font_normal">亿</span>
                </td>
                <td class="appH5_color_skyblue appH5_vertical_bottom appH5_font_smaller appH5_white_space appH5_padding_top12">
		              <div v-if="productDetail.Basic.ClosingDate!=null">
                    <span>{{productDetail.Basic.ClosingDate.toString() | moment("YYYY-MM-DD")}}</span>
                    <span>成立</span>
		              </div>
		              <div v-else>暂无成立时间</div>
                </td>
                <td class="appH5_color_skyblue appH5_vertical_bottom appH5_font_smaller appH5_white_space appH5_padding_top12">
                  {{productDetail.Basic.CurrentStatus}}
                </td>                                
              </tr>
              <tr>
                <td class="appH5_color_skyblue appH5_font_smaller appH5_white_space appH5_vertical_top">
                  {{productDetail.Basic.Exchange}}
                </td>  
                <td class="appH5_color_skyblue appH5_font_smaller appH5_white_space appH5_vertical_top">
                  {{productDetail.Basic.Reinvestment}}
                </td>                               
              </tr>
            </table> 
            <div class="appH5_inner_panel appH5_important_div">
              <div class="appH5_important_item">
                <div v-if="productDetail.Basic.DealOriginator!=null">
                  <div v-show="productDetail.Basic.DealOriginator.length>1" class="appH5_font_large appH5_margin_bottom10 appH5_ellipsis organEllipsis">{{productDetail.Basic.Originator}}</div>
                  <div v-show="productDetail.Basic.DealOriginator.length==1" class="appH5_color_link appH5_font_large appH5_margin_bottom10">
                    <router-link :to="`../../OrganDetail/${ productDetail.Basic.OriginatorId}${noheader?'?noheader=1':''}`" class="appH5_link appH5_ellipsis organEllipsis">
                    {{productDetail.Basic.Originator}}
                    </router-link>
                  </div>
                </div>
		            <div v-else class="appH5_font_large appH5_margin_bottom10 appH5_ellipsis organEllipsis">-</div>
                <div class="appH5_color_green appH5_font_smaller appH5_ellipsis organEllipsis">{{productDetail.Basic.OriginatorTitle}}</div>
              </div>
              <div class="appH5_important_item">
                <div v-if="productDetail.Basic.LeadUnderwriter!='-'" class="appH5_color_link appH5_font_large appH5_margin_bottom10">
                  <router-link :to="`../../OrganDetail/${ productDetail.Basic.LeadUnderwriterId}${noheader?'?noheader=1':''}`" class="appH5_link appH5_ellipsis organEllipsis">{{productDetail.Basic.LeadUnderwriter}}</router-link>
                </div>
                <div v-else class="appH5_font_large appH5_margin_bottom10 appH5_ellipsis organEllipsis">{{productDetail.Basic.LeadUnderwriter}}</div>
                <div class="appH5_color_green appH5_font_smaller appH5_ellipsis organEllipsis">{{productDetail.Basic.LeadUnderwriterTitle}}</div>
              </div>
              <div class="appH5_important_item">
                <div v-if="productDetail.Basic.Issuer!='-'" class="appH5_color_link appH5_font_large appH5_margin_bottom10">
                  <router-link :to="`../../OrganDetail/${ productDetail.Basic.IssuerId}${noheader?'?noheader=1':''}`" class="appH5_link appH5_ellipsis organEllipsis">{{productDetail.Basic.Issuer}}</router-link>
                </div>
                <div v-else class="appH5_font_large appH5_margin_bottom10 appH5_ellipsis organEllipsis">{{productDetail.Basic.Issuer}}</div>
                <div class="appH5_color_green appH5_font_smaller appH5_ellipsis organEllipsis">{{productDetail.Basic.IssuerTitle}}</div>
              </div>                         
            </div>           
          </div>          
    </div>
    <div class="appH5_panel appH5_panel_mb">
        <div class="appH5_title">
              <span>产品分类</span>
        </div>
        <div style="padding-left:0.4rem;" v-if="productDetail.Basic!=null">
        <div>
          <div v-if='noheader'>{{productDetail.Basic.ProductType}}</div>
          <router-link v-else-if='!isfromExp' :to="`/product/${productDetail.Basic.ProductTypeId}`">
            <a href="javascript:;" style="color:#FEC447">{{productDetail.Basic.ProductType}}</a>
          </router-link>
          <a v-else :href="`abs.html#/product/${productDetail.Basic.ProductTypeId}`" style="color:#FEC447">{{productDetail.Basic.ProductType}}</a>
        </div>
        <div style="display:inline-flex">
          &nbsp;└&nbsp;
          <div v-if='noheader'>{{productDetail.Basic.DealType}}</div>
          <router-link  v-else-if='!isfromExp' v-bind:to="`/product/${productDetail.Basic.ProductTypeId}/${productDetail.Basic.DealTypeId}`">
            <a href="javascript:;" style="color:#FEC447">{{productDetail.Basic.DealType}}</a>          
          </router-link>
          <a v-else :href="`abs.html#/product/${productDetail.Basic.ProductTypeId}/${productDetail.Basic.DealTypeId}`" style="color:#FEC447">{{productDetail.Basic.DealType}}</a>
        </div>
        <div v-if="productDetail.Basic.AssetSubCategoryId!=null"> 
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└&nbsp;
          {{productDetail.Basic.AssetSubCategory}}
        </div> 
        </div>                               
    </div>

    <!-- <div class="appH5_panel appH5_panel_mb">
        <div class="appH5_title">
              <span>参与专家</span>
        </div>
        <div>

        </div>
    </div> -->


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
        <div v-show="!NoteStructureFlag" class="appH5_color_details appH5_font_smaller" style="text-align:center"> <span>暂无数据</span></div>
    </div>
    <div class="appH5_panel appH5_panel_mb">
        <div class="appH5_title">
              <span>证券列表</span>
        </div>
        <div v-if="productDetail.NoteList != null && productDetail.Basic!=null&&productDetail.NoteList.length!=0">
            <table class="appH5_table">
                <tr>
                    <th></th>
                    <th>简称</th>
                    <th class="text-right">初始(亿)</th>
                    <th class="text-right">利率</th>
                    <th class="text-right">期限(年)</th>
                    <th class="text-right">量化评级</th>
                    <!-- <th class="text-right">类型</th> -->
                </tr>
                <tr v-for="(item,index) in productDetail.NoteList" v-bind:key='index'>
                    <td class="text-left" style="padding-left:0;padding-right:0">      
                      <div v-if="item.RepaymentOfPrincipal.indexOf('摊')>=0" class="appH5_square_ch_char appH5_bg_blue">摊</div>      
                      <div v-if="item.RepaymentOfPrincipal.indexOf('过')>=0" class="appH5_square_ch_char appH5_bg_passthrough">过</div>      
                    </td>
                    <td>
                      <div class="appH5_white_space appH5_font_normal" style="width:0.8rem;">
                        <div v-if="linkDisable">{{item.Name}}</div>
                        <router-link class="appH5_link" :to="`/securityDetail/${item.NoteId}${noheader?'?noheader=1':''}`">{{item.Name}}</router-link>

                        <!-- <router-link v-else-if="!isfromExp" :to="`/securityDetail/${item.NoteId}${noheader?'?noheader=1':''}`">{{item.Name}}</router-link> -->
                        <!-- <a style="color:#ffc446" v-else :href="`abs.html#/securityDetail/${item.NoteId}${noheader?'?noheader=1':''}`">{{item.Name}}</a> -->
                      </div>
                    </td>
                    <td class="text-right"><span class="appH5_color_red">{{item.Notional}}</span></td>
                    <td class="text-right"><span class="appH5_color_skyblue">{{item.CurrentCoupon}}</span></td>
                    <td class="text-right"><span class="appH5_color_skyblue">{{item.CurrentWal}}</span></td>
                    <td class="text-right"><span class="appH5_color_skyblue">{{item.CurrentSuggestRatingCombineString==null||item.CurrentSuggestRatingCombineString==""?"-":item.CurrentSuggestRatingCombineString}}</span></td>
                </tr>
            </table>
        </div>
        <div v-else class="appH5_color_details appH5_font_smaller" style="text-align:center"> <span>暂无数据</span> </div>
    </div>
        <div class="appH5_panel" v-if="showChart">
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
.organEllipsis {
  display: inline-block;
  width: 2.8rem;
}
</style>

<script>
import "@/public/css/structure.css";
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
import { NoteStructure } from "../../public/js/NoteStructure.js";
import util from "@/public/modules/expert/utils";
Vue.use(VueHighcharts, { Highcharts });
Highcharts.setOptions(chartTheme);
const busUtil = BusUtil.getInstance();
export default {
  name: "productDetail",
  data() {
    return {
      productDetail: {},
      publishDate: "",
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
      NoteStructureFlag: true,
      isFetchDetailError: false,
      tableFlag: 0,
      linkDisable: false,
      noheader: false,
      isfromExp: false
    };
  },

  beforeRouteEnter: (to, from, next) => {
    document.title="产品信息";
    next(vm => {
      if (!to.meta.fromExp) {
        if (
          from.path != "/" &&
          !new RegExp(/\/securityDetail\//i).test(from.path)
        ) {
          busUtil.bus.$emit("path", from.path);
        } else {
          busUtil.bus.$emit("path", "/product");
        }

        var fromtab = to.query.fromtab;
        var backPathstr = "";
        // switch (fromtab) {
        //   case "securityDetail": {
        //     //vm.linkDisable=true;
        //     backPathstr = "/securityDetail/" + to.query.id;
        //     break;
        //   }
        //   case "organDetail": {
        //     backPathstr = "/organDetail/" + to.query.id;
        //     break;
        //   }
        //   case "organDeal": {
        //     vm.linkDisable = false;
        //     backPathstr = "/organDeal/" + to.query.dealid;
        //     break;
        //   }
        //   default: {
        //     vm.linkDisable = false;
        //     break;
        //   }
        // }
        // if (backPathstr != "") {
        //   busUtil.bus.$emit("path", backPathstr);
        // }

        if (vm.$route.query.noheader == "1") {
          busUtil.bus.$emit("noHeader", true);
          document.getElementById("productDetailDiv").style.paddingTop = 0;
          // vm.linkDisable = true;
          vm.noheader = true;
          
        } else {
          busUtil.bus.$emit("noHeader", false);
          document.getElementById("productDetailDiv").style.paddingTop = "56px";
          vm.noheader = false;
        }
      } else {
        busUtil.bus.$emit("path", "fromAbs");
        vm.linkDisable = false;
        vm.isfromExp = true;
        var querys = util.getQueryString();
        if (
          (to.query.isShowHeader == null || to.query.isShowHeader == false) &&
          !new RegExp(/isShowHeader=true/i).test(location.href)
        ) {
          busUtil.bus.$emit("showHeader", false);
          vm.noheader=true;
          document.getElementById("productDetailDiv").style.paddingTop = 0;
        } else {
          busUtil.bus.$emit("showHeader", true);
          busUtil.bus.$emit("showClose", true, querys.path);
          document.getElementById("productDetailDiv").style.paddingTop = "56px";
        }
      }
    });
  },

  created() {
    busUtil.bus.$emit("showHeader", true);
    busUtil.bus.$emit("headTitle", "产品信息");
    this.tableFlag = 0;
    if (this.$route.meta.fromExp) {
      // this.linkDisable = true;
      this.LoadData();
    }
  },
  mounted() {
    this.isProductLoading = true;
  },
  updated() {},
  activated() {
    this.LoadData();
  },

  methods: {
    LoadData() {
      //clear all data cache
      this.showChart = true;
      this.isProductLoading = true;
      this.productDetail = {};
      this.publishDate = "";
      this.noteConsTable = "";
      this.showChart = true;
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
      busUtil.bus.$emit("showHeader", true);
      busUtil.bus.$emit("headTitle", "产品信息");
      this.id = this.$route.params.id;

      if (this.id) {
        setTimeout(() => {
          this.fetchProductDetail(this.id, data => {
            // busUtil.bus.$emit('headTitle', data.Basic.DealName);
            this.productDetail = data;
            this.isProductLoading = false;
            if (data.DealId != null && data.DealId > 0) {
              this.fetchDealStructure(this.id);
              this.tableFlag = 0;
            }
          });
        }, 600);
        setTimeout(() => {
          this.fetchProductPaymentChart(this.id);
          //this.fetchDealStructure(this.id);
        }, 600);
      }
      busUtil.bus.$emit("showHeader", true);
      // busUtil.bus.$emit("path", "/product");
    },

    fetchDealStructure(dealId) {
      axios(webApi.Security.structure.concat(["", dealId].join("/"))).then(
        response => {
          if (response.data.status == "ok") {
            this.NoteStructureFlag = true;
            NoteStructure({
              container: "noteStructure",
              data: response.data.data.Notes,
              fromExp: this.isfromExp,
              noheader:this.noheader
            });
          } else {
            this.NoteStructureFlag = false;
          }
        }
      );
    },
    fetchProductDetail(id, callback) {
      axios(webApi.Product.detail.concat(["", id].join("/")))
        .then(response => {
          if (response.data.status == "ok") {
            const data = response.data.data;
            if (data) {
              callback(data);
            } else {
              this.doCatch();
            }
          } else {
            Toast(response.data.data);
            this.isProductLoading = false;
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
