<template>
  <div class="form">
    <p></p>
    <p>姓名:<small>张三</small></p>
    <p>地址:<small>上海</small></p>
    <p>爱好:<small>打球</small></p> 
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
