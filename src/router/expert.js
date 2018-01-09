import Vue from 'vue';
import Router from 'vue-router';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

import EditProfile from '@/components/expert/EditProfile';
import BasicInfomation from '@/components/expert/BasicInfomation';
import AbsHistory from '@/components/expert/AbsHistory';


Vue.use(Router);
Vue.use(MintUI);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EditProfile',
      component: EditProfile,
    },
    {
      path: '/BasicInfomation',
      name: 'BasicInfomation',
      component: BasicInfomation,
    },
    {
      path: '/AbsHistory',
      name: 'AbsHistory',
      component: AbsHistory,
    },
  ],
});
