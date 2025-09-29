<template>
  <Lottie :animationData="burgerAnimation" :width="200" :height="200" />
</template>

<script>
import Lottie from './Lottie.vue';
import burgerAnimation from '../../assets/animations/burger-loading.json';

export default {
  components: { Lottie },
  data() {
    return {
      burgerAnimation
    };
  }
};
</script>
