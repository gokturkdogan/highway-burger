<template>
  <div class="burgers">
    <List />
  </div>
</template>

<script>
import List from '../components/burgers/List.vue';
export default {
  name: "Burgers",
  data() {
    return {};
  },
  components: {
    List
  },
  created() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.burgers {
  padding: 10px;
}
</style>