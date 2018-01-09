<template>
<div class="appH5_body">              
<div class="appH5_panel">
  <table class="trade_select_div">
     <tr>
       <td class="text-left">
        <select>
        <option>评级</option>
        <option>评级</option>
        <option>评级</option>
        <option>评级</option>
        </select>
        </td>
       <td style="text-align:center">
         <select>
          <option>证券类型</option>
          <option>证券类型</option>
          <option>证券类型</option>
          <option>证券类型</option>
        </select>
        </td>
       <td class="text-right"> 
         <select>
          <option>期限</option>
          <option>期限</option>
          <option>期限</option>
          <option>期限</option>
          </select>
        </td>
    </tr>    
  </table>
  <table id="tradeTableId" class="appH5_table">
    <tr>
      <th>证券简称</th>
      <th>总额(亿)</th>
      <th>评级</th>
      <th>期限(年)</th>
      <th>利率(%)</th>
    </tr>
    <tr>
      <td>
        <router-link :to="`tradedetail`" class="appH5_color_link" style=""  >
        17逸锟1A1
        </router-link>
      </td>
      <td>40.00</td>
      <td>AAA</td>
      <td>0.65</td>
      <td>6.00-5.00</td>
    </tr>
    <tr>
      <td><router-link :to="`tradedetail`" class="appH5_color_link" style=""  >
        17逸锟1A1
        </router-link></td>
      <td>40.00</td>
      <td>AA</td>
      <td>1.41</td>
      <td>5.00</td>
    </tr>
    <tr>
      <td><router-link :to="`tradedetail`" class="appH5_color_link" style=""  >
        17逸锟1A1
        </router-link></td>
      <td>40.00</td>
      <td>AAA</td>
      <td>1.41</td>
      <td>5.00</td>
    </tr>
    <tr>
      <td><router-link :to="`tradedetail`" class="appH5_color_link" style=""  >
        17逸锟1A1
        </router-link></td>
      <td>40.00</td>
      <td>AAA</td>
      <td>1.41</td>
      <td>5.00</td>
    </tr>
    <tr>
      <td><router-link :to="`tradedetail`" class="appH5_color_link" style=""  >
        17逸锟1A1
        </router-link></td>
      <td>40.00</td>
      <td>AAA</td>
      <td>1.41</td>
      <td>5.00</td>
    </tr>
    <tr>
      <td><router-link :to="`tradedetail`" class="appH5_color_link" style=""  >
        17逸锟1A1
        </router-link></td>
      <td>40.00</td>
      <td>AAA</td>
      <td>1.41</td>
      <td>5.00</td>
    </tr>
    <tr>
      <td><router-link :to="`tradedetail`" class="appH5_color_link" style=""  >
        17逸锟1A1
        </router-link></td>
      <td>40.00</td>
      <td>AAA</td>
      <td>1.41</td>
      <td>5.00</td>
    </tr>        
    <tr>
      <td><router-link :to="`tradedetail`" class="appH5_color_link" style=""  >
        17逸锟1A1
        </router-link></td>
      <td>40.00</td>
      <td>AAA</td>
      <td>1.41</td>
      <td>5.00</td>
    </tr>
    <tr>
      <td><router-link :to="`tradedetail`" class="appH5_color_link" style=""  >
        17逸锟1A1
        </router-link></td>
      <td>40.00</td>
      <td>AAA</td>
      <td>1.41</td>
      <td>5.00</td>
    </tr>
    <tr>
      <td><router-link :to="`tradedetail`" class="appH5_color_link" style=""  >
        17逸锟1A1
        </router-link></td>
      <td>40.00</td>
      <td>AAA</td>
      <td>1.41</td>
      <td>5.00</td>
    </tr>
    <tr>
      <td><router-link :to="`tradedetail`" class="appH5_color_link" style=""  >
        17逸锟1A1
        </router-link></td>
      <td>40.00</td>
      <td>AAA</td>
      <td>1.41</td>
      <td>5.00</td>
    </tr>
    <tr>
      <td><router-link :to="`tradedetail`" class="appH5_color_link" style=""  >
        17逸锟1A1
        </router-link></td>
      <td>40.00</td>
      <td>AAA</td>
      <td>1.41</td>
      <td>5.00</td>
    </tr>            
  </table>
</div>    
</div>
</template>
<script>
import TradeItem from "./TradeItem";

export default {
  name: "trade",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      list: [
        { name: "zhangsan", index: 1 },
        { name: "lisi", index: 2 },
        { name: "wangwu", index: 3 },
        { name: "zhangliu", index: 4 }
      ]
    };
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
#tradeTableId tr td:nth-of-type(1){
  color: #ffc446;
  padding: 0.333333rem 0!important;
}
#tradeTableId tr th:nth-of-type(2){
  text-align: right;
}
#tradeTableId tr td:nth-of-type(2){
  color: #ee7a76;
  font-size: 17px;
  text-align: right;
}
#tradeTableId tr th:nth-of-type(3){
  text-align: center;
}
#tradeTableId tr td:nth-of-type(3){
  text-align: center;
}
#tradeTableId tr th:nth-of-type(4){
  text-align: right;
}
#tradeTableId tr td:nth-of-type(4){
  text-align: right;
}
#tradeTableId tr th:nth-of-type(5){
  text-align: right;
}
#tradeTableId tr td:nth-of-type(5){
  text-align: right;
}
.trade_select_div {
  display: table;
  width: 100%;
  margin-top:-6px;
  margin-bottom: 12px;
}
</style>
