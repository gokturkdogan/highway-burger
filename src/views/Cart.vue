<template>
  <div class="cart">
    <div class="cart__loader" v-if="loader"><BurgerSpinner /></div>
    
    <div v-else class="cart__container">
      <div class="cart__content">
        <CartEmpty v-if="isEmpty" />
        <CartList 
          v-else
          :products="products" 
          @increase-quantity="increaseQuantity"
          @decrease-quantity="decreaseQuantity"
          @remove-item="removeItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BurgerSpinner from '../components/base/BurgerSpinner.vue';
import CartList from '../components/Cart/List.vue';
import CartEmpty from '../components/Cart/Empty.vue';

export default {
  name: "Cart",
  data() {
    return {};
  },
  components: {
    BurgerSpinner,
    CartList,
    CartEmpty
  },
  created() {
    this.$store.dispatch('cart/fetchCart');
  },
  computed: {
    loader() {
      return this.$store.getters['cart/getLoader'];
    },
    basket() {
      return this.$store.getters['cart/getBasket'];
    },
    products() {
      return this.basket?.products || [];
    },
    isEmpty() {
      return this.products.length === 0;
    },
    summary() {
      return this.$store.getters['cart/calculateSummary'];
    }
  },
  methods: {
    increaseQuantity(index) {
      const updatedProducts = [...this.products];
      updatedProducts[index].quantity = (updatedProducts[index].quantity || 1) + 1;
      this.updateCart(updatedProducts);
    },
    decreaseQuantity(index) {
      const updatedProducts = [...this.products];
      if (updatedProducts[index].quantity > 1) {
        updatedProducts[index].quantity -= 1;
        this.updateCart(updatedProducts);
      }
    },
    removeItem(index) {
      const updatedProducts = this.products.filter((_, i) => i !== index);
      this.updateCart(updatedProducts);
    },
    async updateCart(products) {
      const updatedBasket = {
        ...this.basket,
        products
      };
      
      try {
        const token = localStorage.getItem('jwt');
        const userId = this.$store.state.profile.profile.id;
        const updateCartUrl = this.$store.state.cart.constructor.name;
        
        await this.$store.dispatch('cart/updateCart', {
          basket: updatedBasket,
          userId,
          token
        });
      } catch (err) {
        console.error('Sepet güncelleme hatası:', err);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.cart {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 100px;

  &__loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
  }

  &__container {
    width: 100%;
  }

  &__content {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 300px;
  }
}

@media (max-width: 1024px) {
  .cart {
    &__content {
      padding-bottom: 100px;
    }
  }
}

@media (max-width: 768px) {
  .cart {
    padding: 16px;
  }
}
</style>