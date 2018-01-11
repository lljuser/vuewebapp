<template>
  <tr>
    <td class="text-left">
  <router-link :to="`../../tradedetail/${ item.TradeId}/${ item.SecurityId}`" class="appH5_color_link">
        <div class='td_elips1'>{{item.SecurityName}}</div>
      </router-link>
    </td>
    <td class="text-right appH5_font_larger appH5_color_red">{{item.TotalOffering}}</td>
    <td class="text-right">{{item.Rating}}</td>
    <td class="text-right">{{item.WAL}}</td>
    <td class="text-right td_tworows" v-if="item.Coupon!=null && item.Coupon.split('~').length>1">{{item.Coupon.split('~')[0]}}<br><span>/</span>{{item.Coupon.split('~')[1]}}</td>
    <td class="text-right" v-else>{{item.Coupon}}</td>

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
   width:100%;
   text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
 }
 .td_tworows{
   padding:0 0.32rem 0 0;
 }
</style>
