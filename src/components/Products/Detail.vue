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
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="productDetail__footer">
                    <button class="productDetail__addButton" @click="addToCart">
                        Sepete Ekle
                    </button>
                </div>
            </template>
        </Modal>
    </transition>
</template>

<script>
import Modal from '../base/Modal.vue'

export default {
    name: "Detail",
    data() {
        return {
            selectedPriceOption: 'normal'
        }
    },
    components: {
        Modal
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
        },
        selectPriceOption(option) {
            this.selectedPriceOption = option;
        },
        async addToCart() {
            const productData = {
                productId: this.selectedProduct.id,
                name: this.selectedProduct.attributes.name,
                price: this.selectedPriceOption === 'normal' 
                    ? this.selectedProduct.attributes.price 
                    : this.selectedProduct.attributes.secondPrice,
                priceOption: this.selectedPriceOption,
                image: this.productImage,
                category: this.categoryName,
                quantity: 1
            };
            
            await this.$store.dispatch('cart/addToCart', productData);
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
    gap: 12px;

    &__image {
        width: 100%;
        height: 160px;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border-radius: 14px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        flex-shrink: 0;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(187, 124, 5, 0.1) 0%, transparent 100%);
            pointer-events: none;
        }
    }

    &__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;

        &:hover {
            transform: scale(1.05);
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    &__header {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    &__name {
        font-size: 19px;
        font-weight: 700;
        color: #212529;
        margin: 0;
        line-height: 1.2;
    }

    &__category {
        display: inline-flex;
        align-items: center;
        padding: 4px 9px;
        background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
        color: #bb7c05;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        width: fit-content;
        border: 1px solid rgba(187, 124, 5, 0.2);
    }

    &__description {
        font-size: 13px;
        color: #495057;
        line-height: 1.45;
        margin: 0;
        padding: 10px 12px;
        background: #f8f9fa;
        border-radius: 9px;
        border-left: 3px solid #bb7c05;
    }

    &__extra {
        display: flex;
        align-items: center;
        gap: 7px;
        padding: 8px 12px;
        background: white;
        border: 2px solid #e9ecef;
        border-radius: 9px;

        &-label {
            font-size: 12px;
            color: #6c757d;
            font-weight: 600;
        }

        &-value {
            font-size: 13px;
            color: #bb7c05;
            font-weight: 700;
        }
    }

    &__pricing {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(135px, 1fr));
        gap: 9px;
        margin-top: 3px;
    }

    &__price {
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 11px 13px;
        background: white;
        border: 3px solid #e9ecef;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease;
        cursor: pointer;
        position: relative;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(187, 124, 5, 0.2);
            border-color: #bb7c05;
        }

        &.-selected {
            background: linear-gradient(135deg, #bb7c05 0%, #a66b04 100%);
            border-color: #bb7c05;
            box-shadow: 0 4px 15px rgba(187, 124, 5, 0.4);
            transform: scale(1.03);

            .productDetail__price-label {
                color: rgba(255, 255, 255, 0.95);
            }

            .productDetail__price-value {
                color: white;
            }

            &::after {
                content: '✓';
                position: absolute;
                top: 4px;
                right: 4px;
                width: 18px;
                height: 18px;
                background: white;
                color: #bb7c05;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 11px;
                font-weight: 700;
            }

            &:hover {
                transform: scale(1.03) translateY(-2px);
                box-shadow: 0 6px 20px rgba(187, 124, 5, 0.5);
            }
        }

        &-label {
            font-size: 10px;
            color: #6c757d;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: color 0.3s ease;
        }

        &-value {
            font-size: 18px;
            color: #bb7c05;
            font-weight: 700;
            transition: color 0.3s ease;
        }
    }

    &__footer {
        width: 100%;
        margin-top: 6px;
    }

    &__addButton {
        width: 100%;
        padding: 13px 22px;
        background: linear-gradient(135deg, #bb7c05 0%, #a66b04 100%);
        color: white;
        border: none;
        border-radius: 14px;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(187, 124, 5, 0.3);

        &:hover {
            background: linear-gradient(135deg, #a66b04 0%, #8d5a03 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(187, 124, 5, 0.4);
        }

        &:active {
            transform: translateY(0);
            box-shadow: 0 2px 10px rgba(187, 124, 5, 0.3);
        }
    }
}

@media (max-width: 768px) {
    .productDetail {
        gap: 10px;
        
        &__image {
            height: 135px;
        }

        &__name {
            font-size: 18px;
        }

        &__description {
            font-size: 13px;
            padding: 9px 11px;
        }

        &__pricing {
            grid-template-columns: 1fr;
            gap: 8px;
        }

        &__price {
            padding: 10px 12px;
        }

        &__addButton {
            padding: 12px 20px;
            font-size: 14px;
        }
    }
}

@media (max-width: 380px) {
    .productDetail {
        gap: 9px;
        
        &__image {
            height: 115px;
        }

        &__name {
            font-size: 17px;
        }

        &__description {
            font-size: 12px;
            line-height: 1.35;
            padding: 8px 10px;
        }
        
        &__price {
            padding: 9px 11px;
        }
        
        &__addButton {
            padding: 11px 18px;
        }
    }
}
</style>