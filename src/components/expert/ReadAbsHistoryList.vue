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
    import dislikeImg from '@/public/images/dislike.png';
    import likeImg from '@/public/images/like.png';

    export default {
        name: 'ReadAbsHistoryList',
        data: function () {
            return {
                queryString: {},//GetRequest(),
                projectHistories: [],
                absProjectEndorseLock: false,
                editable: false
            }
        },
        created: function () {
            this.initData();
        },
        methods: {
            initData: function () {
                this.projectHistories = [{"Id":154,"DealId":2605,"DealName":"鼎程2018-1","TotalOffering":11.18,"DealType":"保理融资","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":391,"DealId":2605,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}},{"Id":157,"DealId":1423,"DealName":"中飞租2017-1","TotalOffering":1.71,"DealType":"融资租赁","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":394,"DealId":1423,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":3,"Name":"项目参与人"}},{"Id":138,"DealId":2084,"DealName":"中建材2017-2","TotalOffering":9.0,"DealType":"应收账款","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":332,"DealId":2084,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":145,"DealId":2031,"DealName":"安心贷1号2017-1","TotalOffering":4.47,"DealType":"小额贷款","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":357,"DealId":2031,"OrganizationRoleId":24,"OrganizationRole":"其它","IsCustomizedOrganizationRole":true,"CustomizedOrganizationRole":"test"},{"Id":358,"DealId":2031,"OrganizationRoleId":24,"OrganizationRole":"其它","IsCustomizedOrganizationRole":true,"CustomizedOrganizationRole":"testss"}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":153,"DealId":2291,"DealName":"借呗2017-43","TotalOffering":40.0,"DealType":"个人消费贷款","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":390,"DealId":2291,"OrganizationRoleId":1,"OrganizationRole":"承销商","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":137,"DealId":2277,"DealName":"借呗E2017-1","TotalOffering":4.7,"DealType":"个人消费贷款","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":331,"DealId":2277,"OrganizationRoleId":1,"OrganizationRole":"承销商","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":156,"DealId":1628,"DealName":"鄂黄2017-1","TotalOffering":5.0,"DealType":"收费收益权","EndorseNum":3,"IsEndorse":false,"OrganizationRoles":[{"Id":393,"DealId":1628,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}}];
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
                var self = this;

                //取消点赞
                if (absProject.IsEndorse) {
                    appFrame.ajax("/expert/ExpertInfo/DeleteAbsProjectEndorse", {
                        data: { userId: this.queryString.UserId, dealId: absProject.DealId },
                        success: function (res) {
                            if (res.status === "fail") {
                                //TODO alert fail message
                                return;
                            }

                            absProject.EndorseNum = res.data.EndorseNum;
                            absProject.IsEndorse = res.data.IsEndorse;
                            self.absProjectEndorseLock = false;
                        }
                    });
                    return;
                }

                //点赞
                appFrame.ajax("/expert/ExpertInfo/AddAbsProjectEndorse", {
                    data: { userId: this.queryString.UserId, dealId: absProject.DealId },
                    success: function (res) {

                        if (res.status === "fail") {
                            //TODO alert fail message
                            return;
                        }

                        absProject.EndorseNum = res.data.EndorseNum;
                        absProject.IsEndorse = res.data.IsEndorse;
                        self.absProjectEndorseLock = false;
                    }
                });
            }
        }
    }
</script>


<style>

</style>
