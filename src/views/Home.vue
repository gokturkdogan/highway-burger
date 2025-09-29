<template>
  <div class="home">
    <div class="home__loader" v-if="loader"><BurgerSpinner /></div>
    <Categories v-else :categories="categories"/>
  </div>
</template>

<script>
import Categories from '../components/Home/Categories.vue';
import BurgerSpinner from '../components/base/BurgerSpinner.vue';
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Categories,
    BurgerSpinner
  },
  created() {
    this.$store.dispatch("category/fetchCategories");
  },
  computed: {
    categories() {
      return this.$store.getters["category/getCategories"];
    },
    loader() {
      return this.$store.getters["category/getLoader"];
    }
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.home {
  padding: 10px;

  &__loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
  }
}
</style>