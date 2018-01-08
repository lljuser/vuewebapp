<template>
  <div class="hello">
    <h1>交易页</h1>
    <a href="javascript:;"></a>

    <div v-for="user in list" :key="user.index">
      <router-link :to="{ name: 'tradeitem', params: { id: user.index, user, }}">
        Go to TradeItem {{ user.index }} 
        <br/>
      </router-link>
    </div>
    
  </div>
</template>

<script>
import TradeItem from './TradeItem';

export default {
  name: 'trade',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      list: [
        { name: 'zhangsan', index: 1 },
        { name: 'lisi', index: 2 },
        { name: 'wangwu', index: 3 },
        { name: 'zhangliu', index: 4 },
      ],
    };
  },
  components: {
    TradeItem,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
  color: #42b983;
}
</style>
