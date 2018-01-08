<template>
  <div class="hello">
    <h1>产品页</h1>
    <a href="javascript:;"></a>

    <div v-for="user in list" :key="user.index">
      <router-link :to="{ name: 'productItem', params: { id: user.index, user, }}">
        Go to Product {{ user.index }} 
        <br/>
      </router-link>
    </div>
    
  </div>
</template>

<script>
import ProductItem from './ProductItem';

export default {
  name: 'Product',
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
    ProductItem,
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
