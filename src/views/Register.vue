<template>
    <div class="register">
        <img class="register__image" src="../assets/images/splash.png" alt="logo" />
        <form class="register__form">
            <div class="register__field">
                <input :class="{ '-active': name }" type="text" class="register__input" v-model="name" required
                    placeholder=" " />
                <label class="register__label">İsim</label>
            </div>
            <div class="register__field">
                <input :class="{ '-active': surname }" type="text" class="register__input" v-model="surname" required
                    placeholder=" " />
                <label class="register__label">Soyisim</label>
            </div>
            <div class="register__field">
                <input :class="{ '-active': email }" type="email" class="register__input" v-model="email" required
                    placeholder=" " />
                <label class="register__label">E-Posta</label>
            </div>
            <div class="register__field">
                <input :class="{ '-active': phone }" type="number" class="register__input" v-model="phone" required
                    placeholder=" " @input="phone = phone.toString().slice(0, 10)" />
                <label class="register__label">Telefon Numarası</label>
            </div>
            <div class="register__field">
                <input :class="{ '-active': password }" :type="passwordType" class="register__input" v-model="password"
                    required placeholder=" " />
                <label class="register__label">Şifre</label>
                <OpenEyeIcon @click="passwordShow = false" v-if="passwordShow" class="register__passwordVisibilty" />
                <ClosedEyeIcon @click="passwordShow = true" v-else class="register__passwordVisibilty -close" />
            </div>
        </form>
        <button @click="register" class="register__loginBtn">Üye ol</button>
        <div class="register__socials">
            <span class="register__socialsTitle">Sosyal medya ile üye ol</span>
            <div class="register__socialsContainer">
                <div class="register__social">
                    <FacebookIcon class="register__socialIcon -facebook" />
                </div>
                <div class="register__social">
                    <GoogleIcon class="register__socialIcon" />
                </div>
            </div>
        </div>
        <router-link to="login" class="register__register">
            Zaten üye misin? <span>Hemen giriş yap</span>
        </router-link>
        <router-link to="/" class="register__continue">
            Üye olmadan devam et <ForwardIcon class="register__continueIcon"/>
        </router-link>
    </div>
</template>

<script>
import GoogleIcon from '../assets/icons/google-icon.vue'
import FacebookIcon from '../assets/icons/facebook-icon.vue'
import OpenEyeIcon from '../assets/icons/eye-open-icon.vue'
import ClosedEyeIcon from '../assets/icons/eye-closed-icon.vue'
import ForwardIcon from '../assets/icons/forward-icon.vue'
export default {
    name: "Login",
    components: {
        GoogleIcon,
        FacebookIcon,
        OpenEyeIcon,
        ClosedEyeIcon,
        ForwardIcon
    },
    data() {
        return {
            name: "",
            surname: "",
            email: "",
            phone: "",
            password: "",
            passwordShow: false
        };
    },
    computed: {
        passwordType() {
            if (this.passwordShow) {
                return 'text'
            } else {
                return 'password'
            }
        }
    },
    methods: {
        validateInputs() {
            if (!this.name || !this.surname || !this.email || !this.phone || !this.password) {
                this.$store.dispatch('notify/showNotify', { message: 'Tüm alanları doldurmanız gerekiyor!', type: 'warning' });
                return false;
            }
            if (this.name.length < 3) {
                this.$store.dispatch('notify/showNotify', { message: 'İsim en az 3 karakter olmalıdır!', type: 'warning' });
                return false;
            }

            if (this.surname.length < 2) {
                this.$store.dispatch('notify/showNotify', { message: 'Soyisim en az 2 karakter olmalıdır!', type: 'warning' });
                return false;
            }
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(this.email)) {
                this.$store.dispatch('notify/showNotify', { message: 'Geçerli bir e-posta girin!', type: 'warning' });
                return false;
            }
            const phonePattern = /^[0-9+]{10,15}$/;
            if (!phonePattern.test(this.phone)) {
                this.$store.dispatch('notify/showNotify', { message: 'Geçerli bir telefon numarası girin!', type: 'warning' });
                return false;
            }
            const passwordPattern = /^(?=.*\d).{6,}$/;
            if (!passwordPattern.test(this.password)) {
                this.$store.dispatch('notify/showNotify', { message: 'Şifre en az 6 karakter olmalı ve en az bir rakam içermelidir!', type: 'warning' });
                return false;
            }
            return true;
        },
        register() {
            if (this.validateInputs()) {
                const payload = {
                    username: this.email,
                    email: this.email,
                    password: this.password,
                    name: this.name,
                    surname: this.surname,
                    phone: this.phone.toString()
                };
                this.$store.dispatch('register/register', payload)
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.register {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    top: 0px;
    bottom: 0;

    &__image {
        width: 100px;
        margin-bottom: 30px;
    }

    &__form {
        width: 100%;
        max-width: 400px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 20px;
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

        &:focus+.register__label,
        &:not(:placeholder-shown)+.register__label {
            top: 0px;
            left: 15px;
            font-size: 12px;
            color: #bb7c05;
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

    &__passwordVisibilty {
        position: absolute;
        width: 30px;
        fill: #bb7c05;
        right: -40px;
        transform: translate(-50%, -50%);
        top: 50%;

        &.-close {
            fill: #616161;
        }
    }

    &__forgot {
        margin-top: 10px;
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    &__forgotLink {
        color: #616161;
    }

    &__loginBtn {
        background-color: #bb7c05;
        color: white;
        border: 1px solid #bb7c05;
        width: 100%;
        margin-top: 40px;
        height: 60px;
        font-size: 20px;
        border-radius: 20px;
    }

    &__socials {
        margin-top: 20px;
        width: 100%;
        text-align: center;
    }

    &__socialsTitle {
        font-size: 18px;
    }

    &__socialsContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin-top: 20px;
    }

    &__social {
        border: 1px solid #c2c2c2;
        width: 40%;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
    }

    &__socialIcon {
        width: 40px;

        &.-facebook {
            fill: #039BE5;
        }
    }

    &__register {
        text-decoration: none;
        margin-top: 20px;
        color: #616161;

        span {
            font-weight: 600;
            text-decoration: underline;
            color: #bb7c05;
        }
    }

    &__continue {
        margin-top: 20px;
        color: black;
        display: flex;
        align-items: center;
        color: #bb7c05;
        gap: 5px;
    }

    &__continueIcon {
        width: 20px;
        fill: #bb7c05;
    }
}
</style>