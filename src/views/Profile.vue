<template>
    <div class="profile">
        <div v-if="loader" class="profile__loader">
            <BurgerSpinner />
        </div>
        <div class="profile__content" v-else>
            <form v-if="profile" class="profile__form">
                <div class="profile__field">
                    <input :class="{ '-active': profile.name }" type="text" class="profile__input"
                        v-model="profile.name" required placeholder=" " />
                    <label class="profile__label">İsim</label>
                </div>
                <div class="profile__field">
                    <input :class="{ '-active': profile.surname }" type="text" class="profile__input"
                        v-model="profile.surname" required placeholder=" " />
                    <label class="profile__label">Soyisim</label>
                </div>
                <div class="profile__field">
                    <input :class="{ '-active': profile.phone }"
                        @input="profile.phone = profile.phone.toString().slice(0, 10)" type="number"
                        class="profile__input" v-model="profile.phone" required placeholder=" " />
                    <label class="profile__label">Telefon</label>
                </div>
                <div class="profile__field">
                    <input disabled :class="{ '-active': profile.email }" type="text" class="profile__input"
                        v-model="profile.email" required placeholder=" " />
                    <label class="profile__label">E posta</label>
                </div>
            </form>
            <div class="profile__error" v-else>
                <WarningIcon class="profile__errorIcon" />
                <span class="profile__errorText">Bir Hata Oluştu Lütfen Tekrar Deneyin</span>
            </div>
            <button @click="update" class="profile__update">Güncelle</button>
        </div>
    </div>
</template>

<script>
import BurgerSpinner from '../components/base/BurgerSpinner.vue';
import WarningIcon from '../assets/icons/warning-icon.vue'
export default {
    name: "Profile",
    components: {
        BurgerSpinner,
        WarningIcon
    },
    data() {
        return {

        }
    },
    created() {
        this.$store.dispatch('profile/fetchProfile')
    },
    computed: {
        loader() {
            return this.$store.getters["profile/getLoader"];
        },
        profile() {
            return this.$store.getters["profile/getProfile"];
        },
    },
    methods: {
        validateInputs() {
            if (!this.profile.name || !this.profile.surname || !this.profile.phone || !this.profile.email) {
                this.$store.dispatch('notify/showNotify', { message: 'Tüm alanları doldurmanız gerekiyor!', type: 'warning' });
                return false;
            }
            if (this.profile.name.length < 3) {
                this.$store.dispatch('notify/showNotify', { message: 'İsim en az 3 karakter olmalıdır!', type: 'warning' });
                return false;
            }
            if (this.profile.surname.length < 2) {
                this.$store.dispatch('notify/showNotify', { message: 'Soyisim en az 2 karakter olmalıdır!', type: 'warning' });
                return false;
            }
            const phonePattern = /^[0-9+]{10,15}$/;
            if (!phonePattern.test(this.profile.phone)) {
                this.$store.dispatch('notify/showNotify', { message: 'Geçerli bir telefon numarası girin!', type: 'warning' });
                return false;
            }
            return true;
        },
        update() {
            if (this.validateInputs()) {
                const payload = {
                    name: this.profile.name,
                    surname: this.profile.surname,
                    phone: this.profile.phone
                };
                this.$store.dispatch('profile/updateProfile', payload)
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    top: 50px;

    &__content {
        width: 100%;
    }

    &__loader {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60vh;
    }

    &__image {
        width: 150px;
        margin-bottom: 30px;
    }

    &__form {
        width: 100%;
        max-width: 400px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 40px;
    }

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

        &:focus+.profile__label,
        &:not(:placeholder-shown)+.profile__label {
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

            &+.profile__label {
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

    &__error {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 100px;
    }

    &__errorIcon {
        width: 100px;
        fill: #bb7c05;
    }

    &__errorText {
        margin-top: 30px;
        font-size: 18px;
    }

    &__update {
        background-color: #bb7c05;
        color: white;
        border: 1px solid #bb7c05;
        width: 100%;
        margin-top: 40px;
        height: 60px;
        font-size: 20px;
        border-radius: 20px;
    }
}
</style>