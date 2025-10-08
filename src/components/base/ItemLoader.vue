<template>
  <Lottie :animationData="itemLoadingAnimation" :width="80" :height="80" />
</template>

<script>
import Lottie from './Lottie.vue';
import itemLoadingAnimation from '../../assets/animations/item-loading.json';

export default {
  name: 'ItemLoader',
  components: { Lottie },
  data() {
    return {
      itemLoadingAnimation
    };
  }
};
</script>
