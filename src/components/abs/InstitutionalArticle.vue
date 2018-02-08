<template>
<div class="appH5_body">
  <div class="product-spinner" v-if="isArticleLoading">
      <mt-spinner type="triple-bounce"></mt-spinner>
    </div>
  <div v-else>
    <div class="articleListContent ep_font32">
        <section class="ep_content_div">
      <mt-loadmore :top-method="loadTop"  ref="loadmore">
            <div v-cloak  v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-immediate-check="true"
          infinite-scroll-distance="55">
                <div class="ep_padding30 ep_part_item_border" v-for="(item, index) in articleInfo" v-bind:key="index">
                    <div class=" ep_overhide">
                        <!-- <span class="appH5_fl appH5_font_normal appH5_color_green">《</span> -->
                        <span class="appH5_font_normal ep_ellipsis appH5_fl ep_maxWidth577 appH5_color_green">{{item.Name}}</span>
                        <!-- <span class="appH5_fl appH5_font_normal appH5_color_green">》</span> -->
                    </div>
                    <div class="divArticleDetail">
                        <ul class="appH5_color_details appH5_font_smaller ep_decription articleDetail">
                            <li>
                                <span class='article_title'>作者：</span>
                                <span class="ep_ellipsis ep_width517">{{item.Author}}</span>
                            </li>
                            <li v-if="isValidElement(item.Category)">
                                <span class='article_title'>报告分类：</span>
                                <span class="ep_ellipsis ep_width517">{{item.Category}}</span>
                            </li>
                            <li v-if="isValidElement(item.UpdateTime)">
                                <span class='article_title'>更新时间：</span>
                                <span class="ep_ellipsis ep_width517">{{item.UpdateTime.toString() | moment("YYYY-MM-DD")}}</span>
                            </li>
                            <li v-if="isValidElement(item.Link)">
                                <span class='article_title'>作品网址：</span>
                                <span class="fl ep_ellipsis ep_width300">{{item.Link}}</span>
                            </li>
                        </ul>
                        <span class="ep_sendMailBtn appH5_font_normal" v-on:click="sendAttachment(item.AttachmentFileCode)" v-show="isValidElement(item.AttachmentFileCode)">发送到邮箱</span>
                    </div>
                </div>
            </div>
            
      </mt-loadmore>
      
         <div class="spinner_div" v-if="articleInfo.length==0">
          <span  class="nomore">暂无数据</span>
        </div>
        <div class="spinner_div" v-else >
          <van-loading type="spinner" v-if="!noMore" color="white" class="spinner-circle"/>
          <span v-if="noMore" class="nomore">没有更多了</span>
        </div>
        </section>
    </div>
  </div>
  
</div>
</template>

<script> 
import BusUtil from './BusUtil';
import Vue from 'vue';
import * as webApi from '@/config/api';
import axios from 'axios';
import getParams from '../../public/js/getParams';
import { Toast } from 'mint-ui';
import "mint-ui/lib/style.css";
export default {
  name: 'institutionalArticle',
  data() {
    return {
      articleInfo:[],
      isArticleLoading:false,
      loading: false,
      isFetchArticlesError: false,
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
    // this.isArticleLoading = true;
    // this.timer = setTimeout(() => {
    //   this.loadFirstPageArticles();
    // }, 600);
  },
  activated(){
    this.loading = false;
    this.isArticleLoading = true;
    this.articleInfo = {};
    window.scrollTo(0, 0);
    const busUtil = BusUtil.getInstance();
    busUtil.bus.$emit("showHeader", true);
    busUtil.bus.$emit("path", "/organDetail/"+this.$route.params.id);
    busUtil.bus.$emit("headTitle", "机构文章");
    this.timer = setTimeout(() => {
      this.loadFirstPageArticles();
    }, 600);
    if (this.isFetchArticlesError) {
      this.loadFirstPageArticles();
    }
  },
  deactivated() {
    this.timer && clearTimeout(this.timer);
    // 防止在其他组件滚动时 此组件调用loadMore方法
    this.loading = true;
  },

  methods: {
    loadFirstPageArticles(showSpinnerLoad) {
      this.loading = false;
      this.isArticleLoading = true;
      if (showSpinnerLoad != null) this.isArticleLoading = false;
      setTimeout(() => {
        this.fetchArticlesDetail(1, 0, data => {
          this.articleInfo = data;
          this.isArticleLoading = false;
          this.page = 1;
          if (data.length < this.pageSize) {
            this.noMore = true;
          }
          if (showSpinnerLoad != null) this.$refs.loadmore.onTopLoaded();
        });
      }, 600);
    },

    isValidElement: function (item) {
        return !(item === null || item === undefined || item === "");
    },
    fetchArticlesDetail(page, direction, callback) {
      var url = webApi.Organ.articleList + "/" + this.$route.params.id;
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
              this.isFetchArticlesError = false;
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
        this.loadFirstPageArticles(true);
      }, 600);
    },
    loadMore() {
      this.loading = true;
      this.noMore = false;
      setTimeout(() => {
        this.fetchArticlesDetail(this.page, 1, data => {
          this.articleInfo = this.articleInfo.concat(data);
          this.page = this.page + 1;
          this.loading = false;
        });
      }, 600);
    },

    doCatch() {
      Toast("服务器繁忙，请重试！");
      this.isArticleLoading = false;
      this.isFetchArticlesError = true;
      this.loading = false;
      if (this.isLoadTop) {
        setTimeout(() => {
          this.$refs.loadmore.onTopLoaded();
        }, 4000);
      }
    },
    
    sendAttachment: function(fileCode) {
        axios.post(webApi.Expert.sendPublishUrl, {fileCode: fileCode})
        .then(response => {
            this.$toast(response.data.data);
        });
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.articleContent, .articleListContent {
    background-color: #000;
}
.ep_content_div {
    min-height: 16.0rem;
}
.divArticleDetail {
    position: relative;
}
.divArticleDetail .ep_sendMailBtn {
    margin-bottom: -0.05rem;
    position: absolute;
    bottom: 0rem;
    right: 0rem;
}
.ep_ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.ep_maxWidth577 {
    max-width: 7.7rem;
}
.ep_width517 {
    width: 6.9rem;
}
ul.articleDetail .article_title {
    width: 70px;
}
.ep_decription {
    line-height: 0.48rem;
    margin-top: 0.133333rem;
}
.ep_padding30 {
    padding: 0.266667rem 0.4rem;
}
.ep_overhide {
    overflow: hidden;
}
.ep_part_item_border {
    border-bottom: 1px solid #3B3A39;
}
.divArticleDetail {
    position: relative;
}

.divArticleDetail .ep_sendMailBtn {
    margin-bottom: -0.05rem;
    position: absolute;
    bottom: 0rem;
    right: 0rem;
}

.ep_sendMailBtn {
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    padding-bottom: 0.1rem;
    padding-top: 0.1rem; 
    height: .42rem;
    line-height: .42rem;
    border: 1px solid #ffc446;
    border-radius: 4px;
    color: #ffc446;
    background: #000;
}
.ep_width300 {
    width: 4.0rem;
}
ul.articleDetail li {
    overflow: hidden;
    margin-bottom: 0.133333rem;
}

ul.articleDetail li span:nth-of-type(1) {
    float: left;
}

ul.articleDetail li span:nth-of-type(2) {
    float: left;
}
ul.articleDetail .article_title {
    width: 70px;
}
</style>
