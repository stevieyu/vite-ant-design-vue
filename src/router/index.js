import {createRouter, createWebHistory} from 'vue-router';
import routes from 'voie-pages';

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes,
});

export {
  routes,
};

export default router;
