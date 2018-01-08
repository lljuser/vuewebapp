import Vue from 'vue';
import Router from 'vue-router';
import User from '@/components/expert/User';
import Edit from '@/components/expert/Edit';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'User',
      component: User,
    },
    {
      path: '/user',
      name: 'User',
      component: User,
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit,
    },
  ],
});
