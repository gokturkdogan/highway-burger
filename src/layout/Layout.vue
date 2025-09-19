<template>
  <div>
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '../components/base/TheHeader.vue'
export default {
  name: "App",
  data() {
    return {
      splash: true,
    };
  },
  components: {
    Header
  },
  created() {},
  methods: {},
};
</script>