<template>
    <div class="projectHistoryOtherListContent ep_font32">
        <div class="ep_marginTop24"></div>
        <div class="ep_content_div" v-if="!util.isArrayEmpty(projectHistories)" v-cloak>
            <div class='appH5_panel' style="padding-top:0px;">
                    <table class="appH5_table">
                        <tr>
                            <th class="text-left">简称</th>
                            <th class="text-right">金额(亿)</th>
                            <th class="text-center">类型</th>
                            <th class='text-right'>为Ta点赞</th>
                        </tr>
                        <tr v-for="item in projectHistories" v-bind:key="item.ProjectShortName">
                            <td class="ep_ellipsis text-left">{{item.ProjectShortName}}</td>
                            <td class="ep_ellipsis text-right appH5_color_red">{{item.TotalOffering.toFixed(2)}}</td>
                            <td class="ep_ellipsis text-center">{{item.DealType}}</td>
                            <td class='text-right'>
                               <div v-if="!editable" class="ep_overhide ep_lineHeight32 ep_width112">
                                <img class="followImg" v-bind:class="item.IsEndorse?'appH5_followIcon':'appH5_unfollowIcon'" v-on:click="otherProjectEndorseHandle(item)" v-bind:src="endorseImg(item.IsEndorse)" />
                                {{item.EndorseNum === 0 ? '' : item.EndorseNum}}
                                </div>
                                 <div v-else class="ep_overhide ep_lineHeight32 ep_width112">
                                <img class="followImg" v-bind:class="item.IsEndorse?'appH5_followIcon':'appH5_unfollowIcon'"  v-bind:src="endorseImg(item.IsEndorse)" />
                                {{item.EndorseNum === 0 ? '' : item.EndorseNum}}
                                </div>
                            </td>
                        </tr>
                    </table>
               </div>
        </div>
    </div>
</template>

<script>
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
                util: {}
            }
        },
        created: function () {
            this.initData();
        },
        methods: {
            initData: function () {
                this.projectHistories = [{"Id":73,"ProjectName":"test","ProjectShortName":"test","TotalOffering":0.0,"DealType":"资产证券化","Nation":null,"Description":null,"EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":73,"OrganizationRoleId":20,"OrganizationRole":"税务顾问","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null},{"Id":0,"DealId":73,"OrganizationRoleId":12,"OrganizationRole":"担保人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null},{"Id":0,"DealId":73,"OrganizationRoleId":6,"OrganizationRole":"发起机构","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}},{"Id":80,"ProjectName":"qwe","ProjectShortName":"qwe","TotalOffering":10.0,"DealType":"资产证券化","Nation":"qwe","Description":"","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":80,"OrganizationRoleId":23,"OrganizationRole":"委托机构","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}},{"Id":81,"ProjectName":"rweqw","ProjectShortName":"qweqwe001","TotalOffering":20.0,"DealType":"结构性融资","Nation":"rew","Description":"","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":81,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}},{"Id":82,"ProjectName":"aaaa","ProjectShortName":"ssss","TotalOffering":20.0,"DealType":"结构性融资","Nation":"qwe","Description":"","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":82,"OrganizationRoleId":1,"OrganizationRole":"承销商","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}},{"Id":83,"ProjectName":"eeee","ProjectShortName":"eeee","TotalOffering":10.0,"DealType":"结构性融资","Nation":"wwww","Description":"","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":83,"OrganizationRoleId":19,"OrganizationRole":"财务顾问","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":84,"ProjectName":"dddd","ProjectShortName":"wwww","TotalOffering":30.0,"DealType":"结构性融资","Nation":"fffff","Description":"","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":84,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":85,"ProjectName":"qqqq","ProjectShortName":"aaaa","TotalOffering":30.0,"DealType":"PPP","Nation":"cccc","Description":"","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":85,"OrganizationRoleId":12,"OrganizationRole":"担保人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":3,"Name":"项目参与人"}}];
                this.util = util;
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
                    appFrame.ajax("/expert/ExpertInfo/DeleteOtherProjectEndorse", {
                        data: { userId: this.queryString.UserId, dealId: otherProject.Id },
                        success: function (res) {
                            if (res.status === "fail") {
                                //TODO alert fail message
                                return;
                            }

                            otherProject.EndorseNum = res.data.EndorseNum;
                            otherProject.IsEndorse = res.data.IsEndorse;
                            self.otherProjectEndorseLock = false;
                        }
                    });
                    return;
                }

                //点赞
                appFrame.ajax("/expert/ExpertInfo/AddOtherProjectEndorse", {
                    data: { userId: this.queryString.UserId, dealId: otherProject.Id },
                    success: function (res) {
                        console.log(res);
                        if (res.status === "fail") {
                            //TODO alert fail message
                            return;
                        }

                        otherProject.EndorseNum = res.data.EndorseNum;
                        otherProject.IsEndorse = res.data.IsEndorse;
                        self.otherProjectEndorseLock = false;
                    }
                });
            },
        }
    }
</script>

<style>

</style>
