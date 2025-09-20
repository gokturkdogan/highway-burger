import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Burgers from '../views/Burgers.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/burgers',
    name: 'Burgers',
    component: Burgers
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;