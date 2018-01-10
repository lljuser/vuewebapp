<template>
    <div class="editProfileContent" id="editProfileContent" v-cloak>
        <section class="ep_part" id="basicInformation">
            <header class="ep_part_title ep_part_item_border">
                <span class='fl appH5_title'>基本信息</span>
                <router-link to="BasicInfomation">
                    <img class="fr editPencils" src="../../public/images/pencils.png" alt="">
                </router-link>
            </header>
            <div class="ep_part_item ep_part_item_border">
                <span class='fl ep_font32 ep_color_grey'>头像</span>
                <div class="divUserAvatar fr">
                    <img v-bind:src="userInfo.User && userInfo.User.Avatar" alt="用户头像">
                </div>
            </div>
            <div class="ep_part_item ep_part_item_border">
                <span class='fl ep_font32 ep_color_grey'>姓名</span>
                <span class=" fr ep_font32 ep_marginLeft15 ep_align_right ep_width200 ep_ellipsis">{{userInfo.User && userInfo.User.Name}}</span>
            </div>
            <div class="ep_part_item ep_part_item_border">
                <span class='fl ep_font32 ep_color_grey'>公司</span>
                <span class="fr ep_font32 ep_marginLeft15 ep_align_right ep_width460 ep_ellipsis">{{userInfo.User && userInfo.User.Company}}</span>
            </div>
            <div class="ep_part_item ep_part_item_border">
                <span class='fl ep_font32 ep_color_grey'>手机号</span>
                <span class="fr ep_font32 ep_marginLeft15 ep_align_right">{{userInfo.User && userInfo.User.Cellphone}}</span>
            </div>
            <div class="ep_part_item ep_part_item_border">
                <span class='fl ep_font32 ep_color_grey'>邮箱</span>
                <span class="fr ep_font32 ep_marginLeft15 ep_align_right">{{userInfo.User && userInfo.User.Email}}</span>
            </div>
        </section>
        <section class="ep_part" id="projectHistoryABS">
            <header class="ep_part_title">
                <div class='appH5_title fl' style='overflow:hidden;'>
                    <span class='fl'>ABS项目</span>
                    <span class="fl ep_marginLeft15 ep_font28 ep_overhide" v-if="!isArrayEmpty(userInfo.ABSProjects)">
                        <span class="fl">(共</span>
                        <span class="appH5_color_green appH5_font_larger fl">{{projectHistoriesSummary.totalCount>9999?'9999+':projectHistoriesSummary.totalCount}}</span>
                        <span class="fl">单，</span>
                        <span class="appH5_color_green appH5_font_larger fl">{{projectHistoriesSummary.totalOffering.toFixed(2)>9999?'9999+':projectHistoriesSummary.totalOffering.toFixed(2)}}</span>
                        <span class="fl">亿)</span>
                    </span> 
                </div>
                <router-link to="/AbsHistory" class="fr">
                    <img class="addBtn" src="../../public/images/add.png" />
                </router-link>
            </header>
            <div v-if="!isArrayEmpty(userInfo.ABSProjects)" v-cloak>
                    <!-- <div class="ep_overhide">
                        <a class="ep_font32 ep_ellipsis fl ep_width600 ep_color_yellow" v-bind:href="'/expert/expertuser/projectABSDetails?dealId=' + item.DealId">{{item.DealName}}</a>
                        <router-link to="/AbsHistory" class="ep_font24 ep_color_orange fr ep_lineHeight32">
                            编辑
                        </router-link>
                    </div>
                    <table class="projectHistoryABSList ep_font28 ep_marginTop10">
                        <tr>
                            <td class="ep_ellipsis ep_paddingright30">{{item.DealType}}</td>
                            <td class="ep_ellipsis ep_paddingright30">{{item.TotalOffering.toFixed(2)}}亿元</td>
                        </tr>
                        <tr>
                            <td>{{item.PersonalResponsibility.Name}}</td>
                            <td colspan="2">{{splicingOrganizationRoles(item.OrganizationRoles)}}</td>
                        </tr>
                    </table> -->
                    <div class='appH5_panel' style="padding-top:0px;">
                        <table class="appH5_table">
                            <tr>
                                <th class='text-left'>名称</th>
                                <th class='text-right'>金额(亿)</th>
                                <th class='text-center'>类型</th>
                                <th class='text-right'>操作</th>
                            </tr>
                            <tr v-for="item in _.take(userInfo.ABSProjects, 3)" v-bind:key="item.DealName">
                                <td class='text-left'>
                                    <a class="ep_font32 ep_ellipsis fl ep_width176 ep_color_yellow" v-bind:href="'/expert/expertuser/projectABSDetails?dealId=' + item.DealId">{{item.DealName}}</a>
                                </td>
                                <td class='text-right appH5_color_red'>{{item.TotalOffering.toFixed(2)}}</td>
                                <td class='text-center ep_ellipsis'>{{item.DealType}}</td>
                                <td>
                                    <router-link to="/AbsHistory" class="ep_font24 ep_color_orange fr ep_lineHeight32">
                                        编辑
                                    </router-link>
                                </td>
                            </tr>
                        </table>
                    </div>
                <div class="ep_font30 ep_align_center ep_padding30" style="padding-top:0;" v-if="userInfo.ABSProjects.length > 3">
                    <router-link to="/AbsHistoryList">
                        查看更多
                    </router-link>
                </div>
            </div>
            <p class="ep_font24 ep_align_center ep_paddingBottom30 ep_color_grey" v-if="isArrayEmpty(userInfo.ABSProjects)">暂无ABS项目经历</p>
        </section>
        <section class="ep_part" id="projectHistoryOther">
            <header class="ep_part_title">
                <div class='appH5_title fl' style='overflow:hidden;'>
                    <span class='fl'>其它项目</span>
                    <span class="fl ep_marginLeft15 ep_font28 ep_overhide" v-if="!isArrayEmpty(userInfo.OtherProjects)">
                        <span class="fl">(共</span>
                        <span class="appH5_color_green appH5_font_larger fl">{{otherProjectHistoriesSummary.totalCount>9999?'9999+':otherProjectHistoriesSummary.totalCount}}</span>
                        <span class="fl">单，</span>
                        <span class="appH5_color_green appH5_font_larger fl">{{otherProjectHistoriesSummary.totalOffering.toFixed(2)>9999?'9999+':otherProjectHistoriesSummary.totalOffering.toFixed(2)}}</span>
                        <span class="fl">亿)</span>
                    </span> 
                </div>
                <router-link to="/OtherProject" class="fr">
                    <img class="addBtn" src="../../public/images/add.png" />
                </router-link>
            </header>
            <div v-if="!isArrayEmpty(userInfo.OtherProjects)" v-cloak>
                <div class='appH5_panel' style="padding-top:0px;">
                    <table class="appH5_table">
                        <tr>
                            <th class="text-left">简称</th>
                            <th class="text-right">金额(亿)</th>
                            <th class="text-center">类型</th>
                            <th class="text-right">
                                操作
                            </th>
                        </tr>
                        <tr v-for="item in _.take(userInfo.OtherProjects, 3)" v-bind:key="item.ProjectShortName">
                            <td class="ep_ellipsis text-left">{{item.ProjectShortName}}</td>
                            <td class="ep_ellipsis text-right appH5_color_red">{{item.TotalOffering.toFixed(2)}}</td>
                            <td class="ep_ellipsis text-center">{{item.DealType}}</td>
                            <td class="ep_ellipsis text-right">
                                <router-link class="ep_font24 ep_color_orange fr ep_lineHeight32" v-bind:to="'/OtherProject/' + item.Id">
                                    编辑
                                </router-link>
                            </td>
                        </tr>
                    </table>
               </div>
                <div class="ep_font30 ep_align_center ep_padding30" style="padding-top:0px;" v-if="userInfo.OtherProjects.length>3">
                    <router-link to="/OtherProjectList">
                        查看更多
                    </router-link>
                </div>
            </div>
            <p class="ep_font24 ep_align_center ep_paddingBottom30 ep_color_grey" v-if="isArrayEmpty(userInfo.OtherProjects)">暂无其它项目经历</p>
        </section>
        <section class="ep_part" id="workHistory">
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.WorkHistories)?'':'ep_part_item_border']">
                <span class='fl appH5_title'>工作经历</span>
                <router-link to="/WorkHistory" class="fr">
                    <img class="addBtn" src="../../public/images/add.png" />
                </router-link>
            </header>
            <div v-if="!isArrayEmpty(userInfo.WorkHistories)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in userInfo.WorkHistories" v-bind:key="item.Id">
                    <div class="ep_overhide">
                        <span class="ep_font28 ep_ellipsis fl ep_width600 appH5_color_green">{{item.Position}}</span>
                        <router-link v-bind:to="'/WorkHistory/' + item.Id" class="ep_font24 ep_color_orange fr ep_lineHeight32">
                            编辑
                        </router-link>
                    </div>
                    <div class="ep_font24 ep_color_grey2 ep_marginTop10 ep_overhide">
                        <span class="fl ep_maxWidth400 ep_ellipsis">{{item.Company}}</span>
                        <span class="fl ep_marginLeft24 ep_width250 ep_ellipsis">{{item.Department}}</span>
                    </div>
                    <div class="ep_font24 ep_color_grey2 ep_marginTop10">
                        <span>{{item.StartTime}}</span>
                        <span>-</span>
                        <span>{{item.EndTime}}</span>
                    </div>
                </div>
            </div>
            <p class="ep_font24 ep_align_center ep_paddingBottom30 ep_color_grey" v-if="isArrayEmpty(userInfo.WorkHistories)">暂无工作经历</p>
        </section>
        <section class="ep_part" id="otherPosition">
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.OtherPosts)?'':'ep_part_item_border']">
                <span class='fl appH5_title'>其它职务</span>
                <router-link to="/OtherPosition" class="fr">
                    <img class="addBtn" src="../../public/images/add.png" />
                </router-link>
            </header>
            <div v-if="!isArrayEmpty(userInfo.OtherPosts)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in userInfo.OtherPosts" v-bind:key="item.Id">
                    <div class="ep_overhide">
                        <span class="ep_font28 ep_ellipsis fl ep_width600">{{item.Name}}</span>
                        <!-- <a v-bind:href="'/expert/expertuser/otherPosition?id=' + item.Id" class="ep_font24 ep_color_orange fr ep_lineHeight32">编辑</a> -->
                        <router-link v-bind:to="'/OtherPosition/' + item.Id" class="ep_font24 ep_color_orange fr ep_lineHeight32">
                            编辑
                        </router-link>
                    </div>
                </div>
            </div>
            <p class="ep_font24 ep_align_center ep_paddingBottom30 ep_color_grey" v-if="isArrayEmpty(userInfo.OtherPosts)">暂无其它职务</p>
        </section>
        <section class="ep_part" id="awardsAndHonors">
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.HonorAwards)?'':'ep_part_item_border']">
                <span class='fl appH5_title'>奖项与荣誉</span>
                 <router-link to="/AwardAndHonor" class="fr">
                    <img class="addBtn" src="../../public/images/add.png" />
                </router-link>
            </header>
            <div v-if="!isArrayEmpty(userInfo.HonorAwards)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in userInfo.HonorAwards" v-bind:key="item.Id">
                    <div class="ep_overhide">
                        <span class="ep_font28 ep_ellipsis fl ep_width460 appH5_color_green">{{item.Name}}</span>
                        <!-- <a v-bind:href="'/expert/expertuser/awardsAndHonors?id=' + item.Id" class="ep_font24 ep_color_orange fr ep_lineHeight32 ep_marginLeft30">编辑</a> -->
                        <router-link v-bind:to="'/AwardAndHonor/' + item.Id" class="ep_font24 ep_color_orange fr ep_lineHeight32 ep_marginLeft30">
                            编辑
                        </router-link>
                        <span class="ep_font24 ep_ellipsis fr ep_color_grey2 ep_lineHeight32 ep_align_right ep_marginLeft15">{{item.Year}}</span>
                    </div>
                    <pre class="ep_decription ep_color_grey2 ep_font24">{{item.Description}}</pre>
                </div>
            </div>
            <p class="ep_font24 ep_align_center ep_paddingBottom30 ep_color_grey" v-if="isArrayEmpty(userInfo.HonorAwards)">暂无奖项与荣誉</p>
        </section>
        <section class="ep_part" id="activity">
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.RecentActivities)?'':'ep_part_item_border']">
                <span class='fl appH5_title'>近期活动</span>
                <router-link to="/Activity" class="fr">
                    <img class="addBtn" src="../../public/images/add.png" />
                </router-link>
            </header>
            <div v-if="!isArrayEmpty(userInfo.RecentActivities)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in _.take(userInfo.RecentActivities, 3)" v-bind:key="item.Id">
                    <div class="ep_overhide">
                        <span class="ep_font28 ep_ellipsis fl ep_width460 appH5_color_green">{{item.Name}}</span>
                        <!-- <a v-bind:href="'/expert/expertuser/activity?id=' + item.Id" class="ep_font24 ep_color_orange fr ep_lineHeight32 ep_marginLeft30">编辑</a> -->
                        <router-link v-bind:to="'/Activity/' + item.Id" class="ep_font24 ep_color_orange fr ep_lineHeight32 ep_marginLeft30">
                            编辑
                        </router-link>
                        <span class="ep_font24 ep_ellipsis fr ep_color_grey2 ep_lineHeight32 ep_align_right ep_marginLeft15">{{item.ActivityTime}}</span>
                    </div>
                    <pre class="ep_decription ep_color_grey2 ep_font24">{{item.Description}}</pre>
                </div>
                <div class="ep_font30 ep_align_center ep_padding30" v-if="userInfo.RecentActivities.length > 3">
                    <!-- <a href="/expert/expertuser/recentActivitiesList">查看更多</a> -->
                    <router-link to="/ActivityList">
                        查看更多
                    </router-link>
                </div>
            </div>
            <p class="ep_font24 ep_align_center ep_paddingBottom30 ep_color_grey" v-if="isArrayEmpty(userInfo.RecentActivities)">暂无近期活动</p>
        </section>
        <section class="ep_part" id="article">
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.Publishs)?'':'ep_part_item_border']">
                <span class='fl appH5_title'>著作与文章</span>
                <router-link to="/Article" class="fr">
                    <img class="addBtn" src="../../public/images/add.png" />
                </router-link>
            </header>
            <div v-if="!isArrayEmpty(userInfo.Publishs)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in _.take(userInfo.Publishs, 3)" v-bind:key="item.Id">
                    <div class="ep_overhide">
                        <span class="fl ep_font28">《</span>
                        <span class="ep_font28 ep_ellipsis fl ep_maxWidth460">{{item.Name}}</span>
                        <span class="fl ep_font28">》</span>
                        <router-link v-bind:to="'/Article/' + item.Id" class="ep_font24 ep_color_orange fr ep_lineHeight32 ep_marginLeft30">
                            编辑
                        </router-link>
                    </div>
                    <div class="divArticleDetail">
                        <ul class="ep_color_grey2 ep_font24 ep_decription articleDetail">
                            <li>
                                <span>作者：</span>
                                <span class="ep_ellipsis">{{item.Author}}</span>
                            </li>
                            <li v-if="isValidElement(item.Publisher)">
                                <span>出版社：</span>
                                <span class="ep_ellipsis">{{item.Publisher}}</span>
                            </li>
                            <li v-if="isValidElement(item.PublishTime)">
                                <span>出版时间：</span>
                                <span class="ep_ellipsis">{{isValidElement(item.PublishTime) ? item.PublishTime + '年' : ''}}</span>
                            </li>
                            <li v-if="isValidElement(item.Isbn)">
                                <span>书号ISBN：</span>
                                <span class="ep_ellipsis">{{item.Isbn}}</span>
                            </li>
                            <li v-if="isValidElement(item.Pages)">
                                <span>页数：</span>
                                <span class="ep_ellipsis">{{item.Pages}}</span>
                            </li>
                            <li v-if="isValidElement(item.Link)">
                                <span>作品网址：</span>
                                <a class="fl ep_ellipsis ep_width400 ep_color_blue ep_Link" v-bind:href="item.Link">{{item.Link}}</a>
                            </li>
                            <li v-show="isValidElement(item.AttachmentFileCode)">
                                <span>作品文件：</span>
                                <div class="fl">《</div>
                                <span class="fl ep_ellipsis">{{item.Name}}</span>
                                <div class="fl">》</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="ep_font30 ep_align_center ep_padding30" v-if="userInfo.Publishs.length > 3">
                    <router-link to="/ArticleList">
                        查看更多
                    </router-link>
                </div>
            </div>
            <p class="ep_font24 ep_align_center ep_paddingBottom30 ep_color_grey" v-if="isArrayEmpty(userInfo.Publishs)">暂无著作与文章</p>
        </section>
        <section class="ep_part" id="educationHistory">
            <header class="ep_part_title" v-bind:class="[isArrayEmpty(userInfo.Educations)?'':'ep_part_item_border']">
                <span class='fl appH5_title'>教育经历</span>

                <router-link to="/Education" class="fr">
                    <img class="addBtn" src="../../public/images/add.png" />
                </router-link>
            </header>
            <div v-if="!isArrayEmpty(userInfo.Educations)" v-cloak>
                <div class="ep_padding30 ep_part_item_border" v-for="item in userInfo.Educations" v-bind:key="item.Id">
                    <div class="ep_overhide">
                        <span class="ep_font28 ep_ellipsis fl ep_width400">{{item.School}}</span>
                        <router-link v-bind:to="'/Education/' + item.Id" class="ep_font24 ep_color_orange fr ep_lineHeight32 ep_marginLeft30">
                            编辑
                        </router-link>
                        <span class="ep_font24 ep_ellipsis fr ep_color_grey2 ep_lineHeight32 ep_align_right ep_marginLeft15">
                            <span>{{item.FromYear}}</span>
                            <span>-</span>
                            <span>{{item.ToYear}}</span>
                        </span>
                    </div>
                    <ul class="ep_color_grey2 ep_font24 ep_decription educationDetail ep_marginTop10">
                        <li class="ep_overhide">
                            <span class="fl">学位：</span>
                            <span class="fl ep_width600">{{item.Degree}}</span>
                        </li>
                        <li>
                            <pre class="ep_decription">{{item.Description}}</pre>
                        </li>
                    </ul>
                </div>
            </div>
            <p class="ep_font24 ep_align_center ep_paddingBottom30 ep_color_grey" v-if="isArrayEmpty(userInfo.Educations)">暂无教育经历</p>
        </section>
        <section class="ep_part" id="personalProfile" v-if="isValidElement(userInfo.User)">
            <header class="ep_part_title" v-bind:class="[isValidElement(userInfo.User.Introduction)?'ep_part_item_border':'']">
                <span class='fl appH5_title'>个人简介</span>
                <router-link to="/BriefIntroducation">
                    <img class="fr editPencils" src="../../public/images/pencils.png" alt="">
                </router-link>
                <!-- <a href="/expert/expertuser/personalProfile">
                    <img class="fr editPencils" src="../../public/images/pencils.png" alt="">
                </a> -->
            </header>
            <pre v-if="isValidElement(userInfo.User.Introduction)" class="ep_part_description" v-cloak>{{userInfo.User && userInfo.User.Introduction}}</pre>
            <p v-else class="ep_font24 ep_align_center ep_paddingBottom30 ep_color_grey">暂无个人简介</p>
        </section>
    </div>
</template>

<script>
import axios from "axios";
import * as webApi from "@/config/api";
import _ from "lodash";

import "@/public/css/expert/reset.css";
import "@/public/css/theme.css";
import "@/public/css/expert/editProfile.css";

export default {
  name: "EditProfile",
  data: function() {
    return {
      _: {},
      userInfo: {}
    };
  },
  created: function() {
    this._ = _;
    this.initData();
  },
  methods: {
    initData: function() {
      axios.post(webApi.Expert.getExpert).then(response => {
            this.userInfo = response.data.data;
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
    routeUrls: function() {
      return null;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
