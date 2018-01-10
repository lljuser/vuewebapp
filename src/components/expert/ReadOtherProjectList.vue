<template>
    <div class="projectHistoryOtherListContent ep_font32">
        <div class="ep_marginTop24"></div>
        <div class="ep_content_div" v-if="!util.isArrayEmpty(projectHistories)" v-cloak>
            <div class="ep_padding30 ep_part_item_border" v-for="(item,index) in projectHistories" v-bind:key="item.ProjectName" v-bind:class="[index===0?'ep_paddingTop46':'']">
                <div class="ep_overhide">
                    <span class="ep_font32 fl ep_width520">{{item.ProjectName}}</span>
                    <div v-if="!editable" class="ep_overhide fr ep_lineHeight32 ep_width112">
                        <img class="fl ep_icon_like ep_marginTop5" v-on:click="otherProjectEndorseHandle(item)" v-bind:src="endorseImg(item.IsEndorse)" />
                        <span class="fl ep_font24 ep_color_grey">{{item.EndorseNum === 0 ? '' : item.EndorseNum}}</span>
                    </div>
                    <span v-else class="fr ep_color_grey ep_font24 ep_lineHeight32">{{item.EndorseNum === 0 ? '' : item.EndorseNum+'人赞'}}</span>
                </div>
                <table class="projectHistoryABSList ep_font28 ep_marginTop10">
                    <tr>
                        <td class="ep_ellipsis">{{item.DealType}}</td>
                        <td class="ep_ellipsis" v-if="item.TotalOffering !== 0">{{item.TotalOffering.toFixed(2)}}亿元</td>
                        <td class="ep_ellipsis">{{item.ProjectShortName}}</td>
                        <td class="ep_ellipsis">{{item.Nation}}</td>
                    </tr>
                    <tr>
                        <td>{{item.PersonalResponsibility.Name}}</td>
                        <td colspan="3">{{splicingOrganizationRoles(item.OrganizationRoles)}}</td>
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
