<template>
  <div id="app"> 
    <router-link to="/user">
      <a href="javascript:;">用户</a>
    </router-link>
    <router-link to="/edit">
      <a href="javascript:;">修改</a>
    </router-link> 
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'expert',
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
