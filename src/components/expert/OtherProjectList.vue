<template>
  <div class="projectHistoryOtherListContent ep_font32">
        <div class="ep_marginTop24"></div>
        <div class="ep_content_div" v-if="!isArrayEmpty(projectHistories)" v-cloak>
             <div class='appH5_panel' style="padding-top:0px;">
                    <table class="appH5_table">
                        <tr>
                            <th class="text-left">简称</th>
                            <th class="text-right">金额(亿)</th>
                            <th class="text-center">类型</th>
                            <th class="text-right ep_width90">
                                操作
                            </th>
                        </tr>
                        <tr v-for="item in projectHistories" v-bind:key="item.ProjectName">
                            <td class="ep_ellipsis text-left">{{item.ProjectShortName}}</td>
                            <td class="ep_ellipsis text-right appH5_color_red">{{item.TotalOffering.toFixed(2)}}</td>
                            <td class="ep_ellipsis text-center">{{item.DealType}}</td>
                            <td class="ep_ellipsis text-right">
                                <router-link class="ep_font24 ep_color_orange fr ep_lineHeight32" to="/OtherProject">
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


