<template>
    <div class="divAutocomplete">
        <div class="fl">
        <autocomplete :initValue="dealName" :classes="{ input: 'ep_align_right ep_input ep_font32'}" ref="deal" :onFocus="focusCallBack" :onSelect="getData" :process="processJSON" label="DealFullName" anchor="DealName" v-bind:url="dealSearch" :debounce="250" param="keyword" placeholder="请输入产品名称">
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
  name: 'DealSearch',
  components: { Autocomplete },
  data: function () {
    return {
        dealSearch: webApi.Expert.dealSearch,
        dealName: '',
    }
  },
  created: function () {
      this.dealName = this.$route.params.dealName;
  },
  methods: {
    processJSON: function (json) {
        return json.Deals;
    },
    isValidElement: function (item) {
        return !(item === null || item === undefined || item === "");
    },
    // 处理focus的时候触发autocomplete
    focusCallBack: function () {
        if (!this.isValidElement(this.dealName)) return;

        axios.post(webApi.Expert.dealSearch, {keyword: this.dealName}).then(response => {
            this.$refs.deal.showList = true;
            this.$refs.deal.json = response.data.Deals;
        });
    },
    getData: function (obj) {
        const deal = {
            DealId: obj.DealId,
            DealName: obj.DealName,
        };

        if (this.isValidElement(this.$route.params.absHistoryId)) {
            this.$router.push({name: 'AbsHistory', params: {
                  id: this.$route.params.absHistoryId,
                  Deal: deal
                }
            });
            return;
        }

        this.$router.push({name: 'AbsHistory', params: { Deal: deal }});
    },
    cancel: function () {
        this.$router.go(-1);
    }
  },
  watch: {
      dealName: function (model) {
          this.focusCallBack();
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
        width: 7.5rem;
        margin-left: 0.32rem;
        background:#fff;
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
