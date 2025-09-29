import { createStore } from 'vuex';
import category from './modules/category';
import product from './modules/product';
import register from './modules/register';
import notify from './modules/notify';
import login from './modules/login';
import profile from './modules/profile';

export default createStore({
  state: {
    menuOverlay: false,
    menuWrapper: false,
    splash: true
  },
  mutations: {
    SET_MENU_OVERLAY(state, payload) {
      state.menuOverlay = payload;
    },
    SET_MENU_WRAPPER(state, payload) {
      state.menuWrapper = payload;
    },
    SET_SPLASH(state, payload) {
      state.splash = payload;
    }
  },
  actions: {
    openMenu({ commit }) {
      commit('SET_MENU_OVERLAY', true);
      setTimeout(() => {
        commit('SET_MENU_WRAPPER', true);
      }, 0);
    },
    closeMenu({ commit }) {
      commit('SET_MENU_WRAPPER', false);
      setTimeout(() => {
        commit('SET_MENU_OVERLAY', false);
      }, 300);
    },
    removeSplash({ commit }) {
      setTimeout(() => {
        commit('SET_SPLASH', false);
      }, 2000);
    }
  },
  getters: {
    getMenuOverlay: state => state.menuOverlay,
    getMenuWrapper: state => state.menuWrapper,
    getSplash: state => state.splash
  },
  modules: {
    category,
    product,
    register,
    notify,
    login,
    profile
  }
});