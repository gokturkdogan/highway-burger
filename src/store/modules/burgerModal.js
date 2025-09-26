const burgerModal = {
  state: () => ({
    isOpen: false
  }),
  mutations: {
    SET_IS_OPEN(state, payload) {
      state.isOpen = payload;
    },
  },
  actions: {
    openModal({ commit }) {
        commit('SET_IS_OPEN', true);
    },
    closeModal({ commit }) {
        commit('SET_IS_OPEN', false);
    }
  },
  getters: {
    getIsModalOpen: (state) => state.isOpen,
  },
  namespaced: true
};

export default burgerModal;