<template>
    <div id="articleContent" class="articleContent ep_font32">
        <div class="ep_marginTop24"></div>
        <div class="ep_content_div">
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <div class="ep_title_div">
                    <span>作者</span>
                    <span class="ep_marginTop5 ep_marginLeft10">*</span>
                </div>
                <input class="ep_align_right ep_input fl ep_font32" type="text" placeholder="请输入" v-model="publish.Author" />
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <div class="ep_title_div">
                    <span>标题</span>
                    <span class="ep_marginTop5 ep_marginLeft10">*</span>
                </div>
                <input class="ep_align_right ep_input fl ep_font32" type="text" placeholder="请输入" v-model="publish.Name" />
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <div class="ep_title_div">
                    <span>出版社</span>
                </div>
                <input class="ep_align_right ep_input fl ep_font32" type="text" placeholder="请输入" v-model="publish.Publisher" />
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <div class="ep_title_div">
                    <span>出版时间</span>
                </div>
                <div class="fl ep_font32 ep_align_left PublishTime ep_right_div" v-on:click="showYearPicker" v-bind:class="[!isValidElement(publish.PublishTime) ? 'ep_color_grey' : '']">
                    {{isValidElement(publish.PublishTime) ? publish.PublishTime : '请选择'}}
                </div>
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <div class="ep_title_div">
                   <span>书号ISBN</span>
                </div>
                <input class="ep_align_right ep_input fl ep_font32" type="text" placeholder="请输入" v-model="publish.Isbn" />
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <div class="ep_title_div">
                    <span>页数</span>
                </div>
                <input class="ep_align_right ep_input fl ep_font32" type="number" placeholder="请输入" v-model="publish.Pages" />
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <div class="ep_title_div">
                    <span>作品网址</span>
                </div>
                <input class="ep_align_right ep_input fl ep_font32" type="text" placeholder="请输入" v-model="publish.Link" />
            </div>
            <div class="ep_errorTips ep_color_red ep_font24 ep_overhide" v-show="isShowError" v-cloak v-bind:class="[isShowError?'ep_paddingTop60':'']">
                <span class="fl ep_marginTop5">*</span>
                <span class="fl  ep_marginLeft10">{{errorMessage}}</span>
            </div>
            <div class="ep_overhide ep_btnGroup">
                <span class="ep_saveBtn fl" v-on:click="saveArticle">保存</span>
                <span class="ep_cancelBtn fr">
                    <router-link to="/EditProfile" class="ep_color_orange">
                        取消
                    </router-link>
                </span>
               <span v-if="isValidElement(id)" class="ep_removeBtn fl" v-on:click="removePopupVisible=true">删除本条信息</span>
            </div>
        </div>
        <mt-popup v-model="isShowYearPopup" position='bottom' modal=true class="ep_popup">
            <div class="ep_overhide ep_padding30 ep_popup_div_btn">
                <span class="fl ep_color_yellow ep_down_popupBtn" v-on:click="saveYear">确定</span>
                <span class="fl ep_color_white ep_down_popupBtn" v-on:click="hideYearPicker">取消</span>
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
        name: 'Article',
        data: function () {
            return {
                currentSelectedYear: '',
                author: '',
                articleName: '',
                press: '',
                publishTime:'',
                ISBN: '',
                pageNumber: '',
                articleLink:'',
                isShowYearPopup: false,
                article: '',
                isSelectedArticle:false,
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
                submitPopupVisible: false,
                getPicker: null,
                uploadUrl: '',
                publish: {},
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
                axios.post(webApi.Expert.getUploadFileUrl).then(response => {
                    this.uploadUrl = response.data.data.UploadUrl;
                });

                if (this.isValidElement(this.id) && !isNaN(this.id)) {
                    axios.post(webApi.Expert.getPublish, { id: this.id }).then(response => {
                        this.publish = response.data.data;
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
                if (this.getPicker != null && this.currentSelectedYear != '' && this.currentSelectedYear != this.publishTime) {
                    this.getPicker.setSlotValue(0, this.publishTime === '' ? new Date().getFullYear() + '年' : this.publishTime)
                }
            },
            hideYearPicker:function(){
                this.isShowYearPopup = false;
            },
            saveYear: function () {
                this.publishTime = this.currentSelectedYear;
                this.publish.PublishTime = this.publishTime.replace('年', '');
                this.hideYearPicker();
            },
            onYearChange: function (picker, values) {
                this.currentSelectedYear = values[0];
                this.getPicker = picker;
            },
            selectFile: function () {
                document.getElementById("uploadArticleInput").value = "";
                $('#uploadArticleInput').click();
            },
            removeContent: function () {
                this.removePopupVisible = false;

                if (this.publish.Id === undefined) return;

                axios.post(webApi.Expert.deletePublish, { 
                    id: this.publish.Id 
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
            articleHandle: function () {
                var self = this;

                //添加著作
                if (this.publish.Id === undefined) {
                    axios.post(webApi.Expert.addPublish, { 
                        Name: this.publish.Name,
                        Publisher: this.publish.Publisher,
                        PublishTime: this.publish.PublishTime,
                        Author: this.publish.Author,
                        Isbn: this.publish.Isbn,
                        Pages: this.publish.Pages,
                        Link: this.publish.Link
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

                axios.post(webApi.Expert.updatePublish, { 
                        Id: self.publish.Id,
                        Name: self.publish.Name,
                        Publisher: self.publish.Publisher,
                        PublishTime: self.publish.PublishTime,
                        Author: self.publish.Author,
                        Isbn: self.publish.Isbn,
                        Pages: self.publish.Pages,
                        Link: self.publish.Link
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
            saveArticle: function () {
                //Front-end params check
                if (!this.isValidElement(this.publish.Author)) {
                    this.isShowError = true;
                    this.errorMessage = "作者不能为空，请填写!";
                    return;
                }

                if (!this.isValidElement(this.publish.Name)) {
                    this.isShowError = true;
                    this.errorMessage = "标题不能为空，请填写!";
                    return;
                }

                if (this.isValidElement(this.publish.Pages)) {
                    if (!/^[1-9][0-9]*$/.test(this.publish.Pages)) {
                        this.isShowError = true;
                        this.errorMessage = "页数须为非负数字!";
                        return;
                    }

                    if (parseInt(this.publish.Pages) > 50000) {
                        this.isShowError = true;
                        this.errorMessage = "页数最大为50000！";
                        return;
                    }
                }

                if (this.isValidElement(this.publish.Link) && this.publish.Link.indexOf("http") === -1) {
                    this.isShowError = true;
                    this.errorMessage = "请填写完整地址(例:http://www.cn-abs.com)";
                    return;
                }

                var self = this;
                this.submitPopupVisible = true;

                if (this.publish.Name.indexOf('《') == 0 && this.publish.Name.indexOf('》') == this.publish.Name.length - 1) {
                    this.publish.Name = this.publish.Name.substring(1, this.publish.Name.length - 1);
                }

                self.articleHandle();
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
