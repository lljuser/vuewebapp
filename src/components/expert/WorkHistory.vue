<template>
    <div class="workHistoryContent ep_font32">
        <div class="ep_marginTop24"></div>
        <div class="ep_content_div">
            <div class="ep_part_item ep_part_item_border ep_overhide" style="overflow:visible;">
                <span class="fl ep_color_grey">机构名称</span>
                <span class="fl ep_marginTop5 ep_color_grey ep_marginLeft10">*</span>
                <autocomplete ref="autocomplete" :onFocus="focusCallBack" :onSelect="getData" :process="processJSON" label="FullName" anchor="ShortName" v-bind:url="searchUrl" :debounce="250" param="keyword" placeholder="请输入机构名称">
                </autocomplete>
            </div>
            <div class="clearBoth"></div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <span class="fl ep_color_grey">部门</span>
                <input class="ep_align_right ep_input fr ep_font32" type="text" placeholder="请输入" v-model="workHistory.Department" />
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <span class="fl ep_color_grey">职位</span>
                <span class="fl ep_marginTop5 ep_color_grey ep_marginLeft10">*</span>
                <input class="ep_align_right ep_input fr ep_font32" type="text" placeholder="请输入" v-model="workHistory.Position" />
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <span class="fl ep_color_grey">入职时间</span>
                <span class="fl ep_marginTop5 ep_color_grey ep_marginLeft10">*</span>
                <div class="fr fr ep_font32 ep_align_right startTime" v-on:click="showDatePicker('startTime')" v-bind:class="[workHistory.StartTime === undefined ? 'ep_color_grey' : '']">
                    {{workHistory.StartTime === undefined ? '请选择' : workHistory.StartTime}}
                </div>
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <span class="fl ep_color_grey">离职时间</span>
                <span class="fl ep_marginTop5 ep_color_grey ep_marginLeft10">*</span>
                <div class="fr fr ep_font32 ep_align_right endTime" v-on:click="showDatePicker('endTime')" v-bind:class="[workHistory.EndTime === undefined ? 'ep_color_grey' : '']">
                    {{workHistory.EndTime === undefined ? '请选择' : workHistory.EndTime}}
                </div>
            </div>
            <div>
                <div class="ep_part_item ep_overhide">
                    <span class="fl ep_color_grey">工作内容</span>
                </div>
                <div>
                    <textarea class="ep_font32 ep_textarea" type="text" placeholder="请输入工作经历" v-model="workHistory.Description"> </textarea>
                </div>
            </div>
            <div class="ep_errorTips ep_color_red ep_font24 ep_overhide" v-cloak v-show="isShowError" v-bind:class="[isShowError?'ep_paddingTop60':'']">
                <span class="fl ep_marginTop5">*</span>
                <span class="fl  ep_marginLeft10">{{errorMessage}}</span>
            </div>
            <div class="ep_overhide ep_btnGroup">
                <span class="ep_saveBtn fl" v-on:click="saveWorkHistory">保存</span>
                <span v-if="!isValidElement(id)" class="ep_cancelBtn fr">
                    <router-link to="/EditProfile" class="ep_color_orange">
                        取消
                    </router-link>
                </span>
                <span v-else class="ep_removeBtn fr" v-on:click="removePopupVisible=true">删除本条</span>
            </div>
        </div>
        <mt-popup v-model="isShowStartTime" position='bottom' modal=true class="ep_popup">
            <div class="ep_overhide ep_padding30">
                <span class="fl ep_color_blue ep_down_popupBtn" v-on:click="saveYearMonth">确定</span>
                <span class="fl ep_color_grey ep_down_popupBtn" v-on:click="hideDatePicker">取消</span>
            </div>
            <mt-picker v-bind:slots="availableStartTime" v-on:change="onStartTimeChange"></mt-picker>
        </mt-popup>
        <mt-popup v-model="isShowEndTime" position='bottom' modal=true class="ep_popup">
            <div class="ep_overhide ep_padding30">
                <span class="fl ep_color_blue ep_down_popupBtn" v-on:click="saveYearMonth">确定</span>
                <span class="fl ep_color_grey ep_down_popupBtn" v-on:click="hideDatePicker">取消</span>
            </div>
            <mt-picker v-bind:slots="availableEndTime" v-on:change="onEndTimeChange"></mt-picker>
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
    import axios from "axios";
    import * as webApi from "@/config/api";
    import Autocomplete from 'vue2-autocomplete-js';
    import 'vue2-autocomplete-js/dist/style/vue2-autocomplete.css';

    export default {
        name: 'WorkHistory',
        components: { Autocomplete },
        data: function () {
            return {
                currentStartYear: '',
                currentStartMonth: '',
                currentEndYear: '',
                currentEndMonth: '',
                startTime: '',
                endTime: '',
                timeType:'startTime',
                isShowStartTime: false,
                isShowEndTime:false,
                availableStartTime: [
                    {
                        flex: 1,
                        values: this.setYears(new Date().getFullYear() - 80, new Date().getFullYear(), false),
                        className: 'slot1',
                        textAlign: 'right',
                        value: new Date().getFullYear()+'年'
                    }, {
                        divider: true,
                        content: ' ',
                        className: 'slot2'
                    }, {
                        flex: 1,
                        values: this.setMonth(1, 12),
                        className: 'slot3',
                        textAlign: 'left',
                        value: new Date().getMonth() + 1 + '月'
                    }
                ],
                availableEndTime: [
                    {
                        flex: 1,
                        values: this.setYears(new Date().getFullYear() - 80, new Date().getFullYear(), true),
                        className: 'slot1',
                        textAlign: 'right',
                        value: new Date().getFullYear() + '年'
                    }, {
                        divider: true,
                        content: ' ',
                        className: 'slot2'
                    }, {
                        flex: 1,
                        values: this.setMonth(1, 12),
                        className: 'slot3',
                        textAlign: 'left',
                        value: new Date().getMonth() + 1 + '月'
                    }
                ],
                isShowError: false,
                errorMessage: '',
                removePopupVisible: false,
                getStartPicker: null,
                getEndPicker: null,
                submitPopupVisible: false,
                workHistory: {},
                id: null,
                searchUrl: null,
            }
        },
        created: function () {
            this.id = this.$route.params.id;
            this.searchUrl = webApi.Expert.orgSearch;
            this.initData();
        },
        methods: {
            initData: function () {
                if (this.isValidElement(this.id) && !isNaN(this.id)) {
                    axios.post(webApi.Expert.getWorkHistory, {id: this.id}).then(response => {
                        this.workHistory = response.data.data;
                        this.workHistory.OrganizationName = this.workHistory.Company;
                        this.$refs.autocomplete.setValue(this.workHistory.Company);
                        this.startTime = this.workHistory.StartTime.split('.')[0] + '年' + (this.workHistory.StartTime.split('.')[1].split('')[0] === '0' ? this.workHistory.StartTime.split('.')[1].split('')[1] : this.workHistory.StartTime.split('.')[1]) + '月';
                        this.endTime = this.workHistory.EndTime === '至今' ? '至今' : (this.workHistory.EndTime.split('.')[0] + '年' + (this.workHistory.EndTime.split('.')[1].split('')[0] === '0' ? this.workHistory.EndTime.split('.')[1].split('')[1] : this.workHistory.EndTime.split('.')[1]) + '月');
                    });
                }
            },
            setYears: function(start, end, hasNow) {
                var yearArray = [];

                if (hasNow) {
                    yearArray = ['至今'];
                }

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
            showDatePicker: function (type) {
                if(type==='startTime'){
                    this.isShowStartTime = true;
                    if (this.getStartPicker != null) {
                        this.getStartPicker.setSlotValue(0, this.startTime === '' ?((this.endTime === ''|| this.endTime === '至今') ? new Date().getFullYear() + '年':this.endTime.split('年')[0] + '年') : this.startTime.split('年')[0] + '年');
                        this.getStartPicker.setSlotValue(1, this.startTime === '' ? ((this.endTime === '' || this.endTime === '至今') ? new Date().getMonth() + 1 + '月' : this.endTime.split('年')[1]) : this.startTime.split('年')[1]);
                    }
                };

                if (type === 'endTime') {
                    this.isShowEndTime = true;
                    if (this.getEndPicker != null) {
                        this.getEndPicker.setSlotValue(0, this.endTime === '' ? (this.startTime === '' ? new Date().getFullYear() + '年' : this.startTime.split('年')[0]+'年') : (this.endTime === '至今' ? this.endTime : this.endTime.split('年')[0] + '年'));
                        if (this.endTime != '至今') {
                            this.getEndPicker.setSlotValue(1, this.endTime === '' ? (this.startTime === '' ? new Date().getMonth() + 1 + '月' : this.startTime.split('年')[1]) : this.endTime.split('年')[1]);
                        } else {
                            this.getEndPicker.setSlotValues(1, []);
                        }
                        
                    }
                    
                };
                this.timeType = type;
            },
            hideDatePicker: function () {
                this.isShowStartTime = false;
                this.isShowEndTime = false;
            },
            saveYearMonth: function () {
                if (this.timeType === 'startTime') {
                    this.startTime = this.currentStartYear + this.currentStartMonth;
                }
                if (this.timeType === 'endTime') {
                    if (this.currentEndYear === '至今') {
                        this.endTime = this.currentEndYear;
                    } else {
                        this.endTime = this.currentEndYear + this.currentEndMonth;
                    }
                    
                }
                this.hideDatePicker();
            },
            onStartTimeChange: function (picker, values) {
                if (values[0] === undefined) {
                    values[0] = this.startTime === '' ? ((this.endTime === '' || this.endTime === '至今') ? new Date().getFullYear() + '年' : this.endTime.split('年')[0] + '年') : this.startTime.split('年')[0] + '年';
                }
                if (new Date() < new Date(values[0].replace('年', '-') + values[1].replace('月', ''))) {
                    picker.setSlotValue(0, new Date().getFullYear() + '年');
                    picker.setSlotValue(1, new Date().getMonth() +1 + '月');
                }
                
                if (this.endTime != '' && this.endTime != '至今') {
                    var x = values[0].replace('年', '/') + (values[1].length == 2 ? '0' + values[1].replace('月', '/') : values[1].replace('月', '/') + '01');
                    var y = this.endTime.split('年')[0] + '/' + (this.endTime.split('年')[1].split('月')[0].length == 1 ? '0' + this.endTime.split('年')[1].split('月')[0] : this.endTime.split('年')[1].split('月')[0]) + '/01';
                    if(x>y){
                        picker.setSlotValue(0, this.endTime.split('年')[0] + '年');
                        picker.setSlotValue(1, this.endTime.split('年')[1]);
                    }
                }
                this.currentStartYear = values[0];
                this.currentStartMonth = values[1];
                this.getStartPicker = picker;
            },
            onEndTimeChange: function (picker, values) {
                var self=this;
                if (values[0] === undefined) {
                    values[0] = this.endTime === '' ? (this.startTime === '' ? new Date().getFullYear() + '年' : this.startTime.split('年')[0] + '年') : (this.endTime === '至今' ? this.endTime : this.endTime.split('年')[0] + '年');
                }
                if (values[0] == '至今') {
                   picker.setSlotValues(1, []);
                } else {
                    picker.setSlotValues(1, self.setMonth(1, 12));
                    if (values[1]!=undefined){
                        if (new Date() < new Date(values[0].replace('年', '-') + values[1].replace('月', ''))) {
                            picker.setSlotValue(0, new Date().getFullYear() + '年');
                            picker.setSlotValue(1, new Date().getMonth() + 1 + '月');
                        };
                        if (this.startTime != '') {
                            var x = values[0].replace('年', '/') + (values[1].length == 2 ? '0' + values[1].replace('月', '/') : values[1].replace('月', '/') + '01');
                            var y = this.startTime.split('年')[0] + '/' + (this.startTime.split('年')[1].split('月')[0].length == 1 ? '0' + this.startTime.split('年')[1].split('月')[0] : this.startTime.split('年')[1].split('月')[0]) + '/01';
                            if (x<y) {
                                picker.setSlotValue(0, this.startTime.split('年')[0] + '年');
                                picker.setSlotValue(1, this.startTime.split('年')[1]);
                            }
                        }
                    }
                }
                this.currentEndYear = values[0];
                this.currentEndMonth = values[1];
                this.getEndPicker = picker;
            },
            removeContent: function () {
                if (this.workHistory.Id === undefined) return;
                
                this.removePopupVisible = false;

                axios.post(webApi.Expert.deleteWorkHistory, { 
                    id: this.workHistory.Id
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
            saveWorkHistory: function () {
                //Front-end params check
                if (!this.isValidElement(this.workHistory.Company)) {
                    this.isShowError = true;
                    this.errorMessage = "机构名称不能为空，请选择机构!";
                    return;
                }

                if (!this.isValidElement(this.workHistory.Position)) {
                    this.isShowError = true;
                    this.errorMessage = "职位不能为空，请填写职位!";
                    return;
                }

                if (!this.isValidElement(this.workHistory.StartTime) || !this.isValidElement(this.workHistory.EndTime)) {
                    this.isShowError = true;
                    this.errorMessage = "在职时间不能为空，请填写在职时间!";
                    return;
                }

                if (this.workHistory.Company !== this.workHistory.OrganizationName) {
                    this.workHistory.OrganizationId = null;
                }

                this.submitPopupVisible = true;

                //添加工作经历
                if (this.workHistory.Id === undefined) {
                    axios.post(webApi.Expert.addWorkHistory, { 
                        Company: this.workHistory.Company,
                        OrganizationId: this.workHistory.OrganizationId,
                        Department: this.workHistory.Department,
                        Position: this.workHistory.Position,
                        StartTime: this.workHistory.StartTime,
                        EndTime: this.workHistory.EndTime,
                        Description: this.workHistory.Description
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

                //更新工作经历
                axios.post(webApi.Expert.updateWorkHistory, { 
                        Id: this.workHistory.Id,
                        Company: this.workHistory.Company,
                        OrganizationId: this.workHistory.OrganizationId,
                        Department: this.workHistory.Department,
                        Position: this.workHistory.Position,
                        StartTime: this.workHistory.StartTime,
                        EndTime: this.workHistory.EndTime,
                        Description: this.workHistory.Description
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
            processJSON: function (json) {
                return json.Organizations;
            },
            // 处理focus的时候不触发autocomplete
            focusCallBack: function (e) {
                if (!this.isValidElement(e.target.value)) return;

                axios.post(webApi.Expert.orgSearch, {keyword: e.target.value}).then(response => {
                    this.$refs.autocomplete.showList = true;
                    this.$refs.autocomplete.json = response.data.Organizations;
                });
            },
            getData: function (obj) {
                this.workHistory.Company = obj.FullName;
                this.workHistory.OrganizationName = obj.FullName;
                this.workHistory.OrganizationId = obj.Id;
            }
        },
        watch: {
            startTime: function () {
                if (this.startTime != '') {
                    this.workHistory.StartTime = this.startTime.split('年')[0] +'.'+ (this.startTime.split('年')[1].split('月')[0].length === 1 ? ('0' + this.startTime.split('年')[1].split('月')[0]) : this.startTime.split('年')[1].split('月')[0]);
                } else {
                    this.workHistory.StartTime = '';
                }
            },
            endTime: function () {
                if (this.endTime === '至今') {
                    this.workHistory.EndTime = '至今';
                } else if (this.endTime == '') {
                    this.workHistory.EndTime = '';
                } else {
                    this.workHistory.EndTime = this.endTime.split('年')[0] +'.'+ (this.endTime.split('年')[1].split('月')[0].length === 1 ? ('0' + this.endTime.split('年')[1].split('月')[0]) : this.endTime.split('年')[1].split('月')[0]);
                }
            },
        },
    }
</script>

<style>

</style>
