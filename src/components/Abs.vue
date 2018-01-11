<template>
  <div id="app" class="cnabs-bg">
    <div v-if="!showHeader" class="appH5_navbar">
      <router-link to="/market" tag="div">
        <a class="appH5_tab" href="javascript:;">市场</a>
      </router-link>
      <router-link to="/product" tag="div">
        <a class="appH5_tab" href="javascript:;">产品</a>
      </router-link>
      <router-link to="/trade" tag="div">
        <a class="appH5_tab" href="javascript:;">交易</a>
      </router-link>
    </div> 

    <div v-else class="appH5_navbar_bg">
      <mt-header title="产品信息">
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

export default {
  name: 'abs',
  data() {
    return {
      showHeader: false,
      path: '',
    };
  },
  created() {
    const busUtil = BusUtil.getInstance();
    busUtil.bus.$on('showHeader', (showHeader) => {
      this.showHeader = showHeader;
    });
    busUtil.bus.$on('path', (path) => {
      this.path = path;
    });
  },
  methods: {
    clearPath() {
      this.showHeader = false;
      this.path = '';
    },
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
