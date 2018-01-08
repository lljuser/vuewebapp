<template>
  <div class="form">
    <p>ID: {{ $route.params.id }}</p>
    <input :value="$route.params.user && $route.params.user.name"/>
  </div>
</template>

<script>
export default {
  name: 'Form',
  props: ['id'],
  created() {
  },
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
