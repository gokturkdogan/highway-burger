import Services from '../../config/_axios';
import API from '../../api';
import router from '../../router';

const login = {
    state: () => ({
        isLoggedIn: !!localStorage.getItem('jwt'),
        user: JSON.parse(localStorage.getItem('user')) || null,
    }),
    mutations: {
        SET_LOGIN_STATE(state, payload) {
            state.isLoggedIn = payload.isLoggedIn;
            state.user = payload.user || null;
        }
    },
    actions: {
        async login({ commit, dispatch }, payload) {
            try {
                const response = await Services.post(API.login, payload);
                localStorage.setItem('jwt', response.data.jwt);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                commit('SET_LOGIN_STATE', { isLoggedIn: true, user: response.data.user });
                dispatch('notify/showNotify', { message: 'Giriş başarılı!', type: 'success' }, { root: true });
                
                // Login olduktan sonra profil ve sepet bilgilerini yükle
                dispatch('profile/fetchProfile', null, { root: true });
                dispatch('cart/fetchCart', null, { root: true });
                
                setTimeout(() => router.push('/coin-actions/'), 1000);
                return response.data;
            } catch (error) {
                let message = 'Giriş sırasında bir hata oluştu!';
                const strapiMessage = error.response?.data?.error?.message;
                if (strapiMessage === 'Invalid identifier or password') {
                    message = 'E-posta veya şifre hatalı!';
                }
                if (strapiMessage === 'Your account email is not confirmed') {
                    message = 'Lütfen E-postanızı doğrulayın';
                }
                dispatch('notify/showNotify', { message, type: 'warning' }, { root: true });
                console.error('Login error:', error.response || error);
                throw error;
            }
        },
        logout({ commit, dispatch }) {
            localStorage.removeItem('jwt');
            localStorage.removeItem('user');
            commit('SET_LOGIN_STATE', { isLoggedIn: false, user: null });
            
            // Logout olduğunda profil ve sepet bilgilerini temizle
            commit('profile/SET_PROFILE', null, { root: true });
            commit('cart/SET_BASKET', {}, { root: true });
            
            dispatch('notify/showNotify', { message: 'Çıkış yapıldı!', type: 'success' }, { root: true });
            router.push('/');
        }
    },
    getters: {
        isLoggedIn: (state) => state.isLoggedIn,
        currentUser: (state) => state.user,
    },
    namespaced: true
};

export default login;