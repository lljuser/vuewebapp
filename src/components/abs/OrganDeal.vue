<template>
<div class="appH5_body" id="organDealDiv">
  
  <div class="product-spinner" v-if="isProductLoading">
    <mt-spinner type="triple-bounce"></mt-spinner>
  </div>
  <div v-else>
  <div class="appH5_panel">
     
      <!-- <div class="appH5_title">机构项目</div> -->
      <div v-if="this.list.length>0">
      <div class="div_desc">
        <div><span class="appH5_font_larger">{{Count}}</span><span class="appH5_font_smaller">单</span></div>
        <div><span class="appH5_font_larger appH5_color_red appH5_margin_left10">{{Balance}}</span><span class="appH5_font_smaller appH5_color_red">亿</span></div>
        <div v-show="UnderwritingBalance>0"><span class="appH5_font_larger appH5_color_red appH5_margin_left10">{{UnderwritingBalance}}</span><span class="appH5_font_smaller appH5_color_red">亿(承销)</span></div>
      </div>
      <table class="appH5_select_div select_div" cellspacing="0"  cellpadding="0" >
        <tr>
          <td class="text-left">
            <select v-model="RoleVal" v-on:change="selectChange()" >
              <option v-for="option in Role" :value="option.Value" :key="option.Value" selected="option.Selected">
                {{ option.Text }}
                </option>
            </select>
          </td>
          <td style="text-align:center">
            <select v-model="ExchangeVal" v-on:change="selectChange()">
              <option v-for="option in Exchange" :value="option.Value" :key="option.Value" selected="option.Selected">
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
      </div>
      <mt-loadmore :top-method="loadTop"  ref="loadmore">
        <table id="productTableId" class="appH5_table">
          <tr>
            <th>产品名称</th>
            <th class="text-right">总额(亿)</th>
            <th class="text-right">产品分类</th>
          </tr>
          <tbody  v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-immediate-check="true"
            infinite-scroll-distance="55">
            <OrganDealItem 
              v-for="(item, index) in list" 
              :item="item"
              :id="index"
              :key="index"
              :noheader="{noheader}"
              :dealid="{dealid}"
              />
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="border-bottom:none">
                <div class="spinner_div" v-if="list.length==0" style="height:670px;">
                <div>
                  <img class="appH5_null" src="/Content/modules/expert/image/null.png" alt="">
                  <div class="nomore text-center appH5_null" style="margin-top: 3px;">暂无数据</div>
                </div>
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
import BusUtil from "./BusUtil";
import util from "@/public/modules/expert/utils";
import * as webApi from "@/config/api";
import OrganDealItem from "./OrganDealItem";
import axios from "axios";
import { Toast } from "mint-ui";
import "mint-ui/lib/style.css";
import '@/public/css/theme.css';
const busUtil = BusUtil.getInstance();

export default {
  name: "orderDeal",
  data() {
    return {
      list: [],
      page: 1,
      pageSize: 15,
      loading: false,
      RoleVal: "0",
      ExchangeVal: "0",
      CurrentStatusVal: "0",
      Role: [],
      Exchange: [],
      CurrentStatus: [],
      isProductLoading: false,
      isFetchProductsError: false,
      noMore: false,
      isLoadTop: false,
      Count: 0,
      Balance: 0,
      UnderwritingBalance: 0,
      noheader: false,
      dealid: 0
    };
  },
  beforeRouteEnter: (to, from, next) => {
    busUtil.bus.$emit("showHeader", true);
    busUtil.bus.$emit("headTitle", "参与项目");
    document.title="参与项目";

    next(vm => {
      if (!to.meta.fromExp) {
        if (vm.$route.query.noheader == "1") {
          busUtil.bus.$emit("noHeader", true);
          document.getElementById("organDealDiv").style.paddingTop = 0;
          vm.noheader = true;
          // document.title="参与项目";
        } else {
          busUtil.bus.$emit("noHeader", false);
          document.getElementById("organDealDiv").style.paddingTop = "56px";
          vm.noheader = false;
        }
      } else {
        busUtil.bus.$emit("path", "fromAbs");
        vm.isfromExp = true;
        var querys = util.getQueryString();
        if (
          (to.query.isShowHeader == null || to.query.isShowHeader == false) &&
          !new RegExp(/isShowHeader=true/i).test(location.href)
        ) {
          busUtil.bus.$emit("showHeader", false);
          document.getElementById("organDealDiv").style.paddingTop = 0;
        } else {
          busUtil.bus.$emit("showHeader", true);
          busUtil.bus.$emit("showClose", true, querys.path);
          document.getElementById("organDealDiv").style.paddingTop = "56px";
        }
      }
    });
  },
  created() {
    if (this.$route.meta.fromExp) {
      this.loadData();
    }
  },
  mounted() {
    // this.timer = setTimeout(() => {
    //   this.loadFirstPageProducts();
    // }, 600);
  },
  activated() {
    this.loadData();
  },
  deactivated() {
    this.timer && clearTimeout(this.timer);
    // 防止在其他组件滚动时 此组件调用loadMore方法
    this.loading = true;
  },
  methods: {
    loadData(){
      this.isProductLoading = true;
      this.loading = false;
      // busUtil.bus.$emit("path", "/OrganDetail/" + this.$route.params.id);

      var idParam = this.$route.params.id;
      this.dealid = idParam;
      var reLoadData = false;
      if (idParam != null) {
        reLoadData = true;
      }
      if (reLoadData) {
        this.loadFirstPageProducts();
      }

      if (this.isFetchProductsError) {
        this.loadFirstPageProducts();
      }
    },
    loadFirstPageProducts(showSpinnerLoad) {
      this.loading = false;
      this.isProductLoading = true;
      if (showSpinnerLoad != null) this.isProductLoading = false;
      setTimeout(() => {
        this.fetchProducts(1, 0, data => {
          this.list = data;
          this.isProductLoading = false;
          this.page = 1;
          if (data.length < this.pageSize) {
            this.noMore = true;
          }
          if (showSpinnerLoad != null) this.$refs.loadmore.onTopLoaded();
        });
      }, 600);
    },

    loadTop() {
      this.isLoadTop = true;
      this.timer = setTimeout(() => {
        this.loadFirstPageProducts(true);
      }, 600);
    },

    loadMore() {
      this.loading = true;
      this.noMore = false;
      setTimeout(() => {
        this.fetchProducts(this.page, 1, data => {
          this.list = this.list.concat(data);
          this.page = this.page + 1;
          this.loading = false;
        });
      }, 600);
    },

    fetchProducts(page, direction, callback) {
      var url = webApi.Organ.dealList + "/" + this.$route.params.id;
      url =
        url +
        "/" +
        this.RoleVal +
        "/" +
        this.ExchangeVal +
        "/" +
        this.CurrentStatusVal;
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
          if (data && response.data.status != "fail") {
            //  busUtil.bus.$emit('headTitle', data.Organization);
            this.Count = data.Count;
            this.Balance = data.Balance;
            this.UnderwritingBalance = data.UnderwritingBalance;

            var productTypeSel = data.Role.filter(x => x.Selected == true);
            this.RoleVal =
              productTypeSel.length > 0 ? productTypeSel[0].Value : "";
            var dealTypeSel = data.Exchange.filter(x => x.Selected == true);
            this.ExchangeVal =
              dealTypeSel.length > 0 ? dealTypeSel[0].Value : "";
            var currentStatusSel = data.CurrentStatus.filter(
              x => x.Selected == true
            );
            this.CurrentStatusVal =
              currentStatusSel.length > 0 ? currentStatusSel[0].Value : "";
            this.Role = data.Role;
            this.Exchange = data.Exchange;
            this.CurrentStatus = data.CurrentStatus;

            callback(data.Deal);
            if (data.Deal.length == 0) {
              this.loading = true;
              this.noMore = true;
            }
            this.isFetchProductsError = false;
            this.isLoadTop = false;
          } else {
            this.doCatch();
          }
        })
        .catch(error => {
          Toast("服务器繁忙，请重试！");
          this.doCatch();
        });
    },

    doCatch() {
      this.loading = false;
      this.isProductLoading = false;
      this.isFetchProductsError = true;
      if (this.isLoadTop) {
        setTimeout(() => {
          this.$refs.loadmore.onTopLoaded();
        }, 4000);
      }
      //if(showSpinnerLoad!=null) this.$refs.loadmore.onTopLoaded();
    },

    selectChange() {
      this.loadFirstPageProducts();
    }
  },
  components: {
    OrganDealItem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.select_div div {
  width: 33%;
  float: left;
}

.select_div div:last-child {
  width: 34%;
  text-align: right;
}

.select_div select {
  width: 90%;
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
#productTableId {
  table-layout: fixed;
}

#productTableId th:nth-of-type(2) {
  width: 55px;
}
#productTableId th:nth-of-type(3) {
  width: 35%;
}

.div_desc div {
  float: left;
  font-size: 15px;
  margin: 0 10px 5px 0;
}

.div_desc div span:nth-of-type(2n + 1) {
  margin-right: 4px;
}

select {
  color: black !important;
}
select option{
  background-color: white !important;
}
/* .div_desc div span:nth-of-type(2n+1){
} */
</style>
