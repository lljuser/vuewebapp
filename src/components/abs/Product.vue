<template>
  <div class="hello">
    <h1>产品页</h1>
    <a href="javascript:;"></a>
    <div 
      v-for="(item, index) in list" 
      :key="index" 
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-immediate-check="true"
      infinite-scroll-distance="55">
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
      list: [],
      page: 0,
      loading: false,
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        this.fetchProducts();
      }, 1000);
    },
    fetchProducts() {
      fetch(`http://10.1.1.35/Demo/DemoProduct/getlist/${this.page}`)
      .then(response => response.json())
      .then((json) => {
        const data = json.data;
        if (data && data.length > 0) {
          if (this.list.length > 0) {
            this.list = this.list.concat(json.data);
          } else {
            this.list = json.data;
          }
          this.page = this.page + 1;
          this.loading = false;
        }
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
