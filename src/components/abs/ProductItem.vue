<template>
  <div class="item">
    <p class="name">
      <router-link :to="`ProductDetail/${item.index}`">
        {{ item.title }}
      </router-link>
    </p>
    <p class="raking">{{ item.Content }}</p>
    <p class="year">{{ item.Time }}</p>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
  name: 'productItem',
  props: ['id', 'item'],
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
.item {
  display: flex;
  flex-direction: 'row';
  justify-content: center;
}
.item p {
  margin-right: 38px;
}
</style>
