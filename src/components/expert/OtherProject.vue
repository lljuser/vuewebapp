<template>
    <div id="projectHistoryOtherContent" class="projectHistoryOtherContent ep_font32">
        <div class="ep_marginTop24"></div>
        <div class="ep_content_div">
            <div class="ep_part_item ep_font32 ep_overhide ep_part_item_border">
                <div class="ep_title_div">
                    <span>产品类型</span>
                    <span class="ep_marginTop5 ep_marginLeft10">*</span>
                </div>
                <select v-bind:class="otherDealTypeModel === '' ?'ep_color_grey':'ep_color_white' " class="ep_select fl ep_font32  personalRoleSelect" v-model.trim="otherDealTypeModel" v-cloak>
                    <option value="" disabled>请选择产品类型</option>
                    <option v-for="(item, index) in otherDealTypes" v-bind:value="item.Type" v-bind:key="index">{{item.Type}}</option>
                </select>
            </div>
            <div class="ep_part_item ep_font32 ep_overhide ep_part_item_border">
                   <div class="ep_title_div">
                    <span>国家</span>
                </div>
                <input class="ep_align_right ep_input fl ep_font32 " type="text" placeholder="请输入国家" v-model.trim="projectHistory.Nation" v-cloak />
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <div class="ep_title_div">
                    <span>产品全称</span>
                    <span class="ep_marginTop5 ep_marginLeft10">*</span>
                </div>
                <input class="ep_align_right ep_input fl ep_font32 " type="text" placeholder="请输入产品全称" v-model.trim="projectHistory.ProjectName" v-cloak />
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <div class="ep_title_div">
                    <span>产品简称</span>
                    <span class="ep_marginTop5 ep_marginLeft10">*</span>
                </div>
                <input class="ep_align_right ep_input fl ep_font32 " type="text" placeholder="请输入产品简称" v-model.trim="projectHistory.ProjectShortName" v-cloak />
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <div class="ep_title_div">
                    <span>金额(亿)</span>
                </div>
                <input class="ep_align_right ep_input fl ep_font32 " type="number" placeholder="请输入金额" v-model.trim="projectHistory.TotalOffering" />
            </div>
            <div class="ep_part_item_border ep_font32">
                <div class="ep_part_item  ep_overhide">
                    <div class="ep_title_div">
                        <span>参与角色</span>
                        <span class="ep_marginTop5 ep_marginLeft10">*</span>
                    </div>
                    <select v-bind:class="organizationRoleModel === '' ?'ep_color_grey':'ep_color_white' " class="ep_select fl ep_font32 organizationRoleSelect" type="text" v-model.trim="organizationRoleModel" v-cloak>
                        <option disabled value="" style="color:#ccc !important">请选择参与角色</option>
                        <option v-for="(item, index) in editingOrganizationRoles" v-bind:value="item.Id" v-bind:key="index">{{item.Role}}</option>
                    </select>
                </div>
            </div>
            <div v-if="!isArrayEmpty(projectHistory.OrganizationRoles)" class="ep_part_item_border ep_font32 ep_paddingBottom10 ">
                  <div class="ep_overhide">
                    <div class="ep_font28 delete-Label ep_marginLeft15 ep_marginTop10" v-for="(item, index) in projectHistory.OrganizationRoles" v-bind:key="index">
                    <span>{{organizationRoleDisplay(item)}}</span>
                    <img class="followImg" src="../../public/image/deleteicon.png"  v-on:click="deleteOrganizationRole(item)" />
                </div>
                  </div>
            </div>
            <div class="clearBoth"></div>
            <div class="ep_part_item ep_font32 ep_overhide ep_part_item_border">
                <div class="ep_title_div">
                    <span>个人职责</span>
                    <span class="ep_marginTop5 ep_marginLeft10">*</span>
                </div>
                <select v-bind:class="personalResponsibilityModel === '' ?'ep_color_grey':'ep_color_white' "  class="ep_select fl ep_font32  personalRoleSelect" type="text" v-model.trim="personalResponsibilityModel" v-cloak>
                    <option disabled value="">请选择个人职责</option>
                    <option v-for="(item, index) in personalResponsibilities" v-bind:value="item.Id" v-bind:key="index">{{item.Name}}</option>
                </select>
            </div>
            <div>
                <div class="ep_part_item ep_overhide">
                    <div class="ep_title_div">
                    <span>项目介绍</span>
                </div>
                </div>
                <div class="projectDescriptionOther">
                    <textarea class="ep_font32 ep_textarea" type="text" placeholder="请输入项目介绍" v-model.trim="projectHistory.Description"> </textarea>
                </div>
            </div>
            <div class="ep_errorTips ep_color_red ep_font24 ep_overhide" v-cloak v-show="isShowError" v-bind:class="[isShowError?'ep_paddingTop60':'']">
                <span class="fl ep_marginTop5">*</span>
                <span class="fl  ep_marginLeft10">{{errorMessage}}</span>
            </div>
            <div class="ep_overhide ep_btnGroup">
                <span class="ep_saveBtn fl" v-on:click="saveProjectHistoryOther">保存</span>
                <span class="ep_cancelBtn fr">
                    <router-link to="/EditProfile" class="ep_color_orange">
                        取消
                    </router-link>
                </span>
                <span v-if="isValidElement(id)" class="ep_removeBtn fl" v-on:click="removePopupVisible=true">删除本条信息</span>
            </div>
        </div>
             <mt-popup v-model.trim="removePopupVisible" position='bottom' modal=true class="ep_popup ep_delete_popup ep_align_center ep_font32">
            <div class="ep_color_grey ep_padding30">确定删除本条信息？</div>
            <div class="ep_padding30 ep_color_orange ep_marginTop2" v-on:click='removeContent'>确定</div>
            <div class="ep_padding30 ep_marginTop2 ep_marginBottom2" v-on:click="removePopupVisible=false">取消</div>
        </mt-popup>
        <mt-popup v-model.trim="submitPopupVisible" class="ep_submitPopup">
            <div class="ep_divSpinner"><mt-spinner type="snake"></mt-spinner></div>
            <div class="ep_align_center ep_font30 ep_submitColor">提交中...</div>
        </mt-popup>
    </div>
</template>

<script>
    import Vue from 'vue';
    import axios from "axios";
    import * as webApi from "@/config/api";

    export default {
        name: 'OtherProject',
        data: function () {
            return {
                submitPopupVisible: false,
                isShowError: false,
                errorMessage: '',
                removePopupVisible: false,
                projectHistory: {},
                organizationRoles: [],
                personalResponsibilities: [],
                otherDealTypes: [],
                organizationRoleModel: '',
                personalResponsibilityModel: '',
                otherDealTypeModel: '',
                id: null
            }
        },
        created: function () {
            this.scrollRestore();
            this.id = this.$route.params.id;
            this.initData();
        },
        methods: {
            initData: function () {
                axios.post(webApi.Expert.getOrganizationRolesAndResponsibilitiesAndDealTypes).then(response => {
                    this.organizationRoles = response.data.data.OrganizationRoles;
                    this.personalResponsibilities = response.data.data.PersonalResponsibilities;
                    this.otherDealTypes = response.data.data.OtherDealTypes;
                });

                if (this.isValidElement(this.id) && !isNaN(this.id)) {
                    axios.post(webApi.Expert.getOtherProject, {id: this.id}).then(response => {
                        this.projectHistory = response.data.data;
                        this.personalResponsibilityModel = this.projectHistory.PersonalResponsibility.Id
                        this.otherDealTypeModel = this.projectHistory.DealType;
                    });
                }
            },
            organizationRoleDisplay: function (item) {
                return item.IsCustomizedOrganizationRole ? item.OrganizationRole + "(" + item.CustomizedOrganizationRole + ")" : item.OrganizationRole;
            },
            deleteOrganizationRole: function (item) {
                this.arrayRemoveItem(this.projectHistory.OrganizationRoles, item);
            },
            findOrganizationRoleIndex: function (arr, item) {
                var itemIndex = -1;
                arr.forEach((role, index) => {
                    if (role.Id === item.OrganizationRoleId) {
                        itemIndex = index;
                        return false;
                    }
                });

                return itemIndex;
            },
            arrayRemoveItem: function (arr, item) {
                var index = arr.indexOf(item);
                arr.splice(index, 1);

                return arr;
            },
            removeContent: function () {
                this.removePopupVisible = false;

                if (this.projectHistory.Id === undefined) return;

                axios.post(webApi.Expert.deleteOtherProject, {
                    id: this.projectHistory.Id
                }).then(response => {
                    if (response.data.status === 'fail') {
                        this.isShowError = true;
                        this.errorMessage = response.data.data;
                        return;
                    }

                    this.$router.go(-1);
                });
            },
            isValidNum: function (num) {
                var reg = new RegExp();
                var result1 = /^[1-9]\d*\.\d*$/.test(num);

                var result2 = /^[0]\.\d*$/.test(num);

                var result3 = /^[0-9]\d*$/.test(num);

                return result1 || result2 || result3;
            },
            isArrayEmpty: function (arr) {
                return (arr === null || arr === undefined || arr.length === 0);
            },
            isValidElement: function (item) {
                return !(item === null || item === undefined || item === "");
            },
            saveProjectHistoryOther: function () {
                //Front-end params check
                if (!this.isValidElement(this.projectHistory.DealType)) {
                    this.isShowError = true;
                    this.errorMessage = "产品类型不能为空，请选择产品类型!";
                    return;
                }

                //国家如果填写的话，必须是全英或者全中文
                if (this.isValidElement(this.projectHistory.Nation)) {
                    var reg = /^[\u4E00-\u9FA0\s]+$|^[a-zA-Z\s]+$/
                    if (!reg.test(this.projectHistory.Nation)) {
                        this.isShowError = true;
                        this.errorMessage = '国家不能包含特殊字符！';
                        return;
                    }
                }

                if (!this.isValidElement(this.projectHistory.ProjectName)) {
                    this.isShowError = true;
                    this.errorMessage = "产品全称不能为空，请填写产品全称!";
                    return;
                }

                if (!this.isValidElement(this.projectHistory.ProjectShortName)) {
                    this.isShowError = true;
                    this.errorMessage = "产品简称不能为空，请填写产品简称!";
                    return;
                }

                if (this.isValidElement(this.projectHistory.TotalOffering) && !this.isValidNum(this.projectHistory.TotalOffering)) {
                    this.isShowError = true;
                    this.errorMessage = "金额必须为非负数字!";
                    return;
                }

                if (this.isArrayEmpty(this.projectHistory.OrganizationRoles)) {
                    this.isShowError = true;
                    this.errorMessage = "请选择参与角色!";
                    return;
                }

                if (this.projectHistory.PersonalResponsibility === undefined || this.projectHistory.PersonalResponsibility === null) {
                    this.isShowError = true;
                    this.errorMessage = "请选择个人职责!";
                    return;
                }

                var self = this;
                this.submitPopupVisible = true;

                //添加其它项目经历
                if (this.projectHistory.Id === undefined) {
                    axios.post(webApi.Expert.addOtherProject, {
                            ProjectName: this.projectHistory.ProjectName,
                            ProjectShortName: this.projectHistory.ProjectShortName,
                            TotalOffering: this.projectHistory.TotalOffering,
                            DealType: this.projectHistory.DealType,
                            Nation: this.projectHistory.Nation,
                            Description: this.projectHistory.Description,
                            OrganizationRoles: this.projectHistory.OrganizationRoles,
                            PersonalResponsibility: this.projectHistory.PersonalResponsibility
                        }).then(response => {
                            if (response.data.status === 'fail') {
                                this.submitPopupVisible = false;
                                this.isShowError = true;
                                this.errorMessage = response.data.data;
                                return;
                            }

                            this.$router.go(-1);
                        });
                    return;
                }

                //更新其它项目经历
                axios.post(webApi.Expert.updateOtherProject, {
                    Id: this.projectHistory.Id,
                    ProjectName: this.projectHistory.ProjectName,
                    ProjectShortName: this.projectHistory.ProjectShortName,
                    TotalOffering: this.projectHistory.TotalOffering,
                    DealType: this.projectHistory.DealType,
                    Nation: this.projectHistory.Nation,
                    Description: this.projectHistory.Description,
                    OrganizationRoles: this.projectHistory.OrganizationRoles,
                    PersonalResponsibility: this.projectHistory.PersonalResponsibility
                }).then(response => {
                    if (response.data.status === 'fail') {
                        this.submitPopupVisible = false;
                        this.isShowError = true;
                        this.errorMessage = response.data.data;
                        return;
                    }

                    this.$router.go(-1);
                });
            },
            scrollRestore: function () {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0; 
            }
        },
        computed: {
             editingOrganizationRoles: function () {
                var temp = this.organizationRoles.concat();

                if (this.isArrayEmpty(this.projectHistory.OrganizationRoles)) return temp;

                var self = this;
                for (let item of this.projectHistory.OrganizationRoles) {
                    if (item.OrganizationRole !== "其它") {
                        var index = self.findOrganizationRoleIndex(temp, item);

                        temp.splice(index, 1);
                    }
                }

                return temp;
            }
        },
        watch:{
            organizationRoleModel: function (roleId) {
                if (roleId === "") return;

                if (this.projectHistory.OrganizationRoles && this.projectHistory.OrganizationRoles.length >= 3) {
                    this.organizationRoleModel = '';
                    this.$toast('参与角色不能超过三个!');
                    return;
                }

                var self = this;

                if (this.isArrayEmpty(this.projectHistory.OrganizationRoles)) {
                   //this.projectHistory.OrganizationRoles = [];
                   Vue.set(this.projectHistory, 'OrganizationRoles', []);
                }

                for (let item of this.organizationRoles) {
                    if (item.Id === roleId) {
                        self.projectHistory.OrganizationRoles.push({
                            CustomizedOrganizationRole: null,
                            IsCustomizedOrganizationRole: false,
                            OrganizationRole: item.Role,
                            OrganizationRoleId: item.Id
                        });
                    }
                }

                this.organizationRoleModel = '';
            },
            personalResponsibilityModel: function (id) {
                var self = this;

                for (let item of this.personalResponsibilities) {
                    if (item.Id === id) {
                        self.projectHistory.PersonalResponsibility = item;
                    }
                }
            },
            otherDealTypeModel: function (dealType) {
                if (dealType === "") return;

                this.projectHistory.DealType = dealType;
            }
        },
    }
</script>

<style>
    
</style>
