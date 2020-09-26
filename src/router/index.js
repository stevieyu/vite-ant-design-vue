import {createRouter, createWebHistory} from 'vue-router';
import routes from 'voie-pages';

const routerHistory = createWebHistory();

export default createRouter({
  history: routerHistory,
  routes,
});

