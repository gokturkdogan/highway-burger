<template>
    <div class="empty">
        <div class="empty__icon-wrapper">
            <div class="empty__icon-bg"></div>
            <div class="empty__icon-pulse"></div>
            <CartEmptyIcon class="empty__icon" />
        </div>
        <h2 class="empty__title">Sepetiniz Boş</h2>
        <p class="empty__text">Henüz sepetinizde ürün bulunmuyor</p>
        <p class="empty__subtitle">🍔 Lezzetli ürünlerimizi keşfedin!</p>
        <router-link to="/highway-burger/" class="empty__link">
            <span class="empty__link-text">Kategorilere Git</span>
            <ArrowRightIcon class="empty__link-arrow" />
        </router-link>
    </div>
</template>

<script>
import CartEmptyIcon from '../../assets/icons/cart-empty-icon.vue';
import ArrowRightIcon from '../../assets/icons/arrow-right-icon.vue';

export default {
    name: "CartEmpty",
    components: {
        CartEmptyIcon,
        ArrowRightIcon
    }
};
</script>

<style lang="scss" scoped>
.empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    min-height: 450px;
    text-align: center;

    &__icon-wrapper {
        position: relative;
        margin-bottom: 40px;
        animation: iconFloat 3.5s ease-in-out infinite;
    }

    &__icon-bg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 160px;
        height: 160px;
        background: linear-gradient(135deg, rgba(187, 124, 5, 0.12) 0%, rgba(187, 124, 5, 0.06) 100%);
        border-radius: 50%;
        animation: pulse 3s ease-in-out infinite;
        z-index: -2;
    }

    &__icon-pulse {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 140px;
        height: 140px;
        background: transparent;
        border: 3px solid rgba(187, 124, 5, 0.3);
        border-radius: 50%;
        animation: ripple 2s ease-in-out infinite;
        z-index: -1;
    }

    &__icon {
        width: 110px;
        fill: #bb7c05;
        position: relative;
        z-index: 1;
    }

    &__title {
        font-size: 32px;
        font-weight: 800;
        color: #2c3e50;
        margin: 0 0 16px 0;
        letter-spacing: -0.5px;
        animation: fadeInUp 0.6s ease-out;
    }

    &__text {
        font-size: 17px;
        color: #6c757d;
        margin: 0 0 12px 0;
        max-width: 420px;
        line-height: 1.6;
        font-weight: 500;
        animation: fadeInUp 0.6s ease-out 0.1s backwards;
    }

    &__subtitle {
        font-size: 16px;
        color: #bb7c05;
        margin: 0 0 45px 0;
        font-weight: 700;
        animation: fadeInUp 0.6s ease-out 0.2s backwards;
    }

    &__link {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        padding: 16px 40px;
        background: linear-gradient(135deg, #bb7c05 0%, #a66b04 100%);
        color: white;
        text-decoration: none;
        border-radius: 50px;
        font-size: 17px;
        font-weight: 700;
        letter-spacing: 0.3px;
        box-shadow: 0 8px 25px rgba(187, 124, 5, 0.35);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        min-width: 250px;
        animation: fadeInUp 0.6s ease-out 0.3s backwards;
        justify-content: space-evenly;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s ease;
        }

        &:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 12px 35px rgba(187, 124, 5, 0.45);
            background: linear-gradient(135deg, #a66b04 0%, #8b5a03 100%);

            &::before {
                left: 100%;
            }

            .empty__link-arrow {
                transform: translateX(5px);
            }
        }

        &:active {
            transform: translateY(-2px) scale(0.98);
            box-shadow: 0 6px 20px rgba(187, 124, 5, 0.35);
        }

        &-text {
            position: relative;
            z-index: 1;
        }

        &-arrow {
            width: 20px;
            height: 20px;
            fill: currentColor;
            transition: transform 0.3s ease;
            position: relative;
            z-index: 1;
        }
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes iconFloat {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-20px);
    }
}

@keyframes pulse {
    0%, 100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.3;
    }
    50% {
        transform: translate(-50%, -50%) scale(1.1);
        opacity: 0.5;
    }
}

@keyframes ripple {
    0% {
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 0.6;
    }
    50% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.3;
    }
    100% {
        transform: translate(-50%, -50%) scale(1.2);
        opacity: 0;
    }
}

@media (max-width: 768px) {
    .empty {
        padding: 70px 20px;
        min-height: 380px;

        &__icon-wrapper {
            margin-bottom: 35px;
        }

        &__icon-bg {
            width: 145px;
            height: 145px;
        }

        &__icon-pulse {
            width: 120px;
            height: 120px;
        }

        &__icon {
            width: 95px;
        }

        &__title {
            font-size: 28px;
        }

        &__text {
            font-size: 16px;
        }

        &__subtitle {
            font-size: 15px;
            margin-bottom: 35px;
        }

        &__link {
            font-size: 16px;
            padding: 14px 35px;
            min-width: 220px;
        }
    }
}

@media (max-width: 480px) {
    .empty {
        padding: 60px 15px;
        min-height: 350px;

        &__icon-wrapper {
            margin-bottom: 30px;
        }

        &__icon-bg {
            width: 125px;
            height: 125px;
        }

        &__icon-pulse {
            width: 105px;
            height: 105px;
        }

        &__icon {
            width: 85px;
        }

        &__title {
            font-size: 24px;
        }

        &__text {
            font-size: 15px;
        }

        &__subtitle {
            font-size: 14px;
            margin-bottom: 30px;
        }

        &__link {
            font-size: 15px;
            padding: 13px 30px;
            min-width: 200px;
        }
    }
}
</style>
