import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/home.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes
})

export default router