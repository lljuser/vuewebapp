<template>
  <div class="appH5_body">
    <div class="appH5_content">
      <div class="appH5_panel appH5_panel_mb">
          <div class="appH5_title">
              <span>产品要素</span>
          </div>
          <table class="appH5_list_two">
            <tr>
              <td>产品名称</td>
              <td>丰耀2017年第二期个人汽车抵押贷款资产支持证券</td>
            </tr>
            <tr>
              <td>产品分类</td>
              <td>
                <div>信贷资产证券化</div>
                <div>&nbsp;└&nbsp;汽车抵押贷款</div>
                <div>&nbsp;&nbsp;&nbsp;└&nbsp;好一个三级分类</div>
              </td>
            </tr>
            <tr>
              <td>产品状态</td>
              <td>存续期</td>
            </tr>
            <tr>
              <td>成立日期</td>
              <td>2017年11月11日</td>
            </tr>
            <tr>
              <td>发起机构</td>
              <td>丰田汽车金融(中国)有限公司</td>
            </tr>
            <tr>
              <td>金额(亿)</td>
              <td>30.00</td>
            </tr>
          </table>
      </div>
      <div class="appH5_panel appH5_panel_mb">
        <div class="appH5_title">
              <span>证券结构</span>
          </div>
          <div>

          </div>
      </div>
      <div class="appH5_panel appH5_panel_mb">
        <div class="appH5_title">
              <span>证券偿付</span>
          </div>
          <div>
            
          </div>
      </div>
      <div class="appH5_panel">
        <div class="appH5_title">
              <span>证券列表</span>
          </div>
          <div>
            <table class="appH5_table">
              <tr>
                <th>证券简称</th>
                <th style="text-align:center">发行金额(亿)<br/>还本方式</th>
                <th style="text-align:center">发行利率<br/>评级1</th>
                <th style="text-align:center">加权年限<br/>评级2</th>
              </tr>
              <tr>
                <td>17康安1A</td>
                <td class="text-right"><span class="appH5_color_red appH5_font_large">1.5</span><br/><span class="appH5_color_details appH5_font_smaller">过手型</span></td>
                <td class="text-right"><span class="appH5_color_red appH5_font_large">4.850%</span><br/><span class="appH5_color_details appH5_font_smaller">AAA</span></td>
                <td class="text-right"><span class="appH5_color_red appH5_font_large">0.70</span><br/><span class="appH5_color_details appH5_font_smaller">AAA</span></td>
              </tr>
              <tr>
                <td>17康安1B</td>
                <td class="text-right"><span class="appH5_color_red appH5_font_large">2.3</span><br/><span class="appH5_color_details appH5_font_smaller">过手型</span></td>
                <td class="text-right"><span class="appH5_color_red appH5_font_large">4.850%</span><br/><span class="appH5_color_details appH5_font_smaller">AA</span></td>
                <td class="text-right"><span class="appH5_color_red appH5_font_large">0.70</span><br/><span class="appH5_color_details appH5_font_smaller">AA-</span></td>
              </tr>
              <tr>
                <td>17康安1C</td>
                <td class="text-right"><span class="appH5_color_red appH5_font_large">5.6</span><br/><span class="appH5_color_details appH5_font_smaller">过手型</span></td>
                <td class="text-right"><span class="appH5_color_red appH5_font_large">4.850%</span><br/><span class="appH5_color_details appH5_font_smaller">NR</span></td>
                <td class="text-right"><span class="appH5_color_red appH5_font_large">0.70</span><br/><span class="appH5_color_details appH5_font_smaller">NR</span></td>
              </tr>
            </table>
          </div>
      </div>
    </div>
    <!-- <h2>产品详情页</h2>
    <h3>{{ productDetail && productDetail.Title }}</h3>
    <p>{{ productDetail && productDetail.Content }}</p>
    <p>{{ productDetail && productDetail.Time }}</p> -->
  </div>
</template>

<style scoped>

</style>

<script>
import BusUtil from './BusUtil';

export default {
  name: 'productDetail',
  created() {
    const busUtil = BusUtil.getInstance();
    this.id = this.$route.params.id;
    this.fetchProductDetail(this.id);
    busUtil.bus.$emit('showHeader', true);
  },
  data() {
    return {
      productDetail: null,
    };
  },
  methods: {
    fetchProductDetail(id) {
      fetch(`http://10.1.1.35/Demo/DemoProduct/getitem/${id}`)
      .then(response => response.json())
      .then((json) => {
        this.productDetail = json.data;
      });
    },
  },
};
</script>
