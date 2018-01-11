<template>
<div class="appH5_body">
  <div class="appH5_content">
    <div class="appH5_panel">
        <table class="appH5_list_four" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="pdrSpecial appH5_vertical_Top appH5_white_space">
            <span>产品名称</span>  
            </td>
            <td colspan="3">
            <div class="fl txt_justify">{{detailInfo.DealFullName}}</div>
            </td>
        </tr>
        <tr>
            <td class="appH5_white_space">期限(年)</td>
            <td>{{detailInfo.WAL}}</td>
            <td class="appH5_white_space">交易类型</td>
            <td>{{detailInfo.TradeType}}</td>
        </tr>
        <tr>
            <td class="appH5_white_space">证券类型</td>
            <td class="appH5_color_link"><router-link :to="'/trade/'+gradeId+'/'+securityId"><a href="javascript:;">{{detailInfo.SecurityType}}</a></router-link></td>
            <td class="appH5_white_space">评&#12288;&#12288;级</td>
            <td>{{detailInfo.Rating}}</td>
        </tr>
        <tr>
            <td class="appH5_white_space">分层占比</td>
            <td>{{detailInfo.NotionalPct}}%</td>
            <td class="appH5_white_space">产品类型</td>
            <td>{{detailInfo.AssetType}}</td>
        </tr>
        <tr>
            <td class="appH5_white_space">利率(%)</td>
            <td>{{detailInfo.Coupon}}</td>
            <td class="appH5_white_space">交易场所</td>
            <td>{{detailInfo.Exchange}}</td>
        </tr>
        <tr>
            <td class="appH5_white_space" style="vertical-align: middle;">金额(亿)</td>
            <td  colspan="3" class="appH5_color_red appH5_font_largest">{{detailInfo.TotalOffering}}</td>
        </tr>
        <tr>
            <td colspan="4" class="txt_justify lineHight">
                <span class="appH5_white_space">产品简介</span>
                <div class="appH5_color_white appH5_margin_top_td_div" v-html="detailInfo.Description" style="word-break: break-all;">
                {{detailInfo.Description}}
                </div>
            </td>
        </tr>
        <tr v-if="detailInfo.AbsProjectUsers !== null && detailInfo.AbsProjectUsers.length > 0">
            <td colspan="4">
                <span class="fl mr5">参与专家</span>
                <div class="fl" style="max-width: 6.9rem;">
                <img class="touxiang" v-for="item in detailInfo.AbsProjectUsers" :src="item.AvatarPath"/>
                </div>
                <div class="clearfix"></div>
            </td>
            </tr>
        <tr v-if="detailInfo.Contacts !== null && detailInfo.Contacts.length > 0">
            <td colspan="4">
                <div class="fl mr5">联&nbsp;系&nbsp;人&nbsp;</div>
                <div class="fl">
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
          <div class="fl" style="margin: .2rem .2rem 0 .32rem;">
            <img class="touxiang" :src="contactItem.AvatarPath"/>
          </div>
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
    <a :href="'tel:'+cutStr(contactItem.Telephone)" class="fl fixedRight">
        <img class="phoneImg" src="../../public/images/phone.png"/>
    </a>
    <div class="clearfix"></div>
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
        }
      });
    }, 
    cutStr(arr){
        return arr.split("转")[0];
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
    //debugger;
    this.fetchTradeDetail(this.tradeId,this.noteId,data => {   //59,9461,this.tradeId,this.noteId
    this.detailInfo = data;
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
  background-color: #47423c;
  color: #fff;
}
.fixedRight{
  width: 35%;
  height: 1.6rem;
  background-color: #ff7271;
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
.appH5_list_four td:nth-of-type(2n+1){
    width: 22%;
    padding-right: 0!important;
}
@media only screen and (min-width: 320px) and (max-width: 374px){
    .appH5_content table tr td:nth-child(1),.appH5_content table tr td:nth-child(3){
        width: 19%;
        padding-right: .2rem!important;
    }
    .appH5_content table tr td:nth-child(2){
        width: 27%;
    }
    .appH5_content table tr td:nth-child(4){
        width: 40%;
    }
}
</style>
