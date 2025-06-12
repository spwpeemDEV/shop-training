import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/plugins/stores/auth'
import LayoutDefault from '@/Layouts/LayoutDefault.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
    },

    {
      path: '/',
      component: LayoutDefault,
      children: [
        {
          path: '',
          name: 'HomePage',
          alias: ['/homepage'],
          component: () => import('@/views/HomePageView.vue'),
        },
        {
          path: 'product/:id',
          name: 'ProductDetail',
          props: true,
          component: () => import('@/components/HomePage/ProductDetail.vue'),
        },
        {
          path: 'about',
          name: 'About',
          component: () => import('@/views/AboutView.vue'),
        },
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // ถ้าหน้านั้นต้อง login
  if (!authStore.token) {
    // ถ้าไม่มี token (ยังไม่ได้ login) และพยายามเข้า page ที่ไม่ใช่ /login
    if (to.path !== '/login') {
      return next({ path: '/login' }) // บังคับให้ไปหน้า login
    }
    return next() // ถ้าเข้า /login ก็ผ่านไปเลย
  } else {
    // ถ้ามี token แล้วแต่พยายามเข้า /login ให้รีไดเรคไปหน้า /
    if (to.path === '/login') {
      return next({ path: '/homepage' })
    }
    return next() // ผ่านเงื่อนไข เข้าไปหน้าเป้าหมาย
  }
})

export default router
