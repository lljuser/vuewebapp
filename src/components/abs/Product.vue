<template>
<div class="appH5_body">
  <div class="appH5_panel">
    <table class="appH5_select_div select_div" cellspacing="0"  cellpadding="0" v-if="isShowSelect">
      <tr>
        <td class="text-left">
          <select v-model="ProductTypeVal" v-on:change="selectChange()" >
             <option v-for="option in ProductType" :value="option.Value" :key="option.Value" selected="option.Selected">
              {{ option.Text }}
              </option>
          </select>
        </td>
        <td style="text-align:center">
          <select v-model="DealTypeVal" v-on:change="selectChange()">
             <option v-for="option in DealType" :value="option.Value" :key="option.Value" selected="option.Selected">
              {{ option.Text }}
              </option>
          </select>
        </td>
        <td class="text-right"> 
          <select v-model="CurrentStatusVal" v-on:change="selectChange()">
           <option v-for="option in CurrentStatus" :value="option.Value" :key="option.Value" selected="option.Selected">
              {{ option.Text }}
              </option>
            </select>
        </td>
      </tr>
    </table>
    
  
    <div class="product-spinner" v-if="isProductLoading">
      <mt-spinner type="triple-bounce"></mt-spinner>
    </div>

    <div v-else>
      <table class="appH5_table">
        <tr>
          <th>产品名称</th>
          <th class="text-right">总额(亿)</th>
          <th class="text-right">产品分类</th>
        </tr>
        <tbody  v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-immediate-check="true"
          infinite-scroll-distance="55">
          <ProductItem 
            v-for="(item, index) in list" 
            :item="item"
            :id="index"
            :key="index"/>
        </tbody>
    </table>
     <div class="spinner_div" v-if="list.length==0">
        <span  class="nomore">暂无数据</span>
      </div>
      <div class="spinner_div" v-else >
        <van-loading type="spinner" v-if="!noMore" color="white" class="spinner-circle"/>
        <span v-if="noMore" class="nomore">没有更多了</span>
      </div>
     
    </div>
  </div>
</div>
</template>

<script> 
import BusUtil from './BusUtil';
import * as webApi from '@/config/api';
import ProductItem from './ProductItem';
import axios from 'axios';
import { Toast } from 'mint-ui';

export default {
  name: "product",
  data() {
    return {
      list: [],
      page: 1,
      pageSize:15,
      loading: false,
      ProductTypeVal: "0",
      DealTypeVal: "0",
      CurrentStatusVal: "0",
      ProductType:[],
      DealType:[],
      CurrentStatus:[],
      isProductLoading: false,
      isComponentActive: false,
      isFetchProductsError: false,
      isShowSelect:false,
      noMore:false,
    };
  },
  mounted() {
    this.isProductLoading = true;
    this.isComponentActive = true;
    this.timer = setTimeout(() => {
      this.loadFirstPageProducts();
    }, 600);
  },
  activated() {
    this.loading = false;
    const busUtil = BusUtil.getInstance();
    busUtil.bus.$emit('showHeader', false);
    var productTypeParam = this.$route.params.productType;
    var dealTypeParam=this.$route.params.dealType;
    var reLoadData=false;    
    if(productTypeParam!=null )
    {
      this.ProductTypeVal= productTypeParam;
      reLoadData=true;
    }
    if(dealTypeParam!=null && dealTypeParam!="0" )
    {
      this.DealTypeVal= dealTypeParam;
      reLoadData=true;
    }
    if(reLoadData){
      this.isProductLoading = true;
      this.isComponentActive = true;
      this.loadFirstPageProducts();
    }

    if (this.isFetchProductsError) {
      this.loadFirstPageProducts();
    }
  },
  deactivated() {
    this.timer && clearTimeout(this.timer);
    // 防止在其他组件滚动时 此组件调用loadMore方法
    this.loading = true;
  },
  methods: {
    loadFirstPageProducts() {
    this.loading = false;
      setTimeout(() => {
        this.fetchProducts(1,0, data => {
          this.list = data;
          this.isProductLoading = false;
          this.isShowSelect=true;
          this.page=1;
        });
      }, 600);
    },

    loadMore() {
      this.loading = true;
      this.noMore=false;
      setTimeout(() => {
        this.fetchProducts(this.page,1, data => {
          this.list = this.list.concat(data);
          this.page = this.page + 1;
          this.loading = false;
        });
      }, 600);
    },

    fetchProducts(page,direction,callback) {
      var url=webApi.Product.list;
      url=url+"/"+this.ProductTypeVal+"/"+this.DealTypeVal+"/"+this.CurrentStatusVal;
      url=url+"/"+direction+"/"+page*this.pageSize+"/"+this.pageSize;
      axios.post(url).then((response) => { 
        const data = response.data.data;
        if (data) {
            var productTypeSel=data.ProductType.filter(x=>x.Selected==true);
            this.ProductTypeVal=productTypeSel.length>0?productTypeSel[0].Value:"";
            var dealTypeSel=data.DealType.filter(x=>x.Selected==true)
            this.DealTypeVal=dealTypeSel.length>0?dealTypeSel[0].Value:"";
            var currentStatusSel=data.CurrentStatus.filter(x=>x.Selected==true);
            this.CurrentStatusVal=currentStatusSel.length>0?currentStatusSel[0].Value:"";
            this.ProductType=data.ProductType;
            this.DealType=data.DealType;
            this.CurrentStatus=data.CurrentStatus;
            callback(data.Deal);
            if(data.Deal.length==0){ 
              this.loading=true;
              this.noMore=true;
            }
        }
      }).catch((error) => {
        Toast('数据获取失败');
        this.loading = false;
        this.isProductLoading = false;
        this.isFetchProductsError = true;
      });
    }, 

    selectChange(){
      this.isProductLoading = true;
      this.isComponentActive = true;
      //this.isShowSelect=true;
      //this.page=1;
      this.loadFirstPageProducts();
      // setTimeout(() => {
      //   this.fetchProducts(0, 0,data => {
      //     this.list = data;
      //     this.isProductLoading = false;
      //   });
      // }, 500);
    }

     
  },
  components: {
    ProductItem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.select_div div {
   width:33%;
   float: left;
}

.select_div div:last-child {
    width:34%;
    text-align: right;
}

.select_div select {
  width:90%;
  border-radius: 0;
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
