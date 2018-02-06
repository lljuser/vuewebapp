<template>
<div class="appH5_body">
  
  <div class="product-spinner" v-if="isProductLoading">
    <mt-spinner type="triple-bounce"></mt-spinner>
  </div>
  <div v-else>
  <div class="appH5_panel">
    <table class="appH5_select_div select_div" cellspacing="0"  cellpadding="0" >
      <tr>
        <td class="text-left">
          <select v-model="TypeVal" v-on:change="selectChange()" >
             <option v-for="option in Type" :value="option.Value" :key="option.Value" selected="option.Selected">
              {{ option.Text }}
              </option>
          </select>
        </td>
        <td style="text-align:center">
          <select v-model="RoleVal" v-on:change="selectChange()">
             <option v-for="option in Role" :value="option.Value" :key="option.Value" selected="option.Selected">
              {{ option.Text }}
              </option>
          </select>
        </td>
      </tr>
    </table>
 


      <!-- <table id="productTableId" class="appH5_table">
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
    </table> -->
    <mt-loadmore :top-method="loadTop"  ref="loadmore">
      <table id="productTableId" class="appH5_table">
        <tr>
          <th style="width:75%">机构名称</th>
          <th class="text-right" style="width:25%">参与单数</th>
        </tr>
        <tbody  v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-immediate-check="true"
          infinite-scroll-distance="55">
          <OrganItem 
            v-for="(item, index) in list" 
            :item="item"
            :id="index"
            :key="index"/>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="border-bottom:none">
              <div class="spinner_div" v-if="list.length==0">
                <span  class="nomore">暂无数据</span>
              </div>
              <div class="spinner_div" v-else >
                <van-loading type="spinner" v-if="!noMore" color="white" class="spinner-circle"/>
                <span v-if="noMore" class="nomore">没有更多了</span>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </mt-loadmore>


    
     
    </div>
  </div>
</div>
</template>

<script> 
import BusUtil from './BusUtil';
import * as webApi from '@/config/api';
import OrganItem from './OrganItem';
import axios from 'axios';
import { Toast } from 'mint-ui';
import 'mint-ui/lib/style.css'
export default {
  name: "organ",
  data() {
    return {
      list: [],
      page: 1,
      pageSize:15,
      loading: false,
      TypeVal: "0",
      RoleVal: "0",
      CurrentStatusVal: "0",
      Type:[],
      Role:[],
      CurrentStatus:[],
      isProductLoading: false,
      isFetchProductsError: false,
      noMore:false,
      isLoadTop:false
    };
  },
  mounted() {
    this.isProductLoading = true;
    this.timer = setTimeout(() => {
      this.loadFirstPageProducts();
    }, 600);
  },
  activated() {
    document.body.scrollTop=0;
    this.loading = false;
    const busUtil = BusUtil.getInstance();
    busUtil.bus.$emit('showHeader', false);
    var productTypeParam = this.$route.params.productType;
    var dealTypeParam=this.$route.params.dealType;
    var reLoadData=false;    
    if(productTypeParam!=null )
    {
      this.TypeVal= productTypeParam;
      reLoadData=true;
    }
    if(dealTypeParam!=null && dealTypeParam!="0" )
    {
      this.RoleVal= dealTypeParam;
      reLoadData=true;
    }
    if(reLoadData){
      this.loadFirstPageProducts();
    }

    if (this.isFetchProductsError) {
      this.loadFirstPageProducts();
    }
    //this.$refs.loadmore.onTopLoaded();
  },
  deactivated() {
    this.timer && clearTimeout(this.timer);
    // 防止在其他组件滚动时 此组件调用loadMore方法
    this.loading = true;
  },
  methods: {
    loadFirstPageProducts(showSpinnerLoad) {
      this.loading = false;
      this.isProductLoading = true;
      if(showSpinnerLoad!=null)this.isProductLoading = false;
      setTimeout(() => {
        this.fetchProducts(1,0, data => {
          this.list = data;
          this.isProductLoading = false;
          this.page=1;
          if(data.length<this.pageSize)
          {
            this.noMore=true;
          }
          if(showSpinnerLoad!=null) this.$refs.loadmore.onTopLoaded();
        });
      }, 600);
    },

    loadTop(){
      this.isLoadTop=true;
      this.timer = setTimeout(() => {
        this.loadFirstPageProducts(true);
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
      var url=webApi.Organ.list;
      url=url+"/"+this.TypeVal+"/"+this.RoleVal;
      url=url+"/"+direction+"/"+page*this.pageSize+"/"+this.pageSize;
      axios.post(url).then((response) => { 
        const data = response.data.data;
        if (data) {
            var productTypeSel=data.Type.filter(x=>x.Selected==true);
            this.TypeVal=productTypeSel.length>0?productTypeSel[0].Value:"";
            var dealTypeSel=data.Role.filter(x=>x.Selected==true)
            this.RoleVal=dealTypeSel.length>0?dealTypeSel[0].Value:"";
            this.Type=data.Type;
            this.Role=data.Role;
            this.CurrentStatus=data.CurrentStatus;
            callback(data.Organization);
            if(data.Organization.length==0){ 
              this.loading=true;
              this.noMore=true;
            }
            this.isFetchProductsError = false;
            this.isLoadTop=false;
        }
        else{
           this.doCatch();
        }
      }).catch((error) => {
        this.doCatch();
      });
    }, 

    doCatch(){
        Toast('服务器繁忙，请重试！');
        this.loading = false;
        this.isProductLoading = false;
        this.isFetchProductsError = true;
        if(this.isLoadTop){
          setTimeout(() => {
            this.$refs.loadmore.onTopLoaded();
          }, 4000);
        }
        //if(showSpinnerLoad!=null) this.$refs.loadmore.onTopLoaded();
    },

    selectChange(){
      this.loadFirstPageProducts();
    }

     
  },
  components: {
    OrganItem
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
#productTableId{
  table-layout: fixed;
}

/* #productTableId th:nth-of-type(2){
width: 55px;
}
#productTableId th:nth-of-type(3){
width: 35%;
} */


</style>
