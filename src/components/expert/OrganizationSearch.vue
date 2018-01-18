<template>
  <div class="divAutocomplete">
        <div class="fl">
        <autocomplete :initValue="orgName" :classes="{ input: 'ep_align_right ep_input ep_font32 appH5_search_input'}" ref="organization" :onFocus="focusCallBack" :onSelect="getData" :process="processJSON" label="FullName" anchor="ShortName" v-bind:url="orgSearch" :debounce="250" param="keyword" placeholder="请输入机构名称">
        </autocomplete>
        </div>
        <span class="fr ep_font30 cancelBtn" v-on:click="cancel">取消</span>
   </div>
</template>

<script>
import axios from "axios";
import * as webApi from "@/config/api";
import Autocomplete from 'vue2-autocomplete-js';
import 'vue2-autocomplete-js/dist/style/vue2-autocomplete.css';

export default {
  name: 'OrganizationSearch',
  components: { Autocomplete },
  data: function () {
    return {
        orgSearch: webApi.Expert.orgSearch,
        orgName: '',
    }
  },
  created: function () {
      this.orgName = this.$route.params.orgName;
  },
  methods: {
    processJSON: function (json) {
        return json.Organizations;
    },
    isValidElement: function (item) {
        return !(item === null || item === undefined || item === "");
    },
    // 处理focus的时候触发autocomplete
    focusCallBack: function (e) {
        if (this.isValidElement(e)) {
            this.orgName = e.target.value;
        }

        if (!this.isValidElement(this.orgName)) return;

        axios.post(webApi.Expert.orgSearch, {keyword: this.orgName}).then(response => {
            this.$refs.organization.showList = true;
            this.$refs.organization.json = response.data.Organizations;
        });
    },
    getData: function (obj) {
        const organization = {
            OrganizationName: obj.FullName,
            OrganizationId: obj.Id,
        };

        if (this.isValidElement(this.$route.params.workHistoryId)) {
            this.$router.push({name: 'WorkHistory', params: {
                  id: this.$route.params.workHistoryId,
                  Organization: organization
                }
            });
            return;
        }

        this.$router.push({name: 'WorkHistory', params: { Organization: organization }});
    },
    cancel: function () {
        this.$router.go(-1);
    }
  }
}
</script>

<style>
    body{
        background:#2a2b29;
        font-family: "Microsoft YaHei","\5FAE\8F6F\96C5\9ED1","SimSun","\5B8B\4F53","arial"!important;
    }
    .divAutocomplete{
        background:#2a2b29;
        height:100%;
        padding-right: 0.32rem;
    }
    .divAutocomplete .cancelBtn{
        padding-top: 0.32rem;
        font-size: 17px;
    }
    .divAutocomplete .ep_input{
        width: 7rem;
        margin-left: 0.32rem;
        background-color: #fff;
        color:black;
    }
    .autocomplete-list ul{
        width:10rem;
        margin-top:0px;
        background:#2a2b29;
    }
    .autocomplete ul:before{
        border-bottom: 10px solid transparent;
    }
    .autocomplete ul li a{
        background:#2a2b29;
        border: 1px solid #535353;
        color:#fff;
        font-size: 15px;
    }
    .autocomplete ul li a span, .autocomplete ul li a .autocomplete-anchor-label{
        color:#ccc;
        font-size: 13px;
    }
</style>
