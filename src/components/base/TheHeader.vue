<template>
  <div class="header">
    <div class="header__banner">
        <img class="header__logo" src="../../assets/images/splash.png" alt="logo">
        <h1 class="header__title">{{ title }}</h1>
        
        <!-- Desktop Navigation -->
        <nav class="header__nav">
          <router-link to="/" class="header__navLink" :class="{ '-active': activeRoute === 'Home' }">
            <HomeIcon/>
            <span>Ana Sayfa</span>
          </router-link>
          <router-link @click="setProducts('burgers')" to="/products/burgers" class="header__navLink" :class="{ '-active': activeRoute === 'burgers' }">
            <BurgerIcon/>
            <span>Burgerler</span>
          </router-link>
          <router-link @click="setProducts('toastes')" to="/products/toastes" class="header__navLink" :class="{ '-active': activeRoute === 'toastes' }">
            <ToastIcon/>
            <span>Tostlar</span>
          </router-link>
          <router-link @click="setProducts('sandwiches')" to="/products/sandwiches" class="header__navLink" :class="{ '-active': activeRoute === 'sandwiches' }">
            <SandwichIcon/>
            <span>Sandviçler</span>
          </router-link>
          <router-link @click="setProducts('menus')" to="/products/menus" class="header__navLink" :class="{ '-active': activeRoute === 'menus' }">
            <MenuIcon/>
            <span>Menüler</span>
          </router-link>
          <router-link @click="setProducts('drinks')" to="/products/drinks" class="header__navLink" :class="{ '-active': activeRoute === 'drinks' }">
            <DrinkIcon/>
            <span>İçecekler</span>
          </router-link>
        </nav>

        <div class="header__actions">
          <!-- Sepet Butonu -->
          <router-link to="/cart" class="header__cart" :class="{ '-has-items': cartItemCount > 0 }">
            <BasketIcon/>
            <span v-if="cartItemCount > 0" class="header__cartBadge">{{ cartItemCount }}</span>
          </router-link>
          
          <!-- Profil Butonu -->
          <UserIcon @click="openMenu" class="header__user"/>
        </div>
    </div>
  </div>
</template>
<script>
import UserIcon from '../../assets/icons/user-icon.vue'
import BurgerIcon from '../../assets/icons/burger-icon.vue'
import BasketIcon from '../../assets/icons/basket-icon.vue'
import HomeIcon from '../../assets/icons/home-icon.vue'
import ToastIcon from '../../assets/icons/toast-icon.vue'
import SandwichIcon from '../../assets/icons/sandwich-icon.vue'
import MenuIcon from '../../assets/icons/menu-icon.vue'
import DrinkIcon from '../../assets/icons/drink-icon.vue'

export default {
  name: "Header",
  components: {
    UserIcon,
    BurgerIcon,
    BasketIcon,
    HomeIcon,
    ToastIcon,
    SandwichIcon,
    MenuIcon,
    DrinkIcon
  },
  computed: {
    title() {
      return this.$route.meta.title || 'Highway Burger'
    },
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
  methods: {
    openMenu() {
      this.$store.dispatch('openMenu')
    },
    setProducts(category) {
      this.$store.dispatch('product/fetchProducts', category)
    }
  },
};
</script>
<style lang="scss" scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 15px 20px;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 
                0 2px 8px rgba(187, 124, 5, 0.1);
    border-bottom: 2px solid rgba(187, 124, 5, 0.1);
    animation: slideDown 0.5s ease-out;
    
    &__banner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        gap: 15px;
    }
    
    &__logo {
        width: 50px;
        height: 50px;
        flex-shrink: 0;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        animation: logoFloat 3s ease-in-out infinite;
        
        &:hover {
            transform: rotate(360deg) scale(1.1);
        }
    }
    
    &__title {
        flex: 1;
        text-align: center;
        font-size: 20px;
        font-weight: 800;
        background: linear-gradient(135deg, #bb7c05 0%, #d49624 50%, #bb7c05 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        background-size: 200% 200%;
        margin: 0;
        letter-spacing: 1px;
        text-transform: uppercase;
        position: relative;
        animation: gradientShift 3s ease infinite, titlePulse 2s ease-in-out infinite;
        text-shadow: 0 2px 10px rgba(187, 124, 5, 0.1);
        
        &::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 3px;
            background: linear-gradient(90deg, transparent, #bb7c05, transparent);
            border-radius: 2px;
            animation: underlineGrow 2s ease-in-out infinite;
        }
    }
    
    &__user {
        width: 45px;
        height: 45px;
        border: 3px solid transparent;
        background: linear-gradient(white, white) padding-box,
                    linear-gradient(135deg, #bb7c05, #d49624) border-box;
        border-radius: 50%;
        padding: 6px;
        fill: #bb7c05;
        flex-shrink: 0;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 15px rgba(187, 124, 5, 0.2);
        position: relative;
        animation: iconBounce 2s ease-in-out infinite;
        
        &::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(135deg, #bb7c05, #d49624);
            border-radius: 50%;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        &:hover {
            transform: translateY(-3px) scale(1.1) rotate(5deg);
            box-shadow: 0 8px 25px rgba(187, 124, 5, 0.4);
            fill: white;
            
            &::before {
                opacity: 1;
            }
        }
        
        &:active {
            transform: translateY(-1px) scale(1.05);
        }
    }

    &__nav {
        display: none; // Mobilde gizli
        gap: 8px;
        align-items: center;
    }

    &__navLink {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        border-radius: 12px;
        text-decoration: none;
        color: #6c757d;
        font-size: 14px;
        font-weight: 600;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        background: transparent;

        svg {
            width: 20px;
            height: 20px;
            fill: #6c757d;
            transition: all 0.3s ease;
        }

        &:hover {
            background: linear-gradient(135deg, rgba(187, 124, 5, 0.1) 0%, rgba(187, 124, 5, 0.05) 100%);
            color: #bb7c05;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(187, 124, 5, 0.15);

            svg {
                fill: #bb7c05;
                transform: scale(1.1);
            }
        }

        &.-active {
            background: linear-gradient(135deg, rgba(187, 124, 5, 0.15) 0%, rgba(187, 124, 5, 0.08) 100%);
            color: #bb7c05;
            box-shadow: inset 0 2px 8px rgba(187, 124, 5, 0.15);

            svg {
                fill: #bb7c05;
            }

            &::after {
                content: '';
                position: absolute;
                bottom: 4px;
                left: 50%;
                transform: translateX(-50%);
                width: 60%;
                height: 3px;
                background: linear-gradient(90deg, transparent, #bb7c05, transparent);
                border-radius: 2px;
                animation: navGlow 2s ease-in-out infinite;
            }
        }
    }

    &__actions {
        display: none; // Mobilde gizli, sadece user icon görünür
        align-items: center;
        gap: 12px;
    }

    &__cart {
        position: relative;
        width: 45px;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #bb7c05 0%, #d49624 100%);
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 15px rgba(187, 124, 5, 0.3);
        text-decoration: none;

        svg {
            width: 24px;
            height: 24px;
            fill: white;
            transition: all 0.3s ease;
        }

        &:hover, &.-has-items {
            transform: translateY(-3px) scale(1.08);
            box-shadow: 0 8px 25px rgba(187, 124, 5, 0.45);

            svg {
                transform: scale(1.15) rotate(5deg);
            }
        }

        &:active {
            transform: translateY(-1px) scale(1.05);
        }
    }

    &__cartBadge {
        position: absolute;
        top: -6px;
        right: -6px;
        background: #ef4444;
        color: white;
        font-size: 11px;
        font-weight: 800;
        min-width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 5px;
        border: 3px solid white;
        letter-spacing: -0.5px;
        animation: badgePulse 2s ease-in-out infinite;
    }
}

// Animations
@keyframes slideDown {
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes logoFloat {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-5px);
    }
}

@keyframes gradientShift {
    0%, 100% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
}

@keyframes titlePulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.02);
    }
}

@keyframes underlineGrow {
    0%, 100% {
        width: 0;
    }
    50% {
        width: 50%;
    }
}

@keyframes iconBounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-2px);
    }
}

@keyframes navGlow {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.6;
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

// Desktop için özel stiller
@media (min-width: 769px) {
    .header {
        padding: 15px 30px;

        &__banner {
            max-width: 1400px;
        }

        &__title {
            display: none; // Desktop'ta title'ı gizle, navigation var çünkü
        }

        &__nav {
            display: flex; // Desktop'ta göster
            flex: 1;
            justify-content: center;
            margin: 0 20px;
        }

        &__actions {
            display: flex; // Desktop'ta göster
        }

        &__user {
            width: 45px;
            height: 45px;
        }
    }
}

// Responsive
@media (max-width: 768px) {
    .header {
        padding: 12px 15px;
        
        &__logo {
            width: 45px;
            height: 45px;
        }
        
        &__title {
            font-size: 16px;
            letter-spacing: 0.5px;
        }
        
        &__user {
            width: 40px;
            height: 40px;
        }

        &__nav,
        &__actions {
            display: none; // Mobilde gizle
        }
    }
}
</style>