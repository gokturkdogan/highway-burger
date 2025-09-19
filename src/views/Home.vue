<template>
  <div class="home">
    <Navigation />
  </div>
</template>

<script>
import Navigation from '../components/Home/Navigation.vue';
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Navigation
  },
  created() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.home {
  padding: 10px;
}
</style>