<template>
    <div v-if="overlay" class="menu">
        <div class="menu__overlay" @click="close">
            <transition name="slide-right">
                <div v-if="wrapper" class="menu__wrapper" @click.stop>
                    <div class="menu__content">
                        <div class="menu__header">
                            <UserIcon class="menu__icon" />
                            <span v-if="isLogin" class="menu__title">Merhaba {{ user.name }}</span>
                            <span v-else class="menu__title">Henüz Giriş Yapmadın</span>
                        </div>
                        <div v-if="isLogin" class="menu__body">
                            <router-link @click="close" to="/highway-burger/profile" class="menu__item" :class="{ '-active': activeRoute === 'Profile' }">
                                <UserIcon class="menu__itemIcon" />
                                <span class="menu__text">Profilim</span>
                            </router-link>
                            <router-link @click="close" to="/highway-burger/address" class="menu__item" :class="{ '-active': activeRoute === 'Address' }">
                                <AddressIcon class="menu__itemIcon" />
                                <span class="menu__text">Adreslerim</span>
                            </router-link>
                            <div class="menu__item">
                                <OrdersIcon class="menu__itemIcon" />
                                <span class="menu__text">Siparişlerim</span>
                            </div>
                            <div @click="logout" class="menu__item">
                                <LogoutIcon class="menu__itemIcon" />
                                <span class="menu__text">Çıkış Yap</span>
                            </div>
                        </div>
                        <div v-else class="menu__body">
                            <router-link @click="close" to="/highway-burger/login" class="menu__item">
                                <LoginIcon class="menu__itemIcon" />
                                <span class="menu__text">Giriş Yap</span>
                            </router-link>
                            <router-link @click="close" to="/highway-burger/register" class="menu__item">
                                <RegisterIcon class="menu__itemIcon" />
                                <span class="menu__text">Üye Ol</span>
                            </router-link>
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
        },
        async logout() {
            await this.$store.dispatch('login/logout')
            this.close()
        }
    },
    computed: {
        overlay() {
            return this.$store.getters["getMenuOverlay"];
        },
        wrapper() {
            return this.$store.getters["getMenuWrapper"];
        },
        isLogin() {
            return this.$store.getters["login/isLoggedIn"];
        },
        user() {
            return this.$store.getters["login/currentUser"];
        },
        activeRoute() {
            return this.$route.name;
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
        background-color: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(4px);
        height: 100vh;
        display: flex;
        justify-content: flex-end;
        transition: all 0.3s ease;
    }

    &__wrapper {
        width: 70%;
        background: linear-gradient(145deg, #ffffff 0%, #fefefe 100%);
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: -12px 0 50px rgba(0, 0, 0, 0.3),
                    -6px 0 25px rgba(0, 0, 0, 0.2),
                    -2px 0 10px rgba(0, 0, 0, 0.12);
    }

    &__header {
        display: flex;
        gap: 16px;
        align-items: center;
        padding: 20px 24px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12),
                    0 3px 10px rgba(187, 124, 5, 0.15),
                    0 1px 4px rgba(0, 0, 0, 0.08);
        background: linear-gradient(135deg, 
            rgba(187, 124, 5, 0.04) 0%, 
            transparent 100%);
        border-bottom: 2px solid rgba(187, 124, 5, 0.15);
        position: relative;

        &::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 60px;
            height: 2px;
            background: linear-gradient(90deg, #bb7c05 0%, #d49624 100%);
        }
    }

    &__title {
        text-transform: capitalize;
        font-size: 17px;
        font-weight: 800;
        color: #1a1a1a;
        letter-spacing: 0.3px;
    }

    &__icon {
        width: 52px;
        height: 52px;
        border: 3px solid #bb7c05;
        border-radius: 50%;
        padding: 10px;
        fill: #bb7c05;
        background: linear-gradient(135deg, 
            rgba(187, 124, 5, 0.08) 0%, 
            rgba(212, 150, 36, 0.05) 100%);
        box-shadow: 0 6px 20px rgba(187, 124, 5, 0.35),
                    0 3px 10px rgba(0, 0, 0, 0.15),
                    0 1px 4px rgba(0, 0, 0, 0.08);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        animation: userIconPulse 3s ease-in-out infinite;
    }

    &__body {
        display: flex;
        flex-direction: column;
        padding: 24px 20px;
        gap: 10px;
        flex: 1;
        overflow-y: auto;
    }

    &__item {
        display: flex;
        align-items: center;
        gap: 14px;
        text-decoration: none;
        color: #2c3e50;
        border-radius: 16px;
        padding: 14px 16px;
        cursor: pointer;
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        background: white;
        border: 2px solid transparent;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1),
                    0 2px 6px rgba(0, 0, 0, 0.08),
                    0 1px 3px rgba(187, 124, 5, 0.06);
        position: relative;
        overflow: hidden;
        font-weight: 700;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background: linear-gradient(180deg, #bb7c05 0%, #d49624 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        &:hover,
        &.-active {
            transform: translateX(-6px);
            box-shadow: 0 8px 24px rgba(187, 124, 5, 0.3),
                        0 4px 12px rgba(0, 0, 0, 0.15),
                        0 2px 6px rgba(187, 124, 5, 0.2);
            border-color: rgba(187, 124, 5, 0.15);
            background: linear-gradient(135deg, 
                rgba(187, 124, 5, 0.06) 0%, 
                transparent 100%);

            &::before {
                opacity: 1;
            }

            .menu__itemIcon {
                transform: scale(1.1) rotate(-5deg);
                fill: #d49624;
            }

            .menu__text {
                color: #bb7c05;
            }
        }
    }

    &__itemIcon {
        width: 38px;
        height: 38px;
        fill: #bb7c05;
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        flex-shrink: 0;
    }

    &__text {
        font-size: 15px;
        letter-spacing: 0.3px;
        transition: all 0.3s ease;
    }

    &__footer {
        box-shadow: 0 -8px 25px rgba(0, 0, 0, 0.15),
                    0 -4px 12px rgba(187, 124, 5, 0.12),
                    0 -2px 6px rgba(0, 0, 0, 0.08);
        display: flex;
        gap: 18px;
        align-items: center;
        padding: 24px;
        background: linear-gradient(135deg, 
            rgba(187, 124, 5, 0.04) 0%, 
            transparent 100%);
        border-top: 2px solid rgba(187, 124, 5, 0.12);
        position: relative;

        &::before {
            content: '';
            position: absolute;
            top: -2px;
            left: 0;
            width: 80px;
            height: 2px;
            background: linear-gradient(90deg, #bb7c05 0%, #d49624 100%);
        }
    }

    &__logo {
        width: 68px;
        height: 68px;
        border-radius: 16px;
        box-shadow: 0 8px 25px rgba(187, 124, 5, 0.35),
                    0 4px 12px rgba(0, 0, 0, 0.18),
                    0 2px 6px rgba(187, 124, 5, 0.2);
        border: 3px solid rgba(187, 124, 5, 0.2);
        padding: 6px;
        background: white;
        transition: all 0.3s ease;
    }

    &__name {
        font-size: 16px;
        font-weight: 900;
        color: #1a1a1a;
        letter-spacing: 0.5px;
    }
}

@keyframes userIconPulse {
    0%, 100% {
        transform: scale(1);
        box-shadow: 0 6px 20px rgba(187, 124, 5, 0.35),
                    0 3px 10px rgba(0, 0, 0, 0.15),
                    0 1px 4px rgba(0, 0, 0, 0.08);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 8px 25px rgba(187, 124, 5, 0.45),
                    0 4px 12px rgba(0, 0, 0, 0.2),
                    0 2px 6px rgba(0, 0, 0, 0.12);
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

@media (max-width: 768px) {
    .menu {
        &__wrapper {
            width: 75%;
        }

        &__header {
            padding: 18px 20px;
        }

        &__icon {
            width: 48px;
            height: 48px;
            padding: 9px;
        }

        &__title {
            font-size: 16px;
        }

        &__body {
            padding: 20px 18px;
        }

        &__item {
            padding: 13px 14px;
        }

        &__itemIcon {
            width: 36px;
            height: 36px;
        }

        &__text {
            font-size: 14px;
        }

        &__footer {
            padding: 20px;
        }

        &__logo {
            width: 62px;
            height: 62px;
        }

        &__name {
            font-size: 15px;
        }
    }
}

@media (max-width: 480px) {
    .menu {
        &__wrapper {
            width: 80%;
        }

        &__header {
            padding: 16px 18px;
            gap: 12px;
        }

        &__icon {
            width: 44px;
            height: 44px;
            padding: 8px;
        }

        &__title {
            font-size: 15px;
        }

        &__body {
            padding: 18px 16px;
            gap: 8px;
        }

        &__item {
            padding: 12px 14px;
            gap: 12px;
            border-radius: 14px;
        }

        &__itemIcon {
            width: 34px;
            height: 34px;
        }

        &__text {
            font-size: 13px;
        }

        &__footer {
            padding: 18px;
            gap: 14px;
        }

        &__logo {
            width: 56px;
            height: 56px;
        }

        &__name {
            font-size: 14px;
        }
    }
}
</style>