<template>
  <div class="trade">
    <h1>交易页</h1>
    <Form v-for="num in data" :key="num" :id="num" />
  </div>
</template>

<script>
import Form from './Form';

export default {
  name: 'Trade',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      data: [1, 2, 3, 4, 5],
    };
  },
  components: {
    Form,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
