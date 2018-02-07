
<template>
<div class="appH5_body">
  <div class="product-spinner" v-if="isExpertsLoading">
      <mt-spinner type="triple-bounce"></mt-spinner>
    </div>
  <div v-else>
    <div class="appH5_content" >
      <div class="appH5_panel">
      <mt-loadmore :top-method="loadTop"  ref="loadmore">
        <div class="relevant-item"  v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-immediate-check="true"
          infinite-scroll-distance="55">
          <div class="padStyle" v-for="item in expertsInfo">
              <div style="position: relative;">
                  <img :src="item.Avatar" class="related-image appH5_fl"/>
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
              <!-- <span v-if="!item.Followed" class="appH5_fr appH5_followBtn">+关注</span>
              <span v-if="item.Followed" class="appH5_fr appH5_unfollowBtn">已关注</span> -->
              <span class="appH5_fr appH5_followBtn" v-bind:class="[!item.Followed?'appH5_followBtn':'appH5_unfollowBtn']" v-on:click="followHandle(item)">{{!item.Followed ? "+关注":'已关注'}}</span>
              <div class="clearfix"></div>
            </div>
        </div>
         
      </mt-loadmore>
         <div class="spinner_div" v-if="expertsInfo.length==0">
          <span  class="nomore">暂无数据</span>
        </div>
        <div class="spinner_div" v-else >
          <van-loading type="spinner" v-if="!noMore" color="white" class="spinner-circle"/>
          <span v-if="noMore" class="nomore">没有更多了</span>
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import BusUtil from "./BusUtil";
import Vue from "vue";
import util from "@/public/modules/expert/utils";
import * as webApi from "@/config/api";
import axios from "axios";
import getParams from "../../public/js/getParams";
import { Toast } from "mint-ui";
import "mint-ui/lib/style.css";

export default {
  name: "institutionalExperts",
  data() {
    return {
      expertsInfo: [],
      isExpertsLoading: false,
      CurrentStatus: [],
      loading: false,
      isFetchExpertsError: false,
      page: 1,
      pageSize: 10,
      noMore: false,
      isLoadTop: false,
    };
  },
  created() {
    const busUtil = BusUtil.getInstance();
    busUtil.bus.$emit("showHeader", true);
    busUtil.bus.$emit("path", "/organDetail/"+this.$route.params.id);
    busUtil.bus.$emit("headTitle", "");
    this.tableFlag = 0;
  },
  mounted() {
    this.isExpertsLoading = true;
    this.timer = setTimeout(() => {
      this.loadFirstPageExperts();
    }, 600);
  },
  activated() {
    this.loading = false;
    this.isExpertsLoading = true;
    this.expertsInfo = {};
    window.scrollTo(0, 0);
    const busUtil = BusUtil.getInstance();
    busUtil.bus.$emit("showHeader", true);
    busUtil.bus.$emit("path", "/organDetail/"+this.$route.params.id);
    busUtil.bus.$emit("headTitle", "机构专家");
    if (this.isFetchExpertsError) {
      this.loadFirstPageExperts();
    }
  },
  deactivated() {
    this.timer && clearTimeout(this.timer);
    // 防止在其他组件滚动时 此组件调用loadMore方法
    this.loading = true;
  },
  methods: {
    followHandle(exItem) {
      // 关注
        axios(webApi.Organ.followList.concat(['',exItem.Followed,exItem.UserId].join('/'))).then(response => {
              if (response.data.status == 'ok') {
                exItem.Followed=!exItem.Followed;
              }
              else {
                this.doCatch();
              }
        })
    },
    loadFirstPageExperts(showSpinnerLoad) {
      this.loading = false;
      this.isExpertsLoading = true;
      if (showSpinnerLoad != null) this.isExpertsLoading = false;
      setTimeout(() => {
        this.fetchExpertsDetail(1, 0, data => {
          this.expertsInfo = data;
          this.isExpertsLoading = false;
          this.page = 1;
          if (data.length < this.pageSize) {
            this.noMore = true;
          }
          if (showSpinnerLoad != null) this.$refs.loadmore.onTopLoaded();
        });
      }, 600);
    },
    fetchExpertsDetail(page, direction, callback) {
      var url = webApi.Organ.expertList + "/" + this.$route.params.id;
      url =url +"/" +direction +"/" +page * this.pageSize +"/" +this.pageSize;
      axios.post(url).then(response => {
          if (response.data.status == "ok") {
            const data = response.data.data;
            if (data) {
              callback(data);
              if (data.length == 0) {
                this.loading = true;
                this.noMore = true;
              }
              this.isFetchExpertsError = false;
              this.isLoadTop = false;
            } else {
              this.doCatch();
            }
          }
        })
        .catch(error => {
          this.doCatch();
        });
    },
    loadTop() {
      this.isLoadTop = true;
      this.timer = setTimeout(() => {
        this.loadFirstPageExperts(true);
      }, 600);
    },
    loadMore() {
      this.loading = true;
      this.noMore = false;
      setTimeout(() => {
        this.fetchExpertsDetail(this.page, 1, data => {
          this.expertsInfo = this.expertsInfo.concat(data);
          this.page = this.page + 1;
          this.loading = false;
        });
      }, 600);
    },
    doCatch() {
      Toast("服务器繁忙，请重试！");
      this.isExpertsLoading = false;
      this.isFetchExpertsError = true;
      this.loading = false;
      if (this.isLoadTop) {
        setTimeout(() => {
          this.$refs.loadmore.onTopLoaded();
        }, 4000);
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.appH5_font12 {
  font-size: 12px;
}
.appH5_font16 {
  font-size: 16px;
}
.appH5_panel {
  padding: 0;
}
.padStyle {
  padding: 0 0.32rem;
  border-bottom: #3b3a39 solid 1px;
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
  margin-top: 0.4rem;
}
.content-truncate {
  display: block;
  width: 5.7333rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.appH5_followBtn,
.appH5_unfollowBtn {
  width: 1.3333rem;
  height: 0.61333rem;
  line-height: 0.61333rem;
  border-radius: 0.10667rem;
  -webkit-border-radius: 0.10667rem;
  text-align: center;
  margin-top: 0.66rem;
  display: block;
}
.appH5_followBtn {
  border: #00fc00 solid 1px;
  color: #00fc00;
}
.appH5_unfollowBtn {
  border: #666666 solid 1px;
  color: #666666;
}
.related-info {
  display: table;
  margin-left: 0.26667rem;
}
.related-info-cont {
  display: table-cell;
  vertical-align: middle;
  height: 1.8667rem;
  line-height: 0.55rem;
}
.authenticated {
  vertical-align: middle;
  margin-left: 0.15rem;
  background-color: #ff7272;
  display: inline-block;
  font-size: 10px;
  color: #fff !important;
  padding: 0.05rem 0.05rem;
  border-radius: 2px;
  -webkit-border-radius: 2px;
  letter-spacing: 1px;
  line-height: 14px;
  margin-top: -3px;
}
</style>
