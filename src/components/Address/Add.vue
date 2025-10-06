<template>
    <transition name="slide-up">
        <Modal v-if="isModalOpen" title="Yeni Adres Ekle" variant="addAddress" @close-modal="closeModal">
            <template #body>
                <div class="addAddress">
                    <div class="addAddress__field">
                        <CustomInput v-model="title" label="Adress Başlığı" type="text" :required="true" />
                    </div>
                    <div class="addAddress__field">
                        <CustomInput v-model="name" label="İsim" type="text" :required="true" />
                    </div>
                    <div class="addAddress__field">
                        <CustomInput v-model="surname" label="Soyisim" type="text" :required="true" />
                    </div>
                    <div class="addAddress__field">
                        <CustomSelect v-model="city" :options="cityOptions" label="Şehir" :disabled="true" />
                    </div>
                    <div class="addAddress__field">
                        <CustomSelect v-model="district" :options="districtOptions" label="İlçe" />
                    </div>
                    <div class="addAddress__field">
                        <CustomSelect v-model="neighborhood" :options="neighborhoodOptions" label="Mahalle"
                            :show-warning="!district" warning-message="Lütfen önce ilçe seçiniz" />
                    </div>
                    <div class="addAddress__field">
                        <CustomTextarea v-model="description" label="Adres Açıklaması" :rows="4" :required="false" />
                    </div>
                </div>
            </template>
            <template #footer>
                <button class="addAddress__button" @click="addAddress">
                    Adres Ekle
                </button>
            </template>
        </Modal>
    </transition>
</template>

<script>
import Modal from '../base/Modal.vue'
import CustomSelect from '../base/CustomSelect.vue'
import CustomInput from '../base/CustomInput.vue'
import CustomTextarea from '../base/CustomTextarea.vue'
import { getAllCities, getDistrictsByCity, getNeighborhoodsByDistrict } from '../../config/formOptions.js'
export default {
    name: "AddAddress",
    data() {
        return {
            title: '',
            name: '',
            surname: '',
            city: 'istanbul',
            district: '',
            neighborhood: '',
            description: ''
        };
    },
    components: {
        Modal,
        CustomSelect,
        CustomInput,
        CustomTextarea
    },
    created() { },
    computed: {
        isModalOpen() {
            return this.$store.getters["address/getIsModalOpen"];
        },
        cityOptions() {
            return getAllCities();
        },
        districtOptions() {
            return getDistrictsByCity(this.city);
        },
        neighborhoodOptions() {
            return getNeighborhoodsByDistrict(this.district);
        }
    },
    methods: {
        closeModal() {
            this.$store.commit('address/SET_IS_MODAL_OPEN', false)
        },
        validateForm() {
            const requiredFields = [
                { field: 'title', label: 'Adres Başlığı' },
                { field: 'name', label: 'İsim' },
                { field: 'surname', label: 'Soyisim' },
                { field: 'district', label: 'İlçe' },
                { field: 'neighborhood', label: 'Mahalle' }
            ];
            const missingFields = requiredFields.filter(item => !this[item.field] || this[item.field].trim() === '');
            if (missingFields.length > 0) {
                this.$store.dispatch('notify/showNotify', {
                    type: 'warning',
                    message: 'Lütfen tüm alanları doldurun'
                });
                return false;
            }

            return true;
        },
        async addAddress() {
            if (!this.validateForm()) {
                return;
            }
            const addressData = {
                title: this.title,
                name: this.name,
                surname: this.surname,
                city: this.city,
                district: this.district,
                neighborhood: this.neighborhood,
                description: this.description
            };
            await this.$store.dispatch('address/addAddress', addressData);
            this.resetForm();
            this.closeModal();
        },
        resetForm() {
            this.title = '';
            this.name = '';
            this.surname = '';
            this.city = 'istanbul';
            this.district = '';
            this.neighborhood = '';
            this.description = '';
        }
    },
    watch: {
        city(newCity) {
            this.district = '';
            this.neighborhood = '';
        },
        district(newDistrict) {
            this.neighborhood = '';
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

    &__button {
        width: 100%;
        padding: 16px 24px;
        background: linear-gradient(135deg, #bb7c05 0%, #a66b04 100%);
        color: white;
        border: none;
        border-radius: 20px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(187, 124, 5, 0.3);

        &:hover {
            background: linear-gradient(135deg, #a66b04 0%, #8d5a03 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(187, 124, 5, 0.4);
        }

        &:active {
            transform: translateY(0);
            box-shadow: 0 2px 10px rgba(187, 124, 5, 0.3);
        }

        &:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;

            &:hover {
                background: #ccc;
                transform: none;
                box-shadow: none;
            }
        }
    }
}
</style>