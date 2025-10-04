<template>
  <div class="address">
    <div v-if="loader" class="address__loader"><BurgerSpinner /></div>
    <div v-else class="address__content">
        <List v-if="!addressList" :addressList="addressList"/>
        <Empty v-else/>
    </div>
  </div>
</template>

<script>
import List from '../components/Address/List.vue';
import BurgerSpinner from '../components/base/BurgerSpinner.vue';
import Empty from '../components/Address/Empty.vue'
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    List,
    BurgerSpinner,
    Empty
  },
  created() {
    this.$store.dispatch("address/fetchAddressList");
  },
  computed: {
    addressList() {
      return this.$store.getters["address/getAddressList"];
    },
    loader() {
      return this.$store.getters["address/getLoader"];
    }
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.address {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    top: 50px;

    &__loader {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60vh;
    }

    &__content {
        width: 100%;
    }
}
</style>