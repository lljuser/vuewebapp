// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import MintUI from 'mint-ui';
//import 'mint-ui/lib/style.css';
import router from './router/abs';
import App from './components/Abs';

Vue.use(MintUI);
Vue.use(require('vue-moment'));

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
