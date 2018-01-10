<template>
<div class="appH5_body">
  <div class="appH5_panel">
    <table class="select_div">
      <tr>
        <td class="text-left">
          <select v-model="ProductTypeVal" v-on:change="productChange(ProductTypeVal)" >
             <option v-for="option in ProductType" :value="option.Value" :key="option.Value" selected="option.Selected">
              {{ option.Text }}
              </option>
          </select>
        </td>
        <td style="text-align:center">
          <select v-model="DealTypeVal">
             <option v-for="option in DealType" :value="option.Value" :key="option.Value" selected="option.Selected">
              {{ option.Text }}
              </option>
          </select>
        </td>
        <td class="text-right"> 
          <select v-model="CurrentStatusVal">
           <option v-for="option in CurrentStatus" :value="option.Value" :key="option.Value" selected="option.Selected">
              {{ option.Text }}
              </option>
            </select>
        </td>
      </tr>
    </table>
    
    <mt-loadmore :top-method="loadTop" ref="loadmore" :topDistance="70" topPullText="" topDropText="" topLoadingText="">
      <table class="appH5_table"  >
        <tr>
          <th>产品名称</th>
          <th class="text-right">总额(亿)</th>
          <th class="text-right">产品分类</th>
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
import axios from 'axios';   

export default {
  name: "product",
  data() {
    return {
      list: [],
      page: 1,
      loading: false,
      ProductType: "",
      DealType: "",
      CurrentStatus: ""
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
      }, 200);
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
   var ss=webApi.Product.list;
   debugger;
      axios.post(webApi.Product.list).then((response) => { 
           debugger;
        const data = response.data.data;
        if (data) {
            this.ProductType=data.ProductType;
            this.ProductTypeVal=data.ProductType.filter(x=>x.Selected==true)[0].Value;
            this.DealTypeVal=data.DealType.filter(x=>x.Selected==true)[0].Value;
            this.CurrentStatusVal=data.CurrentStatus.filter(x=>x.Selected==true)[0].Value;
            this.DealType=data.DealType;
            this.CurrentStatus=data.CurrentStatus;
          callback(data.Deal);
        }
      });

      // fetch(`${webApi.Product.list}`)
      // .then(response => response.json())
      // .then((json) => {
      //   debugger;
      //   const data = json.data.Deal;
      //   if (data && data.length > 0) {
      //     callback(data);
      //   }
      // });
    }, 

    productChange(val){

    }
  },
  components: {
    ProductItem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.select_div {
  table-layout: fixed;
  width: 100%;
  margin-top: -6px;
  margin-bottom: 12px;
}

.select_div select {
  width:100%;
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
