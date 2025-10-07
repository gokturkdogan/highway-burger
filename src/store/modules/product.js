import Services from '../../config/_axios';
import API from '../../api';

const product = {
  state: () => ({
    products: [],
    loader: false,
    isDetailModalOpen: false,
    selectedProduct: {}
  }),
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_LOADER(state, payload) {
      state.loader = payload;
    },
    SET_IS_DETAIL_MODAL_OPEN(state, payload) {
      state.isDetailModalOpen = payload;
    },
    SET_SELECTED_PRODUCT(state, payload) {
      state.selectedProduct = payload;
    }
  },
  actions: {
    async fetchProducts({ commit, dispatch }, categorySlug) {
      commit('SET_LOADER', true);
      try {
        const url = API.products.replace('{slug}', categorySlug);
        const res = await Services.get(url);
        await commit('SET_PRODUCTS', res.data.data);
        setTimeout(() => {
          commit('SET_LOADER', false);
        }, 1400);
      } catch (err) {
        console.error('Ürünleri çekme hatası:', err.message);
        setTimeout(() => {
          commit('SET_LOADER', false);
          dispatch('notify/showNotify', { message: err.message, type: 'error' }, { root: true });
        }, 1400); 
      }
    },
    async fetchProductDetail({ commit, dispatch }, productId) {
      try {
        const url = API.productDetail.replace('{id}', productId);
        const res = await Services.get(url);
        await commit('SET_SELECTED_PRODUCT', res.data.data);
        commit('SET_IS_DETAIL_MODAL_OPEN', true);
      } catch (err) {
        console.error('Ürün detayı çekme hatası:', err.message);
        setTimeout(() => {
          dispatch('notify/showNotify', { message: 'Ürün detayı yüklenirken hata oluştu', type: 'error' }, { root: true });
        }, 1400);
      }
    }
  },
  getters: {
    getProducts: (state) => state.products,
    getLoader: (state) => state.loader,
    getIsDetailModalOpen: (state) => state.isDetailModalOpen,
    getSelectedProduct: (state) => state.selectedProduct
  },
  namespaced: true
};

export default product;