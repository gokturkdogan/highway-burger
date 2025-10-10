<template>
  <div>
    <Header v-if="!isPreLogin"/>
    <router-view class="content"></router-view>
    <CartSummaryBar v-if="!isPreLogin"/>
    <AppBar v-if="!isPreLogin"/>
  </div>
</template>

<script>
import Header from '../components/base/TheHeader.vue'
import AppBar from '../components/base/AppBar.vue'
import CartSummaryBar from '../components/base/CartSummaryBar.vue'
export default {
  name: "App",
  data() {
    return {
      splash: true,
    };
  },
  components: {
    Header,
    AppBar,
    CartSummaryBar
  },
  created() {},
  methods: {},
  computed: {
    isPreLogin() {
      return this.$route.name === 'Login' || this.$route.name === 'Register' || this.$route.name === 'Confirm';
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  position: absolute;
  top: 80px;
  bottom: 65px;
  right: 0;
  left: 0;
  overflow-y: scroll;
}

// Pre-login sayfaları için (Login, Register, Confirm)
.content:has(.login),
.content:has(.register),
.content:has(.confirm) {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  background: #FFFEFE;
}

// Desktop için layout
@media (min-width: 769px) {
  .content {
    top: 90px; // Header biraz daha büyük desktop'ta
    bottom: 0; // AppBar yok, bottom padding kaldır
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 30px;
  }

  // Pre-login sayfaları desktop'ta da tam ekran
  .content:has(.login),
  .content:has(.register),
  .content:has(.confirm) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
    background: #FFFEFE;
    max-width: none;
    margin: 0;
    padding: 0;
  }
}
</style>