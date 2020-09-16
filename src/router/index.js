import {createRouter, createWebHistory} from 'vue-router'
import routes from 'voie-pages';

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes
})

export default router
