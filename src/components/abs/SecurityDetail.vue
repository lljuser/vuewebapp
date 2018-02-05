<template>
  <div class="appH5_body">
    <div class="product-spinner" v-if="isSecurityLoading">
      <mt-spinner type="triple-bounce"></mt-spinner>
    </div>
    <div class="appH5_content" v-else>
        <div v-if="securityDetail.Basic!=null">
            <div class="appH5_panel" style="padding-top:0;">
                <table class="appH5_list_four borderBom">
                    <tr>
                        <td class='appH5_color_red' colspan="2" rowspan="2">
                            <span class="appH5_font_largest" v-if="securityDetail.Basic.Principal>=10">{{Math.round(securityDetail.Basic.Principal)}}</span>
                            <span class="appH5_font_largest" v-else>{{securityDetail.Basic.Principal}}</span>
                            <span>亿</span>
                        </td>
                        <td class='appH5_vertical_bottom appH5_font_smaller appH5_white_space appH5_color_details'  v-if="securityDetail.Basic.ClosingDate!=null">{{securityDetail.Basic.SimpleExchange}}</td>
                        <td class='appH5_vertical_bottom appH5_font_smaller appH5_white_space appH5_color_details'  v-if="securityDetail.Basic.ExpectedMaturityDate!=null">{{securityDetail.Basic.ClosingDate.toString() | moment("YYYY-MM-DD")}}&nbsp;(发行)</td>
                        <td class='appH5_vertical_bottom appH5_font_smaller appH5_white_space appH5_color_details' v-else>{{securityDetail.Basic.SimpleExchange}}</td>
                    </tr>
                   <tr>
                        <td class='appH5_font_smaller appH5_white_space appH5_vertical_top appH5_color_details' v-if="securityDetail.Basic.ExpectedMaturityDate!=null">{{securityDetail.Basic.RepaymentOfPrincipal}}</td>
                        <td class='appH5_font_smaller appH5_white_space appH5_vertical_top appH5_color_details' v-if="securityDetail.Basic.ExpectedMaturityDate!=null">{{securityDetail.Basic.ExpectedMaturityDate.toString() | moment("YYYY-MM-DD")}}&nbsp;(到期)</td>
                        <td class='appH5_font_smaller appH5_white_space appH5_vertical_top appH5_color_details' v-else>{{securityDetail.Basic.RepaymentOfPrincipal}}</td>
                </tr>
            </table>
            <table class="spacialTable" border="0" cellspacing="0" cellpadding="0">
                <tr class="appH5_color_skyblue">
                    <td class="text-left">{{securityDetail.Basic.DealType}}</td>
                    <td>{{securityDetail.Basic.CurrentRatingCombine}}</td>
                    <td>{{securityDetail.Basic.CurrentCoupon!=null&&securityDetail.Basic.CurrentCoupon!=""?securityDetail.Basic.CurrentCoupon+"%":"-"}}</td>
                    <td class="text-right">{{securityDetail.Basic.CurrentWal!=null&&securityDetail.Basic.CurrentWal!=""?securityDetail.Basic.CurrentWal+"Y":"-"}}</td>
                </tr>
                <tr class="appH5_bg_grayblue">
                    <td class="appH5_bg_brightgrayblue text-left">量化定价</td>
                    <td class="appH5_bg_grayblue">{{securityDetail.Basic.QuantRating!=null&&securityDetail.Basic.QuantRating!=""?securityDetail.Basic.QuantRating:"-"}}</td>
                    <td class="appH5_bg_grayblue">{{securityDetail.Basic.QuantYield!=null&&securityDetail.Basic.QuantYield!=""?securityDetail.Basic.QuantYield+"%":"-"}}</td>
                    <td class="appH5_bg_grayblue text-right">{{securityDetail.Basic.QuantPrice!=null&&securityDetail.Basic.QuantPrice!=""?securityDetail.Basic.QuantPrice:"-"}}</td>
                </tr>
            </table>
        </div>
        <!-- 证券结构 -->
        <div class="appH5_panel securityStructure appH5martop">
            <p class="panel-title appH5_color_details appH5_font_large">
                <span class="titLine appH5_fl"></span>
                <span class="appH5_fl">证券结构</span>
                <div class="clearfix"></div>
            </p>
            <div class="appH5martop">
                <div id="noteStructure" class="text-center">

                </div>
                <table class="structureTable appH5_color_white appH5_font_smaller">
                    <tr>
                        <td class="text-left"><i class="Surplus"></i><span>剩余</span></td>
                        <td class="text-center"><i class="Reimbursement"></i><span>已偿付</span></td>
                        <td class="text-right"><i class="CurrentSecurities"></i><span>当前证券</span></td>
                    </tr>
                </table>
            </div>
        </div>
        <!-- 产品分类 -->
        <div class="appH5_panel securityStructure appH5martop">
            <p class="panel-title appH5_color_details appH5_font_large">
                <span class="titLine appH5_fl"></span>
                <span class="appH5_fl">产品分类</span>
                <div class="clearfix"></div>
            </p>
            <div class="appH5martop proList">
                <span style="color:white">{{securityDetail.Basic.ProductType}}</span>
                <div style="margin-left:0;">
                    <span>L</span>
                    <router-link :to="`/security/${securityDetail.Basic.DealTypeId}`"><a href="javascript:;">{{securityDetail.Basic.DealType}}</a></router-link>
                    <div v-if="securityDetail.Basic.AssetSubCategory!=null&&securityDetail.Basic.AssetSubCategory!=''">
                        <span>L</span>
                        <span style="color:white">{{securityDetail.Basic.AssetSubCategory}}</span>
                        <div>
                            <span>L</span>
                            <router-link :to="`/productDetail/${securityDetail.Basic.DealId}`"><a href="javascript:;">{{securityDetail.Basic.DealName}}</a></router-link>
                        </div>
                    </div>
                    <div v-else>
                        <span>L</span>
                        <router-link :to="`/security/${securityDetail.Basic.DealId}`"><a href="javascript:;">{{securityDetail.Basic.DealName}}</a></router-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- 现金流 -->
        <div class="appH5_panel securityStructure appH5martop">
            <p class="panel-title appH5_color_details appH5_font_large">
               <span class="titLine appH5_fl"></span>
                <span class="appH5_fl">现金流</span>
                <div class="clearfix"></div>
            </p>
            <table class="appH5_table appH5martop" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <th class="text-left appH5_font_normal">偿付日期</th> 
                    <th class="text-right appH5_font_normal">本金(元)</th>
                    <th class="text-right appH5_font_normal">利息(元)</th> 
                    <th class="text-right appH5_font_normal">本息(元)</th>
                </tr>
                <tbody v-if="CashflowShowFlag">
                    <tr v-bind:class="(securityDetail.Cashflow[0].StatusId==2||securityDetail.Cashflow[0].StatusId==3?'appH5_bg_brightred':'')">
                        <td class="appH5_font_normal">{{securityDetail.Cashflow[0].PaymentData.toString() | moment("YYYY-MM-DD")}}</td> 
						<td class="text-right appH5_color_red appH5_font_normal">{{securityDetail.Cashflow[0].Principal}}</td>
						<td class="text-right appH5_color_red appH5_font_normal">{{securityDetail.Cashflow[0].Interest+"%"}}</td>
						<td class="text-right appH5_color_red appH5_font_normal">{{securityDetail.Cashflow[0].Total}}</td>
                    </tr>
                    <tr v-if="securityDetail.Cashflow[0].StatusId==3" class="appH5_bg_brightred appH5_detail_tr">
                        <td colspan="4" class="appH5_font_smaller appH5_color_Lightpink">数据更新至最新偿付报告</td>
                    </tr>
                </tbody>
                <tbody v-else  v-for="item in securityDetail.Cashflow">
                    <tr  v-bind:class="(item.StatusId==2||item.StatusId==3?'appH5_bg_brightred':'')">
                        <td class="appH5_font_normal">{{item.PaymentData.toString() | moment("YYYY-MM-DD")}}</td>
                        <td class="text-right appH5_color_red appH5_font_normal">{{item.Principal}}</td>
                        <td class="text-right appH5_color_red appH5_font_normal">{{item.Interest+"%"}}</td>
                        <td class="text-right appH5_color_red appH5_font_normal">{{item.Total}}</td>
                    </tr>
                    <tr v-if="item.StatusId==3" class="appH5_bg_brightred appH5_detail_tr">
                        <td colspan="4" class="appH5_font_smaller appH5_color_Lightpink">数据更新至最新偿付报告</td>
                    </tr>
                </tbody>
                
            </table> 
           <div id="appH5lookAll" v-on:click="cashflowShow()" class="appH5lookAll appH5bgColor appH5_link">查看所有现金流</div>  
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
    .appH5_content{
        width: 100%;
    }
    .appH5martop{
        margin-top: .32rem;
    }
    .borderBom{
        border-bottom: #343E46 solid 1px;
    }
    .deatilheaderR{
        margin-top: 0.35rem;
        line-height: .65rem;
    }
    .deatilheaderR span{
        padding-left: .25rem;
    }
    .panel-title .titLine {
        width:.1067rem;
        height: .373rem;
        background-color: #967845;
        display: inline-block;
        margin-right: 5px;
        margin-top: 0.14rem;
    }
    .proList {
        margin-left: .5rem;
    }
    .proList  div{
       margin-left: .32rem;
    }
    .proList span{
        color:#676767;
    }
    .spacialTable {
        border: none!important;
        margin: none;
        padding:0;
        width: 100%;  
    }
   .spacialTable tr td:first-child{
       width: 1.65rem;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
       padding-left: .32rem;
       padding-right: .32rem;
   }
   .spacialTable tr td:nth-child(2){
       width: 3rem;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
       padding-left: .32rem;
   }
   .spacialTable tr td{
       height: 1.06rem;
       line-height: 1.06rem;
   }
   .spacialTable tr td:last-child{
       padding-right: .32rem;
   }
    .appH5lookAll{
        cursor: pointer;
        text-align: center;
        margin-top: .32rem;
        height: 1rem;
        line-height: 1rem;
        background-color: #222222;
    }
    .structureTable i{
        display: inline-block;
        width:.56rem;
        height: .3467rem;
        vertical-align: middle;
    }
    .structureTable span{
        vertical-align: middle;
        padding-left: .2rem;
    }
    .structureTable tr td{
        padding-top: .1333rem;
        width: 3.12rem;
    }
    .Surplus{
        background-color: #615C55;
    }
    .Reimbursement{
       background-image: url('../../public/images/Reimbursement.png');
       background-repeat: no-repeat;
       margin-top: 0.03rem;
    }
    .CurrentSecurities{
        background-color: #B8B156;
    }
    .appH5_table th{
        font-size: 15px;
    } 
    .appH5_table td{
        font-size:15px;
    }
    /*   结构图样式   */
    .St-Outer-Table {
        border: 1px solid #666;
        background-color: #615C55;
        color: #FFF;
    }

    .St-Outer-Table tr td {
        position: relative;
    }

    .St-Select {
        background-color: #FF0;
        color: #615C55;
    }

    .St-Inner-Text {
        display: inline-block;
        position: absolute;
        margin: 0 auto;
    }

    .St-Payment {
        background-image: url('../../public/images/table_bg.png');
        opacity: 0.8;
        background-repeat: repeat;
        vertical-align: top;
    }

    .St-Inner-Td {
        vertical-align: top;
        border-left: 1px solid #666;
        border-right: 1px solid #666;
        position: relative;
    }
</style>

<script>
import BusUtil from './BusUtil';
import Vue from 'vue';
import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts';
import getParams from '../../public/js/getParams';
import { NoteStructure } from '../../public/js/NoteStructure.js';

// some charts like solid gauge require `highcharts-more.js`, you can find it in official demo.
import * as chartTheme from '@/public/js/chartTheme';

import * as webApi from '@/config/api';
import axios from 'axios';
import { Toast } from 'mint-ui';
Vue.use(VueHighcharts, { Highcharts });
Highcharts.setOptions(chartTheme);


export default {
    name: 'securityDetail',
    data() {
        return {
            securityDetail:{},
            isSecurityLoading:false,
            chartWidthRem:3,
            chartWidthPx:280,
            isFetchDetailError: false,
            CashflowShowFlag:true,
        };
    },
    created() {
        const busUtil = BusUtil.getInstance();
        busUtil.bus.$emit('showHeader', true);
        busUtil.bus.$emit('path', '/security');
        busUtil.bus.$emit('headTitle', '');
        this.tableFlag=0;
    },
    mounted() {
      //  this.isSecurityLoading=true;
    },
    updated(){
        // if(this.noteConsTable.indexOf('table')!=-1&&this.tableFlag==0){
        //     var paidList=document.getElementsByClassName("divHasPaid");
        //     for(var i=0;i<paidList.length;i++){
        //         paidList[i].style.backgroundImage="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAGCAYAAAD37n+BAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABPSURBVChTY1y3esV/BiDYtX09iGJw8wwE0zAAE/f39QPTTGCSBMCYkRQOtgFmMifLXzC9cfMmMI1uI+k2wPwAA+hu/v6HGUzDxEm0gYEBALKKGjTje4yiAAAAAElFTkSuQmCC)";
        //     }
        //     var bgList=document.getElementsByClassName("structure_bg");
        //     for(var i=0;i<bgList.length;i++){
        //         bgList[i].style.backgroundColor="#B7AFA5";
        //         var aList=bgList[i].getElementsByTagName('a');
        //         for(var j=0;j<aList.length;j++){
        //             aList[j].href="javascript:;";
        //             aList[j].title="";
        //         }
        //     }
        //     var nameList=document.getElementsByClassName("str_n");
        //     for(var k=0;k<nameList.length;k++){
        //         nameList[k].style.color="black";
        //     }
        //     var pctList=document.getElementsByClassName("str_npct");
        //     for(var x=0;x<pctList.length;x++){
        //         pctList[x].style.color="#06c";
        //     }
        //     this.tableFlag=1;
        // }
    },
    activated() {
        //clear all data cache
        this.isSecurityLoading=true;
        this.securityDetail = {};
        window.scrollTo(0,0);
        const busUtil = BusUtil.getInstance();
        busUtil.bus.$emit('showHeader', true);
        busUtil.bus.$emit('path', '/security');
        busUtil.bus.$emit('headTitle', '');
        this.id = this.$route.params.id;
        if (this.id) {
            setTimeout(()=>{
                    this.fetchSecurityDetail(this.id,data=>{
                    busUtil.bus.$emit('headTitle', data.Basic.DealName); 
                    this.securityDetail =data;
                    console.log(this.securityDetail);
                    this.isSecurityLoading=false;
                    // if(data.DealId!=null&&data.DealId>0){
                    //     this.fetchNoteConsTable(data.DealId,280,200);
                    //     this.tableFlag=0;
                    // }
                });
            },600);
            
        }
        busUtil.bus.$emit('showHeader', true);
        busUtil.bus.$emit('path', '/security');
  },
  
    methods: {
        fetchSecurityDetail(id,callback) {
            console.log(webApi.Security.detail.concat(['',id].join('/')));
            axios(webApi.Security.detail.concat(['',id].join('/')))
            .then((response) => {
                if (response.data.status == "ok") {
                    const data = response.data.data;
                    if(data){
                        callback(data);
                    } else{
                        this.doCatch();
                    }
                    //load deal structure
                    this.fetchDealStructure(data.DealId,data.NoteId);
                }
            }).catch((error) => {
                this.doCatch();
            });
        },
        doCatch(){
            Toast('服务器繁忙，请重试！');
            this.isSecurityLoading = false;
            this.isFetchDetailError=true;
        },
        cashflowShow(){
            this.CashflowShowFlag=false;
            var buttonShow=document.getElementById("appH5lookAll");
            buttonShow.setAttribute("style","display:none");
        },
        fetchDealStructure(dealId, noteId) {
            axios(webApi.Security.structure.concat(['',dealId,noteId].join('/'))).then(response => {
                if (response.data.status == 'ok') {
                    NoteStructure({
                       container: 'noteStructure',
                       data: response.data.data.Notes
                    });
                }
            })
        }
        // fetchNoteConsTable(dealId,width,height){
        //     axios(webApi.Product.structure+"/"+dealId+"/"+width+"/"+height)
        //     .then((response)=>{
        //     // console.log(response);
        //         if(response.data.status=="ok"){
        //             this.noteConsTable=response.data.data;
        //         }
        //     });
        // },
        
       
    },
};
</script>