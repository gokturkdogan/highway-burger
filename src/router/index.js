import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Products from '../views/Products.vue';

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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;