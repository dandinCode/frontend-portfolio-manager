import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import { isTokenExpired } from '@/utils/jwt'

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
      meta: { requiresAuth: true },
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
        {
          path: 'Portfolio',
          name: 'Portfolio',
          component: () => import('../views/Portfolio/index.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (token && isTokenExpired(token)) {
    localStorage.removeItem('token')
    return next('/login')
  }

  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  if ((to.path === '/login' || to.path === '/register') && token) {
    return next('/')
  }

  next()
})

export default router
