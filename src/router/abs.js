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
import Security from '@/components/abs/Security';
import Organ from '@/components/abs/Organ';
import SecurityDetail from '@/components/abs/SecurityDetail';
import OrganDetail from '@/components/abs/OrganDetail';
import InstitutionalExperts from '@/components/abs/InstitutionalExperts';
import InstitutionalArticle from '@/components/abs/InstitutionalArticle';
import OrganDeal from '@/components/abs/OrganDeal';

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
      path: '/trade/:gradeId/:couponId',
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
    {
      path: '/security',
      name: 'security',
      component: Security,
    },
    {
      path: '/security/:dealType',
      name: 'security1',
      component: Security,
    },
    {
      path: '/securityDetail/:id',
      name: 'securityDetail',
      component: SecurityDetail,
    },
    {
      path: '/organ',
      name: 'organ',
      component: Organ,
    },
    {
      path: '/organDetail/:id',
      name: 'organDetail',
      component: OrganDetail,
    },
    {
      path: '/organDeal/:id',
      name: 'organDeal',
      component: OrganDeal,
    },
    {
      path: '/institutionalExperts/:id',
      name: 'institutionalExperts',
      component: InstitutionalExperts,
    },
    {
      path: '/institutionalArticle/:id',
      name: 'institutionalArticle',
      component: InstitutionalArticle,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // console.log(savedPosition);
    if (savedPosition) {
      return savedPosition;
    }  
    return { x: 0, y: 0 };
  },
  saveScrollPosition: true,
  // scrollBehavior: (to, from, savedPosition) => {
  //   if (savedPosition) {
  //     console.log(savedPosition);
  //     return savedPosition;
  //     // return { x: savedPosition.x, y: savedPosition.y + 667 };
  //   }  
  //   return { x: 0, y: 0 };
  // },
});
