import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home/Index.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login/index.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register/index.vue'),
    },

    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: 'AddSymbol',
          name: 'AddSymbol',
          component: () => import('../views/AddSymbol/index.vue'),
        },
        {
          path: 'RunModel',
          name: 'RunModel',
          component: () => import('../views/RunModel/index.vue'),
        },
      ],
    },
  ],
})

export default router
