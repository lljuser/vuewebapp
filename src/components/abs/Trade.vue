<template>
<div class="appH5_body">              
<div class="appH5_panel">
  <table class="trade_select_div" cellspacing="0"  cellpadding="0">
     <tr>
       <td class="text-left">
        <select v-model="TradeRating" v-on:change="selectChange()">
        <option value="0">评级</option>
        <option v-for="item in ratingList"
        :value="item.Key"
        :key="item.Value">{{item.Value}}</option>
        </select>
        </td>
       <td style="text-align:center">
         <select v-model="TradeType" v-on:change="selectChange()">
          <option value="0">证券类型</option>
          <option v-for="item in typeList"
          :value="item.Key"
          :key="item.Value">{{item.Value}}</option>
        </select>
        </td>
       <td class="text-right"> 
         <select v-model="TradeWalbuck" v-on:change="selectChange()">
          <option value="0">期限</option>
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

  <div v-else>
  <table id="tradeTableId" class="appH5_table" style="table-layout:fixed;">
    <tr>
      <th>证券简称</th>
      <th class="text-right">金额(亿)</th>
      <th class="text-center">评级</th>
      <th class="text-right">期限(Y)</th>
      <th class="text-right">利率(%)</th>
    </tr>
        <TradeItem 
          v-for="item in list" 
          :item="item"
          :key="item.Id"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-immediate-check="true"
          infinite-scroll-distance="55"/>    
  </table>
 </div>
</div>    
</div>
</template>
<script>
import BusUtil from './BusUtil';
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
      loading: false,
      TradeRating:"0",
      TradeType:"0",
      TradeWalbuck:"0",
      page: 1,
      pageSize:15,
      direction:0,
      isTradeLoading:false,
      isComponentActive :false,
      isFetchTradesError:false,
    };
  },
   activated() {
    this.loading = false;     
    const busUtil = BusUtil.getInstance();
    busUtil.bus.$emit('showHeader', false);
    if (this.isFetchTradesError) {
      this.loadFirstPageTrades();
    }    
  },
  mounted(){
    this.isTradeLoading = true;
    this.isComponentActive = true;
    setTimeout(() => {
      this.loadFirstPageTrades();
      this.loadSelectOptions();
    }, 600);
  },
  deactivated(){
    //防止其他组件滚动时，此组件调用loadMore方法
    this.loading=true;
  },
  methods:{ 
    loadSelectOptions(){
      this.getWalbuckList(data=>{
        this.walbuckList = data;
      });
      this.getTypeList(data=>{
        this.typeList=data;
      });
      this.getRatingList(data=>{
        this.ratingList=data;
      });
    },
    loadFirstPageTrades(){
      this.fetchTrades(1,0, data => {
        this.list = data;
        this.isTradeLoading = false;
      });
    },  
    fetchTrades(page, direction,callback) {
      var url=webApi.Trade.list;
      url=url+"/"+this.TradeRating+"/"+this.TradeType+"/"+this.TradeWalbuck;
      url=url+"/"+direction+"/"+page*this.pageSize+"/"+this.pageSize;
      axios.post(url).then((response) => { 
        const data = response.data.data;
        if(data){
          callback(data);
        }
      }).catch((error)=>{    
        Toast('数据获取失败');    
        this.loading = false;
        this.isTradeLoading=false;
        this.isFetchTradesError=true;
      });    
    },
    loadMore(){
      this.loading = true;
      setTimeout(() => {
        this.fetchTrades(this.page, 1,data => {
          this.list = this.list.concat(data);
          this.page = this.page + 1;
          this.loading = false;
        });
      }, 300);
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
      });
    },
    getRatingList(callback){
      axios.post(webApi.Trade.ratingList).then((response) => { 
        const data=response.data.data;        
        if(data && data.length > 0 ){
          callback(data);          
        }
      });
    },
    selectChange(){
      this.isTradeLoading = true;
      this.isComponentActive = true;
      setTimeout(() => {
        this.fetchTrades(0, 1,data => {
          this.list = data;
          this.isTradeLoading = false;
        });
      }, 500);
    },
  },
  components: {
    TradeItem,
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
#tradeTableId th:nth-of-type(2){
width: 18%;
}
#tradeTableId th:nth-of-type(3){
width: 15%;
}
#tradeTableId th:nth-of-type(4){
width: 18%;
}
#tradeTableId th:nth-of-type(5){
width: 20%;
}
</style>
