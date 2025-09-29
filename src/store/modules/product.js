import Services from '../../config/_axios';
import API from '../../api';

const product = {
  state: () => ({
    products: [],
    loader: false
  }),
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_LOADER(state, payload) {
      state.loader = payload;
    }
  },
  actions: {
    async fetchProducts({ commit }, categorySlug) {
      commit('SET_LOADER', true);
      try {
        const url = API.products.replace('{slug}', categorySlug);
        const res = await Services.get(url);
        await commit('SET_PRODUCTS', res.data.data);
        setTimeout(() => {
          commit('SET_LOADER', false);
        }, 1400);
      } catch (err) {
        console.error('Ürünleri çekme hatası:', err);
        commit('SET_LOADER', false);
      }
    }
  },
  getters: {
    getProducts: (state) => state.products,
    getLoader: (state) => state.loader
  },
  namespaced: true
};

export default product;