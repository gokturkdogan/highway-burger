<template>
  <div ref="container" class="lottie-container"></div>
</template>

<script>
import lottie from 'lottie-web';

export default {
  name: 'Lottie',
  props: {
    animationData: {
      type: Object,
      required: true
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    width: {
      type: [Number, String],
      default: '100%'
    },
    height: {
      type: [Number, String],
      default: '100%'
    }
  },
  mounted() {
    this.anim = lottie.loadAnimation({
      container: this.$refs.container,
      renderer: 'svg',
      loop: this.loop,
      autoplay: this.autoplay,
      animationData: this.animationData
    });

    // Complete event listener
    this.anim.addEventListener('complete', () => {
      this.$emit('complete');
    });

    this.$refs.container.style.width = typeof this.width === 'number' ? this.width + 'px' : this.width;
    this.$refs.container.style.height = typeof this.height === 'number' ? this.height + 'px' : this.height;
  },
  beforeUnmount() {
    if (this.anim) {
      this.anim.destroy();
    }
  }
};
</script>

<style scoped>
.lottie-container {
  display: inline-block;
}
</style>
