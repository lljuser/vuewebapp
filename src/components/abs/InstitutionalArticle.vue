<template>
<div class="appH5_body">
  <div class="product-spinner" v-if="isArticleLoading">
      <mt-spinner type="triple-bounce"></mt-spinner>
    </div>
  <div v-else>
    <div class="articleListContent ep_font32">
        <section class="ep_content_div">
            <div v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="(item, index) in articleInfo" v-bind:key="index">
                    <div class=" ep_overhide">
                        <span class="appH5_fl appH5_font_normal appH5_color_green">《</span>
                        <span class="appH5_font_normal ep_ellipsis appH5_fl ep_maxWidth577 appH5_color_green">{{item.Name}}</span>
                        <span class="appH5_fl appH5_font_normal appH5_color_green">》</span>
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
                                <span class="fl ep_ellipsis ep_width300 ep_Link appH5_link">{{item.Link}}</span>
                            </li>
                        </ul>
                        <span class="ep_sendMailBtn appH5_font_normal">发送到邮箱</span>
                    </div>
                </div>
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
export default {
  name: 'institutionalArticle',
  data() {
    return {
      articleInfo:[],
      isArticleLoading:false,
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
    this.isArticleLoading=true;
    this.articleInfo = {};
    window.scrollTo(0,0);
    const busUtil = BusUtil.getInstance();
    busUtil.bus.$emit('showHeader', true);
    busUtil.bus.$emit('path', '/organDetail/1');
    busUtil.bus.$emit('headTitle', '');
    this.id = this.$route.params.id;
    if (this.id) {
        setTimeout(()=>{
            this.fetchArticleDetail(this.id,data=>{
                busUtil.bus.$emit('headTitle', '机构文章'); 
                this.articleInfo =data;
                this.isArticleLoading=false;
            });
        },600);
    }
  },
  methods: {
    newUpdateTime(updateTimes){
        var newDate=updateTimes.substr(0,10);
        return newDate;
    },
    isValidElement: function (item) {
        return !(item === null || item === undefined || item === "");
    },
    fetchArticleDetail(id,callback) {
        axios(webApi.Organ.articleList.concat(['',id].join('/')))
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
        this.isArticleLoading = false;
        this.isFetchDetailError=true;
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
