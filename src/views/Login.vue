<template>
    <div class="login">
        <img class="login__image" src="../assets/images/splash.png" alt="logo" />
        <form class="login__form">
            <div class="login__field">
                <input :class="{ '-active': email }" type="email" id="email" class="login__input" v-model="email"
                    required placeholder=" " />
                <label for="email" class="login__label">E-Posta</label>
            </div>
            <div class="login__field">
                <input :class="{ '-active': password }" :type="passwordType" id="password" class="login__input"
                    v-model="password" required placeholder=" " />
                <label for="password" class="login__label">Şifre</label>
                <OpenEyeIcon @click="passwordShow = false" v-if="passwordShow" class="login__passwordVisibilty" />
                <ClosedEyeIcon @click="passwordShow = true" v-else class="login__passwordVisibilty -close" />
            </div>
        </form>
        <div class="login__forgot">
            <router-link to="/" class="login__forgotLink">Parolamı unuttum</router-link>
        </div>
        <button @click="login" class="login__loginBtn">Giriş yap</button>
        <div class="login__socials">
            <span class="login__socialsTitle">Sosyal medya ile giriş yap</span>
            <div class="login__socialsContainer">
                <div class="login__social">
                    <FacebookIcon class="login__socialIcon -facebook" />
                </div>
                <div class="login__social">
                    <GoogleIcon class="login__socialIcon" />
                </div>
            </div>
        </div>
        <router-link to="/register" class="login__register">
            Henüz üye değil misin? <span>Hemen üye ol</span>
        </router-link>
        <router-link to="/" class="login__continue">
            Misafir olarak devam et <ForwardIcon class="login__continueIcon"/>
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
            email: "",
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
            if (!this.email || !this.password) {
                this.$store.dispatch('notify/showNotify', { message: 'Tüm alanları doldurmanız gerekiyor!', type: 'warning' });
                return false;
            }
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(this.email)) {
                this.$store.dispatch('notify/showNotify', { message: 'Geçerli bir e-posta girin!', type: 'warning' });
                return false;
            }
            return true;
        },
        login() {
            if (this.validateInputs()) {
                const payload = {
                    identifier: this.email,
                    password: this.password,
                };
                console.log(payload)
                this.$store.dispatch('login/login', payload)
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    min-height: 100vh;
    width: 100%;
    box-sizing: border-box;
    top: 0;

    &__image {
        width: 120px;
        margin-bottom: 20px;
    }

    &__form {
        width: 100%;
        max-width: 350px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 20px;
    }

    &__field {
        position: relative;
        width: calc(100% - 40px);
    }

    &__input {
        width: 100%;
        padding: 16px;
        border: 2px solid #ccc;
        border-radius: 16px;
        outline: none;
        font-size: 15px;

        &:focus {
            border-color: #bb7c05;
        }

        &.-active {
            border-color: #bb7c05;
        }

        &:focus+.login__label,
        &:not(:placeholder-shown)+.login__label {
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
        margin-top: 24px;
        height: 50px;
        font-size: 18px;
        border-radius: 16px;
    }

    &__socials {
        margin-top: 16px;
        width: 100%;
        text-align: center;
    }

    &__socialsTitle {
        font-size: 16px;
    }

    &__socialsContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        margin-top: 16px;
    }

    &__social {
        border: 1px solid #c2c2c2;
        width: 40%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 16px;
    }

    &__socialIcon {
        width: 32px;

        &.-facebook {
            fill: #039BE5;
        }
    }

    &__register {
        text-decoration: none;
        margin-top: 16px;
        color: #616161;
        font-size: 14px;

        span {
            font-weight: 600;
            text-decoration: underline;
            color: #bb7c05;
        }
    }

    &__continue {
        margin-top: 16px;
        color: black;
        display: flex;
        align-items: center;
        color: #bb7c05;
        gap: 5px;
        font-size: 14px;
    }

    &__continueIcon {
        width: 20px;
        fill: #bb7c05;
    }
}

// Desktop için özel stiller
@media (min-width: 769px) {
    .login {
        padding: 30px 20px;
        max-width: 450px;
        margin: 0 auto;
        min-height: 100vh;
        justify-content: center;
        width: 100%;

        &__image {
            width: 140px;
            margin-bottom: 30px;
        }

        &__form {
            max-width: 400px;
            gap: 20px;
            margin-top: 30px;
        }

        &__field {
            width: calc(100% - 50px);
        }

        &__input {
            padding: 20px 18px;
            border-radius: 20px;
            font-size: 16px;
            border-width: 2px;

            &:focus {
                border-color: #bb7c05;
                box-shadow: 0 0 0 3px rgba(187, 124, 5, 0.1);
            }

            &.-active {
                border-color: #bb7c05;
                box-shadow: 0 0 0 3px rgba(187, 124, 5, 0.1);
            }

            &:focus+.login__label,
            &:not(:placeholder-shown)+.login__label {
                top: 0px;
                left: 18px;
                font-size: 14px;
                color: #bb7c05;
            }
        }

        &__label {
            font-size: 18px;
            left: 20px;
        }

        &__passwordVisibilty {
            width: 36px;
            right: -45px;
        }

        &__forgot {
            margin-top: 16px;
        }

        &__loginBtn {
            margin-top: 30px;
            height: 60px;
            font-size: 20px;
            border-radius: 20px;
            transition: all 0.3s ease;

            &:hover {
                background-color: #a66b04;
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(187, 124, 5, 0.3);
            }

            &:active {
                transform: translateY(0);
            }
        }

        &__socials {
            margin-top: 24px;
        }

        &__socialsTitle {
            font-size: 18px;
        }

        &__socialsContainer {
            gap: 12px;
            margin-top: 20px;
        }

        &__social {
            width: 45%;
            height: 70px;
            border-radius: 20px;
            border-width: 2px;
            transition: all 0.3s ease;

            &:hover {
                transform: translateY(-3px);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
                border-color: #bb7c05;
            }
        }

        &__socialIcon {
            width: 40px;
        }

        &__register {
            margin-top: 24px;
            font-size: 15px;
        }

        &__continue {
            margin-top: 20px;
            font-size: 15px;
            gap: 6px;
            transition: all 0.3s ease;

            &:hover {
                transform: translateX(5px);
            }
        }

        &__continueIcon {
            width: 24px;
        }
    }
}

// Büyük ekranlar için
@media (min-width: 1200px) {
    .login {
        max-width: 500px;
        padding: 40px 30px;

        &__image {
            width: 160px;
            margin-bottom: 35px;
        }

        &__form {
            max-width: 450px;
            gap: 22px;
        }

        &__input {
            padding: 22px 20px;
            font-size: 18px;
        }

        &__loginBtn {
            height: 65px;
            font-size: 21px;
        }

        &__social {
            height: 75px;
        }

        &__socialIcon {
            width: 44px;
        }
    }
}
</style>