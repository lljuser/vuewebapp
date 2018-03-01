<template>
  <div id="app"> 
    <div v-if="showHeader" class="appH5_navbar_bg">
      <mt-header :title="headTitle">
         <a href="javascript:" slot="left">
          <mt-button icon="back" @click.stop="clearPath"></mt-button>
          <mt-button @click.stop="handleClose" v-if="showClose">&nbsp;&nbsp;关闭 </mt-button>
        </a>
      </mt-header>
    </div>
    <transition>
      <router-view />
    </transition>
  </div>
</template>

<script>
import BusUtil from "./abs/BusUtil";
import fontawesome from '@fortawesome/fontawesome';
import faCircle from '@fortawesome/fontawesome-free-regular';
fontawesome.library.add(faCircle);
import Vue from 'vue';


import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
Vue.component('font-awesome-icon', FontAwesomeIcon);


export default {
  name: "expert",
  data() {
    return {
      showHeader: false,
      path: "",
      headTitle: "专家履历",
      showClose: false,
      lastPath: ""
    };
  },
  created() {
    const busUtil = BusUtil.getInstance();
    busUtil.bus.$on("showHeader", showHeader => {
      this.showHeader = showHeader;
    });
    busUtil.bus.$on("path", path => {
      this.path = path;
    });
    busUtil.bus.$on("headTitle", headTitle => {
      this.headTitle = headTitle;
    });
    busUtil.bus.$on("showClose", (showClose, lastPath) => {
      this.showClose = showClose;
      this.lastPath = lastPath;
    });
  },
  methods: {
    clearPath: function() {
      if(this.path=="fromAbs")
      {
        history.back();
      }
      else{
        location.href=this.path;
      }
    },
    handleClose: function() {
      location.href = "abs.html#" + this.lastPath;
    }
  }
};
</script>

<style>

</style>
