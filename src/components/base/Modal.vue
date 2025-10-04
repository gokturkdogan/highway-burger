<template>
    <div class="modal" :class="'-' + variant">
        <div class="modal__overlay" @click="$emit('close-modal')"></div>
        <div class="modal__wrapper">
            <div class="modal__header">
                <h5 class="modal__title">{{ title }}</h5>
                <span class="modal__close" @click="$emit('close-modal')">
                    <XIcon class="modal__closeIcon" />
                </span>
            </div>
            <div class="modal__body">
                <slot name="body"></slot>
            </div>
            <div v-if="$slots.footer" class="modal__footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import XIcon from '../../assets/icons/x-icon.vue';

export default {
    name: 'modal',
    components: {
        XIcon
    },
    props: {
        title: {
            type: String,
            required: true
        },
        variant: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.slide-up-enter-from,
.slide-up-leave-to {
    transform: translateY(120%);
    /* daha uzun mesafeden gelsin */
    opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1),
        opacity 500ms ease;
}

.slide-up-enter-to,
.slide-up-leave-from {
    transform: translateY(0);
    opacity: 1;
}

.modal {
    $self: &;
    position: fixed;
    z-index: 101;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    &__overlay {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(black, 0.5);
        transition: 250ms all;
    }

    &__wrapper {
        position: absolute;
        z-index: 1;
        top: 16%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        max-height: 68%;
        background-color: white;
        width: 90%;
        border-radius: 20px;
    }

    &__header {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 31px 30px 10px;
        background: white;
    }

    &__close {
        position: absolute;
        top: 10px;
        right: 10px;
        height: 30px;
        cursor: pointer;
    }

    &__closeIcon {
        width: 20px;
    }

    &__title {
        font-size: 20px;
        font-weight: normal;
        line-height: 26px;
    }

    &__tools {
        margin-top: auto;
        margin-left: auto;
    }

    &__body {
        height: 100%;
        overflow: auto;
        padding: 20px 30px;
        background-color: white;
    }

    &__footer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
        padding: 30px;
        margin-top: auto;
    }

    &.-addAddress {
        #{$self} {
            &__wrapper {
                max-height: unset;
                transform: unset;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                width: 100%;
            }
        }
    }
}
</style>
