<template>
  <div class="products">
    <div class="products__loader" v-if="loader"><BurgerSpinner /></div>
    <List v-else :products="products" :isDrinks="isDrinks" :isSandwiches="isSandwiches"/>
  </div>
</template>

<script>
import List from '../components/Products/List.vue';
import BurgerSpinner from '../components/base/BurgerSpinner.vue';
export default {
  name: "Products",
  components: {
    List,
    BurgerSpinner
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

  &__loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
  }
}
</style>