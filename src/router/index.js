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
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products/:categorySlug',
    name: 'Products',
    component: Products,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/confirm',
    name: 'Confirm',
    component: Confirm,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/address',
    name: 'Address',
    component: Address,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;