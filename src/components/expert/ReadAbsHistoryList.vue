<template>
    <div id="projectHistoryABSListContent" class="projectHistoryABSListContent ep_font32" :class="isShowHeader ? 'paddingTop50': ''">
        <div class="ep_marginTop24"></div>
        <div class="ep_content_div" v-if="!isArrayEmpty(projectHistories)" v-cloak>
              <div class='appH5_panel'>
                <table class="appH5_table">
                    <tr>
                        <th class='text-left ep_width225'>名称</th>
                        <th class='text-right'>金额(亿)</th>
                        <th class='text-right'>类型</th>
                        <th class='text-right' style="width:30px;" v-if="!editable">点赞</th>
                    </tr>
                    <tr v-for="item in projectHistories" v-bind:key="item.DealId">
                        <td class='text-left'>
                            <!-- <a class="ep_font32 ep_ellipsis fl ep_width225 ep_color_yellow" v-bind:href="'/webapp/product.html?dealId=' + item.DealId">{{item.DealName}}</a> -->
                            <router-link :to="productDetailUrl(item.DealId)" class="ep_font32 ep_ellipsis fl ep_width225 ep_color_yellow">
                                {{item.DealName}}
                            </router-link>
                        </td>
                        <td class='text-right appH5_color_red'>{{item.TotalOffering.toFixed(2)}}</td>
                        <td class='text-right ep_ellipsis'>
                            {{item.DealType}}
                        </td>
                        <td class='text-right' v-if="!editable">
                            <div class="ep_overhide ep_lineHeight32">
                                <img class="followImg" v-bind:class="item.IsEndorse?'appH5_followIcon':'appH5_unfollowIcon'" v-on:click="absProjectEndorseHandle(item)" v-bind:src="endorseImg(item.IsEndorse)" />
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import BusUtil from '../abs/BusUtil';
    import util from "@/public/modules/expert/utils";
    import axios from "axios";
    import * as webApi from "@/config/api";
    import dislikeImg from '@/public/images/dislike.png';
    import likeImg from '@/public/image/followicon.png';

    export default {
        name: 'ReadAbsHistoryList',
        data: function () {
            return {
                projectHistories: [],
                absProjectEndorseLock: false,
                editable: false,
                userId: null,
                isShowHeader: false,
                query: null
            }
        },
        created: function () {
            this.userId = this.$route.params.userId;
            this.initData();
            this.scrollRestore();
        },
        beforeRouteEnter: (to, from, next) => {
            next(vm => {
                var query = util.getQueryString();

                if (query.isShowHeader) {
                    vm.isShowHeader = true;
                    vm.query = query;
                    const busUtil = BusUtil.getInstance();
                    busUtil.bus.$emit('showHeader', true);
                    busUtil.bus.$emit('path', 'expert.html?' + util.toQueryString(query));
                    busUtil.bus.$emit('headTitle', 'ABS项目');
                }
            });
        },
        methods: {
            initData: function () {
                axios.post(webApi.Expert.getAbsProjects, { UserId: this.userId }).then(response => {
                    this.projectHistories = response.data.data.ProjectHistories;
                    this.editable = response.data.data.Editable;
                });
            },
            //机构角色拼接
            splicingOrganizationRoles: function (organizationRoles) {
                if (this.isArrayEmpty(organizationRoles)) return "";

                var result = [];

                organizationRoles.forEach(function (item) {
                    result.push(item.IsCustomizedOrganizationRole ? item.CustomizedOrganizationRole : item.OrganizationRole);
                });

                return result.sort().join();
            },
            isArrayEmpty: function (arr) {
                return (arr === null || arr === undefined || arr.length === 0);
            },
            isValidElement: function (item) {
                return !(item === null || item === undefined || item === "");

            },
            endorseImg: function (isEndorse) {
                return isEndorse ? likeImg : dislikeImg;
            },
            absProjectEndorseHandle: function (absProject) {
                if (this.absProjectEndorseLock) return;

                this.absProjectEndorseLock = true;

                //取消点赞
                if (absProject.IsEndorse) {
                    axios.post(webApi.Expert.deleteAbsProjectEndorse, {
                        userId: this.userId,
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
                        userId: this.userId,
                        dealId: absProject.DealId
                    }).then(response => {
                        absProject.EndorseNum = response.data.data.EndorseNum;
                        absProject.IsEndorse = response.data.data.IsEndorse;
                        this.absProjectEndorseLock = false;
                    });
            },
            scrollRestore: function () {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0; 
            },
            productDetailUrl: function(id) {
                return this.isShowHeader ? {path: `/ProductDetail/${id}`, query: this.query} : `/ProductDetail/${id}`;
            },
        }
    }
</script>


<style>

</style>
