<template>
  <div>
    <Header />
    <router-view class="content"></router-view>
    <AppBar />
  </div>
</template>

<script>
import Header from '../components/base/TheHeader.vue'
import AppBar from '../components/base/AppBar.vue'
export default {
  name: "App",
  data() {
    return {
      splash: true,
    };
  },
  components: {
    Header,
    AppBar
  },
  created() {},
  methods: {},
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