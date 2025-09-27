<template>
  <div class="products">
    <div v-if="loader">loader</div>
    <List v-else :products="products" :isDrinks="isDrinks" :isSandwiches="isSandwiches"/>
  </div>
</template>

<script>
import List from '../components/Products/List.vue';
export default {
  name: "Products",
  components: {
    List
  },
  props: {
    categorySlug: {
      type: String,
      required: true,
      default: 'burgers'
    }
  },
  async created() {
    await this.$store.dispatch('product/fetchProducts', this.categorySlug)
  },
  computed: {
    products() {
      return this.$store.getters["product/getProducts"];
    },
    loader() {
      return this.$store.getters["product/getLoader"];
    },
    isDrinks() {
      return this.$route.params.categorySlug === 'drinks';
    },
    isSandwiches() {
      return this.$route.params.categorySlug === 'sandwiches';
    }
  },
};
</script>
<style lang="scss" scoped>
.products {
  padding: 10px;
}
</style>