<template>
<div class="appH5_body">
  <div class="product-spinner" v-if="isProductLoading">
      <mt-spinner type="triple-bounce"></mt-spinner>
    </div>
  <div v-else>
  <div class="appH5_content">
      <div class="appH5_panel">
          <table class="appH5_list_four" border="0" cellspacing="0" cellpadding="0">
          <tr>
              <td colspan="4" class="appH5_color_white appH5_word_break">
                 <div class="fl txt_justify">{{detailInfo.DealFullName}}</div>
              </td>
          </tr>
           <tr>
	        		<td class='appH5_color_red' colspan="2" rowspan="2">
              <span class="appH5_font_largest" v-if="detailInfo.TotalOffering>=10">{{Math.round(detailInfo.TotalOffering)}}</span>
              <span class="appH5_font_largest" v-else>{{detailInfo.TotalOffering}}</span>
              <span>亿</span>
					</td>
	        		<td v-if="detailInfo.Coupon !=null" class='appH5_color_skyblue appH5_vertical_bottom appH5_font_larger appH5_white_space'>{{detailInfo.Coupon}}</td>
              <td v-else class="appH5_color_skyblue">-</td>
	        		<td class='appH5_color_skyblue appH5_vertical_bottom appH5_font_larger appH5_white_space'>{{detailInfo.WAL}}年</td>
	        	</tr>
			  	<tr>
            <td v-if="detailInfo.Rating!=null&&detailInfo.Rating!='-'" class='appH5_color_skyblue appH5_font_larger appH5_white_space appH5_vertical_middle'>{{detailInfo.Rating}}</td>
            <td v-else class="appH5_color_skyblue">-</td>
            <td class='appH5_color_skyblue appH5_font_larger appH5_white_space'>{{detailInfo.AssetType}}</td>
          </tr>
          <tr>
	        		<td class='appH5_white_space'>证券类型</td>
	        		<td class="appH5_vertical_top">{{detailInfo.SecurityType}}</td>
	        		<td class='appH5_white_space'>交易类型</td>
	        		<td v-if="detailInfo.TradeType === '转让'">二级市场转让</td>
              <td v-else-if="detailInfo.TradeType === '发行'">一级市场发行</td>
              <td v-else>{{detailInfo.TradeType}}</td>
	      </tr>
	      <tr>
	        		<td class='appH5_white_space'>分层占比</td>
	        		<td>{{detailInfo.NotionalPct}}%</td>
	        		<td class='appH5_white_space'>交易场所</td>
	        		<td>{{detailInfo.Exchange}}</td>
	      </tr>
        <tr v-if="detailInfo.Description !== undefined &&detailInfo.Description !== null && detailInfo.Description.length > 0">
              <td colspan="4" class="txt_justify lineHight introductionCont">
                  <span class="appH5_white_space">产品简介</span>
                  <div class="appH5_margin_top_td_div" v-html="detailInfo.Description" style="word-break: break-all;color: #ccc;">
                  {{detailInfo.Description}}
                  </div>
              </td>
          </tr>
          <tr v-if="detailInfo.AbsProjectUsers !== undefined &&detailInfo.AbsProjectUsers !== null && detailInfo.AbsProjectUsers.length > 0">
              <td colspan="4" class="padtop1">
                  <span class="fl mr5">参与专家</span>
                  <div style="max-width: 6.9rem;">
                    <a v-bind:href="`/webapp/expert.html?UserId=${item.UserId}`"  v-for="item in detailInfo.AbsProjectUsers" class="fl" style="display:inline-block;">
                      <img class="touxiang" :src="item.AvatarPath"/>
                    </a>
                  </div>
                  <div class="clearfix"></div>
              </td>
              </tr>
          <tr v-if="detailInfo.Contacts !== undefined && detailInfo.Contacts !== null && detailInfo.Contacts.length > 0">
              <td colspan="4">
                  <div class="fl mr5">联&nbsp;系&nbsp;人&nbsp;</div>
                  <div class="fl" style="padding-top: .12rem;">
                  <div class="mb08 appH5_color_white" v-for="contactItem in detailInfo.Contacts">{{contactItem.Name}}&nbsp;&nbsp;{{contactItem.Telephone}}</div>
                  </div>
              <div class="clearfix"></div>
              </td>
          </tr>
          <tr>
            <td colspan="4" style="height: 2rem;"></td>
          </tr>
      </table>
      </div>
    </div>
    <div class="fixedMain appH5_font_normal" v-if="contactItem.IsPrimary" v-for="contactItem in detailInfo.Contacts">
        <div class="fl fixedLeft">
              <a v-bind:href="`/webapp/expert.html?UserId=${contactItem.UserId}`"  class="fl" style="margin: .2rem .2rem 0 .32rem;display: inline-block;">
                <img class="touxiang" :src="contactItem.AvatarPath"/>
              </a>
              <div class="fl txtLeft" style="margin: .1rem 0 0 0; display: table; height: 1.3rem;">
                  <div style="display: table-cell; vertical-align: middle;">
                    <div class="lxname">{{contactItem.Name}}</div>
                    <div class="lxcompany appH5_font_smaller">{{contactItem.CompanyDisplay}}</div>
                    <div class="lxcont appH5_font_smaller" v-if="contactItem.Department!=''&&contactItem.Department!=null&&contactItem.Position!=''&&contactItem.Position!=null">{{contactItem.Department}}-{{contactItem.Position}}</div>
                    <div class="lxcont appH5_font_smaller" v-if="contactItem.Department==''||contactItem.Department==null">{{contactItem.Position}}</div>
                    <div class="lxcont appH5_font_smaller" v-if="contactItem.Position==''||contactItem.Position==null">{{contactItem.Department}}</div>
                  </div>
              </div>
              <div class="clearfix"></div>
        </div>
        <a :href="'tel:'+cutStr(contactItem.Telephone)" class="fl fixedRight appH5_bg_pink">
            <img class="phoneImg" src="../../public/images/phone.png"/>
        </a>
        <div class="clearfix"></div>
      </div>
  </div>
  
</div>
</template>

<script> 
import * as webApi from '@/config/api';
import BusUtil from './BusUtil';
import axios from 'axios';
export default {
  name: 'tradeDetail',
  props: ['id'],
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      detailInfo:[],
      newContacts:[],
      isProductLoading:false,
    };
  },
  created() {
    const busUtil = BusUtil.getInstance();
    busUtil.bus.$emit('showHeader', true);
    busUtil.bus.$emit('path', '/trade');
    busUtil.bus.$emit('headTitle', '交易信息');
  }, 
  mounted() {
  },
  methods: {
   fetchTradeDetail(tradeId,noteId,callback) { 
    axios.post(webApi.Trade.detail.concat(['', tradeId, noteId].join('/'))).then((response) => { 
        const data = response.data.data;
        if(data){
            callback(data);
        }else{
          this.doCatch();
        }
      }).catch((error)=>{    
        this.doCatch();
      }); 
    }, 
    cutStr(arr){
        return arr.split("转")[0];
    },
    
    // cutRate(arr){
    //     return arr.split("~")[0];
    // },
    doCatch(){
        Toast('服务器繁忙，请重试！');    
        this.loading = false;
        this.isTradeLoading=false;
        this.isFetchTradesError=true;
    },
  },
  activated() {
    // 滚动到顶部
    window.scrollTo(0,0);
    const busUtil = BusUtil.getInstance();
    busUtil.bus.$emit('showHeader', true);
    busUtil.bus.$emit('path', '/trade');
    busUtil.bus.$emit('headTitle', '交易信息');
    this.tradeId = this.$route.params.tradeId;
    this.noteId = this.$route.params.noteId;
    this.isProductLoading=true;
    //debugger;
    this.fetchTradeDetail(this.tradeId,this.noteId,data => {   //59,9461,this.tradeId,this.noteId
    this.detailInfo = data;
    this.isProductLoading=false;
    });
},
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.appH5_content{
  width: 100%;
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
.mb08{
  margin-bottom: .08rem;
}
.mr5{
  margin-right: .5rem;
  margin-top: 0.12rem;
}
.padtop1{
  padding-top: .16rem;
}
.txt_justify{
    text-align: justify;
}
.lineHight{
  line-height: 0.6rem;
}
.pdrSpecial span{
  display: inline-block;
  width: 1.8rem;
}
.pdrSpecial div.fl{
  width: 7.2rem;
}
.pdrSpecial{
    padding-top: 0!important;
}
.inlineBlock{
  display: inline-block;
}
.touxiang{
  border: none;
  border-radius: 50%;
  -webkit-border-radius:50%;
  background-color: #fff;
}
.appH5_content table .touxiang,.phoneImg{
  width: .8rem;
  height: .8rem;
}
.fixedLeft .touxiang{
  width: 1.2rem;
  height: 1.2rem;
}
.appH5_content table .touxiang{
  display: inline-block;
  margin-right: .05rem;
}
.fixedMain{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
.fixedLeft{
  width: 65%;
  height: 1.6rem;
  background-color: #2B2B2B;
  color: #fff;
}
.fixedRight{
  width: 35%;
  height: 1.6rem;
  align-items:center;
  display: -webkit-box;
  display: flex;
  display:-webkit-flex;
  justify-content:center;
}
.lxname{
  font-size: .4rem;
}
.lxcompany,.lxcont{
  max-width: 4.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: .3rem;
  color:#ccc;
}
.introductionCont{
  padding-top: .3rem;
}
.introductionCont div{
  padding-top: .08rem;
}
@media only screen and (min-width: 320px) and (max-width: 374px){
    .appH5_content table tr td:nth-child(1),.appH5_content table tr td:nth-child(3){
        width: 13%;
        padding-right: .2rem!important;
    }
    .appH5_content table tr td:nth-child(2){
        width: 27%;
    }
    .appH5_content table tr td:nth-child(4){
        width: 40%;
    }
    .appH5_font_larger {
       font-size: 17px!important;
    }
}
</style>
