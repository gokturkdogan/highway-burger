<template>
  <div>
    <Splash v-if="false"/>
    <Layout />
    <Menu />
  </div>
</template>

<script>
import Splash from '../src/components/base/Splash.vue'
import Layout from '../src/layout/Layout.vue'
import Menu from '../src/components/base/CustomerMenu.vue'
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
    Menu
  },
  created() {
    this.$store.dispatch('removeSplash');
  }
};
</script>