<template>
  <div id="app"> 
    <router-link to="/market">
      <a href="javascript:;">市场</a>
    </router-link>
    <router-link to="/product">
      <a href="javascript:;">产品</a>
    </router-link>
    <router-link to="/trade">
      <a href="javascript:;">交易</a>
    </router-link>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'abs',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
