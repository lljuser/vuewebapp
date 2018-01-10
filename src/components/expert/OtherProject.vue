<template>
    <div id="projectHistoryOtherContent" class="projectHistoryOtherContent ep_font32">
        <div class="ep_marginTop24"></div>
        <div class="ep_content_div">
            <div class="ep_part_item ep_font32 ep_overhide ep_part_item_border">
                <span class="fl ep_color_grey">产品类型</span>
                <span class="fl ep_marginTop5 ep_color_grey ep_marginLeft10">*</span>
                <select class="ep_select fr ep_font32 ep_align_right personalRoleSelect" v-model="otherDealTypeModel" v-cloak>
                    <option  value="">请选择</option>
                    <option v-for="item in otherDealTypes" v-bind:value="item.Type" v-bind:key="item.Type">{{item.Type}}</option>
                </select>
            </div>
            <div class="ep_part_item ep_font32 ep_overhide ep_part_item_border">
                <span class="fl ep_color_grey">国家</span>
                <input class="ep_align_right ep_input fr ep_font32" type="text" placeholder="请输入" v-model="projectHistory.Nation" v-cloak />
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <span class="fl ep_color_grey">产品全称</span>
                <span class="fl ep_marginTop5 ep_color_grey ep_marginLeft10">*</span>
                <input class="ep_align_right ep_input fr ep_font32" type="text" placeholder="请输入" v-model="projectHistory.ProjectName" v-cloak />
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <span class="fl ep_color_grey">产品简称</span>
                <span class="fl ep_marginTop5 ep_color_grey ep_marginLeft10">*</span>
                <input class="ep_align_right ep_input fr ep_font32" type="text" placeholder="请输入简称，例如：PE2007-02" v-model="projectHistory.ProjectShortName" v-cloak />
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <span class="fl ep_color_grey">金额（人民币：亿）</span>
                <input class="ep_align_right ep_input fr ep_font32 ep_width200" type="number" placeholder="请输入金额" v-model="projectHistory.TotalOffering" />
            </div>
            <div class="ep_part_item_border ep_font32">
                <div class="ep_part_item  ep_overhide">
                    <span class="fl ep_color_grey">参与角色</span>
                    <span class="fl ep_marginTop5 ep_color_grey ep_marginLeft10">*</span>
                    <select class="ep_select fr ep_font32 organizationRoleSelect" type="text" v-model="organizationRoleModel" v-cloak>
                        <option disabled value="">请选择</option>
                        <option v-for="item in editingOrganizationRoles" v-bind:value="item.Id" v-bind:key="item.Id">{{item.Role}}</option>
                    </select>
                </div>
                <div v-if="!isArrayEmpty(projectHistory.OrganizationRoles)">
                    <div class="ep_multipleItem" v-for="(item,index) in projectHistory.OrganizationRoles" v-bind:key="item.IsCustomizedOrganizationRole" v-bind:class="[index===projectHistory.OrganizationRoles-1?'ep_marginBottom30':'ep_marginBottom20']" v-cloak>
                        <span class="fl">{{organizationRoleDisplay(item)}}</span>
                        <span class="fr ep_font24 ep_deleteBtn" v-on:click="deleteOrganizationRole(item)">×</span>
                    </div>
                </div>
            </div>
            <div class="ep_part_item ep_font32 ep_overhide ep_part_item_border">
                <span class="fl ep_color_grey">个人职责</span>
                <span class="fl ep_marginTop5 ep_color_grey ep_marginLeft10">*</span>
                <select class="ep_select fr ep_font32 ep_align_right personalRoleSelect" type="text" v-model="personalResponsibilityModel" v-cloak>
                    <option disabled value="">请选择个人职责</option>
                    <option v-for="item in personalResponsibilities" v-bind:value="item.Id" v-bind:key="item.Id">{{item.Name}}</option>
                </select>
            </div>
            <div>
                <div class="ep_part_item ep_overhide">
                    <span class="fl ep_color_grey">项目介绍</span>
                </div>
                <div class="projectDescriptionOther">
                    <textarea class="ep_font32 ep_textarea" type="text" placeholder="请输入" v-model="projectHistory.Description"> </textarea>
                </div>
            </div>
            <div class="ep_errorTips ep_color_red ep_font24 ep_overhide" v-cloak v-show="isShowError" v-bind:class="[isShowError?'ep_paddingTop60':'']">
                <span class="fl ep_marginTop5">*</span>
                <span class="fl  ep_marginLeft10">{{errorMessage}}</span>
            </div>
            <div class="ep_overhide ep_btnGroup">
                <span class="ep_saveBtn fl" v-on:click="saveProjectHistoryOther">保存</span>
                <span v-if="queryString.id === undefined" class="ep_cancelBtn fr"><a href="/expert/expertuser/editProfile#projectHistoryOther" class="ep_color_orange">取消</a></span>
                <span v-else class="ep_removeBtn fr" v-on:click="removePopupVisible=true">删除本条</span>
            </div>
        </div>
        <mt-popup v-model="removePopupVisible" position='bottom' modal=true class="ep_popup ep_align_center ep_font32">
            <div class="ep_color_grey ep_padding30">确定删除本条信息？</div>
            <div class="ep_padding30" v-on:click='removeContent'>确定</div>
            <div class="ep_padding30" v-on:click="removePopupVisible=false">取消</div>
        </mt-popup>
        <mt-popup v-model="submitPopupVisible" class="ep_submitPopup">
            <div class="ep_divSpinner"><mt-spinner type="snake"></mt-spinner></div>
            <div class="ep_align_center ep_font30 ep_submitColor">提交中...</div>
        </mt-popup>
    </div>
</template>

<script>
    export default {
        name: 'OtherProject',
        data: function () {
            return {
                submitPopupVisible: false,
                isShowError: false,
                errorMessage: '',
                removePopupVisible: false,
                queryString: {},//GetRequest(),
                projectHistory: {},
                organizationRoles: [],
                personalResponsibilities: [],
                otherDealTypes: [],
                organizationRoleModel: '',
                personalResponsibilityModel: '',
                otherDealTypeModel: '',
            }
        },
        created: function () {
            this.initData();
        },
        methods: {
            initData: function () {

            },
            deepClone: function (obj) {
                var proto = Object.getPrototypeOf(obj);
                return Object.assign({}, Object.create(proto), obj);
            },
            organizationRoleDisplay: function (item) {
                return item.IsCustomizedOrganizationRole ? item.OrganizationRole + "(" + item.CustomizedOrganizationRole + ")" : item.OrganizationRole;
            },
            deleteOrganizationRole: function (item) {
                this.arrayRemoveItem(this.projectHistory.OrganizationRoles, item);
            },
            findOrganizationRoleIndex: function (arr, item) {
                var itemIndex = -1;

                $.each(arr, function (index, role) {
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

                appFrame.ajax("/expert/ExpertInfo/DeleteOtherProject", {
                    data: {
                        id: this.projectHistory.Id
                    },
                    success: function (res) {
                        if (res.status === "ok") {
                            window.location.href = '/expert/expertuser/editProfile#projectHistoryOther';
                        }
                        
                        if (res.status === "fail") {
                            self.isShowError = true;
                            self.errorMessage = res.data;
                        };
                    }
                });
                
            },
            isValidNum: function (num) {
                var result1 = /^[1-9]\d*\.\d*$/.test(num);

                var result2 = /^[0]\.\d*$/.test(num);

                var result3 = /^[1-9]\d*$/.test(num);

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
                if (!isValidElement(this.projectHistory.DealType)) {
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
                    appFrame.ajax("/expert/ExpertInfo/AddOtherProject", {
                        data: {
                            ProjectName: self.projectHistory.ProjectName,
                            ProjectShortName: self.projectHistory.ProjectShortName,
                            TotalOffering: self.projectHistory.TotalOffering,
                            DealType: self.projectHistory.DealType,
                            Nation: self.projectHistory.Nation,
                            Description: self.projectHistory.Description,
                            OrganizationRoles: self.projectHistory.OrganizationRoles,
                            PersonalResponsibility: self.projectHistory.PersonalResponsibility
                        },
                        success: function (res) {
                            if (res.status === "ok") {
                                window.location.href = '/expert/expertuser/editProfile#projectHistoryOther';
                            };
                            //TODO - server error tip
                            if (res.status === "fail") {
                                self.submitPopupVisible = false;
                                self.isShowError = true;
                                self.errorMessage = res.data;
                            };
                        }
                    });

                    return;
                }

                //更新其它项目经历
                appFrame.ajax("/expert/ExpertInfo/UpdateOtherProject", {
                    data: {
                        Id: self.projectHistory.Id,
                        ProjectName: self.projectHistory.ProjectName,
                        ProjectShortName: self.projectHistory.ProjectShortName,
                        TotalOffering: self.projectHistory.TotalOffering,
                        DealType: self.projectHistory.DealType,
                        Nation: self.projectHistory.Nation,
                        Description: self.projectHistory.Description,
                        OrganizationRoles: self.projectHistory.OrganizationRoles,
                        PersonalResponsibility: self.projectHistory.PersonalResponsibility
                    },
                    success: function (res) {
                        if (res.status === "ok") {
                            window.location.href = '/expert/expertuser/editProfile#projectHistoryOther';
                        };
                        //TODO - server error tip
                        if (res.status === "fail") {
                            self.submitPopupVisible = false;
                            self.isShowError = true;
                            self.errorMessage = res.data;
                        };
                    }
                });
            }
        },
        computed: {
             editingOrganizationRoles: function () {
                
                var temp = this.deepClone(this.organizationRoles);

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

                if (self.projectHistory.OrganizationRoles === undefined) {
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
                        return false;
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
