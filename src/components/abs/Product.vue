<template>
  <div class="hello">
    <h1>产品页</h1>
    <a href="javascript:;"></a>
    <div v-for="(item, index) in list" :key="index">
      <ProductItem :item="item" :id="index" />
    </div>
  </div>
</template>

<script>
import ProductItem from './ProductItem';

export default {
  name: 'product',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      // list: [
      //   { name: '17逸锟1A1', raking: 'AAA', year: 1, rate: '5%~6%', index: 1 },
      //   { name: '17逸锟1A1', raking: 'AAA', year: 1, rate: '6.00%', index: 2 },
      //   { name: '17逸锟1A1', raking: 'AAA', year: 1, rate: '7.50%', index: 3 },
      //   { name: '17逸锟1A1', raking: 'AAA', year: 1, rate: '3%~4%', index: 4 },
      // ],
      list: [],
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      fetch('http://10.1.1.35/Demo/DemoProduct/getlist')
      .then(response => response.json())
      .then((json) => {
        this.list = json.data;
      });
    },
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
