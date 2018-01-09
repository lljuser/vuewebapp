<template>
  <div id="app" class="cnabs-bg">
    <template v-if="!showHeader">
      <router-link to="/market">
        <a href="javascript:;">市场</a>
      </router-link>
      <router-link to="/product">
        <a href="javascript:;">产品</a>
      </router-link>
      <router-link to="/trade">
        <a href="javascript:;">交易</a>
      </router-link>
    </template>
    
    <template v-else>
      <mt-header title="标题过长会隐藏后面的内容啊哈哈哈哈">
        <router-link to="/" slot="left">
          <mt-button icon="back" @click.stop="goBack">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </template>

    <router-view />
  </div>
</template>

<script> 
import '@/public/css/theme.css';
import BusUtil from './abs/BusUtil';

export default {
  name: 'abs',
  data() {
    return {
      showHeader: false,
    };
  },
  created() {
    const busUtil = BusUtil.getInstance();
    busUtil.bus.$on('showHeader', (showHeader) => {
      this.showHeader = showHeader;
    });
  },
  methods: {
    goBack() {
      this.showHeader = false;
      this.$router.go(-1);
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
