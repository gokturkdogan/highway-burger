<template>
    <div v-if="overlay" class="menu">
        <div class="menu__overlay" @click="close">
            <transition name="slide-right">
                <div v-if="wrapper" class="menu__wrapper" @click.stop>
                    <div class="menu__content">
                        <div class="menu__header">
                            <UserIcon class="menu__icon" />
                            <span v-if="true" class="menu__title">Merhaba Göktürk</span>
                            <span v-else class="menu__title">Henüz Giriş Yapmadın</span>
                        </div>
                        <div v-if="true" class="menu__body">
                            <div class="menu__item">
                                <UserIcon class="menu__itemIcon" />
                                <span class="menu__text">Profilim</span>
                            </div>
                            <div class="menu__item">
                                <AddressIcon class="menu__itemIcon" />
                                <span class="menu__text">Adresim</span>
                            </div>
                            <div class="menu__item">
                                <OrdersIcon class="menu__itemIcon" />
                                <span class="menu__text">Siparişlerim</span>
                            </div>
                            <div class="menu__item">
                                <LogoutIcon class="menu__itemIcon" />
                                <span class="menu__text">Çıkış Yap</span>
                            </div>
                        </div>
                        <div v-else class="menu__body">
                            <div class="menu__item">
                                <LoginIcon class="menu__itemIcon" />
                                <span class="menu__text">Giriş Yap</span>
                            </div>
                            <div class="menu__item">
                                <RegisterIcon class="menu__itemIcon" />
                                <span class="menu__text">Üye Ol</span>
                            </div>
                        </div>
                    </div>
                    <div class="menu__footer">
                        <img class="menu__logo" src="../../assets/images/splash.png" alt="logo">
                        <span class="menu__name">Highway Burger</span>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import UserIcon from '../../assets/icons/user-icon.vue'
import AddressIcon from '../../assets/icons/address-icon.vue'
import OrdersIcon from '../../assets/icons/orders-icon.vue'
import LogoutIcon from '../../assets/icons/logout-icon.vue'
import LoginIcon from '../../assets/icons/login-icon.vue'
import RegisterIcon from '../../assets/icons/register-icon.vue'
export default {
    name: "Menu",
    components: {
        UserIcon,
        AddressIcon,
        OrdersIcon,
        LogoutIcon,
        LoginIcon,
        RegisterIcon
    },
    created() { },
    methods: {
        close() {
            this.$store.dispatch('closeMenu')
        }
    },
    computed: {
        overlay() {
            return this.$store.getters["getMenuOverlay"];
        },
        wrapper() {
            return this.$store.getters["getMenuWrapper"];
        }
    }
};
</script>
<style lang="scss" scoped>
.menu {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;

    &__overlay {
        background-color: rgba(0, 0, 0, 0.476);
        height: 100vh;
        display: flex;
        justify-content: flex-end;
    }

    &__wrapper {
        width: 70%;
        background-color: white;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    &__header {
        display: flex;
        gap: 30px;
        align-items: center;
        padding: 15px 20px;
        box-shadow: #00000014 1px 6px 5px;
    }

    &__title {}

    &__icon {
        width: 40px;
        border: 3px solid rgb(187, 124, 5);
        border-radius: 100%;
        padding: 2px;
        fill: rgb(187, 124, 5);
    }

    &__body {
        display: flex;
        flex-direction: column;
        padding: 20px;
        gap: 20px;
    }

    &__item {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    &__itemIcon {
        width: 40px;
        fill: rgb(187, 124, 5);
    }

    &__text {}

    &__footer {
        box-shadow: 0 -10px 20px -5px rgba(0, 0, 0, 0.3);
        display: flex;
        gap: 30px;
        align-items: center;
        padding: 20px;
    }

    &__logo {
        width: 60px;
    }
}

.slide-right-enter-from {
    transform: translateX(100%);
}

.slide-right-enter-to {
    transform: translateX(0);
}

.slide-right-enter-active {
    transition: transform 0.3s ease;
}

.slide-right-leave-from {
    transform: translateX(0);
}

.slide-right-leave-to {
    transform: translateX(100%);
}

.slide-right-leave-active {
    transition: transform 0.3s ease;
}
</style>