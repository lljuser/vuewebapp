<template>
  <div class="form">
    <p>ID: {{ id }}</p>
    <input value="zhangsan"/>
  </div>
</template>

<script>
export default {
  name: 'TradeItem',
  props: ['id'],
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
