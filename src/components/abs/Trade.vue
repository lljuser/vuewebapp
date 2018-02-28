<template>
<div class="appH5_body"> 
  <div class="product-spinner" v-if="isTradeLoading">
    <mt-spinner type="triple-bounce"></mt-spinner>
  </div>
  <div v-else>             
<div class="appH5_panel">
  <table class="appH5_select_div trade_select_div" cellspacing="0"  cellpadding="0">
     <tr>
       <td class="text-left">
        <select v-model="TradeRating" v-on:change="selectChange()">
        <option v-for="item in ratingList"
        :value="item.Key"
        :key="item.Value">{{item.Value}}</option>
        </select>
        </td>
       <td style="text-align:center">
         <select v-model="TradeCoupon" v-on:change="selectChange()">
          <option v-for="item in couponList"
          :value="item.Key"
          :key="item.Value">{{item.Value}}</option>
        </select>
        </td>
       <td class="text-right"> 
         <select v-model="TradeWalbuck" v-on:change="selectChange()">
          <option v-for="item in walbuckList" 
          :value="item.Key" 
          :key="item.Value">{{item.Value}}</option> 
          </select>
        </td>
    </tr>    
  </table>

  <mt-loadmore :top-method="loadTop"  ref="loadmore">
  <table id="tradeTableId" class="appH5_table" style="table-layout:fixed;">
    <tr>
      <th  style="padding-left:0;width:5%;"></th>
      <th>证券简称</th>
      <th class="text-right">金额(亿)</th>
      <th class="text-right">资产类别</th>
    </tr>
    <tbody v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-immediate-check="true"
          infinite-scroll-distance="55">
        <TradeItem 
          v-for="item in list" 
          :item="item"
          :key="item.Id"/>    
    </tbody>
    <tfoot>
       <tr>
            <td colspan="4" style="border-bottom:none">
              <div class="spinner_div" v-if="list.length==0" >
                    <span class="nomore">暂无数据</span>
              </div>
              <div class="spinner_div" v-else>
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
import BusUtil from "./BusUtil";
import * as webApi from "@/config/api";
import TradeItem from "./TradeItem";
import axios from "axios";
import { Toast } from "mint-ui";

export default {
  name: "trade",
  data() {
    return {
      list: [],
      walbuckList: [],
      couponList: [],
      ratingList: [],
      loading: false,
      TradeRating: "0",
      TradeCoupon: "0",
      TradeWalbuck: "0",
      page: 1,
      pageSize: 15,
      direction: 0,
      isTradeLoading: false,
      isFetchTradesError: false,
      noMore: false,
      isLoadTop: false
    };
  },
  beforeRouteLeave: (to, from, next) => {
    if (new RegExp(/tradeDetail/i).test(to.name)) {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      sessionStorage.setItem("listScrollTop", top);
    } else {
      sessionStorage.setItem("listScrollTop", 0);
    }
    next();
  },
  activated() {
    //设置为历史滚动条高度
    var listScrollTop = sessionStorage.getItem("listScrollTop");
    if (listScrollTop != 0) {
      setTimeout(() => {
        window.scrollTo(0, listScrollTop);
      }, 0);
    }

    this.loading = false;
    const busUtil = BusUtil.getInstance();
    busUtil.bus.$emit("showHeader", false);

    var gradeIdParam = this.$route.params.gradeId;
    var couponIdParam = this.$route.params.couponId;
    var reLoadData = false;
    if (gradeIdParam != null && gradeIdParam != "0") {
      this.TradeRating = gradeIdParam;
      reLoadData = true;
    }
    if (couponIdParam != null && couponIdParam != "0") {
      this.TradeCoupon = couponIdParam;
      reLoadData = true;
    }
    if (reLoadData) {
      this.loadFirstPageTrades();
    }

    if (this.isFetchTradesError) {
      this.loadFirstPageTrades();
    }
  },
  mounted() {
    this.isTradeLoading = true;
    setTimeout(() => {
      this.loadFirstPageTrades();
      this.loadSelectOptions();
    }, 600);
  },
  deactivated() {
    //防止其他组件滚动时，此组件调用loadMore方法
    this.loading = true;
  },
  methods: {
    loadSelectOptions() {
      this.getWalbuckList(data => {
        this.walbuckList = data;
      });
      this.getCouponList(data => {
        this.couponList = data;
      });
      this.getRatingList(data => {
        this.ratingList = data;
      });
    },
    loadFirstPageTrades(showSpinnerLoad) {
      this.isTradeLoading = true;
      if (showSpinnerLoad != null) this.isTradeLoading = false;
      this.loading = false;
      setTimeout(() => {
        this.fetchTrades(1, 0, data => {
          this.list = data;
          this.isTradeLoading = false;
          this.page = 1;
          if (data.length < this.pageSize) {
            this.noMore = true;
          }
          if (showSpinnerLoad != null) this.$refs.loadmore.onTopLoaded();
        });
      }, 600);
    },
    fetchTrades(page, direction, callback) {
      var url = webApi.Trade.list;
      url =
        url +
        "/" +
        this.TradeRating +
        "/" +
        this.TradeCoupon +
        "/" +
        this.TradeWalbuck;
      url =
        url +
        "/" +
        direction +
        "/" +
        page * this.pageSize +
        "/" +
        this.pageSize;
      axios
        .post(url)
        .then(response => {
          const data = response.data.data;
          if (data) {
            callback(data);
            if (data.length == 0) {
              this.loading = true;
              this.noMore = true;
            }
            this.isFetchTradesError = false;
            this.isLoadTop = false;
          } else {
            this.doCatch();
          }
        })
        .catch(error => {
          this.doCatch();
        });
    },

    doCatch() {
      Toast("服务器繁忙，请重试！");
      this.loading = false;
      this.isTradeLoading = false;
      this.isFetchTradesError = true;
      if (this.isLoadTop) {
        setTimeout(() => {
          this.$refs.loadmore.onTopLoaded();
        }, 4000);
      }
    },

    loadTop() {
      this.isLoadTop = true;
      this.timer = setTimeout(() => {
        this.loadFirstPageTrades(true);
        this.loadSelectOptions();
      }, 600);
    },

    loadMore() {
      this.loading = true;
      this.noMore = false;
      setTimeout(() => {
        this.fetchTrades(this.page, 1, data => {
          this.list = this.list.concat(data);
          this.page = this.page + 1;
          this.loading = false;
        });
      }, 300);
    },
    getWalbuckList(callback) {
      axios.post(webApi.Trade.walbuckList).then(response => {
        const data = response.data.data;
        if (data && data.length > 0) {
          callback(data);
        }
      });
    },
    getCouponList(callback) {
      axios.post(webApi.Trade.couponList).then(response => {
        const data = response.data.data;
        if (data && data.length > 0) {
          callback(data);
        }
      });
    },
    getRatingList(callback) {
      axios.post(webApi.Trade.ratingList).then(response => {
        const data = response.data.data;
        if (data && data.length > 0) {
          callback(data);
        }
      });
    },
    selectChange() {
      this.loadFirstPageTrades();
    }
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
.trade_select_div select {
  min-width: 2.6rem;
}
.trade_select_div div {
  width: 33%;
  float: left;
}
.th_tworows {
  padding: 0 0.146667rem 0 0;
}
.trade_select_div div:last-child {
  width: 34%;
  text-align: right;
}
.trade_select_div select {
  width: 90%;
  border-radius: 0;
}

#tradeTableId th:nth-of-type(3) {
  width: 55px;
}

/* #tradeTableId th:nth-of-type(3){
width: 20%;
} */
</style>
