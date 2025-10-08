<template>
  <div>
    <Splash v-if="splash"/>
    <Layout />
    <Menu />
    <Notify />
  </div>
</template>

<script>
import Splash from '../src/components/base/Splash.vue'
import Layout from '../src/layout/Layout.vue'
import Menu from '../src/components/base/CustomerMenu.vue'
import Notify from '../src/components/base/Notify.vue'
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
    Menu,
    Notify
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['login/isLoggedIn'];
    }
  },
  created() {
    this.$store.dispatch('removeSplash');
    
    // Sadece kullanıcı giriş yaptıysa profil ve sepet bilgilerini çek
    if (this.isLoggedIn) {
      this.$store.dispatch('profile/fetchProfile');
      this.$store.dispatch('cart/fetchCart');
    }
  }
};
</script>