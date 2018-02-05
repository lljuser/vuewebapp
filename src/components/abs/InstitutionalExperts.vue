<template>
<div class="appH5_body">
  <div class="product-spinner" v-if="isProductLoading">
      <mt-spinner type="triple-bounce"></mt-spinner>
    </div>
  <div v-else>
    <div class="appH5_content">
      <div class="appH5_panel">
        <div class="relevant-item">
          <div class="padStyle">
              <div style="position: relative;">
                  <img src="../../public/images/userAvatar.png" class="related-image appH5_fl"/>
              </div>
              <div class="related-info appH5_fl">
                  <div class="related-info-cont">
                      <div class="relevant-item-name"><a href="javascript;" class="appH5_font16 appH5_link">晓蕾</a></div>
                      <div class="relevant-item-conts appH5_font12">
                          <div class="relevant-item-info">
                              <span class="content-truncate">部门abs absabsabsabsabsabsabs-职位职位职位职位职位职位职位</span>
                          </div>
                      </div>
                  </div>
              </div>
              <a href="javascript;"  class="appH5_fr appH5_followBtn">+关注</a>
              <div class="clearfix"></div>
            </div>
        </div>
        
        <div class="relevant-item">
          <div class="padStyle">
              <div style="position: relative;">
                  <img src="../../public/images/userAvatar.png" class="related-image appH5_fl"/>
              </div>
              <div class="related-info appH5_fl">
                  <div class="related-info-cont">
                      <div class="relevant-item-name"><a href="javascript;" class="appH5_font16 appH5_link">晓蕾</a></div>
                      <div class="relevant-item-conts appH5_font12">
                          <div class="relevant-item-info">
                              <span class="content-truncate">部门abs absabsabsabsabsabsabs-职位职位职位职位职位职位职位</span>
                          </div>
                      </div>
                  </div>
              </div>
              <a href="javascript;"  class="appH5_fr appH5_unfollowBtn">已关注</a>
              <div class="clearfix"></div>
            </div>
        </div>
        
        <div class="relevant-item">
          <div class="padStyle">
              <div style="position: relative;">
                  <img src="../../public/images/userAvatar.png" class="related-image appH5_fl"/>
              </div>
              <div class="related-info appH5_fl">
                  <div class="related-info-cont">
                      <div class="relevant-item-name"><a href="javascript;" class="appH5_font16 appH5_link">晓蕾</a></div>
                      <div class="relevant-item-conts appH5_font12">
                          <div class="relevant-item-info">
                              <span class="content-truncate">部门abs absabsabsabsabsabsabs-职位职位职位职位职位职位职位</span>
                          </div>
                      </div>
                  </div>
              </div>
              <a href="javascript;" class="appH5_fr appH5_followBtn">+关注</a>
              <div class="clearfix"></div>
            </div>
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
.appH5_panel{
  padding: 0;
}
.padStyle{
  padding: 0 .32rem;
}
.relevant-item {
  border-bottom: #444444 solid 1px;
  height: 1.86667rem;
  width: 100%;
}
.related-image {
    width: 1.0667rem;
    height: 1.0667rem;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    margin-top: .4rem;
}
.content-truncate{
  display: block;
  width: 5.7333rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.appH5_followBtn,.appH5_unfollowBtn{
    width: 1.3333rem;
    height:.61333rem;
    line-height:.61333rem;
    border-radius: .10667rem;
    -webkit-border-radius: .10667rem;
    text-align: center;
    margin-top: 0.66rem;
    display: block;
}
.appH5_followBtn{
    border: #00FC00 solid 1px;
    color: #00FC00;
}
.appH5_unfollowBtn{
    border: #666666 solid 1px;
    color: #666666;
}
.related-info {
  display: table; 
  margin-left: .26667rem;
}
.related-info-cont{
  display: table-cell; 
  vertical-align: middle; 
  height: 1.8667rem;
  line-height: .55rem;
}
</style>
