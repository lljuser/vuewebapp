<template>
  <div class="hello">
    <h1>产品页</h1>
    <a href="javascript:;"></a>
    <mt-loadmore :top-method="loadTop" ref="loadmore" :topDistance="70">
      <div 
        v-for="(item, index) in list" 
        :key="index" 
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-immediate-check="true"
        infinite-scroll-distance="55">
        <ProductItem :item="item" :id="index" />
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
import * as webApi from '@/config/api';
import ProductItem from './ProductItem'; 

export default {
  name: 'product',
  data() {
    return {
      list: [],
      page: 1,
      loading: false,
    };
  },
  created() {
    this.fetchProducts(1, (data) => {
      this.list = data;
      this.page = this.page + 1;
    });
  },
  methods: {
    loadTop() {
      setTimeout(() => {
        this.fetchProducts(1, (data) => {
          this.list = data;
          this.page = 2;
          this.loading = false;
          this.$refs.loadmore.onTopLoaded();
        });
      }, 1000);
    },
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        this.fetchProducts(this.page, (data) => {
          if (this.page > 1) {
            this.list = this.list.concat(data);
          } else {
            this.list = data;
          }
          this.page = this.page + 1;
          this.loading = false;
        });
      }, 1000);
    },
    fetchProducts(page, callback) {
      fetch(`${webApi.Demo.list}/${page}`)
      .then(response => response.json())
      .then((json) => {
        const data = json.data;
        if (data && data.length > 0) {
          callback(data);
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
