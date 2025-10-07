<template>
  <transition name="slide-up">
    <div v-if="splash" class="splash">
      <img class="splash__logo" src="../../assets/images/splash.png" alt="splash">
    </div>
  </transition>
</template>
<script>
export default {
  name: "Splash",
  computed: {
    splash() {
      return this.$store.getters["getSplash"];
    }
  }
};
</script>
<style lang="scss" scoped>
.splash {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: linear-gradient(#fff700, #f10505);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 102;
  position: absolute;

  &__logo {
    width: 300px;
  }
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-up-enter-active {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-leave-active {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
  opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>