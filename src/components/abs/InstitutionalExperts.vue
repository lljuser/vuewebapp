<template>
<div class="appH5_body">
  <div class="product-spinner" v-if="isExpertsLoading">
      <mt-spinner type="triple-bounce"></mt-spinner>
    </div>
  <div v-else>
    <div class="appH5_content">
      <div class="appH5_panel">
        <div class="relevant-item">
          <div class="padStyle" v-for="item in expertsInfo">
              <div style="position: relative;">
                
                  <img :src="'http://10.1.1.35:8000/filestore/common/downloadimg/cnabs/'+item.Avatar+'/s'" class="related-image appH5_fl"/>
                  <!-- <img :src="'https://file.cn-abs.com/filestore/common/downloadimg/cnabs/'+item.Avatar+'/s'" class="related-image appH5_fl"/> -->
              </div>
              <div class="related-info appH5_fl">
                  <div class="related-info-cont">
                      <div class="relevant-item-name">
                        <a v-bind:href="`/webapp/expert.html?UserId=${item.UserId}&isShowHeader=true&path=${$route.path}`" class="appH5_font16 appH5_link">{{item.UserName}}</a>
                        <span v-if="item.Verified===1" class="authenticated">已认证</span>
                      </div>
                      <div class="relevant-item-conts appH5_font12">
                          <div class="relevant-item-info">
                            <div class="content-truncate" v-if="item.Department!=''&&item.Department!=null&&item.Title!=''&&item.Title!=null">{{item.Department}}-{{item.Title}}</div>
                            <div class="content-truncate" v-if="item.Department==''||item.Department==null">{{item.Title}}</div>
                            <div class="content-truncate" v-if="item.Title==''||item.Title==null">{{item.Department}}</div>
                          </div>
                      </div>
                  </div>
              </div>
              <a href="javascript;" v-if="!item.Followed" class="appH5_fr appH5_followBtn">+关注</a>
              <a href="javascript;" v-if="item.Followed" class="appH5_fr appH5_unfollowBtn">已关注</a>
              <div class="clearfix"></div>
            </div>
        </div>
      </div>
    </div>
  </div>
  
</div>
</template>

<script> 
import BusUtil from './BusUtil';
import Vue from 'vue';
import util from "@/public/modules/expert/utils";
import * as webApi from '@/config/api';
import axios from 'axios';
import getParams from '../../public/js/getParams';
import { Toast } from 'mint-ui';
export default {
  name: 'institutionalExperts',
  data() {
    return {
      expertsInfo:[],
      isExpertsLoading:false,
    };
  },
  created() {
        const busUtil = BusUtil.getInstance();
        busUtil.bus.$emit('showHeader', true);
        busUtil.bus.$emit('path', '/organDetail/1');
        busUtil.bus.$emit('headTitle', '');
        this.tableFlag=0;
  }, 
  mounted() {
  },
  activated(){
    this.isExpertsLoading=true;
    this.expertsInfo = {};
    window.scrollTo(0,0);
    const busUtil = BusUtil.getInstance();
    busUtil.bus.$emit('showHeader', true);
    busUtil.bus.$emit('path', '/organDetail/1');
    busUtil.bus.$emit('headTitle', '');
    this.id = this.$route.params.id;
    if (this.id) {
        setTimeout(()=>{
            this.fetchExpertsDetail(this.id,data=>{
                busUtil.bus.$emit('headTitle', '机构专家'); 
                this.expertsInfo =data;
                this.isExpertsLoading=false;
            });
        },600);
    }
  },
  methods: {
    fetchExpertsDetail(id,callback) {
      console.log(webApi.Organ.expertList.concat(['',id].join('/')));
            axios(webApi.Organ.expertList.concat(['',id].join('/')))
            .then((response) => {
                if (response.data.status == "ok") {
                    const data = response.data.data;
                    if(data){
                        callback(data);
                    } else{
                        this.doCatch();
                    }
                }
            }).catch((error) => {
                this.doCatch();
            });
   },
    doCatch(){
        Toast('服务器繁忙，请重试！');
        this.isExpertsLoading = false;
        this.isFetchDetailError=true;
    },
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
  border-bottom: #3B3A39 solid 1px;
  background-color: black;
}
.relevant-item {
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
.authenticated {
    vertical-align: middle;
    margin-left: .15rem;
    background-color: #FF7272;
    display: inline-block;
    font-size: 10px;
    color: #fff !important;
    padding: .05rem .05rem;
    border-radius: 2px;
    -webkit-border-radius: 2px;
    letter-spacing: 1px;
    line-height: 14px;
    margin-top: -3px;
}
</style>
