<template>
  <tr>
    <td class="text-left">      
      <div v-if="item.SecurityType=='优'" class="appH5_float_left securityLevelDiv appH5_bg_senior">{{item.SecurityType}}</div>
      <div v-if="item.SecurityType=='夹'" class="appH5_float_left securityLevelDiv appH5_bg_mezzanine">{{item.SecurityType}}</div>
      <div v-if="item.SecurityType=='次'" class="appH5_float_left securityLevelDiv appH5_bg_subordin">{{item.SecurityType}}</div>
      <router-link :to="`../../securityDetail/${ item.NoteId}`" class="appH5_color_link appH5_float_left" style="width:80%"> 
       <div class='td_elips1'> {{ item.Description }}</div>
      </router-link>
    </td>
    <td class="text-left appH5_color_red" style="font-size:17px">
      <div v-if="item.RepaymentOfPrincipal=='摊'" class="appH5_float_left securityLevelDiv appH5_bg_amortization">{{item.RepaymentOfPrincipal}}</div>      
      <div v-if="item.RepaymentOfPrincipal=='过'" class="appH5_float_left securityLevelDiv appH5_bg_passthrough">{{item.RepaymentOfPrincipal}}</div>      
      <div>{{item.Principal}}</div>
      </td>
    <td style="color:white" class="text-right"><div>{{ item.CurrentCoupon }}</div></td>
  </tr>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  name: "securityItem",
  props: ["id", "item"],
  mounted() {},
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    onClick() {
      const instance = Toast("提示信息");
      setTimeout(() => {
        instance.close();
      }, 2000);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table_td_number {
  font-size: 17px;
}

.td_elips1 {
  width: 110%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.securityLevelDiv {
  width: 17px;
  height: 17px;
  font-size: 12px;
  text-align: center;
  margin-top: 4px;
  margin-right: 4px;
  color: #ffffff;
}
</style>
