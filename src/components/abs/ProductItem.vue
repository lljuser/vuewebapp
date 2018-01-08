<template>
  <div class="form">
    <p @click.stop="onClick">ID: {{ $route.params.id }}</p>
    <input :value="$route.params.user && $route.params.user.name"/>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
  name: 'ProductItem',
  props: ['id'],
  created() {
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  methods: {
    onClick() {
      const instance = Toast('提示信息');
      setTimeout(() => {
        instance.close();
      }, 2000);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
