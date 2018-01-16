import Vue from 'vue';
import Router from 'vue-router';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import '@/public/modules/expert/flexible';
import '@/public/css/expert/reset.css';
import '@/public/css/expert/editProfile.css';
import '@/public/css/theme.css';

import ReadProfile from '@/components/expert/ReadProfile';
import ReadAbsHistoryList from '@/components/expert/ReadAbsHistoryList';
import ReadOtherProjectList from '@/components/expert/ReadOtherProjectList';
import ReadArticleList from '@/components/expert/ReadArticleList';
import ReadActivityList from '@/components/expert/ReadActivityList';
import EditProfile from '@/components/expert/EditProfile';
import BasicInfomation from '@/components/expert/BasicInfomation';
import AbsHistory from '@/components/expert/AbsHistory';
import AbsHistoryList from '@/components/expert/AbsHistoryList';
import OtherProject from '@/components/expert/OtherProject';
import OtherProjectList from '@/components/expert/OtherProjectList';
import OtherPosition from '@/components/expert/OtherPosition';
import AwardAndHonor from '@/components/expert/AwardAndHonor';
import Activity from '@/components/expert/Activity';
import ActivityList from '@/components/expert/ActivityList';
import Article from '@/components/expert/Article';
import ArticleList from '@/components/expert/ArticleList';
import Education from '@/components/expert/Education';
import BriefIntroducation from '@/components/expert/BriefIntroducation';
import WorkHistory from '@/components/expert/WorkHistory';
import DealSearch from '@/components/expert/DealSearch';
import OrganizationSearch from '@/components/expert/OrganizationSearch';

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
      path: '/ReadAbsHistoryList/:userId?',
      name: 'ReadAbsHistoryList',
      component: ReadAbsHistoryList,
    },
    {
      path: '/ReadOtherProjectList/:userId?',
      name: 'ReadOtherProjectList',
      component: ReadOtherProjectList,
    },
    {
      path: '/ReadArticleList/:userId?',
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
      path: '/AbsHistory/:id?',
      name: 'AbsHistory',
      component: AbsHistory,
    },
    {
      path: '/OtherProject/:id?',
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
      path: '/OtherPosition/:id?',
      name: 'OtherPosition',
      component: OtherPosition,
    },
    {
      path: '/AwardAndHonor/:id?',
      name: 'AwardAndHonor',
      component: AwardAndHonor,
    },
    {
      path: '/Activity/:id?',
      name: 'Activity',
      component: Activity,
    },
    {
      path: '/ActivityList',
      name: 'ActivityList',
      component: ActivityList,
    },
    {
      path: '/Article/:id?',
      name: 'Article',
      component: Article,
    },
    {
      path: '/ArticleList',
      name: 'ArticleList',
      component: ArticleList,
    },
    {
      path: '/Education/:id?',
      name: 'Education',
      component: Education,
    },
    {
      path: '/BriefIntroducation',
      name: 'BriefIntroducation',
      component: BriefIntroducation,
    },
    {
      path: '/WorkHistory/:id?',
      name: 'WorkHistory',
      component: WorkHistory,
    },
    {
      path: '/ReadActivityList/:userId?',
      name: 'ReadActivityList',
      component: ReadActivityList,
    },
    {
      path: '/DealSearch/:dealName?',
      name: 'DealSearch',
      component: DealSearch,
    },
    //
    {
      path: '/OrganizationSearch/:orgName?',
      name: 'OrganizationSearch',
      component: OrganizationSearch,
    },
  ],
});
