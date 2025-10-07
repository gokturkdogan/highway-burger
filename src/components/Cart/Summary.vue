<template>
  <div class="cartSummary">
    <button class="cartSummary__toggle" @click="toggleDetails">
      <span class="cartSummary__toggle-text">Sepet Detayları</span>
      <svg 
        class="cartSummary__toggle-icon" 
        :class="{ '-rotated': isDetailsOpen }"
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2"
      >
        <polyline points="6,9 12,15 18,9"></polyline>
      </svg>
    </button>

    <transition name="slide-down">
      <div v-show="isDetailsOpen" class="cartSummary__details">
        <div class="cartSummary__row">
          <span class="cartSummary__label">Ürün Sayısı</span>
          <span class="cartSummary__value">{{ summary.itemCount }} adet</span>
        </div>

        <div class="cartSummary__row">
          <span class="cartSummary__label">Toplam Adet</span>
          <span class="cartSummary__value">{{ summary.totalItems }} adet</span>
        </div>

        <div class="cartSummary__divider"></div>
      </div>
    </transition>

    <div class="cartSummary__total">
      <div class="cartSummary__row -total">
        <span class="cartSummary__label">Toplam Tutar</span>
        <span class="cartSummary__value -price">{{ summary.totalPrice }} ₺</span>
      </div>
    </div>

    <div class="cartSummary__footer">
      <button class="cartSummary__button" @click="proceedToCheckout" :disabled="summary.itemCount === 0">
        Teslimata Devam Et
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartSummary",
  data() {
    return {
      isDetailsOpen: false
    };
  },
  props: {
    summary: {
      type: Object,
      required: true,
      default: () => ({
        totalItems: 0,
        totalPrice: '0.00',
        itemCount: 0
      })
    }
  },
  methods: {
    toggleDetails() {
      this.isDetailsOpen = !this.isDetailsOpen;
    },
    proceedToCheckout() {
      this.$emit('proceed-to-checkout');
    }
  }
};
</script>

<style lang="scss" scoped>
.cartSummary {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;

  &__toggle {
    width: 100%;
    padding: 16px 20px;
    background: linear-gradient(135deg, #bb7c05 0%, #a66b04 100%);
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 16px 16px 0 0;

    &:hover {
      background: linear-gradient(135deg, #a66b04 0%, #8d5a03 100%);
    }

    &-text {
      font-size: 16px;
      font-weight: 700;
      color: white;
      letter-spacing: 0.5px;
    }

    &-icon {
      stroke: white;
      transition: transform 0.3s ease;

      &.-rotated {
        transform: rotate(180deg);
      }
    }
  }

  &__details {
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: #f8f9fa;
  }

  &__total {
    padding: 20px 24px;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &.-total {
      padding: 0;
    }
  }

  &__label {
    font-size: 15px;
    color: #6c757d;
    font-weight: 600;
  }

  &__value {
    font-size: 15px;
    color: #212529;
    font-weight: 700;

    &.-price {
      font-size: 26px;
      color: #bb7c05;
    }
  }

  &__divider {
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, #e9ecef 50%, transparent 100%);
  }

  &__footer {
    padding: 0 24px 24px;
  }

  &__button {
    width: 100%;
    padding: 16px 24px;
    background: linear-gradient(135deg, #bb7c05 0%, #a66b04 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(187, 124, 5, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #a66b04 0%, #8d5a03 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(187, 124, 5, 0.4);
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

@media (max-width: 1024px) {
  .cartSummary {
    position: static;
  }
}
</style>

