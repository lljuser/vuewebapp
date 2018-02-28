<template>
  <tr>
    <td class="text-left" style="padding-left:0;padding-right:0">      
      <div v-if="item.RepaymentOfPrincipal=='摊'" class="appH5_square_ch_char appH5_bg_blue">{{item.RepaymentOfPrincipal}}</div>      
      <div v-if="item.RepaymentOfPrincipal=='过'" class="appH5_square_ch_char appH5_bg_passthrough">{{item.RepaymentOfPrincipal}}</div>      
    </td>
    <td> 
      <router-link :to="`../../securityDetail/${ item.NoteId}`" class="appH5_color_link appH5_float_left" style="width:100%" @click.native='setOriginPath'> 
       <div class='td_elips1'> {{ item.Description }}</div>
      </router-link></td>
    <td style="font-size:17px" class="text-right" >
      <div class="appH5_color_red" style="margin-bottom:-2px;">{{item.Principal}}</div>
      </td>
    <td style="color:white" class="text-right"><div style="margin-bottom:-2px;">{{ item.CurrentCoupon }}</div></td>
  </tr>
</template>

<script>
import BusUtil from "./BusUtil";
const busUtil = BusUtil.getInstance();

export default {
  name: "securityItem",
  props: ["id", "item"],
  mounted() {},
  data() {
    return {};
  },
  methods: {
    setOriginPath() {
      busUtil.bus.$emit("originPath", "security");
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
  width: 15px;
  height: 15px;
  text-align: center;
  margin-top: 3px;
  margin-right: 4px;
  color: #ffffff;
  display: table;
  font-size: 12px;
}
</style>
