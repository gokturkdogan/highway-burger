<template>
  <div>
    <Splash v-if="false" />
    <Layout v-else />
  </div>
</template>

<script>
import Splash from '../src/components/base/Splash.vue'
import Layout from '../src/layout/Layout.vue'
export default {
  name: "App",
  data() {
    return {
      splash: true,
    };
  },
  components: {
    Layout,
    Splash,
  },
  created() {
    this.removeSplash();
  },
  methods: {
    removeSplash() {
      setTimeout(() => {
        this.splash = false;
      }, 5000);
    },
  },
};
</script>