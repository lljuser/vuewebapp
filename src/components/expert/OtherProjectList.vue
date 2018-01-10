<template>
  <div class="projectHistoryOtherListContent ep_font32">
        <div class="ep_marginTop24"></div>
        <div class="ep_content_div" v-if="!isArrayEmpty(projectHistories)" v-cloak>
            <div class="ep_padding30 ep_part_item_border" v-for="(item,index) in projectHistories" v-bind:key="item.ProjectName" v-bind:class="[index===0?'ep_paddingTop46':'']">
                <div class="ep_overhide">
                    <span class="ep_font32 fl ep_width600">{{item.ProjectName}}</span>
                    <a class="ep_font24 ep_color_orange fr ep_lineHeight32" v-bind:href="'/expert/expertuser/projectHistoryOther?id=' + item.Id">编辑</a>
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
    export default {
        name: 'AbsHistoryList',
        data: function () {
            return {
                projectHistories: [],
            };
        },
        created: function () {
            this.projectHistories = [{"Id":73,"ProjectName":"test","ProjectShortName":"test","TotalOffering":0.0,"DealType":"资产证券化","Nation":null,"Description":null,"EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":73,"OrganizationRoleId":20,"OrganizationRole":"税务顾问","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null},{"Id":0,"DealId":73,"OrganizationRoleId":12,"OrganizationRole":"担保人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null},{"Id":0,"DealId":73,"OrganizationRoleId":6,"OrganizationRole":"发起机构","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}},{"Id":80,"ProjectName":"qwe","ProjectShortName":"qwe","TotalOffering":10.0,"DealType":"资产证券化","Nation":"qwe","Description":"","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":80,"OrganizationRoleId":23,"OrganizationRole":"委托机构","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}},{"Id":81,"ProjectName":"rweqw","ProjectShortName":"qweqwe001","TotalOffering":20.0,"DealType":"结构性融资","Nation":"rew","Description":"","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":81,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}},{"Id":82,"ProjectName":"aaaa","ProjectShortName":"ssss","TotalOffering":20.0,"DealType":"结构性融资","Nation":"qwe","Description":"","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":82,"OrganizationRoleId":1,"OrganizationRole":"承销商","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":2,"Name":"项目负责人"}},{"Id":83,"ProjectName":"eeee","ProjectShortName":"eeee","TotalOffering":10.0,"DealType":"结构性融资","Nation":"wwww","Description":"","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":83,"OrganizationRoleId":19,"OrganizationRole":"财务顾问","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":84,"ProjectName":"dddd","ProjectShortName":"wwww","TotalOffering":30.0,"DealType":"结构性融资","Nation":"fffff","Description":"","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":84,"OrganizationRoleId":11,"OrganizationRole":"差额支付承诺人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":1,"Name":"部门负责人"}},{"Id":85,"ProjectName":"qqqq","ProjectShortName":"aaaa","TotalOffering":30.0,"DealType":"PPP","Nation":"cccc","Description":"","EndorseNum":0,"IsEndorse":false,"OrganizationRoles":[{"Id":0,"DealId":85,"OrganizationRoleId":12,"OrganizationRole":"担保人","IsCustomizedOrganizationRole":false,"CustomizedOrganizationRole":null}],"PersonalResponsibility":{"Id":3,"Name":"项目参与人"}}];
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


