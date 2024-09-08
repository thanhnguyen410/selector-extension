import { createRouter, createWebHashHistory } from 'vue-router';
import Workflows from './pages/workflows/index.vue';

const routes = [
  {
    name: 'home',
    path: '/',
    redirect: '/workflows',
    component: Workflows,
  },
];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
