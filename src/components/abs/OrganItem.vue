<template>
  <tr>
    <td class="text-left">
      <router-link :to="`../../OrganDetail/${ item.OrganizationId}`" class="appH5_color_link" style=""  >
       <div class='td_elips1'> {{ item.Organization }}
       </div>
      </router-link>

    </td>
    <td style="color:white;width:auto" class="text-right"><div style="width:100%;float:right"><div>{{ item.DealCount }}</div></div></td>
  </tr>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
  name: 'organItem',
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
