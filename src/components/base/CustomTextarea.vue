<template>
    <div class="customTextarea" :class="{ '-active': isActive }">
        <textarea :class="{ '-active': isActive }" class="customTextarea__input" v-model="textareaValue"
            :required="required" placeholder=" " rows="4" @input="handleInput" @focus="handleFocus"
            @blur="handleBlur" />
        <label class="customTextarea__label">{{ label }}</label>
    </div>
</template>

<script>
export default {
    name: "CustomTextarea",
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            required: true
        },
        required: {
            type: Boolean,
            default: false
        },
        rows: {
            type: Number,
            default: 4
        },
        maxLength: {
            type: Number,
            default: null
        }
    },
    emits: ['update:modelValue'],
    data() {
        return {
            isFocused: false
        };
    },
    computed: {
        isActive() {
            return this.textareaValue !== '' || this.isFocused;
        },
        textareaValue: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            }
        }
    },
    methods: {
        handleInput(event) {
            this.textareaValue = event.target.value;
        },
        handleFocus() {
            this.isFocused = true;
        },
        handleBlur() {
            this.isFocused = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.customTextarea {
    position: relative;
    width: 100%;

    &.-active {
        .customTextarea__input {
            border-color: #bb7c05;
        }

        .customTextarea__label {
            top: 0px;
            left: 15px;
            font-size: 12px;
            color: #bb7c05;
        }
    }

    &__input {
        width: 100%;
        padding: 20px;
        border: 2px solid #ccc;
        border-radius: 20px;
        outline: none;
        font-size: 16px;
        font-family: inherit;
        line-height: 1.5;
        resize: vertical;
        min-height: 120px;
        transition: all 0.2s ease;
        background-color: white;

        &:focus {
            border-color: #bb7c05;
        }

        &.-active {
            border-color: #bb7c05;
        }

        &:focus+.customTextarea__label,
        &:not(:placeholder-shown)+.customTextarea__label {
            top: 0px;
            left: 15px;
            font-size: 12px;
            color: #bb7c05;
        }

        &:disabled {
            background-color: #f5f5f5;
            border-color: #ddd;
            cursor: not-allowed;
            color: #999;
            resize: none;

            &+.customTextarea__label {
                color: #999;
            }
        }

        &::placeholder {
            color: transparent;
        }
    }

    &__label {
        position: absolute;
        top: 20px;
        left: 12px;
        font-size: 16px;
        color: #999;
        pointer-events: none;
        transition: all 0.2s ease;
        background: white;
        padding: 0 4px;
        transform: translateY(-50%);
    }
}
</style>
