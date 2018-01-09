<template>
<div class="appH5_body">
  <div class="appH5_panel">
    <table class="select_div">
      <tr>
        <td class="text-left">
          <select v-model="marketType">
            <option value="">市场分类</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </td>
        <td>
          <select v-model="productType">
            <option  value="">产品分类</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </td>
        <td class="text-right"> 
          <select v-model="issueState">
            <option  value="">发行状态</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
            </select>
        </td>
      </tr>
    </table>
    
    <mt-loadmore :top-method="loadTop" ref="loadmore" :topDistance="70" topPullText="">
      <table class="appH5_table"  >
        <tr>
          <th>产品名称</th>
          <th class="text-right">总额(亿)</th>
          <th>产品分类</th>
          <th class="text-right">发行日期</th>
        </tr>

        <ProductItem 
          v-for="(item, index) in list" 
          :item="item"
          :id="index"
          :key="index"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-immediate-check="true"
          infinite-scroll-distance="55"/>
      </table>
    </mt-loadmore>
    
  </div>
</div>
</template>

<script> 
import * as webApi from '@/config/api';
import ProductItem from './ProductItem';   

export default {
  name: "product",
  data() {
    return {
      list: [],
      page: 1,
      loading: false,
      marketType: "",
      productType: "",
      issueState: ""
    };
  },
  created() {
    this.fetchProducts(1, data => {
      this.list = data;
      this.page = this.page + 1;
    });
  },
  methods: {
    loadTop() {
      setTimeout(() => {
        this.fetchProducts(1, data => {
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
        this.fetchProducts(this.page, data => {
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
    ProductItem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.select_div {
  display: table;
  width: 100%;
  margin-top:-12px;
  margin-bottom: 12px;
}
.select_div td {
  vertical-align: top;
}
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
</style>
