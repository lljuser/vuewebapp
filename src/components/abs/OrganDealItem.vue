<template>
  <tr>
    <td class="text-left">
      <router-link :to="`../../productDetail/${ item.DealId}?fromtab=organDeal&dealid=${dealid.dealid}${noheader.noheader?'&noheader=1':''}`" class="appH5_color_link" style=""  >
       <div class='td_elips1'> {{ item.DealName }}</div>
      </router-link>
    </td>
    <td class="text-right appH5_color_red" style="font-size:17px">{{item.TotalOffering}}</td>
    <td style="color:white;width:auto" class="text-right"><div style="width:100%;float:right"><div>{{ item.DealType }}</div></div></td>
  </tr>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
  name: 'organDealItem',
  props: ['id', 'item','noheader','dealid'],
  mounted() {
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  methods: {
    onClick() {
      const instance = Toast('提示信息');
      setTimeout(() => {
        instance.close();
      }, 2000);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .table_td_number{
   font-size: 17px;
 }

 .td_elips1 {
   width:105%;
   text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
 }

 .td_elips2 div{
   width: 100%;
   text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    float: right;
 }
</style>
