<template>
  <div id="app" class="cnabs-bg">
    <ProductDetail />
  </div>
</template>

<script>
import ProductDetail from './abs/ProductDetailWithoutBack';
import '@/public/css/theme.css';

export default {
  components: {
    ProductDetail,
  },
};
</script>
