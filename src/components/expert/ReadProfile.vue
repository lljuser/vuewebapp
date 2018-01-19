<template>
  <div class="editProfileContent" v-cloak :class="isShowHeader ? 'paddingTop50': ''">
        <section class="ep_part ep_overhide" id="basicInformation">
            <div class="ep_overhide basicInformationCard">
                <div class="fl ep_divAvatar" v-show="userInfo.User && userInfo.User.Avatar">
                    <img style="width:1.866667rem;" v-bind:src="userInfo.User && userInfo.User.Avatar" alt="用户头像">
                </div>
                <div class="fl ep_marginLeft30 ep_width517" v-cloak>
                    <div class='ep_overhide'>
                        <span class="fl ep_font32 ep_width300 ep_ellipsis">{{userInfo.User && userInfo.User.Name}}</span>
                        <router-link v-if="editable" to="/EditProfile" class="fr ep_editBtn ep_font28 appH5_color_link">
                            编辑履历
                        </router-link>
                    </div>
                    <div class='ep_overhide ep_marginTop10'>
                        <span class="fl ep_color_grey2 ep_font28 ep_width470">{{userInfo.User && userInfo.User.Company}}</span>
                    </div>
                    <!-- <div class='ep_overhide ep_marginTop10 ep_font30 ep_color_grey2'>
                        <div class="fl ep_minWidth140">
                            <span>粉丝</span>
                            <span>80</span>
                        </div>
                        <div class="fl ep_marginLeft10 ep_minWidth140">
                            <span>好友</span>
                            <span>80</span>
                        </div>
                        <div class="fl ep_marginLeft10 ep_minWidth140">
                            <span>关注</span>
                            <span>80</span>
                        </div>
                    </div> -->
                </div>
            </div>
        </section>
        <section class="ep_part" id="projectHistoryABS" v-if="!isArrayEmpty(userInfo.ABSProjects)" v-cloak>
            <header class="ep_part_title">
                <div class='appH5_title fl' style='overflow:hidden;'>
                    <span class='fl'>ABS项目</span>
                    <span class="fl ep_marginLeft15 ep_font28 ep_overhide ep_line_height22" v-if="!isArrayEmpty(userInfo.ABSProjects)">
                        <span class="fl appH5_font_smaller">(共&nbsp;</span>
                        <span class="appH5_color_red appH5_font_larger fl">{{projectHistoriesSummary.totalCount>9999?'9999+':projectHistoriesSummary.totalCount}}</span>
                        <span class="fl appH5_font_smaller">&nbsp;单，</span>
                        <span class="appH5_color_red appH5_font_larger fl">{{projectHistoriesSummary.totalOffering.toFixed(2)>9999?'9999+':projectHistoriesSummary.totalOffering.toFixed(2)}}</span>
                        <span class="fl appH5_font_smaller">&nbsp;亿)</span>
                    </span>
                </div>
                <router-link v-if="userInfo.ABSProjects && userInfo.ABSProjects.length > 3" v-bind:to="routeUrls().ReadAbsHistoryList" class="fr text_right_link">
                    更多
                </router-link>
            </header>
            <div>
                 <div class='appH5_panel' style="padding-top:0px;">
                    <table class="appH5_table">
                        <tr>
                            <th class='text-left ep_width225'>名称</th>
                            <th class='text-right'>金额(亿)</th>
                            <th class='text-right'>类型</th>
                            <th class='text-right' style="width:30px;" v-if="!editable">点赞</th>
                        </tr>
                        <tr v-for="(item, index) in _.take(userInfo.ABSProjects, 3)" v-bind:key="index">
                            <td class='text-left'>
                                <a class="ep_font32 ep_ellipsis fl ep_width225 ep_color_yellow" v-bind:href="'/webapp/product.html?dealId=' + item.DealId">{{item.DealName}}</a>
                            </td>
                            <td class='text-right appH5_color_red'>{{item.TotalOffering.toFixed(2)}}</td>
                            <td class='text-right ep_ellipsis'>
                                {{item.DealType}}
                            </td>
                            <td class='text-right' v-if="!editable">
                                <div class="ep_overhide ep_lineHeight32">
                                  <img class="followImg" v-bind:class="item.IsEndorse ? 'appH5_followIcon':'appH5_unfollowIcon'" v-on:click="absProjectEndorseHandle(item)" v-bind:src="endorseImg(item.IsEndorse)" />
                                </div>
                            </td>
                        </tr>
                    </table>
                 </div>
            </div>
        </section>
        <section class="ep_part" id="projectHistoryOther" v-if="!isArrayEmpty(userInfo.OtherProjects)" v-cloak>
            <header class="ep_part_title">
                <div class='appH5_title fl' style='overflow:hidden;'>
                    <span class='fl'>其它项目</span>
                    <span class="fl ep_marginLeft15 ep_font28 ep_overhide ep_line_height22" v-if="!isArrayEmpty(userInfo.OtherProjects)">
                    <span class="fl appH5_font_smaller">(共&nbsp;</span>
                    <span class="appH5_color_red appH5_font_larger fl">{{otherProjectHistoriesSummary.totalCount>9999?'9999+':otherProjectHistoriesSummary.totalCount}}</span>
                    <span class="fl appH5_font_smaller">&nbsp;单，</span>
                    <span class="appH5_color_red appH5_font_larger fl">{{otherProjectHistoriesSummary.totalOffering.toFixed(2)>9999?'9999+':otherProjectHistoriesSummary.totalOffering.toFixed(2)}}</span>
                    <span class="fl appH5_font_smaller">&nbsp;亿)</span>
                    </span>
                </div>
                <router-link v-if="userInfo.OtherProjects && userInfo.OtherProjects.length > 3" v-bind:to="routeUrls().ReadOtherProjectList" class="fr text_right_link">
                    更多
                </router-link>
            </header>
            <div>
                 <div class='appH5_panel' style="padding-top:0px;">
                    <table class="appH5_table">
                        <tr>
                            <th class="text-left ep_width225">简称</th>
                            <th class="text-right">金额(亿)</th>
                            <th class="text-right">类型</th>
                            <th class='text-right ep_width90' v-if="!editable">点赞</th>
                        </tr>
                        <tr v-for="(item, index) in _.take(userInfo.OtherProjects, 3)" v-bind:key="index">
                            <td class="ep_ellipsis text-left">
                               <div class="ep_ellipsis fl ep_width225">
                                    {{item.ProjectShortName}}
                               </div>
                            </td>
                            <td class="ep_ellipsis text-right appH5_color_red">{{item.TotalOffering.toFixed(2)}}</td>
                            <td class='text-right ep_ellipsis'>
                                {{item.DealType}}
                            </td>
                            <td class='text-right' v-if="!editable">
                               <div  class="ep_overhide ep_lineHeight32 ">
                                    <img class="followImg" v-bind:class="item.IsEndorse?'appH5_followIcon':'appH5_unfollowIcon'" v-on:click="otherProjectEndorseHandle(item)" v-bind:src="endorseImg(item.IsEndorse)" />
                               </div>
                            </td>
                        </tr>
                    </table>
               </div>
            </div>
        </section>
        <section class="ep_part" id="workHistory" v-if="!isArrayEmpty(userInfo.WorkHistories)" v-cloak>
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.WorkHistories) ? '' : 'ep_part_item_border']">
                <div class='appH5_title fl' style='overflow:hidden;'>
                    <span class='fl'>工作经历</span>
                </div>
            </header>
            <div class="ep_panel_padding_bottom"> 
                <div class="ep_padding30 ep_part_item_border" v-for="(item, index) in userInfo.WorkHistories" v-bind:key="index">
                    <div class="ep_overhide">
                        <span class="ep_font28 ep_ellipsis fl ep_width510 appH5_color_green">{{item.Position}}</span>
                        <span v-if="item.IsAuthenticated" class="fr appH5_color_pink ep_font28 ep_lineHeight32">机构已认证</span>
                    </div>
                    <div class="ep_font24 ep_color_grey2 ep_marginTop10 ep_overhide">
                        <span class="fl ep_maxWidth400 ep_ellipsis">{{item.Company}}</span>
                        <span class="fl ep_marginLeft24 ep_width250 ep_ellipsis">{{item.Department}}</span>
                    </div>
                    <div class="ep_font24 ep_color_grey2 ep_marginTop10">
                        <span>{{item.StartTime}}</span>
                        <span>-</span>
                        <span>{{item.EndTime}}；</span>
                        <span>{{item.TimeSpan}}</span>
                    </div>
                    <div class="ep_font24 ep_color_grey2 ep_marginTop10">
                        <span>{{item.Description}}</span>
                    </div>
                </div>
            </div>
        </section>
        <section class="ep_part" id="otherPosition" v-if="!isArrayEmpty(userInfo.OtherPosts)" v-cloak>
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.OtherPosts)?'':'ep_part_item_border']">
                <div class='appH5_title fl' style='overflow:hidden;'>
                    <span class='fl'>其它职务</span>
                </div>
            </header>
            <div class="ep_panel_padding_bottom">
                <div class="ep_padding30 ep_part_item_border" v-for="(item, index) in userInfo.OtherPosts" v-bind:key="index">
                    <div class="ep_overhide">
                        <span class="ep_font28 ep_ellipsis fl ep_width600">{{item.Name}}</span>
                    </div>
                </div>
            </div>
        </section>
        <section class="ep_part" id="awardsAndHonors" v-if="!isArrayEmpty(userInfo.HonorAwards)" v-cloak>
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.HonorAwards)?'':'ep_part_item_border']">
            <div class='appH5_title fl' style='overflow:hidden;'>
                <span class='fl'>奖项与荣誉</span>
            </div>
            </header>
            <div class="ep_panel_padding_bottom">
                <div class="ep_padding30 ep_part_item_border" v-for="(item, index) in userInfo.HonorAwards" v-bind:key="index">
                    <div class="ep_overhide">
                        <span class="ep_font28 ep_ellipsis fl ep_width460 appH5_color_green">{{item.Name}}</span>
                        <span class="ep_font24 ep_ellipsis fr ep_color_grey2 ep_lineHeight32 ep_align_right ep_marginLeft15">{{item.Year}}</span>
                    </div>
                    <pre class="ep_decription ep_color_grey2 ep_font24">{{item.Description}}</pre>
                </div>
            </div>
        </section>
        <section class="ep_part" id="activity" v-if="!isArrayEmpty(userInfo.RecentActivities)" v-cloak>
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.RecentActivities)?'':'ep_part_item_border']">
                 <div class='appH5_title fl' style='overflow:hidden;'>
                    <span class='fl'>近期活动</span>
                 </div>
                <router-link v-if="userInfo.RecentActivities && userInfo.RecentActivities.length > 3" v-bind:to="routeUrls().ReadActivityList" class="fr text_right_link">
                    更多
                </router-link>
            </header>
            <div class="ep_panel_padding_bottom">
                <div class="ep_padding30 ep_part_item_border" v-for="(item, index) in _.take(userInfo.RecentActivities, 3)" v-bind:key="index">
                    <div class="ep_overhide">
                        <span class="ep_font28 ep_ellipsis fl ep_width460 appH5_color_green">{{item.Name}}</span>
                        <span class="ep_font24 ep_ellipsis fr ep_color_grey2 ep_lineHeight32 ep_align_right ep_marginLeft15">{{item.ActivityTime}}</span>
                    </div>
                    <pre class="ep_decription ep_color_grey2 ep_font24">{{item.Description}}</pre>
                </div>
            </div>
        </section>
        <section class="ep_part" id="article" v-if="!isArrayEmpty(userInfo.Publishs)" v-cloak>
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.Publishs)?'':'ep_part_item_border']">
                <div class='appH5_title fl' style='overflow:hidden;'>
                    <span class='fl'>著作与文章</span>
                </div>
                <router-link v-if="userInfo.Publishs && userInfo.Publishs.length > 3" v-bind:to="routeUrls().ReadArticleList"  class="fr text_right_link">
                   更多
                </router-link>
            </header>
            <div class="ep_panel_padding_bottom">
                <div class="ep_padding30 ep_part_item_border" v-for="(item, index) in _.take(userInfo.Publishs, 3)" v-bind:key="index">
                    <div class="ep_overhide">
                        <span class="fl ep_font28 appH5_color_green">《</span>
                        <span class="ep_font28 ep_ellipsis fl ep_maxWidth577 appH5_color_green">{{item.Name}}</span>
                        <span class="fl ep_font28 appH5_color_green">》</span>
                        <div v-if="!editable" class="ep_overhide fr ep_lineHeight32 ">
                            <img class="followImg" v-bind:class="item.IsEndorse ? 'appH5_followIcon' : 'appH5_unfollowIcon'" v-on:click="publishEndorseHandle(item)" v-bind:src="endorseImg(item.IsEndorse)" />
                        </div>
                    </div>
                    <div class="divArticleDetail">
                        <ul class="ep_color_grey2 ep_font24 ep_decription articleDetail">
                            <li>
                                <span class='article_title'>作者：</span>
                                <span class="ep_ellipsis ep_width517">{{item.Author}}</span>
                            </li>
                            <li v-if="isValidElement(item.Publisher)">
                                <span class='article_title'>出版社：</span>
                                <span class="ep_ellipsis ep_width517">{{item.Publisher}}</span>
                            </li>
                            <li v-if="isValidElement(item.PublishTime)">
                                <span class='article_title'>出版时间：</span>
                                <span class="ep_ellipsis ep_width517">{{isValidElement(item.PublishTime) ? item.PublishTime + '年' : ''}}</span>
                            </li>
                            <li v-if="isValidElement(item.Isbn)">
                                <span class='article_title'>书号ISBN：</span>
                                <span class="ep_ellipsis ep_width517">{{item.Isbn}}</span>
                            </li>
                            <li v-if="isValidElement(item.Pages)">
                                <span class='article_title'>页数：</span>
                                <span class="ep_ellipsis ep_width300">{{item.Pages}}</span>
                            </li>
                            <li v-if="isValidElement(item.Link)">
                                <span class='article_title'>作品网址：</span>
                                <a class="fl ep_ellipsis ep_width300 ep_Link ep_color_orange_important" v-bind:href="item.Link">{{item.Link}}</a>
                            </li>
                            <li v-show="isValidElement(item.AttachmentFileCode)">
                                <span class='article_title'>作品文件：</span>
                                <div class="fl">《</div>
                                <span class="fl ep_ellipsis ep_maxwidth250">{{item.Name}}</span>
                                <div class="fl">》</div>
                            </li>
                        </ul>
                        <span class="ep_sendMailBtn ep_font24" v-on:click="sendAttachment(item.AttachmentFileCode)" v-show="isValidElement(item.AttachmentFileCode)">发送到邮箱</span>
                    </div>
                </div>
            </div>
        </section>
        <section class="ep_part" id="educationHistory" v-if="!isArrayEmpty(userInfo.Educations)" v-cloak>
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.Educations)?'':'ep_part_item_border']">
               <div class='appH5_title fl' style='overflow:hidden;'>
                <span class='fl'>教育经历</span>
               </div>
            </header>
            <div class="ep_panel_padding_bottom">
                <div class="ep_padding30 ep_part_item_border" v-for="(item, index) in userInfo.Educations" v-bind:key="index">
                    <div class="ep_overhide">
                        <span class="ep_font28 ep_ellipsis fl ep_width400 appH5_color_green">{{item.School}}</span>
                        <span class="ep_font24 ep_ellipsis fr ep_color_grey2 ep_lineHeight32 ep_align_right ep_marginLeft15">
                            <span>{{item.FromYear}}</span>
                            <span>-</span>
                            <span>{{item.ToYear}}</span>
                        </span>
                    </div>
                    <ul class="ep_color_grey2 ep_font24 ep_decription educationDetail ep_marginTop10">
                        <li class="ep_overhide">
                            <span class="fl">学位：</span>
                            <span class="fl ep_width440">{{item.Degree}}</span>
                        </li>
                        <li>
                            <pre class="ep_decription">{{item.Description}}</pre>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <section class="ep_part" id="personalProfile" v-if="isValidElement(userInfo.User) && isValidElement(userInfo.User.Introduction)">
            <header class="ep_part_title" v-bind:class="[isValidElement(userInfo.User.Introduction)?'ep_part_item_border':'']">
            <div class='appH5_title fl' style='overflow:hidden;'>
                <span class='fl'>个人简介</span>
            </div>
            </header>
            <pre class="ep_part_description ep_panel_padding_bottom" v-cloak>{{userInfo.User && userInfo.User.Introduction}}</pre>
        </section>
        <mt-popup v-model="submitPopupVisible" class="ep_submitPopup">
            <div class="ep_divSpinner"><mt-spinner type="snake"></mt-spinner></div>
            <div class="ep_align_center ep_font30 ep_submitColor">发送中...</div>
        </mt-popup>
    </div>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import * as webApi from "@/config/api";
import util from "@/public/modules/expert/utils";
import BusUtil from '../abs/BusUtil';

import dislikeImg from '@/public/images/dislike.png';
import likeImg from '@/public/image/followicon.png';
import defaultAvatar from '@/public/images/defaultavatar.png';

export default {
  name: "ReadProfile",
  data: function() {
    return {
      _: {},
      userInfo: {},
      editable: false,
      userId: null,
      absProjectEndorseLock: false,
      otherProjectEndorseLock: false,
      publicEndorseLock: false,
      submitPopupVisible: false,
      isShowHeader: false,
      query: null
    };
  },
  created: function() {
      this._ = _;
      this.userId = util.getQueryString().UserId;
      this.initData();
  },
  beforeRouteEnter: (to, from, next) => {
     next(vm => {
         var query = util.getQueryString();
         
         if (query.isShowHeader) {
            vm.isShowHeader = true;
            vm.query = query;
            const busUtil = BusUtil.getInstance();
            busUtil.bus.$emit('showHeader', true);
            busUtil.bus.$emit('path', 'abs.html#' + query.path);
            busUtil.bus.$emit('headTitle', '专家履历');
         }
     });
  },
  methods: {
    initData: function() {
      axios
        .post(webApi.Expert.getExpertDisplay, { UserId: this.userId })
        .then(response => {
          this.userInfo = response.data.data.UserInfo;
          this.editable = response.data.data.Editable;

          if (!this.isValidElement(this.userInfo.User.Avatar)) {
              this.userInfo.User.Avatar = defaultAvatar;
          }
        });
    },
    endorseImg: function(isEndorse) {
      return isEndorse ? likeImg : dislikeImg;
    },
    absProjectEndorseHandle: function(absProject) {
      if (this.absProjectEndorseLock) return;

      this.absProjectEndorseLock = true;
      var self = this;

      //取消点赞
      if (absProject.IsEndorse) {
        axios
          .post(webApi.Expert.deleteAbsProjectEndorse, {
            UserId: this.userId,
            dealId: absProject.DealId
          })
          .then(response => {
            absProject.EndorseNum = response.data.data.EndorseNum;
            absProject.IsEndorse = response.data.data.IsEndorse;
            this.absProjectEndorseLock = false;
          });

        return;
      }

      //点赞
      axios
        .post(webApi.Expert.addAbsProjectEndorse, {
          UserId: this.userId,
          dealId: absProject.DealId
        })
        .then(response => {
          absProject.EndorseNum = response.data.data.EndorseNum;
          absProject.IsEndorse = response.data.data.IsEndorse;
          this.absProjectEndorseLock = false;
        });
    },
    otherProjectEndorseHandle: function(otherProject) {
      if (this.otherProjectEndorseLock) return;

      this.otherProjectEndorseLock = true;
      var self = this;

      //取消点赞
      if (otherProject.IsEndorse) {
        axios
          .post(webApi.Expert.deleteOtherProjectEndorse, {
            UserId: this.userId,
            dealId: otherProject.Id
          })
          .then(response => {
            otherProject.EndorseNum = response.data.data.EndorseNum;
            otherProject.IsEndorse = response.data.data.IsEndorse;
            this.otherProjectEndorseLock = false;
          });
        return;
      }

      //点赞
      axios
        .post(webApi.Expert.addOtherProjectEndorse, {
          UserId: this.userId,
          dealId: otherProject.Id
        })
        .then(response => {
          otherProject.EndorseNum = response.data.data.EndorseNum;
          otherProject.IsEndorse = response.data.data.IsEndorse;
          this.otherProjectEndorseLock = false;
        });
    },
    publishEndorseHandle: function(publish) {
      if (this.publicEndorseLock) return;

      this.publicEndorseLock = true;
      var self = this;

      //取消点赞
      if (publish.IsEndorse) {
        axios
          .post(webApi.Expert.deletePublishEndorse, {
            UserId: this.userId,
            publishId: publish.Id
          })
          .then(response => {
            publish.EndorseNum = response.data.data.EndorseNum;
            publish.IsEndorse = response.data.data.IsEndorse;
            this.publicEndorseLock = false;
          });
        return;
      }

      //点赞
      axios
        .post(webApi.Expert.addPublishEndorse, {
          UserId: this.userId,
          publishId: publish.Id
        })
        .then(response => {
          publish.EndorseNum = response.data.data.EndorseNum;
          publish.IsEndorse = response.data.data.IsEndorse;
          this.publicEndorseLock = false;
        });
    },
    //机构角色拼接
    splicingOrganizationRoles: function(organizationRoles) {
      if (this.isArrayEmpty(organizationRoles)) return "";

      var result = [];

      organizationRoles.forEach(function(item) {
        result.push(
          item.IsCustomizedOrganizationRole
            ? item.CustomizedOrganizationRole
            : item.OrganizationRole
        );
      });

      return result.sort().join();
    },
    isArrayEmpty: function(arr) {
      return arr === null || arr === undefined || arr.length === 0;
    },
    isValidElement: function(item) {
      return !(item === null || item === undefined || item === "");
    },
    sendAttachment: function(fileCode) {
      this.submitPopupVisible = true;
      axios
        .post(webApi.Expert.sendPublishUrl, { fileCode: fileCode })
        .then(response => {
          this.submitPopupVisible = false;
          this.$toast(response.data.data);
        });
    },
    routeUrls: function() {
      if (this.editable) {
        return {
          ReadAbsHistoryList: "/ReadAbsHistoryList",
          ReadOtherProjectList: "/ReadOtherProjectList",
          ReadArticleList: "/ReadArticleList",
          ReadActivityList: "/ReadActivityList"
        };
      }

      return {
        // ReadAbsHistoryList: `/ReadAbsHistoryList/${this.userId}`,
        // ReadOtherProjectList: `/ReadOtherProjectList/${this.userId}`,
        // ReadArticleList: this.isShowHeader ? {path: `/ReadArticleList/${this.userId}`, query: this.query} : `/ReadArticleList/${this.userId}`,
        // ReadActivityList: `/ReadActivityList/${this.userId}`
        ReadAbsHistoryList: this.isShowHeader ? {path: `/ReadAbsHistoryList/${this.userId}`, query: this.query} : `/ReadAbsHistoryList/${this.userId}`,
        ReadOtherProjectList: this.isShowHeader ? {path: `/ReadOtherProjectList/${this.userId}`, query: this.query} : `/ReadOtherProjectList/${this.userId}`,
        ReadArticleList: this.isShowHeader ? {path: `/ReadArticleList/${this.userId}`, query: this.query} : `/ReadArticleList/${this.userId}`,
        ReadActivityList: this.isShowHeader ? {path: `/ReadActivityList/${this.userId}`, query: this.query} : `/ReadActivityList/${this.userId}`
      };
    }
  },
  computed: {
    projectHistoriesSummary: function() {
      if (
        this.userInfo.ABSProjects === null ||
        this.userInfo.ABSProjects.length === 0
      )
        return null;

      var projectTotalOffering = 0;

      for (let item of this.userInfo.ABSProjects) {
        projectTotalOffering += Number(item.TotalOffering);
      }

      return {
        totalCount: this.userInfo.ABSProjects.length,
        totalOffering: projectTotalOffering
      };
    },
    otherProjectHistoriesSummary: function() {
      if (
        this.userInfo.OtherProjects === null ||
        this.userInfo.OtherProjects.length === 0
      )
        return null;

      var projectTotalOffering = 0;

      for (let item of this.userInfo.OtherProjects) {
        projectTotalOffering += Number(item.TotalOffering);
      }

      return {
        totalCount: this.userInfo.OtherProjects.length,
        totalOffering: projectTotalOffering
      };
    },
  }
};
</script>

<style>
    
</style>

