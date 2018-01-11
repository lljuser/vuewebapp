<template>
  <tr>
    <td class="text-left">
      <router-link :to="`../productDetail/${ item.DealId}`" class="appH5_color_link" style=""  >
       <div class='td_elips1'> {{ item.DealName }}</div>
      </router-link>
    </td>
    <td class="text-right appH5_color_red" style="font-size:17px">{{item.TotalOffering}}</td>
    <td style="color:white" class="text-right td_elips2"><div style="width:100%;float:right"><div>{{ item.DealType }}</div></div></td>
  </tr>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
  name: 'productItem',
  props: ['id', 'item'],
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
   width:120px;
   text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
 }

 .td_elips2 div{
   width: 90px;
   text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    float: right;
 }
</style>
