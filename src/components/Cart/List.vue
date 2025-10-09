<template>
  <div class="cartList">
    <div class="cartList__items">
      <div v-for="(product, index) in products" :key="index" class="cartItem">
        <div class="cartItem__image">
          <img :src="product.image" :alt="product.name" />
        </div>

        <div class="cartItem__content">
          <div class="cartItem__header">
            <h3 class="cartItem__name">{{ product.name }}</h3>
            <div class="cartItem__meta">
              <span class="cartItem__category">{{ product.category }}</span>
              <span class="cartItem__option" v-if="getPriceOptionLabel(product)">{{ getPriceOptionLabel(product)
                }}</span>
            </div>
          </div>

          <div class="cartItem__pricing">
            <span class="cartItem__price-label">Birim Fiyat:</span>
            <span class="cartItem__price">{{ product.price }} ₺</span>
          </div>

          <div class="cartItem__actions">
            <div class="cartItem__quantity">
              <button class="cartItem__quantity-btn" @click="decreaseQuantity(index)" :disabled="product.quantity <= 1">
                -
              </button>
              <span class="cartItem__quantity-value">{{ product.quantity }}</span>
              <button class="cartItem__quantity-btn" @click="increaseQuantity(index)">
                +
              </button>
            </div>

            <button class="cartItem__remove" @click="removeItem(index)">
              <DeleteIcon class="cartItem__remove-icon" />
              Sil
            </button>
          </div>

          <div class="cartItem__total">
            <span class="cartItem__total-label">Toplam:</span>
            <span class="cartItem__total-value">{{ calculateItemTotal(product) }} ₺</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeleteIcon from '../../assets/icons/delete-icon.vue'

export default {
  name: "CartList",
  components: {
    DeleteIcon
  },
  props: {
    products: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    getPriceOptionLabel(product) {
      const category = product.category?.toLowerCase() || '';
      const option = product.priceOption;
      if (category.includes('burger')) {
        return option === 'extra' ? '180gr' : '110gr';
      }
      if (category.includes('tost')) {
        return option === 'extra' ? '+ Patates & İçecek' : '';
      }
      return option === 'normal' ? 'Normal' : 'Extra Gramaj / Menü';
    },
    calculateItemTotal(product) {
      const price = parseFloat(product.price) || 0;
      const quantity = product.quantity || 1;
      return (price * quantity).toFixed(2);
    },
    increaseQuantity(index) {
      this.$emit('increase-quantity', index);
    },
    decreaseQuantity(index) {
      this.$emit('decrease-quantity', index);
    },
    removeItem(index) {
      this.$emit('remove-item', index);
    }
  }
};
</script>

<style lang="scss" scoped>
.cartList {
  width: 100%;

  &__items {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

.cartItem {
  background: white;
  border-radius: 14px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.4s ease;
  border: 1px solid #f0f0f0;
  position: relative;
  margin-bottom: 12px;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
    border-color: #bb7c05;
    transform: translateY(-4px);
  }

  &__image {
    width: 100%;
    height: 110px;
    flex-shrink: 0;
    overflow: hidden;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    &:hover img {
      transform: scale(1.08);
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 25px;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.08));
    }
  }

  &__content {
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }

  &__header {
    text-align: center;
    margin-bottom: 4px;
  }

  &__name {
    font-size: 18px;
    font-weight: 800;
    color: #2c3e50;
    margin: 0 0 5px 0;
    line-height: 1.2;
    letter-spacing: -0.4px;
  }

  &__meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  &__category {
    display: inline-flex;
    align-items: center;
    padding: 3px 9px;
    background: linear-gradient(135deg, #bb7c05 0%, #a66b04 100%);
    color: white;
    border-radius: 14px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    box-shadow: 0 2px 6px rgba(187, 124, 5, 0.3);
  }

  &__option {
    font-size: 11px;
    color: #6c757d;
    font-weight: 600;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 3px 7px;
    border-radius: 10px;
    border: 1px solid #e0e0e0;
  }

  &__pricing {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 6px;
    padding: 6px 0;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
  }

  &__price-label {
    font-size: 12px;
    color: #6c757d;
    font-weight: 600;
  }

  &__price {
    font-size: 20px;
    color: #bb7c05;
    font-weight: 800;
    letter-spacing: -0.7px;
    text-shadow: 0 1px 2px rgba(187, 124, 5, 0.2);
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 6px;
  }

  &__total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 9px;
    margin-top: auto;
    border: 1px solid #e0e0e0;
  }

  &__total-label {
    font-size: 13px;
    color: #6c757d;
    font-weight: 700;
  }

  &__total-value {
    font-size: 20px;
    color: #bb7c05;
    font-weight: 800;
    letter-spacing: -0.7px;
    text-shadow: 0 1px 2px rgba(187, 124, 5, 0.2);
  }

  &__quantity {
    display: flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 11px;
    padding: 7px 10px;
    border: 2px solid #e0e0e0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    &-btn {
      width: 26px;
      height: 26px;
      border-radius: 7px;
      border: none;
      background: linear-gradient(135deg, #bb7c05 0%, #a66b04 100%);
      color: white;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 3px 10px rgba(187, 124, 5, 0.4);

      &:hover:not(:disabled) {
        background: linear-gradient(135deg, #a66b04 0%, #8b5a03 100%);
        transform: scale(1.15);
        box-shadow: 0 5px 15px rgba(187, 124, 5, 0.5);
      }

      &:disabled {
        background: #ccc;
        cursor: not-allowed;
        opacity: 0.5;
        box-shadow: none;
      }
    }

    &-value {
      font-size: 15px;
      font-weight: 800;
      color: #2c3e50;
      min-width: 22px;
      text-align: center;
    }
  }

  &__remove {
    display: flex;
    align-items: center;
    gap: 5px;
    background: linear-gradient(135deg, #fff5f5 0%, #ffe6e6 100%);
    border: 2px solid rgba(220, 53, 69, 0.3);
    color: #dc3545;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    padding: 7px 11px;
    border-radius: 9px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(220, 53, 69, 0.1);

    &-icon {
      width: 13px;
      height: 13px;
      fill: currentColor;
    }

    &:hover {
      background: linear-gradient(135deg, #ffe6e6 0%, #ffcccc 100%);
      border-color: rgba(220, 53, 69, 0.5);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(220, 53, 69, 0.2);
    }
  }
}

@media (max-width: 768px) {
  .cartItem {
    margin-bottom: 10px;

    &__image {
      height: 100px;
    }

    &__content {
      padding: 12px;
      gap: 9px;
    }

    &__name {
      font-size: 17px;
    }

    &__pricing {
      padding: 5px 0;
      margin-bottom: 5px;
    }

    &__price {
      font-size: 18px;
    }

    &__total {
      padding: 9px 12px;
    }

    &__total-value {
      font-size: 18px;
    }

    &__actions {
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
      margin-bottom: 5px;

      .cartItem__quantity {
        justify-content: center;
        padding: 6px 9px;
      }

      .cartItem__remove {
        justify-content: center;
        padding: 6px 10px;
      }
    }
  }
}

@media (max-width: 480px) {
  .cartItem {
    margin-bottom: 8px;

    &__image {
      height: 90px;
    }

    &__content {
      padding: 11px;
      gap: 8px;
    }

    &__name {
      font-size: 16px;
    }

    &__category {
      font-size: 9px;
      padding: 2px 7px;
    }

    &__option {
      font-size: 10px;
    }

    &__price {
      font-size: 17px;
    }

    &__total-value {
      font-size: 17px;
    }

    &__quantity-btn {
      width: 24px;
      height: 24px;
      font-size: 14px;
    }

    &__quantity-value {
      font-size: 14px;
    }

    &__remove {
      font-size: 11px;
      padding: 5px 9px;
    }
  }
}
</style>
