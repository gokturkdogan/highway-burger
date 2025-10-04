<template>
    <div class="empty">
        <MapIcon class="empty__icon" />
        <span class="empty__text">Kayıtlı adresiniz bulunmamaktadır</span>
        <button @click="openModal" class="empty__button">Adres Ekle +</button>
    </div>
</template>

<script>
import MapIcon from '../../assets/icons/map-icon.vue'
export default {
    name: "Home",
    data() {
        return {};
    },
    components: {
        MapIcon
    },
    created() { },
    computed: {},
    methods: {
        openModal() {
            this.$store.commit('address/SET_IS_MODAL_OPEN', true);
        }
    },
};
</script>
<style lang="scss" scoped>
.empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;

    &__icon {
        width: 100px;
        fill: #bb7c05;
    }

    &__text {
        margin-top: 20px;
        font-size: 18px;
    }

    &__button {
        background: #bb7c05;
        outline: none;
        border: 0;
        width: 100%;
        color: white;
        height: 60px;
        border-radius: 20px;
        margin-top: 60px;
        font-size: 20px;
    }
}
</style>