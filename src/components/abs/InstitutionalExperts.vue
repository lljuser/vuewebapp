<template>
<div class="appH5_body">
  <div class="product-spinner" v-if="isProductLoading">
      <mt-spinner type="triple-bounce"></mt-spinner>
    </div>
  <div v-else>
    <div class="appH5_content">
      <div class="appH5_panel">
        <div class="relevant-itemA" style="margin-top: 0;">
            <div style="position: relative;">
                <img src="../../public/images/userAvatar.png" class="related-image appH5_fl" style="margin-top: 8px;"/>
            </div>
            <div class="related-info appH5_fl" style="display: table; margin-left: 5px;">
                <div style="display: table-cell; vertical-align: middle; height: 80px;">
                    <div class="relevant-item-name"><span class="appH5_font16 appH5_link">晓蕾</span></div>
                    <div class="width130 relevant-item-conts">
                        <div class="relevant-item-info">
                            <span class="content-truncate width195">部门-职位</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="appH5_fr appH5_followBtn">+关注</div>
            <div class="clearfix"></div>
        </div>
      </div>
    </div>
  </div>
  
</div>
</template>

<script> 
import * as webApi from '@/config/api';
import BusUtil from './BusUtil';
import util from "@/public/modules/expert/utils";
import axios from 'axios';
export default {
  name: 'institutionalExperts',
  props: ['id'],
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      detailInfo:[],
      newContacts:[],
      isProductLoading:false,
    };
  },
  created() {
  }, 
  mounted() {
  },
  methods: {
 
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.appH5_font12{
  font-size: 12px;
}
.appH5_font16{
  font-size: 16px;
}
.related-image {
    width: 1.0667rem;
    height: 1.0667rem;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    margin-left: 0;
}
.briefIntroduction {
    text-align: justify;
    padding: 0 20px 20px 20px;
    line-height: 22px;
}
.relevant-item-name {
    line-height: 26px;
    font-size: 14px;
}
.width130 {
    width: 130px;
}
.width195 {
    width: 205px;
}
.relevant-item-info {
    line-height: 16px;
    font-size: 14px;
}
.appH5_followBtn,.appH5_unfollowBtn{
    width: 1.3333rem;
    height:.61333rem;
    line-height:.61333rem;
    border-radius: 2px;
    -webkit-border-radius: 2px;
    text-align: center;
}
.appH5_followBtn{
    border: #00FC00 solid 1px;
    color: #00FC00;
}
.appH5_unfollowBtn{
    border: #666666 solid 1px;
    color: #666666;
}
</style>
