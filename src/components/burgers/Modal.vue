<template>
    <div class="modal">
        <div class="modal__overlay" @click="close">
            <div class="modal__wrapper" @click.stop>
                <div class="modal__header">
                    <XIcon class="modal__close" @click="close"/>
                </div>
                <div class="modal__body">
                    <img class="modal__image" src="../../assets/images/categories/burger.png" alt="burger">
                    <span class="modal__title">Highway Classic Burger</span>
                    <span class="modal__subtitle">Hambugrger köftesi, burger peyniri, simple sos, yeşillik, domates,
                        turşu, patates kızartması</span>
                    <div class="modal__portion">
                        <span @click="selectPortion('110')" class="modal__option"
                            :class="{ '-active': activePortion === '110' }">110gr</span>
                        <span @click="selectPortion('180')" class="modal__option"
                            :class="{ '-active': activePortion === '180' }">180gr</span>
                    </div>
                    <span v-if="alert" class="modal__alert">Lütfen gramaj seçimi yapınız</span>
                </div>
                <div class="modal__footer">
                    <span class="modal__price">{{ price }}</span>
                    <basketIcon @click="addToBasket" class="modal__basket"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import XIcon from '../../assets/icons/x-icon.vue'
import basketIcon from '../../assets/icons/basket-icon.vue';
export default {
    name: "BurgerModal",
    components: {
        XIcon,
        basketIcon
    },
    data() {
        return {
            activePortion: '',
            alert: false
        }
    },
    created() { },
    methods: {
        selectPortion(value) {
            this.alert = false
            this.activePortion = value
        },
        addToBasket() {
            if(this.activePortion) {
                console.log('eklendi')
            } else {
                this.alert = true
            }
        },
        close() {
            this.$store.dispatch("burgerModal/closeModal");
        }
    },
    computed: {
        price() {
            return this.activePortion
                ? (this.activePortion === '110' ? '250 ₺' : '300 ₺')
                : '250/300 ₺'
        }
    }
};
</script>
<style lang="scss" scoped>
.modal {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 100;

    &__overlay {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.576);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__wrapper {
        background-color: white;
        width: 90%;
        border-radius: 20px;
    }

    &__header {
        display: flex;
        justify-content: flex-end;
        padding: 20px;
    }

    &__close {
        width: 30px;
        fill: #bb7c05;
    }

    &__body {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
    }

    &__image {
        width: 200px;
    }

    &__title {
        font-size: 22px;
        margin-top: 20px;
    }

    &__subtitle {
        text-align: center;
        margin-top: 10px;
        font-size: 14px;
        color: #7a7a7a;
    }

    &__portion {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 20px;
    }

    &__option {
        border: 2px solid #bb7c05;
        color: #bb7c05;
        font-size: 14px;
        padding: 5px;
        border-radius: 10px;
        cursor: pointer;

        &.-active {
            background-color: #bb7c05;
            color: white;
        }
    }

    &__alert {
        font-size: 14px;
        margin-top: 5px;
        color: rgb(208, 16, 16);
    }

    &__footer {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__price {
        color: #bb7c05;
        font-size: 32px;
        font-weight: 600;
    }

    &__basket {
        width: 40px;
        fill: white;
        background-color: #bb7c05;
        padding: 10px;
        border-radius: 100%;
    }
}
</style>