<template>
<div class="appH5_body">
  <div class="appH5_content">
    <table class="appH5_panel" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td colspan="4" class="pdrSpecial">
          <span class="fl appH5_color_green">产品名称</span>  
          <div class="fl txt_justify">上银-逸锟春天2017年第一期应收账款债权融资计划</div>
          <div class="clearfix"></div>
        </td>
      </tr>
      <tr>
        <td class="appH5_color_green">金额&nbsp;(亿)</td>
        <td class="appH5_color_red">9888.00</td>
        <td class="appH5_color_green">产品类型</td>
        <td class="appH5_color_link">企业资产证券化</td>
      </tr>
      <tr>
        <td class="appH5_color_green">期限&nbsp;(年)</td>
        <td>3.83</td>
        <td class="appH5_color_green">交易类型</td>
        <td>一级市场发行</td>
      </tr>
      <tr>
        <td class="appH5_color_green">证券类型</td>
        <td class="appH5_color_link">夹层级</td>
        <td class="appH5_color_green">评&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级</td>
        <td>AAA</td>
      </tr>
      <tr>
        <td class="appH5_color_green">分层占比</td>
        <td>13.53%</td>
        <td class="appH5_color_green">资产类型</td>
        <td>应收账款</td>
      </tr>
      <tr>
        <td class="appH5_color_green">发行方式</td>
        <td>私募</td>
      </tr>
      <tr>
          <td colspan="4" class="txt_justify lineHight">
            <span class="appH5_color_green">产品简介</span>
            <div style="margin-top: .1rem;">
              该计划基础资产为购房尾款应收账款。合同笔数2356笔，楼盘项目数为26个，风险较分散，平均帐龄较短，基础资产分布范围较广，且集中在保值性强、增长潜力高的城市，能够产生稳定的现金流。
              该计划具有多项增信措施。优先级证券可获得10%的信用支持；初始受托以及后续循环托管的信托财产端应收账款余额与信托对价之间的比值不低于1.3，
              现金流大于当前优先A级和优先B级信托受益权预期支付额；项目设置信托财产的置换与赎回机制；海伦堡集团（信用评级AA+）
              作为差额补足承诺人，对信托计划提供信用支持。
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <span class="fl appH5_color_green mr5">参与专家</span>
            <div class="fl" style="max-width: 6.9rem;">
              <img class="touxiang" src="../../assets/logo.png"/>
              <img class="touxiang" src="../../assets/logo.png"/>
              <img class="touxiang" src="../../assets/logo.png"/>
              <img class="touxiang" src="../../assets/logo.png"/>
            </div>
            <div class="clearfix"></div>
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <div class="fl appH5_color_green mr5">联&nbsp;系&nbsp;人&nbsp;</div>
            <div class="fl">
              <div class="mb20">吴晨&nbsp;&nbsp;15023232323</div>
              <div>吴晨&nbsp;&nbsp;15023232323</div>
            </div>
           <div class="clearfix"></div>
          </td>
        </tr>
    </table>
  </div>
  <div class="fixedMain appH5_font_normal">
    <div class="fl fixedLeft">
          <div class="inlineBlock" style="margin-left:.2667rem;margin-right:.1rem;">
            <img class="touxiang" src="../../assets/logo.png"/>
          </div>
          <div class="inlineBlock txtLeft" style="margin-top:.1rem;">
              <div class="lxname">吴晨</div>
              <div class="lxcompany appH5_font_smaller">上海和逸金融信息服务有限公司</div>
              <div class="lxcont appH5_font_smaller">市场部-高级销售经理</div>
          </div>
          <div class="clearfix"></div>
    </div>
    <a href="tel:17612169310" class="fl fixedRight">
        <img class="phoneImg" src="../../public/images/phone.png"/>
    </a>
    <div class="clearfix"></div>
  </div>
</div>
</template>

<script> 
export default {
  name: 'tradeDetail',
  props: ['id'],
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.appH5_content{
  margin-bottom: 1.6rem; 
  width: 100%;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.clearfix{
  clear: both;
}
.mb20{
  margin-bottom: .15rem;
}
.mr5{
  margin-right: .5rem;
}
.txt_justify{
    text-align: justify;
}
.lineHight{
  line-height: 0.6rem;
}
.pdrSpecial span{
  display: inline-block;
  width: 1.8rem;
}
.pdrSpecial div.fl{
  width: 7.2rem;
}
.inlineBlock{
  display: inline-block;
}
.touxiang{
  border: none;
  border-radius: 50%;
  -webkit-border-radius:50%;
  background-color: #fff;
}
.appH5_content table .touxiang,.phoneImg{
  width: .8rem;
  height: .8rem;
}
.fixedLeft .touxiang{
  width: 1.2rem;
  height: 1.2rem;
}
.appH5_content table .touxiang{
  display: inline-block;
  margin-right: .05rem;
}
.appH5_content table tr td{
  padding-top: .31rem;
}
.appH5_content table tr td:nth-child(2){
  width: 32%;
  padding-left: .2rem;
}
.appH5_content table tr td:nth-child(4){
  padding-left: .2rem;
}
.fixedMain{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
.fixedLeft{
  width: 65%;
  height: 1.6rem;
  background-color: #47423c;
  color: #fff;
}
.fixedRight{
  width: 35%;
  height: 1.6rem;
  background-color: #ff7271;
  align-items:center;
  display: -webkit-box;
  display: flex;
  display:-webkit-flex;
  justify-content:center;
}
.lxname{
  font-size: .4rem;
}
.lxcompany,.lxcont{
  max-width: 4.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: .3rem;
}
@media only screen and (min-width: 320px) and (max-width: 374px){
  .appH5_content table tr td:nth-child(2){
    width: 22%;
  }
  .pdrSpecial span{
    width: 2rem;
  }
}
</style>
