import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/AddSymbol',
      name: 'AddSymbol',
      component: () => import('../views/AddSymbol/index.vue'),
    },
    {
      path: '/RunModel',
      name: 'RunModel',
      component: () => import('../views/RunModel/index.vue'),
    },
  ],
})

export default router
