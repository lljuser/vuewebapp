import Vue from 'vue';
import Router from 'vue-router';
import Product from '@/components/abs/Product';
import Market from '@/components/abs/Market';
import Trade from '@/components/abs/Trade';
import TradeItem from '@/components/abs/TradeItem';
import ProductDetail from '@/components/abs/ProductDetail';
import ProductDetailWithoutBack from '@/components/abs/ProductDetailWithoutBack';
import FlexDemo from '@/components/abs/FlexDemo';
import TradeDetail from '@/components/abs/TradeDetail';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/', 
      redirect: '/market',
    },
    {
      path: '/product',
      name: 'product',
      component: Product,
    },
    {
      path: '/product/:productType',
      name: 'product1',
      component: Product,
    },
    {
      path: '/product/:productType/:dealType',
      name: 'product2',
      component: Product,
    },
    {
      path: '/market',
      name: 'market',
      component: Market,
    },
    {
      path: '/trade',
      name: 'trade',
      component: Trade,
    },
    {
      path: '/trade/:gradeId',
      name: 'trade1',
      component: Trade,
    },
    {
      path: '/trade/:gradeId/:securityId',
      name: 'trade2',
      component: Trade,
    },
    {
      path: '/tradeitem/:id',
      name: 'tradeitem',
      component: TradeItem,
    },
    {
      path: '/productDetail/:id',
      name: 'productDetail',
      component: ProductDetail,
    },
    {
      path: '/ProductDetailWithoutBack/:id',
      name: 'ProductDetailWithoutBack',
      component: ProductDetailWithoutBack,
    },
    {
      path: '/flex',
      name: 'flex',
      component: FlexDemo,
    },
    {
      path: '/tradedetail/:tradeId/:noteId',
      name: 'tradedetail',
      component: TradeDetail,
    },
  ],
});
