import Services from '../../config/_axios';
import API from '../../api';

const cart = {
  state: () => ({
    basket: {},
    loader: false
  }),
  mutations: {
    SET_BASKET(state, payload) {
      state.basket = payload;
    },
    SET_LOADER(state, payload) {
      state.loader = payload;
    }
  },
  actions: {
    async fetchCart({ commit, dispatch }) {
      commit('SET_LOADER', true);
      try {
        const token = localStorage.getItem('jwt');
        const res = await Services.get(API.profile, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        const basket = res.data.basket || {};
        commit('SET_BASKET', basket);
        
        setTimeout(() => {
          commit('SET_LOADER', false);
        }, 1400);
      } catch (err) {
        console.error('Sepet çekme hatası:', err.message);
        setTimeout(() => {
          commit('SET_LOADER', false);
          dispatch('notify/showNotify', { 
            message: 'Sepet yüklenirken hata oluştu', 
            type: 'error' 
          }, { root: true });
        }, 1400);
      }
    },
    async updateCart({ commit, dispatch }, { basket, userId, token }) {
      commit('SET_LOADER', true);
      try {
        const updateCartUrl = API.cart.replace('{id}', userId);
        await Services.put(updateCartUrl, {
          basket
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        commit('SET_BASKET', basket);
        
        setTimeout(() => {
          commit('SET_LOADER', false);
        }, 1400);
      } catch (err) {
        console.error('Sepet güncelleme hatası:', err.message);
        setTimeout(() => {
          commit('SET_LOADER', false);
          dispatch('notify/showNotify', { 
            message: 'Sepet güncellenirken hata oluştu', 
            type: 'error' 
          }, { root: true });
        }, 1400);
      }
    },
    async addToCart({ commit, dispatch, state, rootState }, product) {
      commit('SET_LOADER', true);
      try {
        const token = localStorage.getItem('jwt');
        const userId = rootState.profile.profile.id;
        
        // Mevcut basket'i al veya boş obje oluştur
        const currentBasket = state.basket || {};
        
        // products array'ini al veya boş array oluştur
        const currentProducts = currentBasket.products || [];
        
        // Yeni ürünü ekle
        const updatedProducts = [...currentProducts, product];
        
        // Güncellenmiş basket objesi
        const updatedBasket = {
          ...currentBasket,
          products: updatedProducts
        };
        
        const updateCartUrl = API.cart.replace('{id}', userId);
        await Services.put(updateCartUrl, {
          basket: updatedBasket
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        commit('SET_BASKET', updatedBasket);
        dispatch('notify/showNotify', {
          type: 'success',
          title: 'Başarılı',
          message: 'Ürün sepete eklendi!',
          duration: 3000
        }, { root: true });
        
        setTimeout(() => {
          commit('SET_LOADER', false);
        }, 1400);
        
      } catch (err) {
        console.error('Sepete ekleme hatası:', err.message);
        setTimeout(() => {
          commit('SET_LOADER', false);
          dispatch('notify/showNotify', { 
            message: 'Sepete eklenirken hata oluştu', 
            type: 'error' 
          }, { root: true });
        }, 1400);
      }
    }
  },
  getters: {
    getBasket: (state) => state.basket,
    getLoader: (state) => state.loader,
    calculateSummary: (state) => {
      const products = state.basket?.products || [];
      const totalItems = products.reduce((sum, product) => sum + (product.quantity || 1), 0);
      const totalPrice = products.reduce((sum, product) => {
        const price = parseFloat(product.price) || 0;
        const quantity = product.quantity || 1;
        return sum + (price * quantity);
      }, 0);
      
      return {
        totalItems,
        totalPrice: totalPrice.toFixed(2),
        itemCount: products.length
      };
    }
  },
  namespaced: true
};

export default cart;