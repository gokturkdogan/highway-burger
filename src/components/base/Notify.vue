<template>
    <transition name="slide-down">
        <div class="notify" v-if="notify.show" :class="notify.type">
            <component :is="iconComponent" class="notify__icon" />
            <span class="notify__message">{{ notify.message }}</span>
        </div>
    </transition>
</template>

<script>
import SuccesIcon from '../../assets/icons/success-icon.vue';
import ErrorIcon from '../../assets/icons/error-icon.vue';
import WarningIcon from '../../assets/icons/warning-icon.vue';

export default {
    name: 'Notify',
    components: {
        SuccesIcon,
        ErrorIcon,
        WarningIcon
    },
    computed: {
        notify() {
            return this.$store.getters['notify/getNotify'];
        },
        iconComponent() {
            const map = {
                success: 'SuccesIcon',
                error: 'ErrorIcon',
                warning: 'WarningIcon'
            };
            return map[this.notify.type] || null;
        }
    }
};
</script>

<style scoped lang="scss">
.notify {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 102;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 10px 20px;
    box-shadow: #00000014 1px 6px 5px;
    font-size: 16px;
    font-weight: 500;

    &.error {
        background-color: #ffd8d5;
        color: #ff4d4f;

        .notify__icon {
            fill: #ff4d4f;
        }
    }

    &.success {
        background-color: #f0ffe0;
        color: #52c41a;

        .notify__icon {
            fill: #52c41a;
        }
    }

    &.warning {
        background-color: #ffefdc;
        color: #ffa600;

        .notify__icon {
            fill: #ffa600;
        }
    }

    &__icon {
        width: 40px;
    }
}

.slide-down-enter-from {
    transform: translateY(-100%);
    opacity: 0;
}

.slide-down-enter-to {
    transform: translateY(0);
    opacity: 1;
}

.slide-down-leave-from {
    transform: translateY(0);
    opacity: 1;
}

.slide-down-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
}
</style>
