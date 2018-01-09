<template>
    <div id="awardsHonorsContent" class="awardsHonorsContent ep_font32">
        <div class="ep_marginTop24"></div>
        <div class="ep_content_div">
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <span class="fl ep_color_grey">获奖年份</span>
                <span class="fl ep_marginTop5 ep_color_grey ep_marginLeft10">*</span>
                <div class="fr fr ep_font32 ep_align_right" v-on:click="showYearPicker()" v-bind:class="[honorAward.Year=== undefined?'ep_color_grey':'']">{{honorAward.Year=== undefined ?'请选择':honorAward.Year}}</div>
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <span class="fl ep_color_grey">奖项名称</span>
                <span class="fl ep_marginTop5 ep_color_grey ep_marginLeft10">*</span>
                <input class="ep_align_right ep_input fr ep_font32" type="text" placeholder="请输入" v-model="honorAward.Name" />
            </div>
            <div>
                <div class="ep_part_item ep_overhide">
                    <span class="fl ep_color_grey">奖项描述</span>
                </div>
                <div>
                    <textarea class="ep_font32 ep_textarea" type="text" placeholder="请输入" v-model="honorAward.Description"> </textarea>
                </div>
            </div>
            <div class="ep_errorTips ep_color_red ep_font24 ep_overhide" v-cloak v-show="isShowError" v-bind:class="[isShowError?'ep_paddingTop60':'']">
                <span class="fl ep_marginTop5">*</span>
                <span class="fl  ep_marginLeft10">{{errorMessage}}</span>
            </div>
            <div class="ep_overhide ep_btnGroup">
                <span class="ep_saveBtn fl" v-on:click="saveAwardsAndHonors">保存</span>
                <span v-if="queryString.id === undefined" class="ep_cancelBtn fr">
                    <!-- <a href="/expert/expertuser/editProfile#awardsAndHonors" class="ep_color_orange">取消</a> -->
                    <router-link to="/" class="ep_color_orange">
                        取消
                    </router-link>
                </span>
                <span v-else class="ep_removeBtn fr" v-on:click="removePopupVisible=true">删除本条</span>
            </div>
        </div>
        <mt-popup v-model="isShowYearPopup" position='bottom' modal=true class="ep_popup">
            <div class="ep_overhide ep_padding30">
                <span class="fl ep_color_blue ep_down_popupBtn" v-on:click="saveYear">确定</span>
                <span class="fl ep_color_grey ep_down_popupBtn" v-on:click="hideYearPicker">取消</span>
            </div>
            <mt-picker v-bind:slots="availableYear" v-on:change="onYearChange"></mt-picker>
        </mt-popup>
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
        name: 'AwardAndHonor',
        data: function () {
            return {
                isShowYearPopup: false,
                currentSelectedYear: '',
                availableYear: [
                {
                    flex: 1,
                    values: [],
                    className: 'slot1',
                    textAlign: 'center',
                }
                ],
                isShowError: false,
                errorMessage: '',
                removePopupVisible: false,
                getPicker: null,
                queryString: {},//GetRequest(),
                honorAward: {},
                submitPopupVisible:false,
            }
        },
        created: function () {
            this.availableYear.values = this.setYears();
        },
        methods: {
            setYears: function () {
                var end = new Date().getFullYear();
                var start = end - 80;
                
                var yearArray = [];
                for (var i = end; i > start - 1; i--) {
                    yearArray.push(i + '年');
                };

                return yearArray;
            },
            showYearPicker: function () {
                this.isShowYearPopup = true;
                if (this.getPicker != null && currentSelectedYear != '' && currentSelectedYear != this.honorAward.Year+'年') {
                    this.getPicker.setSlotValue(0, this.honorAward.Year === undefined ? new Date().getFullYear() + '年' : this.honorAward.Year+'年')
                }
            },
            hideYearPicker:function(){
                this.isShowYearPopup = false;
            },
            saveYear: function () {
                this.honorAward.Year = currentSelectedYear.split('年')[0];
                this.hideYearPicker();
            },
            onYearChange: function (picker, values) {
                currentSelectedYear = values[0];
                this.getPicker = picker;
            },
            removeContent: function () {
                if (this.honorAward.Id === undefined) return;

                var self = this;
                this.removePopupVisible = true;
                
                appFrame.ajax("/expert/ExpertInfo/DeleteHonorAward", {
                    data: {
                        id: self.honorAward.Id
                    },
                    success: function (res) {
                        if (res.status === "ok") {
                            window.location.href = '/expert/expertuser/editProfile#awardsAndHonors'
                        };

                        //TODO - server error tip
                        if (res.status === "fail") {
                            self.isShowError = true;
                            self.errorMessage = res.data;
                        };
                    }
                });

                
            },
            saveAwardsAndHonors: function () {
                //Front-end params check
                if (!this.isValidElement(this.honorAward.Year)) {
                    this.isShowError = true;
                    this.errorMessage = "请选择获奖年份!";
                    return;
                }
                if (!this.isValidElement(this.honorAward.Name)) {
                    this.isShowError = true;
                    this.errorMessage = "请输入奖项名称!";
                    return;
                }

                this.submitPopupVisible = true;
                var self = this;
                //添加个人奖项
                if (this.honorAward.Id === undefined) {
                    appFrame.ajax("/expert/ExpertInfo/AddHonorAward", {
                        data: {
                            Name: self.honorAward.Name,
                            Year: self.honorAward.Year,
                            Description: self.honorAward.Description
                        },
                        success: function (res) {
                            if (res.status === "ok") {
                                window.location.href = '/expert/expertuser/editProfile#awardsAndHonors';
                            };

                            if (res.status === "fail") {
                                self.submitPopupVisible = false;
                                self.isShowError = true;
                                self.errorMessage = res.data;
                            };
                        }
                    });

                    return;
                }

                //更新个人奖项
                appFrame.ajax("/expert/ExpertInfo/UpdateHonorAward", {
                    data: {
                        Id: self.honorAward.Id,
                        Name: self.honorAward.Name,
                        Year: self.honorAward.Year,
                        Description: self.honorAward.Description
                    },
                    success: function (res) {
                        if (res.status === "ok") {
                            window.location.href = '/expert/expertuser/editProfile#awardsAndHonors';
                        };

                        if (res.status === "fail") {
                            self.submitPopupVisible = false;
                            self.isShowError = true;
                            self.errorMessage = res.data;
                        };
                    }
                });
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
