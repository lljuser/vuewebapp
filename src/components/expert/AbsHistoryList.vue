<template>
    <div class="projectHistoryABSListContent ep_font32">
        <div class="ep_marginTop24"></div>
            <div class='appH5_panel' style="padding-top:0px;">
                <div class="ep_content_div" v-if="!isArrayEmpty(projectHistories)" v-cloak>
                    <table class="appH5_table">
                        <tr>
                            <th class='text-left'>名称</th>
                            <th class='text-right'>金额(亿)</th>
                            <th class='text-center'>类型</th>
                            <th class='text-right'>操作</th>
                        </tr>
                        <tr v-for="item in projectHistories" v-bind:key="item.Id">
                            <td class='text-left ep_color_yellow'>
                                    <a class="ep_font32 ep_ellipsis fl ep_width520 ep_color_yellow" v-bind:href="'/expert/expertuser/projectABSDetails?dealId=' + item.DealId">{{item.DealName}}</a>
                            </td>
                            <td class='text-right appH5_color_red'>{{item.TotalOffering.toFixed(2)}}</td>
                            <td class='text-center'>{{item.DealType}}</td>
                            <td>
                                <router-link to="'/expert/expertuser/projectHistoryABS?id=' + item.Id" class="ep_font24 ep_color_orange fr ep_lineHeight32">
                                    编辑
                                </router-link>
                            </td>
                        </tr>
                    </table>
                </div>
                </div>
    </div>
</template>

<script>
    export default {
        name: 'AbsHistoryList',
        data: function () {
            return {
                projectHistories: [],
            };
        },
        created: function () {
            this.projectHistories = [{"Id":154,"DealId":2605,"DealName":"鼎程2018-1","TotalOffering":11.18,"DealType":"保理融资","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":391,"DealId":2605,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}},{"Id":157,"DealId":1423,"DealName":"中飞租2017-1","TotalOffering":1.71,"DealType":"融资租赁","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":394,"DealId":1423,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":3,"Name":"项目参与人"}},{"Id":138,"DealId":2084,"DealName":"中建材2017-2","TotalOffering":9.0,"DealType":"应收账款","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":332,"DealId":2084,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":145,"DealId":2031,"DealName":"安心贷1号2017-1","TotalOffering":4.47,"DealType":"小额贷款","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":357,"DealId":2031,"OrganizationRoleId":24,"OrganizationRole":"其它","IsCustomizedOrganizationRole":true,"CustomizedOrganizationRole":"test"},{"Id":358,"DealId":2031,"OrganizationRoleId":24,"OrganizationRole":"其它","IsCustomizedOrganizationRole":true,"CustomizedOrganizationRole":"testss"}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":153,"DealId":2291,"DealName":"借呗2017-43","TotalOffering":40.0,"DealType":"个人消费贷款","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":390,"DealId":2291,"OrganizationRoleId":1,"OrganizationRole":"承销商","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":137,"DealId":2277,"DealName":"借呗E2017-1","TotalOffering":4.7,"DealType":"个人消费贷款","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":331,"DealId":2277,"OrganizationRoleId":1,"OrganizationRole":"承销商","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":156,"DealId":1628,"DealName":"鄂黄2017-1","TotalOffering":5.0,"DealType":"收费收益权","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":393,"DealId":1628,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}}];
        },
        methods: {
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

            }
        }
    }
</script>

<style>

</style>

