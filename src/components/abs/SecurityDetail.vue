<template>
  <div class="appH5_body">
    <!-- <div class="product-spinner" v-if="isProductLoading">
      <mt-spinner type="triple-bounce"></mt-spinner>
    </div> -->
    <div class="appH5_content">
        <div class="appH5_panel">
            <div class="securityDetailHeader detailBg">
                <div class="sdHeaderTop borderBom">
                    <div class="fl">
                        <span class="appH5_font_largest appH5_color_red">23.62</span>亿
                    </div>
                    <div class="fr deatilheaderR colorGary">
                        <div>上交所<span>2017-12-23&nbsp;(发行)</span></div>
                        <div>上交所<span>2017-12-23&nbsp;(到期)</span></div>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="sdHeaderBom colorBlue">
                   <span class="fl">汽车抵押贷款</span>     
                   <span class="fl">AAA/AA+</span>     
                   <span class="fl">5.8%</span>     
                   <span class="fr" style="padding-right:0;">2.75Y</span>   
                   <div class="clearfix"></div>  
                </div>    
            </div>
            <div class="QuantitativePricing appH5martop colorGary">
                <span class="fl">量化定价</span>
                <span class="fl" style="padding-left: .6rem;">AAA+</span>
                <span class="fl" style="padding-left: .6rem;">1.2455%</span>
                <span class="fr">99.4567</span>
                <div class="clearfix"></div>
            </div> 
        </div>
        
        <!-- 证券结构 -->
        <div class="appH5_panel securityStructure appH5martop">
            <p class="panel-title colorGary"><span class="titLine">证券结构</span></p>
            <div class="appH5martop">
                <div class="fl">放图</div>
                <div class="fr colorGary">
                    放说明<br/>
                    剩余<br/>
                    已偿付<br/>
                    当前证券<br/>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
        <!-- 产品分类 -->
        <div class="appH5_panel securityStructure appH5martop">
            <p class="panel-title colorGary"><span class="titLine">产品分类</span></p>
            <div class="appH5martop proList">
                <a href="javascript:;">信贷资产证券化</a>
                <div style="margin-left:0;">
                    <span>L</span>
                    <a href="javascript:;">汽车抵押贷款</a>
                    <div>
                        <span>L</span>
                        <a href="javascript:;">外商独自汽车金融公司</a>
                        <div>
                            <span>L</span>
                            <a href="javascript:;">福元2018-1</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 现金流 -->
        <div class="appH5_panel securityStructure appH5martop">
            <p class="panel-title colorGary"><span class="titLine">现金流</span></p>
            <table class="appH5_table appH5martop colorGary" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td colspan="4">偿付日期&nbsp;&nbsp;<span class="colorGreen">2018-01-26&nbsp;&nbsp;(一)</span></td>
                </tr>
                <tr>
                    <td>初始金额(万)</td>
                    <td>本金(元)</td>
                    <td>利息(元)</td>
                    <td>本息(元)</td>
                </tr>
                <tr class="appH5_color_red">
                    <td>1.13</td>
                    <td>0.89</td>
                    <td>1.98</td>
                    <td>1.98</td>
                </tr>
            </table> 
           <div id="appH5lookAll" class="appH5lookAll appH5bgColor appH5_link">查看所有现金流</div>  
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
    .detailBg{
        background-color: #171D21;
    }
    .fl{
        float: left;
    }
    .fr{
        float: right;
    }
    .clearfix{
        clear: both;
    }
    .txt_justify{
        text-align: justify;
    }
    .colorBlue{
        color: #5AD4F6;
    }
    .colorGary {
        color: #DADADA;
    }
    .colorGreen{
        color: #00D39C;
    }
    .appH5_content{
        width: 100%;
    }
    .securityDetailHeader{
        padding-left: .3rem;
        padding-right: .3rem;
    }
    .appH5martop{
        margin-top: .32rem;
    }
    .borderBom{
        border-bottom: #242C32 solid 1px;
    }
    .deatilheaderR{
        margin-top: 0.35rem;
        line-height: .65rem;
    }
    .deatilheaderR span{
        padding-left: .25rem;
    }
    .sdHeaderBom span,.QuantitativePricing span {
      padding-right: .8rem;
    }
    .sdHeaderTop,.sdHeaderBom{
        padding: .2rem 0;
    }
    .panel-title .titLine {
        border-left: #CCCCCC solid 8px;
        height: 20px;
        line-height: 20px;
        padding-left: 10px;
    }
    .proList {
        margin-left: .5rem;
    }
    .proList  div{
       margin-left: .32rem;
    }
    .proList span{
        color:#676767;
        font-weight: bold;
    }
    .appH5_table {
        border: none!important;
        margin: none;
        padding:0;
        width: 9.36rem;;
    }
    .appH5_table tr:first-child{
        background-color: #364945;
    }
    .appH5_table tr:not(:first-child){
        background-color: #24302D;
    }
    .appH5_table td{
        border: none;
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
    }
    .appH5bgColor{
        background-color: #222222;
    }
    .appH5lookAll{
        cursor: pointer;
        text-align: center;
        margin-top: .32rem;
        height: 1rem;
        line-height: 1rem;
    }
    .QuantitativePricing{
        background-color: #670202;
    }
    .QuantitativePricing span{
        display: block;
        padding: .2rem .32rem;
    }
    .QuantitativePricing span:first-child{
        background-color: #520909;
    }
@media only screen and (min-width: 320px) and (max-width: 374px){
    .appH5_font_largest{
        font-size: 1rem!important;
    }
    .deatilheaderR{
        line-height: normal;
        margin-top: 0;
    }
    .sdHeaderBom span{
    padding-right: .42rem;
    }
    .QuantitativePricing span{
        padding: .2rem .2rem!important;
    }
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
import { Toast } from 'mint-ui';
Vue.use(VueHighcharts, { Highcharts });
Highcharts.setOptions(chartTheme);


//export default {
    // name: 'securityDetail',
    // data() {
    //     return {
    //         productDetail: {},
    //         publishDate:"",
    //         noteConsTable:"",
    //         isProductLoading:false,
    //         options: {
    //             title: {
    //             text: '暂无数据'
    //             },
    //             credits: {
    //             href: '',
    //             text: 'CNABS'
    //             },
    //         },
    //         chartWidthRem:3,
    //         chartWidthPx:280,
    //         showChart: true,
    //         isFetchDetailError: false,
    //         tableFlag:0,
    //     };
    // },
    // created() {
    //     const busUtil = BusUtil.getInstance();
    //     busUtil.bus.$emit('showHeader', true);
    //     busUtil.bus.$emit('path', '/security');
    //     busUtil.bus.$emit('headTitle', '');
    //     this.tableFlag=0;
    // },
    // mounted() {
    //     this.isProductLoading=true;
        
    // },
    // updated(){
    //     if(this.noteConsTable.indexOf('table')!=-1&&this.tableFlag==0){
    //         // if(this.productDetail.NoteList!=null&&this.productDetail.NoteList.length>0){
    //         //     let num=document.getElementById("structureTable").childNodes[0].childElementCount;
    //         //     if(num>4){
    //         //         this.chartWidthPx=320;
    //         //     }else{
    //         //         this.chartWidthPx=260;
    //         //     }
    //         // }
    //         var paidList=document.getElementsByClassName("divHasPaid");
    //         for(var i=0;i<paidList.length;i++){
    //             paidList[i].style.backgroundImage="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAGCAYAAAD37n+BAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABPSURBVChTY1y3esV/BiDYtX09iGJw8wwE0zAAE/f39QPTTGCSBMCYkRQOtgFmMifLXzC9cfMmMI1uI+k2wPwAA+hu/v6HGUzDxEm0gYEBALKKGjTje4yiAAAAAElFTkSuQmCC)";
    //         }
    //         var bgList=document.getElementsByClassName("structure_bg");
    //         for(var i=0;i<bgList.length;i++){
    //             bgList[i].style.backgroundColor="#B7AFA5";
    //             var aList=bgList[i].getElementsByTagName('a');
    //             for(var j=0;j<aList.length;j++){
    //                 aList[j].href="javascript:;";
    //                 aList[j].title="";
    //             }
    //         }
    //         var nameList=document.getElementsByClassName("str_n");
    //         for(var k=0;k<nameList.length;k++){
    //             nameList[k].style.color="black";
    //         }
    //         var pctList=document.getElementsByClassName("str_npct");
    //         for(var x=0;x<pctList.length;x++){
    //             pctList[x].style.color="#06c";
    //         }
    //         this.tableFlag=1;
    //     }
    // },
    // activated() {
    //     //clear all data cache
    //     this.isProductLoading=true;
    //     this.productDetail = {};
    //     this.publishDate = "";
    //     this.noteConsTable="";
    //     this.options =  {
    //         title: {
    //             text: '暂无数据'
    //         },
    //         credits: {
    //             href: '',
    //             text: 'CNABS'
    //         },
    //     };
    //     window.scrollTo(0,0);
    //     const busUtil = BusUtil.getInstance();
    //     busUtil.bus.$emit('showHeader', true);
    //     busUtil.bus.$emit('path', '/security');
    //     busUtil.bus.$emit('headTitle', '');
    //     this.id = this.$route.params.id;
    //     if (this.id) {
    //         setTimeout(()=>{
    //                 this.fetchProductDetail(this.id,data=>{
    //                 busUtil.bus.$emit('headTitle', data.Basic.DealName); 
    //                 this.productDetail =data;
    //                 this.isProductLoading=false;
    //                 if(data.DealId!=null&&data.DealId>0){
                        
    //                     this.fetchNoteConsTable(data.DealId,280,200);
    //                     this.tableFlag=0;
    //                 }
    //             });
    //         },600);
    //         setTimeout(()=>{
    //         this.fetchProductPaymentChart(this.id);
    //         }, 600);
    //     }
    //     busUtil.bus.$emit('showHeader', true);
    //     busUtil.bus.$emit('path', '/security');
    // },
  
    // methods: {
    //     fetchNoteConsTable(dealId,width,height){
    //         axios(webApi.Product.structure+"/"+dealId+"/"+width+"/"+height)
    //         .then((response)=>{
    //         // console.log(response);
    //             if(response.data.status=="ok"){
    //                 this.noteConsTable=response.data.data;
    //             }
    //         });
    //     },
    //     fetchProductDetail(id,callback) {
    //         // consoleconsole.log(webApi.Product.detail.concat(['',id].join('/')));
    //         axios(webApi.Product.detail.concat(['',id].join('/')))
    //         .then((response) => {
    //             if (response.data.status == "ok") {
    //                 const data = response.data.data;
    //                 if(data){
    //                     callback(data);
    //                 } else{
    //                     this.doCatch();
    //                 }
    //             }
    //         }).catch((error) => {
    //             this.doCatch();
    //         });
    //     },
    //     doCatch(){
    //         Toast('服务器繁忙，请重试！');
    //         this.isProductLoading = false;
    //         this.isFetchDetailError=true;
    //     },
    //     fetchProductPaymentChart(dealId) {
    //         var self = this;
    //         axios(webApi.Product.chart.concat(['', dealId].join('/')))
    //         .then((response) => {
    //             const json = response.data;
    //             if (json.status == "ok") {
    //             var chartData = json.data;
    //             var allSeries = [];
    //             var lineValue;
    //             var i = 0;
    //             var colors = chartTheme.colors;
    //             if (chartData && chartData.length > 0) {
    //                 var allSeriesLth = chartData.length;
    //                 var colorSeries = chartData.filter(function (item) { return item.Order > 100 }).length > 0 ?
    //                     Math.ceil(chartData.length / colors.length) : chartData.length;
    //                 for (var j = 0; j < colorSeries; j++) //get max color series
    //                     colors = colors.concat(colors);
    //                 var pSeries = chartData.filter(function (item) { return item.Order < 100 });
    //                 var lSeries = chartData.filter(function (item) { return item.Order > 100 && item.Order != 1000 });
    //                 var plotLine = chartData.filter(function (item) { return item.Order == 1000 });
    //                 var minDate = new Date(1970,1,1).valueOf();
    //                 pSeries.forEach(function (item, index) {
    //                     var point = [];
    //                     item.Points.forEach(function (e) {
    //                         point.push([new Date(e.X).valueOf() - minDate, e.Y*1]);
    //                     });
    //                     allSeries.push({
    //                         name: item.SeriesName,
    //                         data: point,
    //                         dashStyle: item.Type,
    //                         step: true,
    //                         color: colors[i]
    //                     });
    //                     i++;
    //                 });
    //                 if (lSeries.length > 0) {
    //                     i = 0;
    //                     lSeries.forEach(function (item, index) {
    //                        var point = [];
    //                        item.Points.forEach(function (e) {
    //                           point.push([new Date(e.X).valueOf() - minDate, e.Y*1]);
    //                        });
    //                        allSeries.push({
    //                            name: item.SeriesName,
    //                            data: point,
    //                            dashStyle: item.Type,
    //                            step: true,
    //                            color: colors[i],
    //                            lineWidth: 3
    //                        });
    //                     i++;                           
    //                     });
    //                 }
    //                 if (plotLine.length == 1) {
    //                     lineValue = new Date(plotLine[0].Points[0].X).valueOf() - minDate;
    //                 }
    //             }
    //                     var option = {
    //                         title: {
    //                             text: ''
    //                         },
    //                         xAxis: {
    //                             type: "datetime",
    //                             dateTimeLabelFormats: {
    //                                 second: "%Y-%m-%d %H:%M:%S",
    //                                 minute: "%Y-%m-%d %H:%M",
    //                                 hour: "%Y-%m-%d %H:%M",
    //                                 day: "%Y-%m-%d",
    //                                 week: "%Y.%m",
    //                                 month: "%Y.%m",
    //                                 year: "%Y.%m"
    //                             },
    //                             plotLines: [{
    //                                 color: "white",
    //                                 width: .8,
    //                                 value: lineValue,
    //                                 dashStyle: "dash",
    //                                 label: {
    //                                     text: plotLine[0].Points[0].X,
    //                                     verticalAlign: "middle",
    //                                     textAlign: "left",
    //                                     style: {
    //                                         color: "#E0E0E3"
    //                                     }
    //                                 }
    //                             }],
    //                             plotBands: [{
    //                                 color: "#333",
    //                                 from: Date.UTC(2e3, 1, 1),
    //                                 to: lineValue
    //                             }]
    //                         },
    //                         yAxis: {
    //                             title: {
    //                                 enabled: !0,
    //                                 text: ""
    //                             },
    //                             labels: {
    //                                 format: "{value:.0f}%"
    //                             },
    //                             max: 100
    //                         },
    //                         plotOptions: {
    //                             series: {
    //                                 marker: {
    //                                     enabled: !1
    //                                 }
    //                             }
    //                         },
    //                         tooltip: {
    //                             formatter: function () {
    //                                 var t,
    //                                     e = new Date(this.x);
    //                                 return t = e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate() + "<br/>" + this.series.name + "剩余本金:<br/>" + Math.round(100 * this.y) / 100 + "%"
    //                             }
    //                         },
    //                         legend : {
    //                             style: {
    //                                 fontSize: '10px'
    //                             }
    //                         },
    //                         credits: {
    //                         href: '',
    //                         text: 'CNABS'
    //                         },
    //                         series: allSeries
    //                     };
    //             this.options = option;
    //             } else {
    //                 self.showChart = false;
    //             }
    //         });
    //     }
    // },
//};
</script>
