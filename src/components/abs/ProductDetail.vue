<template>
  <div class="productDetail">
    <h2>产品详情页</h2>
    <h3>{{ productDetail && productDetail.Title }}</h3>
    <p>{{ productDetail && productDetail.Content }}</p>
    <p>{{ productDetail && productDetail.Time }}</p>
  </div>
</template>

<style scoped>

</style>

<script>
import BusUtil from './BusUtil';

export default {
  name: 'productDetail',
  created() {
    const busUtil = BusUtil.getInstance();
    this.id = this.$route.params.id;
    this.fetchProductDetail(this.id);
    busUtil.bus.$emit('showHeader', true);
  },
  data() {
    return {
      productDetail: null,
    };
  },
  methods: {
    fetchProductDetail(id) {
      fetch(`http://10.1.1.35/Demo/DemoProduct/getitem/${id}`)
      .then(response => response.json())
      .then((json) => {
        this.productDetail = json.data;
      });
    },
  },
};
</script>
