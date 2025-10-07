<template>
  <div class="addressList">
    <div class="addressList__header">
      <button class="addressList__addButton" @click="openAddModal">
        Yeni Adres Ekle +
      </button>
    </div>
    <div class="addressList__grid">
      <div v-for="address in addressList" :key="address.id" class="addressCard">
        <div class="addressCard__header">
          <span class="addressCard__title">{{ address.title }}</span>
        </div>
        <div class="addressCard__content">
          <div class="addressCard__name">{{ address.name }} {{ address.surname }}</div>
          <div class="addressCard__neighborhood">{{ address.neighborhood }}</div>
          <div class="addressCard__description">{{ address.description }}</div>
          <div class="addressCard__location">{{ address.district }}/{{ address.city }}</div>
        </div>
        <div class="addressCard__actions">
          <button class="addressCard__delete" @click="deleteAddress(address.id)">
            <DeleteIcon class="addressCard__delete-icon" />
            Sil
          </button>
          <button class="addressCard__edit" @click="editAddress(address)">
            Adresi Düzenle
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DeleteIcon from '../../assets/icons/delete-icon.vue'
export default {
  name: "AddressList",
  components: {
    DeleteIcon
  },
  props: {
    addressList: {
      type: Array,
      required: false,
      default: []
    }
  },
  methods: {
    openAddModal() {
      this.$store.commit('address/SET_IS_MODAL_OPEN', true);
    },
    async deleteAddress(addressId) {
      await this.$store.dispatch('address/deleteAddress', addressId);
    },
    async editAddress(address) {
      await this.$store.commit('address/SET_SELECTED_ADDRESS', address);
      this.$store.commit('address/SET_IS_UPDATE_MODAL_OPEN', true);
    }
  }
};
</script>

<style lang="scss" scoped>
.addressList {
  padding: 20px 0;

  &__header {
    margin-bottom: 24px;
  }

  &__addButton {
    width: 100%;
    background: linear-gradient(135deg, #bb7c05 0%, #a66b04 100%);
    color: white;
    border: none;
    padding: 16px 24px;
    border-radius: 20px;
    font-size: 16px;
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

  &__empty {
    text-align: center;
    padding: 60px 20px;
    color: #666;

    &-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }

    &-title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #333;
    }

    &-text {
      font-size: 14px;
      color: #999;
    }
  }

  &__grid {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
}

.addressCard {
  background: white;
  border-radius: 12px;
  box-shadow: #00000059 0 5px 15px;
  overflow: hidden;
  transition: all 0.2s ease;
  border: 2px solid #e0e0e0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: #00000059 0 8px 25px;
    border-color: #bb7c05;
  }

  &__header {
    background: #fafafa;
    padding: 16px 20px;
    border-bottom: 2px solid #e0e0e0;
  }

  &__title {
    font-size: 14px;
    font-weight: 600;
    color: #bb7c05;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &__content {
    text-transform: capitalize;
    padding: 20px;
  }

  &__name {
    font-size: 18px;
    font-weight: 600;
    color: #212529;
    margin-bottom: 8px;
  }

  &__neighborhood {
    font-size: 14px;
    color: #6c757d;
    margin-bottom: 6px;
    font-weight: 500;
  }

  &__description {
    font-size: 14px;
    color: #495057;
    line-height: 1.5;
    margin-bottom: 8px;
  }

  &__location {
    font-size: 13px;
    color: #6c757d;
    font-weight: 500;
  }

  &__actions {
    padding: 16px 20px;
    background: #f8f9fa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    border-top: 2px solid #e0e0e0;
  }

  &__delete {
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    color: #dc3545;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 6px;
    transition: all 0.2s ease;
    flex-shrink: 0;

    &:hover {
      background: rgba(220, 53, 69, 0.1);
    }

    &-icon {
      width: 20px;
      height: 20px;
      fill: rgb(212, 10, 10);
    }
  }

  &__edit {
    background: #bb7c05;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;

    &:hover {
      background: #a66b04;
    }
  }
}

@media (max-width: 768px) {
  .addressList__grid {
    grid-template-columns: 1fr;
  }
}
</style>