<template>
    <div class="educationHistoryContent ep_font32">
        <div class="ep_marginTop24"></div>
        <div class="ep_content_div">
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <div class="ep_title_div">
                    <span>学校</span>
                    <span class="ep_marginTop5 ep_marginLeft10">*</span>
                </div>
                <input class="ep_align_right ep_input fl ep_font32" type="text" placeholder="请输入学校" v-model.trim="education.School" />
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <div class="ep_title_div">
                   <span>学位</span>
                </div>
                <input class="ep_align_right ep_input fl ep_font32" type="text" placeholder="请输入学位" v-model.trim="education.Degree" />
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <div class="ep_title_div">
                   <span>专业</span>
                </div>
                <input class="ep_align_right ep_input fl ep_font32" type="text" placeholder="请输入专业" v-model.trim="education.Major" />
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <div class="ep_title_div">
                    <span>入学时间</span>
                    <span class="ep_marginTop5 ep_marginLeft10">*</span>
                </div>
                <div class="fl ep_font32 ep_align_left startTime ep_right_div" v-on:click="showDatePicker('startTime')" v-bind:class="[education.FromYear === undefined ? 'ep_color_grey' : '']">
                    {{education.FromYear === undefined ? '请选择入学时间' : education.FromYear}}
                </div>
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <div class="ep_title_div">
                    <span>毕业时间</span>
                    <span class="ep_marginTop5 ep_marginLeft10">*</span>
                </div>
                <div class="fl ep_font32 ep_align_left endTime ep_right_div" v-on:click="showDatePicker('endTime')" v-bind:class="[education.ToYear === undefined ? 'ep_color_grey' : '']">
                    {{education.ToYear === undefined ? '请选择毕业时间' : education.ToYear}}
                </div>
            </div>
            <div>
                <div class="ep_part_item ep_overhide">
                    <div class="ep_title_div">
                       <span>描述</span>
                    </div>
                </div>
                <div>
                    <textarea class="ep_font32 ep_textarea" type="text" placeholder="请输入描述" v-model.trim="education.Description"> </textarea>
                </div>
            </div>
            <div class="ep_errorTips ep_color_red ep_font24 ep_overhide" v-cloak v-show="isShowError" v-bind:class="[isShowError?'ep_paddingTop60':'']">
                <span class="fl ep_marginTop5">*</span>
                <span class="fl  ep_marginLeft10">{{errorMessage}}</span>
            </div>
            <div class="ep_overhide ep_btnGroup">
                <span class="ep_saveBtn fl" v-on:click="saveEducationHistory">保存</span>
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
                <span class="fl ep_color_white ep_down_popupBtn" v-on:click="hideDatePicker">取消</span>
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
                currentStartYear: '',
                currentEndYear: '',
                school: '',
                degree:'',
                profession: '',
                startTime: '',
                endTime: '',
                timeType:'startTime',
                description: '',
                isShowYearMonthPopup: false,
                availableYearMonth: [
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
                submitPopupVisible: false,
                getPicker: null,
                education: {},
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
                    axios.post(webApi.Expert.getEducation, { id: this.id }).then(response => {
                        this.education = response.data.data;
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
            showDatePicker: function (type) {
                this.isShowYearMonthPopup = true;
                this.timeType = type;
                if (type == 'startTime') {
                    this.getPicker.setSlotValue(0, this.startTime === '' ? (this.endTime === '' ? new Date().getFullYear() + '年' : this.endTime) : this.startTime);
                }
                if (type == 'endTime') {
                    this.getPicker.setSlotValue(0, this.endTime === '' ? (this.startTime === '' ? new Date().getFullYear() + '年' : this.startTime) : this.endTime);
                }
            },
            hideDatePicker:function(){
                this.isShowYearMonthPopup = false;
            },
            saveYearMonth: function () {
                if (this.timeType === 'startTime') {
                    this.startTime = this.currentStartYear;
                    this.education.FromYear = this.startTime.replace('年', '');
                }

                if (this.timeType === 'endTime') {
                    this.endTime = this.currentEndYear;
                    this.education.ToYear = this.endTime.replace('年', '');
                }

                this.hideDatePicker();
            },
            onYearMonthChange: function (picker, values) {
                if (this.timeType === 'startTime'&& values[0] != undefined) {
                    var x=values[0].replace('年', '/') + '01/01';
                    if (new Date() < new Date(x)) {
                        picker.setSlotValue(0, new Date().getFullYear() + '年');
                    }
                    
                    if (this.endTime != '') {
                        var y=this.endTime.replace('年', '/') + '01/01';
                        if (x > y) {
                            picker.setSlotValue(0, this.endTime);
                        }
                    }
                    

                }
                this.currentStartYear = values[0];
                if (this.timeType === 'endTime' && values[0] != undefined) {
                    var x = values[0].replace('年', '/') + '01/01';
                    if (this.startTime != '') {
                        var y = this.startTime.replace('年', '/') + '01/01';
                        if (x < y) {
                            picker.setSlotValue(0, this.startTime);
                        }
                    }
                    
                }
                this.currentEndYear = values[0];
                this.getPicker = picker;
            },
            removeContent: function () {
                this.removePopupVisible = false;

                if (this.education.Id === undefined) return;

                axios.post(webApi.Expert.deleteEducation, { 
                        id: this.education.Id
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
            saveEducationHistory: function () {

                //Front-end params check
                if (!this.isValidElement(this.education.School)) {
                    this.isShowError = true;
                    this.errorMessage = "学校不能为空，请填写!";
                    return;
                }

                if (!this.isValidElement(this.education.FromYear) || !this.isValidElement(this.education.ToYear)) {
                    this.isShowError = true;
                    this.errorMessage = "入学年份/毕业年份不能为空，请填写!";
                    return;
                }

                if (this.education.FromYear > this.education.ToYear) {
                    this.isShowError = true;
                    this.errorMessage = "入学年份应不大于毕业年份!";
                    return;
                }

                var self = this;
                this.submitPopupVisible = true;

                //添加教育经历
                if (this.education.Id === undefined) {
                    axios.post(webApi.Expert.addEducation, { 
                        School: this.education.School,
                        Major: this.education.Major,
                        Degree: this.education.Degree,
                        FromYear:this.education.FromYear,
                        ToYear: this.education.ToYear,
                        Description: this.education.Description
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

                //更新教育经历
                axios.post(webApi.Expert.updateEducation, { 
                        Id: this.education.Id,
                        School: this.education.School,
                        Major: this.education.Major,
                        Degree: this.education.Degree,
                        FromYear: this.education.FromYear,
                        ToYear: this.education.ToYear,
                        Description: this.education.Description
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
