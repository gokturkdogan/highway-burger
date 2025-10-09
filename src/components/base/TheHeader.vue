<template>
  <div class="header">
    <div class="header__banner">
        <img class="header__logo" src="../../assets/images/splash.png" alt="logo">
        <h1 class="header__title">{{ title }}</h1>
        <UserIcon @click="openMenu" class="header__user"/>
    </div>
  </div>
</template>
<script>
import UserIcon from '../../assets/icons/user-icon.vue'
import BurgerIcon from '../../assets/icons/burger-icon.vue'
export default {
  name: "Header",
  components: {
    UserIcon,
    BurgerIcon
  },
  computed: {
    title() {
      return this.$route.meta.title || 'Highway Burger'
    }
  },
  methods: {
    openMenu() {
      this.$store.dispatch('openMenu')
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
        margin-top: 40px;
        display: flex;
        gap: 10px;
        overflow-x: scroll;
    }

    &__navItem {
        display: flex;
        align-items: center;
        background-color: rgb(187, 124, 5);
        padding: 5px;
        border-radius: 30px;
        gap: 5px;
        font-size: 12px;
        color: white;
    }

    &__navIcon {
        width: 30px;
        background-color: white;
        border-radius: 100%;
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
    }
}
</style>