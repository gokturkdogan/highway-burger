<template>
    <div class="customInput" :class="{ '-active': isActive }">
        <input 
            :class="{ '-active': isActive }" 
            :type="type" 
            class="customInput__input" 
            v-model="inputValue"
            :required="required" 
            placeholder=" " />
        <label class="customInput__label">{{ label }}</label>
    </div>
</template>

<script>
export default {
    name: "CustomInput",
    props: {
        modelValue: {
            type: [String, Number],
            default: ''
        },
        label: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'text'
        },
        required: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue'],
    computed: {
        isActive() {
            return this.inputValue !== '';
        },
        inputValue: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.customInput {
    position: relative;
    width: 100%;

    &.-active {
        .customInput__input {
            border-color: #bb7c05;
        }

        .customInput__label {
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
        transition: all 0.2s ease;

        &:focus {
            border-color: #bb7c05;
        }

        &.-active {
            border-color: #bb7c05;
        }

        &:focus+.customInput__label,
        &:not(:placeholder-shown)+.customInput__label {
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

            &+.customInput__label {
                color: #999;
            }
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
}
</style>
