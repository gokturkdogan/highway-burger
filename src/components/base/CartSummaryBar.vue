<template>
  <transition name="slide-up">
    <div v-if="isCartRoute" class="cartSummaryBar">
      <button class="cartSummaryBar__toggle" @click="toggleDetails">
        <span class="cartSummaryBar__toggle-text">Sepet Detayları</span>
        <svg class="cartSummaryBar__toggle-icon" :class="{ '-rotated': isDetailsOpen }" width="16" height="16"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </button>

      <transition name="slide-down">
        <div v-show="isDetailsOpen" class="cartSummaryBar__details">
          <div class="cartSummaryBar__row">
            <span class="cartSummaryBar__label">Ürün Sayısı</span>
            <span class="cartSummaryBar__value">{{ summary.itemCount }} adet</span>
          </div>

          <div class="cartSummaryBar__row">
            <span class="cartSummaryBar__label">Toplam Adet</span>
            <span class="cartSummaryBar__value">{{ summary.totalItems }} adet</span>
          </div>
        </div>
      </transition>

      <div class="cartSummaryBar__main">
        <div class="cartSummaryBar__total">
          <span class="cartSummaryBar__total-label">Toplam Tutar</span>
          <span class="cartSummaryBar__total-value">{{ summary.totalPrice }} ₺</span>
        </div>

        <button class="cartSummaryBar__button" @click="proceedToCheckout" :disabled="summary.itemCount === 0">
          Devam Et
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "CartSummaryBar",
  data() {
    return {
      isDetailsOpen: false
    };
  },
  computed: {
    isCartRoute() {
      return this.$route.name === 'Cart' || this.$route.path === '/cart';
    },
    summary() {
      return this.$store.getters['cart/calculateSummary'];
    }
  },
  methods: {
    toggleDetails() {
      this.isDetailsOpen = !this.isDetailsOpen;
    },
    proceedToCheckout() {
      this.$router.push('/checkout');
    }
  }
};
</script>

<style lang="scss" scoped>
.cartSummaryBar {
  position: fixed;
  bottom: 60px;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  z-index: 100;
  overflow: hidden;
  border-radius: 20px 20px 0 0;

  &__toggle {
    width: 100%;
    padding: 12px 16px;
    background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 6px;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 4px;
      background: #e0e0e0;
      border-radius: 2px;
    }

    &:hover {
      background: linear-gradient(135deg, #f5f5f5 0%, #ececec 100%);

      &::before {
        background: #bb7c05;
        width: 50px;
      }
    }

    &-text {
      font-size: 12px;
      font-weight: 600;
      color: #6c757d;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    &-icon {
      stroke: #bb7c05;
      transition: transform 0.3s ease;
      width: 14px;
      height: 14px;

      &.-rotated {
        transform: rotate(180deg);
      }
    }
  }

  &__details {
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__label {
    font-size: 13px;
    color: #6c757d;
    font-weight: 600;
  }

  &__value {
    font-size: 13px;
    color: #212529;
    font-weight: 700;
  }

  &__main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 16px;
  }

  &__total {
    display: flex;
    flex-direction: column;
    gap: 2px;

    &-label {
      font-size: 11px;
      color: #6c757d;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    &-value {
      font-size: 20px;
      color: #bb7c05;
      font-weight: 700;
    }
  }

  &__button {
    flex: 1;
    max-width: 120px;
    padding: 14px 24px;
    background: linear-gradient(135deg, #bb7c05 0%, #a66b04 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(187, 124, 5, 0.3);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: left 0.5s ease;
    }

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #a66b04 0%, #8d5a03 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(187, 124, 5, 0.5);

      &::before {
        left: 100%;
      }
    }

    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 2px 10px rgba(187, 124, 5, 0.3);
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  }
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  max-height: 200px;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

@media (max-width: 768px) {
  .cartSummaryBar {
    max-width: 100%;
  }
}
</style>
