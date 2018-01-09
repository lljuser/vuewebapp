<template>
    <div id="articleContent" class="articleContent ep_font32">
        <div class="ep_marginTop24"></div>
        <div class="ep_content_div">
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <span class="fl ep_color_grey">作者</span>
                <span class="fl ep_marginTop5 ep_color_grey ep_marginLeft10">*</span>
                <input class="ep_align_right ep_input fr ep_font32" type="text" placeholder="请输入" v-model="publish.Author" />
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <span class="fl ep_color_grey">书名/文章标题</span>
                <span class="fl ep_marginTop5 ep_color_grey ep_marginLeft10">*</span>
                <input class="ep_align_right ep_input fr ep_font32 ep_width400" type="text" placeholder="请输入" v-model="publish.Name" />
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <span class="fl ep_color_grey">出版社/期刊</span>
                <input class="ep_align_right ep_input fr ep_font32" type="text" placeholder="请输入" v-model="publish.Publisher" />
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <span class="fl ep_color_grey">出版时间</span>
                <div class="fr fr ep_font32 ep_align_right" v-on:click="showYearPicker" v-bind:class="[!isValidElement(publish.PublishTime) ? 'ep_color_grey' : '']">
                    {{isValidElement(publish.PublishTime) ? publish.PublishTime : '请选择'}}
                </div>
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <span class="fl ep_color_grey">书号ISBN</span>
                <input class="ep_align_right ep_input fr ep_font32" type="text" placeholder="请输入" v-model="publish.Isbn" />
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <span class="fl ep_color_grey">页数</span>
                <input class="ep_align_right ep_input fr ep_font32" type="number" placeholder="请输入" v-model="publish.Pages" />
            </div>
            <div class="ep_part_item ep_part_item_border ep_overhide">
                <span class="fl ep_color_grey">作品网址</span>
                <input class="ep_align_right ep_input fr ep_font32" type="text" placeholder="请输入" v-model="publish.Link" />
            </div>
            <div class="ep_errorTips ep_color_red ep_font24 ep_overhide" v-show="isShowError" v-cloak v-bind:class="[isShowError?'ep_paddingTop60':'']">
                <span class="fl ep_marginTop5">*</span>
                <span class="fl  ep_marginLeft10">{{errorMessage}}</span>
            </div>
            <div class="ep_overhide ep_btnGroup">
                <span class="ep_saveBtn fl" v-on:click="saveArticle">保存</span>
                <span v-if="publish.Id === undefined" class="ep_cancelBtn fr">
                    <!-- <a href="/expert/expertuser/editProfile#article" class="ep_color_orange">取消</a> -->
                    <router-link to="/EditProfile" class="ep_color_orange">
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
                queryString: {},//GetRequest(),
                publish: {}
            }
        },
        created: function () {
            
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
                if (this.getPicker != null && currentSelectedYear != '' && currentSelectedYear != this.publishTime) {
                    this.getPicker.setSlotValue(0, this.publishTime === '' ? new Date().getFullYear() + '年' : this.publishTime)
                }
            },
            hideYearPicker:function(){
                this.isShowYearPopup = false;
            },
            saveYear: function () {
                this.publishTime = currentSelectedYear;
                this.publish.PublishTime = this.publishTime.replace('年', '');
                this.hideYearPicker();
            },
            onYearChange: function (picker, values) {
                currentSelectedYear = values[0];
                this.getPicker = picker;
            },
            selectFile: function () {
                document.getElementById("uploadArticleInput").value = "";
                $('#uploadArticleInput').click();
            },
            removeContent: function () {
                this.removePopupVisible = false;

                if (this.publish.Id === undefined) return;

                appFrame.ajax("/expert/ExpertInfo/DeletePublish", {
                    data: { id: this.publish.Id },
                    success: function (res) {
                        if (res.status === "ok") {
                            window.location.href = '/expert/expertuser/editProfile#article';
                        };

                        if (res.status === "fail") {
                            self.isShowError = true;
                            self.errorMessage = res.data;
                        };
                    }
                });

                window.location.href = '/expert/expertuser/editProfile#article'
            },
            articleHandle: function () {
                var self = this;

                //添加著作
                if (this.publish.Id === undefined) {
                    appFrame.ajax("/expert/ExpertInfo/AddPublish", {
                        data: {
                            Name: self.publish.Name,
                            Publisher: self.publish.Publisher,
                            PublishTime: self.publish.PublishTime,
                            Author: self.publish.Author,
                            Isbn: self.publish.Isbn,
                            Pages: self.publish.Pages,
                            Link: self.publish.Link
                        },
                        success: function (res) {
                            if (res.status === "ok") {
                                window.location.href = '/expert/expertuser/editProfile#article';
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

                appFrame.ajax("/expert/ExpertInfo/UpdatePublish", {
                    data: {
                        Id: self.publish.Id,
                        Name: self.publish.Name,
                        Publisher: self.publish.Publisher,
                        PublishTime: self.publish.PublishTime,
                        Author: self.publish.Author,
                        Isbn: self.publish.Isbn,
                        Pages: self.publish.Pages,
                        Link: self.publish.Link
                    },
                    success: function (res) {
                        if (res.status === "ok") {
                            window.location.href = '/expert/expertuser/editProfile#article';
                        };

                        if (res.status === "fail") {
                            self.submitPopupVisible = false;
                            self.isShowError = true;
                            self.errorMessage = res.data;
                        };
                    }
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
                    this.errorMessage = "书名/文章标题不能为空，请填写!";
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
            }
        }
    }
</script>

<style>

</style>
