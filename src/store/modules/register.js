import Services from '../../config/_axios';
import API from '../../api';
import router from '../../router';

const register = {
  state: () => ({}),
  mutations: {},
  actions: {
    async register({ dispatch }, payload) {
      try {
        const response = await Services.post(API.register, payload);
        dispatch('notify/showNotify', { message: 'Kayıt başarılı!', type: 'success' }, { root: true });
        setTimeout(() => {
          router.push({ name: 'Login' });
        }, 3000);
        return response.data;
      } catch (error) {
        let message = 'Kayıt sırasında bir hata oluştu!';
        const strapiMessage = error.response?.data?.error?.message;
        if (strapiMessage === 'Email or Username are already taken') {
          message = 'Bu e-posta zaten kullanılıyor!';
        }
        dispatch('notify/showNotify', { message, type: 'error' }, { root: true });
        console.error('Register error:', error.response || error);
        throw error;
      }

    }
  },
  getters: {},
  namespaced: true
};

export default register;
