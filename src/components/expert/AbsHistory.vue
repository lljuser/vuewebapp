<template>
    <div id="projectHistoryABSContent" class="projectHistoryABSContent ep_font32" v-cloak>
        <div class="ep_marginTop24"></div>
        <div class="ep_content_div">
            <div class="ep_part_item ep_part_item_border ep_overhide" style="overflow:visible;">
                <span class="fl ep_color_grey">产品名称</span>
                <span class="fl ep_marginTop5 ep_color_grey ep_marginLeft10">*</span>
                <div class="fr ui fluid category search ep_divSearch">
                    <div class="ui icon fl ep_divSearchInput">
                        <input class="prompt ep_searchInput" v-bind:disabled="projectHistory.Id !== undefined" type="text" name="dealName" v-model="projectHistory.DealName" />
                        <i class="search icon"></i>
                    </div>
                    <div class="clearBoth"></div>
                    <div class="results ep_comResults"></div>
                </div>
            </div>
            <div class="clearBoth"></div>
            <div class="ep_part_item_border ep_font32">
                <div class="ep_part_item  ep_overhide">
                    <span class="fl ep_color_grey">参与角色</span>
                    <span class="fl ep_marginTop5 ep_color_grey ep_marginLeft10">*</span>
                    <select class="ep_select fr ep_font32 organizationRoleSelect" type="text" v-model="organizationRoleModel">
                        <option disabled value="">请选择</option>
                        <option v-for="item in editingOrganizationRoles" v-bind:value="item.Id" v-bind:key="item.Id">{{item.Role}}</option>
                    </select>
                </div>
                <div v-show="organizationRoleModel===24" class="ep_overhide ep_font32 ep_paddingLeft30 ep_paddingright30">
                    <input class="fl ep_input ep_multipleItem ep_width440 ep_font32 ep_heightAuto" type="text" placeholder="请输入" v-model="customizedOrganizationRole" />
                    <span class="fr ep_saveBtn ep_width176 ep_marginRight0" v-on:click="addcustomizedRole(organizationRoleModel)">添加</span>
                </div>
                <div v-if="!util.isArrayEmpty(projectHistory.OrganizationRoles)">
                    <div class="ep_multipleItem" v-for="(item,index) in projectHistory.OrganizationRoles" v-bind:key="item.IsCustomizedOrganizationRole" v-bind:class="[index===projectHistory.OrganizationRoles.length-1?'ep_marginBottom30':'ep_marginBottom20']">
                        <span class="fl">{{organizationRoleDisplay(item)}}</span>
                        <span class="fr ep_font24 ep_deleteBtn" v-on:click="deleteOrganizationRole(item)">×</span>
                    </div>
                </div>
            </div>
            <div class="ep_part_item ep_font32 ep_overhide ep_part_item_border">
                <span class="fl ep_color_grey">个人职责</span>
                <span class="fl ep_marginTop5 ep_color_grey ep_marginLeft10">*</span>
                <select class="ep_select fr ep_font32 ep_align_right personalRoleSelect" type="text" v-model="personalResponsibilityModel">
                    <option disabled value="">请选择</option>
                    <option v-for="item in personalResponsibilities" v-bind:value="item.Id" v-bind:key="item.Name">{{item.Name}}</option>
                </select>
            </div>
            <div class="ep_errorTips ep_color_red ep_font24 ep_overhide" v-show="isShowError" v-bind:class="[isShowError?'ep_paddingTop60':'']">
                <span class="fl ep_marginTop5">*</span>
                <span class="fl  ep_marginLeft10">{{errorMessage}}</span>
            </div>
            <div class="ep_overhide ep_btnGroup">
                <span class="ep_saveBtn fl" v-on:click="saveProjectHistoryABS">保存</span>
                <span v-if="queryString.id === undefined" class="ep_cancelBtn fr">
                    <router-link to="/">
                        取消
                    </router-link>
                    <!-- <a href="/expert/expertuser/editProfile#projectHistoryABS" class="ep_color_orange">取消</a> -->
                </span>
                <span v-else class="ep_removeBtn fr" v-on:click="removePopupVisible=true">删除本条</span>
            </div>
            <div class="ep_paddingLeft30 ep_color_grey ep_font24">
                如果找不到您的ABS项目，请与我们联系：021-31156258
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
import $ from "jquery";
//import jQuery from 'jquery';
//import '@/public/modules/expert/flexible';
import util from "@/public/modules/expert/utils";
// import '@/scripts/expert/api.min.js';
// import '@/scripts/expert/search.min.js';
import "@/public/css/expert/reset.css";
import "@/public/css/expert/editProfile.css";
import "@/public/css/expert/search.css";

export default {
  name: "AbsHistory",
  data: function() {
    return {
      isShowError: false,
      errorMessage: "",
      queryString: "", //GetRequest(),
      projectHistory: {},
      personalResponsibilityModel: "",
      organizationRoleModel: "",
      removePopupVisible: false,
      organizationRoles: [],
      personalResponsibilities: [],
      customizedOrganizationRole: "",
      submitPopupVisible: false,
      util: {}
    };
  },
  mounted: function() {
    this.util = util;
    this.initData();
  },
  updated: function() {
    var self = this;

    $(".ui.search").search({
      apiSettings: {
        url: "http://10.1.3.60:43400/Search/AbsDealSearch/?keyword={query}"
      },
      searchDelay: 500,
      fields: {
        results: "Deals",
        title: "DealName",
        description: "DealFullName"
      },
      cache: false,
      maxResults: 10,
      onSelect: function(result, response) {
        self.projectHistory.DealId = result.DealId;
        self.projectHistory.DealName = result.DealName;
      }
    });
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
        Vue.set(this.projectHistory, "OrganizationRoles", []);
      }

      $.each(this.organizationRoles, function(index, item) {
        if (item.Id === roleId) {
          self.projectHistory.OrganizationRoles.push({
            CustomizedOrganizationRole: null,
            IsCustomizedOrganizationRole: false,
            OrganizationRole: item.Role,
            OrganizationRoleId: item.Id
          });
        }
      });

      this.organizationRoleModel = "";
    },
    personalResponsibilityModel: function(id) {
      var self = this;

      $.each(this.personalResponsibilities, function(index, item) {
        if (item.Id === id) {
          self.projectHistory.PersonalResponsibility = item;
          return false;
        }
      });
    }
  },
  computed: {
    editingOrganizationRoles: function() {
      var temp = $.extend(true, [], this.organizationRoles);

      if (util.isArrayEmpty(this.projectHistory.OrganizationRoles)) return temp;

      var self = this;
      $.each(this.projectHistory.OrganizationRoles, function(i, item) {
        if (item.OrganizationRole !== "其它") {
          var index = self.findOrganizationRoleIndex(temp, item);
          temp.splice(index, 1);
        }
      });

      return temp;
    }
  },
  methods: {
    initData: function() {
      //TODO fetch organization roles and personal responsibility
      this.organizationRoles = [
        { Id: 19, Role: "财务顾问" },
        { Id: 11, Role: "差额支付承诺人" },
        { Id: 1, Role: "承销商" },
        { Id: 12, Role: "担保人" },
        { Id: 6, Role: "发起机构" },
        { Id: 4, Role: "发行人" },
        { Id: 8, Role: "会计师事务所" },
        { Id: 2, Role: "计划管理人" },
        { Id: 14, Role: "监管银行" },
        { Id: 9, Role: "律师事务所" },
        { Id: 26, Role: "评估机构" },
        { Id: 10, Role: "评级机构" },
        { Id: 5, Role: "受托机构" },
        { Id: 20, Role: "税务顾问" },
        { Id: 25, Role: "投资者" },
        { Id: 13, Role: "托管机构" },
        { Id: 23, Role: "委托机构" },
        { Id: 17, Role: "项目安排人" },
        { Id: 3, Role: "原始权益人" },
        { Id: 7, Role: "资产服务机构" },
        { Id: 15, Role: "资金保管机构" },
        { Id: 24, Role: "其它" }
      ];
      this.personalResponsibilities = [
        { Id: 1, Name: "部门负责人" },
        { Id: 2, Name: "项目负责人" },
        { Id: 3, Name: "项目参与人" },
        { Id: 4, Name: "机构负责人" }
      ];
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
      this.arrayRemoveItem(this.projectHistory.OrganizationRoles, item);
    },
    findOrganizationRoleIndex: function(arr, item) {
      var itemIndex = -1;

      $.each(arr, function(index, role) {
        if (role.Id === item.OrganizationRoleId) {
          itemIndex = index;
          return false;
        }
      });

      return itemIndex;
    },
    arrayRemoveItem: function(arr, item) {
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
        appFrame.ajax("/expert/ExpertInfo/AddAbsProject", {
          data: {
            DealId: self.projectHistory.DealId,
            DealName: self.projectHistory.DealName,
            OrganizationRoles: self.projectHistory.OrganizationRoles,
            PersonalResponsibility: self.projectHistory.PersonalResponsibility
          },
          success: function(res) {
            if (res.status === "ok") {
              window.location.href =
                "/expert/expertuser/editProfile#projectHistoryABS";
            }
            //TODO - server error tip
            if (res.status === "fail") {
              self.submitPopupVisible = false;
              self.isShowError = true;
              self.errorMessage = res.data;
            }
          }
        });

        return;
      }

      appFrame.ajax("/expert/ExpertInfo/UpdateAbsProject", {
        data: {
          Id: self.projectHistory.Id,
          DealId: self.projectHistory.DealId,
          DealName: self.projectHistory.DealName,
          OrganizationRoles: self.projectHistory.OrganizationRoles,
          PersonalResponsibility: self.projectHistory.PersonalResponsibility
        },
        success: function(res) {
          if (res.status === "ok") {
            window.location.href =
              "/expert/expertuser/editProfile#projectHistoryABS";
          }
          //TODO - server error tip
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

      if (this.projectHistory.Id === undefined) return;

      appFrame.ajax("/expert/ExpertInfo/DeleteAbsProject", {
        data: {
          id: this.projectHistory.Id,
          dealId: this.projectHistory.DealId
        },
        success: function(res) {
          if (res.status === "ok") {
            window.location.href =
              "/expert/expertuser/editProfile#projectHistoryABS";
          }
          //TODO - server error tip
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
