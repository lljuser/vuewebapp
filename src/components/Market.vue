<template>
  <div class="hello">
    <h1>市场页</h1>
    <p v-for="row in list" :key="row.id" v-html="row.content"></p>
  </div>
</template>

<script>
export default {
  name: 'Market',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      list: [],
    };
  },
  created() {
    this.fetchPost();
  },
  methods: {
    fetchPost() {
      fetch('http://cnodejs.org/api/v1/topics').then(response => response.json())
      .then((json) => {
        this.list = json.data;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
