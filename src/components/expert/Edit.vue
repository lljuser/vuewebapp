<template>
  <div class="form">
    <p></p>
    姓名:<input value="张三"/>
    地址<input value="上海"/>
    爱好<input value="打球"/>
  </div>
</template>

<script>
export default {
  name: 'Form',
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
