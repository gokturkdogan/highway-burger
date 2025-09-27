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
  computed: {}
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
</style>