<template>
    <div class="empty">
        <div class="empty__icon-wrapper">
            <CartEmptyIcon class="empty__icon" />
        </div>
        <h2 class="empty__title">Sepetiniz Boş</h2>
        <p class="empty__text">Henüz sepetinizde ürün bulunmuyor.</p>
        <p class="empty__subtitle">Lezzetli burgerlerimizi keşfedin!</p>
        <router-link to="/" class="empty__link">
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
    min-height: 400px;
    text-align: center;

    &__icon-wrapper {
        position: relative;
        margin-bottom: 30px;
        animation: float 3s ease-in-out infinite;
    }

    &__icon {
        width: 120px;
        height: 120px;
        fill: #bb7c05;
        filter: drop-shadow(0 10px 30px rgba(187, 124, 5, 0.2));
        transition: all 0.3s ease;

        &:hover {
            fill: #a66b04;
            transform: scale(1.1);
        }
    }

    &__title {
        font-size: 32px;
        font-weight: 800;
        color: #2c3e50;
        margin-bottom: 12px;
        letter-spacing: -0.5px;
    }

    &__text {
        font-size: 18px;
        color: #6c757d;
        margin-bottom: 8px;
        font-weight: 500;
    }

    &__subtitle {
        font-size: 16px;
        color: #bb7c05;
        margin-bottom: 40px;
        font-weight: 600;
    }

    &__link {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        padding: 16px 32px;
        background: linear-gradient(135deg, #bb7c05 0%, #a66b04 100%);
        color: white;
        text-decoration: none;
        border-radius: 50px;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 0.5px;
        box-shadow: 0 8px 25px rgba(187, 124, 5, 0.3);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;

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
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(187, 124, 5, 0.4);
            background: linear-gradient(135deg, #a66b04 0%, #8b5a03 100%);

            &::before {
                left: 100%;
            }

            .empty__link-arrow {
                transform: translateX(5px);
            }
        }

        &:active {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(187, 124, 5, 0.3);
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

@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-15px);
    }
}

@media (max-width: 768px) {
    .empty {
        padding: 60px 20px;
        min-height: 300px;

        &__icon {
            width: 90px;
            height: 90px;
        }

        &__title {
            font-size: 26px;
        }

        &__text {
            font-size: 16px;
        }

        &__subtitle {
            font-size: 14px;
            margin-bottom: 30px;
        }

        &__link {
            padding: 14px 28px;
            font-size: 15px;
        }
    }
}
</style>
