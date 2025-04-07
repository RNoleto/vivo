// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';
import Avaliacoes from '../views/Avaliacoes.vue';
import Vendedores from '../views/Vendedores.vue';

const routes = [
  {
    path: '/',
    name: 'Avaliacoes',
    component: Avaliacoes
  },
  {
    path: '/vendedores',
    name: 'Vendedores',
    component: Vendedores
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
