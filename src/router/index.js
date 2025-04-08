// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Avaliacoes from '../views/Avaliacoes.vue';
import Consultores from '../views/Consultores.vue';

const routes = [
  {
    path: '/',
    name: 'Avaliacoes',
    component: Avaliacoes
  },
  {
    path: '/consultores',
    name: 'Consultores',
    component: Consultores
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
