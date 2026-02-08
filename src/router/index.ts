import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home/index.vue'),
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
    {
      path: '/Register',
      name: 'legister',
      component: () => import('../views/Register/index.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login/index.vue'),
    },
  ],
})

export default router
