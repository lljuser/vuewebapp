import Vue from 'vue';
import Router from 'vue-router';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import '@/public/modules/expert/flexible';
import '@/public/css/expert/reset.css';
import '@/public/css/expert/editProfile.css';

import ReadProfile from '@/components/expert/ReadProfile';
import ReadAbsHistoryList from '@/components/expert/ReadAbsHistoryList';
import ReadOtherProjectList from '@/components/expert/ReadOtherProjectList';
import ReadArticleList from '@/components/expert/ReadArticleList';
import EditProfile from '@/components/expert/EditProfile';
import BasicInfomation from '@/components/expert/BasicInfomation';
import AbsHistory from '@/components/expert/AbsHistory';
import AbsHistoryList from '@/components/expert/AbsHistoryList';
import OtherProject from '@/components/expert/OtherProject';
import OtherProjectList from '@/components/expert/OtherProjectList';
import OtherPosition from '@/components/expert/OtherPosition';
import AwardAndHonor from '@/components/expert/AwardAndHonor';
import Activity from '@/components/expert/Activity';
import Article from '@/components/expert/Article';
import Education from '@/components/expert/Education';
import BriefIntroducation from '@/components/expert/BriefIntroducation';

Vue.use(Router);
Vue.use(MintUI);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ReadProfile',
      component: ReadProfile,
    },
    {
      path: '/ReadAbsHistoryList',
      name: 'ReadAbsHistoryList',
      component: ReadAbsHistoryList,
    },
    {
      path: '/ReadOtherProjectList',
      name: 'ReadOtherProjectList',
      component: ReadOtherProjectList,
    },
    {
      path: '/ReadArticleList',
      name: 'ReadArticleList',
      component: ReadArticleList,
    },
    {
      path: '/EditProfile',
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
    {
      path: '/OtherProject',
      name: 'OtherProject',
      component: OtherProject,
    },
    {
      path: '/AbsHistoryList',
      name: 'AbsHistoryList',
      component: AbsHistoryList,
    },
    {
      path: '/OtherProjectList',
      name: 'OtherProjectList',
      component: OtherProjectList,
    },
    {
      path: '/OtherPosition',
      name: 'OtherPosition',
      component: OtherPosition,
    },
    {
      path: '/AwardAndHonor',
      name: 'AwardAndHonor',
      component: AwardAndHonor,
    },
    {
      path: '/Activity',
      name: 'Activity',
      component: Activity,
    },
    {
      path: '/Article',
      name: 'Article',
      component: Article,
    },
    {
      path: '/Education',
      name: 'Education',
      component: Education,
    },
    {
      path: '/BriefIntroducation',
      name: 'BriefIntroducation',
      component: BriefIntroducation,
    },
  ],
});
