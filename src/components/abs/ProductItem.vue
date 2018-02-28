<template>
  <tr>
    <td class="text-left">
      <router-link :to="`../../productDetail/${ item.DealId}?fromtab=product`" class="appH5_color_link" @click.native="setOriginPath">
       <div class='td_elips1'> {{ item.DealName }}</div>
      </router-link>
    </td>
    <td class="text-right appH5_color_red" style="font-size:17px">{{item.TotalOffering}}</td>
    <td style="color:white" class="text-right td_elips2"><div style="width:100%;float:right"><div>{{ item.DealType }}</div></div></td>
  </tr>
</template>

<script>
import { Toast } from 'mint-ui';
import BusUtil from "./BusUtil";
const busUtil = BusUtil.getInstance();
export default {
  name: 'productItem',
  props: ['id', 'item'],
  mounted() {
  },
  data() {
    return {
    };
  },
  methods: {
    setOriginPath() {
      busUtil.bus.$emit("originPath", 'product');
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
