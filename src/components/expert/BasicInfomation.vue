<template>
    <div class="basicInformationContent">
        <div class="ep_marginTop24"></div>
        <div class="ep_content_div">
            <section>
                <div class="ep_part_item ep_part_item_border ep_paddingTop30">
                    <span class='fl ep_font32 ep_color_grey'>头像</span>
                    <div class="divUserAvatar fr" v-on:click="uploadUserAvatar">
                        <img v-bind:src="userInfo.Avatar" alt="用户头像"/>
                    </div>
                    <input id="expert-userAvatar" type="file" accept="image/*" style="display: none;" v-on:change="selectAvatar" />
                </div>
                <div class="ep_part_item ep_part_item_border">
                    <span class='fl ep_font32 ep_color_grey'>姓名</span>
                    <input class="ep_input fr ep_font32 ep_marginLeft15 ep_align_right" type="text" v-model="userInfo.Name" />
                </div>
                <div class="ep_part_item ep_part_item_border">
                    <span class='fl ep_font32 ep_color_grey'>公司</span>
                    <input class="ep_input fr ep_font32 ep_marginLeft15 ep_align_right" type="text" v-model="userInfo.Company" />
                </div>
                <div class="ep_part_item ep_part_item_border">
                    <span class='fl ep_font32 ep_color_grey'>手机号</span>
                    <input class="ep_input fr ep_font32 ep_marginLeft15 ep_align_right" disabled="disabled" type="text" v-model="userInfo.Cellphone" />
                </div>
                <div class="ep_part_item ep_part_item_border">
                    <span class='fl ep_font32 ep_color_grey'>邮箱</span>
                    <input class="ep_input fr ep_font32 ep_marginLeft15 ep_align_right" type="text" v-model="userInfo.Email" />
                </div>
            </section>
            <div class="ep_errorTips ep_color_red ep_font24 ep_overhide" v-cloak v-show="isShowError" v-bind:class="[isShowError?'ep_paddingTop60':'']">
                <span class="fl ep_marginTop5">*</span>
                <span class="fl  ep_marginLeft10">{{errorMessage}}</span>
            </div>
            <div class="ep_overhide ep_btnGroup">
                <span class="ep_saveBtn fl" v-on:click="saveBasicInformation">保存</span>
                <span class="ep_cancelBtn fr">
                    <router-link to="/" class="ep_color_orange">
                        取消
                    </router-link>
                </span>
            </div>
            <mt-popup v-model="popupVisible" position='right' modal=true class="avatarPopup">
                <div id="uploadAvatar">
                    <div id="avatar-crop-box" class="hidden">
                        <form enctype="multipart/form-data" method="POST"></form>
                        <canvas id="canvas" width="150" height="150" style="display: none"></canvas>
                        <div class="ep_marginTop24 ep_marginLeft10">
                            <span class="ep_font24" style="display:none;">原始图片：</span>
                            <img src="" id="crop-avatar-target" alt="Uploaded image" />
                            <div id="preview-pane" style="display:none;">
                                <span class="ep_font24">头像预览：</span>
                                <div class="preview-container">
                                    <img src="" class="jcrop-preview" alt="Preview" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ep_overhide ep_btnGroup">
                    <span class="ep_saveBtn fl" v-on:click="saveAvatar">保存</span>
                    <span class="ep_cancelBtn fl" v-on:click="closepop">取消</span>
                </div>
            </mt-popup>
            <mt-popup v-model="submitPopupVisible" class="ep_submitPopup">
                <div class="ep_divSpinner"><mt-spinner type="snake"></mt-spinner></div>
                <div class="ep_align_center ep_font30 ep_submitColor">提交中...</div>
            </mt-popup>
        </div>
    </div>
</template>

<script>
import '@/scripts/expert/flexible';
import $ from 'jquery';

import '@/styles/expert/reset.css';
import '@/styles/expert/editProfile.css';
import '@/styles/expert/jquery.Jcrop.min.css';

export default {
    name: 'BasicInformation',
    data: function () {
        return {
            userInfo: {},
            avatar: { base64Str: '', fileName: '' },
            popupVisible: false,
            isShowError: false,
            errorMessage: '',
            submitPopupVisible: false
        }
    },
    created: function () {
        this.initData();
    },
    methods: {
        initData: function () {
            this.userInfo = {"Name":"杨小峰177","Company":"asdasdasd","Avatar":"http://10.1.1.35:8000/filestore/common/downloadimg/cnabs/479fc8b7-2e95-cde6-098e-08d5518e105d/s","Cellphone":"17721307643","Email":"xiaofeng.yang@sail-fs.com","AvatarFileCode":"479fc8b7-2e95-cde6-098e-08d5518e105d","UploadImgUrl":"http://10.1.1.35:8000/filestore/common/uploaddata/cnabs/"}
        },
        closepop: function() {
            this.popupVisible = false;
            $("#avatar-crop-box div:eq(0)").remove()
            $("#avatar-crop-box").prepend($("<div class='ep_marginTop24 ep_marginLeft10'><span style='display:none;'>原始图片：</span><img src='' id='crop-avatar-target' alt='Uploaded image' /><div id='preview-pane'  style='display:none;'><span>头像预览：</span><div class='preview-container'><img src='' class='jcrop-preview' alt='Preview' /></div></div></div>"));
        },
        uploadUserAvatar: function() {
            $('#expert-userAvatar').click();
        },
        selectAvatar: function(e) {
            var self = this;
            var file = e.currentTarget.files[0];
            if (file.size >= 6 * 1024 * 1024) {
                self.$toast("请上传小于6M的图片");
            } else {
                fileType = file.type;
                fileName = file.name;
                var reader = new FileReader();
                reader.onload = function(e) {
                    var image = new Image();
                    image.onload = function() {
                        var imgUrl = this.src;
                        var length = this.width >= this.height ? this.width : this.height;

                        if (length < 400) {
                            var ratio = 400 / length;
                            imgUrl = resizePicture(this, ratio);
                        }

                        $('#preview-pane .preview-container img').attr('src', imgUrl);
                        var img = $('#crop-avatar-target');
                        img.attr('src', this.src);
                        $('#avatar-crop-box').removeClass('hidden');
                        initAvatarCrop($('#crop-avatar-target'));
                        $(".jcrop-holder img").attr('src', imgUrl);

                        self.popupVisible = true;
                        document.getElementById("expert-userAvatar").value = "";
                    }
                    image.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        saveAvatar: function() {
            var self = this;
            var srcImg = document.getElementById('crop-avatar-target');
            var height = srcImg.style.height.replace('px', '');
            var width = srcImg.style.width.replace('px', '');

            var previewImg = $('#preview-pane .preview-container img');
            var previewWidth = previewImg.css('width').replace('px', '');
            var previewHeight = previewImg.css('height').replace('px', '');
            var marginLeft = Math.abs(previewImg.css('marginLeft').replace('px', ''));
            var marginTop = Math.abs(previewImg.css('marginTop').replace('px', ''));
            var wRatio = width / previewWidth;
            var hRatio = height / previewHeight;

            var canvas = document.getElementById("canvas");
            canvas.height = 150 * hRatio;
            canvas.width = 150 * hRatio;
            canvas.getContext("2d").drawImage(srcImg, marginLeft * wRatio, marginTop * hRatio, 150 * wRatio, 150 * hRatio, 0, 0, 150 * hRatio, 150 * hRatio);

            var imgBase64Str = canvas.toDataURL(fileType);
            this.avatar.base64Str = imgBase64Str;
            this.avatar.fileName = fileName;
            $(".divUserAvatar img").attr("src", imgBase64Str);

            this.closepop();
        },
        isInvalidElement: function(item) {
            return (item === null || item === undefined || item === "");
        },
        updateUserBasicInfo: function () {
            var self = this;

            appFrame.ajax("/expert/ExpertInfo/UpdateUserBasicInfo", {
                type: "post",
                data: {
                    Name: self.userInfo.Name,
                    Company: self.userInfo.Company,
                    Cellphone: self.userInfo.Cellphone,
                    Email: self.userInfo.Email,
                    AvatarFileCode: self.userInfo.AvatarFileCode
                },
                success: function (res) {
                    if (res.status === "fail") {
                        self.submitPopupVisible = false;
                        self.isShowError = true;
                        self.errorMessage = res.data;
                        return;
                    };

                    window.location.href = '/expert/expertuser/editProfile#basicInformation';
                }
            });
        },
        saveBasicInformation: function() {
            //Front-end params check
            if (this.isInvalidElement(this.userInfo.Name)) {
                this.isShowError = true;
                this.errorMessage = '姓名不能为空！';
                return;
            }

            if (this.userInfo.Name.length > 40) {
                this.isShowError = true;
                this.errorMessage = '姓名长度不大于40个字符！';
                return;
            }
            //姓名全英或者全中文
            var reg = /^[\u4E00-\u9FA0\s]+$|^[a-zA-Z\s]+$/
            if (!reg.test(this.userInfo.Name)) {
                this.isShowError = true;
                this.errorMessage = '姓名不能包含特殊字符！';
                return;
            }

            if (this.isInvalidElement(this.userInfo.Company)) {
                this.isShowError = true;
                this.errorMessage = '公司不能为空！';
                return;

            }

            var emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
            if (!this.isInvalidElement(this.userInfo.Email) && !emailReg.test(this.userInfo.Email)) {
                this.isShowError = true;
                this.errorMessage = '邮箱格式有误(例:XXX@@XX.XXX)！';
                return;
            }

            var self = this;
            this.submitPopupVisible = true;

            if (this.avatar.base64Str !== "") {
                appFrame.ajax(self.userInfo.UploadImgUrl, {
                    type: "post",
                    data: { base64Str: self.avatar.base64Str, fileName: self.avatar.fileName },
                    success: function(data) {
                        self.userInfo.AvatarFileCode = data[0].FileCode;
                        self.updateUserBasicInfo();
                    },
                });
                return;
            }

            self.updateUserBasicInfo();
        }
    }
};
</script>

<style>

</style>
