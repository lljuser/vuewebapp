// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import 'vant/lib/vant-css/index.css';

// import 'mint-ui/lib/style.css';
import router from './router/login';
import App from './components/Login';

// cors doamin
axios.defaults.withCredentials = true; 

 
// Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
