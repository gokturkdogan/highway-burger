<template>
  <div class="cartSummary">
    <div class="cartSummary__header">
      <h3 class="cartSummary__title">Sipariş Özeti</h3>
    </div>

    <div class="cartSummary__content">
      <div class="cartSummary__row">
        <span class="cartSummary__label">Ürün Sayısı</span>
        <span class="cartSummary__value">{{ summary.itemCount }} adet</span>
      </div>

      <div class="cartSummary__row">
        <span class="cartSummary__label">Toplam Adet</span>
        <span class="cartSummary__value">{{ summary.totalItems }} adet</span>
      </div>

      <div class="cartSummary__row cartSummary__row--total">
        <span class="cartSummary__label">Toplam Tutar</span>
        <span class="cartSummary__value cartSummary__value--total">{{ summary.totalPrice }} ₺</span>
      </div>
    </div>

    <div class="cartSummary__actions">
      <button 
        class="cartSummary__button" 
        @click="proceedToCheckout" 
        :disabled="summary.itemCount === 0"
      >
        Sepeti Onayla
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartSummary",
  computed: {
    summary() {
      return this.$store.getters['cart/calculateSummary'];
    }
  },
  methods: {
    proceedToCheckout() {
      this.$router.push('/checkout');
    }
  }
};
</script>

<style lang="scss" scoped>
.cartSummary {
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(187, 124, 5, 0.1);
  height: fit-content;
  position: sticky;
  top: 20px;

  &__header {
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 2px solid rgba(187, 124, 5, 0.1);
  }

  &__title {
    font-size: 20px;
    font-weight: 800;
    color: #2c3e50;
    margin: 0;
  }

  &__content {
    margin-bottom: 24px;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }

    &--total {
      padding: 16px 0;
      border-top: 2px solid rgba(187, 124, 5, 0.2);
      border-bottom: none;
      margin-top: 8px;
    }
  }

  &__label {
    font-size: 14px;
    color: #666;
    font-weight: 600;
  }

  &__value {
    font-size: 14px;
    color: #333;
    font-weight: 700;

    &--total {
      font-size: 22px;
      color: #bb7c05;
      font-weight: 800;
    }
  }

  &__actions {
    margin-bottom: 0;
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
    box-shadow: 0 6px 20px rgba(187, 124, 5, 0.35);

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #a66b04 0%, #8d5a03 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(187, 124, 5, 0.5);
    }

    &:disabled {
      background: #d0d0d0;
      cursor: not-allowed;
      transform: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      opacity: 0.6;
    }
  }
}

// Mobile için gizle
@media (max-width: 768px) {
  .cartSummary {
    display: none;
  }
}

// Desktop için özel stiller
@media (min-width: 769px) {
  .cartSummary {
    padding: 20px;
    border-radius: 16px;

    &__title {
      font-size: 18px;
    }

    &__row {
      padding: 10px 0;
    }

    &__label {
      font-size: 13px;
    }

    &__value {
      font-size: 13px;

      &--total {
        font-size: 20px;
      }
    }

    &__button {
      padding: 14px 20px;
      font-size: 15px;
    }
  }
}
</style>
