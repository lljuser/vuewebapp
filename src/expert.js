// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import '@/public/modules/expert/flexible';
import '@/public/css/expert/reset.css';
import '@/public/css/theme.css';
import '@/public/css/expert/editProfile.css';
import router from './router/expert';
import App from './components/Expert';


// cors doamin
axios.defaults.withCredentials = true; 
Vue.config.productionTip = false;
Vue.use(MintUI);
Vue.use(require('vue-moment'));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
