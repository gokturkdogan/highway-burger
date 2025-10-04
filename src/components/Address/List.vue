<template>
  <div class="list">
    {{ addressList }}
  </div>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {},
  props: {
    addressList: {
        type: Array,
        required: false,
        default: []
    }
  },
  created() {},
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.address {}
</style>