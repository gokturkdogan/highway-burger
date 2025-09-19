<template>
  <div class="header">
    <div class="header__banner">
        <img class="header__logo" src="../../assets/images/splash.png" alt="logo">
        <UserIcon class="header__user"/>
    </div>
  </div>
</template>
<script>
import UserIcon from '../../assets/icons/user-icon.vue'
import BurgerIcon from '../../assets/icons/burger-icon.vue'
export default {
  name: "Header",
  components: {
    UserIcon,
    BurgerIcon
  },
  created() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.header {
    box-shadow: #00000014 1px 6px 5px;
    padding: 15px;
    &__banner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    &__logo {
        width: 50px;
    }
    &__user {
        width: 40px;
        border: 3px solid rgb(187, 124, 5);
        border-radius: 100%;
        padding: 2px;
        fill: rgb(187, 124, 5);
    }

    &__nav {
        margin-top: 40px;
        display: flex;
        gap: 10px;
        overflow-x: scroll;
    }

    &__navItem {
        display: flex;
        align-items: center;
        background-color: rgb(187, 124, 5);
        padding: 5px;
        border-radius: 30px;
        gap: 5px;
        font-size: 12px;
        color: white;
    }

    &__navIcon {
        width: 30px;
        background-color: white;
        border-radius: 100%;
    }
}
</style>