<template>
    <div class="basicInformationContent">
        <div class="ep_marginTop24"></div>
        <div class="ep_content_div">
            <section>
                <div class="ep_part_item ep_part_item_border ep_paddingTop30">
                    <div class="ep_title_div">
                        <span class="ep_marginLeft10 ep_font32">头像</span>
                    </div>
                    <div class="divUserAvatar fr" v-on:click="uploadUserAvatar">
                        <img v-bind:src="userInfo.Avatar" alt="用户头像"/>
                    </div>
                    <input id="expert-userAvatar" type="file" accept="image/*" style="display: none;" v-on:change="selectAvatar" />
                </div>
                <div class="ep_part_item ep_part_item_border">
                     <div class="ep_title_div">
                        <span class="ep_marginLeft10 ep_font32">姓名</span>
                    </div>
                    <input class="ep_input fl ep_font32  ep_align_right" type="text" v-model="userInfo.Name" />
                </div>
                <div class="ep_part_item ep_part_item_border">
                     <div class="ep_title_div">
                        <span class="ep_marginLeft10 ep_font32">公司</span>
                    </div>
                    <input class="ep_input fl ep_font32  ep_align_right" type="text" v-model="userInfo.Company" />
                </div>
                <div class="ep_part_item ep_part_item_border">
                     <div class="ep_title_div">
                        <span class="ep_marginLeft10 ep_font32">手机号</span>
                    </div>
                    <input class="ep_input fl ep_font32  ep_align_right" disabled="disabled" type="text" v-model="userInfo.Cellphone" />
                </div>
                <div class="ep_part_item ep_part_item_border">
                     <div class="ep_title_div">
                        <span class="ep_marginLeft10 ep_font32">邮箱</span>
                    </div>
                    <input class="ep_input fl ep_font32  ep_align_right" type="text" v-model="userInfo.Email" />
                </div>
            </section>
            <div class="ep_errorTips ep_color_red ep_font24 ep_overhide" v-cloak v-show="isShowError" v-bind:class="[isShowError?'ep_paddingTop60':'']">
                <span class="fl ep_marginTop5">*</span>
                <span class="fl  ep_marginLeft10">{{errorMessage}}</span>
            </div>
            <div class="ep_overhide ep_btnGroup">
                <span class="ep_saveBtn fl" v-on:click="saveBasicInformation">保存</span>
                <span class="ep_cancelBtn fr">
                    <router-link to="/EditProfile" class="ep_color_orange">
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
import $ from 'jquery';
import axios from "axios";
import * as webApi from "@/config/api";
import '@/public/modules/expert/jquery.Jcrop.min';
import '@/public/css/expert/jquery.Jcrop.min.css';

export default {
    name: 'BasicInformation',
    data: function () {
        return {
            userInfo: {},
            avatar: { base64Str: '', fileName: '' },
            popupVisible: false,
            isShowError: false,
            errorMessage: '',
            submitPopupVisible: false,
            jcrop_api: null,
            boundx: null,
            boundy: null,
            xsize: null,
            ysize: null,
            fileType: null,
            fileName: null,
        }
    },
    created: function () {
        this.initData();
    },
    methods: {
        initData: function () {
            axios.post(webApi.Expert.getUserBasicInfo).then(response => {
                this.userInfo = response.data.data;
            });
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
                this.fileType = file.type;
                this.fileName = file.name;
                var reader = new FileReader();
                reader.onload = function(e) {
                    var image = new Image();
                    image.onload = function() {
                        var imgUrl = this.src;
                        var length = this.width >= this.height ? this.width : this.height;

                        if (length < 400) {
                            var ratio = 400 / length;
                            imgUrl = self.resizePicture(this, ratio);
                        }

                        $('#preview-pane .preview-container img').attr('src', imgUrl);
                        var img = $('#crop-avatar-target');
                        img.attr('src', this.src);
                        $('#avatar-crop-box').removeClass('hidden');
                        self.initAvatarCrop($('#crop-avatar-target'));
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

            var imgBase64Str = canvas.toDataURL(this.fileType);

            this.avatar.base64Str = imgBase64Str;
            this.avatar.fileName = this.fileName;
            $(".divUserAvatar img").attr("src", imgBase64Str);

            this.closepop();
        },
        isInvalidElement: function(item) {
            return (item === null || item === undefined || item === "");
        },
        updateUserBasicInfo: function () {
            axios.post(webApi.Expert.updateUserBasicInfo, { 
                Name: this.userInfo.Name,
                Company: this.userInfo.Company,
                Cellphone: this.userInfo.Cellphone,
                Email: this.userInfo.Email,
                AvatarFileCode: this.userInfo.AvatarFileCode
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

            var reg = new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
            if (!this.isInvalidElement(this.userInfo.Email) && !reg.test(this.userInfo.Email)) {
                this.isShowError = true;
                this.errorMessage = '邮箱格式有误(例:XXX@XX.XXX)！';
                return;
            }

            this.submitPopupVisible = true;

            if (this.avatar.base64Str !== "") {
                axios.post(webApi.Expert.uploadImgUrl, { 
                    base64Str: this.avatar.base64Str,
                    fileName: this.avatar.fileName 
                }).then(response => {
                    this.userInfo.AvatarFileCode = response.data.data[0].FileCode;
                    this.updateUserBasicInfo();
                }).catch(function (error) {
                     console.log(error);
                });;

                return;
            }

            this.updateUserBasicInfo();
        },
        resizePicture: function (image, ratio) {
            var canvas = document.getElementById("canvas");
            canvas.height = image.height * ratio;
            canvas.width = image.width * ratio;
            canvas.getContext('2d').drawImage(image, 0, 0, image.width * ratio, image.height * ratio);
            return canvas.toDataURL();
        },
        initAvatarCrop: function (img) {
            var self = this;
            img.Jcrop({
                onChange: self.updatePreviewPane,
                onSelect: self.updatePreviewPane,
                boxWidth: 400,
                boxHeight: 300,
                aspectRatio: self.xsize / self.ysize
            }, function () {
                var bounds = this.getBounds();
                self.boundx = bounds[0];
                self.boundy = bounds[1];

                this.jcrop_api = this;
                this.jcrop_api.setOptions({ allowSelect: false });
                this.jcrop_api.setOptions({ allowMove: true });
                this.jcrop_api.setOptions({ allowResize: true });
                this.jcrop_api.setOptions({ aspectRatio: 1 });

                var padding = 10;
                var shortEdge = (self.boundx < self.boundy ? self.boundx : self.boundy) - padding;
                var longEdge = self.boundx < self.boundy ? self.boundy : self.boundx;
                var xCoord = longEdge / 2 - shortEdge / 2;
                this.jcrop_api.animateTo([xCoord, padding, shortEdge, shortEdge]);

                var pcnt = $('#preview-pane .preview-container');
                self.xsize = pcnt.width();
                self.ysize = pcnt.height();
                $('#preview-pane').appendTo(this.jcrop_api.ui.holder);
                this.jcrop_api.focus();
            });
        },
        updatePreviewPane: function (c) {
            if (parseInt(c.w) > 0) {
                var rx = this.xsize / c.w;
                var ry = this.ysize / c.h;

                $('#preview-pane .preview-container img').css({
                    width: Math.round(rx * this.boundx) + 'px',
                    height: Math.round(ry * this.boundy) + 'px',
                    marginLeft: '-' + Math.round(rx * c.x) + 'px',
                    marginTop: '-' + Math.round(ry * c.y) + 'px'
                });
            }
        }
    }
};
</script>

<style>

</style>
