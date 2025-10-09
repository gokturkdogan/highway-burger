<template>
  <transition name="slide-up">
    <div v-if="isCartRoute" class="cartSummaryBar">
      <!-- Overlay - dışına tıklayınca kapat -->
      <transition name="fade">
        <div 
          v-if="isDetailsOpen" 
          class="cartSummaryBar__overlay" 
          @click="closeDetails"
        ></div>
      </transition>

      <div class="cartSummaryBar__container">
        <button class="cartSummaryBar__toggle" @click="toggleDetails">
          <span class="cartSummaryBar__toggle-text">Sepet Detayları</span>
          <svg 
            class="cartSummaryBar__toggle-icon" 
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
    closeDetails() {
      this.isDetailsOpen = false;
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
  bottom: var(--appbar-height, 60px);
  left: 0;
  right: 0;
  z-index: 100;

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 99;
    backdrop-filter: blur(3px);
  }

  &__container {
    position: relative;
    z-index: 100;
    background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
    box-shadow: 0 -8px 35px rgba(0, 0, 0, 0.15),
                0 -2px 15px rgba(187, 124, 5, 0.1);
    border-radius: 24px 24px 0 0;
    overflow: hidden;
    border-top: 2px solid rgba(187, 124, 5, 0.12);
  }

  &__toggle {
    width: 100%;
    padding: 14px 20px 12px 20px;
    background: transparent;
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
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 4px;
      background: linear-gradient(90deg, transparent, #d0d0d0, transparent);
      border-radius: 3px;
      transition: all 0.3s ease;
    }

    &:hover {
      &::before {
        background: linear-gradient(90deg, transparent, #bb7c05, transparent);
        width: 65px;
        height: 5px;
      }

      .cartSummaryBar__toggle-text {
        color: #bb7c05;
      }
    }

    &-text {
      font-size: 12px;
      font-weight: 700;
      color: #8a8a8a;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      transition: color 0.3s ease;
    }

    &-icon {
      stroke: #bb7c05;
      transition: transform 0.3s ease;
      width: 16px;
      height: 16px;
      stroke-width: 3;

      &.-rotated {
        transform: rotate(180deg);
      }
    }
  }

  &__details {
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: linear-gradient(135deg, #f8f9fa 0%, #f3f4f6 100%);
    border-bottom: 2px solid rgba(187, 124, 5, 0.08);
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 14px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 12px rgba(187, 124, 5, 0.15);
      transform: translateX(3px);
    }
  }

  &__label {
    font-size: 13px;
    color: #6c757d;
    font-weight: 600;
  }

  &__value {
    font-size: 14px;
    color: #212529;
    font-weight: 700;
    padding: 4px 12px;
    background: linear-gradient(135deg, rgba(187, 124, 5, 0.12) 0%, rgba(187, 124, 5, 0.06) 100%);
    border-radius: 8px;
    color: #bb7c05;
  }

  &__main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    padding: 18px 20px;
    background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  }

  &__total {
    display: flex;
    flex-direction: column;
    gap: 4px;

    &-label {
      font-size: 12px;
      color: #6c757d;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }

    &-value {
      font-size: 26px;
      color: #bb7c05;
      font-weight: 800;
      letter-spacing: -0.8px;
      text-shadow: 0 2px 10px rgba(187, 124, 5, 0.2);
      background: linear-gradient(135deg, #bb7c05 0%, #d49624 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  &__button {
    flex: 1;
    max-width: 140px;
    padding: 15px 20px;
    background: linear-gradient(135deg, #bb7c05 0%, #a66b04 100%);
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 6px 20px rgba(187, 124, 5, 0.35);
    position: relative;
    overflow: hidden;
    letter-spacing: 0.5px;

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
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 8px 25px rgba(187, 124, 5, 0.5);

      &::before {
        left: 100%;
      }
    }

    &:active:not(:disabled) {
      transform: translateY(-1px) scale(0.98);
      box-shadow: 0 4px 15px rgba(187, 124, 5, 0.4);
    }

    &:disabled {
      background: linear-gradient(135deg, #d0d0d0 0%, #b0b0b0 100%);
      cursor: not-allowed;
      transform: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      opacity: 0.6;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 250px;
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
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

@media (max-width: 768px) {
  .cartSummaryBar {
    &__container {
      border-radius: 20px 20px 0 0;
    }

    &__toggle {
      padding: 12px 18px 10px 18px;

      &::before {
        width: 45px;
      }

      &-text {
        font-size: 11px;
      }
    }

    &__details {
      padding: 14px 18px;
      gap: 10px;
    }

    &__row {
      padding: 9px 12px;
    }

    &__main {
      padding: 16px 18px;
      gap: 12px;
    }

    &__total {
      &-value {
        font-size: 24px;
      }
    }

    &__button {
      max-width: 130px;
      padding: 14px 18px;
      font-size: 13px;
    }
  }
}

@media (max-width: 480px) {
  .cartSummaryBar {
    &__container {
      border-radius: 18px 18px 0 0;
    }

    &__toggle {
      padding: 12px 16px 9px 16px;

      &::before {
        width: 40px;
        height: 3px;
      }

      &-text {
        font-size: 10px;
      }

      &-icon {
        width: 14px;
        height: 14px;
      }
    }

    &__details {
      padding: 12px 16px;
      gap: 9px;
    }

    &__row {
      padding: 8px 10px;
    }

    &__label {
      font-size: 12px;
    }

    &__value {
      font-size: 13px;
      padding: 3px 10px;
    }

    &__main {
      padding: 14px 16px;
      gap: 10px;
    }

    &__total {
      gap: 3px;

      &-label {
        font-size: 11px;
      }

      &-value {
        font-size: 22px;
      }
    }

    &__button {
      max-width: 120px;
      padding: 13px 16px;
      font-size: 12px;
      border-radius: 40px;
    }
  }
}
</style>

