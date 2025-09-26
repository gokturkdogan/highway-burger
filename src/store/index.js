import { createStore } from 'vuex';
import burgerModal from './modules/burgerModal';

export default createStore({
  modules: {
    burgerModal
  },
});