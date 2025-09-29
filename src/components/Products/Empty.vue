<template>
    <div class="empty">
        <EmptyIcon class="empty__icon" />
        <span class="empty__text">Kategoriye ait ürün bulunamadı...</span>
    </div>
</template>
<script>
import EmptyIcon from '../../assets/icons/empty-icon.vue';
export default {
    name: "Empty",
    data() { },
    components: {
        EmptyIcon
    }
};
</script>
<style lang="scss" scoped>
.empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 100px;

    &__icon {
        width: 100px;
        fill: #bb7c05;
    }

    &__text {
        margin-top: 30px;
        font-size: 18px;
    }
}
</style>