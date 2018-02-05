<template>
<div class="appH5_body">
  <div class="product-spinner" v-if="isProductLoading">
      <mt-spinner type="triple-bounce"></mt-spinner>
    </div>
  <div v-else>
    <div class="articleListContent ep_font32">
        <div class="ep_marginTop24"></div>
        <section class="ep_content_div">
            <div v-cloak>
                <div class="ep_padding30 ep_part_item_border">
                    <div class=" ep_overhide">
                        <span class="fl ep_font28 appH5_color_green">《</span>
                        <span class="ep_font28 ep_ellipsis fl ep_maxWidth577 appH5_color_green">书名</span>
                        <span class="fl ep_font28 appH5_color_green">》</span>
                        <div class="ep_overhide fr ep_lineHeight32 ">
                            <img class="followImg"/>
                        </div>
                    </div>
                    <div class="divArticleDetail">
                        <ul class="ep_color_grey ep_font24 ep_decription articleDetail">
                            <li>
                                <span class='article_title'>作者：</span>
                                <span class="ep_ellipsis ep_width517">晓蕾</span>
                            </li>
                            <li>
                                <span class='article_title'>报告分类：</span>
                                <span class="ep_ellipsis ep_width517">报告分类</span>
                            </li>
                            <li>
                                <span class='article_title'>更新时间：</span>
                                <span class="ep_ellipsis ep_width517">2018-02-12</span>
                            </li>
                            <li>
                                <span class='article_title'>作品网址：</span>
                                <!-- <a class="fl ep_ellipsis ep_width300 ep_Link ep_color_orange_important"  v-bind:href="item.Link">{{item.Link}}</a> -->
                                <span class="fl ep_ellipsis ep_width300 ep_Link ep_color_orange_important">www.baidu.com</span>
                            </li>
                        </ul>
                        <span class="ep_sendMailBtn ep_font24">发送到邮箱</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
  </div>
  
</div>
</template>

<script> 
import * as webApi from '@/config/api';
import BusUtil from './BusUtil';
import axios from 'axios';
export default {
  name: 'institutionalArticle',
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
</style>
