<template>
    <div id="projectHistoryABSContent" class="projectHistoryABSContent ep_font32" v-cloak>
        <div class="ep_marginTop24"></div>
        <div class="ep_content_div">
            <div class="ep_part_item ep_part_item_border ep_overhide" style="overflow:visible;">
                <div class="ep_title_div">
                  <span>产品名称</span>
                  <span class="ep_marginLeft10 ep_marginTop5">*</span>
                </div>
                <autocomplete :classes="{ input: 'searchInput'}" className="searchInput" ref="absHistoryItem" :onFocus="focusCallBack" :onSelect="getData" :process="processJSON" label="DealFullName" anchor="DealName" v-bind:url="dealSearch" :debounce="250" param="keyword" placeholder="请输入产品名称">
                </autocomplete>
            </div>
            <div class="clearBoth"></div>
            <div class="ep_part_item_border ep_font32">
                <div class="ep_part_item  ep_overhide">
                    <div class="ep_title_div">
                      <span>参与角色</span>
                      <span class="ep_marginLeft10 ep_marginTop5">*</span>
                    </div>
                    <select v-bind:class="organizationRoleModel === '' ?'ep_color_grey':'ep_color_white' " class="ep_select fl ep_font32 organizationRoleSelect" type="text" v-model="organizationRoleModel">
                        <option disabled value="">请选择参与角色</option>
                        <option v-for="(item, index) in editingOrganizationRoles" v-bind:value="item.Id" v-bind:key="index">{{item.Role}}</option>
                    </select>
                </div>
            </div>
              <div v-if="!util.isArrayEmpty(projectHistory.OrganizationRoles)" class="ep_part_item_border ep_font32 ep_paddingBottom10 ">
                  <div class="ep_overhide">
                    <div class="ep_font28 delete-Label ep_marginLeft15 ep_marginTop10" v-for="(item, index) in projectHistory.OrganizationRoles" v-bind:key="index">
                    <span>{{organizationRoleDisplay(item)}}</span>
                    <img class="followImg" src="../../public/image/deleteicon.png"  v-on:click="deleteOrganizationRole(item)" />
                  </div>
              </div>
            </div>
            <div class="clearBoth"></div>
            <div class="ep_part_item ep_font32 ep_overhide ep_part_item_border">
                <div class="ep_title_div">
                   <span>个人职责</span>
                    <span class="ep_marginTop5 ep_marginLeft10">*</span>
                </div>
                <select v-bind:class="personalResponsibilityModel === '' ?'ep_color_grey':'ep_color_white' " class="ep_select fl ep_font32  personalRoleSelect" type="text" v-model="personalResponsibilityModel">
                    <option disabled value="">请选择个人职责</option>
                    <option v-for="(item, index) in personalResponsibilities" v-bind:value="item.Id" v-bind:key="index">{{item.Name}}</option>
                </select>
            </div>
            <div class="ep_errorTips ep_color_red ep_font24 ep_overhide" v-show="isShowError" v-bind:class="[isShowError?'ep_paddingTop60':'']">
                <span class="fl ep_marginTop5">*</span>
                <span class="fl  ep_marginLeft10">{{errorMessage}}</span>
            </div>
            <div class="ep_overhide ep_btnGroup">
                <span class="ep_saveBtn fl" v-on:click="saveProjectHistoryABS">保存</span>
                <span class="ep_cancelBtn fr">
                    <router-link to="/EditProfile">
                        取消
                    </router-link>
                </span>
                <span v-if="util.isValidElement(id)" class="ep_removeBtn fl" v-on:click="removePopupVisible=true">删除本条信息</span>
            </div>
            <div class="ep_paddingLeft30 ep_color_grey ep_font24">
                如果找不到您的ABS项目，请与我们联系：021-31156258
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
import Autocomplete from 'vue2-autocomplete-js';
import 'vue2-autocomplete-js/dist/style/vue2-autocomplete.css';

import util from "@/public/modules/expert/utils";

export default {
  name: "AbsHistory",
  components: { Autocomplete },
  data: function() {
    return {
      isShowError: false,
      errorMessage: "",
      projectHistory: {},
      personalResponsibilityModel: "",
      organizationRoleModel: "",
      removePopupVisible: false,
      organizationRoles: [],
      personalResponsibilities: [],
      customizedOrganizationRole: "",
      submitPopupVisible: false,
      util: {},
      id: null,
      dealSearch: null,
    };
  },
  created: function() {
    this.util = util;
    this.id = this.$route.params.id;
    this.dealSearch = webApi.Expert.dealSearch;
    this.initData();
  },
  watch: {
    organizationRoleModel: function(roleId) {
      if (roleId === "" || roleId === 24) return;

      if (
        this.projectHistory.OrganizationRoles &&
        this.projectHistory.OrganizationRoles.length >= 3
      ) {
        this.organizationRoleModel = "";
        this.$toast("参与角色不能超过三个!");
        return;
      }

      var self = this;

      if (self.projectHistory.OrganizationRoles === undefined) {
        //Vue.set(this.projectHistory, "OrganizationRoles", []);
        this.projectHistory.OrganizationRoles = [];
      }

      for (let item of this.organizationRoles) {
          if (item.Id === roleId) {
              self.projectHistory.OrganizationRoles.push({
                  CustomizedOrganizationRole: null,
                  IsCustomizedOrganizationRole: false,
                  OrganizationRole: item.Role,
                  OrganizationRoleId: item.Id
              });
          }
      }

      this.organizationRoleModel = "";
    },
    personalResponsibilityModel: function(id) {
      var self = this;

      for (let item of this.personalResponsibilities) {
          if (item.Id === id) {
              this.projectHistory.PersonalResponsibility = item;
          }
      }
    }
  },
  computed: {
    editingOrganizationRoles: function() {
      var temp = this.organizationRoles.concat();

      if (util.isArrayEmpty(this.projectHistory.OrganizationRoles)) return temp;

      var self = this;
      for (let item of this.projectHistory.OrganizationRoles) {
          if (item.OrganizationRole !== "其它") {
              var index = self.findOrganizationRoleIndex(temp, item);

              temp.splice(index, 1);
          }
      }

      return temp;
    }
  },
  methods: {
    initData: function() {
      axios.post(webApi.Expert.getOrganizationRolesAndResponsibilities).then(response => {
          this.organizationRoles = response.data.data.OrganizationRoles;
          this.personalResponsibilities = response.data.data.PersonalResponsibilities;
      });

      if (util.isValidElement(this.id) && !isNaN(this.id)) {
          axios.post(webApi.Expert.getAbsProject, {id: this.id}).then(response => {
              this.projectHistory = response.data.data;
              this.personalResponsibilityModel = this.projectHistory.PersonalResponsibility.Id;
              this.$refs.absHistoryItem.setValue(this.projectHistory.DealName);
          });
      }
    },
    addcustomizedRole: function(roleId) {
      if (
        this.projectHistory.OrganizationRoles &&
        this.projectHistory.OrganizationRoles.length >= 3
      ) {
        this.organizationRoleModel = "";
        this.$toast("参与角色不能超过三个!");
        return;
      }

      var self = this;
      if (self.projectHistory.OrganizationRoles === undefined) {
        Vue.set(this.projectHistory, "OrganizationRoles", []);
      }

      self.projectHistory.OrganizationRoles.push({
        CustomizedOrganizationRole: self.customizedOrganizationRole,
        IsCustomizedOrganizationRole: true,
        OrganizationRole: "其它",
        OrganizationRoleId: roleId
      });
      this.customizedOrganizationRole = "";
      this.organizationRoleModel = "";
    },
    deleteOrganizationRole: function(item) {
        console.log(item);
      this.arrayRemoveItem(this.projectHistory.OrganizationRoles, item);
    },
    findOrganizationRoleIndex: function(arr, item) {
      var itemIndex = -1;

      arr.forEach((role, index) => {
          if (role.Id === item.OrganizationRoleId) {
              itemIndex = index;
              return false;
          }
      });

      return itemIndex;
    },
    arrayRemoveItem: function(arr, item) {
        console.log(arr);
      var index = arr.indexOf(item);
      arr.splice(index, 1);

      return arr;
    },
    organizationRoleDisplay: function(item) {
      return item.IsCustomizedOrganizationRole
        ? item.OrganizationRole + "(" + item.CustomizedOrganizationRole + ")"
        : item.OrganizationRole;
    },
    saveProjectHistoryABS: function() {
      //front-end params check
      if (!util.isValidElement(this.projectHistory.DealName)) {
        this.isShowError = true;
        this.errorMessage = "产品名称不能为空，请选择产品!";
        return;
      }

      if (!util.isValidId(this.projectHistory.DealId)) {
        this.isShowError = true;
        this.errorMessage = "填写的产品信息有误，请重新选择产品!";
        return;
      }

      if (util.isArrayEmpty(this.projectHistory.OrganizationRoles)) {
        this.isShowError = true;
        this.errorMessage = "请选择参与角色!";
        return;
      }

      if (
        this.projectHistory.PersonalResponsibility === undefined ||
        this.projectHistory.PersonalResponsibility === null
      ) {
        this.isShowError = true;
        this.errorMessage = "请选择个人职责!";
        return;
      }

      var self = this;
      this.submitPopupVisible = true;
      //添加项目经历
      if (this.projectHistory.Id === undefined) {
        axios.post(webApi.Expert.addAbsProject, { 
            DealId: this.projectHistory.DealId,
            DealName: this.projectHistory.DealName,
            OrganizationRoles: this.projectHistory.OrganizationRoles,
            PersonalResponsibility: this.projectHistory.PersonalResponsibility
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

      axios.post(webApi.Expert.updateAbsProject, { 
        Id: this.projectHistory.Id,
        DealId: this.projectHistory.DealId,
        DealName: this.projectHistory.DealName,
        OrganizationRoles: this.projectHistory.OrganizationRoles,
        PersonalResponsibility: this.projectHistory.PersonalResponsibility
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
    removeContent: function() {
      this.removePopupVisible = false;

      if (this.projectHistory.Id === undefined) return;

      axios.post(webApi.Expert.deleteAbsProject, { 
          id: this.projectHistory.Id,
          dealId: this.projectHistory.DealId
      }).then(response => {
          if (response.data.status === 'fail') {
              this.isShowError = true;
              this.errorMessage = response.data.data;
              return;
          }

          this.$router.go(-1);
      });
    },
    processJSON: function (json) {
        return json.Deals;
    },
    // 处理focus的时候不触发autocomplete
    focusCallBack: function (e) {
        if (!util.isValidElement(e.target.value)) return;

        axios.post(webApi.Expert.dealSearch, {keyword: e.target.value}).then(response => {
            this.$refs.absHistoryItem.showList = true;
            this.$refs.absHistoryItem.json = response.data.Deals;
        });
    },
    getData: function (obj) {
        console.log(obj);
      this.projectHistory.DealId = obj.DealId;
      this.projectHistory.DealName = obj.DealName;
    }
  }
};
</script>

<style>
    .searchInput {
        background-color: #2b2a29;
        width: 5.8rem;
    }
</style>
