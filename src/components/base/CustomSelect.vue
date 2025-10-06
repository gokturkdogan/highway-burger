<template>
    <div class="customSelect" :class="{ '-active': isActive, '-disabled': disabled, '-dropdown-open': isOpen }">
        <div class="customSelect__input" @click="toggleDropdown">
            <span class="customSelect__text">{{ displayText }}</span>
            <svg class="customSelect__arrow" :class="{ '-rotated': isOpen }" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
        </div>
        <label class="customSelect__label">{{ label }}</label>
        <div class="customSelect__dropdown" v-if="isOpen" @click.stop>
            <div v-if="showWarning" class="customSelect__warning">
                <WarningIcon class="customSelect__warning-icon" />
                <span class="customSelect__warning-text">{{ warningMessage }}</span>
            </div>
            <div v-else class="customSelect__dropdown-item" v-for="option in options" :key="option.value"
                @click="selectOption(option.value)" :class="{ '-selected': modelValue === option.value }">
                {{ option.label }}
            </div>
        </div>
    </div>
</template>

<script>
import WarningIcon from '../../assets/icons/warning-icon.vue'

export default {
    name: "CustomSelect",
    components: {
        WarningIcon
    },
    props: {
        modelValue: {
            type: [String, Number],
            default: ''
        },
        options: {
            type: Array,
            required: true,
            default: () => []
        },
        label: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ''
        },
        warningMessage: {
            type: String,
            default: 'Lütfen önce üst seviye seçimi yapınız'
        },
        showWarning: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue'],
    data() {
        return {
            isOpen: false,
            dropdownId: null
        };
    },
    computed: {
        isActive() {
            return this.modelValue !== '' || this.isOpen;
        },
        displayText() {
            const option = this.options.find(opt => opt.value === this.modelValue);
            return option ? option.label : this.placeholder;
        }
    },
    mounted() {
        // Unique ID oluştur
        this.dropdownId = 'dropdown_' + Math.random().toString(36).substr(2, 9);

        // Global event listener ekle
        window.addEventListener('closeAllDropdowns', this.closeDropdown);
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
        window.removeEventListener('closeAllDropdowns', this.closeDropdown);
        document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
        toggleDropdown() {
            if (!this.disabled) {
                if (this.isOpen) {
                    this.closeDropdown();
                } else {
                    // Diğer tüm dropdown'ları kapat
                    window.dispatchEvent(new CustomEvent('closeAllDropdowns'));
                    this.openDropdown();
                }
            }
        },
        openDropdown() {
            this.isOpen = true;
        },
        closeDropdown() {
            this.isOpen = false;
        },
        selectOption(value) {
            this.$emit('update:modelValue', value);
            this.closeDropdown();
        },
        handleClickOutside(event) {
            if (!event.target.closest('.customSelect')) {
                this.closeDropdown();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.customSelect {
    position: relative;
    width: 100%;

    &.-active {
        .customSelect__input {
            border-color: #bb7c05;
        }

        .customSelect__label {
            top: 0px;
            left: 15px;
            font-size: 12px;
            color: #bb7c05;
        }
    }

    &.-disabled {
        .customSelect__input {
            background-color: #f5f5f5;
            border-color: #ddd;
            cursor: not-allowed;
            color: #999;

            .customSelect__arrow {
                stroke: #999;
            }

            &+.customSelect__label {
                color: #999;
            }
        }
    }

    &__input {
        width: 100%;
        padding: 20px;
        border: 2px solid #ccc;
        border-radius: 20px;
        outline: none;
        font-size: 16px;
        background-color: white;
        color: #333;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: all 0.2s ease;

        &:hover {
            border-color: #bb7c05;
        }

        &:focus {
            border-color: #bb7c05;
        }
    }

    &.-dropdown-open &__input {
        border-radius: 20px 20px 20px 0;
        border-bottom-color: #bb7c05;
    }

    &__text {
        flex: 1;
        text-align: left;
    }

    &__arrow {
        transition: transform 0.2s ease;
        flex-shrink: 0;

        &.-rotated {
            transform: rotate(180deg);
        }
    }

    &__label {
        position: absolute;
        top: 50%;
        left: 12px;
        transform: translateY(-50%);
        font-size: 16px;
        color: #999;
        pointer-events: none;
        transition: all 0.2s ease;
        background: white;
        padding: 0 4px;
    }

    &__dropdown {
        position: absolute;
        top: calc(100% - 2px);
        left: 0;
        right: 0;
        background: white;
        border: 2px solid #bb7c05;
        border-top: none;
        border-radius: 0 0 20px 20px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        max-height: 200px;
        overflow-y: auto;
        animation: dropdownSlideDown 0.2s ease-out;
        backdrop-filter: blur(10px);
    }

    &__dropdown-item {
        padding: 16px 20px;
        cursor: pointer;
        transition: all 0.2s ease;
        border-bottom: 1px solid rgba(240, 240, 240, 0.5);
        font-size: 15px;
        position: relative;

        &:first-child {
            padding-top: 20px;
        }

        &:last-child {
            border-bottom: none;
            padding-bottom: 20px;
            border-radius: 0 0 18px 18px;
        }

        &:hover {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            color: #bb7c05;
            transform: translateX(2px);
        }

        &.-selected {
            background: linear-gradient(135deg, #bb7c05 0%, #a66b04 100%);
            color: white;
            font-weight: 600;
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);

            &:hover {
                background: linear-gradient(135deg, #a66b04 0%, #8d5a03 100%);
                transform: translateX(2px);
            }

            &::after {
                content: '✓';
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                font-weight: bold;
                font-size: 14px;
            }
        }
    }

    &__warning {
        padding: 24px 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
        border-bottom: 1px solid rgba(255, 193, 7, 0.3);
        min-height: 70px;
        border-radius: 0 0 20px 20px;
        position: relative;
        overflow: hidden;
    }

    &__warning-icon {
        width: 24px;
        height: 24px;
        fill: #f57c00;
        flex-shrink: 0;
        animation: warningBounce 1.5s ease-in-out infinite;
    }

    &__warning-text {
        color: #f57c00;
        font-size: 15px;
        font-weight: 600;
        text-align: center;
        line-height: 1.4;
        letter-spacing: 0.3px;
    }
}

@keyframes warningPulse {

    0%,
    100% {
        opacity: 0.7;
    }

    50% {
        opacity: 1;
    }
}

@keyframes warningBounce {

    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0);
    }

    40% {
        transform: translateY(-3px);
    }

    60% {
        transform: translateY(-2px);
    }
}

@keyframes dropdownSlideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
