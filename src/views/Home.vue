<template>
  <div class="home">
    <Categories :categories="categories"/>
  </div>
</template>

<script>
import Categories from '../components/Home/Categories.vue';
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Categories
  },
  created() {
    this.$store.dispatch("category/fetchCategories");
  },
  computed: {
    categories() {
      return this.$store.getters["category/getCategories"];
    }
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.home {
  padding: 10px;
}
</style>