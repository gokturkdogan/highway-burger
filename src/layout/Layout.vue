<template>
  <div>
    <Header />
    <router-view class="content"></router-view>
    <AppBar />
    <BurgerModal v-if="isBurgerModalOpen"/>
  </div>
</template>

<script>
import Header from '../components/base/TheHeader.vue'
import AppBar from '../components/base/AppBar.vue'
import BurgerModal from '../components/burgers/Modal.vue'
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
    BurgerModal
  },
  created() {},
  methods: {},
  computed: {
    isBurgerModalOpen() {
      return this.$store.getters["burgerModal/getIsModalOpen"];
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  position: absolute;
  top: 80px;
  bottom: 65px;
  overflow-y: scroll;
}
</style>