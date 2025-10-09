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
    <router-link to="/cart" class="appBar__mid" :class="{ '-has-items': cartItemCount > 0 }">
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
  data() {
    return {
      resizeObserver: null
    };
  },
  mounted() {
    this.updateAppBarHeight();
    this.setupResizeObserver();
    window.addEventListener('resize', this.updateAppBarHeight);
    window.addEventListener('orientationchange', this.updateAppBarHeight);
  },
  beforeUnmount() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    window.removeEventListener('resize', this.updateAppBarHeight);
    window.removeEventListener('orientationchange', this.updateAppBarHeight);
  },
  methods: {
    setProducts(category) {
      this.$store.dispatch('product/fetchProducts', category)
    },
    updateAppBarHeight() {
      this.$nextTick(() => {
        const appBar = this.$el;
        if (appBar) {
          const height = appBar.offsetHeight;
          document.documentElement.style.setProperty('--appbar-height', `${height}px`);
        }
      });
    },
    setupResizeObserver() {
      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(() => {
          this.updateAppBarHeight();
        });
        this.resizeObserver.observe(this.$el);
      }
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
  padding: 12px 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
  backdrop-filter: blur(15px);
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.12),
              0 -4px 15px rgba(187, 124, 5, 0.1);
  align-items: center;
  z-index: 100;
  border-top: 2px solid rgba(187, 124, 5, 0.12);
  animation: slideUp 0.6s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(187, 124, 5, 0.3) 20%, 
      rgba(187, 124, 5, 0.5) 50%, 
      rgba(187, 124, 5, 0.3) 80%, 
      transparent 100%);
    animation: shimmer 3s ease-in-out infinite;
  }

  &__mid {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #bb7c05 0%, #d49624 50%, #bb7c05 100%);
    background-size: 200% 200%;
    padding: 11px;
    border-radius: 50%;
    position: absolute;
    top: -38px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 12px 40px rgba(187, 124, 5, 0.45),
                0 6px 20px rgba(0, 0, 0, 0.25),
                inset 0 2px 6px rgba(255, 255, 255, 0.3),
                0 0 0 4px white;
    width: 76px;
    height: 76px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    animation: cartFloat 3s ease-in-out infinite;
    border: 3px solid white;

    svg {
        width: 50px;
        fill: white;
        transition: all 0.4s ease;
    }

    &:hover,
    &.-has-items {
      transform: translateX(-50%) translateY(-10px) scale(1.12);
      box-shadow: 0 18px 50px rgba(187, 124, 5, 0.55),
                  0 8px 25px rgba(0, 0, 0, 0.3),
                  0 0 0 4px white;
      background-position: 100% 50%;
      animation: cartFloat 3s ease-in-out infinite, buttonGlow 1.5s ease-in-out infinite;

      svg {
        transform: scale(1.15) rotate(8deg);
      }
    }

    &:active {
      transform: translateX(-50%) translateY(-5px) scale(1.08);
      box-shadow: 0 10px 35px rgba(187, 124, 5, 0.5);
    }
  }

  &__badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    font-size: 13px;
    font-weight: 800;
    width: 10px;
    height: 26px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 7px;
    box-shadow: 0 5px 18px rgba(239, 68, 68, 0.65),
                0 0 0 3px white,
                inset 0 1px 3px rgba(255, 255, 255, 0.5);
    animation: badgePulse 2s ease-in-out infinite;
    border: 3px solid white;
    letter-spacing: -0.5px;
  }

  &__side {
    display: flex;
    justify-content: space-between;
    gap: 6px;
  }

  &__link {
    width: 56px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 18px;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    background: transparent;

    svg {
        width: 32px;
        fill: #bb7c05;
        transition: all 0.35s ease;
        filter: drop-shadow(0 2px 6px rgba(187, 124, 5, 0.2));
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 18px;
      background: linear-gradient(135deg, rgba(187, 124, 5, 0.1), rgba(187, 124, 5, 0.05));
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover {
      background: linear-gradient(135deg, rgba(187, 124, 5, 0.12) 0%, rgba(187, 124, 5, 0.08) 100%);
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 8px 20px rgba(187, 124, 5, 0.2);

      svg {
        fill: #d49624;
        transform: scale(1.2) rotate(3deg);
        filter: drop-shadow(0 4px 12px rgba(187, 124, 5, 0.35));
      }

      &::before {
        opacity: 1;
      }
    }

    &:active {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 4px 12px rgba(187, 124, 5, 0.15);
    }

    &.-active {
      background: linear-gradient(135deg, rgba(187, 124, 5, 0.18) 0%, rgba(187, 124, 5, 0.12) 100%);
      box-shadow: inset 0 3px 10px rgba(187, 124, 5, 0.2),
                  0 4px 15px rgba(187, 124, 5, 0.15);
      
      svg {
        fill: #bb7c05;
        transform: scale(1.18);
        filter: drop-shadow(0 5px 15px rgba(187, 124, 5, 0.4));
      }
      
      &::after {
        content: '';
        position: absolute;
        bottom: 4px;
        left: 50%;
        transform: translateX(-50%);
        width: 35px;
        height: 4px;
        background: linear-gradient(90deg, transparent, #bb7c05 20%, #d49624 50%, #bb7c05 80%, transparent);
        border-radius: 2px;
        animation: activeGlow 2.5s ease-in-out infinite;
      }

      &::before {
        opacity: 1;
      }
    }
  }
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes cartFloat {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-4px);
  }
}

@keyframes badgePulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 5px 18px rgba(239, 68, 68, 0.65),
                0 0 0 3px white;
  }
  50% {
    transform: scale(1.18);
    box-shadow: 0 7px 22px rgba(239, 68, 68, 0.8),
                0 0 0 3px white;
  }
}

@keyframes activeGlow {
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 10px rgba(187, 124, 5, 0.5);
  }
  50% {
    opacity: 0.75;
    box-shadow: 0 0 20px rgba(187, 124, 5, 0.7);
  }
}

@keyframes buttonGlow {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.1);
  }
}

@keyframes shimmer {
  0% {
    opacity: 0.3;
    transform: translateX(-100%);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
    transform: translateX(100%);
  }
}

@media (max-width: 768px) {
  .appBar {
    padding: 10px 16px;

    &__mid {
      width: 72px;
      height: 72px;
      top: -34px;
      padding: 10px;

      svg {
        width: 47px;
      }
    }

    &__side {
      gap: 4px;
    }

    &__link {
      width: 52px;
      height: 52px;
      border-radius: 16px;

      svg {
        width: 30px;
      }

      &.-active::after {
        width: 32px;
      }
    }

    &__badge {
      width: 10px;
      height: 24px;
      font-size: 12px;
      top: -6px;
      right: -6px;
    }
  }
}

@media (max-width: 480px) {
  .appBar {
    padding: 9px 14px;

    &__mid {
      width: 68px;
      height: 68px;
      top: -32px;
      padding: 9px;

      svg {
        width: 44px;
      }
    }

    &__side {
      gap: 3px;
    }

    &__link {
      width: 48px;
      height: 48px;
      border-radius: 14px;

      svg {
        width: 28px;
      }

      &.-active::after {
        width: 28px;
        height: 3px;
      }
    }

    &__badge {
      width: 10px;
      height: 22px;
      font-size: 11px;
      top: -5px;
      right: -5px;
      border: 2px solid white;
    }
  }
}
</style>
  