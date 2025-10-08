<template>
    <div class="confirm">
        <SuccessIcon class="confirm__icon"/>
        <div class="confirm__text">E-mail doğrulaması başarılı</div>
        <router-link class="confirm__login" to="/coin-actions/login">Hemen giriş yap <LoginIcon class="confirm__loginIcon"/></router-link>
    </div>
</template>

<script>
import SuccessIcon from '../assets/icons/success-icon.vue'
import LoginIcon from '../assets/icons/login-icon.vue'
export default {
    name: "Confirm",
    components: {
        SuccessIcon,
        LoginIcon
    },
    data() {},
    computed: {},
    methods: {}
};
</script>

<style lang="scss" scoped>
.confirm {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    top: 50px;

    &__icon {
        width: 100px;
        fill: #52c41a;
    }

    &__text {
        margin-top: 20px;
        font-size: 20px;
    }

    &__login {
        margin-top: 40px;
        color: #bb7c05;
        display: flex;
        align-items: center;
        font-size: 18px;
        gap: 5px;
    }

    &__loginIcon {
        width: 30px;
        fill: #bb7c05;
    }
}
</style>