<template>
  <tr>
    <td class="text-left">
  <router-link :to="`../../tradedetail/${ item.TradeId}/${ item.SecurityId}`" class="appH5_color_link">
        <div class='td_elips1'>{{item.SecurityName}}</div>
      </router-link>
    </td>
    <td class="text-right td_tworows">
      <div class="appH5_color_red">{{item.TotalOffering}}</div>
      <div class="tradeStatusHeight">
      <div v-if="item.TradeType=='转让'" class="tradeStatusDiv tradeStatusBlue">转让</div>
      <div v-if="item.TradeType=='发行'" class="tradeStatusDiv tradeStatusRed">发行</div>
      <div v-if="item.TradeType=='求购'" class="tradeStatusDiv tradeStatusGreen">求购</div>
      </div>
    </td>
    <td class="text-right td_tworows">
      <div>{{item.WAL}}</div>
      <div class="appH5_color_details appH5_font_smaller">{{item.Rating}}</div>
    </td>
    <td class="text-right td_tworows tradeMiddleFont" v-if="item.Coupon!=null && item.Coupon.split('~').length>1">
      <div>{{item.Coupon.split('~')[0]}}</div>
      <div>~{{item.Coupon.split('~')[1]}}</div>
    </td>
    <td class="text-right tradeMiddleFont" v-else>{{item.Coupon}}</td>

  </tr>
</template>

<script>
export default {
  name: 'tradeItem',
  props: ['item'],
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tradeTotall{
  color:#ee7a76;
  font-size: 17px;
}
.td_elips1 {
   width:108%;
   text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
 }
 .td_tworows{
   padding:0 0.146667rem 0 0;
 }
 .tradeStatusDiv{
   text-align: center;
   font-size: 10px; 
   font-weight: lighter;  
   border-radius: 2px;
   padding: 0 5px;
   float: right;
 }
 .tradeStatusBlue{
   border: 1px solid #26A1ff;
   color: #26A1ff;   
 }
  .tradeStatusRed{
   border: 1px solid #ff7272;
   color: #ff7272;   
 }
  .tradeStatusGreen{
   border: 1px solid #2ce5ab;
   color: #2ce5ab;   
 }
 .tradeMiddleFont{
   font-size: 15px;
 }
 .tradeStatusHeight{
   padding-bottom: 17px;
 }
</style>
