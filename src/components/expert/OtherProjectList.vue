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
    import axios from 'axios';
    import * as webApi from '@/config/api';

    export default {
        name: 'OtherProjectList',
        data: function () {
            return {
                projectHistories: [],
            };
        },
        created: function () {
            this.projectHistories = this.initData();
        },
        methods: {
            initData: function () {
                axios.post(webApi.Expert.getOtherProjectsByEditing)
                    .then(response => {
                    this.projectHistories = response.data.data;
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
            }
        }
    }
</script>

<style>

</style>


