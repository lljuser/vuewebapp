import Vue from 'vue';
import Router from 'vue-router';
import Product from '@/components/Product';
import Market from '@/components/Market';
import Trade from '@/components/Trade';
import Form from '@/components/Form';
import ProductItem from '@/components/ProductItem';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Product',
      component: Product,
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
