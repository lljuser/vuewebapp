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
      name: 'market',
      component: Market,
    },
    {
      path: '/product',
      name: 'product',
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
      path: '/productDetailBack/:id',
      name: 'productDetailBack',
      component: ProductDetailWithoutBack,
    },
    {
      path: '/flex',
      name: 'flex',
      component: FlexDemo,
    },
    {
      path: '/tradedetail',
      name: 'tradedetail',
      component: TradeDetail,
    },
  ],
});
