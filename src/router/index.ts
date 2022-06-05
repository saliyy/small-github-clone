import { createWebHistory, createRouter } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/Main.vue'),
  },
  {
    path: '/repositories',
    name: 'repositories',
    component: () => import('@/views/Repositories/index.vue'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/Users/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
