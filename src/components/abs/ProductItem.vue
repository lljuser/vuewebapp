<template>
  <tr>
    <td class="text-left">
      <router-link :to="`productDetail/${ item.DealId}`" class="appH5_color_link" style=""  >
        {{ item.DealName }}
      </router-link>
    </td>
    <td class="text-right appH5_color_red appH5_font_large" style="font-size:17px">{{item.TotalOffering}}</td>
    <td style="color:white">{{ item.ProductType }}</td>
    <td style="color:white" class="text-right">{{ item.ClosingDate | moment("YY-MM-DD") }}</td>
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
</style>
