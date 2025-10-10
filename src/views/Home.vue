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
      const allCategories = this.$store.getters["category/getCategories"];
      
      // Kategorileri özel sırayla düzenle: Burger → Tost → Sıcak Sandviç → Diğerleri
      const categoryOrder = ['burger', 'tost', 'sandviç', 'sandwich'];
      
      return [...allCategories].sort((a, b) => {
        const aName = (a.attributes?.name?.toLowerCase() || '') + ' ' + (a.attributes?.slug?.toLowerCase() || '');
        const bName = (b.attributes?.name?.toLowerCase() || '') + ' ' + (b.attributes?.slug?.toLowerCase() || '');
        
        // Her kategori için öncelik puanı bul
        const getPriority = (text) => {
          for (let i = 0; i < categoryOrder.length; i++) {
            if (text.includes(categoryOrder[i])) {
              return i;
            }
          }
          return categoryOrder.length; // Diğer kategoriler en sona
        };
        
        const aPriority = getPriority(aName);
        const bPriority = getPriority(bName);
        
        return aPriority - bPriority;
      });
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

// Desktop için padding
@media (min-width: 769px) {
  .home {
    padding: 20px 0;
  }
}
</style>