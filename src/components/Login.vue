<template >
  <div id="app" class="absLinkBg">
      <img src="../public/images/loginTitle.png" alt="" style="width:100%">
    <div style="width:100%">
    </div>
    <form @submit.prevent="submit" method="post">
      <div class="loginPanel">
          <div class="accountDiv">
            <div class="accountIcon">
              <img src="../public/images/username.png" alt="" style="width:100%">
            </div>
            <div class="accountInput">
              <input type="text" name="" id="username" class="inputBack appH5_font_larger" v-model="Username" placeholder="请输入CNABS账号/手机号">
            </div>
          </div>
          <div style="clear:both"></div>
          <div class="passwordDiv">
            <div class="passwordIcon">
              <img src="../public/images/password.png" alt="" style="width:100%">
            </div>
            <div class="passwordInput">
              <input type="password" name="" id="password" class="inputBack appH5_font_larger" v-model="Password" placeholder="请输入密码">
            </div>
          </div>
          <div v-if='errorMsg!=""' style="color:red;font-size:12px;line-height:20px;display:inline">{{errorMsg}}</div>
          <div class="loginBtnDiv">
            <input type="submit" value="登  录"  class="appH5_btn_larger_blue loginBtnInput"/>
          </div>
      </div> 
    </form>
    <div style="clear:both"></div>
    <!-- <div class="moreOpration">
    <div class="appH5_float_left dynamicLogin">动态密码登录</div>
    <div class="appH5_float_right registerAccount">注册账户</div>
    </div> -->
    <div class="loginBottom">
      <div class="bottomVersion">
        <div class="cnabsLogo">
          <img src="../public/images/appIcon.png" alt="" style="width:100%">
        </div>
        <div class="versionInfo">
            <span class="appH5_font_normal" style="color:#ccc">CNABS移动应用v1.5.0</span>
        </div>
      </div>
    </div>               
  </div>
</template>
<style>
.inputBack {
  background-color:transparent;
  border: none;
  width: 100%;
  color: white;
  height: 50px;
  line-height: 50px;
  padding-top: 2px;
}
input::-webkit-input-placeholder {
  color: white;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: white;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: white;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: white;
}
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px #191919 inset;
  -webkit-text-fill-color: white;
}
.absLinkBg {
  position: absolute;
  height: 100%;
}
.loginPanel {
  padding-top: 0.5rem;
  width: 100%;
}
.accountDiv {
  width: 76%;
  height: 54px;
  border-bottom: solid 1px #444444;
  margin: 0 auto;
}
.accountIcon {
  width: 20px;
  float: left;
  margin: 13px 10px;
}
.accountInput {
  float: left;
  width: 82%;
}
.passwordDiv {
  width: 76%;
  height: 54px;
  border-bottom: solid 1px #444444;
  margin: 0 auto;
  padding-top: 10px;
}
.passwordIcon {
  width: 20px;
  float: left;
  margin: 13px 10px;
}
.passwordInput {
  float: left;
  width: 82%;
}
.loginBtnDiv {
  width: 76%;
  margin: 0 auto;
  padding-top: 36px;
}
.loginBtnInput {
  background-color: #f73b09;
  /* padding: 10px 0; */
  width: 100%;
  height: 54px;
  border-radius: 2px;
}
.loginBottom {
  width: 100%;
  height: 36px;
  position: fixed;
  bottom: 0;
}
.bottomVersion {
  width: 50%;
  margin: 0 auto;
  height: 100%;
}
.cnabsLogo {
  float: left;
  width: 8%;
  padding-top: 2px;
  margin-right: 6px;
}
.versionInfo {
  float: left;
  width: 84%;
}
.moreOpration {
  width: 76%;
  margin: 0 auto;
  color: #666666;
  padding-top: 36px;
}
</style>

<script>
import "mint-ui/lib/style.css";
import "@/public/css/theme.css";
import axios from "axios";
import * as webApi from "@/config/api";
import AbsRouter from "@/router/abs";

export default {
  name: "login",
  data() {
    return {
      Username: "",
      Password: "",
      errorMsg:"",
    };
  },
  methods: {
    submit: function() {
      var self = this;
      axios({
        url: webApi.Login.login,
        method: "post",
        params: {
          UserName: self.Username,
          Password: self.Password
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: false
      })
        .then(response => {
          if (response.data == 1) {
             location.href = "abs.html";
          }
          else{
            this.errorMsg=response.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
  }
};
</script>