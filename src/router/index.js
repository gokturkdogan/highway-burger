import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Products from '../views/Products.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Confirm from '../views/ConfirmEmail.vue';
import Profile from '../views/Profile.vue';
import Address from '../views/Address.vue';
import Cart from '../views/Cart.vue';

const routes = [
  {
    path: '/coin-actions/',
    name: 'Home',
    component: Home
  },
  {
    path: '/coin-actions/products/:categorySlug',
    name: 'Products',
    component: Products,
    props: true
  },
  {
    path: '/coin-actions/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/coin-actions/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/coin-actions/confirm',
    name: 'Confirm',
    component: Confirm,
  },
  {
    path: '/coin-actions/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/coin-actions/address',
    name: 'Address',
    component: Address,
  },
  {
    path: '/coin-actions/cart',
    name: 'Cart',
    component: Cart,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;