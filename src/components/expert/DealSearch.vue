<template>
    <autocomplete :classes="{ input: 'ep_align_right ep_input fr ep_font32', list: 'data-list', item: 'ep_font32'}" ref="absHistoryItem" :onFocus="focusCallBack" :onSelect="getData" :process="processJSON" label="DealFullName" anchor="DealName" v-bind:url="dealSearch" :debounce="250" param="keyword" placeholder="请输入产品名称">
    </autocomplete>
</template>

<script>
import axios from "axios";
import * as webApi from "@/config/api";
import Autocomplete from 'vue2-autocomplete-js';
import 'vue2-autocomplete-js/dist/style/vue2-autocomplete.css';

export default {
  name: 'DealSearch',
  data: function () {
    return {
        
    }
  },
}
</script>

<style>

</style>
