<template>
    <div class="nav">
        <div class="nav__item">
            <img class="nav__image" src="../../assets/images/categories/burger.png" alt="burger">
            <div class="nav__itemContent">
                <div class="nav__title">Burgerler</div>
                <div class="nav__subtitle">110 / 180 gr</div>
            </div>
            <div class="nav__action">
                Seçim için tıklayınız
                <PointerIcon class="nav__actionIcon"/>
            </div>
        </div>
        <div class="nav__item">
            <img class="nav__image" src="../../assets/images/categories/tost.png" alt="burger">
            <div class="nav__itemContent">
                <div class="nav__title">Tostlar</div>
                <div class="nav__subtitle">Patates & İçecek + 80₺</div>
            </div>
            <div class="nav__action">
                Seçim için tıklayınız
                <PointerIcon class="nav__actionIcon" />
            </div>
        </div>
        <div class="nav__item">
            <img class="nav__image" src="../../assets/images/categories/sandwiches.png" alt="burger">
            <div class="nav__itemContent">
                <div class="nav__title">Sıcak Sandviçler</div>
                <div class="nav__subtitle">Sosisli & Patso</div>
            </div>
            <div class="nav__action">
                Seçim için tıklayınız
                <PointerIcon class="nav__actionIcon" />
            </div>
        </div>
        <div class="nav__item">
            <img class="nav__image" src="../../assets/images/categories/menu.png" alt="burger">
            <div class="nav__itemContent">
                <div class="nav__title">Menüler</div>
                <div class="nav__subtitle">Patates + Kutu İçecek</div>
            </div>
            <div class="nav__action">
                Seçim için tıklayınız
                <PointerIcon class="nav__actionIcon" />
            </div>
        </div>
        <div class="nav__item">
            <img class="nav__image" src="../../assets/images/categories/drinks.png" alt="burger">
            <div class="nav__itemContent">
                <div class="nav__title">İçecekler</div>
                <div class="nav__subtitle">Soğuk İçecekler</div>
            </div>
            <div class="nav__action">
                Seçim için tıklayınız
                <PointerIcon class="nav__actionIcon" />
            </div>
        </div>

    </div>
</template>
<script>
import PointerIcon from '../../assets/icons/pointer-icon.vue'
export default {
    name: "HomeNav",
    components: {
        PointerIcon
    },
    created() { },
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