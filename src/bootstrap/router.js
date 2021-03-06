import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router';
import routes from 'voie-pages';

const history = import.meta.env.VITE_ROUTER_HASH !== 'true' ? createWebHistory() : createWebHashHistory();

const router = createRouter({
  history,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {top: 0};
  },
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
