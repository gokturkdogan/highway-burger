<template>
  <div class="appBar">
    <div class="appBar__side -left">
      <router-link to="/" class="appBar__link" :class="{ '-active': activeRoute === 'Home' }">
        <HomeIcon/>
      </router-link>
      <router-link @click="setProducts('burgers')" to="/products/burgers" class="appBar__link" :class="{ '-active': activeRoute === 'burgers' }">
        <BurgerIcon/>
      </router-link>
      <router-link @click="setProducts('toastes')" to="/products/toastes" class="appBar__link" :class="{ '-active': activeRoute === 'toastes' }">
        <ToastIcon/>
      </router-link>
    </div>
    <router-link to="/cart" class="appBar__mid">
      <BasketIcon/>
      <span v-if="cartItemCount > 0" class="appBar__badge">{{ cartItemCount }}</span>
    </router-link>
    <div class="appBar__side -right">
      <router-link @click="setProducts('sandwiches')" to="/products/sandwiches" class="appBar__link" :class="{ '-active': activeRoute === 'sandwiches' }">
        <SandwichIcon/>
      </router-link>
      <router-link @click="setProducts('menus')" to="/products/menus" class="appBar__link" :class="{ '-active': activeRoute === 'menus' }">
        <MenuIcon/>
      </router-link>
      <router-link @click="setProducts('drinks')" to="/products/drinks" class="appBar__link" :class="{ '-active': activeRoute === 'drinks' }">
        <DrinkIcon/>
      </router-link>
    </div>
  </div>
</template>
    
<script>
import HomeIcon from "../../assets/icons/home-icon.vue";
import BasketIcon from "../../assets/icons/basket-icon.vue";
import BurgerIcon from "../../assets/icons/burger-icon.vue";
import SandwichIcon from "../../assets/icons/sandwich-icon.vue";
import ToastIcon from "../../assets/icons/toast-icon.vue";
import MenuIcon from "../../assets/icons/menu-icon.vue";
import DrinkIcon from "../../assets/icons/drink-icon.vue";

export default {
  name: "Appbar",
  components: {
    HomeIcon,
    BasketIcon,
    BurgerIcon,
    SandwichIcon,
    ToastIcon,
    MenuIcon,
    DrinkIcon
  },
  methods: {
    setProducts(category) {
      this.$store.dispatch('product/fetchProducts', category)
    }
  },
  computed: {
    activeRoute() {
      return this.$route.name === 'Home' ? 'Home' : this.$route.params.categorySlug;
    },
    basket() {
      return this.$store.getters['cart/getBasket'];
    },
    cartItemCount() {
      const products = this.basket?.products || [];
      return products.length;
    }
  },
};
</script>
<style lang="scss" scoped>
.appBar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) -1px -6px 5px 0px;
  align-items: center;
  z-index: 100;

  &__mid {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #bb7c05;
    padding: 10px;
    border-radius: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 0;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    svg {
        width: 50px;
        fill: white;
    }
  }

  &__badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    font-size: 12px;
    font-weight: 700;
    width: 10px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 6px;
    box-shadow: 0 3px 10px rgba(239, 68, 68, 0.5);
    border: 2px solid white;
    animation: badgePulse 2s ease-in-out infinite;
  }

  &__side {
    display: flex;
    justify-content: space-between;
  }

  &__link {
    padding-bottom: 10px;
    width: 50px;
    display: flex;
    justify-content: center;

    svg {
        width: 30px;
        fill: #bb7c05;
    }

    &.-active {
      border-bottom: 5px solid #bb7c05;
      background: #d49624;
      background: linear-gradient(to top, #f7ae26 0%, transparent 100%);
      clip-path: polygon(0% 0%, 100% 0%, 70% 100%, 30% 100%);
    }
  }
}

@keyframes badgePulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
</style>
  