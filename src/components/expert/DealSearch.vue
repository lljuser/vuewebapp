<template>
    <div>
        <autocomplete :initValue="dealName" :classes="{ input: 'ep_align_right ep_input ep_font32'}" ref="deal" :onFocus="focusCallBack" :onSelect="getData" :process="processJSON" label="DealFullName" anchor="DealName" v-bind:url="dealSearch" :debounce="250" param="keyword" placeholder="请输入产品名称">
        </autocomplete>
        <span>取消</span>
    </div>
</template>

<script>
import axios from "axios";
import * as webApi from "@/config/api";
import Autocomplete from 'vue2-autocomplete-js';
import 'vue2-autocomplete-js/dist/style/vue2-autocomplete.css';
import BusUtil from '../abs/BusUtil';

export default {
  name: 'DealSearch',
  components: { Autocomplete },
  data: function () {
    return {
        dealSearch: null,
        dealName: '',
        deal: {},
        searchResults: []
    }
  },
  created: function () {
      this.dealSearch = webApi.Expert.dealSearch;
      this.dealName = this.$route.params.dealName;
      console.log(this.$refs.deal);
  },
  methods: {
    processJSON: function (json) {
        return json.Deals;
    },
    isValidElement: function (item) {
        return !(item === null || item === undefined || item === "");
    },
    // 处理focus的时候不触发autocomplete
    focusCallBack: function (e) {
        if (!this.isValidElement(e.target.value)) return;
        console.log(this.$refs.deal);

        axios.post(webApi.Expert.dealSearch, {keyword: e.target.value}).then(response => {
            this.$refs.deal.showList = true;
            this.$refs.deal.json = response.data.Deals;
        });
    },
    getData: function (obj) {
      BusUtil.getInstance().bus.$emit('dealSelect', {
          DealId: obj.DealId,
          DealName: obj.DealName
      });

      this.$router.push({name: 'AbsHistory'});
    }
  },
  updated: function () {
      console.log("test");
      console.log($refs.deal);
  },
  watch: {
      '$refs.deal': function (obj) {
          console.log("test");

      }
  }
}
</script>

<style>

</style>
