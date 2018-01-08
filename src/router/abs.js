import Vue from 'vue';
import Router from 'vue-router';
import Product from '@/components/abs/Product';
import Market from '@/components/abs/Market';
import Trade from '@/components/abs/Trade';
import TradeItem from '@/components/abs/TradeItem';
import ProductItem from '@/components/abs/ProductItem';

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
      path: '/productItem/:id',
      name: 'productItem',
      component: ProductItem,
    },
  ],
});
