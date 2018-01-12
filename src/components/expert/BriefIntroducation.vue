<<template>
    <div class="personalProfileContent ep_font32">
        <div class="ep_marginTop24"></div>
        <div class="ep_content_div">
            <div class="ep_part_item ep_overhide">
                <div class="ep_title_div">
                    <span>个人简介</span>
                    <span class="ep_marginTop5 ep_marginLeft10">*</span>
                </div>
            </div>
            <div>
                <textarea class="ep_font32 ep_textarea" type="text" placeholder="请输入个人简介，最多500个字符" v-model="personalProfile"> </textarea>
            </div>
            <div class="ep_errorTips ep_color_red ep_font24 ep_overhide" v-show="isShowError" v-bind:class="[isShowError?'ep_paddingTop60':'']">
                <span class="fl ep_marginTop5">*</span>
                <span class="fl  ep_marginLeft10">{{errorMessage}}</span>
            </div>
            <div class="ep_overhide ep_btnGroup">
                <span class="ep_saveBtn fl" v-on:click="savePersonalProfile">保存</span>
                <span class="ep_cancelBtn fr">
                    <router-link to="/EditProfile" class="ep_color_orange">
                        取消
                    </router-link>
                </span>
                <span></span>
            </div>
            <mt-popup v-model="submitPopupVisible" class="ep_submitPopup">
                <div class="ep_divSpinner"><mt-spinner type="snake"></mt-spinner></div>
                <div class="ep_align_center ep_font30 ep_submitColor">提交中...</div>
            </mt-popup>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import * as webApi from "@/config/api";

    export default {
        name: 'BriefIntroducation',
        data: function () {
            return {
                introduction: '',
                isShowError: false,
                errorMessage: '',
                submitPopupVisible: false,
                personalProfile: ''
            }
        },
        created: function () {
            this.scrollRestore();
            this.initData();
        },
        methods: {
            initData: function () {
                axios.post(webApi.Expert.getPersonalProfile).then(response => {
                        this.personalProfile = response.data.data;
                    });
            },
            savePersonalProfile: function () {

                if (this.isValidElement(this.personalProfile) && this.personalProfile.length >= 500) {
                    this.isShowError = true;
                    this.errorMessage = '个人简介最多500个字符！';
                    return;
                }

                var self = this;
                this.submitPopupVisible = true;

                axios.post(webApi.Expert.updatePersonalProfile, { 
                        personalProfile: this.personalProfile 
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
