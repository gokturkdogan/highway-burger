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
    gap: 16px;
    padding: 16px 24px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.18),
                0 4px 12px rgba(0, 0, 0, 0.12),
                0 2px 6px rgba(0, 0, 0, 0.08);
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.3px;
    border-radius: 0 0 20px 20px;
    backdrop-filter: blur(10px);
    border-left: 5px solid;
    border-right: 5px solid;
    border-bottom: 3px solid;

    &.error {
        background: linear-gradient(135deg, 
            rgba(255, 235, 235, 0.98) 0%, 
            rgba(255, 245, 245, 0.98) 100%);
        color: #dc3545;
        border-color: #dc3545;

        .notify__icon {
            fill: #dc3545;
            animation: iconShake 0.5s ease-in-out;
        }
    }

    &.success {
        background: linear-gradient(135deg, 
            rgba(236, 253, 245, 0.98) 0%, 
            rgba(240, 253, 244, 0.98) 100%);
        color: #10b981;
        border-color: #10b981;

        .notify__icon {
            fill: #10b981;
            animation: iconBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
    }

    &.warning {
        background: linear-gradient(135deg, 
            rgba(255, 251, 235, 0.98) 0%, 
            rgba(254, 252, 247, 0.98) 100%);
        color: #bb7c05;
        border-color: #bb7c05;

        .notify__icon {
            fill: #bb7c05;
            animation: iconPulse 0.8s ease-in-out;
        }
    }

    &__icon {
        width: 44px;
        height: 44px;
        flex-shrink: 0;
    }

    &__message {
        flex: 1;
        line-height: 1.5;
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
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                opacity 0.4s ease;
}

@keyframes iconBounce {
    0%, 100% {
        transform: scale(1);
    }
    25% {
        transform: scale(1.3) rotate(-10deg);
    }
    50% {
        transform: scale(0.9) rotate(5deg);
    }
    75% {
        transform: scale(1.1) rotate(-5deg);
    }
}

@keyframes iconShake {
    0%, 100% {
        transform: translateX(0) rotate(0);
    }
    10%, 30%, 50%, 70%, 90% {
        transform: translateX(-4px) rotate(-3deg);
    }
    20%, 40%, 60%, 80% {
        transform: translateX(4px) rotate(3deg);
    }
}

@keyframes iconPulse {
    0%, 100% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.15);
        opacity: 0.8;
    }
}

@media (max-width: 768px) {
    .notify {
        padding: 14px 20px;
        gap: 14px;
        border-radius: 0 0 18px 18px;

        &__icon {
            width: 40px;
            height: 40px;
        }

        &__message {
            font-size: 14px;
        }
    }
}

@media (max-width: 480px) {
    .notify {
        padding: 12px 18px;
        gap: 12px;
        border-radius: 0 0 16px 16px;
        border-left-width: 4px;
        border-right-width: 4px;

        &__icon {
            width: 36px;
            height: 36px;
        }

        &__message {
            font-size: 13px;
        }
    }
}
</style>
