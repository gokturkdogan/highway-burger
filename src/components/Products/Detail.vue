<template>
    <transition name="slide-up">
        <Modal v-if="isOpen" :title="productTitle" variant="addAddress" @close-modal="closeModal">
            <template #body>
                <div class="productDetail" v-if="selectedProduct && selectedProduct.attributes">
                    <div class="productDetail__image">
                        <img :src="productImage" :alt="selectedProduct.attributes.name" class="productDetail__img" />
                    </div>

                    <div class="productDetail__content">
                        <div class="productDetail__header">
                            <h2 class="productDetail__name">{{ selectedProduct.attributes.name }}</h2>
                            <span class="productDetail__category" v-if="categoryName">
                                {{ categoryName }}
                            </span>
                        </div>

                        <p class="productDetail__description">
                            {{ selectedProduct.attributes.description }}
                        </p>

                        <div class="productDetail__extra" v-if="selectedProduct.attributes.extra">
                            <span class="productDetail__extra-label">Seçenekler:</span>
                            <span class="productDetail__extra-value">{{ selectedProduct.attributes.extra }}</span>
                        </div>

                          <div class="productDetail__pricing">
                            <div 
                                class="productDetail__price" 
                                :class="{ '-selected': selectedPriceOption === 'normal' }"
                                @click="selectPriceOption('normal')"
                            >
                                <span class="productDetail__price-label">{{ normalPriceLabel }}</span>
                                <span class="productDetail__price-value">{{ selectedProduct.attributes.price }} ₺</span>
                            </div>
                            <div 
                                v-if="selectedProduct.attributes.secondPrice"
                                class="productDetail__price" 
                                :class="{ '-selected': selectedPriceOption === 'extra' }"
                                @click="selectPriceOption('extra')"
                            >
                                <span class="productDetail__price-label">{{ extraPriceLabel }}</span>
                                <span class="productDetail__price-value">{{ selectedProduct.attributes.secondPrice }} ₺</span>
                            </div>
                        </div>

                        <div class="productDetail__quantity">
                            <button class="productDetail__quantityBtn" @click="decreaseQuantity" :disabled="quantity <= 1">
                                <span>−</span>
                            </button>
                            <div class="productDetail__quantityValue">
                                <span class="productDetail__quantityLabel">Adet</span>
                                <span class="productDetail__quantityNumber">{{ quantity }}</span>
                            </div>
                            <button class="productDetail__quantityBtn" @click="increaseQuantity" :disabled="quantity >= 10">
                                <span>+</span>
                            </button>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="productDetail__footer">
                    <button 
                        class="productDetail__addButton" 
                        :class="{ '-adding': isAdding }"
                        @click="addToCart"
                        :disabled="isAdding"
                    >
                        <div class="productDetail__buttonContent">
                            <div class="productDetail__basketIcon">
                                <BasketIcon />
                                <div class="productDetail__basketFill"></div>
                            </div>
                            <span class="productDetail__buttonText">{{ isAdding ? 'Ekleniyor...' : 'Sepete Ekle' }}</span>
                        </div>
                    </button>
                </div>
            </template>
        </Modal>
    </transition>
</template>

<script>
import Modal from '../base/Modal.vue'
import BasketIcon from '../../assets/icons/basket-icon.vue'

export default {
    name: "Detail",
    data() {
        return {
            selectedPriceOption: 'normal',
            isAdding: false,
            quantity: 1
        }
    },
    components: {
        Modal,
        BasketIcon
    },
    created() { },
    computed: {
        isOpen() {
            return this.$store.getters["product/getIsDetailModalOpen"];
        },
        selectedProduct() {
            return this.$store.getters["product/getSelectedProduct"];
        },
        productTitle() {
            return this.selectedProduct?.attributes?.name || 'Ürün Detayı';
        },
        productImage() {
            const imageUrl = this.selectedProduct?.attributes?.image?.data?.attributes?.url;
            return imageUrl || '';
        },
        categoryName() {
            return this.selectedProduct?.attributes?.category?.data?.attributes?.name || '';
        },
        normalPriceLabel() {
            const category = this.categoryName?.toLowerCase() || '';
            
            if (category.includes('burger')) {
                return '110gr';
            }
            
            if (category.includes('tost')) {
                return 'Sadece Tost';
            }
            
            return 'Normal';
        },
        extraPriceLabel() {
            const category = this.categoryName?.toLowerCase() || '';
            
            if (category.includes('burger')) {
                return '180gr';
            }
            
            if (category.includes('tost')) {
                return '+ Patates & İçecek';
            }
            
            return 'Extra Gramaj / Menü';
        }
    },
    methods: {
        closeModal() {
            this.$store.commit('product/SET_IS_DETAIL_MODAL_OPEN', false);
            this.selectedPriceOption = 'normal';
            this.quantity = 1;
        },
        selectPriceOption(option) {
            this.selectedPriceOption = option;
        },
        increaseQuantity() {
            if (this.quantity < 10) {
                this.quantity++;
            }
        },
        decreaseQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },
        async addToCart() {
            if (this.isAdding) return;
            
            this.isAdding = true;
            
            // Animasyon bitene kadar bekle (1.5 saniye)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const productData = {
                productId: this.selectedProduct.id,
                name: this.selectedProduct.attributes.name,
                price: this.selectedPriceOption === 'normal' 
                    ? this.selectedProduct.attributes.price 
                    : this.selectedProduct.attributes.secondPrice,
                priceOption: this.selectedPriceOption,
                image: this.productImage,
                category: this.categoryName,
                quantity: this.quantity
            };
            
            await this.$store.dispatch('cart/addToCart', productData);
            this.isAdding = false;
            this.closeModal();
        }
    },
    watch: {},
};
</script>

<style lang="scss" scoped>
.productDetail {
    display: flex;
    flex-direction: column;
    gap: 10px;

    &__image {
        width: 100%;
        height: 140px;
        background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
        border-radius: 16px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        flex-shrink: 0;
        border: 2px solid rgba(187, 124, 5, 0.15);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12),
                    0 3px 10px rgba(187, 124, 5, 0.15),
                    0 1px 4px rgba(0, 0, 0, 0.08);

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(ellipse at center, 
                rgba(187, 124, 5, 0.08) 0%, 
                transparent 70%);
            pointer-events: none;
        }
    }

    &__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
    }

    &__name {
        font-size: 18px;
        font-weight: 800;
        color: #1a1a1a;
        margin: 0;
        line-height: 1.3;
        flex: 1;
        letter-spacing: 0.3px;
    }

    &__category {
        display: inline-flex;
        align-items: center;
        padding: 5px 11px;
        background: linear-gradient(135deg, rgba(187, 124, 5, 0.15) 0%, rgba(212, 150, 36, 0.1) 100%);
        color: #bb7c05;
        border-radius: 10px;
        font-size: 11px;
        font-weight: 800;
        white-space: nowrap;
        border: 2px solid rgba(187, 124, 5, 0.25);
        letter-spacing: 0.5px;
        box-shadow: 0 2px 6px rgba(187, 124, 5, 0.15);
    }

    &__description {
        font-size: 12px;
        color: #4a4a4a;
        line-height: 1.5;
        margin: 0;
        padding: 9px 11px;
        background: white;
        border-radius: 12px;
        border-left: 4px solid #bb7c05;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08),
                    0 1px 4px rgba(0, 0, 0, 0.06);
        border: 2px solid rgba(187, 124, 5, 0.12);
        border-left: 4px solid #bb7c05;
        font-weight: 500;
    }

    &__extra {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 8px 11px;
        background: white;
        border: 2px solid rgba(187, 124, 5, 0.2);
        border-radius: 12px;
        box-shadow: 0 3px 10px rgba(187, 124, 5, 0.12),
                    0 1px 4px rgba(0, 0, 0, 0.06);

        &-label {
            font-size: 11px;
            color: #5a5a5a;
            font-weight: 800;
            letter-spacing: 0.3px;
        }

        &-value {
            font-size: 13px;
            color: #bb7c05;
            font-weight: 900;
            letter-spacing: 0.5px;
        }
    }

    &__pricing {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
        gap: 8px;
        margin-top: 2px;
    }

    &__quantity {
        display: flex;
        align-items: stretch;
        gap: 8px;
        margin-top: 8px;
        padding: 10px 12px;
        background: white;
        border: 3px solid #e0e0e0;
        border-radius: 14px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1),
                    0 2px 6px rgba(0, 0, 0, 0.08);
    }

    &__quantityBtn {
        width: 40px;
        height: 40px;
        border: 2px solid #bb7c05;
        background: linear-gradient(135deg, rgba(187, 124, 5, 0.1) 0%, rgba(212, 150, 36, 0.05) 100%);
        color: #bb7c05;
        border-radius: 10px;
        font-size: 24px;
        font-weight: 800;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 6px rgba(187, 124, 5, 0.2);

        &:hover:not(:disabled) {
            background: linear-gradient(135deg, #bb7c05 0%, #d49624 100%);
            color: white;
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(187, 124, 5, 0.4);
        }

        &:active:not(:disabled) {
            transform: scale(0.95);
        }

        &:disabled {
            opacity: 0.4;
            cursor: not-allowed;
            border-color: #e0e0e0;
            color: #aaa;
            background: #f5f5f5;
        }

        span {
            display: block;
            line-height: 1;
        }
    }

    &__quantityValue {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
    }

    &__quantityLabel {
        font-size: 10px;
        color: #6a6a6a;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.8px;
    }

    &__quantityNumber {
        font-size: 22px;
        color: #bb7c05;
        font-weight: 900;
        letter-spacing: 0.5px;
        line-height: 1;
    }

    &__price {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 11px 13px;
        background: white;
        border: 3px solid #e0e0e0;
        border-radius: 14px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1),
                    0 2px 6px rgba(0, 0, 0, 0.08);
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        position: relative;

        &:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 22px rgba(187, 124, 5, 0.3),
                        0 4px 12px rgba(0, 0, 0, 0.15);
            border-color: #bb7c05;
        }

        &.-selected {
            background: linear-gradient(135deg, #bb7c05 0%, #d49624 50%, #bb7c05 100%);
            background-size: 200% 200%;
            border-color: #bb7c05;
            border-width: 3px;
            box-shadow: 0 6px 20px rgba(187, 124, 5, 0.5),
                        0 3px 10px rgba(187, 124, 5, 0.35),
                        0 1px 4px rgba(0, 0, 0, 0.15);
            transform: scale(1.05);

            .productDetail__price-label {
                color: rgba(255, 255, 255, 0.95);
                font-weight: 800;
            }

            .productDetail__price-value {
                color: white;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
            }

            &::after {
                content: '✓';
                position: absolute;
                top: 7px;
                right: 7px;
                width: 22px;
                height: 22px;
                background: white;
                color: #bb7c05;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 13px;
                font-weight: 900;
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2),
                            0 1px 4px rgba(0, 0, 0, 0.15);
                border: 2px solid white;
            }

            &:hover {
                transform: scale(1.05) translateY(-4px);
                box-shadow: 0 10px 30px rgba(187, 124, 5, 0.6),
                            0 5px 15px rgba(187, 124, 5, 0.4);
            }
        }

        &-label {
            font-size: 10px;
            color: #6a6a6a;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            transition: color 0.3s ease;
        }

        &-value {
            font-size: 18px;
            color: #bb7c05;
            font-weight: 900;
            letter-spacing: 0.5px;
            transition: color 0.3s ease;
        }
    }

    &__footer {
        width: 100%;
        margin-top: 4px;
    }

    &__addButton {
        width: 100%;
        padding: 13px 22px;
        background: linear-gradient(135deg, #bb7c05 0%, #d49624 50%, #bb7c05 100%);
        background-size: 200% 200%;
        color: white;
        border: 3px solid #bb7c05;
        border-radius: 14px;
        font-size: 15px;
        font-weight: 800;
        letter-spacing: 0.8px;
        cursor: pointer;
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 6px 20px rgba(187, 124, 5, 0.45),
                    0 3px 10px rgba(0, 0, 0, 0.2),
                    0 1px 4px rgba(0, 0, 0, 0.15);
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
        position: relative;
        overflow: hidden;
        text-transform: uppercase;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        &:hover:not(:disabled) {
            background-position: 100% 50%;
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(187, 124, 5, 0.55),
                        0 5px 15px rgba(0, 0, 0, 0.25),
                        0 2px 8px rgba(187, 124, 5, 0.4);
            border-color: #d49624;

            &::before {
                opacity: 1;
            }
        }

        &:active:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 4px 15px rgba(187, 124, 5, 0.5);
        }

        &:disabled {
            cursor: not-allowed;
            opacity: 0.9;
        }

        &.-adding {
            .productDetail__basketFill {
                animation: fillBasket 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }

            .productDetail__basketIcon {
                animation: basketBounce 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            }

            .productDetail__buttonText {
                animation: textPulse 1.5s ease;
            }
        }
    }

    &__buttonContent {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        position: relative;
        z-index: 1;
    }

    &__basketIcon {
        width: 28px;
        height: 28px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
            width: 100%;
            height: 100%;
            fill: white;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
            position: relative;
            z-index: 2;
        }

        &::before {
            content: '';
            position: absolute;
            bottom: 3px;
            left: 50%;
            transform: translateX(-50%);
            width: 16px;
            height: 0;
            background: linear-gradient(180deg, 
                rgba(255, 255, 255, 0.9) 0%, 
                rgba(255, 255, 255, 0.7) 50%,
                rgba(255, 255, 255, 0.5) 100%);
            border-radius: 3px 3px 0 0;
            z-index: 1;
        }
    }

    &__basketFill {
        position: absolute;
        bottom: 3px;
        left: 50%;
        transform: translateX(-50%);
        width: 16px;
        height: 0;
        background: linear-gradient(180deg, 
            rgba(255, 255, 255, 0.95) 0%, 
            rgba(255, 255, 255, 0.8) 50%,
            rgba(255, 255, 255, 0.6) 100%);
        border-radius: 3px 3px 0 0;
        z-index: 1;
        box-shadow: inset 0 -2px 4px rgba(0, 0, 0, 0.1);
    }

    &__buttonText {
        display: inline-block;
        min-width: 120px;
    }
}

@keyframes textPulse {
    0%, 100% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.05);
        opacity: 0.9;
    }
}

@keyframes fillBasket {
    0% {
        height: 0;
        opacity: 0;
        transform: translateX(-50%) scale(0.5);
    }
    5% {
        opacity: 1;
    }
    50% {
        height: 12px;
        transform: translateX(-50%) scale(1.05);
    }
    75% {
        height: 14px;
        transform: translateX(-50%) scale(1.02);
    }
    100% {
        height: 14px;
        opacity: 1;
        transform: translateX(-50%) scale(1);
    }
}

@keyframes basketBounce {
    0% {
        transform: translateY(0) scale(1);
    }
    15% {
        transform: translateY(-5px) scale(1.05);
    }
    30% {
        transform: translateY(0) scale(1);
    }
    40% {
        transform: translateY(-3px) scale(1.03);
    }
    50% {
        transform: translateY(0) scale(1);
    }
    70% {
        transform: scale(1.15) rotate(-3deg);
    }
    85% {
        transform: scale(0.95) rotate(3deg);
    }
    100% {
        transform: scale(1) rotate(0deg);
    }
}


@media (max-width: 768px) {
    .productDetail {
        gap: 9px;
        
        &__image {
            height: 130px;
            border-radius: 16px;
        }

        &__name {
            font-size: 17px;
        }

        &__category {
            font-size: 10px;
            padding: 3px 8px;
        }

        &__description {
            font-size: 12px;
            padding: 7px 9px;
        }

        &__extra {
            padding: 6px 9px;
        }

        &__pricing {
            grid-template-columns: 1fr;
            gap: 7px;
        }

        &__price {
            padding: 9px 11px;
            
            &-value {
                font-size: 16px;
            }
        }

        &__quantity {
            padding: 9px 11px;
        }

        &__quantityBtn {
            width: 38px;
            height: 38px;
            font-size: 22px;
        }

        &__quantityNumber {
            font-size: 20px;
        }

        &__addButton {
            padding: 11px 18px;
            font-size: 14px;
        }
    }
}

@media (max-width: 480px) {
    .productDetail {
        gap: 8px;
        
        &__image {
            height: 120px;
            border-radius: 14px;
        }

        &__name {
            font-size: 16px;
        }

        &__description {
            font-size: 11px;
            line-height: 1.4;
            padding: 7px 9px;
        }
        
        &__price {
            padding: 8px 10px;
            
            &-label {
                font-size: 9px;
            }
            
            &-value {
                font-size: 15px;
            }
        }

        &__quantity {
            padding: 8px 10px;
        }

        &__quantityBtn {
            width: 36px;
            height: 36px;
            font-size: 20px;
        }

        &__quantityLabel {
            font-size: 9px;
        }

        &__quantityNumber {
            font-size: 18px;
        }
        
        &__addButton {
            padding: 10px 16px;
            font-size: 14px;
        }
    }
}
</style>