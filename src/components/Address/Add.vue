<template>
    <transition name="slide-up">
        <Modal v-if="isModalOpen" title="Yeni Adres Ekle" variant="addAddress" @close-modal="closeModal">
            <template #body>
                <div class="addAddress">
                    <div class="addAddress__field">
                        <input :class="{ '-active': title }" type="text" class="addAddress__input" v-model="title"
                            required placeholder=" " />
                        <label class="addAddress__label">Adress Başlığı</label>
                    </div>
                    <div class="addAddress__field">
                        <input :class="{ '-active': name }" type="text" class="addAddress__input" v-model="name"
                            required placeholder=" " />
                        <label class="addAddress__label">İsim</label>
                    </div>
                    <div class="addAddress__field">
                        <input :class="{ '-active': surname }" type="text" class="addAddress__input" v-model="surname"
                            required placeholder=" " />
                        <label class="addAddress__label">Soyisim</label>
                    </div>
                </div>
            </template>
        </Modal>
    </transition>
</template>

<script>
import Modal from '../base/Modal.vue'
export default {
    name: "AddAddress",
    data() {
        return {
            title: '',
            name: '',
            surname: '',

        };
    },
    components: {
        Modal
    },
    created() { },
    computed: {
        isModalOpen() {
            return this.$store.getters["address/getIsModalOpen"];
        }
    },
    methods: {
        closeModal() {
            this.$store.commit('address/SET_IS_MODAL_OPEN', false)
        }
    },
};
</script>
<style lang="scss" scoped>
.addAddress {
    display: flex;
    flex-direction: column;
    gap: 20px;

    &__field {
        position: relative;
        width: calc(100% - 40px);
    }

    &__input {
        width: 100%;
        padding: 20px;
        border: 2px solid #ccc;
        border-radius: 20px;
        outline: none;
        font-size: 16px;

        &:focus {
            border-color: #bb7c05;
        }

        &.-active {
            border-color: #bb7c05;
        }

        &:focus+.addAddress__label,
        &:not(:placeholder-shown)+.addAddress__label {
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

            &+.addAddress__label {
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