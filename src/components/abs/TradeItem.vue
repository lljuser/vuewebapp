<template>
  <tr>
    <td>
      <div v-if="item.TradeTypeId==1" class="tradingMarketDiv appH5_bg_blue">P</div>
      <div v-if="item.TradeTypeId==2" class="tradingMarketDiv appH5_bg_purple">S</div>
    </td>
    <td class="text-left">
  <router-link :to="`../../tradedetail/${ item.TradeId}/${ item.SecurityId}`" class="appH5_color_link">
        <div class='td_elips1'>{{item.SecurityName}}</div>
      </router-link>
    </td>
    <td class="text-right">
      <div class="appH5_color_red">{{item.TotalOffering}}</div>
    </td>
    <td class="text-right">
      <div class="appH5_ellipsis" style="width:100%">{{item.AssetType}}</div>
    </td>
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
 .tradingMarketDiv{
   width: 15px;
   height: 15px;
   text-align: center;   
   margin: 0 auto;
   font-size: 13px;
 }
</style>
