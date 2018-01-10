<template>
    <div id="otherPositionContent" class="otherPositionContent ep_font32">
        <div class="ep_marginTop24"></div>
        <div class="ep_content_div">
            <div class="ep_part_item ep_part_item_border">
                    <span class='fl ep_font32 ep_color_grey'>职务</span>
                      <span class="fl ep_marginTop5 ep_color_grey ep_marginLeft10">*</span>
                    <input class="ep_input fr ep_font32 ep_marginLeft15 ep_align_right" type="text" placeholder="请输入" v-model="otherPost.Name" />
                </div>
            <div class="ep_errorTips ep_color_red ep_font24 ep_overhide" v-show="isShowError" v-bind:class="[isShowError?'ep_paddingTop60':'']">
                <span class="fl ep_marginTop5">*</span>
                <span class="fl  ep_marginLeft10">{{errorMessage}}</span>
            </div>
            <div class="ep_overhide ep_btnGroup">
                <span class="ep_saveBtn fl" v-on:click="saveOtherPosition">保存</span>
                <span v-if="queryString.id === undefined" class="ep_cancelBtn fr">
                    <router-link to="/">
                        取消
                    </router-link>
                </span>
                <span v-else class="ep_removeBtn fr" v-on:click="removePopupVisible=true">删除本条</span>
            </div>
        </div>
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
  name: "OtherPosition",
  data: function() {
    return {
      submitPopupVisible: false,
      isShowError: false,
      errorMessage: "",
      removePopupVisible: false,
      queryString: {}, //GetRequest(),
      otherPost: {}
    };
  },
  created: function() {},
  methods: {
    saveOtherPosition: function() {
      //TODO - Front-end params check
      if (!isValidElement(this.otherPost.Name)) {
        this.isShowError = true;
        this.errorMessage = "请填写其它职务!";
        return;
      }
      var self = this;
      this.submitPopupVisible = true;

      //添加其它职务
      if (this.otherPost.Id === undefined) {
        appFrame.ajax("/expert/ExpertInfo/AddOtherPost", {
          data: {
            Name: self.otherPost.Name
          },
          success: function(res) {
            if (res.status === "ok") {
              window.location.href =
                "/expert/expertuser/editProfile#otherPosition";
            }

            if (res.status === "fail") {
              self.submitPopupVisible = false;
              self.isShowError = true;
              self.errorMessage = res.data;
            }
          }
        });

        return;
      }

      //更新其它职务
      appFrame.ajax("/expert/ExpertInfo/UpdateOtherPost", {
        data: {
          Id: self.otherPost.Id,
          Name: self.otherPost.Name
        },
        success: function(res) {
          if (res.status === "ok") {
            window.location.href =
              "/expert/expertuser/editProfile#otherPosition";
          }

          if (res.status === "fail") {
            self.submitPopupVisible = false;
            self.isShowError = true;
            self.errorMessage = res.data;
          }
        }
      });
    },
    removeContent: function() {
      this.removePopupVisible = false;
      var self = this;
      if (this.otherPost.Id === undefined) return;

      appFrame.ajax("/expert/ExpertInfo/DeleteOtherPost", {
        data: {
          Id: self.otherPost.Id
        },
        success: function(res) {
          if (res.status === "ok") {
            window.location.href =
              "/expert/expertuser/editProfile#otherPosition";
          }
          if (res.status === "fail") {
            self.isShowError = true;
            self.errorMessage = res.data;
          }
        }
      });
    }
  }
};
</script>

<style>

</style>

