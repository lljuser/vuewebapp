<template>
  <div class="appH5_body">
    <div class="appH5_content">
      <div class="appH5_panel appH5_panel_mb">
          <div class="appH5_title">
              <span>产品要素</span>
          </div>
          <table class="appH5_list_two" v-if="productDetail!=null">
            <tr>
              <td>产品名称</td>
              <td>{{productDetail.Basic.DealNameChinese}}</td>
            </tr>
            <tr>
              <td>产品分类</td>
              <td>
                <div><router-link to="/product"> <a href="javascript:;" style="color:#FEC447">{{productDetail.Basic.ProductType}}</a></router-link></div>
                <div>&nbsp;└&nbsp;<router-link to="/product"> <a href="javascript:;" style="color:#FEC447">{{productDetail.Basic.DealType}}</a></router-link></div>
                <div v-if="productDetail.Basic.AssetSubCategoryId!=null">&nbsp;&nbsp;&nbsp;└&nbsp;{{productDetail.Basic.AssetSubCategory}}</div>
              </td>
            </tr>
            <tr>
              <td>产品状态</td>
              <td>{{productDetail.Basic.CurrentStatus}}</td>
            </tr>
            <tr>
              <td>成立日期</td>
              <td>{{publishDate.getFullYear()+"年"+publishDate.getMonth()+"月"+publishDate.getDate()+"日"}}</td>
            </tr>
            <tr>
              <td>发起机构</td>
              <td>
                  <div v-for="(item,index) in productDetail.Basic.DealOriginator"><span>{{item}}</span><br v-if="index!=productDetail.Basic.length-1"></div>
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
        <div style="padding-left:2.09333rem" v-if="productDetail!=null&&productDetail.NoteList.length!=0">
            <table class="table-structure" style="text-align:center; width:220px; margin-top:-2px; padding:0px;">
                <tbody>
                    <tr style="text-align:center; padding:0px;">
                        <td v-if="item.SecurityType=='优先级'&&index<6" class="consTableTd" v-bind:style="{width:item.Notional*100/notionalA+'%'}" v-for="(item,index) in productDetail.NoteList">
                            <!-- <div v-bind:style="'height:'+((item.Notional-item.Principal)*100/item.Notional)+'%;display:block;position:relative;background-image:url(/src/public/images/table_bg.png);background-repeat:repeat;vertical-align:top;'">
                                <span v-bind:style="'position: absolute;top:0px;left:0px;width:'+(item.Notional*100/notionalA)+'%;height:171px;line-height:171px;'">
                                    <a v-if="notionalA!=null&&notionalA!=undefined" href="javascript:;" target="_blank" v-bind:style="'width:'+(item.Notional*100/notionalA)+'%;word-break:break-all;color:#000000;font-weight:normal;font-size:smaller'">{{item.Name}}</a>
                                </span>
                            </div> -->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div style="margin-bottom:0.25rem;margin-left:2.1rem" v-if="productDetail!=null&&productDetail.NoteList.length!=0">
            <div style="float:left;margin: 4px 4px 4px 2px; width: 12px;height: 11px; background-image: url(&quot;/src/public/images/table_bg.png&quot;); background-repeat: repeat;"></div> 
            <div style="float:left;font-size: 11px;">已偿付</div> 
            <div style="float:left;margin: 4px 4px 4px 2px; width: 12px; height: 11px; background-color: #B7AFA5;"></div> 
            <div style="float:left;font-size: 11px;">剩余</div>
        </div>
    </div>
    <div class="appH5_panel appH5_panel_mb">
        <div class="appH5_title">
              <span>证券列表</span>
          </div>
          <div v-if="productDetail!=null&&productDetail.NoteList.length!=0">
            <table class="appH5_table">
              <tr>
                <th>证券简称</th>
                <th class="text-right">初始(亿)<br/>剩余(亿)</th>
                <th class="text-right">利率<br/>估值</th>
                <th class="text-right">期限<br/>类型</th>
                <th class="text-right">最新评级<br/>建议评级</th>
              </tr>
              <tr v-for="(item,index) in productDetail.NoteList">
                <td><div class="appH5_ellipsis" style="width:2.1rem;">{{item.Description}}</div></td>
                <td class="text-right"><span class="appH5_color_red">{{item.Notional}}</span><br/><span class="appH5_color_details appH5_font_smaller">{{item.Principal}}</span></td>
                <td class="text-right"><span>{{item.CurrentCoupon!=null?item.CurrentCoupon.toFixed(2):"-"}}</span><br/><span class="appH5_color_green appH5_font_smaller">{{item.CurrentSuggestYield!=null?item.CurrentSuggestYield:"-"}}</span></td>
                <td class="text-right"><span>{{item.CurrentWal!=null?item.CurrentWal.toFixed(2):"-"}}</span><br/><span class="appH5_color_details appH5_font_smaller">{{item.RepaymentOfPrincipal}}</span></td>
                <td class="text-right"><span>{{item.CurrentRatingCombineString}}</span><br/><span class="appH5_color_green appH5_font_smaller">{{item.CurrentSuggestRatingCombineString}}</span></td>
              </tr>
            </table>
          </div>
          <div v-else class="appH5_color_details appH5_font_smaller"> <span style="text-align:center">暂无数据</span> </div>
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
    <!-- <h2>产品详情页</h2>
    <h3>{{ productDetail && productDetail.Title }}</h3>
    <p>{{ productDetail && productDetail.Content }}</p>
    <p>{{ productDetail && productDetail.Time }}</p> -->
  </div>
</template>

<style scoped>

</style>
<style>
.consTableTd{
    padding:0px; 
    position: relative; 
    vertical-align:top;
    height:171px;
    background-color:#B7AFA5
}
</style>

<script>
import BusUtil from './BusUtil';
import Vue from 'vue';
import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts';
import getParams from '../../public/js/getParams';

// some charts like solid gauge require `highcharts-more.js`, you can find it in official demo.
import * as chartTheme from '@/public/js/chartTheme';

import * as webApi from '@/config/api';
import axios from 'axios';

Vue.use(VueHighcharts, { Highcharts }); 
Highcharts.setOptions(chartTheme);

export default {
  name: 'productDetail',
  mounted() {
    const busUtil = BusUtil.getInstance();
    this.id = this.$route.params.id;
    if (this.id) {
      this.fetchProductDetail(this.id);
    }
    busUtil.bus.$emit('showHeader', true);
    busUtil.bus.$emit('path', '/product');

    // url 传来的id
    const productId = getParams("id");
    if (productId) {
      this.fetchProductDetail(productId);
    }
  },
  activated() {
    // // 滚动到顶部
    // window.scrollTo(0,0);
    // const busUtil = BusUtil.getInstance();
    
    // this.id = this.$route.params.id;
    // if (this.id) {
    //   this.fetchProductDetail(this.id);
    // }
    // busUtil.bus.$emit('showHeader', true);
    // busUtil.bus.$emit('path', '/product');

    // // url 传来的id
    // const productId = getParams("id");
    // if (productId) {
    //   this.fetchProductDetail(productId);
    // }
  },
  data() {
    return {
      productDetail: null,
      publishDate:null,
      notionalA:1.00,
      notionalB:1.00,
      notionalC:1.00,
      options: {
        title: {
          text: '暂无数据'
        },
        credits: {
          href: '',
          text: 'CNABS'
        },
      }
    };
  },
  methods: {
    fetchProductDetail(id) {
        console.log(webApi.Product.detail.concat(['',id].join('/')));
      axios(webApi.Product.detail.concat(['',id].join('/')))
      .then((response) => {
          console.log(response);
        this.productDetail = response.data.data;
        console.log(productDetail.Basic.DealNameChinese);
        this.publishDate=new Date(this.productDetail.Basic.ClosingDate.toString());
        this.notionalA=0.00;
        // this.notionalB=0.00;
        // this.notionalC=0.00;
        this.productDetail.NoteList.forEach(function(item,index){
            if(item.SecurityType=="优先级"){
                this.notionalA+=item.Notional;
            }
            // if(item.SecurityType=="夹层级"){
            //     this.notionalB+=item.Notional;
            // }
            // if(item.SecurityType=="次级"){
            //     this.notionalC+=item.Notional;
            // }
        });
        console.log(this.notionalA);
        // console.log(this.notionalB);
        // console.log(this.notionalC);
        console.log(this.productDetail);
        //get chart data
        let resultId = response.data.data.ResultSetId;
        if (resultId != null && resultId > 0) {
          this.fetchProductPaymentChart(response.data.data.DealId, resultId);
        }
      });
    },
    fetchProductPaymentChart(dealId, resultId) {
      axios(webApi.Product.chart.concat(['', dealId, resultId].join('/')))
      .then((response) => {
        const json = response.data;
        if (json.status == "ok") {
          var chartData = json.data;
          var o = [];
                var hasLegal = chartData.HasLegalLine;
                var colors = ["#2b908f", "#D8C46C", "#f45b5b", "#7798BF", "#FF1495", "#37FF14", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee", "#00FFFF", "#8B008B"]
                var seriesLength = chartData.ListLineSeries.length / 2;
                for (var j = 0; j < Math.floor((hasLegal ? seriesLength : 2 * seriesLength) / colors.length); j++)
                    colors = colors.concat(colors);
                var i = 0;
                chartData.ListLineSeries.forEach(
                    function (e) {
                        var a = [];
                        e.Data.Data.forEach(
                            function (e) {
                                a.push([e.X, e.Y]);
                            });
                        if (hasLegal == true) {
                            if (i < seriesLength) {
                                o.push({
                                    name: e.Name,
                                    data: a,
                                    type: 'line',
                                    step: true,
                                    color: colors[i]
                                });
                            }
                            else {
                                o.push({
                                    name: e.Name,
                                    data: a,
                                    dashStyle: 'Dot',
                                    step: true,
                                    color: colors[i - seriesLength]
                                });
                            }
                            i++;
                        }
                        else {
                            o.push({
                                name: e.Name,
                                data: a,
                                type: 'spline',
                            });
                        }

                    });
                var i = chartData.PlotValue,
                    s = chartData.PlotLabel;
                var l = {
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
                            week: "%Y年%m月",
                            month: "%Y年",
                            year: "%Y年"
                        },
                        plotLines: [{
                            color: "white",
                            width: .8,
                            value: i,
                            dashStyle: "dash",
                            label: {
                                text: s,
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
                            to: i
                        }]
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
                    series: o
                };
        this.options = l;
        }
      });
    }
  },
};
</script>
