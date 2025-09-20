<template>
  <div class="appBar">
    <div class="appBar__side">
      <span class="appBar__link -active">
        <HomeIcon/>
      </span>
      <span class="appBar__link">
        <HomeIcon/>
      </span>
    </div>
    <div class="appBar__mid">
      <BasketIcon/>
    </div>
    <div class="appBar__side">
      <span  class="appBar__link">
        <HomeIcon/>
      </span>
      <span class="appBar__link">
        <HomeIcon />
      </span>
    </div>
  </div>
</template>
    
<script>
import HomeIcon from "../../assets/icons/home-icon.vue";
import BasketIcon from "../../assets/icons/basket-icon.vue";

export default {
  name: "Appbar",
  components: {
    HomeIcon,
    BasketIcon
  },
  methods: {},
  computed: {},
};
</script>
<style lang="scss" scoped>
.appBar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 5px 0;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) -1px -6px 5px 0px;
  align-items: center;

  &__mid {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #bb7c05;
    padding: 10px;
    border-radius: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 0;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    svg {
        width: 50px;
        fill: white;
    }
  }

  &__side {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    width: 30%;
  }

  &__link {
    padding-bottom: 10px;
    width: 50px;
    display: flex;
    justify-content: center;

    svg {
        width: 30px;
        fill: #bb7c05;
    }

    &.-active {
      border-bottom: 5px solid #bb7c05;
      background: #d49624;
      background: linear-gradient(to top, #f7ae26 0%, transparent 100%);
      clip-path: polygon(0% 0%, 100% 0%, 70% 100%, 30% 100%);
    }
  }
}
</style>
  