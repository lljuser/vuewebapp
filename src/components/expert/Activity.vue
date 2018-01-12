<template>
    <div class="activityContent ep_font32">
        <div class="ep_marginTop24"></div>
        <div class="ep_content_div">
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <div class='ep_title_div'>
                    <span>活动名称</span>
                    <span class="ep_marginTop5 ep_marginLeft10">*</span>
                </div>
                <input class="ep_align_right ep_input fl ep_font32" type="text" placeholder="请输入" v-model.trim="activity.Name" />
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <div class='ep_title_div'>
                    <span>活动时间</span>
                    <span class="ep_marginTop5 ep_marginLeft10">*</span>
                </div>
                <div class="fl ep_font32 ep_align_left ActivityTime ep_right_div" v-on:click="showYearMonthPicker()" v-bind:class="[activity.ActivityTime === undefined ? 'ep_color_grey' : '']">
                    {{activity.ActivityTime === undefined ? '请选择' : activity.ActivityTime}}
                </div>
            </div>
            <div>
                <div class="ep_part_item ep_overhide">
                    <div class='ep_title_div'>
                       <span>活动描述</span>
                    </div>
                </div>
                <div>
                    <textarea class="ep_font32 ep_textarea" type="text" placeholder="请输入" v-model.trim="activity.Description"> </textarea>
                </div>
            </div>
            <div class="ep_errorTips ep_color_red ep_font24 ep_overhide" v-show="isShowError" v-bind:class="[isShowError?'ep_paddingTop60':'']">
                <span class="fl ep_marginTop5">*</span>
                <span class="fl  ep_marginLeft10">{{errorMessage}}</span>
            </div>
            <div class="ep_overhide ep_btnGroup">
                <span class="ep_saveBtn fl" v-on:click="saveActivity">保存</span>
                <span class="ep_cancelBtn fr">
                    <router-link to="/EditProfile" class="ep_color_orange">
                        取消
                    </router-link>
                </span>
               <span v-if="isValidElement(id)" class="ep_removeBtn fl" v-on:click="removePopupVisible=true">删除本条信息</span>
            </div>
        </div>
        <mt-popup v-model.trim="isShowYearMonthPopup" position='bottom' modal=true class="ep_popup">
            <div class="ep_overhide ep_padding30 ep_popup_div_btn">
                <span class="fl ep_color_yellow ep_down_popupBtn" v-on:click="saveYearMonth">确定</span>
                <span class="fr ep_color_white ep_down_popupBtn" v-on:click="hideYearMonthPicker">取消</span>
            </div>
            <mt-picker v-bind:slots="availableYearMonth" v-on:change="onYearMonthChange"></mt-picker>
        </mt-popup>
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
    import axios from "axios";
    import * as webApi from "@/config/api";

    export default {
        name: 'Activity',
        data: function () {
            return {
                currentSelectedYear: '',
                currentSelectedMonth: '',
                activityTime: '',
                activityName: '',
                activityDescription: '',
                isShowYearMonthPopup: false,
                availableYearMonth: [
                {
                    flex: 1,
                    values: this.setYears(),
                    className: 'slot1',
                    textAlign: 'right',
                }, {
                    divider: true,
                    content: ' ',
                    className: 'slot2'
                }, {
                    flex: 1,
                    values: this.setMonth(1, 12),
                    className: 'slot3',
                    textAlign: 'left'
                }
                ],
                submitPopupVisible:false,
                isShowError: false,
                errorMessage: "",
                removePopupVisible: false,
                getPicker: null,
                activity: {},
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
                if (this.isValidElement(this.id) && !isNaN(this.id)) {
                    axios.post(webApi.Expert.getRecentActivity, { id: this.id }).then(response => {
                        this.activity = response.data.data;
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
            setMonth: function (start, end) {
                var monthArray = [];
                for (var i = start; i < end + 1; i++) {
                    monthArray.push(i + '月');
                };

                return monthArray;
            },
            showYearMonthPicker: function (type) {
                this.isShowYearMonthPopup = true;
                if (this.getPicker != null) {
                    this.getPicker.setSlotValue(0, this.activityTime === '' ? new Date().getFullYear() + '年' : this.activityTime.split('年')[0] + '年');
                    this.getPicker.setSlotValue(1, this.activityTime === '' ? new Date().getMonth()+1 + '月' : this.activityTime.split('年')[1]);
                }
            },
            hideYearMonthPicker:function(){
                this.isShowYearMonthPopup = false;
            },
            dateFormat: function(date) {
                var temp = date.replace('月', '').split('年');

                return temp[0] + "." + (parseInt(temp[1]) < 10 ? ('0' + temp[1]) : temp[1]);
            },
            saveYearMonth: function () {
                this.activityTime = this.currentSelectedYear + this.currentSelectedMonth;
                this.activity.ActivityTime = this.dateFormat(this.activityTime);
                this.hideYearMonthPicker();
            },
            onYearMonthChange: function (picker, values) {
                if (values[0] != undefined && values[1]!=undefined){
                    if (new Date() < new Date(values[0].replace('年', '-') + values[1].replace('月', ''))) {
                        picker.setSlotValue(0, new Date().getFullYear() + '年');
                        picker.setSlotValue(1, new Date().getMonth()+1 + '月');
                    }
                }
                this.currentSelectedYear = values[0];
                this.currentSelectedMonth = values[1];
                this.getPicker = picker;
            },
            removeContent: function () {
                this.removePopupVisible = false;

                if (this.activity.Id === undefined) return;

                axios.post(webApi.Expert.deleteRecentActivity, { id: this.activity.Id }).then(response => {
                    if (response.data.status === 'fail') {
                            this.isShowError = true;
                            this.errorMessage = response.data.data;
                            return;
                    }

                    this.$router.go(-1);
                });
            },
            saveActivity: function () {
                //Front-end params check
                if (!this.isValidElement(this.activity.Name)) {
                    this.isShowError = true;
                    this.errorMessage = "活动名称不能为空，请填写!";
                    return;
                }

                if (!this.isValidElement(this.activity.ActivityTime)) {
                    this.isShowError = true;
                    this.errorMessage = "活动时间不能为空，请选择!";
                    return;
                }

                var self = this;
                this.submitPopupVisible = true;

                //添加近期活动
                if (this.activity.Id === undefined) {
                    axios.post(webApi.Expert.addRecentActivity, { 
                        Name: this.activity.Name,
                        ActivityTime: this.activity.ActivityTime,
                        Description: this.activity.Description
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

                axios.post(webApi.Expert.updateRecentActivity, { 
                        Id: this.activity.Id,
                        Name: this.activity.Name,
                        ActivityTime: this.activity.ActivityTime,
                        Description: this.activity.Description
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
            isArrayEmpty: function (arr) {
                return (arr === null || arr === undefined || arr.length === 0);
            },
            isValidElement: function (item) {
                return !(item === null || item === undefined || item === "");
            },
            scrollRestore: function () {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0; 
            }
        }
    }
</script>


<style>

</style>
