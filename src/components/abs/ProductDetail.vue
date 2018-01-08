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
export default {
  name: 'productDetail',
  created() {
    this.id = this.$route.params.id;
    // console.log(this.$route.params.id);
    this.fetchProductDetail(this.id);
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
