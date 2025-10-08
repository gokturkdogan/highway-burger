<template>
    <div class="nav">
        <router-link v-for="category in categories" :key="category.id" :to="'/coin-actions/products/' + category.attributes.slug" class="nav__item">
            <img class="nav__image" :src="cdnUrl + category.attributes.image.data.attributes.url" alt="burger">
            <div class="nav__itemContent">
                <div class="nav__title">{{ category.attributes.name }}</div>
                <div class="nav__subtitle">{{ category.attributes.description }}</div>
            </div>
            <div class="nav__action">
                Seçim için tıklayınız
                <PointerIcon class="nav__actionIcon"/>
            </div>
        </router-link>
    </div>
</template>
<script>
import PointerIcon from '../../assets/icons/pointer-icon.vue'
import { CDN_URL } from '../../config/_axios.js'

export default {
    name: "Categories",
    data() {
        return {
            cdnUrl: CDN_URL
        }
    },
    components: {
        PointerIcon
    },
    props: {
        categories: {
            type: Array,
            required: true
        }
    },
    methods: {},
};
</script>
<style lang="scss" scoped>
.nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
    padding-bottom: 50px;

    &__item {
        text-decoration: none;
        position: relative;
        background-color: #fff;
        box-shadow: #00000059 0 5px 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 40%;
        height: fit-content;
        height: 170px;
        padding: 10px;
        border-radius: 15px;
        margin-top: 70px;
        color: #000;
    }

    &__image {
        width: 130px;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &__itemContent {
        margin-top: 50px;
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
    }

    &__action {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        font-size: 12px;
    }

    &__actionIcon {
        width: 20px;
        background-color: rgb(187, 124, 5);
        fill: white;
        border-radius: 100%;
        padding: 2px;
    }
}
</style>