<template>
    <transition name="fade-scale">
        <Modal v-if="isOpen" title="Ürünü Sil" variant="deleteProduct" @close-modal="closeModal">
            <template #body>
                <div class="deleteModal">
                    <div class="deleteModal__icon">
                        <WarningIcon class="deleteModal__warningIcon" />
                    </div>
                    
                    <div class="deleteModal__content">
                        <h3 class="deleteModal__title">Emin misiniz?</h3>
                        <p class="deleteModal__message">
                            <span class="deleteModal__productName">{{ productName }}</span> ürününü sepetinizden kaldırmak istediğinize emin misiniz?
                        </p>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="deleteModal__footer">
                    <button class="deleteModal__cancelBtn" @click="closeModal">
                        İptal
                    </button>
                    <button class="deleteModal__confirmBtn" @click="confirmDelete">
                        Evet, Sil
                    </button>
                </div>
            </template>
        </Modal>
    </transition>
</template>

<script>
import Modal from '../base/Modal.vue'
import WarningIcon from '../../assets/icons/warning-icon.vue'

export default {
    name: "DeleteModal",
    components: {
        Modal,
        WarningIcon
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true,
            default: false
        },
        productIndex: {
            type: Number,
            default: null
        },
        productName: {
            type: String,
            default: ''
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        confirmDelete() {
            this.$emit('confirm', this.productIndex);
        }
    }
};
</script>

<style lang="scss" scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
    :deep(.modal__overlay) {
        transition: opacity 250ms ease;
    }
    
    :deep(.modal__wrapper) {
        transition: opacity 500ms cubic-bezier(0.4, 0, 0.2, 1),
                    transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
    }
}

.fade-scale-enter-from {
    :deep(.modal__overlay) {
        opacity: 0;
    }
    
    :deep(.modal__wrapper) {
        opacity: 0;
        transform: scale(0.85);
    }
}

.fade-scale-enter-to {
    :deep(.modal__overlay) {
        opacity: 1;
    }
    
    :deep(.modal__wrapper) {
        opacity: 1;
        transform: scale(1);
    }
}

.fade-scale-leave-from {
    :deep(.modal__overlay) {
        opacity: 1;
    }
    
    :deep(.modal__wrapper) {
        opacity: 1;
        transform: scale(1);
    }
}

.fade-scale-leave-to {
    :deep(.modal__overlay) {
        opacity: 1;
    }
    
    :deep(.modal__wrapper) {
        opacity: 0;
        transform: scale(0.85);
    }
}

.deleteModal {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    padding: 10px 0;

    &__icon {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, rgba(187, 124, 5, 0.15) 0%, rgba(212, 150, 36, 0.08) 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 20px rgba(187, 124, 5, 0.25),
                    0 3px 10px rgba(0, 0, 0, 0.12);
        border: 3px solid rgba(187, 124, 5, 0.25);
        animation: iconPulse 2s ease-in-out infinite;
    }

    &__warningIcon {
        width: 48px;
        height: 48px;
        fill: #bb7c05;
    }

    &__content {
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    &__title {
        font-size: 20px;
        font-weight: 900;
        color: #1a1a1a;
        margin: 0;
        letter-spacing: 0.3px;
    }

    &__message {
        font-size: 14px;
        color: #5a5a5a;
        line-height: 1.6;
        margin: 0;
        font-weight: 500;
    }

    &__productName {
        font-weight: 800;
        color: #bb7c05;
        display: inline-block;
    }

    &__footer {
        width: 100%;
        display: flex;
        gap: 10px;
        margin-top: 8px;
    }

    &__cancelBtn {
        flex: 1;
        padding: 12px 20px;
        background: white;
        border: 3px solid #e0e0e0;
        color: #5a5a5a;
        border-radius: 14px;
        font-size: 14px;
        font-weight: 800;
        cursor: pointer;
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08),
                    0 1px 4px rgba(0, 0, 0, 0.06);
        letter-spacing: 0.5px;
        text-transform: uppercase;

        &:hover {
            background: linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%);
            border-color: #aaa;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.12);
        }

        &:active {
            transform: translateY(0);
        }
    }

    &__confirmBtn {
        flex: 1;
        padding: 12px 20px;
        background: linear-gradient(135deg, #bb7c05 0%, #d49624 50%, #bb7c05 100%);
        background-size: 200% 200%;
        border: 3px solid #bb7c05;
        color: white;
        border-radius: 14px;
        font-size: 14px;
        font-weight: 800;
        cursor: pointer;
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 5px 18px rgba(187, 124, 5, 0.4),
                    0 2px 8px rgba(0, 0, 0, 0.15);
        letter-spacing: 0.5px;
        text-transform: uppercase;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);

        &:hover {
            background-position: 100% 50%;
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(187, 124, 5, 0.5),
                        0 4px 12px rgba(0, 0, 0, 0.2);
            border-color: #d49624;
        }

        &:active {
            transform: translateY(-1px);
            box-shadow: 0 4px 15px rgba(187, 124, 5, 0.4);
        }
    }
}

@keyframes iconPulse {
    0%, 100% {
        transform: scale(1);
        box-shadow: 0 6px 20px rgba(187, 124, 5, 0.25),
                    0 3px 10px rgba(0, 0, 0, 0.12);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 8px 25px rgba(187, 124, 5, 0.35),
                    0 4px 12px rgba(0, 0, 0, 0.18);
    }
}

@media (max-width: 480px) {
    .deleteModal {
        gap: 16px;
        padding: 8px 0;

        &__icon {
            width: 70px;
            height: 70px;
        }

        &__warningIcon {
            width: 42px;
            height: 42px;
        }

        &__title {
            font-size: 18px;
        }

        &__message {
            font-size: 13px;
        }

        &__footer {
            gap: 8px;
        }

        &__cancelBtn,
        &__confirmBtn {
            padding: 11px 18px;
            font-size: 13px;
        }
    }
}
</style>

