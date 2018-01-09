<template>
  <tr>
    <td class="text-left">
      <router-link :to="`productDetail/${id}`" class="appH5_color_link" style=""  >
        {{ item.Title }}
      </router-link>
    </td>
    <td class="text-right appH5_color_red">22.00</td>
    <td style="color:white">{{ item.Content }}</td>
    <td style="color:white" class="text-right">{{ item.Time | moment("YYYY-MM-DD") }}</td>
  </tr>
</template>

<script>
import { Toast } from 'mint-ui';

export default { 
  name: 'productItem', 
  props: ['id', 'item'], 
  created() {
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
 
</style>
