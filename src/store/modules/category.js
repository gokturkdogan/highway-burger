import Services from '../../config/_axios';
import API from '../../api';

const category = {
  state: () => ({
    categories: [],
    loader: false
  }),
  mutations: {
    SET_CATEGORIES(state, payload) {
      state.categories = payload;
    },
    SET_LOADER(state, payload) {
      state.loader = payload;
    }
  },
  actions: {
    async fetchCategories({ commit }) {
      commit('SET_LOADER', true);
      try {
        const res = await Services.get(API.categories);
        commit('SET_CATEGORIES', res.data.data);
        setTimeout(() => {
          commit('SET_LOADER', false);
        }, 1400); 
      } catch (err) {
        commit('SET_LOADER', false);
        console.error('Kategori çekme hatası:', err);
      }
    },
  },
  getters: {
    getCategories: (state) => state.categories,
    getLoader: (state) => state.loader
  },
  namespaced: true
};

export default category;