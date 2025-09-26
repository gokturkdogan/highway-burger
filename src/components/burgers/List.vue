<template>
    <div class="nav">
        <div @click="openModal" class="nav__item">
            <img class="nav__image" src="../../assets/images/categories/burger.png" alt="burger">
            <div class="nav__itemContent">
                <div class="nav__title">Highway Classic Burger</div>
                <div class="nav__subtitle">Hambugrger köftesi, burger peyniri, simple sos, yeşillik, domates, turşu,
                    patates kızartması</div>
                <div class="nav__price">250/300₺ <span>110gr/180gr</span></div>
            </div>
            <div class="nav__action">
                <BasketIcon class="nav__actionIcon" />
            </div>
        </div>
        <div class="nav__item">
            <img class="nav__image" src="../../assets/images/categories/burger.png" alt="burger">
            <div class="nav__itemContent">
                <div class="nav__title">Route 66 Burger</div>
                <div class="nav__subtitle">Hambugrger köftesi, dana bacon, burger peyniri, simple sos, yeşillik, domates, turşu,
                    patates kızartması</div>
                <div class="nav__price">300/350₺ <span>110gr/180gr</span></div>
            </div>
            <div class="nav__action">
                <BasketIcon class="nav__actionIcon" />
            </div>
        </div>
        <div class="nav__item">
            <img class="nav__image" src="../../assets/images/categories/burger.png" alt="burger">
            <div class="nav__itemContent">
                <div class="nav__title">Chicago Burger (Acılı)</div>
                <div class="nav__subtitle">Hambugrger köftesi, burger peyniri, simple sos, acı sos, jalapeno biber yeşillik, domates, turşu,
                    patates kızartması</div>
                <div class="nav__price">250/300₺ <span>110gr/180gr</span></div>
            </div>
            <div class="nav__action">
                <BasketIcon class="nav__actionIcon" />
            </div>
        </div>
        <div class="nav__item">
            <img class="nav__image" src="../../assets/images/categories/burger.png" alt="burger">
            <div class="nav__itemContent">
                <div class="nav__title">Montana Smoked Burger</div>
                <div class="nav__subtitle">Hambugrger köftesi, burger peyniri, simple sos, bbq, yeşillik, domates, turşu,
                    patates kızartması</div>
                <div class="nav__price">250/300₺ <span>110gr/180gr</span></div>
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
    name: "BurgersList",
    components: {
        BasketIcon
    },
    created() { },
    methods: {
        openModal() {
            this.$store.dispatch("burgerModal/openModal");
        }
    },
};
</script>
<style lang="scss" scoped>
.nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
    padding-left: 50px;

    &__item {
        position: relative;
        background-color: #fff;
        box-shadow: #00000059 0 5px 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: fit-content;
        height: 130px;
        padding: 15px 10px;
        border-radius: 15px;
        margin-top: 20px;
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
        color: rgb(187, 124, 5);
        font-weight: 600;

        span {
            color: #7a7a7a;
            font-size: 10px;
        }
    }
}
</style>