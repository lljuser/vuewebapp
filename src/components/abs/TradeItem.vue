<template>
  <tr>
    <td style="padding-left:0;padding-right:0">
      <div v-if="item.TradeTypeId==1" class="appH5_bg_blue appH5_square_char">P</div>
      <div v-if="item.TradeTypeId==2" class="appH5_bg_purple appH5_square_char">S</div>
    </td>
    <td class="text-left">
      <router-link :to="`../../tradedetail/${ item.TradeId}/${ item.SecurityId}`" class="appH5_color_link" @click.native='setOriginPath'>
        <div class='td_elips1'>{{item.SecurityName}}</div>
      </router-link>
    </td>
    <td class="text-right">
      <div class="appH5_color_red" style="margin-bottom:-2px;">{{item.TotalOffering}}</div>
    </td>
    <td class="text-right">
      <div class="appH5_ellipsis" style="width:100%">{{item.AssetType}}</div>
    </td>
  </tr>
</template>

<script>
import BusUtil from "./BusUtil";
const busUtil = BusUtil.getInstance();

export default {
  name: 'tradeItem',
  props: ['item'],
  data() {
    return {
    };
  },
    methods: {
    setOriginPath() {
      busUtil.bus.$emit("originPath", 'trade');
    },
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
   font-size: 13px;
   line-height: 15px;
 }



 
</style>
