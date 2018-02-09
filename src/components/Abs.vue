<template>
  <div id="app" class="cnabs-bg">
    <div v-if="!showHeader" class="appH5_navbar_bg">
      <div class="appH5_navbar" >
        <router-link to="/market" tag="div" class="navbar-item">
          <a class="appH5_tab" href="javascript:;">市场</a>
        </router-link>
        <router-link to="/product" tag="div" class="navbar-item">
          <a class="appH5_tab" href="javascript:;">产品</a>
        </router-link>
        <router-link to="/trade" tag="div" class="navbar-item">
          <a class="appH5_tab" href="javascript:;">交易</a>
        </router-link>
        <router-link to="/security" tag="div" class="navbar-item">
          <a class="appH5_tab" href="javascript:;">证券</a>
        </router-link>
        <router-link to="/organ" tag="div" class="navbar-item">
          <a class="appH5_tab" href="javascript:;">机构</a>
        </router-link>
      </div>
    </div> 

    <div v-else class="appH5_navbar_bg">
      <mt-header :title="headTitle">
        <router-link :to="path" slot="left">
          <mt-button icon="back" @click.stop="clearPath"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <transition>
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>   
<script> 
import 'mint-ui/lib/style.css'
import '@/public/css/theme.css';
import BusUtil from './abs/BusUtil';
import fontawesome from '@fortawesome/fontawesome';
import faCircle from '@fortawesome/fontawesome-free-regular';

fontawesome.library.add(faCircle);
import Vue from 'vue';

import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
Vue.component('font-awesome-icon', FontAwesomeIcon);

export default {
  name: 'abs',
  data() {
    return {
      showHeader: false,
      path: '',
      headTitle:'产品信息',
      tabs: ['market', 'product', 'trade','security','organ'],
      startX: 0,
      startY: 0,
      isVertical: false
    };
  },
  created() {
    var self = this;
    const busUtil = BusUtil.getInstance();
    busUtil.bus.$on('showHeader', (showHeader) => {
      this.showHeader = showHeader;
    });
    busUtil.bus.$on('path', (path) => {
      this.path = path;
    });
    busUtil.bus.$on('headTitle', (headTitle) => {
      this.headTitle = headTitle;
    });

    //checkout route by swipe
    let isTouch = 'ontouchstart' in window;
    let mouseEvents = isTouch ?
        {
            down: 'touchstart',
            move: 'touchmove',
            up: 'touchend',
            over: 'touchstart',
            out: 'touchend'
        } :
        {
            down: 'mousedown',
            move: 'mousemove',
            up: 'mouseup',
            over: 'mouseover',
            out: 'mouseout'
        };
    document.addEventListener(mouseEvents.down, function (e) {
      //记录手指按下的位置
      self.startX = e.clientX || e.changedTouches[0].clientX; 
      self.startY = e.clientY || e.changedTouches[0].clientY; 
    }, false);
    document.addEventListener(mouseEvents.up, function (e) {
      //记录手指结束的位置
       let nowX = e.clientX || e.changedTouches[0].clientX;
       let nowY = e.clientY || e.changedTouches[0].clientY;
       self.isVertical = Math.abs(nowY - self.startY) / Math.abs(nowX - self.startX) > (Math.sqrt(3) / 3);
       if (!self.isVertical) {
         var index = self.getRouterIndex()*1;
         var flag = self.needSwipe(self.$route, self.tabs);
         if (flag) {
           if ((nowX - self.startX) > 60) {
             self.$router.push({ name: self.tabs[index - 1]});
           } else if ((nowX - self.startX) < -60) {
           self.$router.push({ name: self.tabs[index + 1]});
           }
         }
      }
    }, false);
  },
  methods: {
    clearPath() {
      this.showHeader = false;
      this.path = '';
    },
    getRouterIndex() {
       var tabs = this.tabs;
       for (var index in tabs) {
         if (this.$route.path.indexOf(tabs[index]) != -1) {
           return index;
         }
       }
    },
    needSwipe(route, arrays) {
      var rlt = false;
      arrays.forEach(function (item) {
          if (item === route.name || route.path.indexOf('/'+item+'/') !== -1) {
            rlt = true;
          }
      });
      return rlt;
    }
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
