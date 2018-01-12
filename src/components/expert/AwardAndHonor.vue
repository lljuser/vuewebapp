<template>
    <div id="awardsHonorsContent" class="awardsHonorsContent ep_font32">
        <div class="ep_marginTop24"></div>
        <div class="ep_content_div">
            <div class="ep_part_item ep_part_item_border ep_overhide">
                    <div class="ep_title_div">
                    <span>获奖年份</span>
                    <span class="ep_marginTop5 ep_marginLeft10">*</span>
                </div>
                <div class="fl ep_right_div ep_font32 ep_align_right honorAwardYear" v-on:click="showYearPicker()" v-bind:class="[honorAward.Year=== undefined?'ep_color_grey':'']">{{honorAward.Year=== undefined ?'请选择':honorAward.Year}}</div>
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                    <div class="ep_title_div">
                    <span>奖项名称</span>
                </div>
                <input class=" ep_input fl ep_font32 " type="text" placeholder="请输入" v-model="honorAward.Name" />
            </div>
            <div>
                <div class="ep_part_item ep_overhide">
                        <div class="ep_title_div">
                    <span>奖项描述</span>
                </div>
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
                <span class="ep_cancelBtn fr">
                    <router-link to="/EditProfile" class="ep_color_orange">
                        取消
                    </router-link>
                </span>
               <span v-if="isValidElement(id)" class="ep_removeBtn fl" v-on:click="removePopupVisible=true">删除本条信息</span>
            </div>
        </div>
        <mt-popup v-model="isShowYearPopup" position='bottom' modal=true class="ep_popup">
            <div class="ep_overhide ep_padding30">
                <span class="fl ep_color_blue ep_down_popupBtn" v-on:click="saveYear">确定</span>
                <span class="fl ep_color_grey ep_down_popupBtn" v-on:click="hideYearPicker">取消</span>
            </div>
            <mt-picker v-bind:slots="availableYear" v-on:change="onYearChange"></mt-picker>
        </mt-popup>
          <mt-popup v-model="removePopupVisible" position='bottom' modal=true class="ep_popup ep_delete_popup ep_align_center ep_font32">
            <div class="ep_color_grey ep_padding30">确定删除本条信息？</div>
            <div class="ep_padding30 ep_color_orange ep_marginTop2" v-on:click='removeContent'>确定</div>
            <div class="ep_padding30 ep_marginTop2 ep_marginBottom2" v-on:click="removePopupVisible=false">取消</div>
        </mt-popup>
        <mt-popup v-model="submitPopupVisible" class="ep_submitPopup">
            <div class="ep_divSpinner"><mt-spinner type="snake"></mt-spinner></div>
            <div class="ep_align_center ep_font30 ep_submitColor">提交中...</div>
        </mt-popup>
    </div>
</template>


<script>
    import axios from "axios";
    import * as webApi from "@/config/api";

    export default {
        name: 'AwardAndHonor',
        data: function () {
            return {
                isShowYearPopup: false,
                currentSelectedYear: '',
                availableYear: [
                {
                    flex: 1,
                    values: this.setYears(),
                    className: 'slot1',
                    textAlign: 'center',
                }
                ],
                isShowError: false,
                errorMessage: '',
                removePopupVisible: false,
                getPicker: null,
                honorAward: {},
                submitPopupVisible:false,
                id: null
            }
        },
        created: function () {
            this.id = this.$route.params.id;
            this.initData();
        },
        methods: {
            initData: function () {
                if (this.isValidElement(this.id) && !isNaN(this.id)) {
                    axios.post(webApi.Expert.getHonorAward, { id: this.id }).then(response => {
                        this.honorAward = response.data.data;
                    });
                }
            },
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
                if (this.getPicker != null && this.currentSelectedYear != '' && this.currentSelectedYear != this.honorAward.Year+'年') {
                    this.getPicker.setSlotValue(0, this.honorAward.Year === undefined ? new Date().getFullYear() + '年' : this.honorAward.Year+'年')
                }
            },
            hideYearPicker:function(){
                this.isShowYearPopup = false;
            },
            saveYear: function () {
                this.honorAward.Year = this.currentSelectedYear.split('年')[0];
                this.hideYearPicker();
            },
            onYearChange: function (picker, values) {
                this.currentSelectedYear = values[0];
                this.getPicker = picker;
            },
            removeContent: function () {
                if (this.honorAward.Id === undefined) return;

                this.removePopupVisible = true;

                axios.post(webApi.Expert.deleteHonorAward, { 
                    id: this.honorAward.Id
                    }).then(response => {
                    if (response.data.status === 'fail') {
                        this.isShowError = true;
                        this.errorMessage = response.data.data;
                        return;
                    }

                    this.$router.go(-1);
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
                    axios.post(webApi.Expert.addHonorAward, { 
                        Name: this.honorAward.Name,
                        Year: this.honorAward.Year,
                        Description: this.honorAward.Description
                     }).then(response => {
                        if (response.data.status === 'fail') {
                            this.isShowError = true;
                            this.errorMessage = response.data.data;
                            return;
                        }

                        this.$router.go(-1);
                    });

                    return;
                }

                //更新个人奖项
                axios.post(webApi.Expert.updateHonorAward, { 
                        Id: this.honorAward.Id,
                        Name: this.honorAward.Name,
                        Year: this.honorAward.Year,
                        Description: this.honorAward.Description
                     }).then(response => {
                        if (response.data.status === 'fail') {
                            this.isShowError = true;
                            this.errorMessage = response.data.data;
                            return;
                        }

                        this.$router.go(-1);
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
