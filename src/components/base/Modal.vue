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
        z-index: 999;
        top: 16%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        max-height: 68%;
        background-color: white;
        width: 90%;
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

    &.-deleteProduct {
        #{$self} {
            &__wrapper {
                border-radius: 20px;
            }

            &__header {
                border-radius: 20px 20px 0 0;
            }
        }
    }

    &.-productDetail {
        #{$self} {
            &__wrapper {
                border-radius: 24px;
                max-width: 800px;
                width: 90%;
                max-height: 80%;
                top: 50%;
                transform: translate(-50%, -50%);
            }

            &__header {
                border-radius: 24px 24px 0 0;
                padding: 20px 24px 15px;
            }

            &__body {
                padding: 0 24px 20px;
            }

            &__footer {
                padding: 20px 24px 24px;
                border-radius: 0 0 24px 24px;
            }
        }

        // Desktop için özel stiller - overlay direkt görünür, wrapper kayarak gelir
        @media (min-width: 769px) {
            #{$self} {
                &__overlay {
                    opacity: 1; // Overlay direkt görünür
                    animation: fadeIn 0.3s ease-out;
                }

                &__wrapper {
                    max-width: 600px;
                    width: 85%;
                    max-height: 75%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0.9);
                    opacity: 0;
                    animation: slideInScale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }

                &__header {
                    padding: 24px 28px 18px;
                }

                &__body {
                    padding: 0 28px 24px;
                }

                &__footer {
                    padding: 24px 28px 28px;
                }
            }
        }

        // Büyük ekranlar için
        @media (min-width: 1200px) {
            #{$self} {
                &__wrapper {
                    max-width: 700px;
                    width: 80%;
                }
            }
        }
    }

    // Desktop için animasyonlar
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes slideInScale {
        0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.05);
            opacity: 0.8;
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
}
</style>
