import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/homepage',
      name: 'HomePage',
      component: () => import('@/views/HomePageView.vue'),
    },
    { path: '/product/:id',
      name: 'ProductDetail',
      component: () => import('@/components/HomePage/ProductDetail.vue')},
      { path: '/shopping_cart',
      name: 'ShoppingCart',
      component: () => import('@/components/HomePage/ShoppingCart.vue')},
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
  ],
})

export default router
