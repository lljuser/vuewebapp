<template>
    <div class="projectHistoryOtherListContent ep_font32">
        <div class="ep_marginTop24"></div>
        <div class="ep_content_div" v-if="!util.isArrayEmpty(projectHistories)" v-cloak>
            <div class='appH5_panel' style="padding-top:0px;">
                    <table class="appH5_table">
                        <tr>
                            <th class="text-left ep_width176">简称</th>
                            <th class="text-right">金额(亿)</th>
                            <th class="text-center">类型</th>
                            <th class='text-right ep_width90'>点赞</th>
                        </tr>
                        <tr v-for="item in projectHistories" v-bind:key="item.ProjectShortName">
                            <td class="ep_ellipsis text-left">
                                      <div class=" ep_ellipsis fl ep_width176">
                                    {{item.ProjectShortName}}
                                </div>
                              </td>
                            <td class="ep_ellipsis text-right appH5_color_red">{{item.TotalOffering.toFixed(2)}}</td>
                            <td class="ep_ellipsis text-center">
                                     <div class=" ep_ellipsis fl ep_width176">
                                    {{item.DealType}}
                                </div>
                            </td>
                            <td class='text-right '>
                               <div v-if="!editable" class="ep_overhide ep_lineHeight32 ">
                                <img class="followImg" v-bind:class="item.IsEndorse?'appH5_followIcon':'appH5_unfollowIcon'" v-on:click="otherProjectEndorseHandle(item)" v-bind:src="endorseImg(item.IsEndorse)" />
                                </div>
                                 <div v-else class="ep_overhide ep_lineHeight32 ">
                                <img class="followImg" v-bind:class="item.IsEndorse?'appH5_followIcon':'appH5_unfollowIcon'"  v-bind:src="endorseImg(item.IsEndorse)" />
                                </div>
                            </td>
                        </tr>
                    </table>
               </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import * as webApi from "@/config/api";
    import util from '@/public/modules/expert/utils';
    import dislikeImg from '@/public/images/dislike.png';
    import likeImg from '@/public/images/like.png';

    export default {
        name: 'ReadOtherProjectList',
        data: function () {
            return {
                queryString: {},//GetRequest(),
                projectHistories: [],
                otherProjectEndorseLock: false,
                editable: false,
                util: {},
                userId: null,
            }
        },
        created: function () {
            this.userId = this.$route.params.userId;
            this.util = util;
            this.initData();
        },
        methods: {
            initData: function () {
                axios.post(webApi.Expert.getOtherProjects, { UserId: this.userId }).then(response => {
                    this.projectHistories = response.data.data.ProjectHistories;
                    this.editable = response.data.data.Editable;
                });
            },
            //机构角色拼接
            splicingOrganizationRoles: function (organizationRoles) {
                if (util.isArrayEmpty(organizationRoles)) return "";

                var result = [];

                organizationRoles.forEach(function (item) {
                    result.push(item.IsCustomizedOrganizationRole ? item.CustomizedOrganizationRole : item.OrganizationRole);
                });

                return result.sort().join();
            },
            endorseImg: function (isEndorse) {
                return isEndorse ? likeImg : dislikeImg;
            },
            otherProjectEndorseHandle: function (otherProject) {
                if (this.otherProjectEndorseLock) return;

                this.otherProjectEndorseLock = true;
                var self = this;

                //取消点赞
                if (otherProject.IsEndorse) {
                    axios.post(webApi.Expert.deleteOtherProjectEndorse, {
                        UserId: this.userId,
                        dealId: otherProject.Id
                    }).then(response => {
                        otherProject.EndorseNum = response.data.data.EndorseNum;
                        otherProject.IsEndorse = response.data.data.IsEndorse;
                        this.otherProjectEndorseLock = false;
                    });
                    return;
                }

                //点赞
                axios.post(webApi.Expert.addOtherProjectEndorse, {
                        UserId: this.userId,
                        dealId: otherProject.Id
                    }).then(response => {
                        otherProject.EndorseNum = response.data.data.EndorseNum;
                        otherProject.IsEndorse = response.data.data.IsEndorse;
                        this.otherProjectEndorseLock = false;
                    });
            },
        }
    }
</script>

<style>

</style>
