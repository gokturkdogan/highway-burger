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
    path: '/highway-burger/',
    name: 'Home',
    component: Home
  },
  {
    path: '/highway-burger/products/:categorySlug',
    name: 'Products',
    component: Products,
    props: true
  },
  {
    path: '/highway-burger/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/highway-burger/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/highway-burger/confirm',
    name: 'Confirm',
    component: Confirm,
  },
  {
    path: '/highway-burger/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/highway-burger/address',
    name: 'Address',
    component: Address,
  },
  {
    path: '/highway-burger/cart',
    name: 'Cart',
    component: Cart,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;