<template>
  <div id="app"> 
    <!-- <router-view/> -->
    <div v-if="showHeader" class="appH5_navbar_bg">
      <mt-header :title="headTitle">
        <a :href="path" slot="left">
          <mt-button icon="back" @click.stop="clearPath"></mt-button>
        </a>
        <!-- <router-link :to="path" slot="left">
          <mt-button icon="back" @click.stop="clearPath"></mt-button>
        </router-link> -->
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
import BusUtil from './abs/BusUtil';

export default {
  name: 'expert',
  data() {
    return {
      showHeader: false,
      path: '',
      headTitle:'专家履历',
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
    busUtil.bus.$on('headTitle', (headTitle) => {
      this.headTitle = headTitle;
    });
  },
  methods: {
    clearPath: function () {

    }
  }
};
</script>

<style>

</style>
