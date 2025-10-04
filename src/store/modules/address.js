import Services from '../../config/_axios';
import API from '../../api';

const address = {
    state: () => ({
        addressList: [],
        loader: false,
        isModalOpen: false
    }),
    mutations: {
        SET_ADDRESS_LIST(state, payload) {
            state.addressList = payload;
        },
        SET_LOADER(state, payload) {
            state.loader = payload;
        },
        SET_IS_MODAL_OPEN(state, payload) {
            state.isModalOpen = payload;
        }
    },
    actions: {
        async fetchAddressList({ commit, dispatch }) {
        commit('SET_LOADER', true);
        try {
            const token = localStorage.getItem('jwt');
            const res = await Services.get(API.profile, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });
            await commit('SET_ADDRESS_LIST', res.data.addresses);
            await commit('profile/SET_PROFILE', res.data, { root: true })
            setTimeout(() => {
            commit('SET_LOADER', false);
            }, 1400);
        } catch (err) {
            setTimeout(() => {
            commit('SET_LOADER', false);
            dispatch('notify/showNotify', { message: 'Adres Listesi Alınırken Hata Oluştu', type: 'error' }, { root: true });
            }, 1400);
        }
        },
    },
    getters: {
        getAddressList: (state) => state.addressList,
        getLoader: (state) => state.loader,
        getIsModalOpen: (state) => state.isModalOpen
    },
    namespaced: true
};

export default address;