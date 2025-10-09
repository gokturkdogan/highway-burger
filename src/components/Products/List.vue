<template>
    <div class="nav">
        <div @click="openDetail(product.id)" v-for="product in products" :key="products.id" 
            :class="['nav__item', { 
                '-drink': isDrinks, 
                '-sandwich': isSandwiches, 
                '-toast': isToastes
            }]">
            <template v-if="detailLoader === product.id">
                <div class="nav__loader">
                    <ItemLoader />
                </div>
            </template>
            <template v-else>
                <img class="nav__image" :src="product.attributes.image.data.attributes.url" :alt="product.attributes.name">
                <div class="nav__itemContent">
                    <div class="nav__title">{{ product.attributes.name }}</div>
                    <div class="nav__subtitle">{{ product.attributes.description }}</div>
                    <div class="nav__priceBox">
                        <div class="nav__price">
                            {{ product.attributes.price }}<span v-if="product.attributes.secondPrice">/{{ product.attributes.secondPrice }}</span>₺
                        </div>
                        <span class="nav__suffix" v-if="product.attributes.extra">{{ product.attributes.extra }}</span>
                    </div>
                </div>
                <div class="nav__action">
                    <BasketIcon class="nav__actionIcon" />
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import BasketIcon from '../../assets/icons/basket-icon.vue'
import ItemLoader from '../base/ItemLoader.vue'

export default {
    name: "ProductList",
    data() {
        return {}
    },
    components: {
        BasketIcon,
        ItemLoader
    },
    props: {
        products: {
            type: Array,
            required: true,
            default: []
        },
        isDrinks: {
            type: Boolean,
            required: false,
            defauld: false
        },
        isSandwiches: {
            type: Boolean,
            required: false,
            defauld: false
        },
        isToastes: {
            type: Boolean,
            required: false,
            defauld: false
        }
    },
    computed: {
        detailLoader() {
            return this.$store.getters['product/getDetailLoader'];
        }
    },
    methods: {
        openDetail(id) {
            this.$store.dispatch('product/fetchProductDetail', id)
        }
    }
};
</script>
<style lang="scss" scoped>
.nav {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 0 20px 0 50px;
    animation: fadeIn 0.6s ease-out;

    &__item {
        position: relative;
        background: linear-gradient(145deg, #ffffff 0%, #fefefe 100%);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.22),
                    0 6px 15px rgba(0, 0, 0, 0.15),
                    0 3px 8px rgba(187, 124, 5, 0.18),
                    0 1px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        min-height: 135px;
        padding: 18px 16px;
        border-radius: 22px;
        margin-top: 22px;
        cursor: pointer;
        transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        border: 2px solid rgba(187, 124, 5, 0.2);
        overflow: visible;
        transform: translateX(4px) scale(1.01);

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 50%;
            background: radial-gradient(ellipse at left,
                rgba(187, 124, 5, 0.08) 0%,
                rgba(212, 150, 36, 0.05) 40%,
                transparent 80%);
            opacity: 1;
            transition: all 0.45s ease;
            border-radius: 22px 0 0 22px;
        }

        &::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background: linear-gradient(180deg,
                transparent 0%,
                #bb7c05 30%,
                #d49624 50%,
                #bb7c05 70%,
                transparent 100%);
            opacity: 1;
            transition: opacity 0.45s ease;
            border-radius: 22px 0 0 22px;
        }

        &:active {
            transform: translateX(2px) scale(0.99);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18),
                        0 4px 10px rgba(0, 0, 0, 0.12);
        }

        &.-sandwich {
            min-height: 110px;
            padding: 14px 16px;
        }

        &.-drink {
            min-height: 85px;
            padding: 12px 16px;
        }

        &.-toast {
            min-height: 95px;
            padding: 13px 16px;
        }
    }

    &__image {
        width: 115px;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(-50%, -50%) scale(1.15) rotate(-3deg);
        transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1;
    }

    &__itemContent {
        margin-top: 0;
        margin-left: 65px;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 6px;
        position: relative;
        z-index: 2;
    }

    &__title {
        font-weight: 700;
        letter-spacing: 0.8px;
        color: #bb7c05;
        font-size: 15px;
        transition: all 0.35s ease;
        line-height: 1.3;
    }

    &__subtitle {
        color: #7a7a7a;
        font-size: 12px;
        line-height: 1.5;
        max-width: 85%;
        font-weight: 500;
        transition: color 0.3s ease;
    }

    &__priceBox {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 4px;
    }

    &__price {
        color: #bb7c05;
        font-weight: 800;
        font-size: 16px;
        letter-spacing: 0.3px;
        transition: all 0.35s ease;
        transform: translateY(-2px);
        
        span {
            font-weight: 700;
        }
    }

    &__suffix {
        color: #8a8a8a;
        font-size: 11px;
        font-weight: 600;
        padding: 3px 8px;
        background: rgba(187, 124, 5, 0.08);
        border-radius: 8px;
        letter-spacing: 0.3px;
    }

    &__action {
        position: absolute;
        transform: translate(-50%, -50%);
        right: 8px;
        top: 50%;
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 2;
    }

    &__actionIcon {
        width: 38px;
        height: 38px;
        background: linear-gradient(135deg, #bb7c05 0%, #d49624 100%);
        fill: white;
        border-radius: 50%;
        padding: 9px;
        box-shadow: 0 4px 15px rgba(187, 124, 5, 0.55),
                    0 2px 8px rgba(187, 124, 5, 0.4);
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        border: 2px solid rgba(255, 255, 255, 0.3);
    }

    &__loader {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        min-height: 95px;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .nav {
        padding: 0 18px 0 45px;
        gap: 12px;

        &__item {
            min-height: 125px;
            padding: 16px 14px;
            margin-top: 20px;
            border-radius: 20px;

            &.-sandwich {
                min-height: 105px;
            }

            &.-drink {
                min-height: 80px;
            }

            &.-toast {
                min-height: 90px;
            }
        }

        &__image {
            width: 105px;
        }

        &__itemContent {
            margin-left: 58px;
        }

        &__title {
            font-size: 14px;
        }

        &__subtitle {
            font-size: 11px;
        }

        &__price {
            font-size: 15px;
        }

        &__actionIcon {
            width: 36px;
            height: 36px;
            padding: 8px;
        }
    }
}

@media (max-width: 480px) {
    .nav {
        padding: 0 15px 0 40px;
        gap: 10px;

        &__item {
            min-height: 115px;
            padding: 14px 12px;
            margin-top: 18px;
            border-radius: 18px;

            &.-sandwich {
                min-height: 100px;
            }

            &.-drink {
                min-height: 75px;
            }

            &.-toast {
                min-height: 85px;
            }
        }

        &__image {
            width: 95px;
        }

        &__itemContent {
            margin-left: 52px;
        }

        &__title {
            font-size: 13px;
            letter-spacing: 0.3px;
        }

        &__subtitle {
            font-size: 10px;
            max-width: 70%;
        }

        &__price {
            font-size: 14px;
        }

        &__suffix {
            font-size: 10px;
            padding: 2px 6px;
        }

        &__actionIcon {
            width: 34px;
            height: 34px;
            padding: 7px;
        }

        &__action {
            right: 6px;
        }
    }
}
</style>