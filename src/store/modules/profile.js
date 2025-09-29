import Services from '../../config/_axios';
import API from '../../api';

const profile = {
  namespaced: true,
  state: () => ({
    profile: null,
    loader: false
  }),
  mutations: {
    SET_PROFILE(state, payload) {
      state.profile = payload;
    },
    SET_LOADER(state, payload) {
      state.loader = payload;
    }
  },
  actions: {
    async fetchProfile({ commit, dispatch }) {
      commit('SET_LOADER', true);
      try {
        const token = localStorage.getItem('jwt');
        const res = await Services.get(API.profile, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        await commit('SET_PROFILE', res.data);
        setTimeout(() => {
          commit('SET_LOADER', false);
        }, 1400);
      } catch (err) {
        setTimeout(() => {
          commit('SET_LOADER', false);
          dispatch('notify/showNotify', { message: 'Profil bilgisi alınırken hata', type: 'error' }, { root: true });
        }, 1400);
      }
    },
    async updateProfile({ commit, dispatch, state }, payload) {
      commit('SET_LOADER', true);
      try {
        const token = localStorage.getItem('jwt');
        const userId = state.profile.id;
        const url = API.updateProfile.replace('{id}', userId);
        const res = await Services.put(url, payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        commit('SET_PROFILE', res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
        setTimeout(() => {
          commit('SET_LOADER', false);
          dispatch(
            'notify/showNotify',
            { message: 'Profil güncellendi', type: 'success' },
            { root: true }
          );
        }, 1400);
      } catch (err) {
        setTimeout(() => {
          commit('SET_LOADER', false);
          dispatch(
            'notify/showNotify',
            { message: 'Profil güncellenirken hata', type: 'error' },
            { root: true }
          );
        }, 1400);
      }
    }
  },
  getters: {
    getLoader: (state) => state.loader,
    getProfile: (state) => state.profile
  }
};

export default profile;