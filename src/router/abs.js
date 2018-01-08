import Vue from 'vue';
import Router from 'vue-router';
import Product from '@/components/abs/Product';
import Market from '@/components/abs/Market';
import Trade from '@/components/abs/Trade';
import Form from '@/components/abs/Form';
import ProductItem from '@/components/abs/ProductItem';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Product',
      component: Market,
    },
    {
      path: '/product',
      name: 'Product',
      component: Product,
    },
    {
      path: '/market',
      name: 'Market',
      component: Market,
    },
    {
      path: '/trade',
      name: 'trade',
      component: Trade,
    },
    {
      path: '/form/:id',
      name: 'form',
      component: Form,
    },
    {
      path: '/productItem/:id',
      name: 'productItem',
      component: ProductItem,
    },
  ],
});
