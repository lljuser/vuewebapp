<template>
  <div class="appH5_body" style="margin-top:-.32rem;" id="securityDetailDiv">
    <div class="product-spinner" v-if="isSecurityLoading">
      <mt-spinner type="triple-bounce"></mt-spinner>
    </div>
    <div class="appH5_content" v-else  style="margin-top:0;">
        <div v-if="securityDetail.Basic!=null">
            <div class="appH5_panel appH5_color_white appH5_panel_mb appH5_font_large" style="margin-top: 12px;">
                {{securityDetail.Basic.Description}}
            </div>
            <div class="appH5_panel appH5_panel_mb" style="padding-top:0px;">
                <table class="appH5_list_five">
                    <tr>
                        <td colspan="2" rowspan="2" class="appH5_color_red">
                            <span class="appH5_font_largest" v-if="securityDetail.Basic.Notional>=10">{{Math.round(securityDetail.Basic.Notional)}}</span>
                            <span class="appH5_font_largest" v-else>{{securityDetail.Basic.Notional}}</span>
                            <span class="appH5_font_normal">亿</span>
                        </td> 
                        <td class="appH5_color_skyblue appH5_vertical_bottom appH5_font_smaller appH5_white_space appH5_padding_top12">{{securityDetail.Basic.DealType}}</td> 
                        <td v-if="securityDetail.Basic.CurrentCoupon!=null&&securityDetail.Basic.CurrentCoupon!=''&&securityDetail.Basic.CurrentCoupon!='-'" class="appH5_color_skyblue appH5_vertical_bottom appH5_font_smaller appH5_white_space appH5_padding_top12">{{securityDetail.Basic.CurrentCoupon}}%</td> 
                        <td v-else class="appH5_color_skyblue appH5_vertical_bottom appH5_font_smaller appH5_white_space appH5_padding_top12">-</td>
                        <td class="appH5_color_skyblue appH5_vertical_bottom appH5_font_smaller appH5_white_space text-right appH5_padding_top12" style="padding-right:0;">{{securityDetail.Basic.SimpleExchange}}</td>
                    </tr>
                    <tr>
                        <td v-if="securityDetail.Basic.CurrentRatingCombine==null||securityDetail.Basic.CurrentRatingCombine==''||securityDetail.Basic.CurrentRatingCombine=='NR'||securityDetail.Basic.CurrentRatingCombine=='NR/NR'" class="appH5_color_skyblue appH5_font_smaller appH5_white_space appH5_vertical_top">无评级</td> 
                        <td v-else class="appH5_color_skyblue appH5_font_smaller appH5_white_space appH5_vertical_top">{{securityDetail.Basic.CurrentRatingCombine}}</td> 
                        <td class="appH5_color_skyblue appH5_font_smaller appH5_white_space appH5_vertical_top">{{securityDetail.Basic.CurrentWal!=null&&securityDetail.Basic.CurrentWal!=""?securityDetail.Basic.CurrentWal+"Y":"-"}}</td> 
                        <td class="appH5_color_skyblue appH5_font_smaller appH5_white_space appH5_vertical_top text-right" style="padding-right:0;">{{securityDetail.Basic.RepaymentOfPrincipal}}</td>
                    </tr>
                </table>
                <div class="appH5_inner_panel appH5_important_div">
                    <div class="appH5_important_item">
                        <div v-if="securityDetail.Basic.QuantRating==null||securityDetail.Basic.QuantRating==''||securityDetail.Basic.QuantRating=='NR'||securityDetail.Basic.QuantRating=='NR/NR'" class="appH5_font_large appH5_margin_bottom10">无评级</div> 
                        <div v-else class="appH5_font_large appH5_margin_bottom10">{{securityDetail.Basic.QuantRating}}</div> 
                        <div class="appH5_color_green appH5_font_smaller">量化评级</div>
                    </div>  
                    <div class="appH5_important_item">
                        <div v-if="securityDetail.Basic.QuantYield!=null&&securityDetail.Basic.QuantYield!=''&&securityDetail.Basic.QuantYield!='-'" class="appH5_font_large appH5_margin_bottom10">{{securityDetail.Basic.QuantYield}}%</div>
                        <div v-else class="appH5_font_large appH5_margin_bottom10">-</div>
                        <div class="appH5_color_green appH5_font_smaller">收益率</div>
                    </div>
                    <div class="appH5_important_item">
                        <div class="appH5_font_large appH5_margin_bottom10">{{securityDetail.Basic.QuantPrice!=null&&securityDetail.Basic.QuantPrice!=""?securityDetail.Basic.QuantPrice:"-"}}</div> 
                        <div class="appH5_color_green appH5_font_smaller">量化定价</div>
                    </div>
                </div>
            </div>
        <!-- 证券结构 -->
        <div class="appH5_panel securityStructure appH5_panel_mb" v-show="NoteStructureFlag">
            <p class="panel-title appH5_color_details appH5_font_larger">
                <span class="titLine appH5_fl"></span>
                <span class="appH5_fl appH5_color_white">证券结构</span>
                <div class="clearfix"></div>
            </p>
            <div class="appH5martop">
                <div id="noteStructure" class="text-center">

                </div>
                <table class="structureTable appH5_color_white appH5_font_smaller" style="margin-left: -.35rem!important;">
                    <tr>
                        <td class="text-center">
                             <div style="margin-left: 0.6rem;"><i class="Surplus"></i><span>剩余</span></div>
                        </td>
                        <td class="text-center">
                            <div style="margin-left: 0.1rem;"><i class="Reimbursement"></i><span>已偿付</span></div>
                            </td>
                        <td class="text-left">
                             <div style="margin-left: 0.5rem;"><i class="CurrentSecurities"></i><span>当前证券</span></div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <!-- 产品分类 -->
        <div class="appH5_panel securityStructure appH5_panel_mb">
            <p class="panel-title appH5_color_details appH5_font_larger">
                <span class="titLine appH5_fl"></span>
                <span class="appH5_fl appH5_color_white">产品分类</span>
                <div class="clearfix"></div>
            </p>
            <div class="appH5martop proList">
                <span style="color:white">{{securityDetail.Basic.ProductType}}</span>
                <div style="margin-left:0;">
                    <span>L</span>
                   {{securityDetail.Basic.DealType}}
                    <div v-if="securityDetail.Basic.AssetSubCategory!=null&&securityDetail.Basic.AssetSubCategory!=''">
                        <span>L</span>
                        <span style="color:white">{{securityDetail.Basic.AssetSubCategory}}</span>
                        <div>
                            <span>L</span>
                            <div v-if="linkDisable">{{securityDetail.Basic.DealName}}</div>
                            <router-link class="appH5_link" style="display:inline-flex" v-else :to="`/productDetail/${securityDetail.Basic.DealId}?fromtab=securityDetail&id=${id}${noheader?'&noheader=1':''}`">
                             {{securityDetail.Basic.DealName}}
                            </router-link>
                        </div>
                    </div>
                    <div v-else>
                        <span>L</span>
                        <div v-if="linkDisable">{{securityDetail.Basic.DealName}}</div>
                        <router-link class="appH5_link" style="display:inline-flex" v-else :to="`/productDetail/${securityDetail.Basic.DealId}?fromtab=securityDetail&id=${id}${noheader?'&noheader=1':''}`">
                         {{securityDetail.Basic.DealName}}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <!-- 现金流 -->
        <div class="appH5_panel securityStructure">
            <p class="panel-title appH5_color_details appH5_font_larger">
               <span class="titLine appH5_fl"></span>
                <span class="appH5_fl appH5_color_white">现金流</span>
                <div class="appH5_fl cashflowLegend">
                    <table>
                        <tr>
                            <td class="appH5_vertical_middle"><span class="appH5_square_dot appH5_bg_green"></span></td>
                            <td class="appH5_vertical_middle"><span class="appH5_font_smaller appH5_fl">起息日</span></td> 
                            <td class="appH5_vertical_middle"><span class="appH5_square_dot appH5_bg_blue appH5_margin_left20"></span></td> 
                            <td class="appH5_vertical_middle"><span class="appH5_font_smaller appH5_fl">实际值</span></td> 
                            <td class="appH5_vertical_middle"><span class="appH5_square_dot appH5_bg_brightpink appH5_margin_left20"></span></td> 
                            <td class="appH5_vertical_middle"><span class="appH5_font_smaller appH5_fl">预测值</span></td>
                        </tr>
                    </table>
                </div>
                <!-- <div class="appH5_overhide typeSpan appH5_fl appH5_margin_left20">
                    <span class="appH5_square_dot appH5_bg_green"></span> 
                    <span class="appH5_font_smaller appH5_fl">起息日</span> 
                    <span class="appH5_square_dot appH5_bg_blue appH5_margin_left20"></span> 
                    <span class="appH5_font_smaller appH5_fl">实际值</span> 
                    <span class="appH5_square_dot appH5_bg_brightpink appH5_margin_left20"></span> 
                    <span class="appH5_font_smaller appH5_fl">预测值</span>
                </div> -->
                <span  class="appH5_color_link appH5_fr appH5_font_smaller typeSpan" v-if="securityDetail.Cashflow.length>0&&ExpandShowFlag" v-on:click="cashflowShow()">展开</span>
                <span  class="appH5_color_link appH5_fr appH5_font_smaller typeSpan" v-if="securityDetail.Cashflow.length>0&&!ExpandShowFlag" v-on:click="cashflowHide()">收起</span>
                <div class="clearfix"></div>
            </p>
            <table class="appH5_table appH5martop appH5_font_smaller securityCashflowTable" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <th class="text-left">偿付日期</th> 
                    <th class="text-right">期初</th>
                    <th class="text-right">本金</th>
                    <th class="text-right">利息</th> 
                    <th class="text-right">本息</th>
                </tr>
                <tr v-if="securityDetail.Cashflow.length>0&&CashflowShowFlag&&item.Default" v-for="item in securityDetail.Cashflow">
                        <td>
                            <span v-if="item.StatusId==0" class="appH5_square_dot appH5_bg_green"></span>
                            <span v-if="item.StatusId==1||item.StatusId==2||item.StatusId==3" class="appH5_square_dot appH5_bg_blue"></span> 
                            <span v-if="item.StatusId==4" class="appH5_square_dot appH5_bg_brightpink"></span> 
                             {{item.PaymentData.toString() | moment("YYYY-MM-DD")}}
                        </td> 
                        <td class="text-right">{{item.Begin}}</td>
                        <td class="text-right">{{item.Principal}}</td>
                        <td class="text-right">{{item.Interest}}</td>
                        <td class="text-right">{{item.Total}}</td>
                </tr>
                <tr v-bind:class="(index==ExpectFlag?'expectBorder':'')" v-if="securityDetail.Cashflow.length>0&&!CashflowShowFlag" v-for="(item,index) in securityDetail.Cashflow" >
                    <td> 
                        <span v-if="item.StatusId==0" class="appH5_square_dot appH5_bg_green"></span>
                        <span v-if="item.StatusId==1||item.StatusId==2||item.StatusId==3" class="appH5_square_dot appH5_bg_blue"></span> 
                        <span v-if="item.StatusId==4" class="appH5_square_dot appH5_bg_brightpink"></span> 
                        {{item.PaymentData.toString() | moment("YYYY-MM-DD")}}
                        </td>
                    <td class="text-right">{{item.Begin}}</td>
                    <td class="text-right">{{item.Principal}}</td>
                    <td class="text-right">{{item.Interest}}</td>
                    <td class="text-right">{{item.Total}}</td>
                </tr>
            </table> 
            <div v-if="securityDetail.Cashflow.length==0" class="appH5lookAll appH5bgColor">暂无现金流</div>
        </div>
        </div>
    </div>
  </div>
</template>
<style>
.securityCashflowTable tr td:nth-child(1),
.securityCashflowTable tr th:nth-child(1) {
  max-width: 2rem;
  min-width: 2rem;
  width: 2rem;
}
.securityCashflowTable tr td:nth-child(2),
.securityCashflowTable tr th:nth-child(2) {
  max-width: 1.4rem;
  min-width: 1.4rem;
  width: 1.4rem;
}
.securityCashflowTable tr td:nth-child(3),
.securityCashflowTable tr th:nth-child(3) {
  max-width: 1.4rem;
  min-width: 1.4rem;
  width: 1.4rem;
}
.securityCashflowTable tr td:nth-child(4),
.securityCashflowTable tr th:nth-child(4) {
  max-width: 1.3rem;
  min-width: 1.3rem;
  width: 1.3rem;
}
.securityCashflowTable tr td:nth-child(5),
.securityCashflowTable tr th:nth-child(5) {
  max-width: 1.4rem;
  min-width: 1.4rem;
  width: 1.4rem;
}
.securityCashflowTable tr td:first-child {
  position: relative;
}
.securityCashflowTable .appH5_square_dot {
  position: absolute;
  top: 0.38rem;
  left: 0;
}
.cashflowLegend {
  padding-top: 0.1rem;
  margin-left: 0.6rem;
}
.typeSpan {
  margin-top: 0.18rem;
}
.backTablePic {
  float: left;
  margin: 4px 4px 4px 2px;
  width: 12px;
  height: 11px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAGCAYAAAD37n+BAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABPSURBVChTY1y3esV/BiDYtX09iGJw8wwE0zAAE/f39QPTTGCSBMCYkRQOtgFmMifLXzC9cfMmMI1uI+k2wPwAA+hu/v6HGUzDxEm0gYEBALKKGjTje4yiAAAAAElFTkSuQmCC);
  background-repeat: repeat;
}
.appH5_content {
  width: 100%;
}
.appH5martop {
  margin-top: 0.32rem;
}
.borderBom {
  border-bottom: #343e46 solid 1px;
}
.deatilheaderR {
  margin-top: 0.35rem;
  line-height: 0.65rem;
}
.deatilheaderR span {
  padding-left: 0.25rem;
}
.panel-title .titLine {
  width: 0.1067rem;
  height: 17px;
  background-color: #f88b2b;
  display: inline-block;
  margin-right: 5px;
  margin-top: 0.12rem;
}
.structureTable {
  margin-top: 0.15rem;
}
.proList {
  margin-left: 0.5rem;
}
.proList div {
  margin-left: 0.32rem;
}
.proList span {
  color: #676767;
}
.spacialTable {
  border: none !important;
  margin: none;
  padding: 0;
  width: 100%;
}
.spacialTable tr td:first-child {
  width: 1.65rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 0.32rem;
  padding-right: 0.32rem;
}
.spacialTable tr td:nth-child(2) {
  width: 3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 0.32rem;
}
.spacialTable tr td {
  height: 1.06rem;
  line-height: 1.06rem;
}
.spacialTable tr td:last-child {
  padding-right: 0.32rem;
}
.appH5lookAll,
.appH5CloseAll {
  cursor: pointer;
  text-align: center;
  margin-top: 0.32rem;
  height: 1rem;
  line-height: 1rem;
  background-color: #222222;
}
.structureTable {
  width: 100%;
}
.structureTable i {
  display: inline-block;
  width: 0.56rem;
  height: 0.3467rem;
  vertical-align: middle;
}
.structureTable span {
  vertical-align: middle;
  padding-left: 0.2rem;
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
.CurrentSecurities {
  background-color: #ffe40c;
}
.securityCashflowTable td {
  font-size: 13px !important;
}
.securityCashflowTable .expectBorder td {
  border-bottom: 1px #ffc446 solid !important;
}
@media only screen and (min-width: 320px) and (max-width: 374px) {
  .appH5_margin_left20 {
    margin-left: 0.35rem !important;
  }
  .cashflowLegend {
    margin-left: 0.2rem;
  }
}
</style>

<script>
import "@/public/css/structure.css";
import BusUtil from "./BusUtil";
import Vue from "vue";
import VueHighcharts from "vue-highcharts";
import Highcharts from "highcharts";
import getParams from "../../public/js/getParams";
import { NoteStructure } from "../../public/js/NoteStructure.js";
import util from "@/public/modules/expert/utils";

// some charts like solid gauge require `highcharts-more.js`, you can find it in official demo.
import * as chartTheme from "@/public/js/chartTheme";

import * as webApi from "@/config/api";
import axios from "axios";
import { Toast } from "mint-ui";
Vue.use(VueHighcharts, { Highcharts });
Highcharts.setOptions(chartTheme);
const busUtil = BusUtil.getInstance();

export default {
  name: "securityDetail",
  data() {
    return {
      securityDetail: {},
      isSecurityLoading: false,
      chartWidthRem: 3,
      chartWidthPx: 280,
      isFetchDetailError: false,
      CashflowShowFlag: true,
      NoteStructureFlag: true,
      ExpandShowFlag: true,
      ExpectFlag: 0,
      noheader: false,
      linkDisable: false
    };
  },
  beforeRouteEnter: (to, from, next) => {
    document.title="证券信息";
    next(vm => {
      document.title="证券信息";
      if (!to.meta.fromExp) {
        busUtil.bus.$emit("showHeader", true);
        if (from.path != "/" && from.query.fromtab != "securityDetail") {
          var queryObj = from.query;
          let pathStr = from.path + "?";
          for (var obj in queryObj) {
            pathStr = pathStr + obj + "=" + queryObj[obj] + "&";
          }
          pathStr = pathStr.replace(/&$/g, "");
          busUtil.bus.$emit("path", pathStr);
        } else {
          busUtil.bus.$emit("path", "/security");
        }

        var reg = new RegExp(/\/ProductDetail\//i);
        if (reg.test(from.path) && from.query.fromtab != "securityDetail") {
          // vm.linkDisable = true;
        } else {
          vm.linkDisable = false;
        }

        if (vm.$route.query.noheader == "1") {
          busUtil.bus.$emit("noHeader", true);
          document.getElementById("securityDetailDiv").style.paddingTop = 0;
          // vm.linkDisable = true;
          vm.noheader = true;
          // document.title="证券信息";
        } else {
          busUtil.bus.$emit("noHeader", false);
          document.getElementById("securityDetailDiv").style.paddingTop =
            "56px";
          vm.noheader = false;
        }
      } else {
        busUtil.bus.$emit("path", "fromAbs");
        vm.isfromExp = true;
        var querys = util.getQueryString();
        if (
          (to.query.isShowHeader == null || to.query.isShowHeader == false) &&
          !new RegExp(/isShowHeader=true/i).test(location.href)
        ) {
          busUtil.bus.$emit("showHeader", false);
          document.getElementById("securityDetailDiv").style.paddingTop = 0;
        } else {
          busUtil.bus.$emit("showHeader", true);
          busUtil.bus.$emit("showClose", true, querys.path);
          document.getElementById("securityDetailDiv").style.paddingTop =
            "56px";
        }
      }
    });
  },

  beforeRouteUpdate(to, from, next) {
    this.loadData(to.params.id);
  },

  created() {
    // this.tableFlag=0;
    //this.loadData();
    if (this.$route.meta.fromExp) {
      this.loadData();
    }
  },
  mounted() {},
  updated() {},
  activated() {
    this.loadData();
  },
  methods: {
    loadData(id) {
      //clear all data cache
      this.tableFlag = 0;
      var self = this;
      this.isSecurityLoading = true;
      this.securityDetail = {};
      this.CashflowShowFlag = true;
      this.ExpandShowFlag = true;
      this.ExpectFlag = 0;
      window.scrollTo(0, 0);

      // busUtil.bus.$emit("showHeader", true);
      busUtil.bus.$emit("headTitle", "证券信息");

      this.id = id == null ? this.$route.params.id : id;

      if (this.id) {
        setTimeout(() => {
          this.fetchSecurityDetail(this.id, data => {
            // busUtil.bus.$emit('headTitle', data.Basic.DealName);
            this.securityDetail = data;
            if (this.securityDetail.Cashflow != null) {
              this.securityDetail.Cashflow.forEach(function(item, index) {
                if (item.Default == true) {
                  self.ExpectFlag = index - 1;
                }
              });
            }
            this.isSecurityLoading = false;
          });
        }, 600);
      }
    },

    fetchSecurityDetail(id, callback) {
      axios(webApi.Security.detail.concat(["", id].join("/")))
        .then(response => {
          if (response.data.status == "ok") {
            const data = response.data.data;
            if (data) {
              callback(data);
            } else {
              this.doCatch();
            }
            //load deal structure
            this.fetchDealStructure(data.DealId, data.NoteId);
          }
          else{
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
      this.isSecurityLoading = false;
      this.isFetchDetailError = true;
    },
    cashflowShow() {
      this.CashflowShowFlag = false;
      this.ExpandShowFlag = false;
    },
    cashflowHide() {
      this.CashflowShowFlag = true;
      this.ExpandShowFlag = true;
    },
    fetchDealStructure(dealId, noteId) {
      axios(
        webApi.Security.structure.concat(["", dealId, noteId].join("/"))
      ).then(response => {
        if (response.data.status == "ok") {
          this.NoteStructureFlag = true;
          NoteStructure({
            container: "noteStructure",
            data: response.data.data.Notes,
            // width: 220,
            fromExp: this.isfromExp
          });
        } else {
          this.NoteStructureFlag = false;
        }
      });
    }
  }
};
</script>