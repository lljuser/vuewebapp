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
                            <th class='text-right ep_width90'>操作</th>
                        </tr>
                        <tr v-for="item in projectHistories" v-bind:key="item.Id">
                            <td class='text-left ep_color_yellow'>
                                    <a class="ep_font32 ep_ellipsis fl ep_width176 ep_color_yellow" v-bind:href="'/expert/expertuser/projectABSDetails?dealId=' + item.DealId">{{item.DealName}}</a>
                            </td>
                            <td class='text-right appH5_color_red'>{{item.TotalOffering.toFixed(2)}}</td>
                            <td class='text-center ep_ellipsis'>{{item.DealType}}</td>
                            <td>
                                <router-link v-bind:to="'/AbsHistory/' + item.Id" class="ep_font24 ep_color_orange fr ep_lineHeight32">
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
    import axios from "axios";
    import * as webApi from "@/config/api";

    export default {
        name: 'AbsHistoryList',
        data: function () {
            return {
                projectHistories: [],
            };
        },
        created: function () {
            this.initData();
        },
        methods: {
            initData: function () {
                axios.post(webApi.Expert.getAbsProjectsByEditing).then(response => {
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

