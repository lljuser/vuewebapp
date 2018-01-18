<template>
  <div class="appH5_body">
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
                <td>
                    <div><router-link :to="`/product/${productDetail.Basic.ProductTypeId}`"> <a href="javascript:;" style="color:#FEC447">{{productDetail.Basic.ProductType}}</a></router-link></div>
                    <div>&nbsp;└&nbsp;<router-link v-bind:to="'/product/'+productDetail.Basic.ProductTypeId+'/'+productDetail.Basic.DealTypeId"> <a href="javascript:;" style="color:#FEC447">{{productDetail.Basic.DealType}}</a></router-link></div><!---->
                    <div v-if="productDetail.Basic.AssetSubCategoryId!=null">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└&nbsp;{{productDetail.Basic.AssetSubCategory}}</div>
                </td>
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
                    <div v-if="productDetail.Basic.DealOriginator!==null"><span v-for="(item,index) in productDetail.Basic.DealOriginator" style="display:block">{{item}}</span></div>
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
        <div v-if="noteConsTable.indexOf('table')!=-1">
            <div style="text-align:center"><div v-html="noteConsTable" id="test" v-bind:style="'margin:0 auto;width:'+chartWidthPx+'px'">{{noteConsTable}}</div></div>
            <div style="text-align:center;height: 0.4rem;">
                <div style="margin:0 auto;width:3rem" v-if="productDetail.NoteList!=null&&productDetail.NoteList.length!=0">
                    <div class="backTablePic"></div>
                    <div style="float:left;font-size: 11px;margin-top: 2px;">已偿付</div>
                    <div style="float:left;margin: 4px 4px 4px 2px; width: 12px; height: 11px; background-color: #B7AFA5;"></div>
                    <div style="float:left;font-size: 11px;margin-top: 2px;">剩余</div>
                </div>
            </div>
        </div>
        <div v-else class="appH5_color_details appH5_font_smaller" style="text-align:center"> <span>暂无数据</span> </div>
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
    .backTablePic{
        float:left;
        margin: 4px 4px 4px 2px;
        width: 12px;
        height: 11px;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAGCAYAAAD37n+BAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABPSURBVChTY1y3esV/BiDYtX09iGJw8wwE0zAAE/f39QPTTGCSBMCYkRQOtgFmMifLXzC9cfMmMI1uI+k2wPwAA+hu/v6HGUzDxEm0gYEBALKKGjTje4yiAAAAAElFTkSuQmCC);
        background-repeat: repeat;
    }
</style>
<style>

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
import { Toast } from 'mint-ui';
Vue.use(VueHighcharts, { Highcharts });
Highcharts.setOptions(chartTheme);

export default {
    name: 'productDetail',
    data() {
        return {
            productDetail: {},
            publishDate:"",
            noteConsTable:"",
            isProductLoading:false,
            options: {
                title: {
                text: '暂无数据'
                },
                credits: {
                href: '',
                text: 'CNABS'
                },
            },
            chartWidthRem:3,
            chartWidthPx:225,
            showChart: true,
            isFetchDetailError: false,
        };
    },
    created() {
        const busUtil = BusUtil.getInstance();
        busUtil.bus.$emit('showHeader', true);
        busUtil.bus.$emit('path', '/product');
        busUtil.bus.$emit('headTitle', '');
    },
    mounted() {
        this.isProductLoading=true;
        // if(this.isFetchDetailError){
        //     setTimeout(()=>{
        //             this.fetchProductDetail(this.id,data=>{
        //             this.productDetail =data;
        //             this.isProductLoading=false;
        //             if(data.DealId!=null&&data.DealId>0){
        //                 if(data.NoteList!=null&&data.NoteList.length>0){
        //                     if(data.NoteList.length>6){
        //                         this.chartWidthPx=280;
        //                     }else if(data.NoteList.length>4){
        //                         this.chartWidthPx=200;
        //                     }else{
        //                         this.chartWidthPx=150;
        //                     }
        //                 }
        //                 this.fetchNoteConsTable(data.DealId,this.chartWidthPx,200);
        //             }
        //             if (data.ResultSetId != null && data.ResultSetId > 0) {
        //                 this.fetchProductPaymentChart(data.DealId, data.ResultSetId);
        //             }
        //         });
        //     },600);
        // }
    },
    updated(){
        var paidList=document.getElementsByClassName("divHasPaid");
        for(var i=0;i<paidList.length;i++){
            paidList[i].style.backgroundImage="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAGCAYAAAD37n+BAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABPSURBVChTY1y3esV/BiDYtX09iGJw8wwE0zAAE/f39QPTTGCSBMCYkRQOtgFmMifLXzC9cfMmMI1uI+k2wPwAA+hu/v6HGUzDxEm0gYEBALKKGjTje4yiAAAAAElFTkSuQmCC)";
        }
        var bgList=document.getElementsByClassName("structure_bg");
        for(var i=0;i<bgList.length;i++){
            bgList[i].style.backgroundColor="#B7AFA5";
            var aList=bgList[i].getElementsByTagName('a');
            for(var j=0;j<aList.length;j++){
                aList[j].href="javascript:;";
                aList[j].title="";
            }
        }
        var nameList=document.getElementsByClassName("str_n");
        for(var k=0;k<nameList.length;k++){
            nameList[k].style.color="black";
        }
        var pctList=document.getElementsByClassName("str_npct");
        for(var x=0;x<pctList.length;x++){
            pctList[x].style.color="#06c";
        }
    },
    activated() {
        //clear all data cache
        this.isProductLoading=true;
        this.productDetail = {};
        this.publishDate = "";
        this.noteConsTable="";
        this.options =  {
            title: {
                text: '暂无数据'
            },
            credits: {
                href: '',
                text: 'CNABS'
            },
        };
        window.scrollTo(0,0);
        const busUtil = BusUtil.getInstance();
        busUtil.bus.$emit('showHeader', true);
        busUtil.bus.$emit('path', '/product');
        busUtil.bus.$emit('headTitle', '');
        this.id = this.$route.params.id;
        if (this.id) {
            setTimeout(()=>{
                    this.fetchProductDetail(this.id,data=>{
                    busUtil.bus.$emit('headTitle', data.Basic.DealName); 
                    this.productDetail =data;
                    this.isProductLoading=false;
                    if(data.DealId!=null&&data.DealId>0){
                        if(data.NoteList!=null&&data.NoteList.length>0){
                            if(data.NoteList.length>5){
                                this.chartWidthPx=320;
                            }else if(data.NoteList.length>3){
                                this.chartWidthPx=240;
                            }else{
                                this.chartWidthPx=200;
                            }
                        }
                        this.fetchNoteConsTable(data.DealId,this.chartWidthPx,200);
                    }
                    if (data.ResultSetId != null && data.ResultSetId > 0) {
                        this.showChart = true;
                        this.fetchProductPaymentChart(data.DealId, data.ResultSetId);
                    } else {
                        this.showChart = false;
                    }

                });
            },600);
        }
        busUtil.bus.$emit('showHeader', true);
        busUtil.bus.$emit('path', '/product');
    },
  
    methods: {
        fetchNoteConsTable(dealId,width,height){
            axios(webApi.Product.structure+"/"+dealId+"/"+width+"/"+height)
            .then((response)=>{
            // console.log(response);
                if(response.data.status=="ok"){
                    this.noteConsTable=response.data.data;
                }
            });
        },
        fetchProductDetail(id,callback) {
            // consoleconsole.log(webApi.Product.detail.concat(['',id].join('/')));
            axios(webApi.Product.detail.concat(['',id].join('/')))
            .then((response) => {
                if (response.data.status == "ok") {
                    const data = response.data.data;
                    if(data){
                        callback(data);
                    } else{
                        this.doCatch();
                    }
                }
            }).catch((error) => {
                this.doCatch();
            });
        },
        doCatch(){
            Toast('服务器繁忙，请重试！');
            this.isProductLoading = false;
            this.isFetchDetailError=true;
        },
        fetchProductPaymentChart(dealId, resultId) {
            axios(webApi.Product.chart.concat(['', dealId, resultId].join('/')))
            .then((response) => {
                const json = response.data;
                if (json.status == "ok") {
                var chartData = json.data;
                var o = [];
                        var hasLegal = chartData.HasLegalLine;
                        var colors = chartTheme.colors;
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
                                    if (!(e.Name.indexOf('说明书') != -1)) {
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
