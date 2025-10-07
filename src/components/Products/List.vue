<template>
    <div class="nav">
        <div @click="openDetail(product.id)" v-for="product in products" :key="products.id" class="nav__item"
            :class="{ '-drink': isDrinks, '-sandwich': isSandwiches, '-toast': isToastes }">
            <img class="nav__image" :src="cdnUrl + product.attributes.image.data.attributes.url" alt="burger">
            <div class="nav__itemContent">
                <div class="nav__title">{{ product.attributes.name }}</div>
                <div class="nav__subtitle">{{ product.attributes.description }}</div>
                <div class="nav__price">{{ product.attributes.price }}<span
                        v-if="product.attributes.secondPrice">/</span>{{ product.attributes.secondPrice }}₺ <span
                        class="nav__suffix">{{ product.attributes.extra }}</span></div>
            </div>
            <div class="nav__action">
                <BasketIcon class="nav__actionIcon" />
            </div>
        </div>
    </div>
</template>
<script>
import BasketIcon from '../../assets/icons/basket-icon.vue'
export default {
    name: "ProductList",
    data() {
        return {
            cdnUrl: 'http://localhost:1337'
        }
    },
    components: {
        BasketIcon
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
    gap: 10px;
    padding-left: 50px;

    &__item {
        position: relative;
        background-color: #fff;
        box-shadow: #00000059 0 5px 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: fit-content;
        height: 130px;
        padding: 15px 10px;
        border-radius: 15px;
        margin-top: 20px;

        &.-sandwich {
            height: 100px;
        }

        &.-drink {
            height: 70px;
        }

        &.-toast {
            height: 80px;
        }
    }

    &__image {
        width: 110px;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(-50%, -50%);
    }

    &__itemContent {
        margin-top: 0;
        margin-left: 60px;
    }

    &__title {
        font-weight: 600;
        letter-spacing: 1px;
        color: #000;
        font-size: 14px;
    }

    &__subtitle {
        color: #7a7a7a;
        font-size: 12px;
        margin-top: 5px;
        max-width: 80%;
    }

    &__action {
        font-size: 12px;
        position: absolute;
        transform: translate(-50%, -50%);
        right: 0;
        top: 50%;
    }

    &__actionIcon {
        width: 30px;
        background-color: #bb7c05;
        fill: white;
        border-radius: 100%;
        padding: 2px;
    }

    &__price {
        margin-top: 10px;
        color: #bb7c05;
        font-weight: 600;
    }

    &__suffix {
        color: #7a7a7a;
        font-size: 10px;
    }
}
</style>