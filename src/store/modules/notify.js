const notify = {
    state: () => ({
        notify: {
            show: false,
            message: '',
            type: ''
        }
    }),
    mutations: {
        SET_NOTIFY(state, payload) {
            state.notify = {
                show: payload.show !== undefined ? payload.show : true,
                message: payload.message || '',
                type: payload.type || ''
            };
        }
    },
    actions: {
        showNotify({ commit }, payload) {
            commit('SET_NOTIFY', payload);
            setTimeout(() => {
                commit('SET_NOTIFY', { show: false, message: '', type: '' });
            }, 3000);
        },
        hideNotify({ commit }) {
            commit('SET_NOTIFY', { show: false, message: '', type: '' });
        }
    },
    getters: {
        getNotify: (state) => state.notify
    },
    namespaced: true
};

export default notify;
