<template>
  <div class="products">
    <div class="products__loader" v-if="loader">
      <BurgerSpinner />
    </div>
    <div v-else>
      <Empty v-if="isEmpty" />
      <List v-else="products.lenght" :products="products" :isDrinks="isDrinks" :isSandwiches="isSandwiches"
        :isToastes="isToastes" />
    </div>
  </div>
</template>

<script>
import List from '../components/Products/List.vue';
import BurgerSpinner from '../components/base/BurgerSpinner.vue';
import Empty from '../components/Products/Empty.vue';
export default {
  name: "Products",
  components: {
    List,
    BurgerSpinner,
    Empty
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
    },
    isToastes() {
      return this.$route.params.categorySlug === 'toastes';
    },
    isEmpty() {
      return this.products.length === 0;
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