<template>
  <tr>
    <td class="text-left">
      <router-link :to="`../../OrganDetail/${ item.OrganizationId}`" class="appH5_color_link" style="" @click.native="setOriginPath" >
       <div class='td_elips1'> {{ item.Organization }}
       </div>
      </router-link>

    </td>
    <td style="color:white;width:auto" class="text-right"><div style="width:100%;float:right"><div>{{ item.DealCount }}</div></div></td>
  </tr>
</template>

<script>
import BusUtil from "./BusUtil";
const busUtil = BusUtil.getInstance();
export default {
  name: 'organItem',
  props: ['id', 'item'],
  mounted() {
  },
  data() {
    return {
    };
  },
  methods: {
    setOriginPath() {
      busUtil.bus.$emit("originPath", 'organ');
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
