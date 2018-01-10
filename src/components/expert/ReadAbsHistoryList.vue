<template>
    <div id="projectHistoryABSListContent" class="projectHistoryABSListContent ep_font32">
        <div class="ep_marginTop24"></div>
        <div class="ep_content_div" v-if="!isArrayEmpty(projectHistories)" v-cloak>
              <div class='appH5_panel' style="padding-top:0px;">
                        <table class="appH5_table">
                            <tr>
                                <th class='text-left'>名称</th>
                                <th class='text-right'>金额(亿)</th>
                                <th class='text-center'>类型</th>
                                <th class='text-right'>为Ta点赞</th>
                            </tr>
                            <tr v-for="item in projectHistories" v-bind:key="item.DealId">
                                <td class='text-left'>
                                    <a class="ep_font32 ep_ellipsis fl ep_width520 ep_color_yellow" v-bind:href="'/expert/expertuser/projectABSDetails?dealId=' + item.DealId">{{item.DealName}}</a>
                                    </td>
                                <td class='text-right appH5_color_red'>{{item.TotalOffering.toFixed(2)}}</td>
                                <td class='text-center'>{{item.DealType}}</td>
                                <td class='text-right'>
                                    <div v-if="!editable" class="ep_overhide ep_lineHeight32 ep_width112">
                                          <img class="followImg" v-bind:class="item.IsEndorse?'appH5_followIcon':'appH5_unfollowIcon'" v-on:click="absProjectEndorseHandle(item)" v-bind:src="endorseImg(item.IsEndorse)" />
                                        {{item.EndorseNum === 0 ? '' : item.EndorseNum}}
                                    </div>
                                  <div v-else  class="ep_overhide ep_lineHeight32 ep_width112">
                                         <img class="followImg" v-bind:class="item.IsEndorse?'appH5_followIcon':'appH5_unfollowIcon'"  v-bind:src="endorseImg(item.IsEndorse)" />
                                        {{item.EndorseNum === 0 ? '' : item.EndorseNum}}
                                  </div>
                                </td>
                            </tr>
                        </table>
                    </div>
            <!-- <div class="ep_padding30 ep_part_item_border" v-for="(item,index) in projectHistories" v-bind:key="item.DealId" v-bind:class="[index===0?'ep_paddingTop46':'']">
                <div class="ep_overhide">
                    <a class="ep_font32 ep_ellipsis fl ep_width520 ep_color_yellow" v-bind:href="'/expert/expertuser/projectABSDetails?dealId=' + item.DealId">{{item.DealName}}</a>
                    <div v-if="!editable" class="ep_overhide fr ep_lineHeight32 ep_width112">
                        <img class="fl ep_icon_like ep_marginTop5" v-on:click="absProjectEndorseHandle(item)" v-bind:src="endorseImg(item.IsEndorse)" />
                        <span class="fl ep_font24 ep_color_grey">{{item.EndorseNum === 0 ? '' : item.EndorseNum}}</span>
                    </div>
                    <span v-else class="fr ep_color_grey ep_font24 ep_lineHeight32">{{item.EndorseNum === 0 ? '' : item.EndorseNum+'人赞'}}</span>
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
                </table>
            </div> -->
        </div>
    </div>
</template>

<script>
import axios from "axios";
import * as webApi from "@/config/api";
import dislikeImg from "@/public/images/dislike.png";
import likeImg from "@/public/images/like.png";

export default {
  name: "ReadAbsHistoryList",
  data: function() {
    return {
      queryString: {}, //GetRequest(),
      projectHistories: [],
      absProjectEndorseLock: false,
      editable: false,
      userId: null
    };
  },
  created: function() {
    this.userId = this.$route.params.userId;
    this.initData();
  },
  methods: {
    initData: function() {
      axios.post(webApi.Expert.getAbsProjects, { UserId: this.userId })
        .then(response => {
          this.projectHistories = response.data.data.ProjectHistories;
          this.editable = response.data.data.Editable;
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
    endorseImg: function(isEndorse) {
      return isEndorse ? likeImg : dislikeImg;
    },
    absProjectEndorseHandle: function(absProject) {
      if (this.absProjectEndorseLock) return;

      this.absProjectEndorseLock = true;
      var self = this;

      //取消点赞
      if (absProject.IsEndorse) {
        axios.post(webApi.Expert.deleteAbsProjectEndorse, {
            UserId: this.userId,
            dealId: absProject.DealId
          }).then(response => {
             absProject.EndorseNum = response.data.data.EndorseNum;
             absProject.IsEndorse = response.data.data.IsEndorse;
             this.absProjectEndorseLock = false;
          });
        return;
      }

      //点赞
      axios.post(webApi.Expert.addAbsProjectEndorse, {
            UserId: this.userId,
            dealId: absProject.DealId
          }).then(response => {
             absProject.EndorseNum = response.data.data.EndorseNum;
             absProject.IsEndorse = response.data.data.IsEndorse;
             this.absProjectEndorseLock = false;
          });
    }
  }
};
</script>


<style>

</style>
