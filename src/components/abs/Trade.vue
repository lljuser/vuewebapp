<template>
<div class="appH5_body">              
<div class="appH5_panel">
  <table class="trade_select_div">
     <tr>
       <td class="text-left">
        <select>
        <option>市场分类</option>
        <option>市场分类</option>
        <option>市场分类</option>
        <option>市场分类</option>
        </select>
        </td>
       <td style="text-align:center">
         <select>
          <option>产品分类</option>
          <option>产品分类</option>
          <option>产品分类</option>
          <option>产品分类</option>
        </select>
        </td>
       <td class="text-right"> 
         <select>
          <option>发行状态</option>
          <option>发行状态</option>
          <option>发行状态</option>
          <option>发行状态</option>
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
      <td>17逸锟1A1</td>
      <td>40.00</td>
      <td>AA</td>
      <td>1.41</td>
      <td>5.00</td>
    </tr>
    <tr>
      <td>17逸锟1A1</td>
      <td>40.00</td>
      <td>AAA</td>
      <td>1.41</td>
      <td>5.00</td>
    </tr>
    <tr>
      <td>17逸锟1A1</td>
      <td>40.00</td>
      <td>AAA</td>
      <td>1.41</td>
      <td>5.00</td>
    </tr>
    <tr>
      <td>17逸锟1A1</td>
      <td>40.00</td>
      <td>AAA</td>
      <td>1.41</td>
      <td>5.00</td>
    </tr>
    <tr>
      <td>17逸锟1A1</td>
      <td>40.00</td>
      <td>AAA</td>
      <td>1.41</td>
      <td>5.00</td>
    </tr>
    <tr>
      <td>17逸锟1A1</td>
      <td>40.00</td>
      <td>AAA</td>
      <td>1.41</td>
      <td>5.00</td>
    </tr>        
    <tr>
      <td>17逸锟1A1</td>
      <td>40.00</td>
      <td>AAA</td>
      <td>1.41</td>
      <td>5.00</td>
    </tr>
    <tr>
      <td>17逸锟1A1</td>
      <td>40.00</td>
      <td>AAA</td>
      <td>1.41</td>
      <td>5.00</td>
    </tr>
    <tr>
      <td>17逸锟1A1</td>
      <td>40.00</td>
      <td>AAA</td>
      <td>1.41</td>
      <td>5.00</td>
    </tr>
    <tr>
      <td>17逸锟1A1</td>
      <td>40.00</td>
      <td>AAA</td>
      <td>1.41</td>
      <td>5.00</td>
    </tr>
    <tr>
      <td>17逸锟1A1</td>
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
#tradeTableId{
  margin-top: 0.25rem;
}
#tradeTableId tr td:nth-of-type(1){
  color: #ffc446;
}
#tradeTableId tr th:nth-of-type(2){
  text-align: right;
}
#tradeTableId tr td:nth-of-type(2){
  color: #ff7271;
  font-size: 19px;
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
  height: 1.227rem;
}
.trade_select_div td{
  vertical-align: top;
}
</style>
