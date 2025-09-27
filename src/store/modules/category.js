import Services from '../../config/_axios';
import API from '../../api';

const category = {
  state: () => ({
    categories: []
  }),
  mutations: {
    SET_CATEGORIES(state, payload) {
      state.categories = payload;
    },
  },
  actions: {
    async fetchCategories({ commit }) {
      try {
        const res = await Services.get(API.categories);
        commit('SET_CATEGORIES', res.data.data);
      } catch (err) {
        console.error('Kategori çekme hatası:', err);
      }
    },
  },
  getters: {
    getCategories: (state) => state.categories,
  },
  namespaced: true
};

export default category;