import {createRouter, createWebHistory} from 'vue-router';
import routes from 'voie-pages';

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {top: 0};
  },
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
