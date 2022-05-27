import { createWebHistory, createRouter } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/Dashboard/Dashboard.vue'),
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () => import('@/views/Auth/TheLogin.vue'),
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('@/views/Auth/TheRegistration.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
