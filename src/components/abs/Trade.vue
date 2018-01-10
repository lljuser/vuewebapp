<template>
<div class="appH5_body">              
<div class="appH5_panel">
  <table class="trade_select_div">
     <tr>
       <td class="text-left">
        <select v-model="TradeRating" v-on:change="selectChange()">
        <option>评级</option>
        <option v-for="item in ratingList"
        :value="item.Key"
        :key="item.Value">{{item.Value}}</option>
        </select>
        </td>
       <td style="text-align:center">
         <select v-model="TradeType" v-on:change="selectChange()">
          <option>证券类型</option>
          <option v-for="item in typeList"
          :value="item.Key"
          :key="item.Value">{{item.Value}}</option>
        </select>
        </td>
       <td class="text-right"> 
         <select v-model="TradeWalbuck" v-on:change="selectChange()">
          <option>期限</option>
          <option v-for="item in walbuckList" 
          :value="item.Key" 
          :key="item.Value">{{item.Value}}</option> 
          </select>
        </td>
    </tr>    
  </table>

    <div class="product-spinner" v-if="isTradeLoading">
      <mt-spinner type="triple-bounce"></mt-spinner>
    </div>

  <table id="tradeTableId" class="appH5_table" style="table-layout:fixed;">
    <tr>
      <th>证券简称</th>
      <th class="text-right">金额(亿)</th>
      <th class="text-center">评级</th>
      <th class="text-right">期限(年)</th>
      <th class="text-right">利率(%)</th>
    </tr>
        <TradeItem 
          v-for="item in list" 
          :item="item"
          :key="item"/>    
  </table>
</div>    
</div>
</template>
<script>
import * as webApi from '@/config/api';
import TradeItem from "./TradeItem";
import axios from 'axios';  

export default {
  name: "trade",
  data() {
    return {
      list: [],
      walbuckList:[],
      typeList:[],
      ratingList:[],
      TradeRating:"0",
      TradeType:"0",
      TradeWalbuck:"0",
      page: 1,
      isTradeLoading:false
    };
  },
  created(){
    this.fetchTrades(1, data => {
      this.list = data;
      this.page = this.page + 1;
    });
    this.getWalbuckList(data=>{
      this.walbuckList = data;
    });
    this.getTypeList(data=>{
      this.typeList=data;
    });
    this.getRatingList(data=>{
      this.ratingList=data;
    })    
  },
  mounted(){
    this.isTradeLoading = true;
    setTimeout(() => {
      this.fetchTrades(1, data => {
        this.list = data;
        this.page = this.page + 1;
        this.isTradeLoading = false;
      });
    }, 600);    
  },
  methods:{
    fetchTrades(page, callback) {
      var url=webApi.Trade.list;
      url=url+"/"+this.TradeRating+"/"+this.TradeType+"/"+this.TradeWalbuck;
      axios.post(url).then((response) => { 
        const data = response.data.data;
        if (data && data.length > 0) {
          callback(data);
        }
      });    
   },
   getWalbuckList(callback){ 
      axios.post(webApi.Trade.walbuckList).then((response) => { 
        const data = response.data.data;
        if(data && data.length > 0){
          callback(data);
        }
      });
   },
   getTypeList(callback){
      axios.post(webApi.Trade.typeList).then((response) => { 
        const data=response.data.data;
        if(data && data.length > 0 ){
          callback(data);          
        }
      })
   },
   getRatingList(callback){
      axios.post(webApi.Trade.ratingList).then((response) => { 
        const data=response.data.data;        
        if(data && data.length > 0 ){
          callback(data);          
        }
      })     
   },
    selectChange(){
      this.isTradeLoading = true;
      setTimeout(() => {
        this.fetchTrades(0, 0,data => {
          this.list = data;
          this.isTradeLoading = false;
        });
      }, 500);
    }      
 },
    components: {
    TradeItem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #ffc446;
}
.trade_select_div select{
  min-width: 2.6rem;
}
.trade_select_div {
  display: table;
  width: 100%;
  margin-top:-6px;
  margin-bottom: 12px;
}

.trade_select_div {
  table-layout: fixed;
  width: 100%;
  margin: 0 0 12px 0;
  line-height: 0;
}

.trade_select_div div {
   width:33%;
   float: left;
}

.trade_select_div div:last-child {
    width:34%;
    text-align: right;
}

.trade_select_div select {
  width:90%;
  border-radius: 0;
}
</style>
