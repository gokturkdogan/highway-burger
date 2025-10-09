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

    <DeleteModal 
      :isOpen="deleteModal.isOpen"
      :productIndex="deleteModal.productIndex"
      :productName="deleteModal.productName"
      @close="closeDeleteModal"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script>
import DeleteIcon from '../../assets/icons/delete-icon.vue'
import DeleteModal from './DeleteModal.vue'

export default {
  name: "CartList",
  components: {
    DeleteIcon,
    DeleteModal
  },
  data() {
    return {
      deleteModal: {
        isOpen: false,
        productIndex: null,
        productName: ''
      }
    }
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
      // Modal'ı aç
      this.deleteModal.isOpen = true;
      this.deleteModal.productIndex = index;
      this.deleteModal.productName = this.products[index]?.name || 'Bu ürün';
    },
    closeDeleteModal() {
      this.deleteModal.isOpen = false;
      this.deleteModal.productIndex = null;
      this.deleteModal.productName = '';
    },
    confirmDelete(index) {
      // Gerçek silme işlemi
      this.$emit('remove-item', index);
      this.closeDeleteModal();
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
    gap: 12px;
    animation: fadeIn 0.6s ease-out;
  }
}

.cartItem {
  background: linear-gradient(145deg, #ffffff 0%, #fefefe 100%);
  border-radius: 18px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15),
              0 4px 10px rgba(0, 0, 0, 0.1),
              0 1px 4px rgba(187, 124, 5, 0.12);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(187, 124, 5, 0.12);
  position: relative;
  margin-bottom: 12px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      #bb7c05 30%, 
      #d49624 50%, 
      #bb7c05 70%, 
      transparent 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2),
                0 8px 18px rgba(0, 0, 0, 0.15),
                0 3px 8px rgba(187, 124, 5, 0.2);
    border-color: rgba(187, 124, 5, 0.25);
    transform: translateY(-6px) scale(1.01);

    &::before {
      opacity: 1;
    }

    .cartItem__image img {
      transform: scale(1.1) rotate(-2deg);
    }
  }

  &__image {
    width: 100%;
    height: 110px;
    flex-shrink: 0;
    overflow: hidden;
    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
    position: relative;
    border-bottom: 2px solid rgba(187, 124, 5, 0.1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.15));
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at center, 
        rgba(187, 124, 5, 0.06) 0%, 
        transparent 70%);
      pointer-events: none;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 30px;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.12), transparent);
    }
  }

  &__content {
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
    position: relative;
  }

  &__header {
    text-align: center;
    margin-bottom: 2px;
  }

  &__name {
    font-size: 17px;
    font-weight: 900;
    color: #1a1a1a;
    margin: 0 0 6px 0;
    line-height: 1.3;
    letter-spacing: 0.3px;
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
    padding: 4px 10px;
    background: linear-gradient(135deg, #bb7c05 0%, #d49624 100%);
    color: white;
    border-radius: 12px;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    box-shadow: 0 3px 10px rgba(187, 124, 5, 0.35),
                0 1px 4px rgba(0, 0, 0, 0.15);
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  &__option {
    font-size: 11px;
    color: #bb7c05;
    font-weight: 700;
    background: white;
    padding: 4px 9px;
    border-radius: 10px;
    border: 2px solid rgba(187, 124, 5, 0.2);
    letter-spacing: 0.3px;
    box-shadow: 0 2px 6px rgba(187, 124, 5, 0.1);
  }

  &__pricing {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 4px;
    padding: 8px 12px;
    background: linear-gradient(135deg, rgba(187, 124, 5, 0.06) 0%, rgba(212, 150, 36, 0.04) 100%);
    border-radius: 10px;
    border: 1px solid rgba(187, 124, 5, 0.12);
  }

  &__price-label {
    font-size: 11px;
    color: #5a5a5a;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &__price {
    font-size: 18px;
    color: #bb7c05;
    font-weight: 900;
    letter-spacing: 0.3px;
    text-shadow: 0 1px 3px rgba(187, 124, 5, 0.2);
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 4px;
  }

  &__total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px;
    background: linear-gradient(135deg, #bb7c05 0%, #d49624 100%);
    border-radius: 12px;
    margin-top: auto;
    box-shadow: 0 4px 15px rgba(187, 124, 5, 0.4),
                0 2px 6px rgba(0, 0, 0, 0.15);
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  &__total-label {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.95);
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  &__total-value {
    font-size: 20px;
    color: white;
    font-weight: 900;
    letter-spacing: 0.5px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  }

  &__quantity {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: white;
    border-radius: 12px;
    padding: 8px 14px;
    border: 3px solid #e0e0e0;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08),
                0 1px 4px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    flex: 1;
    max-width: 180px;

    &-btn {
      width: 32px;
      height: 32px;
      border-radius: 10px;
      border: 2px solid #bb7c05;
      background: linear-gradient(135deg, rgba(187, 124, 5, 0.12) 0%, rgba(212, 150, 36, 0.08) 100%);
      color: #bb7c05;
      font-size: 20px;
      font-weight: 900;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(187, 124, 5, 0.2);
      flex-shrink: 0;

      &:hover:not(:disabled) {
        background: linear-gradient(135deg, #bb7c05 0%, #d49624 100%);
        color: white;
        transform: scale(1.12);
        box-shadow: 0 4px 12px rgba(187, 124, 5, 0.45);
      }

      &:active:not(:disabled) {
        transform: scale(0.95);
      }

      &:disabled {
        background: #f5f5f5;
        border-color: #e0e0e0;
        color: #aaa;
        cursor: not-allowed;
        opacity: 0.4;
        box-shadow: none;
      }
    }

    &-value {
      font-size: 18px;
      font-weight: 900;
      color: #bb7c05;
      min-width: 32px;
      text-align: center;
      letter-spacing: 0.3px;
    }
  }

  &__remove {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    background: white;
    border: 3px solid rgba(220, 53, 69, 0.3);
    color: #dc3545;
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
    padding: 8px 14px;
    border-radius: 12px;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 3px 10px rgba(220, 53, 69, 0.15),
                0 1px 4px rgba(0, 0, 0, 0.08);
    letter-spacing: 0.5px;
    text-transform: uppercase;
    flex: 1;
    max-width: 140px;

    &-icon {
      width: 16px;
      height: 16px;
      fill: currentColor;
      transition: transform 0.3s ease;
      flex-shrink: 0;
    }

    &:hover {
      background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
      color: white;
      border-color: #dc3545;
      transform: translateY(-3px);
      box-shadow: 0 6px 18px rgba(220, 53, 69, 0.4),
                  0 3px 8px rgba(0, 0, 0, 0.15);

      .cartItem__remove-icon {
        transform: rotate(15deg) scale(1.1);
      }
    }

    &:active {
      transform: translateY(-1px);
      box-shadow: 0 3px 10px rgba(220, 53, 69, 0.3);
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .cartItem {
    margin-bottom: 10px;
    border-radius: 16px;

    &__image {
      height: 105px;
    }

    &__content {
      padding: 13px;
      gap: 9px;
    }

    &__name {
      font-size: 16px;
      margin-bottom: 5px;
    }

    &__pricing {
      padding: 7px 11px;
    }

    &__price {
      font-size: 17px;
    }

    &__total {
      padding: 11px 13px;
    }

    &__total-value {
      font-size: 19px;
    }

    &__quantity-btn {
      width: 28px;
      height: 28px;
      font-size: 16px;
    }

    &__quantity-value {
      font-size: 16px;
    }

    &__actions {
      gap: 8px;
      flex-wrap: nowrap;
    }

    &__quantity {
      flex: 1;
      max-width: 160px;
      padding: 7px 12px;
    }

    &__quantityBtn {
      width: 30px;
      height: 30px;
      font-size: 18px;
    }

    &__remove {
      flex: 1;
      max-width: 120px;
      padding: 8px 12px;
    }
  }
}

@media (max-width: 480px) {
  .cartItem {
    margin-bottom: 9px;
    border-radius: 14px;

    &__image {
      height: 95px;
    }

    &__content {
      padding: 12px;
      gap: 8px;
    }

    &__name {
      font-size: 15px;
      margin-bottom: 4px;
    }

    &__category {
      font-size: 9px;
      padding: 3px 8px;
    }

    &__option {
      font-size: 10px;
      padding: 3px 7px;
    }

    &__pricing {
      padding: 6px 10px;
    }

    &__price-label {
      font-size: 10px;
    }

    &__price {
      font-size: 16px;
    }

    &__total {
      padding: 10px 12px;
    }

    &__total-label {
      font-size: 12px;
    }

    &__total-value {
      font-size: 18px;
    }

    &__quantity-btn {
      width: 26px;
      height: 26px;
      font-size: 15px;
    }

    &__actions {
      gap: 8px;
    }

    &__quantity {
      flex: 1;
      max-width: 150px;
      padding: 6px 10px;
      gap: 10px;
    }

    &__quantity-btn {
      width: 28px;
      height: 28px;
      font-size: 17px;
    }

    &__quantity-value {
      font-size: 16px;
      min-width: 28px;
    }

    &__remove {
      font-size: 11px;
      padding: 7px 11px;
      flex: 1;
      max-width: 110px;
      gap: 5px;
      
      &-icon {
        width: 14px;
        height: 14px;
      }
    }
  }
}
</style>
