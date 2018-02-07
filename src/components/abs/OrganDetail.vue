<template>
  <div class="appH5_body">
    <div class="product-spinner" v-if="isOrganLoading">
      <mt-spinner type="triple-bounce"></mt-spinner>
    </div>

    <div class="appH5_content" v-else>
      <div>
        <div class="appH5_panel appH5_panel_mb">
          <div class="appH5_title">
              <span>{{organDetail.FullName}}</span>
          </div>
          <!-- 机构单页-资产方 -->
          <div v-if="1>0">
              <table class="appH5_list_two" v-if="productDetail.Basic!=null">
                <tr>
                    <td>总资产</td>
                    <td>{{organDetail.TotalAssets}}(亿)</td>
                </tr>  
                <tr>
                    <td>总负债</td>
                    <td>{{organDetail.TotalLiability}}</td>
                </tr>                 
                <tr>
                    <td>资产负债率</td>
                    <td>{{organDetail.AssetLiabilityRatio}}</td>
                </tr>
                <tr>
                    <td>评级</td>
                    <td>{{organDetail.Rating}}</td>
                </tr>                 
                <tr>
                    <td>企业性质</td>
                    <td>{{organDetail.Nature}}</td>
                </tr> 
                <tr>
                    <td>注册资金</td>
                    <td>{{organDetail.Capital}}{{organDetail.CapitalCurrency}}</td>
                </tr>                 
                <tr>
                    <td>成立日期</td>
                    <td>{{organDetail.FoundDate}}</td>
                </tr>   
                <tr>
                    <td>公司网址</td>
                    <td>{{organDetail.Website}}</td>
                </tr>                                                                                             
              </table> 
          </div>
          <!-- 机构单页-资产方-END -->

          <!-- 机构单页 -->
          <div v-if="1>2">
              <table class="appH5_list_two" v-if="productDetail.Basic!=null">                  
                <tr>
                    <td>机构网址</td>
                    <td>http://cn.bing.com/</td>
                </tr> 
              </table>
          </div>         
          <!-- 机构单页-END -->
          </div>

          <div class="organIconsDiv appH5_float_right appH5_panel appH5_panel_mb">
              <div class="appH5_float_left organIconDiv"> 
                <router-link :to="`/institutionalExperts/1`"> 
                  <a href="javascript:;" style="color:#FEC447">
                    <div>
                      <font-awesome-icon :icon="['far', 'user']" class="appH5_icon" />
                      <div style="color:#fff;">机构专家</div>
                    </div>                  
                  </a>
                </router-link>               
              </div>
              <div class="appH5_float_left organIconDiv"> 
                <router-link :to="`/organDeal/${$route.params.id}`"> 
                  <a href="javascript:;" style="color:#FEC447">
                    <div>
                      <font-awesome-icon :icon="['far', 'chart-bar']" class="appH5_icon" />
                      <div style="color:#fff;">参与项目</div>
                    </div>                  
                  </a>
                </router-link>               
              </div>
              <div class="appH5_float_left organIconDiv"> 
                <router-link :to="`/institutionalArticle/${$route.params.id}`"> 
                  <a href="javascript:;" style="color:#FEC447">
                    <div>
                      <font-awesome-icon :icon="['far', 'edit']" class="appH5_icon"/>
                      <div style="color:#fff;">机构文章</div>
                    </div>                  
                  </a>
                </router-link>               
              </div>                            
          </div>

          <div style="clear:both"></div>

          <div class="appH5_panel appH5_panel_mb">
              <div class="appH5_title">
                  <span>机构奖章</span>
              </div>
              <div>
                <div class="organ_prize_img appH5_float_left" v-for="(item,index) in organDetail.Prizes" :key=index>
                  <img class="organ_prize_size" v-bind:src="item.IconPath">   
                </div>
              </div> 
              <div style="clear:both"></div>             
          </div>

          <div class="appH5_panel appH5_panel_mb">
              <div class="appH5_title">
                  <span>参与ABS产品</span>
              </div>
              <table class="appH5_list_two" v-if="productDetail.Basic!=null">
                <tr>
                    <td>总数</td>
                    <td>{{productDetail.Basic.TotalOffering}}单</td>
                </tr>
                <tr>
                    <td>总额</td>
                    <td>{{productDetail.Basic.TotalOffering}}亿</td>
                </tr>                                   
              </table>
          </div> 

          <div class="appH5_panel appH5_panel_mb">
              <div class="appH5_title">
                  <span>机构简介</span>
              </div>
              <div class="organ_introduction">
                  {{organDetail.Introduction}}
              </div>              
          </div>

          <div class="appH5_panel appH5_panel_mb">
              <div class="appH5_title">
                  <span>机构专家</span>
                  <router-link :to="`/institutionalExperts/1`"> 
                  <div class="appH5_float_right appH5_font16">更多></div>
                  </router-link>
              </div>
              <div>
                <div class="relevant-item">
                  <div>
                    <div style="position:relative;">
                      <img src="../../public/images/userAvatar.png" class="related-image appH5_fl"/>                                            
                    </div>
                    <div class="related-info appH5_f1">
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
                  </div>             
                </div>                                                  
              </div>              
          </div>                  
          <div class="appH5_panel appH5_panel_mb">
              <div class="appH5_title">
                  <span>参与项目</span>
                  <router-link :to="`/organDeal/1`"> 
                  <div class="appH5_float_right appH5_font16">更多></div>
                  </router-link>
              </div>  
                <table id="productTableId" class="appH5_table">
                  <tr>
                    <th class='text-left ep_width225'>名称</th>
                    <th class='text-right'>金额(亿)</th>
                    <th class='text-right'>类型</th>
                  </tr>
                   <tr v-for="(item, index) in productList" v-bind:key="index">
                      <td class='text-left'>
                          <router-link :to="productDetailUrl(item.DealId)" class="ep_font32 ep_ellipsis fl ep_width225 ep_color_yellow">
                              {{item.DealName}}
                          </router-link>
                      </td>
                      <td class='text-right appH5_color_red'>{{item.TotalOffering}}</td>
                      <td class='text-right ep_ellipsis'>
                          {{item.DealType}}
                      </td>
                  </tr>
                </table>
          </div>          
          <div class="appH5_panel appH5_panel_mb">
              <div class="appH5_title">
                  <span>机构文章</span>
                  <router-link :to="`/institutionalArticle/1`"> 
                  <div class="appH5_float_right appH5_font16">更多></div>
                  </router-link>
              </div>
                <div class="ep_padding30 ep_part_item_border" v-for="(item, index) in articleInfo" v-bind:key="index">
                    <div class=" ep_overhide">
                        <span class="appH5_font_normal ep_ellipsis appH5_fl ep_maxWidth577 appH5_color_green">{{item.Name}}</span>
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
                                     
      </div>
    </div>
  </div>
</template>

<style scoped>
.backTablePic {
  float: left;
  margin: 4px 4px 4px 2px;
  width: 12px;
  height: 11px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAGCAYAAAD37n+BAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABPSURBVChTY1y3esV/BiDYtX09iGJw8wwE0zAAE/f39QPTTGCSBMCYkRQOtgFmMifLXzC9cfMmMI1uI+k2wPwAA+hu/v6HGUzDxEm0gYEBALKKGjTje4yiAAAAAElFTkSuQmCC);
  background-repeat: repeat;
}

.organIconsDiv {
  width: 100%;
}
.organIconDiv {
  width: 33%;
  text-align: center;
}
.promptContent {
  color: #fec447;
  font-size: 14px;
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
  margin-top: 0.4rem;
}
.related-info {
  display: table;
  margin-left: 1.26667rem;
}
.related-info-cont {
  display: table-cell;
  vertical-align: middle;
  height: 1.8667rem;
  line-height: 0.55rem;
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
  margin-top: -1.16rem;
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
.appH5_font16 {
  font-size: 16px;
}
.appH5_font12 {
  font-size: 12px;
}
.clear_float {
  clear: both;
}
.clear_float {
  overflow: hidden;
}
.articleWidth {
  max-width: 7.7rem;
}
.article_title {
  width: 70px;
}
.overhide {
  overflow: hidden;
}
.article_content {
  line-height: 0.48rem;
  margin-top: 0.133333rem;
}
.article_content li {
  overflow: hidden;
  margin-bottom: 0.133333rem;
}
.article_border {
  border-bottom: 1px solid #444444;
}
.article_position {
  position: relative;
}
.article_padding30 {
  padding: 0rem 0.4rem 0.266667rem 0.4rem;
}
.send_mail_btn {
  position: absolute;
  bottom: 0.26667rem;
  right: 0rem;
  padding: 0.1rem 0.2rem;
  height: 0.42rem;
  line-height: 0.42rem;
  border: 1px solid #ffc446;
  border-radius: 4px;
  color: #ffc446;
  background: #000;
}
.organ_prize_img{
  width: 50px;
  height: 50px;
}
.organ_prize_size{
  width: 30px;
  height: 40px;
}
</style>

<script>
import BusUtil from "./BusUtil";
import Vue from "vue";
import VueHighcharts from "vue-highcharts";
import Highcharts from "highcharts";
import getParams from "../../public/js/getParams";
// some charts like solid gauge require `highcharts-more.js`, you can find it in official demo.
import * as chartTheme from "@/public/js/chartTheme";
import * as webApi from "@/config/api";
import axios from "axios";
import { Toast } from "mint-ui";
import OrganDealItem from './OrganDealItem';

Vue.use(VueHighcharts, { Highcharts });
Highcharts.setOptions(chartTheme);

export default {
  name: "organDetail",
  data() {
    return {
      productDetail: {},
      expertList:[],
      articleList:[],
      productList:[],
      publishDate: "",
      noteConsTable: "",
      isProductLoading: false,
      isShowHeader: false,
      organDetail:{},
      publishDate: "",
      noteConsTable: "",
      isOrganLoading: false,
      options: {
        title: {
          text: "暂无数据"
        },
        credits: {
          href: "",
          text: "CNABS"
        }
      },
      chartWidthRem: 3,
      chartWidthPx: 280,
      showChart: true,
      isFetchDetailError: false,
      tableFlag: 0
    };
  },
  created() {
    const busUtil = BusUtil.getInstance();
    busUtil.bus.$emit("showHeader", true);
    busUtil.bus.$emit("path", "/organ");
    busUtil.bus.$emit("headTitle", "");
    this.tableFlag = 0;
  },
  mounted() {
    this.isOrganLoading = true;
  },
  updated() {
    if (this.noteConsTable.indexOf("table") != -1 && this.tableFlag == 0) {
      var paidList = document.getElementsByClassName("divHasPaid");
      for (var i = 0; i < paidList.length; i++) {
        paidList[i].style.backgroundImage =
          "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAGCAYAAAD37n+BAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABPSURBVChTY1y3esV/BiDYtX09iGJw8wwE0zAAE/f39QPTTGCSBMCYkRQOtgFmMifLXzC9cfMmMI1uI+k2wPwAA+hu/v6HGUzDxEm0gYEBALKKGjTje4yiAAAAAElFTkSuQmCC)";
      }
      var bgList = document.getElementsByClassName("structure_bg");
      for (var i = 0; i < bgList.length; i++) {
        bgList[i].style.backgroundColor = "#B7AFA5";
        var aList = bgList[i].getElementsByTagName("a");
        for (var j = 0; j < aList.length; j++) {
          aList[j].href = "javascript:;";
          aList[j].title = "";
        }
      }
      var nameList = document.getElementsByClassName("str_n");
      for (var k = 0; k < nameList.length; k++) {
        nameList[k].style.color = "black";
      }
      var pctList = document.getElementsByClassName("str_npct");
      for (var x = 0; x < pctList.length; x++) {
        pctList[x].style.color = "#06c";
      }
      this.tableFlag = 1;
    }
  },
  activated() {
    //clear all data cache
    this.isOrganLoading = true;
    this.productDetail = {};
    this.organDetail={};
    this.publishDate = "";
    this.noteConsTable = "";
    this.options = {
      title: {
        text: "暂无数据"
      },
      credits: {
        href: "",
        text: "CNABS"
      }
    };
    window.scrollTo(0, 0);
    const busUtil = BusUtil.getInstance();
    busUtil.bus.$emit("showHeader", true);
    busUtil.bus.$emit("path", "/organ");
    busUtil.bus.$emit("headTitle", "");
    this.id = this.$route.params.id;
    if (this.id) {
      setTimeout(() => {
        this.fetchProductDetail(this.id, data => {
          busUtil.bus.$emit("headTitle", data.Basic.DealName);
          this.productDetail = data;
          if (data.DealId != null && data.DealId > 0) {
            this.fetchNoteConsTable(data.DealId, 280, 200);
            this.tableFlag = 0;
          }
        });
        this.fetchOrganDetail(this.id,data=>{
          this.organDetail = data;           
          // if(data.Prizes){
          //   return data.Prizes.filter(function(item){
          //     return item.PrizeId==1
          //   })
          // }
          this.isOrganLoading = false;     
        });
      }, 600);
    }
    busUtil.bus.$emit("showHeader", true);
    busUtil.bus.$emit("path", "/organ");
    this.initData();
  },

  methods: {
    initData: function() {
      axios(
        `${webApi.Organ.expertList}/1/0/0/0/0/0/3`
      ).then(response => {
        if(response.data.status === "ok")
        {
          this.productList = response.data.data.Deal;
        } 
      });

      axios(
        `${webApi.Organ.articleList}/1/0/0/0/0/0/3`
      ).then(response => {
        if(response.data.status === "ok")
        {
          this.productList = response.data.data.Deal;
        } 
      });

     axios(
        `${webApi.Organ.dealList}/1/0/0/0/0/0/5`
      ).then(response => {
        if(response.data.status === "ok")
        {
          this.productList = response.data.data.Deal;
        } 
      });
    },
    productDetailUrl: function(id) {
        return this.isShowHeader ? {path: `/ProductDetail/${id}`, query: this.query} : `/ProductDetail/${id}`;
    },
    fetchNoteConsTable(dealId, width, height) {
      axios(
        webApi.Product.structure + "/" + dealId + "/" + width + "/" + height
      ).then(response => {
        // console.log(response);
        if (response.data.status == "ok") {
          this.noteConsTable = response.data.data;
        }
      });
    },
    fetchProductDetail(id, callback) {
      // consoleconsole.log(webApi.Product.detail.concat(['',id].join('/')));
      axios(webApi.Product.detail.concat(["", id].join("/")))
        .then(response => {
          if (response.data.status == "ok") {
            const data = response.data.data;
            if (data) {
              callback(data);
            } else {
              this.doCatch();
            }
          }
        })
        .catch(error => {
          this.doCatch();
        });
    },
    fetchOrganDetail(id,callback){
      var url=webApi.Organ.detail;
      url=url+"/"+id;
      axios(url).then((response) => {
        const data = response.data.data;
        console.log(data);
        if(data){
          callback(data);
        }
      })
    },
    doCatch() {
      Toast("服务器繁忙，请重试！");
      this.isOrganLoading = false;
      this.isFetchDetailError = true;
    }
  }
};
</script>
