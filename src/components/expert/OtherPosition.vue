<template>
    <div id="otherPositionContent" class="otherPositionContent ep_font32">
        <div class="ep_marginTop24"></div>
        <div class="ep_content_div">
            <div class="ep_part_item ep_part_item_border">
                  <div class="ep_title_div">
                    <span>职务</span>
                    <span class="ep_marginTop5 ep_marginLeft10">*</span>
                </div>
                    <input class="ep_align_right ep_input fl ep_font32" type="text" placeholder="请输入" v-model="otherPost.Name" />
                </div>
            <div class="ep_errorTips ep_color_red ep_font24 ep_overhide" v-show="isShowError" v-bind:class="[isShowError?'ep_paddingTop60':'']">
                <span class="fl ep_marginTop5">*</span>
                <span class="fl  ep_marginLeft10">{{errorMessage}}</span>
            </div>
            <div class="ep_overhide ep_btnGroup">
                <span class="ep_saveBtn fl" v-on:click="saveOtherPosition">保存</span>
                <span class="ep_cancelBtn fr">
                    <router-link to="/EditProfile" class="ep_color_orange">
                        取消
                    </router-link>
                </span>
                <span v-if="isValidElement(id)" class="ep_removeBtn fl" v-on:click="removePopupVisible=true">删除本条信息</span>
            </div>
        </div>
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
        name: 'OtherPosition',
        data: function () {
            return {
                submitPopupVisible:false,
                isShowError: false,
                errorMessage:'',
                removePopupVisible: false,
                otherPost: {},
                id: null,
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
                    axios.post(webApi.Expert.getOtherPost, { id: this.id }).then(response => {
                        this.otherPost = response.data.data;
                    });
                }
            },
            saveOtherPosition: function () {
                //TODO - Front-end params check
                if (!this.isValidElement(this.otherPost.Name)) {
                    this.isShowError = true;
                    this.errorMessage = "请填写其它职务!";
                    return;
                }
                var self = this;
                this.submitPopupVisible = true;

                //添加其它职务
                if (this.otherPost.Id === undefined) {
                    axios.post(webApi.Expert.addOtherPost, {Name: this.otherPost.Name}).then(response => {
                        if (response.data.status === 'fail') {
                            this.isShowError = true;
                            this.errorMessage = response.data.data;
                            return;
                        }

                        this.$router.go(-1);
                    });
                    return;
                }

                //更新其它职务
                axios.post(webApi.Expert.updateOtherPost, {
                         Id: this.otherPost.Id,
                         Name: this.otherPost.Name}).then(response => {
                    if (response.data.status === 'fail') {
                        this.isShowError = true;
                        this.errorMessage = response.data.data;
                        return;
                    }

                    this.$router.go(-1);
                });
            },
            removeContent: function () {
                this.removePopupVisible = false;
                var self = this;
                if (this.otherPost.Id === undefined) return;

                axios.post(webApi.Expert.deleteOtherPost, {Id: this.otherPost.Id}).then(response => {
                    if (response.data.status === 'fail') {
                        this.isShowError = true;
                        this.errorMessage = response.data.data;
                        return;
                    }

                    this.$router.go(-1);
                });
            },
            isValidElement: function (item) {
                return !(item === null || item === undefined || item === "");
            },
            scrollRestore: function () {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0; 
            },
        }
      }
 
</script>

<style>

</style>

