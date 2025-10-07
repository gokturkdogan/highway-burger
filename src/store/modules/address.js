import Services from '../../config/_axios';
import API from '../../api';

const address = {
    state: () => ({
        addressList: [],
        loader: false,
        isModalOpen: false,
        isUpdateModalOpen: false,
        selectedAddress: null
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
        },
        SET_IS_UPDATE_MODAL_OPEN(state, payload) {
            state.isUpdateModalOpen = payload;
        },
        SET_SELECTED_ADDRESS(state, payload) {
            state.selectedAddress = payload;
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
                await commit('SET_ADDRESS_LIST', res.data.addresses || []);
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
        async addAddress({ commit, dispatch, state, rootState }, payload) {
            commit('SET_LOADER', true);
            try {
                const token = localStorage.getItem('jwt');
                const uniqueId = 'addr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                const addressWithId = {
                    ...payload,
                    id: uniqueId
                };
                const currentAddressList = state.addressList || [];
                const updatedAddresses = [...currentAddressList, addressWithId];
                const userId = rootState.profile.profile.id;
                const updateProfileUrl = API.updateProfile.replace('{id}', userId);
                await Services.put(updateProfileUrl, {
                    addresses: updatedAddresses
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                commit('SET_ADDRESS_LIST', updatedAddresses);
                dispatch('notify/showNotify', {
                    type: 'success',
                    title: 'Başarılı',
                    message: 'Adres başarıyla eklendi!',
                    duration: 3000
                }, { root: true });

                setTimeout(() => {
                    commit('SET_LOADER', false);
                }, 1400);
            } catch (err) {
                setTimeout(() => {
                    commit('SET_LOADER', false);
                    dispatch('notify/showNotify', { message: 'Adres Eklenirken Hata Oluştu', type: 'error' }, { root: true });
                }, 1400);
            }
        },
        async updateAddress({ commit, dispatch, state, rootState }, payload) {
            commit('SET_LOADER', true);
            try {
                const token = localStorage.getItem('jwt');
                const addressId = state.selectedAddress.id;

                const currentAddressList = state.addressList || [];
                const updatedAddresses = currentAddressList.map(address => {
                    if (address.id === addressId) {
                        return {
                            ...payload,
                            id: addressId
                        };
                    }
                    return address;
                });
                const userId = rootState.profile.profile.id;
                const updateProfileUrl = API.updateProfile.replace('{id}', userId);
                await Services.put(updateProfileUrl, {
                    addresses: updatedAddresses
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                commit('SET_ADDRESS_LIST', updatedAddresses);
                dispatch('notify/showNotify', {
                    type: 'success',
                    title: 'Başarılı',
                    message: 'Adres başarıyla güncellendi!',
                    duration: 3000
                }, { root: true });

                setTimeout(() => {
                    commit('SET_LOADER', false);
                }, 1400);
            } catch (err) {
                setTimeout(() => {
                    commit('SET_LOADER', false);
                    dispatch('notify/showNotify', { message: 'Adres Güncellenirken Hata Oluştu', type: 'error' }, { root: true });
                }, 1400);
            }
        },
        async deleteAddress({ commit, dispatch, state, rootState }, addressId) {
            commit('SET_LOADER', true);
            try {
                const token = localStorage.getItem('jwt');
                const currentAddressList = state.addressList || [];
                const updatedAddresses = currentAddressList.filter(address => address.id !== addressId);
                const userId = rootState.profile.profile.id;
                const updateProfileUrl = API.updateProfile.replace('{id}', userId);
                await Services.put(updateProfileUrl, {
                    addresses: updatedAddresses
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                commit('SET_ADDRESS_LIST', updatedAddresses);
                dispatch('notify/showNotify', {
                    type: 'success',
                    title: 'Başarılı',
                    message: 'Adres başarıyla silindi!',
                    duration: 3000
                }, { root: true });
                setTimeout(() => {
                    commit('SET_LOADER', false);
                }, 1400);
            } catch (err) {
                setTimeout(() => {
                    commit('SET_LOADER', false);
                    dispatch('notify/showNotify', { message: 'Adres Silinirken Hata Oluştu', type: 'error' }, { root: true });
                }, 1400);
            }
        }
    },
    getters: {
        getAddressList: (state) => state.addressList,
        getLoader: (state) => state.loader,
        getIsModalOpen: (state) => state.isModalOpen,
        getIsUpdateModalOpen: (state) => state.isUpdateModalOpen,
        getSelectedAddress: (state) => state.selectedAddress
    },
    namespaced: true
};

export default address;